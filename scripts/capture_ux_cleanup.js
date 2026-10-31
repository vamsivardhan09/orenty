const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.resolve(__dirname, '../screenshots/ux-cleanup');
  const artifactDir = 'C:\\Users\\Harsha vardhan\\.gemini\\antigravity\\brain\\9fa152a2-57f0-4db6-9fbe-d4ae1633b324';

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

  console.log('Browser launched. Testing 1366x768 and 390x844...');

  // 1. Desktop viewport (1366x768) - Exact screen resolution requested
  const desktopCtx = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();

  await desktopPage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(2500);

  // 1a. Hero at 1366x768 (verifying subtext + buttons are visible)
  const hero1366Path = path.join(outDir, 'hero-1366x768.png');
  await desktopPage.screenshot({ path: hero1366Path, fullPage: false });
  fs.copyFileSync(hero1366Path, path.join(artifactDir, 'hero-1366x768.png'));
  console.log('Captured 1366x768 hero screenshot.');

  // 1b. Scroll down to Products row (4 compact cards)
  const productsSection = await desktopPage.$('section:has-text("Proprietary builds.")');
  if (productsSection) {
    await productsSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    const products1366Path = path.join(outDir, 'products-1366x768.png');
    await desktopPage.screenshot({ path: products1366Path, fullPage: false });
    fs.copyFileSync(products1366Path, path.join(artifactDir, 'products-1366x768.png'));
    console.log('Captured 1366x768 products row screenshot.');
  }

  // 2. Mobile viewport (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(2500);

  // 2a. Mobile Hero
  const mobileHeroPath = path.join(outDir, 'hero-390x844.png');
  await mobilePage.screenshot({ path: mobileHeroPath, fullPage: false });
  fs.copyFileSync(mobileHeroPath, path.join(artifactDir, 'hero-390x844.png'));
  console.log('Captured 390x844 mobile hero screenshot.');

  // 2b. Mobile Products scroll-snap row
  const mobileProductsSection = await mobilePage.$('section:has-text("Proprietary builds.")');
  if (mobileProductsSection) {
    await mobileProductsSection.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    const mobileProductsPath = path.join(outDir, 'products-390x844.png');
    await mobilePage.screenshot({ path: mobileProductsPath, fullPage: false });
    fs.copyFileSync(mobileProductsPath, path.join(artifactDir, 'products-390x844.png'));
    console.log('Captured 390x844 mobile products screenshot.');
  }

  await browser.close();
  console.log('All screenshots completed successfully.');
}

main().catch(console.error);
