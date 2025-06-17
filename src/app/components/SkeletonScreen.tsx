'use client';

import { motion } from 'framer-motion';

interface SkeletonScreenProps {
  type: 'about' | 'skills' | 'projects' | 'contact' | 'experience' | 'certifications' | 'achievements';
}

const SkeletonScreen = ({ type }: SkeletonScreenProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'about':
        return (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] bg-gray-800 rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-700 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 bg-gray-700 rounded w-16" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-12 bg-gray-800 rounded animate-pulse" />
                <div className="h-12 bg-gray-800 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-gray-800 rounded animate-pulse" />
              <div className="h-32 bg-gray-800 rounded animate-pulse" />
              <div className="h-12 bg-gray-800 rounded w-1/4 mx-auto animate-pulse" />
            </div>
          </div>
        );      
        case 'experience':
        return (
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-700 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg animate-pulse">
                <div className="h-16 bg-gray-700 rounded mb-4" />
                <div className="h-6 bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        );

            case 'achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg animate-pulse">
                <div className="h-12 bg-gray-700 rounded mb-4" />
                <div className="h-4 bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16 bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="h-10 bg-gray-800 rounded w-48 mx-auto mb-12 animate-pulse" />
        {renderSkeleton()}
      </div>
    </motion.div>
  );
};

export default SkeletonScreen;