'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSoundEffects from '../utils/useSoundEffects';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Button = ({ href, variant = 'primary', children, onClick }: ButtonProps) => {
  const [mounted, setMounted] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const baseClasses = 'px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden';
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg',
    secondary: 'border-2 border-blue-500 text-blue-500 hover:text-white'
  };

  return (
    <motion.a
      href={href}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      onMouseEnter={() => playHover()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} group`}
    >
      <span className="relative z-10">{children}</span>
      <div 
        className={`absolute inset-0 ${
          variant === 'primary' 
            ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
            : 'bg-blue-500'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
      />
    </motion.a>
  );
};

export default Button;