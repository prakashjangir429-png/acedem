import { getPageContent, getPageMetadata } from '@/lib/content';
import { CourseExperience } from '@/components/content/course-experience';

export const dynamic = 'force-dynamic';
export function generateMetadata() { return getPageMetadata('courses'); }
export default async function Page() {
  return <CourseExperience page={await getPageContent('courses')} />;
}