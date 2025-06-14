'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        <>          {/* Backdrop with close functionality */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300 ease-primary cursor-pointer ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
            aria-label="Close menu"
          />          {/* Mobile Menu Panel - slides from right */}          <div
            className={`fixed top-0 right-0 h-full w-[300px] bg-black shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-primary ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >            <div className="relative p-6">
              {/* Close button in top-right for easier thumb reach */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-gray-800/50 transition-all duration-300 ease-primary focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>              {/* Navigation Items */}
              <div className="flex flex-col mt-12">
                {navItems.map((item, index) => (
                  <div 
                    key={item.name}
                    className={`transition-all duration-300 ease-primary`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        scrollToSection(e, item.href);
                        onClose();
                      }}                      className={`group block px-6 py-4 text-base font-normal transition-all duration-200 ease-primary relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black min-h-[48px] flex items-center text-left ${
                        activeSection === item.href.substring(1)
                          ? 'border-l-2 border-orange-500 text-orange-500 font-medium'
                          : 'border-l-2 border-transparent hover:border-gray-700 hover:text-orange-500'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>                      {/* Active indicator animation */}
                      <div className={`absolute right-0 top-0 w-0.5 h-full bg-orange-500 transition-all duration-300 ease-primary ${
                        activeSection === item.href.substring(1) ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-orange-500/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-primary origin-right"></div>
                      {/* Subtle glow effect on active */}
                      {activeSection === item.href.substring(1) && (
                        <div className="absolute right-0 top-0 w-1 h-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-glow"></div>
                      )}
                    </Link>
                  </div>                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;