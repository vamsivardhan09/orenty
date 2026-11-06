'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-bg-elevated text-text-2 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand Info & Story */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block" aria-label="Orenty Home">
              <div className="relative h-8 w-32">
                <Image
                  src="/brand/orenty-logo-white.svg"
                  alt="Orenty Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 font-body text-base text-text font-normal leading-relaxed max-w-sm">
              {siteContent.footer.description}
            </p>
            <p className="mt-4 text-sm text-text-3 font-body">
              The single destination for business software engineering, proprietary product incubation, and founder equity for builders.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-2">
            <h4 className="eyebrow-label text-text font-semibold mb-4 text-xs">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {siteContent.services.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white flex items-center justify-between group"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow-label text-text font-semibold mb-4 text-xs">
              Products
            </h4>
            <ul className="space-y-3 text-sm">
              {siteContent.productsSection.items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="transition-colors hover:text-white flex items-center justify-between group"
                  >
                    <span>{p.name}</span>
                    <span className="text-[11px] font-mono text-text-3">
                      {p.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Startup Lab & Contact */}
          <div className="lg:col-span-2">
            <h4 className="eyebrow-label text-text font-semibold mb-4 text-xs">
              Company
            </h4>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link
                  href="/lab"
                  className="transition-colors hover:text-warm flex items-center justify-between group"
                >
                  <span className="text-warm">Startup Lab</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm" />
                </Link>
              </li>
              <li>
                <Link
                  href="/software#contact"
                  className="transition-colors hover:text-white"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>

            <h4 className="eyebrow-label text-text-3 font-semibold mb-2 text-xs">
              Direct Contact
            </h4>
            <a
              href={`mailto:${siteContent.footer.contactEmail}`}
              className="text-xs font-mono text-secondary hover:text-white transition-colors block break-all"
            >
              {siteContent.footer.contactEmail}
            </a>

            <div className="mt-5 flex items-center gap-4">
              {siteContent.footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-text-3 hover:text-text transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-surface-border pt-8 text-sm text-text-3 gap-4">
          <p>© {new Date().getFullYear()} Orenty (orenty.in). All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs font-mono">
            <span>TERMS SET PER CHALLENGE</span>
            <span className="text-secondary">SYSTEM LIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
