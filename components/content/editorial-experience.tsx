import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Check, CheckCircle2, Globe2, Layers3, Mail, Megaphone, Palette, Sparkles, Target } from 'lucide-react';
import type { ContentPage } from '@/lib/content-schema';
import { PageRenderer } from './page-renderer';
import { EditorialMotion } from './editorial-motion';
import './course-experience.css';
import './editorial-experience.css';

type Kind='services'|'web-development'|'ui-ux'|'digital-marketing'|'career'|'contact';
const boards:Record<string,{label:string;icon:typeof Globe2;items:string[]}>={
 services:{label:'A connected digital presence',icon:Layers3,items:['A website with a clear purpose','An experience that feels intuitive','Marketing grounded in a plan']},
 'web-development':{label:'A website with a purpose',icon:Globe2,items:['Structure your content','Build for every screen','Review, test and launch']},
 'ui-ux':{label:'Thoughtful from the first click',icon:Palette,items:['Understand the user journey','Explore the right interaction','Design a consistent experience']},
 'digital-marketing':{label:'Connect strategy to action',icon:Megaphone,items:['Know the audience','Shape the message','Measure and refine']},
};
function Highlight({text}:{text:string}){const words=text.split(' ');const split=Math.max(1,words.length-3);return <>{words.slice(0,split).join(' ')} <em>{words.slice(split).join(' ')}</em></>;}
export function EditorialExperience({page,kind}:{page:ContentPage;kind:Kind}){
 const hero=page.sections.find(s=>s.type==='hero');if(!hero||hero.type!=='hero')return <PageRenderer page={page}/>;
 const faq=page.sections.find(s=>s.type==='faq'&&s.enabled!==false);
 const rest={...page,sections:page.sections.filter(s=>s.type!=='hero'&&s.type!=='cta'&&s!==faq)};
 const service=kind!=='career'&&kind!=='contact';const board=boards[kind];const Icon=board?.icon||Target;
 return <div className={`courses-experience editorial-experience ep-${kind}`}><EditorialMotion/>
 <section className="ep-hero"><div className="ep-container"><nav aria-label="Breadcrumb" className="ep-breadcrumb"><Link href="/">Home</Link><span>/</span>{service&&kind!=='services'?<><Link href="/services">Services</Link><span>/</span></>:null}<span aria-current="page">{kind==='career'?'Career preparation':kind==='contact'?'Contact us':kind==='services'?'Services':kind==='ui-ux'?'UI / UX Design':kind==='web-development'?'Web Development':'Digital Marketing'}</span></nav><div className="ep-hero-grid"><div className="ep-hero-copy"><span className="cx-eyebrow"><Sparkles size={15}/>{hero.eyebrow}</span><h1><Highlight text={hero.heading}/></h1><p>{hero.description}</p><div className="cx-actions">{(hero.buttons.length?hero.buttons:[{label:'Talk to our team',href:'/contact'}]).map((button,index)=><Link className={index===0?'cx-primary':'cx-secondary'} href={button.href} key={button.label}>{button.label}</Link>)}</div><div className="ep-values"><span><Check size={15}/>{service?'A considered scope':'Practical guidance'}</span><span><Check size={15}/>{service?'Clear next steps':'Your goals come first'}</span></div></div>
 {service?<div className="ep-board"><div className="ep-board-toolbar"><span aria-hidden="true"><i/><i/><i/></span><small>THE PROJECT WORKSPACE</small></div><div className="ep-board-main"><span className="ep-board-icon"><Icon size={32}/></span><span className="ep-small-label">BUILT AROUND YOUR GOALS</span><h2>{board.label}</h2><div className="ep-board-items">{board.items.map(item=><div key={item}><CheckCircle2 size={19}/><span>{item}</span></div>)}</div><p>Discover · Create · Refine</p></div></div>:<div className="ep-photo"><Image src="/images/academy-learning-hero.webp" alt="Illustrative scene of students collaborating in a learning studio" width={1200} height={900} priority sizes="(max-width:760px) 94vw, 45vw"/><div><BookOpen size={20}/><span>{kind==='contact'?'A conversation is a good place to start.':'Your next step starts with the work you build.'}</span></div></div>}
 </div></div></section>
 <nav className="ep-jump" aria-label="On this page"><div className="ep-container">{rest.sections.filter(s=>['services','overview','roles','support','scope','process','enquiry','portfolio','deliverables'].includes(s.id)).map(s=><a href={`#${s.id}`} key={s.id}>{({services:'Our services',overview:'Overview',roles:'Career paths',support:'Career preparation',scope:'Scope of work',process:'Our process',enquiry:'Send an enquiry',portfolio:'Portfolio',deliverables:'Deliverables'} as Record<string,string>)[s.id]}</a>)}{faq&&<a href={`#${faq.id}`}>FAQs</a>}</div></nav>
 <PageRenderer page={rest}/>
 {faq?.type==='faq'&&<div className="course-layout ep-faq-wrap"><section className="section-padding cl-faq" id={faq.id}><div className="cl-faq-intro"><span className="cx-eyebrow">Good to know</span><h2>Let’s make things<br/><span className="section-title-highlight">a little clearer.</span></h2><p>{kind==='contact'?'Find out what to include in your enquiry and how to plan a visit.':kind==='career'?'Understand the support available and how to prepare for opportunities.':'A few useful answers before you plan a project. For scope, timing and pricing, tell us what you have in mind.'}</p><Link href={kind==='contact'?'#enquiry':'/contact'}>Talk to our team</Link></div><div className="cl-faq-list">{faq.items.map((item,index)=><details open={index===0} key={item.question}><summary>{item.question}<span aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section></div>}
 </div>;
}
