import { getPageContent, getPageMetadata } from '@/lib/content';
import { PageRenderer } from '@/components/content/page-renderer';

export const dynamic = 'force-dynamic';
export function generateMetadata() { return getPageMetadata('contact'); }
export default async function Page() {
  return <PageRenderer page={await getPageContent('contact')} />;
}