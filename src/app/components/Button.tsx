'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSoundEffects from '../utils/useSoundEffects';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: ((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void) | (() => void);
  className?: string;
}

const Button = ({ href, variant = 'primary', children, onClick, className }: ButtonProps) => {
  const [mounted, setMounted] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonStyles = `
    inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium 
    transition-all duration-300 relative overflow-hidden
    ${
      variant === 'primary'
        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600'
        : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
    }
    ${className || ''}
  `;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    playClick();
    if (onClick) {
      onClick(e);
    }
  };

  if (!mounted) return null;

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonStyles}
        onClick={handleClick}
        onMouseEnter={playHover}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonStyles}
      onClick={handleClick}
      onMouseEnter={playHover}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;