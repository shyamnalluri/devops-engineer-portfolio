'use client';

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/portfolio';
import { getIcon } from '../../utils/iconMap';
import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    stagger: true,
    staggerDelay: 80,
    animationClass: 'animate-slide-up'
  });

  // State for tracking visible cards during scroll
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Flatten all skills into a single array
  const allSkills = skillsData.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.name
    }))
  );  // Get random card size variant with beautiful distribution for mobile
  const getCardSize = (index: number) => {
    const variants = [
      'tiny',     // 25% - New super small size
      'small',    // 30%
      'medium',   // 25% 
      'large',    // 15%
      'extra'     // 5%
    ];
    
    // Enhanced weights for more beautiful mobile layout
    const weights = [25, 30, 25, 15, 5];
    
    // Multi-layered randomization for natural distribution
    const seed1 = (index * 19 + 31) % 100;
    const seed2 = (index * 7 + 13) % 100;
    const seed3 = (index * 23 + 11) % 100;
    const random = (seed1 + seed2 + seed3) / 3;
    
    // Add position-based variance for better visual flow
    const positionVariance = (index % 7) * 3;
    const finalRandom = (random + positionVariance) % 100;
    
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (finalRandom < cumulative) return variants[i];
    }
    return 'medium';
  };

  // Enhanced scroll-based visibility tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const containerHeight = containerRect.height;
      
      // Calculate visible area boundaries with buffer zones
      const visibleTop = containerTop + containerHeight * 0.1; // 10% buffer from top
      const visibleBottom = containerBottom - containerHeight * 0.1; // 10% buffer from bottom

      const newVisibleCards = new Set<number>();

      cardRefs.current.forEach((cardRef, index) => {
        if (!cardRef) return;
        
        const cardRect = cardRef.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        
        // Card is visible if its center is within the visible area
        if (cardCenter >= visibleTop && cardCenter <= visibleBottom) {
          newVisibleCards.add(index);
        }
      });

      setVisibleCards(newVisibleCards);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [allSkills.length]);
  // Skill card component with random sizes and scroll animations
  const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
    const size = getCardSize(index);
    const isVisible = visibleCards.has(index);    const sizeStyles = {
      tiny: {
        container: "h-12 sm:h-20",
        icon: "w-3 h-3 sm:w-6 sm:h-6",
        title: "text-xs sm:text-sm",
        padding: "p-1.5 sm:p-2"
      },
      small: {
        container: "h-16 sm:h-24",
        icon: "w-4 h-4 sm:w-7 sm:h-7",
        title: "text-xs sm:text-sm",
        padding: "p-2 sm:p-3"
      },
      medium: {
        container: "h-22 sm:h-28",
        icon: "w-6 h-6 sm:w-8 sm:h-8",
        title: "text-xs sm:text-base",
        padding: "p-2.5 sm:p-3"
      },
      large: {
        container: "h-28 sm:h-32",
        icon: "w-8 h-8 sm:w-10 sm:h-10",
        title: "text-sm sm:text-lg font-medium sm:font-semibold",
        padding: "p-3 sm:p-4"
      },
      extra: {
        container: "h-32 sm:h-36",
        icon: "w-10 h-10 sm:w-12 sm:h-12",
        title: "text-sm sm:text-xl font-semibold sm:font-bold",
        padding: "p-3.5 sm:p-4"
      }
    };

    const styles = sizeStyles[size];
    
    return (
      <div 
        ref={(el) => {
          cardRefs.current[index] = el;
        }}        className={`break-inside-avoid mb-2 sm:mb-4 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-40 transform translate-y-4 scale-95'
        }`}
        style={{
          transitionDelay: `${(index % 10) * 50}ms` // Staggered animation based on index
        }}
      >        <div className={`${styles.container} ${styles.padding} bg-gray-800/90 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-700/90 transition-all duration-300 flex flex-col items-center justify-center border border-gray-700/50 hover:border-orange-500/40 relative overflow-hidden group ${
          isVisible ? 'hover:shadow-xl hover:shadow-orange-500/20' : ''
        }`}>          {/* Enhanced gradient overlay for larger cards */}
          {(size === 'large' || size === 'extra') && (
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 transition-opacity duration-500 ${
              isVisible ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`} />
          )}
          
          {/* Medium gradient overlay for medium cards */}
          {size === 'medium' && (
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 transition-opacity duration-500 ${
              isVisible ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`} />
          )}
            {/* Skill icon with enhanced visibility animation */}
          <div className={`mb-1 sm:mb-2 sm:mb-3 relative z-10 transition-all duration-500 ${
            isVisible ? 'transform rotate-0' : 'transform rotate-12'
          }`}>
            {getIcon(skill.icon, `${styles.icon} text-orange-400 ${size === 'extra' ? 'drop-shadow-lg' : ''} ${
              isVisible ? 'opacity-100' : 'opacity-70'
            } transition-all duration-500`)}
          </div>
          
          {/* Skill title with fade animation */}
          <span className={`text-center ${styles.title} text-gray-200 font-medium relative z-10 leading-tight transition-all duration-500 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-80 transform translate-y-1'
          }`}>
            {skill.title}
          </span>
          
          {/* Enhanced special glow effect for extra large cards */}
          {size === 'extra' && (
            <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/15 to-orange-500/20 rounded-xl transition-opacity duration-700 ${
              isVisible ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
            }`} />
          )}
          
          {/* Subtle pulse effect for visible cards */}
          {isVisible && size === 'extra' && (
            <div className="absolute inset-0 bg-orange-500/5 rounded-xl animate-pulse opacity-50" />
          )}
        </div>
      </div>
    );
  };

  return (    
    <section 
      id="skills" 
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"
      ref={sectionRef}
    >      {/* Background effects - professional and subtle */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-orange-500/8 to-red-500/8 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-gray-500/8 to-orange-500/8 rounded-full -z-0 blur-3xl" />
      
      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 opacity-100 animate-in">
          <h2 className="text-mobile-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Technologies I Use
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-mobile-base sm:text-lg lg:text-xl mb-4 sm:mb-6 px-2">
            Over the years, I have mastered various technologies that enable me to build robust, 
            scalable, and efficient infrastructure solutions.
          </p>
        </div>        {/* Enhanced Masonry Skills Layout with Scroll Animations */}
        <div className="w-full max-w-6xl mx-auto">          <div 
            ref={containerRef}
            className="h-[65vh] overflow-y-auto sm:scrollbar-thin sm:scrollbar-track-gray-900/50 sm:scrollbar-thumb-orange-500/60 sm:hover:scrollbar-thumb-orange-400/80 sm:pr-3 py-2 scroll-smooth scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              scrollbarColor: 'rgba(249, 115, 22, 0.6) rgba(17, 24, 39, 0.5)'
            }}
          >
            <div className="columns-3 sm:columns-3 lg:columns-4 xl:columns-5 gap-1.5 sm:gap-4 space-y-0" style={{ orphans: 1, widows: 1 }}>
              {allSkills.map((skill, index) => (
                <SkillCard key={`skill-${index}`} skill={skill} index={index} />
              ))}
            </div>
            
            {/* Spacer to ensure scrolling works properly */}
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;