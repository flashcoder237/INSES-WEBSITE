'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Loader2, Save, X, CheckSquare, Square } from 'lucide-react'

interface Partner {
  id: string
  name_fr: string
  name_en: string
  display_order: number
}

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name_fr: '',
    name_en: '',
  })

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setPartners(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id)
    setFormData({
      name_fr: partner.name_fr,
      name_en: partner.name_en,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ name_fr: '', name_en: '' })
  }

  const handleSave = async () => {
    try {
      const supabase = createClient()

      if (isCreating) {
        const { error } = await supabase.from('partners').insert({
          ...formData,
          display_order: partners.length,
        })
        if (error) throw error
      } else if (editingId) {
        const { error } = await supabase
          .from('partners')
          .update(formData)
          .eq('id', editingId)
        if (error) throw error
      }

      await loadPartners()
      handleCancel()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('partners').delete().eq('id', id)
      if (error) throw error
      await loadPartners()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === partners.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(partners.map(p => p.id)))
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

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} partenaire(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('partners')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadPartners()
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
            Partenaires
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les partenaires institutionnels
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouveau partenaire
          </button>
        )}
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} partenaire(s) sélectionné(s)
            </span>
            <button
              onClick={bulkDelete}
              className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </button>
          </div>
        </div>
      )}

      {/* Formulaire de création */}
      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Nouveau partenaire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom (FR)
              </label>
              <input
                type="text"
                value={formData.name_fr}
                onChange={(e) =>
                  setFormData({ ...formData, name_fr: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: Clinique CEMECES"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom (EN)
              </label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) =>
                  setFormData({ ...formData, name_en: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: CEMECES Clinic"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 inline mr-2" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors"
            >
              <Save className="h-5 w-5 inline mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Liste des partenaires */}
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
                    {selectedIds.size === partners.length && partners.length > 0 ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nom (FR)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nom (EN)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  {editingId === partner.id ? (
                    <>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.name_fr}
                          onChange={(e) =>
                            setFormData({ ...formData, name_fr: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.name_en}
                          onChange={(e) =>
                            setFormData({ ...formData, name_en: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-[#B22234] hover:text-[#800020]"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleSelect(partner.id)}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                          {selectedIds.has(partner.id) ? (
                            <CheckSquare className="h-5 w-5" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        {partner.name_fr}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        {partner.name_en}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(partner)}
                            className="text-[#B22234] hover:text-[#800020] dark:text-[#CD5C5C] dark:hover:text-[#B22234]"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(partner.id, partner.name_fr)
                            }
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {partners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Aucun partenaire trouvé
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
