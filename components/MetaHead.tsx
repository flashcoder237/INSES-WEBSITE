'use client'

import Head from 'next/head'
import { useEffect } from 'react'

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
  // Utiliser useEffect pour mettre à jour les meta tags côté client
  useEffect(() => {
    // Mettre à jour le titre
    document.title = `${title} | INSES`

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

    if (image) {
      setMetaTag('og:image', image)
      setMetaTag('og:image:width', '1200')
      setMetaTag('og:image:height', '630')
      setMetaTag('og:image:alt', title)
    }

    setMetaTag('og:site_name', 'INSES - Institut National Supérieur de l\'Espoir')
    setMetaTag('og:locale', 'fr_FR')

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)

    if (image) {
      setMetaTag('twitter:image', image)
      setMetaTag('twitter:image:alt', title)
    }

  }, [title, description, image, url, type])

  return null
}
