'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { BookOpen, Layers3, Megaphone, Palette, Sparkles, Target, Globe2, X } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';

type MenuType = 'courses' | 'services';
export default function MegaMenu({type,onClose,settings,programs}:{type:MenuType;onClose:()=>void;settings:SiteSettings['navigation'];programs:NonNullable<SiteSettings['programLinks']>}) {
  const root = useRef<HTMLDivElement>(null);
  const icons = [Megaphone,Target,Palette,Layers3];
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(root.current, {y:-10,opacity:0,scale:.985}, {y:0,opacity:1,scale:1,duration:.35,ease:'power3.out'});
      gsap.from('.nav-course-link', {y:12,opacity:0,stagger:.045,duration:.4,ease:'power2.out'});
    },root);
    return () => ctx.revert();
  },[type]);
  const items = type === 'courses' ? programs.map((course,index)=>({...course,icon:icons[index%4]})) : settings.serviceLinks.map((service,index)=>({...service,icon:[Globe2,Palette,Megaphone][index%3]}));
  const menu=type==='courses'?settings.coursesMenu:settings.servicesMenu;
  return <div ref={root} id="academy-dropdown" className="academy-dropdown" aria-label={type === 'courses' ? 'Course navigation' : 'Service navigation'} onKeyDown={event=>{if(event.key==='Escape')onClose();}}>
    <aside><span className="nav-dropdown-label"><Sparkles size={15}/>{menu.eyebrow}</span><h2>{menu.heading}<br/><em>{menu.highlight}</em></h2><p>{menu.description}</p><Link href={type === 'courses' ? '/courses' : '/services'} onClick={onClose}><BookOpen size={17}/>{menu.actionLabel}</Link></aside>
    <div className="nav-dropdown-grid">{items.map(item=><Link className="nav-course-link" key={item.href} href={item.href} onClick={onClose}><span className="nav-dropdown-icon"><item.icon size={23}/></span><div><h3>{item.title}</h3><p>{item.description}</p></div></Link>)}</div>
    <button className="nav-dropdown-close" type="button" onClick={onClose} aria-label="Close dropdown"><X size={17}/></button>
  </div>;
}
