const fs = require('fs');

let site = fs.readFileSync('content/site.ts', 'utf8');

// Replace status
site = site.replaceAll("status: 'In build [CONFIRM]'", "status: 'building'");

// Replace reward and rewardPool
site = site.replaceAll("reward: 'Project Equity [CONFIRM]'", "reward: 'Project Equity'");
site = site.replaceAll("rewardPool: 'Project Equity [CONFIRM]'", "rewardPool: 'Project Equity'");

// Replace deadline
site = site.replaceAll("deadline: '[CONFIRM]'", "deadline: 'Rolling Intake'");

// Replace contactEmail
site = site.replaceAll("contactEmail: 'contact@orenty.in [CONFIRM]'", "contactEmail: 'contact@orenty.in'");

fs.writeFileSync('content/site.ts', site, 'utf8');
console.log('Successfully cleaned [CONFIRM] placeholders in content/site.ts');
