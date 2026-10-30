const fs = require('fs');
const sharp = require('sharp');

async function main() {
  console.log("Generating brand assets...");

  // 1. Edge verification at 4x
  await sharp('public/brand/orenty-mark-white.svg', { density: 300 })
    .resize(800, 680)
    .png()
    .toFile('public/brand/orenty-mark-preview-4x.png');

  await sharp('public/brand/orenty-logo-white.svg', { density: 300 })
    .resize(1488, 1080)
    .png()
    .toFile('public/brand/orenty-logo-white-preview-4x.png');

  // 2. Favicon (PNG & ICO compatible)
  // Dark rounded background + glowing white mark
  const markFavicon = await sharp('public/brand/orenty-mark-white.svg')
    .resize(120, 102)
    .toBuffer();

  const iconBase = Buffer.from(
    `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#070913"/>
      <rect x="1" y="1" width="178" height="178" rx="35" fill="none" stroke="rgba(139, 92, 246, 0.4)" stroke-width="2"/>
    </svg>`
  );

  await sharp(iconBase)
    .composite([
      { input: markFavicon, top: 39, left: 30 }
    ])
    .png()
    .toFile('public/apple-touch-icon.png');

  // Also 32x32 and 48x48 favicon
  await sharp('public/apple-touch-icon.png')
    .resize(32, 32)
    .png()
    .toFile('public/favicon.png');

  await sharp('public/apple-touch-icon.png')
    .resize(32, 32)
    .toFile('public/favicon.ico');

  // 3. Open Graph Image (1200 x 630)
  // Deep navy cinematic space with violet/indigo nebula, glowing mark, typography
  const markOg = await sharp('public/brand/orenty-mark-white.svg')
    .resize(180, 153)
    .toBuffer();

  const ogSvg = Buffer.from(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nebula1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.55"/>
          <stop offset="50%" stop-color="#1e1035" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#04060d" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="beam" cx="50%" cy="30%" r="25%">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(167, 139, 250, 0.08)"/>
          <stop offset="100%" stop-color="rgba(167, 139, 250, 0)"/>
        </linearGradient>
      </defs>

      <!-- Deep space canvas -->
      <rect width="1200" height="630" fill="#04060e"/>
      <rect width="1200" height="630" fill="url(#nebula1)"/>
      <circle cx="600" cy="220" r="280" fill="url(#beam)"/>

      <!-- Star points -->
      <circle cx="220" cy="140" r="1.5" fill="#ffffff" opacity="0.6"/>
      <circle cx="340" cy="380" r="1.2" fill="#ffffff" opacity="0.4"/>
      <circle cx="980" cy="180" r="1.5" fill="#ffffff" opacity="0.7"/>
      <circle cx="860" cy="420" r="1.2" fill="#ffffff" opacity="0.5"/>
      <circle cx="150" cy="480" r="1" fill="#ffffff" opacity="0.3"/>
      <circle cx="1050" cy="520" r="1" fill="#ffffff" opacity="0.4"/>
      
      <!-- Central vertical beam subtle line -->
      <line x1="600" y1="0" x2="600" y2="630" stroke="rgba(196, 181, 253, 0.18)" stroke-width="1.5"/>
      <line x1="590" y1="0" x2="590" y2="630" stroke="rgba(196, 181, 253, 0.05)" stroke-width="1"/>
      <line x1="610" y1="0" x2="610" y2="630" stroke="rgba(196, 181, 253, 0.05)" stroke-width="1"/>

      <!-- Outer frame HUD border -->
      <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="rgba(139, 92, 246, 0.2)" stroke-width="1"/>
      <!-- HUD Corner Brackets -->
      <path d="M 55 75 L 55 55 L 75 55" fill="none" stroke="#a78bfa" stroke-width="2"/>
      <path d="M 1145 75 L 1145 55 L 1125 55" fill="none" stroke="#a78bfa" stroke-width="2"/>
      <path d="M 55 555 L 55 575 L 75 575" fill="none" stroke="#a78bfa" stroke-width="2"/>
      <path d="M 1145 555 L 1145 575 L 1125 575" fill="none" stroke="#a78bfa" stroke-width="2"/>

      <!-- Status badge -->
      <rect x="520" y="70" width="160" height="28" rx="14" fill="rgba(139, 92, 246, 0.12)" stroke="rgba(167, 139, 250, 0.3)" stroke-width="1"/>
      <circle cx="538" cy="84" r="4" fill="#10b981"/>
      <text x="550" y="89" fill="#c4b5fd" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="1.5">ORENTY.IN</text>

      <!-- Brand typography -->
      <text x="600" y="440" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" text-anchor="middle" letter-spacing="8">ORENTY</text>
      <text x="600" y="485" fill="#a78bfa" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" text-anchor="middle" letter-spacing="4">BUILD WHAT&apos;S NEXT</text>

      <!-- Subdivisions HUD callout -->
      <text x="600" y="540" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle" letter-spacing="1.5">SOFTWARE SOLUTIONS  //  PRODUCTS  //  STARTUP LAB</text>
    </svg>`
  );

  await sharp(ogSvg)
    .composite([
      { input: markOg, top: 165, left: 510 }
    ])
    .png()
    .toFile('public/og-image.png');

  console.log("All brand assets generated successfully!");
}

main().catch(console.error);
