'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import Button from './Button';
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
      <div className="mb-12">
        <span className="eyebrow-label block mb-3">{services.eyebrow}</span>
        <h2 className="h2-section max-w-2xl text-text mb-4">
          {services.headline}
        </h2>
        <p className="sub-paragraph max-w-2xl text-text-2">
          {services.subheadline}
        </p>
      </div>

      {/* 4 Service Cards (Mobile: Overlapping Stack; Tablet: 2-col; Desktop: 4-col) */}
      <StackContainer totalCards={services.items.length}>
        {services.items.map((service) => {
          const Icon = iconMap[service.iconName] || Globe;
          return (
            <GlassCard
              key={service.id}
              className="flex flex-col justify-between h-full p-6 md:p-8"
            >
              <div>
                <div className="h-12 w-12 rounded-xl border border-border bg-surface-3 flex items-center justify-center text-secondary mb-6">
                  <Icon size={22} />
                </div>

                <h3 className="h3-card text-text mb-3">
                  {service.title}
                </h3>

                <p className="text-[15px] text-text-2 mb-6 font-normal leading-relaxed">
                  {service.outcome}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-text-3 font-normal leading-relaxed">
                      <Check size={14} className="text-secondary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href={service.href}
                  className="btn-tertiary text-sm"
                >
                  <span>Learn more</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>

      {/* Process: 4 steps */}
      <div className="mt-20 lg:mt-28 pt-12 border-t border-border">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-label block mb-2">OUR PROCESS</span>
          <h3 className="h2-section text-text">
            {services.processHeadline}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.process.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-card border border-border bg-surface-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-semibold text-secondary tracking-wider block mb-3">
                  {step.step}
                </span>
                <h4 className="text-lg font-semibold text-text mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-text-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final line below: Start a project button (Section 5.4) */}
      <div className="mt-12 flex justify-center">
        <Button href="/contact" variant="primary">
          <span>Start a project</span>
          <ArrowRight size={15} className="btn-arrow" />
        </Button>
      </div>
    </section>
  );
}
