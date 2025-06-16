'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import { useScrollAnimation, useCardAnimation } from '../../hooks/useScrollAnimation';
import { projectsData, ProjectItem as Project } from '../../data/projects';

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const { cardRef } = useCardAnimation();
  
  return (
    <div
      ref={cardRef}
      className="group relative mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:border-red-500/30 min-h-[320px] sm:h-96 cursor-pointer flex flex-col card-hover touch-button focus-ring overflow-hidden"
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
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-200 ease-primary leading-5 sm:leading-6">
            {project.title}
          </h3>
        </div>
        
        {/* Project Description - Mobile-optimized */}
        <div className="flex-grow mb-3 sm:mb-4">
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200 ease-primary line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>
        </div>
        
        {/* Technologies - Mobile-first grid */}
        <div className="flex items-center">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.technologies.slice(0, 6).map((tech, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-md bg-gray-800/60 text-gray-300 border border-gray-700/50 whitespace-nowrap transition-all duration-200 ease-primary group-hover:bg-gray-700/60 group-hover:text-gray-200 group-hover:border-gray-600/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-md bg-gray-700/60 text-gray-400 border border-gray-600/50">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Mobile-optimized */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-200 ease-primary relative z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm">
          <FaExternalLinkAlt className="w-3 h-3 text-red-400 transition-transform duration-200 group-hover:translate-x-1" />
          <span className="transition-colors duration-200 group-hover:text-red-400">View Details</span>
        </div>
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-full bg-gray-800/60 hover:bg-gray-700 text-gray-200 transition-all duration-200 ease-primary border border-gray-700/50 touch-button hover:scale-110 focus-ring"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        )}
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary pointer-events-none" />
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 100,
    animationClass: 'animate-slide-up'
  });

  const categories = ['All', ...Array.from(new Set(projectsData.map((project) => project.category)))];
  
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Calculate projects per view - mobile-first
  const getProjectsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile: 1 project
      if (window.innerWidth < 1024) return 2; // Tablet: 2 projects
      return 3; // Desktop: 3 projects
    }
    return 1;
  };

  const [projectsPerView, setProjectsPerView] = useState(getProjectsPerView());
  
  useEffect(() => {
    const handleResize = () => {
      setProjectsPerView(getProjectsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Simple scroll functions - updated for proper page navigation
  const scrollToProject = (index: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.scrollWidth / filteredProjects.length;
    const scrollPosition = index * cardWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const scrollLeft = () => {
    let newIndex;
    if (projectsPerView === 1) {
      // Mobile: move one project at a time
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    } else {
      // Desktop: move by page (projectsPerView)
      newIndex = Math.max(0, currentIndex - projectsPerView);
    }
    setCurrentIndex(newIndex);
    scrollToProject(newIndex);
  };

  const scrollRight = () => {
    let newIndex;
    if (projectsPerView === 1) {
      // Mobile: move one project at a time
      newIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    } else {
      // Desktop: move by page (projectsPerView)
      const maxIndex = filteredProjects.length - projectsPerView;
      newIndex = Math.min(maxIndex, currentIndex + projectsPerView);
    }
    setCurrentIndex(newIndex);
    scrollToProject(newIndex);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };
  // Handle manual scroll to update current index
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.scrollWidth / filteredProjects.length;
    const scrollLeft = container.scrollLeft;
    let newIndex = Math.round(scrollLeft / cardWidth);
    
    // For desktop, snap to page boundaries
    if (projectsPerView > 1) {
      newIndex = Math.floor(newIndex / projectsPerView) * projectsPerView;
    }
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredProjects.length) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section 
      id="projects" 
      className="py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="mobile-container sm:container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-2 sm:mb-4 md:mb-6 opacity-100 animate-in">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 animate-hero-title">
              Recent Projects
            </h2>
            {/* Full-width decorative underline */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
          </div>
          <p className="hidden sm:block text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 animate-hero-subtitle">
            Infrastructure solutions, automation pipelines, and DevOps implementations
          </p>
          
          {/* Mobile-first category filters */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 mb-2 sm:mb-4 md:mb-6 mt-4 sm:mt-6">
            <div className="flex gap-2 sm:gap-3 px-4 sm:px-0 sm:justify-center min-w-max sm:min-w-0">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium touch-button focus-ring transition-all duration-200 ease-primary whitespace-nowrap
                    ${selectedCategory === category 
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

        {/* Projects Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-4 lg:gap-6 pb-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >            {filteredProjects.map((project, index) => (
              <div 
                key={project.title} 
                className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-80 xl:w-96 snap-start"
              >
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </div>
            ))}
          </div>          {/* Navigation Controls */}
          {filteredProjects.length > 1 && (
            <div className="flex items-center justify-center mt-2 sm:mt-2 lg:mt-2 gap-6"><button
                onClick={scrollLeft}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center transition-all duration-200 touch-button hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 focus-ring"
                aria-label="Previous project"
              >
                <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              <button
                onClick={scrollRight}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center transition-all duration-200 touch-button hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 focus-ring"
                aria-label="Next project"
              >
                <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;