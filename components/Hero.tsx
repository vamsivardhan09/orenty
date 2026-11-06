'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Button from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[92svh] flex flex-col justify-center items-center px-6 lg:px-12 pt-28 pb-16 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10">
        {/* Left Column: Text Content (Desktop: spans 7 cols, Left-aligned; Mobile: centered/stacked below object) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 eyebrow-label mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Headline H1 with clamp */}
          <h1 className="h1-hero text-text max-w-2xl mb-6">
            Software for businesses.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow via-white to-primary-glow">
              Products of our own.
            </span>{' '}
            Ownership for builders.
          </h1>

          {/* Subparagraph */}
          <p className="sub-paragraph max-w-xl text-text-2 mb-8 font-normal">
            {hero.subheadline}
          </p>

          {/* Actions: Primary, Secondary, and Tertiary Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
            <Button href={hero.ctaPrimary.href} variant="primary">
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              <span>{hero.ctaSecondary.label}</span>
            </Button>
          </div>

          {/* Tertiary link: Join the Startup Lab */}
          <Link
            href={hero.labLink.href}
            className="btn-tertiary mt-2 text-sm text-secondary hover:text-white"
          >
            <span>{hero.labLink.label}</span>
          </Link>
        </div>

        {/* Right Column (Placeholder container for the 3D canvas viewport space on desktop) */}
        <div className="lg:col-span-5 h-[280px] sm:h-[360px] lg:h-[480px] w-full flex items-center justify-center order-1 lg:order-2 pointer-events-none">
          {/* The 3D extruded logo mark renders in this 3D spatial quadrant via HeroScene */}
        </div>
      </div>

      {/* Subtle Scroll Cue at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest text-text-3 uppercase">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown size={14} className="text-secondary animate-bounce" />
      </div>
    </section>
  );
}
