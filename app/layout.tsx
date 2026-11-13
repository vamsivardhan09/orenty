import type { Metadata, Viewport } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import { siteContent } from '@/content/site';

const fontDisplay = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontBody = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08080A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://orenty.in'),
  title: {
    default: 'Orenty | Software for ambitious businesses and products of our own',
    template: '%s | Orenty',
  },
  description: siteContent.meta.description,
  keywords: [
    'Orenty',
    'Orenty Software Solutions',
    'Startup Lab',
    'AI Automation',
    'Web Development',
    'Mobile Apps',
    'SyncedIn',
    'Fanbase',
    'Job Pilot',
    'Pujari.ai',
  ],
  authors: [{ name: 'Orenty' }],
  creator: 'Orenty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orenty.in',
    siteName: 'Orenty',
    title: 'Orenty | Software for ambitious businesses and products of our own',
    description: siteContent.meta.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Orenty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orenty | Software for ambitious businesses and products of our own',
    description: siteContent.meta.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} dark`}
    >
      <body className="bg-bg font-body text-text selection:bg-primary/40 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Orenty',
              url: 'https://orenty.in',
              logo: 'https://orenty.in/brand/orenty-logo-white.svg',
              description:
                'Orenty builds software for businesses, builds products of its own, and runs an open Startup Lab where builders can earn ownership.',
              sameAs: [
                'https://github.com/orenty',
                'https://x.com/orenty',
                'https://linkedin.com/company/orenty',
              ],
            }),
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
          Skip to main content
        </a>
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main id="main-content" className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
