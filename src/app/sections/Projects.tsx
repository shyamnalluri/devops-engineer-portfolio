'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaServer, FaCode, FaLightbulb } from 'react-icons/fa';
import OptimizedImage from '../components/OptimizedImage';
import ProjectModal from '../components/ProjectModal';

export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  images?: string[];
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
    image: "/projects/cloud-migration.jpg",
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
    image: "/projects/kubernetes.jpg",
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
    image: "/projects/cicd.jpg",
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
    image: "/projects/disaster-recovery.jpg",
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
    image: "/projects/devsecops.jpg",
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
    image: "/projects/kubernetes-opt.jpg",
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
    image: "/projects/zero-trust.jpg",
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
    image: "/projects/iac.jpg",
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

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const categoryColors = {
    Infrastructure: {
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      shadow: 'shadow-blue-500/5'
    },
    Automation: {
      gradient: 'from-green-500/10 via-green-500/5 to-transparent',
      border: 'border-green-500/20',
      text: 'text-green-400',
      shadow: 'shadow-green-500/5'
    },
    DevOps: {
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      shadow: 'shadow-purple-500/5'
    }
  };

  const categoryIcons = {
    Infrastructure: FaServer,
    Automation: FaCode,
    DevOps: FaLightbulb
  };

  const Icon = categoryIcons[project.category];
  const colors = categoryColors[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full group/card"
      onClick={onClick}
    >
      <div 
        className={`relative h-full rounded-2xl border bg-gradient-to-br backdrop-blur-sm cursor-pointer
          transition-all duration-500 ${colors.border} hover:border-opacity-50
          bg-gray-900/40 overflow-hidden`}
      >
        {/* Hero Section with Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-transparent z-10" />
          <OptimizedImage
            src={project.image}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-full object-cover object-center scale-105 group-hover/card:scale-110 transition-transform duration-700"
          />
          <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 
            bg-gradient-to-r ${colors.gradient}`} 
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white group-hover/card:text-blue-400 transition-colors duration-300 flex-1 pr-4">
              {project.title}
            </h3>
            <Icon className={`w-6 h-6 ${colors.text} mt-1`} />
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 text-xs rounded-full ${colors.text} bg-gray-800/50 
                    border ${colors.border} backdrop-blur-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Project Link */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <button
                className={`text-sm ${colors.text} hover:opacity-80 transition-opacity 
                  flex items-center gap-1.5 group/btn`}
              >
                <span>View Project</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-1.5 
                      hover:bg-gray-800/50 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-1.5 
                      hover:bg-gray-800/50 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380; // card width + gap
      const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing enterprise-scale infrastructure solutions and automation projects,
              demonstrating expertise in cloud architecture, DevOps practices, and scalable systems.
            </p>
          </motion.div>

          {/* Projects Slider */}
          <div className="relative max-w-[1170px] mx-auto">
            {/* Left Gradient Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />
            
            {/* Right Gradient Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />

            {/* Scroll Buttons - Always Visible */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 
                text-gray-300 hover:text-white p-3 rounded-full z-20 backdrop-blur-sm transition-colors
                shadow-lg shadow-black/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 
                text-gray-300 hover:text-white p-3 rounded-full z-20 backdrop-blur-sm transition-colors
                shadow-lg shadow-black/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Projects Container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto hide-scrollbar relative pb-4"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)'
              }}
            >
              <div className="flex gap-[30px] px-[100px]">
                <AnimatePresence mode="popLayout">
                  {projects.map((project) => (
                    <div key={project.title} className="w-[350px] flex-shrink-0">
                      <ProjectCard 
                        project={project} 
                        onClick={() => setSelectedProject(project)}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 -z-10" />
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] -z-10" />
      </section>
    </>
  );
};

export default Projects;