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
  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut",
            opacity: { duration: 0.2 }
          }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start sm:items-center justify-center p-2 sm:p-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Enhanced Modal with mobile-first design */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 20,
              filter: "blur(4px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 10,
              filter: "blur(2px)"
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1], // Material Design ease
              scale: { 
                duration: 0.3, 
                ease: [0.175, 0.885, 0.32, 1.275] // Spring ease
              }
            }}
            className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto hide-scrollbar relative animate-modal-in mt-2 sm:mt-0"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'center top'
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-orange-500/20 overflow-hidden">
              {/* Mobile-first Close Button */}
              <button
                onClick={handleCloseClick}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-gray-400 hover:text-white bg-gray-900/90 
                  hover:bg-orange-500/30 p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300
                  border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-orange-500/30
                  focus:outline-none focus:ring-2 focus:ring-orange-500/50 touch-button"
                aria-label="Close modal"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Mobile-first Header Section */}
              <div className="relative bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 p-4 sm:p-6 border-b border-orange-500/20 pr-12 sm:pr-20">
                {/* Project Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                      <span className="text-orange-400 text-xs sm:text-sm font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-400 transition-colors p-1.5 sm:p-2 
                          hover:bg-orange-500/10 rounded-full border border-orange-500/20
                          hover:border-orange-500/40 touch-button"
                      >
                        <FaExternalLinkAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile-first Content Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="p-4 sm:p-6 space-y-6 sm:space-y-8"
              >
                className="p-6 space-y-8"
              >                {/* Overview */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Project Overview</h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{project.detailedDescription}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full bg-orange-500/10 text-orange-400 
                          border border-orange-500/20 backdrop-blur-sm hover:bg-orange-500/20
                          hover:border-orange-500/40 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile-first Layout for Challenges and Solutions */}
                <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8">
                  {project.challenges && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Key Challenges</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2 sm:gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm sm:text-base">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.solutions && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Solutions</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2 sm:gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm sm:text-base">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Mobile-first Metrics */}
                {project.metrics && (
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Key Metrics & Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {project.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="p-3 sm:p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-sm
                            hover:bg-orange-500/10 hover:border-orange-500/20 transition-all duration-300"
                        >
                          <span className="text-gray-300 text-sm sm:text-base">{metric}</span>
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
