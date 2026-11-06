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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full z-10">
        {/* Left Column: Text Content (Desktop: spans 7 cols; Mobile: below the 3D logo object) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 eyebrow-label mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Headline H1 */}
          <h1 className="h1-hero text-text max-w-2xl mb-6">
            We build software for ambitious businesses — and products of our own.
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

          {/* Tertiary link: Explore careers → */}
          <Link
            href={hero.labLink.href}
            className="btn-tertiary mt-2 text-[15px]"
          >
            <span>{hero.labLink.label}</span>
          </Link>
        </div>

        {/* Right Column: 3D Canvas spatial clearance on desktop / top on mobile */}
        <div className="lg:col-span-5 h-[260px] sm:h-[320px] lg:h-[460px] w-full flex items-center justify-center order-1 lg:order-2 pointer-events-none">
          {/* Spatial clearance: 3D logo mark tilts and floats cleanly in this quadrant */}
        </div>
      </div>

      {/* Subtle Scroll Cue at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 pointer-events-none">
        <ChevronDown size={16} className="text-secondary animate-bounce" />
      </div>
    </section>
  );
}
