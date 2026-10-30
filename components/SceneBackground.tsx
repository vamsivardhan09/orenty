'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function SceneBackground() {
  return <HeroCanvas isFixed />;
}
