'use client';

import React from 'react';
import Button, { ButtonVariant } from './Button';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant | 'glass';
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const mappedVariant: ButtonVariant =
    variant === 'glass' ? 'secondary' : (variant as ButtonVariant);

  return (
    <Button
      href={href}
      variant={mappedVariant}
      className={className}
      onClick={onClick}
      ariaLabel={ariaLabel}
    >
      {children}
    </Button>
  );
}
