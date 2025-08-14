import { notFound } from 'next/navigation';
import { getAllNoteSlugs, getNoteBySlug } from '@/utils/notes';
import Markdown from '../Markdown';
import TOC from './TOC';
import Related from './Related';
import { getRelatedNotes } from '@/utils/notes';
import Share from './Share';
import ReadingProgress from './ReadingProgress';
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
  const related = getRelatedNotes(slug, 3);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <ReadingProgress />
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-12">
        <div>
          <Link href="/notes" className="text-sm text-orange-400 hover:text-orange-300">← Back to notes</Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">{note.title}</h1>
          <div className="text-xs text-gray-500 mb-8">{new Date(note.date).toLocaleDateString()} • {note.readingTime}</div>
          <Markdown content={note.content} />
          <Share title={note.title} />
          <Related notes={related} />
        </div>
        <TOC />
      </div>
    </main>
  );
}


