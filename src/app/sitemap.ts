import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/site';
import { getAllNoteSlugs } from '@/utils/notes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, '');
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/notes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/game`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const noteRoutes: MetadataRoute.Sitemap = getAllNoteSlugs().map((slug) => ({
    url: `${base}/notes/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes];
}


