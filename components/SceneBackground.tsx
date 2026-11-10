'use client';

import React from 'react';

export default function SceneBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080D]"
      aria-hidden="true"
    >
      {/* Top architectural structural hairline (Linear / Clarity style) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none" />

      {/* Subtle ambient violet haze at the very top */}
      <div 
        className="absolute -top-32 left-1/4 w-[600px] h-[300px] rounded-full pointer-events-none blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
