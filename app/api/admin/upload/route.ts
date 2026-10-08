import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { Binary } from 'mongodb';
import { database } from '@/lib/database';
import { isAdmin, sameOrigin } from '@/lib/admin';
export const runtime='nodejs';
const limit=5*1024*1024;
export async function POST(request:Request){
  if(!await isAdmin())return NextResponse.json({error:'Sign in required'},{status:401});
  if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin'},{status:403});
  try{
    const reader=request.body?.getReader();if(!reader)return NextResponse.json({error:'Choose an image'},{status:400});
    const chunks:Uint8Array[]=[];let size=0;
    while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>limit+65536){await reader.cancel();return NextResponse.json({error:'Images must be 5 MB or smaller'},{status:413});}chunks.push(part.value);}
    const form=await new Request(request.url,{method:'POST',headers:{'Content-Type':request.headers.get('content-type')||''},body:Buffer.concat(chunks)}).formData();
    const file=form.get('image');if(!(file instanceof File)||!file.size)return NextResponse.json({error:'Choose an image'},{status:400});
    if(file.size>limit)return NextResponse.json({error:'Images must be 5 MB or smaller'},{status:413});
    const input=Buffer.from(await file.arrayBuffer());const processor=sharp(input,{limitInputPixels:25000000});
    const metadata=await processor.metadata();if(!['jpeg','png','webp'].includes(metadata.format||''))return NextResponse.json({error:'Choose a JPEG, PNG or WebP image'},{status:400});
    const {data,info}=await processor.rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer({resolveWithObject:true});
    const result=await (await database()).collection('blogImages').insertOne({data:new Binary(data),contentType:'image/webp',width:info.width,height:info.height,createdAt:new Date()});
    return NextResponse.json({url:`/api/images/${result.insertedId}`,width:info.width,height:info.height});
  }catch{return NextResponse.json({error:'Image upload failed. Choose a valid image and try again.'},{status:400});}
}
