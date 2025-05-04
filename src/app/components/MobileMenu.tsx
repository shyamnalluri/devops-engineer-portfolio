'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHome, FaUser, FaCode, FaFolder, FaFileAlt, FaEnvelope } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; href: string }>;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const menuIcons: { [key: string]: React.ReactElement } = {
  'Home': <FaHome className="w-5 h-5" />,
  'About': <FaUser className="w-5 h-5" />,
  'Expertise': <FaCode className="w-5 h-5" />,
  'Portfolio': <FaFolder className="w-5 h-5" />,
  'Resume': <FaFileAlt className="w-5 h-5" />,
  'Contact': <FaEnvelope className="w-5 h-5" />
};

const MobileMenu = ({ isOpen, onClose, navItems, scrollToSection }: MobileMenuProps) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.href.substring(1),
        top: document.querySelector(item.href)?.getBoundingClientRect().top ?? 0
      }));
      
      const current = sections.find(section => section.top <= 100);
      if (current) {
        setActiveSection(current.id);
      }
    };

    if (isOpen) {
      // Only block scrolling while menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl shadow-lg z-50"
          >
            <div className="relative px-6 py-8">
              <div className="absolute left-1/2 top-3 w-12 h-1 bg-gray-600 rounded-full transform -translate-x-1/2" />
              
              <div className="grid grid-cols-3 gap-6 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      scrollToSection(e, item.href);
                      onClose();
                    }}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                      activeSection === item.href.substring(1)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {menuIcons[item.name]}
                    <span className="mt-2 text-sm font-medium">{item.name}</span>
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