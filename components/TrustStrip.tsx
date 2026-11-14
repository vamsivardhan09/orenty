'use client';

import React from 'react';
import { Globe, Smartphone, Cpu, TrendingUp, Sparkles, Heart, Compass, Flame } from 'lucide-react';

interface TickerItem {
  type: 'product' | 'service';
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  category: string;
}

const showcaseItems: TickerItem[] = [
  // Our 4 In-House Products
  {
    type: 'product',
    name: 'SyncedIn',
    icon: Sparkles,
    accent: '#818CF8',
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Fanbase',
    icon: Heart,
    accent: '#F472B6',
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Job Pilot',
    icon: Compass,
    accent: '#38BDF8',
    category: 'Product',
  },
  {
    type: 'product',
    name: 'Pujari.ai',
    icon: Flame,
    accent: '#FBBF24',
    category: 'Product',
  },
  // Our 4 Client Services
  {
    type: 'service',
    name: 'Websites & Web Apps',
    icon: Globe,
    accent: '#818CF8',
    category: 'Service',
  },
  {
    type: 'service',
    name: 'Mobile Apps',
    icon: Smartphone,
    accent: '#38BDF8',
    category: 'Service',
  },
  {
    type: 'service',
    name: 'AI & Automation',
    icon: Cpu,
    accent: '#34D399',
    category: 'Service',
  },
  {
    type: 'service',
    name: 'Growth & Product Strategy',
    icon: TrendingUp,
    accent: '#FBBF24',
    category: 'Service',
  },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-white/[0.08] bg-[#07080E]/90 backdrop-blur-xl">
      {/* Top and Bottom Traveling Laser Seams */}
      <div className="laser-line-top" />
      <div className="laser-line-bottom" />

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
                {/* Brand Logo / Icon Badge */}
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${item.accent}12`,
                    borderColor: `${item.accent}35`,
                    color: item.accent,
                    boxShadow: `0 0 12px ${item.accent}20`,
                  }}
                >
                  <Icon size={14} />
                </div>

                {/* Name */}
                <span className="text-xs sm:text-[13px] font-semibold text-white tracking-wide group-hover:text-indigo-200 transition-colors">
                  {item.name}
                </span>

                {/* Clean Type Indicator */}
                <span
                  className="px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider rounded-full border"
                  style={{
                    color: item.accent,
                    borderColor: `${item.accent}30`,
                    backgroundColor: `${item.accent}10`,
                  }}
                >
                  {item.category}
                </span>

                {/* Subtle Divider Bullet */}
                <div className="flex items-center ml-6 text-white/20">
                  <span className="text-[10px] text-white/30 font-mono">✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
