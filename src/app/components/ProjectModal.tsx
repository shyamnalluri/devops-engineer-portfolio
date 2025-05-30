'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaServer, FaCode, FaLightbulb, FaTimes } from 'react-icons/fa';
import { Project } from '../sections/Projects';
import { useEffect } from 'react';

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
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log('Backdrop clicked, closing modal');
      onClose();
    }
  };
  const handleCloseClick = () => {
    console.log('Close button clicked');
    onClose();
  };

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed, closing modal');
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >          {/* Modal */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.85, 
              y: 60, 
              rotateX: -20,
              filter: "blur(4px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotateX: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 30, 
              rotateX: -10,
              filter: "blur(2px)"
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.4 },
              scale: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              rotateX: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              filter: { duration: 0.3 }
            }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar relative"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'center top'
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-orange-500/20 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleCloseClick}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white bg-gray-900/90 
                  hover:bg-orange-500/30 p-3 rounded-full backdrop-blur-sm transition-all duration-300
                  border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-orange-500/30
                  focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Header Section */}
              <div className="relative bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 p-6 border-b border-orange-500/20 pr-20">
                {/* Project Title Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-400 text-sm font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                  </div>                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-400 transition-colors p-2 
                          hover:bg-orange-500/10 rounded-full border border-orange-500/20
                          hover:border-orange-500/40"
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>              {/* Content Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="p-6 space-y-8"
              >
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
                        className="px-3 py-1.5 text-sm rounded-full bg-orange-500/10 text-orange-400 
                          border border-orange-500/20 backdrop-blur-sm hover:bg-orange-500/20
                          hover:border-orange-500/40 transition-all duration-300"
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
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
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
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>                {/* Metrics */}
                {project.metrics && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Metrics & Results</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-sm
                            hover:bg-orange-500/10 hover:border-orange-500/20 transition-all duration-300"
                        >
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
