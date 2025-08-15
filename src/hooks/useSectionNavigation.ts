'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

function extractHash(href: string): string | null {
  const index = href.indexOf('#');
  if (index === -1) return null;
  return href.substring(index);
}

export function useSectionNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(pathname === '/' ? 'home' : '');
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset highlight when leaving home
    if (pathname !== '/' && activeSection !== '') {
      setActiveSection('');
    }

    if (pathname !== '/') {
      // Do not observe sections on non-home routes
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isNavigating && targetSection) {
        const targetEntry = entries.find(entry => entry.target.id === targetSection);
        if (targetEntry && targetEntry.isIntersecting && targetEntry.intersectionRatio > 0.3) {
          setActiveSection(targetSection);
          setIsNavigating(false);
          setTargetSection(null);
        }
        return;
      }

      if (!isNavigating) {
        let bestSectionId: string | null = null;
        let maxScore = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;

            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight);

            let score = visibilityRatio;
            if (rect.top <= 150 && rect.top >= -100) {
              score += 0.5;
            }
            if (visibilityRatio > 0.6) {
              score += 0.3;
            }

            if (score > maxScore) {
              maxScore = score;
              bestSectionId = entry.target.id;
            }
          }
        });

        if (bestSectionId && maxScore > 0.4) {
          setActiveSection(bestSectionId);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-80px 0px -20% 0px',
    });
    observerRef.current = observer;

    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [pathname, isNavigating, targetSection, activeSection]);

  const handleSectionLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = extractHash(href);
    if (!hash) return; // Not a section link

    const targetId = hash.replace('#', '');
    setIsNavigating(true);
    setTargetSection(targetId);
    setActiveSection(targetId);

    const element = typeof document !== 'undefined' ? document.querySelector(hash) : null;
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navigationTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        setTargetSection(null);
      }, 1200);

      setTimeout(() => {
        if (isNavigating) {
          setIsNavigating(false);
          setTargetSection(null);
        }
      }, 2000);
    }
  };

  return {
    activeSection,
    handleSectionLinkClick,
  };
}


