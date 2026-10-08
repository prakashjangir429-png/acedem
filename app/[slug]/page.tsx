import { notFound } from 'next/navigation';
import { getPageContent, getPageMetadata, pageExists } from '@/lib/content';
import { PageRenderer } from '@/components/content/page-renderer';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!await pageExists(slug)) notFound();
  return getPageMetadata(slug);
}
export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  if (!await pageExists(slug)) notFound();
  return <PageRenderer page={await getPageContent(slug)} />;
}
