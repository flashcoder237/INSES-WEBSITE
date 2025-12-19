'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, Plus, Edit, Trash2, X } from 'lucide-react'

interface AboutInfo {
  id: string
  mission_fr: string
  mission_en: string
  vision_fr: string
  vision_en: string
  pedagogy_theoretical_fr: string
  pedagogy_theoretical_en: string
  pedagogy_practical_fr: string
  pedagogy_practical_en: string
  pedagogy_evaluation_fr: string
  pedagogy_evaluation_en: string
}

interface Value {
  id: string
  title_fr: string
  title_en: string
  description_fr: string
  description_en: string
  display_order: number
}

export default function AboutAdminPage() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [values, setValues] = useState<Value[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [editingValueId, setEditingValueId] = useState<string | null>(null)
  const [isCreatingValue, setIsCreatingValue] = useState(false)
  const [valueFormData, setValueFormData] = useState({
    title_fr: '',
    title_en: '',
    description_fr: '',
    description_en: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const supabase = createClient()

      const [aboutRes, valuesRes] = await Promise.all([
        supabase.from('about_info').select('*').single(),
        supabase
          .from('about_values')
          .select('*')
          .order('display_order', { ascending: true }),
      ])

      if (aboutRes.error) throw aboutRes.error
      if (valuesRes.error) throw valuesRes.error

      setAboutInfo(aboutRes.data)
      setValues(valuesRes.data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!aboutInfo) return

    setSaving(true)
    setSuccess(false)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('about_info')
        .update({
          mission_fr: aboutInfo.mission_fr,
          mission_en: aboutInfo.mission_en,
          vision_fr: aboutInfo.vision_fr,
          vision_en: aboutInfo.vision_en,
          pedagogy_theoretical_fr: aboutInfo.pedagogy_theoretical_fr,
          pedagogy_theoretical_en: aboutInfo.pedagogy_theoretical_en,
          pedagogy_practical_fr: aboutInfo.pedagogy_practical_fr,
          pedagogy_practical_en: aboutInfo.pedagogy_practical_en,
          pedagogy_evaluation_fr: aboutInfo.pedagogy_evaluation_fr,
          pedagogy_evaluation_en: aboutInfo.pedagogy_evaluation_en,
        })
        .eq('id', aboutInfo.id)

      if (error) throw error
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditValue = (value: Value) => {
    setEditingValueId(value.id)
    setValueFormData({
      title_fr: value.title_fr,
      title_en: value.title_en,
      description_fr: value.description_fr,
      description_en: value.description_en,
    })
  }

  const handleCancelValue = () => {
    setEditingValueId(null)
    setIsCreatingValue(false)
    setValueFormData({
      title_fr: '',
      title_en: '',
      description_fr: '',
      description_en: '',
    })
  }

  const handleSaveValue = async () => {
    try {
      const supabase = createClient()

      if (isCreatingValue) {
        const { error } = await supabase.from('about_values').insert({
          ...valueFormData,
          display_order: values.length,
        })
        if (error) throw error
      } else if (editingValueId) {
        const { error } = await supabase
          .from('about_values')
          .update(valueFormData)
          .eq('id', editingValueId)
        if (error) throw error
      }

      await loadData()
      handleCancelValue()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const handleDeleteValue = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('about_values').delete().eq('id', id)
      if (error) throw error
      await loadData()
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

  if (!aboutInfo) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Aucune information trouvée
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            À propos
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez mission, vision, valeurs et pédagogie
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Save className="h-5 w-5 mr-2" />
          )}
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200">
            ✓ Informations enregistrées avec succès
          </p>
        </div>
      )}

      {/* Mission & Vision */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Mission
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission (FR)
              </label>
              <textarea
                value={aboutInfo.mission_fr}
                onChange={(e) =>
                  setAboutInfo({ ...aboutInfo, mission_fr: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission (EN)
              </label>
              <textarea
                value={aboutInfo.mission_en}
                onChange={(e) =>
                  setAboutInfo({ ...aboutInfo, mission_en: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Vision
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision (FR)
              </label>
              <textarea
                value={aboutInfo.vision_fr}
                onChange={(e) =>
                  setAboutInfo({ ...aboutInfo, vision_fr: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision (EN)
              </label>
              <textarea
                value={aboutInfo.vision_en}
                onChange={(e) =>
                  setAboutInfo({ ...aboutInfo, vision_en: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pédagogie */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Pédagogie
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enseignement théorique (FR)
            </label>
            <textarea
              value={aboutInfo.pedagogy_theoretical_fr}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_theoretical_fr: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enseignement théorique (EN)
            </label>
            <textarea
              value={aboutInfo.pedagogy_theoretical_en}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_theoretical_en: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Formation pratique (FR)
            </label>
            <textarea
              value={aboutInfo.pedagogy_practical_fr}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_practical_fr: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Formation pratique (EN)
            </label>
            <textarea
              value={aboutInfo.pedagogy_practical_en}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_practical_en: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Évaluation (FR)
            </label>
            <textarea
              value={aboutInfo.pedagogy_evaluation_fr}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_evaluation_fr: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Évaluation (EN)
            </label>
            <textarea
              value={aboutInfo.pedagogy_evaluation_en}
              onChange={(e) =>
                setAboutInfo({
                  ...aboutInfo,
                  pedagogy_evaluation_en: e.target.value,
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Valeurs
          </h2>
          {!isCreatingValue && (
            <button
              onClick={() => setIsCreatingValue(true)}
              className="flex items-center px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle valeur
            </button>
          )}
        </div>

        {/* Formulaire de création */}
        {isCreatingValue && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nouvelle valeur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre (FR)
                </label>
                <input
                  type="text"
                  value={valueFormData.title_fr}
                  onChange={(e) =>
                    setValueFormData({
                      ...valueFormData,
                      title_fr: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre (EN)
                </label>
                <input
                  type="text"
                  value={valueFormData.title_en}
                  onChange={(e) =>
                    setValueFormData({
                      ...valueFormData,
                      title_en: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (FR)
                </label>
                <textarea
                  value={valueFormData.description_fr}
                  onChange={(e) =>
                    setValueFormData({
                      ...valueFormData,
                      description_fr: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (EN)
                </label>
                <textarea
                  value={valueFormData.description_en}
                  onChange={(e) =>
                    setValueFormData({
                      ...valueFormData,
                      description_en: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleCancelValue}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 inline mr-2" />
                Annuler
              </button>
              <button
                onClick={handleSaveValue}
                className="px-4 py-2 bg-[#B22234] text-white rounded-lg hover:bg-[#800020] transition-colors"
              >
                <Save className="h-5 w-5 inline mr-2" />
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {/* Liste des valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            >
              {editingValueId === value.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={valueFormData.title_fr}
                    onChange={(e) =>
                      setValueFormData({
                        ...valueFormData,
                        title_fr: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Titre (FR)"
                  />
                  <textarea
                    value={valueFormData.description_fr}
                    onChange={(e) =>
                      setValueFormData({
                        ...valueFormData,
                        description_fr: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="Description (FR)"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSaveValue}
                      className="text-[#B22234] hover:text-[#800020]"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancelValue}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {value.title_fr}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditValue(value)}
                        className="text-[#B22234] hover:text-[#800020]"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteValue(value.id, value.title_fr)
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description_fr}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {values.length === 0 && !isCreatingValue && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Aucune valeur trouvée
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
