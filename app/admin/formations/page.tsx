'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff, CheckSquare, Square } from 'lucide-react'
import Link from 'next/link'

interface Formation {
  id: string
  slug: string
  title_fr: string
  title_en: string
  short_description_fr: string
  duration: string
  level: string
  is_active: boolean
  display_order: number
}

export default function FormationsAdminPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadFormations()
  }, [])

  const loadFormations = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setFormations(data || [])
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
        .from('formations')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      await loadFormations()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const deleteFormation = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('formations')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadFormations()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === formations.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(formations.map(f => f.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const bulkActivate = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('formations')
        .update({ is_active: true })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadFormations()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkDeactivate = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('formations')
        .update({ is_active: false })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadFormations()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} formation(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('formations')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadFormations()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#B22234]" />
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
            Formations
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les formations offertes par l'institut
          </p>
        </div>
        <Link
          href="/admin/formations/new"
          className="flex items-center px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle formation
        </Link>
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} formation(s) sélectionnée(s)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={bulkActivate}
                className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <Eye className="h-4 w-4 mr-1" />
                Activer
              </button>
              <button
                onClick={bulkDeactivate}
                className="flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                <EyeOff className="h-4 w-4 mr-1" />
                Désactiver
              </button>
              <button
                onClick={bulkDelete}
                className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des formations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={toggleSelectAll}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {selectedIds.size === formations.length && formations.length > 0 ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {formations.map((formation) => (
                <tr key={formation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelect(formation.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {selectedIds.has(formation.id) ? (
                        <CheckSquare className="h-5 w-5" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formation.title_fr}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {formation.short_description_fr}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {formation.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {formation.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleActive(formation.id, formation.is_active)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        formation.is_active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {formation.is_active ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/formations/${formation.id}`}
                        className="text-[#B22234] hover:text-[#800020] dark:text-[#CD5C5C] dark:hover:text-[#B22234]"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => deleteFormation(formation.id, formation.title_fr)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {formations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Aucune formation trouvée
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
