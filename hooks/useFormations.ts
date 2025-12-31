import { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { createClient } from '@/lib/supabase/client';
import type { Formation } from '@/data/site-data';

interface FormationDB {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string;
  short_description_fr: string;
  short_description_en: string;
  full_description_fr: string;
  full_description_en: string;
  duration: string;
  level: string;
  icon: string;
  image_url?: string;
  is_active: boolean;
  display_order: number;
  skills?: Array<{ skill_fr: string; skill_en: string; display_order: number }>;
  careers?: Array<{ career_fr: string; career_en: string; display_order: number }>;
}

export function useFormations(): Formation[] {
  const { locale } = useI18n();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFormations = async () => {
      try {
        const supabase = createClient();

        // Charger les formations avec leurs compétences et carrières
        const { data: formationsData, error: formationsError } = await supabase
          .from('formations')
          .select(`
            *,
            skills:formation_skills(skill_fr, skill_en, display_order),
            careers:formation_careers(career_fr, career_en, display_order)
          `)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (formationsError) throw formationsError;

        if (formationsData) {
          const mapped: Formation[] = formationsData.map((f: any) => ({
            id: f.id,
            slug: f.slug,
            title: locale === 'fr' ? f.title_fr : f.title_en,
            shortDescription: locale === 'fr' ? f.short_description_fr : f.short_description_en,
            fullDescription: locale === 'fr' ? f.full_description_fr : f.full_description_en,
            duration: f.duration,
            level: f.level,
            icon: f.icon,
            image: f.image_url,
            skills: (f.skills || [])
              .sort((a: any, b: any) => a.display_order - b.display_order)
              .map((s: any) => locale === 'fr' ? s.skill_fr : s.skill_en),
            career: (f.careers || [])
              .sort((a: any, b: any) => a.display_order - b.display_order)
              .map((c: any) => locale === 'fr' ? c.career_fr : c.career_en),
          }));

          setFormations(mapped);
        }
      } catch (error) {
        console.error('Error loading formations:', error);
        // Fallback vers les données statiques en cas d'erreur
        setFormations([]);
      } finally {
        setLoading(false);
      }
    };

    loadFormations();
  }, [locale]);

  return formations;
}

export function useFormation(slug: string): Formation | undefined {
  const formations = useFormations();
  return formations.find(f => f.slug === slug);
}
