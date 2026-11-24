import { getPageContent, getPageMetadata } from '@/lib/content';
export const dynamic = 'force-dynamic';
import { EditorialExperience } from '@/components/content/editorial-experience';

export async function generateMetadata() {
  return getPageMetadata('services');
}

export default async function ServicesPage() {
  return <EditorialExperience page={await getPageContent('services')} kind="services" />;
}
