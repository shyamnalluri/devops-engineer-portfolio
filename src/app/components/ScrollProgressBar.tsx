'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const containerRef = useRef<HTMLElement | null>(
    typeof document !== 'undefined' ? document.documentElement : null
  );

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ['start start', 'end end'],
  });

  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    const checkScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkScroll(); // Check initial scroll position
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!mounted) return null;
  if (!isVisible) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 origin-left z-[9999]"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default ScrollProgressBar;
