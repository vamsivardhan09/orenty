export type ProductStatus = 'live' | 'beta' | 'building' | 'idea';

export interface Product {
  slug: string;
  name: string;
  outcome: string; // One outcome-led line in plain English
  tagline: string;
  description: string;
  features: string[];
  accentColor: string; // product logo glow tint only
  status: string; // e.g. "In build [CONFIRM]"
  ctaLabel: string;
  ctaUrl: string;
  category: string;
  previewImage?: string;
  websiteUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  outcome: string; // One outcome sentence
  shortDescription: string;
  bullets: [string, string, string];
  iconName: 'Globe' | 'Smartphone' | 'Cpu' | 'TrendingUp';
  href: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface LabStep {
  step: number;
  title: string;
  detail: string;
}

export interface LabChallenge {
  id: string;
  slug: string;
  code: string;
  title: string;
  problem: string;
  brief: string;
  track: 'Engineering' | 'Design' | 'Growth' | 'AI';
  difficulty: 'Core' | 'Advanced' | 'Pioneer';
  reward: string;
  rewardPool: string;
  deadline: string; // [CONFIRM]
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
    labLink: {
      label: string;
      href: string;
    };
  };
  trustStrip: TrustMetric[];
  services: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    items: ServiceItem[];
    processHeadline: string;
    process: ProcessStep[];
  };
  productsSection: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    items: Product[];
  };
  products: Product[];
  process: ProcessStep[];
  lab: {
    eyebrow: string;
    headline: string;
    tagline: string;
    description: string;
    subheadline: string;
    steps: LabStep[];
    challenges: LabChallenge[];
    ownershipNote: string;
  };
  faq: FaqItem[];
  finalCta: {
    headline: string;
    subheadline: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
  };
  footer: {
    description: string;
    contactEmail: string;
    socials: {
      label: string;
      href: string;
    }[];
  };
}

export const productsList: Product[] = [
  {
    slug: 'syncedin',
    name: 'SyncedIn',
    outcome: 'An AI-powered network that connects people to the right people.',
    tagline: 'An AI-powered network that connects people to the right people.',
    description:
      'A professional network that removes the noise. SyncedIn matches collaborators and founders based on real goals, verified skills, and shared working styles.',
    features: [
      'Smart matching based on active goals and project needs',
      'Context-aware introductions so meetings are productive from day one',
      'Relevance scoring to eliminate cold sales spam and clutter',
    ],
    accentColor: '#7C5CFF', // Violet tint
    status: 'building',
    ctaLabel: 'Join the waitlist',
    ctaUrl: '/products/syncedin#waitlist',
    category: 'AI Networking',
    previewImage: '/products/syncedin-preview.webp',
    websiteUrl: 'https://rightin.vercel.app/',
  },
  {
    slug: 'fanbase',
    name: 'Fanbase',
    outcome: 'A home for creators and their communities.',
    tagline: 'A home for creators and their communities.',
    description:
      'A platform where creators own their audience. Direct communication channels, membership tiers, and digital products without algorithmic interference.',
    features: [
      'Direct broadcast channels and live sessions without algorithmic filtering',
      'Simple membership tiers, digital drops, and supporter contributions',
      'Direct ownership of subscriber relationships and email contacts',
    ],
    accentColor: '#FF66B2', // Pink tint
    status: 'building',
    ctaLabel: 'Join the waitlist',
    ctaUrl: '/products/fanbase#waitlist',
    category: 'Creator Platform',
    previewImage: '/products/fanbase-preview.webp',
    websiteUrl: 'https://fanbase-pink.vercel.app/',
  },
  {
    slug: 'job-pilot',
    name: 'Job Pilot',
    outcome: 'AI that tailors your resume and prepares you for interviews.',
    tagline: 'AI that tailors your resume and prepares you for interviews.',
    description:
      'A career assistant that adapts your resume for specific job postings in seconds and generates realistic practice interviews with real-time feedback.',
    features: [
      'Resume tailoring matched directly to job description keywords',
      'Interactive voice and text practice interviews with actionable tips',
      'Application tracking to organize deadlines and follow-up reminders',
    ],
    accentColor: '#38D6FF', // Cyan tint
    status: 'building',
    ctaLabel: 'Join the waitlist',
    ctaUrl: '/products/job-pilot#waitlist',
    category: 'Career Intelligence',
    previewImage: '/products/job-pilot-preview.webp',
    websiteUrl: 'https://jobpilot-jade-five.vercel.app/',
  },
  {
    slug: 'pujari-ai',
    name: 'Pujari.ai',
    outcome: 'Your AI guide for puja, panchangam and mantras.',
    tagline: 'Your AI guide for puja, panchangam and mantras.',
    description:
      'An accessible spiritual assistant providing location-accurate panchangam timings, step-by-step puja rituals, and clear phonetic mantra recitations.',
    features: [
      'Location-accurate daily panchangam, auspicious timings, and tithi details',
      'Step-by-step ritual instructions with simple ingredient checklists',
      'Clear audio guides and phonetic recitations for traditional mantras',
    ],
    accentColor: '#FFB547', // Amber tint
    status: 'building',
    ctaLabel: 'Join the waitlist',
    ctaUrl: '/products/pujari-ai#waitlist',
    category: 'Spiritual Tech',
    previewImage: '/products/pujari-ai-preview.webp',
    websiteUrl: 'https://pujari.ai/',
  },
  {
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
  },
];

export const processStepsList: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We understand your business goals, map user requirements, and define clear project milestones.',
  },
  {
    step: '02',
    title: 'Design',
    description:
      'Interactive wireframes, clear user flows, and complete design tokens before any code is written.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Modern web and mobile architectures with TypeScript, strict testing, and clean maintainable code.',
  },
  {
    step: '04',
    title: 'Launch & Grow',
    description:
      'Fast deployment, uptime monitoring, and ongoing support to help your product evolve with your users.',
  },
];

export const challengesList: LabChallenge[] = [
  {
    id: 'chal-01',
    slug: 'semantic-graph-matching-engine',
    code: 'CH-01',
    title: 'Semantic Graph Matching Engine',
    problem:
      'Build fast vector search for professional skill graphs to match collaborators based on active goals.',
    brief:
      'Build fast vector search for professional skill graphs to match collaborators based on active goals.',
    track: 'AI',
    difficulty: 'Advanced',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
  {
    id: 'chal-02',
    slug: 'zero-latency-audio-stream-sync',
    code: 'CH-02',
    title: 'Zero-Latency Audio Stream Sync',
    problem:
      'Build WebRTC multi-peer audio broadcast rooms with synchronized chat interactions under network jitter.',
    brief:
      'Build WebRTC multi-peer audio broadcast rooms with synchronized chat interactions under network jitter.',
    track: 'Engineering',
    difficulty: 'Advanced',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
  {
    id: 'chal-03',
    slug: 'deterministic-ats-resume-parser',
    code: 'CH-03',
    title: 'Deterministic ATS Resume Parser',
    problem:
      'Extract structured information from PDF resumes and align against multi-variable job requirements.',
    brief:
      'Extract structured information from PDF resumes and align against multi-variable job requirements.',
    track: 'Engineering',
    difficulty: 'Core',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
  {
    id: 'chal-04',
    slug: 'astronomical-panchangam-engine',
    code: 'CH-04',
    title: 'Astronomical Panchangam Engine',
    problem:
      'Compute high-precision Vedic solar and lunar coordinates client-side with offline ephemeris lookup.',
    brief:
      'Compute high-precision Vedic solar and lunar coordinates client-side with offline ephemeris lookup.',
    track: 'AI',
    difficulty: 'Pioneer',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
  {
    id: 'chal-05',
    slug: 'creator-community-interface-system',
    code: 'CH-05',
    title: 'Creator Community Interface System',
    problem:
      'Design an intuitive subscription drop and interactive live-room experience for mobile and web.',
    brief:
      'Design an intuitive subscription drop and interactive live-room experience for mobile and web.',
    track: 'Design',
    difficulty: 'Core',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
  {
    id: 'chal-06',
    slug: 'viral-collaboration-onboarding-loop',
    code: 'CH-06',
    title: 'Viral Collaboration Onboarding Loop',
    problem:
      'Engineer a self-reinforcing invitation and mutual-relevance onboarding mechanism for early network density.',
    brief:
      'Engineer a self-reinforcing invitation and mutual-relevance onboarding mechanism for early network density.',
    track: 'Growth',
    difficulty: 'Advanced',
    reward: 'Project Equity',
    rewardPool: 'Project Equity',
    deadline: 'Rolling Intake',
  },
];

export const siteContent: SiteContent = {
  meta: {
    title: 'Orenty | Software for ambitious businesses and products of our own',
    description:
      'Websites, apps and AI automation for growing companies. Plus an open Startup Lab where top builders can earn ownership in what we launch.',
    siteUrl: 'https://orenty.in',
  },
  navigation: [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Work', href: '/work' },
    { label: 'Careers', href: '/careers' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  hero: {
    eyebrow: 'SOFTWARE · PRODUCTS · LAB',
    headline: 'Build what’s next.',
    subheadline:
      'Websites, apps and AI automation for growing companies. Plus a Startup Lab where top builders can earn ownership in what we launch.',
    ctaPrimary: {
      label: 'Start a project',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'See our products',
      href: '/products',
    },
    labLink: {
      label: 'Explore Startup Lab →',
      href: '/careers',
    },
  },
  trustStrip: [
    { value: '[CONFIRM]', label: 'projects delivered' },
    { value: '[CONFIRM]', label: 'clients served' },
    { value: '5', label: 'products & works' },
    { value: 'Open', label: 'Startup Lab' },
  ],
  services: {
    eyebrow: 'SERVICES',
    headline: 'What we build for clients.',
    subheadline:
      'From custom web applications to automated AI workflows, we deliver software that moves your business forward.',
    items: [
      {
        id: 'web-apps',
        title: 'Websites & Web Apps',
        outcome: 'Fast, modern sites and web platforms built to convert visitors.',
        shortDescription: 'Fast, modern sites and web platforms built to convert visitors.',
        bullets: [
          'High-performance Next.js architectures with fast load times',
          'Custom client portals, administrative dashboards, and internal tools',
          'Responsive design, clean code, and solid search engine foundations',
        ],
        iconName: 'Globe',
        href: '/services#websites',
      },
      {
        id: 'mobile-apps',
        title: 'Mobile Apps',
        outcome: 'iOS and Android applications designed for everyday usability.',
        shortDescription: 'iOS and Android applications designed for everyday usability.',
        bullets: [
          'Cross-platform mobile applications with smooth native performance',
          'Push notifications, offline functionality, and secure authentication',
          'Full preparation and guidance for App Store and Play Store submission',
        ],
        iconName: 'Smartphone',
        href: '/services#mobile',
      },
      {
        id: 'ai-automation',
        title: 'AI & Automation',
        outcome: 'Automate repetitive workflows and connect smart assistants.',
        shortDescription: 'Automate repetitive workflows and connect smart assistants.',
        bullets: [
          'Custom conversational assistants and customer support automations',
          'Automated data processing, lead capture, and CRM syncing',
          'Integrations with your existing tools, databases, and APIs',
        ],
        iconName: 'Cpu',
        href: '/services#ai',
      },
      {
        id: 'growth-strategy',
        title: 'Growth & Product Strategy',
        outcome: 'Product roadmaps and analytics to ensure what we build delivers results.',
        shortDescription: 'Product roadmaps and analytics to ensure what we build delivers results.',
        bullets: [
          'Product roadmap planning and MVP scoping for rapid validation',
          'Analytics setup and user journey tracking to measure real outcomes',
          'Performance optimization and user experience refinements',
        ],
        iconName: 'TrendingUp',
        href: '/services#growth',
      },
    ],
    processHeadline: 'How we work',
    process: processStepsList,
  },
  productsSection: {
    eyebrow: 'PRODUCTS & OUR WORKS',
    headline: 'Software products and client platforms.',
    subheadline: 'Proprietary products we build and live client platforms we engineer.',
    items: productsList,
  },
  products: productsList,
  process: processStepsList,
  lab: {
    eyebrow: 'STARTUP LAB',
    headline: 'Build with us. Earn ownership.',
    tagline: 'Idea to Solution to Co-Ownership',
    description:
      'We post real startup problems. You submit a solution. The best builders may earn ownership in the products we launch.',
    subheadline:
      'We post real startup problems. You submit a solution. The best builders may earn ownership in the products we launch.',
    ownershipNote:
      'The best contributors can earn ownership in the product they help build. Terms are set per challenge.',
    steps: [
      {
        step: 1,
        title: 'Pick a challenge',
        detail:
          'Explore open engineering and product challenges with defined milestones.',
      },
      {
        step: 2,
        title: 'Submit your solution',
        detail:
          'Submit your working code, prototype, or architecture proposal.',
      },
      {
        step: 3,
        title: 'We review',
        detail:
          'Submissions are evaluated on solution quality, user experience, and architecture.',
      },
      {
        step: 4,
        title: 'Build together & earn equity',
        detail:
          'The best builders join the project team and may earn equity in the product.',
      },
    ],
    challenges: challengesList,
  },
  faq: [
    {
      question: 'What do you build?',
      answer:
        'We design and develop custom websites, web applications, mobile apps (iOS & Android), and AI automations. We also launch our own proprietary software products.',
    },
    {
      question: 'How long does a website or app take?',
      answer:
        'Most website and MVP web app projects take between 3 to 8 weeks depending on scope, integrations, and design requirements. We agree on fixed milestones before kickoff.',
    },
    {
      question: 'How much does a project cost?',
      answer:
        'Pricing depends on the scope, timeline, and complexity of what you need built [CONFIRM pricing tiers]. We provide transparent, fixed-scope proposals so there are no surprise charges.',
    },
    {
      question: 'How do we work together?',
      answer:
        'We follow a simple four-step process: Discover, Design, Build, and Launch. You get regular demos, direct communication via Slack or WhatsApp, and complete code ownership.',
    },
    {
      question: 'Do you build custom AI automations?',
      answer:
        'Yes. We build intelligent chatbots, retrieval-augmented assistants, automated document parsers, and custom integrations that connect directly to your CRM, databases, and communication channels.',
    },
    {
      question: 'How does the Startup Lab work?',
      answer:
        'We publish real challenges for products we are building. Anyone can submit a solution. The top contributors are invited to join the project team and may earn equity in the product they help create.',
    },
  ],
  finalCta: {
    headline: "Let's build something iconic.",
    subheadline:
      'Bring your vision. We engineer custom software, scalable AI architectures, and category-defining digital products.',
    ctaPrimary: {
      label: 'Start a project',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Book a call',
      href: '/contact#book-a-call',
    },
  },
  footer: {
    description:
      'We build software for ambitious businesses and launch products of our own.',
    contactEmail: 'contact@orenty.in',
    socials: [
      { label: 'X', href: 'https://x.com/orenty' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/orenty' },
    ],
  },
};
