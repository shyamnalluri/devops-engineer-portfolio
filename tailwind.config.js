/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],  theme: {
    // Mobile-first breakpoints (Tailwind default is mobile-first)
    screens: {
      'xs': '375px',   // Extra small devices
      'sm': '640px',   // Small devices
      'md': '768px',   // Medium devices  
      'lg': '1024px',  // Large devices
      'xl': '1280px',  // Extra large devices
      '2xl': '1536px', // 2X large devices
      // Touch-specific breakpoints
      'touch': '768px',
      'no-touch': { 'raw': '(hover: hover) and (pointer: fine)' },
    },
    extend: {
      // Professional Animation System - Apple/Stripe Inspired
      animation: {
        // Existing animations
        'float': 'float 6s ease-in-out infinite',
        
        // Professional entrance animations
        'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-left': 'slideLeft 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-right': 'slideRight 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        
        // Staggered reveals
        'stagger-1': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) 0.05s both',
        'stagger-2': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) 0.1s both',
        'stagger-3': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) 0.15s both',
        'stagger-4': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s both',
        'stagger-5': 'slideUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) 0.25s both',
        
        // Hero text animations
        'hero-title': 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s both',
        'hero-subtitle': 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s both',
        'hero-description': 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s both',
        
        // Interactive animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        
        // Navigation animations
        'nav-slide': 'navSlide 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'mobile-menu': 'mobileMenu 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        
        // Project tile animations
        'tile-hover': 'tileHover 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'modal-in': 'modalIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'modal-out': 'modalOut 0.2s cubic-bezier(0.4, 0.0, 1, 1)',
          // Skill animations
        'skill-pop': 'skillPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'progress-fill': 'progressFill 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        
        // Enhanced entrance animations with delays
        'fade-in-up': 'slideUp 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'fade-in-down': 'slideDown 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'fade-in-left': 'slideLeft 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'fade-in-right': 'slideRight 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        
        // Page transition animations
        'page-enter': 'pageEnter 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'page-exit': 'pageExit 0.3s cubic-bezier(0.4, 0.0, 1, 1)',
        
        // Loading animations
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'spinner': 'spin 1s linear infinite',
        
        // Button and interaction animations
        'button-press': 'buttonPress 0.1s ease-out',
        'icon-spin': 'iconSpin 0.3s ease-in-out',
        
        // Text animations
        'typewriter': 'typewriter 4s steps(40) infinite',
        'text-shimmer': 'textShimmer 2s linear infinite',
        
        // Background animations
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'particle-float': 'particleFloat 20s linear infinite',
      },
      
      keyframes: {
        // Existing keyframes
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        
        // Professional entrance animations
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        
        // Interactive animations
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
          },
        },
        
        // Navigation animations
        navSlide: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        mobileMenu: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        
        // Project animations
        tileHover: {
          '0%': {
            transform: 'scale(1) translateY(0)',
          },
          '100%': {
            transform: 'scale(1.02) translateY(-4px)',
          },
        },
        modalIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        modalOut: {
          '0%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
          },
        },
        
        // Skill animations
        skillPop: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        progressFill: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: 'var(--progress-width)',
          },
        },
        
        // Background animations
        gradientShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },        particleFloat: {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '100%': {
            transform: 'translateY(-1000px) rotate(720deg)',
          },
        },
        
        // Additional keyframes for new animations
        pageEnter: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        pageExit: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-20px) scale(0.95)',
          },
        },
        skeleton: {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        },
        buttonPress: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        iconSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        typewriter: {
          '0%': {
            width: '0%',
          },
          '50%': {
            width: '100%',
          },
          '100%': {
            width: '0%',
          },
        },
        textShimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
      
      // Professional animation delays
      animationDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
      },
      },
      
      // Enhanced transitions with professional easing
      transitionTimingFunction: {
        'primary': 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material ease
        'secondary': 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Apple smooth
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Subtle bounce
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring effect
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      
      // Professional duration scale
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      // Professional scale values
      scale: {
        '102': '1.02',
        '103': '1.03',
        '97': '0.97',
        '98': '0.98',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
