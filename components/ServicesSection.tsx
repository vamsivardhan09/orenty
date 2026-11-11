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

const serviceTheme: Record<string, {
  index: string;
  color: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  hoverBorder: string;
}> = {
  'web-apps': {
    index: '01',
    color: '#818CF8',
    iconBg: 'bg-indigo-500/10',
    iconBorder: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
    hoverBorder: 'group-hover:border-indigo-500/40',
  },
  'mobile-apps': {
    index: '02',
    color: '#38BDF8',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/20',
    iconColor: 'text-sky-400',
    hoverBorder: 'group-hover:border-sky-500/40',
  },
  'ai-automation': {
    index: '03',
    color: '#34D399',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    hoverBorder: 'group-hover:border-emerald-500/50',
  },
  'growth-strategy': {
    index: '04',
    color: '#FBBF24',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    hoverBorder: 'group-hover:border-amber-500/40',
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
      <div className="relative z-10 mb-10 lg:mb-12">
        <h2 className="h2-section max-w-xl text-text mb-3">
          {services.headline}
        </h2>
        <p className="sub-paragraph max-w-xl text-text-2">
          {services.subheadline}
        </p>
      </div>

      {/* Official 4-Placard Horizontal Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10">
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const tags = capabilityTags[service.id] || ['Core', 'Strategy', 'Scale'];
          const theme = serviceTheme[service.id] || {
            index: `0${idx + 1}`,
            color: '#818CF8',
            iconBg: 'bg-indigo-500/10',
            iconBorder: 'border-indigo-500/20',
            iconColor: 'text-indigo-400',
            hoverBorder: 'group-hover:border-indigo-500/40',
          };
          const imageSrc = serviceImages[service.id] || '/images/service-web-apps.jpg';

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group block h-full"
            >
              <GlassCard
                className={`relative flex flex-col justify-between p-6 sm:p-7 min-h-[520px] rounded-[22px] border border-white/[0.08] bg-[#0A0D18]/90 backdrop-blur-xl transition-all duration-300 ${theme.hoverBorder} overflow-hidden h-full`}
              >
                {/* Subtle Ambient Card Backdrop with Lowered Opacity */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-500 overflow-hidden"
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center blur-sm scale-110"
                  />
                </div>

                {/* Top Section */}
                <div className="relative z-10">
                  {/* Top Bar: Icon Box + Index Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center border ${theme.iconBg} ${theme.iconBorder} ${theme.iconColor} transition-transform duration-300 group-hover:scale-105`}
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
                  <p className="text-[13.5px] text-text-2 font-normal leading-relaxed mb-4">
                    {service.outcome}
                  </p>

                  {/* Authentic Framed Visual Showcase with Soft Lowered Opacity */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/[0.08] bg-[#07080D] my-3.5 group-hover:border-white/20 transition-all duration-300 shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={`${service.title} showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      priority={idx < 2}
                    />

                    {/* Gradient scrim for seamless integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18]/90 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-white/[0.08] bg-white/[0.03] text-text-3 group-hover:text-text-2 group-hover:border-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row Action */}
                <div className="relative z-10 pt-3.5 border-t border-border/50 flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-3 group-hover:text-white transition-colors">
                    <span>Explore capabilities</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {/* Process: 4 sequential phases */}
      <div className="mt-16 lg:mt-24 pt-10 border-t border-border relative z-10">
        <div className="max-w-xl mb-8">
          <h3 className="h2-section text-text">
            {services.processHeadline}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.process.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-card border border-border bg-surface-2 flex flex-col justify-between hover:bg-surface-3 transition-colors duration-200"
            >
              <div>
                <h4 className="text-base font-semibold text-text mb-2.5">
                  <span className="text-text-3 font-mono text-xs mr-2">{step.step}.</span>
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
    </section>
  );
}
