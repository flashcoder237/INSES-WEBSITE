import { useMemo } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { formations as baseFormations } from '@/data/site-data';
import { formationsDataFr, formationsDataEn } from '@/data/formations-i18n';
import type { Formation } from '@/data/site-data';

export function useFormations(): Formation[] {
  const { locale } = useI18n();

  return useMemo(() => {
    const translatedData = locale === 'fr' ? formationsDataFr : formationsDataEn;

    return baseFormations.map((formation, index) => ({
      ...formation,
      ...translatedData[index]
    }));
  }, [locale]);
}

export function useFormation(slug: string): Formation | undefined {
  const formations = useFormations();
  return formations.find(f => f.slug === slug);
}
