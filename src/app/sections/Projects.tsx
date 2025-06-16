'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0); // Separate state for UI display to prevent flickering
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isReady, setIsReady] = useState(false);  const [isScrolling, setIsScrolling] = useState(false); // Prevent flickering during programmatic scrolling
  const [buttonPressed, setButtonPressed] = useState<'left' | 'right' | null>(null); // Track button press for immediate feedback
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Professional scroll animation hooks
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 100,
    animationClass: 'animate-slide-up'
  });
    // Set initial ready state when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => {
      clearTimeout(timer);
      // Cleanup scroll timeout on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
    const categories = ['All', ...Array.from(new Set(projectsData.map((project) => project.category)))];
  
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);
  // Create infinite scroll by duplicating projects
  const infiniteProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];
  const totalOriginalItems = filteredProjects.length;
  const startIndex = totalOriginalItems;  // Additional safety: Reset to first project when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setDisplayIndex(0); // Also reset display index
    setIsReady(false);
    setIsInitializing(true);
    // Give time for DOM to update before setting ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [selectedCategory]);
  // Calculate how many projects can fit in view (mobile-first approach)
  const getProjectsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 1; // Default to mobile
  };

  const [projectsPerView, setProjectsPerView] = useState(getProjectsPerView());
  useEffect(() => {
    const handleResize = () => {
      setProjectsPerView(getProjectsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);  // Enhanced touch gesture handlers for smooth mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      // Temporarily disable automatic scroll checking during touch
      setIsScrolling(true);
      
      // Clear any pending scroll timeout during touch
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || typeof window === 'undefined' || window.innerWidth >= 640) return;
    // Allow native scrolling behavior for smooth experience
    // Only prevent if we need to stop bounce effects
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      // Prevent overscroll at boundaries
      if ((scrollLeft <= 0 && e.touches[0].clientX > startX) || 
          (scrollLeft >= scrollWidth - clientWidth && e.touches[0].clientX < startX)) {
        e.preventDefault();
      }
    }
  };  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || typeof window === 'undefined' || window.innerWidth >= 640) return;
    
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50; // Minimum swipe distance

    // Only trigger programmatic scroll for significant swipes
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - next project
        scrollRight();
      } else {
        // Swipe right - previous project
        scrollLeft();
      }
    } else {
      // For small movements, re-enable scroll checking with a longer delay to ensure stability
      setTimeout(() => {
        setIsScrolling(false);
        
        // Update currentIndex based on final scroll position after touch with enhanced stability
        if (carouselRef.current && totalOriginalItems > 0) {
          const { scrollLeft, clientWidth } = carouselRef.current;
          const itemWidth = clientWidth / projectsPerView;
          const rawIndex = Math.round(scrollLeft / itemWidth);
          
          let displayIndex = rawIndex - totalOriginalItems;
          if (displayIndex < 0) displayIndex = totalOriginalItems - 1;
          if (displayIndex >= totalOriginalItems) displayIndex = 0;            // Only update if the position is stable and different
            if (displayIndex >= 0 && displayIndex < totalOriginalItems && displayIndex !== currentIndex) {
              // Verify position stability before updating
              setTimeout(() => {
                if (carouselRef.current) {
                  const { scrollLeft: finalScrollLeft } = carouselRef.current;
                  const finalRawIndex = Math.round(finalScrollLeft / itemWidth);
                  const finalDisplayIndex = finalRawIndex - totalOriginalItems;
                  
                  if (finalDisplayIndex === displayIndex) {
                    setCurrentIndex(displayIndex);
                    setDisplayIndex(displayIndex);
                  }
                }
              }, 100);
            }
        }
      }, 400); // Increased delay for better stability after touch
    }
  };// Initialize scroll position to middle set with improved stability
  useEffect(() => {
    if (carouselRef.current && isReady && totalOriginalItems > 0) {
      setIsInitializing(true);
      
      // Use double requestAnimationFrame for better DOM stability
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (carouselRef.current) {
            const containerWidth = carouselRef.current.clientWidth;
            const itemWidth = containerWidth / projectsPerView;
            const scrollPosition = startIndex * itemWidth;
            
            // Set scroll position without triggering scroll events
            carouselRef.current.style.scrollBehavior = 'auto';
            carouselRef.current.scrollLeft = scrollPosition;
            carouselRef.current.style.scrollBehavior = 'smooth';
              // Ensure currentIndex starts at 0
            setCurrentIndex(0);
            setDisplayIndex(0); // Also reset display index
            
            // Allow normal scroll checking after everything is properly settled
            setTimeout(() => {
              setIsInitializing(false);
            }, 400); // Increased timeout for better stability
          }
        });
      });
    }
  }, [selectedCategory, projectsPerView, startIndex, isReady, totalOriginalItems]);  // Enhanced scroll position checking with debouncing - only for infinite scroll wrapping
  const checkScrollPositionForWrapping = () => {
    // Don't update position during initialization, scrolling animation, touch dragging, or if not ready
    if (isInitializing || isScrolling || isDragging || !isReady || !carouselRef.current || totalOriginalItems === 0) return;
    
    const { scrollLeft, clientWidth } = carouselRef.current;
    const itemWidth = clientWidth / projectsPerView;
    const rawIndex = Math.round(scrollLeft / itemWidth);
    
    // Handle infinite scroll wrapping only when necessary
    if (rawIndex >= totalOriginalItems * 2) {
      // Jumped to end, wrap to beginning
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = totalOriginalItems * itemWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
        // Only update currentIndex if it's actually different
      if (currentIndex !== 0) {
        setCurrentIndex(0);
        setDisplayIndex(0);
      }
    } else if (rawIndex < totalOriginalItems) {
      // Jumped to beginning, wrap to end
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = (totalOriginalItems * 2 - 1) * itemWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
        // Only update currentIndex if it's actually different
      const lastIndex = totalOriginalItems - 1;
      if (currentIndex !== lastIndex) {
        setCurrentIndex(lastIndex);
        setDisplayIndex(lastIndex);
      }
    }
  };  // Enhanced scroll handler to prevent flickering during navigation
  const handleScroll = () => {    // Skip index updates during programmatic scrolling and initialization, but allow during natural touch scrolling
    if (isScrolling || isInitializing) return;
    
    // Only update currentIndex from natural user scrolling with additional stability checks
    if (carouselRef.current && totalOriginalItems > 0) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const itemWidth = clientWidth / projectsPerView;
      const rawIndex = Math.round(scrollLeft / itemWidth);
      
      // Calculate the display index for page counter
      let displayIndex = rawIndex - totalOriginalItems;
      if (displayIndex < 0) displayIndex = totalOriginalItems - 1;
      if (displayIndex >= totalOriginalItems) displayIndex = 0;
      
      // Extra validation: only update if position has stabilized
      const tolerance = 0.1; // Allow small scroll variations
      const expectedScrollPosition = (totalOriginalItems + displayIndex) * itemWidth;
      const scrollDifference = Math.abs(scrollLeft - expectedScrollPosition);
        // Only update if we have a valid, different index AND scroll position is stable
      if (displayIndex !== currentIndex && 
          displayIndex >= 0 && 
          displayIndex < totalOriginalItems &&
          scrollDifference < (itemWidth * tolerance)) {
        setCurrentIndex(displayIndex);
        // Update display index only after validation to prevent flickering
        setDisplayIndex(displayIndex);
      }
    }
    
    // Handle infinite scroll wrapping with debouncing
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      checkScrollPositionForWrapping();
    }, 200); // Slightly increased timeout for better stability
  };  const scrollToIndex = (index: number) => {
    if (carouselRef.current && totalOriginalItems > 0 && !isScrolling) {
      // Prevent multiple simultaneous scrolls
      setIsScrolling(true);
      
      const containerWidth = carouselRef.current.clientWidth;
      const itemWidth = containerWidth / projectsPerView;
      const scrollPosition = (startIndex + index) * itemWidth;
        // Update currentIndex immediately for instant UI feedback AND lock it
      setCurrentIndex(index);
      setDisplayIndex(index); // Update display index immediately for stable UI
      
      // Use smooth scroll with proper cleanup
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      // Clear scrolling flag with extended delay to prevent any premature scroll detection
      setTimeout(() => {
        // Verify the scroll actually reached the intended position
        if (carouselRef.current) {
          const { scrollLeft, clientWidth } = carouselRef.current;
          const itemWidth = clientWidth / projectsPerView;
          const finalRawIndex = Math.round(scrollLeft / itemWidth);
          const finalDisplayIndex = finalRawIndex - totalOriginalItems;
          
          // Ensure the final position matches our intention
          if (Math.abs(finalDisplayIndex - index) <= 1) {
            // Position is correct, safely clear scrolling flag
            setIsScrolling(false);
            
            // Double-check and correct the currentIndex if needed
            if (finalDisplayIndex >= 0 && finalDisplayIndex < totalOriginalItems && finalDisplayIndex !== index) {
              setCurrentIndex(finalDisplayIndex);
            }
          } else {
            // Position is off, try one more correction
            const correctedPosition = (startIndex + index) * itemWidth;
            carouselRef.current.scrollLeft = correctedPosition;
            setIsScrolling(false);
          }
        } else {
          // Fallback: just clear the flag
          setIsScrolling(false);
        }
      }, 1000); // Extended timeout to ensure scroll animation completes fully
    }
  };  const scrollLeft = () => {
    // Prevent rapid clicking and ensure stable state
    if (isScrolling || !isReady) return;
    
    // Provide immediate visual feedback
    setButtonPressed('left');
    setTimeout(() => setButtonPressed(null), 200);
    
    // Calculate current page and navigate to previous page with extra stability
    const currentPageIndex = Math.floor(currentIndex / projectsPerView);
    const totalPages = Math.ceil(totalOriginalItems / projectsPerView);
    const previousPageIndex = currentPageIndex > 0 ? currentPageIndex - 1 : totalPages - 1;
    const newIndex = Math.max(0, Math.min(previousPageIndex * projectsPerView, totalOriginalItems - 1));
    
    // Only proceed if the index is actually different
    if (newIndex !== currentIndex) {
      scrollToIndex(newIndex);
    }
  };

  const scrollRight = () => {
    // Prevent rapid clicking and ensure stable state
    if (isScrolling || !isReady) return;
    
    // Provide immediate visual feedback
    setButtonPressed('right');
    setTimeout(() => setButtonPressed(null), 200);
    
    // Calculate current page and navigate to next page with extra stability
    const currentPageIndex = Math.floor(currentIndex / projectsPerView);
    const totalPages = Math.ceil(totalOriginalItems / projectsPerView);
    const nextPageIndex = currentPageIndex < totalPages - 1 ? currentPageIndex + 1 : 0;
    const newIndex = Math.max(0, Math.min(nextPageIndex * projectsPerView, totalOriginalItems - 1));
    
    // Only proceed if the index is actually different
    if (newIndex !== currentIndex) {
      scrollToIndex(newIndex);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };  return (
    <section 
      id="projects" 
      className="py-4 sm:py-6 lg:py-8 relative overflow-hidden"
      ref={sectionRef}
    >
      
      <div className="mobile-container sm:container mx-auto px-4 relative z-10">
        <div className="text-center mb-4 sm:mb-6 opacity-100 animate-in">
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
          <div className="overflow-x-auto -mx-4 sm:mx-0 mb-4 sm:mb-6 mt-4 sm:mt-6">
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
        </div>        {/* Mobile-first Projects Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container - Mobile-first */}          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="mobile-carousel carousel-container flex overflow-x-auto scrollbar-hide scroll-smooth snap-x gap-4 sm:gap-0 sm:snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >            {infiniteProjects.map((project, index) => (
              <div key={`${project.title}-${Math.floor(index / totalOriginalItems)}`} className="project-tile flex-shrink-0 w-[85vw] sm:w-full md:w-1/2 lg:w-1/3 px-0 sm:px-3 snap-start sm:snap-center">
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </div>
            ))}
          </div>          {/* Arrow Navigation - Enhanced with better UX */}
          <div className="flex items-center justify-center mt-4 sm:mt-6 space-x-6">
            <button
              onClick={scrollLeft}
              className={`w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 touch-button group ${
                isScrolling 
                  ? 'pointer-events-none opacity-60' 
                  : 'hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 active:bg-red-500/30 active:scale-95'
              } ${
                buttonPressed === 'left' 
                  ? 'bg-red-500/30 border-red-500/50 scale-95' 
                  : ''
              }`}
              aria-label="Previous project"
            >
              <svg 
                className={`w-5 h-5 text-white transition-colors duration-200 ${
                  !isScrolling && 'group-hover:text-red-300 group-active:text-red-200'
                } ${
                  buttonPressed === 'left' ? 'text-red-200' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Counter - Enhanced to prevent flickering */}
            <div className="text-sm font-medium text-gray-300 min-w-[3rem] text-center select-none">
              <span className="tabular-nums">
                {Math.floor(displayIndex / projectsPerView) + 1}
              </span>
              <span className="mx-1">/</span>
              <span className="tabular-nums">
                {Math.ceil(totalOriginalItems / projectsPerView)}
              </span>
            </div>

            <button
              onClick={scrollRight}
              className={`w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 touch-button group ${
                isScrolling 
                  ? 'pointer-events-none opacity-60' 
                  : 'hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 active:bg-red-500/30 active:scale-95'
              } ${
                buttonPressed === 'right' 
                  ? 'bg-red-500/30 border-red-500/50 scale-95' 
                  : ''
              }`}
              aria-label="Next project"
            >
              <svg 
                className={`w-5 h-5 text-white transition-colors duration-200 ${
                  !isScrolling && 'group-hover:text-red-300 group-active:text-red-200'
                } ${
                  buttonPressed === 'right' ? 'text-red-200' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default Projects;