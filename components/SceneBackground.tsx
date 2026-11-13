'use client';

import React from 'react';

/**
 * SceneBackground provides the deep obsidian futuristic tech canvas
 * matching the Next-Gen AI reference (Onion AI style):
 * - Deep obsidian base (#08080A)
 * - Low architectural precision grid lines with smooth radial falloff
 * - Directional ambient lighting pools (ultraviolet & technical cyan)
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#08080A]"
      aria-hidden="true"
    >
      {/* 1. Low Architectural Technical Grid Lines (Visible in key areas, fading organically) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 25%, #000 30%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 25%, #000 30%, transparent 92%)',
        }}
      />

      {/* 2. Top Center Ambient Volumetric Spotlight Halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(99, 102, 241, 0.12) 0%, rgba(2, 132, 199, 0.05) 45%, transparent 70%)',
        }}
      />

      {/* 3. Center-Left Ambient Shading (Subtle technical cyan glow) */}
      <div
        className="absolute top-[35%] left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 15% 45%, rgba(2, 132, 199, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* 4. Lower-Right Subtle Warm Accent Shading */}
      <div
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(99, 102, 241, 0.05) 0%, transparent 65%)',
        }}
      />

      {/* 5. Clean Perimeter Structural Hairline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
    </div>
  );
}
