'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Upload, Trash2, Image as ImageIcon, X } from 'lucide-react'
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
  const [showAddForm, setShowAddForm] = useState(false)
  const [newImage, setNewImage] = useState({
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

  const handleAddImage = async () => {
    if (!newImage.title || !newImage.url) {
      alert('Veuillez remplir tous les champs')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()

      // Obtenir le display_order maximum
      const { data: maxOrderData } = await supabase
        .from('gallery')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)

      const nextOrder = maxOrderData && maxOrderData.length > 0
        ? maxOrderData[0].display_order + 1
        : 0

      const { error } = await supabase.from('gallery').insert({
        title: newImage.title,
        url: newImage.url,
        category: newImage.category,
        display_order: nextOrder,
      })

      if (error) throw error

      // Réinitialiser le formulaire
      setNewImage({ title: '', url: '', category: 'events' })
      setShowAddForm(false)
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
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-[#B22234] hover:bg-[#800020] text-white rounded-lg transition-colors"
        >
          <Upload className="h-5 w-5 mr-2" />
          Ajouter une image
        </button>
      </div>

      {/* Formulaire d'ajout d'image (Modal) */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Ajouter une image
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setNewImage({ title: '', url: '', category: 'events' })
                  }}
                  className="text-gray-400 hover:text-gray-600"
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
                    value={newImage.url}
                    onChange={(url) => setNewImage({ ...newImage, url })}
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
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="Ex: Cérémonie de remise des diplômes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  >
                    <option value="events">Événements</option>
                    <option value="campus">Campus</option>
                    <option value="students">Étudiants</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowAddForm(false)
                      setNewImage({ title: '', url: '', category: 'events' })
                    }}
                    disabled={saving}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddImage}
                    disabled={saving || !newImage.url || !newImage.title}
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
                        Ajouter
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
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
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteImage(image.id, image.title)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
