import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ApplyForm from '@/components/ApplyForm';
import TextReveal from '@/components/TextReveal';
import { Sparkles, Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply to join Orenty product teams, submit a solution to an active Startup Lab challenge, or propose a new venture.',
};

export default function ApplyPage() {
  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-violet-600/15 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 pt-20 pb-28 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
            <Sparkles size={14} />
            <span>ORENTY // BUILDER PORTAL</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            <TextReveal as="span">Application Intake.</TextReveal>
          </h1>
          <p className="mt-4 text-base text-slate-300 font-body leading-relaxed">
            Submit your solution to a Startup Lab challenge, request early engineering access to a product build, or propose a novel venture architecture.
          </p>
        </div>

        {/* Application Form wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="animate-spin text-violet-400" size={32} />
            </div>
          }
        >
          <ApplyForm />
        </Suspense>
      </div>
    </div>
  );
}
