import type { Metadata, Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import { siteContent } from '@/content/site';

const fontDisplay = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#04060d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://orenty.in'),
  title: {
    default: 'Orenty | Build what\'s next',
    template: '%s | Orenty',
  },
  description: siteContent.meta.description,
  keywords: [
    'Orenty',
    'Orenty Software Solutions',
    'Startup Lab',
    'AI Automation',
    'Web Development',
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
    title: 'Orenty | Build what\'s next',
    description: siteContent.meta.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Orenty | Build what\'s next',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orenty | Build what\'s next',
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
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} dark`}
    >
      <body className="bg-background font-body text-foreground selection:bg-violet-600/40 selection:text-white">
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
