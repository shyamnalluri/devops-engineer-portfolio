'use client';

import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart, FaCopy, FaCheck } from 'react-icons/fa';
import { useState, useCallback } from 'react';

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);

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
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                onClick={copyEmail}
              >
                <FaEnvelope className="text-orange-500" />
                <span className="text-sm">hello@shyamkumar.dev</span>
                {emailCopied ? (
                  <FaCheck className="text-green-500 text-xs" />
                ) : (
                  <FaCopy className="text-gray-500 text-xs" />
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaMapMarkerAlt className="text-blue-500" />
                <span className="text-sm">Available Remotely</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaPhone className="text-green-500" />
                <span className="text-sm">Within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${link.color}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-white font-bold mb-4">Availability</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-green-400 font-medium text-sm">Available for work</p>
                <p className="text-gray-400 text-xs">Full-time & Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2025 Shyam Kumar. Built with 
            <FaHeart className="text-red-500 text-xs" />
            using Next.js & Tailwind CSS
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Open to opportunities</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
