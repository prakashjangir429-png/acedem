export type EditorialExperienceData = {
  breadcrumb:string;breadcrumbParent:string;heroChecks:string[];
  image:string;imageAlt:string;imageCaption:string;
  board:{toolbar:string;eyebrow:string;title:string;items:string[];footer:string}|null;
  jumpLabels:Record<string,string>;
  faq:{eyebrow:string;heading:string;highlight:string;description:string;actionLabel:string;actionHref:string};
};
