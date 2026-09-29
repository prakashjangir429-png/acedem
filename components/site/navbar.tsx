'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/career', label: 'Student Success' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass shadow-lg py-2'
          : 'bg-transparent py-4'
      )}
    >
      <nav className="section-padding flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-teal-400 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-gradient-to-br from-sky-500 to-teal-500 p-2 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Digitonix<span className="text-gradient">Academy</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group',
                pathname === link.href
                  ? 'text-sky-600'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
              )}
              <span className="absolute inset-0 bg-sky-50 dark:bg-sky-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+917073225806" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors">
            <Phone className="h-4 w-4" />
            +91 70732 25806
          </a>
          <Button asChild className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white border-0">
            <Link href="/contact">Enroll Now</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 animate-fade-in-up">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/10'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Enroll Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
