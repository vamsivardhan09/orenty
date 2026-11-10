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
          ? 'bg-[#07080D]/90 py-3.5 backdrop-blur-xl border-b border-border shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
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
                className={`relative font-body text-[15px] font-medium transition-colors hover:text-text ${
                  isActive ? 'text-text font-semibold' : 'text-text-2'
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
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-md text-text-2 hover:text-text md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-Screen Mobile Glass Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 flex flex-col justify-between bg-[#07080D]/95 p-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-6 pt-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-2xl font-display font-medium transition-colors ${
                    isActive ? 'text-primary-glow font-semibold' : 'text-text'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 pb-8 border-t border-border">
            <Button href="/contact" variant="primary" className="w-full text-center">
              <span>Start a project</span>
              <ArrowRight size={16} className="btn-arrow" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
