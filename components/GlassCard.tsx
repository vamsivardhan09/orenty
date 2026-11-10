'use client';

import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  maxTilt?: number;
  id?: string;
  accentColor?: string;
}

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return '167, 139, 250';
}

export default function GlassCard({
  children,
  className = '',
  enableTilt = true,
  maxTilt = 4,
  id,
  accentColor,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS vars for cursor spotlight
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);

    // Optional 3D tilt (max 4°, desktop pointer:fine only, disabled on reduced motion)
    if (enableTilt && typeof window !== 'undefined') {
      if (
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        setTilt({ rotateX, rotateY });
      }
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const rgb = accentColor ? hexToRgb(accentColor) : null;

  const dynamicStyles: React.CSSProperties = {
    transform:
      enableTilt && isHovered
        ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateY(-4px)`
        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    ...(rgb
      ? ({
          '--card-accent': accentColor,
          '--card-border-hover': `rgba(${rgb}, 0.38)`,
          '--card-glow-hover': `rgba(${rgb}, 0.20)`,
          '--card-spotlight': `rgba(${rgb}, 0.15)`,
        } as React.CSSProperties)
      : {}),
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={dynamicStyles}
      className={`glass-card will-change-transform ${className}`}
    >
      {/* Optional ambient color aura inside the top of the card */}
      {accentColor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {children}
    </div>
  );
}
