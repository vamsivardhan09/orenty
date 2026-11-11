'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function AboutStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20 w-full border-t border-border">
      <div className="relative rounded-card border border-border bg-surface-2/80 backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 overflow-hidden">
        {/* Subtle traveling laser accent */}
        <div className="laser-line-top" />

        {/* Studio Monogram Emblem */}
        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl border border-border-top bg-surface-3 flex items-center justify-center shrink-0 shadow-lg group">
          <div className="flex flex-col items-center justify-center text-center p-3">
            <Compass size={32} className="text-secondary mb-2" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3 font-semibold">
              STUDIO // LAB
            </span>
          </div>
          {/* Subtle glowing ring */}
          <div className="absolute inset-0 rounded-2xl border border-secondary/20 pointer-events-none" />
        </div>

        {/* Story + Link */}
        <div className="flex-1 text-center md:text-left">
                    <p className="text-base text-text leading-relaxed font-normal mb-5 max-w-lg">
            Orenty was founded to build software that solves real business problems without bureaucratic bloat or fragile templates. We design, engineer, and automate systems for ambitious companies while incubating proprietary products of our own.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-2 hover:text-white transition-colors"
          >
            <span>Learn about our philosophy & team</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
