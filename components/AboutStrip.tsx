'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

export default function AboutStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20 w-full border-t border-border">
      <div className="rounded-card border border-border bg-surface-2 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        {/* Founder Photo Placeholder */}
        <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border border-border-top bg-surface-3 flex items-center justify-center shrink-0 text-text-3 shadow-inner">
          <div className="flex flex-col items-center justify-center text-center p-2">
            <User size={32} className="text-secondary/70 mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-text-3 font-medium">
              [CONFIRM PHOTO]
            </span>
          </div>
        </div>

        {/* 2-Sentence Story + Link */}
        <div className="flex-1 text-center md:text-left">
          <span className="eyebrow-label block mb-2">ABOUT ORENTY</span>
          <p className="text-base sm:text-lg text-text leading-relaxed font-normal mb-6">
            Orenty was founded to build software that solves real business problems without bureaucratic bloat or fragile templates. We design, engineer, and automate systems for ambitious companies while incubating proprietary products of our own.
          </p>
          <Link
            href="/about"
            className="btn-tertiary text-sm"
          >
            <span>About Orenty</span>
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
