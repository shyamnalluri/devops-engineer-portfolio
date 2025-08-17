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

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

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
    readingTime: (data.readingTime as string | undefined) || calculateReadingTime(content),
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

export function getRelatedNotes(currentSlug: string, limit: number = 3): Note[] {
  const all = getAllNotes().filter((n) => n.slug !== currentSlug);
  const current = getNoteBySlug(currentSlug);
  if (!current) return all.slice(0, limit);
  const currentTags = new Set((current.tags || []).map((t) => t.toLowerCase()));
  const scored = all
    .map((n) => {
      const overlap = (n.tags || []).reduce(
        (acc, t) => acc + (currentTags.has(t.toLowerCase()) ? 1 : 0),
        0
      );
      return { note: n, score: overlap };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.note.date) - +new Date(a.note.date));
  return scored.slice(0, limit).map((s) => s.note);
}

// ----- Terraform Modules support -----
export type ModuleMeta = {
  slug: string;
  name: string;
  summary?: string;
  cloud?: 'aws' | 'azure' | 'gcp' | 'multi';
  category?: string; // networking, compute, security, observability
  maturity?: 'stable' | 'preview';
  version?: string;
  tags?: string[];
};

export type Module = ModuleMeta & {
  content: string; // markdown content for overview; code examples will live in mdx blocks
};

const MODULES_DIR = path.join(process.cwd(), 'src', 'content', 'modules');

export function getAllModuleSlugs(): string[] {
  if (!fs.existsSync(MODULES_DIR)) return [];
  return fs
    .readdirSync(MODULES_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.(md|mdx)$/i, ''));
}

export function getModuleBySlug(slug: string): Module | null {
  const mdxPath = path.join(MODULES_DIR, `${slug}.mdx`);
  const mdPath = path.join(MODULES_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);
  const meta: ModuleMeta = {
    slug,
    name: (data.name as string) || slug,
    summary: (data.summary as string) || undefined,
    cloud: (data.cloud as ModuleMeta['cloud']) || 'multi',
    category: (data.category as string) || undefined,
    maturity: (data.maturity as ModuleMeta['maturity']) || 'stable',
    version: (data.version as string) || undefined,
    tags: (data.tags as string[]) || [],
  };
  return { ...meta, content };
}

export function getAllModules(): Module[] {
  const slugs = getAllModuleSlugs();
  const modules = slugs
    .map((slug) => getModuleBySlug(slug))
    .filter((m): m is Module => Boolean(m))
    .sort((a, b) => a.name.localeCompare(b.name));
  return modules;
}
