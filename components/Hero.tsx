'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { siteContent } from '@/content/site';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

// Lazy-load the WebGL 3D Canvas with ssr: false
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a071c] via-[#05060f] to-[#04060d]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-24 bg-gradient-to-b from-violet-400/30 via-violet-600/15 to-transparent blur-2xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[120px]" />
    </div>
  ),
});

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] max-h-[820px] flex flex-col justify-center items-center px-6 lg:px-12 pt-6 pb-12 text-center overflow-hidden">
      {/* 3D WebGL Shader + Logo Scene */}
      <HeroCanvas />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top HUD Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-[11px] font-mono tracking-widest text-violet-300 uppercase mb-4 sm:mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)]">
          <Sparkles size={12} className="text-violet-400" />
          <span>{siteContent.hero.badge}</span>
        </div>

        {/* Display Headline: Clamped so 'BUILD WHAT\'S NEXT.' fits in 2 lines on desktop, 3 on mobile */}
        <h1 className="font-display text-[clamp(2.4rem,4.8vw,4.4rem)] font-extrabold tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] [text-wrap:balance]">
          <TextReveal as="span">{siteContent.hero.headline}</TextReveal>{' '}
          <span className="relative inline-block">
            {/* Duplicate blurred glow layer strictly BEHIND the text */}
            <span
              className="pointer-events-none absolute inset-0 select-none blur-xl opacity-60 bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent"
              aria-hidden="true"
            >
              {siteContent.hero.headlineAccent}
            </span>
            {/* Crisp, razor-sharp foreground text with filter: none and opacity: 1 */}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-purple-300 opacity-100 filter-none">
              <TextReveal as="span">{siteContent.hero.headlineAccent}</TextReveal>
            </span>
          </span>
        </h1>

        {/* Muted Body Copy: visible without scrolling on 1366x768 */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300/90 leading-relaxed font-body font-normal">
          {siteContent.hero.subheadline}
        </p>

        {/* CTA Actions: Single call to action across site is "Apply" */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={siteContent.hero.ctaPrimary.href} variant="primary">
            {siteContent.hero.ctaPrimary.label}
            <ArrowRight size={14} />
          </MagneticButton>
          <MagneticButton href={siteContent.hero.ctaSecondary.href} variant="secondary">
            {siteContent.hero.ctaSecondary.label}
          </MagneticButton>
        </div>
      </div>

      {/* Labeled 'Scroll' hint that fades out on first scroll */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-navy-950/60 backdrop-blur-md transition-all duration-300 pointer-events-none z-20 ${
          hasScrolled ? 'opacity-0 translate-y-2' : 'opacity-70 hover:opacity-100'
        }`}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-widest text-violet-300 uppercase font-medium">
          Scroll
        </span>
        <div className="h-3 w-[1px] bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
