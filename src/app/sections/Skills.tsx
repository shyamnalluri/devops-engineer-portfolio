'use client';

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { skillsData } from '../../data/skills';
import { getIcon } from '../../utils/iconMap';
import { useEffect, useRef, useState } from 'react';

// Category accent palette (professional yet vivid)
const categoryAccent: Record<string, { header: string; hoverBorder: string; stripe: string } > = {
  'Cloud & Infrastructure': { header: 'bg-sky-500/15 text-sky-200', hoverBorder: 'hover:border-sky-500/40', stripe: 'bg-sky-500/30' },
  'Container & Orchestration': { header: 'bg-teal-500/15 text-teal-200', hoverBorder: 'hover:border-teal-500/40', stripe: 'bg-teal-500/30' },
  'CI/CD & GitOps': { header: 'bg-violet-500/15 text-violet-200', hoverBorder: 'hover:border-violet-500/40', stripe: 'bg-violet-500/30' },
  'Monitoring & Observability': { header: 'bg-amber-500/15 text-amber-200', hoverBorder: 'hover:border-amber-500/40', stripe: 'bg-amber-500/30' },
  'Security & Policy': { header: 'bg-pink-500/15 text-pink-200', hoverBorder: 'hover:border-pink-500/40', stripe: 'bg-pink-500/30' },
  'Programming & OS': { header: 'bg-emerald-500/15 text-emerald-200', hoverBorder: 'hover:border-emerald-500/40', stripe: 'bg-emerald-500/30' },
};

const Skills = () => {
  const { ref: sectionRef } = useScrollAnimation();

  // Ultra-compact skill card component - optimized
  const SkillCard = ({ skill, index, hoverBorderClass, stripeClass }: { 
    skill: { title: string; icon: string; proficiency?: number }; 
    index: number; 
    hoverBorderClass: string;
    stripeClass: string;
  }) => {
    return (
      <div 
        data-card
        className={`group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-md border border-gray-700/40 
                   ${hoverBorderClass} transition-all duration-200 hover:bg-gray-700/70`}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {/* Subtle left accent stripe */}
        <span className={`absolute left-0 top-0 h-full w-[2px] ${stripeClass}`} aria-hidden />
        <div className="px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center gap-2 sm:gap-2.5">
          {/* Icon */}
          <div className="flex-shrink-0">
            {getIcon(skill.icon, "w-5 h-5 sm:w-5 sm:h-5 text-orange-400")}
          </div>
          {/* Skill Name */}
          <span className="text-xs sm:text-sm font-medium text-gray-200 transition-colors duration-200 truncate leading-tight">
            {skill.title}
          </span>
        </div>
      </div>
    );
  };

  // Single internal scroll height like certifications
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Title underline sizing
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState<number | null>(null);

  useEffect(() => {
    const computeHeight = () => {
      const sc = scrollRef.current;
      if (!sc) return;
      const cards = Array.from(sc.querySelectorAll('[data-card]')) as HTMLElement[];
      if (cards.length === 0) return;
      const first = cards[0];
      const firstTop = first.offsetTop;
      let rowOffset: number | null = null;
      for (let i = 1; i < cards.length; i++) {
        const off = cards[i].offsetTop - firstTop;
        if (off > 0) { rowOffset = off; break; }
      }
      const firstHeight = first.getBoundingClientRect().height;
      const verticalGapEstimate = 12; // corresponds to gap-1.5/2 in inner grids
      const effectiveRow = rowOffset ?? (firstHeight + verticalGapEstimate);
      const visibleRows = 6; // show ~6 rows of skill tiles
      const desiredHeight = Math.max(firstHeight, Math.floor(effectiveRow * visibleRows));
      setContainerHeight(desiredHeight);
    };

    const rId = window.requestAnimationFrame(() => {
      computeHeight();
      setTimeout(computeHeight, 120);
      setTimeout(computeHeight, 300);
    });
    window.addEventListener('resize', computeHeight);
    return () => {
      window.cancelAnimationFrame(rId);
      window.removeEventListener('resize', computeHeight);
    };
  }, []);

  useEffect(() => {
    const el = titleTextRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.getBoundingClientRect().width;
      setUnderlineWidth(Math.max(0, Math.floor(w * 0.8)));
    };
    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <section 
      id="skills" 
      className="relative overflow-hidden"
      ref={sectionRef}
      role="region"
      aria-label="Skills and technologies"
    >
      <div className="section-wrap relative z-10">
        <div className="section-header opacity-100 animate-in">
          <h2 className="section-title"><span ref={titleTextRef} className="inline-block">Skills & Technologies</span></h2>
          <div
            className="mx-auto mt-1 md:mt-2 h-0.5 w-72 sm:w-96 md:w-[28rem] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded"
            style={underlineWidth ? { width: `${underlineWidth}px` } : undefined}
          />
          <p className="section-subtitle">A comprehensive overview of my technical expertise across various domains</p>
        </div>

        {/* Single scrollable container with tinted headers */}
        <div className="w-full max-w-7xl mx-auto">
          <div
            ref={scrollRef}
            className="overflow-y-auto scrollbar-hide"
            style={{ maxHeight: containerHeight ? `${containerHeight}px` : undefined }}
            role="region"
            aria-label="Scrollable skills list"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4" aria-label="Skills grid">
              {skillsData.map((category, categoryIndex) => {
                const accent = categoryAccent[category.name] || { header: 'bg-gray-900/70 text-white', hoverBorder: 'hover:border-orange-500/40', stripe: 'bg-orange-500/30' };
                return (
                  <div key={category.name} className="mb-3 sm:mb-4">
                    {/* Category Header - tinted */}
                    <div className="mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                        <h3 className={`px-2 sm:px-3 text-xs sm:text-sm font-bold rounded-full py-1 ${accent.header}`}>
                          {category.name}
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                      </div>
                    </div>

                    {/* Inner tiles (unchanged size) */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pr-1">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillCard 
                          key={`${category.name}-${skill.title}`} 
                          skill={skill} 
                          index={categoryIndex * 10 + skillIndex} 
                          hoverBorderClass={accent.hoverBorder}
                          stripeClass={accent.stripe}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;