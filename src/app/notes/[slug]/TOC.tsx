'use client';

import { useEffect, useState } from 'react';

export default function TOC() {
  const [heads, setHeads] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const hs = Array.from(document.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const mapped = hs.map((el) => ({ id: el.id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 }));
    setHeads(mapped);

    const onScroll = () => {
      let current = '';
      for (const el of hs) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (heads.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="hidden xl:block sticky top-24 h-[calc(100vh-6rem)] overflow-auto text-sm text-gray-400">
      <div className="mb-2 font-semibold text-gray-300">On this page</div>
      <ul className="space-y-1">
        {heads.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`block py-1 hover:text-white ${active === h.id ? 'text-orange-400' : ''}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


