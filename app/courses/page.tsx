'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Clock, GraduationCap, Briefcase, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/site/reveal';
import { ThreeBackground } from '@/components/site/three-background';
import { programs, curriculumModules } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
};

export default function CoursesPage() {
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
                <GraduationCap className="h-3 w-3 mr-1" />
                Our Programs
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Choose the program that <span className="text-gradient">matches your goal</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Choose from four practical, AI-integrated programs designed for job readiness,
                stronger communication and complete creative capability.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Programs */}
        <section className="relative py-16">
          <div className="section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {programs.map((program, i) => (
                <Reveal key={program.name} delay={i * 100}>
                  <Card className={`card-hover h-full relative overflow-hidden ${program.highlight ? 'glass glow' : 'glass'}`}>
                    {program.highlight && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={program.highlight ? 'default' : 'secondary'} className={program.highlight ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0' : ''}>
                          {program.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{program.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-sky-500" />
                        {program.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{program.description}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className="text-xs border-sky-200 dark:border-sky-700 text-sky-600 dark:text-sky-400">
                          {program.badge}
                        </Badge>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className={`w-full ${program.highlight ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0' : ''}`}>
                        <Link href="/contact">
                          Enroll in this Program
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Preview */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
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
              {curriculumModules.slice(0, 3).map((mod, i) => (
                <Reveal key={mod.title} delay={i * 100}>
                  <Card className="card-hover glass h-full">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit text-xs mb-2">{mod.category}</Badge>
                      <CardTitle className="text-base leading-tight">{mod.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mod.items.map((item) => (
                          <li key={item.name} className="text-xs">
                            <div className="font-medium text-slate-700 dark:text-slate-200">{item.name}</div>
                            <div className="text-slate-500">{item.desc}</div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
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

        {/* CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative section-padding text-center">
            <Reveal>
              <div className="max-w-2xl mx-auto">
                <Briefcase className="h-12 w-12 text-sky-500 mx-auto mb-4" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Want the full curriculum PDF and <span className="text-gradient">fee structure?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Speak to a Digitonix career counsellor. We'll map your background to the right course,
                  batch and career path — no pressure, just clarity.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0 px-8 glow">
                  <Link href="/contact">
                    Get Curriculum & Fee Details
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
