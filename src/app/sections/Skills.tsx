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
      className="relative overflow-hidden"
      ref={sectionRef}
      role="region"
      aria-label="Skills and technologies"
    >
      
      <div className="section-wrap relative z-10">
        <div className="section-header opacity-100 animate-in">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-divider" />
          <p className="section-subtitle">A comprehensive overview of my technical expertise across various domains</p>
        </div>        {/* Skills Grid - Three Column Layout */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg" tabIndex={0} aria-label="Skills grid">
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