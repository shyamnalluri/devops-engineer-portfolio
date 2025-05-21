'use client';

import { motion } from 'framer-motion';
import { FaCode, FaCloud, FaShieldAlt, FaTools } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaCloud className="w-6 h-6" />,
      title: "Cloud Architecture",
      description: "Designing resilient and scalable cloud solutions"
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      title: "Infrastructure as Code",
      description: "Automating infrastructure deployment with modern tools"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Security First",
      description: "Implementing robust security practices"
    },
    {
      icon: <FaTools className="w-6 h-6" />,
      title: "DevOps Culture",
      description: "Fostering collaboration and continuous improvement"
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/10 -z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              About Me
            </span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 p-10 rounded-xl backdrop-blur-xl border border-gray-700/50 shadow-[0_0_25px_-5px_rgba(59,130,246,0.1)] hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.2)] transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* About Text Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300/90 text-lg leading-relaxed text-justify first-letter:text-3xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-1">
                    I&apos;m a passionate DevOps Engineer who thrives on transforming development processes 
                    and building robust cloud infrastructures. In today&apos;s fast-paced tech landscape, 
                    I serve as the bridge between development and operations, crafting solutions that 
                    make deployment seamless and infrastructure reliable.
                  </p>
                  <p className="text-gray-300/90 text-lg leading-relaxed text-justify">
                    My approach combines automation-first thinking with cloud-native architectures. 
                    I&apos;ve helped organizations reduce deployment times by <span className="text-blue-400 font-semibold">70%</span> and achieve significant 
                    cost savings through optimized cloud infrastructure. Every challenge is an 
                    opportunity to implement innovative solutions that scale.
                  </p>
                </div>
              </motion.div>

              {/* Highlights Grid Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-4"
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="group flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-blue-500/50 hover:from-blue-900/20 hover:to-gray-800/50 transition-all duration-300"
                  >
                    <div className="text-blue-400 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;