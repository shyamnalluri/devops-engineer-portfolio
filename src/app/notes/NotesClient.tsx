'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Note } from '@/utils/notes';

type CategoryKey = 'Kubernetes' | 'CI-CD' | 'Git' | 'Aws' | 'Azure' | 'Other';

type Category = {
  key: CategoryKey;
  label: string;
  tags: string[];
};

const CATEGORIES: Category[] = [
  { key: 'Kubernetes', label: 'Kubernetes', tags: ['kubernetes', 'k8s'] },
  { key: 'CI-CD', label: 'CI/CD', tags: ['ci', 'cd', 'delivery', 'pipeline'] },
  { key: 'Git', label: 'Git', tags: ['git', 'version-control'] },
  { key: 'Aws', label: 'AWS', tags: ['aws', 'amazon'] },
  { key: 'Azure', label: 'Azure', tags: ['azure'] },
  { key: 'Other', label: 'Other', tags: [] },
];

export default function NotesClient({ notes }: { notes: Note[] }) {
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'title' | 'reading'>('newest');
  const [selectedCats, setSelectedCats] = useState<Set<CategoryKey>>(new Set());
  const [openMap, setOpenMap] = useState<Record<CategoryKey, boolean>>({
    Kubernetes: true,
    'CI-CD': false,
    Git: false,
    Aws: false,
    Azure: false,
    Other: false,
  });

  const toLowerArray = (arr?: string[]) => (arr || []).map((t) => t.toLowerCase());

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = notes.filter((n) => {
      if (!q) return true;
      const haystack = [n.title, n.summary, ...(n.tags || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });

    if (selectedCats.size > 0) {
      const tagSets = CATEGORIES.filter((c) => selectedCats.has(c.key)).map((c) => new Set(c.tags));
      arr = arr.filter((n) => {
        const t = toLowerArray(n.tags);
        return tagSets.some((set) => t.some((x) => set.has(x)));
      });
    }

    if (sort === 'newest') arr = arr.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === 'oldest') arr = arr.slice().sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sort === 'title') arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'reading') {
      const toMin = (s?: string) => (s ? parseInt(s) || 0 : 0);
      arr = arr.slice().sort((a, b) => toMin(a.readingTime) - toMin(b.readingTime));
    }
    return arr;
  }, [notes, query, sort]);

  const notesByCategory = useMemo(() => {
    return CATEGORIES.map((cat) => {
      if (cat.key === 'Other') {
        const used = new Set<string>();
        CATEGORIES.filter((c) => c.key !== 'Other').forEach((c) => {
          filteredAndSorted.forEach((n) => {
            if (toLowerArray(n.tags).some((t) => c.tags.includes(t))) used.add(n.slug);
          });
        });
        return { ...cat, notes: filteredAndSorted.filter((n) => !used.has(n.slug)) };
      }
      const matched = filteredAndSorted.filter((n) => toLowerArray(n.tags).some((t) => cat.tags.includes(t)));
      return { ...cat, notes: matched };
    });
  }, [filteredAndSorted]);

  // Restore expand/collapse state and selected categories from localStorage
  useEffect(() => {
    try {
      const savedOpen = localStorage.getItem('notesOpenMap');
      if (savedOpen) setOpenMap((prev) => ({ ...prev, ...JSON.parse(savedOpen) }));
      const savedCats = localStorage.getItem('notesSelectedCats');
      if (savedCats) setSelectedCats(new Set(JSON.parse(savedCats)) as Set<CategoryKey>);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('notesOpenMap', JSON.stringify(openMap));
      localStorage.setItem('notesSelectedCats', JSON.stringify(Array.from(selectedCats)));
    } catch {}
  }, [openMap, selectedCats]);

  const toggleAll = (open: boolean) => {
    const updated: Record<CategoryKey, boolean> = { Kubernetes: open, 'CI-CD': open, Git: open, Aws: open, Azure: open, Other: open };
    setOpenMap(updated);
  };

  const toggleCatFilter = (key: CategoryKey) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCats(new Set());
    setQuery('');
  };

  const highlight = (text: string, q: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <>
        {before}
        <mark className="bg-orange-500/20 text-orange-300 px-1 rounded">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <>
      <div className="mb-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-black p-6">
        <h1 className="text-3xl font-bold mb-2">Technical Notes</h1>
        <p className="text-gray-400">Browse by topic. Expand a section to see related notes.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <label className="flex items-center gap-2 rounded-lg border border-gray-800 bg-black/40 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500/30">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"/></svg>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search notes..." className="w-full bg-transparent outline-none text-sm placeholder:text-gray-500"/>
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-black/40 px-3 py-2">
            <span className="text-xs text-gray-400">Sort</span>
            <select value={sort} onChange={(e)=>setSort(e.target.value as any)} className="ml-auto bg-transparent text-sm outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A–Z</option>
              <option value="reading">Reading time</option>
            </select>
          </div>
          <div className="hidden md:flex justify-end items-center text-xs text-gray-500">{filteredAndSorted.length} results</div>
        </div>

        {/* Category filter chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.filter(c=>c.key!=='Other').map((cat)=>{
            const active = selectedCats.has(cat.key);
            return (
              <button
                key={cat.key}
                onClick={()=>toggleCatFilter(cat.key)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${active ? 'border-orange-500/60 bg-orange-500/10 text-orange-300' : 'border-gray-700 bg-gray-900/40 text-gray-300 hover:border-gray-600'}`}
                aria-pressed={active}
              >
                {cat.label}
              </button>
            );
          })}
          {(selectedCats.size>0 || query) && (
            <button onClick={clearFilters} className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-300 hover:border-gray-600">Clear</button>
          )}
        </div>

        {/* Expand/Collapse controls */}
        <div className="mt-3 flex gap-2 text-xs">
          <button onClick={()=>toggleAll(true)} className="px-3 py-1 rounded-md border border-gray-700 hover:border-gray-600 text-gray-300">Expand all</button>
          <button onClick={()=>toggleAll(false)} className="px-3 py-1 rounded-md border border-gray-700 hover:border-gray-600 text-gray-300">Collapse all</button>
        </div>
      </div>

      <div className="space-y-4">
        {notesByCategory.map((cat) => (
          <details key={cat.key} open={openMap[cat.key]} onToggle={(e)=>{
            const el = e.currentTarget as HTMLDetailsElement;
            setOpenMap((prev)=>({ ...prev, [cat.key]: el.open }));
          }} className="group border border-gray-800 rounded-xl overflow-hidden bg-black/30">
            <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between bg-gradient-to-r from-gray-900/60 to-black hover:from-gray-900/80 transition-colors">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-800 text-gray-300 text-xs border border-gray-700">{cat.label.substring(0,2)}</span>
                <span className="font-semibold">{cat.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{cat.notes.length}</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6"/></svg>
              </div>
            </summary>
            {cat.notes.length > 0 ? (
              <ul className="divide-y divide-gray-900">
                {cat.notes.map((note) => (
                  <li key={note.slug} className="transition-colors">
                    <Link href={`/notes/${note.slug}`} className="block p-5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black hover:bg-gray-900/30">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h2 className="text-lg font-semibold mb-1">{highlight(note.title, query)}</h2>
                          {note.summary && <p className="text-gray-400 text-sm">{typeof highlight(note.summary, query) === 'string' ? (highlight(note.summary, query) as string) : highlight(note.summary, query)}</p>}
                          {note.tags && note.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {note.tags.map((tag) => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-500 whitespace-nowrap mt-1">
                          <div>{new Date(note.date).toLocaleDateString()}</div>
                          <div className="mt-1 text-gray-400">{note.readingTime}</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-4 text-gray-500 text-sm">No notes yet.</div>
            )}
          </details>
        ))}
      </div>
    </>
  );
}


