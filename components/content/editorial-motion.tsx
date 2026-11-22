'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function EditorialMotion(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.from('.ep-hero-copy > *',{opacity:0,y:18,duration:.65,stagger:.07,clearProps:'opacity,transform'});gsap.from('.ep-board, .ep-photo',{opacity:0,y:24,duration:.8,clearProps:'opacity,transform'});gsap.utils.toArray<HTMLElement>('.editorial-experience .course-layout>section').forEach(section=>gsap.from(section.querySelectorAll('h2,article'),{opacity:0,y:18,duration:.55,stagger:.05,clearProps:'opacity,transform',scrollTrigger:{trigger:section,start:'top 90%',once:true}}));},'.editorial-experience');return()=>ctx.revert();});return()=>media.revert();},[]);return null;}
