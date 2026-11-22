import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/admin';
import { mutateRecords, newRecordId, type LeadRecord } from '@/lib/json-store';
import { leadSchema } from '@/lib/lead-schema';
import { z } from 'zod';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin'},{status:403});
 try{const text=await request.text();if(text.length>10000)return NextResponse.json({error:'Form is too large'},{status:413});const {website,...lead}=leadSchema.parse(JSON.parse(text));
 await mutateRecords<LeadRecord,void>('leads',records=>{if(records.some(r=>r.email.toLowerCase()===lead.email.toLowerCase()&&new Date(r.createdAt).getTime()>Date.now()-60000))throw new Error('RATE');records.unshift({...lead,_id:newRecordId(),status:'new',createdAt:new Date().toISOString()});});
 return NextResponse.json({ok:true});
 }catch(error){return NextResponse.json({error:error instanceof z.ZodError?'Please check your contact details.':error instanceof Error&&error.message==='RATE'?'Please wait a minute before submitting again.':'Your enquiry could not be saved. Please try again.'},{status:error instanceof z.ZodError?400:error instanceof Error&&error.message==='RATE'?429:503});}
}
