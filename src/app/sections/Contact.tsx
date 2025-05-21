'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="w-8 h-8 sm:w-10 sm:h-10" />,
      url: 'https://github.com/yourusername',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-8 h-8 sm:w-10 sm:h-10" />,
      url: 'https://linkedin.com/in/yourusername',
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="w-8 h-8 sm:w-10 sm:h-10" />,
      url: 'mailto:your.email@example.com?subject=Portfolio Contact&body=Hi,%0D%0A%0D%0AI would like to connect with you regarding...',
    },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}/>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/30 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/30 rounded-full filter blur-[128px]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto"
            >
              Have a project in mind or want to discuss opportunities? Reach out through any of these platforms.
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center gap-12 sm:gap-16"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center justify-center p-6 bg-gray-800 rounded-lg transform transition duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                  <span className="text-gray-400 group-hover:text-blue-400 transition-colors duration-500">
                    {link.icon}
                  </span>
                </div>
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="text-sm text-gray-400 whitespace-nowrap">{link.name}</span>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;