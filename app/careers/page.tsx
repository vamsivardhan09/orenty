import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import CareersFaq from '@/components/CareersFaq';
import { ArrowRight, Mail, BellOff, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Orenty',
  description:
    'Careers and opportunities at Orenty. We currently do not have any active hirings. Stay tuned for future engineering and product openings.',
};

export default function CareersPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-secondary/[0.07] blur-[160px]" />

      {/* 1. Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>HIRING STATUS · CURRENTLY NO ACTIVE OPENINGS</span>
          </div>

          <h1 className="h1-hero text-text mb-6">
            We don’t have any active hirings right now.
          </h1>

          <p className="sub-paragraph text-text-2 mb-8 max-w-2xl font-normal leading-relaxed">
            There are currently no active job vacancies or open hiring rounds at Orenty. All upcoming positions in full-stack engineering, AI automation, product design, and growth will be posted directly on this page once open.
          </p>
        </div>

        {/* 2. Status & Transparency Placard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <BellOff size={14} className="text-amber-400" />
                <span>Open Positions</span>
              </div>
              <div className="text-2xl font-bold text-text mb-1">0 Active Roles</div>
              <p className="text-xs text-text-2 leading-relaxed">
                We are fully staffed for current client sprints and proprietary product incubation.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <Code2 size={14} className="text-secondary" />
                <span>Hiring Policy</span>
              </div>
              <div className="text-2xl font-bold text-text mb-1">On-Demand Only</div>
              <p className="text-xs text-text-2 leading-relaxed">
                Roles are opened strictly when new milestones require specialized architecture talent.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-3 mb-2">
                <Sparkles size={14} className="text-indigo-400" />
                <span>Talent Network</span>
              </div>
              <div className="text-2xl font-bold text-text mb-1">Future Review</div>
              <p className="text-xs text-text-2 leading-relaxed">
                Exceptional builders can introduce themselves below for priority review when roles open.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. Future Openings / Talent Network Card */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 w-full border-t border-border">
        <div className="rounded-card border border-border bg-surface-2 p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="eyebrow-label block mb-3">STAY CONNECTED</span>
            <h2 className="h2-section text-text mb-4">
              Want to be on our radar for future projects?
            </h2>
            <p className="text-base text-text-2 leading-relaxed mb-6">
              Although we don’t have active openings right now, we are always eager to connect with senior full-stack architects, distributed systems engineers, and pragmatic AI developers.
            </p>
            <p className="text-sm text-text-3 leading-relaxed mb-8">
              If you’d like to introduce yourself and share your GitHub, portfolio, or past work, email us directly. Whenever new positions or challenge milestones open up, we reach out to our private talent network first.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="mailto:contact@orenty.in?subject=Future%20Talent%20Network%20-%20Orenty"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-pill"
              >
                <Mail size={16} />
                <span>Email your portfolio (contact@orenty.in)</span>
              </a>

              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-pill"
              >
                <span>Learn about Orenty</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What we value when we do hire */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow-label block mb-2">ENGINEERING VALUES</span>
          <h2 className="h2-section text-text">
            How we build when positions open.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-card border border-border bg-surface-2">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-base font-semibold text-text mb-2">High Ownership Pods</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              We operate in tight, autonomous engineering units where every engineer has direct influence over architecture, decisions, and outcomes.
            </p>
          </div>

          <div className="p-6 rounded-card border border-border bg-surface-2">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-base font-semibold text-text mb-2">Clean, Typed Code</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              We value maintainable TypeScript architectures, robust automated tests, and performance over superficial prototypes.
            </p>
          </div>

          <div className="p-6 rounded-card border border-border bg-surface-2">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-base font-semibold text-text mb-2">Zero Agency Bloat</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              No endless meetings, no bureaucratic sign-offs. Builders communicate directly with founders and clients to ship without friction.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Careers FAQ */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border">
        <CareersFaq />
      </section>

      {/* 6. Closing Note */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full border-t border-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="h2-section text-text mb-4">
            Have a project to build instead?
          </h2>
          <p className="sub-paragraph text-text-2 mb-8">
            If you need websites, web applications, or custom AI automations engineered for your company, let’s talk.
          </p>
          <Button href="/contact" variant="primary">
            <span>Start a project with us</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>
      </section>
    </div>
  );
}
