'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaLinkedin, FaQuoteLeft, FaTimes } from 'react-icons/fa';

interface Recommendation {
  id: number;
  author: string;
  title: string;
  company: string;
  text: string;
  preview: string;
  relationship: string;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    author: "John Smith",
    title: "Senior Cloud Architect",
    company: "Tech Solutions Inc.",    text: "Shyam is an exceptional DevOps engineer with a deep understanding of cloud architecture. His ability to streamline deployment processes and implement robust CI/CD pipelines has significantly improved our development workflow.",
    preview: "Shyam is an exceptional DevOps engineer with a deep understanding of cloud architecture... read more",
    relationship: "Worked directly with Shyam"
  },
  {
    id: 2,
    author: "Sarah Johnson",
    title: "Engineering Manager",
    company: "Cloud Innovations Ltd.",    text: "I've had the pleasure of working with Shyam on several critical infrastructure projects. His expertise in cloud technologies and automation has been invaluable to our team's success.",
    preview: "I've had the pleasure of working with Shyam on several critical infrastructure projects... read more",
    relationship: "Managed Shyam directly"
  },
  {
    id: 3,
    author: "Michael Chen",
    title: "Lead DevOps Engineer",
    company: "Global Systems Corp",    text: "Shyam's knowledge of DevOps practices and cloud platforms is outstanding. His has a unique ability to solve complex problems while maintaining high standards of code quality and security.",
    preview: "Shyam's knowledge of DevOps practices and cloud platforms is outstanding... read more",
    relationship: "Collaborated with Shyam"
  }
];

const LinkedInRecommendations = () => {
  const [currentRecommendation, setCurrentRecommendation] = useState(recommendations[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Preview Card */}
      <div 
        onClick={openModal}
        className="relative w-full max-w-2xl mx-auto cursor-pointer group"
      >
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:from-gray-800/60 hover:to-gray-900/60">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="text-blue-400 flex-shrink-0 mt-1">
              <FaQuoteLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-gray-300 text-sm sm:text-base font-light mb-2 line-clamp-3 sm:line-clamp-2">
                {currentRecommendation.preview}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-400 gap-1 sm:gap-0">
                <div className="flex items-center">
                  <FaLinkedin className="w-3 h-3 mr-2 text-blue-400" />
                  <span className="font-medium">{currentRecommendation.author}</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-gray-500">{currentRecommendation.title}</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Full Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-y-auto z-50 p-2 sm:p-4"
            >
              <div className="relative bg-gray-900/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  onClick={closeModal}
                  className="absolute right-2 top-2 sm:right-4 sm:top-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                >
                  <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <div className="p-4 sm:p-8">
                  <div className="text-blue-400 mb-4 sm:mb-6">
                    <FaQuoteLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {recommendations.map((rec) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700/50"
                      >
                        <p className="text-gray-300 text-base sm:text-lg font-light mb-4 leading-relaxed">
                          {rec.text}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                          <div>
                            <h4 className="text-white font-medium">
                              {rec.author}
                            </h4>
                            <p className="text-blue-400 text-sm">
                              {rec.title}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {rec.company}
                            </p>
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span>{rec.relationship}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LinkedInRecommendations;
