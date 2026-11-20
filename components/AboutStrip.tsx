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

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Centered Circular Co-Founder & CTO Portrait */}
            <div className="relative shrink-0">
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full border-2 border-white/20 bg-black/60 shadow-2xl overflow-hidden group">
                <Image
                  src="/team/vamsi-vardhan.jpg"
                  alt="Vamsi Vardhan - Co-Founder & CTO"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25 pointer-events-none" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] pointer-events-none" />
              </div>
            </div>

            {/* Profile & Biography */}
            <div className="flex-1 w-full text-center md:text-left">
              <span className="eyebrow-label block mb-2 font-mono">LEADERSHIP</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-1">
                Co-Founder & CTO
              </h3>
              <p className="text-base sm:text-lg font-semibold text-slate-200 mb-4">
                Vamsi Vardhan
              </p>
              
              <p className="text-base text-text-2 leading-relaxed mb-6 font-normal">
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
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-[100px]" />

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Centered Circular Co-Founder & CEO Portrait */}
            <div className="relative shrink-0">
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full border-2 border-white/20 bg-black/60 shadow-2xl overflow-hidden group">
                <Image
                  src="/team/sai-ganesh.jpg"
                  alt="Sai Ganesh - Co-Founder & CEO"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-cover object-[center_20%] transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25 pointer-events-none" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] pointer-events-none" />
              </div>
            </div>

            {/* Profile & Biography */}
            <div className="flex-1 w-full text-center md:text-left">
              <span className="eyebrow-label block mb-2 font-mono">LEADERSHIP</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-1">
                Co-Founder & CEO
              </h3>
              <p className="text-base sm:text-lg font-semibold text-slate-200 mb-4">
                Sai Ganesh
              </p>
              
              <p className="text-base text-text-2 leading-relaxed mb-6 font-normal">
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
