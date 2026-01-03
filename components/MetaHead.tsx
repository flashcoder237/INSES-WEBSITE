'use client'

import Head from 'next/head'
import { useEffect } from 'react'
import { useI18n } from './providers/I18nProvider'

interface MetaHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export default function MetaHead({
  title,
  description,
  image,
  url,
  type = 'article',
}: MetaHeadProps) {
  const { locale } = useI18n();

  // Utiliser useEffect pour mettre à jour les meta tags côté client
  useEffect(() => {
    // Mettre à jour le titre
    document.title = `${title} | INSES`

    // Convertir l'image relative en URL absolue
    const getAbsoluteImageUrl = (imagePath?: string): string | undefined => {
      if (!imagePath) return undefined;

      // Si l'image est déjà une URL absolue, la retourner telle quelle
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }

      // Convertir le chemin relatif en URL absolue
      const baseUrl = 'https://univ-inses.com';
      return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    const absoluteImageUrl = getAbsoluteImageUrl(image);

    // Fonction helper pour set/update meta tag
    const setMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!element) {
        element = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement
      }
      if (!element) {
        element = document.createElement('meta')
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property)
        } else {
          element.setAttribute('name', property)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Meta tags de base
    setMetaTag('description', description)

    // Open Graph tags
    setMetaTag('og:title', title)
    setMetaTag('og:description', description)
    setMetaTag('og:type', type)

    if (url) {
      setMetaTag('og:url', url)
    }

    if (absoluteImageUrl) {
      setMetaTag('og:image', absoluteImageUrl)
      setMetaTag('og:image:width', '1200')
      setMetaTag('og:image:height', '630')
      setMetaTag('og:image:alt', title)
      setMetaTag('og:image:type', 'image/jpeg')
    }

    setMetaTag('og:site_name', 'INSES - Institut National Supérieur de l\'Espoir')
    setMetaTag('og:locale', locale === 'fr' ? 'fr_CM' : 'en_CM')

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)

    if (absoluteImageUrl) {
      setMetaTag('twitter:image', absoluteImageUrl)
      setMetaTag('twitter:image:alt', title)
    }

  }, [title, description, image, url, type, locale])

  return null
}
