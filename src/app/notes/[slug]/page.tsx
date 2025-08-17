import { notFound } from 'next/navigation';
import { getAllNoteSlugs, getNoteBySlug } from '@/utils/notes';
import Markdown from '../Markdown';
import dynamic from 'next/dynamic';
import { getRelatedNotes } from '@/utils/notes';
import ReadingProgress from './ReadingProgress';
import Link from 'next/link';

const TOC = dynamic(() => import('./TOC'), { loading: () => null });
const Related = dynamic(() => import('./Related'), { loading: () => null });
const Share = dynamic(() => import('./Share'), { loading: () => null });

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
  const related = getRelatedNotes(slug, 3);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: note.title,
            datePublished: new Date(note.date).toISOString(),
            author: { '@type': 'Person', name: 'Shyam Nalluri' },
          }),
        }}
      />
      <ReadingProgress />
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-12">
        <div className="max-w-[75ch]">
          <Link href="/notes" className="text-sm text-orange-400 hover:text-orange-300">
            ← Back to notes
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">{note.title}</h1>
          <div className="text-xs text-gray-500 mb-8">
            {new Date(note.date).toLocaleDateString()} • {note.readingTime}
          </div>
          <Markdown content={note.content} />
          <div className="h-px bg-gray-800 my-10" />
          <Share title={note.title} />
          <div className="h-px bg-gray-800 my-10" />
          <Related notes={related} />
        </div>
        <TOC />
      </div>
    </main>
  );
}
