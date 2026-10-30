const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function captureRevisionV2() {
  console.log("Starting Revision v2 verification screenshots...");

  const outDir = path.join(__dirname, '..', 'screenshots', 'revision-v2');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e1) {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      browser = await chromium.launch({ headless: true });
    }
  }

  const viewports = [
    { name: '1366x768', width: 1366, height: 768, isMobile: false },
    { name: '1440x900', width: 1440, height: 900, isMobile: false },
    { name: '390x844', width: 390, height: 844, isMobile: true },
  ];

  // 1. Home page at all 3 viewports (both viewport above the fold and full page)
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Allow hero render and animations
    await page.waitForTimeout(2500);

    // Viewport above fold
    await page.screenshot({ path: path.join(outDir, `home-${vp.name}-viewport.png`), fullPage: false });

    // Full page
    await page.screenshot({ path: path.join(outDir, `home-${vp.name}-full.png`), fullPage: true });

    console.log(`Captured home page for ${vp.name}`);
    await ctx.close();
  }

  // 2. All subpages at 1440x900 desktop
  const subpages = [
    { name: 'software', path: '/software' },
    { name: 'products', path: '/products' },
    { name: 'product-syncedin', path: '/products/syncedin' },
    { name: 'lab', path: '/lab' },
    { name: 'apply', path: '/apply' },
  ];

  for (const sp of subpages) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:3000${sp.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    await page.screenshot({ path: path.join(outDir, `${sp.name}-viewport.png`), fullPage: false });
    await page.screenshot({ path: path.join(outDir, `${sp.name}-full.png`), fullPage: true });

    console.log(`Captured ${sp.name}`);
    await ctx.close();
  }

  await browser.close();
  console.log("Revision v2 verification screenshots complete!");
}

captureRevisionV2().catch(console.error);
