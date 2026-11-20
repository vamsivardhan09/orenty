'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, User } from 'lucide-react';

export default function AboutStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 w-full border-t border-border">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="max-w-2xl">
          <span className="eyebrow-label block mb-3">LEADERSHIP & CO-FOUNDERS</span>
          <h2 className="h2-section text-text">
            The builders behind Orenty.
          </h2>
          <p className="sub-paragraph text-text-2 mt-3">
            Combining deep architectural engineering with disciplined product strategy to build high-compounding software.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-2 hover:text-white transition-colors shrink-0"
        >
          <span>Read our full story & principles</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="space-y-8">
        {/* Placard 1: Co-Founder & CTO - Vamsi Vardhan */}
        <div className="rounded-card border border-border bg-surface-2/90 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 relative z-10">
            {/* Framed Co-Founder & CTO Portrait */}
            <div className="relative shrink-0">
              <div className="relative h-36 w-36 md:h-44 md:w-44 rounded-2xl border border-white/15 bg-[#12131A] shadow-2xl overflow-hidden group">
                <Image
                  src="/team/vamsi-vardhan.jpg"
                  alt="Vamsi Vardhan - Co-Founder & CTO"
                  fill
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
                {/* Subtle inner glass highlight */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
                {/* Soft gradient edge at base */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Profile & Biography */}
            <div className="flex-1 text-center md:text-left">
              <span className="eyebrow-label block mb-2">LEADERSHIP</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-1">
                Co-Founder & CTO
              </h3>
              <p className="text-base sm:text-lg font-semibold text-slate-200 mb-4">
                Vamsi Vardhan
              </p>
              
              <p className="text-base text-text-2 leading-relaxed mb-6 max-w-3xl font-normal">
                Vamsi Vardhan is the Co-Founder & CTO of Orenty, directing core technology strategy, distributed architecture, and AI engineering. With deep expertise across high-performance web systems and automated workflows, he leads technical execution across client software solutions, in-house product incubation (SyncedIn, Fanbase, Job Pilot, Pujari.ai), and the Startup Lab ecosystem.
              </p>

              {/* Technical Pillars */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Full-Stack Architecture
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  AI & Automation Workflows
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Product Incubation
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Startup Lab Direction
                </span>
              </div>

              {/* Direct Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-medium text-text-3">
                <a
                  href="https://www.linkedin.com/in/vamsi-vardhan09"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href="https://x.com/orenty"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
                <span>·</span>
                <a
                  href="mailto:contact@orenty.in"
                  className="text-secondary hover:text-white transition-colors"
                >
                  contact@orenty.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Placard 2: Co-Founder & CEO - Sai Ganesh */}
        <div className="rounded-card border border-border bg-surface-2/90 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 relative z-10">
            {/* Framed Co-Founder & CEO Placeholder */}
            <div className="relative shrink-0">
              <div className="relative h-36 w-36 md:h-44 md:w-44 rounded-2xl border border-dashed border-white/20 bg-[#12131A] shadow-2xl overflow-hidden group flex flex-col items-center justify-center text-center p-4">
                <div className="h-14 w-14 rounded-full bg-surface-3 border border-border flex items-center justify-center text-slate-400 mb-2 group-hover:text-primary transition-colors">
                  <User size={26} />
                </div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-medium">
                  Photo coming soon
                </span>
                {/* Subtle inner glass highlight */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Profile & Biography */}
            <div className="flex-1 text-center md:text-left">
              <span className="eyebrow-label block mb-2">LEADERSHIP</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-1">
                Co-Founder & CEO
              </h3>
              <p className="text-base sm:text-lg font-semibold text-slate-200 mb-4">
                Sai Ganesh
              </p>
              
              <p className="text-base text-text-2 leading-relaxed mb-6 max-w-3xl font-normal">
                Sai Ganesh is the Co-Founder & CEO of Orenty, spearheading product vision, venture operations, and company growth. Focused on building software that compounds long-term value, he directs commercial partnerships, drives product-market fit across Orenty&apos;s proprietary ventures, and leads founder alignment across the Startup Lab.
              </p>

              {/* Strategic Pillars */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Product Vision
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Venture Operations
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Client Partnerships
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-surface-3 border border-border text-slate-300">
                  Startup Lab Growth
                </span>
              </div>

              {/* Direct Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-medium text-text-3">
                <a
                  href="https://linkedin.com/company/orenty"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href="https://x.com/orenty"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
                <span>·</span>
                <a
                  href="mailto:contact@orenty.in"
                  className="text-secondary hover:text-white transition-colors"
                >
                  contact@orenty.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
