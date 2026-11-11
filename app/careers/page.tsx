import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import LabTimeline from '@/components/LabTimeline';
import CareerChallengesBrowser from '@/components/CareerChallengesBrowser';
import RulesAndFairness from '@/components/RulesAndFairness';
import CareersFaq from '@/components/CareersFaq';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers & Startup Lab | Solve Problems, Earn Ownership',
  description:
    'Join Orenty Startup Lab. Pick a challenge, submit your architectural solution, and earn equity in products you help build.',
};

export default function CareersPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Background warm amber glow (strictly on /careers) */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-warm/[0.06] blur-[160px]" />

      {/* 1. Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-16 w-full">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-warm" />
            <span className="text-xs font-semibold uppercase tracking-widest text-warm">
              STARTUP LAB
            </span>
          </div>

          <h1 className="h1-hero text-text mb-6">
            Solve real startup problems. Earn ownership.
          </h1>

          <p className="sub-paragraph text-text-2 mb-10 max-w-2xl">
            Pick a challenge, submit your solution, and if it's one of the best, join the team that builds it. The best contributors may earn ownership in what we launch.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button href="#challenges" variant="primary">
              <span>View open challenges</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Button>
            <a
              href="#how-it-works"
              className="btn-secondary justify-center text-sm"
            >
              <span>How it works</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. How It Works (Vertical Timeline with dynamic amber line) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-warm block mb-2">
            THE PROCESS
          </span>
          <h2 className="h2-section text-text">
            From challenge submission to product equity.
          </h2>
        </div>

        <LabTimeline />
      </section>

      {/* 3. Open Challenges Browser (Filters + Responsive Grid / Mobile Swipe Carousel) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-warm block mb-2">
            ACTIVE OPPORTUNITIES
          </span>
          <h2 className="h2-section text-text mb-3">
            Open engineering & design challenges.
          </h2>
          <p className="sub-paragraph text-text-2">
            Select a challenge track and submit your solution before the milestone deadline.
          </p>
        </div>

        <CareerChallengesBrowser />
      </section>

      {/* 4. Rules & Fairness (Mandatory legal policy) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <RulesAndFairness />
      </section>

      {/* 5. FAQ (6+ questions) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <CareersFaq />
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full border-t border-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="h2-section text-text mb-4">
            Ready to test your engineering skills?
          </h2>
          <p className="sub-paragraph text-text-2 mb-8">
            Choose an open challenge above and submit your code. We review every serious entry.
          </p>
          <Button href="#challenges" variant="primary">
            <span>Explore challenges</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>
      </section>
    </div>
  );
}
