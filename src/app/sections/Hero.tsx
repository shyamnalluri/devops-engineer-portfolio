"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 rounded-full"
          initial={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: 0.1,
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: [0.1, 0.2, 0.1],
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
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 pt-16 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Shyam Nalluri
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-gray-300 mb-8 h-[60px] flex items-center justify-center"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-full font-medium transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;