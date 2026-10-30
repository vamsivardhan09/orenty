const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../content/site.ts');
let code = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF first for clean regex/string replacement
code = code.replace(/\r\n/g, '\n');

// 1. Update Product interface
code = code.replace(
  `category: string;
}`,
  `category: string;
  previewImage?: string;
  websiteUrl?: string;
}`
);

// 2. Update SyncedIn
code = code.replace(
  `category: 'AI Networking',
    },`,
  `category: 'AI Networking',
      previewImage: '/products/syncedin-preview.webp',
      websiteUrl: 'https://rightin.vercel.app/',
    },`
);

// 3. Update Fanbase
code = code.replace(
  `category: 'Creator Economy',
    },`,
  `category: 'Creator Economy',
      previewImage: '/products/fanbase-preview.webp',
      websiteUrl: 'https://fanbase-pink.vercel.app/',
    },`
);

// 4. Update Job Pilot
code = code.replace(
  `category: 'Career Intelligence',
    },`,
  `category: 'Career Intelligence',
      previewImage: '/products/job-pilot-preview.webp',
      websiteUrl: 'https://jobpilot-jade-five.vercel.app/',
    },`
);

// 5. Update Pujari.ai
code = code.replace(
  `category: 'Spiritual Tech',
    },`,
  `category: 'Spiritual Tech',
      previewImage: '/products/pujari-ai-preview.webp',
      websiteUrl: 'https://pujari.ai/',
    },`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('content/site.ts successfully updated with preview images and website URLs!');
