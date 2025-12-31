"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Préchargement DNS pour les domaines externes
    const dnsPrefetch = [
      "https://rpfwhgsltqpumqikkzxe.supabase.co",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    dnsPrefetch.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      document.head.appendChild(link);
    });

    // Préconnexion pour les ressources critiques
    const preconnect = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    preconnect.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // Optimisation des images lazy-loading
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = "lazy";
        }
      });
    }
  }, []);

  return null;
}
