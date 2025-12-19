import { useState, useEffect } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { createClient } from '@/lib/supabase/client';

interface Stat {
  value: string;
  label: string;
}

export function useStats(): Stat[] {
  const { locale } = useI18n();
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from('stats')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data) {
          const mapped: Stat[] = data.map((s: any) => ({
            value: s.value,
            label: locale === 'fr' ? s.label_fr : s.label_en,
          }));

          setStats(mapped);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [locale]);

  return stats;
}
