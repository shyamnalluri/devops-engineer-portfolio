'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';

type MenuIconKey = 'HOME' | 'ABOUT ME' | 'SKILLS' | 'PROJECTS' | 'CERTIFICATIONS' | 'EXPERIENCE' | 'CONTACT' | 'NOTES';

const navItems: Array<{ name: MenuIconKey; href: string }> = [
  { name: 'HOME', href: '/#home' },
  { name: 'ABOUT ME', href: '/#about' },
  { name: 'PROJECTS', href: '/#projects' },      // 🔥 Moved up in priority order
  { name: 'SKILLS', href: '/#skills' },          // Now after projects
  { name: 'EXPERIENCE', href: '/#experience' },
  { name: 'CERTIFICATIONS', href: '/#certifications' },
  { name: 'CONTACT', href: '/#contact' },
  { name: 'NOTES', href: '/notes' },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(pathname === '/' ? 'home' : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);  useEffect(() => {
    setIsLoaded(true);
    // If we navigate away from home, clear section highlight
    if (pathname !== '/' && activeSection !== '') {
      setActiveSection('');
    }
      // Enhanced scroll spy with better navigation state management
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If we're currently navigating, only update to target section
      if (isNavigating && targetSection) {
        const targetEntry = entries.find(entry => entry.target.id === targetSection);
        if (targetEntry && targetEntry.isIntersecting && targetEntry.intersectionRatio > 0.3) {
          setActiveSection(targetSection);
          setIsNavigating(false);
          setTargetSection(null);
        }
        return;
      }      // Normal scroll detection when not navigating
      if (!isNavigating) {
        let bestSectionId: string | null = null;
        let maxScore = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            
            // Calculate how much of the section is visible
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight);
            
            // Enhanced scoring: prefer sections at the top and give more weight to visibility
            let score = visibilityRatio;
            
            // Strong preference for sections starting near the top
            if (rect.top <= 150 && rect.top >= -100) {
              score += 0.5;
            }
            
            // Additional bonus for sections that are prominently visible
            if (visibilityRatio > 0.6) {
              score += 0.3;
            }
            
            if (score > maxScore) {
              maxScore = score;
              bestSectionId = entry.target.id;
            }
          }
        });

        // Update active section if we have a clear winner and we're not in a navigation state
        if (bestSectionId && maxScore > 0.4) {
          setActiveSection(bestSectionId);
        }
      }
    };    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-80px 0px -20% 0px' // More aggressive top margin to trigger earlier
    });

    // Observe all sections with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      observer.disconnect();
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [isNavigating, targetSection, pathname]);
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      
      // Set navigation state to prevent highlighting intermediate sections
      setIsNavigating(true);
      setTargetSection(targetId);
      setActiveSection(targetId); // Immediately update to target section
      
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
          // Reset navigation state after scroll completes with multiple fallbacks
        navigationTimeoutRef.current = setTimeout(() => {
          setIsNavigating(false);
          setTargetSection(null);
        }, 1200); // Reduced timeout for better responsiveness
        
        // Additional safety timeout
        setTimeout(() => {
          if (isNavigating) {
            setIsNavigating(false);
            setTargetSection(null);
          }
        }, 2000);
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleNavClick(href);
  };

  return (
    <>      {/* Mobile Header - Visible on mobile/tablet */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ease-primary bg-black/60 backdrop-blur-md will-change-transform">        <div className="container mx-auto">
          <div className="flex items-center justify-start py-2 pl-2 pr-4 sm:pl-3 sm:pr-6">
            {/* Mobile menu toggle - moved further left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-button flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 focus-ring relative"
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
          </div>
        </div>
      </header>

      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <nav aria-label="Primary" className={`fixed inset-y-0 left-0 w-[214px] bg-black text-white flex-col z-50 hidden lg:flex transition-transform duration-500 ease-primary ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo Section with professional animation */}
        <div className="px-6 py-8">
          <div className={`text-3xl font-bold text-white transition-all duration-800 ease-spring ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} aria-label="Site logo">
            SN
          </div>
        </div>

        {/* Menu Links with staggered animations */}
        <div className="flex-1 flex flex-col">
          <ul className="flex flex-col py-8">
            {navItems.map((item, index) => {
              const isSectionLink = item.href.includes('#');
              const hash = isSectionLink ? item.href.substring(item.href.indexOf('#')) : '';
              const isSectionActive = isSectionLink && activeSection === hash.replace('#', '');
              const isPathActive = !isSectionLink && pathname.startsWith(item.href);
              const isActive = isSectionActive || isPathActive;
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
                      if (isSectionLink) {
                        const targetHash = hash;
                        const el = typeof document !== 'undefined' ? document.querySelector(targetHash) : null;
                        if (el) {
                          e.preventDefault();
                          handleNavClick(targetHash);
                        }
                        // If element not on this page, allow normal navigation to '/#section'
                      }
                    }}
                    className={`group block px-10 py-4 text-base font-normal transition-all duration-200 ease-primary relative overflow-hidden focus-ring ${
                      isActive
                        ? 'border-l-2 border-orange-500 text-orange-500 font-medium'
                        : 'border-l-2 border-transparent hover:border-gray-700 hover:text-orange-500'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
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