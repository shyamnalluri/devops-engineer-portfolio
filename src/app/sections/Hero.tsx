"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
                  <FaArrowRight className="ml-2 text-xs transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                </button>

                {/* Secondary buttons - full width on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">                  <button
                    onClick={() => {
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
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all duration-300"
                  aria-label="Email Contact"
                >
                  <FaEnvelope size={20} />
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
