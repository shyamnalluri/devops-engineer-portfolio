'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {  const socialLinks = [
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
  ];  return (
    <section id="contact" className="relative py-12 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-500/20 rounded-full filter blur-[80px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full filter blur-[80px]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 text-white relative inline-block"
            >
              Get In Touch
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mt-8"
            >
              Have a project in mind? Let's work together to create something amazing.
            </motion.p>
          </div>          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-gray-900 rounded-xl shadow-lg shadow-red-500/5 border border-gray-800 overflow-hidden">
            {/* Contact Info Column */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black text-white p-10">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-4">Fill up the form and I'll get back to you within 24 hours.</p>
              
              <div className="space-y-6">                {/* Phone section removed */}
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-gray-800 p-2 rounded-full">
                    <FaEnvelope className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="font-medium">nallurishyam@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-gray-800 p-2 rounded-full">
                    <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-medium">London, UK</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="text-gray-400 mb-4">Connect with me</p>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-white">
                        {link.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>            </div>
              {/* Contact Form Column */}
            <div className="lg:col-span-3 p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                  <div>
                  <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={6} 
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 text-base font-medium hover:from-orange-500 hover:to-red-500 transition-all"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;