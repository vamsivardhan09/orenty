'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroScene from './HeroScene';

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check device profile
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
    }

    // Visibility Observer: Pause WebGL loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Tab visibility change: Pause WebGL loop when tab is hidden
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // When reduced motion or low-power device, render static cinematic gradient hero
  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a071c] via-[#05060f] to-[#04060d]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-24 bg-gradient-to-b from-violet-400/30 via-violet-600/15 to-transparent blur-2xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[130px]" />
      </div>
    );
  }

  const shouldRender = isVisible && isTabActive;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background depth falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04060d]/90 z-[1]" />

      <Canvas
        frameloop={shouldRender ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
