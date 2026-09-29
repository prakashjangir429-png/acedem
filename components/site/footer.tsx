import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[120px]" />

      <div className="relative section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Digitonix<span className="text-gradient-light">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium AI & Digital Marketing Institute in India. 100% practical training,
              AI-integrated curriculum and placement assistance — built for careers and business growth.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <div
                  key={social}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 transition-colors flex items-center justify-center cursor-pointer"
                  title={social}
                >
                  <span className="text-xs font-bold text-slate-300">{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Courses', href: '/courses' },
                { label: 'Curriculum', href: '/curriculum' },
                { label: 'Student Success', href: '/career' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              {[
                'Advanced AI & Digital Marketing',
                'Professional AI & Digital Marketing',
                'Master AI, Digital Marketing & Creative',
                'Diploma in AI & Digital Marketing',
              ].map((program) => (
                <li key={program} className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer">
                  {program}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Find Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-sky-400 shrink-0" />
                <span>2nd Floor, Pink Hives Building, Plot No. B-2/425, Sector 2, Chitrakoot Scheme, Vaishali Nagar, Jaipur, Rajasthan 302021</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="tel:+917073225806" className="hover:text-sky-400 transition-colors">+91 70732 25806</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="mailto:info@digitonixacademy.in" className="hover:text-sky-400 transition-colors">info@digitonixacademy.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Digitonix Academy. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Vaishali Nagar, Jaipur · Training learners across India
          </p>
        </div>
      </div>
    </footer>
  );
}
