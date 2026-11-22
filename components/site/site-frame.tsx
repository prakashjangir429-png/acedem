'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import './site-theme.css';
import './reference-palette.css';
import './blush-theme.css';
export function SiteFrame({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  useEffect(() => {
    if(pathname.startsWith('/admin')) return;
    try {
      if(!sessionStorage.getItem('academy:landing')) sessionStorage.setItem('academy:landing',pathname);
      if(pathname!=='/contact') sessionStorage.setItem('academy:source',pathname);
    } catch {}
  }, [pathname]);
  if(pathname.startsWith('/admin')) return <>{children}</>;
  if(pathname === '/') return <div className="public-site"><Navbar/>{children}<Footer/></div>;
  return <div className="public-site"><Navbar/><main>{children}</main><Footer/></div>;
}
