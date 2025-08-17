import Link from 'next/link';
import { getAllModules } from '@/utils/notes';

export const metadata = {
  title: 'Terraform Modules | Notes',
  description: 'Production-ready Terraform modules with copyable usage snippets.',
};

export default function ModulesIndexPage() {
  const modules = getAllModules();
  const clouds: Array<'all' | 'aws' | 'azure' | 'gcp' | 'multi'> = ['all', 'aws', 'azure', 'gcp', 'multi'];
  // Basic filter from URL (?cloud=aws)
  const sp = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
  const cloud = (sp.get('cloud') as 'aws' | 'azure' | 'gcp' | 'multi' | null) || 'all';
  const q = (sp.get('q') || '').toLowerCase().trim();
  const filtered = modules
    .filter((m) => cloud === 'all' || m.cloud === cloud)
    .filter((m) => !q || m.name.toLowerCase().includes(q) || (m.summary || '').toLowerCase().includes(q) || (m.tags || []).some((t) => t.toLowerCase().includes(q)));

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="section-wrap">
        <h1 className="section-title">Terraform Modules</h1>
        <div className="section-divider" />
        <p className="section-subtitle mt-4">Copy usage blocks, explore inputs/outputs, and ship faster.</p>

        {/* Tabs: Notes / Modules */}
        <div className="mt-5 mb-2 flex items-center justify-center gap-2">
          <a href="/notes" className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border border-gray-700/50">Notes</a>
          <a href="/notes/modules" className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-red-600/20">Modules</a>
        </div>

        {/* Filters */}
        <form method="get" className="mt-6 mb-6 flex items-center gap-3">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search modules..."
            className="w-full max-w-md bg-gray-900/70 border border-gray-700/60 rounded-full px-4 py-2 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
          <select name="cloud" defaultValue={cloud} className="bg-gray-900/70 border border-gray-700/60 rounded-full px-3 py-2 text-sm text-slate-200">
            {clouds.map((c) => (
              <option value={c} key={c}>{c.toUpperCase()}</option>
            ))}
          </select>
          {(q || cloud !== 'all') && (
            <a href="/notes/modules" className="text-xs text-gray-400 hover:text-gray-200">Reset</a>
          )}
        </form>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <Link key={m.slug} href={`/notes/modules/${m.slug}`} className="group mobile-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 hover:border-red-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold group-hover:text-orange-400 transition-colors">{m.name}</h2>
                  <div className="text-xs text-gray-500 mt-1">{m.cloud?.toUpperCase()} {m.maturity === 'preview' ? '• Preview' : ''}</div>
                </div>
                {m.version && <span className="text-[11px] px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">v{m.version}</span>}
              </div>
              {m.summary && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{m.summary}</p>}
              {m.tags && m.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.tags.slice(0,3).map((t) => <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{t}</span>)}
                  {m.tags.length > 3 && <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">+{m.tags.length - 3}</span>}
                </div>
              )}
              <div className="mt-4 text-sm text-orange-400">View details →</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


