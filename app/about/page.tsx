import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import { User, ShieldCheck, Code, Users, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Story, Founder & Values',
  description:
    'Learn about Orenty: why we build software for ambitious businesses and launch products of our own with our Startup Lab.',
};

const values = [
  {
    icon: Code,
    title: 'Pragmatic Engineering over Hype',
    description:
      'We write clean, typed, tested code designed to run in production for years. We do not chase fragile tech trends or add unnecessary layers.',
  },
  {
    icon: ShieldCheck,
    title: '100% Code & Asset Ownership',
    description:
      'When you hire us to build software, you own every line of code, every repository, and every deployment asset from day one. Zero proprietary lock-in.',
  },
  {
    icon: Users,
    title: 'Real Ownership for Real Builders',
    description:
      'In our Startup Lab, contributors who solve real product milestones can earn genuine product equity. Great work deserves real alignment.',
  },
  {
    icon: Sparkles,
    title: 'Radical Transparency',
    description:
      'Fixed-scope proposals, weekly progress demos, direct communication channels, and honest timelines. No surprises, no hidden retainer markups.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[150px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow-label block mb-3">ABOUT ORENTY</span>
          <h1 className="h1-hero text-text mb-6">
            We build software that compounds value.
          </h1>
          <p className="sub-paragraph text-text-2">
            Orenty combines client software engineering, in-house product incubation, and an open Startup Lab where top builders earn equity.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20 rounded-card border border-border bg-surface-2 p-8 md:p-12">
          <span className="eyebrow-label block mb-3">OUR STORY</span>
          <h2 className="h2-section text-text mb-6">
            Why we started Orenty.
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-text-2 leading-relaxed max-w-3xl">
            <p>
              Traditional agencies are incentivized to prolong projects, bloat retainers, and use junior developers hidden behind account managers. Meanwhile, great individual builders lack the infrastructure to launch and capitalize on their own ventures.
            </p>
            <p>
              We founded Orenty to invert this model. For clients, we act as a disciplined, senior engineering team delivering high-velocity websites, mobile apps, and custom AI automations with fixed milestones and zero fluff.
            </p>
            <p>
              Simultaneously, we build our own proprietary software products — including SyncedIn, Fanbase, Job Pilot, and Pujari.ai. Through our open Startup Lab, we invite exceptional engineers and designers to solve core product challenges and earn equity in what we launch together.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-20 rounded-card border border-border bg-surface-2 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border border-border-top bg-surface-3 flex items-center justify-center shrink-0 text-text-3">
              <div className="flex flex-col items-center justify-center text-center p-2">
                <User size={36} className="text-secondary/70 mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-text-3 font-semibold">
                  [CONFIRM PHOTO]
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="eyebrow-label block mb-2">LEADERSHIP</span>
              <h2 className="h2-section text-text mb-2">
                Founder & Lead Engineer [CONFIRM]
              </h2>
              <p className="text-sm text-secondary font-medium mb-4">
                Founder, Orenty [CONFIRM details]
              </p>
              <p className="text-base text-text-2 leading-relaxed mb-6 max-w-2xl">
                Background in full-stack architecture, distributed systems, and product engineering. Driven by the belief that small, focused teams using modern tooling can out-build traditional software houses [CONFIRM bio].
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-text-3">
                <a href="https://linkedin.com/company/orenty" target="_blank" rel="noreferrer" className="text-secondary hover:underline">
                  LinkedIn [CONFIRM]
                </a>
                <span>·</span>
                <a href="https://x.com/orenty" target="_blank" rel="noreferrer" className="text-secondary hover:underline">
                  Twitter / X [CONFIRM]
                </a>
                <span>·</span>
                <a href="mailto:contact@orenty.in" className="text-secondary hover:underline">
                  contact@orenty.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow-label block mb-2">OUR PRINCIPLES</span>
            <h2 className="h2-section text-text">
              What we stand for.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <GlassCard key={v.title} className="p-8">
                  <div className="h-12 w-12 rounded-xl border border-border bg-surface-3 flex items-center justify-center text-secondary mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="h3-card text-text mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-text-2 leading-relaxed">
                    {v.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Bottom Dual Action */}
        <div className="py-16 text-center border-t border-border">
          <h2 className="h2-section text-text mb-4">
            Work with us or build with us.
          </h2>
          <p className="sub-paragraph text-text-2 max-w-md mx-auto mb-8">
            Have a project to build for your business, or want to earn equity in our next venture?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              <span>Start a project</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Button>
            <Button href="/careers" variant="secondary">
              <span>Explore Startup Lab</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
