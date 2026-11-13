'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  iconColor: string;
  hoverBorder: string;
  cardBorder: string;
  cardShadow: string;
}

const serviceTheme: Record<string, ServiceTheme> = {
  'web-apps': {
    index: '01',
    color: '#818CF8',
    iconBg: 'bg-indigo-950/60',
    iconBorder: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    hoverBorder: 'group-hover:border-indigo-500/60 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
  },
  'mobile-apps': {
    index: '02',
    color: '#38BDF8',
    iconBg: 'bg-sky-950/60',
    iconBorder: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    hoverBorder: 'group-hover:border-sky-500/60 group-hover:shadow-[0_0_35px_rgba(2,132,199,0.25)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
  },
  'ai-automation': {
    index: '03',
    color: '#34D399',
    iconBg: 'bg-emerald-950/60',
    iconBorder: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
    hoverBorder: 'group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]',
    // Active prominent state matching official orenty.in reference
    cardBorder: 'border-emerald-500/70 ring-1 ring-emerald-500/40',
    cardShadow: 'shadow-[0_0_35px_rgba(16,185,129,0.22)]',
  },
  'growth-strategy': {
    index: '04',
    color: '#FBBF24',
    iconBg: 'bg-amber-950/60',
    iconBorder: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    hoverBorder: 'group-hover:border-amber-500/60 group-hover:shadow-[0_0_35px_rgba(217,119,6,0.25)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
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
      {/* Section Eyebrow & Headline matching orenty.in Reference */}
      <div className="relative z-10 mb-10 lg:mb-12">
        <span className="text-indigo-400 text-[11px] font-mono tracking-[0.2em] font-bold uppercase block mb-2.5">
          SERVICES
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          {services.headline}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {services.subheadline}
        </p>
      </div>

      {/* 4-Placard Grid with Mobile Stacking & Full-Frame Color-Graded Underlays */}
      <StackContainer totalCards={services.items.length}>
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Core', 'Strategy', 'Scale'];
          const theme = serviceTheme[service.id] || {
            index: `0${idx + 1}`,
            color: '#818CF8',
            iconBg: 'bg-indigo-950/60',
            iconBorder: 'border-indigo-500/30',
            iconColor: 'text-indigo-400',
            hoverBorder: 'group-hover:border-indigo-400',
            cardBorder: 'border-white/[0.08]',
            cardShadow: 'shadow-md',
          };
          const imageSrc = serviceImages[service.id] || '/images/service-web-apps.jpg';

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group block h-full w-full"
            >
              <GlassCard
                className={`relative flex flex-col justify-between p-6 sm:p-7 min-h-[380px] sm:min-h-[400px] lg:min-h-[410px] rounded-[22px] border ${theme.cardBorder} ${theme.cardShadow} bg-[#0D0F14]/90 backdrop-blur-xl transition-all duration-300 ${theme.hoverBorder} overflow-hidden h-full`}
              >
                {/* 1. Full-Frame Color-Graded Visual Underlay (Exact match to user's specification) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px] z-0">
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    priority={idx < 2}
                  />
                  {/* Color grading overlay with service accent */}
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-color pointer-events-none"
                    style={{ backgroundColor: theme.color }}
                  />
                  {/* Radial accent glow from center */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none group-hover:opacity-45 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, ${theme.color} 0%, transparent 75%)`,
                    }}
                  />
                  {/* Dark linear protection gradient to guarantee 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F14]/85 via-[#0D0F14]/70 to-[#0D0F14]/95 pointer-events-none" />
                </div>

                {/* 2. Foreground Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Top Bar: Icon Box + Index Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center border ${theme.iconBg} ${theme.iconBorder} ${theme.iconColor} transition-transform duration-300 group-hover:scale-105 shadow-sm`}
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
                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between mt-auto">
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
      </StackContainer>

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
              className="relative p-6 rounded-card border border-white/[0.08] bg-[#0D0F14]/80 backdrop-blur-md flex flex-col justify-between hover:border-white/[0.18] hover:shadow-xl transition-all duration-200 shadow-sm"
            >
              <div>
                <h4 className="text-base font-semibold text-white mb-2.5">
                  <span className="text-indigo-400 font-mono text-xs mr-2">{step.step}.</span>
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
