'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { aboutData } from '../../data/portfolio';

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ stagger: true });

  return (
    <section id="about" className="min-h-screen flex items-center bg-black py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div 
            ref={headerRef}
            className={`transition-all duration-800 ${
              headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className={`text-5xl font-bold mb-4 text-center text-white relative ${
              headerVisible ? 'animate-hero-title' : ''
            }`}>
              About Me
              <div 
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-800 ${
                  headerVisible ? 'w-24 animate-scale-in' : 'w-0'
                }`}
                style={{ animationDelay: '400ms' }}
              />
            </h2>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Decorative image */}
              <div
                ref={imageRef}
                className={`relative hidden md:block transition-all duration-1000 ${
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
              </div>

              {/* About Text Column */}
              <div
                ref={textRef}
                className={`space-y-6 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: '400ms' }}
              >
                <div className="prose prose-lg max-w-none prose-invert">
                  <p className={`text-gray-300 text-lg leading-relaxed text-justify first-letter:text-3xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-1 transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '600ms' }}>
                    {aboutData.description[0]}
                  </p>
                  <p className={`text-gray-400 text-lg leading-relaxed text-justify transition-all duration-800 ${
                    textVisible ? 'animate-fade-in' : 'opacity-0'
                  }`} style={{ animationDelay: '800ms' }}>
                    {aboutData.description[1]}
                  </p>
                </div>

                {/* Dynamic stats from data */}
                <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-800 ${
                  textVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`} style={{ animationDelay: '1000ms' }}>
                  {aboutData.stats.map((stat, index) => (
                    <div key={stat.label} className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300">{stat.value}</div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
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