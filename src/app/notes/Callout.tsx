'use client';

import { ReactNode } from 'react';

type Kind = 'note' | 'tip' | 'warning' | 'info';

const STYLES: Record<Kind, { border: string; bg: string; title: string }> = {
  note: { border: 'border-blue-500/40', bg: 'from-blue-500/10 to-blue-500/5', title: 'Note' },
  tip: { border: 'border-green-500/40', bg: 'from-green-500/10 to-green-500/5', title: 'Tip' },
  warning: {
    border: 'border-yellow-500/40',
    bg: 'from-yellow-500/10 to-yellow-500/5',
    title: 'Warning',
  },
  info: { border: 'border-cyan-500/40', bg: 'from-cyan-500/10 to-cyan-500/5', title: 'Info' },
};

export default function Callout({
  kind = 'note',
  children,
  title,
}: {
  kind?: Kind;
  children: ReactNode;
  title?: string;
}) {
  const s = STYLES[kind];
  return (
    <div className={`my-4 rounded-xl border ${s.border} bg-gradient-to-r ${s.bg} p-4`}>
      {' '}
      <div className="mb-2 text-sm font-semibold text-gray-200">{title || s.title}</div>
      <div className="text-gray-300 text-sm">{children}</div>
    </div>
  );
}
