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
    }  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);  }, [testimonials.length]);

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
      }, 3000);    } catch {
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please try again.' 
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            headerVisible ? 'animate-hero-title' : ''          }`}>
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed ${
            headerVisible ? 'animate-hero-subtitle' : ''          }`}>
            Ready to bring your vision to life? Let&apos;s discuss how we can build something amazing together.
          </p>
        </div>
        
        {/* Balanced Layout: Contact Form & Testimonials Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form - Equal Weight (50% width) */}
          <div
            ref={formRef}
            className={`transition-all duration-800 ${
              formVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full flex flex-col hover:border-orange-500/30 transition-all duration-500 group">
              <div className={`flex items-center gap-3 mb-6 transition-all duration-600 ${
                formVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '400ms' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaPaperPlane className="text-white text-lg" />
                </div>
                <div>                  <h3 className="text-2xl font-bold text-white">Send Message</h3>
                  <p className="text-gray-400">Let&apos;s start the conversation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6">
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Your full name"
                    />
                  </div>
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="your.email@example.com"
                    />
                  </div>
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Your company name"
                    />
                  </div>
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-500 resize-none hover:border-gray-500/70 focus:scale-[1.02] focus:shadow-glow-subtle"
                      placeholder="Tell me about your project, goals, and how I can help..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || formStatus.submitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-500 ${
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
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : formStatus.submitted ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaCheck />
                      Message Sent!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaPaperPlane />
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

          {/* Testimonials - Equal Weight (50% width) */}
          <div
            ref={testimonialsRef}
            className={`transition-all duration-800 ${
              testimonialsVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-blue-500/30 transition-all duration-500 group">
              {/* Testimonials Header */}
              <div className={`flex items-center gap-3 mb-6 transition-all duration-600 ${
                testimonialsVisible ? 'animate-fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '600ms' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaQuoteLeft className="text-white text-lg" />
                </div>
                <div>                  <h3 className="text-2xl font-bold text-white">Client Testimonials</h3>
                  <p className="text-gray-400">What others say about my work</p>
                </div>
              </div>

              {/* Inner Container for Testimonials Content */}
              <div className={`bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 flex-1 mb-6 transition-all duration-600 ${
                testimonialsVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`} style={{ animationDelay: '800ms' }}>
                <div
                  key={currentTestimonial}
                  className="h-full flex flex-col justify-between animate-fade-in"
                >
                  {/* Testimonial Content */}
                  <div className="mb-6">
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
                        {testimonials[currentTestimonial].highlight}
                      </span>
                    </div>
                      <blockquote className="text-lg text-gray-200 leading-relaxed mb-6 italic">
                      &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                    </blockquote>
                  </div>

                  {/* Client Info */}                  <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-orange-400 font-medium">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dotted Indicators */}
              <div className={`flex justify-center gap-3 transition-all duration-600 ${
                testimonialsVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`} style={{ animationDelay: '1000ms' }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                      index === currentTestimonial 
                        ? 'bg-orange-500 scale-125 shadow-glow-orange' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;