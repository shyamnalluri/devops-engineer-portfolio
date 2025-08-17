import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllModuleSlugs, getModuleBySlug } from '@/utils/notes';

export function generateStaticParams() {
  const slugs = getAllModuleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return {};
  return {
    title: `${mod.name} | Terraform Module`,
    description: mod.summary || 'Terraform module',
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return notFound();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="section-wrap">
        <Link href="/notes/modules" className="text-sm text-orange-400 hover:text-orange-300">← Back to modules</Link>
        <h1 className="section-title mt-2">{mod.name}</h1>
        <div className="section-divider" />
        {mod.summary && <p className="section-subtitle mt-3 max-w-[75ch]">{mod.summary}</p>}

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-12 mt-8">
          <article className="max-w-[75ch] prose prose-invert">
            {/* Overview content (MD/MDX) */}
            <div className="leading-8 whitespace-pre-wrap">{mod.content}</div>

            <div className="h-px bg-gray-800 my-10" />
            <h2>Usage</h2>
            <p className="text-sm text-gray-400 -mt-2">Copy the minimal usage block below.</p>
            <pre className="relative group overflow-auto border border-gray-700/60 rounded-md bg-black/40">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(`module \"${mod.slug}\" {\n  source = \"./modules/${mod.slug}\"\n}`)}
                className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md border border-gray-700 bg-black/50 text-gray-300"
                aria-label="Copy code"
              >
                Copy
              </button>
              <code style={{ fontSize: '14px', lineHeight: 1.5 }}>{`module "${mod.slug}" {
  source = "./modules/${mod.slug}"
}`}</code>
            </pre>
          </article>

          {/* Sidebar actions */}
          <aside className="sticky top-24 h-fit space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-800">
              <div className="font-semibold text-gray-300 mb-2">Install</div>
              <pre className="overflow-auto border border-gray-700/60 rounded-md bg-black/40 p-2 text-[12px]">terraform init</pre>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-800">
              <div className="font-semibold text-gray-300 mb-2">Details</div>
              <ul className="space-y-1 text-gray-400">
                {mod.version && <li>Version: v{mod.version}</li>}
                {mod.cloud && <li>Cloud: {mod.cloud.toUpperCase()}</li>}
                {mod.category && <li>Category: {mod.category}</li>}
                {mod.maturity && <li>Maturity: {mod.maturity}</li>}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}


