import type { ReactNode } from 'react';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="course-layout relative isolate overflow-hidden text-[#0f2a6b]">
      <div aria-hidden="true" className="academy-hero-grid pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
