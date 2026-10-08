import 'server-only';
import { cookies } from 'next/headers';
import { createHash, createHmac, timingSafeEqual, scryptSync } from 'node:crypto';
import { redirect } from 'next/navigation';
export const sessionCookie='academy_admin';
function secret(){const s=process.env.SESSION_SECRET;if(!s||s.length<32)throw new Error('Configure SESSION_SECRET (at least 32 characters)');return s;}
const credentialVersion=()=>createHash('sha256').update(process.env.ADMIN_PASSWORD_HASH||'').digest('hex');
export function signSession(){const value=Buffer.from(JSON.stringify({email:process.env.ADMIN_EMAIL,expires:Date.now()+28800000,version:credentialVersion()})).toString('base64url');return value+'.'+createHmac('sha256',secret()).update(value).digest('base64url');}
export async function isAdmin(){try{const token=(await cookies()).get(sessionCookie)?.value;if(!token)return false;const [value,signature]=token.split('.');const expected=createHmac('sha256',secret()).update(value).digest('base64url');if(!signature||signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return false;const payload=JSON.parse(Buffer.from(value,'base64url').toString());return payload.expires>Date.now()&&payload.email===process.env.ADMIN_EMAIL&&payload.version===credentialVersion();}catch{return false;}}
export async function requireAdmin(){if(!await isAdmin())redirect('/admin/login');}
export function passwordMatches(email:string,password:string){const stored=process.env.ADMIN_PASSWORD_HASH;if(!stored||email!==process.env.ADMIN_EMAIL)return false;const [salt,hash]=stored.split(':');if(!salt||!hash)return false;const actual=scryptSync(password,salt,64).toString('hex');return hash.length===actual.length&&timingSafeEqual(Buffer.from(hash),Buffer.from(actual));}
export function sameOrigin(request:Request){try{const origin=new URL(request.headers.get('origin')||'');const url=new URL(request.url);return origin.host===(request.headers.get('host')||url.host)&&origin.protocol===url.protocol;}catch{return false;}}
