'use client';

import { useState } from 'react';

type CopyButtonProps = {
  text: string;
  className?: string;
};

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label="Copy code"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}


