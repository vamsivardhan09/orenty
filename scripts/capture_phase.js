const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function capture() {
  const phase = process.argv[2] || 'phase1';
  const route = process.argv[3] || '/';
  const outDir = path.join(process.cwd(), 'screenshots', phase);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ headless: true }));

  const viewports = [
    { name: '375px', width: 375, height: 812, isMobile: true },
    { name: '768px', width: 768, height: 1024, isMobile: false },
    { name: '1440px', width: 1440, height: 900, isMobile: false },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();
    try {
      await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle', timeout: 35000 });
    } catch {
      await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'domcontentloaded', timeout: 35000 });
    }
    // Wait for any initial animations / loading screen to settle
    await page.waitForTimeout(2000);

    const filePath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved screenshot: ${filePath}`);
    await context.close();
  }

  await browser.close();
  console.log(`Phase ${phase} screenshots completed.`);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
