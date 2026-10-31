import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ApplyForm from '@/components/ApplyForm';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import TextReveal from '@/components/TextReveal';
import { Sparkles, Loader2, Code2, Box, FlaskConical, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Orenty across client software engineering, proprietary venture platforms, or the Startup Lab co-founding track.',
};

const openTracks = [
  {
    division: '01 / SOFTWARE SOLUTIONS',
    title: 'Senior Full-Stack & AI Systems Engineer',
    type: 'Full-Time / Contract',
    location: 'Remote (Global)',
    accent: '#6366f1',
    icon: Code2,
    description:
      'Architect resilient web platforms, bespoke client infrastructures, and agentic AI automation pipelines with Next.js, TypeScript, and modern cloud stacks.',
  },
  {
    division: '02 / PROPRIETARY BUILDS',
    title: 'Founding Engineer — Consumer Platforms',
    type: 'Core Product Team',
    location: 'Remote',
    accent: '#8b5cf6',
    icon: Box,
    description:
      'Take sovereign ownership of proprietary platforms like SyncedIn, Fanbase, Job Pilot, and Pujari.ai from architecture to global scale.',
  },
  {
    division: '03 / STARTUP LAB',
    title: 'Venture Fellow & Challenge Co-Founder',
    type: 'Co-Ownership Track',
    location: 'Asynchronous',
    accent: '#ec4899',
    icon: FlaskConical,
    description:
      'Solve live startup challenges, lead sprint submissions, and earn direct equity and product ownership on the products you build.',
  },
];

export default function CareersPage() {
  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-violet-600/15 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-20 pb-28 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
            <Sparkles size={14} />
            <span>ORENTY // CAREERS & VENTURE TRACKS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            <TextReveal as="span">Build what&apos;s next with us.</TextReveal>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-body leading-relaxed">
            We are assembling exceptional software engineers, AI builders, and venture creators across our software studio, proprietary products, and Startup Lab.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-300 hover:text-white transition-colors border border-violet-500/30 bg-violet-950/40 px-4 py-2 rounded-full"
            >
              <span>Jump to Application Form</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Career Tracks Grid */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              Active Opportunities
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              3 Primary Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openTracks.map((track) => {
              const Icon = track.icon;
              return (
                <GlassCard
                  key={track.title}
                  accentColor={track.accent}
                  maxTilt={3}
                  className="p-6 flex flex-col justify-between"
                >
                  <HudBox label={track.division} tag={track.type} accentColor={track.accent}>
                    <div className="mt-3">
                      <div
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 mb-4"
                        style={{ color: track.accent }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {track.title}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-3">
                        {track.location}
                      </p>
                      <p className="text-xs text-slate-300/80 leading-relaxed font-body">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.06]">
                      <a
                        href="#apply"
                        className="font-display text-xs uppercase tracking-widest font-semibold text-violet-300 hover:text-white transition-colors"
                      >
                        Apply for this track &rarr;
                      </a>
                    </div>
                  </HudBox>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Ownership Notice Callout */}
        <div className="mb-20 rounded-xl border border-violet-500/20 bg-violet-950/20 p-6 text-center max-w-2xl mx-auto backdrop-blur-md">
          <p className="font-mono text-xs uppercase tracking-wider text-violet-300 font-semibold mb-1">
            Ownership & Equity Policy
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-body">
            The best contributors can earn ownership in the product they help build. Terms are set per challenge or engagement.
          </p>
        </div>

        {/* Application Form Section */}
        <div id="apply" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Intake Application
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-body">
              Submit your portfolio, GitHub, or challenge solution below. We review every application carefully.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-violet-400" size={32} />
              </div>
            }
          >
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
