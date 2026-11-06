'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const { faq } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-20 lg:py-28 w-full border-t border-border">
      <div className="text-center mb-14">
        <span className="eyebrow-label block mb-3">FAQ</span>
        <h2 className="h2-section text-text mb-4">
          Frequently asked questions.
        </h2>
        <p className="sub-paragraph text-text-2">
          Clear answers about how we build, how we price, and how we collaborate.
        </p>
      </div>

      <div className="space-y-4">
        {faq.map((item, idx) => {
          const isOpen = openIndex === idx;
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
                  {item.question}
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
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
