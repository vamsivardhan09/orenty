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

    items.forEach((el, i) => el.style.setProperty('--i', `${i}`));

    let rafId: number | null = null;

    const updateStack = () => {
      if (window.innerWidth >= 768) return; // Desktop / tablet uses grid

      let activeIndex = 0;
      items.forEach((el, i) => {
        const next = items[i + 1];
        if (!next) return;

        const gap = next.getBoundingClientRect().top - el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, 1 - gap / el.offsetHeight));
        el.style.setProperty('--p', p.toFixed(3));

        if (el.getBoundingClientRect().top <= 120) {
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

  const gridColsClass =
    totalCards === 3
      ? 'md:grid md:grid-cols-2 lg:grid-cols-3'
      : 'md:grid md:grid-cols-2 lg:grid-cols-4';

  return (
    <div className="relative w-full">
      {/* Mobile-only Progress Indicator (1 / 4) */}
      <div className="flex md:hidden items-center justify-end mb-3 px-1 text-xs text-text-3 font-medium">
        <span className="bg-surface-3 px-2.5 py-1 rounded-pill border border-border text-secondary font-semibold">
          {currentIdx} / {totalCards}
        </span>
      </div>

      <div
        ref={containerRef}
        className={`stack ${gridColsClass} gap-6 lg:gap-8 ${className}`}
      >
        {children.map((child, idx) => (
          <div key={idx} className="stack__item rounded-card h-full">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
