"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "../components/AnimatedSection";
import DevOpsTerminal from "../components/DevOpsTerminal";
import LinkedInRecommendations from "../components/LinkedInRecommendations";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Handle mouse movement for interactive orbs
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const orb1X = useTransform(
    mouseX,
    [-1, 1],
    ["-20vw", "-40vw"]
  );
  const orb1Y = useTransform(
    mouseY,
    [-1, 1],
    ["20vh", "30vh"]
  );
  const orb2X = useTransform(
    mouseX,
    [-1, 1],
    ["110vw", "90vw"]
  );
  const orb2Y = useTransform(
    mouseY,
    [-1, 1],
    ["70vh", "60vh"]
  );

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      url: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="w-6 h-6" />,
      url: "mailto:your.email@example.com",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.svg')] mix-blend-soft-light" />

      {/* Fixed Social Links */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="flex flex-col items-center">
          <div className="w-px h-32 bg-gradient-to-b from-transparent to-gray-400 mb-6"></div>
          <div className="flex flex-col gap-6 mb-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: 5 }}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <div className="w-px h-32 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-12 md:py-0 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <AnimatedSection animation="slideLeft" delay={0.2}>              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 leading-tight pt-4">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="text-blue-400">
                  Shyam Nalluri
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block ml-[2px] -mr-[1px] w-[3px] h-[1em] align-middle bg-current"
                  />
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.4}>
              <p className="text-xl sm:text-2xl bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent font-semibold mb-12">
                DevOps Engineer & Cloud Architect
              </p>
            </AnimatedSection>

            {/* LinkedIn Recommendations */}
            <AnimatedSection animation="slideUp" delay={0.5}>
              <LinkedInRecommendations />
            </AnimatedSection>
          </div>

          <div className="lg:block">
            <AnimatedSection
              animation="scale"
              delay={0.4}
              className="relative h-[500px] hidden lg:block"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full transform hover:scale-[1.02] transition-all duration-300"
              >
                <DevOpsTerminal />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </motion.div>

      {/* Layered background with grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Interactive Glowing orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-sm font-light tracking-wider">Scroll Down</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;