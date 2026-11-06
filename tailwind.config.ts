import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        'bg-elevated': 'var(--surface-2)',
        primary: {
          DEFAULT: 'var(--primary)',
          glow: 'var(--primary-glow)',
        },
        secondary: 'var(--secondary)',
        warm: 'var(--warm)',
        border: 'var(--border)',
        'border-top': 'var(--border-top)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          glass: 'var(--glass)',
          'glass-strong': 'var(--glass-strong)',
          border: 'var(--border)',
          'border-top': 'var(--border-top)',
        },
        text: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
      },
      borderRadius: {
        card: 'var(--r-card)',
        md: 'var(--r-md)',
        pill: 'var(--r-pill)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      padding: {
        section: 'var(--section-pad)',
      },
    },
  },
  plugins: [],
};

export default config;
