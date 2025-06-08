'use client';

import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart, FaCopy, FaCheck } from 'react-icons/fa';
import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const { ref: footerRef } = useScrollAnimation();

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('hello@shyamkumar.dev');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, []);

  const socialLinks = [
    { 
      icon: <FaLinkedin size={20} />, 
      url: "https://linkedin.com/in/shyam-kumar", 
      color: "hover:text-blue-500"
    },
    { 
      icon: <FaGithub size={20} />, 
      url: "https://github.com/shyam-kumar", 
      color: "hover:text-gray-300"
    },
    { 
      icon: <FaEnvelope size={20} />, 
      url: "mailto:hello@shyamkumar.dev", 
      color: "hover:text-orange-500"
    }
  ];
  return (
    <footer className="bg-black py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      
      <div 
        ref={footerRef}
        className="container mx-auto px-6 relative z-10 animate-fade-in-up"
      >
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="animate-slide-up animate-delay-100">
            <h3 className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="space-y-4">
              <div 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 ease-primary cursor-pointer p-2 rounded-lg hover:bg-gray-800/50 group"
                onClick={copyEmail}
              >
                <FaEnvelope className="text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  hello@shyamkumar.dev
                </span>
                <div className="ml-auto transition-all duration-200">
                  {emailCopied ? (
                    <FaCheck className="text-green-500 text-xs animate-scale-in" />
                  ) : (
                    <FaCopy className="text-gray-500 text-xs group-hover:text-gray-300" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group">
                <FaMapMarkerAlt className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Available Remotely
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group">
                <FaPhone className="text-green-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-slide-up animate-delay-200">
            <h3 className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Connect
            </h3>
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-300 ease-primary p-3 rounded-xl hover:bg-gray-800/50 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95 ${link.color}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="hover:rotate-12 transition-transform duration-200">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="animate-slide-up animate-delay-300">
            <h3 className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Availability
            </h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-30"></div>
              </div>
              <div>
                <p className="text-green-400 font-medium text-sm group-hover:text-green-300 transition-colors duration-200">
                  Available for work
                </p>
                <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200">
                  Full-time & Projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up animate-delay-400">
          <p className="text-gray-400 text-sm flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
            © 2025 Shyam Kumar. Built with 
            <FaHeart className="text-red-500 text-xs animate-pulse-slow hover:scale-125 transition-transform duration-200" />
            using Next.js & Tailwind CSS
          </p>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
            <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
              Open to opportunities
            </span>
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
