export type SiteSettings = {
  programLinks?: {title:string;description:string;href:string}[];
  navigation: {
    links:{label:string;href:string}[];
    phone:string;phoneHref:string;actionLabel:string;actionHref:string;
    coursesMenu:{eyebrow:string;heading:string;highlight:string;description:string;actionLabel:string};
    servicesMenu:{eyebrow:string;heading:string;highlight:string;description:string;actionLabel:string};
    serviceLinks:{title:string;description:string;href:string}[];
  };
  footer: {
    eyebrow:string;heading:string;highlight:string;description:string;actionLabel:string;actionHref:string;
    brandDescription:string;tagline:string;exploreHeading:string;exploreLinks:{label:string;href:string}[];
    programsHeading:string;contactHeading:string;addressLabel:string;address:string;phoneLabel:string;
    phone:string;phoneHref:string;emailLabel:string;email:string;emailHref:string;
    copyright:string;copyrightSuffix:string;closing:string;location:string;
  };
  journal: Record<string,string>;
};
