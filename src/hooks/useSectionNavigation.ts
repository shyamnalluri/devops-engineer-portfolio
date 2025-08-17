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
        const targetEntry = entries.find((entry) => entry.target.id === targetSection);
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

        entries.forEach((entry) => {
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
      rootMargin: '-40px 0px -30% 0px',
    });
    observerRef.current = observer;

    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
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
    if (!hash) return;

    // If we are not on the home route, let Next.js <Link> handle client-side navigation (prefetched)
    if (pathname !== '/') {
      return;
    }

    e.preventDefault();
    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    const targetId = hash.replace('#', '');
    setIsNavigating(true);
    setTargetSection(targetId);
    setActiveSection(targetId);

    const pushHash = () => {
      if (typeof window !== 'undefined') {
        const url = href.startsWith('/') ? href : `/${href}`;
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        } else if (window.history?.replaceState) {
          // ensure proper hash without adding history entries
          window.history.replaceState({}, '', url);
        }
      }
    };

    let attempts = 0;
    const maxAttempts = 10;
    const tryScroll = () => {
      attempts += 1;
      const element = document.getElementById(targetId);
      if (element) {
        // If wrapped in a content-visibility container, temporarily reveal it
        const wrapper = (element.closest?.('.cv-auto') || null) as HTMLElement | null;
        if (wrapper) {
          wrapper.style.contentVisibility = 'visible';
          wrapper.style.containIntrinsicSize = 'auto';
        }
        const measureAndScroll = () => {
          // Use native smooth scrolling with CSS scroll-margin-top to handle offset
          try {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch {
            // Fallback
            const rect = element.getBoundingClientRect();
            const currentY = window.scrollY || window.pageYOffset;
            const offset = 32;
            const targetY = Math.max(0, currentY + rect.top - offset);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          pushHash();
          navigationTimeoutRef.current = setTimeout(() => {
            setIsNavigating(false);
            setTargetSection(null);
          }, 700);
        };
        // Wait one frame to ensure wrapper style takes effect
        requestAnimationFrame(measureAndScroll);
      } else if (attempts < maxAttempts) {
        // Wait for section to mount/layout, then retry
        setTimeout(tryScroll, 40);
      } else {
        // Fallback: jump to hash
        window.location.href = href;
      }
    };
    // Defer slightly to allow layout/paint before measuring
    setTimeout(tryScroll, 20);
  };

  return {
    activeSection,
    handleSectionLinkClick,
  };
}
