'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';

const Contact = () => {  // Creative testimonials data with professional variety
  const testimonials = [
    {
      id: 1,
      name: "Alexandra Thompson",
      role: "VP of Engineering",
      company: "InnovateTech Labs",
      content: "Shyam transformed our legacy system into a modern, scalable architecture. His innovative approach and deep technical knowledge exceeded all expectations. Simply outstanding work!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      highlight: "System Transformation Expert"
    },
    {
      id: 2,
      name: "James Mitchell",
      role: "Tech Lead",
      company: "GlobalFinance Solutions",
      content: "What sets Shyam apart is his ability to understand complex business needs and deliver robust solutions. Our trading platform performance improved by 300% under his guidance.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      highlight: "Performance Optimization Guru"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Product Director",
      company: "HealthTech Innovations",
      content: "Shyam's full-stack expertise and user-centric approach helped us build a healthcare platform that's now used by over 50,000 patients. His code quality is exceptional.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      highlight: "Healthcare Tech Specialist"
    },
    {
      id: 4,
      name: "Robert Chang",
      role: "Startup Founder",
      company: "EcoSmart Technologies",
      content: "From concept to deployment, Shyam was instrumental in building our IoT platform. His mentorship and technical leadership were invaluable to our team's growth.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      highlight: "IoT & Innovation Leader"
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      role: "Senior DevOps Manager",
      company: "CloudNative Corp",
      content: "Shyam's expertise in cloud infrastructure and CI/CD pipelines revolutionized our deployment process. Zero downtime deployments became our new reality thanks to his work.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
      highlight: "Cloud Infrastructure Architect"
    }
  ];
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation logic with pause on user interaction
  const nextTestimonial = useCallback(() => {
    if (!isPaused) {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }
  }, [testimonials.length, isPaused]);

  const handleManualSelection = useCallback((index: number) => {
    setCurrentTestimonialIndex(index);
    setIsPaused(true);
    // Resume auto-rotation after 8 seconds of inactivity
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  const handleKeyNavigation = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
      handleManualSelection(newIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newIndex = (currentTestimonialIndex + 1) % testimonials.length;
      handleManualSelection(newIndex);
    }
  }, [currentTestimonialIndex, testimonials.length, handleManualSelection]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3500);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/shyamnalluri',
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-6 h-6" />,
      url: 'https://github.com/shyamnalluri',
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="w-6 h-6" />,
      url: 'mailto:nallurishyam@gmail.com',
    },
  ]; return (<section id="contact" className="relative py-6 pb-16 bg-black overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
    <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
    <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />

    <div className="container relative mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
      {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Colleagues
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {" "}Say About Me
            </span>
          </h2>          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Professional recommendations from colleagues and industry leaders I&apos;ve had the privilege to work with
          </p>
          </motion.div>       
          {/* Split Layout Testimonials Section */}
        <div 
          className="bg-gray-900 rounded-lg shadow-lg shadow-red-500/5 border border-gray-800 overflow-hidden mb-8"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
          role="region"
          aria-label="Testimonials section - use arrow keys to navigate"
        >
          <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/80 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-2xl"></div>
            
            {/* Split Layout Container */}
            <div className="flex flex-col lg:flex-row gap-6 min-h-[32rem]">
              {/* Left Sidebar - Mini Tiles (1/4 width on desktop) */}
              <div className="w-full lg:w-1/4 space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
                <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm p-2 rounded-lg mb-4 border border-gray-700/50">
                </div>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    onClick={() => handleManualSelection(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select testimonial from ${testimonial.name}`}
                    aria-selected={index === currentTestimonialIndex}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleManualSelection(index);
                      }
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      index === currentTestimonialIndex
                        ? 'bg-gradient-to-br from-orange-500/25 to-red-500/25 border-orange-500/60 ring-2 ring-orange-500/40 shadow-lg shadow-orange-500/20'
                        : 'bg-gradient-to-br from-gray-700/60 to-gray-800/70 border-gray-600/30 hover:border-orange-500/40 hover:from-gray-600/70 hover:to-gray-700/80 focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/30'
                    } focus:outline-none group`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.name} profile picture`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-500/30 group-hover:border-orange-500/50 transition-colors"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="text-white text-sm font-semibold truncate group-hover:text-orange-100 transition-colors">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 text-xs truncate group-hover:text-gray-300 transition-colors">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-500/20 text-orange-300 px-3 py-1.5 rounded-full text-xs text-center border border-orange-500/30 group-hover:bg-orange-500/30 group-hover:border-orange-500/50 transition-all">
                      {testimonial.highlight}
                    </div>
                    
                    {/* Active indicator */}
                    {index === currentTestimonialIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Right Content Area (3/4 width on desktop) */}
              <div className="w-full lg:w-3/4 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full min-h-[28rem] bg-gradient-to-br from-gray-700/80 to-gray-800/90 rounded-xl p-6 lg:p-8 border border-gray-600/50 shadow-2xl backdrop-blur-sm overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                  >
                    {/* Header with Progressive Loading */}
                    <motion.div 
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-1">
                          <img 
                            src={testimonials[currentTestimonialIndex].image} 
                            alt={`${testimonials[currentTestimonialIndex].name} profile picture`}
                            className="w-full h-full rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-gray-800 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-2xl mb-1">
                          {testimonials[currentTestimonialIndex].name}
                        </h4>
                        <p className="text-orange-400 text-lg font-semibold mb-1">
                          {testimonials[currentTestimonialIndex].role}
                        </p>
                        <p className="text-gray-400 text-base">
                          {testimonials[currentTestimonialIndex].company}
                        </p>
                      </div>
                    </motion.div>

                    {/* Content with Staggered Animations */}
                    <div className="space-y-8">
                      {/* Highlight Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="inline-block bg-gradient-to-r from-orange-500/25 to-red-500/25 border border-orange-500/40 rounded-full px-6 py-3 shadow-lg"
                      >
                        <span className="text-orange-300 text-sm font-semibold">
                          ✨ {testimonials[currentTestimonialIndex].highlight}
                        </span>
                      </motion.div>

                      {/* Quote Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="relative"
                      >
                        <FaQuoteLeft className="text-orange-500/60 text-4xl mb-6" />
                        <blockquote className="text-gray-200 text-xl leading-relaxed italic font-light relative z-10">
                          "{testimonials[currentTestimonialIndex].content}"
                        </blockquote>
                        <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section - Bottom */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg shadow-red-500/5 border border-gray-800 p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
            <p className="text-gray-400 text-lg">Reach out and let's create something amazing together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-full">
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium text-white text-lg">nallurishyam@gmail.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-full">
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium text-white text-lg">London, UK</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links - Center */}
            <div className="text-center">
              <p className="text-gray-400 mb-4 text-lg">Connect with me</p>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-full hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 border border-gray-700 hover:border-orange-500/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white">
                      {link.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full px-4 py-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-green-400 text-sm font-medium">Available for work</p>
                  <p className="text-gray-400 text-xs">Responding within 24 hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default Contact;