'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

/**
 * SceneBackground provides the live 3D WebGL Canvas
 * (Volumetric Light-Beam, Floating 3D Logo Mark, and Cosmic Starfield)
 * plus a deep obsidian foundation across the entire site.
 */
export default function SceneBackground() {
  return (
    <>
      {/* 3D WebGL Living Light-Beam & Hero 3D Logo Canvas */}
      <HeroCanvas isFixed={true} />

      {/* Fixed obsidian background canvas ensuring no empty color voids */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 bg-[#07080D]"
        aria-hidden="true"
      />
    </>
  );
}
