import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface SiteImage {
  id: string;
  key: string;
  url: string;
  alt_fr: string;
  alt_en: string;
  description?: string;
  updated_at: string;
}

interface ImagesMap {
  [key: string]: SiteImage;
}

const DEFAULT_IMAGES: ImagesMap = {
  'hero-home': {
    id: 'default-hero-home',
    key: 'hero-home',
    url: '/images/hero/hero-home.jpg',
    alt_fr: 'Étudiants INSES - Institut Supérieur de l\'Espoir',
    alt_en: 'INSES Students - Higher Institute of Hope',
    updated_at: new Date().toISOString(),
  },
  'hero-formations': {
    id: 'default-hero-formations',
    key: 'hero-formations',
    url: '/images/hero/hero-formations.jpg',
    alt_fr: 'Formations professionnelles INSES',
    alt_en: 'INSES Professional Training Programs',
    updated_at: new Date().toISOString(),
  },
  'hero-about': {
    id: 'default-hero-about',
    key: 'hero-about',
    url: '/images/hero/hero-about.jpg',
    alt_fr: 'À propos de l\'INSES',
    alt_en: 'About INSES',
    updated_at: new Date().toISOString(),
  },
  'hero-contact': {
    id: 'default-hero-contact',
    key: 'hero-contact',
    url: '/images/hero/hero-contact.jpg',
    alt_fr: 'Contactez-nous',
    alt_en: 'Contact Us',
    updated_at: new Date().toISOString(),
  },
  'hero-campus': {
    id: 'default-hero-campus',
    key: 'hero-campus',
    url: '/images/about/hero-campus.jpg',
    alt_fr: 'Campus INSES - Bâtiment principal',
    alt_en: 'INSES Campus - Main Building',
    updated_at: new Date().toISOString(),
  },
  'students-class': {
    id: 'default-students-class',
    key: 'students-class',
    url: '/images/about/students-class.jpg',
    alt_fr: 'Étudiants INSES en classe',
    alt_en: 'INSES Students in Class',
    updated_at: new Date().toISOString(),
  },
  'logo': {
    id: 'default-logo',
    key: 'logo',
    url: '/images/logo/logo-inses.png',
    alt_fr: 'Logo de l\'INSES',
    alt_en: 'INSES Logo',
    updated_at: new Date().toISOString(),
  },
  'og-image': {
    id: 'default-og',
    key: 'og-image',
    url: '/images/logo/logo-inses.png',
    alt_fr: 'Logo de l\'INSES - Institut Supérieur de l\'Espoir',
    alt_en: 'INSES Logo - Higher Institute of Hope',
    updated_at: new Date().toISOString(),
  },
};

export function useImages(): ImagesMap {
  const [images, setImages] = useState<ImagesMap>(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from('site_images')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          const imagesMap: ImagesMap = {};
          data.forEach((img: SiteImage) => {
            imagesMap[img.key] = img;
          });

          // Merge with defaults for any missing keys
          setImages({ ...DEFAULT_IMAGES, ...imagesMap });
        }
      } catch (error) {
        console.error('Error loading images:', error);
        // Keep default images on error
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return images;
}

export function useImage(key: string, locale: 'fr' | 'en' = 'fr'): { url: string; alt: string } {
  const images = useImages();
  const image = images[key] || DEFAULT_IMAGES[key] || DEFAULT_IMAGES['logo'];

  return {
    url: image.url,
    alt: locale === 'fr' ? image.alt_fr : image.alt_en,
  };
}
