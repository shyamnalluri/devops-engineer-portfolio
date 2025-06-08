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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer transition-all duration-500 group ${
        isActive ? 'mb-8' : 'mb-4'
      } ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        minHeight: isActive ? 'auto' : '80px'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={data.id}
    >
      {/* Dynamic Timeline connector */}
      <div
        className={`absolute left-[23px] top-0 bg-gradient-to-b from-red-500 via-orange-500 to-blue-500 rounded-full transition-all duration-500 ease-spring ${
          isActive ? 'w-1 h-full opacity-100' : 'w-0.5 h-16 opacity-70'
        }`}
      />      {/* Interactive Timeline Node - Mobile-responsive */}
      <div
        className={`absolute left-0 top-3 h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-500 ease-spring touch-button ${
          isActive 
            ? 'border-red-500 bg-gray-800 scale-115 shadow-glow-red' 
            : 'border-gray-500 bg-gray-900 scale-100 shadow-subtle'
        } ${
          isHovered && !isActive ? 'scale-110 shadow-glow-red-soft' : ''
        }`}
      >
        <span 
          className={`text-sm sm:text-base lg:text-lg transition-transform duration-300 ${
            isActive ? 'scale-110' : 'scale-100'
          }`}
        >
          {data.icon}
        </span>
      </div>

      {/* Content Card - Mobile-first responsive */}
      <div
        className={`group transition-all duration-600 ease-spring ${
          isActive 
            ? 'bg-gray-800/90 p-3 sm:p-4 lg:p-6 xl:p-8 pr-2 sm:pr-3 lg:pr-4 xl:pr-6 pl-10 sm:pl-12 lg:pl-16 xl:pl-20 rounded-xl border border-red-500/40 ml-1 sm:ml-2 shadow-glow-subtle backdrop-blur-sm' 
            : 'bg-transparent p-1 sm:p-2 pr-0 pl-10 sm:pl-12 lg:pl-16 xl:pl-20 rounded-lg border border-transparent ml-0'
        }`}
      >        <h4
          className={`font-bold transition-all duration-600 ease-spring cursor-pointer ${
            isActive 
              ? 'text-amber-400 text-base sm:text-lg lg:text-xl xl:text-2xl mb-2 sm:mb-3' 
              : 'text-white text-sm sm:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2'
          }`}
        >
          {data.title}
        </h4>

        <div
          className={`flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm transition-all duration-500 ease-spring ${
            isActive ? 'mb-2 sm:mb-3 lg:mb-4 opacity-100' : 'mb-1 sm:mb-2 opacity-80'
          }`}
        >
          <span className="text-red-400 font-medium">
            {data.company || data.institution}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-400 font-medium">{data.period}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-blue-400 text-xs uppercase tracking-wide font-medium bg-blue-500/10 px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded-full border border-blue-500/20">
            {data.type}
          </span>
        </div>

        {/* Description - Mobile-responsive */}
        <p
          className={`text-gray-300 leading-relaxed transition-all duration-500 ease-spring ${
            isActive 
              ? 'text-sm sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-5 opacity-100' 
              : 'text-xs sm:text-sm leading-normal mb-2 sm:mb-3 opacity-90'
          }`}
        >
          {isActive ? data.description : `${data.description.substring(0, 80)}${data.description.length > 80 ? '...' : ''}`}
        </p>

        {/* Achievements (only show when active) - Mobile-responsive */}
        {isActive && data.achievements && (
          <div
            className={`p-2 sm:p-3 lg:p-4 rounded-lg bg-gradient-to-r from-orange-500/8 to-yellow-500/8 border border-orange-500/25 mb-3 sm:mb-4 lg:mb-5 overflow-hidden transition-all duration-600 ease-spring animate-fade-in`}
            style={{ animationDelay: '100ms' }}
          >
            <h5 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <span className="text-base">🏆</span>
              Key Achievements:
            </h5>
            <ul className="space-y-2">
              {data.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-300 flex items-start gap-3 animate-slide-up"
                  style={{ animationDelay: `${300 + (i * 50)}ms` }}
                >
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {data.technologies && (
          <div className={`flex flex-wrap gap-2 transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
            {(isActive ? data.technologies : data.technologies.slice(0, 4)).map((tech, i) => (
              <span
                key={tech}
                className={`px-2.5 py-1 text-xs rounded-full border transition-all duration-300 font-medium hover:scale-105 ${
                  isActive 
                    ? 'bg-red-500/12 border-red-500/60 text-amber-400 hover:bg-red-500/20 hover:border-red-500/80' 
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-red-500/12 hover:border-red-500/60'
                } animate-scale-in`}
                style={{ animationDelay: `${isActive ? 100 + (i * 30) : 0}ms` }}
              >
                {tech}
              </span>
            ))}
            {!isActive && data.technologies.length > 4 && (
              <span className="px-2.5 py-1 text-xs rounded-full border border-gray-600 bg-gray-800 text-gray-400 font-medium animate-scale-in">
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
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">            {/* Professional Experience - Mobile-first */}
            <div 
              ref={workRef}
              className={`space-y-3 sm:space-y-4 transition-all duration-800 ${
                workVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 relative">
                Professional Journey
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-20 sm:w-24 lg:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-scale-in" style={{ animationDelay: '400ms' }} />
                <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-scale-in" style={{ animationDelay: '500ms' }} />
              </h3>

              <div className="relative">
                {/* Background timeline - Mobile-responsive */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full" />
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
              className={`space-y-3 sm:space-y-4 transition-all duration-800 ${
                educationVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-16 relative">
                Educational Foundation
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-20 sm:w-24 lg:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-scale-in" style={{ animationDelay: '600ms' }} />
                <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-scale-in" style={{ animationDelay: '700ms' }} />
              </h3>

              <div className="relative">
                {/* Background timeline - Mobile-responsive */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full" />
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
