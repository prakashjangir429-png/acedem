export type HomeExperience = {
  heroImage:string;heroImageAlt:string;visitPhone:string;visitPhoneHref:string;visitEmailHref:string;
  paths: {number:string;tag:string;title:string;duration:string;description:string;points:string[];href:string}[];
  modules: {name:string;detail:string}[];
  faqs: {q:string;a:string}[];
  comparison: {label:string;values:boolean[]}[];
  methodSteps: {title:string;copy:string}[];
  services: {title:string;copy:string;href:string}[];
  copy: Record<string,Record<string,string>>;
  links: Record<string,Record<string,string>>;
};
