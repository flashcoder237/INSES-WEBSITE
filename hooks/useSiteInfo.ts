import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SiteInfo {
  name: string;
  fullName: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  fixedLine: string;
  otherPhones: string[];
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export function useSiteInfo(): SiteInfo | null {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSiteInfo = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from('site_info')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          setSiteInfo({
            name: data.name,
            fullName: data.full_name,
            description: data.description,
            location: data.location,
            email: data.email,
            phone: data.phone,
            whatsapp: data.whatsapp,
            fixedLine: data.fixed_line,
            otherPhones: data.other_phones || [],
            socialMedia: {
              facebook: data.social_facebook || '',
              twitter: data.social_twitter || '',
              instagram: data.social_instagram || '',
              linkedin: data.social_linkedin || '',
            },
          });
        }
      } catch (error) {
        console.error('Error loading site info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSiteInfo();
  }, []);

  return siteInfo;
}
