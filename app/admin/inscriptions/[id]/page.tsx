'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ArrowLeft, CheckCircle, XCircle, Clock, Printer, Mail, User, Phone, MapPin, GraduationCap, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Inscription {
  id: string
  first_name: string
  last_name: string
  gender: string | null
  date_of_birth: string
  place_of_birth: string | null
  nationality: string | null
  email: string
  phone: string
  whatsapp: string | null
  address: string
  city: string
  postal_code: string | null
  country: string
  father_name: string | null
  father_profession: string | null
  father_phone: string | null
  mother_name: string | null
  mother_profession: string | null
  mother_phone: string | null
  emergency_contact_name: string | null
  emergency_contact_relationship: string | null
  emergency_contact_phone: string | null
  desired_formation: string
  academic_level: string
  last_school_attended: string | null
  last_diploma_obtained: string | null
  diploma_year: string | null
  preferred_start_date: string | null
  motivation_message: string | null
  career_goals: string | null
  why_this_formation: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export default function InscriptionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const [inscription, setInscription] = useState<Inscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [formationTitle, setFormationTitle] = useState<string>('')

  useEffect(() => {
    loadInscription()
  }, [unwrappedParams.id])

  const loadInscription = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('inscriptions')
        .select('*')
        .eq('id', unwrappedParams.id)
        .single()

      if (error) throw error
      setInscription(data)

      // Charger le titre de la formation si disponible
      if (data.desired_formation) {
        const { data: formationData } = await supabase
          .from('formations')
          .select('title_fr')
          .eq('slug', data.desired_formation)
          .single()

        if (formationData) {
          setFormationTitle(formationData.title_fr)
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: 'approved' | 'rejected') => {
    if (!inscription) return

    setUpdating(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('inscriptions')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', inscription.id)

      if (error) throw error

      await loadInscription()
      alert(`Inscription ${newStatus === 'approved' ? 'approuvée' : 'rejetée'} avec succès`)
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const sendNotificationEmail = async () => {
    if (!inscription) return

    setSendingEmail(true)
    try {
      const response = await fetch('/api/send-inscription-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inscription.email,
          firstName: inscription.first_name,
          lastName: inscription.last_name,
          status: inscription.status,
          formation: formationTitle || inscription.desired_formation,
        }),
      })

      if (!response.ok) throw new Error('Erreur lors de l\'envoi de l\'email')

      alert('Email envoyé avec succès')
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSendingEmail(false)
    }
  }

  const printInscription = () => {
    window.print()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5" />
      case 'rejected':
        return <XCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvée'
      case 'rejected':
        return 'Rejetée'
      default:
        return 'En attente'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#B22234]" />
      </div>
    )
  }

  if (error || !inscription) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">
          Erreur: {error || 'Inscription non trouvée'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Non imprimable */}
      <div className="flex justify-between items-center print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/inscriptions"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Détails de l'inscription
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {inscription.first_name} {inscription.last_name}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={printInscription}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="h-5 w-5 mr-2" />
            Imprimer
          </button>
          <button
            onClick={sendNotificationEmail}
            disabled={sendingEmail}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Mail className="h-5 w-5 mr-2" />
            {sendingEmail ? 'Envoi...' : 'Notifier'}
          </button>
        </div>
      </div>

      {/* Statut et actions - Non imprimable */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Statut actuel:
            </span>
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inscription.status)}`}>
              {getStatusIcon(inscription.status)}
              {getStatusLabel(inscription.status)}
            </span>
          </div>

          {inscription.status === 'pending' && (
            <div className="flex gap-3">
              <button
                onClick={() => updateStatus('approved')}
                disabled={updating}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approuver
              </button>
              <button
                onClick={() => updateStatus('rejected')}
                disabled={updating}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Rejeter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenu imprimable */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 print:shadow-none print:border-0">
        {/* En-tête pour impression */}
        <div className="hidden print:block p-6 border-b-4 border-[#B22234]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#B22234]">INSES</h1>
            <p className="text-sm text-gray-600">Institut Supérieur de l'Espoir</p>
            <p className="text-sm text-gray-600">Douala-Bonabéri, Cameroun</p>
            <h2 className="text-xl font-bold text-gray-900 mt-4">FICHE D'INSCRIPTION</h2>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(inscription.status)}`}>
              {getStatusIcon(inscription.status)}
              {getStatusLabel(inscription.status)}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Informations personnelles */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="h-6 w-6 text-[#B22234]" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Prénom</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.first_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nom</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.last_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Genre</label>
                <p className="text-base text-gray-900 dark:text-white">
                  {inscription.gender === 'male' ? 'Masculin' : inscription.gender === 'female' ? 'Féminin' : '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Date de naissance</label>
                <p className="text-base text-gray-900 dark:text-white">
                  {new Date(inscription.date_of_birth).toLocaleDateString('fr-FR')}
                </p>
              </div>
              {inscription.place_of_birth && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Lieu de naissance</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.place_of_birth}</p>
                </div>
              )}
              {inscription.nationality && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nationalité</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.nationality}</p>
                </div>
              )}
            </div>
          </div>

          {/* Coordonnées */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Phone className="h-6 w-6 text-[#B22234]" />
              Coordonnées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Téléphone</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.phone}</p>
              </div>
              {inscription.whatsapp && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">WhatsApp</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.whatsapp}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Ville</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.city}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Adresse complète</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.address}</p>
              </div>
            </div>
          </div>

          {/* Informations familiales */}
          {(inscription.father_name || inscription.mother_name || inscription.emergency_contact_name) && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="h-6 w-6 text-[#B22234]" />
                Informations familiales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inscription.father_name && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nom du père</label>
                      <p className="text-base text-gray-900 dark:text-white">{inscription.father_name}</p>
                    </div>
                    {inscription.father_profession && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Profession du père</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.father_profession}</p>
                      </div>
                    )}
                    {inscription.father_phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Téléphone du père</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.father_phone}</p>
                      </div>
                    )}
                  </>
                )}
                {inscription.mother_name && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nom de la mère</label>
                      <p className="text-base text-gray-900 dark:text-white">{inscription.mother_name}</p>
                    </div>
                    {inscription.mother_profession && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Profession de la mère</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.mother_profession}</p>
                      </div>
                    )}
                    {inscription.mother_phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Téléphone de la mère</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.mother_phone}</p>
                      </div>
                    )}
                  </>
                )}
                {inscription.emergency_contact_name && (
                  <>
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">Contact d'urgence</h3>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Nom</label>
                      <p className="text-base text-gray-900 dark:text-white">{inscription.emergency_contact_name}</p>
                    </div>
                    {inscription.emergency_contact_relationship && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Relation</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.emergency_contact_relationship}</p>
                      </div>
                    )}
                    {inscription.emergency_contact_phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Téléphone</label>
                        <p className="text-base text-gray-900 dark:text-white">{inscription.emergency_contact_phone}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Formation souhaitée */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-[#B22234]" />
              Formation souhaitée
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Formation</label>
                <p className="text-base text-gray-900 dark:text-white">{formationTitle || inscription.desired_formation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Niveau actuel</label>
                <p className="text-base text-gray-900 dark:text-white">{inscription.academic_level}</p>
              </div>
              {inscription.last_school_attended && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Dernier établissement</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.last_school_attended}</p>
                </div>
              )}
              {inscription.last_diploma_obtained && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Dernier diplôme</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.last_diploma_obtained}</p>
                </div>
              )}
              {inscription.diploma_year && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Année d'obtention</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.diploma_year}</p>
                </div>
              )}
              {inscription.preferred_start_date && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Date de début souhaitée</label>
                  <p className="text-base text-gray-900 dark:text-white">{inscription.preferred_start_date}</p>
                </div>
              )}
            </div>
          </div>

          {/* Motivation */}
          {(inscription.why_this_formation || inscription.career_goals || inscription.motivation_message) && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Motivation
              </h2>
              <div className="space-y-4">
                {inscription.why_this_formation && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Pourquoi cette formation
                    </label>
                    <p className="text-base text-gray-900 dark:text-white whitespace-pre-wrap">
                      {inscription.why_this_formation}
                    </p>
                  </div>
                )}
                {inscription.career_goals && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Objectifs de carrière
                    </label>
                    <p className="text-base text-gray-900 dark:text-white whitespace-pre-wrap">
                      {inscription.career_goals}
                    </p>
                  </div>
                )}
                {inscription.motivation_message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Message supplémentaire
                    </label>
                    <p className="text-base text-gray-900 dark:text-white whitespace-pre-wrap">
                      {inscription.motivation_message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Informations système */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-medium text-gray-600 dark:text-gray-400">Date de soumission</label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(inscription.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <label className="block font-medium text-gray-600 dark:text-gray-400">Dernière mise à jour</label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(inscription.updated_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour l'impression */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:block,
          .print\\:block * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
