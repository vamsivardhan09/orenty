'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import { Globe, Smartphone, Cpu, TrendingUp, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
};

// Compact capability tags derived from bullets for clean visual rhythm
const capabilityTags: Record<string, string[]> = {
  'web-apps': ['Next.js 15', 'Client Portals', 'High Performance'],
  'mobile-apps': ['iOS & Android', 'Cross-Platform', 'Offline Ready'],
  'ai-automation': ['Agentic Systems', 'Data Pipelines', 'LLM Integrations'],
  'growth-strategy': ['Product Roadmaps', 'Conversion UX', 'System Scale'],
};

export default function ServicesSection() {
  const { services } = siteContent;

  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 w-full">
      <div className="mb-10 lg:mb-12">
        <span className="eyebrow-label block mb-2.5">{services.eyebrow}</span>
        <h2 className="h2-section max-w-2xl text-text mb-3">
          {services.headline}
        </h2>
        <p className="sub-paragraph max-w-2xl text-text-2">
          {services.subheadline}
        </p>
      </div>

      {/* 4 Compact Proportional Service Cards */}
      <StackContainer totalCards={services.items.length}>
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Engineering', 'Design', 'Scale'];

          return (
            <GlassCard
              key={service.id}
              className="group relative flex flex-col justify-between p-6 md:p-7 min-h-[300px] transition-all duration-300"
            >
              {/* Corner HUD accent */}
              <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Micro Index & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="h-10 w-10 rounded-lg border border-border bg-surface-3/80 flex items-center justify-center text-secondary group-hover:border-secondary/40 transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-text-3 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="h3-card text-text mb-2.5 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Outcome line */}
                <p className="text-[14px] text-text-2 font-normal leading-relaxed mb-6">
                  {service.outcome}
                </p>

                {/* Compact Capability Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-block px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border border-border/70 bg-surface-3/60 text-text-3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action: Compact Interactive Row */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-3 group-hover:text-secondary transition-colors"
                >
                  <span>Explore capabilities</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>

      {/* Process: 4 steps */}
      <div className="mt-16 lg:mt-24 pt-10 border-t border-border/80">
        <div className="max-w-2xl mb-8">
          <span className="eyebrow-label block mb-2">OUR PROCESS</span>
          <h3 className="h2-section text-text">
            {services.processHeadline}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.process.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-card border border-border bg-surface-2/80 backdrop-blur-sm flex flex-col justify-between hover:border-border-top transition-colors"
            >
              <div>
                <span className="text-xs font-mono font-semibold text-secondary tracking-wider block mb-3">
                  STEP // {step.step}
                </span>
                <h4 className="text-base font-semibold text-text mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-text-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
