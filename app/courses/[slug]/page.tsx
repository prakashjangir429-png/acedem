import { notFound } from 'next/navigation';
import { getPageContent, getPageMetadata, pageExists } from '@/lib/content';
import { CourseExperience } from '@/components/content/course-experience';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const key = 'course-' + slug;
  if (!await pageExists(key)) notFound();
  return getPageMetadata(key);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const key = 'course-' + slug;
  if (!await pageExists(key)) notFound();
  return <CourseExperience page={await getPageContent(key)} slug={slug} />;
}