import type { MetadataRoute } from 'next';

const BASE = 'https://cheri-hewlett-showcase-cherihewlett-cryptos-projects.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
