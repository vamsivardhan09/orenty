const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

  await page.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  // 1. Capture Contact Page (Desktop)
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/contact-redesign-desktop.png', fullPage: false });
  console.log('Captured contact redesign desktop');

  // 2. Scroll to form details on contact page
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/contact-form-focus.png', fullPage: false });
  console.log('Captured contact form focus');

  // 3. Capture Leadership on About page showing both Vamsi & Sai Ganesh
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/about-leadership-sai-ganesh.png', fullPage: false });
  console.log('Captured about leadership with Sai Ganesh');

  // 4. Mobile view of contact page
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobilePage.addInitScript(() => sessionStorage.setItem('orenty_intro_played', 'true'));
  await mobilePage.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: 'screenshots/contact-redesign-mobile.png', fullPage: false });
  console.log('Captured contact redesign mobile');

  await browser.close();
  console.log('All screenshots captured successfully');
})();
