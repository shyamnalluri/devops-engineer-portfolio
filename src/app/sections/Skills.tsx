'use client';

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/skills';
import { getIcon } from '../../utils/iconMap';

const Skills = () => {
  const { ref: sectionRef } = useScrollAnimation();

  // Ultra-compact skill card component - optimized like reference
  const SkillCard = ({ skill, index }: { 
    skill: { title: string; icon: string; proficiency?: number }; 
    index: number 
  }) => {
    return (
      <div 
        className="group relative bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700/40 
                   hover:border-orange-500/50 transition-all duration-200 hover:bg-gray-700/70 
                   hover:shadow-md hover:shadow-orange-500/15 hover:scale-[1.02]"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            {getIcon(skill.icon, "w-5 h-5 sm:w-6 sm:h-6 text-orange-400 group-hover:text-orange-300")}
          </div>
          
          {/* Skill Name */}
          <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200 truncate leading-tight">
            {skill.title}
          </span>
        </div>

        {/* Minimal hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 to-red-500/3 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
      </div>
    );
  };  return (    
    <section 
      id="skills" 
      className="py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden"
      ref={sectionRef}
    >
      
      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8 opacity-100 animate-in">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 animate-hero-title">
              Skills & Technologies
            </h2>
            {/* Full-width decorative underline */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
          </div>
          <p className="hidden sm:block text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 animate-hero-subtitle">
            A comprehensive overview of my technical expertise across various domains
          </p>
        </div>        {/* Skills Grid - Three Column Layout */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {skillsData.map((category, categoryIndex) => (
              <div 
                key={category.name} 
                className="mb-4 sm:mb-6"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  <h3 className="px-2 sm:px-3 text-sm sm:text-base font-bold text-white bg-gray-900/50 rounded-full py-1.5">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>

                {/* Skills Grid - Optimized for three-column layout */}
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard 
                      key={`${category.name}-${skill.title}`} 
                      skill={skill} 
                      index={categoryIndex * 10 + skillIndex} 
                    />
                  ))}
                </div>
              </div>            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;