import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  readingTime?: string;
};

export type Note = NoteMeta & {
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), 'src', 'content', 'notes');

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.(md|mdx)$/i, ''));
}

export function getNoteBySlug(slug: string): Note | null {
  const mdxPath = path.join(NOTES_DIR, `${slug}.mdx`);
  const mdPath = path.join(NOTES_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);

  const meta: NoteMeta = {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || new Date().toISOString(),
    summary: data.summary as string | undefined,
    tags: (data.tags as string[]) || [],
    readingTime: data.readingTime as string | undefined,
  };

  return { ...meta, content };
}

export function getAllNotes(): Note[] {
  const slugs = getAllNoteSlugs();
  const notes = slugs
    .map((slug) => getNoteBySlug(slug))
    .filter((n): n is Note => Boolean(n))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return notes;
}


