
'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  GraduationCap,
  Phone,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import MegaMenu from './megaMenu';

const MobileMenuScene = dynamic(
  () => import('./mobileMenu'),
  { ssr: false }
);


const navLinks = [
  { href: '/', label: 'Home', number: '01' },
  { href: '/courses', label: 'Courses', number: '02' },
  { href: '/services', label: 'Services', number: '03' },
  { href: '/resources', label: 'Resources', number: '04' },
  { href: '/blogs', label: 'Blogs', number: '05' },
  { href: '/career', label: 'Career', number: '06' },
  { href: '/contact', label: 'Contact', number: '07' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] =
    useState<'courses' | 'services' | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMegaMenu = (type: "courses" | "services") => {
    clearCloseTimer();
    setActiveMegaMenu(type);
  };

  const scheduleClose = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setActiveMegaMenu(null);
      closeTimer.current = null;
    }, 350);
  };

  const cancelClose = () => {
    clearCloseTimer();
  };


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!activeMegaMenu) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMegaMenu(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeMegaMenu]);


  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div
      className="relative"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}

    >
      {activeMegaMenu && (
        <div
          className="fixed inset-x-0 top-0 z-[90]"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <MegaMenu
            type={activeMegaMenu}
            onClose={() => {
              clearCloseTimer();
              setActiveMegaMenu(null);
            }}
          />
        </div>
      )}

      {/* Navbar */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-all duration-500',
          scrolled
            ? 'bg-white shadow-[0_8px_40px_rgba(15,23,42,0.07)] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="section-padding flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-[102] flex items-center gap-3"
          >
            <div className="relative">
              <div className="relative">
                <Image src={"https://www.digitonix.in/log.png"} className='h-50' alt="Digitonix Academy" width={130} height={50} />
              </div>
            </div>
          </Link>

          {/* <div className="hidden lg:flex items-center gap-px rounded-full border border-white/70 bg-white/65 p-1.5 shadow-sm backdrop-blur-xl">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                    active
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div> */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1.5 shadow-sm backdrop-blur-xl">

            <Link
              href="/"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-700"
            >
              Home
            </Link>

            {(['courses', 'services'] as const).map((item) => (
              <button
                key={item}
                onMouseEnter={() => openMegaMenu(item)}
                onMouseLeave={scheduleClose}
                onClick={() =>
                  setActiveMegaMenu((prev) =>
                    prev === item ? null : item
                  )
                }
                aria-expanded={activeMegaMenu === item}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold capitalize transition-all',
                  activeMegaMenu === item
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                )}
              >
                {item}

                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    activeMegaMenu === item && 'rotate-180'
                  )}
                />
              </button>
            ))}

            <Link href="/resources" className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-sky-50">
              Resources
            </Link>

            <Link href="/blogs" className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-sky-50">
              Blogs
            </Link>

            <Link href="/career" className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-sky-50">
              Career
            </Link>

            <Link href="/contact" className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-sky-50">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+917891757705"
              className="group flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-sky-600"
            >
              <Phone className="h-4 w-4" />
              +91 78917 57705
            </a>

            <Button
              asChild
              className="rounded-full bg-slate-900 px-6 text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:bg-sky-600"
            >
              <Link href="/contact">
                Enroll Now
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={cn(
              'relative z-[102] flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden',
              mobileOpen
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-slate-200 bg-white/80 text-slate-900 shadow-sm'
            )}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <Menu
                className={cn(
                  'absolute h-5 w-5 transition-all duration-300',
                  mobileOpen
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                )}
              />
              <X
                className={cn(
                  'absolute h-5 w-5 transition-all duration-300',
                  mobileOpen
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[99] overflow-hidden bg-[#07111f] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden',
          mobileOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-5 opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Three.js Background */}
        <div className="absolute inset-0">
          {mobileOpen && <MobileMenuScene />}
        </div>

        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.22),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.15),transparent_45%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/40 via-[#07111f]/60 to-[#07111f]" />

        {/* Decorative Circle */}
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full border border-sky-300/10" />
        <div className="absolute -right-20 top-[38%] h-56 w-56 rounded-full border border-teal-300/10" />

        {/* Main Content */}
        <div className="relative flex h-[100dvh] flex-col overflow-y-auto px-6 pb-6 pt-20 sm:px-10">


          {/* Links */}
          <div className="flex flex-col">
            {navLinks.map((link, index) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${180 + index * 90}ms`
                      : '0ms',
                  }}
                  className={cn(
                    'group flex items-center justify-between border-b border-white/10 py-4 transition-all duration-500',
                    mobileOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-sky-300/50">
                      {link.number}
                    </span>

                    <span
                      className={cn(
                        'text-[clamp(1.8rem,8vw,1.25rem)] font-semibold tracking-tight transition-all duration-300',
                        active
                          ? 'text-teal-300'
                          : 'text-white group-hover:translate-x-2 group-hover:text-sky-200'
                      )}
                    >
                      {link.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    className={cn(
                      'h-6 w-6 transition-all duration-300',
                      active
                        ? 'text-teal-300 opacity-100'
                        : 'text-white/30 opacity-0 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              transitionDelay: mobileOpen ? '650ms' : '0ms',
            }}
            className={cn(
              'mt-auto pt-8 transition-all duration-700',
              mobileOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              className="group flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-sky-500 to-teal-400 p-5 text-slate-950 shadow-[0_12px_50px_rgba(14,165,233,0.2)] transition-transform active:scale-[0.98]"
            >
              <div>
                <span className="block text-xs font-semibold uppercase tracking-widest text-slate-900/60">
                  Start your journey
                </span>
                <span className="mt-1 block text-xl font-extrabold">
                  Enroll Now
                </span>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:rotate-45">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <a
                href="tel:+917073225806"
                className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-teal-300" />
                +91 70732 25806
              </a>

              <span className="text-xs text-white/30">
                Learn. Grow. Succeed.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
