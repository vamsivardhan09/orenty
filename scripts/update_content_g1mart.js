const fs = require('fs');
const path = require('path');

const sitePath = path.resolve(__dirname, '../content/site.ts');
let content = fs.readFileSync(sitePath, 'utf8');

const g1MartProduct = `  {
    slug: 'g1-mart',
    name: 'G1 Mart',
    outcome: 'Hyperlocal fresh groceries and daily essentials with sub-second ordering.',
    tagline: 'Fresh groceries and daily essentials delivered to your door.',
    description:
      'A full-stack hyperlocal grocery commerce platform engineered for ultra-fast load times, seamless checkout, and real-time inventory management across thousands of daily staple products.',
    features: [
      'Hyperlocal catalog spanning fresh staples, dairy, snacks, and personal essentials',
      'Fast single-tap mobile checkout flow with live order routing',
      'High-performance Next.js storefront engineered for instant sub-second browsing',
    ],
    accentColor: '#10B981', // Emerald / fresh grocery tint
    status: 'live',
    ctaLabel: 'Visit live store',
    ctaUrl: 'https://g1mart.in/',
    category: 'Client Work · E-Commerce',
    previewImage: '/products/g1-mart-preview.webp',
    websiteUrl: 'https://g1mart.in/',
  },`;

if (!content.includes("'g1-mart'")) {
  // Add g1-mart right after pujari-ai
  const pujariEndIdx = content.indexOf("websiteUrl: 'https://pujari.ai/',");
  if (pujariEndIdx !== -1) {
    const closingBracketIdx = content.indexOf('},', pujariEndIdx);
    if (closingBracketIdx !== -1) {
      const insertionPoint = closingBracketIdx + 2;
      content = content.slice(0, insertionPoint) + '\n' + g1MartProduct + content.slice(insertionPoint);
      console.log('Inserted g1-mart into productsList');
    }
  }

  // Update trustStrip 4 products in build -> 5 products & works
  content = content.replace(
    "{ value: '4', label: 'products in build' }",
    "{ value: '5', label: 'products & works' }"
  );

  // Update productsSection eyebrow & headline
  content = content.replace(
    "eyebrow: 'PRODUCTS',\n    headline: 'Products we build ourselves.',\n    subheadline: 'Built, owned and run by Orenty.',",
    "eyebrow: 'PRODUCTS & OUR WORKS',\n    headline: 'Software products and client platforms.',\n    subheadline: 'Proprietary products we build and live client platforms we engineer.',"
  );
  // Also check with \r\n
  content = content.replace(
    "eyebrow: 'PRODUCTS',\r\n    headline: 'Products we build ourselves.',\r\n    subheadline: 'Built, owned and run by Orenty.',",
    "eyebrow: 'PRODUCTS & OUR WORKS',\r\n    headline: 'Software products and client platforms.',\r\n    subheadline: 'Proprietary products we build and live client platforms we engineer.',"
  );

  fs.writeFileSync(sitePath, content, 'utf8');
  console.log('Successfully updated content/site.ts');
} else {
  console.log('g1-mart already in content/site.ts');
}
