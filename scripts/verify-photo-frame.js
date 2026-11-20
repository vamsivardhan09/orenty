const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  
  // 1. Desktop About Page
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    
    // Full page
    await page.screenshot({ path: 'screenshots/verify-about-framed-photo-full.png', fullPage: true });
    
    // Focused screenshot on the Co-Founder & CTO card (Vamsi Vardhan)
    const ctoCard = await page.$('.rounded-card:has-text("Vamsi Vardhan")');
    if (ctoCard) {
      await ctoCard.screenshot({ path: 'screenshots/verify-founder-cto-card.png' });
    }
    
    // Focused screenshot on the Co-Founder & CEO card (Sai Ganesh)
    const ceoCard = await page.$('.rounded-card:has-text("Sai Ganesh")');
    if (ceoCard) {
      await ceoCard.screenshot({ path: 'screenshots/verify-founder-ceo-card.png' });
    }
    console.log('Captured /about desktop placards');
    await page.close();
  }

  // 2. Mobile About Page
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/verify-about-framed-photo-mobile.png', fullPage: true });
    console.log('Captured /about mobile');
    await page.close();
  }

  // 3. Home page About Strip
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => { sessionStorage.setItem('orenty_intro_played', 'true'); });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const aboutStrip = await page.$('section:has-text("Vamsi Vardhan")');
    if (aboutStrip) {
      await aboutStrip.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await aboutStrip.screenshot({ path: 'screenshots/verify-home-about-strip.png' });
    }
    console.log('Captured homepage AboutStrip');
    await page.close();
  }

  await browser.close();
  console.log('All photo frame captures completed successfully!');
})();
