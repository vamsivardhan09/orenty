'use client';

import React from 'react';

/**
 * SceneBackground provides the Titanium Monochrome & Pure Obsidian canvas:
 * - Pure pitch-black obsidian base (#030305) with 0% colored tint
 * - Continuous architectural precision micro-grid (32px / 64px)
 * - Central vertical axis titanium specular hairline
 * - Sweeping monochrome titanium ribbon contours providing physical depth behind all sections
 * - Soft monochrome ambient studio lighting pools (zero colored orbs)
 * - Micro-fine tactile grain texture eliminating digital flatness
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030305]"
      aria-hidden="true"
    >
      {/* 1. Continuous Architectural Micro-Grid (48px grid across entire document) */}
      <div
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Signature Central Vertical Titanium Hairline Axis (Continuous from Hero) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)',
          boxShadow: '0 0 15px rgba(255,255,255,0.15)',
        }}
      />

      {/* 3. Sweeping Titanium CAD Ribbon Contours (Monochrome liquid silver flow) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 3200"
      >
        <path
          d="M -200 400 C 400 600, 1000 200, 1640 500"
          stroke="url(#cad-gradient-silver)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 650 C 500 900, 900 600, 1640 850"
          stroke="url(#cad-gradient-silver)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -200 1200 C 350 1000, 1100 1400, 1640 1150"
          stroke="url(#cad-gradient-platinum)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 1900 C 600 2200, 800 1700, 1640 2000"
          stroke="url(#cad-gradient-silver)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 2600 C 400 2400, 1000 2800, 1640 2550"
          stroke="url(#cad-gradient-platinum)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="cad-gradient-silver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#71717A" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#71717A" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cad-gradient-platinum" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#52525B" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#E4E4E7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#52525B" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. Section 1 (Hero/Top) Neutral Studio Spotlight Halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 12%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* 5. Section 2 (What We Do / Divisions): Soft Monochrome Ambient Cleft */}
      <div
        className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 75%)',
        }}
      />

      {/* 6. Section 3 (Services): Soft Monochromatic Studio Ambient Lighting */}
      <div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[1000px] h-[750px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.035) 0%, transparent 70%)',
        }}
      />

      {/* 7. Section 4 (Products): Subtle Neutral Illumination */}
      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[950px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 75%)',
        }}
      />

      {/* 8. Micro-Fine Procedural Grain / Matte Surface Texture */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 9. Clean Perimeter Structural Hairline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
    </div>
  );
}
