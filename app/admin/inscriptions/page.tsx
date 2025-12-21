'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Loader2,
  Mail,
  Phone,
  User,
  Calendar,
  GraduationCap,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  CheckSquare,
  Square,
} from 'lucide-react'

interface Inscription {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  formation_id: string
  formation_title: string | null
  message: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function InscriptionsAdminPage() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedInscription, setSelectedInscription] =
    useState<Inscription | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadInscriptions()
  }, [])

  const loadInscriptions = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('inscriptions')
        .select(
          `
          *,
          formations:formation_id (
            title_fr
          )
        `
        )
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedData = data?.map((item: any) => ({
        ...item,
        formation_title: item.formations?.title_fr || null,
      }))

      setInscriptions(formattedData || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      await loadInscriptions()

      if (selectedInscription?.id === id) {
        setSelectedInscription({ ...selectedInscription, status })
      }
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const deleteInscription = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSelectedInscription(null)
      await loadInscriptions()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === inscriptions.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(inscriptions.map(i => i.id)))
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

  const bulkApprove = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .update({ status: 'approved' })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadInscriptions()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkReject = async () => {
    if (selectedIds.size === 0) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .update({ status: 'rejected' })
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      await loadInscriptions()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} demande(s) ?`)) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .delete()
        .in('id', Array.from(selectedIds))

      if (error) throw error
      setSelectedIds(new Set())
      setSelectedInscription(null)
      await loadInscriptions()
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      approved:
        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'En attente',
      approved: 'Approuvée',
      rejected: 'Rejetée',
    }
    return labels[status as keyof typeof labels] || status
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-3 w-3 mr-1" />
      case 'rejected':
        return <XCircle className="h-3 w-3 mr-1" />
      default:
        return <Clock className="h-3 w-3 mr-1" />
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
          Demandes d'inscription
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gérez les demandes d'inscription aux formations
        </p>
      </div>

      {/* Barre d'actions groupées */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.size} demande(s) sélectionnée(s)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={bulkApprove}
                className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approuver
              </button>
              <button
                onClick={bulkReject}
                className="flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Rejeter
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
        {/* Liste des demandes */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Demandes ({inscriptions.length})
            </h2>
            <button
              onClick={toggleSelectAll}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {selectedIds.size === inscriptions.length && inscriptions.length > 0 ? (
                <CheckSquare className="h-5 w-5" />
              ) : (
                <Square className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
            {inscriptions.map((inscription) => (
              <div
                key={inscription.id}
                className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedInscription?.id === inscription.id
                    ? 'bg-[#B22234]/10 dark:bg-[#B22234]/20'
                    : ''
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSelect(inscription.id)
                  }}
                  className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {selectedIds.has(inscription.id) ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedInscription(inscription)}
                  className="flex-1 text-left"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {inscription.first_name} {inscription.last_name}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      inscription.status
                    )}`}
                  >
                    {getStatusIcon(inscription.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {inscription.email}
                </p>
                {inscription.formation_title && (
                  <p className="text-sm text-[#B22234] dark:text-[#CD5C5C] mb-1">
                    {inscription.formation_title}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(inscription.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </button>
            </div>
            ))}
          </div>

          {inscriptions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Aucune demande trouvée
              </p>
            </div>
          )}
        </div>

        {/* Détail de la demande */}
        <div className="lg:col-span-2">
          {selectedInscription ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedInscription.first_name}{' '}
                      {selectedInscription.last_name}
                    </h2>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedInscription.status
                      )}`}
                    >
                      {getStatusIcon(selectedInscription.status)}
                      {getStatusLabel(selectedInscription.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteInscription(selectedInscription.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    <a
                      href={`mailto:${selectedInscription.email}`}
                      className="hover:text-[#B22234] dark:hover:text-[#CD5C5C]"
                    >
                      {selectedInscription.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    <a
                      href={`tel:${selectedInscription.phone}`}
                      className="hover:text-[#B22234] dark:hover:text-[#CD5C5C]"
                    >
                      {selectedInscription.phone}
                    </a>
                  </div>
                  {selectedInscription.formation_title && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span className="text-[#B22234] dark:text-[#CD5C5C] font-medium">
                        {selectedInscription.formation_title}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(selectedInscription.created_at).toLocaleDateString(
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

              {selectedInscription.message && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Message
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedInscription.message}
                  </p>
                </div>
              )}

              <div className="p-6 bg-gray-50 dark:bg-gray-900">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Actions
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      updateStatus(selectedInscription.id, 'approved')
                    }
                    disabled={selectedInscription.status === 'approved'}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approuver
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(selectedInscription.id, 'rejected')
                    }
                    disabled={selectedInscription.status === 'rejected'}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Rejeter
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(selectedInscription.id, 'pending')
                    }
                    disabled={selectedInscription.status === 'pending'}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    En attente
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full flex items-center justify-center">
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sélectionnez une demande pour voir les détails
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
