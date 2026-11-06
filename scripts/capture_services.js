const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000');
  
  // Wait 4 seconds for initial render / loader
  await page.waitForTimeout(4000);
  
  const textPresent = await page.getByText('What we build for clients.').count();
  console.log('Count of "What we build for clients.":', textPresent);
  
  // Scroll down by 800px
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshots/services-redesign.png' });
  console.log('Screenshot saved!');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
