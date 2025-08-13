"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { personalInfo } from "../../data/portfolio";

// Desktop-only dynamic import to avoid shipping terminal to mobile bundles
const LiveTerminalDesktop = dynamic(() => import("../components/LiveTerminal"), { ssr: false });

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && containerRef.current) {
      // Apply alternative styles for users who prefer reduced motion
      const elements = containerRef.current.querySelectorAll('.animate-bounce, .animate-pulse');
      elements.forEach(el => {
        (el as HTMLElement).style.animation = 'none';
      });
    }

    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
    } else {
      // @ts-ignore Safari fallback
      mql.addListener(update);
    }
    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', update);
      } else {
        // @ts-ignore Safari fallback
        mql.removeListener(update);
      }
    };
  }, []);
  return (
    <section
      id="home"
      className="relative bg-black overflow-hidden"
      ref={containerRef}
      role="region"
      aria-label="Hero section - Introduction to Shyam Nalluri"
    >      {/* Available for Opportunities Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20"
      >
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs sm:text-sm font-medium">
            Available for Opportunities
          </span>
        </div>      </motion.div>

      {/* Main content container - optimized for all screen sizes */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Responsive layout with proper spacing to prevent overlap */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-8 xl:gap-12 items-center justify-center min-h-screen py-12 sm:py-16 lg:py-8 xl:py-0">
          
            {/* Terminal component - dynamically loaded on desktop only */}
            {isDesktop && (
            <div className="hidden lg:flex justify-center lg:justify-start order-1 lg:order-1 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative flex justify-center lg:justify-start max-w-full"
              >
                <LiveTerminalDesktop />
                
                {/* Floating tech icons around terminal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-orange-400 text-sm">🚀</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute -bottom-6 -left-6 w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-orange-400 text-lg">⚙️</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="absolute top-1/2 -right-8 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-green-400 text-xs">☁️</span>
                </motion.div>
              </motion.div>
            </div>
            )}            {/* Main content - Properly contained with responsive spacing */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-6 order-1 lg:order-2 w-full max-w-2xl lg:max-w-full mx-auto relative px-0 lg:px-2 xl:px-4 lg:min-w-0">              {/* Small intro text - larger on desktop */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}                className="text-orange-400 text-base sm:text-lg lg:text-xl xl:text-2xl font-mono mb-2 sm:mb-3"
              >
                Hello, I&apos;m
              </motion.p>{/* Main name - responsive sizing for all screen sizes */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-white leading-tight -mt-2 sm:-mt-3"
              >
                {personalInfo.name}
              </motion.h1>              {/* Subtitle - responsive sizing */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-lg sm:text-xl lg:text-lg xl:text-2xl 2xl:text-3xl font-light text-gray-300"
              >
                {personalInfo.subtitle}
              </motion.h2>
                {/* Description - responsive sizing */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
                aria-label="Professional summary"
              >
                {personalInfo.description}
              </motion.p>              {/* Action buttons - mobile-optimized sizing */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 justify-center lg:justify-start items-center w-full"
              >
                {/* Primary CTA - full width on mobile */}
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'click_hire_me', { section: 'hero' });
                    }
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium w-full sm:w-auto max-w-xs bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 cursor-pointer"
                  aria-label="Hire me for opportunities"
                  type="button"
                >
                  <span>Hire Me</span>
                  <svg
                    className="ml-2 w-3 h-3 transition-transform duration-150 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Secondary buttons - full width on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'click_resume', { section: 'hero' });
                      }
                      window.open('/Shyam_Nalluri_Resume.pdf', '_blank', 'noopener,noreferrer');
                    }}
                    className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium w-full sm:w-auto max-w-xs bg-transparent border-2 border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="View resume"
                    type="button"
                  >
                    <span>Resume</span>
                    <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'click_learn_more', { section: 'hero' });
                      }
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium w-full sm:w-auto max-w-xs bg-transparent border-2 border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="Learn more about me"
                    type="button"
                  >
                    <span>Learn More</span>
                  </button>
                </div>
              </motion.div>

              {/* Social icons - visible on mobile, hidden on large screens where terminal is shown */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex justify-center lg:hidden gap-6 pt-6"
              >
                <a 
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300 will-change-transform"
                  aria-label="GitHub Profile"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23 1.915-.532 3.965-.532 5.88 0 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.373 18.627.297 12 .297z" />
                  </svg>
                </a>
                 <a 
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300 will-change-transform"
                  aria-label="LinkedIn Profile"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v12H0zM8 8h4.8v1.7h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.33 6 7.66V20H18v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V20H8z" />
                  </svg>
                </a>
                 <a 
                  href={`mailto:${personalInfo.email}`}
                   className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all duration-300 will-change-transform"
                  aria-label="Email Contact"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M2 5.75A2.75 2.75 0 014.75 3h14.5A2.75 2.75 0 0122 5.75v12.5A2.75 2.75 0 0119.25 21H4.75A2.75 2.75 0 012 18.25V5.75zm2.3.75l7.2 5.4c.3.23.7.23 1 0l7.2-5.4H4.3z" />
                  </svg>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
