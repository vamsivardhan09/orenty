'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { siteContent } from '@/content/site';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';
import { ArrowRight } from 'lucide-react';

// Lazy-load the WebGL 3D Canvas with ssr: false
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a071c] via-[#05060f] to-[#04060d]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-24 bg-gradient-to-b from-violet-400/30 via-violet-600/15 to-transparent blur-2xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[130px]" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 lg:px-12 pt-16 pb-24 text-center overflow-hidden">
      {/* 3D WebGL Shader + Logo Scene */}
      <HeroCanvas />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top HUD Badge - Spark symbol removed as requested */}
        <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-950/40 px-4 py-1.5 text-[11px] font-mono tracking-widest text-violet-300 uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span>{siteContent.hero.badge}</span>
        </div>

        {/* Display Headline - Sharp, crisp readability on 'next.' */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase leading-[0.95]">
          <TextReveal as="span" className="text-white">
            {siteContent.hero.headline}
          </TextReveal>{' '}
          <TextReveal
            as="span"
            wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-violet-300 drop-shadow-[0_0_12px_rgba(167,139,250,0.35)]"
          >
            {siteContent.hero.headlineAccent}
          </TextReveal>
        </h1>

        {/* Muted Body Copy */}
        <p className="mt-8 max-w-2xl text-base md:text-lg text-slate-300/90 leading-relaxed font-body font-normal">
          {siteContent.hero.subheadline}
        </p>

        {/* CTA Actions: Single call to action across site is "Apply" */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href={siteContent.hero.ctaPrimary.href} variant="primary">
            {siteContent.hero.ctaPrimary.label}
            <ArrowRight size={14} />
          </MagneticButton>
          <MagneticButton href={siteContent.hero.ctaSecondary.href} variant="secondary">
            {siteContent.hero.ctaSecondary.label}
          </MagneticButton>
        </div>
      </div>

      {/* Bottom ambient scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-violet-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
