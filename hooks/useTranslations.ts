import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Translation {
  id: string;
  key: string;
  category: string;
  section: string | null;
  content_fr: string;
  content_en: string;
  description: string | null;
  content_type: string;
  is_active: boolean;
}

interface TranslationsMap {
  [key: string]: any;
}

// Fallback translations (from JSON files) en cas d'erreur de chargement
import frFallback from '@/messages/fr.json';
import enFallback from '@/messages/en.json';

/**
 * Hook pour charger les traductions depuis la base de données
 * Les traductions sont stockées dans la table site_content avec des clés en notation pointée
 * Exemple: "common.learnMore", "home.heroTitle", etc.
 */
export function useTranslations() {
  const [translations, setTranslations] = useState<{
    fr: TranslationsMap;
    en: TranslationsMap;
  }>({
    fr: frFallback,
    en: enFallback,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const supabase = createClient();

      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('*')
        .eq('is_active', true)
        .order('key');

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        // Convertir les traductions plates en objets imbriqués
        const frTranslations = unflattenTranslations(data, 'fr');
        const enTranslations = unflattenTranslations(data, 'en');

        setTranslations({
          fr: frTranslations,
          en: enTranslations,
        });
      }
    } catch (err) {
      console.error('Error loading translations from database:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Garder les fallbacks en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  return { translations, loading, error, reload: loadTranslations };
}

/**
 * Convertir un tableau de traductions plates en objet imbriqué
 * Exemple: "common.learnMore" => { common: { learnMore: "..." } }
 */
function unflattenTranslations(
  data: Translation[],
  locale: 'fr' | 'en'
): TranslationsMap {
  const result: TranslationsMap = {};

  for (const item of data) {
    const content = locale === 'fr' ? item.content_fr : item.content_en;
    const keys = item.key.split('.');

    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = content;
  }

  return result;
}
