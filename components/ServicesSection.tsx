'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import { Globe, Smartphone, Cpu, TrendingUp, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
};

const capabilityTags: Record<string, string[]> = {
  'web-apps': ['Next.js 15', 'Client Portals', 'High Performance'],
  'mobile-apps': ['iOS & Android', 'Cross-Platform', 'Offline Ready'],
  'ai-automation': ['Agentic Systems', 'Data Pipelines', 'LLM Integrations'],
  'growth-strategy': ['Product Roadmaps', 'Conversion UX', 'System Scale'],
};

interface ServiceTheme {
  index: string;
  color: string;
  iconBg: string;
  iconBorder: string;
  hoverBorder: string;
  cardBorder: string;
  cardShadow: string;
  gradientGrade: string;
  blendGrade: string;
}

const serviceTheme: Record<string, ServiceTheme> = {
  'web-apps': {
    index: '01',
    color: '#818CF8',
    iconBg: 'rgba(99, 102, 241, 0.12)',
    iconBorder: 'rgba(99, 102, 241, 0.25)',
    hoverBorder: 'group-hover:border-indigo-500/50 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.12)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: '',
    gradientGrade: 'from-[#0A0D18] via-[#0A0D18]/85 to-[#312E81]/30',
    blendGrade: 'bg-indigo-600/10',
  },
  'mobile-apps': {
    index: '02',
    color: '#38BDF8',
    iconBg: 'rgba(56, 189, 248, 0.12)',
    iconBorder: 'rgba(56, 189, 248, 0.25)',
    hoverBorder: 'group-hover:border-sky-500/50 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: '',
    gradientGrade: 'from-[#0A0D18] via-[#0A0D18]/85 to-[#0369A1]/30',
    blendGrade: 'bg-sky-600/10',
  },
  'ai-automation': {
    index: '03',
    color: '#34D399',
    iconBg: 'rgba(52, 211, 153, 0.15)',
    iconBorder: 'rgba(52, 211, 153, 0.35)',
    hoverBorder: 'group-hover:border-emerald-400/70 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]',
    // Active prominent state matching official live site (Card 03 in Image 1)
    cardBorder: 'border-[#10B981]/50',
    cardShadow: 'shadow-[0_0_28px_rgba(16,185,129,0.12)]',
    gradientGrade: 'from-[#0A0D18] via-[#0A0D18]/80 to-[#047857]/35',
    blendGrade: 'bg-emerald-600/12',
  },
  'growth-strategy': {
    index: '04',
    color: '#FBBF24',
    iconBg: 'rgba(251, 191, 36, 0.12)',
    iconBorder: 'rgba(251, 191, 36, 0.25)',
    hoverBorder: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.12)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: '',
    gradientGrade: 'from-[#0A0D18] via-[#0A0D18]/85 to-[#B45309]/30',
    blendGrade: 'bg-amber-600/10',
  },
};

const serviceImages: Record<string, string> = {
  'web-apps': '/images/service-web-apps.jpg',
  'mobile-apps': '/images/service-mobile-apps.jpg',
  'ai-automation': '/images/service-ai-automation.jpg',
  'growth-strategy': '/images/service-growth-strategy.jpg',
};

export default function ServicesSection() {
  const { services } = siteContent;

  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 w-full">
      {/* Eyebrow & Section Headline matching Image 1 */}
      <div className="relative z-10 mb-10 lg:mb-12">
        <span className="text-[#38BDF8] text-[11px] font-mono tracking-[0.2em] font-semibold uppercase block mb-2.5">
          SERVICES
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          {services.headline}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {services.subheadline}
        </p>
      </div>

      {/* Official 4-Placard Grid with Full-Frame Decreased Opacity Imagery & Color Grading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Core', 'Strategy', 'Scale'];
          const theme = serviceTheme[service.id] || {
            index: `0${idx + 1}`,
            color: '#818CF8',
            iconBg: 'rgba(99, 102, 241, 0.12)',
            iconBorder: 'rgba(99, 102, 241, 0.25)',
            hoverBorder: 'group-hover:border-indigo-500/50',
            cardBorder: 'border-white/[0.08]',
            cardShadow: '',
            gradientGrade: 'from-[#0A0D18] via-[#0A0D18]/85 to-[#312E81]/30',
            blendGrade: 'bg-indigo-600/10',
          };
          const imageSrc = serviceImages[service.id] || '/images/service-web-apps.jpg';

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group block h-full"
            >
              <GlassCard
                className={`relative flex flex-col justify-between p-6 sm:p-7 min-h-[390px] sm:min-h-[410px] rounded-[22px] border ${theme.cardBorder} ${theme.cardShadow} bg-[#0A0D18]/90 backdrop-blur-xl transition-all duration-300 ${theme.hoverBorder} overflow-hidden h-full`}
              >
                {/* 1. Full-Frame Background Image Layer with Decreased Opacity */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden z-0"
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out"
                    priority={idx < 2}
                  />

                  {/* 2. Color Grading Gradient Scrim Overlay per Service */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradientGrade} pointer-events-none`} />
                  <div className={`absolute inset-0 ${theme.blendGrade} mix-blend-color pointer-events-none`} />
                </div>

                {/* 3. Foreground Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Top Bar: Icon Box + Index Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="h-11 w-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: theme.iconBg,
                          borderColor: theme.iconBorder,
                          color: theme.color,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className="text-xs font-mono font-bold tracking-widest"
                        style={{ color: theme.color }}
                      >
                        {theme.index}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-[22px] font-bold text-white mb-2.5 tracking-tight group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    {/* Outcome Description */}
                    <p className="text-[13.5px] text-slate-300 font-normal leading-relaxed mb-5">
                      {service.outcome}
                    </p>

                    {/* Capability Tags / Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-white/[0.08] bg-[#161B26]/85 text-slate-300 group-hover:border-white/15 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row Action */}
                  <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                      <span>Explore capabilities</span>
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {/* Process: 4 sequential phases */}
      <div className="mt-16 lg:mt-24 pt-10 border-t border-white/[0.08] relative z-10">
        <div className="max-w-xl mb-8">
          <h3 className="h2-section text-white">
            {services.processHeadline}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.process.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-card border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-md flex flex-col justify-between hover:bg-[#101322] transition-colors duration-200"
            >
              <div>
                <h4 className="text-base font-semibold text-white mb-2.5">
                  <span className="text-slate-400 font-mono text-xs mr-2">{step.step}.</span>
                  {step.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
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
