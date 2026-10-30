import { ReferenceHome } from '@/components/site/reference-home';
import { getPageMetadata } from '@/lib/content';

export function generateMetadata() { return getPageMetadata('home'); }
export default function Page() { return <ReferenceHome />; }
