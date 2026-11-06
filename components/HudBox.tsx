'use client';

import React from 'react';

interface HudBoxProps {
  children: React.ReactNode;
  label?: string;
  tag?: string;
  className?: string;
  accentColor?: string;
}

export default function HudBox({
  children,
  label,
  tag,
  className = '',
}: HudBoxProps) {
  const cleanLabel = label?.replace(/\/\//g, '·').trim();
  const cleanTag = tag?.replace(/\/\//g, '·').trim();

  return (
    <div
      className={`relative rounded-card border border-border bg-surface-2 p-6 transition-all duration-300 hover:border-border-top ${className}`}
    >
      {(cleanLabel || cleanTag) && (
        <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-3 text-xs tracking-wider text-text-3 font-medium">
          {cleanLabel && <span className="text-text-2">{cleanLabel}</span>}
          {cleanTag && <span className="text-secondary">{cleanTag}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
