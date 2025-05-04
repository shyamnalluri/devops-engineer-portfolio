'use client';

import { motion } from 'framer-motion';
import { FaDocker, FaAws, FaJenkins, FaGitAlt, FaPython, FaMicrosoft } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible } from 'react-icons/si';

const Skills = () => {
  const skills = [
    {
      title: "Terraform",
      icon: <SiTerraform className="w-5 h-5" />
    },
    {
      title: "Python",
      icon: <FaPython className="w-5 h-5" />
    },
    {
      title: "AWS",
      icon: <FaAws className="w-5 h-5" />
    },
    {
      title: "Azure",
      icon: <FaMicrosoft className="w-5 h-5" />
    },
    {
      title: "Git",
      icon: <FaGitAlt className="w-5 h-5" />
    },
    {
      title: "Kubernetes",
      icon: <SiKubernetes className="w-5 h-5" />
    },
    {
      title: "Docker",
      icon: <FaDocker className="w-5 h-5" />
    },
    {
      title: "Jenkins",
      icon: <FaJenkins className="w-5 h-5" />
    },
    {
      title: "Ansible",
      icon: <SiAnsible className="w-5 h-5" />
    }
  ];

  return (
    <section id="skills" className="py-16 pt-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Technologies I use</h2>
          <p className="text-gray-400">Over the years, I have worked with a variety of technologies. Here are some of the technologies I have experience with:</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-md border border-gray-700">
                <div className="text-blue-500">
                  {skill.icon}
                </div>
                <span className="text-sm text-white">
                  {skill.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;