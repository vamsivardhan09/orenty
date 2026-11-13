const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });

  // 1. Desktop Verification
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await desktopPage.waitForSelector('#services', { timeout: 20000 });
  await desktopPage.waitForTimeout(3000);

  const servicesSection = desktopPage.locator('#services');
  await servicesSection.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'screenshots/current-services.png' });
  console.log('Captured desktop placards: screenshots/current-services.png');
  await desktopPage.close();

  // 2. Mobile Stacking & Centering Verification
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobilePage.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForSelector('#services', { timeout: 20000 });
  await mobilePage.waitForTimeout(3000);

  // Scroll to services section
  const mobileServices = mobilePage.locator('#services');
  await mobileServices.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-stack-card1.png' });
  console.log('Captured mobile placard 1');

  // Scroll 500px to bring Card 2 into view above Card 1
  await mobilePage.mouse.wheel(0, 500);
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-stack-card2.png' });
  console.log('Captured mobile placard 2 overlaying card 1');

  // Scroll another 500px to bring Card 3 into view above Card 2
  await mobilePage.mouse.wheel(0, 500);
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-stack-card3.png' });
  console.log('Captured mobile placard 3 overlaying card 2');

  // Scroll another 500px to bring Card 4 into view above Card 3
  await mobilePage.mouse.wheel(0, 500);
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'screenshots/mobile-stack-card4.png' });
  console.log('Captured mobile placard 4 overlaying card 3');

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
