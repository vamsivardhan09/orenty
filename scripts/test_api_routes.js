async function testApi() {
  console.log("Testing API routes against http://127.0.0.1:3000 ...");

  // 1. Valid contact submission
  const contactRes = await fetch('http://127.0.0.1:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Client',
      email: 'test@example.com',
      company: 'Test Org',
      service: 'Software Development',
      details: 'Architecture review inquiry.',
      budget: '$25k+',
    }),
  });
  const contactData = await contactRes.json();
  console.log("1. Valid Contact:", contactRes.status, contactData);

  // 2. Invalid contact submission (missing details)
  const invalidContactRes = await fetch('http://127.0.0.1:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'No Details',
      email: 'bad@example.com',
    }),
  });
  const invalidContactData = await invalidContactRes.json();
  console.log("2. Invalid Contact (400 expected):", invalidContactRes.status, invalidContactData);

  // 3. Valid Apply submission
  const applyRes = await fetch('http://127.0.0.1:3000/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Builder',
      email: 'builder@example.com',
      portfolioUrl: 'https://github.com/testbuilder',
      challengeOrIdea: 'CH-2601 Semantic Graph',
      solutionDetails: 'Drafted inverted index in Rust.',
      whyYou: 'Shipped high-concurrency systems.',
    }),
  });
  const applyData = await applyRes.json();
  console.log("3. Valid Apply:", applyRes.status, applyData);

  // 4. Invalid Apply submission (missing whyYou)
  const invalidApplyRes = await fetch('http://127.0.0.1:3000/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Missing Why',
      email: 'builder2@example.com',
      challengeOrIdea: 'CH-2602',
      solutionDetails: 'WebRTC pipeline',
    }),
  });
  const invalidApplyData = await invalidApplyRes.json();
  console.log("4. Invalid Apply (400 expected):", invalidApplyRes.status, invalidApplyData);
}

testApi().catch(console.error);
