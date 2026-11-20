'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function AboutStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20 w-full border-t border-border">
      <div className="relative rounded-card border border-border bg-surface-2/80 backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 overflow-hidden">
        {/* Subtle traveling laser accent */}
        <div className="laser-line-top" />

        {/* Co-Founder & CTO Portrait Frame */}
        <div className="relative shrink-0">
          <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl border border-white/15 bg-[#12131A] shadow-xl overflow-hidden group">
            <Image
              src="/team/co-founder-cto.jpg"
              alt="Sai Gumma - Co-Founder & CTO"
              fill
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
          </div>
          <div className="absolute -bottom-2 -right-1 bg-[#0D0F14]/95 backdrop-blur-md border border-white/15 px-2 py-0.5 rounded-full text-[9px] font-mono text-emerald-400 flex items-center gap-1 shadow-md z-10">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wider">CO-FOUNDER & CTO</span>
          </div>
        </div>

        {/* Story + Link */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-base text-text leading-relaxed font-normal mb-5 max-w-lg">
            Co-founded by Sai Gumma (Co-Founder & CTO), Orenty was built to deliver software that solves real business problems without bureaucratic bloat or fragile templates. We design, engineer, and automate systems for ambitious companies while incubating proprietary products of our own.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-2 hover:text-white transition-colors"
          >
            <span>Learn about our story & leadership</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
