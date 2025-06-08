'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT ME', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'CONTACT', href: '#contact' },
  { name: 'PLAY GAME', href: '/game', isExternal: true }
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Enhanced scroll spy with professional intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -50% 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

  return (
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
                {item.isExternal ? (
                  <Link
                    href={item.href}
                    className="group block px-10 py-4 text-base font-normal text-green-500 hover:text-green-400 transition-all duration-200 ease-primary relative overflow-hidden focus-ring"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.name}
                      <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                    {/* Subtle hover background */}
                    <div className="absolute inset-0 bg-green-500/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-primary origin-left"></div>
                  </Link>
                ) : (
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
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer with fade-in animation */}
      <div className={`px-6 pb-4 text-xs text-gray-500 mt-auto transition-all duration-800 ease-primary ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
        <p>Copyright ©2025 Shyam</p>
        <p className="mt-1">Nalluri. All right reserved.</p>
      </div>
    </nav>
  );
};

export default Navigation;