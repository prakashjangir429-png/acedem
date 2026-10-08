import 'server-only';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import type { Metadata } from 'next';
import { pageSchema } from './content-schema';

const directory = path.join(process.cwd(), 'content', 'pages');
export const getPageContent = cache(async (key:string) => {
  if (!/^[a-z0-9-]+$/.test(key)) throw new Error('Invalid content key');
  const raw = await readFile(path.join(directory,`${key}.json`),'utf8');
  try { return pageSchema.parse(JSON.parse(raw.replace(/^\uFEFF/,''))); }
  catch(error) { throw new Error(`Invalid page content: content/pages/${key}.json`,{cause:error}); }
});
export async function pageExists(key:string) {
  if(!/^[a-z0-9-]+$/.test(key)) return false;
  try {await readFile(path.join(directory,`${key}.json`),'utf8');return true;}
  catch(error) {if((error as NodeJS.ErrnoException).code==='ENOENT')return false;throw error;}
}
export async function getContentKeys(prefix='') {
  return (await readdir(directory)).filter(file=>file.endsWith('.json')&&file.startsWith(prefix)).map(file=>file.slice(0,-5));
}
export async function getPageMetadata(key:string):Promise<Metadata> {
  const {metadata}=await getPageContent(key);
  return {title:metadata.title,description:metadata.description,keywords:metadata.keywords,alternates:metadata.canonical?{canonical:metadata.canonical}:undefined,robots:metadata.noIndex?{index:false,follow:false}:undefined,openGraph:{title:metadata.title,description:metadata.description,type:'website'}};
}
