'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  /** Chemin actuel de l'image (URL complète) */
  value?: string
  /** Callback appelé quand l'image change */
  onChange: (url: string) => void
  /** Dossier dans le bucket (ex: "news", "gallery/events") */
  folder: string
  /** Largeur de la prévisualisation en pixels */
  previewWidth?: number
  /** Hauteur de la prévisualisation en pixels */
  previewHeight?: number
  /** Taille maximale en MB */
  maxSizeMB?: number
  /** Formats acceptés */
  accept?: string
}

export default function ImageUpload({
  value,
  onChange,
  folder,
  previewWidth = 400,
  previewHeight = 300,
  maxSizeMB = 5,
  accept = 'image/jpeg,image/png,image/webp,image/gif',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validation de la taille
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      setError(`L'image ne doit pas dépasser ${maxSizeMB} MB (${fileSizeMB.toFixed(2)} MB)`)
      return
    }

    // Validation du type
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image')
      return
    }

    // Créer une prévisualisation locale
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload vers Supabase
    await uploadToSupabase(file)
  }

  const uploadToSupabase = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload le fichier
      const { data, error: uploadError } = await supabase.storage
        .from('inses-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Obtenir l'URL publique
      const { data: publicData } = supabase.storage
        .from('inses-images')
        .getPublicUrl(data.path)

      // Notifier le parent
      onChange(publicData.publicUrl)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Erreur lors de l\'upload')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!value) return

    try {
      // Extraire le chemin du fichier depuis l'URL
      const url = new URL(value)
      const pathParts = url.pathname.split('/inses-images/')
      if (pathParts.length > 1) {
        const filePath = pathParts[1]

        // Supprimer de Supabase Storage
        const { error: deleteError } = await supabase.storage
          .from('inses-images')
          .remove([filePath])

        if (deleteError) {
          console.error('Delete error:', deleteError)
        }
      }
    } catch (err) {
      console.error('Error parsing URL:', err)
    }

    // Réinitialiser l'état
    setPreview(null)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Zone d'upload */}
      {!preview ? (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`
              flex flex-col items-center justify-center
              w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
              transition-colors
              ${uploading
                ? 'bg-gray-50 border-gray-300 cursor-not-allowed'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-[#B22234]'
              }
            `}
          >
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-[#B22234] animate-spin mb-4" />
                <p className="text-sm text-gray-600">Upload en cours...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Cliquez pour sélectionner une image
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WebP, GIF jusqu'à {maxSizeMB} MB
                </p>
              </>
            )}
          </label>
        </div>
      ) : (
        // Prévisualisation
        <div className="relative">
          <div
            className="relative rounded-lg overflow-hidden border-2 border-gray-200"
            style={{ width: previewWidth, height: previewHeight }}
          >
            {preview.startsWith('data:') ? (
              // Preview locale (avant upload)
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              // Image depuis Supabase
              <Image
                src={preview}
                alt="Uploaded"
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Bouton de suppression */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
            title="Supprimer l'image"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bouton de remplacement */}
          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              id="image-replace"
            />
            <label
              htmlFor="image-replace"
              className={`
                inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                border border-gray-300 rounded-lg cursor-pointer
                transition-colors
                ${uploading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <ImageIcon className="w-4 h-4" />
              Remplacer l'image
            </label>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* URL actuelle (pour debug) */}
      {value && !error && (
        <div className="text-xs text-gray-500 break-all">
          URL: {value}
        </div>
      )}
    </div>
  )
}
