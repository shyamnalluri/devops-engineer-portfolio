'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If menu is open, get the stored scroll position
    const storedScrollY = Number(document.body.dataset.scrollPosition || '0');
    const currentScrollY = isMobileMenuOpen ? storedScrollY : window.scrollY;
    
    // Find the target element
    const element = document.querySelector(href);
    if (!element) return;
    
    // Get element position relative to the entire document
    const navHeight = 80;
    const elementRect = element.getBoundingClientRect();
    const docScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const absoluteElementTop = elementRect.top + docScrollTop;
    
    // If we're already very close to the target position (within 100px), don't scroll
    const currentPosition = currentScrollY;
    const targetPosition = absoluteElementTop - navHeight;
    if (Math.abs(currentPosition - targetPosition) < 100) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      return;
    }

    // Set flag that we're navigating to prevent scroll restoration
    document.body.dataset.navigating = 'true';
    
    // Close mobile menu first (if open)
    setIsMobileMenuOpen(false);
    
    // Then scroll after a brief delay to ensure menu closing animation is complete
    setTimeout(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Clear the navigating flag after scrolling
      setTimeout(() => {
        delete document.body.dataset.navigating;
      }, 100);
    }, isMobileMenuOpen ? 300 : 0); // Longer delay if closing mobile menu
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="text-xl font-bold text-white hover:text-blue-500 transition"
            >
              Shyam Nalluri
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block md:hidden text-gray-300 hover:text-white p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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