import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin, sameOrigin } from '@/lib/admin';
import { getContentKeys } from '@/lib/content';
import { readManagedPage, restoreManagedPages } from '@/lib/page-store';
import { pageSchema } from '@/lib/content-schema';
import { validateExperience, validateHomeSections } from '@/lib/experience-schema';
import { blogSchema, cleanHtml } from '@/lib/blogs';
import { adminLeadSchema } from '@/lib/lead-schema';
import { readRecords, exportStoredImages, restoreStoredImages, restoreRecords, type BlogRecord, type LeadRecord } from '@/lib/json-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const keyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imagePattern = /^\/api\/images\/([a-f0-9]{24})$/;

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  try {
    const pages = Object.fromEntries(await Promise.all((await getContentKeys()).map(async key => { const page = await readManagedPage(key);if (!page) throw new Error('NOT_FOUND');return [key, page.content]; })));
    const [blogs, leads, images] = await Promise.all([readRecords<BlogRecord>('blogs'), readRecords<LeadRecord>('leads'), exportStoredImages()]);
    const backup = { format: 'digitonix-content-backup', version: 1, createdAt: new Date().toISOString(), pages, blogs, leads, images };
    return new Response(JSON.stringify(backup, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': `attachment; filename="digitonix-content-${new Date().toISOString().slice(0, 10)}.json"`, 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Unable to export the content backup.' }, { status: 503 }); }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 30_000_000) return NextResponse.json({ error: 'The backup is too large.' }, { status: 413 });
    const backup = JSON.parse(raw);
    if (backup?.format !== 'digitonix-content-backup' || backup.version !== 1 || !backup.pages || typeof backup.pages !== 'object' || Array.isArray(backup.pages) || !Array.isArray(backup.blogs) || !Array.isArray(backup.leads) || !backup.images || typeof backup.images !== 'object') return NextResponse.json({ error: 'This is not a Digitonix content backup.' }, { status: 400 });
    const pageEntries = Object.entries(backup.pages as Record<string, unknown>);
    if (pageEntries.length > 150 || backup.blogs.length > 5000 || backup.leads.length > 20000) return NextResponse.json({ error: 'The backup exceeds the supported record limit.' }, { status: 400 });
    const pages = pageEntries.map(([key, value]) => {
      if (!keyPattern.test(key) || key.length > 120) throw new Error(`Invalid page key: ${key}`);
      const page = pageSchema.parse(value);validateExperience(key, page.experience);if (key === 'home') validateHomeSections(page.sections);
      return [key, page] as const;
    });
    if (!pages.some(([key]) => key === 'home') || !pages.some(([key]) => key === 'site-settings')) throw new Error('The backup must include the homepage and site settings.');
    const blogs: BlogRecord[] = backup.blogs.map((value: BlogRecord) => {
      if (!/^[a-f0-9]{24}$/.test(value?._id || '')) throw new Error('A blog record has an invalid ID.');
      return { ...blogSchema.parse(value), _id: value._id, createdAt: value.createdAt, updatedAt: value.updatedAt, publishedAt: value.publishedAt, content: cleanHtml(value.content) };
    });
    const leads: LeadRecord[] = backup.leads.map((value: LeadRecord) => {
      if (!/^[a-f0-9]{24}$/.test(value?._id || '')) throw new Error('A lead record has an invalid ID.');
      return { ...adminLeadSchema.parse(value), _id: value._id, createdAt: value.createdAt, updatedAt: value.updatedAt };
    });
    if (new Set(blogs.map(item => item._id)).size !== blogs.length || new Set(leads.map(item => item._id)).size !== leads.length) throw new Error('The backup contains duplicate record IDs.');
    const imageEntries = Object.entries(backup.images as Record<string, unknown>);
    if (imageEntries.length > 500) throw new Error('The backup contains too many images.');
    const images = imageEntries.map(([id, encoded]) => {
      if (!/^[a-f0-9]{24}$/.test(id) || typeof encoded !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) throw new Error('An image in the backup is invalid.');
      const bytes = Buffer.from(encoded, 'base64');
      if (bytes.length > 3_000_000 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error('An image in the backup is not a supported WebP file.');
      return [id, bytes] as const;
    });
    for (const blog of blogs) if (blog.coverImage.startsWith('/api/images/')) { const id = blog.coverImage.match(imagePattern)?.[1];if (id && !images.some(([imageId]) => imageId === id)) throw new Error(`Backup image ${id} is missing.`); }
    await restoreStoredImages(images);
    await restoreManagedPages(pages);
    await restoreRecords('blogs', blogs);
    await restoreRecords('leads', leads);
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true, pages: pages.length, blogs: blogs.length, leads: leads.length, images: images.length });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to restore the backup.' }, { status: error instanceof Error && error.message.startsWith('Persistent storage is not configured') ? 503 : 400 }); }
}
