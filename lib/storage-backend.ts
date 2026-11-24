import 'server-only';
import { del, get, list, put } from '@vercel/blob';

export function usesBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function requireWritableStorage() {
  if (process.env.VERCEL && !usesBlobStorage()) {
    throw new Error('Persistent storage is not configured. Connect a private Vercel Blob store and set BLOB_READ_WRITE_TOKEN, then redeploy.');
  }
}

export async function readBlob(pathname: string): Promise<{ data: Buffer; etag: string } | null> {
  const result = await get(pathname, { access: 'private', useCache: false });
  if (!result?.stream) return null;
  return { data: Buffer.from(await new Response(result.stream).arrayBuffer()), etag: result.blob.etag };
}

export async function writeBlob(pathname: string, data: Buffer | string, etag?: string) {
  return put(pathname, data, { access: 'private', contentType: pathname.endsWith('.json') ? 'application/json' : 'image/webp', ...(etag ? { allowOverwrite: true, ifMatch: etag } : {}) });
}

export async function overwriteBlob(pathname: string, data: Buffer | string) {
  return put(pathname, data, { access: 'private', allowOverwrite: true, contentType: pathname.endsWith('.json') ? 'application/json' : 'image/webp' });
}

export async function deleteBlob(pathname: string) {
  await del(pathname);
}

export async function listBlobPaths(prefix: string) {
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    paths.push(...page.blobs.map(blob => blob.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return paths;
}
