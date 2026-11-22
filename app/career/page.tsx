import { getPageContent, getPageMetadata } from '@/lib/content';
import { EditorialExperience } from '@/components/content/editorial-experience';

export const dynamic = 'force-dynamic';
export function generateMetadata() { return getPageMetadata('career'); }
export default async function Page() {
  return <EditorialExperience page={await getPageContent('career')} kind="career" />;
}