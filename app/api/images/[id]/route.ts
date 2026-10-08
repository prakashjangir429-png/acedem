import { ObjectId } from 'mongodb';
import { database } from '@/lib/database';
export const runtime='nodejs';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;if(!/^[a-f0-9]{24}$/.test(id))return new Response('Not found',{status:404});
  try{const image=await (await database()).collection('blogImages').findOne({_id:new ObjectId(id)});if(!image)return new Response('Not found',{status:404});return new Response(new Uint8Array(image.data.buffer),{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});}catch{return new Response('Image temporarily unavailable',{status:503});}
}
