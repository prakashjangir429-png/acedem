import 'server-only';
import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { BlobPreconditionFailedError } from '@vercel/blob';
import { listBlobPaths, overwriteBlob, readBlob, requireWritableStorage, usesBlobStorage, writeBlob } from './storage-backend';

export type StoreRecord={_id:string;createdAt:string;updatedAt?:string;[key:string]:unknown};
export type BlogRecord=StoreRecord&{title:string;slug:string;excerpt:string;content:string;author:string;category:string;coverImage:string;status:'draft'|'published';publishedAt:string|null;metaTitle:string;metaDescription:string;keywords:string[]};
export type LeadRecord=StoreRecord&{name:string;email:string;phone:string;program:string;message:string;status:'new'|'contacted'|'qualified'|'closed';sourcePage:string;landingPage:string;currentPage:string;notes?:string};
export type Collection='blogs'|'leads';
const root=path.join(process.cwd(),'.data');
const state=globalThis as typeof globalThis&{academyFileWrites?:Promise<unknown>};
const collectionPath=(collection:Collection)=>`academy/collections/${collection}.json`;
const imagePath=(id:string)=>`academy/images/${id}.webp`;
export const newRecordId=()=>randomBytes(12).toString('hex');

async function localRecords<T extends StoreRecord>(collection:Collection):Promise<T[]>{
 try{const data=JSON.parse(await readFile(path.join(root,collection+'.json'),'utf8'));if(!Array.isArray(data))throw new Error('Invalid JSON collection');return data as T[];}
 catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return [];throw error;}
}
export async function readRecords<T extends StoreRecord>(collection:Collection):Promise<T[]>{
 if(usesBlobStorage()){
  const stored=await readBlob(collectionPath(collection));
  if(!stored)return [];
  const data=JSON.parse(stored.data.toString('utf8'));
  if(!Array.isArray(data))throw new Error('Invalid JSON collection');
  return data as T[];
 }
 return localRecords<T>(collection);
}
export function mutateRecords<T extends StoreRecord,R>(collection:Collection,operation:(records:T[])=>R|Promise<R>):Promise<R>{
 requireWritableStorage();
 if(usesBlobStorage())return (async()=>{
  for(let attempt=0;attempt<8;attempt++){
   const current=await readBlob(collectionPath(collection));
   const records=current?JSON.parse(current.data.toString('utf8')) as T[]:[];
   if(!Array.isArray(records))throw new Error('Invalid JSON collection');
   const result=await operation(records);
   try{await writeBlob(collectionPath(collection),JSON.stringify(records,null,2)+'\n',current?.etag);return result;}
   catch(error){if(error instanceof BlobPreconditionFailedError||isAlreadyExists(error))continue;throw error;}
  }
  throw new Error('CONFLICT');
 })();
 const task=(state.academyFileWrites||Promise.resolve()).catch(()=>{}).then(async()=>{
  const records=await localRecords<T>(collection);const result=await operation(records);await mkdir(root,{recursive:true});
  const target=path.join(root,collection+'.json');const temp=target+'.'+randomUUID()+'.tmp';
  try{await writeFile(temp,JSON.stringify(records,null,2)+'\n','utf8');await rename(temp,target);}finally{await unlink(temp).catch(()=>{});}return result;
 });state.academyFileWrites=task;return task;
}
function isAlreadyExists(error:unknown){return error instanceof Error&&(/already exists/i.test(error.message)||error.name==='BlobAlreadyExistsError');}
export function exclusiveFileWrite<T>(operation:()=>Promise<T>):Promise<T>{requireWritableStorage();const task=(state.academyFileWrites||Promise.resolve()).catch(()=>{}).then(operation);state.academyFileWrites=task;return task;}
export async function saveImage(data:Buffer){requireWritableStorage();const id=newRecordId();if(usesBlobStorage()){await writeBlob(imagePath(id),data);return id;}const directory=path.join(root,'images');await mkdir(directory,{recursive:true});await writeFile(path.join(directory,id+'.webp'),data,{flag:'wx'});return id;}
export async function readImage(id:string){if(!/^[a-f0-9]{24}$/.test(id))return null;if(usesBlobStorage())return (await readBlob(imagePath(id)))?.data||null;try{return await readFile(path.join(root,'images',id+'.webp'));}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return null;throw error;}}
export async function exportStoredImages(){const images:Record<string,string>={};if(usesBlobStorage()){for(const file of await listBlobPaths('academy/images/')){const id=file.match(/^academy\/images\/([a-f0-9]{24})\.webp$/)?.[1];if(id){const image=await readBlob(file);if(image)images[id]=image.data.toString('base64');}}return images;}const directory=path.join(root,'images');try{for(const file of await readdir(directory))if(/^[a-f0-9]{24}\.webp$/.test(file))images[file.slice(0,-5)]=(await readFile(path.join(directory,file))).toString('base64');}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}return images;}
export async function restoreStoredImages(images:readonly (readonly [string,Buffer])[]){requireWritableStorage();if(usesBlobStorage()){for(const [id,data] of images)await overwriteBlob(imagePath(id),data);return;}const directory=path.join(root,'images');await mkdir(directory,{recursive:true});for(const [id,data] of images)await writeFile(path.join(directory,id+'.webp'),data);}
export async function restoreRecords<T extends StoreRecord>(collection:Collection,records:T[]){requireWritableStorage();if(usesBlobStorage()){await overwriteBlob(collectionPath(collection),JSON.stringify(records,null,2)+'\n');return;}await mutateRecords<T,void>(collection,current=>{current.splice(0,current.length,...records);});}
