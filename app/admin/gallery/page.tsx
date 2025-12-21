'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Upload, Trash2, Image as ImageIcon, X, Edit2, CheckSquare, Square } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface GalleryImage {
  id: string
  title: string
  url: string
  category: string
  display_order: number
  created_at: string
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'events',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setImages(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const openAddForm = () => {
    setEditingImage(null)
    setFormData({
      title: '',
      url: '',
      category: 'events',
    })
    setShowForm(true)
  }

  const openEditForm = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      url: image.url,
      category: image.category,
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingImage(null)
    setFormData({
      title: '',
      url: '',
      category: 'events',
    })
  }

  const handleSave = async () => {
    if (!formData.title || !formData.url) {
      alert('Veuillez remplir tous les champs')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()

      if (editingImage) {
        // Mise à jour
        const { error } = await supabase
          .from('gallery')
          .update({
            title: formData.title,
            url: formData.url,
            category: formData.category,
          })
          .eq('id', editingImage.id)

        if (error) throw error
      } else {
        // Création
        const { data: maxOrderData } = await supabase
          .from('gallery')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)

        const nextOrder = maxOrderData && maxOrderData.length > 0
          ? maxOrderData[0].display_order + 1
          : 0

        const { error } = await supabase.from('gallery').insert({
          title: formData.title,
          url: formData.url,
          category: formData.category,
          display_order: nextOrder,
        })

        if (error) throw error
      }

      closeForm()
      await loadImages()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteImage = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('gallery').delete().eq('id', id)

      if (error) throw error
      await loadImages()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === images.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(images.map(i => i.id)))
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
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} image(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('gallery')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadImages()
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
            Galerie
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les images de la galerie
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center px-4 py-2 bg-[#B22234] hover:bg-[#800020] text-white rounded-lg transition-colors"
        >
          <Upload className="h-5 w-5 mr-2" />
          Ajouter une image
        </button>
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} image(s) sélectionnée(s)
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

      {/* Formulaire d'ajout/modification d'image (Modal) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingImage ? 'Modifier l\'image' : 'Ajouter une image'}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Upload d'image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image *
                  </label>
                  <ImageUpload
                    value={formData.url}
                    onChange={(url) => setFormData({ ...formData, url })}
                    folder="gallery"
                    previewWidth={600}
                    previewHeight={400}
                  />
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Cérémonie de remise des diplômes"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  >
                    <option value="events">Événements</option>
                    <option value="campus">Campus</option>
                    <option value="students">Étudiants</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={closeForm}
                    disabled={saving}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !formData.url || !formData.title}
                    className="flex items-center px-4 py-2 bg-[#B22234] hover:bg-[#800020] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        {editingImage ? 'Mettre à jour' : 'Ajouter'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grille des images */}
      {images.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {images.length} image{images.length > 1 ? 's' : ''}
            </h2>
            <button
              onClick={toggleSelectAll}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              {selectedIds.size === images.length && images.length > 0 ? (
                <>
                  <CheckSquare className="h-5 w-5 mr-2" />
                  Tout désélectionner
                </>
              ) : (
                <>
                  <Square className="h-5 w-5 mr-2" />
                  Tout sélectionner
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative"
            >
              <button
                onClick={() => toggleSelect(image.id)}
                className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 p-1.5 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {selectedIds.has(image.id) ? (
                  <CheckSquare className="h-5 w-5 text-[#B22234]" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg'
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {image.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {image.category}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditForm(image)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Modifier"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteImage(image.id, image.title)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center py-16">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Aucune image dans la galerie
            </p>
            <p className="text-sm text-gray-400">
              Ajoutez des images pour commencer
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
