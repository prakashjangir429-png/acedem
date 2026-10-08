import { requireAdmin } from '@/lib/admin';
import { Editor } from '@/components/admin/editor';
import { notFound } from 'next/navigation';
export default async function Page({params}:{params:Promise<{resource:string,id:string}>}){await requireAdmin();const {resource,id}=await params;if(!['blogs','pages'].includes(resource))notFound();return <Editor resource={resource} id={id}/>;}
