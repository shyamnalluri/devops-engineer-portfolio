"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "../components/AnimatedSection";
import DevOpsTerminal from "../components/DevOpsTerminal";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={containerRef}
    >
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-12 md:py-0 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <AnimatedSection animation="slideLeft" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="text-blue-400">Shyam Nalluri</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.4}>
              <p className="text-xl sm:text-2xl bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent font-semibold mb-6 md:mb-8">
                DevOps Engineer & Cloud Architect
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Transforming infrastructure into scalable, automated solutions
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <a
                  href="#portfolio"
                  onClick={(e) => scrollToSection(e, "#portfolio")}
                  className="group bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] relative overflow-hidden w-fit mx-auto sm:mx-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="group bg-transparent hover:bg-blue-500/10 text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-fit mx-auto sm:mx-0 border-2 border-blue-400 text-blue-400 hover:border-blue-300 hover:text-blue-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contact Me
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-6l-8 8-8-8"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection
            animation="scale"
            delay={0.4}
            className="relative h-[500px] hidden lg:block transform hover:scale-[1.02] transition-transform duration-300"
          >
            <DevOpsTerminal />
          </AnimatedSection>
        </div>
      </motion.div>

      {/* Layered background with grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Glowing orb effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

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