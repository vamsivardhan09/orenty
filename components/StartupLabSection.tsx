'use client';

import React from 'react';
import Link from 'next/link';
import Button from './Button';
import { Target, Send, SearchCheck, Users, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Target,
    step: '1',
    title: 'Pick a challenge',
    desc: 'Explore open engineering and product challenges.',
  },
  {
    icon: Send,
    step: '2',
    title: 'Submit your solution',
    desc: 'Submit your working code, prototype, or architecture.',
  },
  {
    icon: SearchCheck,
    step: '3',
    title: 'We review',
    desc: 'Evaluated on solution quality, UX, and scalability.',
  },
  {
    icon: Users,
    step: '4',
    title: 'Build together',
    desc: 'Top builders join the team and may earn equity.',
  },
];

export default function StartupLabSection() {
  return (
    <section id="careers" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-24 w-full border-t border-border">
      

      <div className="mx-auto max-w-xl text-center mb-14">
                <h2 className="h2-section text-text mb-4">
          Build with us. Earn ownership.
        </h2>
        <p className="sub-paragraph text-text-2">
          We post real startup problems. You submit a solution. The best builders may earn ownership in the products we launch.
        </p>
      </div>

      {/* 4 Small Step Icons in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="relative p-6 rounded-card border border-border bg-surface-2 flex flex-col items-center text-center transition-all duration-300 hover:border-border-top"
            >
              <div className="h-12 w-12 rounded-xl border border-warm/30 bg-warm/10 text-warm flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <span className="text-xs font-semibold text-warm/80 uppercase tracking-wider mb-1">
                Step 0{st.step}
              </span>
              <h3 className="text-base font-semibold text-text mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-text-3 leading-relaxed">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Ownership note and CTA buttons */}
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-text-3 max-w-md mb-8">
          The best contributors can earn ownership in the product they help build. Terms are set per challenge.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button href="/careers" variant="primary">
            <span>View open challenges</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
          <Link
            href="/careers#how-it-works"
            className="btn-tertiary text-sm text-secondary hover:text-white"
          >
            <span>How it works</span>
            <ArrowRight size={14} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
