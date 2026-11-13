'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#08080A] text-slate-400">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Story */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Orenty Home">
              <div className="relative h-8 w-28 md:w-32">
                <Image
                  src="/brand/orenty-logo-white.svg"
                  alt="Orenty"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 font-body text-[15px] text-slate-400 leading-relaxed max-w-sm">
              We build software for ambitious businesses and launch products of our own.
            </p>
            <p className="mt-4 text-sm text-slate-500 font-body">
              Bengaluru, India · <a href={`mailto:${siteContent.footer.contactEmail}`} className="text-white hover:underline">{siteContent.footer.contactEmail}</a>
            </p>
            <div className="mt-6 flex items-center gap-3">
              {siteContent.footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  {s.label === 'X' ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                    </svg>
                  )}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns Grid: Compact 2-column horizontal grid on mobile, 4-column on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:col-span-8">
            {/* Col 1: Services */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Services
              </h4>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/services#websites" className="transition-colors hover:text-white">
                    Websites & Web Apps
                  </Link>
                </li>
                <li>
                  <Link href="/services#mobile" className="transition-colors hover:text-white">
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link href="/services#ai" className="transition-colors hover:text-white">
                    AI Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services#growth" className="transition-colors hover:text-white">
                    Growth & Strategy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Products */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Products
              </h4>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/products/syncedin" className="transition-colors hover:text-white">
                    SyncedIn
                  </Link>
                </li>
                <li>
                  <Link href="/products/fanbase" className="transition-colors hover:text-white">
                    Fanbase
                  </Link>
                </li>
                <li>
                  <Link href="/products/job-pilot" className="transition-colors hover:text-white">
                    Job Pilot
                  </Link>
                </li>
                <li>
                  <Link href="/products/pujari-ai" className="transition-colors hover:text-white">
                    Pujari.ai
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/about" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="transition-colors hover:text-white">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Startup Lab */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Startup Lab
              </h4>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/careers" className="transition-colors hover:text-white">
                    Open Challenges
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="transition-colors hover:text-white">
                    Apply to Build
                  </Link>
                </li>
                <li>
                  <Link href="/careers#ownership" className="transition-colors hover:text-white">
                    Ownership Model
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Orenty. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
