
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { X, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

const MegaMenuScene = dynamic(
  () => import('./megaMenuAnimation'),
  { ssr: false }
);

type MenuType = 'courses' | 'services';

interface MegaMenuProps {
  type: MenuType;
  onClose: () => void;
}

const menuData = {
  courses: {
    eyebrow: 'LEARN WITHOUT LIMITS',
    title: <>Build skills.<br />Shape your future.</>,
    description:
      'Explore structured learning programs designed to help you move forward with confidence.',
    items: [
      {
        title: 'Web Development',
        description: 'Master frontend, backend and full-stack development.',
        href: '/courses/web-development',
        number: '01',
        tag: 'Development',
      },
      {
        title: 'UI / UX Design',
        description: 'Create beautiful digital products and experiences.',
        href: '/courses/ui-ux',
        number: '02',
        tag: 'Design',
      },
      {
        title: 'Digital Marketing',
        description: 'Learn modern growth and digital marketing strategies.',
        href: '/courses/digital-marketing',
        number: '03',
        tag: 'Marketing',
      },
      {
        title: 'Explore All Courses',
        description: 'Find the right learning path for your goals.',
        href: '/courses',
        number: '04',
        tag: 'All Programs',
      },
    ],
  },

  services: {
    eyebrow: 'WHAT WE DO',
    title: <>Ideas into<br />real impact.</>,
    description:
      'From digital transformation to creative execution, discover how we help businesses grow.',
    items: [
      {
        title: 'Web Development',
        description: 'Scalable websites and modern web applications.',
        href: '/services/web-development',
        number: '01',
        tag: 'Technology',
      },
      {
        title: 'UI / UX Design',
        description: 'Thoughtful interfaces with exceptional usability.',
        href: '/services/ui-ux',
        number: '02',
        tag: 'Creative',
      },
      {
        title: 'Digital Marketing',
        description: 'Performance-focused strategies for online growth.',
        href: '/services/digital-marketing',
        number: '03',
        tag: 'Growth',
      },
      {
        title: 'Explore All Services',
        description: 'Discover our complete range of solutions.',
        href: '/services',
        number: '04',
        tag: 'All Services',
      },
    ],
  },
};

export default function MegaMenu({ type, onClose }: MegaMenuProps) {
  const data = menuData[type];

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#06111f] text-white animate-mega-in">
      {/* Three.js */}
      <MegaMenuScene />

      {/* Ambient background */}
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_10%,rgba(14,165,233,0.22),transparent_40%),radial-gradient(ellipse_at_10%_90%,rgba(20,184,166,0.16),transparent_40%)]" /> */}

      {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#06111f]/50 via-[#06111f]/75 to-[#06111f]/95" /> */}

      {/* Content */}
      <div className="relative min-h-[100dvh] px-5 pb-10 pt-28">

        {/* Header */}
        <div className="mx-auto flex max-w-7xl px-4 items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-teal-300">
            {data.eyebrow}
          </div>

          <button
            onClick={onClose}
            aria-label="Close mega menu"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-xl transition-all hover:rotate-90 hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Layout */}
        <div className="mx-auto mt-12 grid max-w-7xl px-4 gap-12 lg:mt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* Left Content */}
          <div className="animate-mega-left">
            <h2 className="max-w-xl whitespace-normal text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
              {data.title}
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400 sm:text-lg">
              {data.description}
            </p>

            <Link
              href={type === 'courses' ? '/courses' : '/services'}
              onClick={onClose}
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-teal-300"
            >
              Discover everything
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-300/30 transition-all group-hover:translate-x-1 group-hover:bg-teal-300 group-hover:text-slate-950">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Right Cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {data.items.map((item, index) => (
              <Link
                key={item.number}
                href={item.href}
                onClick={onClose}
                style={{
                  animationDelay: `${150 + index * 100}ms`,
                }}
                className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 opacity-0 backdrop-blur-xl transition-all duration-500 animate-mega-card hover:-translate-y-1 hover:border-teal-300/40 hover:bg-white/[0.09] hover:shadow-[0_15px_50px_rgba(14,165,233,0.10)] sm:p-4"
              >
                {/* Hover glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition-all duration-500 group-hover:bg-teal-300/25" />

                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-medium text-sky-300/60">
                    {item.number}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {item.tag}
                  </span>
                </div>

                <div className="relative mt-3">
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-teal-300">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="relative mt-3 flex justify-end">
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mx-auto mt-12 flex max-w-7xl px-4 flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-3">
          <span className="text-xs text-slate-500">
            Digitonix Academy
          </span>

          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-teal-300"
          >
            Let's talk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
