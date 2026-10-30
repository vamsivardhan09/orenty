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
  accentColor = '#8b5cf6',
}: HudBoxProps) {
  return (
    <div
      className={`hud-bracket-container relative rounded-lg border border-white/[0.08] bg-navy-950/60 p-5 backdrop-blur-md ${className}`}
    >
      {/* 4 Corner Brackets */}
      <span
        className="hud-bracket hud-bracket-tl"
        style={{ borderColor: accentColor }}
        aria-hidden="true"
      />
      <span
        className="hud-bracket hud-bracket-tr"
        style={{ borderColor: accentColor }}
        aria-hidden="true"
      />
      <span
        className="hud-bracket hud-bracket-bl"
        style={{ borderColor: accentColor }}
        aria-hidden="true"
      />
      <span
        className="hud-bracket hud-bracket-br"
        style={{ borderColor: accentColor }}
        aria-hidden="true"
      />

      {/* Optional Top HUD Metadata bar */}
      {(label || tag) && (
        <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          {label && <span>{label}</span>}
          {tag && (
            <span
              className="rounded px-1.5 py-0.5 text-[9px] font-bold"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}35`,
              }}
            >
              {tag}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
