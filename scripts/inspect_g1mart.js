const fs = require('fs');

const html = fs.readFileSync('g1mart-sample.html', 'utf8');

function extract(regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

console.log('Title:', extract(/<title>([^<]*)<\/title>/i));
console.log('Description:', extract(/name=["']description["']\s+content=["']([^"']*)["']/i));
console.log('OG Title:', extract(/property=["']og:title["']\s+content=["']([^"']*)["']/i));
console.log('OG Description:', extract(/property=["']og:description["']\s+content=["']([^"']*)["']/i));
console.log('OG Image:', extract(/property=["']og:image["']\s+content=["']([^"']*)["']/i));

// Check any brand keywords or text
const bodySample = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 500);
console.log('\nText sample:\n', bodySample);
