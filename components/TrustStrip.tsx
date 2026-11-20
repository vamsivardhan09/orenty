'use client';

import React from 'react';
import { Globe, Smartphone, Cpu, TrendingUp, Sparkles, Heart, Compass, Flame } from 'lucide-react';

interface TickerItem {
  type: 'product' | 'service';
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
}

const showcaseItems: TickerItem[] = [
  // Our 4 In-House Products
  {
    type: 'product',
    name: 'SyncedIn',
    icon: Sparkles,
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Fanbase',
    icon: Heart,
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Job Pilot',
    icon: Compass,
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Pujari.ai',
    icon: Flame,
    category: 'Product',
  },
  // Our 4 Client Services
  {
    type: 'service',
    name: 'Websites & Web Apps',
    icon: Globe,
    category: 'Service',
  },
  {
    type: 'service',
    name: 'Mobile Apps',
    icon: Smartphone,
    category: 'Service',
  },
  {
    type: 'service',
    name: 'AI & Automation',
    icon: Cpu,
    category: 'Service',
  },
  {
    type: 'service',
    name: 'Growth & Product Strategy',
    icon: TrendingUp,
    category: 'Service',
  },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-white/[0.08] bg-[#030305]/85 backdrop-blur-xl">
      {/* Infinite Seamless Marquee */}
      <div className="py-3.5 sm:py-4 flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap will-change-transform">
          {/* Repeated twice for infinite continuous scroll */}
          {[...showcaseItems, ...showcaseItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 select-none transition-transform duration-200"
              >
                {/* Titanium Icon Badge */}
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-neutral-300 transition-all duration-300 group-hover:scale-105 group-hover:border-white/30 group-hover:text-white group-hover:bg-white/[0.08]">
                  <Icon size={13} />
                </div>

                {/* Name */}
                <span className="text-xs sm:text-[13px] font-medium text-neutral-200 tracking-wide group-hover:text-white transition-colors">
                  {item.name}
                </span>

                {/* Clean Titanium Type Indicator */}
                <span className="px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider rounded-full border border-white/[0.1] bg-white/[0.03] text-neutral-400">
                  {item.category}
                </span>

                {/* Subtle Divider Bullet */}
                <div className="flex items-center ml-6 text-white/20">
                  <span className="text-[10px] text-white/25 font-mono">✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
