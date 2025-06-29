import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://levy729.github.io/family-recipe-book';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/search'], // Disallow API routes and search page from indexing
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
