'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/content/site';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

// Lazy-load WebGL Canvas when needed
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a071c] via-[#05060f] to-[#04060d]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-24 bg-gradient-to-b from-violet-400/30 via-violet-600/15 to-transparent blur-2xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[130px]" />
    </div>
  ),
});

interface HeroProps {
  showCanvas?: boolean;
}

export default function Hero({ showCanvas = false }: HeroProps) {
  const verbs = siteContent.hero.rotatingVerbs;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through verbs every 3.2 seconds unless recently interacted with
  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % verbs.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isManual, verbs.length]);

  // Scroll reaction: as user scrolls down, advance or map verb to scroll progress
  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 800;

      // When user scrolls through the hero (first 600px), shift verbs with scroll
      if (y > 30 && y < vh * 1.5) {
        if (Math.abs(y - lastY) > 80) {
          const step = Math.min(
            verbs.length - 1,
            Math.floor((y / (vh * 0.45)) % verbs.length)
          );
          setActiveIdx(step);
          lastY = y;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [verbs.length]);

  const handleSelectVerb = (idx: number) => {
    setActiveIdx(idx);
    setIsManual(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    // Resume auto-cycle after 6 seconds of inactivity
    manualTimeoutRef.current = setTimeout(() => {
      setIsManual(false);
    }, 6000);
  };

  const currentVerb = verbs[activeIdx] || verbs[0];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 lg:px-12 pt-16 pb-24 text-center">
      {/* 3D WebGL Shader + Logo Scene if rendered directly */}
      {showCanvas && <HeroCanvas />}

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top HUD Badge */}
        <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-950/40 px-4 py-1.5 text-[11px] font-mono tracking-widest text-violet-300 uppercase mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span>{siteContent.hero.badge}</span>
        </div>

        {/* Dynamic Display Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase leading-[0.95] flex flex-col items-center">
          {/* Line 1: Dynamic Rolling Verb with 3D Motion Blur */}
          <div className="relative inline-flex items-center justify-center h-[1.12em] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentVerb.verb}
                initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-white drop-shadow-[0_0_25px_rgba(167,139,250,0.35)]"
              >
                {currentVerb.verb}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Line 2: WHAT'S NEXT. */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 mt-1">
            <span className="text-white">WHAT&apos;S</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-violet-300 drop-shadow-[0_0_12px_rgba(167,139,250,0.35)]">
              NEXT.
            </span>
          </div>
        </h1>

        {/* Interactive Capability Pills & Tagline */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {verbs.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={item.verb}
                  type="button"
                  onClick={() => handleSelectVerb(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border flex items-center gap-1.5 ${
                    isActive
                      ? 'border-violet-400 bg-violet-950/70 text-white shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                  data-cursor-expand="true"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-opacity duration-300 ${
                      isActive ? 'opacity-100 animate-pulse' : 'opacity-40'
                    }`}
                    style={{ backgroundColor: item.accent }}
                  />
                  <span>{item.verb}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic sub-tagline describing the active capability */}
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentVerb.tagline}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] uppercase tracking-wider text-violet-300/80 font-medium"
              >
                // {currentVerb.tagline}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Muted Body Copy */}
        <p className="mt-6 max-w-2xl text-base md:text-lg text-slate-300/90 leading-relaxed font-body font-normal">
          {siteContent.hero.subheadline}
        </p>

        {/* CTA Actions: Single call to action across site is "Apply" */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href={siteContent.hero.ctaPrimary.href} variant="primary">
            {siteContent.hero.ctaPrimary.label}
            <ArrowRight size={14} />
          </MagneticButton>
          <MagneticButton href={siteContent.hero.ctaSecondary.href} variant="secondary">
            {siteContent.hero.ctaSecondary.label}
          </MagneticButton>
        </div>
      </div>

      {/* Bottom ambient scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-violet-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
