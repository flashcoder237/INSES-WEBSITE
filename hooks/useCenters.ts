import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/providers/I18nProvider'

export interface Center {
  id: string
  slug: string
  name: string
  fullName: string
  description: string
  logo: string
  primaryColor: string
  secondaryColor: string
  location: string
  email: string
  phone: string
  whatsapp: string
  displayOrder: number
}

export function useCenters(): Center[] {
  const { locale } = useI18n()
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const supabase = createClient()

        const { data, error } = await supabase
          .from('centers')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) throw error

        if (data) {
          const mapped: Center[] = data.map((c: any) => ({
            id: c.id,
            slug: c.slug,
            name: locale === 'fr' ? c.name_fr : c.name_en,
            fullName: locale === 'fr' ? c.full_name_fr : c.full_name_en,
            description: locale === 'fr' ? c.description_fr : c.description_en,
            logo: c.logo,
            primaryColor: c.primary_color,
            secondaryColor: c.secondary_color,
            location: c.location,
            email: c.email,
            phone: c.phone,
            whatsapp: c.whatsapp,
            displayOrder: c.display_order,
          }))

          setCenters(mapped)
        }
      } catch (error) {
        console.error('Error loading centers:', error)
        setCenters([])
      } finally {
        setLoading(false)
      }
    }

    loadCenters()
  }, [locale])

  return centers
}

export function useCenter(slug: string): Center | undefined {
  const centers = useCenters()
  return centers.find(c => c.slug === slug)
}
