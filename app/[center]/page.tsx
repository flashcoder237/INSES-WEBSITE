'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/providers/I18nProvider'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import FormationCard from '@/components/FormationCard'
import { ArrowRight, GraduationCap, Users, Briefcase, Award, MapPin, Phone, Mail } from 'lucide-react'

interface Center {
  id: string
  slug: string
  name_fr: string
  name_en: string
  full_name_fr: string
  full_name_en: string
  description_fr: string
  description_en: string
  logo: string
  primary_color: string
  secondary_color: string
  location: string
  email: string
  phone: string
}

export default function CenterPage() {
  const params = useParams()
  const centerSlug = params.center as string
  const { locale } = useI18n()
  const [center, setCenter] = useState<Center | null>(null)
  const [formations, setFormations] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCenterData()
  }, [centerSlug, locale])

  const loadCenterData = async () => {
    try {
      const supabase = createClient()

      // Charger le centre
      const { data: centerData, error: centerError } = await supabase
        .from('centers')
        .select('*')
        .eq('slug', centerSlug)
        .single()

      if (centerError) throw centerError
      setCenter(centerData)

      // Charger les formations de ce centre
      const { data: formationsData, error: formationsError } = await supabase
        .from('formations')
        .select(`
          *,
          skills:formation_skills(skill_fr, skill_en, display_order),
          careers:formation_careers(career_fr, career_en, display_order)
        `)
        .eq('center_slug', centerSlug)
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (formationsError) throw formationsError

      const mappedFormations = formationsData?.map((f: any) => ({
        id: f.id,
        slug: f.slug,
        title: locale === 'fr' ? f.title_fr : f.title_en,
        shortDescription: locale === 'fr' ? f.short_description_fr : f.short_description_en,
        fullDescription: locale === 'fr' ? f.full_description_fr : f.full_description_en,
        duration: f.duration,
        level: f.level,
        icon: f.icon,
        skills: (f.skills || [])
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((s: any) => locale === 'fr' ? s.skill_fr : s.skill_en),
        career: (f.careers || [])
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((c: any) => locale === 'fr' ? c.career_fr : c.career_en),
      })) || []

      setFormations(mappedFormations)

      // Charger les stats du centre
      const { data: statsData, error: statsError } = await supabase
        .from('center_stats')
        .select('*')
        .eq('center_id', centerData.id)
        .order('display_order', { ascending: true })

      if (!statsError && statsData) {
        const mappedStats = statsData.map((s: any) => ({
          value: s.value,
          label: locale === 'fr' ? s.label_fr : s.label_en,
        }))
        setStats(mappedStats)
      }
    } catch (error) {
      console.error('Error loading center data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!center) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'fr' ? 'Centre non trouvé' : 'Center not found'}
          </h1>
          <Link href="/centers" className="text-blue-600 hover:underline">
            {locale === 'fr' ? 'Retour aux centres' : 'Back to centers'}
          </Link>
        </div>
      </div>
    )
  }

  const centerName = locale === 'fr' ? center.name_fr : center.name_en
  const centerFullName = locale === 'fr' ? center.full_name_fr : center.full_name_en
  const centerDescription = locale === 'fr' ? center.description_fr : center.description_en

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${center.primary_color}15 0%, ${center.secondary_color}15 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {centerName}
              </h1>
              <h2 className="text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6">
                {centerFullName}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {centerDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${centerSlug}/formations`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform"
                  style={{ backgroundColor: center.primary_color }}
                >
                  {locale === 'fr' ? 'Nos Formations' : 'Our Programs'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={`/${centerSlug}/inscription`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 font-medium hover:scale-105 transition-transform"
                  style={{
                    borderColor: center.primary_color,
                    color: center.primary_color,
                  }}
                >
                  {locale === 'fr' ? 'S\'inscrire' : 'Enroll Now'}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div
                className="w-64 h-64 rounded-full flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: `${center.primary_color}20` }}
              >
                {center.logo ? (
                  <Image
                    src={center.logo}
                    alt={centerName}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                ) : (
                  <div
                    className="text-8xl font-bold"
                    style={{ color: center.primary_color }}
                  >
                    {centerName.charAt(0)}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-lg"
                  style={{ backgroundColor: `${center.primary_color}10` }}
                >
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: center.primary_color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formations Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'fr' ? 'Nos Formations' : 'Our Programs'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {locale === 'fr'
                ? `Découvrez les ${formations.length} formations proposées par ${centerName}`
                : `Discover the ${formations.length} programs offered by ${centerName}`}
            </p>
          </div>

          {formations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} centerSlug={centerSlug} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr' ? 'Aucune formation disponible pour le moment' : 'No programs available at the moment'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {locale === 'fr' ? 'Nous Contacter' : 'Contact Us'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${center.primary_color}20` }}
              >
                <MapPin className="h-6 w-6" style={{ color: center.primary_color }} />
              </div>
              <p className="text-gray-600 dark:text-gray-400">{center.location}</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${center.primary_color}20` }}
              >
                <Phone className="h-6 w-6" style={{ color: center.primary_color }} />
              </div>
              <p className="text-gray-600 dark:text-gray-400">{center.phone}</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${center.primary_color}20` }}
              >
                <Mail className="h-6 w-6" style={{ color: center.primary_color }} />
              </div>
              <p className="text-gray-600 dark:text-gray-400">{center.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
