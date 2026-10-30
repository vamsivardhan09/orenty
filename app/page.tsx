import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 lg:px-12 py-20 text-center overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* HUD Top Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/30 px-4 py-1.5 text-xs font-mono tracking-widest text-violet-300 uppercase mb-8 backdrop-blur-md">
          <Sparkles size={13} className="text-violet-400" />
          <span>{siteContent.hero.badge}</span>
        </div>

        {/* Huge Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white uppercase leading-none">
          <TextReveal as="span">{siteContent.hero.headline}</TextReveal>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 text-glow-accent">
            <TextReveal as="span">{siteContent.hero.headlineAccent}</TextReveal>
          </span>
        </h1>

        {/* Small Muted Body */}
        <p className="mt-8 max-w-2xl text-base md:text-lg text-slate-400 leading-relaxed font-body">
          {siteContent.hero.subheadline}
        </p>

        {/* Single Call to Action: Apply */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href={siteContent.hero.ctaPrimary.href} variant="primary">
            {siteContent.hero.ctaPrimary.label}
            <ArrowRight size={14} />
          </MagneticButton>
          <MagneticButton href={siteContent.hero.ctaSecondary.href} variant="secondary">
            {siteContent.hero.ctaSecondary.label}
          </MagneticButton>
        </div>

        {/* HUD Info Teaser */}
        <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {siteContent.divisions.map((div) => (
            <GlassCard key={div.id} accentColor={div.accent} className="p-6">
              <HudBox label={`DIV // ${div.number}`} tag={div.badge} accentColor={div.accent}>
                <h3 className="font-display text-lg font-bold text-white mt-2">
                  {div.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {div.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-mono font-medium text-violet-300">
                  <Link href={div.href} className="hover:underline flex items-center gap-1">
                    Explore Division <ArrowRight size={12} />
                  </Link>
                </div>
              </HudBox>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
