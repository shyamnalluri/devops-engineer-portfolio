'use client';

import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/portfolio';
import { getIcon } from '../../utils/iconMap';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 80,
    animationClass: 'animate-slide-up'
  });

  // Generate categories dynamically from data
  const categories = ['All', ...skillsData.map(category => category.name)];

  // Flatten skills for filtering
  const allSkills = skillsData.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.name
    }))
  );

  const filteredSkills = selectedCategory === 'All' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === selectedCategory);  return (    
    <section 
      id="skills" 
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background effects - mobile-optimized */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
      
      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 opacity-100 animate-in">
          <h2 className="text-mobile-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Technologies I Use
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-mobile-base sm:text-lg lg:text-xl mb-4 sm:mb-6 px-2">
            Over the years, I have mastered various technologies that enable me to build robust, 
            scalable, and efficient infrastructure solutions.
          </p>

          {/* Category Filter with enhanced animations - Mobile-first horizontal scroll */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 pb-4 sm:pb-0">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`touch-button px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium btn-professional focus-ring transition-all duration-200 ease-primary whitespace-nowrap
                    ${selectedCategory === category 
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20' 
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">          {filteredSkills.map((skill, index) => (
            <div
              key={skill.title}
              className="group opacity-100 animate-in card-hover"
              style={{ animationDelay: `${(index + 3) * 80}ms` }}
            >
              <div className="mobile-card flex flex-col items-center justify-center p-3 sm:p-4 lg:p-5 bg-gray-900/80 hover:bg-gray-800 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 ease-secondary shadow-lg h-full relative overflow-hidden min-h-[80px] sm:min-h-[100px]">
                {/* Skill icon with dynamic rendering - Mobile-optimized */}
                <div className="text-2xl sm:text-3xl lg:text-4xl text-gradient-primary mb-2 sm:mb-3 icon-spin transition-all duration-300 ease-secondary">
                  {getIcon(skill.icon, "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6")}
                </div>
                <span className="text-xs sm:text-sm lg:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-200 ease-primary text-center leading-tight">
                  {skill.title}
                </span>
                
                {/* Proficiency indicator (optional) - Mobile-responsive */}
                {skill.proficiency && (
                  <div className="w-full mt-1 sm:mt-2 h-0.5 sm:h-1 bg-gray-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                )}
                
                {/* Enhanced hover effects */}
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary" />
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary rounded-xl" />
                
                {/* Scale animation on hover - Touch-friendly */}
                <div className="absolute inset-0 rounded-xl border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;