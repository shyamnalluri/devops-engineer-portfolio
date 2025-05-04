'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-sm mx-auto md:max-w-none"
            >
              <Image
                src="/profile.jpg"
                alt="Profile picture"
                width={400}
                height={400}
                className="rounded-lg shadow-xl mx-auto w-full max-w-[300px] md:max-w-none"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-gray-300">
                I&apos;m a DevOps Engineer with expertise in cloud infrastructure and automation. My journey in technology has been driven by a passion for creating efficient, scalable solutions.
              </p>
              <p className="text-gray-300">
                With over 5 years of experience, I&apos;ve helped organizations streamline their development workflows and optimize their cloud infrastructure. I&apos;m particularly passionate about Kubernetes, Infrastructure as Code, and CI/CD pipelines.
              </p>
              <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <h3 className="text-white font-semibold mb-3">Focus Areas</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>Cloud Architecture</li>
                  <li>Infrastructure as Code</li>
                  <li>Automation</li>
                  <li>Monitoring</li>
                  <li>Security</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;