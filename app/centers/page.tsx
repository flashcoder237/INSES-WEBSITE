'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/providers/I18nProvider'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'

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
  display_order: number
}

export default function CentersPage() {
  const { locale, t } = useI18n()
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCenters()
  }, [])

  const loadCenters = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('centers')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setCenters(data || [])
    } catch (error) {
      console.error('Error loading centers:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCenterName = (center: Center) => locale === 'fr' ? center.name_fr : center.name_en
  const getCenterFullName = (center: Center) => locale === 'fr' ? center.full_name_fr : center.full_name_en
  const getCenterDescription = (center: Center) => locale === 'fr' ? center.description_fr : center.description_en

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === 'fr' ? 'Nos Centres de Formation' : 'Our Training Centers'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez nos deux centres d\'excellence : INSES pour les formations paramédicales et CEPRES pour les formations professionnelles'
                : 'Discover our two centers of excellence: INSES for paramedical training and CEPRES for professional training'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {centers.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={`/${center.slug}`}>
                  <div
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
                    style={{
                      borderTop: `4px solid ${center.primary_color}`,
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{ backgroundColor: center.primary_color }}></div>
                    </div>

                    <div className="relative p-8 lg:p-10">
                      {/* Logo */}
                      <div className="flex justify-center mb-6">
                        <div
                          className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: `${center.primary_color}15` }}
                        >
                          {center.logo ? (
                            <Image
                              src={center.logo}
                              alt={getCenterName(center)}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          ) : (
                            <div
                              className="text-4xl font-bold"
                              style={{ color: center.primary_color }}
                            >
                              {center.name_fr.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center mb-6">
                        <h2
                          className="text-3xl font-bold mb-2"
                          style={{ color: center.primary_color }}
                        >
                          {getCenterName(center)}
                        </h2>
                        <h3 className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-4">
                          {getCenterFullName(center)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {getCenterDescription(center)}
                        </p>
                      </div>

                      {/* Info Cards */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4" style={{ color: center.primary_color }} />
                          <span>{center.location}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-4 w-4" style={{ color: center.primary_color }} />
                          <span>{center.phone}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" style={{ color: center.primary_color }} />
                          <span>{center.email}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-center">
                        <div
                          className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: center.primary_color }}
                        >
                          {locale === 'fr' ? 'Découvrir les formations' : 'Discover programs'}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute top-6 right-6">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${center.primary_color}20` }}
                        >
                          {center.slug === 'inses' ? (
                            <GraduationCap className="h-6 w-6" style={{ color: center.primary_color }} />
                          ) : (
                            <Briefcase className="h-6 w-6" style={{ color: center.primary_color }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            {locale === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose us?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr' ? 'Excellence Académique' : 'Academic Excellence'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr'
                  ? 'Des formations de qualité reconnues par les professionnels du secteur'
                  : 'Quality training recognized by industry professionals'}
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr' ? 'Formation Pratique' : 'Practical Training'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr'
                  ? 'Une approche axée sur la pratique et l\'expérience terrain'
                  : 'An approach focused on practice and field experience'}
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr' ? 'Débouchés Garantis' : 'Guaranteed Opportunities'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr'
                  ? 'Un réseau de partenaires pour faciliter votre insertion professionnelle'
                  : 'A network of partners to facilitate your professional integration'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
