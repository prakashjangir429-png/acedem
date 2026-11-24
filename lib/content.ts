import 'server-only';
import { cache } from 'react';
import type { Metadata } from 'next';
import { pageSchema } from './content-schema';
import { validateExperience,validateHomeSections } from './experience-schema';
import { managedPageKeys, readManagedPage } from './page-store';

export const getPageContent = cache(async (key:string) => {
  if (!/^[a-z0-9-]+$/.test(key)) throw new Error('Invalid content key');
  const stored = await readManagedPage(key);
  if (!stored) throw new Error(`Page content is missing: ${key}`);
  try { const page=pageSchema.parse(stored.content);validateExperience(key,page.experience);if(key==='home')validateHomeSections(page.sections);return page; }
  catch(error) { throw new Error(`Invalid page content: ${key}`,{cause:error}); }
});
export async function pageExists(key:string) {
  if(!/^[a-z0-9-]+$/.test(key)) return false;
  return (await readManagedPage(key)) !== null;
}
export async function getContentKeys(prefix='') {
  return managedPageKeys(prefix);
}
export async function getPageMetadata(key:string):Promise<Metadata> {
  const {metadata}=await getPageContent(key);
  return {title:metadata.title,description:metadata.description,keywords:metadata.keywords,alternates:metadata.canonical?{canonical:metadata.canonical}:undefined,robots:metadata.noIndex?{index:false,follow:false}:undefined,openGraph:{title:metadata.title,description:metadata.description,type:'website'}};
}
