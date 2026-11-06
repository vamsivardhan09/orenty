const fs = require('fs');
const path = require('path');

// 1. Update StackContainer.tsx
const stackContainerCode = `'use client';

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
      el.style.setProperty('--i', \`\${i}\`);
      el.style.setProperty('z-index', \`\${10 + i}\`);
    });

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

        if (el.getBoundingClientRect().top <= 140) {
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
      : totalCards === 5
      ? 'md:grid md:grid-cols-2 lg:grid-cols-3'
      : 'md:grid md:grid-cols-2 lg:grid-cols-2';

  return (
    <div className="relative w-full">
      {/* Mobile-only Progress Indicator (1 / 5) */}
      <div className="flex md:hidden items-center justify-between mb-3 px-1 text-xs text-text-3 font-medium">
        <span className="text-[11px] font-mono uppercase tracking-wider text-text-3">
          Scroll to explore works
        </span>
        <span className="bg-surface-3 px-2.5 py-1 rounded-pill border border-border text-secondary font-semibold font-mono text-[11px]">
          {currentIdx} / {totalCards}
        </span>
      </div>

      <div
        ref={containerRef}
        className={\`stack \${gridColsClass} gap-6 lg:gap-8 \${className}\`}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="stack__item rounded-card h-full"
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
`;

fs.writeFileSync(
  path.resolve(__dirname, '../components/StackContainer.tsx'),
  stackContainerCode,
  'utf8'
);
console.log('Updated StackContainer.tsx');

// 2. Update globals.css
const globalsPath = path.resolve(__dirname, '../app/globals.css');
let css = fs.readFileSync(globalsPath, 'utf8');

// Replace overflow-x: hidden on body with overflow-x: clip
css = css.replace(/body\s*\{([^}]*?)overflow-x:\s*hidden;([^}]*?)\}/s, (match, p1, p2) => {
  return `body {${p1}overflow-x: clip;${p2}}`;
});

// Update the stack CSS
const stackCssRegex = /\/\* Mobile: Overlapping Card Stack[\s\S]*?@media \(prefers-reduced-motion: reduce\)/;
const newStackCss = `/* Mobile: Overlapping Card Stack (Section 9 Placard Scroll) */
@media (max-width: 767px) {
  .stack {
    position: relative;
    padding-bottom: 10svh;
  }

  .stack__item {
    position: sticky;
    top: calc(var(--header-h, 64px) + 12px + (var(--i, 0) * 10px));
    min-height: 52svh;
    margin-bottom: 28px;
    transform-origin: top center;
    transform: scale(calc(1 - var(--p, 0) * 0.05));
    background: var(--surface-2);
    z-index: calc(10 + var(--i, 0));
    box-shadow: 0 -8px 24px -4px rgba(0, 0, 0, 0.7);
    will-change: transform;
  }

  .stack__item::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: #000;
    opacity: calc(var(--p, 0) * 0.45);
    pointer-events: none;
    transition: opacity 0.15s ease-out;
  }
}

@media (min-width: 768px) {
  .stack__item {
    position: relative !important;
    top: auto !important;
    min-height: auto !important;
    margin-bottom: 0 !important;
    transform: none !important;
    background: transparent !important;
    box-shadow: none !important;
    z-index: auto !important;
  }

  .stack__item::after {
    display: none !important;
  }
}

/* Accessibility: Keyboard focus visible (Section 3: 2px --secondary ring, 3px offset) */
@media (prefers-reduced-motion: reduce)`;

if (css.match(stackCssRegex)) {
  css = css.replace(stackCssRegex, newStackCss);
  fs.writeFileSync(globalsPath, css, 'utf8');
  console.log('Updated globals.css with mobile placard stacking rules');
} else {
  console.warn('Could not find stack CSS block in globals.css, checking fallback...');
}
