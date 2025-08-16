import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/game'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}


