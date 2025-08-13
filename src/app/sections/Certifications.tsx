'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { certificationsData } from '../../data/certifications';
import { FaExternalLinkAlt, FaCertificate, FaShieldAlt } from 'react-icons/fa';

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ stagger: true, staggerDelay: 100 });// Get unique categories with counts
  const categories = [
    { name: 'All', count: certificationsData.length, originalName: 'All' },
    ...Array.from(new Set(certificationsData.map(cert => cert.issuer))).map(issuer => ({
      name: issuer === 'Amazon Web Services' ? 'AWS' :
            issuer === 'Cloud Native Computing Foundation' ? 'CNCF' :
            issuer === 'Microsoft' ? 'Microsoft' :
            issuer === 'HashiCorp' ? 'HashiCorp' :
            issuer === 'ISC2' ? 'ISC2' :
            issuer === 'Docker Inc' ? 'Docker' : issuer,
      originalName: issuer, // Keep original for filtering
      count: certificationsData.filter(cert => cert.issuer === issuer).length
    }))
  ];
  // Filter certifications based on selected category
  const filteredCertifications = selectedCategory === 'All'
    ? certificationsData
    : certificationsData.filter(cert => {
        const categoryData = categories.find(cat => cat.name === selectedCategory);
        return categoryData ? cert.issuer === categoryData.originalName : false;      });

  // Get provider-specific styling - toned down color scheme
  const getProviderStyling = (issuer: string): {
    bgGradient: string;
    badge: string;
    button: string;
  } => {
    const styleMap: { [key: string]: {
      bgGradient: string;
      badge: string;
      button: string;
    } } = {
      'Amazon Web Services': {
        bgGradient: 'bg-gradient-to-br from-slate-600 to-slate-700',
        badge: 'bg-slate-600/20 text-slate-300 border border-slate-600/30',
        button: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white'
      },
      'Microsoft': {
        bgGradient: 'bg-gradient-to-br from-blue-600 to-blue-700',
        badge: 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
        button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white'
      },
      'Cloud Native Computing Foundation': {
        bgGradient: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
        badge: 'bg-cyan-600/20 text-cyan-300 border border-cyan-600/30',
        button: 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white'
      },
      'HashiCorp': {
        bgGradient: 'bg-gradient-to-br from-purple-600 to-purple-700',
        badge: 'bg-purple-600/20 text-purple-300 border border-purple-600/30',
        button: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white'
      },
      'ISC2': {
        bgGradient: 'bg-gradient-to-br from-green-600 to-green-700',
        badge: 'bg-green-600/20 text-green-300 border border-green-600/30',
        button: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white'
      },
      'Docker Inc': {
        bgGradient: 'bg-gradient-to-br from-sky-600 to-sky-700',
        badge: 'bg-sky-600/20 text-sky-300 border border-sky-600/30',
        button: 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white'
      }
    };    return styleMap[issuer] || {
      bgGradient: 'bg-gradient-to-br from-gray-600 to-gray-700',
      badge: 'bg-gray-600/20 text-gray-300 border border-gray-600/30',
      button: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white'
    };};

  return (<section 
      id="certifications" 
      className="py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden"
      role="region"
      aria-label="Professional certifications"
    >
      
      <div className="mobile-container sm:container mx-auto px-4 relative z-10">
        {/* Section Header */}        <div
          ref={headerRef}
          className={`text-center mb-2 sm:mb-4 md:mb-6 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full flex flex-col items-center">
            <h2 className={`text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 ${
              headerVisible ? 'animate-hero-title' : ''
            }`}>
              Professional Certifications
            </h2>
            {/* Full-width decorative underline */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
          </div>
          <p className={`hidden sm:block text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 ${
            headerVisible ? 'animate-hero-subtitle' : ''
          }`}>
            Industry-recognized credentials validating expertise in cloud architecture,
            DevOps practices, and infrastructure management
          </p>        </div>        {/* Category Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:from-red-500 hover:to-orange-500'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-orange-500/30'
                }`}
              >
                <span>{category.name}</span>                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.name
                    ? 'bg-red-700/50 text-orange-100'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>        {/* Certifications Grid - Scrollable Design */}
        <div
          ref={gridRef}
          className={`transition-all duration-800 ${
            gridVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >          {/* Mobile & Desktop: Smart grid/scroll layout */}
          <div className="sm:hidden">
            {filteredCertifications.length <= 4 ? (              /* Mobile Grid layout for ≤4 certifications */
              <div className="grid grid-cols-1 gap-3">
                {filteredCertifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-orange-500/10 h-full"
                  >
                    <div className="p-3 h-full flex flex-col">
                      {/* Header with provider and level */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${getProviderStyling(cert.issuer).badge}`}>
                          <FaShieldAlt className="mr-1 text-xs" />
                          {cert.issuer === 'Amazon Web Services' ? 'AWS' : 
                           cert.issuer === 'Microsoft' ? 'Microsoft' :
                           cert.issuer === 'Cloud Native Computing Foundation' ? 'CNCF' :
                           cert.issuer === 'HashiCorp' ? 'HashiCorp' :
                           cert.issuer === 'ISC2' ? 'ISC2' :
                           cert.issuer === 'Docker Inc' ? 'Docker' : cert.issuer}
                        </div>
                      </div>

                      {/* Compact certification icon */}
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${getProviderStyling(cert.issuer).bgGradient}`}>
                        {cert.issuer === 'Amazon Web Services' && (
                          <div className="text-sm font-bold text-white">AWS</div>
                        )}
                        {cert.issuer === 'Microsoft' && (
                          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                            <div className="text-blue-600 font-bold text-xs">M</div>
                          </div>
                        )}
                        {cert.issuer === 'Cloud Native Computing Foundation' && (
                          <FaCertificate className="text-sm text-white" />
                        )}
                        {cert.issuer === 'HashiCorp' && (
                          <div className="text-sm font-bold text-white">HC</div>
                        )}
                        {cert.issuer === 'ISC2' && (
                          <FaShieldAlt className="text-sm text-white" />
                        )}
                        {cert.issuer === 'Docker Inc' && (
                          <div className="text-sm font-bold text-white">🐳</div>
                        )}
                      </div>

                      {/* Certification details - flexible content area */}
                      <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors leading-tight min-h-[2.5rem]">
                          {cert.name}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-slate-400">{cert.issueDate}</span>
                          {cert.validUntil && cert.validUntil !== 'Never expires' && (
                            <span className="text-orange-400">Until {cert.validUntil}</span>
                          )}
                          {cert.validUntil === 'Never expires' && (
                            <span className="text-yellow-400">No Expiry</span>
                          )}
                        </div>
                      </div>

                      {/* Action button - always at bottom */}
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 w-full rounded text-xs font-medium transition-all duration-300 hover:scale-105 mt-auto ${getProviderStyling(cert.issuer).button}`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Verify Credential
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Mobile Horizontal scroll layout for >4 certifications */
              <div className="relative">
                {/* Mobile Scroll indicator */}
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-sm text-slate-400">
                    {filteredCertifications.length} certifications • Swipe to view all
                  </p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
                
                {/* Mobile Scrollable container */}
                <div
                  className="overflow-x-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-orange-500 hover:scrollbar-thumb-orange-400 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
                  tabIndex={0}
                  aria-label="Certifications carousel. Use left and right arrow keys to navigate."
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).scrollBy({ left: -300, behavior: 'smooth' });
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="flex gap-3 pb-4" style={{ width: `${filteredCertifications.length * 280}px` }}>
                    {filteredCertifications.map((cert, index) => (
                      <div
                        key={index}
                        className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-orange-500/10 flex-shrink-0"
                        style={{ width: '260px', height: '200px' }}
                      >                        <div className="p-3 h-full flex flex-col">
                          {/* Header with provider and level */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${getProviderStyling(cert.issuer).badge}`}>
                              <FaShieldAlt className="mr-1 text-xs" />
                              {cert.issuer === 'Amazon Web Services' ? 'AWS' : 
                               cert.issuer === 'Microsoft' ? 'Microsoft' :
                               cert.issuer === 'Cloud Native Computing Foundation' ? 'CNCF' :
                               cert.issuer === 'HashiCorp' ? 'HashiCorp' :
                               cert.issuer === 'ISC2' ? 'ISC2' :
                               cert.issuer === 'Docker Inc' ? 'Docker' : cert.issuer}
                            </div>
                          </div>

                          {/* Compact certification icon */}
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${getProviderStyling(cert.issuer).bgGradient}`}>
                            {cert.issuer === 'Amazon Web Services' && (
                              <div className="text-sm font-bold text-white">AWS</div>
                            )}
                            {cert.issuer === 'Microsoft' && (
                              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                                <div className="text-blue-600 font-bold text-xs">M</div>
                              </div>
                            )}
                            {cert.issuer === 'Cloud Native Computing Foundation' && (
                              <FaCertificate className="text-sm text-white" />
                            )}
                            {cert.issuer === 'HashiCorp' && (
                              <div className="text-sm font-bold text-white">HC</div>
                            )}
                            {cert.issuer === 'ISC2' && (
                              <FaShieldAlt className="text-sm text-white" />
                            )}
                            {cert.issuer === 'Docker Inc' && (
                              <div className="text-sm font-bold text-white">🐳</div>
                            )}
                          </div>

                          {/* Certification details - flexible content area */}
                          <div className="flex-grow">
                            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors leading-tight min-h-[2.5rem] line-clamp-2">
                              {cert.name}
                            </h3>
                            
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span className="text-slate-400">{cert.issueDate}</span>
                              {cert.validUntil && cert.validUntil !== 'Never expires' && (
                                <span className="text-orange-400">Until {cert.validUntil}</span>
                              )}
                              {cert.validUntil === 'Never expires' && (
                                <span className="text-yellow-400">No Expiry</span>
                              )}
                            </div>
                          </div>

                          {/* Action button - always at bottom */}
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 w-full rounded text-xs font-medium transition-all duration-300 hover:scale-105 mt-auto ${getProviderStyling(cert.issuer).button}`}
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            Verify Credential
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>          {/* Desktop: Smart grid/scroll layout */}
          <div className="hidden sm:block">
            {filteredCertifications.length <= 4 ? (              /* Grid layout for ≤4 certifications */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredCertifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-orange-500/10 h-full"
                  >
                    <div className="p-3 sm:p-4 h-full flex flex-col">
                      {/* Header with provider and level */}
                      <div className="flex items-center justify-between mb-2">
                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getProviderStyling(cert.issuer).badge}`}>
                          <FaShieldAlt className="mr-1 text-xs" />
                          {cert.issuer === 'Amazon Web Services' ? 'AWS' : 
                           cert.issuer === 'Microsoft' ? 'Microsoft' :
                           cert.issuer === 'Cloud Native Computing Foundation' ? 'CNCF' :
                           cert.issuer === 'HashiCorp' ? 'HashiCorp' :
                           cert.issuer === 'ISC2' ? 'ISC2' :
                           cert.issuer === 'Docker Inc' ? 'Docker' : cert.issuer}
                        </div>
                      </div>

                      {/* Compact certification icon */}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center mb-3 ${getProviderStyling(cert.issuer).bgGradient}`}>
                        {cert.issuer === 'Amazon Web Services' && (
                          <div className="text-sm sm:text-base font-bold text-white">AWS</div>
                        )}
                        {cert.issuer === 'Microsoft' && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-sm flex items-center justify-center">
                            <div className="text-blue-600 font-bold text-xs sm:text-sm">M</div>
                          </div>
                        )}
                        {cert.issuer === 'Cloud Native Computing Foundation' && (
                          <FaCertificate className="text-sm sm:text-base text-white" />
                        )}
                        {cert.issuer === 'HashiCorp' && (
                          <div className="text-sm sm:text-base font-bold text-white">HC</div>
                        )}
                        {cert.issuer === 'ISC2' && (
                          <FaShieldAlt className="text-sm sm:text-base text-white" />
                        )}
                        {cert.issuer === 'Docker Inc' && (
                          <div className="text-sm sm:text-base font-bold text-white">🐳</div>
                        )}
                      </div>

                      {/* Certification details - flexible content area */}
                      <div className="flex-grow">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
                          {cert.name}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-slate-400">{cert.issueDate}</span>
                          {cert.validUntil && cert.validUntil !== 'Never expires' && (
                            <span className="text-orange-400">Until {cert.validUntil}</span>
                          )}
                          {cert.validUntil === 'Never expires' && (
                            <span className="text-yellow-400">No Expiry</span>
                          )}
                        </div>
                      </div>

                      {/* Action button - always at bottom */}
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 w-full rounded text-xs font-medium transition-all duration-300 hover:scale-105 mt-auto ${getProviderStyling(cert.issuer).button}`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Verify Credential
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Horizontal scroll layout for >4 certifications */
              <div className="relative">
                {/* Scroll indicator */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-slate-400">
                    {filteredCertifications.length} certifications • Scroll horizontally to view all
                  </p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
                
                {/* Scrollable container */}
                <div
                  className="overflow-x-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-orange-500 hover:scrollbar-thumb-orange-400 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
                  tabIndex={0}
                  aria-label="Certifications carousel. Use left and right arrow keys to navigate."
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).scrollBy({ left: -400, behavior: 'smooth' });
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="flex gap-4 pb-4" style={{ width: `${filteredCertifications.length * 280}px` }}>
                    {filteredCertifications.map((cert, index) => (
                      <div
                        key={index}
                        className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-orange-500/10 flex-shrink-0"
                        style={{ width: '260px', height: '220px' }}
                      >
                        <div className="p-4 h-full flex flex-col">
                          {/* Header with provider and level */}                          <div className="flex items-center justify-between mb-2">
                            <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getProviderStyling(cert.issuer).badge}`}>
                              <FaShieldAlt className="mr-1 text-xs" />
                              {cert.issuer === 'Amazon Web Services' ? 'AWS' : 
                               cert.issuer === 'Microsoft' ? 'Microsoft' :
                               cert.issuer === 'Cloud Native Computing Foundation' ? 'CNCF' :
                               cert.issuer === 'HashiCorp' ? 'HashiCorp' :
                               cert.issuer === 'ISC2' ? 'ISC2' :
                               cert.issuer === 'Docker Inc' ? 'Docker' : cert.issuer}
                            </div>
                          </div>

                          {/* Compact certification icon */}
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center mb-3 ${getProviderStyling(cert.issuer).bgGradient}`}>
                            {cert.issuer === 'Amazon Web Services' && (
                              <div className="text-base font-bold text-white">AWS</div>
                            )}
                            {cert.issuer === 'Microsoft' && (
                              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                                <div className="text-blue-600 font-bold text-sm">M</div>
                              </div>
                            )}
                            {cert.issuer === 'Cloud Native Computing Foundation' && (
                              <FaCertificate className="text-base text-white" />
                            )}
                            {cert.issuer === 'HashiCorp' && (
                              <div className="text-base font-bold text-white">HC</div>
                            )}
                            {cert.issuer === 'ISC2' && (
                              <FaShieldAlt className="text-base text-white" />
                            )}
                            {cert.issuer === 'Docker Inc' && (
                              <div className="text-base font-bold text-white">🐳</div>
                            )}
                          </div>

                          {/* Certification details - flexible content area */}
                          <div className="flex-grow">
                            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors leading-tight min-h-[3rem] line-clamp-3">
                              {cert.name}
                            </h3>
                            
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span className="text-slate-400">{cert.issueDate}</span>
                              {cert.validUntil && cert.validUntil !== 'Never expires' && (
                                <span className="text-orange-400">Until {cert.validUntil}</span>
                              )}
                              {cert.validUntil === 'Never expires' && (
                                <span className="text-yellow-400">No Expiry</span>
                              )}
                            </div>
                          </div>

                          {/* Action button - always at bottom */}
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 w-full rounded text-xs font-medium transition-all duration-300 hover:scale-105 mt-auto ${getProviderStyling(cert.issuer).button}`}
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            Verify Credential
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <FaCertificate className="mx-auto text-4xl text-slate-600 mb-4" />
            <p className="text-slate-400">No certifications found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;