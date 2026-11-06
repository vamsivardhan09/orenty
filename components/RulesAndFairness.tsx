'use client';

import React from 'react';
import { ShieldCheck, Scale, FileText, AlertTriangle } from 'lucide-react';

const rules = [
  {
    title: 'Who can apply?',
    content:
      'The Startup Lab is open to developers, product designers, AI engineers, and growth builders anywhere in the world. There are no educational or credential requirements — only the quality of your thinking and execution.',
  },
  {
    title: 'How are solutions evaluated?',
    content:
      'Submissions are benchmarked on functional completeness, code structure, interface clarity, and architectural scalability. We prioritize clean, robust solutions over superficial prototypes.',
  },
  {
    title: 'How is ownership & equity decided?',
    content:
      'The best contributors may earn ownership in the product they help build. Terms, milestone scopes, and equity allocations are defined specifically per challenge and documented in contributor agreements [CONFIRM — have a lawyer review before publishing]. We never guarantee arbitrary equity figures.',
  },
  {
    title: 'Intellectual Property (IP) Rights',
    content:
      'Your submission remains your intellectual property until a formal contributor agreement is signed by both parties with mutually agreed compensation or equity terms [CONFIRM — have a lawyer review before publishing]. We never use unaccepted submission code in production.',
  },
  {
    title: 'Review timelines & decisions',
    content:
      'All submissions are reviewed within 7 to 10 business days after the challenge deadline [CONFIRM]. Shortlisted contributors are invited to a technical interview and architecture review.',
  },
  {
    title: 'What happens to non-winning submissions?',
    content:
      'If your submission is not selected for that challenge milestone, you retain 100% of your rights and code. You are welcome to submit to other active challenges or propose new directions.',
  },
];

export default function RulesAndFairness() {
  return (
    <div id="rules" className="w-full">
      <div className="rounded-card border border-border bg-surface-2 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-warm/10 text-warm flex items-center justify-center border border-warm/30">
            <Scale size={20} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-warm font-semibold block">
              TRANSPARENCY & LEGAL HYGIENE
            </span>
            <h2 className="h3-card text-text">
              Rules & Fairness Policy
            </h2>
          </div>
        </div>

        {/* Lawyer Review Notice */}
        <div className="inline-flex items-center gap-2 rounded-md border border-warm/30 bg-warm/10 px-4 py-2.5 text-xs text-warm mb-8">
          <AlertTriangle size={15} className="shrink-0" />
          <span>[CONFIRM — Have a qualified legal counsel review before publishing live terms]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((rule, idx) => (
            <div key={idx} className="border-t border-border/60 pt-5">
              <h3 className="text-base font-semibold text-text mb-2">
                {rule.title}
              </h3>
              <p className="text-sm text-text-2 leading-relaxed font-normal">
                {rule.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
