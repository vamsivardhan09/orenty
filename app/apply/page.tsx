import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply | Startup Lab Challenges',
  description:
    'Submit your solution to active Startup Lab challenges at Orenty.',
};

export default function ApplyPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-warm/[0.06] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12 py-20 text-center">
        <span className="text-xs uppercase tracking-wider text-warm font-semibold block mb-3">
          STARTUP LAB SUBMISSIONS
        </span>
        <h1 className="h1-hero text-text mb-6">
          Submit your challenge solution.
        </h1>
        <p className="sub-paragraph text-text-2 mb-10 max-w-xl mx-auto">
          Applications are submitted directly through each active challenge page. Explore the open challenges, review the problem statements, and submit your code.
        </p>
        <div className="flex justify-center">
          <Button href="/careers#challenges" variant="primary">
            <span>View open challenges</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>
      </div>
    </div>
  );
}
