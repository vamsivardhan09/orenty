'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  accentColor?: string;
  enableTilt?: boolean;

  // Standardized 5-Row Layout Props
  eyebrow?: string;
  badge?: string;
  badgeStatus?: 'building' | 'live' | 'idea' | 'open' | string;
  media?: React.ReactNode;
  title?: string;
  tagline?: string;
  description?: string;
  features?: string[];
  footerLabel?: string;
  footerHref?: string;
  ctaButton?: {
    label: string;
    href: string;
  };
}

export default function GlassCard({
  children,
  className = '',
  accentColor = '#8b5cf6',
  enableTilt = true,
  eyebrow,
  badge,
  badgeStatus,
  media,
  title,
  tagline,
  description,
  features,
  footerLabel,
  footerHref,
  ctaButton,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(isTouch || isReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setSpotlight({ x: xPercent, y: yPercent });

    if (enableTilt && !isTouchOrReduced) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Max 6 degrees subtle tilt
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const hasStandardLayout = Boolean(eyebrow || title || description || media);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt && !isTouchOrReduced
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
              isHovered ? 'scale3d(1.01, 1.01, 1)' : 'scale3d(1, 1, 1)'
            }`
          : undefined,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.2, 0, 0, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070914]/85 p-7 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all will-change-transform ${
        isHovered ? 'border-opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.7)]' : ''
      } ${className}`}
    >
      {/* 4 Corner-Bracket accents sitting on the real card corners (12px) */}
      <span
        className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 transition-colors duration-300"
        style={{
          borderTop: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
          borderLeft: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 transition-colors duration-300"
        style={{
          borderTop: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
          borderRight: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 transition-colors duration-300"
        style={{
          borderBottom: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
          borderLeft: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 transition-colors duration-300"
        style={{
          borderBottom: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
          borderRight: `1.5px solid ${isHovered ? accentColor : `${accentColor}70`}`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Cursor Spotlight Radial Mask Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${spotlight.x}% ${spotlight.y}%, ${accentColor}22, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 1px gradient border that brightens near the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          border: `1px solid ${accentColor}60`,
          boxShadow: `inset 0 0 20px ${accentColor}15`,
        }}
        aria-hidden="true"
      />

      {/* Card Content Container */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {hasStandardLayout ? (
          <>
            {/* ROW 1: Eyebrow + Status Badge */}
            {(eyebrow || badge) && (
              <div className="flex items-center justify-between gap-3 mb-5 min-h-[26px]">
                {eyebrow && (
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 truncate">
                    {eyebrow}
                  </span>
                )}
                {badge && (
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${accentColor}18`,
                      color: accentColor,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    {badgeStatus ? `${badge}` : badge}
                  </span>
                )}
              </div>
            )}

            {/* ROW 2: Animated Media Window (16:10 aspect ratio) */}
            {media && (
              <div className="mb-5 w-full overflow-hidden rounded-xl">
                {React.isValidElement(media)
                  ? React.cloneElement(media as React.ReactElement<{ isHovered?: boolean }>, {
                      isHovered,
                    })
                  : media}
              </div>
            )}

            {/* ROW 3: Title (Display font, 1.5 - 1.75rem) */}
            {title && (
              <div className="mb-2">
                <h3 className="font-display text-[1.625rem] font-bold text-white tracking-tight leading-snug">
                  {title}
                </h3>
                {tagline && (
                  <p
                    className="font-mono text-xs uppercase tracking-wider font-semibold mt-1"
                    style={{ color: accentColor }}
                  >
                    {tagline}
                  </p>
                )}
              </div>
            )}

            {/* ROW 4: 2-line Description in Sentence Case (Min 16px body font) + Optional Chips */}
            {description && (
              <div className="mb-6 flex-1">
                <p className="font-body text-base text-slate-300/90 leading-relaxed">
                  {description}
                </p>

                {/* Optional short feature chips */}
                {features && features.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 font-body"
                      >
                        <span
                          className="mr-1.5 h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom additional inner content if passed alongside standard props */}
            {children}

            {/* ROW 5: Footer Link (With arrow that nudges right on hover) & Action */}
            {(footerLabel || footerHref || ctaButton) && (
              <div className="mt-auto pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                {footerHref && footerLabel ? (
                  <Link
                    href={footerHref}
                    className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-white transition-colors"
                    data-cursor-expand="true"
                  >
                    <span>{footerLabel}</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                      style={{ color: isHovered ? accentColor : undefined }}
                    />
                  </Link>
                ) : (
                  <div />
                )}

                {ctaButton && (
                  <Link
                    href={ctaButton.href}
                    className="rounded-full px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-white transition-all duration-300 shadow-md"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: isHovered ? `0 0 18px ${accentColor}60` : undefined,
                    }}
                  >
                    {ctaButton.label}
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          // Freeform single-frame content (e.g. final Apply CTA, form, or process card)
          children
        )}
      </div>
    </div>
  );
}
