'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit, Save, X, Search, Filter, Loader2, RefreshCw } from 'lucide-react'

interface ContentItem {
  id: string
  key: string
  category: string
  section: string | null
  content_fr: string
  content_en: string
  description: string | null
  is_active: boolean
}

export default function SiteContentAdminPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<ContentItem>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    loadContent()
  }, [])

  useEffect(() => {
    filterContent()
  }, [content, searchQuery, categoryFilter])

  const loadContent = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true })

      if (error) throw error
      setContent(data || [])

      // Extraire les catégories uniques
      const uniqueCategories = Array.from(new Set(data?.map(item => item.category) || []))
      setCategories(uniqueCategories)
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const filterContent = () => {
    let filtered = [...content]

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.key.toLowerCase().includes(query) ||
        item.content_fr.toLowerCase().includes(query) ||
        item.content_en.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      )
    }

    // Filtre par catégorie
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    setFilteredContent(filtered)
  }

  const startEdit = (item: ContentItem) => {
    setEditingId(item.id)
    setEditForm(item)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    if (!editingId) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('site_content')
        .update({
          content_fr: editForm.content_fr,
          content_en: editForm.content_en,
          description: editForm.description,
        })
        .eq('id', editingId)

      if (error) throw error

      await loadContent()
      cancelEdit()
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contenu Textuel du Site
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez tous les textes affichés sur le site (français et anglais)
          </p>
        </div>
        <button
          onClick={loadContent}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Actualiser
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par clé, contenu ou description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filtre par catégorie */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredContent.length} élément(s) trouvé(s) sur {content.length} total
        </div>
      </div>

      {/* Liste du contenu */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              {editingId === item.id ? (
                // Mode édition
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">CLÉ</span>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">{item.key}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">CATÉGORIE</span>
                      <p className="text-sm text-gray-900 dark:text-white">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SECTION</span>
                      <p className="text-sm text-gray-900 dark:text-white">{item.section || '-'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📝 Description
                    </label>
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Description pour l'admin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      🇫🇷 Contenu Français
                    </label>
                    <textarea
                      value={editForm.content_fr || ''}
                      onChange={(e) => setEditForm({ ...editForm, content_fr: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      🇬🇧 Contenu Anglais
                    </label>
                    <textarea
                      value={editForm.content_en || ''}
                      onChange={(e) => setEditForm({ ...editForm, content_en: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={saveEdit}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                // Mode lecture
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                          {item.key}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded">
                          {item.category}
                        </span>
                        {item.section && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs font-medium rounded">
                            {item.section}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🇫🇷</span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">FRANÇAIS</span>
                      </div>
                      <p className="text-gray-900 dark:text-white">{item.content_fr}</p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🇬🇧</span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">ENGLISH</span>
                      </div>
                      <p className="text-gray-900 dark:text-white">{item.content_en}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun contenu trouvé
          </p>
        </div>
      )}
    </div>
  )
}
