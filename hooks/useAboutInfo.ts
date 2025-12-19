import { useState, useEffect } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { createClient } from '@/lib/supabase/client';

interface AboutInfo {
  mission: string;
  vision: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  pedagogy: {
    theoretical: string;
    practical: string;
    evaluation: string;
  };
  partners: string[];
}

export function useAboutInfo(): AboutInfo | null {
  const { locale } = useI18n();
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutInfo = async () => {
      try {
        const supabase = createClient();

        // Charger les informations principales
        const { data: aboutData, error: aboutError } = await supabase
          .from('about_info')
          .select('*')
          .limit(1)
          .single();

        if (aboutError) throw aboutError;

        // Charger les valeurs
        const { data: valuesData, error: valuesError } = await supabase
          .from('about_values')
          .select('*')
          .order('display_order', { ascending: true });

        if (valuesError) throw valuesError;

        // Charger les partenaires
        const { data: partnersData, error: partnersError } = await supabase
          .from('partners')
          .select('*')
          .order('display_order', { ascending: true });

        if (partnersError) throw partnersError;

        if (aboutData) {
          setAboutInfo({
            mission: locale === 'fr' ? aboutData.mission_fr : aboutData.mission_en,
            vision: locale === 'fr' ? aboutData.vision_fr : aboutData.vision_en,
            values: (valuesData || []).map((v: any) => ({
              title: locale === 'fr' ? v.title_fr : v.title_en,
              description: locale === 'fr' ? v.description_fr : v.description_en,
            })),
            pedagogy: {
              theoretical: locale === 'fr' ? aboutData.pedagogy_theoretical_fr : aboutData.pedagogy_theoretical_en,
              practical: locale === 'fr' ? aboutData.pedagogy_practical_fr : aboutData.pedagogy_practical_en,
              evaluation: locale === 'fr' ? aboutData.pedagogy_evaluation_fr : aboutData.pedagogy_evaluation_en,
            },
            partners: (partnersData || []).map((p: any) =>
              locale === 'fr' ? p.name_fr : p.name_en
            ),
          });
        }
      } catch (error) {
        console.error('Error loading about info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutInfo();
  }, [locale]);

  return aboutInfo;
}
