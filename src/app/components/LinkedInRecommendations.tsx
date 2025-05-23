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

// Updated LinkedInRecommendations to match the Figma wireframe
const LinkedInRecommendations = () => {
  const currentRecommendation = recommendations[0];
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 p-3 sm:p-4 backdrop-blur-sm">
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
      </div>
    </div>
  );
};

export default LinkedInRecommendations;
