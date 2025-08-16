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
      return { ...cat, notes: notes.filter((n) => !used.has(n.slug)) };
    }
    const matched = notes.filter((n) => lower(n.tags).some((t) => cat.tags.includes(t)));
    return { ...cat, notes: matched };
  });

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="section-wrap">
        <h1 className="section-title">Technical Notes</h1>
        <div className="section-divider" />
        <p className="section-subtitle mt-4 mb-10">Browse by topic. Expand a section to see related notes.</p>

        <div className="space-y-4">
          {notesByCategory.map((cat) => (
            <details key={cat.key} className="group border border-gray-800 rounded-lg overflow-hidden">
              <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between bg-gray-900/40 hover:bg-gray-900/60 transition-colors">
                <span className="font-semibold">{cat.label}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{cat.notes.length}</span>
              </summary>
              {cat.notes.length > 0 ? (
                <ul className="divide-y divide-gray-900">
                  {cat.notes.map((note) => (
                    <li key={note.slug} className="hover:bg-gray-900/30 transition-colors">
                      <Link href={`/notes/${note.slug}`} className="block p-5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <h2 className="text-lg font-semibold mb-1">{note.title}</h2>
                            {note.summary && <p className="text-gray-400 text-sm">{note.summary}</p>}
                            {note.tags && note.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {note.tags.map((tag) => (
                                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <time className="text-xs text-gray-500 whitespace-nowrap mt-1">{new Date(note.date).toLocaleDateString()}</time>
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

        {notes.length === 0 && (
          <div className="text-gray-400 mt-8">No notes yet.</div>
        )}
      </div>
    </main>
  );
}


