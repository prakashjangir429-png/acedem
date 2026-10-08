import 'server-only';
import sanitize from 'sanitize-html';
import { z } from 'zod';
import { database } from './database';
export const blogSchema=z.object({title:z.string().trim().min(3).max(200),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200),excerpt:z.string().max(600),content:z.string().max(200000),author:z.string().min(1).max(100),category:z.string().max(80),coverImage:z.union([z.literal(''),z.string().regex(/^\/api\/images\/[a-f0-9]{24}$/),z.string().url().refine(v=>v.startsWith('https://'))]),status:z.enum(['draft','published']),metaTitle:z.string().max(200),metaDescription:z.string().max(320)});
export function cleanHtml(html:string){return sanitize(html,{allowedTags:[...sanitize.defaults.allowedTags,'img','figure','figcaption','h1','h2'],allowedAttributes:{a:['href','title','target','rel'],img:['src','alt','width','height']},allowedSchemes:['https','http','mailto'],allowProtocolRelative:false,transformTags:{a:sanitize.simpleTransform('a',{rel:'noopener noreferrer'})}});}
export async function publishedBlogs(){return (await database()).collection('blogs').find({status:'published'}).sort({publishedAt:-1}).limit(100).toArray();}

