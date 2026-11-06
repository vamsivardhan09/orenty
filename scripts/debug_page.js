const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  const title = await page.title();
  const text = await page.innerText('body');
  console.log('Title:', title);
  console.log('Body snippet:', text.slice(0, 300));
  await browser.close();
})();
