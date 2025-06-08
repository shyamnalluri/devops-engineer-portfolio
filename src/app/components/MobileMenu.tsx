'use client';

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
  }, [isOpen, navItems]);  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300 ease-primary ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
          />          {/* Mobile Menu Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-[300px] bg-gray-900/95 backdrop-blur-md shadow-xl z-50 flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-primary ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="relative p-6">              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800/50 transition-all duration-300 ease-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Logo section */}
              <div className="mb-12 mt-4 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  SN
                </h2>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <div 
                    key={item.name}
                    className={`animate-slide-right animate-delay-${Math.min(index * 100, 500)}`}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        scrollToSection(e, item.href);
                        onClose();
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ease-primary group hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        activeSection === item.href.substring(1)
                          ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 text-white border-l-4 border-orange-500 shadow-lg shadow-orange-500/20'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-4 border-transparent hover:border-gray-600'
                      }`}
                    >
                      <span className={`transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                        activeSection === item.href.substring(1) ? 'text-orange-500' : 'group-hover:text-red-400'
                      }`}>
                        {menuIcons[item.name]}
                      </span>
                      <span className="text-base font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                        {item.name}
                      </span>
                      {activeSection === item.href.substring(1) && (
                        <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow"></div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Social links at the bottom */}
              <div className="mt-auto pt-8 pb-8 border-t border-gray-800 mt-8 animate-fade-in-up animate-delay-300">
                <div className="flex justify-center gap-6">
                  <a 
                    href="https://github.com/shyamnalluri" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-300 ease-primary p-3 rounded-full hover:bg-gray-800/50 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                    aria-label="GitHub profile"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/shyamnalluri" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 ease-primary p-3 rounded-full hover:bg-blue-500/10 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                    aria-label="LinkedIn profile"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="mailto:nallurishyam@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400 transition-all duration-300 ease-primary p-3 rounded-full hover:bg-red-500/10 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                    aria-label="Email"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-center text-gray-500 text-xs mt-4 hover:text-gray-400 transition-colors duration-300">
                  &copy; {new Date().getFullYear()} Shyam Nalluri. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;