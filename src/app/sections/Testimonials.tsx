'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  author: string;
  title: string;
  company: string;
  text: string;
  relationship: string;
  linkedinUrl?: string;
}

// Sample testimonials - replace with your actual LinkedIn recommendations
const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "John Smith",
    title: "Senior Cloud Architect",
    company: "Tech Solutions Inc.",
    text: "Shyam is an exceptional DevOps engineer with a deep understanding of cloud architecture. His ability to streamline deployment processes and implement robust CI/CD pipelines has significantly improved our development workflow. Working with him has been a pleasure, and I highly recommend his expertise to any organization looking to modernize their infrastructure.",
    relationship: "Worked directly with Shyam",
    linkedinUrl: "#"
  },
  {
    id: 2,
    author: "Sarah Johnson",
    title: "Engineering Manager",
    company: "Cloud Innovations Ltd.",
    text: "I&apos;ve had the pleasure of working with Shyam on several critical infrastructure projects. His expertise in cloud technologies and automation has been invaluable to our team&apos;s success. Shyam consistently delivers high-quality solutions and has an excellent ability to mentor junior team members.",
    relationship: "Managed Shyam directly",
    linkedinUrl: "#"
  },
  {
    id: 3,
    author: "Michael Chen",
    title: "Lead DevOps Engineer",
    company: "Global Systems Corp",
    text: "Shyam&apos;s knowledge of DevOps practices and cloud platforms is outstanding. He has a unique ability to solve complex problems while maintaining high standards of code quality and security. His collaborative approach and technical leadership make him an asset to any development team.",
    relationship: "Collaborated with Shyam",
    linkedinUrl: "#"
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    title: "Product Manager",
    company: "InnovateCloud",
    text: "Shyam&apos;s technical expertise and communication skills are exceptional. He bridges the gap between technical and business requirements seamlessly. His contributions to our product delivery pipeline were instrumental in reducing deployment times by 60%.",
    relationship: "Worked closely with Shyam",
    linkedinUrl: "#"
  },
  {
    id: 5,
    author: "David Kumar",
    title: "VP of Engineering",
    company: "NextGen Technologies",
    text: "Shyam is a highly skilled professional who brings both technical depth and strategic thinking to every project. His implementation of infrastructure as code practices transformed our deployment process and significantly improved our system reliability.",
    relationship: "Supervised Shyam&apos;s work",
    linkedinUrl: "#"
  },
  {
    id: 6,
    author: "Lisa Thompson",
    title: "Senior Software Engineer",
    company: "CodeCraft Solutions",
    text: "Working alongside Shyam has been an incredible learning experience. His expertise in containerization and orchestration helped our team adopt modern DevOps practices. He&apos;s always willing to share knowledge and mentor others.",
    relationship: "Team member with Shyam",
    linkedinUrl: "#"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const { ref: cardRef } = useScrollAnimation();
  
  return (
    <div className="flex-shrink-0 w-full min-w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div 
          ref={cardRef}
          className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm hover:border-red-500/30 hover:bg-gradient-to-br hover:from-gray-800/70 hover:to-gray-900/70 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 ease-primary h-96 md:h-[450px] lg:h-[350px] flex flex-col justify-center hover:scale-[1.02] hover:-translate-y-1"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-orange-500/5 to-red-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-primary"></div>
          
          {/* Quote decoration */}
          <div className="absolute top-4 left-4 text-red-500/20 text-6xl font-serif opacity-50 group-hover:opacity-70 transition-opacity duration-300">&ldquo;</div>
          
          {/* Testimonial Text */}
          <div className="mb-6 flex-grow flex items-center relative z-10">
            <p className="text-gray-300 leading-tight text-lg md:text-xl lg:text-2xl font-normal italic text-justify tracking-wide group-hover:text-gray-200 transition-colors duration-300">
              {testimonial.text}
            </p>
          </div>

          {/* Author Info - Centered Below */}
          <div className="text-center relative z-10">
            <h4 className="text-white font-semibold text-xl md:text-2xl mb-2 group-hover:text-red-100 transition-colors duration-300">
              {testimonial.author}
            </h4>
            <p className="text-red-400 text-base md:text-lg font-medium mb-1 group-hover:text-red-300 transition-colors duration-300">
              {testimonial.title}
            </p>
            <p className="text-gray-400 text-sm md:text-base mb-2 group-hover:text-gray-300 transition-colors duration-300">
              {testimonial.company}
            </p>
            <p className="text-gray-500 text-xs md:text-sm group-hover:text-gray-400 transition-colors duration-300">
              {testimonial.relationship}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef } = useScrollAnimation();
  const { ref: carouselContainerRef } = useScrollAnimation();

  // Create infinite scroll by duplicating testimonials
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const totalOriginalItems = testimonials.length;
  const startIndex = totalOriginalItems; // Start from the middle set

  // Initialize scroll position to middle set
  useEffect(() => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollLeft = startIndex * clientWidth; setCurrentIndex(0);
    }
  }, [startIndex]);
  // Check scroll position to update current index and handle infinite scroll
  const checkScrollPosition = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const rawIndex = Math.round(scrollLeft / clientWidth);

      // Handle infinite scroll wrapping
      if (rawIndex >= totalOriginalItems * 2) {
        // Scrolled to the end, jump back to beginning of middle set
        carouselRef.current.scrollLeft = totalOriginalItems * clientWidth;
        setCurrentIndex(0);
      } else if (rawIndex < totalOriginalItems) {
        // Scrolled to the beginning, jump to end of middle set
        carouselRef.current.scrollLeft = (totalOriginalItems * 2 - 1) * clientWidth;
        setCurrentIndex(totalOriginalItems - 1);
      } else {
        // Normal scrolling within middle set
        const actualIndex = rawIndex - totalOriginalItems;
        setCurrentIndex(actualIndex);
      }
    }
  }, [totalOriginalItems]);

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollPosition]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;
      const scrollPosition = (startIndex + index) * clientWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : totalOriginalItems - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < totalOriginalItems - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  return (
    <section id="testimonials" className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-8 animate-fade-in-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-hero-title">
            What Colleagues
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-glow">
              {" "}Say About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto animate-hero-description">
            Professional recommendations from colleagues and industry leaders I&apos;ve had the privilege to work with
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselContainerRef}
          className="relative animate-slide-up"
        >
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center transition-all duration-300 ease-primary text-white hover:bg-gray-700 hover:border-red-500/50 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95"
          >
            <FaChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center transition-all duration-300 ease-primary text-white hover:bg-gray-700 hover:border-red-500/50 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95"
          >
            <FaChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          </button>

          {/* Testimonials Carousel */}
          <div
            ref={carouselRef}
            onScroll={checkScrollPosition}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${Math.floor(index / totalOriginalItems)}`} className="flex-shrink-0 w-full min-w-full snap-center">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ease-primary focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 w-8 shadow-lg shadow-red-500/30'
                  : 'bg-gray-600 hover:bg-gray-500 w-2 hover:w-4'
              }`}
            />
          ))}
        </div>        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up animate-delay-300">
          <p className="text-gray-400 mb-4 text-lg">
            Want to add your recommendation?
          </p>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all duration-300 ease-primary hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95 group"
          >
            <FaLinkedin className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Testimonials;
