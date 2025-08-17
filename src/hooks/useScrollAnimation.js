import { useEffect, useRef, useState } from 'react';

/**
 * Professional scroll animation hook inspired by Apple and Stripe
 * Handles IntersectionObserver-based animations with staggered reveals
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    stagger = false,
    staggerDelay = 100,
    animationClass = 'animate-slide-up',
  } = options;

  const elementsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elements = elementsRef.current.filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add stagger delay if enabled
            const delay = stagger ? index * staggerDelay : 0;

            setTimeout(() => {
              entry.target.classList.add('animate-in');
              entry.target.classList.add(animationClass);

              // Apply stagger animation classes
              if (stagger && index < 5) {
                entry.target.classList.add(`animate-stagger-${index + 1}`);
              }
            }, delay);

            setIsVisible(true);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('animate-in', animationClass);
            if (stagger) {
              for (let i = 1; i <= 5; i++) {
                entry.target.classList.remove(`animate-stagger-${i}`);
              }
            }
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((element) => {
      if (element) {
        // Add initial state classes
        element.classList.add('page-transition');
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, stagger, staggerDelay, animationClass]);

  const addRef = (element) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  return { ref: addRef, isVisible };
};

/**
 * Hook for hero section text staggered animation
 */
export const useHeroAnimation = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);

      if (titleRef.current) {
        titleRef.current.classList.add('animate-hero-title');
      }
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-hero-subtitle');
      }
      if (descriptionRef.current) {
        descriptionRef.current.classList.add('animate-hero-description');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    titleRef,
    subtitleRef,
    descriptionRef,
    isLoaded,
  };
};

/**
 * Hook for button hover animations with haptic feedback
 */
export const useButtonAnimation = () => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add('btn-professional');
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.remove('btn-professional');
    }
  };

  const handleClick = () => {
    // Add click animation
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.97)';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = '';
        }
      }, 150);
    }

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return {
    buttonRef,
    buttonProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      className: 'transition-all duration-150 ease-primary transform focus-ring',
    },
  };
};

/**
 * Hook for card hover effects
 */
export const useCardAnimation = () => {
  const cardRef = useRef(null);

  const cardProps = {
    ref: cardRef,
    className:
      'card-hover transition-all duration-300 ease-secondary transform will-change-transform',
    onMouseEnter: () => {
      if (cardRef.current) {
        cardRef.current.style.willChange = 'transform, box-shadow';
      }
    },
    onMouseLeave: () => {
      if (cardRef.current) {
        cardRef.current.style.willChange = 'auto';
      }
    },
  };

  return { cardRef, cardProps };
};

/**
 * Hook for page transitions
 */
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTransitioning(false);
        resolve();
      }, 300);
    });
  };

  return {
    isTransitioning,
    startTransition,
    transitionClass: isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0',
  };
};

export default useScrollAnimation;
