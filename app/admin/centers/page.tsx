'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface Center {
  id: string
  slug: string
  name_fr: string
  name_en: string
  full_name_fr: string
  full_name_en: string
  logo: string
  primary_color: string
  is_active: boolean
  display_order: number
}

export default function CentersAdminPage() {
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCenters()
  }, [])

  const loadCenters = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('centers')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setCenters(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('centers')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      await loadCenters()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const deleteCenter = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ? Toutes les formations associées seront également supprimées.`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('centers')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadCenters()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">Erreur: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Centres de Formation
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les différents centres (INSES, CEPRES, etc.)
          </p>
        </div>
        <Link
          href="/admin/centers/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau centre
        </Link>
      </div>

      {/* Liste des centres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centers.map((center) => (
          <div
            key={center.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4"
            style={{ borderTopColor: center.primary_color }}
          >
            <div className="p-6">
              {/* Header avec logo */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: center.primary_color }}
                  >
                    {center.name_fr.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {center.name_fr}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {center.full_name_fr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleActive(center.id, center.is_active)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    center.is_active
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {center.is_active ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Actif
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Inactif
                    </>
                  )}
                </button>
              </div>

              {/* Infos */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Slug:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{center.slug}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Nom EN:</span>
                  <span className="text-gray-900 dark:text-white">{center.name_en}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Couleur:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: center.primary_color }}
                    ></div>
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
                      {center.primary_color}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href={`/admin/centers/${center.id}`}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Link>
                <button
                  onClick={() => deleteCenter(center.id, center.name_fr)}
                  className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {centers.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun centre trouvé
          </p>
        </div>
      )}
    </div>
  )
}
