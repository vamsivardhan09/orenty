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

const capabilitySpecs: Record<string, string[]> = {
  'web-apps': ['Next.js 15 App Router', 'Client Portals & Admin', 'Sub-100ms LCP'],
  'mobile-apps': ['iOS & Android Native', 'Offline-First Sync', 'Store Deployment'],
  'ai-automation': ['Agentic Workflows', 'Deterministic Pipelines', 'LLM Integrations'],
  'growth-strategy': ['Conversion Architecture', 'Analytics & Telemetry', 'Scalable Systems'],
};

const serviceLabels: Record<string, string> = {
  'web-apps': 'WEB ARCHITECTURE',
  'mobile-apps': 'MOBILE APPS',
  'ai-automation': 'INTELLIGENT SYSTEMS',
  'growth-strategy': 'PRODUCT STRATEGY',
};

const serviceBadges: Record<string, string> = {
  'web-apps': 'PROD READY • SUB-100MS',
  'mobile-apps': 'IOS & ANDROID • NATIVE CORE',
  'ai-automation': 'AGENT PIPELINE • ORCHESTRATION',
  'growth-strategy': 'EXECUTIVE TELEMETRY • ROADMAP',
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

      {/* Crafted 2x2 Bento Engineering Grid with Real Product & Engineering Imagery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {services.items.map((service, idx) => {
          const Icon = iconMap[service.iconName] || Globe;
          const specs = capabilitySpecs[service.id] || ['Engineering', 'Design', 'Scale'];
          const label = serviceLabels[service.id] || 'ENGINEERING';
          const badge = serviceBadges[service.id] || 'ENTERPRISE READY';
          const imageSrc = serviceImages[service.id] || '/images/service-web-apps.jpg';

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group block"
            >
              <GlassCard className="h-full p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20">
                <div>
                  {/* Integrated Header: Category Eyebrow + Inline Icon + Trailing Action */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <Icon size={17} className="text-text-2 group-hover:text-white transition-colors" />
                      <span className="text-xs font-mono uppercase tracking-widest text-text-3 font-medium">
                        0{idx + 1} // {label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-text-3 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>

                  {/* Title & Core Value Proposition */}
                  <h3 className="text-xl md:text-2xl font-bold text-text group-hover:text-white transition-colors mt-4 mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-text-2 font-normal leading-relaxed mb-4">
                    {service.outcome}
                  </p>

                  {/* Real High-Resolution Visual Showcase (Vertical Fit) */}
                  <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0D18] my-2 group-hover:border-white/20 transition-all duration-500 shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={`${service.title} engineering showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 2}
                    />

                    {/* Subtle bottom vignette for seamless card integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-black/20 pointer-events-none" />

                    {/* Top glass status chip */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono font-medium text-text-2 tracking-wider flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 " />
                      <span>{badge}</span>
                    </div>
                  </div>
                </div>

                {/* Structured Architectural Specifications Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-border mt-3">
                  {specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 text-xs font-mono text-text-3 group-hover:text-text-2 transition-colors"
                    >
                      <span className="h-1 w-1 rounded-full bg-text-3 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {/* Process: 4 sequential phases */}
      <div className="mt-16 lg:mt-24 pt-10 border-t border-border relative z-10">
        <div className="max-w-2xl mb-8">
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
