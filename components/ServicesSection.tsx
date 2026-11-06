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

// Tailored visual styling per service domain to eliminate monochromatic fatigue
const serviceVisuals: Record<
  string,
  {
    accent: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    glowClass: string;
    tagHover: string;
    linkHover: string;
  }
> = {
  'web-apps': {
    accent: '#8B5CF6', // Electric Violet (harmonizes with hero light beam)
    badgeBg: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/25',
    badgeText: 'text-violet-400',
    glowClass: 'group-hover:border-violet-500/50 group-hover:shadow-[0_0_22px_rgba(139,92,246,0.30)]',
    tagHover: 'group-hover:border-violet-500/30 group-hover:text-violet-200 group-hover:bg-violet-500/5',
    linkHover: 'group-hover:text-violet-300',
  },
  'mobile-apps': {
    accent: '#06B6D4', // Vibrant Cyan / Sky Aqua
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/25',
    badgeText: 'text-cyan-400',
    glowClass: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.30)]',
    tagHover: 'group-hover:border-cyan-500/30 group-hover:text-cyan-200 group-hover:bg-cyan-500/5',
    linkHover: 'group-hover:text-cyan-300',
  },
  'ai-automation': {
    accent: '#10B981', // Neural Mint / Cyber Emerald
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/25',
    badgeText: 'text-emerald-400',
    glowClass: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_22px_rgba(16,185,129,0.30)]',
    tagHover: 'group-hover:border-emerald-500/30 group-hover:text-emerald-200 group-hover:bg-emerald-500/5',
    linkHover: 'group-hover:text-emerald-300',
  },
  'growth-strategy': {
    accent: '#F59E0B', // Solar Amber / Warm Gold
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/25',
    badgeText: 'text-amber-400',
    glowClass: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_22px_rgba(245,158,11,0.30)]',
    tagHover: 'group-hover:border-amber-500/30 group-hover:text-amber-200 group-hover:bg-amber-500/5',
    linkHover: 'group-hover:text-amber-300',
  },
};

const defaultVisual = {
  accent: '#7C5CFF',
  badgeBg: 'bg-primary/10',
  badgeBorder: 'border-primary/25',
  badgeText: 'text-primary',
  glowClass: 'group-hover:border-primary/50 group-hover:shadow-[0_0_22px_rgba(124,92,255,0.30)]',
  tagHover: 'group-hover:border-primary/30 group-hover:text-primary-glow group-hover:bg-primary/5',
  linkHover: 'group-hover:text-primary',
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

      {/* 4 Compact Translucent Frosted Glass Placards */}
      <StackContainer totalCards={services.items.length}>
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Engineering', 'Design', 'Scale'];
          const visual = serviceVisuals[service.id] || defaultVisual;

          return (
            <GlassCard
              key={service.id}
              accentColor={visual.accent}
              className="group relative flex flex-col justify-between p-6 md:p-7 min-h-[300px] transition-all duration-300"
            >
              {/* Corner HUD accent */}
              <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Micro Index & Distinctive Tinted Icon Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`h-11 w-11 rounded-xl border ${visual.badgeBorder} ${visual.badgeBg} flex items-center justify-center ${visual.badgeText} ${visual.glowClass} transition-all duration-300`}
                  >
                    <Icon size={19} />
                  </div>
                  <span
                    className="text-[12px] font-mono tracking-widest font-semibold transition-colors duration-300"
                    style={{ color: visual.accent }}
                  >
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
                      className={`inline-block px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border border-white/[0.08] bg-white/[0.03] text-text-2 ${visual.tagHover} transition-all duration-200`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action: Compact Interactive Row with matching accent arrow */}
              <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between">
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold text-text-3 ${visual.linkHover} transition-colors group/link`}
                >
                  <span>Explore capabilities</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    style={{ color: visual.accent }}
                  />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>

      {/* Process: 4 steps */}
      <div className="mt-16 lg:mt-24 pt-10 border-t border-white/[0.08]">
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
              className="relative p-6 rounded-card border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/[0.18] transition-all duration-300"
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
