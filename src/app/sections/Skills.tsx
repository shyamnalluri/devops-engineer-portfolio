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
  return (    <section id="skills" className="py-12 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Technologies I Use
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-4">
            Over the years, I have mastered various technologies that enable me to build robust, 
            scalable, and efficient infrastructure solutions.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${selectedCategory === category 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
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
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-5 bg-gray-900/80 hover:bg-gray-800 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-900/20 h-full">
                <div className="text-3xl text-gradient-primary mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  {skill.title}
                </span>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;