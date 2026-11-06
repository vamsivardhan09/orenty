const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function capture() {
  const outDir = path.join(process.cwd(), 'screenshots', 'redesign-v2');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ headless: true }));

  // Helper to scroll and render everything
  async function scrollAndCapture(page, namePrefix, isMobile) {
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Capture hero immediately
    await page.screenshot({ path: path.join(outDir, `${namePrefix}-hero.png`), fullPage: false });

    // Scroll down to bottom smoothly to trigger lazy elements
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    await page.waitForTimeout(1500);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Capture full page
    await page.screenshot({ path: path.join(outDir, `${namePrefix}-full.png`), fullPage: true });
    console.log(`Saved ${namePrefix} screenshots.`);
  }

  // 1. Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    isMobile: false,
  });
  const desktopPage = await desktopContext.newPage();
  await scrollAndCapture(desktopPage, 'desktop', false);
  await desktopContext.close();

  // 2. Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await scrollAndCapture(mobilePage, 'mobile', true);
  await mobileContext.close();

  await browser.close();
  console.log('All redesign screenshots captured successfully.');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
