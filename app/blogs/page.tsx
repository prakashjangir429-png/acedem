import { publishedBlogs } from '@/lib/blogs';
import { BlogLibrary, type JournalPost } from '@/components/content/blog-library';
import './journal.css';
export const dynamic='force-dynamic';
export const metadata={title:'Insights & Stories | Digitonix Academy',description:'Explore practical perspectives on marketing, AI, creative work and career preparation.'};
export default async function Page(){
 let posts:JournalPost[]=[];let unavailable=false;
 try{posts=(await publishedBlogs()).map(post=>{const date=new Date(post.publishedAt||post.createdAt);return {id:post._id.toString(),slug:post.slug,title:post.title,excerpt:post.excerpt||'',category:post.category||'Insights',author:post.author||'Digitonix Academy',coverImage:post.coverImage||'',date:Number.isNaN(date.getTime())?'':date.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'}),readingMinutes:Math.max(1,Math.ceil(String(post.content||'').replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length/200))};});}catch{unavailable=true;}
 return <div className="journal-page"><BlogLibrary posts={posts} unavailable={unavailable}/></div>;
}
