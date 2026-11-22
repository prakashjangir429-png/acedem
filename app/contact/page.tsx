import { getPageContent, getPageMetadata } from '@/lib/content';
import { EditorialExperience } from '@/components/content/editorial-experience';

export const dynamic = 'force-dynamic';
export function generateMetadata() { return getPageMetadata('contact'); }
export default async function Page() {
  return <EditorialExperience page={await getPageContent('contact')} kind="contact" />;
}