'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaHome, FaUser, FaCode, FaFolder, FaFileAlt, FaEnvelope, FaCertificate } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

type MenuIconKey = 'Home' | 'About' | 'Skills' | 'Portfolio' | 'Resume' | 'Contact' | 'Certifications';

const menuIcons: Record<MenuIconKey, React.ReactElement> = {
  'Home': <FaHome className="w-4 h-4" />,
  'About': <FaUser className="w-4 h-4" />,
  'Skills': <FaCode className="w-4 h-4" />,
  'Portfolio': <FaFolder className="w-4 h-4" />,
  'Certifications': <FaCertificate className="w-4 h-4" />,
  'Resume': <FaFileAlt className="w-4 h-4" />,
  'Contact': <FaEnvelope className="w-4 h-4" />
};

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

  const navItems: Array<{ name: MenuIconKey; href: string }> = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;

    const navHeight = 80;
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const targetPosition = absoluteElementTop - navHeight;

    // If we're already very close to the target, just close menu
    if (Math.abs(window.scrollY - targetPosition) < 100) {
      setIsMobileMenuOpen(false);
      return;
    }

    // Close mobile menu and scroll
    setIsMobileMenuOpen(false);
    
    // Add a small delay for menu close animation
    setTimeout(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/80 shadow-lg backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-gray-800/50 group"
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {menuIcons[item.name]}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block md:hidden text-gray-300 hover:text-white p-2 ml-auto rounded-lg hover:bg-gray-800/50 transition-colors"
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