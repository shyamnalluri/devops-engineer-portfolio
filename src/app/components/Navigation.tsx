'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

type MenuIconKey = 'HOME' | 'ABOUT ME' | 'SKILLS' | 'PROJECTS' | 'CERTIFICATIONS' | 'EXPERIENCE' | 'CONTACT';

const navItems: Array<{ name: MenuIconKey; href: string }> = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT ME', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    
    // Enhanced scroll spy with professional intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort entries by intersection ratio to get the most visible section
        const sortedEntries = entries
          .filter(entry => entry.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (sortedEntries.length > 0) {
          const mostVisibleEntry = sortedEntries[0];
          setActiveSection(mostVisibleEntry.target.id);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '-80px 0px -20% 0px'
      }
    );

    // Observe all sections with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    // Handle scroll for mobile header background    
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleNavClick(href);
  };

  return (
    <>      {/* Mobile Header - Visible on mobile/tablet */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ease-primary bg-black/60 backdrop-blur-md"><div className="container mx-auto">
          <div className="flex items-center justify-between py-2 px-4 sm:px-6">
            {/* Mobile menu toggle - moved to left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-button flex items-center justify-center w-10 h-10 text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 focus-ring relative"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {/* Hamburger lines with smooth animation */}
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span 
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen 
                      ? 'rotate-45 translate-y-1' 
                      : 'rotate-0 translate-y-0'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ease-in-out mt-1 ${
                    isMobileMenuOpen 
                      ? 'opacity-0 scale-0' 
                      : 'opacity-100 scale-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ease-in-out mt-1 ${
                    isMobileMenuOpen 
                      ? '-rotate-45 -translate-y-2' 
                      : 'rotate-0 translate-y-0'
                  }`}
                />
              </div>
            </button>

            {/* Logo - centered */}
            <Link 
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className={`text-2xl font-bold transition-all duration-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              } focus-ring`}
            >
              <span className="text-white">S</span>
              <span className="text-red-500">N</span>
            </Link>

            {/* Empty div for balance */}
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <nav className={`fixed inset-y-0 left-0 w-[214px] bg-black text-white flex-col z-50 hidden lg:flex transition-transform duration-500 ease-primary ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo Section with professional animation */}
        <div className="px-6 py-8">
          <h1 className={`text-3xl font-bold text-white transition-all duration-800 ease-spring ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            SN
          </h1>
        </div>

        {/* Menu Links with staggered animations */}
        <div className="flex-1 flex flex-col">
          <ul className="flex flex-col py-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              const animationDelay = `${(index + 1) * 100}ms`;
              
              return (
                <li 
                  key={item.name} 
                  className={`block transition-all duration-300 ease-primary ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: animationDelay }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`group block px-10 py-4 text-base font-normal transition-all duration-200 ease-primary relative overflow-hidden focus-ring ${
                      isActive
                        ? 'border-l-2 border-orange-500 text-orange-500 font-medium'
                        : 'border-l-2 border-transparent hover:border-gray-700 hover:text-orange-500'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Active indicator animation */}
                    <div className={`absolute left-0 top-0 w-0.5 h-full bg-orange-500 transition-all duration-300 ease-primary ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-orange-500/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-primary origin-left"></div>
                    {/* Subtle glow effect on active */}
                    {isActive && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-glow"></div>
                    )}
                  </Link>
                </li>
              );
            })}          </ul>
        </div>

        {/* Footer with fade-in animation */}
        <div className={`px-6 pb-4 text-xs text-gray-500 mt-auto transition-all duration-800 ease-primary ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <p>Copyright ©2025 Shyam</p>
          <p className="mt-1">Nalluri. All right reserved.</p>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        scrollToSection={scrollToSection}
      />
    </>
  );
};
                        export default Navigation;