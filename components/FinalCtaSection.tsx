'use client';

import React from 'react';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import Button from './Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FinalCtaSection() {
  const { finalCta } = siteContent;

  return (
    <section id="final-cta" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32 w-full border-t border-border">
      <GlassCard className="group relative p-10 md:p-16 lg:p-20 text-center overflow-hidden max-w-5xl mx-auto shadow-2xl">
        {/* Layer 1: Atmospheric Background Image with Decreased Opacity */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/cta-iconic-bg.jpg"
            alt="Futuristic architectural monolith representing iconic digital products"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center opacity-25 transition-transform duration-1000 ease-out group-hover:scale-105"
            priority={false}
          />
          {/* Layer 2: Radial Vignette & Gradient Mask to preserve high text contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(5, 5, 10, 0.40) 0%, rgba(5, 5, 10, 0.88) 75%, #05050A 100%)',
            }}
          />
          {/* Layer 3: Ultra-Subtle Architectural Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Ambient Top Glow Line & Refraction */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent z-10" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[220px] w-[500px] rounded-full bg-violet-600/20 blur-[100px] z-0" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-[200px] w-[400px] rounded-full bg-cyan-500/15 blur-[110px] z-0" />

        {/* Corner HUD Accents */}
        <div className="pointer-events-none absolute top-5 left-5 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block z-10">
          ┌ ICONIC.STUDIO
        </div>
        <div className="pointer-events-none absolute top-5 right-5 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block z-10">
          // 2026 ┐
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="h2-section text-text mb-4 max-w-xl font-bold tracking-tight">
            Let&apos;s build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-violet-400 drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]">
              iconic.
            </span>
          </h2>

          <p className="sub-paragraph text-text-2 mb-8 max-w-lg font-normal leading-relaxed text-balance">
            {finalCta.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
            <Button
              href={finalCta.ctaPrimary.href}
              variant="primary"
              className="w-full sm:w-auto shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)]"
            >
              <span>{finalCta.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow ml-1" />
            </Button>

            <Button
              href={finalCta.ctaSecondary.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <span>{finalCta.ctaSecondary.label}</span>
            </Button>
          </div>

          {/* Reassurance Micro-Row (Trust signals) */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs text-text-3 font-medium pt-3 border-t border-white/5 w-full">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-violet-400/80" />
              <span>Direct engineer access</span>
            </div>
            <span className="text-white/10 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-cyan-400/80" />
              <span>24h response time</span>
            </div>
            <span className="text-white/10 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400/80" />
              <span>Full IP ownership</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
