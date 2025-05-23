"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black px-4 lg:px-8"
      ref={containerRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            className="space-y-8"
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
            <motion.div className="leading-none relative" variants={fadeIn}>
              {/* Gradient triangle decoration */}
              <div 
                className="absolute -left-16 top-4 w-60 h-60 z-0" 
                style={{
                  background: "linear-gradient(135deg, #FB923C 0%, #E11D48 100%)",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  transform: "rotate(45deg)",
                  opacity: 0.7
                }}
              ></div>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 relative z-10">MY NAME</h1>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 relative z-10">
                IS <span className="font-bold text-red-500">SHYAM</span>
              </h1>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-white relative z-10">
                <span className="font-bold">NALLURI...</span>
              </h1>
            </motion.div>

            <motion.p className="text-xl lg:text-2xl text-gray-300 font-medium mt-6" variants={slideFromBottom}>
              DevOps Engineer <span className="font-normal">based in London</span>
            </motion.p>
            
            <motion.div className="pt-8" variants={slideFromBottom}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 text-base font-medium hover:from-orange-500 hover:to-red-500 transition-all"
              >
                Let&apos;s Connect <span className="ml-2"></span>
              </a>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div className="flex items-center gap-4 pt-4" variants={slideFromBottom}>
              <a
                href="https://www.linkedin.com/in/shyamnalluri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <FaLinkedin className="w-5 h-5 text-black"/>
              </a>
              <a
                href="https://github.com/shyamnalluri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <FaGithub className="w-5 h-5 text-black"/>
              </a>
              <a
                href="mailto:nallurishyam@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <FaEnvelope className="w-5 h-5 text-black"/>
              </a>
            </motion.div>
          </motion.div>

          {/* Image Column with Colorful Shape Overlays */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main container for profile and shapes */}
            <div className="relative w-full max-w-[450px] h-[450px]">
              {/* Background shape - orange/red gradient arc */}
              <motion.div 
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 z-0"
                style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 70% 80%, 30% 40%)" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              />

              {/* Background shape - purple gradient */}
              <motion.div 
                className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-violet-400 z-10"
                style={{ clipPath: "polygon(0% 40%, 100% 0%, 100% 100%, 0% 100%)" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />

              {/* Profile image with hexagonal shape */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full h-full">
                  {/* White background frame */}
                  <div 
                    className="absolute inset-0 bg-white"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      transform: "scale(1.05)"
                    }}
                  ></div>
                  
                  {/* Profile image */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ 
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" 
                    }}
                  >
                    <OptimizedImage
                      src="/images/profile.jpg"
                      alt="Shyam Nalluri"
                      className="w-full h-full object-cover object-center"
                      width={500}
                      height={500}
                      priority={true}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Decorative star - top right */}
              <motion.div 
                className="absolute top-10 right-0 text-3xl z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: [0, 15, 0] }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6,
                  rotate: { 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }
                }}
              >
                
              </motion.div>
              
              {/* Decorative star - bottom */}
              <motion.div 
                className="absolute bottom-32 left-1/2 -translate-x-1/2 text-3xl z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: [0, -15, 0] }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7,
                  rotate: { 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }
                }}
              >
                
              </motion.div>

              {/* Additional decorative circle element */}
              <motion.div 
                className="absolute bottom-0 right-0 w-[100px] h-[100px] rounded-full bg-gradient-to-r from-purple-400 to-pink-500 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
