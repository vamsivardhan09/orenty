'use client';

import React from 'react';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

export default function FinalCtaSection() {
  const { finalCta } = siteContent;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24 lg:py-32 w-full border-t border-border">
      <GlassCard className="relative p-10 md:p-16 lg:p-20 text-center overflow-hidden max-w-5xl mx-auto">
        {/* Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-primary/12 blur-[120px]" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="eyebrow-label mb-4">
            START A CONVERSATION
          </span>

          <h2 className="h2-section text-text mb-5 max-w-xl">
            {finalCta.headline}
          </h2>

          <p className="sub-paragraph text-text-2 mb-10 max-w-lg font-normal">
            {finalCta.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button href={finalCta.ctaPrimary.href} variant="primary">
              <span>{finalCta.ctaPrimary.label}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>

            <Button href={finalCta.ctaSecondary.href} variant="secondary">
              <span>{finalCta.ctaSecondary.label}</span>
            </Button>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
