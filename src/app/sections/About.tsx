'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { aboutData } from '../../data/about';

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ stagger: true });  return (
    <section id="about" className="min-h-screen flex items-center py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden">
      
      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={headerRef}
            className={`transition-all duration-800 ${
              headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}          >            <div className="w-full flex flex-col items-center">
              <h2 className={`text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 text-center ${
                headerVisible ? 'animate-hero-title' : ''
              }`}>
                About Me
              </h2>
              {/* Full-width decorative underline */}
              <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
            </div>
            {/* Hide subtitle on mobile, show on sm and above */}
            <p className={`hidden sm:block text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 text-center ${
              headerVisible ? 'animate-hero-subtitle' : ''
            }`}>
              Get to know the person behind the code
            </p>
          </div>          <div className="p-4 sm:p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">{/* Mobile Profile Image - Show on mobile first, hide on large screens */}
              <div
                ref={imageRef}
                className={`relative lg:hidden mb-8 transition-all duration-1000 ${
                  imageVisible ? 'animate-slide-up' : 'opacity-0 translate-y-12'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="flex justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    {/* Mobile background effects */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 transition-all duration-1000 ${
                      imageVisible ? 'animate-pulse-slow' : 'opacity-0 scale-75'
                    }`} style={{ animationDelay: '600ms' }} />
                    
                    <div className={`absolute inset-2 transition-all duration-800 ${
                      imageVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
                    }`} style={{ animationDelay: '400ms' }}>
                      <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-gray-800 bg-gray-900 shadow-xl mobile-card">
                        <Image
                          src="/images/profile.jpg"
                          alt="Shyam Nalluri"
                          fill
                          className="object-cover"
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop decorative image - hidden on mobile */}
              <div
                ref={imageRef}
                className={`relative hidden lg:block transition-all duration-1000 ${
                  imageVisible ? 'animate-slide-up' : 'opacity-0 translate-y-12'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full h-[500px]">
                  <div className={`absolute top-10 left-10 w-[280px] h-[280px] rounded-full bg-orange-500/20 transition-all duration-1000 ${
                    imageVisible ? 'animate-pulse-slow' : 'opacity-0 scale-75'
                  }`} style={{ animationDelay: '600ms' }} />
                  <div className={`absolute bottom-10 right-10 w-[220px] h-[220px] rounded-full bg-purple-500/20 transition-all duration-1000 ${
                    imageVisible ? 'animate-pulse-slow' : 'opacity-0 scale-75'
                  }`} style={{ animationDelay: '800ms' }} />
                  
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ${
                    imageVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
                  }`} style={{ animationDelay: '400ms' }}>
                    <div className="relative w-[320px] h-[400px] overflow-hidden border-[8px] border-gray-800 bg-gray-900 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-700 hover:scale-105 group">
                      <Image
                        src="/images/profile.jpg"
                        alt="Shyam Nalluri"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Decorative elements */}
                    <div className={`absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-red-500 transition-all duration-600 ${
                      imageVisible ? 'animate-scale-in' : 'opacity-0 scale-50'
                    }`} style={{ animationDelay: '1000ms' }}></div>
                    <div className={`absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-red-500 transition-all duration-600 ${
                      imageVisible ? 'animate-scale-in' : 'opacity-0 scale-50'
                    }`} style={{ animationDelay: '1200ms' }}></div>
                  </div>
                </div>
              </div>              {/* About Text Column - Mobile-first responsive */}
              <div
                ref={textRef}
                className={`space-y-4 sm:space-y-6 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: '400ms' }}
              >                <div className="prose prose-base sm:prose-lg max-w-none prose-invert">
                  <p className={`text-gray-300 text-mobile-base sm:text-lg leading-relaxed text-left sm:text-justify first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-1 transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '600ms' }}>
                    {aboutData.description[0]}
                  </p>
                  <p className={`text-gray-400 text-mobile-base sm:text-lg leading-relaxed text-left sm:text-justify mt-4 sm:mt-6 transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '800ms' }}>
                    {aboutData.description[1]}
                  </p>
                </div>{/* Dynamic stats from data - Mobile-first grid */}
                <div className={`grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`} style={{ animationDelay: '1000ms' }}>
                  {aboutData.stats.map((stat, index) => (
                    <div 
                      key={stat.label} 
                      className={`mobile-card p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group hover:scale-105 ${
                        textVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
                      }`}
                      style={{ animationDelay: `${1200 + (index * 100)}ms` }}
                    >
                      <div className="text-lg sm:text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;