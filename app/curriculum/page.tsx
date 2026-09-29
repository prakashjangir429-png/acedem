'use client';

import Link from 'next/link';
import {
  Sparkles, Globe, Search, Brain, Share2, Target, PenTool, BarChart3,
  ArrowRight, BookOpen, CheckCircle2, Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/site/reveal';
import { ThreeBackground } from '@/components/site/three-background';
import { curriculumModules, practicalLearning, tools } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Globe, Search, Brain, Share2, Target, PenTool, BarChart3,
};

export default function CurriculumPage() {
  return (
    <>
      <ThreeBackground />
      <div className="relative">
        {/* Hero */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="relative section-padding text-center">
            <Reveal>
              <Badge className="mb-6 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                <BookOpen className="h-3 w-3 mr-1" />
                Complete Curriculum
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                31 modules. 40+ tools. <span className="text-gradient">Zero fluff.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                The complete Advanced AI & Digital Marketing Program curriculum — practical,
                AI-integrated and built around real client work.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Modules */}
        <section className="relative py-16">
          <div className="section-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curriculumModules.map((mod, i) => {
                const Icon = iconMap[mod.icon] || Sparkles;
                return (
                  <Reveal key={mod.title} delay={i * 80}>
                    <Card className="card-hover glass h-full group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500/10 to-teal-500/10 dark:from-sky-500/20 dark:to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-5 w-5 text-sky-500" />
                          </div>
                          <Badge variant="secondary" className="text-xs">{mod.category}</Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">{mod.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {mod.items.map((item) => (
                            <li key={item.name} className="border-l-2 border-sky-200 dark:border-sky-700 pl-3">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
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

        {/* Practical Learning */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Practical Learning
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Learn by doing. <span className="text-gradient">Not just by watching.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Theory gives you knowledge. Practice gives you confidence. At Digitonix Academy,
                  learning translates into action.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {practicalLearning.map((item, i) => (
                <Reveal key={item} delay={i * 50} animation="scale-in">
                  <div className="glass card-hover rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Industry Tools
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Hands-on with <span className="text-gradient">40+ platforms</span>
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

        {/* CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative section-padding text-center">
            <Reveal>
              <div className="max-w-2xl mx-auto">
                <Download className="h-12 w-12 text-sky-500 mx-auto mb-4" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Want to explore the <span className="text-gradient">complete curriculum?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Get access to the complete 31-module Advanced AI & Digital Marketing Program curriculum
                  with detailed module breakdowns, practical learning areas and tools.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0 px-8 glow">
                  <Link href="/contact">
                    Get Full Curriculum PDF
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
