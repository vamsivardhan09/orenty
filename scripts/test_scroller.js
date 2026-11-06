const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function testScroller() {
  const artifactDir = 'C:\\Users\\Harsha vardhan\\.gemini\\antigravity\\brain\\fcbf12b8-f513-4ad0-881f-e301bb0a6cd9';
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

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Use ScrollTrigger to jump to exact progress 0 (Step 1)
  console.log('Jumping to Step 1 (progress 0)...');
  await page.evaluate(() => {
    const st = window.ScrollTrigger ? window.ScrollTrigger.getById('products-pin') : null;
    if (st) {
      st.scroll(st.start + 10);
    } else {
      const el = document.getElementById('products');
      if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop-products-step1-exact.png'),
    fullPage: false,
  });
  console.log('Captured step 1 exact');

  // Jump to progress 0.5 (Step 2: Fanbase, Job Pilot, Pujari.ai)
  console.log('Jumping to Step 2 (progress 0.5)...');
  await page.evaluate(() => {
    const st = window.ScrollTrigger ? window.ScrollTrigger.getById('products-pin') : null;
    if (st) {
      st.scroll(st.start + (st.end - st.start) * 0.5);
    }
  });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop-products-step2-exact.png'),
    fullPage: false,
  });
  console.log('Captured step 2 exact');

  // Jump to progress 0.98 (Step 3: Job Pilot, Pujari.ai, G1 Mart)
  console.log('Jumping to Step 3 (progress 0.98)...');
  await page.evaluate(() => {
    const st = window.ScrollTrigger ? window.ScrollTrigger.getById('products-pin') : null;
    if (st) {
      st.scroll(st.start + (st.end - st.start) * 0.98);
    }
  });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop-products-step3-exact.png'),
    fullPage: false,
  });
  console.log('Captured step 3 exact');

  await browser.close();
  console.log('Finished exact captures!');
}

testScroller().catch(console.error);
