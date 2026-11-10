'use client';

import React from 'react';

/**
 * SceneBackground provides a continuous, immersive dark spatial canvas
 * across the ENTIRE website — eliminating flat empty color voids at any scroll depth.
 *
 * Features:
 * 1. Seamless Architectural Tech Grid (56px isometric grid)
 * 2. Deep Space Starfield & Constellation Particle Texture
 * 3. Stratified Ambient Volumetric Light Pools (Hero -> Services -> Products -> Lab)
 * 4. Subtle Structural Guide Lines
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080D]"
      aria-hidden="true"
    >
      {/* 1. Continuous Architectural Tech Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* 2. Deep Space Constellation Starfield SVG Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Subtle procedural star coordinates distributed across the viewport */}
        <circle cx="8%" cy="12%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="18%" cy="38%" r="1.5" fill="#FFFFFF" opacity="0.4" />
        <circle cx="28%" cy="15%" r="1" fill="#818CF8" opacity="0.7" />
        <circle cx="42%" cy="28%" r="1.2" fill="#FFFFFF" opacity="0.5" />
        <circle cx="58%" cy="8%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="72%" cy="22%" r="1.8" fill="#38BDF8" opacity="0.8" />
        <circle cx="88%" cy="14%" r="1.2" fill="#FFFFFF" opacity="0.5" />
        <circle cx="94%" cy="32%" r="1" fill="#818CF8" opacity="0.4" />

        <circle cx="12%" cy="58%" r="1.4" fill="#FFFFFF" opacity="0.5" />
        <circle cx="24%" cy="72%" r="1" fill="#38BDF8" opacity="0.6" />
        <circle cx="36%" cy="85%" r="1.2" fill="#FFFFFF" opacity="0.4" />
        <circle cx="64%" cy="65%" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="78%" cy="82%" r="1" fill="#818CF8" opacity="0.7" />
        <circle cx="86%" cy="60%" r="1.6" fill="#FFFFFF" opacity="0.5" />
        <circle cx="92%" cy="78%" r="1" fill="#38BDF8" opacity="0.4" />

        <circle cx="6%" cy="88%" r="1.2" fill="#FFFFFF" opacity="0.3" />
        <circle cx="50%" cy="50%" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="52%" cy="92%" r="1" fill="#FFFFFF" opacity="0.5" />
      </svg>

      {/* 3. Top Architectural Structural Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent pointer-events-none" />

      {/* 4. Layer 1: Top Hero Ambient Flare (Midnight Indigo + Sky Cyan) */}
      <div
        className="absolute -top-36 left-1/4 w-[750px] h-[450px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.45) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* 5. Layer 2: Mid-Page Services Ambient Light Pool */}
      <div
        className="absolute top-[28%] -right-20 w-[700px] h-[500px] rounded-full pointer-events-none blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.35) 0%, rgba(129, 140, 248, 0.1) 50%, transparent 70%)',
        }}
      />

      {/* 6. Layer 3: Mid-Lower Products Ambient Light Pool */}
      <div
        className="absolute top-[58%] -left-28 w-[750px] h-[550px] rounded-full pointer-events-none blur-[170px] opacity-18"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* 7. Layer 4: Bottom Lab & CTA Ambient Warm Glow */}
      <div
        className="absolute bottom-0 left-1/3 w-[850px] h-[450px] rounded-full pointer-events-none blur-[180px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.2) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 75%)',
        }}
      />

      {/* 8. Subtle Radial Vignette around edges to keep focus on content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(7, 8, 13, 0.6) 100%)',
        }}
      />
    </div>
  );
}
