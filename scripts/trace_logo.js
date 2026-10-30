const fs = require('fs');
const potrace = require('potrace');
const sharp = require('sharp');
const { execSync } = require('child_process');

async function process() {
  console.log("Preparing high-resolution crops...");

  // Right half is white on black.
  // Let's create an inverted, cleaned version for tracing with potrace:
  // Potrace expects dark shapes on light background.
  
  // 1. Full logo (mark + text)
  // Crop right half (512x512)
  const rightBuffer = await sharp('reference/logo-right-raw.png')
    .extract({ left: 70, top: 110, width: 372, height: 270 })
    .toBuffer();

  // Invert so shapes are black on white for potrace
  const invertedBuffer = await sharp(rightBuffer)
    .negate({ alpha: false })
    .threshold(128)
    .toBuffer();

  // Trace full logo
  potrace.trace(invertedBuffer, {
    turdSize: 2,
    optTolerance: 0.2,
    color: '#ffffff'
  }, (err, svgWhite) => {
    if (err) throw err;
    fs.writeFileSync('public/brand/orenty-logo-white.svg', svgWhite);
    console.log("Generated orenty-logo-white.svg");

    // Also black version
    const svgBlack = svgWhite.replace(/fill="#ffffff"/g, 'fill="#000000"').replace(/fill: #ffffff/g, 'fill: #000000');
    fs.writeFileSync('public/brand/orenty-logo-black.svg', svgBlack);
    console.log("Generated orenty-logo-black.svg");

    // Optimize with svgo
    try {
      execSync('npx svgo public/brand/orenty-logo-white.svg -o public/brand/orenty-logo-white.svg');
      execSync('npx svgo public/brand/orenty-logo-black.svg -o public/brand/orenty-logo-black.svg');
      console.log("SVGO optimization complete for full logos.");
    } catch (e) {
      console.warn("SVGO error:", e.message);
    }
  });

  // 2. Mark alone (icon alone)
  // Mark is roughly x: 155..355, y: 120..290
  const markBuffer = await sharp('reference/logo-right-raw.png')
    .extract({ left: 155, top: 120, width: 200, height: 170 })
    .negate({ alpha: false })
    .threshold(128)
    .toBuffer();

  potrace.trace(markBuffer, {
    turdSize: 2,
    optTolerance: 0.2,
    color: '#ffffff'
  }, (err, svgMarkWhite) => {
    if (err) throw err;
    fs.writeFileSync('public/brand/orenty-mark-white.svg', svgMarkWhite);
    console.log("Generated orenty-mark-white.svg");

    try {
      execSync('npx svgo public/brand/orenty-mark-white.svg -o public/brand/orenty-mark-white.svg');
      console.log("SVGO optimization complete for mark.");
    } catch (e) {
      console.warn("SVGO error:", e.message);
    }
  });
}

process().catch(console.error);
