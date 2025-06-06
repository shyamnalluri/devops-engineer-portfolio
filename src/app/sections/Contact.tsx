'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft, FaPaperPlane, FaCopy, FaCheck, FaUser, FaBuilding, FaPhone } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';

const Contact = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: '' });

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

  const socialLinks = [
    { 
      icon: <FaLinkedin size={24} />, 
      url: "https://linkedin.com/in/shyam-kumar", 
      label: "LinkedIn",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: <FaGithub size={24} />, 
      url: "https://github.com/shyam-kumar", 
      label: "GitHub",
      color: "from-gray-600 to-gray-700"
    },
    { 
      icon: <FaEnvelope size={24} />, 
      url: "mailto:hello@shyamkumar.dev", 
      label: "Email",
      color: "from-orange-500 to-red-500"
    }
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-orange-500" />,
      label: "Email",
      value: "hello@shyamkumar.dev",
      action: () => copyEmail()
    },
    {
      icon: <FaMapMarkerAlt className="text-blue-500" />,
      label: "Location", 
      value: "Available Remotely",
      action: null
    },
    {
      icon: <FaPhone className="text-green-500" />,
      label: "Response Time",
      value: "Within 24 hours",
      action: null
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('hello@shyamkumar.dev');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, []);

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
    } catch (error) {
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss how we can build something amazing together.
          </p>
        </motion.div>
        
        {/* Balanced Layout: Contact Form & Testimonials Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form - Equal Weight (50% width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <FaPaperPlane className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send Message</h3>
                  <p className="text-gray-400">Let's start the conversation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, goals, and how I can help..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isFormValid || formStatus.submitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isFormValid && !formStatus.submitting
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/25'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {formStatus.submitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </motion.div>
                    ) : formStatus.submitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        Message Sent!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaPaperPlane />
                        Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {formStatus.error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    {formStatus.error}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Testimonials - Equal Weight (50% width) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full">
              {/* Testimonials Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaQuoteLeft className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Client Testimonials</h3>
                  <p className="text-gray-400">What others say about my work</p>
                </div>
              </div>              {/* Inner Container for Testimonials Content - Adjusted size */}
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 flex-1 mb-6">
                <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-between"
                >                  {/* Testimonial Content */}
                  <div className="mb-6">
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
                        {testimonials[currentTestimonial].highlight}
                      </span>
                    </div>
                    
                    <blockquote className="text-lg text-gray-200 leading-relaxed mb-6 italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                  </div>                  {/* Client Info */}
                  <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
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
                    </div>                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
              
              {/* Dotted Indicators - Now in outer container */}
              <div className="flex justify-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/30' 
                        : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                    }`}
                  />
                ))}
              </div>            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;