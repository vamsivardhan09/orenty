const { chromium } = require('playwright-core');

async function main() {
  console.log("Capturing Phase 7 responsive & accessibility pass...");

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

  // 1. Desktop (1440x900)
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: 'screenshots/phase7/home-desktop.png', fullPage: false });
  await desktopPage.screenshot({ path: 'screenshots/phase7/home-desktop-full.png', fullPage: true });

  // Keyboard navigation focus check
  await desktopPage.keyboard.press('Tab'); // hits skip-to-content
  await desktopPage.keyboard.press('Tab'); // hits logo
  await desktopPage.keyboard.press('Tab'); // hits Software
  await desktopPage.screenshot({ path: 'screenshots/phase7/keyboard-focus-active.png', fullPage: false });
  await desktopCtx.close();

  // 2. Tablet (768x1024)
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2 });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await tabletPage.waitForTimeout(2000);
  await tabletPage.screenshot({ path: 'screenshots/phase7/home-tablet-full.png', fullPage: true });
  await tabletCtx.close();

  // 3. Mobile (390x844)
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: 'screenshots/phase7/home-mobile-full.png', fullPage: true });
  await mobileCtx.close();

  // 4. Small Mobile (320x568)
  const smallMobileCtx = await browser.newContext({ viewport: { width: 320, height: 568 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const smallMobilePage = await smallMobileCtx.newPage();
  await smallMobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await smallMobilePage.waitForTimeout(2000);
  await smallMobilePage.screenshot({ path: 'screenshots/phase7/home-320px-full.png', fullPage: true });
  await smallMobileCtx.close();

  await browser.close();
  console.log("Phase 7 screenshots captured successfully!");
}

main().catch(console.error);
