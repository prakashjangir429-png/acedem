import 'server-only';
import sanitize from 'sanitize-html';
import { z } from 'zod';
import { readRecords, type BlogRecord } from './json-store';
export const blogSchema=z.object({title:z.string().trim().min(3).max(200),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200),excerpt:z.string().max(600),content:z.string().max(200000),author:z.string().min(1).max(100),category:z.string().max(80),coverImage:z.union([z.literal(''),z.string().regex(/^\/api\/images\/[a-f0-9]{24}$/),z.string().url().refine(v=>v.startsWith('https://'))]),status:z.enum(['draft','published']),metaTitle:z.string().max(200),metaDescription:z.string().max(320),keywords:z.preprocess(value=>typeof value==='string'?value.split(',').map(word=>word.trim()).filter(Boolean):value,z.array(z.string().max(100)).max(30)).default([])});
export function cleanHtml(html:string){return sanitize(html,{allowedTags:[...sanitize.defaults.allowedTags,'img','figure','figcaption','h1','h2'],allowedAttributes:{a:['href','title','target','rel'],img:['src','alt','width','height']},allowedSchemes:['https','http','mailto'],allowProtocolRelative:false,transformTags:{a:sanitize.simpleTransform('a',{rel:'noopener noreferrer'})}});}
export async function publishedBlogs(){return (await readRecords<BlogRecord>('blogs')).filter(post=>post.status==='published').sort((a,b)=>new Date(b.publishedAt||b.createdAt).getTime()-new Date(a.publishedAt||a.createdAt).getTime()).slice(0,100);}
export async function findPublishedBlog(slug:string){return (await readRecords<BlogRecord>('blogs')).find(post=>post.slug===slug&&post.status==='published')||null;}

