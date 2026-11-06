const fs = require('fs');
const path = require('path');

// 1. Update app/products/page.tsx
const productsPagePath = path.resolve(__dirname, '../app/products/page.tsx');
let ppContent = fs.readFileSync(productsPagePath, 'utf8');

// Update metadata
ppContent = ppContent.replace(
  "and Pujari.ai (spiritual tech).",
  "Pujari.ai (spiritual tech), and G1 Mart (e-commerce platform)."
);
ppContent = ppContent.replace(
  "Products we build ourselves.",
  "Products & Client Platforms."
);
ppContent = ppContent.replace(
  "We don’t just build for others. These four products are built, owned, and run by Orenty.",
  "Explore proprietary software built and owned by Orenty, alongside proven client platforms engineered to scale."
);

// Dynamic Badge
ppContent = ppContent.replace(
  `<Badge variant="building" className="text-xs">\n                    {prod.status}\n                  </Badge>`,
  `<Badge variant={prod.status === 'live' ? 'live' : 'building'} className="text-xs">\n                    {prod.status === 'live' ? 'Live · Client Work' : prod.status}\n                  </Badge>`
);
// Also CRLF
ppContent = ppContent.replace(
  `<Badge variant="building" className="text-xs">\r\n                    {prod.status}\r\n                  </Badge>`,
  `<Badge variant={prod.status === 'live' ? 'live' : 'building'} className="text-xs">\r\n                    {prod.status === 'live' ? 'Live · Client Work' : prod.status}\r\n                  </Badge>`
);

// Dynamic CTA button
ppContent = ppContent.replace(
  `<Button\n                  href={\`/products/\${prod.slug}#waitlist\`}\n                  variant="primary"\n                  className="w-full sm:w-auto"\n                >\n                  <span>{prod.ctaLabel}</span>\n                  <ArrowRight size={14} className="btn-arrow" />\n                </Button>`,
  `{prod.status === 'live' && prod.websiteUrl ? (
                  <a
                    href={prod.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto text-sm"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </a>
                ) : (
                  <Button
                    href={\`/products/\${prod.slug}#waitlist\`}
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </Button>
                )}`
);
// CRLF variant
ppContent = ppContent.replace(
  `<Button\r\n                  href={\`/products/\${prod.slug}#waitlist\`}\r\n                  variant="primary"\r\n                  className="w-full sm:w-auto"\r\n                >\r\n                  <span>{prod.ctaLabel}</span>\r\n                  <ArrowRight size={14} className="btn-arrow" />\r\n                </Button>`,
  `{prod.status === 'live' && prod.websiteUrl ? (
                  <a
                    href={prod.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto text-sm"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </a>
                ) : (
                  <Button
                    href={\`/products/\${prod.slug}#waitlist\`}
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </Button>
                )}`
);

fs.writeFileSync(productsPagePath, ppContent, 'utf8');
console.log('Updated app/products/page.tsx');

// 2. Update app/products/[slug]/page.tsx
const slugPagePath = path.resolve(__dirname, '../app/products/[slug]/page.tsx');
let slugContent = fs.readFileSync(slugPagePath, 'utf8');

const g1MartAudience = `  'g1-mart': {
    forWho: 'Households, families, and everyday shoppers looking for swift, dependable grocery and essentials delivery.',
    problemSolved: 'Replaces frustrating stock cancellations and sluggish commerce apps with instant inventory sync and rapid checkout.',
    keyBenefit: 'Sub-second mobile ordering, fresh quality guarantee, and real-time hyperlocal inventory updates.',
  },`;

if (!slugContent.includes("'g1-mart'")) {
  slugContent = slugContent.replace(
    "'pujari-ai': {",
    g1MartAudience + "\n  'pujari-ai': {"
  );
}

// Badge variant
slugContent = slugContent.replace(
  `<Badge variant="building" className="text-xs">\n                {product.status}\n              </Badge>`,
  `<Badge variant={product.status === 'live' ? 'live' : 'building'} className="text-xs">\n                {product.status === 'live' ? 'Live · Client Work' : product.status}\n              </Badge>`
);
slugContent = slugContent.replace(
  `<Badge variant="building" className="text-xs">\r\n                {product.status}\r\n              </Badge>`,
  `<Badge variant={product.status === 'live' ? 'live' : 'building'} className="text-xs">\r\n                {product.status === 'live' ? 'Live · Client Work' : product.status}\r\n              </Badge>`
);

// CTA buttons on slug page
slugContent = slugContent.replace(
  `<div className="flex items-center gap-4">\n            <Button href="#waitlist" variant="primary">\n              <span>{product.ctaLabel}</span>\n              <ArrowRight size={15} className="btn-arrow" />\n            </Button>\n          </div>`,
  `<div className="flex flex-wrap items-center gap-4">
            {product.status === 'live' && product.websiteUrl ? (
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>{product.ctaLabel}</span>
                <ArrowRight size={15} className="btn-arrow" />
              </a>
            ) : (
              <Button href="#waitlist" variant="primary">
                <span>{product.ctaLabel}</span>
                <ArrowRight size={15} className="btn-arrow" />
              </Button>
            )}
            <Button href="/contact" variant="secondary">
              <span>Discuss similar project</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Button>
          </div>`
);
slugContent = slugContent.replace(
  `<div className="flex items-center gap-4">\r\n            <Button href="#waitlist" variant="primary">\r\n              <span>{product.ctaLabel}</span>\r\n              <ArrowRight size={15} className="btn-arrow" />\r\n            </Button>\r\n          </div>`,
  `<div className="flex flex-wrap items-center gap-4">
            {product.status === 'live' && product.websiteUrl ? (
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>{product.ctaLabel}</span>
                <ArrowRight size={15} className="btn-arrow" />
              </a>
            ) : (
              <Button href="#waitlist" variant="primary">
                <span>{product.ctaLabel}</span>
                <ArrowRight size={15} className="btn-arrow" />
              </Button>
            )}
            <Button href="/contact" variant="secondary">
              <span>Discuss similar project</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Button>
          </div>`
);

fs.writeFileSync(slugPagePath, slugContent, 'utf8');
console.log('Updated app/products/[slug]/page.tsx');

// 3. Update components/Footer.tsx
const footerPath = path.resolve(__dirname, '../components/Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');

const footerG1Mart = `              <li>
                <Link href="/products/g1-mart" className="transition-colors hover:text-text">
                  G1 Mart
                </Link>
              </li>`;

if (!footerContent.includes('/products/g1-mart')) {
  footerContent = footerContent.replace(
    '<Link href="/products/pujari-ai"',
    `${footerG1Mart}\n              <li>\n                <Link href="/products/pujari-ai"`
  );
  fs.writeFileSync(footerPath, footerContent, 'utf8');
  console.log('Updated components/Footer.tsx');
}

// 4. Update app/work/page.tsx
const workPath = path.resolve(__dirname, '../app/work/page.tsx');
let workContent = fs.readFileSync(workPath, 'utf8');

const g1MartCaseStudy = `  {
    id: 'cs-01',
    client: 'G1 Mart',
    category: 'Hyperlocal E-Commerce Platform',
    result: 'High-performance Next.js storefront delivering sub-second catalogue browsing, live stock sync, and single-tap checkout.',
    slug: 'g1-mart',
    image: '/products/g1-mart-preview.webp',
    websiteUrl: 'https://g1mart.in/',
    isLive: true,
  },`;

if (!workContent.includes('G1 Mart')) {
  workContent = workContent.replace(
    /\{\s*id:\s*'cs-01'[\s\S]*?\},/,
    g1MartCaseStudy
  );
  fs.writeFileSync(workPath, workContent, 'utf8');
  console.log('Updated app/work/page.tsx');
}
