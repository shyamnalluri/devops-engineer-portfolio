'use client';

// Inline icons to avoid react-icons cost below the fold
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
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v12H0zM8 8h4.8v1.7h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.33 6 7.66V20H18v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V20H8z" />
        </svg>
      ), 
      url: "https://linkedin.com/in/shyam-kumar", 
      color: "hover:text-blue-500",
      label: "LinkedIn"
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.52 0-.26-.01-1.12-.02-2.03-3.06.66-3.71-1.29-3.71-1.29-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.18.9.1-.71.38-1.18.69-1.45-2.45-.28-5.02-1.22-5.02-5.44 0-1.2.43-2.17 1.13-2.94-.11-.28-.49-1.41.11-2.93 0 0 .93-.3 3.06 1.12.89-.25 1.84-.38 2.78-.38.94 0 1.89.13 2.78.38 2.13-1.42 3.06-1.12 3.06-1.12.6 1.52.22 2.65.11 2.93.7.77 1.13 1.74 1.13 2.94 0 4.23-2.58 5.15-5.04 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .28.19.62.76.51 4.36-1.46 7.5-5.57 7.5-10.43C23.02 5.24 18.27.5 12 .5z"/>
        </svg>
      ), 
      url: "https://github.com/shyam-kumar", 
      color: "hover:text-white",
      label: "GitHub"
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
          <path d="M2 5.75A2.75 2.75 0 014.75 3h14.5A2.75 2.75 0 0122 5.75v12.5A2.75 2.75 0 0119.25 21H4.75A2.75 2.75 0 012 18.25V5.75zm2.3.75l7.2 5.4c.3.23.7.23 1 0l7.2-5.4H4.3z" />
        </svg>
      ), 
      url: "mailto:hello@shyamkumar.dev", 
      color: "hover:text-orange-500",
      label: "Email"
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
                <svg className="text-orange-500 group-hover:scale-110 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M2 5.75A2.75 2.75 0 014.75 3h14.5A2.75 2.75 0 0122 5.75v12.5A2.75 2.75 0 0119.25 21H4.75A2.75 2.75 0 012 18.25V5.75zm2.3.75l7.2 5.4c.3.23.7.23 1 0l7.2-5.4H4.3z" />
                </svg>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  nallurishyam@gmail.com
                </span>
                <div className="ml-auto transition-all duration-200">
                  {emailCopied ? (
                    <svg className="text-green-500 w-4 h-4 animate-scale-in" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z"/>
                    </svg>
                  ) : (
                    <svg className="text-gray-500 w-4 h-4 group-hover:text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group">
                <svg className="text-blue-500 group-hover:scale-110 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"/>
                </svg>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Available Remotely
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group">
                <svg className="text-green-500 group-hover:scale-110 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.61 22 2 13.39 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z"/>
                </svg>
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
            </h3>            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-300 ease-primary p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl hover:bg-gray-800/50 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95 ${link.color}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={link.label}
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
                  Full-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up animate-delay-400">
          <p className="text-gray-400 text-sm flex items-center gap-2 hover:text-gray-300 transition-colors duration-300">
            © 2025 Shyam Nalluri. Built with 
            <svg className="text-red-500 w-4 h-4 animate-pulse-slow hover:scale-125 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.81 10.35 6.09 11.16 4.81 12.66 4 14.2 4 16.7 4 18.7 6 18.7 8.5c0 3.78-3.4 6.86-8.25 11.54L12 21.35z"/>
            </svg>
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
