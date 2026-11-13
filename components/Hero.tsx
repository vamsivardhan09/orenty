'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-between items-center px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-8 w-full overflow-hidden bg-[#08080A]">
      
      {/* 1. Sculptural 3D Parametric Ribbon Canyon Backdrop (Exact match to reference) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/images/hero-parametric-canyon.jpg"
          alt="Architectural Parametric 3D Canyon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-85"
        />
        {/* Top Vignette Gradient to blend seamlessly with dark header */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080A] via-[#08080A]/60 to-transparent h-[45%]" />
        {/* Bottom Horizon Gradient to blend with section below */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent h-32" />
      </div>

      {/* 2. Centered Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-4 sm:pt-8">
        
        {/* Centered Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/[0.04] border border-white/[0.12] text-neutral-300 mb-5 sm:mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <span>{hero.eyebrow}</span>
        </div>

        {/* High-Impact Centered Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 sm:mb-6 leading-[1.06] drop-shadow-sm">
          {hero.headline}
        </h1>

        {/* Centered Subheadline */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg lg:text-[19px] mb-8 font-normal leading-relaxed drop-shadow">
          {hero.subheadline}
        </p>

        {/* Centered Action Buttons (White primary pill matching reference + frosted secondary) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-5">
          <Button href={hero.ctaPrimary.href} variant="primary">
            <span>{hero.ctaPrimary.label}</span>
            <ArrowRight size={16} className="btn-arrow" />
          </Button>
          <Button href={hero.ctaSecondary.href} variant="secondary">
            <span>{hero.ctaSecondary.label}</span>
          </Button>
        </div>

        {/* Tertiary Startup Lab Link */}
        <div className="mb-2">
          <Link
            href={hero.labLink.href}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition group py-1"
          >
            <span>{hero.labLink.label}</span>
          </Link>
        </div>
      </div>

      {/* 3. Center Focal Stage: Floating 3D Orenty Token nestled inside the spotlight */}
      <div className="relative z-10 w-full max-w-lg h-[260px] sm:h-[300px] flex items-center justify-center pointer-events-none mt-auto">
        <HeroCanvas isFixed={false} />
      </div>

      {/* 4. Engineering Tech Stack / Partner Strip Horizon */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs font-mono uppercase tracking-widest text-slate-400 select-none">
        <span className="hover:text-white transition-colors">Next.js 15</span>
        <span className="hover:text-white transition-colors">React 19</span>
        <span className="hover:text-white transition-colors">TypeScript</span>
        <span className="hover:text-white transition-colors">Python</span>
        <span className="hover:text-white transition-colors">n8n Agents</span>
        <span className="hover:text-white transition-colors">Supabase</span>
        <span className="hover:text-white transition-colors">Tailwind</span>
      </div>

    </section>
  );
}
