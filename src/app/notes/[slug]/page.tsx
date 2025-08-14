import { notFound } from 'next/navigation';
import { getAllNoteSlugs, getNoteBySlug } from '@/utils/notes';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export function generateStaticParams() {
  const slugs = getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} | Notes`,
    description: note.summary || 'DevOps deep dive',
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return notFound();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/notes" className="text-sm text-orange-400 hover:text-orange-300">← Back to notes</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">{note.title}</h1>
        <div className="text-xs text-gray-500 mb-8">{new Date(note.date).toLocaleDateString()}</div>
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}


