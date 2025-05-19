"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

const FloatingElement = ({ delay = 0, children }: { delay: number; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
          initial={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: 0.1,
          }}
          animate={{
            x: mousePosition.x * 20 + Math.random() * 400 - 200,
            y: mousePosition.y * 20 + Math.random() * 400 - 200,
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        const navHeight = 80;
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - navHeight;

        window.scrollTo({
          top: middle,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-16 px-4 overflow-hidden"
    >
      <AnimatedBackground />
      <motion.div 
        className="relative z-10 text-center"
        style={{ y, opacity }}
      >
        <FloatingElement delay={0}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
          >
            Shyam Nalluri
          </motion.h1>
        </FloatingElement>

        <FloatingElement delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8 h-[60px] flex items-center justify-center"
          >
            <TypeAnimation
              sequence={[
                "DevOps Engineer",
                2000,
                "Cloud Architect",
                2000,
                "Infrastructure Specialist",
                2000,
                "Automation Expert",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-blue-400"
            />
          </motion.div>
        </FloatingElement>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.a
            href="#portfolio"
            onClick={(e) => scrollToSection(e, "#portfolio")}
            className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-10"
              initial={{ x: "100%" }}
              whileHover={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="relative group overflow-hidden border-2 border-blue-500 text-blue-400 hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ zIndex: 0 }}
            />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;