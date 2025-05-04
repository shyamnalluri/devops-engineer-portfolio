'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

export default function Tooltip({ label, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg border border-gray-700 max-w-xs z-50"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}