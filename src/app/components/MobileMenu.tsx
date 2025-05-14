'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, ReactElement } from 'react';
import { FaHome, FaUser, FaCode, FaFolder, FaFileAlt, FaEnvelope, FaCertificate } from 'react-icons/fa';

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

type MenuIconKey = 'Home' | 'About' | 'Skills' | 'Projects' | 'Certifications' | 'Experience';

const menuIcons: Record<MenuIconKey, ReactElement> = {
  'Home': <FaHome className="w-5 h-5" />,
  'About': <FaUser className="w-5 h-5" />,
  'Skills': <FaCode className="w-5 h-5" />,  'Projects': <FaFolder className="w-5 h-5" />,
  'Certifications': <FaCertificate className="w-5 h-5" />,
  'Experience': <FaFileAlt className="w-5 h-5" />
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed top-0 right-0 h-full w-[300px] bg-gray-900/95 backdrop-blur-md shadow-lg z-50 flex flex-col"
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="mt-16 flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      scrollToSection(e, item.href);
                      onClose();
                    }}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 group ${
                      activeSection === item.href.substring(1)
                        ? 'bg-blue-600/20 text-white'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <span className={`transition-transform duration-200 group-hover:scale-110 ${
                      activeSection === item.href.substring(1) ? 'text-blue-500' : ''
                    }`}>
                      {menuIcons[item.name]}
                    </span>
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;