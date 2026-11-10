'use client';

import React from 'react';
import {
  Globe,
  Lock,
  Zap,
  Terminal,
  Cpu,
  Bot,
  Database,
  Smartphone,
  Bell,
  Wifi,
  TrendingUp,
  Activity,
  Layers,
  CheckCircle2,
} from 'lucide-react';

/**
 * 1. Web Architecture & Apps Mockup
 * A sleek dark browser shell with live architecture metrics and Next.js route preview.
 */
export function WebAppsMockup() {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-md overflow-hidden shadow-lg my-4">
      {/* Browser Window Header */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10.5px] font-mono text-text-3">
          <Lock size={10} className="text-emerald-400" />
          <span className="text-text-2">orenty.com</span>
          <span className="text-text-3">/platform</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Browser Viewport Body */}
      <div className="p-3.5 space-y-3 font-mono">
        {/* Metric Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1">
              <Zap size={10} />
              <span>42ms TTFB</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/10 border border-sky-500/20 text-sky-400 font-medium">
              Next.js 15 SSR
            </span>
          </div>
          <span className="text-[10px] text-text-3">100/100 Core Web Vitals</span>
        </div>

        {/* Micro Layout Wireframe */}
        <div className="grid grid-cols-12 gap-2 pt-1">
          {/* Micro Sidebar */}
          <div className="col-span-4 rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 space-y-1.5 text-[9.5px]">
            <div className="flex items-center gap-1.5 text-text-2">
              <Terminal size={10} className="text-sky-400" />
              <span>/routes</span>
            </div>
            <div className="pl-3 space-y-1 text-text-3">
              <div>├ app/portal</div>
              <div>├ app/stream</div>
              <div>└ app/api/auth</div>
            </div>
          </div>

          {/* Micro Content Preview */}
          <div className="col-span-8 rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-1.5 w-1/2 rounded bg-white/5" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <div className="h-6 rounded bg-sky-500/10 border border-sky-500/20" />
              <div className="h-6 rounded bg-white/[0.04]" />
              <div className="h-6 rounded bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. AI & Automation Mockup
 * Visual Agentic Workflow Graph with connected execution nodes and latency telemetry.
 */
export function AiAutomationMockup() {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-md overflow-hidden shadow-lg my-4 p-3.5 font-mono">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] text-[10.5px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-text-2 font-medium">Autonomous Agent Pipeline</span>
        </div>
        <span className="text-text-3">120ms execution</span>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="py-3 flex items-center justify-between gap-1.5 relative">
        {/* Node 1: Trigger */}
        <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.08] p-2 flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-1">
            <Zap size={12} />
          </div>
          <span className="text-[10px] text-text font-medium">Event Trigger</span>
          <span className="text-[8.5px] text-text-3">API / Webhook</span>
        </div>

        {/* Laser Connector Line 1 */}
        <div className="w-6 h-[1.5px] bg-white/20 relative">
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-1 rounded-full bg-white/60 animate-ping opacity-75" />
        </div>

        {/* Node 2: Agent Reasoning Engine */}
        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.12] p-2 flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-text mb-1">
            <Bot size={12} />
          </div>
          <span className="text-[10px] text-text font-medium">LLM Reasoning</span>
          <span className="text-[8.5px] text-text-3">Vector RAG</span>
        </div>

        {/* Laser Connector Line 2 */}
        <div className="w-6 h-[1.5px] bg-white/20 relative">
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-1 rounded-full bg-white/60 animate-ping opacity-75" />
        </div>

        {/* Node 3: Action Execution */}
        <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.08] p-2 flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
            <Database size={12} />
          </div>
          <span className="text-[10px] text-text font-medium">Tool Call</span>
          <span className="text-[8.5px] text-text-3">Auto Action</span>
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-text-3">
        <span className="text-emerald-400">✔ Output verified deterministic</span>
        <span>0 human interventions</span>
      </div>
    </div>
  );
}

/**
 * 3. Mobile Apps Mockup
 * Floating smartphone viewport with native push notifications and offline sync badge.
 */
export function MobileAppsMockup() {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-md overflow-hidden shadow-lg my-4 p-3.5 font-mono">
      {/* Device Top Status Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[10px] text-text-3">
        <span>9:41</span>
        <div className="h-2.5 w-16 rounded-full bg-white/10 mx-auto" />
        <div className="flex items-center gap-1.5">
          <Wifi size={10} className="text-text-2" />
          <span className="text-emerald-400 font-bold">100%</span>
        </div>
      </div>

      {/* Active App Preview Card */}
      <div className="py-2.5 space-y-2">
        {/* Floating Push Notification Banner */}
        <div className="rounded-lg bg-blue-500/[0.08] border border-blue-500/20 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Bell size={11} />
            </div>
            <div>
              <p className="text-[10.5px] text-text font-medium leading-none">Task Synchronized</p>
              <p className="text-[9px] text-text-3 leading-none mt-1">Real-time delta update</p>
            </div>
          </div>
          <span className="text-[9px] text-blue-400 font-semibold">Just now</span>
        </div>

        {/* Mini Native Components Row */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2 flex items-center gap-2">
            <Smartphone size={12} className="text-blue-400 shrink-0" />
            <span className="text-text-2 truncate">iOS Native Swift</span>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
            <span className="text-text-2 truncate">Offline Sync Active</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav Simulation */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-around text-text-3">
        <span className="h-1 w-8 rounded-full bg-blue-400/80" />
        <span className="h-1 w-8 rounded-full bg-white/10" />
        <span className="h-1 w-8 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

/**
 * 4. Growth & Product Strategy Mockup
 * Live telemetry chart with real-time conversion velocity curves and KPI markers.
 */
export function GrowthStrategyMockup() {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-md overflow-hidden shadow-lg my-4 p-3.5 font-mono">
      {/* KPI Stats Row */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
        <div>
          <span className="text-[9.5px] text-text-3 uppercase tracking-wider block">Conversion Velocity</span>
          <span className="text-sm font-bold text-amber-400 flex items-center gap-1 mt-0.5">
            <TrendingUp size={13} />
            <span>+148%</span>
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9.5px] text-text-3 uppercase tracking-wider block">System Reliability</span>
          <span className="text-xs font-semibold text-text mt-0.5 block">99.98%</span>
        </div>
      </div>

      {/* SVG Growth Velocity Curve */}
      <div className="py-2 relative">
        <svg viewBox="0 0 280 60" className="w-full h-14 overflow-visible" fill="none">
          <defs>
            <linearGradient id="growth-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Subtle Horizontal Grid Guidelines */}
          <line x1="0" y1="15" x2="280" y2="15" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

          {/* Area fill */}
          <path
            d="M 0 52 C 40 50, 70 45, 110 38 C 150 30, 190 22, 230 14 C 250 10, 270 6, 280 4 L 280 60 L 0 60 Z"
            fill="url(#growth-gradient)"
          />
          {/* Main curve stroke */}
          <path
            d="M 0 52 C 40 50, 70 45, 110 38 C 150 30, 190 22, 230 14 C 250 10, 270 6, 280 4"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Active Data Beacon on peak */}
          <circle cx="280" cy="4" r="3.5" fill="#F59E0B" />
          <circle cx="280" cy="4" r="6" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom Timeline Milestone Markers */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-text-3">
        <span>Sprint 1</span>
        <span>Architecture Launch</span>
        <span className="text-amber-400 font-semibold">Scale Phase</span>
      </div>
    </div>
  );
}
