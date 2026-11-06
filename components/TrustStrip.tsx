import React from 'react';
import { siteContent } from '@/content/site';

export default function TrustStrip() {
  const { trustStrip } = siteContent;

  return (
    <section className="relative z-10 w-full border-y border-surface-border bg-bg-elevated/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
          {trustStrip.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 relative group"
            >
              <span className="font-display text-2xl lg:text-3xl font-bold text-text tracking-tight mb-1">
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-text-3 font-mono">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
