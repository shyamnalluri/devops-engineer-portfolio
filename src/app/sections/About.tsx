'use client';
 

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { aboutData } from '../../data/about';
import { useEffect, useRef, useState } from 'react';
 
const About = () => {
  const { ref: headerRef } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ stagger: true });

  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState<number | null>(null);

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
    <section id="about" className="section-wrap" role="region" aria-label="About me" aria-labelledby="about-title">
      
      <div className="section-header" ref={headerRef}>
        <h2 id="about-title" className="section-title"><span ref={titleTextRef} className="inline-block">About Me</span></h2>
        <div className="mx-auto mt-1 md:mt-2 h-0.5 w-56 sm:w-64 md:w-72 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded" style={underlineWidth ? { width: `${underlineWidth}px` } : undefined}></div>
        <p className="section-subtitle hidden sm:block">Get to know the person behind the code</p>
      </div>
      <div className="mt-3 md:mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 items-center">
              {/* Simplified photo */}
              <div
                ref={imageRef}
                className={`relative order-2 lg:order-1 transition-all duration-700 ${
                  imageVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full max-w-[240px] sm:max-w-[260px] mx-auto">
                  {/* Offset accent corners */}
                  <span className="absolute -top-3 -left-3 w-[88%] h-[88%] rounded-[26px] bg-gradient-to-br from-orange-500 to-red-500 opacity-80 blur-[2px]" aria-hidden></span>
                  <span className="absolute -bottom-3 -right-3 w-[88%] h-[88%] rounded-[26px] bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80 blur-[2px]" aria-hidden></span>
                  {/* Main card with image */}
                  <div className="relative rounded-[26px] p-[3px] bg-gradient-to-br from-white/10 to-white/5">
                    <div className="relative rounded-[22px] overflow-hidden bg-gray-900" style={{ aspectRatio: '4 / 5' }}>
                      <Image
                        src="/images/profile.jpg"
                        alt="Portrait of Shyam Nalluri"
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 240px, 60vw"
                        priority={false}
                      />
                      {/* Stronger vignette to blend edges */}
                      <div className="absolute inset-0 rounded-[22px] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.44)_100%)] mix-blend-multiply" />
                      {/* Inset inner shadow for feathering */}
                      <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ boxShadow: 'inset 0 0 48px rgba(0,0,0,0.35)' }} />
                      {/* Subtle inner ring for depth */}
                      <div className="absolute inset-0 rounded-[22px] pointer-events-none ring-1 ring-white/10" />
                    </div>
                  </div>
                </div>
                {/* Personal quote */}
                <blockquote className="mt-3 sm:mt-4 text-center text-sm sm:text-base text-gray-400 italic">
                  “I love cooking during free time.”
                </blockquote>
              </div>

              {/* About Text Column */}
              <div
                ref={textRef}
                className={`space-y-4 sm:space-y-6 md:space-y-6 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: '400ms' }}
              >
                <div className="prose prose-base sm:prose-lg max-w-[66ch] mx-auto prose-invert">
                  <p className={`text-gray-300 text-mobile-base sm:text-lg leading-[1.7] text-left lg:hyphens-auto transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '600ms' }}>
                    {aboutData.description[0]}
                  </p>
                  <p className={`text-gray-400 text-mobile-base sm:text-lg leading-[1.7] text-left lg:hyphens-auto mt-4 sm:mt-6 transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '800ms' }}>
                    {aboutData.description[1]}
                  </p>
                </div>
                {/* Metrics chips */}
                <div className={`grid grid-cols-2 gap-4 md:gap-5 mt-4 sm:mt-6 md:mt-8 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`} style={{ animationDelay: '1000ms' }}>
                  {aboutData.stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={`flex items-center gap-3 h-12 px-3 sm:px-4 rounded-lg border border-gray-700/40 bg-gray-800/40 transition-colors duration-200 ${
                        textVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                      }`}
                      style={{ animationDelay: `${1200 + (index * 100)}ms` }}
                      aria-label={`${stat.value} ${stat.label}`}
                    >
                      <svg className="w-4 h-4 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <circle cx="12" cy="12" r="10" opacity="0.15" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                      <div className="text-base sm:text-lg font-semibold text-white">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-400 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </section>
  );
};
 
export default About;