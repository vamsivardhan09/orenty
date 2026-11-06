'use client';

import React from 'react';
import { Cpu, Sparkles, Terminal, Code2, Globe2, Layers, ShieldCheck, Zap } from 'lucide-react';

interface MarqueeItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
  title: string;
  status?: string;
  accent?: string;
}

const capabilities: MarqueeItem[] = [
  { icon: Terminal, tag: 'STACK', title: 'Next.js 15 App Router & React 19' },
  { icon: Sparkles, tag: 'PRODUCT', title: 'SyncedIn', status: 'BUILDING', accent: '#A78BFA' },
  { icon: Cpu, tag: 'SYSTEMS', title: 'Distributed AI & Agentic Workflows' },
  { icon: Code2, tag: 'PRODUCT', title: 'Job Pilot', status: 'BETA', accent: '#38D6FF' },
  { icon: Layers, tag: '3D/GRAPHICS', title: 'Three.js & Custom WebGL Shaders' },
  { icon: Globe2, tag: 'PRODUCT', title: 'Fanbase', status: 'BUILDING', accent: '#F472B6' },
  { icon: Zap, tag: 'PERFORMANCE', title: 'Sub-100ms Global Edge Compute' },
  { icon: ShieldCheck, tag: 'PRODUCT', title: 'Pujari.ai', status: 'BUILDING', accent: '#FFB547' },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-border bg-surface-1/90 backdrop-blur-md">
      {/* Top and Bottom Traveling Laser Beams */}
      <div className="laser-line-top" />
      <div className="laser-line-bottom" />

      {/* Marquee Track */}
      <div className="py-4.5 sm:py-5 flex items-center">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap will-change-transform">
          {/* Repeat twice for continuous seamless infinite loop */}
          {[...capabilities, ...capabilities].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 text-xs tracking-wider uppercase font-medium text-text-2 transition-colors hover:text-text"
              >
                {/* Tech / Product Icon */}
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-surface-2 text-secondary shrink-0">
                  <Icon size={13} />
                </span>

                {/* Category tag */}
                <span className="text-[10px] text-text-3 font-mono tracking-widest">
                  [{item.tag}]
                </span>

                {/* Title */}
                <span className="font-semibold text-text tracking-normal normal-case text-sm">
                  {item.title}
                </span>

                {/* Optional Status Pill */}
                {item.status && (
                  <span
                    className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border border-border shrink-0"
                    style={{
                      color: item.accent || 'var(--secondary)',
                      borderColor: `${item.accent || 'var(--secondary)'}40`,
                      backgroundColor: `${item.accent || 'var(--secondary)'}12`,
                    }}
                  >
                    ● {item.status}
                  </span>
                )}

                {/* Divider dot */}
                <span className="ml-6 text-border select-none">/</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
