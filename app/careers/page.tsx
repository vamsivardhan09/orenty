import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import CareersFaq from '@/components/CareersFaq';
import { ArrowRight, Mail, Code2, Sparkles, CheckCircle2, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers & Talent Network | Orenty',
  description:
    'Join Orenty as a core engineer or co-builder in our Startup Lab. Explore open challenges, talent network, and equity opportunities.',
};

export default function CareersPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-secondary/[0.07] blur-[160px]" />

      {/* 1. Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-xs font-mono font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>CO-BUILDER INTAKE OPEN IN STARTUP LAB</span>
          </div>

          <h1 className="h1-hero text-text mb-6">
            Build products with us.
          </h1>

          <p className="sub-paragraph text-text-2 mb-8 max-w-2xl font-normal leading-relaxed">
            We build software for ambitious businesses and launch ventures of our own. If you want to solve real technical milestones and earn ownership in what we launch, explore our open Startup Lab challenges.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="/lab" variant="primary">
              <span>Explore Startup Lab challenges</span>
              <ArrowRight size={14} className="btn-arrow" />
            </Button>
            <Button href="#talent-network" variant="secondary">
              <span>Join talent network</span>
            </Button>
          </div>
        </div>

        {/* 2. Co-Builder vs Full-Time Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <Award size={14} className="text-warm" />
                <span>Startup Lab</span>
              </div>
              <div className="text-xl font-bold text-text mb-1.5">Challenge Intake Active</div>
              <p className="text-xs text-text-2 leading-relaxed">
                6 live challenges in AI, audio sync, and semantic search with project equity rewards.
              </p>
            </div>
            <Link href="/lab" className="btn-tertiary text-xs mt-4">
              <span>View challenges</span>
              <ArrowRight size={12} className="btn-arrow" />
            </Link>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <Code2 size={14} className="text-secondary" />
                <span>Core Engineering</span>
              </div>
              <div className="text-xl font-bold text-text mb-1.5">Project Sprints</div>
              <p className="text-xs text-text-2 leading-relaxed">
                Full-stack engineers and UI architects engaged on a dedicated milestone basis.
              </p>
            </div>
            <a href="mailto:contact@orenty.in" className="btn-tertiary text-xs mt-4">
              <span>Inquire directly</span>
              <ArrowRight size={12} className="btn-arrow" />
            </a>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <Sparkles size={14} className="text-indigo-400" />
                <span>Talent Network</span>
              </div>
              <div className="text-xl font-bold text-text mb-1.5">Priority Review</div>
              <p className="text-xs text-text-2 leading-relaxed">
                Introduce your portfolio and past work for upcoming architecture contracts and venture squads.
              </p>
            </div>
            <a href="#talent-network" className="btn-tertiary text-xs mt-4">
              <span>Connect below</span>
              <ArrowRight size={12} className="btn-arrow" />
            </a>
          </GlassCard>
        </div>
      </section>

      {/* 3. Future Openings / Talent Network Card */}
      <section id="talent-network" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 w-full border-t border-border scroll-mt-20">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="eyebrow-label block mb-3 font-mono">PRIORITY ROSTER</span>
            <h2 className="h2-section text-text mb-4">
              Join our private engineering roster.
            </h2>
            <p className="text-base text-text-2 leading-relaxed mb-6 font-normal">
              We are always eager to connect with senior full-stack architects, distributed systems developers, and pragmatic AI engineers. When new client contracts or venture milestones launch, we reach out to our private talent network first.
            </p>
            <p className="text-sm text-text-3 leading-relaxed mb-8">
              Share your GitHub, portfolio, or past production systems directly with our technical leadership.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="mailto:contact@orenty.in?subject=Engineering%20Talent%20Roster%20-%20Orenty"
                className="btn-primary"
              >
                <Mail size={15} />
                <span>Email your portfolio (contact@orenty.in)</span>
              </a>

              <Link
                href="/about"
                className="btn-secondary"
              >
                <span>About our philosophy</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 4. What we value */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow-label block mb-2 font-mono">ENGINEERING PRINCIPLES</span>
          <h2 className="h2-section text-text">
            What we value in builders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-secondary mb-4 text-xs font-mono font-semibold">
              01
            </div>
            <h3 className="text-base font-semibold text-text mb-2">Proof of Velocity</h3>
            <p className="text-xs text-text-2 leading-relaxed">
              We care about shipping production code that solves real business problems. Working prototypes beat credentials every time.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-secondary mb-4 text-xs font-mono font-semibold">
              02
            </div>
            <h3 className="text-base font-semibold text-text mb-2">Obsession with Polish</h3>
            <p className="text-xs text-text-2 leading-relaxed">
              Every detail matters: 60fps animations, sub-second latency, accessible DOM trees, and resilient error states.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-secondary mb-4 text-xs font-mono font-semibold">
              03
            </div>
            <h3 className="text-base font-semibold text-text mb-2">Skin in the Game</h3>
            <p className="text-xs text-text-2 leading-relaxed">
              We look for founders and builders who want real equity ownership in products they architect, not just hourly tasks.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <CareersFaq />
      </section>
    </div>
  );
}
