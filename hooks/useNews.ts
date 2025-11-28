import { useMemo } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { newsBase, newsTranslationsFr, newsTranslationsEn, News } from '@/data/news-data';

export function useNews(): News[] {
  const { locale } = useI18n();

  return useMemo(() => {
    const translations = locale === 'fr' ? newsTranslationsFr : newsTranslationsEn;

    return newsBase.map((news, index) => ({
      ...news,
      ...translations[index]
    }));
  }, [locale]);
}

export function useNewsItem(slug: string): News | undefined {
  const news = useNews();
  return news.find(n => n.slug === slug);
}
