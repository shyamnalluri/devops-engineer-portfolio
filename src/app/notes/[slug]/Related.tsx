'use client';

import Link from 'next/link';
import type { Note } from '@/utils/notes';

export default function Related({ notes }: { notes: Note[] }) {
  if (!notes.length) return null;
  return (
    <div className="mt-12 border-t border-gray-800 pt-6">
      <h3 className="text-lg font-semibold mb-4">Related notes</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {notes.map((n) => (
          <li key={n.slug} className="rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <Link href={`/notes/${n.slug}`} className="block p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{n.title}</div>
                  {n.tags && n.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {n.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-gray-500 whitespace-nowrap">{new Date(n.date).toLocaleDateString()}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


