import { requireAdmin } from '@/lib/admin';
import { Manager } from '@/components/admin/manager';
import { notFound } from 'next/navigation';
export default async function Page({params}:{params:Promise<{resource:string}>}){await requireAdmin();const {resource}=await params;if(!['blogs','leads','pages'].includes(resource))notFound();return <Manager resource={resource}/>;}
