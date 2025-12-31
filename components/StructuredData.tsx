"use client";

import { useI18n } from "./providers/I18nProvider";

export default function StructuredData() {
  const { locale } = useI18n();

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": locale === "fr" ? "Institut Supérieur de l'Espoir" : "Higher Institute of Hope",
    "alternateName": "INSES",
    "url": "https://univ-inses.com",
    "logo": "https://univ-inses.com/images/logo/logo-inses.png",
    "description": locale === "fr"
      ? "Institut de formation professionnelle pour les métiers de la santé à Douala, Cameroun"
      : "Professional training institute for healthcare professions in Douala, Cameroon",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bonabéri",
      "addressLocality": "Douala",
      "addressCountry": "CM"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+237-233-39-24-24",
      "contactType": "Admissions",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/inses.cm",
      "https://www.linkedin.com/company/inses"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "INSES",
    "url": "https://univ-inses.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://univ-inses.com/formations?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "fr" ? "Accueil" : "Home",
        "item": "https://univ-inses.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
