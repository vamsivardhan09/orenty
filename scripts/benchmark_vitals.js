const { chromium } = require('playwright-core');

async function measurePage(browser, name, path) {
  const url = `http://127.0.0.1:3000${path}`;
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile profile
    deviceScaleFactor: 2,
    isMobile: true,
  });

  const page = await context.newPage();

  // CDPSession for performance metrics
  const client = await context.newCDPSession(page);
  await client.send('Performance.enable');

  const start = Date.now();
  await page.goto(url, { waitUntil: 'load' });
  const loadTime = Date.now() - start;

  // Evaluate Navigation Timing and Paint Timing
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

    return {
      ttfb: nav ? nav.responseStart - nav.requestStart : 0,
      domInteractive: nav ? nav.domInteractive : 0,
      fcp: fcp,
      duration: nav ? nav.duration : 0,
    };
  });

  const perfMetrics = await client.send('Performance.getMetrics');
  const metricMap = {};
  perfMetrics.metrics.forEach(m => { metricMap[m.name] = m.value; });

  const jsHeapUsed = (metricMap['JSHeapUsedSize'] / (1024 * 1024)).toFixed(2);
  const layoutCount = metricMap['LayoutCount'] || 0;

  console.log(`--- [${name.toUpperCase()}] ---`);
  console.log(`URL: ${url}`);
  console.log(`TTFB: ${metrics.ttfb.toFixed(1)}ms`);
  console.log(`FCP (First Contentful Paint): ${metrics.fcp.toFixed(1)}ms`);
  console.log(`Load Duration: ${loadTime}ms`);
  console.log(`JS Heap Used: ${jsHeapUsed} MB`);
  console.log(`Layout Count: ${layoutCount}`);

  await context.close();

  return { name, ttfb: metrics.ttfb, fcp: metrics.fcp, loadTime, jsHeapUsed };
}

async function main() {
  console.log("=== RUNNING CORE WEB VITALS BENCHMARKS (MOBILE PROFILE) ===");

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e1) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const routes = [
    { name: 'Home (/)', path: '/' },
    { name: 'Software (/software)', path: '/software' },
    { name: 'Products (/products)', path: '/products' },
    { name: 'Product Detail (/products/syncedin)', path: '/products/syncedin' },
    { name: 'Startup Lab (/lab)', path: '/lab' },
    { name: 'Apply (/apply)', path: '/apply' },
  ];

  for (const r of routes) {
    await measurePage(browser, r.name, r.path);
  }

  await browser.close();
  console.log("=== BENCHMARK SUITE COMPLETED ===");
}

main().catch(console.error);
