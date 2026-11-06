export type ProductStatus = 'live' | 'building' | 'idea';

export interface Product {
  slug: string;
  name: string;
  outcome: string; // One outcome-led line
  tagline: string; // Alias for outcome
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
  shortDescription: string; // Alias for outcome
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
  code: string;
  title: string;
  problem: string;
  brief: string; // Alias for problem
  track: string;
  difficulty: 'Core' | 'Advanced' | 'Pioneer';
  reward: string;
  rewardPool: string; // Alias for reward
  deadline: string; // [CONFIRM]
}

export interface TrustMetric {
  value: string;
  label: string;
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
  // Backward compatible properties for subpages
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
    contactEmail: string; // [CONFIRM]
    socials: {
      label: string;
      href: string;
    }[];
  };
}

const productsList: Product[] = [
  {
    slug: 'syncedin',
    name: 'SyncedIn',
    outcome: 'An AI-powered network that connects people to the right people.',
    tagline: 'An AI-powered network that connects people to the right people.',
    description:
      'Cutting through noise with high-signal semantic matching. SyncedIn analyzes goals, expertise, and collaboration velocity to connect you with high-leverage collaborators and peers.',
    features: [
      'Semantic matchmaking based on active goals and project requirements',
      'Intelligent introductions with context-aware briefing cards',
      'Spam-free direct messaging secured by mutual relevance scoring',
    ],
    accentColor: '#7C5CFF', // Violet tint
    status: 'In build [CONFIRM]',
    ctaLabel: 'Apply for early access',
    ctaUrl: '/apply?track=syncedin',
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
      'The sovereign platform for modern creators. Unify subscriber relationships, direct digital drops, and interactive live rooms without algorithm interference.',
    features: [
      'Direct creator-to-community broadcast channels and live sessions',
      'Frictionless membership tiers, digital drops, and tipping pools',
      'Sovereign subscriber relationship management with zero algorithmic suppression',
    ],
    accentColor: '#FF66B2', // Pink logo tint
    status: 'In build [CONFIRM]',
    ctaLabel: 'Apply for creator beta',
    ctaUrl: '/apply?track=fanbase',
    category: 'Creator Economy',
    previewImage: '/products/fanbase-preview.webp',
    websiteUrl: 'https://fanbase-pink.vercel.app/',
  },
  {
    slug: 'job-pilot',
    name: 'Job Pilot',
    outcome: 'AI that tailors your resume and prepares you for interviews.',
    tagline: 'AI that tailors your resume and prepares you for interviews.',
    description:
      'Personal career copilot that aligns your experience to any job requisition in seconds, generates role-specific interview simulators, and monitors application momentum.',
    features: [
      'Deterministic ATS resume alignment tailored per role specification',
      'Real-time voice & text interview simulator with instant qualitative feedback',
      'Application pipeline intelligence and automated follow-up cadences',
    ],
    accentColor: '#38D6FF', // Cyan tint
    status: 'In build [CONFIRM]',
    ctaLabel: 'Apply for pilot beta',
    ctaUrl: '/apply?track=job-pilot',
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
      'Preserving ancient ritual wisdom through respectful modern intelligence. Real-time astrological panchangam calculations, step-by-step puja guidance, and phonetic mantra accompaniment.',
    features: [
      'Location-precise Vedic panchangam, muhurtha, and tithi calculations',
      'Step-by-step procedural puja guides with itemized samagri checklists',
      'Accurate Sanskrit mantra recitation aids with authentic phonetic cadence',
    ],
    accentColor: '#FFB547', // Amber tint
    status: 'In build [CONFIRM]',
    ctaLabel: 'Apply for Vedic access',
    ctaUrl: '/apply?track=pujari-ai',
    category: 'Spiritual Tech',
    previewImage: '/products/pujari-ai-preview.webp',
    websiteUrl: 'https://pujari.ai/',
  },
];

const processStepsList: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We break down your goals, evaluate technical feasibility, and map the fastest path to measurable value.',
  },
  {
    step: '02',
    title: 'Design',
    description:
      'Interactive prototypes, design systems, and architecture diagrams so every detail is approved before code.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Production engineering with TypeScript, automated test suites, and strict performance and security hygiene.',
  },
  {
    step: '04',
    title: 'Launch & grow',
    description:
      'Zero-downtime deployment, live performance monitoring, and iterative improvements that scale with your users.',
  },
];

export const siteContent: SiteContent = {
  meta: {
    title: 'Orenty | Software for businesses. Products of our own. Ownership for builders.',
    description:
      'Orenty designs and builds websites, apps and AI automation for growing businesses — and launches its own products through an open Startup Lab where the best builders earn equity.',
    siteUrl: 'https://orenty.in',
  },
  navigation: [
    { label: 'Services', href: '/software' },
    { label: 'Products', href: '/products' },
    { label: 'Startup Lab', href: '/lab' },
    { label: 'Contact', href: '/software#contact' },
  ],
  hero: {
    eyebrow: 'SOFTWARE · PRODUCTS · STARTUP LAB',
    headline: 'Software for businesses. Products of our own. Ownership for builders.',
    subheadline:
      'Orenty designs and builds websites, apps and AI automation for growing businesses — and launches its own products through an open Startup Lab where the best builders earn equity.',
    ctaPrimary: {
      label: 'Start a project',
      href: '/software#contact',
    },
    ctaSecondary: {
      label: 'See our products',
      href: '#products',
    },
    labLink: {
      label: 'Join the Startup Lab →',
      href: '/lab',
    },
  },
  trustStrip: [
    { value: '[CONFIRM]', label: 'projects delivered' },
    { value: '[CONFIRM]', label: 'clients served' },
    { value: '4', label: 'products live or in build' },
    { value: '[CONFIRM]', label: 'open challenges' },
  ],
  services: {
    eyebrow: 'SERVICES // WHAT WE BUILD FOR YOU',
    headline: 'We build what your business runs on.',
    subheadline:
      'One team for design, development and automation — from first idea to launch.',
    items: [
      {
        id: 'web-apps',
        title: 'Websites & Web Apps',
        outcome:
          'Fast, SEO-ready sites and dashboards that turn visitors into customers.',
        shortDescription:
          'Fast, SEO-ready sites and dashboards that turn visitors into customers.',
        bullets: [
          'High-performance Next.js architectures with sub-second page loads',
          'Custom operational dashboards, customer portals, and internal tools',
          'Clean semantic engineering built for search visibility and conversion',
        ],
        iconName: 'Globe',
        href: '/software#websites',
      },
      {
        id: 'mobile-apps',
        title: 'Mobile Apps',
        outcome: 'iOS/Android apps built from your idea to the store.',
        shortDescription:
          'iOS/Android apps built from your idea to the store.',
        bullets: [
          'High-fidelity native experiences for both Apple iOS and Google Android',
          'Offline capability, push notification pipelines, and biometric auth',
          'End-to-end App Store and Play Store compliance and submission',
        ],
        iconName: 'Smartphone',
        href: '/software#mobile',
      },
      {
        id: 'ai-automation',
        title: 'AI & Automation',
        outcome: 'Chatbots, voice agents and workflows that remove manual work.',
        shortDescription:
          'Chatbots, voice agents and workflows that remove manual work.',
        bullets: [
          'Custom autonomous agents with Retrieval-Augmented Generation (RAG)',
          'Automated data intake, lead routing, and customer support cadences',
          'Direct integration into your existing CRM, database, and Slack tools',
        ],
        iconName: 'Cpu',
        href: '/software#ai',
      },
      {
        id: 'growth-strategy',
        title: 'Growth & Product Strategy',
        outcome:
          'Positioning, funnels and roadmaps so what we build actually gets used.',
        shortDescription:
          'Positioning, funnels and roadmaps so what we build actually gets used.',
        bullets: [
          'Product-led growth mechanics, user journeys, and activation funnels',
          'Data-driven instrumentation and user behavior telemetry',
          'Technical SEO structures designed to capture high-intent demand',
        ],
        iconName: 'TrendingUp',
        href: '/software#growth',
      },
    ],
    processHeadline: 'How we work',
    process: processStepsList,
  },
  productsSection: {
    eyebrow: 'PRODUCTS // WHAT WE BUILD OURSELVES',
    headline: 'Products we build ourselves.',
    subheadline:
      "We don't only build for others. These are built, owned and run by Orenty.",
    items: productsList,
  },
  products: productsList,
  process: processStepsList,
  lab: {
    eyebrow: 'STARTUP LAB // CO-OWNERSHIP',
    headline: 'Solve the challenge. Earn ownership.',
    tagline: 'Idea to Challenge to Co-Ownership',
    description:
      'We post real startup problems. You submit a solution. The best builders form a team — and winners earn equity.',
    subheadline:
      'We post real startup problems. You submit a solution. The best builders form a team — and winners earn equity.',
    ownershipNote:
      'The best contributors can earn ownership in the product they help build. Terms are set per challenge.',
    steps: [
      {
        step: 1,
        title: 'Pick a challenge',
        detail:
          'Explore open technical and product problems published by Orenty with validated demand.',
      },
      {
        step: 2,
        title: 'Submit your solution',
        detail:
          'Submit your functioning code, prototype, algorithm, or UX architecture for the milestone.',
      },
      {
        step: 3,
        title: 'We review',
        detail:
          'Submissions are evaluated on code quality, user experience, and long-term retention thinking.',
      },
      {
        step: 4,
        title: 'Build together & earn equity',
        detail:
          'The top builders form the core founding team and earn real equity in the product they ship.',
      },
    ],
    challenges: [
      {
        id: 'chal-01',
        code: 'CH-01',
        title: 'Semantic Graph Matching Engine',
        problem:
          'Build sub-50ms vector indexing for professional skill graphs to match collaborators by active goals.',
        brief:
          'Build sub-50ms vector indexing for professional skill graphs to match collaborators by active goals.',
        track: 'AI Automation',
        difficulty: 'Advanced',
        reward: 'Founding Team Equity',
        rewardPool: 'Founding Team Equity',
        deadline: '[CONFIRM]',
      },
      {
        id: 'chal-02',
        code: 'CH-02',
        title: 'Zero-Latency Audio Stream Sync',
        problem:
          'Engineered WebRTC multi-peer audio broadcast rooms with synchronized live chat reactions under high jitter.',
        brief:
          'Engineered WebRTC multi-peer audio broadcast rooms with synchronized live chat reactions under high jitter.',
        track: 'Product Innovation',
        difficulty: 'Advanced',
        reward: 'Founding Team Equity',
        rewardPool: 'Founding Team Equity',
        deadline: '[CONFIRM]',
      },
      {
        id: 'chal-03',
        code: 'CH-03',
        title: 'Deterministic ATS Resume Parser',
        problem:
          'Extract structured JSON from arbitrary PDF resumes and align directly against multi-variable job requisitions.',
        brief:
          'Extract structured JSON from arbitrary PDF resumes and align directly against multi-variable job requisitions.',
        track: 'Full-Stack',
        difficulty: 'Core',
        reward: 'Founding Team Equity',
        rewardPool: 'Founding Team Equity',
        deadline: '[CONFIRM]',
      },
      {
        id: 'chal-04',
        code: 'CH-04',
        title: 'Astronomical Panchangam Engine',
        problem:
          'Compute high-precision Vedic solar-lunar coordinates client-side with offline ephemeris lookup.',
        brief:
          'Compute high-precision Vedic solar-lunar coordinates client-side with offline ephemeris lookup.',
        track: 'Growth',
        difficulty: 'Pioneer',
        reward: 'Founding Team Equity',
        rewardPool: 'Founding Team Equity',
        deadline: '[CONFIRM]',
      },
    ],
  },
  finalCta: {
    headline: 'Have an idea or a problem worth solving?',
    subheadline:
      "Tell us what you're building. We'll tell you how we'd build it.",
    ctaPrimary: {
      label: 'Start a project',
      href: '/software#contact',
    },
    ctaSecondary: {
      label: 'Join the Startup Lab',
      href: '/lab',
    },
  },
  footer: {
    description:
      'Orenty builds software for businesses, builds products of its own, and gives builders a path to ownership.',
    contactEmail: 'contact@orenty.in [CONFIRM]',
    socials: [
      { label: 'GitHub', href: 'https://github.com/orenty' },
      { label: 'Twitter / X', href: 'https://x.com/orenty' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/orenty' },
    ],
  },
};
