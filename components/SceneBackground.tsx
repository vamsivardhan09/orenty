'use client';

import React from 'react';

/**
 * SceneBackground provides the pristine modern tech whitish canvas
 * inspired by Groq (#f3f3ee / #fafaf8) and Meta AI:
 * - Clean luminous whitish studio foundation (#FAFAF8)
 * - Faint architectural low grid lines visible in key areas and fading organically
 * - Asymmetrical directional ambient shading (shaded on one side, clean on the other)
 */
export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAFAF8]"
      aria-hidden="true"
    >
      {/* 1. Low Architectural Technical Grid Lines (Visible in some areas, fading organically) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, #000 30%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, #000 30%, transparent 92%)',
        }}
      />

      {/* 2. Top-Right / Side Ambient Shading (Soft electric violet & slate wash) */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(99, 102, 241, 0.075) 0%, rgba(129, 140, 248, 0.035) 45%, transparent 70%)',
        }}
      />

      {/* 3. Center-Left Ambient Shading (Subtle technical cyan glow) */}
      <div
        className="absolute top-[35%] left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 15% 45%, rgba(2, 132, 199, 0.045) 0%, transparent 60%)',
        }}
      />

      {/* 4. Lower-Right Subtle Warm Accent Shading */}
      <div
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(217, 119, 6, 0.03) 0%, transparent 65%)',
        }}
      />

      {/* 5. Clean Perimeter Structural Hairline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent pointer-events-none" />
    </div>
  );
}
