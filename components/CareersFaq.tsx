'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const careersFaqs = [
  {
    q: 'Are you currently hiring for full-time or contract roles?',
    a: 'No. We currently do not have any active hirings or open roles. When new engineering, design, or product positions open up, they will be published directly on this Careers page.',
  },
  {
    q: 'Can I send an open application or portfolio for future openings?',
    a: 'Yes. If you are an exceptional full-stack engineer, AI automation specialist, or UI/UX designer, you can email your portfolio, GitHub, and a brief note to contact@orenty.in. We maintain a private talent pool and reach out to trusted builders when new milestones open.',
  },
  {
    q: 'How does Orenty work with engineers and designers?',
    a: 'We operate in lean, high-ownership pods with direct founder access and zero agency bureaucracy. Builders have real influence over product architecture, technical decisions, and execution quality.',
  },
  {
    q: 'What is the tech stack at Orenty?',
    a: 'Our core stack focuses on Next.js (App Router), TypeScript, Tailwind CSS, modern Node.js runtimes, WebGL/Three.js, Supabase, and modern LLM / AI toolchains.',
  },
  {
    q: 'What happens when a Startup Lab challenge or co-founder cycle opens?',
    a: 'Startup Lab challenge problem statements are announced periodically. When an active cycle opens, builders can submit working prototypes and architectural solutions, and top contributors can earn equity or co-builder status in the launched product.',
  },
  {
    q: 'How will I know when new positions open?',
    a: 'All newly opened roles and contributor opportunities will be posted on this page and announced on our official LinkedIn and Twitter/X channels.',
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
        <span className="eyebrow-label block mb-2">
          COMMON QUESTIONS
        </span>
        <h2 className="h2-section text-text">
          Careers & Hiring FAQ
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
                  className={`text-secondary shrink-0 transition-transform duration-200 ${
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
