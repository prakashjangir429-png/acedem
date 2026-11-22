import { getPageContent, getPageMetadata } from '@/lib/content';
import { EditorialExperience } from '@/components/content/editorial-experience';

export async function generateMetadata() {
  return getPageMetadata('services');
}

export default async function ServicesPage() {
  return <EditorialExperience page={await getPageContent('services')} kind="services" />;
}
