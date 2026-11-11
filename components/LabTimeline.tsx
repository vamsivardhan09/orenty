'use client';

import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    step: 1,
    title: 'Pick a challenge',
    detail: 'Explore live product and engineering challenges with defined criteria and milestones.',
  },
  {
    step: 2,
    title: 'Submit your solution',
    detail: 'Submit your functional code, GitHub repository, working demo, or system architecture.',
  },
  {
    step: 3,
    title: 'We review',
    detail: 'We evaluate every submission on code cleanliness, interface intuition, and architectural scalability.',
  },
  {
    step: 4,
    title: 'Build together & earn equity',
    detail: 'The best contributors join the core product squad and may earn equity in the product they help build.',
  },
];

export default function LabTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.75;
      const current = start - rect.top;
      const progress = Math.min(Math.max(current / rect.height, 0), 1);
      setFillHeight(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="how-it-works" className="relative pl-8 md:pl-10 space-y-10 max-w-3xl" ref={containerRef}>
      {/* Background Track Line */}
      <div className="absolute left-[13px] md:left-[17px] top-3 bottom-3 w-[2px] bg-border" />

      {/* Dynamic Amber Filling Line */}
      <div
        className="absolute left-[13px] md:left-[17px] top-3 w-[2px] bg-warm transition-all duration-150 ease-out"
        style={{
          height: `calc(${fillHeight * 100}% - 12px)`,
        }}
      />

      {steps.map((st) => (
        <div key={st.step} className="relative flex items-start gap-4">
          {/* Node Indicator */}
          <div className="absolute -left-[30px] md:-left-[36px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-warm/40 bg-surface-2 text-warm text-xs font-semibold shadow-sm">
            {st.step}
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text mb-1">
              {st.title}
            </h3>
            <p className="text-sm text-text-2 leading-relaxed">
              {st.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
