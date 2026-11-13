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
  'mobile-apps': ['Android Native', 'Material You', 'Offline Ready'],
  'ai-automation': ['n8n Workflows', 'Agentic Systems', 'LLM Integrations'],
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
    iconBg: 'bg-indigo-500/10',
    iconBorder: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    hoverBorder: 'group-hover:border-indigo-500/60 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
  },
  'mobile-apps': {
    index: '02',
    color: '#38BDF8',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    hoverBorder: 'group-hover:border-sky-500/60 group-hover:shadow-[0_0_35px_rgba(2,132,199,0.25)]',
    cardBorder: 'border-white/[0.08]',
    cardShadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
  },
  'ai-automation': {
    index: '03',
    color: '#34D399',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
    hoverBorder: 'group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]',
    // Active prominent state matching official reference
    cardBorder: 'border-emerald-500/60 ring-1 ring-emerald-500/30',
    cardShadow: 'shadow-[0_0_35px_rgba(16,185,129,0.2)]',
  },
  'growth-strategy': {
    index: '04',
    color: '#FBBF24',
    iconBg: 'bg-amber-500/10',
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
      {/* Section Eyebrow & Headline matching Next-Gen AI Reference */}
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

      {/* 4-Placard Grid with High-Capacity Real UI Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Core', 'Strategy', 'Scale'];
          const theme = serviceTheme[service.id] || {
            index: `0${idx + 1}`,
            color: '#818CF8',
            iconBg: 'bg-indigo-500/10',
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
              className="group block h-full"
            >
              <GlassCard
                className={`relative flex flex-col justify-between p-6 sm:p-7 min-h-[490px] sm:min-h-[510px] rounded-[22px] border ${theme.cardBorder} ${theme.cardShadow} bg-[#0D0F14]/85 backdrop-blur-xl transition-all duration-300 ${theme.hoverBorder} overflow-hidden h-full`}
              >
                {/* Foreground Content */}
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
                    <h3 className="text-xl sm:text-[21px] font-bold text-white mb-2 tracking-tight group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Outcome Description */}
                    <p className="text-[13.5px] text-slate-400 font-normal leading-relaxed mb-3">
                      {service.outcome}
                    </p>

                    {/* High-Capacity Visual Showcase Frame (100% Visible & Crisp Details) */}
                    <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-white/[0.12] bg-[#050608] my-3 group-hover:border-white/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                      {/* Subtle accent color aura behind the image to elevate contrast */}
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${theme.color} 0%, transparent 85%)`,
                        }}
                      />
                      <Image
                        src={imageSrc}
                        alt={`${service.title} visual showcase`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        priority={idx < 2}
                      />
                    </div>

                    {/* Capability Tags / Pills */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-white/[0.08] bg-white/[0.04] text-slate-300 group-hover:border-white/15 group-hover:bg-white/[0.08] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row Action */}
                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
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
