'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  stagger = 0.05,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = containerRef.current.querySelectorAll('.reveal-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger]);

  // Split text into words wrapped in overflow-hidden spans
  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic component ref
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1 align-top">
          <span className="reveal-word inline-block will-change-transform">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Component>
  );
}
