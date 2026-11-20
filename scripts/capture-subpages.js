const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });

  const routes = [
    { path: '/contact', name: 'contact' },
    { path: '/services', name: 'services' },
    { path: '/products', name: 'products' },
    { path: '/work', name: 'work' },
    { path: '/about', name: 'about' },
    { path: '/apply', name: 'apply' },
    { path: '/lab', name: 'lab' },
  ];

  // Desktop captures
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  for (const r of routes) {
    try {
      await desktopPage.goto(`http://localhost:3000${r.path}`, { waitUntil: 'networkidle' });
      await desktopPage.waitForTimeout(600);
      await desktopPage.screenshot({ path: `screenshots/desktop-${r.name}.png`, fullPage: false });
      console.log(`Captured desktop: ${r.path}`);
    } catch (e) {
      console.error(`Error on desktop ${r.path}:`, e.message);
    }
  }

  // Mobile captures
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobilePage.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  for (const r of routes) {
    try {
      await mobilePage.goto(`http://localhost:3000${r.path}`, { waitUntil: 'networkidle' });
      await mobilePage.waitForTimeout(600);
      await mobilePage.screenshot({ path: `screenshots/mobile-${r.name}.png`, fullPage: false });
      console.log(`Captured mobile: ${r.path}`);
    } catch (e) {
      console.error(`Error on mobile ${r.path}:`, e.message);
    }
  }

  await browser.close();
  console.log('All desktop and mobile audit screenshots captured successfully');
})();
