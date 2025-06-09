'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import { useScrollAnimation, useCardAnimation } from '../../hooks/useScrollAnimation';

export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  category: 'Infrastructure' | 'Automation' | 'DevOps';
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string[];
  solutions?: string[];
  metrics?: string[];
}

const projects: Project[] = [
  {
    title: "Cloud Infrastructure Migration",
    description: "Enterprise-scale on-premise to AWS cloud migration with zero downtime",
    detailedDescription: "Architected and executed a comprehensive cloud migration strategy for a mission-critical infrastructure supporting 100+ microservices.",
    category: 'Infrastructure',
    tags: ["Cloud Migration", "High Availability", "Cost Optimization"],
    technologies: ["AWS", "Terraform", "Docker", "Route53", "EKS", "RDS"],
    githubUrl: "https://github.com/yourusername/cloud-migration",
    challenges: [
      "Complex legacy system dependencies with 24/7 availability requirement",
      "Data migration of 5TB+ with minimal downtime",
      "Multi-region failover requirements"
    ],
    solutions: [
      "Implemented blue-green deployment with automated rollback",
      "Designed custom data migration pipeline with parallel processing",
      "Set up cross-region replication with automated failover"
    ],
    metrics: [
      "Achieved 99.99% uptime during migration",
      "Reduced infrastructure costs by 40%",
      "Improved system response time by 60%"
    ]
  },
  {
    title: "Kubernetes Platform Engineering",
    description: "Production-grade Kubernetes platform with automated scaling and self-healing",
    detailedDescription: "Designed and implemented a robust Kubernetes platform supporting multiple development teams and environments.",
    category: 'Infrastructure',
    tags: ["Container Orchestration", "Platform Engineering"],
    technologies: ["Kubernetes", "Helm", "Prometheus", "Grafana", "ArgoCD", "Istio"],
    githubUrl: "https://github.com/yourusername/k8s-platform",
    challenges: [
      "Multi-tenant cluster security requirements",
      "Complex monitoring and alerting needs",
      "Automated disaster recovery"
    ],
    solutions: [
      "Implemented network policies and pod security policies",
      "Set up comprehensive monitoring with custom dashboards",
      "Automated backup and restore procedures"
    ],
    metrics: [
      "Supporting 200+ microservices",
      "99.99% platform availability",
      "70% reduction in deployment time"
    ]
  },
  {
    title: "GitOps CI/CD Pipeline",
    description: "Fully automated GitOps pipeline with advanced deployment strategies",
    detailedDescription: "End-to-end CI/CD automation implementing GitOps principles for a microservices architecture.",
    category: 'Automation',
    tags: ["CI/CD", "GitOps", "Automation"],
    technologies: ["ArgoCD", "GitHub Actions", "Terraform", "Docker"],
    githubUrl: "https://github.com/yourusername/gitops-pipeline",
    challenges: [
      "Complex dependency management across services",
      "Strict security compliance requirements",
      "Multiple environment configurations"
    ],
    solutions: [
      "Implemented Helm charts for dependency management",
      "Integrated security scanning in pipeline",
      "Created dynamic environment provisioning"
    ],
    metrics: [
      "Reduced deployment time from hours to minutes",
      "Zero failed productions deployments",
      "100% audit compliance"
    ]
  },
  {
    title: "Multi-Region Disaster Recovery",
    description: "Designed and implemented a comprehensive DR strategy with automated failover across multiple regions",
    detailedDescription: "Enterprise-grade disaster recovery solution ensuring business continuity with minimal data loss and downtime.",
    category: 'Infrastructure',
    tags: ["Disaster Recovery", "High Availability", "Cloud Architecture"],
    technologies: ["Azure Site Recovery", "Traffic Manager", "PowerShell", "Terraform"],
    githubUrl: "https://github.com/yourusername/dr-automation",
    challenges: [
      "RPO/RTO requirements under 15 minutes",
      "Complex database synchronization",
      "Regulatory compliance requirements"
    ],
    solutions: [
      "Implemented active-active architecture",
      "Automated failover testing",
      "Real-time data replication"
    ],
    metrics: [
      "Achieved RPO of < 5 minutes",
      "Reduced failover time by 80%",
      "100% successful DR tests"
    ]
  },
  {
    title: "DevSecOps Pipeline Enhancement",
    description: "Integrated security scanning and compliance checks into the CI/CD pipeline",
    detailedDescription: "Advanced DevSecOps implementation with automated security testing, vulnerability scanning, and compliance verification.",
    category: 'Automation',
    tags: ["Security", "Compliance", "CI/CD"],
    technologies: ["SonarQube", "Snyk", "OWASP", "Jenkins", "Artifactory"],
    githubUrl: "https://github.com/yourusername/devsecops-pipeline",
    challenges: [
      "Integration of multiple security tools",
      "Minimal pipeline performance impact",
      "Compliance with SOC2 requirements"
    ],
    solutions: [
      "Parallel security scanning implementation",
      "Custom policy-as-code framework",
      "Automated security reporting"
    ],
    metrics: [
      "90% reduction in security vulnerabilities",
      "Compliance verification time reduced by 75%",
      "Zero security incidents post-deployment"
    ]
  },
  {
    title: "Container Platform Optimization",
    description: "Optimized Kubernetes cluster performance and resource utilization",
    detailedDescription: "Comprehensive Kubernetes platform optimization project focusing on cost efficiency and performance.",
    category: 'DevOps',
    tags: ["Kubernetes", "Performance", "Cost Optimization"],
    technologies: ["Kubernetes", "Prometheus", "Grafana", "Horizontal Pod Autoscaling"],
    githubUrl: "https://github.com/yourusername/k8s-optimization",
    challenges: [
      "High infrastructure costs",
      "Resource underutilization",
      "Performance bottlenecks"
    ],
    solutions: [
      "Implemented pod right-sizing",
      "Custom autoscaling algorithms",
      "Resource quota management"
    ],
    metrics: [
      "45% reduction in cloud costs",
      "30% improvement in resource utilization",
      "99.99% platform availability maintained"
    ]
  },
  {
    title: "Zero-Trust Security Implementation",
    description: "Implemented zero-trust architecture across cloud infrastructure",
    detailedDescription: "Complete zero-trust security model implementation with identity-based access control and network segmentation.",
    category: 'Infrastructure',
    tags: ["Security", "Zero-Trust", "IAM"],
    technologies: ["Azure AD", "NSGs", "Service Endpoints", "Private Link"],
    githubUrl: "https://github.com/yourusername/zero-trust-implementation",
    challenges: [
      "Legacy system integration",
      "Minimal user experience impact",
      "Complex service dependencies"
    ],
    solutions: [
      "Implemented service mesh with mTLS",
      "Just-in-time access provisioning",
      "Automated certificate management"
    ],
    metrics: [
      "100% encrypted service-to-service communication",
      "75% reduction in attack surface",
      "Zero unauthorized access attempts"
    ]
  },
  {
    title: "Infrastructure as Code Migration",
    description: "Migrated manual infrastructure provisioning to Infrastructure as Code",
    detailedDescription: "Large-scale migration of manually provisioned infrastructure to Terraform with state management and modular design.",
    category: 'Automation',
    tags: ["IaC", "Terraform", "Automation"],
    technologies: ["Terraform", "Azure DevOps", "Python", "Go"],
    githubUrl: "https://github.com/yourusername/terraform-migration",
    challenges: [
      "Complex existing infrastructure",
      "Minimal downtime requirement",
      "State management complexity"
    ],
    solutions: [
      "Developed custom Terraform modules",
      "Automated state migration tool",
      "Progressive infrastructure adoption"
    ],
    metrics: [
      "100% infrastructure documented as code",
      "Deployment time reduced by 90%",
      "Zero production incidents during migration"
    ]
  }
];

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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // Prevent flickering during programmatic scrolling
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
  
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);
  // Create infinite scroll by duplicating projects
  const infiniteProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];
  const totalOriginalItems = filteredProjects.length;
  const startIndex = totalOriginalItems;    // Additional safety: Reset to first project when category changes
  useEffect(() => {
    setCurrentIndex(0);
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
  }, []);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || typeof window === 'undefined' || window.innerWidth >= 640) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || typeof window === 'undefined' || window.innerWidth >= 640) return;
    
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - next project
        scrollRight();
      } else {
        // Swipe right - previous project
        scrollLeft();
      }
    }
  };  // Initialize scroll position to middle set
  useEffect(() => {
    if (carouselRef.current && isReady && totalOriginalItems > 0) {
      setIsInitializing(true);
      
      // Use requestAnimationFrame to ensure DOM is ready
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
          
          // Allow normal scroll checking after everything is settled
          setTimeout(() => {
            setIsInitializing(false);
          }, 300);
        }
      });
    }
  }, [selectedCategory, projectsPerView, startIndex, isReady, totalOriginalItems]);  // Check scroll position and handle infinite scroll
  const checkScrollPosition = () => {
    // Don't update position during initialization, scrolling animation, or if not ready
    if (isInitializing || isScrolling || !isReady || !carouselRef.current || totalOriginalItems === 0) return;
    
    const { scrollLeft, clientWidth } = carouselRef.current;
    const itemWidth = clientWidth / projectsPerView;
    const rawIndex = Math.round(scrollLeft / itemWidth);
    
    // Handle infinite scroll wrapping
    if (rawIndex >= totalOriginalItems * 2) {
      // Jumped to end, wrap to beginning
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = totalOriginalItems * itemWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
      setCurrentIndex(0);
    } else if (rawIndex < totalOriginalItems) {
      // Jumped to beginning, wrap to end
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = (totalOriginalItems * 2 - 1) * itemWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
      setCurrentIndex(totalOriginalItems - 1);
    } else {
      // Normal position within middle set
      const actualIndex = rawIndex - totalOriginalItems;
      // Only update if the index actually changed
      if (actualIndex !== currentIndex && actualIndex >= 0 && actualIndex < totalOriginalItems) {
        setCurrentIndex(actualIndex);
      }
    }
  };

  // Debounced scroll handler to prevent flickering
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      checkScrollPosition();
    }, 100); // 100ms debounce
  };const scrollToIndex = (index: number) => {
    if (carouselRef.current && totalOriginalItems > 0) {
      // Set scrolling flag to prevent checkScrollPosition from interfering
      setIsScrolling(true);
      
      const containerWidth = carouselRef.current.clientWidth;
      const itemWidth = containerWidth / projectsPerView;
      const scrollPosition = (startIndex + index) * itemWidth;
      
      // Update currentIndex immediately for better UX
      setCurrentIndex(index);
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      // Clear scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 500); // Match smooth scroll duration
    }
  };
  const scrollLeft = () => {
    // Calculate current page and navigate to previous page
    const currentPageIndex = Math.floor(currentIndex / projectsPerView);
    const totalPages = Math.ceil(totalOriginalItems / projectsPerView);
    const previousPageIndex = currentPageIndex > 0 ? currentPageIndex - 1 : totalPages - 1;
    const newIndex = previousPageIndex * projectsPerView;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    // Calculate current page and navigate to next page
    const currentPageIndex = Math.floor(currentIndex / projectsPerView);
    const totalPages = Math.ceil(totalOriginalItems / projectsPerView);
    const nextPageIndex = currentPageIndex < totalPages - 1 ? currentPageIndex + 1 : 0;
    const newIndex = nextPageIndex * projectsPerView;
    scrollToIndex(newIndex);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };
  return (
    <section 
      id="projects" 
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Mobile-first background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
      
      <div className="mobile-container sm:container mx-auto px-4 relative z-10">        <div className="text-center mb-8 sm:mb-12 opacity-100 animate-in">
          <h2 className="text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 animate-hero-title">
            Recent Projects
          </h2>
          <p className="text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 animate-hero-subtitle">
            Infrastructure solutions, automation pipelines, and DevOps implementations
          </p>
          
          {/* Mobile-first category filters */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 mb-8 sm:mb-12 mt-4 sm:mt-6">
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
            className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-4 sm:gap-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteProjects.map((project, index) => (
              <div key={`${project.title}-${Math.floor(index / totalOriginalItems)}`} className="flex-shrink-0 w-[85vw] sm:w-full md:w-1/2 lg:w-1/3 px-0 sm:px-3 snap-center">
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </div>
            ))}
          </div>          {/* Arrow Navigation */}
          <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-6">            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 active:bg-red-500/30 active:scale-95 touch-button group"
              aria-label="Previous project"
            >
              <svg 
                className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-red-300 group-active:text-red-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>            {/* Page Counter */}
            <div className="text-sm font-medium text-gray-300 min-w-[3rem] text-center">
              {Math.floor(currentIndex / projectsPerView) + 1} / {Math.ceil(totalOriginalItems / projectsPerView)}
            </div>
              <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 active:bg-red-500/30 active:scale-95 touch-button group"
              aria-label="Next project"
            >
              <svg 
                className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-red-300 group-active:text-red-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
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