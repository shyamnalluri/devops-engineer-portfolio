'use client';

import { motion } from 'framer-motion';
import { FaDocker, FaAws, FaJenkins, FaGitAlt, FaPython, FaMicrosoft } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible } from 'react-icons/si';
import { useState } from 'react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cloud & Infrastructure',
    'DevOps Tools',
    'Programming',
    'Containerization'
  ];

  const skills = [
    {
      title: "Terraform",
      icon: <SiTerraform className="w-5 h-5" />,
      category: "DevOps Tools"
    },
    {
      title: "Python",
      icon: <FaPython className="w-5 h-5" />,
      category: "Programming"
    },
    {
      title: "AWS",
      icon: <FaAws className="w-5 h-5" />,
      category: "Cloud & Infrastructure"
    },
    {
      title: "Azure",
      icon: <FaMicrosoft className="w-5 h-5" />,
      category: "Cloud & Infrastructure"
    },
    {
      title: "Git",
      icon: <FaGitAlt className="w-5 h-5" />,
      category: "DevOps Tools"
    },
    {
      title: "Kubernetes",
      icon: <SiKubernetes className="w-5 h-5" />,
      category: "Containerization"
    },
    {
      title: "Docker",
      icon: <FaDocker className="w-5 h-5" />,
      category: "Containerization"
    },
    {
      title: "Jenkins",
      icon: <FaJenkins className="w-5 h-5" />,
      category: "DevOps Tools"
    },
    {
      title: "Ansible",
      icon: <SiAnsible className="w-5 h-5" />,
      category: "DevOps Tools"
    }
  ];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/10 -z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              Technologies I Use
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Over the years, I have mastered various technologies that enable me to build robust, 
            scalable, and efficient infrastructure solutions.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${selectedCategory === category 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-gray-300'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              layout
            >
              <div className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 hover:from-blue-900/20 hover:to-gray-800/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-blue-900/20">
                <div className="text-blue-400 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="text-base text-gray-300 font-medium group-hover:text-blue-300 transition-colors duration-300">
                  {skill.title}
                </span>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-br-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 rounded-tl-full blur-2xl" />
      </div>
    </section>
  );
};

export default Skills;