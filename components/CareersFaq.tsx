'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const careersFaqs = [
  {
    q: 'Do I need to be a full-time employee to participate?',
    a: 'No. Startup Lab challenges are asynchronous and milestone-driven. You can participate on evenings, weekends, or between contracts alongside your existing work.',
  },
  {
    q: 'How is ownership or equity formalized?',
    a: 'Selected contributors enter into clear, written agreements with defined vesting or milestone schedules [CONFIRM terms]. We believe in fair compensation for real architectural contributions.',
  },
  {
    q: 'Can teams or pairs submit a joint solution?',
    a: 'Yes. If you collaborate with a co-builder, you can include all contributor details in the submission form and indicate your preferred allocation split.',
  },
  {
    q: 'What languages or tech stacks can I use?',
    a: 'Each challenge specifies recommended technologies (e.g. Next.js, TypeScript, Python, WebGL, WebRTC), but we welcome superior alternatives if you explain the technical reasoning.',
  },
  {
    q: 'When will I hear back about my submission?',
    a: 'Every submission is reviewed within 7 to 10 business days [CONFIRM]. We provide constructive qualitative feedback to all serious entries.',
  },
  {
    q: 'What happens if my solution is not selected?',
    a: 'You retain 100% of your intellectual property and code. We do not use unselected submissions, and you remain welcome to participate in subsequent challenges.',
  },
];

export default function CareersFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-warm font-semibold block mb-2">
          COMMON QUESTIONS
        </span>
        <h2 className="h2-section text-text">
          Startup Lab FAQ
        </h2>
      </div>

      <div className="space-y-4">
        {careersFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-card border border-border bg-surface-2 transition-colors duration-200 hover:border-border-top overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-semibold text-text">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-warm shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-[15px] text-text-2 leading-relaxed border-t border-border/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
