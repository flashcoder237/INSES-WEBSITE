import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  display_order: number;
  created_at: string;
}

export function useGallery(category?: string): GalleryImage[] {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const supabase = createClient();

        let query = supabase
          .from('gallery')
          .select('*')
          .order('display_order', { ascending: true });

        // Filtrer par catégorie si spécifiée
        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error loading gallery:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [category]);

  return images;
}
