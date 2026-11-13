'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StackContainerProps {
  children: React.ReactNode[];
  className?: string;
  totalCards: number;
}

export default function StackContainer({
  children,
  className = '',
  totalCards,
}: StackContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('.stack__item')
    );

    items.forEach((el, i) => {
      el.style.setProperty('--i', `${i}`);
      el.style.setProperty('z-index', `${10 + i}`);
    });

    let rafId: number | null = null;

    const updateStack = () => {
      // Mobile & tablet stacking (< 1024px)
      if (window.innerWidth >= 1024) return;

      let activeIndex = 0;
      items.forEach((el, i) => {
        const next = items[i + 1];
        if (!next) return;

        const currentTop = el.getBoundingClientRect().top;
        const nextTop = next.getBoundingClientRect().top;
        const gap = nextTop - currentTop;
        const cardHeight = el.offsetHeight || 480;

        // Progress 0 -> 1 as the next card joins above this one
        const p = Math.min(1, Math.max(0, 1 - gap / cardHeight));
        el.style.setProperty('--p', p.toFixed(3));

        if (currentTop <= 160) {
          activeIndex = i + 1;
        }
      });

      setCurrentIdx(Math.min(Math.max(activeIndex + 1, 1), totalCards));
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStack);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateStack();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [totalCards]);

  return (
    <div className="relative w-full">
      {/* Mobile-only Progress Indicator (e.g. 1 / 4) */}
      <div className="flex lg:hidden items-center justify-between mb-4 px-2 text-xs text-slate-400 font-medium max-w-[440px] sm:max-w-[480px] mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          Scroll to explore capabilities
        </span>
        <span className="bg-white/[0.06] px-2.5 py-1 rounded-full border border-white/[0.1] text-indigo-400 font-semibold font-mono text-[11px]">
          {currentIdx} / {totalCards}
        </span>
      </div>

      <div
        ref={containerRef}
        className={`stack flex flex-col items-center lg:grid lg:grid-cols-4 gap-0 lg:gap-6 w-full ${className}`}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="stack__item w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none mx-auto rounded-[22px] lg:h-full"
            style={{
              '--i': idx,
              zIndex: 10 + idx,
            } as React.CSSProperties}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
