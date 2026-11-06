const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Find #services and scroll it into view centered
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  });
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshots/services-placards.png' });
  console.log('Saved screenshots/services-placards.png');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
