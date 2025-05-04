'use client';

import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
          <p className="text-gray-300 mb-6">
            I'm a DevOps Engineer with a passion for automating and optimizing deployment pipelines. 
            My expertise lies in implementing CI/CD workflows, container orchestration, and cloud infrastructure management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-500 mb-2">+3</h3>
              <p className="text-gray-400">Years of Experience</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-500 mb-2">+15</h3>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-500 mb-2">+7</h3>
              <p className="text-gray-400">Satisfied Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;