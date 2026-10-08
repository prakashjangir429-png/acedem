import { notFound } from 'next/navigation';
import { getPageContent, getPageMetadata, pageExists } from '@/lib/content';
import { PageRenderer } from '@/components/content/page-renderer';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const key = 'curriculum-' + slug;
  if (!await pageExists(key)) notFound();
  return getPageMetadata(key);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const key = 'curriculum-' + slug;
  if (!await pageExists(key)) notFound();
  return <PageRenderer page={await getPageContent(key)} />;
}