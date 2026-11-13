'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { Menu, X, ArrowRight } from 'lucide-react';

export const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Work', href: '/work' },
  { label: 'Careers', href: '/careers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080A]/85 py-3.5 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo - Crisp White on Dark Obsidian Canvas */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-85"
          aria-label="Orenty Home"
        >
          <div className="relative h-8 w-28 md:h-9 md:w-32">
            <Image
              src="/brand/orenty-logo-white.svg"
              alt="Orenty"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-body text-[15px] font-medium transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary Action: Start a project (Crisp white pill matching reference) */}
        <div className="hidden items-center gap-4 md:flex">
          <Button href="/contact" variant="primary" className="!min-h-[40px] !py-2 !px-5 !text-[14px]">
            <span>Start a project</span>
            <ArrowRight size={14} className="btn-arrow" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-white transition-colors hover:bg-white/[0.1] md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-[70px] bottom-0 z-40 flex flex-col justify-between bg-[#08080A]/95 px-6 pt-6 pb-12 backdrop-blur-2xl md:hidden overflow-y-auto border-t border-white/[0.08]"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-body text-base font-medium transition-all ${
                    isActive
                      ? 'bg-white/[0.08] text-white font-semibold'
                      : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <Button
              href="/contact"
              variant="primary"
              className="w-full justify-center !min-h-[48px]"
            >
              <span>Start a project</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
