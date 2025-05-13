'use client';

import { motion } from 'framer-motion';

const About = () => {
  const technologies = [
    'AWS', 'Azure', 'Kubernetes', 'Docker', 
    'Terraform', 'Jenkins', 'GitHub Actions', 
    'Prometheus', 'Ansible', 'Python'
  ];

  return (
    <section id="about" className="min-h-screen flex items-center bg-gray-900 py-8">
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
            className="bg-gray-800/50 p-10 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <div className="space-y-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 text-justify">
                  As a DevOps Engineer, I bridge development and operations through automation and 
                  cloud-native solutions. My focus is on building scalable and efficient infrastructure 
                  that enables teams to deliver software faster and more reliably. With a strong foundation 
                  in both development and operations, I help organizations modernize their infrastructure 
                  and streamline their deployment processes.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  I specialize in designing and implementing cloud architectures, CI/CD pipelines, 
                  and infrastructure as code solutions. My expertise spans across multiple cloud platforms 
                  and modern DevOps tools, ensuring robust and maintainable systems. I am passionate about 
                  automation, security best practices, and creating efficient workflows that empower 
                  development teams to focus on innovation.
                </p>
              </div>

              <div className="pt-8 border-t border-gray-700">
                <h3 className="text-white font-semibold text-xl mb-6">Core Technologies</h3>
                <div className="flex flex-wrap gap-4">
                  {technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm hover:bg-blue-800/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;