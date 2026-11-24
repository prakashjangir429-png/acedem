import { ReferenceHome } from '@/components/site/reference-home';
export const dynamic = 'force-dynamic';
import { getPageContent, getPageMetadata } from '@/lib/content';

export function generateMetadata() { return getPageMetadata('home'); }
export default async function Page() {
  const [home, page] = await Promise.all([getPageContent('home'),getPageContent('contact')]);
  if (home.sections.filter(section=>section.type==='home-block').length!==13) throw new Error('Home page sections are incomplete');
  const contact = page.sections.find(section => section.type === 'contact');
  if (!contact || contact.type !== 'contact') throw new Error('Contact form content is missing');
  return <ReferenceHome enquiry={contact.form} page={home} />;
}
