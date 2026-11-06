'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import SectionHeader from './SectionHeader';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import Badge from './Badge';
import { ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';

export default function StartupLabSection() {
  const { lab } = siteContent;
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineFill, setLineFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const start = windowHeight * 0.8;
      const current = start - rect.top;
      const progress = Math.min(Math.max(current / totalHeight, 0), 1);
      setLineFill(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="lab" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28 w-full border-t border-surface-border">
      {/* Background subtle amber warmth (6-10% opacity) */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-warm/[0.06] blur-[160px]" />

      <SectionHeader
        eyebrow={lab.eyebrow}
        headline={lab.headline}
        subheadline={lab.subheadline}
        eyebrowColor="warm"
      />

      {/* Honest Ownership Note */}
      <div className="mb-14 inline-flex items-center gap-3 rounded-card border border-warm/30 bg-warm/[0.08] px-5 py-3 text-xs sm:text-sm text-warm backdrop-blur-md max-w-2xl">
        <ShieldAlert size={18} className="text-warm shrink-0" />
        <span>{lab.ownershipNote}</span>
      </div>

      {/* How it works: Vertical Timeline with Line that Fills as you scroll */}
      <div className="mb-20">
        <h3 className="font-display text-xl lg:text-2xl font-bold text-text mb-8">
          How it works
        </h3>

        <div ref={timelineRef} className="relative pl-8 md:pl-10 space-y-8 max-w-3xl">
          {/* Background Track Line */}
          <div className="absolute left-[13px] md:left-[17px] top-2 bottom-2 w-[2px] bg-white/10" />

          {/* Dynamic Filling Line (Amber) */}
          <div
            className="absolute left-[13px] md:left-[17px] top-2 w-[2px] bg-warm transition-all duration-150 ease-out"
            style={{
              height: `calc(${lineFill * 100}% - 8px)`,
            }}
          />

          {lab.steps.map((st) => (
            <div key={st.step} className="relative flex items-start gap-4 group">
              {/* Node Indicator */}
              <div className="absolute -left-[30px] md:-left-[36px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-warm/40 bg-bg-elevated text-warm text-xs font-mono font-bold shadow-[0_0_12px_rgba(255,181,71,0.25)]">
                {st.step}
              </div>

              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-text mb-1">
                  {st.title}
                </h4>
                <p className="text-sm text-text-2 leading-relaxed font-normal">
                  {st.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Challenge Cards (Mobile: Stacking; Tablet: 2-col; Desktop: 4-col) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="eyebrow-label text-warm block mb-1 text-xs">CHALLENGES</span>
            <h3 className="font-display text-2xl font-bold text-text">
              Active open challenges
            </h3>
          </div>
          <Link
            href="/lab"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-warm hover:text-white transition-colors"
          >
            <span>All challenges</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <StackContainer totalCards={lab.challenges.length}>
          {lab.challenges.map((ch) => (
            <GlassCard
              key={ch.id}
              className="flex flex-col justify-between h-full p-6 md:p-7 border-warm/20"
            >
              <div>
                {/* Top Code & Difficulty Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-text-3 font-semibold tracking-wider">
                    {ch.code}
                  </span>
                  <Badge variant="equity" className="text-[11px] font-mono">
                    {ch.difficulty}
                  </Badge>
                </div>

                {/* Challenge Title */}
                <h4 className="font-display text-lg font-bold text-text mb-3 leading-snug">
                  {ch.title}
                </h4>

                {/* Problem Statement */}
                <p className="text-sm text-text-2 leading-relaxed mb-6 font-normal">
                  {ch.problem}
                </p>
              </div>

              <div>
                {/* Reward & Deadline */}
                <div className="mb-5 pt-4 border-t border-surface-border text-xs flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-text-3 font-mono">REWARD:</span>
                    <span className="text-warm font-semibold flex items-center gap-1">
                      <Sparkles size={12} />
                      {ch.reward}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-3 font-mono">DEADLINE:</span>
                    <span className="text-text-2 font-mono">{ch.deadline}</span>
                  </div>
                </div>

                {/* View Challenge Button */}
                <Link
                  href={`/lab#${ch.id}`}
                  className="btn-secondary w-full !text-xs !py-3 !min-h-[42px] border-warm/30 hover:border-warm text-warm hover:text-white"
                >
                  <span>View challenge</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>
          ))}
        </StackContainer>
      </div>
    </section>
  );
}
