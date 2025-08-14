'use client';

import { useMemo } from 'react';

export default function Share({ title }: { title: string }) {
  const url = useMemo(() => typeof window !== 'undefined' ? window.location.href : '', []);
  const text = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
      <span>Share:</span>
      <a className="hover:text-white" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}>X</a>
      <a className="hover:text-white" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}>LinkedIn</a>
    </div>
  );
}


