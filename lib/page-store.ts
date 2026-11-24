import 'server-only';
import { readFile, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import path from 'node:path';
import { BlobPreconditionFailedError } from '@vercel/blob';
import { deleteBlob, listBlobPaths, overwriteBlob, readBlob, requireWritableStorage, usesBlobStorage, writeBlob } from './storage-backend';
import { exclusiveFileWrite } from './json-store';
import type { ContentPage } from './content-schema';

const directory = path.join(process.cwd(), 'content', 'pages');
const prefix = 'academy/pages/';
const keyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const revision = (raw: string) => createHash('sha256').update(raw).digest('hex');
const serialized = (content: ContentPage) => JSON.stringify(content, null, 2) + '\n';
const blobPath = (key: string) => `${prefix}${key}.json`;

function pagePath(key: string) {
  if (!keyPattern.test(key) || key.length > 120) throw new Error('Invalid page key');
  return path.join(directory, `${key}.json`);
}
async function bundledPage(key: string) {
  try {
    const file = pagePath(key);
    const raw = await readFile(file, 'utf8');
    return { content: JSON.parse(raw.replace(/^\uFEFF/, '')) as ContentPage, revision: revision(raw), updatedAt: (await stat(file)).mtime.toISOString() };
  } catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null; throw error; }
}
async function blobPage(key: string) {
  const stored = await readBlob(blobPath(key));
  if (!stored) return null;
  const value = JSON.parse(stored.data.toString('utf8')) as { content: ContentPage; updatedAt: string };
  return { content: value.content, revision: revision(serialized(value.content)), updatedAt: value.updatedAt, etag: stored.etag };
}
export async function readManagedPage(key: string) {
  pagePath(key);
  if (usesBlobStorage()) {
    const stored = await blobPage(key);
    if (stored) return stored;
  }
  return bundledPage(key);
}
export async function managedPageKeys(startsWith = '') {
  const bundled = (await readdir(directory)).filter(file => file.endsWith('.json') && file.startsWith(startsWith)).map(file => file.slice(0, -5));
  if (!usesBlobStorage()) return bundled;
  const stored = (await listBlobPaths(prefix + startsWith)).filter(file => file.startsWith(prefix) && file.endsWith('.json')).map(file => file.slice(prefix.length, -5)).filter(key => keyPattern.test(key));
  return Array.from(new Set([...bundled, ...stored])).sort();
}
export async function saveManagedPage(key: string, content: ContentPage, expectedRevision: string | undefined, create: boolean) {
  requireWritableStorage();
  const target = pagePath(key);
  const next = serialized(content);
  const nextRevision = revision(next);
  if (usesBlobStorage()) {
    const current = await blobPage(key);
    const previous = current || await bundledPage(key);
    if (create ? previous !== null : previous === null) throw new Error(create ? 'DUPLICATE' : 'NOT_FOUND');
    if (!create && previous?.revision !== expectedRevision) throw new Error('CONFLICT');
    const document = JSON.stringify({ content, updatedAt: new Date().toISOString() });
    try { await writeBlob(blobPath(key), document, current?.etag); }
    catch (error) { if (error instanceof BlobPreconditionFailedError) throw new Error('CONFLICT'); if (error instanceof Error && (error.name === 'BlobAlreadyExistsError' || /already exists/i.test(error.message))) throw new Error(create ? 'DUPLICATE' : 'CONFLICT'); throw error; }
    return nextRevision;
  }
  return exclusiveFileWrite(async () => {
    const previous = await bundledPage(key);
    if (create ? previous !== null : previous === null) throw new Error(create ? 'DUPLICATE' : 'NOT_FOUND');
    if (!create && previous?.revision !== expectedRevision) throw new Error('CONFLICT');
    const temp = `${target}.${randomUUID()}.tmp`;
    try { await writeFile(temp, next, 'utf8'); await rename(temp, target); }
    finally { await unlink(temp).catch(() => {}); }
    return nextRevision;
  });
}
export async function deleteManagedPage(key: string) {
  requireWritableStorage();
  pagePath(key);
  if (usesBlobStorage()) {
    if (await bundledPage(key)) throw new Error('PROTECTED');
    if (!await blobPage(key)) throw new Error('NOT_FOUND');
    await deleteBlob(blobPath(key));
    return;
  }
  await exclusiveFileWrite(async () => { await unlink(pagePath(key)); });
}
export async function restoreManagedPages(pages: readonly (readonly [string, ContentPage])[]) {
  requireWritableStorage();
  if (usesBlobStorage()) {
    for (const [key, content] of pages) { pagePath(key); await overwriteBlob(blobPath(key), JSON.stringify({ content, updatedAt: new Date().toISOString() })); }
    return;
  }
  await exclusiveFileWrite(async () => {
    for (const [key, content] of pages) {
      const target = pagePath(key); const temp = `${target}.${randomUUID()}.tmp`;
      try { await writeFile(temp, serialized(content), 'utf8'); await rename(temp, target); }
      finally { await unlink(temp).catch(() => {}); }
    }
  });
}
