'use client';

import React from 'react';

/**
 * SceneBackground provides the deep obsidian futuristic tech canvas
 * matching the Next-Gen AI reference (Onion AI style):
 * - Deep space obsidian navy base (#07080E) with 2% indigo undertone
 * - Continuous architectural precision micro-grid
 * - Central vertical axis laser beam extending smoothly from the hero down the entire page
 * - Sweeping ambient CAD ribbon contours providing physical depth behind all sections
 * - Colored atmospheric volumetric lighting pools keyed to each section:
 *     • Hero: Volumetric spotlight halo (ultraviolet & cyan)
 *     • What We Do: Royal violet & indigo aura (#6366F1)
 *     • Services: Technical cyan & radioactive emerald glow (#06B6D4 / #10B981)
 *     • Products: Cyber-fuchsia & purple nebula (#A855F7)
 *     • Startup Lab & Final CTA: Solar amber & gold glow (#F59E0B)
 * - Micro-fine tactile grain texture eliminating digital flatness
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#07080E]"
      aria-hidden="true"
    >
      {/* 1. Continuous Architectural Micro-Grid (48px grid across entire document) */}
      <div
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Signature Central Vertical Laser Beam Axis (Continuous from Hero) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full pointer-events-none opacity-45"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(129,140,248,0.5) 20%, rgba(56,189,248,0.25) 55%, rgba(52,211,153,0.2) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(129,140,248,0.4), 0 0 45px rgba(56,189,248,0.25)',
        }}
      />

      {/* 3. Sweeping Titanium CAD Ribbon Contours (Flowing subtly through the scroll journey) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 3200"
      >
        <path
          d="M -200 400 C 400 600, 1000 200, 1640 500"
          stroke="url(#cad-gradient-1)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 650 C 500 900, 900 600, 1640 850"
          stroke="url(#cad-gradient-1)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -200 1200 C 350 1000, 1100 1400, 1640 1150"
          stroke="url(#cad-gradient-2)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 1900 C 600 2200, 800 1700, 1640 2000"
          stroke="url(#cad-gradient-1)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -200 2600 C 400 2400, 1000 2800, 1640 2550"
          stroke="url(#cad-gradient-3)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="cad-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cad-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cad-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. Section 1 (Hero/Top) Spotlight Halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 12%, rgba(129, 140, 248, 0.16) 0%, rgba(56, 189, 248, 0.07) 45%, transparent 70%)',
        }}
      />

      {/* 5. Section 2 (What We Do / Divisions): Royal Violet & Indigo Aura */}
      <div
        className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.10) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* 6. Section 3 (Services): Technical Cyan & Radioactive Emerald Lighting Pools */}
      <div
        className="absolute top-[46%] -left-[10%] w-[750px] h-[750px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 50%, rgba(56, 189, 248, 0.09) 0%, rgba(52, 211, 153, 0.04) 55%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[50%] -right-[10%] w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(52, 211, 153, 0.08) 0%, rgba(129, 140, 248, 0.04) 55%, transparent 70%)',
        }}
      />

      {/* 7. Section 4 (Products): Cyber-Fuchsia & Violet Nebula */}
      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[950px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.09) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* 8. Section 5 (Startup Lab & Final CTA): Solar Warm Amber & Gold Accent Glow */}
      <div
        className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[950px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, 0.06) 0%, rgba(129, 140, 248, 0.04) 50%, transparent 75%)',
        }}
      />

      {/* 9. Micro-Fine Procedural Grain / Matte Surface Texture */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 10. Clean Perimeter Structural Hairline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />
    </div>
  );
}
