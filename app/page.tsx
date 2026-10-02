'use client';

import Link from 'next/link';
import {
  Sparkles, Globe, Search, Brain, Share2, Target, PenTool, BarChart3,
  Users, Briefcase, Award, BookOpen, ArrowRight, Play, CheckCircle2,
  Star, Quote, Phone, Mail, MapPin, Zap, TrendingUp, Rocket,
} from 'lucide-react';

import {
  BrainCircuit,
  ChartNoAxesCombined,
  GraduationCap,
  Trophy,
  BriefcaseBusiness,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Reveal, Counter } from '@/components/site/reveal';
import { ThreeBackground } from '@/components/site/three-background';
import {
  stats, programs, curriculumModules, practicalLearning, differentiators,
  certifications, testimonials, hiringPartners, recognitions, faqs, tools,
} from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Globe, Search, Brain, Share2, Target, PenTool, BarChart3,
  Users, Briefcase, Award, BookOpen, Zap, TrendingUp, Rocket,
};

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <div className="relative">
        {/* Hero */}
     
<section className="relative isolate min-h-[90vh] overflow-hidden bg-white pt-28 pb-16 dark:bg-[#070d1b] lg:min-h-screen lg:pt-32">

  {/* Background */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-400/15 blur-[120px] dark:bg-sky-500/10" />
    <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-teal-400/15 blur-[130px] dark:bg-teal-500/10" />
    <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-400/10 blur-[120px]" />
    <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
      style={{
        backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  <div className="section-padding relative mx-auto max-w-7xl">
    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

      {/* LEFT CONTENT */}
      <div className="relative z-10 text-center lg:text-left">

        <Reveal>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            <Sparkles className="h-4 w-4" />
            AI-Powered Digital Marketing Academy
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Turn Your
            <span className="block">Passion Into a</span>
            <span className="relative inline-block">
              Digital Career.
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-gradient-to-r from-sky-400/60 to-teal-400/60 blur-[1px]" />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mb-8 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0">
            Master Digital Marketing with AI, real-world projects, live mentorship
            and practical industry experience. Learn the skills companies actually need.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mb-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="group h-14 w-full rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-8 text-base font-bold text-white shadow-xl shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/25 sm:w-auto"
            >
              <Link href="/courses">
                Explore Our Courses
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-xl border-slate-300 bg-white/70 px-7 text-base font-semibold text-slate-700 backdrop-blur transition-all hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:w-auto"
            >
              <Link href="/contact">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Trust indicators */}
        <Reveal delay={400}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400 lg:justify-start">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              Live Projects
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              AI Tools Training
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              Career Support
            </span>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={500}>
          <div className="grid grid-cols-2 gap-5 border-t border-slate-200/80 pt-7 dark:border-slate-800 sm:grid-cols-4 lg:max-w-2xl">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  <span className="text-gradient">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* RIGHT VISUAL */}
      <Reveal delay={250}>
        <div className="relative mx-auto w-full max-w-[580px]">

          {/* Glow behind visual */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-sky-400/30 via-indigo-400/20 to-teal-400/30 blur-[80px]" />

          {/* Main dashboard */}
          <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_100px_-30px_rgba(14,116,144,0.3)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80 sm:p-5">

            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-lg shadow-sky-500/20">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Digital Growth Lab
                  </p>
                  <p className="text-xs text-slate-500">Your learning workspace</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Live
              </span>
            </div>

            {/* Dashboard body */}
            <div className="grid grid-cols-2 gap-3 py-5 sm:gap-4">

              <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[#102c4b] via-[#123d60] to-[#087e83] p-5 text-white sm:p-6">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-sky-100/80">Your Digital Skills</p>
                    <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                      Learn. Create. Grow.
                    </h3>
                  </div>
                  <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
                    <Rocket className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-3xl font-extrabold sm:text-4xl">360°</p>
                    <p className="mt-1 text-xs text-sky-100/80">
                      Practical Learning Experience
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#174d68] bg-white/20 text-xs font-bold text-white"
                      >
                        {["D", "A", "M", "K"][item - 1]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning cards */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                  <ChartNoAxesCombined className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Marketing Analytics</p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Data Driven</p>
                <div className="mt-3 flex h-10 items-end gap-1.5">
                  {[35, 55, 42, 70, 58, 85, 100].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-500 to-teal-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">AI Workflows</p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Future Ready</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-violet-500 to-sky-400" />
                  </div>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">85%</span>
                </div>
              </div>

              {/* Course progress */}
              <div className="col-span-2 rounded-2xl border border-slate-100 p-4 dark:border-slate-700 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Industry-Ready Skills
                    </p>
                    <p className="text-xs text-slate-500">Learn through real-world practice</p>
                  </div>
                  <GraduationCap className="h-6 w-6 text-sky-500" />
                </div>

                <div className="space-y-3">
                  {[
                    { name: "SEO & Content Strategy", width: "90%", color: "from-sky-500 to-cyan-400" },
                    { name: "Social Media Marketing", width: "75%", color: "from-teal-500 to-emerald-400" },
                    { name: "Performance Marketing", width: "82%", color: "from-violet-500 to-indigo-400" },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-xs font-medium">
                        <span className="text-slate-600 dark:text-slate-300">{skill.name}</span>
                        <span className="text-slate-500">{skill.width}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          style={{ width: skill.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-5 top-[22%] hidden animate-float items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Learn by Doing</p>
              <p className="text-[11px] text-slate-500">Real-world projects</p>
            </div>
          </div>

          <div className="absolute -right-3 bottom-[18%] hidden animate-float-delayed items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Career Focused</p>
              <p className="text-[11px] text-slate-500">Skills that matter</p>
            </div>
          </div>

        </div>
      </Reveal>
    </div>

    {/* Bottom scroll cue */}
    <div className="mt-14 flex justify-center lg:mt-8">
      <a
        href="#courses"
        aria-label="Scroll to courses"
        className="group flex flex-col items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-sky-500"
      >
        Explore what you can learn
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-slate-300 p-1.5 dark:border-slate-600">
          <span className="h-2 w-1 rounded-full bg-sky-500 animate-bounce" />
        </span>
      </a>
    </div>
  </div>
</section>


        {/* Live Campaign Workspace Preview */}
        <section className="relative py-24 overflow-hidden">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Live Campaign Workspace
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Learn → Implement → <span className="text-gradient">Analyze</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Practical-first training with AI-integrated modules, live client projects, and placement assistance.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Meta Ads', subtitle: 'Campaign Performance', metrics: ['CTR Up', 'Leads Up'], icon: Share2, color: 'from-blue-500 to-cyan-500' },
                { title: 'Google Ads', subtitle: 'Search Campaign', metrics: ['Conversions Up', 'Quality Up'], icon: Target, color: 'from-emerald-500 to-teal-500' },
                { title: 'GA4 Overview', subtitle: 'Analytics Dashboard', metrics: ['Traffic Up', 'Conversions Up', 'ROAS Up'], icon: BarChart3, color: 'from-orange-500 to-amber-500' },
                { title: 'AI Tools', subtitle: 'AI Workflows', metrics: ['AI Strategy On', 'Content On', 'Research On'], icon: Brain, color: 'from-violet-500 to-purple-500' },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.title} delay={i * 100}>
                    <Card className="card-hover glass overflow-hidden group">
                      <div className={`h-1 bg-gradient-to-r ${card.color}`} />
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} p-3 mb-2 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <CardDescription>{card.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {card.metrics.map((m) => (
                            <li key={m} className="flex items-center gap-2 text-sm">
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                              <span className="text-slate-600 dark:text-slate-300">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flagship Program */}
        <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Flagship Program
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  3 months training. 3 months internship. <span className="text-gradient">Real results.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Our flagship program includes the complete AI and digital marketing curriculum,
                  followed by a 3-month internship on live client work.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  phase: 'Months 1–3',
                  title: 'Intensive practical training',
                  desc: 'Daily hands-on classes: SEO, Google & Meta Ads, content, analytics and AI tools — every module ends with a real assignment.',
                  icon: BookOpen,
                },
                {
                  phase: 'Months 4–6',
                  title: '3-month internship',
                  desc: 'Work on live client accounts with mentor supervision — real budgets, real deadlines, real results for your portfolio.',
                  icon: Briefcase,
                },
                {
                  phase: 'Ongoing',
                  title: 'Placement support',
                  desc: 'Resume, LinkedIn, mock interviews and referrals through our hiring network until you land the role.',
                  icon: Rocket,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 150}>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity" />
                      <Card className="relative glass card-hover">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 p-2.5">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <Badge variant="secondary" className="text-xs">{item.phase}</Badge>
                          </div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Curriculum Preview */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Curriculum Preview
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  What you'll <span className="text-gradient">learn</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  A preview of the 31-module Advanced AI & Digital Marketing Program — practical,
                  AI-integrated and built around real client work.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curriculumModules.map((mod, i) => {
                const Icon = iconMap[mod.icon] || Sparkles;
                return (
                  <Reveal key={mod.title} delay={i * 80}>
                    <Card className="card-hover glass h-full group">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-500/10 p-2.5 mb-2 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 transition-colors">
                          <Icon className="h-5 w-5 text-sky-500" />
                        </div>
                        <CardTitle className="text-base leading-tight">{mod.title}</CardTitle>
                        <CardDescription className="text-xs">{mod.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {mod.items.map((item) => (
                            <li key={item.name} className="text-xs">
                              <div className="font-medium text-slate-700 dark:text-slate-200">{item.name}</div>
                              <div className="text-slate-500 dark:text-slate-400">{item.desc}</div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={200}>
              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline" className="border-sky-300 dark:border-sky-700 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-500/10">
                  <Link href="/curriculum">
                    Explore Full Curriculum
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tools Section */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Industry Tools
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Hands-on with the platforms the <span className="text-gradient">industry runs on</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  You get guided practice inside real dashboards, not slide decks about them.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool, i) => (
                <Reveal key={tool.name} delay={i * 30} animation="scale-in">
                  <div className="glass card-hover rounded-xl px-5 py-4 flex items-center gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                      {tool.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{tool.name}</div>
                      <div className="text-xs text-slate-500">{tool.category}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Learning */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Learn By Doing
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Learn by doing. <span className="text-gradient">Not just by watching.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Theory gives you knowledge. Practice gives you confidence. Learning should translate into action.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal animation="slide-in-left">
                <div className="space-y-4">
                  {[
                    'Core marketing & AI fundamentals',
                    'Hands-on guided laboratory tasks',
                    'Live web assets & ad campaigns',
                    'Read actual performance data',
                    'A/B testing & ROI optimization',
                    'Real-world portfolio execution',
                  ].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0 group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal animation="slide-in-right" delay={100}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Practical learning scenarios</CardTitle>
                    <CardDescription>Examples of what you'll experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {practicalLearning.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-600 dark:text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Why Choose Us
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  What makes our training <span className="text-gradient">different</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((item, i) => {
                const Icon = iconMap[item.icon] || Sparkles;
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <Card className="card-hover glass h-full group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/10 to-teal-500/10 dark:from-sky-500/20 dark:to-teal-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-sky-500" />
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Certifications
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Certificates that prove what you can <span className="text-gradient">actually do</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Every learner earns a Digitonix Academy Certificate of Achievement, plus module-wise
                  certificates — and guidance towards official industry certifications.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <Reveal key={cert.title} delay={i * 80}>
                  <Card className="card-hover glass h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-6 w-6 text-amber-500" />
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
                      </div>
                      <CardTitle className="text-base">{cert.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{cert.desc}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Partners */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Hiring Partners
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Companies our learners <span className="text-gradient">connect with</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  A snapshot of the verified companies in our hiring and internship network.
                </p>
              </div>
            </Reveal>

            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-6 w-max">
                {[...hiringPartners, ...hiringPartners].map((partner, i) => (
                  <div
                    key={`${partner}-${i}`}
                    className="glass rounded-xl px-8 py-6 flex items-center justify-center min-w-[200px] card-hover"
                  >
                    <span className="font-display text-lg font-semibold text-slate-700 dark:text-slate-200">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20">
                  Recognition
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Recognised for the standard of our <span className="text-gradient">training</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {recognitions.map((rec, i) => (
                <Reveal key={rec.title} delay={i * 100}>
                  <Card className="card-hover glass text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 mx-auto mb-3 flex items-center justify-center">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-500">{rec.org}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Student Reviews
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  What our students <span className="text-gradient">actually say</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Real experiences shared by Digitonix Academy learners.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <Card className="card-hover glass h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-sky-200 dark:text-sky-500/30 mb-2" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                        {t.text}
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
                          {t.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{t.name}</div>
                          <div className="text-xs text-slate-500">{t.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Business Owners CTA */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <Card className="glass overflow-hidden relative max-w-5xl mx-auto">
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
                <CardContent className="relative p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                        Own a business? Stop guessing your <span className="text-gradient">marketing.</span>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">
                        Learn to plan campaigns, control ad spend, generate enquiries and use AI to
                        produce content at speed — so growth stops depending on someone else's dashboard.
                      </p>
                      <Button asChild className="bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0">
                        <Link href="/contact">
                          Talk to a Career Counsellor
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: 'Lower cost per enquiry', icon: TrendingUp },
                        { label: 'In-house content system', icon: PenTool },
                        { label: 'AI-assisted operations', icon: Brain },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 p-2.5">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding max-w-3xl">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  FAQ
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Questions people ask <span className="text-gradient">before joining</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q} className="glass rounded-xl px-6 border-b-0">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-300">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[120px]" />

          <div className="relative section-padding text-center">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Not sure which program <span className="text-gradient">fits you?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                Speak to a Digitonix career counsellor. We'll map your background to the right course,
                batch and career path — no pressure, just clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white border-0 px-8 glow">
                  <Link href="/contact">
                    Request a Call Back
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 dark:border-slate-700">
                  <a href="https://wa.me/917073225806" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
