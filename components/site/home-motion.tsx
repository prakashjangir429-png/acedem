'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HomeMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.dn-hero-copy > *', {y:24,opacity:0,duration:.8,stagger:.09,ease:'power3.out',clearProps:'transform,opacity'});
        gsap.from('.da-hero-image', {y:30,rotation:2,opacity:0,duration:1,ease:'power3.out',delay:.15});
        gsap.to('.da-hero-image', {y:-10,duration:3,yoyo:true,repeat:-1,ease:'sine.inOut',delay:1.2});
        gsap.utils.toArray<HTMLElement>('.dn-section').forEach(section => {
          const elements = section.querySelectorAll('h2, .dn-section-head > p, .dn-module-grid article, .dn-service-grid > a, .da-career-items article, .dn-resource-stack > a, .da-enquiry');
          gsap.from(elements, {y:22,opacity:0,duration:.65,stagger:.055,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 88%',once:true},clearProps:'transform,opacity'});
        });
      }, '.dn-home');
      return () => ctx.revert();
    });
    return () => media.revert();
  },[]);
  return null;
}
