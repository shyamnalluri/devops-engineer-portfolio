'use client';

// Inline icons to avoid react-icons cost below the fold
import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const { ref: footerRef } = useScrollAnimation();

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('nallurishyam@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, []);

  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v12H0zM8 8h4.8v1.7h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.33 6 7.66V20H18v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V20H8z" />
        </svg>
      ),
      url: 'https://linkedin.com/in/shyam-kumar',
      color: 'hover:text-blue-500',
      label: 'LinkedIn',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.52 0-.26-.01-1.12-.02-2.03-3.06.66-3.71-1.29-3.71-1.29-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.18.9.1-.71.38-1.18.69-1.45-2.45-.28-5.02-1.22-5.02-5.44 0-1.2.43-2.17 1.13-2.94-.11-.28-.49-1.41.11-2.93 0 0 .93-.3 3.06 1.12.89-.25 1.84-.38 2.78-.38.94 0 1.89.13 2.78.38 2.13-1.42 3.06-1.12 3.06-1.12.6 1.52.22 2.65.11 2.93.7.77 1.13 1.74 1.13 2.94 0 4.23-2.58 5.15-5.04 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .28.19.62.76.51 4.36-1.46 7.5-5.57 7.5-10.43C23.02 5.24 18.27.5 12 .5z" />
        </svg>
      ),
      url: 'https://github.com/shyam-kumar',
      color: 'hover:text-white',
      label: 'GitHub',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M2 5.75A2.75 2.75 0 014.75 3h14.5A2.75 2.75 0 0122 5.75v12.5A2.75 2.75 0 0119.25 21H4.75A2.75 2.75 0 012 18.25V5.75zm2.3.75l7.2 5.4c.3.23.7.23 1 0l7.2-5.4H4.3z" />
        </svg>
      ),
      url: 'mailto:nallurishyam@gmail.com',
      color: 'hover:text-orange-500',
      label: 'Email',
    },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t border-gray-800 bg-black/80 py-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* subtle gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div ref={footerRef} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: copyright */}
          <p className="text-gray-400 text-sm flex items-center gap-2 text-center md:text-left">
            © {new Date().getFullYear()} Shyam Nalluri. Built with Next.js & Tailwind CSS ·
            AI-assisted, refined by me.
          </p>

          {/* Center: social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${link.color} transition-colors p-2 rounded-md hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 focus:ring-offset-black`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={copyEmail}
              className="text-gray-400 hover:text-orange-400 transition-colors p-2 rounded-md hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Copy email to clipboard"
            >
              {emailCopied ? (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  className="text-green-400"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              )}
            </button>
          </div>

          {/* Availability pill removed as requested */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
