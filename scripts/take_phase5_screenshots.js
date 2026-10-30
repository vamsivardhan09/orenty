const { chromium } = require('playwright-core');

async function captureRoute(browser, name, path) {
  const url = `http://127.0.0.1:3000${path}`;
  console.log(`Capturing ${name} from ${url}...`);

  // Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(url, { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: `screenshots/phase5/${name}-desktop.png`, fullPage: false });
  await desktopPage.screenshot({ path: `screenshots/phase5/${name}-desktop-full.png`, fullPage: true });

  // Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: `screenshots/phase5/${name}-mobile.png`, fullPage: false });
  await mobilePage.screenshot({ path: `screenshots/phase5/${name}-mobile-full.png`, fullPage: true });

  await desktopContext.close();
  await mobileContext.close();
}

async function main() {
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

  await captureRoute(browser, 'software', '/software');
  await captureRoute(browser, 'products', '/products');
  await captureRoute(browser, 'product-syncedin', '/products/syncedin');

  await browser.close();
  console.log('All Phase 5 screenshots captured successfully!');
}

main().catch(console.error);
