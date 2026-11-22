'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { BookOpen, Layers3, Megaphone, Palette, Sparkles, Target, Globe2, X } from 'lucide-react';
import { courseCatalog } from '@/lib/course-catalog';

type MenuType = 'courses' | 'services';
const services = [
  { title: 'Web Development', description: 'Clear websites, landing pages and digital experiences.', href: '/services/web-development', icon: Globe2 },
  { title: 'UI / UX Design', description: 'Thoughtful journeys and interfaces shaped around your audience.', href: '/services/ui-ux', icon: Palette },
  { title: 'Digital Marketing', description: 'Connect strategy, content, channels and measurement.', href: '/services/digital-marketing', icon: Megaphone },
];
export default function MegaMenu({type,onClose}:{type:MenuType;onClose:()=>void}) {
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
  const items = type === 'courses' ? courseCatalog.map((course,index)=>({title:course.name,description:course.audience,href:`/courses/${course.slug}`,icon:icons[index]})) : services;
  return <div ref={root} id="academy-dropdown" className="academy-dropdown" aria-label={type === 'courses' ? 'Course navigation' : 'Service navigation'} onKeyDown={event=>{if(event.key==='Escape')onClose();}}>
    <aside><span className="nav-dropdown-label"><Sparkles size={15}/>{type === 'courses' ? 'YOUR NEXT CHAPTER' : 'IDEAS INTO IMPACT'}</span><h2>{type === 'courses' ? <>Learn with purpose.<br/><em>Grow with confidence.</em></> : <>Make something<br/><em>that matters.</em></>}</h2><p>{type === 'courses' ? 'Compare four practical pathways in AI, digital marketing and creative media.' : 'Explore considered digital services for your next business goal.'}</p><Link href={type === 'courses' ? '/courses' : '/services'} onClick={onClose}><BookOpen size={17}/>{type === 'courses' ? 'Compare all programs' : 'Explore all services'}</Link></aside>
    <div className="nav-dropdown-grid">{items.map(item=><Link className="nav-course-link" key={item.href} href={item.href} onClick={onClose}><span className="nav-dropdown-icon"><item.icon size={23}/></span><div><h3>{item.title}</h3><p>{item.description}</p></div></Link>)}</div>
    <button className="nav-dropdown-close" type="button" onClick={onClose} aria-label="Close dropdown"><X size={17}/></button>
  </div>;
}
