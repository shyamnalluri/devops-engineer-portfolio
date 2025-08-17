'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { certificationsData } from '../../data/certifications';
import { useEffect, useRef, useState } from 'react';

const Certifications = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridAnimRef, isVisible: gridVisible } = useScrollAnimation({ stagger: true, staggerDelay: 80 });
  const titleRef = useRef<HTMLSpanElement>(null);
  const [underlineW, setUnderlineW] = useState<number | null>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const compute = () => setUnderlineW(Math.floor(el.getBoundingClientRect().width * 0.8));
    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    window.addEventListener('resize', compute);
    return () => { ro.disconnect(); window.removeEventListener('resize', compute); };
  }, []);

  const getStatus = (validUntil?: string): { label: string; color: string } => {
    if (!validUntil || validUntil === 'Never expires') {
      return { label: 'No Expiry', color: 'text-slate-300' };
    }
    const year = parseInt(validUntil, 10);
    if (Number.isNaN(year)) return { label: 'Active', color: 'text-green-400' };
    const now = new Date().getFullYear();
    if (year < now) return { label: 'Expired', color: 'text-red-400' };
    if (year === now) return { label: 'Expiring', color: 'text-yellow-400' };
    return { label: 'Active', color: 'text-green-400' };
  };

  const getAbbr = (issuer: string | undefined): string => {
    if (!issuer) return 'CERT';
    if (issuer === 'Amazon Web Services') return 'AWS';
    if (issuer === 'Microsoft') return 'MS';
    if (issuer === 'Cloud Native Computing Foundation') return 'CNCF';
    if (issuer === 'HashiCorp') return 'HC';
    if (issuer === 'ISC2') return 'ISC2';
    if (issuer === 'Docker Inc') return '🐳';
    const parts = issuer.split(' ');
    return parts.length === 1 ? parts[0].slice(0, 3).toUpperCase() : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Internal scroll container sizing
  const gridRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const getColumns = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2; // sm/md
    return 1; // xs
  };

  const [columns, setColumns] = useState<number>(getColumns());

  useEffect(() => {
    const onResize = () => setColumns(getColumns());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const computeHeight = () => {
      const gridEl = gridRef.current;
      if (!gridEl) return;
      const items = Array.from(gridEl.querySelectorAll('[data-card]')) as HTMLElement[];
      if (items.length === 0) return;

      const first = items[0];
      const firstTop = first.offsetTop;

      let rowOffset: number | null = null;
      if (items.length > columns) {
        const secondRowFirst = items[Math.min(columns, items.length - 1)];
        if (secondRowFirst) rowOffset = secondRowFirst.offsetTop - firstTop;
      }

      const firstHeight = first.getBoundingClientRect().height;
      const verticalGapEstimate = 16; // ~gap-4
      const effectiveRow = rowOffset ?? (firstHeight + verticalGapEstimate);

      // Show ~2.5 rows for affordance (like Projects)
      const visibleRows = 2.5;
      const desiredHeight = Math.max(firstHeight, Math.floor(effectiveRow * visibleRows));

      setContainerHeight(desiredHeight);
    };

    const rId = window.requestAnimationFrame(() => {
      computeHeight();
      setTimeout(computeHeight, 100);
      setTimeout(computeHeight, 300);
    });

    window.addEventListener('resize', computeHeight);
    return () => {
      window.cancelAnimationFrame(rId);
      window.removeEventListener('resize', computeHeight);
    };
  }, [columns]);

  return (
    <section 
      id="certifications" 
      className="relative overflow-hidden"
      role="region"
      aria-label="Professional certifications"
    >
      <div className="section-wrap relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header transition-all duration-800 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title"><span ref={titleRef} className="inline-block">Professional Certifications</span></h2>
          <div className="mx-auto mt-1 md:mt-2 h-0.5 w-56 sm:w-64 md:w-72 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded" style={underlineW ? { width: `${underlineW}px` } : undefined} />
          <p className="section-subtitle">An overview of my professional certifications and training</p>
        </div>

        {/* Certifications grid within scrollable container */}
        <div
          ref={gridAnimRef}
          className={`transition-all duration-800 ${
            gridVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: containerHeight ? `${containerHeight}px` : undefined }}
            role="region"
            aria-label="Scrollable certifications list"
          >
            {certificationsData.map((cert) => {
              const status = getStatus(cert.validUntil);
              return (
                <div
                  key={cert.id}
                  data-card
                  className="group relative bg-gray-900/60 border border-gray-700/60 rounded-xl sm:rounded-2xl h-[108px] sm:h-[112px] flex flex-col p-4 pl-5 overflow-hidden transition-colors duration-200 hover:border-orange-500/40 focus-ring"
                  tabIndex={0}
                  role="listitem"
                  aria-label={`${cert.name}`}
                >
                  {/* Left accent stripe */}
                  <span className="absolute left-0 top-0 h-full w-[3px] sm:w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-l-[inherit] opacity-90" aria-hidden />

                  {/* Title row with tiny provider icon */}
                  <div className="flex items-center gap-2 pr-2">
                    <span className="w-6 h-6 rounded-md bg-gray-800/70 border border-gray-700/60 text-[10px] text-gray-200 font-semibold flex items-center justify-center select-none">
                      {getAbbr(cert.issuer)}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-snug line-clamp-2">
                      {cert.name}
                    </h3>
                  </div>

                  {/* Footer meta condensed */}
                  <div className="mt-auto pt-2 border-t border-gray-700/60 text-[12px] sm:text-[12px] text-slate-300 flex items-center gap-2">
                    <span>{cert.issueDate}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{cert.validUntil && cert.validUntil !== 'Never expires' ? `Valid ${cert.validUntil}` : 'No Expiry'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span className={`${status.color}`}>{status.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;