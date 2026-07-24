import type { MetadataRoute } from 'next';

const BASE = 'https://cheri-hewlett-showcase-cherihewlett-cryptos-projects.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
