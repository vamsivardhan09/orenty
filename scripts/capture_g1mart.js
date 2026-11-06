const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function downloadLogo() {
  const logoDir = path.resolve(__dirname, '../public/products/logos');
  if (!fs.existsSync(logoDir)) {
    fs.mkdirSync(logoDir, { recursive: true });
  }

  const logoUrls = [
    'https://g1mart.in/logo.png',
    'https://g1mart.in/assets/images/g1_mart_banner_transparent.png'
  ];

  for (const url of logoUrls) {
    try {
      const filename = path.basename(url);
      console.log(`Downloading ${url}...`);
      const res = await fetch(url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(logoDir, filename), buffer);
        console.log(`Saved ${filename}`);
      }
    } catch (e) {
      console.error('Failed to download logo:', e.message);
    }
  }
}

async function captureG1Mart() {
  const outputDir = path.resolve(__dirname, '../public/products');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

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

  console.log('Capturing https://g1mart.in/ ...');
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    await page.goto('https://g1mart.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(async () => {
      console.log('Falling back to load event...');
      return page.goto('https://g1mart.in/', { waitUntil: 'load', timeout: 20000 });
    });

    // Wait for splash screen dismissal or animations
    await page.waitForTimeout(4000);

    const rawPngPath = path.join(outputDir, 'g1-mart-raw.png');
    await page.screenshot({ path: rawPngPath, fullPage: false });
    console.log('Raw screenshot captured:', rawPngPath);

    const finalWebpPath = path.join(outputDir, 'g1-mart-preview.webp');
    await sharp(rawPngPath)
      .resize({ width: 1200, height: 750, fit: 'cover', position: 'top' })
      .webp({ quality: 88, effort: 6 })
      .toFile(finalWebpPath);

    console.log('Saved optimized preview:', finalWebpPath);
  } catch (err) {
    console.error('Capture failed:', err);
  } finally {
    await browser.close();
  }
}

async function run() {
  await downloadLogo();
  await captureG1Mart();
}

run();
