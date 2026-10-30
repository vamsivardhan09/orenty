'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteContent, LabChallenge } from '@/content/site';
import GlassCard from './GlassCard';
import HudBox from './HudBox';
import { Pause, Play, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DriftingLabTiles() {
  const [isPaused, setIsPaused] = useState(false);
  const challenges = siteContent.lab.challenges;

  return (
    <div className="relative w-full">
      {/* Controls Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            ACTIVE CHALLENGE FEED // LIVE
          </span>
        </div>

        {/* Pause / Resume Control */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-violet-500/40 hover:text-white"
          data-cursor-expand="true"
        >
          {isPaused ? <Play size={12} className="text-emerald-400" /> : <Pause size={12} className="text-violet-400" />}
          <span>{isPaused ? 'Resume Drift' : 'Pause Drift'}</span>
        </button>
      </div>

      {/* Grid of Challenges with ambient drift when not paused */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((chal, index) => {
          // Track accent color
          const accent =
            chal.track === 'AI Automation'
              ? '#8b5cf6'
              : chal.track === 'Full-Stack'
              ? '#ec4899'
              : chal.track === 'Product Innovation'
              ? '#06b6d4'
              : '#f59e0b';

          return (
            <div
              key={chal.id}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
                animationDelay: `${index * 0.8}s`,
              }}
              className="animate-float"
            >
              <GlassCard
                accentColor={accent}
                className="h-full flex flex-col justify-between p-6 hover:shadow-[0_20px_40px_rgba(139,92,246,0.18)]"
              >
                <HudBox label={chal.code} tag={chal.difficulty} accentColor={accent}>
                  <div className="mt-2">
                    <span
                      className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider mb-2"
                      style={{ color: accent }}
                    >
                      {chal.track}
                    </span>
                    <h4 className="font-display text-base font-bold text-white line-clamp-2">
                      {chal.title}
                    </h4>
                    <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {chal.brief}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-300">
                      <ShieldCheck size={13} className="text-violet-400" />
                      <span>{chal.rewardPool}</span>
                    </div>

                    <Link
                      href={`/apply?challenge=${chal.code}`}
                      className="inline-flex items-center justify-between text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors group"
                    >
                      <span>Take Challenge</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </HudBox>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
