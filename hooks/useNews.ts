import { useState, useEffect } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { createClient } from '@/lib/supabase/client';
import type { News } from '@/data/news-data';

export function useNews(): News[] {
  const { locale } = useI18n();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const supabase = createClient();

        const { data: newsData, error } = await supabase
          .from('news')
          .select('*')
          .eq('is_published', true)
          .order('published_date', { ascending: false });

        if (error) throw error;

        if (newsData) {
          const mapped: News[] = newsData.map((n: any) => ({
            id: parseInt(n.id.substring(0, 8), 16), // Convertir UUID en nombre pour compatibilité
            slug: n.slug,
            category: n.category,
            image: n.image,
            date: n.published_date,
            title: locale === 'fr' ? n.title_fr : n.title_en,
            excerpt: locale === 'fr' ? n.excerpt_fr : n.excerpt_en,
            content: locale === 'fr' ? n.content_fr : n.content_en,
          }));

          setNews(mapped);
        }
      } catch (error) {
        console.error('Error loading news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [locale]);

  return news;
}

export function useNewsItem(slug: string): News | undefined {
  const news = useNews();
  return news.find(n => n.slug === slug);
}
