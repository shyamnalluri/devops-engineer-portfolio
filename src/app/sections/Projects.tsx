'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScrollAnimation, useCardAnimation } from '../../hooks/useScrollAnimation';
import { projectsData, ProjectItem as Project } from '../../data/projects';

const ProjectModal = dynamic(() => import('../components/ProjectModal'), { ssr: false });
const useUnderline = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const compute = () => setW(Math.floor(el.getBoundingClientRect().width * 0.8));
    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);
  return { textRef, w } as const;
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const { cardRef } = useCardAnimation();

  return (
    <div
      ref={cardRef}
      className="group relative mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:border-red-500/30 h-[320px] sm:h-[340px] cursor-pointer flex flex-col card-hover touch-button focus-ring focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black overflow-hidden"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary rounded-xl sm:rounded-2xl" />

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 relative z-10">
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium transition-all duration-200 group-hover:bg-red-500/30 group-hover:text-red-300">
          {project.category}
        </span>
      </div>

      {/* Content Area - Mobile-first space distribution */}
      <div className="flex-grow flex flex-col mb-3 sm:mb-4 relative z-10">
        {/* Project Title - Mobile-responsive */}
        <div className="mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-200 ease-primary leading-5 sm:leading-6 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Project Description - Mobile-optimized */}
        <div className="flex-grow mb-3 sm:mb-4">
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200 ease-primary line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Technologies - Mobile-first grid (strict 2-line clamp) */}
        <div className="flex items-center">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 w-full min-h-11 max-h-11 sm:min-h-14 sm:max-h-14 overflow-hidden">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-md bg-gray-800/60 text-gray-300 border border-gray-700/50 whitespace-nowrap transition-all duration-200 ease-primary group-hover:bg-gray-700/60 group-hover:text-gray-200 group-hover:border-gray-600/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-md bg-gray-700/60 text-gray-400 border border-gray-600/50">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Mobile-optimized */}
      <div className="mt-auto flex items-center justify-start pt-3 sm:pt-4 border-t border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-200 ease-primary relative z-10">
        <div
          className="flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm"
          aria-hidden="true"
        >
          <svg
            className="w-3 h-3 text-red-400 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span className="transition-colors duration-150 group-hover:text-red-400">
            View Details
          </span>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary pointer-events-none" />
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 100,
    animationClass: 'animate-slide-up',
  });

  const categories = [
    'All',
    ...Array.from(new Set(projectsData.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  // Scroll container sizing refs/state
  const gridRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Determine columns based on viewport width
  const getColumns = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 640) return 2; // sm/md
      return 1; // xs
    }
    return 1;
  };

  const [columns, setColumns] = useState<number>(getColumns());
  const underline = useUnderline();

  useEffect(() => {
    const onResize = () => setColumns(getColumns());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setTimeout(() => {
      const dialog = document.querySelector('[role="dialog"]') as HTMLElement | null;
      dialog?.focus?.();
    }, 50);
  };

  // Compute container height so first 4 tiles are fully visible and next 4 are half visible
  useEffect(() => {
    const computeHeight = () => {
      const gridEl = gridRef.current;
      if (!gridEl) return;
      const items = Array.from(gridEl.querySelectorAll('[data-card]')) as HTMLElement[];
      if (items.length === 0) return;

      const first = items[0];
      const firstTop = first.offsetTop;

      // Distance between start of first row and second row
      let rowOffset: number | null = null;
      if (items.length > columns) {
        const secondRowFirst = items[columns];
        rowOffset = secondRowFirst.offsetTop - firstTop;
      }

      const firstHeight = first.getBoundingClientRect().height;
      const verticalGapEstimate = 20; // matches gap-5 ~ 20px
      const effectiveRow = rowOffset ?? firstHeight + verticalGapEstimate;

      // Visible rows = 4 fully visible items + 1/2 row for the next 4 items
      const visibleRows = 4 / columns + 0.5;
      const desiredHeight = Math.max(firstHeight, Math.floor(effectiveRow * visibleRows));

      setContainerHeight(desiredHeight);
    };

    // Compute after layout settles
    const rId = window.requestAnimationFrame(() => {
      computeHeight();
      // Safety recompute after fonts/images settle
      setTimeout(computeHeight, 100);
      setTimeout(computeHeight, 300);
    });

    window.addEventListener('resize', computeHeight);
    return () => {
      window.cancelAnimationFrame(rId);
      window.removeEventListener('resize', computeHeight);
    };
  }, [columns, selectedCategory, filteredProjects.length]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      ref={sectionRef}
      role="region"
      aria-label="Recent projects and case studies"
    >
      <div className="section-wrap relative z-10 will-change-transform">
        {/* Section Header */}
        <div className="section-header opacity-100 animate-in will-change-transform">
          <h2 className="section-title">
            <span ref={underline.textRef} className="inline-block">
              Recent Projects
            </span>
          </h2>
          <div
            className="mx-auto mt-1 md:mt-2 h-0.5 w-56 sm:w-64 md:w-72 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded"
            style={underline.w ? { width: `${underline.w}px` } : undefined}
          />
          <p className="section-subtitle">
            Infrastructure solutions, automation pipelines, and DevOps implementations
          </p>

          {/* Mobile-first category filters */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 mb-2 mt-2">
            <div className="flex gap-2 sm:gap-3 px-4 sm:px-0 sm:justify-center min-w-max sm:min-w-0">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium touch-button focus-ring transition-all duration-200 ease-primary whitespace-nowrap
                    ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Tall Container with internal vertical scroll */}
        <div className="relative max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: containerHeight ? `${containerHeight}px` : undefined }}
            role="region"
            aria-label="Scrollable projects list"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                data-card
                className="stagger-animation"
                style={{ '--stagger-delay': `${index * 80}ms` } as React.CSSProperties}
              >
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
