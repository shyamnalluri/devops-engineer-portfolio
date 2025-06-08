'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import DottedNavButton from '../components/DottedNavButton';
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
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/30 h-96 cursor-pointer flex flex-col card-hover btn-professional focus-ring overflow-hidden"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary rounded-2xl" />
      
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium transition-all duration-200 group-hover:bg-red-500/30 group-hover:text-red-300">
          {project.category}
        </span>
      </div>

      {/* Content Area - Dynamic space distribution */}
      <div className="flex-grow flex flex-col mb-4 relative z-10">
        {/* Project Title - Dynamic */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-200 ease-primary leading-6">
            {project.title}
          </h3>
        </div>
        
        {/* Project Description - Dynamic */}
        <div className="flex-grow mb-4">
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-200 ease-primary">
            {project.description}
          </p>
        </div>
        
        {/* Technologies - Dynamic */}
        <div className="flex items-center">
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-md bg-gray-800/60 text-gray-300 border border-gray-700/50 whitespace-nowrap transition-all duration-200 ease-primary group-hover:bg-gray-700/60 group-hover:text-gray-200 group-hover:border-gray-600/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - View Details (Fixed at bottom) */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-200 ease-primary relative z-10">
        <div className="flex items-center gap-2 text-white text-sm">
          <FaExternalLinkAlt className="w-3 h-3 text-red-400 transition-transform duration-200 group-hover:translate-x-1" />
          <span className="transition-colors duration-200 group-hover:text-red-400">View Details</span>
        </div>
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700 text-gray-200 transition-all duration-200 ease-primary border border-gray-700/50 btn-professional hover:scale-110 focus-ring"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub className="w-4 h-4" />
          </a>
        )}
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary pointer-events-none" />
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Professional scroll animation hooks
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 100,
    animationClass: 'animate-slide-up'
  });
  
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  // Create infinite scroll by duplicating projects
  const infiniteProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];
  const totalOriginalItems = filteredProjects.length;
  const startIndex = totalOriginalItems;

  // Calculate how many projects can fit in view (3 for desktop, 1 for mobile)
  const getProjectsPerView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 3 : 1;
    }
    return 3;
  };

  const [projectsPerView, setProjectsPerView] = useState(getProjectsPerView());

  useEffect(() => {
    const handleResize = () => {
      setProjectsPerView(getProjectsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Initialize scroll position to middle set
  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const scrollPosition = startIndex * (containerWidth / projectsPerView);
      carouselRef.current.scrollLeft = scrollPosition;
      setCurrentIndex(0);
    }
  }, [selectedCategory, projectsPerView, startIndex]);

  // Check scroll position and handle infinite scroll
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const itemWidth = clientWidth / projectsPerView;
      const rawIndex = Math.round(scrollLeft / itemWidth);
      
      // Handle infinite scroll wrapping
      if (rawIndex >= totalOriginalItems * 2) {
        carouselRef.current.scrollLeft = totalOriginalItems * itemWidth;
        setCurrentIndex(0);
      } else if (rawIndex < totalOriginalItems) {
        carouselRef.current.scrollLeft = (totalOriginalItems * 2 - 1) * itemWidth;
        setCurrentIndex(totalOriginalItems - 1);
      } else {
        const actualIndex = rawIndex - totalOriginalItems;
        setCurrentIndex(actualIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const itemWidth = containerWidth / projectsPerView;
      const scrollPosition = (startIndex + index) * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : totalOriginalItems - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < totalOriginalItems - 1 ? currentIndex + 1 : 0;    scrollToIndex(newIndex);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section 
      id="projects" 
      className="py-12 bg-black relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 opacity-100 animate-in">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            Recent Projects
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6 mb-10">
          </p>
          
          {/* Category filters with professional animations */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium btn-professional focus-ring transition-all duration-200 ease-primary
                  ${selectedCategory === category 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>        </div>

        {/* Projects Carousel */}
        <div className="relative max-w-7xl mx-auto px-20">
          {/* Navigation Arrows - Stylish Dotted Buttons */}
          <DottedNavButton
            direction="left"
            onClick={scrollLeft}
            className="absolute -left-8 top-1/2 -translate-y-1/2 z-20"
          />

          <DottedNavButton
            direction="right"
            onClick={scrollRight}
            className="absolute -right-8 top-1/2 -translate-y-1/2 z-20"
          />{/* Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={checkScrollPosition}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteProjects.map((project, index) => (
              <div key={`${project.title}-${Math.floor(index / totalOriginalItems)}`} className="flex-shrink-0 w-full md:w-1/3 px-3 snap-center">
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </div>
            ))}
          </div>          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? 'bg-red-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>        {/* Project Modal */}      <ProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default Projects;