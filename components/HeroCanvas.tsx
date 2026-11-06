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
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hueGlow, setHueGlow] = useState('rgba(124, 92, 255, 0.08)'); // hero electric violet

  const scrollRef = useRef<ScrollState>({ progress: 0, velocity: 0, y: 0 });
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

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
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll listener: update progress & compute section hue shift
    const handleScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dy = y - lastY.current;
      const velocity = (dy / dt) * 16;

      lastY.current = y;
      lastTime.current = now;

      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(y / docHeight, 0), 1);

      scrollRef.current = {
        progress,
        velocity: Math.min(Math.max(velocity, -6), 6),
        y,
      };

      // Atmosphere hue shift per section:
      // Hero (0 - 0.20): electric violet #7C5CFF
      // Services (0.20 - 0.45): cool blue-violet #4F46E5
      // Products (0.45 - 0.75): faint cyan #38D6FF
      // Startup Lab (0.75 - 1.0): faint warm amber #FFB547
      if (progress < 0.2) {
        setHueGlow('rgba(124, 92, 255, 0.08)');
      } else if (progress < 0.45) {
        setHueGlow('rgba(79, 70, 229, 0.07)');
      } else if (progress < 0.75) {
        setHueGlow('rgba(56, 214, 255, 0.06)');
      } else {
        setHueGlow('rgba(255, 181, 71, 0.07)');
      }
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

  // Reduced motion or No-WebGL fallback: clean static CSS starfield & gradient
  if (reducedMotion || !hasWebGL) {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none ${
          isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
        } overflow-hidden`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#05050A]" />
        {/* Soft static nebula glow */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${hueGlow} 0%, transparent 65%)`,
          }}
        />
        {/* CSS static stars fallback */}
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20px_30px,#ffffff,transparent),radial-gradient(1.5px_1.5px_at_120px_160px,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_240px_80px,rgba(255,255,255,0.5),transparent)] bg-[size:320px_320px] opacity-40" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${
        isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
      } overflow-hidden`}
      aria-hidden="true"
    >
      {/* Dynamic atmospheric nebula hue gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${hueGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Dark scrim behind text */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/40 to-[#05050A]/90 z-[2] pointer-events-none" />

      <Canvas
        frameloop={isTabActive ? 'always' : 'never'}
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
          <HeroScene scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
