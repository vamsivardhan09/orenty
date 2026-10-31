'use client';

import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  enableTilt?: boolean;
  maxTilt?: number;
}

export default function GlassCard({
  children,
  className = '',
  accentColor,
  enableTilt = true,
  maxTilt = 3,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setSpotlight({ x: xPercent, y: yPercent });

    // Tilt max 3 degrees, hover only, flat at rest
    if (enableTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const limit = maxTilt;
      const rotateX = ((y - centerY) / centerY) * -limit;
      const rotateY = ((x - centerX) / centerX) * limit;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  // Flat at rest
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt && isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative rounded-2xl border border-white/[0.07] bg-navy-950/70 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all will-change-transform ${className}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, ${
            accentColor ? `${accentColor}25` : 'rgba(139, 92, 246, 0.18)'
          }, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 1px Subtle Top Rim Lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
