'use client';

import React from 'react';
import { Cpu, Sparkles, Terminal, Code2, Globe2, Layers, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

interface MarqueeItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
  title: string;
  status?: string;
  accent?: string;
}

const capabilities: MarqueeItem[] = [
  { icon: ShieldCheck, tag: 'PRODUCT', title: 'Pujari.ai', status: 'BUILDING', accent: '#D97706' },
  { icon: Terminal, tag: 'STACK', title: 'Next.js 15 App Router & React 19' },
  { icon: Sparkles, tag: 'PRODUCT', title: 'SyncedIn', status: 'BUILDING', accent: '#6366F1' },
  { icon: Cpu, tag: 'SYSTEMS', title: 'Distributed AI & Agentic Workflows' },
  { icon: Code2, tag: 'PRODUCT', title: 'Job Pilot', status: 'BETA', accent: '#0284C7' },
  { icon: Zap, tag: 'PERFORMANCE', title: 'Sub-100ms Global Edge Compute' },
  { icon: Globe2, tag: 'PRODUCT', title: 'Fanbase', status: 'BUILDING', accent: '#EC4899' },
  { icon: Layers, tag: '3D/GRAPHICS', title: 'Three.js & Custom WebGL Shaders' },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-black/[0.08] bg-white/80 backdrop-blur-md">
      {/* Top and Bottom Traveling Laser Beams */}
      <div className="laser-line-top" />
      <div className="laser-line-bottom" />

      {/* Marquee Track */}
      <div className="py-3.5 sm:py-4 flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap will-change-transform">
          {/* Repeat twice for continuous seamless infinite loop */}
          {[...capabilities, ...capabilities].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs tracking-wider uppercase font-medium text-slate-700 transition-colors hover:text-slate-900"
              >
                {/* Tech / Product Icon */}
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-black/[0.08] bg-slate-50 text-indigo-600 shrink-0 shadow-sm">
                  <Icon size={12} />
                </span>

                {/* Category tag */}
                <span className="text-[11px] text-slate-400 font-mono tracking-widest">
                  [{item.tag}]
                </span>

                {/* Title */}
                <span className="font-semibold text-slate-900 tracking-normal normal-case text-xs sm:text-sm">
                  {item.title}
                </span>

                {/* Optional Status Pill */}
                {item.status && (
                  <span
                    className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border shrink-0"
                    style={{
                      color: item.accent || '#6366F1',
                      borderColor: `${item.accent || '#6366F1'}40`,
                      backgroundColor: `${item.accent || '#6366F1'}12`,
                    }}
                  >
                    ● {item.status}
                  </span>
                )}

                {/* Vertical slide bar separator */}
                <div className="flex items-center gap-2 ml-5 text-black/20 shrink-0">
                  <ChevronRight size={12} className="text-black/30" />
                  <span className="h-3.5 w-[1.5px] bg-black/15 select-none inline-block" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
