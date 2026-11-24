import { z } from 'zod';
import { safeHref } from './content-schema';

const text = z.string();
const link = z.object({label:text,href:safeHref});
const copy = z.record(text,text);

const home = z.object({
  sectionVisibility:z.record(text,z.boolean()),
  heroImage:safeHref,heroImageAlt:text,visitPhone:text,visitPhoneHref:safeHref,visitEmailHref:safeHref,
  paths:z.array(z.object({number:text,tag:text,title:text,duration:text,description:text,points:z.array(text),href:safeHref})),
  modules:z.array(z.object({name:text,detail:text})),
  faqs:z.array(z.object({q:text,a:text})),
  comparison:z.array(z.object({label:text,values:z.array(z.boolean())})),
  methodSteps:z.array(z.object({title:text,copy:text})),
  services:z.array(z.object({title:text,copy:text,href:safeHref})),
  copy:z.record(text,copy),
});

const menu=z.object({eyebrow:text,heading:text,highlight:text,description:text,actionLabel:text});
const navigation=z.object({links:z.array(link),phone:text,phoneHref:safeHref,actionLabel:text,actionHref:safeHref,coursesMenu:menu,servicesMenu:menu,serviceLinks:z.array(z.object({title:text,description:text,href:safeHref}))});
const footer=z.object({eyebrow:text,heading:text,highlight:text,description:text,actionLabel:text,actionHref:safeHref,brandDescription:text,tagline:text,exploreHeading:text,exploreLinks:z.array(link),programsHeading:text,contactHeading:text,addressLabel:text,address:text,phoneLabel:text,phone:text,phoneHref:safeHref,emailLabel:text,email:text,emailHref:safeHref,copyright:text,copyrightSuffix:text,closing:text,location:text});
const siteSettings=z.object({navigation,footer,journal:z.record(text,text)});

const course=z.object({breadcrumb:text,breadcrumbParent:text,heroChecks:z.array(text),image:safeHref,imageAlt:text,imageCaption:text,durationLabel:text,duration:text,focusLabel:text,focus:text,factsNote:text,jumpIntro:text,jumpLabels:copy,jumpAction:text});
const editorial=z.object({breadcrumb:text,breadcrumbParent:text,heroChecks:z.array(text),image:safeHref,imageAlt:text,imageCaption:text,board:z.object({toolbar:text,eyebrow:text,title:text,items:z.array(text),footer:text}).nullable(),jumpLabels:copy,faq:z.object({eyebrow:text,heading:text,highlight:text,description:text,actionLabel:text,actionHref:safeHref})});

export function validateExperience(key:string,value:unknown){
  if(key==='home')return value;
  if(key==='site-settings')return siteSettings.parse(value);
  if(key==='courses'||key.startsWith('course-'))return course.parse(value);
  if(key==='services'||key.startsWith('service-')||key==='career'||key==='contact')return editorial.parse(value);
  return value;
}

const homeIds=['hero','intro','programs','compare','method','curriculum','project','audience','career','services','resources','faq','admissions'];
export function validateHomeSections(sections:{id:string;type:string;data?:Record<string,unknown>}[]){
  const byId=new Map(sections.map(section=>[section.id,section]));
  if(sections.length!==homeIds.length||homeIds.some(id=>byId.get(id)?.type!=='home-block'))throw new Error('The homepage requires all 13 designed sections. Hide or reorder them in the form.');
  for(const id of homeIds)z.object({copy:z.record(text,text),links:z.record(text,safeHref).optional()}).passthrough().parse(byId.get(id)?.data);
  const data=(id:string)=>byId.get(id)!.data!;
  z.object({image:safeHref,imageAlt:text}).parse(data('hero'));
  home.shape.paths.parse(data('programs').items);
  home.shape.comparison.parse(data('compare').rows);
  home.shape.methodSteps.parse(data('method').steps);
  home.shape.modules.parse(data('curriculum').modules);
  home.shape.services.parse(data('services').items);
  home.shape.faqs.parse(data('faq').items);
  z.object({phone:text,phoneHref:safeHref,emailHref:safeHref}).parse(data('admissions'));
}
