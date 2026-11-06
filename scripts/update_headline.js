const fs = require('fs');

let site = fs.readFileSync('content/site.ts', 'utf8');

site = site.replace(
  "headline: 'Software engineered for what’s next.',",
  "headline: 'Build what’s next.',"
);

site = site.replace(
  "subheadline:\n      'High-performance web apps, custom platforms, and AI automation for ambitious businesses — plus proprietary products of our own.',",
  "subheadline:\n      'High-performance software, intelligent AI workflows, and digital products built for ambitious businesses.'"
);

fs.writeFileSync('content/site.ts', site, 'utf8');
console.log('Updated to Build what’s next.');
