import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
  duration: string;
  display_order: number;
  created_at: string;
}

export function useVideos(): Video[] {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return videos;
}
