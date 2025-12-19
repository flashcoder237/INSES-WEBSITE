'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save } from 'lucide-react'

interface SiteInfo {
  id: string
  name: string
  full_name: string
  description: string
  location: string
  email: string
  phone: string
  whatsapp: string
  fixed_line: string
  social_facebook: string
  social_instagram: string
  social_linkedin: string
  social_twitter: string
  other_phones: string[]
}

export default function SiteInfoAdminPage() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadSiteInfo()
  }, [])

  const loadSiteInfo = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('site_info')
        .select('*')
        .single()

      if (error) throw error
      setSiteInfo(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!siteInfo) return

    setSaving(true)
    setSuccess(false)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('site_info')
        .update({
          name: siteInfo.name,
          full_name: siteInfo.full_name,
          description: siteInfo.description,
          location: siteInfo.location,
          email: siteInfo.email,
          phone: siteInfo.phone,
          whatsapp: siteInfo.whatsapp,
          fixed_line: siteInfo.fixed_line,
          social_facebook: siteInfo.social_facebook,
          social_instagram: siteInfo.social_instagram,
          social_linkedin: siteInfo.social_linkedin,
          social_twitter: siteInfo.social_twitter,
          other_phones: siteInfo.other_phones,
        })
        .eq('id', siteInfo.id)

      if (error) throw error
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleOtherPhoneChange = (index: number, value: string) => {
    if (!siteInfo) return
    const newPhones = [...siteInfo.other_phones]
    newPhones[index] = value
    setSiteInfo({ ...siteInfo, other_phones: newPhones })
  }

  const addOtherPhone = () => {
    if (!siteInfo) return
    setSiteInfo({
      ...siteInfo,
      other_phones: [...siteInfo.other_phones, ''],
    })
  }

  const removeOtherPhone = (index: number) => {
    if (!siteInfo) return
    setSiteInfo({
      ...siteInfo,
      other_phones: siteInfo.other_phones.filter((_, i) => i !== index),
    })
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

  if (!siteInfo) {
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
            Informations du site
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez les coordonnées et informations générales
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

      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        {/* Informations générales */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informations générales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom court
              </label>
              <input
                type="text"
                value={siteInfo.name}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={siteInfo.full_name}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, full_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={siteInfo.description}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={siteInfo.location}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={siteInfo.email}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Téléphone principal
              </label>
              <input
                type="tel"
                value={siteInfo.phone}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={siteInfo.whatsapp}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, whatsapp: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ligne fixe
              </label>
              <input
                type="tel"
                value={siteInfo.fixed_line}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, fixed_line: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Autres téléphones
              </label>
              <button
                onClick={addOtherPhone}
                className="text-sm text-[#B22234] hover:text-[#800020]"
              >
                + Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {siteInfo.other_phones.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      handleOtherPhoneChange(index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeOtherPhone(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-900 dark:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Réseaux sociaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={siteInfo.social_facebook}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, social_facebook: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={siteInfo.social_instagram}
                onChange={(e) =>
                  setSiteInfo({
                    ...siteInfo,
                    social_instagram: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={siteInfo.social_linkedin}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, social_linkedin: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={siteInfo.social_twitter}
                onChange={(e) =>
                  setSiteInfo({ ...siteInfo, social_twitter: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
