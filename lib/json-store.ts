import 'server-only';
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';

export type StoreRecord={_id:string;createdAt:string;updatedAt?:string;[key:string]:unknown};
export type BlogRecord=StoreRecord&{title:string;slug:string;excerpt:string;content:string;author:string;category:string;coverImage:string;status:'draft'|'published';publishedAt:string|null;metaTitle:string;metaDescription:string;keywords:string[]};
export type LeadRecord=StoreRecord&{name:string;email:string;phone:string;program:string;message:string;status:'new'|'contacted'|'qualified'|'closed';sourcePage:string;landingPage:string;currentPage:string;notes?:string};
export type Collection='blogs'|'leads';
const root=path.join(process.cwd(),'.data');
const state=globalThis as typeof globalThis&{academyFileWrites?:Promise<unknown>};
export const newRecordId=()=>randomBytes(12).toString('hex');
export async function readRecords<T extends StoreRecord>(collection:Collection):Promise<T[]>{
 try{const data=JSON.parse(await readFile(path.join(root,collection+'.json'),'utf8'));if(!Array.isArray(data))throw new Error('Invalid JSON collection');return data as T[];}
 catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return [];throw error;}
}
export function mutateRecords<T extends StoreRecord,R>(collection:Collection,operation:(records:T[])=>R|Promise<R>):Promise<R>{
 const task=(state.academyFileWrites||Promise.resolve()).catch(()=>{}).then(async()=>{
  const records=await readRecords<T>(collection);const result=await operation(records);await mkdir(root,{recursive:true});
  const target=path.join(root,collection+'.json');const temp=target+'.'+randomUUID()+'.tmp';
  try{await writeFile(temp,JSON.stringify(records,null,2)+'\n','utf8');await rename(temp,target);}finally{await unlink(temp).catch(()=>{});}return result;
 });state.academyFileWrites=task;return task;
}
export function exclusiveFileWrite<T>(operation:()=>Promise<T>):Promise<T>{const task=(state.academyFileWrites||Promise.resolve()).catch(()=>{}).then(operation);state.academyFileWrites=task;return task;}
export async function saveImage(data:Buffer){const id=newRecordId();const directory=path.join(root,'images');await mkdir(directory,{recursive:true});await writeFile(path.join(directory,id+'.webp'),data,{flag:'wx'});return id;}
export async function readImage(id:string){if(!/^[a-f0-9]{24}$/.test(id))return null;try{return await readFile(path.join(root,'images',id+'.webp'));}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return null;throw error;}}
