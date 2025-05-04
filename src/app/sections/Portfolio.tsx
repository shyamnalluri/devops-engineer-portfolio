'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import OptimizedImage from '../components/OptimizedImage';

interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  images?: string[];
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string[];
  solutions?: string[];
}

const projects: Project[] = [
  {
    title: "Cloud Infrastructure Migration",
    description: "Led the migration of on-premise infrastructure to AWS cloud",
    detailedDescription: "Complete migration of legacy infrastructure to AWS, involving complex database migrations and network restructuring.",
    image: "/projects/cloud-migration.jpg",
    images: ["/projects/cloud-migration-2.jpg", "/projects/cloud-migration-3.jpg"],
    tags: ["Cloud Migration", "DevOps"],
    technologies: ["AWS", "Terraform", "Docker"],
    githubUrl: "https://github.com/yourusername/cloud-migration",
    challenges: [
      "Complex legacy system dependencies",
      "Zero-downtime migration requirement"
    ],
    solutions: [
      "Implemented blue-green deployment",
      "Automated migration testing"
    ]
  },
  {
    title: "Kubernetes Cluster Management",
    description: "Designed and implemented scalable Kubernetes infrastructure",
    detailedDescription: "Set up and managed production-grade Kubernetes clusters with automated scaling and monitoring.",
    image: "/projects/kubernetes.jpg",
    tags: ["Container Orchestration", "DevOps"],
    technologies: ["Kubernetes", "Docker", "Prometheus"],
    githubUrl: "https://github.com/yourusername/k8s-cluster",
    challenges: ["High availability requirements", "Complex monitoring needs"],
    solutions: ["Multi-zone cluster setup", "Custom monitoring solution"]
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "Automated deployment pipeline for microservices architecture",
    detailedDescription: "End-to-end automation of build, test, and deployment processes for microservices.",
    image: "/projects/cicd.jpg",
    tags: ["CI/CD", "Automation"],
    technologies: ["Jenkins", "GitHub Actions", "Docker"],
    githubUrl: "https://github.com/yourusername/cicd-pipeline",
    challenges: ["Multiple service dependencies", "Complex testing requirements"],
    solutions: ["Implemented service mesh", "Automated integration tests"]
  }
];

const Portfolio = () => {
  const [selectedTech, setSelectedTech] = useState<string>('all');
  
  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );

  const filteredProjects = selectedTech === 'all'
    ? projects
    : projects.filter(project => project.technologies.includes(selectedTech));

  return (
    <section id="portfolio" className="py-16 pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Portfolio</h2>
          <p className="text-gray-400">Featured DevOps Projects</p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedTech('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTech === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedTech === tech
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub className="w-6 h-6" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;