'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import SectionHeader from './SectionHeader';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import { Globe, Smartphone, Cpu, TrendingUp, ArrowRight, Check } from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
};

export default function ServicesSection() {
  const { services } = siteContent;

  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28 w-full">
      <SectionHeader
        eyebrow={services.eyebrow}
        headline={services.headline}
        subheadline={services.subheadline}
      />

      {/* 4 Service Cards (Mobile: Stacking; Tablet: 2-col; Desktop: 4-col) */}
      <StackContainer totalCards={services.items.length}>
        {services.items.map((service) => {
          const Icon = iconMap[service.iconName] || Globe;
          return (
            <GlassCard
              key={service.id}
              className="flex flex-col justify-between h-full p-6 md:p-8"
            >
              <div>
                {/* Icon */}
                <div className="h-12 w-12 rounded-xl border border-surface-border bg-surface-glass flex items-center justify-center text-secondary mb-6">
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-text mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Outcome line */}
                <p className="text-sm text-text-2 mb-6 font-normal leading-relaxed">
                  {service.outcome}
                </p>

                {/* 3 Short Bullets */}
                <ul className="space-y-2.5 mb-8">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-text-3 font-normal leading-relaxed">
                      <Check size={14} className="text-secondary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn more link */}
              <div className="pt-4 border-t border-surface-border">
                <Link
                  href={service.href}
                  className="btn-tertiary text-xs uppercase tracking-wider text-secondary hover:text-white"
                >
                  <span>Learn more</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>

      {/* How we work (Compact 4-step timeline: Discover → Design → Build → Launch & grow) */}
      <div className="mt-20 lg:mt-28 pt-12 border-t border-surface-border">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-label text-text-3 mb-2 block">OUR PROCESS</span>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-text">
            {services.processHeadline}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.process.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 rounded-card border border-surface-border bg-bg-elevated/70 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-secondary tracking-widest block mb-2">
                  {step.step} // STEP
                </span>
                <h4 className="font-display text-lg font-bold text-text mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-text-2 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
              {idx < services.process.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-surface-border z-10">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
