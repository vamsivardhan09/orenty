'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Button from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(92svh-5rem)] flex flex-col justify-center items-center px-5 sm:px-6 lg:px-12 pt-2 sm:pt-4 lg:pt-8 pb-12 sm:pb-16 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center w-full z-10">
        {/* Left Column: Text Content (Desktop: spans 8 cols; Mobile: centered, clean, and balanced) */}
        <div className="lg:col-span-8 flex flex-col items-center text-center lg:items-start lg:text-left order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 eyebrow-label mb-3.5 sm:mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Punchy 1-2 Line Hero Headline */}
          <h1 className="h1-hero text-text max-w-3xl mb-3.5 sm:mb-4 tracking-tight text-center lg:text-left mx-auto lg:mx-0">
            {hero.headline}
          </h1>

          {/* Subparagraph */}
          <p className="sub-paragraph max-w-xl lg:max-w-2xl text-text-2 mb-6 sm:mb-8 font-normal leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
            {hero.subheadline}
          </p>

          {/* Actions: Primary & Secondary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-5 max-w-xs sm:max-w-none mx-auto lg:mx-0">
            <Button href={hero.ctaPrimary.href} variant="primary">
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              <span>{hero.ctaSecondary.label}</span>
            </Button>
          </div>

          {/* Tertiary link: Startup Lab */}
          <Link
            href={hero.labLink.href}
            className="btn-tertiary text-sm text-center lg:text-left mx-auto lg:mx-0"
          >
            <span>{hero.labLink.label}</span>
          </Link>
        </div>

        {/* Right Column: 3D Canvas spatial clearance on desktop (hidden on mobile to keep opening clean) */}
        <div className="hidden lg:flex lg:col-span-4 h-[420px] w-full items-center justify-center order-2 pointer-events-none">
          {/* Spatial clearance: 3D logo mark tilts and floats cleanly in this quadrant on desktop */}
        </div>
      </div>

      {/* Subtle Scroll Cue at bottom */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 pointer-events-none">
        <ChevronDown size={16} className="text-secondary animate-bounce" />
      </div>
    </section>
  );
}
