'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { experienceData } from '../../data/portfolio';

interface ExperienceData {
  id: string;
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
  type: 'work' | 'education';
  icon: string;
  phase: string; // DevOps evolution phase
}

const InteractiveTimelineCard = ({ data, index, isActive, onClick }: {
  data: ExperienceData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);  return (
    <div
      ref={ref}
      className={`relative cursor-pointer transition-all duration-300 group ${
        isActive ? 'mb-6' : 'mb-3'
      } ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        minHeight: isActive ? 'auto' : '60px'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={data.id}
    >{/* Dynamic Timeline connector - Subtle and professional */}
      <div
        className={`absolute left-[11px] top-0 bg-gradient-to-b from-red-500/60 via-orange-500/40 to-blue-500/60 rounded-full transition-all duration-400 ${
          isActive ? 'w-0.5 h-full opacity-80' : 'w-px h-12 opacity-50'
        }`}
      />{/* Interactive Timeline Node - Compact and professional */}
      <div
        className={`absolute left-0 top-2 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 rounded-full border flex items-center justify-center cursor-pointer z-10 transition-all duration-300 ${
          isActive 
            ? 'border-red-500 bg-gray-800 scale-110 shadow-md shadow-red-500/30' 
            : 'border-gray-500 bg-gray-900 scale-100 shadow-sm'
        } ${
          isHovered && !isActive ? 'scale-105 shadow-md shadow-red-500/20' : ''
        }`}
      >
        <span 
          className={`text-xs sm:text-sm transition-transform duration-200 ${
            isActive ? 'scale-110' : 'scale-100'
          }`}
        >
          {data.icon}
        </span>
      </div>      {/* Content Card - Professional and compact styling */}
      <div
        className={`group transition-all duration-300 ease-out ${
          isActive 
            ? 'bg-gray-800/70 backdrop-blur-sm p-3 sm:p-4 lg:p-5 pr-2 sm:pr-3 lg:pr-4 pl-8 sm:pl-10 lg:pl-12 rounded-lg border border-red-500/30 ml-1 shadow-lg shadow-red-500/10 hover:shadow-red-500/15 hover:border-red-500/40' 
            : 'bg-gray-800/20 hover:bg-gray-800/40 p-2 sm:p-3 pr-2 sm:pr-3 pl-8 sm:pl-10 lg:pl-12 rounded-lg border border-gray-700/20 hover:border-orange-500/30 ml-0 shadow-sm hover:shadow-md transition-all duration-200'
        }`}
      ><h4
          className={`font-semibold transition-all duration-300 cursor-pointer ${
            isActive 
              ? 'text-orange-300 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3' 
              : 'text-white text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 hover:text-orange-400'
          }`}
        >
          {data.title}
        </h4>

        <div
          className={`flex flex-wrap items-center gap-1 sm:gap-2 text-xs transition-all duration-300 ${
            isActive ? 'mb-2 sm:mb-3 opacity-100' : 'mb-1 sm:mb-2 opacity-80'
          }`}
        >          <span className="text-red-400 font-medium text-xs sm:text-sm">
            {data.company || data.institution}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-400 text-xs sm:text-sm">{data.period}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className={`text-xs uppercase tracking-wide font-medium px-2 py-0.5 rounded border transition-all duration-200 ${
            data.type === 'work' 
              ? 'text-blue-300 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15'
              : 'text-purple-300 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/15'
          }`}>
            {data.type}
          </span>
        </div>        {/* Description - Compact and professional */}
        <p
          className={`text-gray-300 leading-normal transition-all duration-300 ${
            isActive 
              ? 'text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 opacity-100' 
              : 'text-xs sm:text-sm leading-snug mb-2 sm:mb-3 opacity-85 line-clamp-2'
          }`}
        >
          {isActive ? data.description : `${data.description.substring(0, 80)}${data.description.length > 80 ? '...' : ''}`}
        </p>        {/* Achievements (only show when active) - Compact design */}
        {isActive && data.achievements && (
          <div
            className={`p-2 sm:p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 mb-3 sm:mb-4 overflow-hidden transition-all duration-400 animate-fade-in`}
            style={{ animationDelay: '100ms' }}
          >
            <h5 className="text-xs sm:text-sm font-medium text-orange-400 mb-2 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <span className="text-sm">🏆</span>
              Key Achievements:
            </h5>
            <ul className="space-y-1 sm:space-y-2">
              {data.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-gray-300 flex items-start gap-2 animate-slide-up leading-relaxed"
                  style={{ animationDelay: `${300 + (i * 50)}ms` }}
                >
                  <span className="text-green-400 mt-0.5 flex-shrink-0 text-xs">✓</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}        {/* Technologies - Compact and refined */}
        {data.technologies && (
          <div className={`flex flex-wrap gap-1 sm:gap-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-75'}`}>
            {(isActive ? data.technologies : data.technologies.slice(0, 4)).map((tech, i) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs rounded border transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-red-500/10 border-red-500/30 text-orange-300 hover:bg-red-500/15 hover:border-red-500/40' 
                    : 'bg-gray-800/50 border-gray-600/30 text-gray-400 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-300'
                } animate-scale-in`}
                style={{ animationDelay: `${isActive ? 100 + (i * 20) : 0}ms` }}
              >
                {tech}
              </span>
            ))}
            {!isActive && data.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs rounded border border-gray-600/30 bg-gray-800/50 text-gray-500 font-medium animate-scale-in hover:text-orange-300 hover:border-orange-500/20 transition-all duration-200">
                +{data.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const [activeCard, setActiveCard] = useState<string | null>('senior-devops');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: workRef, isVisible: workVisible } = useScrollAnimation();
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation();

  const handleCardClick = (cardId: string) => {
    // If clicking on the active card, collapse it
    if (activeCard === cardId) {
      setActiveCard(null);
    } else {
      setActiveCard(cardId);
      // Smooth scroll to the clicked card with reduced delay
      setTimeout(() => {
        const element = document.getElementById(cardId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }, 50);
    }
  };
  
  // Use dynamic data from portfolio.ts
  const allExperiences = experienceData;

  const workExperiences = allExperiences.filter(exp => exp.type === 'work');
  const educationExperiences = allExperiences.filter(exp => exp.type === 'education');  return (
    <section id="experience" className="py-8 sm:py-12 lg:py-16 relative bg-black overflow-hidden">
      {/* Background effects - mobile-optimized */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />

      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Mobile-first */}
          <div 
            ref={headerRef}
            className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${
              headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className={`text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 ${
              headerVisible ? 'animate-hero-title' : ''
            }`}>
              Experience & Education
            </h2>
            <p className={`text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 ${
              headerVisible ? 'animate-hero-subtitle' : ''
            }`}>
              A visual journey through my DevOps evolution
              <span className="block sm:inline text-orange-400 font-semibold mt-1 sm:mt-0"> Click timeline nodes to expand details</span>
            </p>
          </div>          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Professional Experience - Mobile-first */}
            <div 
              ref={workRef}
              className={`space-y-4 sm:space-y-5 transition-all duration-800 ${
                workVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 relative">
                Professional Journey
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-20 sm:w-24 lg:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-scale-in" style={{ animationDelay: '400ms' }} />
                <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-scale-in" style={{ animationDelay: '500ms' }} />
              </h3>              <div className="relative">
                {/* Background timeline - Subtle and professional */}
                <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 to-gray-800 rounded-full opacity-60" />
                {workExperiences.map((exp, index) => (
                  <InteractiveTimelineCard
                    key={exp.id}
                    data={exp}
                    index={index}
                    isActive={activeCard === exp.id}
                    onClick={() => handleCardClick(exp.id)}
                  />
                ))}
              </div>
            </div>

            {/* Educational Background - Mobile-first */}
            <div 
              ref={educationRef}
              className={`space-y-4 sm:space-y-5 transition-all duration-800 ${
                educationVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 relative">
                Educational Foundation
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-20 sm:w-24 lg:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-scale-in" style={{ animationDelay: '600ms' }} />
                <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-scale-in" style={{ animationDelay: '700ms' }} />
              </h3>              <div className="relative">
                {/* Background timeline - Subtle and professional */}
                <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 to-gray-800 rounded-full opacity-60" />
                {educationExperiences.map((exp, index) => (
                  <InteractiveTimelineCard
                    key={exp.id}
                    data={exp}
                    index={index + workExperiences.length}
                    isActive={activeCard === exp.id}
                    onClick={() => handleCardClick(exp.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
