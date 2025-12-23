import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const URL = 'https://univ-inses.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}
