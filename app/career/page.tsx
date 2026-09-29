'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Star, Quote, Award, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal, Counter } from '@/components/site/reveal';
import { ThreeBackground } from '@/components/site/three-background';
import { successStories, testimonials, hiringPartners, careerRoles, recognitions } from '@/lib/data';

export default function CareerPage() {
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
                <Users className="h-3 w-3 mr-1" />
                Student Success
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Real learners. <span className="text-gradient">Real experiences.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Hear directly from students learning practical AI and digital marketing skills at Digitonix Academy.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="relative py-12">
          <div className="section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: 500, suffix: '+', label: 'Students Trained' },
                { value: 50, suffix: '+', label: 'Hiring Partners' },
                { value: 95, suffix: '%', label: 'Placement Rate' },
                { value: 14, suffix: '+', label: 'Certifications' },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div className="text-center glass rounded-2xl p-6">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="relative py-16">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Placement Stories
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Skills that moved <span className="text-gradient">careers forward</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Meet Digitonix learners who turned practical training, live projects and mentor
                  guidance into meaningful career opportunities.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, i) => (
                <Reveal key={story.name} delay={i * 80}>
                  <Card className="card-hover glass h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white font-bold">
                          {story.name[0]}
                        </div>
                        <div>
                          <CardTitle className="text-base">{story.name}</CardTitle>
                          <div className="text-xs text-sky-500 font-medium">{story.role}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Quote className="h-5 w-5 text-sky-200 dark:text-sky-500/30 mb-2" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                        {story.quote}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Briefcase className="h-3 w-3" />
                        {story.company}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Career Roles */}
        <section className="relative py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Career Paths
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Roles our learners <span className="text-gradient">get hired for</span>
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-4">
              {careerRoles.map((role, i) => (
                <Reveal key={role} delay={i * 50} animation="scale-in">
                  <div className="glass card-hover rounded-xl px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{role}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Career Support Framework */}
        <section className="relative py-24">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-500/20">
                  Career Support Framework
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Don't just learn the skills. <span className="text-gradient">Prepare to use them.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  We focus on more than course completion. Students leave with practical exposure,
                  stronger portfolios, and career readiness.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: '100% Placement Assistance', desc: 'Career preparation, portfolio development, interview readiness, and referrals through our hiring network.', icon: Briefcase },
                { title: 'Skill Development', desc: 'Practical hands-on coursework with real tools and live projects.', icon: TrendingUp },
                { title: 'Practical Projects', desc: 'Live campaign execution with real budgets and real deadlines.', icon: CheckCircle2 },
                { title: 'Portfolio Building', desc: 'Verifiable project proof that employers can check and trust.', icon: Award },
                { title: 'Resume Preparation', desc: 'ATS and recruiter alignment to get your profile noticed.', icon: Users },
                { title: 'Interview Readiness', desc: 'Technical and mock interviews with feedback until you are confident.', icon: Star },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <Card className="card-hover glass h-full group">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500/10 to-teal-500/10 dark:from-sky-500/20 dark:to-teal-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-sky-500" />
                        </div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
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

        {/* Hiring Partners */}
        <section className="relative py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Hiring Network
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Companies in our <span className="text-gradient">hiring network</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hiringPartners.map((partner, i) => (
                <Reveal key={partner} delay={i * 40} animation="scale-in">
                  <div className="glass card-hover rounded-xl p-6 text-center">
                    <span className="font-display text-base font-semibold text-slate-700 dark:text-slate-200">{partner}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="relative py-16">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20">
                  Recognition
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Recognised for our <span className="text-gradient">training standard</span>
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
        <section className="relative py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="section-padding">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20">
                  Student Reviews
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  What our students <span className="text-gradient">actually say</span>
                </h2>
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
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{t.text}</p>
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

        {/* CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative section-padding text-center">
            <Reveal>
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Ready to write your own <span className="text-gradient">success story?</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Join the next batch and start your journey from learner to professional.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-teal-500 text-white border-0 px-8 glow">
                  <Link href="/contact">
                    Start Your Journey
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
