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
    <section id="about" className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-10 rounded-xl backdrop-blur-sm border border-gray-700 shadow-xl"
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
                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  I'm a passionate DevOps Engineer who thrives on transforming development processes 
                  and building robust cloud infrastructures. In today's fast-paced tech landscape, 
                  I serve as the bridge between development and operations, crafting solutions that 
                  make deployment seamless and infrastructure reliable.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  My approach combines automation-first thinking with cloud-native architectures. 
                  I've helped organizations reduce deployment times by 70% and achieve significant 
                  cost savings through optimized cloud infrastructure. Every challenge is an 
                  opportunity to implement innovative solutions that scale.
                </p>
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
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700/30 border border-gray-600/50 hover:bg-gray-700/40 transition-colors"
                  >
                    <div className="text-blue-400">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{highlight.title}</h3>
                      <p className="text-gray-300 text-sm">{highlight.description}</p>
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