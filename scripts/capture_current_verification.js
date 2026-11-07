const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const artifactDir = path.resolve('C:/Users/Harsha vardhan/.gemini/antigravity/brain/5a566aec-5d72-4ac7-8675-8cafb3b44c48');
  
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

  // 1. Desktop Hero (1440x900)
  console.log('Capturing Desktop Hero...');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(3000);
  await desktopPage.screenshot({
    path: path.join(artifactDir, 'live_desktop_hero.png'),
  });
  console.log('Saved live_desktop_hero.png');
  await desktopCtx.close();

  // 2. Mobile Hero (390x844 - iPhone 14)
  console.log('Capturing Mobile Hero...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({
    path: path.join(artifactDir, 'live_mobile_hero.png'),
  });
  console.log('Saved live_mobile_hero.png');

  // 3. Mobile Scrolled to Centered Placards (Services section)
  console.log('Capturing Mobile Centered Placard...');
  await mobilePage.evaluate(() => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'instant' });
      window.scrollBy(0, 320); // scroll into the first/second card
    }
  });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(artifactDir, 'live_mobile_placard_centered.png'),
  });
  console.log('Saved live_mobile_placard_centered.png');

  await mobileCtx.close();
  await browser.close();
  console.log('All live captures complete!');
}

main().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
