import { z } from 'zod';

export const textInput = z.object({ text: z.string().trim().min(30).max(10000) });
export const humanizeInput = textInput.extend({
  readability: z.enum(['High School', 'College', 'Academic']).default('High School'),
  purpose: z.enum(['General Writing', 'Marketing', 'Academic']).default('General Writing'),
  strength: z.enum(['Balanced', 'Light', 'Strong']).default('Balanced'),
});

type UpstreamResult = { success?: boolean; data?: Record<string, unknown>; message?: string };

const usage = new Map<string, { count: number; expires: number }>();
export function allowAiRequest(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  if (usage.size > 5000) usage.forEach((value, key) => { if (value.expires < now) usage.delete(key); });
  const current = usage.get(ip);
  if (!current || current.expires < now) { usage.set(ip, { count: 1, expires: now + 60_000 }); return true; }
  if (current.count >= 10) return false;
  current.count += 1;
  return true;
}

let loginToken: string | null = null;
let loginPromise: Promise<string> | null = null;

export function hasZeroGptCredentials() {
  return Boolean(process.env.ZERO_GPT_API_TOKEN || (process.env.ZERO_GPT_EMAIL && process.env.ZERO_GPT_PASSWORD));
}

async function login() {
  const email = process.env.ZERO_GPT_EMAIL;
  const password = process.env.ZERO_GPT_PASSWORD;
  if (!email || !password) throw new Error('ZeroGPT business API credentials are not configured.');
  const response = await fetch('https://api.zerogpt.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
    signal: AbortSignal.timeout(15000),
    cache: 'no-store',
  });
  const result = await response.json().catch(() => null) as UpstreamResult | null;
  const token = result?.data?.token;
  if (!response.ok || result?.success !== true || typeof token !== 'string' || !token) {
    throw new Error('ZeroGPT business API login failed. Check the configured account and plan.');
  }
  loginToken = token;
  return token;
}

export async function getZeroGptToken(refresh = false) {
  const configured = process.env.ZERO_GPT_API_TOKEN;
  if (configured) return configured;
  if (refresh) loginToken = null;
  if (loginToken) return loginToken;
  if (!loginPromise) loginPromise = login().finally(() => { loginPromise = null; });
  return loginPromise;
}

export async function callZeroGpt(path: string, payload: Record<string, unknown>, token?: string) {
  const url = new URL(path, 'https://api.zerogpt.com');
  if (url.origin !== 'https://api.zerogpt.com') throw new Error('Invalid ZeroGPT API URL.');
  const send = (bearer: string) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${bearer}` },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(25000), cache: 'no-store',
  });
  let response = await send(token || await getZeroGptToken());
  if (response.status === 401 && !token && !process.env.ZERO_GPT_API_TOKEN && process.env.ZERO_GPT_EMAIL && process.env.ZERO_GPT_PASSWORD) {
    response = await send(await getZeroGptToken(true));
  }
  const result = await response.json().catch(() => null) as UpstreamResult | null;
  if (!response.ok || !result?.success || !result.data) {
    throw new Error(response.status === 401 || response.status === 403 ? 'ZeroGPT rejected the configured credentials.' : 'The text service is unavailable. Please try again later.');
  }
  return result.data;
}

export async function parseTextRequest(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 15000) return null;
  try { return await request.json() as unknown; } catch { return null; }
}
