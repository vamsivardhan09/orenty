'use client';

import React from 'react';

/**
 * SceneBackground provides a continuous, immersive dark spatial canvas
 * across the ENTIRE website — eliminating flat empty color voids at any scroll depth.
 *
 * Implements strict anti-AI design patterns:
 * - Natural deep obsidian spatial depth (#07080D)
 * - Quiet celestial constellation star points
 * - Clean architectural perimeter hairline
 * - Zero artificial colored spotlight haze or tiled codex grids
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080D]"
      aria-hidden="true"
    >
      {/* 1. Deep Space Constellation Starfield SVG Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8%" cy="12%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="18%" cy="38%" r="1.5" fill="#FFFFFF" opacity="0.3" />
        <circle cx="28%" cy="15%" r="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="42%" cy="28%" r="1.2" fill="#FFFFFF" opacity="0.4" />
        <circle cx="58%" cy="8%" r="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="72%" cy="22%" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="88%" cy="14%" r="1.2" fill="#FFFFFF" opacity="0.4" />
        <circle cx="94%" cy="32%" r="1" fill="#FFFFFF" opacity="0.3" />

        <circle cx="12%" cy="58%" r="1.4" fill="#FFFFFF" opacity="0.4" />
        <circle cx="24%" cy="72%" r="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="36%" cy="85%" r="1.2" fill="#FFFFFF" opacity="0.3" />
        <circle cx="64%" cy="65%" r="1.5" fill="#FFFFFF" opacity="0.5" />
        <circle cx="78%" cy="82%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="86%" cy="60%" r="1.6" fill="#FFFFFF" opacity="0.4" />
        <circle cx="92%" cy="78%" r="1" fill="#FFFFFF" opacity="0.3" />

        <circle cx="6%" cy="88%" r="1.2" fill="#FFFFFF" opacity="0.25" />
        <circle cx="50%" cy="50%" r="1.5" fill="#FFFFFF" opacity="0.5" />
        <circle cx="52%" cy="92%" r="1" fill="#FFFFFF" opacity="0.4" />
      </svg>

      {/* 2. Top Architectural Structural Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* 3. Subtle Vignette around outer screen edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(7, 8, 13, 0.75) 100%)',
        }}
      />
    </div>
  );
}
