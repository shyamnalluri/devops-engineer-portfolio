'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem as Project } from '../../data/projects';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Handle keyboard events and focus management
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Save focus and trap inside the modal
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

      const container = panelRef.current;
      if (container) {
        const getFocusable = () => {
          const selectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea',
            'input',
            'select',
            '[tabindex]:not([tabindex="-1"])',
          ].join(',');
          return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
            (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
          );
        };

        const focusables = getFocusable();
        if (focusables.length) {
          focusables[0].focus();
        } else {
          container.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;
          const els = getFocusable();
          if (!els.length) return;
          const first = els[0];
          const last = els[els.length - 1];
          const current = document.activeElement as HTMLElement | null;
          if (e.shiftKey) {
            if (current === first || !container.contains(current)) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (current === last || !container.contains(current)) {
              e.preventDefault();
              first.focus();
            }
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      // Restore focus to the element that triggered the modal
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const Icon = ({ name }: { name: 'Infrastructure' | 'Automation' | 'DevOps' }) => {
    if (name === 'Infrastructure') {
      return (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M3 6h18v2H3V6zm2 4h14v2H5v-2zm-2 4h18v2H3v-2z" />
        </svg>
      );
    }
    if (name === 'Automation') {
      return (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.4 16.6L4 21l1.4-5.4L2 12l5.6-.6L9.4 6l1.8 5.4 5.6.6-3.4 3.6L14 21z" />
        </svg>
      );
    }
    return (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9 18l-6-6 6-6 2 2-4 4 4 4-2 2zm6 0l-2-2 4-4-4-4 2-2 6 6-6 6z" />
      </svg>
    );
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleCloseClick = () => {
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
            ease: 'easeInOut',
            opacity: { duration: 0.2 },
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
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
              filter: 'blur(2px)',
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1], // Material Design ease
              scale: {
                duration: 0.3,
                ease: [0.175, 0.885, 0.32, 1.275], // Spring ease
              },
            }}
            className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto hide-scrollbar relative animate-modal-in mt-2 sm:mt-0"
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center top',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            tabIndex={-1}
            ref={panelRef}
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
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z" />
                </svg>
              </button>
              {/* Mobile-first Header Section */}
              <div className="relative bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 p-4 sm:p-6 border-b border-orange-500/20 pr-12 sm:pr-20">
                {/* Project Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <Icon name={project.category as 'Infrastructure' | 'Automation' | 'DevOps'} />
                      <span className="text-orange-400 text-xs sm:text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3
                      id={`project-modal-title-${project.id}`}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                    >
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
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                          <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {/* Mobile-first Content Section */}{' '}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="p-4 sm:p-6 space-y-6 sm:space-y-8"
              >
                {/* Architecture Diagram (optional) */}
                {project.architectureImage && (
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                      Architecture
                    </h4>
                    <div className="relative w-full h-64 sm:h-80 md:h-96">
                      <Image
                        src={project.architectureImage}
                        alt={`${project.title} architecture diagram`}
                        fill
                        className="object-contain rounded-lg border border-gray-700/50 bg-gray-900"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                        priority={false}
                      />
                    </div>
                  </div>
                )}
                {/* Overview */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    Project Overview
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    Technologies Used
                  </h4>
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
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                        Key Challenges
                      </h4>
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
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                        Solutions
                      </h4>
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
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                      Key Metrics & Results
                    </h4>
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
