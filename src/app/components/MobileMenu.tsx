'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, ReactElement } from 'react';
import { FaHome, FaUser, FaCode, FaFolder, FaFileAlt, FaCertificate, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: MenuIconKey; href: string }>;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

type Section = {
  id: string;
  top: number;
  bottom: number;
  height: number;
};

type MenuIconKey = 'HOME' | 'ABOUT ME' | 'SKILLS' | 'PROJECTS' | 'CERTIFICATIONS' | 'EXPERIENCE' | 'CONTACT';

const menuIcons: Record<MenuIconKey, ReactElement> = {
  'HOME': <FaHome className="w-5 h-5" />,
  'ABOUT ME': <FaUser className="w-5 h-5" />,
  'SKILLS': <FaCode className="w-5 h-5" />,
  'PROJECTS': <FaFolder className="w-5 h-5" />,
  'CERTIFICATIONS': <FaCertificate className="w-5 h-5" />,
  'EXPERIENCE': <FaFileAlt className="w-5 h-5" />,
  'CONTACT': <FaEnvelope className="w-5 h-5" />
};

const MobileMenu = ({ isOpen, onClose, navItems, scrollToSection }: MobileMenuProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.reduce<Section[]>((acc, item) => {
        const element = document.querySelector(item.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          acc.push({
            id: item.href.substring(1),
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          });
        }
        return acc;
      }, []);

      // Find which section is currently most visible in the viewport
      const viewportHeight = window.innerHeight;
      let currentSection: Section | null = null;
      let maxVisibleArea = 0;

      for (const section of sections) {
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, Math.min(viewportHeight, section.top));
        const visibleBottom = Math.max(0, Math.min(viewportHeight, section.bottom));
        const visibleArea = visibleBottom - visibleTop;

        // If this section has more visible area, it becomes the active one
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          currentSection = section;
        }

        // Special case: if we're at the top of a section
        if (section.top <= 100 && section.bottom >= viewportHeight / 2) {
          currentSection = section;
          maxVisibleArea = Infinity; // Ensure this takes precedence
        }
      }

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Initial check
    handleScroll();

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (!isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, navItems]);
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            onClick={onClose}
          /><motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed top-0 right-0 h-full w-[300px] bg-gray-900/95 backdrop-blur-md shadow-xl z-50 flex flex-col border-l border-gray-800"
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-orange-600/30 hover:to-red-600/30 transition-all"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Logo section */}
              <div className="mb-12 mt-4">
                <h2 className="text-3xl font-bold text-white">SN</h2>
              </div>
                <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <motion.div 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        scrollToSection(e, item.href);
                        onClose();
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 group ${
                        activeSection === item.href.substring(1)
                          ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 text-white border-l-2 border-orange-500'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'
                      }`}
                    >
                      <span className={`transition-all duration-300 group-hover:scale-110 ${
                        activeSection === item.href.substring(1) ? 'text-orange-500' : ''
                      }`}>
                        {menuIcons[item.name]}
                      </span>
                      <span className="text-base font-medium tracking-wide">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}</div>
                {/* Social links at the bottom */}
              <div className="mt-auto pt-8 pb-8 border-t border-gray-800 mt-8">
                <div className="flex justify-center gap-6">
                  <motion.a 
                    href="https://github.com/shyamnalluri" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub profile"
                  >
                    <FaGithub className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/shyamnalluri" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn profile"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="mailto:nallurishyam@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Email"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </motion.a>
                </div>
                <p className="text-center text-gray-500 text-xs mt-4">
                  &copy; {new Date().getFullYear()} Shyam Nalluri. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;