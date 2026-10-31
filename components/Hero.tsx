'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { siteContent } from '@/content/site';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

// Lazy-load WebGL Canvas when needed
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

interface HeroProps {
  showCanvas?: boolean;
}

export default function Hero({ showCanvas = false }: HeroProps) {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[85vh] flex flex-col justify-center items-center px-6 lg:px-12 pt-20 pb-12 text-center">
      {/* 3D WebGL Shader + Logo Scene if rendered directly */}
      {showCanvas && <HeroCanvas />}

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top HUD Badge */}
        <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-[11px] font-mono tracking-widest text-violet-300 uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span>{siteContent.hero.badge}</span>
        </div>

        {/* Fixed Headline: "Build what's next." in display font, clamp(40px, 6vw, 88px), max 2 lines */}
        <h1 className="font-display font-extrabold tracking-tight uppercase leading-[0.98] text-[clamp(40px,6vw,88px)] max-w-4xl mx-auto">
          <span className="text-white">Build what&apos;s</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-violet-300 drop-shadow-[0_0_16px_rgba(167,139,250,0.35)]">
            next.
          </span>
        </h1>

        {/* Muted Body Copy */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300/90 leading-relaxed font-body font-normal">
          {siteContent.hero.subheadline}
        </p>

        {/* Small Ticker under the subtext */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-widest uppercase text-violet-300/80">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>BUILD</span>
          </span>
          <span className="text-white/20">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>ENGINEER</span>
          </span>
          <span className="text-white/20">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>AUTOMATE</span>
          </span>
          <span className="text-white/20">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            <span>SCALE</span>
          </span>
        </div>

        {/* CTA Actions: fully visible at 1366x768 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/careers#apply" variant="primary">
            Apply now
            <ArrowRight size={14} />
          </MagneticButton>
          <MagneticButton href="/products" variant="secondary">
            Explore Products
          </MagneticButton>
        </div>
      </div>

      {/* Bottom ambient scroll indicator */}
      <div className="mt-8 flex flex-col items-center gap-1 opacity-50 pointer-events-none">
        <span className="font-mono text-[9px] tracking-widest text-violet-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="h-5 w-[1px] bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
