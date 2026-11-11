'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[calc(100svh-5rem-52px)] flex flex-col justify-center items-center px-6 sm:px-8 lg:px-14 pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 w-full overflow-hidden">
      
      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Left-Aligned Typography & Actions */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/5 border border-white/10 text-cyan-300 mb-4 sm:mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Punchy Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mb-4 sm:mb-5 leading-[1.08]">
            {hero.headline}
          </h1>

          {/* Subparagraph */}
          <p className="sub-paragraph max-w-xl lg:max-w-xl text-text-2 mb-6 sm:mb-8 font-normal leading-relaxed text-sm sm:text-base text-slate-300">
            {hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-5 sm:mb-6">
            <Button href={hero.ctaPrimary.href} variant="primary">
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              <span>{hero.ctaSecondary.label}</span>
            </Button>
          </div>

          {/* Tertiary Startup Lab Link */}
          <div>
            <Link
              href={hero.labLink.href}
              className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-white transition group py-1"
            >
              <span>{hero.labLink.label}</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Spatial Clearance for the 3D Volumetric Light-Beam & Extruded Logo Mark */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 h-[400px] w-full items-center justify-center pointer-events-none">
          {/* WebGL 3D Canvas shines unobstructed in this quadrant */}
        </div>
      </div>
    </section>
  );
}
