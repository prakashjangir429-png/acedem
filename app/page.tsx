import { ReferenceHome } from '@/components/site/reference-home';
import { getPageContent, getPageMetadata } from '@/lib/content';

export function generateMetadata() { return getPageMetadata('home'); }
export default async function Page() {
  const page = await getPageContent('contact');
  const contact = page.sections.find(section => section.type === 'contact');
  if (!contact || contact.type !== 'contact') throw new Error('Contact form content is missing');
  return <ReferenceHome enquiry={contact.form} />;
}
