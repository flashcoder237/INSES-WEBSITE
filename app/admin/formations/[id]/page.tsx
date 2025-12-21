'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Save, ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

interface FormationFormData {
  slug: string
  title_fr: string
  title_en: string
  short_description_fr: string
  short_description_en: string
  full_description_fr: string
  full_description_en: string
  duration: string
  level: string
  icon: string
  is_active: boolean
}

interface Skill {
  id?: string
  skill_fr: string
  skill_en: string
  display_order: number
}

interface Career {
  id?: string
  career_fr: string
  career_en: string
  display_order: number
}

export default function FormationEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormationFormData>({
    slug: '',
    title_fr: '',
    title_en: '',
    short_description_fr: '',
    short_description_en: '',
    full_description_fr: '',
    full_description_en: '',
    duration: '',
    level: '',
    icon: '',
    is_active: true,
  })
  const [skills, setSkills] = useState<Skill[]>([])
  const [careers, setCareers] = useState<Career[]>([])

  useEffect(() => {
    if (id !== 'new') {
      loadFormation()
    } else {
      setLoading(false)
    }
  }, [id])

  const loadFormation = async () => {
    try {
      const supabase = createClient()
      const [formationRes, skillsRes, careersRes] = await Promise.all([
        supabase.from('formations').select('*').eq('id', id).single(),
        supabase
          .from('formation_skills')
          .select('*')
          .eq('formation_id', id)
          .order('display_order'),
        supabase
          .from('formation_careers')
          .select('*')
          .eq('formation_id', id)
          .order('display_order'),
      ])

      if (formationRes.error) throw formationRes.error

      setFormData({
        slug: formationRes.data.slug || '',
        title_fr: formationRes.data.title_fr || '',
        title_en: formationRes.data.title_en || '',
        short_description_fr: formationRes.data.short_description_fr || '',
        short_description_en: formationRes.data.short_description_en || '',
        full_description_fr: formationRes.data.full_description_fr || '',
        full_description_en: formationRes.data.full_description_en || '',
        duration: formationRes.data.duration || '',
        level: formationRes.data.level || '',
        icon: formationRes.data.icon || '',
        is_active: formationRes.data.is_active,
      })

      if (!skillsRes.error) setSkills(skillsRes.data || [])
      if (!careersRes.error) setCareers(careersRes.data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const supabase = createClient()

      if (id === 'new') {
        // Create new formation
        const { data: newFormation, error: formationError } = await supabase
          .from('formations')
          .insert({
            ...formData,
            display_order: 0,
          })
          .select()
          .single()

        if (formationError) throw formationError

        // Insert skills
        if (skills.length > 0) {
          const skillsToInsert = skills.map((skill, index) => ({
            formation_id: newFormation.id,
            skill_fr: skill.skill_fr,
            skill_en: skill.skill_en,
            display_order: index,
          }))
          const { error: skillsError } = await supabase
            .from('formation_skills')
            .insert(skillsToInsert)
          if (skillsError) throw skillsError
        }

        // Insert careers
        if (careers.length > 0) {
          const careersToInsert = careers.map((career, index) => ({
            formation_id: newFormation.id,
            career_fr: career.career_fr,
            career_en: career.career_en,
            display_order: index,
          }))
          const { error: careersError } = await supabase
            .from('formation_careers')
            .insert(careersToInsert)
          if (careersError) throw careersError
        }
      } else {
        // Update formation
        const { error: formationError } = await supabase
          .from('formations')
          .update(formData)
          .eq('id', id)
        if (formationError) throw formationError

        // Delete existing skills and careers
        await supabase.from('formation_skills').delete().eq('formation_id', id)
        await supabase.from('formation_careers').delete().eq('formation_id', id)

        // Re-insert skills
        if (skills.length > 0) {
          const skillsToInsert = skills.map((skill, index) => ({
            formation_id: id,
            skill_fr: skill.skill_fr,
            skill_en: skill.skill_en,
            display_order: index,
          }))
          const { error: skillsError } = await supabase
            .from('formation_skills')
            .insert(skillsToInsert)
          if (skillsError) throw skillsError
        }

        // Re-insert careers
        if (careers.length > 0) {
          const careersToInsert = careers.map((career, index) => ({
            formation_id: id,
            career_fr: career.career_fr,
            career_en: career.career_en,
            display_order: index,
          }))
          const { error: careersError } = await supabase
            .from('formation_careers')
            .insert(careersToInsert)
          if (careersError) throw careersError
        }
      }

      router.push('/admin/formations')
    } catch (err: any) {
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    setSkills([
      ...skills,
      { skill_fr: '', skill_en: '', display_order: skills.length },
    ])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: 'skill_fr' | 'skill_en', value: string) => {
    const newSkills = [...skills]
    newSkills[index][field] = value
    setSkills(newSkills)
  }

  const addCareer = () => {
    setCareers([
      ...careers,
      { career_fr: '', career_en: '', display_order: careers.length },
    ])
  }

  const removeCareer = (index: number) => {
    setCareers(careers.filter((_, i) => i !== index))
  }

  const updateCareer = (
    index: number,
    field: 'career_fr' | 'career_en',
    value: string
  ) => {
    const newCareers = [...careers]
    newCareers[index][field] = value
    setCareers(newCareers)
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
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/formations"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {id === 'new'
                ? 'Nouvelle formation'
                : 'Modifier la formation'}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {id === 'new'
                ? 'Créer une nouvelle formation'
                : 'Modifier les informations de la formation'}
            </p>
          </div>
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

      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        {/* Informations de base */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informations de base
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="delegue-medical"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icône (lucide-react)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Stethoscope"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="2 ans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Niveau requis
              </label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Bac requis"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="h-4 w-4 text-[#B22234] border-gray-300 rounded"
              />
              <label
                htmlFor="is_active"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Formation active
              </label>
            </div>
          </div>
        </div>

        {/* Version française */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Version française
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={formData.title_fr}
                onChange={(e) =>
                  setFormData({ ...formData, title_fr: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description courte
              </label>
              <textarea
                value={formData.short_description_fr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_description_fr: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description complète
              </label>
              <textarea
                value={formData.full_description_fr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_description_fr: e.target.value,
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Version anglaise */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Version anglaise
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) =>
                  setFormData({ ...formData, title_en: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description courte
              </label>
              <textarea
                value={formData.short_description_en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_description_en: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description complète
              </label>
              <textarea
                value={formData.full_description_en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_description_en: e.target.value,
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Compétences */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Compétences acquises
            </h2>
            <button
              onClick={addSkill}
              className="flex items-center px-3 py-1 text-sm bg-[#B22234] text-white rounded hover:bg-[#800020] transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <input
                  type="text"
                  value={skill.skill_fr}
                  onChange={(e) =>
                    updateSkill(index, 'skill_fr', e.target.value)
                  }
                  placeholder="Compétence (FR)"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skill.skill_en}
                    onChange={(e) =>
                      updateSkill(index, 'skill_en', e.target.value)
                    }
                    placeholder="Skill (EN)"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Débouchés */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Débouchés professionnels
            </h2>
            <button
              onClick={addCareer}
              className="flex items-center px-3 py-1 text-sm bg-[#B22234] text-white rounded hover:bg-[#800020] transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {careers.map((career, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <input
                  type="text"
                  value={career.career_fr}
                  onChange={(e) =>
                    updateCareer(index, 'career_fr', e.target.value)
                  }
                  placeholder="Débouché (FR)"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={career.career_en}
                    onChange={(e) =>
                      updateCareer(index, 'career_en', e.target.value)
                    }
                    placeholder="Career (EN)"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeCareer(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
