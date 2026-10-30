const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function getGzipSize(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath);
  return zlib.gzipSync(content).length;
}

function scanChunks(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanChunks(fullPath));
    } else if (file.endsWith('.js')) {
      const rawSize = stat.size;
      const gzipSize = getGzipSize(fullPath);
      results.push({ file: path.relative(process.cwd(), fullPath), rawSize, gzipSize });
    }
  }
  return results;
}

const chunksDir = path.join(process.cwd(), '.next', 'static');
const chunks = scanChunks(chunksDir);

console.log("=== ORENTY PRODUCTION JS CHUNKS (GZIPPED) ===");
let totalGzip = 0;
chunks.sort((a, b) => b.gzipSize - a.gzipSize);

chunks.forEach(c => {
  totalGzip += c.gzipSize;
  const kb = (c.gzipSize / 1024).toFixed(2);
  const rawKb = (c.rawSize / 1024).toFixed(2);
  console.log(`${kb.padStart(7)} KB (gzip) [raw: ${rawKb.padStart(7)} KB] - ${c.file}`);
});

console.log("==============================================");
console.log(`Total Static JS Size: ${(totalGzip / 1024).toFixed(2)} KB gzipped across all chunks`);
