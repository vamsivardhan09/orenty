const { chromium } = require('playwright-core');

async function captureAudit() {
  console.log("Starting audit screenshots...");

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

  const targets = [
    { name: '1366x768', width: 1366, height: 768, isMobile: false },
    { name: '1440x900', width: 1440, height: 900, isMobile: false },
    { name: '390x844', width: 390, height: 844, isMobile: true },
  ];

  for (const t of targets) {
    const ctx = await browser.newContext({
      viewport: { width: t.width, height: t.height },
      deviceScaleFactor: 2,
      isMobile: t.isMobile,
      hasTouch: t.isMobile,
    });
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for initial animation/loading screen to finish
    await page.waitForTimeout(3000);

    // 1. Viewport above the fold
    await page.screenshot({ path: `screenshots/audit/${t.name}-viewport.png`, fullPage: false });

    // 2. Full page
    await page.screenshot({ path: `screenshots/audit/${t.name}-full.png`, fullPage: true });

    console.log(`Captured audit for ${t.name}`);
    await ctx.close();
  }

  await browser.close();
  console.log("Audit screenshots complete!");
}

captureAudit().catch(console.error);
