import Image from 'next/image';
export function BrandLogo({className='',onDark=false,priority=false}:{className?:string;onDark?:boolean;priority?:boolean}){
 return <span className={`brand-logo ${onDark?'brand-logo--on-dark':''} ${className}`}><Image src="/brand/digitonix-academy-logo.webp" alt="Digitonix Academy" width={1200} height={497} sizes="(max-width:760px) 150px, 220px" priority={priority}/></span>;
}
