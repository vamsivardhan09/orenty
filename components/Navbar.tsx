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
          ? 'bg-[#FAFAF8]/90 py-3.5 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo - Crisp Black on Whitish Canvas */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-85"
          aria-label="Orenty Home"
        >
          <div className="relative h-8 w-28 md:h-9 md:w-32">
            <Image
              src="/brand/orenty-logo-black.svg"
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
                className={`relative font-body text-[15px] font-medium transition-colors hover:text-slate-900 ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary Action: Start a project */}
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
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.1] bg-white text-slate-800 transition-colors hover:bg-slate-50 md:hidden"
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
          className="fixed inset-x-0 top-[70px] bottom-0 z-40 flex flex-col justify-between bg-[#FAFAF8]/95 px-6 pt-6 pb-12 backdrop-blur-2xl md:hidden overflow-y-auto border-t border-black/[0.06]"
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
                      ? 'bg-black/[0.05] text-slate-900 font-semibold'
                      : 'text-slate-700 hover:bg-black/[0.03] hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-black/[0.08]">
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
