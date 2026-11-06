import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  className?: string;
  eyebrowColor?: 'secondary' | 'warm' | 'meta';
}

export default function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  className = '',
  eyebrowColor = 'secondary',
}: SectionHeaderProps) {
  const eyebrowColorClass =
    eyebrowColor === 'warm'
      ? 'text-warm'
      : eyebrowColor === 'meta'
      ? 'text-text-3'
      : 'text-secondary';

  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${className}`}>
      <div className={`eyebrow-label mb-3 inline-flex items-center gap-2 ${eyebrowColorClass}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="h2-section mb-4 text-text">{headline}</h2>
      <p className="sub-paragraph text-text-2">{subheadline}</p>
    </div>
  );
}
