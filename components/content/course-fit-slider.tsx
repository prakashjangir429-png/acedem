'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import { BookOpen, Check, ChevronLeft, ChevronRight, Clock3, Layers3, Palette, Sparkles } from 'lucide-react';
import type { ContentSection } from '@/lib/content-schema';
import 'keen-slider/keen-slider.min.css';

type Cards=Extract<ContentSection,{type:'cards'}>;
export function CourseFitSlider({section}:{section:Cards}){
  const [current,setCurrent]=useState(0);
  const [ref,slider]=useKeenSlider<HTMLDivElement>({loop:true,slides:{perView:1.04,spacing:16},defaultAnimation:{duration:650},breakpoints:{'(min-width:680px)':{slides:{perView:2,spacing:20}},'(min-width:1100px)':{slides:{perView:3,spacing:22}}},slideChanged(s){setCurrent(s.track.details.rel);}});
  const words=(section.heading || '').split(' ');
  return <section className="cx-fit cx-container" id={section.id} aria-label={section.heading}><div className="cx-fit-heading"><div><span className="cx-eyebrow">{section.copy?.eyebrow}</span><h2>{words.slice(0,-2).join(' ')} <span className="section-title-highlight">{words.slice(-2).join(' ')}</span></h2><p>{section.copy?.description}</p></div><div className="cf-controls"><button type="button" aria-label="Previous course" onClick={()=>slider.current?.prev()}><ChevronLeft size={19}/></button><button type="button" aria-label="Next course" onClick={()=>slider.current?.next()}><ChevronRight size={19}/></button></div></div>
    <div className="keen-slider cf-slider" ref={ref}>{section.items.map((item,index)=>{const Icon=[Sparkles,BookOpen,Palette,Layers3][index%4];return <article className="keen-slider__slide cf-card" key={item.href || item.title}><div className="cf-card-banner"><span className="cf-icon"><Icon size={25}/></span><span className="cf-tag">{item.eyebrow}</span></div><div className="cf-card-body"><span className="cf-duration"><Clock3 size={14}/>{item.detail?.split(' + ')[0] || section.copy?.durationFallback}</span><h3><Link href={item.href || '/contact'}>{item.title}</Link></h3><p>{item.description}</p><details><summary>{section.copy?.includedLabel}</summary><ul>{item.features?.map(feature=><li key={feature}><Check size={14}/>{feature}</li>)}</ul></details><Link className="cf-card-link" href={item.href || '/contact'}>{item.linkLabel || item.title}</Link></div></article>;})}</div>
    <div className="cf-bottom"><p>{section.copy?.note}</p><div className="cf-dots">{section.items.map((item,index)=><button type="button" key={item.title} className={current===index?'active':''} aria-label={`Show course ${index+1}`} aria-current={current===index?'true':undefined} onClick={()=>slider.current?.moveToIdx(index)}/>)}</div></div>
  </section>;
}
