'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
export function SiteFrame({children}:{children:React.ReactNode}){const pathname=usePathname();useEffect(()=>{if(pathname.startsWith('/admin'))return;try{if(!sessionStorage.getItem('academy:landing'))sessionStorage.setItem('academy:landing',pathname);if(pathname!=='/contact')sessionStorage.setItem('academy:source',pathname);}catch{}},[pathname]);if(pathname.startsWith('/admin'))return <>{children}</>;return <><Navbar/><main>{children}</main><Footer/></>;}
