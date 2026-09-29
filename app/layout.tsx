import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
