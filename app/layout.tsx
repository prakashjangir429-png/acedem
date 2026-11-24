import './globals.css';
import '@/components/brand/logo.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { SiteFrame } from '@/components/site/site-frame';
import { getPageContent } from '@/lib/content';
import type { SiteSettings } from '@/lib/site-settings';

const inter = DM_Sans({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = DM_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  icons: { icon: '/brand/digitonix-icon.png', apple: '/brand/digitonix-icon.png' },
  title: 'Digitonix Academy — AI & Digital Marketing Training with Internship',
  description:
    'Build practical digital marketing skills through hands-on training, live projects, industry tools, AI-powered workflows and internship experience. 3 months training + 3 months internship.',
  keywords: [
    'digital marketing course',
    'AI marketing training',
    'digital marketing institute',
    'SEO training',
    'Google Ads training',
    'Meta Ads training',
    'digital marketing internship',
  ],
  openGraph: {
    title: 'Digitonix Academy — AI & Digital Marketing Training',
    description:
      'Learn Digital Marketing. Master AI. Build Real-World Skills. Practical training with live projects and internship.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsPage,coursesPage] = await Promise.all([getPageContent('site-settings'),getPageContent('courses')]);
  if (!settingsPage.experience) throw new Error('Site settings content is missing');
  const settings = settingsPage.experience as SiteSettings;
  const programs = coursesPage.sections.find(section=>section.id==='programs'&&section.type==='cards');
  settings.programLinks=programs?.type==='cards'?programs.items.filter(item=>item.href).map(item=>({title:item.title,description:item.description||'',href:item.href!})):[];
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <SiteFrame settings={settings}>{children}</SiteFrame>
      </body>
    </html>
  );
}
