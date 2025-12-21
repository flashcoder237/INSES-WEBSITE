'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  BookOpen,
  Newspaper,
  Info,
  Settings,
  Users,
  MessageSquare,
  UserPlus,
  Images,
  BarChart3,
  Loader2,
} from 'lucide-react'

const adminSections = [
  {
    title: 'Formations',
    description: 'Gérer les formations, compétences et débouchés',
    icon: BookOpen,
    href: '/admin/formations',
    color: 'bg-[#B22234]',
  },
  {
    title: 'Actualités',
    description: 'Gérer les actualités et événements',
    icon: Newspaper,
    href: '/admin/news',
    color: 'bg-[#800020]',
  },
  {
    title: 'À propos',
    description: 'Gérer mission, vision, valeurs et pédagogie',
    icon: Info,
    href: '/admin/about',
    color: 'bg-[#4A4A4A]',
  },
  {
    title: 'Informations du site',
    description: 'Gérer coordonnées, réseaux sociaux',
    icon: Settings,
    href: '/admin/site-info',
    color: 'bg-[#CD5C5C]',
  },
  {
    title: 'Statistiques',
    description: 'Gérer les chiffres clés affichés',
    icon: BarChart3,
    href: '/admin/stats',
    color: 'bg-[#B22234]',
  },
  {
    title: 'Partenaires',
    description: 'Gérer les partenaires institutionnels',
    icon: Users,
    href: '/admin/partners',
    color: 'bg-[#800020]',
  },
  {
    title: 'Messages de contact',
    description: 'Consulter les messages reçus',
    icon: MessageSquare,
    href: '/admin/contacts',
    color: 'bg-[#4A4A4A]',
  },
  {
    title: 'Demandes d\'inscription',
    description: 'Gérer les demandes d\'inscription',
    icon: UserPlus,
    href: '/admin/inscriptions',
    color: 'bg-[#CD5C5C]',
  },
  {
    title: 'Galerie',
    description: 'Gérer les images de la galerie',
    icon: Images,
    href: '/admin/gallery',
    color: 'bg-[#B22234]',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    formations: 0,
    news: 0,
    contacts: 0,
    inscriptions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const supabase = createClient()

      // Charger le nombre de formations actives
      const { count: formationsCount } = await supabase
        .from('formations')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      // Charger le nombre d'actualités publiées
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true)

      // Charger le nombre de messages de contact non lus
      const { count: contactsCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)

      // Charger le nombre d'inscriptions en attente
      const { count: inscriptionsCount } = await supabase
        .from('inscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      setStats({
        formations: formationsCount || 0,
        news: newsCount || 0,
        contacts: contactsCount || 0,
        inscriptions: inscriptionsCount || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gérez tout le contenu de votre site INSES
        </p>
      </div>

      {/* Grille des sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-6">
                {/* Icon */}
                <div
                  className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-[#B22234] dark:text-[#CD5C5C]">
                  Gérer
                  <svg
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Statistiques rapides
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#B22234]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/formations" className="bg-[#B22234]/10 dark:bg-[#B22234]/20 rounded-lg p-4 hover:bg-[#B22234]/20 transition-colors">
              <p className="text-sm text-[#B22234] dark:text-[#CD5C5C] font-medium">
                Formations actives
              </p>
              <p className="text-2xl font-bold text-[#800020] dark:text-[#CD5C5C] mt-1">
                {stats.formations}
              </p>
            </Link>
            <Link href="/admin/news" className="bg-[#800020]/10 dark:bg-[#800020]/20 rounded-lg p-4 hover:bg-[#800020]/20 transition-colors">
              <p className="text-sm text-[#800020] dark:text-[#CD5C5C] font-medium">
                Actualités publiées
              </p>
              <p className="text-2xl font-bold text-[#800020] dark:text-[#CD5C5C] mt-1">
                {stats.news}
              </p>
            </Link>
            <Link href="/admin/contacts" className="bg-[#4A4A4A]/10 dark:bg-[#4A4A4A]/20 rounded-lg p-4 hover:bg-[#4A4A4A]/20 transition-colors">
              <p className="text-sm text-[#4A4A4A] dark:text-gray-400 font-medium">
                Messages non lus
              </p>
              <p className="text-2xl font-bold text-[#4A4A4A] dark:text-gray-300 mt-1">
                {stats.contacts}
              </p>
            </Link>
            <Link href="/admin/inscriptions" className="bg-[#CD5C5C]/10 dark:bg-[#CD5C5C]/20 rounded-lg p-4 hover:bg-[#CD5C5C]/20 transition-colors">
              <p className="text-sm text-[#CD5C5C] dark:text-[#CD5C5C] font-medium">
                Inscriptions en attente
              </p>
              <p className="text-2xl font-bold text-[#CD5C5C] dark:text-[#CD5C5C] mt-1">
                {stats.inscriptions}
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
