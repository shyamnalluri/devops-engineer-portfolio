'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import OptimizedImage from '../components/OptimizedImage';
import { certificationsData } from '../../data/portfolio';

// Use dynamic data from portfolio.ts
const certifications = certificationsData;

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ stagger: true, staggerDelay: 100 });
  
  const categories = [
    { id: 'all', label: 'All Certifications' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'devops', label: 'DevOps' },
    { id: 'security', label: 'Security' }
  ];

  const filteredCertifications = selectedCategory === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);

  return (      <section 
      id="certifications" 
      className="py-8 sm:py-12 lg:py-16 bg-black relative overflow-hidden"
    >
      {/* Mobile-first background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
      
      <div className="mobile-container sm:container mx-auto px-4 relative z-10">        <div
          ref={headerRef}
          className={`text-center mb-6 sm:mb-8 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >          <h2 className={`text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 ${
            headerVisible ? 'animate-hero-title' : ''
          }`}>
            Professional Certifications
          </h2>          <p className={`hidden sm:block text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 ${
            headerVisible ? 'animate-hero-subtitle' : ''
          }`}>
            Industry-recognized certifications demonstrating expertise in cloud architecture,
            DevOps practices, and infrastructure management
          </p>
          
          {/* Mobile-first category filters */}
          <div className={`overflow-x-auto -mx-4 sm:mx-0 mt-4 mb-4 sm:mb-6 ${
            headerVisible ? 'animate-hero-description' : ''
          }`}>
            <div className="flex gap-2 sm:gap-4 px-4 sm:px-0 sm:justify-center min-w-max sm:min-w-0">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-500 touch-button hover:scale-105 active:scale-95 whitespace-nowrap ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-glow-red' 
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-glow-subtle'
                  } ${
                    headerVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                  }`}
                  style={{ animationDelay: `${600 + (index * 100)}ms` }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
          <div 
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto transition-all duration-800 ${
            gridVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          {filteredCertifications.map((cert, index) => (
            <div
              key={`${cert.credentialId}-${selectedCategory}`}
              className={`group transition-all duration-600 ${
                gridVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black 
                border border-gray-800 hover:border-red-500/50 shadow-lg hover:shadow-glow-red transition-all duration-500
                mobile-card hover:-translate-y-2 hover:scale-[1.02] cursor-pointer group-hover:bg-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-red-500/0 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-4 sm:p-6 relative">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-transparent 
                        rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <OptimizedImage
                        src={cert.logo}
                        alt={`${cert.name} logo`}
                        width={60}
                        height={60}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10 transform group-hover:scale-110 group-hover:rotate-3
                          transition-all duration-500"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-red-400 
                      transition-colors duration-300 mb-1 sm:mb-2 leading-5 sm:leading-6">
                      {cert.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 group-hover:text-gray-300 transition-colors duration-300">{cert.issuer}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4 sm:mb-6">
                      <div>
                        <p className="text-gray-600">Issued</p>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{cert.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Valid until</p>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{cert.validUntil}</p>
                      </div>
                    </div>
                    
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 w-full rounded-lg text-xs sm:text-sm font-medium
                        bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 
                        text-white transition-all duration-500 transform hover:scale-[1.05] hover:shadow-glow-red
                        focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 touch-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify Credential
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;