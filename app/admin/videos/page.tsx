'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, Video, X, Edit2, CheckSquare, Square } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string | null
  url: string
  thumbnail_url: string | null
  duration: string | null
  display_order: number
  created_at: string
}

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail_url: '',
    duration: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setVideos(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const openAddForm = () => {
    setEditingVideo(null)
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail_url: '',
      duration: '',
    })
    setShowForm(true)
  }

  const openEditForm = (video: VideoItem) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description || '',
      url: video.url,
      thumbnail_url: video.thumbnail_url || '',
      duration: video.duration || '',
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingVideo(null)
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail_url: '',
      duration: '',
    })
  }

  const handleSave = async () => {
    if (!formData.title || !formData.url) {
      alert('Veuillez remplir au moins le titre et l\'URL')
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()

      if (editingVideo) {
        // Mise à jour
        const { error } = await supabase
          .from('videos')
          .update({
            title: formData.title,
            description: formData.description || null,
            url: formData.url,
            thumbnail_url: formData.thumbnail_url || null,
            duration: formData.duration || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingVideo.id)

        if (error) throw error
      } else {
        // Création
        const { data: maxOrderData } = await supabase
          .from('videos')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)

        const nextOrder = maxOrderData && maxOrderData.length > 0
          ? maxOrderData[0].display_order + 1
          : 0

        const { error } = await supabase.from('videos').insert({
          title: formData.title,
          description: formData.description || null,
          url: formData.url,
          thumbnail_url: formData.thumbnail_url || null,
          duration: formData.duration || null,
          display_order: nextOrder,
        })

        if (error) throw error
      }

      closeForm()
      await loadVideos()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteVideo = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('videos').delete().eq('id', id)

      if (error) throw error
      await loadVideos()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === videos.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(videos.map(v => v.id)))
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
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} vidéo(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('videos')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadVideos()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  // Extraire l'ID YouTube de l'URL
  const getYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
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
            Vidéos
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les vidéos YouTube de la page d'accueil
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center px-4 py-2 bg-[#B22234] hover:bg-[#800020] text-white rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter une vidéo
        </button>
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} vidéo(s) sélectionnée(s)
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

      {/* Formulaire (Modal) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingVideo ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Visite du campus INSES"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                </div>

                {/* URL YouTube */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL YouTube *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Formats acceptés: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Description de la vidéo..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent resize-none"
                  />
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Ex: 5:30"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                </div>

                {/* Miniature (optionnel) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL miniature personnalisée (optionnel)
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#B22234] focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Laissez vide pour utiliser la miniature YouTube par défaut
                  </p>
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
                        {editingVideo ? 'Mettre à jour' : 'Ajouter'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des vidéos */}
      {videos.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {videos.length} vidéo{videos.length > 1 ? 's' : ''}
            </h2>
            <button
              onClick={toggleSelectAll}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              {selectedIds.size === videos.length && videos.length > 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const youtubeId = getYouTubeId(video.url)
            const thumbnailUrl = video.thumbnail_url ||
              (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null)

            return (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative"
              >
                <button
                  onClick={() => toggleSelect(video.id)}
                  className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 p-1.5 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {selectedIds.has(video.id) ? (
                    <CheckSquare className="h-5 w-5 text-[#B22234]" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditForm(video)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Modifier"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id, video.title)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center py-16">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Aucune vidéo pour le moment
            </p>
            <p className="text-sm text-gray-400">
              Ajoutez des vidéos YouTube pour commencer
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
