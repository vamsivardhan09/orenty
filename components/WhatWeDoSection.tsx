'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import { Terminal, Layers, Lightbulb, ArrowRight } from 'lucide-react';

const divisions = [
  {
    icon: Terminal,
    title: 'Software for businesses',
    description: 'Websites, web apps, mobile apps and AI automation built for your goals.',
    linkText: 'See services',
    linkHref: '/services',
  },
  {
    icon: Layers,
    title: 'Products we build',
    description: 'SyncedIn, Fanbase, Job Pilot and Pujari.ai — built, owned and run by Orenty.',
    linkText: 'See products',
    linkHref: '/products',
  },
  {
    icon: Lightbulb,
    title: 'Startup Lab',
    description: 'Solve real startup challenges. The best builders earn ownership.',
    linkText: 'Explore careers',
    linkHref: '/careers',
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-24 w-full">
      <div className="mb-12">
        <span className="eyebrow-label block mb-3">WHAT WE DO</span>
        <h2 className="h2-section max-w-2xl text-text">
          Three divisions, one mission: building what matters.
        </h2>
      </div>

      <StackContainer totalCards={divisions.length}>
        {divisions.map((div, i) => {
          const Icon = div.icon;
          return (
            <GlassCard
              key={div.title}
              className="flex flex-col justify-between h-full p-6 md:p-8"
            >
              <div>
                <div className="h-12 w-12 rounded-xl border border-border bg-surface-3 flex items-center justify-center text-secondary mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="h3-card text-text mb-3">
                  {div.title}
                </h3>
                <p className="text-[15px] text-text-2 leading-relaxed mb-6 font-normal">
                  {div.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href={div.linkHref}
                  className="btn-tertiary text-sm"
                >
                  <span>{div.linkText}</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </StackContainer>
    </section>
  );
}
