'use client';

import Link from 'next/link';
import {
  Sparkles, Globe, Search, Brain, Share2, Target, PenTool, BarChart3,
  Users, Briefcase, Award, BookOpen, ArrowRight, Play, CheckCircle2,
  Star, Quote, Phone, Mail, MapPin, Zap, TrendingUp, Rocket,
} from 'lucide-react';
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 dot-pattern opacity-30" />

          <div className="relative section-padding text-center z-10">
            <Reveal>
              <Badge className="mb-6 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20 hover:bg-sky-100">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Digital Marketing Training
              </Badge>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Learn Digital Marketing.
                <br />
                Master <span className="text-gradient">AI</span>. Build Real-World Skills.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                Build practical digital marketing skills through hands-on training, live projects,
                industry tools, AI-powered workflows and internship experience.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white border-0 px-8 glow">
                  <Link href="/courses">
                    View Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 dark:border-slate-700">
                  <Link href="/contact">
                    <Play className="mr-2 h-4 w-4" />
                    Classroom & Online Training
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={500}>
              <p className="text-sm text-slate-400 mt-8">
                Practical Learning • Live Projects • AI Tools • Career Support
              </p>
            </Reveal>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-slate-400" />
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
