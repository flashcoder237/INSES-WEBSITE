import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/providers/I18nProvider'

interface SiteContentItem {
  key: string
  content_fr: string
  content_en: string
  category: string
  section: string | null
}

interface SiteContentMap {
  [key: string]: string
}

let contentCache: SiteContentItem[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useSiteContent(): {
  t: (key: string, fallback?: string) => string
  content: SiteContentMap
  loading: boolean
} {
  const { locale } = useI18n()
  const [content, setContent] = useState<SiteContentMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [locale])

  const loadContent = async () => {
    try {
      const now = Date.now()

      // Utiliser le cache s'il est encore valide
      if (contentCache && (now - cacheTimestamp) < CACHE_DURATION) {
        mapContent(contentCache)
        setLoading(false)
        return
      }

      const supabase = createClient()

      const { data, error } = await supabase
        .from('site_content')
        .select('key, content_fr, content_en, category, section')
        .eq('is_active', true)

      if (error) throw error

      if (data) {
        contentCache = data
        cacheTimestamp = now
        mapContent(data)
      }
    } catch (error) {
      console.error('Error loading site content:', error)
    } finally {
      setLoading(false)
    }
  }

  const mapContent = (data: SiteContentItem[]) => {
    const mapped: SiteContentMap = {}
    data.forEach((item) => {
      mapped[item.key] = locale === 'fr' ? item.content_fr : item.content_en
    })
    setContent(mapped)
  }

  const t = (key: string, fallback?: string): string => {
    return content[key] || fallback || key
  }

  return { t, content, loading }
}

// Hook pour obtenir un contenu spécifique par catégorie
export function useSiteContentByCategory(category: string) {
  const { locale } = useI18n()
  const [content, setContent] = useState<SiteContentMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [category, locale])

  const loadContent = async () => {
    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('site_content')
        .select('key, content_fr, content_en')
        .eq('category', category)
        .eq('is_active', true)

      if (error) throw error

      if (data) {
        const mapped: SiteContentMap = {}
        data.forEach((item: any) => {
          mapped[item.key] = locale === 'fr' ? item.content_fr : item.content_en
        })
        setContent(mapped)
      }
    } catch (error) {
      console.error(`Error loading content for category ${category}:`, error)
    } finally {
      setLoading(false)
    }
  }

  return { content, loading }
}

// Fonction utilitaire pour rafraîchir le cache
export function refreshSiteContentCache() {
  contentCache = null
  cacheTimestamp = 0
}
