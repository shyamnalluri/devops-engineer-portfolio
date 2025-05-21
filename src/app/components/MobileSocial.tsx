'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub className="w-6 h-6" />,
    url: 'https://github.com/yourusername',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6" />,
    url: 'https://linkedin.com/in/yourusername',
  },
  {
    name: 'Email',
    icon: <FaEnvelope className="w-6 h-6" />,
    url: 'mailto:your.email@example.com',
  },
];

const MobileSocial = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gradient-to-t from-gray-900 to-transparent pt-8 pb-4"
    >
      <div className="flex justify-center gap-8">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2"
            aria-label={link.name}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileSocial;
