'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import Button from './Button';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Calendar,
  Mail,
  ArrowRight,
  ShieldCheck,
  Code2,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';

interface ServiceOption {
  id: string;
  label: string;
  subtitle: string;
}

const serviceOptions: ServiceOption[] = [
  { id: 'Web app', label: 'Web Applications', subtitle: 'Platforms, SaaS & APIs' },
  { id: 'Mobile app', label: 'Mobile Apps', subtitle: 'Native iOS & Android' },
  { id: 'AI automation', label: 'AI & Automation', subtitle: 'Autonomous LLM Agents' },
  { id: 'Startup Lab', label: 'Startup Lab', subtitle: 'Co-builder Incubation' },
  { id: '30-min Scoping Call', label: '30-min Scoping Call', subtitle: '1-on-1 Architecture Call' },
  { id: 'Architecture Advisory', label: 'Technical Advisory', subtitle: 'Code Review & Audit' },
];

const budgetOptions = [
  { id: 'Under $5,000', label: '< $5,000', tag: 'Audit / MVP' },
  { id: '$5,000 - $15,000', label: '$5k – $15k', tag: 'Core Build' },
  { id: '$15,000 - $30,000', label: '$15k – $30k', tag: 'Scale Platform' },
  { id: '$30,000+', label: '$30,000+', tag: 'Enterprise' },
  { id: 'Flexible / To be discussed', label: 'Flexible', tag: 'Discuss on call' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    need: 'Web app',
    budget: '$5,000 - $15,000',
    message: '',
    website: '', // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#book-a-call' || hash === '#request-call' || hash === '#call') {
        setFormData((prev) => ({
          ...prev,
          need: '30-min Scoping Call',
          message: prev.message || "I'd like to schedule a 1-on-1 30-minute scoping call to discuss our project goals.",
        }));
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
          const nameInput = document.getElementById('contact-name');
          if (nameInput) nameInput.focus();
        }
      }
    }
  }, []);

  const handleSelectScopingCall = () => {
    setFormData((prev) => ({
      ...prev,
      need: '30-min Scoping Call',
      message: prev.message || "I'd like to schedule a 1-on-1 30-minute scoping call to discuss our project goals.",
    }));
    const formEl = document.getElementById('contact-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('contact-name');
      if (nameInput) nameInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        need: 'Web app',
        budget: '$5,000 - $15,000',
        message: '',
        website: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* =================================================================== */}
      {/* Left Column: Studio Telemetry & Executive Concierge Gateways       */}
      {/* =================================================================== */}
      <div className="lg:col-span-5 space-y-5">
        
        {/* 1. Live Studio Telemetry (Proof of Life) */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#07070A]/90 p-5 backdrop-blur-xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-3.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                Studio Telemetry
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Intake Active
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Primary Hub</span>
              <span className="text-neutral-200">Bengaluru, India (IST)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Median Review Time</span>
              <span className="text-neutral-200">&lt; 2.4 Hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Current Capacity</span>
              <span className="text-neutral-200">2 Senior Pods Open</span>
            </div>
          </div>
        </div>

        {/* 2. Direct Executive Concierge Channels */}
        <GlassCard className="p-6 md:p-7 relative overflow-hidden">
          <div className="mb-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 font-semibold block mb-1">
              DIRECT CONCIERGE
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Prefer instant access?
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Skip the queue. All direct communication channels route directly to our technical founders and lead architects.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/?text=Hi%20Orenty%20team,%20I'd%20like%20to%20discuss%20a%20project%20with%20your%20senior%20engineering%20pod."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/40 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25 group-hover:scale-105 transition-transform">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Chat on WhatsApp
                    </span>
                    <span className="text-[9.5px] font-mono uppercase bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                      FASTEST
                    </span>
                  </div>
                  <span className="block text-xs text-neutral-400 font-mono">
                    Instant messaging · ~5m reply
                  </span>
                </div>
              </div>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Request a 1-on-1 Scoping Call */}
            <button
              type="button"
              onClick={handleSelectScopingCall}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/[0.05] text-neutral-200 flex items-center justify-center shrink-0 border border-white/15 group-hover:scale-105 transition-transform">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      Book a 30-min call
                    </span>
                    <span className="text-[9.5px] font-mono uppercase bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded border border-white/20 font-bold">
                      1-ON-1
                    </span>
                  </div>
                  <span className="block text-xs text-neutral-400 font-mono">
                    Technical scoping with founders
                  </span>
                </div>
              </div>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Direct Email */}
            <a
              href="mailto:contact@orenty.in"
              className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/[0.05] text-neutral-300 flex items-center justify-center shrink-0 border border-white/15 group-hover:scale-105 transition-transform">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-white group-hover:text-white transition-colors">
                    Email engineering team
                  </span>
                  <span className="block text-xs text-neutral-400 font-mono">
                    contact@orenty.in · 24h reply
                  </span>
                </div>
              </div>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </GlassCard>

        {/* 3. Studio Guarantees */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#07070A]/80 p-5 backdrop-blur-md">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 block mb-3 font-semibold">
            THE ORENTY ASSURANCE
          </span>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            <li className="flex items-start gap-2.5">
              <ShieldCheck size={15} className="text-white shrink-0 mt-0.5" />
              <span>Mutual NDA signed prior to proprietary technical review.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Code2 size={15} className="text-white shrink-0 mt-0.5" />
              <span>Direct senior engineer pods only—zero junior outsourcing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Sparkles size={15} className="text-white shrink-0 mt-0.5" />
              <span>100% intellectual property & clean Git repository ownership.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={15} className="text-white shrink-0 mt-0.5" />
              <span>Milestone-based sprints with verifiable weekly staging builds.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* =================================================================== */}
      {/* Right Column: Tactile Luxury Scoping Form                          */}
      {/* =================================================================== */}
      <div id="contact-form" className="lg:col-span-7 scroll-mt-24">
        <div id="book-a-call" className="scroll-mt-24">
          <GlassCard className="p-7 sm:p-9 md:p-10 relative overflow-hidden border border-white/[0.1] bg-[#08080C]/90 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            
            {status === 'success' ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Project Enquiry Dispatched
                </h3>
                <p className="text-sm text-neutral-300 max-w-md font-body leading-relaxed mb-8">
                  Thank you for reaching out. Our senior engineering pod reviews all incoming scopes within 24 hours and will follow up with initial architecture proposals.
                </p>
                <Button onClick={() => setStatus('idle')} variant="secondary">
                  <span>Send another enquiry</span>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* 1. TACTILE CHIPS: What do you need built? */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                      What are you looking to build? <span className="text-white">*</span>
                    </label>
                    <span className="text-[10.5px] font-mono text-neutral-500">
                      Tap to select scope
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceOptions.map((opt) => {
                      const isSelected = formData.need === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, need: opt.id })}
                          className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.01]'
                              : 'bg-white/[0.02] text-neutral-300 border-white/[0.08] hover:border-white/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div>
                            <span className={`block text-xs sm:text-[13px] font-semibold leading-snug ${isSelected ? 'text-black' : 'text-white'}`}>
                              {opt.label}
                            </span>
                            <span className={`block text-[11px] mt-0.5 font-mono ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                              {opt.subtitle}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white shrink-0 mt-0.5 ml-2">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. TACTILE PILLS: Estimated Budget Range */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                      Estimated Budget Range <span className="text-white">*</span>
                    </label>
                    <span className="text-[10.5px] font-mono text-neutral-500">
                      USD / Milestone
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {budgetOptions.map((b) => {
                      const isSelected = formData.budget === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b.id })}
                          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] font-bold'
                              : 'bg-white/[0.02] text-neutral-300 border-white/[0.08] hover:border-white/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className={`text-xs font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {b.label}
                          </span>
                          <span className={`text-[9.5px] font-mono mt-0.5 ${isSelected ? 'text-neutral-700 font-medium' : 'text-neutral-500'}`}>
                            {b.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Email Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 font-semibold">
                      Your Name <span className="text-white">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.09] bg-[#07070A] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-200 focus:border-white/40 focus:bg-[#0B0B0E] focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 font-semibold">
                      Work Email <span className="text-white">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.09] bg-[#07070A] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-200 focus:border-white/40 focus:bg-[#0B0B0E] focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Phone (Optional) */}
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 font-semibold">
                    Phone / WhatsApp <span className="text-neutral-500 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000 or WhatsApp number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.09] bg-[#07070A] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-200 focus:border-white/40 focus:bg-[#0B0B0E] focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] focus:outline-none"
                  />
                </div>

                {/* 5. Project Brief */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2 font-semibold">
                    Tell us about the project <span className="text-white">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Briefly describe what you're looking to build, expected timelines, key technical requirements, or problem to solve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.09] bg-[#07070A] px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 transition-all duration-200 focus:border-white/40 focus:bg-[#0B0B0E] focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Error Alert */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 6. Submit Button & Reassurance */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={status === 'submitting'}
                    className="w-full sm:w-auto !py-3 !px-7 !text-sm font-semibold justify-center"
                  >
                    <span>Submit project scope</span>
                    <Send size={14} className="btn-arrow" />
                  </Button>

                  <span className="text-[11px] font-mono text-neutral-500 text-center sm:text-right">
                    Direct engineer response within 24h. No spam.
                  </span>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
