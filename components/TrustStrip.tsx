'use client';

import React from 'react';
import { Cpu, Sparkles, Terminal, Code2, Globe2, Layers, ShieldCheck, Zap } from 'lucide-react';

interface CapabilityItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
  title: string;
  status?: string;
  accent?: string;
}

const capabilities: CapabilityItem[] = [
  { icon: Terminal, tag: 'STACK', title: 'Next.js 15 & React 19' },
  { icon: Sparkles, tag: 'PRODUCT', title: 'SyncedIn', status: 'BUILDING', accent: '#A78BFA' },
  { icon: Cpu, tag: 'SYSTEMS', title: 'Distributed AI & Workflows' },
  { icon: Code2, tag: 'PRODUCT', title: 'Job Pilot', status: 'BETA', accent: '#38D6FF' },
  { icon: Layers, tag: 'GRAPHICS', title: 'Three.js & Custom WebGL' },
  { icon: Globe2, tag: 'PRODUCT', title: 'Fanbase', status: 'BUILDING', accent: '#F472B6' },
  { icon: Zap, tag: 'PERFORMANCE', title: 'Sub-100ms Edge Compute' },
  { icon: ShieldCheck, tag: 'PRODUCT', title: 'Pujari.ai', status: 'BUILDING', accent: '#FFB547' },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full border-y border-border bg-surface-1/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 py-1 text-xs tracking-wider font-medium text-text-2 transition-colors hover:text-text"
              >
                {/* Tech / Product Icon */}
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-2 text-text-2 shrink-0">
                  <Icon size={14} />
                </span>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-text-3 font-mono tracking-wider">
                      [{item.tag}]
                    </span>
                    {item.status && (
                      <span
                        className="px-1.5 py-0.2 rounded text-xs font-mono font-medium border"
                        style={{
                          color: item.accent || 'var(--secondary)',
                          borderColor: `${item.accent || 'var(--secondary)'}35`,
                          backgroundColor: `${item.accent || 'var(--secondary)'}10`,
                        }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-text tracking-tight text-xs sm:text-sm truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
