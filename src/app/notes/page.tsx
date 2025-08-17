import Link from 'next/link';
import { getAllNotes } from '@/utils/notes';

export const metadata = {
  title: 'Technical Notes | DevOps Deep Dives',
  description: 'Short technical notes and deep dives on DevOps topics.',
};

type Category = {
  key: 'Kubernetes' | 'CI-CD' | 'Git' | 'Aws' | 'Azure' | 'Other';
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

export default function NotesIndexPage() {
  const notes = getAllNotes();

  const lower = (arr?: string[]) => (arr || []).map((t) => t.toLowerCase());

  const notesByCategory = CATEGORIES.map((cat) => {
    if (cat.key === 'Other') {
      const used = new Set<string>();
      CATEGORIES.filter((c) => c.key !== 'Other').forEach((c) => {
        notes.forEach((n) => {
          if (lower(n.tags).some((t) => c.tags.includes(t))) used.add(n.slug);
        });
      });
      return { ...cat, notes: notes.filter((n) => !used.has(n.slug)) } as Category & {
        notes: ReturnType<typeof getAllNotes>;
      };
    }
    const matched = notes.filter((n) => lower(n.tags).some((t) => cat.tags.includes(t)));
    return { ...cat, notes: matched } as Category & { notes: ReturnType<typeof getAllNotes> };
  });

  // Search param via URL not required here; simple clientless search using a form submit would rerender on server.
  // For simplicity, accept a query param ?q= and filter server-side.
  const searchParams = new URLSearchParams(
    typeof window === 'undefined' ? '' : window.location.search
  );
  const q = (searchParams.get('q') || '').toLowerCase().trim();
  const filteredNotesByCategory = notesByCategory.map((c) => ({
    ...c,
    notes: c.notes.filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        (n.summary || '').toLowerCase().includes(q) ||
        lower(n.tags).some((t) => t.includes(q))
    ),
  }));

  // Sort: non-empty categories first; empty at bottom dimmed
  const sortedCategories = [...filteredNotesByCategory].sort(
    (a, b) => b.notes.length - a.notes.length
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="section-wrap">
        <h1 className="section-title">Technical Notes</h1>
        <div className="section-divider" />
        <p className="section-subtitle mt-4">
          Browse by topic. Expand a section to see related notes.
        </p>

        {/* Tabs: Notes / Modules */}
        <div className="mt-5 mb-2 flex items-center justify-center gap-2">
          <Link
            href="/notes"
            className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-red-600/20"
          >
            Notes
          </Link>
          <Link
            href="/notes/modules"
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border border-gray-700/50"
          >
            Modules
          </Link>
        </div>

        {/* Search bar */}
        <form method="get" className="mt-6 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search notes..."
              className="w-full max-w-md bg-gray-900/70 border border-gray-700/60 rounded-full px-4 py-2 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            {q && (
              <Link href="/notes" className="text-xs text-gray-400 hover:text-gray-200">
                Clear
              </Link>
            )}
          </div>
        </form>
        <div className="space-y-4">
          {sortedCategories.map((cat) => (
            <details
              key={cat.key}
              className={`group border border-gray-800 rounded-lg overflow-hidden ${cat.notes.length === 0 ? 'opacity-60' : ''}`}
              open={cat.notes.length > 0 ? false : false}
            >
              <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between bg-gray-900/40 hover:bg-gray-900/60 transition-colors">
                <span className="font-semibold">{cat.label}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 ml-auto">
                  {cat.notes.length}
                </span>
              </summary>
              {cat.notes.length > 0 ? (
                <ul className="divide-y divide-gray-900">
                  {cat.notes.map((note) => {
                    const maxTags = 3;
                    const shown = (note.tags || []).slice(0, maxTags);
                    const hiddenCount = Math.max(0, (note.tags || []).length - maxTags);
                    return (
                      <li key={note.slug} className="hover:bg-gray-900/30 transition-colors">
                        <Link
                          href={`/notes/${note.slug}`}
                          className="block p-5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black"
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold mb-1">{note.title}</h2>
                              <time className="block text-[11px] text-gray-500 mb-2">
                                {new Date(note.date).toLocaleDateString()}
                              </time>
                              {note.summary && (
                                <p className="text-gray-400 text-sm">{note.summary}</p>
                              )}
                              {(shown.length > 0 || hiddenCount > 0) && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {shown.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {hiddenCount > 0 && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                                      +{hiddenCount}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-5 py-4 text-gray-500 text-sm">No notes yet.</div>
              )}
            </details>
          ))}
        </div>

        {notes.length === 0 && <div className="text-gray-400 mt-8">No notes yet.</div>}
      </div>
    </main>
  );
}
