const { chromium } = require('playwright-core');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.addInitScript(() => {
    sessionStorage.setItem('orenty_intro_played', 'true');
  });

  const routes = [
    { path: '/services', name: 'services' },
    { path: '/products', name: 'products' },
    { path: '/work', name: 'work' },
    { path: '/about', name: 'about' },
    { path: '/contact', name: 'contact' },
    { path: '/apply', name: 'apply' },
  ];

  for (const r of routes) {
    try {
      await page.goto(`http://localhost:3000${r.path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `screenshots/subpage-${r.name}.png`, fullPage: false });
      console.log(`Captured ${r.path}`);
    } catch (e) {
      console.error(`Error on ${r.path}:`, e.message);
    }
  }

  await browser.close();
  console.log('All subpages captured successfully');
})();
