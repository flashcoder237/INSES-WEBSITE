import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const URL = 'https://univ-inses.com';

// Create a Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/inscription',
    '/login',
    '/actualites',
    '/formations'
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes for formations
  const { data: formations, error: formationsError } = await supabase
    .from('formations')
    .select('slug, updated_at')
    .eq('is_active', true);

  if (formationsError) {
    console.error('Error fetching formations for sitemap:', formationsError);
    return [...staticRoutes];
  }

  const formationRoutes = formations.map(({ slug, updated_at }) => ({
    url: `${URL}/formations/${slug}`,
    lastModified: new Date(updated_at).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic routes for news articles
  const { data: newsArticles, error: newsError } = await supabase
    .from('news')
    .select('slug, updated_at')
    .eq('is_published', true);

  if (newsError) {
    console.error('Error fetching news for sitemap:', newsError);
    return [...staticRoutes, ...formationRoutes];
  }

  const newsRoutes = newsArticles.map(({ slug, updated_at }) => ({
    url: `${URL}/actualites/${slug}`,
    lastModified: new Date(updated_at).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...formationRoutes,
    ...newsRoutes,
  ];
}
