import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin,sameOrigin } from '@/lib/admin';
import { blogSchema,cleanHtml } from '@/lib/blogs';
import { adminLeadSchema } from '@/lib/lead-schema';
import { pageSchema } from '@/lib/content-schema';
import { validateExperience,validateHomeSections } from '@/lib/experience-schema';
import { getContentKeys } from '@/lib/content';
import { readManagedPage,saveManagedPage,deleteManagedPage } from '@/lib/page-store';
import { mutateRecords,readRecords,newRecordId,type StoreRecord,type BlogRecord,type LeadRecord } from '@/lib/json-store';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const builtIn=(key:string)=>['home','courses','curriculum','career','contact','services','blogs','site-settings'].includes(key)||/^(course-|curriculum-|service-)/.test(key);
const reserved=['admin','api','blogs','resources','login','favicon','_not-found'];
function fail(error:unknown){const e=error as {message?:string;code?:string;issues?:{path:(string|number)[];message:string}[]};const code=e.message?.startsWith('Persistent storage is not configured')?503:e.message==='CONFLICT'?409:e.message==='NOT_FOUND'||e.code==='ENOENT'?404:e.message==='PROTECTED'?409:e.issues||e.message==='DUPLICATE'||e.message==='Invalid page key'||e.message==='RESERVED'?400:503;return NextResponse.json({error:e.message?.startsWith('Persistent storage is not configured')?e.message:e.message==='CONFLICT'?'This record changed. Reload before saving.':e.message==='NOT_FOUND'||e.code==='ENOENT'?'Record not found.':e.message==='PROTECTED'?'Built-in pages are required by the website. Edit their content instead.':e.message==='DUPLICATE'?'This slug or page key already exists.':e.message==='RESERVED'?'That page key is reserved for an existing website route.':e.issues?e.issues.map(i=>i.path.join('.')+': '+i.message).join('\n'):e.message==='Invalid page key'?'Use a lowercase page key with letters, numbers and hyphens.':'Unable to access persistent JSON storage. Check the private Vercel Blob connection and try again.'},{status:code});}
function paginate<T>(items:T[],url:URL){const size=[10,20,50].includes(Number(url.searchParams.get('pageSize')))?Number(url.searchParams.get('pageSize')):10;const total=items.length;const pages=Math.max(1,Math.ceil(total/size));const page=Math.min(pages,Math.max(1,Math.floor(Number(url.searchParams.get('page'))||1)));return {items:items.slice((page-1)*size,page*size),total,page,pageSize:size,pages};}
export async function GET(request:Request,{params}:{params:Promise<{resource:string}>}){
 if(!await isAdmin())return NextResponse.json({error:'Sign in required'},{status:401});
 try{const {resource}=await params;const url=new URL(request.url);const id=url.searchParams.get('id');const search=(url.searchParams.get('search')||'').trim().toLowerCase();const status=url.searchParams.get('status');
 if(resource==='pages'){
  if(id){const page=await readManagedPage(id);if(!page)throw new Error('NOT_FOUND');return NextResponse.json({content:page.content,revision:page.revision,protected:builtIn(id)});}
  const items=await Promise.all((await getContentKeys()).map(async key=>{const page=await readManagedPage(key);if(!page)throw new Error('NOT_FOUND');return {key,title:page.content.metadata?.title||key,sections:page.content.sections?.length||0,protected:builtIn(key),updatedAt:page.updatedAt};}));return NextResponse.json(paginate(items.filter(item=>`${item.key} ${item.title}`.toLowerCase().includes(search)),url));
 }
 if(resource!=='blogs'&&resource!=='leads')return NextResponse.json({error:'Unknown resource'},{status:404});
 const records=await readRecords<StoreRecord>(resource);if(id){const item=records.find(item=>item._id===id);if(!item)throw new Error('NOT_FOUND');return NextResponse.json({item});}
 const filtered=records.filter(item=>(!status||item.status===status)&&JSON.stringify(item).toLowerCase().includes(search)).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());return NextResponse.json(paginate(filtered,url));
 }catch(error){return fail(error);}
}
export async function POST(request:Request,{params}:{params:Promise<{resource:string}>}){
 if(!await isAdmin())return NextResponse.json({error:'Sign in required'},{status:401});if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin'},{status:403});
 try{const raw=await request.text();if(raw.length>1000000)return NextResponse.json({error:'Content is too large'},{status:413});const body=JSON.parse(raw);const {resource}=await params;
 if(resource==='pages'){
  const content=pageSchema.parse(body.content);validateExperience(body.key,content.experience);if(body.key==='home')validateHomeSections(content.sections);if(body.create&&(reserved.includes(body.key)||builtIn(body.key)))throw new Error('RESERVED');const result=await saveManagedPage(body.key,content,body.revision,Boolean(body.create));revalidatePath('/', 'layout');return NextResponse.json({ok:true,id:body.key,revision:result});
 }
 if(resource==='blogs'){
  const blog=blogSchema.parse(body);const result=await mutateRecords<BlogRecord,{id:string;updatedAt:string}>('blogs',records=>{const previous=body.id?records.find(r=>r._id===body.id):undefined;if(body.id&&!previous)throw new Error('NOT_FOUND');if(body.expectedUpdatedAt&&previous?.updatedAt!==body.expectedUpdatedAt)throw new Error('CONFLICT');if(records.some(r=>r.slug===blog.slug&&r._id!==body.id))throw new Error('DUPLICATE');const now=new Date().toISOString();const values:BlogRecord={...blog,content:cleanHtml(blog.content),_id:previous?._id||newRecordId(),createdAt:previous?.createdAt||now,updatedAt:now,publishedAt:blog.status==='published'?(previous?.publishedAt||now):null};if(previous)records[records.indexOf(previous)]=values;else records.unshift(values);return {id:values._id,updatedAt:now};});return NextResponse.json({ok:true,...result});
 }
 if(resource==='leads'){
  const result=await mutateRecords<LeadRecord,{id:string;updatedAt:string}>('leads',records=>{const previous=body.id?records.find(r=>r._id===body.id):undefined;if(body.id&&!previous)throw new Error('NOT_FOUND');if(body.expectedUpdatedAt&&previous?.updatedAt!==body.expectedUpdatedAt)throw new Error('CONFLICT');const value=adminLeadSchema.parse(previous?{...previous,...body}:body);const now=new Date().toISOString();const item:LeadRecord={...value,_id:previous?._id||newRecordId(),createdAt:previous?.createdAt||now,updatedAt:now};if(previous)records[records.indexOf(previous)]=item;else records.unshift(item);return {id:item._id,updatedAt:now};});return NextResponse.json({ok:true,...result});
 }
 return NextResponse.json({error:'Unknown resource'},{status:404});
 }catch(error){return fail(error);}
}
export async function DELETE(request:Request,{params}:{params:Promise<{resource:string}>}){
 if(!await isAdmin())return NextResponse.json({error:'Sign in required'},{status:401});if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin'},{status:403});
 try{const {resource}=await params;const {id}=await request.json();if(typeof id!=='string')throw new Error('NOT_FOUND');if(resource==='pages'){if(builtIn(id))throw new Error('PROTECTED');await deleteManagedPage(id);}else if(resource==='blogs'||resource==='leads'){await mutateRecords<StoreRecord,void>(resource,records=>{const index=records.findIndex(r=>r._id===id);if(index<0)throw new Error('NOT_FOUND');records.splice(index,1);});}else return NextResponse.json({error:'Unknown resource'},{status:404});revalidatePath('/', 'layout');return NextResponse.json({ok:true});}catch(error){return fail(error);}
}
