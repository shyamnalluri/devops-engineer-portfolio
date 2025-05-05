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
      className="relative min-h-screen flex items-center"
      ref={containerRef}
    >
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-12 md:py-0 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <AnimatedSection animation="slideLeft" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Hi, I&apos;m Shyam Nalluri
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.4}>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8">
                DevOps Engineer & Cloud Architect
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="#portfolio"
                  onClick={(e) => scrollToSection(e, "#portfolio")}
                  className="group bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden w-fit mx-auto sm:mx-0"
                >
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="group border-2 border-blue-500 text-blue-500 hover:text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-fit mx-auto sm:mx-0"
                >
                  <span className="relative z-10">Contact Me</span>
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection
            animation="scale"
            delay={0.4}
            className="relative h-[500px] hidden lg:block"
          >
            <DevOpsTerminal />
          </AnimatedSection>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900 pointer-events-none" />
    </section>
  );
};

export default Hero;