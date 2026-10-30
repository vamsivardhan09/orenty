const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.resolve(__dirname, '../screenshots/product-previews');
  const artifactDir = 'C:\\Users\\Harsha vardhan\\.gemini\\antigravity\\brain\\313f7ace-1469-4d15-8e36-a056d35f0932';

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

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. Home page products section
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Scroll to products section
  await page.evaluate(() => {
    window.scrollTo({ top: 1200, behavior: 'instant' });
  });
  await page.waitForTimeout(1500);

  const homeProductsPath = path.join(outDir, 'home-products-section.png');
  const artifactHomePath = path.join(artifactDir, 'products-preview-home.png');
  await page.screenshot({ path: homeProductsPath, fullPage: false });
  fs.copyFileSync(homeProductsPath, artifactHomePath);
  console.log('Home products screenshot captured');

  // 2. /products page
  await page.goto('http://127.0.0.1:3000/products', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    window.scrollTo({ top: 400, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  const productsPagePath = path.join(outDir, 'products-page.png');
  const artifactProductsPagePath = path.join(artifactDir, 'products-page-preview.png');
  await page.screenshot({ path: productsPagePath, fullPage: false });
  fs.copyFileSync(productsPagePath, artifactProductsPagePath);
  console.log('/products page screenshot captured');

  // 3. /products/syncedin detail page
  await page.goto('http://127.0.0.1:3000/products/syncedin', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  const syncedinPagePath = path.join(outDir, 'syncedin-detail.png');
  const artifactSyncedinPath = path.join(artifactDir, 'syncedin-detail-preview.png');
  await page.screenshot({ path: syncedinPagePath, fullPage: false });
  fs.copyFileSync(syncedinPagePath, artifactSyncedinPath);
  console.log('SyncedIn detail screenshot captured');

  await browser.close();
  console.log('All product preview screenshots successfully saved!');
}

main().catch(console.error);
