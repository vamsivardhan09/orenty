'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] border border-violet-400/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:border-violet-300';
      case 'secondary':
        return 'bg-navy-900/80 text-violet-200 border border-violet-500/30 hover:border-violet-400 hover:bg-violet-950/40 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)]';
      case 'glass':
        return 'bg-white/[0.04] backdrop-blur-md text-slate-200 border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.08]';
      default:
        return '';
    }
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-expand="true"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.1s linear',
      }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-xs uppercase tracking-widest font-semibold will-change-transform ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}
