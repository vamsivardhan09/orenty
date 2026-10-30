const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pujari.ai | Your AI Guide for Puja, Panchangam & Mantras</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #faf8f5;
      color: #1c1917;
      overflow-x: hidden;
    }
    .font-cinzel {
      font-family: 'Cinzel', serif;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between p-8 md:p-12">
  <!-- Top Nav -->
  <nav class="max-w-6xl w-full mx-auto flex items-center justify-between pb-8">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-cinzel font-bold text-xl shadow-sm">
        ॐ
      </div>
      <span class="font-bold text-2xl tracking-tight text-stone-900 font-cinzel">Pujari<span class="text-amber-600 font-sans font-bold">.ai</span></span>
    </div>
    <div class="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
      <span class="hover:text-amber-600 cursor-pointer">Daily Panchangam</span>
      <span class="hover:text-amber-600 cursor-pointer">Guided Pujas</span>
      <span class="hover:text-amber-600 cursor-pointer">Mantra Chants</span>
      <span class="hover:text-amber-600 cursor-pointer">Kundali Insights</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-sm font-semibold text-stone-700 cursor-pointer">Sign in</span>
      <button class="bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg">
        Explore Rituals
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <main class="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <!-- Left Hero Copy -->
    <div class="lg:col-span-6 space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 text-xs font-semibold tracking-wide">
        <span>✨ Powered by Vedic Intelligence Engine</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
        Your sacred AI guide for <span class="text-amber-600 underline decoration-amber-300">puja, panchangam</span> & mantras.
      </h1>

      <p class="text-base md:text-lg text-stone-600 leading-relaxed">
        Experience authentic Vedic rituals tailored to your gotra, planetary timings, and deity preferences. Step-by-step guidance with live audio chanting.
      </p>

      <div class="flex items-center gap-4 pt-2">
        <button class="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-amber-600/20 flex items-center gap-2">
          <span>Get Today's Panchangam</span>
          <span>→</span>
        </button>
        <button class="bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm">
          Listen to Mantras
        </button>
      </div>

      <div class="pt-4 flex items-center gap-6 text-xs text-stone-500">
        <div class="flex items-center gap-1.5 font-medium">
          <span class="text-amber-600">✓</span> 100% Authentic Scriptures
        </div>
        <div class="flex items-center gap-1.5 font-medium">
          <span class="text-amber-600">✓</span> Location-Accurate Muhurats
        </div>
        <div class="flex items-center gap-1.5 font-medium">
          <span class="text-amber-600">✓</span> Sanskrit & English Audio
        </div>
      </div>
    </div>

    <!-- Right Live Interactive Card -->
    <div class="lg:col-span-6">
      <div class="relative bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xl space-y-5">
        <!-- Card Header -->
        <div class="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <span class="text-xs font-bold text-amber-600 tracking-wider uppercase">TODAY'S VEDIC ALIGNMENT</span>
            <h3 class="text-base font-bold text-stone-900">Shukla Paksha Dashami</h3>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Shubh Muhurat Active
          </span>
        </div>

        <!-- Panchangam Grid -->
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <span class="text-[11px] text-stone-500 block">Tithi</span>
            <span class="text-sm font-bold text-stone-800">Dashami</span>
          </div>
          <div class="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <span class="text-[11px] text-stone-500 block">Nakshatra</span>
            <span class="text-sm font-bold text-stone-800">Rohini</span>
          </div>
          <div class="bg-stone-50 p-3 rounded-xl border border-stone-100">
            <span class="text-[11px] text-stone-500 block">Abhijit Muhurat</span>
            <span class="text-sm font-bold text-amber-700">11:46 - 12:34</span>
          </div>
        </div>

        <!-- AI Assistant Prompt preview -->
        <div class="bg-amber-50/50 rounded-xl p-4 border border-amber-200/60 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">ॐ</div>
            <span class="text-xs font-bold text-stone-800">Vedic Ritual Guide Assistant</span>
          </div>
          <p class="text-xs text-stone-600 italic">
            "Recommended ritual for today: Offer red flowers and recite the Gayatri Mantra 108 times during the Brahma Muhurta for mental clarity and prosperity."
          </p>
        </div>

        <!-- Mantra Audio Player widget -->
        <div class="bg-stone-900 text-white rounded-xl p-4 flex items-center justify-between shadow-inner">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">▶</div>
            <div>
              <div class="text-xs font-bold text-stone-100">Maha Mrityunjaya Mantra</div>
              <div class="text-[10px] text-stone-400">108 Chants • Sacred Chanting Mode</div>
            </div>
          </div>
          <span class="text-xs font-mono text-amber-400">12:45 / 45:00</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer note -->
  <footer class="max-w-6xl w-full mx-auto pt-6 text-center text-xs text-stone-400">
    © 2026 Pujari.ai • Dedicated to authentic Vedic spiritual wisdom.
  </footer>
</body>
</html>
`;

async function main() {
  const outputDir = path.resolve(__dirname, '../public/products');
  const tempHtmlPath = path.join(outputDir, 'pujari-mockup.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

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

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const rawPngPath = path.join(outputDir, 'pujari-ai-raw.png');
  await page.screenshot({ path: rawPngPath, fullPage: false });

  const finalWebpPath = path.join(outputDir, 'pujari-ai-preview.webp');
  await sharp(rawPngPath)
    .resize({ width: 1200, height: 750, fit: 'cover', position: 'top' })
    .webp({ quality: 88, effort: 6 })
    .toFile(finalWebpPath);

  console.log(`Saved optimized Pujari.ai preview: ${finalWebpPath}`);
  await browser.close();

  // Remove temporary HTML
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
}

main().catch(console.error);
