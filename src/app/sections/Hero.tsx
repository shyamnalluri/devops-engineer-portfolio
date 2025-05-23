"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from "react-icons/fa";
import OptimizedImage from "../components/OptimizedImage";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideFromBottom = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

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
      className="relative min-h-screen flex items-center bg-black px-4 sm:px-6 lg:px-8 overflow-hidden pt-16 sm:pt-8 lg:pt-0"
      ref={containerRef}
      role="region"
      aria-label="Hero section - Introduction to Shyam Nalluri"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" aria-hidden="true" />
      
      {/* Top-right gradient - representing cloud/infrastructure */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/15 via-orange-500/10 to-amber-500/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Bottom-left gradient - representing code/automation */}
      <div className="absolute -bottom-10 -left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/15 via-indigo-500/10 to-purple-600/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Central subtle gradient - representing DevOps integration */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/5 via-cyan-500/5 to-sky-500/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Mobile-specific top gradient */}
      <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-purple-900/20 to-transparent lg:hidden" aria-hidden="true" />
      
      <div className="container mx-auto max-w-[1440px]">
        {/* Responsive grid with conditional layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center relative pt-4 lg:pt-0">
          {/* Text Column - First on mobile, left side on desktop */}
          <div className="lg:col-span-6 lg:ml-8">          
          {/* Image Column - Only visible on desktop */}
          <motion.div
            className="hidden lg:block absolute right-0 lg:right-16 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main container for profile and shapes - desktop only */}
            <div className="relative w-[380px] h-[400px]">
              {/* Background shape - orange/red gradient arc */}
              <motion.div 
                className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 z-0"
                style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 70% 80%, 30% 40%)" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                aria-hidden="true"
              />

              {/* Background shape - purple gradient */}
              <motion.div 
                className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-violet-400 z-10"
                style={{ clipPath: "polygon(0% 40%, 100% 0%, 100% 100%, 0% 100%)" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                aria-hidden="true"
              />

              {/* Profile image with hexagonal shape */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[380px] z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full h-full">
                  {/* Glowing outer border */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      transform: "scale(1.12)",
                      background: "linear-gradient(135deg, #FF4500 0%, #FF0080 50%, #6A5ACD 100%)",
                      opacity: 0.6,
                      filter: "blur(8px)"
                    }}
                    aria-hidden="true"
                  ></div>

                  {/* White background frame */}
                  <div 
                    className="absolute inset-0 bg-white"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      transform: "scale(1.06)",
                      boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
                    }}
                    aria-hidden="true"
                  ></div>
                  
                  {/* Profile image */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      filter: "contrast(1.05) saturate(1.1)"
                    }}
                  >
                    <OptimizedImage
                      src="/images/profile.jpg"
                      alt="Shyam Nalluri - DevOps Engineer"
                      className="w-full h-full object-cover object-center scale-110"
                      width={500}
                      height={500}
                      priority={true}
                      fetchPriority="high"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Geometric patterned overlay */}
                  <div 
                    className="absolute inset-0 mix-blend-soft-light opacity-30"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"
                    }}
                    aria-hidden="true"
                  ></div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute top-10 right-6 z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                aria-hidden="true"
              >
                <div className="relative">
                  {/* Glowing dot with rings */}
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-red-500/30"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-orange-500/30 animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-red-500/20"></div>
                </div>
              </motion.div>
                
              {/* Code element */}
              <motion.div 
                className="absolute bottom-32 left-10 z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                aria-hidden="true"
              >
                <div className="relative text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  <span className="opacity-80">{`{ }`}</span>
                  <motion.div 
                    className="absolute -inset-1 rounded-md opacity-40"
                    animate={{ boxShadow: ['0 0 0px rgba(56, 182, 255, 0.6)', '0 0 8px rgba(56, 182, 255, 0.6)', '0 0 0px rgba(56, 182, 255, 0.6)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
              </motion.div>
              
              {/* Abstract pattern */}
              <motion.div 
                className="absolute bottom-4 right-4 z-20 w-20 h-20 opacity-60"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                aria-hidden="true"
              >
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 opacity-50">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <defs>
                        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <path d="M10,30 L40,30 L40,10 L60,10 L60,40 L90,40 L90,60 L70,60 L70,90 L50,90 L50,70 L10,70 Z" 
                            fill="none" 
                            stroke="url(#circuitGradient)" 
                            strokeWidth="2" 
                            strokeDasharray="3,3" />
                      <circle cx="40" cy="30" r="3" fill="#7E22CE" />
                      <circle cx="60" cy="10" r="3" fill="#4F46E5" />
                      <circle cx="60" cy="40" r="3" fill="#7E22CE" />
                      <circle cx="90" cy="40" r="3" fill="#4F46E5" />
                      <circle cx="70" cy="60" r="3" fill="#7E22CE" />
                      <circle cx="70" cy="90" r="3" fill="#4F46E5" />
                      <circle cx="50" cy="70" r="3" fill="#7E22CE" />
                      <circle cx="10" cy="70" r="3" fill="#4F46E5" />
                    </svg>
                    <motion.div 
                      className="absolute inset-0 bg-transparent"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-6 md:space-y-8 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* Mobile profile image - Only visible on mobile */}
          <motion.div className="flex justify-center lg:hidden mb-6 md:mb-8" variants={fadeIn}>
            <div className="relative w-[180px] h-[200px] sm:w-[220px] sm:h-[240px]">
              {/* Hexagon shape with gradient border */}
              <div 
                className="absolute inset-0"
                style={{ 
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  transform: "scale(1.08)",
                  background: "linear-gradient(135deg, #FF4500 0%, #FF0080 50%, #6A5ACD 100%)",
                  opacity: 0.6,
                  filter: "blur(6px)"
                }}
                aria-hidden="true"
              ></div>

              {/* White background */}
              <div 
                className="absolute inset-0 bg-white"
                style={{ 
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  transform: "scale(1.04)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
                }}
                aria-hidden="true"
              ></div>
              
              {/* Profile image */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  filter: "contrast(1.05) saturate(1.1)"
                }}
              >
                <OptimizedImage
                  src="/images/profile.jpg"
                  alt="Shyam Nalluri - DevOps Engineer"
                  className="w-full h-full object-cover object-center scale-110"
                  width={300}
                  height={300}
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
              
              {/* Pattern overlay */}
              <div 
                className="absolute inset-0 mix-blend-soft-light opacity-30"
                style={{ 
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"
                }}
                aria-hidden="true"
              ></div>
            </div>
          </motion.div>

          <motion.div className="leading-none relative" variants={fadeIn}>
              {/* Tech-inspired gradient triangle decoration - Hidden on mobile, visible on larger screens */}
              <div 
                className="absolute -left-16 top-4 w-60 h-60 z-0 hidden lg:block" 
                style={{
                  background: "linear-gradient(135deg, #FB923C 0%, #E11D48 100%)",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  transform: "rotate(45deg)",
                  opacity: 0.7
                }}
                aria-hidden="true"
              ></div>
              
              {/* Animated circuit-board pattern overlay - Hidden on mobile, visible on larger screens */}
              <div 
                className="absolute -left-16 top-4 w-60 h-60 z-1 animate-pulse hidden lg:block" 
                style={{
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  transform: "rotate(45deg)",
                  opacity: 0.2
                }}
                aria-hidden="true"
              ></div>
              
              {/* Centered, slightly smaller text for mobile */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-4 relative z-10">
                <span className="inline-block">Shyam</span> <span className="font-bold text-red-500 inline-block">Nalluri</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-1 sm:mb-2 relative z-10">
                DevOps Engineer
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mx-auto lg:mx-0 max-w-md mb-3 sm:mb-4 relative z-10" aria-label="Professional summary">
                Delivering scalable infrastructure solutions & automated workflows for modern enterprises
              </p>
            </motion.div>

            <motion.p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium mt-4 sm:mt-6" variants={slideFromBottom}>
              Specialized in <span className="relative inline-block border-b-2 border-red-500/70 pb-1 hover:text-white transition-colors focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-red-500" tabIndex={0} role="text">cloud infrastructure</span> & automation
              <span className="font-normal block mt-2">
                <span className="inline-flex gap-2 items-center justify-center lg:justify-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" role="presentation" aria-hidden="true"></span>
                  <span>based in London</span>
                </span>
              </span>
            </motion.p>
            
            <motion.div className="pt-5 sm:pt-6 md:pt-8" variants={slideFromBottom}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:from-orange-500 hover:to-red-500 active:scale-95 transition-all rounded-lg shadow-lg shadow-red-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation"
                aria-label="Contact Shyam Nalluri to discuss DevOps opportunities"
              >
                <span>Let&apos;s Connect</span> 
                <FaArrowRight className="ml-2 text-sm" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div 
              className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-4" 
              variants={slideFromBottom}
              role="navigation" 
              aria-label="Social media links"
            >
              <a
                href="https://www.linkedin.com/in/shyamnalluri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-md hover:shadow-blue-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 touch-manipulation"
                aria-label="Visit Shyam Nalluri's LinkedIn profile"
              >
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-black" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/shyamnalluri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 touch-manipulation"
                aria-label="Visit Shyam Nalluri's GitHub profile"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-black" aria-hidden="true" />
              </a>
              <a
                href="mailto:nallurishyam@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-md hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 touch-manipulation"
                aria-label="Send email to Shyam Nalluri"
              >
                <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-black" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
          </div>
          
          {/* Right column for desktop image */}
          <div className="hidden lg:block lg:col-span-6 relative">
            {/* Image is rendered by the motion.div positioned absolutely */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
