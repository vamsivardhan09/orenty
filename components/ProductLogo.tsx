import React from 'react';
import Image from 'next/image';

interface ProductLogoProps {
  slug: string;
  size?: number;
  className?: string;
}

/**
 * ProductLogo renders the authentic original app emblem for each Orenty product,
 * sourced directly from each product's active repository.
 *
 * Sizing is calibrated to seamlessly align with heading typography (default 22px).
 */
export default function ProductLogo({ slug, size = 22, className = '' }: ProductLogoProps) {
  const borderRadius = Math.max(4, Math.round(size * 0.27));

  switch (slug) {
    case 'syncedin': {
      // Concentric Infinity Nexus mark from SyncdIn repo (brand-logo.tsx)
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={`shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/25 to-violet-600/20 border border-violet-500/35 shadow-xs shadow-violet-500/20 select-none ${className}`}
          title="SyncedIn Logo"
          aria-label="SyncedIn Logo"
        >
          <svg
            viewBox="0 0 64 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: Math.round(size * 0.7), height: Math.round(size * 0.7) }}
            className="shrink-0"
          >
            <defs>
              <linearGradient id="syn-nexus-grad" x1="4" y1="8" x2="60" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
            {/* Outer harmonic infinity track */}
            <path
              d="M 32 18 C 39 30, 54 30, 58 18 C 62 6, 47 6, 32 18 C 17 30, 2 30, 6 18 C 10 6, 25 6, 32 18 Z"
              stroke="url(#syn-nexus-grad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner concentric loop */}
            <path
              d="M 32 18 C 37 26, 48 26, 51 18 C 54 10, 43 10, 32 18 C 21 26, 10 26, 13 18 C 16 10, 27 10, 32 18 Z"
              stroke="url(#syn-nexus-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    case 'fanbase': {
      // Interlocking community arcs & connection node from Fanbase repo (BrandLogo.tsx)
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={`shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0064E0] to-[#0047A5] text-white shadow-xs shadow-[#0064E0]/25 select-none ${className}`}
          title="Fanbase Logo"
          aria-label="Fanbase Logo"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: Math.round(size * 0.64), height: Math.round(size * 0.64) }}
            className="text-white shrink-0"
          >
            <path
              d="M8 16C8 11.5817 11.5817 8 16 8C19.3137 8 22.148 10.0191 23.3284 12.9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M24 16C24 20.4183 20.4183 24 16 24C12.6863 24 9.85197 21.9809 8.67163 17.1"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            <circle cx="16" cy="16" r="3.2" fill="currentColor" />
          </svg>
        </div>
      );
    }

    case 'job-pilot': {
      // Supersonic pilot jet emblem from JobPilot repo (assets/jobpilot-logo.png)
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={`shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0284c7] to-[#0369a1] shadow-xs shadow-[#0284c7]/25 select-none overflow-hidden ${className}`}
          title="Job Pilot Logo"
          aria-label="Job Pilot Logo"
        >
          <Image
            src="/products/logos/job-pilot.png"
            alt="Job Pilot Mark"
            width={Math.round(size * 0.7)}
            height={Math.round(size * 0.7)}
            className="object-contain"
            unoptimized
          />
        </div>
      );
    }

    case 'pujari-ai': {
      // Sacred Vedic Om emblem in Saffron squircle from Pujari.ai repo (DesktopNavbar.tsx)
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={`shrink-0 flex items-center justify-center bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xs shadow-orange-500/25 select-none ${className}`}
          title="Pujari.ai Logo"
          aria-label="Pujari.ai Logo"
        >
          <span
            style={{ fontSize: `${Math.round(size * 0.62)}px` }}
            className="font-serif font-bold text-white leading-none select-none translate-y-[-0.5px]"
          >
            ॐ
          </span>
        </div>
      );
    }

    case 'g1-mart': {
      // Emerald / green grocery emblem from G1 Mart
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={`shrink-0 flex items-center justify-center bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xs shadow-emerald-500/25 select-none overflow-hidden p-0.5 ${className}`}
          title="G1 Mart Logo"
          aria-label="G1 Mart Logo"
        >
          <Image
            src="/products/logos/g1-mart-icon.png"
            alt="G1 Mart Mark"
            width={Math.round(size * 0.85)}
            height={Math.round(size * 0.85)}
            className="object-contain"
            unoptimized
          />
        </div>
      );
    }

    default:
      return null;
  }
}
