const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.addInitScript(() => sessionStorage.setItem('orenty_intro_played', 'true'));
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/mobile-menu-open.png' });
  await browser.close();
  console.log('Mobile menu captured successfully');
})();
