'use client';
import { useState, type FormEvent } from 'react';
import type { ContactFormContent } from '@/lib/content-schema';

export function EnquiryForm({ content:c }: { content:ContactFormContent }) {
  const [form,setForm]=useState({name:'',email:'',phone:'',program:'',message:''});
  const [prepared,setPrepared]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const update=(key:keyof typeof form,value:string)=>setForm(previous=>({...previous,[key]:value}));
  const submit=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setBusy(true);setError('');try{let sourcePage=location.pathname,landingPage=location.pathname;try{sourcePage=sessionStorage.getItem('academy:source')||sourcePage;landingPage=sessionStorage.getItem('academy:landing')||landingPage;}catch{}const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,sourcePage,landingPage,currentPage:location.pathname})});const data=await response.json();if(!response.ok)throw new Error(data.error);setPrepared(true);}catch(e){setError(e instanceof Error?e.message:'Unable to submit');}finally{setBusy(false);}};
  if(prepared)return <div role="status" className="py-16 text-center"><h2 className="text-3xl font-semibold">{c.readyHeading}</h2><p className="my-6 text-sm leading-7 text-[#64708b]">{c.readyDescription}</p><button type="button" className="mx-auto mt-5 block text-sm text-[#1a3fa0] underline" onClick={()=>setPrepared(false)}>{c.backLabel}</button></div>;
  return <form onSubmit={submit} className="space-y-5"><h2 className="text-3xl font-semibold">{c.heading}</h2><p className="text-sm leading-7 text-[#64708b]">{c.description}</p>{(['name','email','phone'] as const).map(key=><div key={key}><label className="contact-label" htmlFor={`enquiry-${key}`}>{c[`${key}Label`]} *</label><input className="contact-field" id={`enquiry-${key}`} name={key} type={key==='email'?'email':key==='phone'?'tel':'text'} autoComplete={key==='phone'?'tel':key} required maxLength={150} value={form[key]} onChange={event=>update(key,event.target.value)} /></div>)}<div><label className="contact-label" htmlFor="enquiry-program">{c.programLabel}</label><select className="contact-field" id="enquiry-program" value={form.program} onChange={event=>update('program',event.target.value)}><option value="">{c.programPlaceholder}</option>{c.programs.map(program=><option key={program}>{program}</option>)}</select></div><div><label className="contact-label" htmlFor="enquiry-message">{c.messageLabel}</label><textarea className="contact-field" id="enquiry-message" rows={4} maxLength={2000} value={form.message} onChange={event=>update('message',event.target.value)} /></div>{error&&<p role="alert" className="text-sm text-red-700">{error}</p>}<button disabled={busy} className="academy-hero-primary w-full rounded-xl px-6 py-4 text-sm font-semibold text-white" type="submit">{busy?"Sending…":c.submitLabel}</button><p className="text-center text-xs leading-6 text-[#64708b]">{c.helpText}</p></form>;
}


