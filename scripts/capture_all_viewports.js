const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outputDir = path.join(process.cwd(), 'screenshots', 'verified');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch {
      browser = await chromium.launch({ headless: true });
    }
  }

  const viewports = [
    { name: '375_mobile_small', width: 375, height: 812, isMobile: true },
    { name: '390_mobile_standard', width: 390, height: 844, isMobile: true },
    { name: '768_tablet', width: 768, height: 1024, isMobile: false },
    { name: '1024_desktop_small', width: 1024, height: 800, isMobile: false },
    { name: '1440_desktop_wide', width: 1440, height: 900, isMobile: false },
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });

    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1500);

    // Hero screenshot
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_hero.png`),
      fullPage: false,
    });

    // Scroll to services
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_services.png`),
      fullPage: false,
    });

    // Full page screenshot
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_full.png`),
      fullPage: true,
    });

    await context.close();
  }

  await browser.close();
  console.log('All viewports captured successfully!');
}

main().catch((err) => {
  console.error('Error capturing viewports:', err);
  process.exit(1);
});
