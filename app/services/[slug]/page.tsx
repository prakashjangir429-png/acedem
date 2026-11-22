import { notFound } from 'next/navigation';
import { getPageContent, getPageMetadata, pageExists } from '@/lib/content';
import { EditorialExperience } from '@/components/content/editorial-experience';

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!['web-development','ui-ux','digital-marketing'].includes(slug) || !await pageExists(`service-${slug}`)) notFound();
  return getPageMetadata(`service-${slug}`);
}
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!['web-development','ui-ux','digital-marketing'].includes(slug) || !await pageExists(`service-${slug}`)) notFound();
  return <EditorialExperience page={await getPageContent(`service-${slug}`)} kind={slug as 'web-development'|'ui-ux'|'digital-marketing'} />;
}
