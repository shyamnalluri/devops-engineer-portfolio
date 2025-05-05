'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block">
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: 1,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-white rounded-full opacity-30" />
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;