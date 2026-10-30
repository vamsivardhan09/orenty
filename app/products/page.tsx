import React from 'react';
import type { Metadata } from 'next';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import {
  SyncedInMediaWindow,
  FanbaseMediaWindow,
  JobPilotMediaWindow,
  PujariMediaWindow,
} from '@/components/MediaWindows';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Proprietary Products',
  description:
    'Explore Orenty proprietary products: SyncedIn (AI networking), Fanbase (creator economy), Job Pilot (AI career copilot), and Pujari.ai (spiritual tech).',
};

export default function ProductsPage() {
  const mediaMap: Record<string, React.ReactNode> = {
    syncedin: <SyncedInMediaWindow />,
    fanbase: <FanbaseMediaWindow />,
    'job-pilot': <JobPilotMediaWindow />,
    'pujari-ai': <PujariMediaWindow />,
  };

  const featureChipsMap: Record<string, string[]> = {
    syncedin: ['Semantic matchmaking', 'Intelligent intros', 'Spam-free messaging'],
    fanbase: ['Direct creator channels', 'Member tiers & drops', 'Sovereign relationships'],
    'job-pilot': ['ATS resume alignment', 'Interview simulator', 'Pipeline intelligence'],
    'pujari-ai': ['Vedic panchangam', 'Procedural puja guides', 'Authentic mantra audio'],
  };

  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-violet-600/15 blur-[150px]" />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-12 w-full text-center md:text-left scroll-mt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>DIVISION // 02 // PROPRIETARY BUILDS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]">
            <TextReveal as="span">Proprietary Products.</TextReveal>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-body leading-relaxed">
            Four focused software platforms designed, engineered, and incubated in-house. Transparently built in the open with active developer and early-adopter access.
          </p>
        </div>
      </section>

      {/* Products Showcase: Single-frame GlassCards with Media Windows and Grid Alignment */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(60px,8vh,100px)] w-full scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.products.map((prod) => (
            <GlassCard
              key={prod.slug}
              eyebrow={prod.category.toUpperCase()}
              badge="Building"
              badgeStatus="building"
              accentColor={prod.accentColor}
              media={mediaMap[prod.slug]}
              title={prod.name}
              tagline={prod.tagline}
              description={prod.description}
              features={featureChipsMap[prod.slug] || prod.features}
              footerLabel="View Details"
              footerHref={`/products/${prod.slug}`}
              ctaButton={{
                label: prod.ctaLabel,
                href: prod.ctaUrl,
              }}
            />
          ))}
        </div>
      </section>

      {/* Incubation Notice Banner */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(60px,8vh,100px)] w-full border-t border-white/[0.04]">
        <GlassCard accentColor="#8b5cf6" className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-2">
              <Sparkles size={14} />
              <span>CO-BUILD WITH ORENTY</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Want to earn ownership in one of these products?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-body">
              Through the Orenty Startup Lab, we release open architectural challenges for our product pipeline. Top contributors earn co-founding ownership.
            </p>
          </div>

          <MagneticButton href="/lab" variant="primary">
            Visit Startup Lab
          </MagneticButton>
        </GlassCard>
      </section>
    </div>
  );
}
