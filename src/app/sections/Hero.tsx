"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { personalInfo } from "../../data/portfolio";

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
    }
  }, []);
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      role="region"
      aria-label="Hero section - Introduction to Shyam Nalluri"
    >      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" aria-hidden="true" />
      
      {/* Subtle background gradients */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-purple-600/5 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-emerald-500/5 via-cyan-500/5 to-sky-500/5 rounded-full blur-3xl -z-10" aria-hidden="true" />      
      
      {/* Centered content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center space-y-6 lg:space-y-8">          {/* Main greeting and name in one line */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-widia test-widia font-normal tracking-wide text-white leading-none whitespace-nowrap"
            style={{ fontFamily: "'Widia', 'Arial Black', sans-serif" }}          >
            <span className="text-gray-300">Hello, I&apos;m </span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{personalInfo.name.split(' ')[0]}</span>
          </motion.h1>          {/* Subtitle - clean sans-serif, larger */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mt-6"
          >
            {personalInfo.subtitle}
          </motion.h2>
            {/* Description - larger and more readable */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mt-8"
            aria-label="Professional summary"
          >
            {personalInfo.description}
          </motion.p>{/* Professional tagline */}          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mt-6"
          >
            <span className="relative inline-block pb-1 hover:text-white transition-colors focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-red-500" tabIndex={0} role="text">
              <span className="relative z-10">Engineering secure, scalable cloud platforms</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500/70 to-red-500/70"></span>
            </span>
          </motion.p>          {/* CTA Button - Clean and Simple */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="pt-8 lg:pt-12"
          >
            <button
              onClick={() => {
                // Simple scroll to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg lg:text-xl min-h-[56px] bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 font-medium cursor-pointer"
              aria-label="Contact me for opportunities"
              type="button"
            >
              <span>Hire Me</span>
              <FaArrowRight className="ml-3 text-base transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </div>      {/* Enhanced Scroll indicator with hovering/jumping effects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          className="group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:translate-y-[-4px]"
          aria-label="Scroll to about section"
        >
          <span className="text-sm mb-2 text-orange-500/70 group-hover:text-orange-400 transition-colors duration-300 font-medium">
            Scroll down
          </span>
          
          {/* Animated chevron with multiple effects */}
          <div className="relative">
            {/* Background glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 scale-150"></div>
            
            {/* Main chevron icon */}
            <FaChevronDown className="relative text-xl text-orange-500/70 group-hover:text-orange-400 transition-all duration-300 animate-bounce group-hover:animate-pulse" />
            
            {/* Secondary bouncing chevron for enhanced effect */}
            <FaChevronDown className="absolute top-0 left-0 text-xl text-orange-500/30 group-hover:text-orange-300/50 transition-all duration-300 animate-bounce delay-100 group-hover:animate-ping" />
          </div>
          
          {/* Subtle underline effect */}
          <div className="w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 mt-1 rounded-full"></div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
