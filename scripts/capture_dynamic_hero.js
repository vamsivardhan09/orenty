const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.resolve(__dirname, '../screenshots/dynamic-hero');
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

  console.log('Browser launched. Navigating to http://127.0.0.1:3000...');

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  try {
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  } catch (err) {
    console.log('Load error, proceeding...', err.message);
  }

  await page.waitForTimeout(2500);

  // 1. Initial Hero view
  const hero1Path = path.join(outDir, 'hero-state-1.png');
  await page.screenshot({ path: hero1Path, fullPage: false });
  fs.copyFileSync(hero1Path, path.join(artifactDir, 'hero-state-1.png'));
  console.log('Captured state 1 (initial hero).');

  // 2. Click "ENGINEER" pill
  const engineerBtn = await page.$('button:has-text("ENGINEER")');
  if (engineerBtn) {
    await engineerBtn.click();
    await page.waitForTimeout(1000);
    const hero2Path = path.join(outDir, 'hero-state-engineer.png');
    await page.screenshot({ path: hero2Path, fullPage: false });
    fs.copyFileSync(hero2Path, path.join(artifactDir, 'hero-state-engineer.png'));
    console.log('Captured state 2 (ENGINEER active).');
  }

  // 3. Scroll down 450px to view 3D light motion and division cards
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  const heroScrollPath = path.join(outDir, 'hero-scroll-divisions.png');
  await page.screenshot({ path: heroScrollPath, fullPage: false });
  fs.copyFileSync(heroScrollPath, path.join(artifactDir, 'hero-scroll-divisions.png'));
  console.log('Captured state 3 (scrolled view showing light beam behind divisions).');

  // 4. Mobile viewport (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'load', timeout: 15000 });
  await mobilePage.waitForTimeout(2500);

  const mobileHeroPath = path.join(outDir, 'hero-mobile.png');
  await mobilePage.screenshot({ path: mobileHeroPath, fullPage: false });
  fs.copyFileSync(mobileHeroPath, path.join(artifactDir, 'hero-mobile.png'));
  console.log('Captured mobile hero screenshot.');

  await browser.close();
  console.log('All screenshots captured successfully.');
}

main().catch(console.error);
