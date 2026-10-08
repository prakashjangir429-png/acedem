import { curriculumModules } from './data';

const personality = {
  title: 'Personality Development & Communication', category: 'Professional Development', icon: 'Users',
  items: [
    { name: 'Personality Development', desc: 'Develop professional confidence and workplace readiness.' },
    { name: 'Communication & Presentation', desc: 'Practice communicating ideas and presenting your work.' },
    { name: 'Interview Preparation', desc: 'Prepare to discuss your skills, projects and career goals.' },
  ],
};
const creative = {
  title: 'Graphic Design & Video Editing', category: 'Creative Media', icon: 'PenTool',
  items: [
    { name: 'Graphic Design', desc: 'Build graphic design skills alongside your marketing training.' },
    { name: 'Video Editing', desc: 'Learn video editing with industry tools.' },
    { name: 'Creative Portfolio', desc: 'Bring your marketing and creative work together in a portfolio.' },
  ],
};

export function getCourseCurriculum(slug: string) {
  const additions = slug === 'professional-ai-digital-marketing' ? [personality]
    : slug === 'master-ai-digital-marketing-creative' ? [creative]
    : slug === 'diploma-ai-digital-marketing' ? [personality, creative] : [];
  return { foundation: curriculumModules, additions };
}
