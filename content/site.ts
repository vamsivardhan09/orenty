export type ProductStatus = 'live' | 'building' | 'idea';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  accentColor: string; // hex or tailwind accent
  status: ProductStatus;
  ctaLabel: string;
  ctaUrl: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  bullets: [string, string, string];
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Division {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  accent: string;
  badge: string;
}

export interface LabChallenge {
  id: string;
  code: string;
  title: string;
  track: 'AI Automation' | 'Full-Stack' | 'Product Innovation' | 'Growth';
  difficulty: 'Core' | 'Advanced' | 'Pioneer';
  brief: string;
  rewardPool: string; // "Ownership / Equity Pool"
  status: 'Open' | 'Under Review';
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
    tagline: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
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
  divisions: Division[];
  products: Product[];
  services: Service[];
  process: ProcessStep[];
  lab: {
    badge: string;
    headline: string;
    tagline: string;
    description: string;
    steps: {
      step: string;
      title: string;
      detail: string;
    }[];
    ownershipNote: string;
    challenges: LabChallenge[];
  };
  footer: {
    tagline: string;
    ownershipNotice: string;
    contactEmailPlaceholder: string;
    links: {
      label: string;
      href: string;
    }[];
    socials: {
      label: string;
      href: string;
    }[];
  };
}

export const siteContent: SiteContent = {
  meta: {
    title: 'Orenty | Build what\'s next',
    description: 'Orenty builds software and AI for businesses, creates proprietary products, and incubates teams through the Startup Lab.',
    siteUrl: 'https://orenty.in',
    tagline: 'Build what\'s next.',
  },
  navigation: [
    { label: 'Software', href: '/software' },
    { label: 'Products', href: '/products' },
    { label: 'Lab', href: '/lab' },
    { label: 'Apply', href: '/apply' },
  ],
  hero: {
    badge: 'ORENTY // NEXT-GEN ENGINEERING & VENTURE LAB',
    headline: 'Build what\'s',
    headlineAccent: 'next.',
    subheadline:
      'We engineer intelligent software for ambitious businesses, build category-defining proprietary products, and back top problem solvers with product ownership.',
    ctaPrimary: {
      label: 'Apply',
      href: '/apply',
    },
    ctaSecondary: {
      label: 'Explore Products',
      href: '/products',
    },
  },
  divisions: [
    {
      id: 'software',
      number: '01',
      title: 'Orenty Software Solutions',
      tagline: 'Bespoke Engineering & AI Automation',
      description:
        'End-to-end software development, intelligent workflow automation, and scalable cloud architectures built for forward-thinking businesses.',
      href: '/software',
      accent: '#6366f1',
      badge: 'CLIENT SOLUTIONS',
    },
    {
      id: 'products',
      number: '02',
      title: 'Proprietary Products',
      tagline: 'Focused Solutions Built In-House',
      description:
        'A portfolio of purpose-built platforms spanning professional networking, creator economies, career acceleration, and cultural AI.',
      href: '/products',
      accent: '#8b5cf6',
      badge: '4 ACTIVE BUILDS',
    },
    {
      id: 'lab',
      number: '03',
      title: 'Startup Lab',
      tagline: 'Idea to Challenge to Co-Ownership',
      description:
        'Solve breakthrough startup challenges. Top contributors form dedicated founding teams and earn real product ownership.',
      href: '/lab',
      accent: '#ec4899',
      badge: 'CHALLENGES OPEN',
    },
  ],
  products: [
    {
      slug: 'syncedin',
      name: 'SyncedIn',
      tagline: 'An AI-powered network that connects people to the right people.',
      description:
        'Cutting through noise with high-signal semantic matching. SyncedIn analyzes goals, expertise, and collaboration velocity to connect you with high-leverage collaborators and peers.',
      features: [
        'Semantic matchmaking based on active goals and project requirements',
        'Intelligent introductions with context-aware briefing cards',
        'Spam-free direct messaging secured by mutual relevance scoring',
      ],
      accentColor: '#8b5cf6', // Violet
      status: 'building',
      ctaLabel: 'Apply to Early Access',
      ctaUrl: '/apply?track=syncedin',
      category: 'AI Networking',
    },
    {
      slug: 'fanbase',
      name: 'Fanbase',
      tagline: 'A home for creators and their communities.',
      description:
        'The sovereign platform for modern creators. Unify subscriber relationships, direct digital drops, and interactive live rooms without algorithm interference.',
      features: [
        'Direct creator-to-community broadcast channels and live sessions',
        'Frictionless membership tiers, digital drops, and tipping pools',
        'Sovereign subscriber relationship management with zero algorithmic suppression',
      ],
      accentColor: '#ec4899', // Pink
      status: 'building',
      ctaLabel: 'Apply for Creator Beta',
      ctaUrl: '/apply?track=fanbase',
      category: 'Creator Economy',
    },
    {
      slug: 'job-pilot',
      name: 'Job Pilot',
      tagline: 'AI that tailors your resume and prepares you for interviews.',
      description:
        'Personal career copilot that aligns your experience to any job requisition in seconds, generates role-specific interview simulators, and monitors application momentum.',
      features: [
        'Deterministic ATS resume alignment tailored per role specification',
        'Real-time voice & text interview simulator with instant qualitative feedback',
        'Application pipeline intelligence and automated follow-up cadences',
      ],
      accentColor: '#06b6d4', // Cyan
      status: 'building',
      ctaLabel: 'Apply for Pilot Beta',
      ctaUrl: '/apply?track=job-pilot',
      category: 'Career Intelligence',
    },
    {
      slug: 'pujari-ai',
      name: 'Pujari.ai',
      tagline: 'Your AI guide for puja, panchangam and mantras.',
      description:
        'Preserving ancient ritual wisdom through respectful modern intelligence. Real-time astrological panchangam calculations, step-by-step puja guidance, and phonetic mantra accompaniment.',
      features: [
        'Location-precise Vedic panchangam, muhurtha, and tithi calculations',
        'Step-by-step procedural puja guides with itemized samagri checklists',
        'Accurate Sanskrit mantra recitation aids with authentic phonetic cadence',
      ],
      accentColor: '#f59e0b', // Amber
      status: 'building',
      ctaLabel: 'Apply for Vedic Access',
      ctaUrl: '/apply?track=pujari-ai',
      category: 'Spiritual Tech',
    },
  ],
  services: [
    {
      id: 'software-dev',
      title: 'Software Development',
      shortDescription: 'Modern, high-performance web and cloud architectures engineered for resilience.',
      bullets: [
        'Full-stack Next.js, Node.js, and distributed microservices',
        'High-concurrency database architecture and caching strategies',
        'Comprehensive automated testing and zero-downtime CI/CD deployment',
      ],
      iconName: 'Code2',
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      shortDescription: 'Cinematic digital flagships with fluid interactions, 3D elements, and 60fps performance.',
      bullets: [
        'Interactive WebGL, Three.js, and GSAP motion design',
        'Accessible, mobile-responsive, and pixel-precise UI implementation',
        'Sub-second LCP optimization and Core Web Vitals excellence',
      ],
      iconName: 'Globe',
    },
    {
      id: 'ai-automation',
      title: 'AI Automation',
      shortDescription: 'Practical generative AI agents and deterministic workflow automations.',
      bullets: [
        'Custom LLM orchestration and Retrieval-Augmented Generation (RAG)',
        'Autonomous customer service, lead qualification, and data enrichment agents',
        'Internal enterprise tool augmentation and automated operational pipelines',
      ],
      iconName: 'Cpu',
    },
    {
      id: 'growth-strategy',
      title: 'Growth Strategy',
      shortDescription: 'Technical product marketing and data-driven user acquisition loops.',
      bullets: [
        'Product-led growth (PLG) mechanics and referral funnel instrumentation',
        'Technical programmatic SEO architecture and search intent capture',
        'Data tracking pipelines, cohort analytics, and conversion rate optimization',
      ],
      iconName: 'TrendingUp',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Discover',
      description: 'We deconstruct your core problem, evaluate technical viability, and map high-leverage business objectives.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'We craft high-fidelity architectural schematics, cinematic user interfaces, and interaction prototypes.',
    },
    {
      step: '03',
      title: 'Build',
      description: 'We engineer with strict TypeScript hygiene, robust automated testing, and modern high-throughput stacks.',
    },
    {
      step: '04',
      title: 'Grow',
      description: 'We deploy to production, analyze real-world telemetry, and iterate relentlessly to compound growth.',
    },
  ],
  lab: {
    badge: 'ORENTY STARTUP LAB // INCUBATION ENGINE',
    headline: 'Solve the challenge.',
    tagline: 'Earn the equity.',
    description:
      'We validate high-potential product ideas and publish them as open engineering challenges. The top contributors form the founding build team and earn real product ownership.',
    steps: [
      {
        step: '01',
        title: 'Idea',
        detail: 'Orenty identifies and stress-tests high-potential startup concepts with market demand.',
      },
      {
        step: '02',
        title: 'Challenge',
        detail: 'The problem is structured into specific technical and product architectural milestones.',
      },
      {
        step: '03',
        title: 'Submissions',
        detail: 'Builders submit functioning prototypes, algorithm solutions, or UX paradigms.',
      },
      {
        step: '04',
        title: 'Team',
        detail: 'The most capable and dedicated contributors are selected to form the founding team.',
      },
      {
        step: '05',
        title: 'Ownership',
        detail: 'The team builds toward release and earns product ownership in the venture.',
      },
    ],
    ownershipNote:
      'The best contributors can earn ownership in the product they help build. Terms are set per challenge.',
    challenges: [
      {
        id: 'chal-01',
        code: 'CH-2601',
        title: 'High-Concurrency Semantic Graph Matching for SyncedIn',
        track: 'AI Automation',
        difficulty: 'Advanced',
        brief:
          'Design and implement a low-latency graph indexing pipeline that matches professional user embeddings with sub-50ms latency at 100k queries/sec.',
        rewardPool: 'Founding Team Co-Ownership',
        status: 'Open',
      },
      {
        id: 'chal-02',
        code: 'CH-2602',
        title: 'Zero-Egress Multi-Camera Real-time Stream Orchestrator',
        track: 'Full-Stack',
        difficulty: 'Pioneer',
        brief:
          'Build an ultra-low latency WebRTC interactive broadcast layer for Fanbase creator rooms with client-side audio normalization.',
        rewardPool: 'Founding Team Co-Ownership',
        status: 'Open',
      },
      {
        id: 'chal-03',
        code: 'CH-2603',
        title: 'Deterministic Multilingual Resume-Requisition Alignment',
        track: 'Product Innovation',
        difficulty: 'Core',
        brief:
          'Develop an explainable parser that scores resume fit against ambiguous job descriptions without generative hallucination.',
        rewardPool: 'Founding Team Co-Ownership',
        status: 'Open',
      },
      {
        id: 'chal-04',
        code: 'CH-2604',
        title: 'Offline-First Ephemeris & Panchangam Calculation Engine',
        track: 'Product Innovation',
        difficulty: 'Core',
        brief:
          'Implement astronomical algorithms in WebAssembly to compute planetary longitudes and tithis offline within 0.001 degree precision.',
        rewardPool: 'Founding Team Co-Ownership',
        status: 'Open',
      },
    ],
  },
  footer: {
    tagline: 'Build what\'s next.',
    ownershipNotice:
      'The best contributors can earn ownership in the product they help build. Terms are set per challenge.',
    contactEmailPlaceholder: 'contact@orenty.in',
    links: [
      { label: 'Software Solutions', href: '/software' },
      { label: 'Products', href: '/products' },
      { label: 'Startup Lab', href: '/lab' },
      { label: 'Apply', href: '/apply' },
    ],
    socials: [
      { label: 'X (Twitter)', href: 'https://x.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
};
