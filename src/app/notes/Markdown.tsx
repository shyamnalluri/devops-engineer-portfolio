'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Callout from './Callout';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function Markdown({ content }: { content: string }) {
  return (
    <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2({ children, ...props }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2 id={id} {...props} className="mt-10 mb-4">
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3 id={id} {...props} className="mt-8 mb-3">
                {children}
              </h3>
            );
          },
          p({ children, ...props }) {
            return (
              <p {...props} className="leading-8">
                {children}
              </p>
            );
          },
          blockquote({ children, ...props }) {
            // Support callouts via blockquote syntax: > [!TIP] text
            const rawChild = Array.isArray(children) ? children[0] : children;
            const raw = typeof rawChild === 'string' ? rawChild : '';
            const match = raw.match(/^\s*\[!(NOTE|TIP|WARNING|INFO)\]\s*(.*)/i);
            if (match) {
              const kind = match[1].toLowerCase() as 'note' | 'tip' | 'warning' | 'info';
              const body = match[2] || '';
              return <Callout kind={kind}>{body}</Callout>;
            }
            return (
              <blockquote {...props} className="border-l-2 border-gray-700 pl-4 text-gray-300">{children}</blockquote>
            );
          },
          code({ className, children, ...props }: { className?: string; children?: React.ReactNode }) {
            // Keep regex for future use if needed
            const codeText = String(children);
            const isInline = !(className && className.includes('language-'));
            if (isInline) return <code className={className} {...props}>{children}</code>;
            return (
              <pre className="relative group overflow-auto border border-gray-700/60 rounded-md bg-black/40">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(codeText)}
                  className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md border border-gray-700 bg-black/50 text-gray-300"
                  aria-label="Copy code"
                >
                  Copy
                </button>
                <code className={className || ''} {...props} style={{ fontSize: '14px', lineHeight: 1.5 }}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}


