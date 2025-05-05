'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: '-translate-y-full -top-2',
    bottom: 'translate-y-full bottom-2',
    left: '-translate-x-full -left-2',
    right: 'translate-x-full right-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg whitespace-nowrap pointer-events-none ${positions[position]}`}
          >
            {content}
            <div 
              className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 
                ${position === 'top' ? 'bottom-[-4px]' : ''}
                ${position === 'bottom' ? 'top-[-4px]' : ''}
                ${position === 'left' ? 'right-[-4px]' : ''}
                ${position === 'right' ? 'left-[-4px]' : ''}
                ${position === 'top' || position === 'bottom' ? 'left-1/2 -translate-x-1/2' : ''}
                ${position === 'left' || position === 'right' ? 'top-1/2 -translate-y-1/2' : ''}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;