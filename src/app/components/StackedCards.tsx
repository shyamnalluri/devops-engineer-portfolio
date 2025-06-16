'use client';

import { useState } from 'react';

interface StackedCardsProps<T = unknown> {
  items: T[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  renderCard: (item: T, index: number) => React.ReactNode;
  isScrolling: boolean;
  isTouchActive: boolean;
}

const StackedCards = <T,>({
  items,
  currentIndex,
  onIndexChange,
  renderCard,
  isScrolling,  isTouchActive
}: StackedCardsProps<T>) => {
  // Calculate stacked card classes based on current active index
  const getStackedCardClass = (index: number) => {
    const totalItems = items.length;
    const relativePosition = index - currentIndex;
    
    // Base classes
    let classes = 'stacked-card';
    
    // Apply stacking classes based on relative position from current
    if (relativePosition === 0) {
      classes += ' active';
    } else if (relativePosition === 1 || (currentIndex === totalItems - 1 && index === 0)) {
      classes += ' incoming';
    } else if (relativePosition === -1 || (currentIndex === 0 && index === totalItems - 1)) {
      classes += ' outgoing';
    } else if (relativePosition > 1 || (relativePosition < 0 && Math.abs(relativePosition) > totalItems / 2)) {
      classes += ' future-stack';
    } else if (relativePosition < -1 || (relativePosition > 0 && relativePosition > totalItems / 2)) {
      classes += ' past-stack';
    }
    
    return classes;
  };

  // Navigation functions for stacked cards
  const navigateStackedCards = (direction: 'next' | 'prev') => {
    if (isScrolling) return;
    
    if (direction === 'next') {
      onIndexChange((currentIndex + 1) % items.length);
    } else {
      onIndexChange((currentIndex - 1 + items.length) % items.length);
    }
  };

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateStackedCards('next');
    } else if (isRightSwipe) {
      navigateStackedCards('prev');
    }
  };
  return (
    <div
      className={`stacked-carousel ${isTouchActive ? 'touch-active' : ''}`}
      style={{ 
        perspective: '1500px',
        perspectiveOrigin: 'center center',
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transformStyle: 'preserve-3d'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >      {items.map((item, index) => {
        const stackedClass = getStackedCardClass(index);
        console.log(`Card ${index}: currentIndex=${currentIndex}, class="${stackedClass}"`); // Debug log
        
        return (
          <div 
            key={`stacked-card-${index}`} 
            className={stackedClass}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '85vw',
              maxWidth: '320px',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d'
            }}
          >
            {renderCard(item, index)}
          </div>
        );
      })}
      
      {/* Stacked Navigation Controls */}
      <div className="stacked-nav">
        <button
          onClick={() => navigateStackedCards('prev')}
          disabled={isScrolling}
          className={isScrolling ? 'opacity-50 cursor-not-allowed' : ''}
          aria-label="Previous project"
        >
          <svg 
            className="w-6 h-6"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="page-indicator">
          {currentIndex + 1} / {items.length}
        </div>

        <button
          onClick={() => navigateStackedCards('next')}
          disabled={isScrolling}
          className={isScrolling ? 'opacity-50 cursor-not-allowed' : ''}
          aria-label="Next project"
        >
          <svg 
            className="w-6 h-6"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StackedCards;
