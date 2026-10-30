import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Hero from '@/components/Hero';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col">
      {/* 3D Hero Section */}
      <Hero />

      {/* Division Teaser Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {siteContent.divisions.map((div) => (
            <GlassCard key={div.id} accentColor={div.accent} className="p-6">
              <HudBox label={`DIV // ${div.number}`} tag={div.badge} accentColor={div.accent}>
                <h3 className="font-display text-xl font-bold text-white mt-2">
                  {div.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {div.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs font-mono font-medium text-violet-300">
                  <Link href={div.href} className="hover:underline flex items-center gap-1.5 group">
                    <span>Explore Division</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </HudBox>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
