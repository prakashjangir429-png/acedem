import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Check, CheckCircle2, Globe2, Layers3, Mail, Megaphone, Palette, Sparkles, Target } from 'lucide-react';
import type { ContentPage } from '@/lib/content-schema';
import type { EditorialExperienceData } from '@/lib/editorial-experience-data';
import { PageRenderer } from './page-renderer';
import { EditorialMotion } from './editorial-motion';
import './course-experience.css';
import './editorial-experience.css';

type Kind='services'|'web-development'|'ui-ux'|'digital-marketing'|'career'|'contact';
function Highlight({text}:{text:string}){const words=text.split(' ');const split=Math.max(1,words.length-3);return <>{words.slice(0,split).join(' ')} <em>{words.slice(split).join(' ')}</em></>;}
export function EditorialExperience({page,kind}:{page:ContentPage;kind:Kind}){
 const hero=page.sections.find(s=>s.type==='hero');if(!hero||hero.type!=='hero')return <PageRenderer page={page}/>;
 const faq=page.sections.find(s=>s.type==='faq'&&s.enabled!==false);
 const rest={...page,sections:page.sections.filter(s=>s.type!=='hero'&&s.type!=='cta'&&s!==faq)};
 const service=kind!=='career'&&kind!=='contact';const detail=page.experience as EditorialExperienceData;
 if(!detail)throw new Error('Editorial page content is missing');
 const board=detail.board;const Icon=({services:Layers3,'web-development':Globe2,'ui-ux':Palette,'digital-marketing':Megaphone} as Record<string,typeof Globe2>)[kind]||Target;
 return <div className={`courses-experience editorial-experience ep-${kind}`}><EditorialMotion/>
 <section className="ep-hero"><div className="ep-container"><nav aria-label="Breadcrumb" className="ep-breadcrumb"><Link href="/">Home</Link><span>/</span>{service&&kind!=='services'?<><Link href="/services">{detail.breadcrumbParent}</Link><span>/</span></>:null}<span aria-current="page">{detail.breadcrumb}</span></nav><div className="ep-hero-grid"><div className="ep-hero-copy"><span className="cx-eyebrow"><Sparkles size={15}/>{hero.eyebrow}</span><h1><Highlight text={hero.heading}/></h1><p>{hero.description}</p><div className="cx-actions">{hero.buttons.map((button,index)=><Link className={index===0?'cx-primary':'cx-secondary'} href={button.href} key={button.label}>{button.label}</Link>)}</div><div className="ep-values"><span><Check size={15}/>{detail.heroChecks[0]}</span><span><Check size={15}/>{detail.heroChecks[1]}</span></div></div>
 {service?<div className="ep-board"><div className="ep-board-toolbar"><span aria-hidden="true"><i/><i/><i/></span><small>{board?.toolbar}</small></div><div className="ep-board-main"><span className="ep-board-icon"><Icon size={32}/></span><span className="ep-small-label">{board?.eyebrow}</span><h2>{board?.title}</h2><div className="ep-board-items">{board?.items.map(item=><div key={item}><CheckCircle2 size={19}/><span>{item}</span></div>)}</div><p>{board?.footer}</p></div></div>:<div className="ep-photo"><Image src={detail.image} alt={detail.imageAlt} width={1200} height={900} priority sizes="(max-width:760px) 94vw, 45vw"/><div><BookOpen size={20}/><span>{detail.imageCaption}</span></div></div>}
 </div></div></section>
 <nav className="ep-jump" aria-label="On this page"><div className="ep-container">{rest.sections.filter(s=>['services','overview','roles','support','scope','process','enquiry','portfolio','deliverables'].includes(s.id)).map(s=><a href={`#${s.id}`} key={s.id}>{detail.jumpLabels[s.id]||s.heading}</a>)}{faq&&<a href={`#${faq.id}`}>{detail.jumpLabels.faq}</a>}</div></nav>
 <PageRenderer page={rest}/>
 {faq?.type==='faq'&&<div className="course-layout ep-faq-wrap"><section className="section-padding cl-faq" id={faq.id}><div className="cl-faq-intro"><span className="cx-eyebrow">{detail.faq.eyebrow}</span><h2>{detail.faq.heading}<br/><span className="section-title-highlight">{detail.faq.highlight}</span></h2><p>{detail.faq.description}</p><Link href={detail.faq.actionHref}>{detail.faq.actionLabel}</Link></div><div className="cl-faq-list">{faq.items.map((item,index)=><details open={index===0} key={item.question}><summary>{item.question}<span aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section></div>}
 </div>;
}
