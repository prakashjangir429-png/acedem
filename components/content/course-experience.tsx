import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Check, Clock3, Layers3, Sparkles } from 'lucide-react';
import type { ContentPage } from '@/lib/content-schema';
import { PageRenderer } from './page-renderer';
import { CourseFitSlider } from './course-fit-slider';
import { CourseMotion } from './course-motion';
import './course-experience.css';

const courseFacts: Record<string, {duration:string;focus:string;extra:string}> = {
  'advanced-ai-digital-marketing':{duration:'3 months',focus:'AI & digital marketing',extra:'Build your marketing foundation'},
  'professional-ai-digital-marketing':{duration:'4 months',focus:'Marketing & communication',extra:'Add professional development'},
  'master-ai-digital-marketing-creative':{duration:'5 months',focus:'Marketing & creative media',extra:'Add graphic design & video editing'},
  'diploma-ai-digital-marketing':{duration:'6 months',focus:'Marketing, creative & communication',extra:'Connect all three disciplines'},
};

export function CourseExperience({page,slug}:{page:ContentPage;slug?:string}) {
  const hero = page.sections.find(section=>section.type==='hero');
  if (!hero || hero.type !== 'hero') return <PageRenderer page={page}/>;
  const fact = slug ? courseFacts[slug] : undefined;
  const programs = !slug ? page.sections.find(section=>section.id==='programs' && section.type==='cards' && section.enabled!==false) : undefined;
  const rest = {...page,sections:page.sections.filter(section=>section.type!=='hero' && section.type!=='cta' && section!==programs)};
  const titleWords=hero.heading.split(' ');
  const lead=titleWords.slice(0,-3).join(' ');
  const highlight=titleWords.slice(-3).join(' ');
  const jumpLinks=page.sections.filter(section=>section.enabled!==false && ['programs','overview','skills','projects','next-step','faq'].includes(section.id));
  return <div className={`courses-experience ${slug?'course-detail-experience':'course-index-experience'}`}>
    <CourseMotion/>
    <section className="cx-hero"><div className="cx-container">
      <nav className="cx-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{slug?<><Link href="/courses">Courses</Link><span aria-hidden="true">/</span><span aria-current="page">Program overview</span></>:<span aria-current="page">Our courses</span>}</nav>
      <div className="cx-hero-grid"><div className="cx-hero-copy"><span className="cx-eyebrow"><Sparkles size={15}/>{hero.eyebrow || 'Learn with Digitonix'}</span><h1>{lead} <em>{highlight}</em></h1><p>{hero.description}</p><div className="cx-actions"><Link className="cx-primary" href={hero.buttons[0]?.href || '#programs'}>{hero.buttons[0]?.label || 'Find your program'}</Link><Link className="cx-secondary" href={hero.buttons[1]?.href || '/contact'}>{hero.buttons[1]?.label || 'Get course guidance'}</Link></div><div className="cx-hero-checks"><span><Check size={16}/> Practical learning</span><span><Check size={16}/> Portfolio preparation</span></div></div>
      <div className="cx-hero-aside"><div className="cx-photo"><Image src="/images/academy-learning-hero.webp" alt="Illustrative scene of students learning together around a laptop" width={1200} height={900} priority sizes="(max-width:760px) 94vw, 42vw"/><span><BookOpen size={16}/>{fact?.extra || 'Your next chapter starts with a skill.'}</span></div><div className="cx-facts"><div><Clock3 size={21}/><span>{fact?'Training duration':'Learning paths'}<strong>{fact?.duration || '4 distinct programs'}</strong></span></div><div><Layers3 size={21}/><span>{fact?'Your focus':'Core foundation'}<strong>{fact?.focus || 'AI & digital marketing'}</strong></span></div></div><p className="cx-facts-note">Ask about current batches, fees and internship eligibility before enrolling.</p></div></div>
    </div></section>
    <nav className="cx-jump" aria-label="On this page"><div className="cx-container"><span>EXPLORE {slug?'THIS COURSE':'YOUR OPTIONS'}</span>{jumpLinks.map(section=><a key={section.id} href={`#${section.id}`}>{({programs:'Programs',overview:'Overview',skills:'Curriculum',projects:'Practical work','next-step':'Career preparation',faq:'FAQs'} as Record<string,string>)[section.id]}</a>)}<Link href="/contact">Talk to the academy</Link></div></nav>
    {programs?.type==='cards' && <CourseFitSlider section={programs}/>}
    <PageRenderer page={rest} courseListing={!slug} courseFaq/>
  </div>;
}
