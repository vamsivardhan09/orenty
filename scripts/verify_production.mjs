// verify_production.mjs
async function runChecks() {
  const baseUrl = 'http://localhost:3000';
  console.log('--- Checking Production Routes ---');

  const routes = [
    '/',
    '/services',
    '/work',
    '/products',
    '/products/syncedin',
    '/products/fanbase',
    '/products/job-pilot',
    '/products/pujari-ai',
    '/careers',
    '/careers/semantic-graph-matching-engine',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/sitemap.xml',
    '/robots.txt',
  ];

  let routeFailures = 0;
  for (const r of routes) {
    try {
      const res = await fetch(`${baseUrl}${r}`);
      if (res.status === 200) {
        console.log(`[PASS] ${r} -> status ${res.status}`);
      } else {
        console.error(`[FAIL] ${r} -> status ${res.status}`);
        routeFailures++;
      }
    } catch (err) {
      console.error(`[ERR] ${r} -> ${err.message}`);
      routeFailures++;
    }
  }

  console.log('\n--- Checking API /api/contact ---');
  // 1. Legitimate submission
  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Founder',
        email: 'test@example.com',
        phone: '+919999999999',
        need: 'MVP build',
        budget: '₹5L - ₹10L',
        message: 'Looking to build an AI platform.',
        website: '' // honeypot empty
      })
    });
    const data = await res.json();
    console.log(`[PASS] /api/contact valid -> status ${res.status}:`, data);
  } catch (err) {
    console.error('[FAIL] /api/contact valid:', err);
  }

  // 2. Honeypot bot submission
  try {
    const resBot = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        message: 'Spam text',
        website: 'http://spam.org' // filled honeypot!
      })
    });
    const botData = await resBot.json();
    console.log(`[PASS] /api/contact honeypot caught -> status ${resBot.status}:`, botData);
  } catch (err) {
    console.error('[FAIL] /api/contact honeypot:', err);
  }

  console.log('\n--- Checking API /api/apply ---');
  // 3. Legitimate application submission
  try {
    const res = await fetch(`${baseUrl}/api/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Builder Alice',
        email: 'alice@example.com',
        portfolioUrl: 'https://github.com/alice',
        challengeSlug: 'semantic-graph-matching-engine',
        solutionUrl: 'https://github.com/alice/semantic-graph-solution',
        notes: 'Implemented with Rust and pgvector.',
        agreedToTerms: true,
        website: ''
      })
    });
    const data = await res.json();
    console.log(`[PASS] /api/apply valid -> status ${res.status}:`, data);
  } catch (err) {
    console.error('[FAIL] /api/apply valid:', err);
  }

  console.log('\n=== All Automated Verification Tests Finished ===');
}

runChecks();
