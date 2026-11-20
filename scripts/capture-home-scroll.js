const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1. Capture Hero (Top)
  await page.screenshot({ path: 'screenshots/home-01-hero.png' });
  console.log('Captured Hero');

  // 2. Scroll to 3D logo & ticker (matching user image 2)
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/home-02-logo-ticker.png' });
  console.log('Captured Logo & Ticker');

  // 3. Scroll to What We Do (matching user image 3)
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/home-03-divisions.png' });
  console.log('Captured Divisions');

  // 4. Scroll to Services
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/home-04-services.png' });
  console.log('Captured Services');

  await browser.close();
  console.log('All home scroll screenshots captured');
})();
