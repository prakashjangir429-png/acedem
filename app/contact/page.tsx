'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/site/reveal';
import { ThreeBackground } from '@/components/site/three-background';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', program: '', message: '' });
    }, 4000);
  };

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
                <MessageCircle className="h-3 w-3 mr-1" />
                Get in Touch
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Request a <span className="text-gradient">call back</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Tell us where you are today and we'll guide you to the right program.
                No pressure, just clarity.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-16">
          <div className="section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <Reveal animation="slide-in-left">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                      Not sure which program <span className="text-gradient">fits you?</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                      Speak to a Digitonix career counsellor. We'll map your background to the right
                      course, batch and career path.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: Phone,
                        title: 'Call Us',
                        lines: ['+91 70732 25806', '+91 92512 25806'],
                        href: 'tel:+917073225806',
                      },
                      {
                        icon: Mail,
                        title: 'Email Us',
                        lines: ['info@digitonixacademy.in'],
                        href: 'mailto:info@digitonixacademy.in',
                      },
                      {
                        icon: MapPin,
                        title: 'Visit Us',
                        lines: ['2nd Floor, Pink Hives Building, Plot No. B-2/425,', 'Sector 2, Chitrakoot Scheme, Vaishali Nagar,', 'Jaipur, Rajasthan 302021'],
                      },
                      {
                        icon: Clock,
                        title: 'Hours',
                        lines: ['Mon-Sat: 9AM - 7PM IST'],
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="glass card-hover rounded-2xl p-5 flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                            {item.href ? (
                              <a href={item.href} className="block">
                                {item.lines.map((line) => (
                                  <p key={line} className="text-sm text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-colors">{line}</p>
                                ))}
                              </a>
                            ) : (
                              item.lines.map((line) => (
                                <p key={line} className="text-sm text-slate-600 dark:text-slate-300">{line}</p>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-3">Prefer WhatsApp?</h3>
                    <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 w-full">
                      <a href="https://wa.me/917073225806?text=Hi%20Digitonix%20Academy%2C%20I%20would%20like%20to%20know%20about%20the%20AI%20%26%20Digital%20Marketing%20Program" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Contact Form */}
              <Reveal animation="slide-in-right" delay={100}>
                <Card className="glass">
                  <CardContent className="p-8">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-2">Thank you!</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          We've received your request. Our team will contact you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <h3 className="font-display text-xl font-bold mb-2">
                          Tell us about yourself
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                          Our team will contact you within 24 hours.
                        </p>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="you@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              required
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="program">Program of Interest</Label>
                          <select
                            id="program"
                            value={form.program}
                            onChange={(e) => setForm({ ...form, program: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select a program</option>
                            <option value="advanced">Advanced AI & Digital Marketing (Flagship)</option>
                            <option value="professional">Professional AI & Digital Marketing</option>
                            <option value="master">Master AI, Digital Marketing & Creative</option>
                            <option value="diploma">Diploma in AI & Digital Marketing</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell us about your goals..."
                            rows={4}
                          />
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white border-0 glow">
                          Send Request
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="relative py-16">
          <div className="section-padding">
            <Reveal>
              <Card className="glass overflow-hidden">
                <div className="h-80 flex items-center justify-center relative">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-teal-500/5" />
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 mx-auto mb-4 flex items-center justify-center animate-bounce-subtle">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1">Find Us in Jaipur</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      Vaishali Nagar, Jaipur, Rajasthan 302021
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-4 border-sky-300 dark:border-sky-700 text-sky-600">
                      <a href="https://maps.google.com/?q=Vaishali+Nagar+Jaipur" target="_blank" rel="noopener noreferrer">
                        Open in Google Maps
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
