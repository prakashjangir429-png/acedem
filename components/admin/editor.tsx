'use client';

import { useCallback,useEffect,useRef,useState } from 'react';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';

import { Code2,Eye,FileDown,FileUp,Save } from 'lucide-react';

import { ImageUpload } from './image-upload';

import { PageContentForm } from './page-content-form';

import type { ContentPage } from '@/lib/content-schema';

const RichEditor=dynamic(()=>import('./rich-editor'),{ssr:false,loading:()=> <p>Loading rich editor…</p>});
const richConfigured=Boolean(process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY);
const emptyBlog={title:'',slug:'',excerpt:'',content:'',author:'Digitonix Academy',category:'Insights',coverImage:'',status:'draft',metaTitle:'',metaDescription:'',keywords:''};

const emptyLead={name:'',email:'',phone:'',program:'',message:'',notes:'',status:'new',sourcePage:'/contact',landingPage:'/contact',currentPage:'/contact'};

const emptyPage:ContentPage={version:1,metadata:{title:'New page | Digitonix Academy',description:'',keywords:[]},sections:[{id:'hero',type:'hero',heading:'Your next chapter.',description:'',buttons:[]}]};

export function Editor({resource,id}:{resource:string;id:string}){

 const importRef=useRef<HTMLInputElement>(null);
 const router=useRouter();const [record,setRecord]=useState<Record<string,string>>(resource==='leads'?emptyLead:emptyBlog);const [json,setJson]=useState(JSON.stringify(emptyPage,null,2));const [revision,setRevision]=useState('');const [key,setKey]=useState(id==='new'?'':id);const [recordId,setRecordId]=useState(id==='new'?'':id);const [message,setMessage]=useState('');const [ready,setReady]=useState(id==='new');const [busy,setBusy]=useState(false);const [uploading,setUploading]=useState(false);const [failed,setFailed]=useState(false);const [mode,setMode]=useState<'form'|'json'>('form');const [preview,setPreview]=useState(false);const [dirty,setDirty]=useState(false);

 useEffect(()=>{if(id==='new')return;let cancelled=false;fetch(`/api/admin/manage/${resource}?id=${encodeURIComponent(id)}`).then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error);if(cancelled)return;if(resource==='pages'){setJson(JSON.stringify(data.content,null,2));setRevision(data.revision);}else setRecord({...data.item,keywords:Array.isArray(data.item.keywords)?data.item.keywords.join(', '):(data.item.keywords||'')});setReady(true);}).catch(e=>{if(!cancelled){setMessage(e.message);setFailed(true);}});return()=>{cancelled=true;};},[resource,id]);

 useEffect(()=>{const warn=(event:BeforeUnloadEvent)=>{if(dirty){event.preventDefault();event.returnValue='';}};addEventListener('beforeunload',warn);return()=>removeEventListener('beforeunload',warn);},[dirty]);

 const update=(field:string,value:string)=>{setRecord(previous=>({...previous,[field]:value}));setDirty(true);};

 const busyUpload=useCallback((value:boolean)=>setUploading(value),[]);

 async function save(){setBusy(true);setMessage('');try{const payload=resource==='pages'?{key,revision,create:!recordId,content:JSON.parse(json)}:{...record,id:recordId||undefined,expectedUpdatedAt:record.updatedAt};const response=await fetch('/api/admin/manage/'+resource,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(data.error);if(resource==='pages')setRevision(data.revision);else setRecord(previous=>({...previous,_id:data.id,updatedAt:data.updatedAt}));setRecordId(data.id);setFailed(false);const location=data.storage==='blob'?`private Blob JSON: ${data.jsonPath}`:`local JSON: ${data.jsonPath}`;setMessage(`Saved to ${location}.${resource==='pages'&&data.storage==='blob'?' The deployed source file remains unchanged.':''}${resource==='blogs'?(record.status==='published'?' Your article is published.':' Your draft remains private.'):''}`);setDirty(false);if(id==='new')router.replace(`/admin/${resource}/${data.id}`);}catch(error){setFailed(true);setMessage(error instanceof Error?error.message:'Unable to save.');}finally{setBusy(false);}}

 let content:ContentPage|null=null;try{content=JSON.parse(json);}catch{}

 async function importJson(file:File){
  setMessage('');
  try{
   if(file.size>2_000_000)throw new Error('The JSON file is too large.');
   const parsed=JSON.parse(await file.text());
   if(resource==='pages'){
    const next=parsed?.content??parsed;
    if(next?.version!==1||!next?.metadata||!Array.isArray(next?.sections))throw new Error('This is not a page content backup.');
    setJson(JSON.stringify(next,null,2));
   }else if(resource==='blogs'){
    if(!parsed||typeof parsed.title!=='string'||typeof parsed.content!=='string')throw new Error('This is not a blog backup.');
    setRecord(previous=>({...previous,...parsed,_id:previous._id,updatedAt:previous.updatedAt,keywords:Array.isArray(parsed.keywords)?parsed.keywords.join(', '):(parsed.keywords||'')}));
   }else{
    if(!parsed||typeof parsed.name!=='string')throw new Error('This is not a lead backup.');
    setRecord(previous=>({...previous,...parsed,_id:previous._id,updatedAt:previous.updatedAt}));
   }
   setMode('form');setDirty(true);setFailed(false);setMessage('JSON imported into the form. Review the fields, then save changes.');
  }catch(error){setFailed(true);setMessage(error instanceof Error?error.message:'Unable to import JSON.');}
 }
 function download(){const blob=new Blob([resource==='pages'?json:JSON.stringify(resource==='blogs'?{...record,keywords:(record.keywords||'').split(',').map(word=>word.trim()).filter(Boolean)}:record,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${resource}-${key||recordId||'new'}.json`;a.click();URL.revokeObjectURL(url);}

 return <><Link className="admin-back" href={'/admin/'+resource}>Back to {resource}</Link><div className="admin-heading"><div><p className="admin-kicker">{resource==='pages'?'PAGE CONTENT':resource==='blogs'?'BLOG STUDIO':'LEAD DETAILS'}</p><h1>{id==='new'?`Create ${resource==='pages'?'a page':resource==='blogs'?'an article':'a lead'}`:resource==='pages'?id.replaceAll('-',' '):resource==='blogs'?'Edit your article':'Manage this enquiry'}</h1><p>{dirty?'You have unsaved changes.':'Organised fields. Clear details. Everything in one place.'}</p></div><div className="admin-heading-actions"><input ref={importRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Import JSON backup" onChange={async event=>{const file=event.target.files?.[0];if(file)await importJson(file);event.target.value='';}}/><button type="button" className="admin-soft" onClick={()=>importRef.current?.click()} disabled={!ready}><FileUp size={15}/>Import JSON</button><button type="button" className="admin-soft" onClick={download} disabled={!ready}><FileDown size={15}/>Export JSON</button><button className="admin-primary" disabled={!ready||busy||uploading} onClick={save}><Save size={16}/>{busy?'Saving…':'Save changes'}</button></div></div>{message&&<p role={failed?'alert':'status'} className={failed?'admin-error':'admin-notice'}>{message}</p>}

 {!ready&&!message&&<div className="admin-panel">Loading record…</div>}

 {ready&&resource==='pages'&&<><div className="admin-editor-topline"><div className="admin-mode-tabs"><button type="button" className={mode==='form'?'active':''} onClick={()=>setMode('form')}>Form editor</button><button type="button" className={mode==='json'?'active':''} onClick={()=>setMode('json')}><Code2 size={14}/>JSON</button></div>{id==='new'&&<label>Page key<input value={key} placeholder="about-academy" onChange={e=>{setKey(e.target.value);setDirty(true);}}/></label>}</div>{mode==='json'?<div className="admin-panel"><h2>Page JSON</h2><p>Advanced view. Changes are validated before saving.</p><textarea aria-label="Page content JSON" className="admin-json" spellCheck={false} value={json} onChange={e=>{setJson(e.target.value);setDirty(true);}}/></div>:content&&Array.isArray(content.sections)&&content.metadata?<PageContentForm content={content} pageKey={key} onChange={next=>{setJson(JSON.stringify(next,null,2));setDirty(true);}}/>:<p className="admin-error">The JSON cannot be shown as a form. Open the JSON tab to fix its structure.</p>}</>}

 {ready&&resource==='leads'&&<div className="admin-editor-grid"><section className="admin-panel admin-blog-form"><h2>Contact information</h2><div className="af-fields">{[['name','Full name'],['email','Email address'],['phone','Phone number'],['program','Program or service']].map(([field,label])=><label key={field}>{label}<input type={field==='email'?'email':field==='phone'?'tel':'text'} value={record[field]||''} onChange={e=>update(field,e.target.value)}/></label>)}</div><label>Enquiry message<textarea rows={4} value={record.message||''} onChange={e=>update('message',e.target.value)}/></label><label>Internal notes<textarea rows={4} value={record.notes||''} onChange={e=>update('notes',e.target.value)} placeholder="Record follow-ups and useful context…"/></label></section><aside className="admin-panel admin-blog-form"><h2>Follow-up & source</h2><label>Status<select value={record.status||'new'} onChange={e=>update('status',e.target.value)}>{['new','contacted','qualified','closed'].map(s=><option key={s}>{s}</option>)}</select></label>{[['sourcePage','Source page'],['landingPage','Landing page'],['currentPage','Submission page']].map(([field,label])=><label key={field}>{label}<input value={record[field]||'/contact'} onChange={e=>update(field,e.target.value)}/></label>)}{record.createdAt&&<p>Received {new Date(record.createdAt).toLocaleString('en-IN')}</p>}</aside></div>}

 {ready&&resource==='blogs'&&<div className="admin-editor-grid"><section className="admin-panel admin-blog-form"><label>Article title<input value={record.title||''} onChange={e=>{update('title',e.target.value);if(!recordId)update('slug',e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''));}} placeholder="A useful idea worth sharing"/></label><label>Excerpt<textarea rows={3} value={record.excerpt||''} onChange={e=>update('excerpt',e.target.value)}/></label><div className="admin-panel-toolbar"><h2>Article content</h2><button type="button" className="admin-soft" onClick={()=>setPreview(!preview)}><Eye size={15}/>{preview?'Edit HTML':'Preview'}</button></div>{preview?<iframe className="admin-article-preview" title="Article preview" sandbox="" srcDoc={`<!doctype html><html><head><meta charset="utf-8"><style>body{font:16px/1.8 Arial,sans-serif;color:#282336;padding:24px;overflow-wrap:anywhere}img{max-width:100%}h2{font-size:24px}blockquote{padding:16px;border-left:3px solid #a396dc;background:#f5f1ff}</style></head><body>${record.content||'<p>Your article preview will appear here.</p>'}</body></html>`}/>:richConfigured?<RichEditor value={record.content||''} onChange={value=>update('content',value)}/>:<label>HTML body<textarea className="admin-html-editor" rows={18} spellCheck={false} value={record.content||''} onChange={e=>update('content',e.target.value)} placeholder={'<h2>Start with an idea</h2>\n<p>Write your article here…</p>'}/><small>Use headings, paragraphs, lists and links. Unsafe HTML is removed when saved.</small></label>}</section><aside className="admin-panel admin-blog-form"><h2>Publishing</h2><ImageUpload value={record.coverImage||''} onChange={value=>update('coverImage',value)} onBusy={busyUpload}/><label>Status<select value={record.status||'draft'} onChange={e=>update('status',e.target.value)}><option value="draft">Draft · private</option><option value="published">Published · public</option></select></label>{[['slug','URL slug'],['author','Author'],['category','Category']].map(([field,label])=><label key={field}>{label}<input value={record[field]||''} onChange={e=>update(field,e.target.value)}/></label>)}<div className="admin-seo-divider"><h2>SEO details</h2><p>These fields map to the article’s public metadata.</p></div><label>SEO title<input value={record.metaTitle||''} maxLength={200} onChange={e=>update('metaTitle',e.target.value)} placeholder={record.title||'Search result title'}/><small>{(record.metaTitle||record.title||'').length} characters</small></label><label>SEO description<textarea rows={4} maxLength={320} value={record.metaDescription||''} onChange={e=>update('metaDescription',e.target.value)} placeholder={record.excerpt||'A useful description of the article'}/><small>{(record.metaDescription||record.excerpt||'').length} characters</small></label><label>SEO keywords<textarea rows={3} value={record.keywords||''} onChange={e=>update('keywords',e.target.value)} placeholder="digital marketing, AI workflows"/><small>Separate keywords with commas.</small></label><div className="admin-seo-preview"><span>Search preview</span><small>/blogs/{record.slug||'your-article'}</small><strong>{record.metaTitle||record.title||'Your article title'}</strong><p>{record.metaDescription||record.excerpt||'Your article description will appear here.'}</p></div>{recordId&&record.status==='published'&&<Link href={'/blogs/'+record.slug} target="_blank">View published article</Link>}</aside></div>}

 </>;

}

