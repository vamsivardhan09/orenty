import React from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'live'
  | 'beta'
  | 'building'
  | 'equity'
  | 'difficulty';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}: BadgeProps) {
  let variantStyle = 'badge-pill';

  switch (variant) {
    case 'live':
      variantStyle += ' badge-status-live';
      break;
    case 'beta':
      variantStyle += ' badge-status-beta';
      break;
    case 'building':
      variantStyle += ' badge-status-building';
      break;
    case 'equity':
      variantStyle += ' badge-amber-equity';
      break;
    case 'difficulty':
      variantStyle += ' text-secondary border-secondary/30 bg-secondary/10';
      break;
    case 'neutral':
    default:
      variantStyle += ' text-text-2 border-surface-border bg-surface-glass';
      break;
  }

  return <span className={`${variantStyle} ${className}`}>{children}</span>;
}
