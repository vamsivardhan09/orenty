'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import { Terminal, Layers, Lightbulb, ArrowUpRight } from 'lucide-react';

const divisions = [
  {
    index: '01',
    icon: Terminal,
    title: 'Software for businesses',
    description: 'Websites, web apps, mobile apps and AI automation engineered for your business goals.',
    linkText: 'Explore software solutions',
    linkHref: '/services',
    tag: 'CLIENT SERVICES',
  },
  {
    index: '02',
    icon: Layers,
    title: 'Products we build',
    description: 'SyncedIn, Fanbase, Job Pilot and Pujari.ai — built, owned and scaled in-house by Orenty.',
    linkText: 'Explore our product suite',
    linkHref: '/products',
    tag: 'IN-HOUSE VENTURES',
  },
  {
    index: '03',
    icon: Lightbulb,
    title: 'Startup Lab',
    description: 'Solve real startup challenges. The best builders and engineers earn co-founding ownership.',
    linkText: 'Explore open challenges',
    linkHref: '/careers',
    tag: 'INCUBATION & EQUITY',
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 w-full">
      <div className="mb-10 lg:mb-12">
        <h2 className="h2-section max-w-xl text-text">
          Three divisions, one mission: building what matters.
        </h2>
      </div>

      <StackContainer totalCards={divisions.length}>
        {divisions.map((div) => {
          const Icon = div.icon;
          return (
            <GlassCard
              key={div.title}
              className="group relative flex flex-col justify-between p-6 md:p-8 min-h-[290px] transition-all duration-300"
            >
              {/* Corner HUD accent */}
              <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-border mb-5">
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className="text-text-2 group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono tracking-widest text-text-3 font-medium uppercase">
                      DIVISION // {div.index}
                    </span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-3">
                    {div.tag}
                  </span>
                </div>

                <h3 className="h3-card text-text mb-3 group-hover:text-white transition-colors">
                  {div.title}
                </h3>

                <p className="text-[15px] text-text-2 leading-relaxed font-normal mb-6">
                  {div.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60">
                <Link
                  href={div.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-2 group-hover:text-white transition-colors"
                >
                  <span>{div.linkText}</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>
    </section>
  );
}
