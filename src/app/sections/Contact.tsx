'use client';

import { FaQuoteLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

const Contact = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: '' });
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();

  // Touch gesture handling for mobile testimonials navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // Curated testimonials (reduced for supporting role)
  const testimonials = [
    {
      id: 1,
      name: "Alexandra Thompson",
      role: "VP of Engineering",
      company: "InnovateTech Labs",
      content: "Shyam transformed our legacy system into a modern, scalable architecture. His innovative approach exceeded all expectations.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      highlight: "System Transformation Expert"
    },
    {
      id: 2,
      name: "James Mitchell",
      role: "Tech Lead", 
      company: "GlobalFinance Solutions",
      content: "Our trading platform performance improved by 300% under his guidance. Exceptional technical leadership.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      highlight: "Performance Optimization"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Product Director",
      company: "HealthTech Innovations", 
      content: "Built a healthcare platform now used by 50,000+ patients. His code quality and user-centric approach are exceptional.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      highlight: "Healthcare Tech Specialist"
    }
  ];

  // Minimum distance before we consider the gesture as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({ submitting: false, submitted: true, error: '' });
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 3000);
    } catch {
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please try again.' 
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      {/* Mobile-first Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-first Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className={`text-mobile-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            headerVisible ? 'animate-hero-title' : ''
          }`}>
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className={`text-sm sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 ${
            headerVisible ? 'animate-hero-subtitle' : ''
          }`}>
            Ready to bring your vision to life? Let&apos;s discuss how we can build something amazing together.
          </p>
        </div>
        
        {/* Mobile-first Layout: Stack on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Contact Form - Mobile-first responsive width */}
          <div
            ref={formRef}
            className={`transition-all duration-800 ${
              formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full flex flex-col hover:border-orange-500/30 transition-all duration-500 group">
              <div className={`flex items-center gap-3 mb-4 sm:mb-6 transition-all duration-600 ${
                formVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '400ms' }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaPaperPlane className="text-white text-sm sm:text-lg" />
                </div>
                <div>
                  <h3 className="text-mobile-xl sm:text-2xl font-bold text-white">Send Message</h3>
                  <p className="text-sm sm:text-base text-gray-400">Let&apos;s start the conversation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6">
                  {/* Name Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '600ms' }}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="touch-button w-full px-3 py-3 sm:px-4 text-sm sm:text-base bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '700ms' }}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="touch-button w-full px-3 py-3 sm:px-4 text-sm sm:text-base bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Company Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '800ms' }}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="touch-button w-full px-3 py-3 sm:px-4 text-sm sm:text-base bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Message Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '900ms' }}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="touch-button w-full px-3 py-3 sm:px-4 text-sm sm:text-base bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 resize-none hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Tell me about your project, goals, and how I can help..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || formStatus.submitting}
                  className={`touch-button w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-500 ${
                    isFormValid && !formStatus.submitting
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-glow-red hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-gray-600 cursor-not-allowed'
                  } ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ animationDelay: '1000ms' }}
                >
                  {formStatus.submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : formStatus.submitted ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaCheck className="text-sm sm:text-base" />
                      Message Sent!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaPaperPlane className="text-sm sm:text-base" />
                      Send Message
                    </div>
                  )}
                </button>

                {formStatus.error && (
                  <p className="text-red-400 text-sm text-center animate-fade-in">
                    {formStatus.error}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Testimonials - Mobile-first responsive width */}
          <div
            ref={testimonialsRef}
            className={`transition-all duration-800 ${
              testimonialsVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full hover:border-blue-500/30 transition-all duration-500 group">
              {/* Testimonials Header */}
              <div className={`flex items-center gap-3 mb-4 sm:mb-6 transition-all duration-600 ${
                testimonialsVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '600ms' }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaQuoteLeft className="text-white text-sm sm:text-lg" />
                </div>
                <div>
                  <h3 className="text-mobile-xl sm:text-2xl font-bold text-white">Client Testimonials</h3>
                  <p className="text-sm sm:text-base text-gray-400">What others say about my work</p>
                </div>
              </div>

              {/* Testimonials Content with Touch Support */}
              <div 
                className={`bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-lg sm:rounded-xl p-4 sm:p-6 flex-1 mb-4 sm:mb-6 transition-all duration-600 ${
                  testimonialsVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                }`} 
                style={{ animationDelay: '800ms' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  key={currentTestimonial}
                  className="h-full flex flex-col justify-between animate-fade-in min-h-[280px] sm:min-h-[320px]"
                >
                  {/* Testimonial Content */}
                  <div className="mb-4 sm:mb-6">
                    <div className="mb-4 sm:mb-6">
                      <span className="inline-block px-2 py-1 sm:px-3 text-xs sm:text-sm bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 font-medium">
                        {testimonials[currentTestimonial].highlight}
                      </span>
                    </div>
                    <blockquote className="text-sm sm:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 italic">
                      &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                    </blockquote>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      width={48}
                      height={48}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-lg">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-orange-400 font-medium text-xs sm:text-base">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>              {/* Arrow Navigation */}
              <div className={`flex items-center justify-center space-x-6 transition-all duration-600 ${
                testimonialsVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`} style={{ animationDelay: '1000ms' }}>
                <button
                  onClick={() => setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1)}
                  className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-orange-500/20 hover:border-orange-500/50 hover:scale-105 active:bg-orange-500/30 active:scale-95 touch-button group"
                  aria-label="Previous testimonial"
                >
                  <svg 
                    className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-orange-300 group-active:text-orange-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Numeric Counter */}
                <div className="text-sm font-medium text-gray-300 min-w-[3rem] text-center">
                  {currentTestimonial + 1} / {testimonials.length}
                </div>
                
                <button
                  onClick={() => setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1)}
                  className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-orange-500/20 hover:border-orange-500/50 hover:scale-105 active:bg-orange-500/30 active:scale-95 touch-button group"
                  aria-label="Next testimonial"
                >
                  <svg 
                    className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-orange-300 group-active:text-orange-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="lg:hidden text-center mt-3 sm:mt-4">
                <p className="text-xs text-gray-500">
                  Swipe left or right to navigate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;