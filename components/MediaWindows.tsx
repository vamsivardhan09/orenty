'use client';

import React, { useRef, useEffect, useState, useId } from 'react';

interface MediaWindowProps {
  isHovered?: boolean;
  className?: string;
}

// Hook to pause animations when off-screen or reduced-motion is requested
function useAnimationActive(containerRef: React.RefObject<HTMLElement | null>) {
  const [isActive, setIsActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      observer.disconnect();
    };
  }, [containerRef]);

  return { isActive, reducedMotion };
}

// 1. Software Solutions Media Window: Minimal code window with typing lines and sweeping scan bar
export function SoftwareMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070914] p-4 font-mono text-[11px] ${className}`}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] tracking-wider text-slate-500">pipeline.ts</span>
        <span className="text-[9px] uppercase tracking-widest text-indigo-400/80">RUNNING</span>
      </div>

      {/* Code Lines with syntax accents */}
      <div className="space-y-1.5 text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 w-3">1</span>
          <span className="text-indigo-400">const</span>
          <span className="text-slate-200">engine</span>
          <span className="text-indigo-400">=</span>
          <span className="text-violet-300">await</span>
          <span className="text-cyan-300">loadCluster</span>();
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 w-3">2</span>
          <span className="text-indigo-400">const</span>
          <span className="text-slate-200">stream</span>
          <span className="text-indigo-400">=</span>
          <span className="text-slate-200">engine</span>.<span className="text-cyan-300">pipe</span>({'{'}
        </div>
        <div className="flex items-center gap-2 pl-4">
          <span className="text-slate-600 w-3">3</span>
          <span className="text-slate-400">latency:</span>
          <span className="text-emerald-400">&quot;sub-50ms&quot;</span>,
          <span className="text-slate-400">auth:</span>
          <span className="text-indigo-300">true</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 w-3">4</span>
          <span className="text-slate-200">{'}'});</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 w-3">5</span>
          <span className="text-indigo-400">return</span>
          <span className="text-slate-200">stream</span>.<span className="text-cyan-300">deploy</span>();
          <span className="inline-block h-3 w-1.5 bg-indigo-400 animate-pulse ml-1" />
        </div>
      </div>

      {/* Sweeping Luminous Scan Bar */}
      {!reducedMotion && isActive && (
        <div
          className="pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent blur-sm"
          style={{
            animation: `sweepScan ${isHovered ? '1.5s' : '3.5s'} ease-in-out infinite alternate`,
          }}
        />
      )}

      {/* Subtle corner grid highlight */}
      <div className="pointer-events-none absolute bottom-2 right-3 font-mono text-[9px] text-slate-600">
        LATENCY 12ms // 60 FPS
      </div>

      <style jsx>{`
        @keyframes sweepScan {
          0% {
            top: -15%;
            opacity: 0.1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            top: 85%;
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}

// 2. Products Division Media Window: Four small tiles in 4 accent colors stacked, fanning out on hover
export function ProductsMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useAnimationActive(containerRef);

  const tiles = [
    { name: 'SyncedIn', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.25)', border: 'rgba(139, 92, 246, 0.5)', rot: -16, x: -38 },
    { name: 'Fanbase', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.25)', border: 'rgba(236, 72, 153, 0.5)', rot: -5, x: -12 },
    { name: 'Job Pilot', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.25)', border: 'rgba(6, 182, 212, 0.5)', rot: 6, x: 14 },
    { name: 'Pujari.ai', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.25)', border: 'rgba(245, 158, 11, 0.5)', rot: 17, x: 40 },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070914] flex items-center justify-center ${className}`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />

      {/* 4 Stacked Tiles */}
      <div className="relative h-24 w-32 flex items-center justify-center">
        {tiles.map((tile, idx) => {
          const hoveredTransform = !reducedMotion && isHovered
            ? `translateX(${tile.x}px) translateY(-4px) rotate(${tile.rot}deg) scale(1.05)`
            : `translateY(${idx * 2}px) rotate(${(idx - 1.5) * 3}deg)`;

          return (
            <div
              key={tile.name}
              className="absolute h-20 w-24 rounded-lg p-2.5 backdrop-blur-md shadow-lg transition-transform duration-500 ease-out flex flex-col justify-between"
              style={{
                backgroundColor: tile.bg,
                borderColor: tile.border,
                borderWidth: '1px',
                transform: hoveredTransform,
                zIndex: idx + 1,
                boxShadow: isHovered ? `0 10px 25px -5px ${tile.color}35` : '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tile.color }} />
                <span className="font-mono text-[8px] text-white/50 tracking-wider">0{idx + 1}</span>
              </div>
              <div>
                <span className="font-display text-[10px] font-bold text-white block truncate">
                  {tile.name}
                </span>
                <span className="font-mono text-[8px] tracking-tight" style={{ color: tile.color }}>
                  BUILDING
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-2.5 inset-x-0 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500">
        {isHovered ? '4 In-House Ventures' : 'Hover to Expand Architecture'}
      </div>
    </div>
  );
}

// 3. Startup Lab Media Window: Small tiles drifting slowly, one lights up and a ring fills around it
export function LabMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070914] p-3 flex flex-col justify-between ${className}`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      {/* Floating mini tiles */}
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Dim ambient tile 1 */}
        <div
          className={`absolute left-3 top-2 h-11 w-20 rounded border border-white/[0.06] bg-navy-950/40 p-1.5 backdrop-blur-sm transition-transform duration-1000 ${
            !reducedMotion && isActive ? 'animate-pulse' : ''
          }`}
          style={{ transform: isHovered ? 'translateY(-3px)' : 'none' }}
        >
          <span className="font-mono text-[7px] text-slate-500 block">CH-2601</span>
          <span className="font-display text-[8px] text-slate-400 block truncate">Graph Index</span>
        </div>

        {/* Dim ambient tile 2 */}
        <div
          className="absolute right-4 bottom-3 h-11 w-20 rounded border border-white/[0.06] bg-navy-950/40 p-1.5 backdrop-blur-sm"
          style={{ transform: isHovered ? 'translateY(3px)' : 'none' }}
        >
          <span className="font-mono text-[7px] text-slate-500 block">CH-2603</span>
          <span className="font-display text-[8px] text-slate-400 block truncate">Parser Alg</span>
        </div>

        {/* Selected highlighted challenge tile with circular ownership ring */}
        <div className="relative z-10 flex items-center gap-3 rounded-xl border border-pink-500/40 bg-pink-950/40 p-3 shadow-[0_0_30px_rgba(236,72,153,0.25)] backdrop-blur-md">
          {/* Circular Ownership Progress Ring */}
          <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
            <svg className="h-10 w-10 -rotate-90 transform" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#ec4899"
                strokeWidth="2.5"
                strokeDasharray="100"
                strokeDashoffset={isHovered ? '10' : '35'}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute font-mono text-[8px] font-bold text-pink-300">
              {isHovered ? '90%' : '65%'}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-ping" />
              <span className="font-mono text-[8px] uppercase tracking-wider text-pink-300 font-semibold">
                CHALLENGE ACTIVE
              </span>
            </div>
            <span className="font-display text-xs font-bold text-white block mt-0.5">
              Team Co-Ownership
            </span>
            <span className="font-mono text-[8px] text-pink-400/80 block">
              Terms defined per challenge
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-500 border-t border-white/[0.04] pt-1.5">
        <span>INCUBATION POOL</span>
        <span className="text-pink-400">FOUNDING EQUITY</span>
      </div>
    </div>
  );
}

// 4. SyncedIn Product Media Window: Network of ~30 nodes with connecting lines, drift and link toward cursor
export function SyncedInMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);
  const mousePos = useRef({ x: 150, y: 100, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // 28 nodes
    const nodeCount = 28;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 1.5 + Math.random() * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.35;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor if within range
        if (mousePos.current.active) {
          const mdx = nodes[i].x - mousePos.current.x;
          const mdy = nodes[i].y - mousePos.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 90) {
            const malpha = (1 - mdist / 90) * 0.6;
            ctx.strokeStyle = `rgba(196, 181, 253, ${malpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.fillStyle = i % 3 === 0 ? '#c4b5fd' : '#8b5cf6';
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position if active
        if (!reducedMotion && isActive) {
          nodes[i].x += nodes[i].vx * (isHovered ? 1.5 : 1.0);
          nodes[i].y += nodes[i].vy * (isHovered ? 1.5 : 1.0);

          // Gentle pull toward cursor on hover
          if (mousePos.current.active) {
            const pullX = (mousePos.current.x - nodes[i].x) * 0.003;
            const pullY = (mousePos.current.y - nodes[i].y) * 0.003;
            nodes[i].x += pullX;
            nodes[i].y += pullY;
          }

          if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
          if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;
        }
      }

      if (!reducedMotion && isActive) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isActive, isHovered, reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mousePos.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-violet-500/20 bg-[#070914] ${className}`}
    >
      <div className="absolute top-2 left-3 z-10 font-mono text-[9px] uppercase tracking-wider text-violet-400">
        AI SEMANTIC GRAPH
      </div>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}

// 5. Fanbase Product Media Window: Concentric rings of dots orbiting center point (community), pulsing on hover
export function FanbaseMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-pink-500/20 bg-[#070914] flex items-center justify-center ${className}`}
    >
      <div className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-pink-400">
        CREATOR ORBIT
      </div>

      {/* Orbit Rings Container */}
      <div className="relative flex items-center justify-center">
        {/* Core creator node */}
        <div
          className={`relative z-20 h-6 w-6 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 shadow-[0_0_20px_rgba(236,72,153,0.8)] flex items-center justify-center ${
            isHovered ? 'scale-110' : ''
          } transition-transform duration-300`}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>

        {/* Orbit Ring 1 (Inner) */}
        <div
          className={`absolute h-20 w-20 rounded-full border border-pink-500/30 ${
            !reducedMotion && isActive ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: isHovered ? '8s' : '18s' }}
        >
          <span className="absolute top-0 left-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full bg-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          <span className="absolute bottom-0 left-1/2 -ml-1 -mb-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
        </div>

        {/* Orbit Ring 2 (Middle) */}
        <div
          className={`absolute h-32 w-32 rounded-full border border-pink-500/20 ${
            !reducedMotion && isActive ? 'animate-spin' : ''
          }`}
          style={{
            animationDirection: 'reverse',
            animationDuration: isHovered ? '12s' : '26s',
          }}
        >
          <span className="absolute top-1/2 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          <span className="absolute top-1/4 right-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
          <span className="absolute bottom-1/4 left-2 h-1.5 w-1.5 rounded-full bg-pink-200" />
        </div>

        {/* Orbit Ring 3 (Outer) */}
        <div
          className={`absolute h-44 w-44 rounded-full border border-pink-500/10 ${
            !reducedMotion && isActive ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: isHovered ? '16s' : '36s' }}
        >
          <span className="absolute top-0 left-1/2 -ml-1 -mt-1 h-1.5 w-1.5 rounded-full bg-pink-400/80" />
          <span className="absolute bottom-1/3 right-1 h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
          <span className="absolute bottom-0 left-1/3 h-1.5 w-1.5 rounded-full bg-pink-300/80" />
        </div>

        {/* Shockwave ripple on hover */}
        {isHovered && !reducedMotion && (
          <div className="absolute h-36 w-36 rounded-full border border-pink-400/40 animate-ping pointer-events-none" />
        )}
      </div>

      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-slate-500">
        SOVEREIGN CHANNELS
      </div>
    </div>
  );
}

// 6. Job Pilot Product Media Window: Abstract doc with lines highlighting sequentially and filling ring
export function JobPilotMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isActive) return;
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % 4);
    }, isHovered ? 700 : 1200);

    return () => clearInterval(interval);
  }, [isActive, isHovered, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-[#070914] p-4 flex items-center justify-between ${className}`}
    >
      {/* Abstract Resume Document Card */}
      <div className="relative h-full w-[65%] rounded-lg border border-white/10 bg-navy-950/70 p-3 flex flex-col justify-between backdrop-blur-sm">
        {/* Header bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
          <div className="h-4 w-4 rounded bg-cyan-500/30 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-sm bg-cyan-400" />
          </div>
          <div className="h-2 w-16 rounded bg-white/20" />
        </div>

        {/* 4 Sequentially Highlighting Content Lines */}
        <div className="space-y-2 py-1">
          {[0, 1, 2, 3].map((idx) => {
            const isCurrent = activeLine === idx;
            return (
              <div
                key={idx}
                className="h-2 rounded transition-all duration-300"
                style={{
                  width: idx === 1 ? '90%' : idx === 2 ? '75%' : '100%',
                  backgroundColor: isCurrent ? 'rgba(6, 182, 212, 0.85)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isCurrent ? '0 0 12px rgba(6, 182, 212, 0.6)' : 'none',
                }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400/80">
          <span>ROLE ALIGNMENT</span>
          <span>ATS READY</span>
        </div>
      </div>

      {/* Readiness Progress Ring (Abstract, no invented stats/numbers) */}
      <div className="flex flex-col items-center justify-center w-[30%]">
        <div className="relative h-14 w-14 flex items-center justify-center">
          <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="113"
              strokeDashoffset={isHovered ? '15' : '38'}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            />
          </svg>
          <div className="absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300 mt-2 font-semibold">
          ALIGNED
        </span>
      </div>
    </div>
  );
}

// 7. Pujari.ai Product Media Window: Slowly rotating geometric mandala with soft warm center glow
export function PujariMediaWindow({ isHovered = false, className = '' }: MediaWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, reducedMotion } = useAnimationActive(containerRef);
  const uniqueId = useId();

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-amber-500/20 bg-[#070914] flex items-center justify-center ${className}`}
    >
      <div className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-amber-400">
        VEDIC GEOMETRY
      </div>

      {/* Warm Ambient Center Glow */}
      <div className="absolute h-28 w-28 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />

      {/* Rotating Sacred Mandala SVG */}
      <div
        className={`relative flex items-center justify-center ${
          !reducedMotion && isActive ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: isHovered ? '20s' : '55s' }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" className="opacity-80">
          <defs>
            <linearGradient id={`mandala-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Concentric Circles */}
          <circle cx="75" cy="75" r="66" stroke={`url(#mandala-grad-${uniqueId})`} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="75" cy="75" r="48" stroke={`url(#mandala-grad-${uniqueId})`} strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="75" cy="75" r="30" stroke={`url(#mandala-grad-${uniqueId})`} strokeWidth="1.2" fill="none" opacity="0.8" />

          {/* 8-Point Intersecting Squares */}
          <rect x="37.5" y="37.5" width="75" height="75" stroke={`url(#mandala-grad-${uniqueId})`} strokeWidth="1" fill="none" opacity="0.5" />
          <rect x="37.5" y="37.5" width="75" height="75" transform="rotate(45 75 75)" stroke={`url(#mandala-grad-${uniqueId})`} strokeWidth="1" fill="none" opacity="0.5" />

          {/* 12 Radiant Rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="75"
              y1="25"
              x2="75"
              y2="15"
              transform={`rotate(${i * 30} 75 75)`}
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}

          {/* Golden Bindu Core */}
          <circle cx="75" cy="75" r="6" fill="#fbbf24" />
          <circle cx="75" cy="75" r="12" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.9" />
        </svg>
      </div>

      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-amber-500/80">
        PANCHANGAM & MANTRAS
      </div>
    </div>
  );
}
