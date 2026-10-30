const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetUrls = [
  { slug: 'syncedin', url: 'https://rightin.vercel.app/' },
  { slug: 'fanbase', url: 'https://fanbase-pink.vercel.app/' },
  { slug: 'job-pilot', url: 'https://jobpilot-jade-five.vercel.app/' },
];

async function main() {
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

  for (const item of targetUrls) {
    console.log(`\nFetching ${item.slug} from ${item.url}...`);
    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      
      const response = await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 }).catch(async (e) => {
        console.warn(`networkidle timeout for ${item.slug}, falling back to 'load'...`);
        return page.goto(item.url, { waitUntil: 'load', timeout: 20000 });
      });

      console.log(`Page loaded: ${item.slug} status:`, response ? response.status() : 'unknown');
      await page.waitForTimeout(2500); // Allow any entrance animations to complete

      const rawPngPath = path.join(outputDir, `${item.slug}-raw.png`);
      await page.screenshot({ path: rawPngPath, fullPage: false });
      console.log(`Raw screenshot captured for ${item.slug}`);

      // Process with sharp: crop to hero viewport, optimize as webp
      const finalWebpPath = path.join(outputDir, `${item.slug}-preview.webp`);
      await sharp(rawPngPath)
        .resize({ width: 1200, height: 750, fit: 'cover', position: 'top' })
        .webp({ quality: 88, effort: 6 })
        .toFile(finalWebpPath);

      console.log(`Saved optimized preview: ${finalWebpPath}`);
      await context.close();
    } catch (err) {
      console.error(`Error capturing ${item.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll captures finished!');
}

main().catch(console.error);
