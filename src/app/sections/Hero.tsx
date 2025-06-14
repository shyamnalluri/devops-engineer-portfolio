"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { personalInfo } from "../../data/portfolio";
import LiveTerminal from "../components/LiveTerminal";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && containerRef.current) {
      // Apply alternative styles for users who prefer reduced motion
      const elements = containerRef.current.querySelectorAll('.animate-bounce, .animate-pulse');
      elements.forEach(el => {
        (el as HTMLElement).style.animation = 'none';
      });
    }  }, []);

  return (
    <section
      id="home"
      className="relative bg-black overflow-hidden"
      ref={containerRef}
      role="region"
      aria-label="Hero section - Introduction to Shyam Nalluri"
    >
      {/* Background effects - mobile-optimized */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" aria-hidden="true" />
        {/* Subtle background gradients */}
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-orange-600/10 via-red-500/5 to-orange-600/5 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-red-500/5 via-orange-500/5 to-red-500/5 rounded-full blur-3xl -z-10" aria-hidden="true" />{/* Main content container - mobile-first layout */}
      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          
            {/* Left column - Terminal component */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <LiveTerminal />
                
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

            {/* Right column - Text content */}
            <div className="text-left space-y-6 lg:space-y-8 order-2 lg:order-2">              {/* Small intro text */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-orange-400 text-mobile-base sm:text-lg font-mono"
              >
                Hello, I'm
              </motion.p>

              {/* Main name - clean and bold */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-mobile-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight"
              >
                {personalInfo.name}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-mobile-xl sm:text-2xl lg:text-3xl font-light text-gray-300"
              >
                {personalInfo.subtitle}
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-mobile-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl"
                aria-label="Professional summary"
              >
                {personalInfo.description}
              </motion.p>

              {/* Action buttons - multiple like in the design */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex flex-wrap gap-4 pt-6"
              >
                {/* Primary CTA */}
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
                  className="group inline-flex items-center justify-center px-8 py-4 text-mobile-base sm:text-lg min-h-[56px] bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 font-medium cursor-pointer"
                  aria-label="Hire me for opportunities"
                  type="button"
                >
                  <span>Hire Me</span>
                  <FaArrowRight className="ml-3 text-sm transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                </button>

                {/* Secondary buttons */}
                <button
                  className="group inline-flex items-center justify-center px-6 py-4 text-mobile-base sm:text-lg min-h-[56px] bg-transparent border-2 border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 font-medium cursor-pointer"
                  aria-label="View resume"
                  type="button"
                >
                  <span>Resume</span>
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                  className="group inline-flex items-center justify-center px-6 py-4 text-mobile-base sm:text-lg min-h-[56px] bg-transparent border-2 border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 font-medium cursor-pointer"
                  aria-label="Learn more about me"
                  type="button"
                >
                  <span>Learn More</span>
                </button>              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
