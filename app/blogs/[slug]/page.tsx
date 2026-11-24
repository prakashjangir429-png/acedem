import { cleanHtml, findPublishedBlog } from '@/lib/blogs';
import { getPageContent } from '@/lib/content';
import type { SiteSettings } from '@/lib/site-settings';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import { BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { ArticleNavigation } from '@/components/content/article-navigation';
import '../journal.css';
export const dynamic='force-dynamic';
const getPost=cache(async(slug:string)=>{try{const post=await findPublishedBlog(slug);return {post,unavailable:false};}catch{return {post:null,unavailable:true};}});
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {post,unavailable}=await getPost((await params).slug);if(unavailable)return {title:'Journal temporarily unavailable | Digitonix Academy',robots:{index:false,follow:true}};if(!post)notFound();return {title:post.metaTitle||post.title,description:post.metaDescription||post.excerpt,keywords:post.keywords||[],openGraph:{title:post.metaTitle||post.title,description:post.metaDescription||post.excerpt,type:'article',...(post.coverImage?{images:[post.coverImage]}:{})}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const {post,unavailable}=await getPost(slug);
 const settings=await getPageContent('site-settings');const copy=(settings.experience as SiteSettings).journal;
 if(unavailable)return <div className="journal-page"><section className="jr-container jr-unavailable"><div className="jr-empty"><BookOpen size={38}/><h1>The journal is taking a short pause.</h1><p>We could not load this article right now. Please check back soon.</p><Link href="/blogs">Back to the journal</Link></div></section></div>;
 if(!post)notFound();
 const headings:{id:string;title:string}[]=[];
 const html=cleanHtml(String(post.content||'')).replace(/<(h[23])>([\s\S]*?)<\/\1>/gi,(match,tag:string,inner:string)=>{const id=`article-section-${headings.length+1}`;const title=inner.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&#39;/g,"'");headings.push({id,title});return `<${tag} id="${id}">${inner}</${tag}>`;});
 const minutes=Math.max(1,Math.ceil(html.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length/200));
 const date=new Date(post.publishedAt||post.createdAt);const dateText=Number.isNaN(date.getTime())?'':date.toLocaleDateString('en-IN',{dateStyle:'long',timeZone:'Asia/Kolkata'});
 return <article className="journal-page jr-article"><header className="jr-article-header"><div className="jr-container"><nav className="jr-breadcrumb" aria-label="Breadcrumb"><Link href="/blogs">The journal</Link><span>/</span><span>{post.category}</span></nav><span className="jr-eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="jr-byline"><span className="jr-author-avatar">{String(post.author||'D').slice(0,1).toUpperCase()}</span><strong>{post.author||'Digitonix Academy'}</strong>{dateText&&<span><CalendarDays size={15}/><time dateTime={date.toISOString()}>{dateText}</time></span>}<span><Clock3 size={15}/>{minutes} min read</span></div></div></header>
 {post.coverImage&&<div className="jr-container jr-article-cover"><img src={post.coverImage} alt={post.title}/></div>}
 <div className="jr-container jr-reading-layout"><ArticleNavigation headings={headings}/><div><div id="journal-content" className="jr-prose" dangerouslySetInnerHTML={{__html:html}}/><div className="jr-article-end"><span>{copy.detailEyebrow}</span><h2>{copy.detailHeading}</h2><p>{copy.detailDescription}</p><div><Link href="/courses">{copy.detailCoursesLabel}</Link><Link href="/blogs">{copy.detailMoreLabel}</Link></div></div></div></div>
 </article>;
}
