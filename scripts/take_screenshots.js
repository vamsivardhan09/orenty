const { chromium } = require('playwright-core');

async function main() {
  const phase = process.argv[2] || 'phase2';
  const url = process.argv[3] || 'http://127.0.0.1:3000';

  console.log(`Taking screenshots for ${phase} at ${url}...`);

  let browser;
  try {
    // Try system msedge
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e1) {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      browser = await chromium.launch({ headless: true });
    }
  }

  // 1. Desktop screenshot (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(url, { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(2500); // Allow loader / animations to settle
  await desktopPage.screenshot({ path: `screenshots/${phase}/desktop.png`, fullPage: false });
  await desktopPage.screenshot({ path: `screenshots/${phase}/desktop-full.png`, fullPage: true });
  console.log(`Saved desktop screenshots for ${phase}`);

  // 2. Mobile screenshot (iPhone 14 style: 390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.screenshot({ path: `screenshots/${phase}/mobile.png`, fullPage: false });
  await mobilePage.screenshot({ path: `screenshots/${phase}/mobile-full.png`, fullPage: true });
  console.log(`Saved mobile screenshots for ${phase}`);

  await browser.close();
}

main().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
