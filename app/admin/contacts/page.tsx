'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Mail, Phone, User, Calendar, Eye, Trash2, CheckSquare, Square, EyeOff } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  created_at: string
  is_read: boolean
}

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      await loadContacts()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('contacts').delete().eq('id', id)

      if (error) throw error
      setSelectedContact(null)
      await loadContacts()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const handleSelectContact = async (contact: Contact) => {
    setSelectedContact(contact)
    if (!contact.is_read) {
      await markAsRead(contact.id)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === contacts.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(contacts.map(c => c.id)))
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

  const bulkMarkAsRead = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: true })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadContacts()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkMarkAsUnread = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: false })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadContacts()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} message(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('contacts')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      setSelectedContact(null)
      await loadContacts()
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages de contact
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Consultez les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} message(s) sélectionné(s)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={bulkMarkAsRead}
                className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <Eye className="h-4 w-4 mr-1" />
                Marquer comme lu
              </button>
              <button
                onClick={bulkMarkAsUnread}
                className="flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                <EyeOff className="h-4 w-4 mr-1" />
                Marquer comme non lu
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des messages */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Messages ({contacts.length})
            </h2>
            <button
              onClick={toggleSelectAll}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {selectedIds.size === contacts.length && contacts.length > 0 ? (
                <CheckSquare className="h-5 w-5" />
              ) : (
                <Square className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedContact?.id === contact.id
                    ? 'bg-[#B22234]/10 dark:bg-[#B22234]/20'
                    : ''
                } ${!contact.is_read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSelect(contact.id)
                  }}
                  className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {selectedIds.has(contact.id) ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => handleSelectContact(contact)}
                  className="flex-1 text-left"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {contact.name}
                    </span>
                  </div>
                  {!contact.is_read && (
                    <span className="h-2 w-2 bg-[#B22234] rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {contact.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {contact.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </button>
            </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Aucun message trouvé
              </p>
            </div>
          )}
        </div>

        {/* Détail du message */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedContact.name}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 mr-2" />
                        <a
                          href={`mailto:${selectedContact.email}`}
                          className="hover:text-[#B22234] dark:hover:text-[#CD5C5C]"
                        >
                          {selectedContact.email}
                        </a>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-4 w-4 mr-2" />
                          <a
                            href={`tel:${selectedContact.phone}`}
                            className="hover:text-[#B22234] dark:hover:text-[#CD5C5C]"
                          >
                            {selectedContact.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(selectedContact.created_at).toLocaleDateString(
                          'fr-FR',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Message
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full flex items-center justify-center">
              <div className="text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sélectionnez un message pour voir les détails
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
