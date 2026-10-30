const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.resolve(__api_dirname = __dirname, '../screenshots/hero-fix');
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

  console.log('Browser launched. Navigating to http://127.0.0.1:3000...');

  // 1. Desktop viewport (1440x900)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(3000);

  const desktopHeroPath = path.join(outDir, 'hero-desktop.png');
  const artifactDesktopPath = path.join(artifactDir, 'hero-fix-desktop.png');
  await desktopPage.screenshot({ path: desktopHeroPath, fullPage: false });
  fs.copyFileSync(desktopHeroPath, artifactDesktopPath);
  console.log('Desktop hero screenshot captured successfully.');

  // 2. Mobile viewport (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(3000);

  const mobileHeroPath = path.join(outDir, 'hero-mobile.png');
  const artifactMobilePath = path.join(artifactDir, 'hero-fix-mobile.png');
  await mobilePage.screenshot({ path: mobileHeroPath, fullPage: false });
  fs.copyFileSync(mobileHeroPath, artifactMobilePath);
  console.log('Mobile hero screenshot captured successfully.');

  await browser.close();
  console.log('All hero verification screenshots saved!');
}

main().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
