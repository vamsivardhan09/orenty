const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  
  // Mobile Capture
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  
  console.log('Navigating to http://localhost:3000 (Mobile)...');
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2000);

  const cta = await mobilePage.$('#final-cta');
  if (cta) {
    await cta.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await cta.screenshot({ path: 'screenshots/final-cta-mobile-card.png' });
    console.log('Saved screenshots/final-cta-mobile-card.png');
  }

  await browser.close();
  console.log('Done!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
