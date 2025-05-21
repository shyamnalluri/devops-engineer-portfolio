'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaServer, FaCode, FaLightbulb, FaTimes } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';
import { Project } from '../sections/Projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  const categoryIcons = {
    Infrastructure: FaServer,
    Automation: FaCode,
    DevOps: FaLightbulb
  };

  const Icon = categoryIcons[project.category];

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl 
              max-h-[90vh] overflow-y-auto hide-scrollbar z-50 p-4"
          >
            <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-800 overflow-hidden">
              {/* Hero Section */}
              <div className="relative h-[300px]">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-900/50 
                    hover:bg-gray-800/80 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <FaTimes className="w-5 h-5" />
                </button>

                {/* Project Title Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">{project.category}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors p-2 
                            hover:bg-gray-800/50 rounded-full"
                        >
                          <FaGithub className="w-6 h-6" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors p-2 
                            hover:bg-gray-800/50 rounded-full"
                        >
                          <FaExternalLinkAlt className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-8">
                {/* Overview */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed">{project.detailedDescription}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm rounded-full bg-blue-500/10 text-blue-400 
                          border border-blue-500/20 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Two Column Layout for Challenges and Solutions */}
                <div className="grid md:grid-cols-2 gap-8">
                  {project.challenges && (
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Key Challenges</h4>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.solutions && (
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Solutions</h4>
                      <ul className="space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Metrics & Results</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm"
                        >
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
