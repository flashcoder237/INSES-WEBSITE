"use client";

import { useEffect } from "react";
import { useI18n } from "./providers/I18nProvider";
import { usePathname } from "next/navigation";

export default function DynamicMetadata() {
  const { locale } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = locale;

    // Fonction helper pour set/update meta tag
    const setMetaTag = (property: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement;
      if (!element) {
        element = document.querySelector(
          `meta[name="${property}"]`
        ) as HTMLMetaElement;
      }
      if (!element) {
        element = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Métadonnées selon la langue
    const metadata = {
      fr: {
        title: "INSES - Institut Supérieur de l'Espoir",
        description:
          "Institut de formation professionnelle pour les métiers de la santé à Douala, Cameroun. Formations en délégué médical, secrétariat médical, massothérapie, et plus.",
        ogTitle: "INSES - Institut Supérieur de l'Espoir",
        ogDescription:
          "Votre avenir dans les métiers de la santé commence ici. Découvrez nos formations.",
        locale: "fr_CM",
      },
      en: {
        title: "INSES - Higher Institute of Hope",
        description:
          "Professional training institute for healthcare professions in Douala, Cameroon. Programs in medical representative, medical secretary, massage therapy, and more.",
        ogTitle: "INSES - Higher Institute of Hope",
        ogDescription:
          "Your future in healthcare careers starts here. Discover our programs.",
        locale: "en_CM",
      },
    };

    const meta = metadata[locale as keyof typeof metadata];

    // Mettre à jour le titre si on est sur la page d'accueil
    if (pathname === "/" || pathname === "") {
      document.title = meta.title;
    }

    // Mettre à jour les meta tags
    setMetaTag("description", meta.description);
    setMetaTag("og:title", meta.ogTitle);
    setMetaTag("og:description", meta.ogDescription);
    setMetaTag("og:locale", meta.locale);
    setMetaTag("twitter:title", meta.ogTitle);
    setMetaTag("twitter:description", meta.ogDescription);

    // Alternate languages
    const alternateLang = locale === "fr" ? "en" : "fr";
    let linkAlternate = document.querySelector(
      `link[rel="alternate"][hreflang="${alternateLang}"]`
    ) as HTMLLinkElement;
    if (!linkAlternate) {
      linkAlternate = document.createElement("link");
      linkAlternate.rel = "alternate";
      linkAlternate.hreflang = alternateLang;
      document.head.appendChild(linkAlternate);
    }
    linkAlternate.href = `https://univ-inses.com/${alternateLang === "en" ? "en" : ""}`;
  }, [locale, pathname]);

  return null;
}
