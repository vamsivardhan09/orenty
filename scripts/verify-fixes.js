const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  
  // 1. Check About Page
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-about-sai-gumma.png', fullPage: true });
    console.log('Captured /about');
    await page.close();
  }

  // 2. Check Careers Page
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/careers', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-careers-no-hirings.png', fullPage: true });
    console.log('Captured /careers');
    await page.close();
  }

  // 3. Check Contact Page
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-contact-scoping-call.png', fullPage: true });
    
    // Test clicking "Request a 30-min call"
    const scopingBtn = page.getByRole('button', { name: /Request a 30-min call/i });
    if (await scopingBtn.count() > 0) {
      await scopingBtn.click();
      await page.waitForTimeout(500);
      const selectedNeed = await page.$eval('#contact-need', el => el.value);
      console.log('After clicking Request a 30-min call, selected need is:', selectedNeed);
      await page.screenshot({ path: 'screenshots/verify-contact-after-click.png', fullPage: false });
    }
    await page.close();
  }

  // 4. Check Mobile Viewport on Contact and Careers
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/careers', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-careers-mobile.png', fullPage: true });

    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-contact-mobile.png', fullPage: true });
    await page.close();
  }

  await browser.close();
  console.log('All verification captures completed successfully!');
})();
