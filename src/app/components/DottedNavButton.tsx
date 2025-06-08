'use client';

import React from 'react';

interface DottedNavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}

const DottedNavButton = ({ direction, onClick, className = '' }: DottedNavButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`dotted-nav-button ${direction} ${className}`}
    >
      <div className="line one">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line two">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line three">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line four">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line five">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line six">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>
      <div className="line seven">
        <div className="round" />
        <div className="round" />
        <div className="round" />
        <div className="round" />
      </div>

      <style jsx>{`
        .dotted-nav-button {
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          width: 70px;
          height: 50px;
          gap: 3px;
          padding: 8px;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .dotted-nav-button:hover {
          opacity: 1;
          animation: ${direction === 'right' ? 'moveRight' : 'moveLeft'} 2s infinite ease;
        }

        .dotted-nav-button.left {
          transform: scaleX(-1);
        }

        @keyframes moveRight {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(15px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes moveLeft {
          0% {
            transform: scaleX(-1) translateX(0);
          }
          50% {
            transform: scaleX(-1) translateX(15px);
          }
          100% {
            transform: scaleX(-1) translateX(0);
          }
        }

        .round {
          width: 5px;
          height: 5px;
          background: #f97316;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 0 3px rgba(249, 115, 22, 0.3);
        }

        .dotted-nav-button:hover .round {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
          transform: scale(1.1);
        }

        .line {
          display: flex;
          gap: 3px;
        }

        .two {
          transform: translateX(8px);
        }

        .three {
          transform: translateX(16px);
        }

        .four {
          transform: translateX(24px);
        }

        .five {
          transform: translateX(16px);
        }

        .six {
          transform: translateX(8px);
        }
      `}</style>
    </button>
  );
};

export default DottedNavButton;
