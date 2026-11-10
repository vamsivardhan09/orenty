'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroScene, { ScrollState } from './HeroScene';

interface HeroCanvasProps {
  isFixed?: boolean;
}

export default function HeroCanvas({ isFixed = true }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<ScrollState>({ progress: 0, velocity: 0, y: 0 });

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check mobile profile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll listener: pause WebGL when scrolled far past hero to conserve GPU
    const handleScroll = () => {
      const y = window.scrollY;
      const heroThreshold = window.innerHeight * 1.25;
      setIsHeroVisible(y < heroThreshold);

      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(y / docHeight, 0), 1);
      scrollRef.current = {
        progress,
        velocity: 0,
        y,
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Tab visibility: pause loop when hidden
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Reduced motion or No-WebGL fallback: clean static CSS gradient & logo fallback
  if (reducedMotion || !hasWebGL) {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none ${
          isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
        } overflow-hidden`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#07080D]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-radial-gradient from-primary/10 via-transparent to-transparent blur-[120px]" />
      </div>
    );
  }

  const shouldRender = isTabActive && isHeroVisible;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${
        isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
      } overflow-hidden`}
      aria-hidden="true"
    >
      {/* Subtle atmospheric violet glow in hero */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at 65% 35%, rgba(124, 92, 255, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* Seamless bottom fade into page background #05050A */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/30 to-[#05050A] z-[2] pointer-events-none" />

      <Canvas
        frameloop={shouldRender ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 46 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
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
          <HeroScene scrollRef={scrollRef} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
