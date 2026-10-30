'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteContent, LabChallenge } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Filter,
  CheckCircle2,
  Users,
  Award,
  Terminal,
} from 'lucide-react';

export default function LabPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('All');

  const tracks = ['All', 'AI Automation', 'Full-Stack', 'Product Innovation'];

  const filteredChallenges =
    selectedTrack === 'All'
      ? siteContent.lab.challenges
      : siteContent.lab.challenges.filter((c) => c.track === selectedTrack);

  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Ambient pink/magenta glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-pink-600/15 blur-[160px]" />

      {/* Hero Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-16 w-full text-center md:text-left">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-pink-400 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            <span>DIVISION // 03 // VENTURE INCUBATION</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-none">
            <TextReveal as="span">Orenty Startup Lab.</TextReveal>
          </h1>
          <p className="mt-4 font-mono text-base uppercase tracking-wider text-pink-300 font-semibold">
            {siteContent.lab.tagline}
          </p>
          <p className="mt-6 text-lg text-slate-300 font-body leading-relaxed">
            {siteContent.lab.description}
          </p>

          {/* Strict Ownership Disclaimer */}
          <div className="mt-8 rounded-xl border border-pink-500/30 bg-pink-950/30 p-5 text-sm text-pink-200 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-pink-300 mb-1">
              <ShieldAlert size={16} />
              <span>OFFICIAL OWNERSHIP POLICY</span>
            </div>
            <p className="font-body leading-relaxed">
              {siteContent.lab.ownershipNote}
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Model Walkthrough */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-white/[0.04]">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-pink-400 font-semibold">
            THE INCUBATION CYCLE
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white uppercase mt-2">
            From concept to co-ownership.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {siteContent.lab.steps.map((st, idx) => (
            <GlassCard key={st.step} accentColor="#ec4899" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xl font-extrabold text-pink-400">
                  {st.step}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  PHASE
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{st.title}</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">{st.detail}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Challenge Board */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-pink-400 font-semibold">
              OPEN CHALLENGES
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white uppercase mt-2">
              The Challenge Board
            </h2>
            <p className="mt-2 text-xs text-slate-400 font-mono">
              [NOTICE: All challenges are real architectural milestones under active evaluation]
            </p>
          </div>

          {/* Track Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Filter size={12} /> Filter:
            </span>
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  selectedTrack === track
                    ? 'bg-pink-600 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredChallenges.map((chal) => {
            const accent =
              chal.track === 'AI Automation'
                ? '#8b5cf6'
                : chal.track === 'Full-Stack'
                ? '#ec4899'
                : chal.track === 'Product Innovation'
                ? '#06b6d4'
                : '#f59e0b';

            return (
              <GlassCard key={chal.id} accentColor={accent} className="p-8 flex flex-col justify-between">
                <HudBox label={chal.code} tag={`DIFFICULTY: ${chal.difficulty.toUpperCase()}`} accentColor={accent}>
                  <div className="mt-3">
                    <span
                      className="inline-block text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                      style={{ color: accent }}
                    >
                      {chal.track}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      {chal.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                      {chal.brief}
                    </p>

                    <div className="flex items-center gap-2 rounded-lg bg-navy-900/80 p-3 border border-white/[0.06] text-xs text-slate-300">
                      <Award size={16} className="text-pink-400 shrink-0" />
                      <div>
                        <span className="font-mono text-[10px] uppercase text-slate-400 block">
                          REWARD POOL
                        </span>
                        <span className="font-semibold text-white">{chal.rewardPool}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Status: Open for Submissions
                    </span>

                    <MagneticButton
                      href={`/apply?challenge=${chal.code}`}
                      variant="primary"
                      className="!px-4 !py-2 !text-xs"
                    >
                      Submit Solution
                      <ArrowRight size={13} />
                    </MagneticButton>
                  </div>
                </HudBox>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Propose an Idea Banner */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full border-t border-white/[0.04]">
        <GlassCard accentColor="#ec4899" className="p-10 md:p-14 text-center">
          <HudBox label="PROPOSE A VENTURE" tag="OPEN INCUBATION" accentColor="#ec4899">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
                Have a breakthrough startup idea?
              </h2>
              <p className="text-sm text-slate-300 font-body leading-relaxed mb-8">
                If you have conceptualized a high-leverage product problem, submit your architecture to the Lab. If selected, Orenty provides engineering resources and co-founds the company with you.
              </p>

              <MagneticButton href="/apply?track=new-idea" variant="primary">
                Propose Startup Concept
                <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </HudBox>
        </GlassCard>
      </section>
    </div>
  );
}
