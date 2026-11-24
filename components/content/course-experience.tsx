import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Check, Clock3, Layers3, Sparkles } from 'lucide-react';
import type { ContentPage } from '@/lib/content-schema';
import type { CourseExperienceData } from '@/lib/course-experience-data';
import { PageRenderer } from './page-renderer';
import { CourseFitSlider } from './course-fit-slider';
import { CourseMotion } from './course-motion';
import './course-experience.css';

export function CourseExperience({page,slug}:{page:ContentPage;slug?:string}) {
  const hero = page.sections.find(section=>section.type==='hero');
  if (!hero || hero.type !== 'hero') return <PageRenderer page={page}/>;
  const detail = page.experience as CourseExperienceData;
  if (!detail) throw new Error('Course experience content is missing');
  const programs = !slug ? page.sections.find(section=>section.id==='programs' && section.type==='cards' && section.enabled!==false) : undefined;
  const rest = {...page,sections:page.sections.filter(section=>section.type!=='hero' && section.type!=='cta' && section!==programs)};
  const titleWords=hero.heading.split(' ');
  const lead=titleWords.slice(0,-3).join(' ');
  const highlight=titleWords.slice(-3).join(' ');
  const jumpLinks=page.sections.filter(section=>section.enabled!==false && ['programs','overview','skills','projects','next-step','faq'].includes(section.id));
  return <div className={`courses-experience ${slug?'course-detail-experience':'course-index-experience'}`}>
    <CourseMotion/>
    <section className="cx-hero"><div className="cx-container">
      <nav className="cx-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{slug?<><Link href="/courses">{detail.breadcrumbParent}</Link><span aria-hidden="true">/</span><span aria-current="page">{detail.breadcrumb}</span></>:<span aria-current="page">{detail.breadcrumb}</span>}</nav>
      <div className="cx-hero-grid"><div className="cx-hero-copy"><span className="cx-eyebrow"><Sparkles size={15}/>{hero.eyebrow}</span><h1>{lead} <em>{highlight}</em></h1><p>{hero.description}</p><div className="cx-actions">{hero.buttons.map((button,index)=><Link key={button.href} className={index===0?'cx-primary':'cx-secondary'} href={button.href}>{button.label}</Link>)}</div><div className="cx-hero-checks">{detail.heroChecks.map(check=><span key={check}><Check size={16}/>{check}</span>)}</div></div>
      <div className="cx-hero-aside"><div className="cx-photo"><Image src={detail.image} alt={detail.imageAlt} width={1200} height={900} priority sizes="(max-width:760px) 94vw, 42vw"/><span><BookOpen size={16}/>{detail.imageCaption}</span></div><div className="cx-facts"><div><Clock3 size={21}/><span>{detail.durationLabel}<strong>{detail.duration}</strong></span></div><div><Layers3 size={21}/><span>{detail.focusLabel}<strong>{detail.focus}</strong></span></div></div><p className="cx-facts-note">{detail.factsNote}</p></div></div>
    </div></section>
    <nav className="cx-jump" aria-label="On this page"><div className="cx-container"><span>{detail.jumpIntro}</span>{jumpLinks.map(section=><a key={section.id} href={`#${section.id}`}>{detail.jumpLabels[section.id]||section.heading}</a>)}<Link href="/contact">{detail.jumpAction}</Link></div></nav>
    {programs?.type==='cards' && <CourseFitSlider section={programs}/>}
    <PageRenderer page={rest} courseListing={!slug} courseFaq/>
  </div>;
}
