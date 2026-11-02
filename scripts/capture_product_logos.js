const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const artifactDir = 'C:\\Users\\Harsha vardhan\\.gemini\\antigravity\\brain\\9fa152a2-57f0-4db6-9fbe-d4ae1633b324';
  
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    browser = await chromium.launch({ headless: true });
  }

  // 1. Desktop (1366x768)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 2,
  });
  const page = await desktopCtx.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to Proprietary Builds section
  const section = await page.$('text=Proprietary builds');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  const desktopShot = path.join(artifactDir, 'products-logos-1366x768.png');
  await page.screenshot({ path: desktopShot });
  console.log('Saved desktop screenshot:', desktopShot);

  // 2. Mobile (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileSection = await mobilePage.$('text=Proprietary builds');
  if (mobileSection) {
    await mobileSection.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
  }

  const mobileShot = path.join(artifactDir, 'products-logos-390x844.png');
  await mobilePage.screenshot({ path: mobileShot });
  console.log('Saved mobile screenshot:', mobileShot);

  // 3. /products page
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const productsShot = path.join(artifactDir, 'products-page-logos.png');
  await page.screenshot({ path: productsShot });
  console.log('Saved products page screenshot:', productsShot);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
