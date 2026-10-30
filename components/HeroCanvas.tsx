'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroScene, { ScrollState } from './HeroScene';

interface HeroCanvasProps {
  isFixed?: boolean;
}

export default function HeroCanvas({ isFixed = false }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const scrollRef = useRef<ScrollState>({ progress: 0, velocity: 0, y: 0 });
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check device profile
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
    }

    // Scroll listener to update 3D motion and graceful depth fade
    const handleScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dy = y - lastY.current;
      const velocity = (dy / dt) * 16;

      lastY.current = y;
      lastTime.current = now;

      const vh = window.innerHeight || 800;
      const progress = y / vh;

      scrollRef.current = {
        progress: Math.max(0, progress),
        velocity: Math.min(Math.max(velocity, -6), 6),
        y,
      };

      // Fade out gracefully after divisions & products sections (past 2.6 viewports)
      if (y > vh * 2.5) {
        const fade = Math.max(0, 1 - (y - vh * 2.5) / (vh * 1.2));
        setOpacity(fade);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Tab visibility change: Pause WebGL loop when tab is hidden
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // If not fixed, observe container visibility
    let observer: IntersectionObserver | null = null;
    if (!isFixed && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [isFixed]);

  // When reduced motion, render static cinematic gradient hero
  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none ${
          isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
        } overflow-hidden`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a071c] via-[#05060f] to-[#04060d]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-24 bg-gradient-to-b from-violet-400/30 via-violet-600/15 to-transparent blur-2xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[130px]" />
      </div>
    );
  }

  // Active rendering condition: visible, active tab, and not scrolled off end of page
  const shouldRender = (isFixed ? opacity > 0.01 : isVisible) && isTabActive;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${
        isFixed ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'
      } overflow-hidden transition-opacity duration-500`}
      style={{ opacity }}
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
          <HeroScene scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
