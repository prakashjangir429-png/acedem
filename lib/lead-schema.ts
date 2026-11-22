import { z } from 'zod';
const localPath=z.string().max(500).regex(/^\/(?!\/)/);
export const leadSchema=z.object({name:z.string().trim().min(2).max(150),email:z.string().email().max(150),phone:z.string().min(5).max(40),program:z.string().max(200).default(''),message:z.string().max(2000).default(''),sourcePage:localPath.default('/contact'),landingPage:localPath.default('/contact'),currentPage:localPath.default('/contact'),website:z.string().max(0).optional()});
export const adminLeadSchema=leadSchema.omit({website:true}).extend({status:z.enum(['new','contacted','qualified','closed']).default('new'),notes:z.string().max(4000).default('')});
