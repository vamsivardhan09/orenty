const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const screenshotDir = path.resolve(__dirname, '../screenshots/placard-test');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
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

  // 1. Desktop Test (1280x800)
  console.log('\n--- Testing Desktop Layout (1280x800) ---');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://localhost:3001', { waitUntil: 'load', timeout: 30000 });
  await desktopPage.waitForTimeout(2500);

  // Scroll to products
  await desktopPage.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView();
  });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({
    path: path.join(screenshotDir, 'desktop-products-grid.png'),
  });
  console.log('Captured desktop products grid');
  await desktopCtx.close();

  // 2. Mobile Placard Scroll Test (390x844 - iPhone 14)
  console.log('\n--- Testing Mobile Placard Scroll (390x844) ---');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3001', { waitUntil: 'load', timeout: 30000 });
  await mobilePage.waitForTimeout(2500);

  // Get products section position
  const productsTop = await mobilePage.evaluate(() => {
    const el = document.getElementById('products');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return window.scrollY + rect.top;
  });
  console.log('Products section top:', productsTop);

  if (productsTop !== null) {
    // 1. Scroll directly to products section header
    await mobilePage.evaluate((y) => window.scrollTo({ top: y - 20, behavior: 'instant' }), productsTop);
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'mobile-placard-1-syncedin.png'),
    });
    console.log('Captured mobile placard 1 (SyncedIn)');

    // 2. Scroll down to bring placard 2 (Fanbase) over placard 1
    await mobilePage.evaluate((y) => window.scrollTo({ top: y + 420, behavior: 'instant' }), productsTop);
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'mobile-placard-2-fanbase.png'),
    });
    console.log('Captured mobile placard 2 (Fanbase stacking)');

    // 3. Scroll down to bring placard 3 (Job Pilot) over placard 2
    await mobilePage.evaluate((y) => window.scrollTo({ top: y + 840, behavior: 'instant' }), productsTop);
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'mobile-placard-3-job-pilot.png'),
    });
    console.log('Captured mobile placard 3 (Job Pilot stacking)');

    // 4. Scroll down to bring placard 4 (Pujari.ai) over placard 3
    await mobilePage.evaluate((y) => window.scrollTo({ top: y + 1260, behavior: 'instant' }), productsTop);
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'mobile-placard-4-pujari-ai.png'),
    });
    console.log('Captured mobile placard 4 (Pujari.ai stacking)');

    // 5. Scroll down to bring placard 5 (G1 Mart) over placard 4
    await mobilePage.evaluate((y) => window.scrollTo({ top: y + 1680, behavior: 'instant' }), productsTop);
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'mobile-placard-5-g1-mart.png'),
    });
    console.log('Captured mobile placard 5 (G1 Mart stacking)');
  }

  // 3. Test /products/g1-mart detail page
  console.log('\n--- Testing /products/g1-mart Detail Page ---');
  await mobilePage.goto('http://localhost:3001/products/g1-mart', { waitUntil: 'load', timeout: 30000 });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'mobile-g1-mart-detail.png'),
  });
  console.log('Captured /products/g1-mart detail page');

  await mobileCtx.close();
  await browser.close();
  console.log('\nAll placard test screenshots captured successfully!');
}

main().catch(console.error);
