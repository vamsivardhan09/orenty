const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Set sessionStorage directly on init so loader is skipped
  await page.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Take Hero screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/current-hero.png', fullPage: false });

  // Take Services screenshot
  const el = page.locator('#services');
  if (await el.count() > 0) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/current-services.png' });
  }

  await browser.close();
  console.log('Screenshots taken successfully');
})();
