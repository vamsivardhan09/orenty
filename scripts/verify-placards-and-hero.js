const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function capture() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e1) {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      browser = await chromium.launch({ headless: true });
    }
  }

  // 1. Desktop Viewport (1440 x 900)
  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const pageDesktop = await contextDesktop.newPage();
  console.log('Navigating to http://localhost:3000 (Desktop)...');
  await pageDesktop.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pageDesktop.waitForTimeout(3000);

  // Capture Hero + Traveling Ticker
  await pageDesktop.screenshot({
    path: 'screenshots/hero-desktop-verified.png',
  });
  console.log('Saved screenshots/hero-desktop-verified.png');

  // Scroll to Services Placards
  const servicesEl = await pageDesktop.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoViewIfNeeded();
    await pageDesktop.waitForTimeout(1500);
    await pageDesktop.screenshot({
      path: 'screenshots/placards-desktop-verified.png',
    });
    console.log('Saved screenshots/placards-desktop-verified.png');
  }

  // 2. Mobile Viewport (390 x 844)
  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const pageMobile = await contextMobile.newPage();
  console.log('Navigating to http://localhost:3000 (Mobile)...');
  await pageMobile.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pageMobile.waitForTimeout(3000);

  await pageMobile.screenshot({
    path: 'screenshots/hero-mobile-verified.png',
  });
  console.log('Saved screenshots/hero-mobile-verified.png');

  const servicesMobileEl = await pageMobile.$('#services');
  if (servicesMobileEl) {
    await servicesMobileEl.scrollIntoViewIfNeeded();
    await pageMobile.waitForTimeout(1500);
    await pageMobile.screenshot({
      path: 'screenshots/placards-mobile-verified.png',
    });
    console.log('Saved screenshots/placards-mobile-verified.png');
  }

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
