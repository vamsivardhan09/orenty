'use client';

import React from 'react';

/**
 * SceneBackground provides the deep obsidian futuristic tech canvas
 * matching the Next-Gen AI reference (Onion AI style):
 * - Deep obsidian base (#08080A)
 * - Continuous architectural precision micro-grid
 * - Central vertical axis light beam extending down from the hero
 * - Ambient atmospheric color-graded lighting pools across all sections
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#08080A]"
      aria-hidden="true"
    >
      {/* 1. Continuous Architectural Micro-Grid (Subtle 40px grid across entire page) */}
      <div
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Signature Central Vertical Light Beam Axis (Continues from Hero) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(129,140,248,0.4) 25%, rgba(56,189,248,0.2) 60%, transparent 100%)',
          boxShadow: '0 0 24px rgba(129,140,248,0.4), 0 0 48px rgba(56,189,248,0.2)',
        }}
      />

      {/* 3. Section 1 (Hero/Top) Spotlight Halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[750px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 10%, rgba(129, 140, 248, 0.14) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 70%)',
        }}
      />

      {/* 4. Section 2 (What We Do / Divisions): Violet & Deep Indigo Aura */}
      <div
        className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)',
        }}
      />

      {/* 5. Section 3 (Services): Technical Emerald & Cyan Atmospheric Pool */}
      <div
        className="absolute top-[48%] -left-[10%] w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 50%, rgba(56, 189, 248, 0.07) 0%, rgba(52, 211, 153, 0.04) 55%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[52%] -right-[10%] w-[650px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(52, 211, 153, 0.06) 0%, rgba(129, 140, 248, 0.03) 55%, transparent 70%)',
        }}
      />

      {/* 6. Section 4 (Products): Cyber Violet Aura */}
      <div
        className="absolute top-[72%] left-1/2 -translate-x-1/2 w-[850px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.07) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 75%)',
        }}
      />

      {/* 7. Section 5 (Startup Lab & Final CTA): Warm Golden Accent Shading */}
      <div
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, 0.05) 0%, rgba(129, 140, 248, 0.04) 50%, transparent 75%)',
        }}
      />

      {/* 8. Structural Hairline Accent at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
    </div>
  );
}
