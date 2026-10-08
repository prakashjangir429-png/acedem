'use client';

import Link from 'next/link';
import { ArrowRight, Brain, CheckCircle2, GraduationCap, Phone, Rocket, TrendingUp } from 'lucide-react';
import { stats } from '@/lib/data';
import { Reveal, Counter } from './reveal';

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="academy-hero relative isolate overflow-hidden pb-12 pt-32 text-[#0f2a6b] lg:pb-16 lg:pt-40">
      <div aria-hidden="true" className="academy-hero-grid absolute inset-0 -z-10" />
      <div className="section-padding relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex rounded-full border border-[#0f2a6b]/5 bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] shadow-sm sm:text-xs">
                AI-Powered Digital Marketing Academy
              </span>
              <h1 id="hero-heading" className="mb-6 mt-7 text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-[1.15] tracking-tight">
                <span className="text-[#e8a020] underline decoration-2 underline-offset-8">Turn Your Passion</span>{' '}
                Into a Digital Career.
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#4b5670] sm:text-lg">
                Master Digital Marketing with AI, real-world projects, live mentorship
                and practical industry experience. Learn the skills companies actually need.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/courses" className="academy-hero-primary inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2952cc]/20 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a3fa0]">
                  Explore Our Courses <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#0f2a6b]/25 px-7 py-3 text-sm font-semibold transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a3fa0]">
                  <Phone className="h-4 w-4" /> Talk to an Expert
                </Link>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#4b5670] sm:text-sm">
                {['Live Projects', 'AI Tools Training', 'Career Support'].map(label => (
                  <li key={label} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 fill-[#1a3fa0] text-white" />{label}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-lg py-8 sm:px-5">
              <div aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-[#e8a020]/30" />
              <div className="relative rounded-[2rem] border border-white bg-white/90 p-6 shadow-[0_24px_80px_-24px_rgba(15,42,107,0.25)] sm:p-8">
                <div className="flex items-center gap-3 border-b border-[#0f2a6b]/10 pb-5">
                  <span className="academy-hero-primary rounded-2xl p-3 text-white"><GraduationCap className="h-6 w-6" /></span>
                  <div><p className="font-semibold">Digitonix Academy</p><p className="mt-1 text-xs text-[#4b5670]">Your next chapter starts here</p></div>
                </div>
                <div className="academy-hero-primary my-5 rounded-2xl p-6 text-white">
                  <Rocket className="mb-5 h-7 w-7 text-[#f3bd59]" />
                  <p className="text-xs uppercase tracking-widest text-white/75">Learn. Create. Grow.</p>
                  <h2 className="mt-2 text-2xl font-semibold">Skills for your<br />digital future.</h2>
                  <p className="mt-4 text-sm leading-6 text-white/80">Practical training + live project experience</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[{icon: TrendingUp, title:'Digital Marketing', detail:'Build real campaigns'}, {icon:Brain, title:'AI Workflows', detail:'Work smarter with AI'}].map(({icon: Icon,title,detail}) => (
                    <div key={title} className="rounded-2xl bg-[#f8f9fc] p-4">
                      <Icon className="mb-3 h-6 w-6 text-[#e8a020]" /><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-[#4b5670]">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#4b5670]"><CheckCircle2 className="h-4 w-4 text-[#1a3fa0]" />Mentorship. Portfolio. Career support.</div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[#0f2a6b]/10 pt-7 sm:grid-cols-4 lg:mt-16">
          {stats.map(stat => <div key={stat.label} className="text-center"><p className="text-3xl font-semibold text-[#1a3fa0]"><Counter value={stat.value} suffix={stat.suffix} /></p><p className="mt-2 text-xs text-[#4b5670] sm:text-sm">{stat.label}</p></div>)}
        </div>
        <a href="#learning-workspace" className="mx-auto mt-9 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0f2a6b]/70 hover:text-[#1a3fa0]">Explore what you can learn <ArrowRight className="h-4 w-4 rotate-90" /></a>
      </div>
    </section>
  );
}
