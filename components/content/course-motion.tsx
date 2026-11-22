'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function CourseMotion(){
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        gsap.from('.cx-hero-copy > *',{y:18,opacity:0,duration:.6,stagger:.06,ease:'power2.out',clearProps:'transform,opacity'});
        gsap.from('.cx-hero-aside',{y:20,opacity:0,duration:.8,ease:'power2.out',clearProps:'transform,opacity'});
        gsap.utils.toArray<HTMLElement>('.course-layout > section').forEach(section=>gsap.from(section.querySelectorAll('h2, article'),{y:18,opacity:0,duration:.55,stagger:.05,scrollTrigger:{trigger:section,start:'top 90%',once:true},clearProps:'transform,opacity'}));
      },'.courses-experience');
      return ()=>ctx.revert();
    });
    return ()=>media.revert();
  },[]);
  return null;
}
