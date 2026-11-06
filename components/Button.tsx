'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  ariaLabel,
}: ButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || loading || !buttonRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (e.clientX - centerX) * 0.25;
    const y = (e.clientY - centerY) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'btn-tertiary';

  const magneticStyle =
    offset.x !== 0 || offset.y !== 0
      ? {
          transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }
      : {
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        };

  const content = (
    <>
      {loading && (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        style={magneticStyle}
        data-cursor-expand="true"
        className={`${variantClass} ${className} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      style={magneticStyle}
      data-cursor-expand="true"
      className={`${variantClass} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </button>
  );
}
