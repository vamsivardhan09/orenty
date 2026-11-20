import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import CareerChallengesBrowser from '@/components/CareerChallengesBrowser';
import { Target, Send, SearchCheck, Users, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Startup Lab | Challenges & Co-Builder Ownership',
  description:
    'Solve real software and AI challenges at Orenty Startup Lab. Top contributors join the core team and earn ownership in launched products.',
};

const steps = [
  {
    step: '01',
    icon: Target,
    title: 'Select a Challenge',
    desc: 'Browse open problems in vector search, streaming audio, ATS parsing, and creator tools.',
  },
  {
    step: '02',
    icon: Send,
    title: 'Build & Submit',
    desc: 'Submit your runnable prototype, GitHub repository, or architecture diagram.',
  },
  {
    step: '03',
    icon: SearchCheck,
    title: 'Technical Review',
    desc: 'Our engineering team reviews your solution for performance, code quality, and UX polish.',
  },
  {
    step: '04',
    icon: Users,
    title: 'Earn Ownership',
    desc: 'Top contributors join the core product squad and can earn real project ownership.',
  },
];

export default function StartupLabPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Warm ambient lighting */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-warm/[0.06] blur-[170px]" />

      {/* 1. Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-warm/30 bg-warm/10 text-warm text-xs font-mono font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-warm animate-pulse" />
            <span>STARTUP LAB · ACTIVE CHALLENGE INTAKE</span>
          </div>

          <h1 className="h1-hero text-text mb-6">
            Build what’s next. Earn ownership.
          </h1>

          <p className="sub-paragraph text-text-2 mb-8 max-w-2xl font-normal leading-relaxed">
            We identify real startup problems, scope technical milestones, and invite exceptional engineers and designers to solve them. The best contributors form the launch team and can earn ownership in the products they help build.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="#challenges" variant="primary">
              <span>Explore challenges</span>
              <ArrowRight size={14} className="btn-arrow" />
            </Button>
            <Button href="/apply" variant="secondary">
              <span>Submit custom idea</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. How it works (4-step sequence) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 w-full border-t border-border">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-label block mb-2 text-warm font-mono">THE CO-BUILDER MODEL</span>
          <h2 className="h2-section text-text">
            How the Startup Lab works.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <GlassCard key={st.step} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg border border-warm/25 bg-warm/10 text-warm flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">{st.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-text-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. Challenge Board */}
      <section id="challenges" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border scroll-mt-20">
        <div className="max-w-2xl mb-8">
          <span className="eyebrow-label block mb-2 text-warm font-mono">ACTIVE MILESTONES</span>
          <h2 className="h2-section text-text mb-3">
            Open Startup Challenges.
          </h2>
          <p className="sub-paragraph text-text-2">
            Select an active challenge below to review technical requirements, deliverables, and submission guidelines.
          </p>
        </div>

        <CareerChallengesBrowser />
      </section>

      {/* 4. Ownership Transparency Notice */}
      <section id="ownership" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border scroll-mt-20">
        <GlassCard className="p-8 md:p-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 text-warm font-mono text-xs uppercase tracking-wider mb-3">
              <Award size={16} />
              <span>Ownership & Fairness Terms</span>
            </div>
            <h2 className="h2-section text-text mb-4">
              Real ownership for real builders.
            </h2>
            <p className="text-base text-text-2 leading-relaxed mb-6 font-normal">
              The best contributors can earn ownership in the product they help build. Terms are set per challenge and agreed upon before work begins.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Merit-Driven</h4>
                <p className="text-xs text-text-3 leading-relaxed">
                  Evaluated purely on solution quality, speed, and architectural elegance—not resumes.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Direct Collaboration</h4>
                <p className="text-xs text-text-3 leading-relaxed">
                  Work directly with Orenty technical leads with full code transparency and live feedback.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Clean IP Alignment</h4>
                <p className="text-xs text-text-3 leading-relaxed">
                  Clear contributor agreements ensuring mutual alignment and transparent equity terms.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-text-3 font-mono">Ready to submit a solution or pitch your own idea?</span>
              <Button href="/apply" variant="primary">
                <span>Go to application form</span>
                <ArrowRight size={14} className="btn-arrow" />
              </Button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
