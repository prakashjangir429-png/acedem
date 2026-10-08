import { programs } from './data';

const details = [
  { slug: 'advanced-ai-digital-marketing', shortName: 'Advanced', audience: 'Build your foundation in AI and digital marketing.', focus: 'Campaigns, content, analytics and AI workflows', extras: ['SEO & content strategy', 'Social media & paid advertising', 'Marketing analytics', 'AI tools & workflows'] },
  { slug: 'professional-ai-digital-marketing', shortName: 'Professional', audience: 'Develop marketing skills and strengthen your professional presence.', focus: 'Digital marketing + personality development', extras: ['Advanced marketing curriculum', 'Communication & presentation', 'Personality development', 'Interview preparation'] },
  { slug: 'master-ai-digital-marketing-creative', shortName: 'Master', audience: 'Combine marketing strategy with hands-on creative production.', focus: 'Digital marketing + graphic design & video editing', extras: ['Advanced marketing curriculum', 'Graphic design', 'Video editing', 'Marketing & creative portfolio'] },
  { slug: 'diploma-ai-digital-marketing', shortName: 'Diploma', audience: 'Follow a complete path across marketing, communication and creative skills.', focus: 'Marketing + personality development + creative media', extras: ['Advanced marketing curriculum', 'Personality development', 'Graphic design & video editing', 'Career & portfolio preparation'] },
];

export const courseCatalog = programs.map((program, index) => ({ ...program, ...details[index] }));
