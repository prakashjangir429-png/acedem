
import Link from "next/link";
import { courseCatalog } from '@/lib/course-catalog';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Our Courses", href: "/courses" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Student Success", href: "/career" },
  { label: "Our Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const programs = [
  "Advanced AI & Digital Marketing",
  "Professional AI & Digital Marketing",
  "Master AI, Digital Marketing & Creative",
  "Diploma in AI & Digital Marketing",
];

const socialLinks = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
  { name: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="">


        {/* CTA Section */}
        <div className="section-padding">
          <div className="footer-cta group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-[#0c2435] p-7 sm:p-10 lg:p-12">


            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                  Your future starts here
                </div>

                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Ready to build your
                  <span className="ms-2 bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 mt-2 bg-clip-text text-transparent">
                    digital future?
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Learn in-demand skills, work on real projects, and take the
                  next step toward your career with Digitonix Academy.
                </p>
              </div>

              <Link
                href="/contact"
                className="group/btn inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_10px_35px_rgba(56,189,248,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(56,189,248,0.35)]"
              >
                Start Your Journey
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/10 transition-transform duration-300 group-hover/btn:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

            </div>
          </div>
        </div>

        <div className="bg-[#07111f] relative isolate">
          <div className="footer-grid absolute inset-0 opacity-[0.32]" />

          {/* Main Footer */}
          <div className="section-padding pb-10 pt-16 mt-10">

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

              {/* Brand */}
              <div className="footer-reveal space-y-6 lg:col-span-4">

                <Link href="/" className="group inline-flex items-center gap-3">



                  <div>
                    <span className="block font-display text-xl font-extrabold tracking-tight text-white">
                      Digitonix
                    </span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-300">
                      Academy
                    </span>
                  </div>
                </Link>

                <p className="max-w-sm text-sm leading-7 text-slate-400">
                  Premium AI & Digital Marketing Institute in India. 100%
                  practical training, AI-integrated curriculum and placement
                  assistance — built for careers and business growth.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-1">
                  {socialLinks.map(({ name, icon: Icon }) => (
                    <span
                      key={name}
                      title={name}
                      aria-label={name}
                      className="group/social flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-400 hover:text-slate-950 hover:shadow-lg hover:shadow-sky-500/20"
                    >
                      <Icon className="h-[17px] w-[17px] transition-transform duration-300 group-hover/social:scale-110" />
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/10 bg-teal-300/[0.06] px-3 py-2 text-xs font-medium text-teal-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                  </span>
                  Learn. Grow. Succeed.
                </div>
              </div>

              {/* Explore */}
              <div className="footer-reveal lg:col-span-2">
                <h4 className="mb-6 flex items-center gap-2 font-display text-sm font-bold text-white">
                  <span className="h-5 w-1 rounded-full bg-sky-400" />
                  Explore
                </h4>

                <ul className="space-y-3.5">
                  {exploreLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-sky-300"
                      >
                        <span className="h-1 w-1 rounded-full bg-slate-600 transition-all duration-300 group-hover/link:w-3 group-hover/link:bg-sky-400" />
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div className="footer-reveal lg:col-span-3">
                <h4 className="mb-6 flex items-center gap-2 font-display text-sm font-bold text-white">
                  <span className="h-5 w-1 rounded-full bg-teal-400" />
                  Our Programs
                </h4>

                <ul className="space-y-3">
                  {programs.map((program, index) => (
                    <li key={program}>
                      <Link
                        href={`/courses/${courseCatalog[index].slug}`}
                        className="group/program flex items-start gap-3 rounded-xl border border-transparent p-2.5 -ml-2.5 transition-all duration-300 hover:border-white/[0.07] hover:bg-white/[0.04]"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-[10px] font-bold text-sky-300 transition-all duration-300 group-hover/program:bg-sky-400 group-hover/program:text-slate-950">
                          0{index + 1}
                        </span>

                        <span className="text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover/program:text-white">
                          {program}
                        </span>

                        <ArrowUpRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-600 opacity-0 transition-all duration-300 group-hover/program:translate-x-0.5 group-hover/program:text-sky-300 group-hover/program:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-reveal lg:col-span-3">
                <h4 className="mb-6 flex items-center gap-2 font-display text-sm font-bold text-white">
                  <span className="h-5 w-1 rounded-full bg-violet-400" />
                  Get In Touch
                </h4>

                <div className="space-y-4">

                  {/* Address */}
                  <div className="group/contact flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.05]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 transition-all duration-300 group-hover/contact:bg-sky-400 group-hover/contact:text-slate-950">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <div>
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Visit Our Campus
                      </span>
                      <p className="text-xs leading-6 text-slate-400">
                        2nd Floor, Pink Hives Building, Plot No. B-2/425,
                        Sector 2, Chitrakoot Scheme, Vaishali Nagar,
                        Jaipur, Rajasthan 302021
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <a
                    href="tel:+917073225806"
                    className="group/contact flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-teal-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300 transition-all duration-300 group-hover/contact:bg-teal-400 group-hover/contact:text-slate-950">
                      <Phone className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Call Us
                      </span>
                      <span className="text-sm font-medium text-slate-300 transition-colors group-hover/contact:text-white">
                        +91 70732 25806
                      </span>
                    </div>

                    <MoveUpRight className="ml-auto h-4 w-4 text-slate-600 transition-all group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5 group-hover/contact:text-teal-300" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@digitonixacademy.in"
                    className="group/contact flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-violet-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 transition-all duration-300 group-hover/contact:bg-violet-400 group-hover/contact:text-slate-950">
                      <Mail className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Email Us
                      </span>
                      <span className="break-all text-sm font-medium text-slate-300 transition-colors group-hover/contact:text-white">
                        info@digitonixacademy.in
                      </span>
                    </div>

                    <MoveUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition-all group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5 group-hover/contact:text-violet-300" />
                  </a>

                </div>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="mt-14 border-t border-white/[0.08] pt-7">

              <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

                <p className="text-xs leading-6 text-slate-500 sm:text-sm">
                  © {new Date().getFullYear()}{" "}
                  <span className="font-semibold text-slate-300">
                    Digitonix Academy
                  </span>
                  . All rights reserved.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 sm:text-sm">
                  <span>Made for ambitious learners</span>
                  <span className="text-sky-400">✦</span>
                  <span>Jaipur, India</span>
                </div>

                <Link
                  href="/"
                  aria-label="Back to top"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-400 hover:text-slate-950"
                >
                  <ArrowUpRight className="h-4 w-4 rotate-[-45deg] transition-transform duration-300 group-hover:rotate-0" />
                </Link>

              </div>
            </div>

          </div>
        </div>

    </footer>
  );
}
