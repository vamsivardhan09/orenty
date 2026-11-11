'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Button from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(94svh-5rem)] flex flex-col justify-center items-center px-6 sm:px-8 lg:px-14 pt-4 sm:pt-6 lg:pt-10 pb-16 sm:pb-20 w-full overflow-hidden">
      
      {/* High-Resolution Hero Background (Grid Top-Left + 3D Concentric Rings Bottom-Right) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-cover bg-no-repeat bg-right-bottom sm:bg-center"
        style={{
          backgroundImage: `url('/images/hero-clarity-bg.jpg')`,
        }}
      />

      {/* Smooth gradient blend into the page canvas at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(7, 8, 13, 0.7) 60%, #07080D 100%)',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Left-Aligned Typography & Actions */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-white/5 border border-white/10 text-violet-300 mb-4 sm:mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Punchy Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mb-4 sm:mb-5 leading-[1.08]">
            {hero.headline}
          </h1>

          {/* Subparagraph */}
          <p className="sub-paragraph max-w-xl lg:max-w-xl text-text-2 mb-6 sm:mb-8 font-normal leading-relaxed">
            {hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
            <Button href={hero.ctaPrimary.href} variant="primary">
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              <span>{hero.ctaSecondary.label}</span>
            </Button>
            <Link
              href={hero.labLink.href}
              className="btn-tertiary text-sm text-violet-300 hover:text-white transition sm:ml-2 py-2"
            >
              <span>{hero.labLink.label}</span>
            </Link>
          </div>

          {/* Tech Stack Micro-Tags (as seen in Clarity reference) */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.08] w-full max-w-xl">
            <span className="text-xs font-mono text-slate-400 uppercase mr-1">Stack //</span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-200">Next.js 15</span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-200">AI Agents</span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-200">Edge Compute</span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-200">Venture Studio</span>
          </div>

        </div>

        {/* Right Column: Spatial Clearance for the 3D Concentric Rings to shine */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 h-[380px] w-full items-center justify-center pointer-events-none">
          {/* Spatial clearance: The 3D concentric rings in the background shine unobstructed in this quadrant */}
        </div>
      </div>

      {/* Subtle Scroll Cue at bottom */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none z-10">
        <ChevronDown size={16} className="text-text-3 transition-opacity" />
      </div>
    </section>
  );
}
