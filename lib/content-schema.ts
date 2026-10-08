import { z } from 'zod';

export const safeHref = z.string().refine(value => /^\/(?!\/)/.test(value) || /^(https:\/\/|mailto:|tel:|#)/.test(value), 'Use a local path, HTTPS URL, mailto, tel or anchor');
const button = z.object({ label: z.string(), href: safeHref });
const card = z.object({ title: z.string(), description: z.string().optional(), eyebrow: z.string().optional(), detail: z.string().optional(), features: z.array(z.string()).optional(), highlight: z.boolean().optional(), href: safeHref.optional(), linkLabel: z.string().optional() });
const moduleSchema = z.object({ title: z.string(), category: z.string(), items: z.array(z.object({ name: z.string(), desc: z.string() })) });
export const formSchema = z.object({ heading:z.string(), description:z.string(),nameLabel:z.string(),emailLabel:z.string(),phoneLabel:z.string(),programLabel:z.string(),messageLabel:z.string(),submitLabel:z.string(),helpText:z.string(),readyHeading:z.string(),readyDescription:z.string(),draftLabel:z.string(),backLabel:z.string(),emailSubject:z.string(),email:z.string().email(),programs:z.array(z.string()),programPlaceholder:z.string() });
const base = { id: z.string().regex(/^[a-z][a-z0-9-]*$/), enabled: z.boolean().optional(), heading:z.string().optional(), description:z.string().optional(), eyebrow:z.string().optional() };
export const sectionSchema = z.discriminatedUnion('type', [
  z.object({...base,type:z.literal('resource-library'),searchPlaceholder:z.string(),emptyMessage:z.string(),allLabel:z.string(),items:z.array(z.object({title:z.string(),description:z.string(),category:z.string(),format:z.string(),href:safeHref,linkLabel:z.string(),download:z.boolean().optional()}))}),
  z.object({...base,type:z.literal('latest-blogs'),limit:z.number().int().min(1).max(12).default(3),emptyMessage:z.string(),unavailableMessage:z.string(),linkLabel:z.string(),allLabel:z.string()}),
  z.object({...base,type:z.literal('hero'),heading:z.string(),buttons:z.array(button).default([])}),
  z.object({...base,type:z.literal('cta'),heading:z.string(),buttons:z.array(button)}),
  z.object({...base,type:z.literal('cards'),items:z.array(card)}),
  z.object({...base,type:z.literal('modules'),items:z.array(moduleSchema)}),
  z.object({...base,type:z.literal('features'),items:z.array(z.string())}),
  z.object({...base,type:z.literal('stats'),items:z.array(z.object({value:z.number(),suffix:z.string(),label:z.string()}))}),
  z.object({...base,type:z.literal('testimonials'),items:z.array(z.object({name:z.string(),text:z.string(),role:z.string(),rating:z.number().min(0).max(5)}))}),
  z.object({...base,type:z.literal('faq'),items:z.array(z.object({question:z.string(),answer:z.string()}))}),
  z.object({...base,type:z.literal('contact'),heading:z.string(),contacts:z.array(z.object({label:z.string(),value:z.string(),href:safeHref.optional()})),buttons:z.array(button),form:formSchema}),
]);
export const pageSchema = z.object({version:z.literal(1),metadata:z.object({title:z.string(),description:z.string(),keywords:z.array(z.string()).optional(),canonical:safeHref.optional(),noIndex:z.boolean().optional()}),sections:z.array(sectionSchema)}).superRefine((page,context)=>{const ids=new Set<string>();page.sections.forEach((section,index)=>{if(ids.has(section.id))context.addIssue({code:z.ZodIssueCode.custom,path:['sections',index,'id'],message:'Section IDs must be unique'});ids.add(section.id);});});
export type ContentPage = z.infer<typeof pageSchema>;
export type ContentSection = z.infer<typeof sectionSchema>;
export type ContactFormContent = z.infer<typeof formSchema>;
