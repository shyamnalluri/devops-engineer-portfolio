'use client';

import { FaQuoteLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { testimonialsData } from '../../data/testimonials';

const Contact = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);
  const [testimonialTransition, setTestimonialTransition] = useState(true);const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();

  // Touch gesture handling for mobile testimonials navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
      navigateTestimonial('next');
    } else if (isRightSwipe) {
      navigateTestimonial('prev');
    }
  };
  // Auto-rotate testimonials with pause on hover
  useEffect(() => {
    if (isTestimonialsPaused) return;
    
    const interval = setInterval(() => {
      setTestimonialTransition(false);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
        setTestimonialTransition(true);
      }, 150); // Brief pause for smooth transition
    }, 4000); // Reduced to 4 seconds for better engagement
      return () => clearInterval(interval);
  }, [isTestimonialsPaused]);

  // Navigation function with smooth transition
  const navigateTestimonial = (direction: 'next' | 'prev') => {
    setTestimonialTransition(false);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
      } else {
        setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
      }
      setTestimonialTransition(true);
    }, 150);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName as keyof typeof formData]);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
    return error;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'company') { // Company is optional
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) errors[field] = error;
      }
    });
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouchedFields({
        name: true,
        email: true,
        message: true,
        company: true
      });
      return;
    }
    
    setFormStatus({ submitting: true, submitted: false, error: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({ submitting: false, submitted: true, error: '' });
      setFormData({ name: '', email: '', company: '', message: '' });
      setFieldErrors({});
      setTouchedFields({});
      
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

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim() && 
    Object.keys(fieldErrors).every(key => !fieldErrors[key]);
  return (
    <section id="contact" className="py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden">

      <div className="mobile-container sm:container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-first Section Header */}        <div
          ref={headerRef}
          className={`text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}>          <div className="w-full flex flex-col items-center">
            <h2 className={`text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4 ${
              headerVisible ? 'animate-hero-title' : ''
            }`}>
              Let&apos;s Work Together
            </h2>
            {/* Full-width decorative underline */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
          </div>
          <p className={`hidden sm:block text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 ${
            headerVisible ? 'animate-hero-subtitle' : ''
          }`}>
            Ready to bring your vision to life? Let&apos;s discuss how we can build something amazing together
          </p>
        </div>
          {/* Mobile-first Layout: Stack on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mb-6 sm:mb-8 lg:mb-12">
          {/* Contact Form - Mobile-first responsive width */}
          <div
            ref={formRef}
            className={`transition-all duration-800 ${
              formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 flex flex-col hover:border-orange-500/30 transition-all duration-500 group" style={{ height: '470px' }}>
              <div className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 transition-all duration-600 ${
                formVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '400ms' }}>                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center transition-transform duration-300">
                  <FaPaperPlane className="text-white text-xs sm:text-sm" />
                </div><div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Send Message</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Let&apos;s start the conversation</p>
                </div>
              </div>              <form onSubmit={handleSubmit} className="space-y-2 flex-1">
                {/* Success Message */}
                {formStatus.submitted && (
                  <div className="mb-2 p-2 bg-green-500/10 border border-green-500/30 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <div>
                        <p className="text-green-400 font-semibold text-xs">Message sent successfully!</p>
                        <p className="text-green-300/80 text-xs">I&apos;ll get back to you as soon as possible.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {/* Name and Email Fields - Side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Name Field */}
                    <div className={`transition-all duration-600 ${
                      formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                    }`} style={{ animationDelay: '600ms' }}>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          required
                          className={`touch-button w-full px-3 py-2 text-sm bg-gray-900/70 border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-900/80 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-orange-500/10 ${
                            fieldErrors.name && touchedFields.name
                              ? 'border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                              : formData.name
                              ? 'border-green-500/70 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              : 'border-gray-600/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          }`}
                          placeholder="Your name"
                        />
                        {formData.name && !fieldErrors.name && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <FaCheck className="text-green-500 text-sm" />
                          </div>
                        )}
                      </div>
                      {fieldErrors.name && touchedFields.name && (
                        <p className="text-red-400 text-xs mt-1 animate-fade-in">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className={`transition-all duration-600 ${
                      formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                    }`} style={{ animationDelay: '700ms' }}>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('email')}
                          required
                          className={`touch-button w-full px-3 py-2 text-sm bg-gray-900/70 border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-900/80 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-orange-500/10 ${
                            fieldErrors.email && touchedFields.email
                              ? 'border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                              : formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                              ? 'border-yellow-500/70 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
                              : formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                              ? 'border-green-500/70 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              : 'border-gray-600/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          }`}
                          placeholder="your@email.com"
                        />
                        {formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !fieldErrors.email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <FaCheck className="text-green-500 text-sm" />
                          </div>
                        )}
                      </div>
                      {fieldErrors.email && touchedFields.email && (
                        <p className="text-red-400 text-xs mt-1 animate-fade-in">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '800ms' }}>
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="touch-button w-full px-3 py-2 text-sm bg-gray-900/70 border-2 border-gray-600/50 rounded-lg text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-900/80 focus:bg-gray-800/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:shadow-lg focus:shadow-orange-500/10"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Message Field */}
                  <div className={`transition-all duration-600 ${
                    formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                  }`} style={{ animationDelay: '900ms' }}>
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('message')}
                        required
                        rows={3}
                        className={`touch-button w-full px-3 py-2 text-sm bg-gray-900/70 border-2 rounded-lg text-white placeholder-gray-400 transition-all duration-300 resize-none hover:bg-gray-900/80 focus:bg-gray-800/90 focus:shadow-lg focus:shadow-orange-500/10 ${
                          fieldErrors.message && touchedFields.message
                            ? 'border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : formData.message && formData.message.length >= 10
                            ? 'border-green-500/70 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                            : 'border-gray-600/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        }`}
                        placeholder="Tell me about your project, goals, and how I can help..."
                      />
                      <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                        {formData.message.length}/500
                      </div>
                    </div>
                    {fieldErrors.message && touchedFields.message && (
                      <p className="text-red-400 text-xs mt-1 animate-fade-in">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </div>                {/* Submit Button */}
                <div className={`pt-2 transition-all duration-600 ${
                  formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4'
                }`} style={{ animationDelay: '1000ms' }}>
                  <button
                    type="submit"
                    disabled={!isFormValid || formStatus.submitting}
                    className={`touch-button w-full py-3 px-4 rounded-lg font-semibold text-white text-sm transition-all duration-500 transform relative overflow-hidden group ${
                      isFormValid && !formStatus.submitting
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 border-2 border-orange-500/50 hover:border-orange-400'
                        : 'bg-gray-600/80 cursor-not-allowed border-2 border-gray-600/30'
                    }`}
                  >
                    {/* Button background glow effect */}
                    {isFormValid && !formStatus.submitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    )}
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {formStatus.submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : formStatus.submitted ? (
                        <>
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <FaCheck className="text-white text-xs" />
                          </div>
                          <span>Message Sent Successfully!</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className={`text-sm transition-transform duration-300 ${
                            isFormValid ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''
                          }`} />
                          <span>Send Message</span>
                          {isFormValid && (
                            <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              ✨
                            </div>
                          )}
                        </>
                      )}                    </div>
                  </button>
                </div>{/* Global Error Message */}
                {formStatus.error && (
                  <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-red-400 text-sm">
                        {formStatus.error}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>          {/* Testimonials - Fixed size container with centered content */}
          <div
            ref={testimonialsRef}
            className={`transition-all duration-800 ${
              testimonialsVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '400ms' }}
          >            <div className="mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 group">
              {/* Testimonials Header */}
              <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-gray-700/30 transition-all duration-600 ${
                testimonialsVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '600ms' }}>                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center transition-transform duration-300">
                  <FaQuoteLeft className="text-white text-xs sm:text-sm" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Client Testimonials</h3>
                  <p className="text-xs sm:text-sm text-gray-400">What others say about my work</p>
                </div>
              </div>              {/* Fixed height testimonials content with hover pause */}              <div 
                className={`bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm transition-all duration-600 flex flex-col justify-center items-center cursor-pointer ${
                  testimonialsVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: '800ms',
                  height: '300px' // Fixed height for consistency
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseEnter={() => setIsTestimonialsPaused(true)}
                onMouseLeave={() => setIsTestimonialsPaused(false)}
              >
                <div
                  className={`h-full w-full flex flex-col justify-center px-3 sm:px-4 transition-all duration-300 transform ${
                    testimonialTransition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {/* Testimonial Content - Scrollable if needed */}
                  <div className="flex-1 flex flex-col justify-center overflow-hidden">
                    <div className="text-center mb-4">                      <span className="inline-block px-2 py-1 text-xs bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 font-medium">
                        {testimonialsData[currentTestimonial].highlight}
                      </span>
                    </div>
                      {/* Scrollable testimonial text */}
                    <div 
                      className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-orange-500/50 hover:scrollbar-thumb-orange-500/70 mb-4"
                      style={{ 
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(249, 115, 22, 0.5) rgba(31, 41, 55, 0.5)'
                      }}
                    ><blockquote className="text-xs sm:text-sm text-gray-200 leading-relaxed italic text-center px-2">
                        &ldquo;{testimonialsData[currentTestimonial].content}&rdquo;
                      </blockquote>
                    </div>                    {/* Client Info - Always visible at bottom */}
                    <div className="flex items-center justify-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 mx-auto max-w-xs">
                      <Image
                        src={testimonialsData[currentTestimonial].image}
                        alt={testimonialsData[currentTestimonial].name}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 flex-shrink-0"
                      />
                      <div className="text-left">
                        <h4 className="text-white font-bold text-xs sm:text-sm">
                          {testimonialsData[currentTestimonial].name}
                        </h4>
                        <p className="text-orange-400 font-medium text-xs">
                          {testimonialsData[currentTestimonial].role}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {testimonialsData[currentTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              {/* Bottom Navigation */}              <div className={`p-3 sm:p-4 border-t border-gray-700/30 bg-gradient-to-r from-gray-800/20 to-gray-900/20 ${
                testimonialsVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '1000ms' }}>
                {/* Arrow Navigation */}                <div className="flex items-center justify-center space-x-4 mb-2">                  <button
                    onClick={() => navigateTestimonial('prev')}
                    onMouseEnter={() => setIsTestimonialsPaused(true)}
                    onMouseLeave={() => setIsTestimonialsPaused(false)}
                    className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-orange-500/20 hover:border-orange-500/50 touch-button group"
                    aria-label="Previous testimonial"
                  >
                    <svg 
                      className="w-3 h-3 text-white transition-colors duration-200 group-hover:text-orange-300 group-active:text-orange-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => navigateTestimonial('next')}
                    onMouseEnter={() => setIsTestimonialsPaused(true)}
                    onMouseLeave={() => setIsTestimonialsPaused(false)}
                    className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-orange-500/20 hover:border-orange-500/50 touch-button group"
                    aria-label="Next testimonial"
                  >
                    <svg 
                      className="w-3 h-3 text-white transition-colors duration-200 group-hover:text-orange-300 group-active:text-orange-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;