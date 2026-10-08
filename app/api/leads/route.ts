import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sameOrigin } from '@/lib/admin';
import { database } from '@/lib/database';
const localPath=z.string().max(500).regex(/^\/(?!\/)/);
const schema=z.object({name:z.string().trim().min(2).max(150),email:z.string().email().max(150),phone:z.string().min(5).max(40),program:z.string().max(200),message:z.string().max(2000),sourcePage:localPath,landingPage:localPath,currentPage:localPath,website:z.string().max(0).optional()});
export async function POST(request:Request){if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin'},{status:403});try{const text=await request.text();if(text.length>10000)return NextResponse.json({error:'Form is too large'},{status:413});const lead=schema.parse(JSON.parse(text));const db=await database();const recent=await db.collection('leads').countDocuments({email:lead.email,createdAt:{$gte:new Date(Date.now()-60000)}});if(recent)return NextResponse.json({error:'Please wait a minute before submitting again.'},{status:429});await db.collection('leads').insertOne({...lead,status:'new',createdAt:new Date()});return NextResponse.json({ok:true});}catch(error){return NextResponse.json({error:error instanceof z.ZodError?'Please check your contact details.':'Your enquiry could not be saved. Please try again.'},{status:error instanceof z.ZodError?400:503});}}
