"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon, Edit, Info, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { SiteImage } from "@/hooks/useImages";

// Recommandations spécifiques par type d'image
const IMAGE_RECOMMENDATIONS: Record<string, {
  dimensions: string;
  format: string;
  maxSize: string;
  notes: string[];
}> = {
  "hero-home": {
    dimensions: "1920x1080px (16:9)",
    format: "JPG, WebP",
    maxSize: "150 KB",
    notes: [
      "Image principale de la page d'accueil",
      "Évitez les textes importants (zone centrale)",
      "Contraste élevé recommandé pour lisibilité",
    ],
  },
  "hero-formations": {
    dimensions: "1920x1080px (16:9)",
    format: "JPG, WebP",
    maxSize: "150 KB",
    notes: [
      "Image de la page formations",
      "Privilégiez des images de salles de classe ou étudiants",
      "Bonne luminosité recommandée",
    ],
  },
  "hero-about": {
    dimensions: "1920x1080px (16:9)",
    format: "JPG, WebP",
    maxSize: "150 KB",
    notes: [
      "Image de la page à propos",
      "Peut montrer le campus ou l'équipe",
      "Image professionnelle et accueillante",
    ],
  },
  "hero-contact": {
    dimensions: "1920x1080px (16:9)",
    format: "JPG, WebP",
    maxSize: "150 KB",
    notes: [
      "Image de la page contact",
      "Montrer le bâtiment ou la façade est idéal",
      "Facile à identifier pour localisation",
    ],
  },
  "logo": {
    dimensions: "512x512px (1:1)",
    format: "PNG (fond transparent)",
    maxSize: "50 KB",
    notes: [
      "Logo principal affiché dans le header",
      "DOIT avoir un fond transparent",
      "Format carré ou légèrement rectangulaire",
      "Haute résolution pour affichage Retina",
    ],
  },
  "og-image": {
    dimensions: "1200x630px (1.91:1)",
    format: "JPG, PNG",
    maxSize: "100 KB",
    notes: [
      "Image affichée lors du partage sur réseaux sociaux",
      "Dimensions EXACTES recommandées par Facebook/Twitter",
      "Texte centré, zone sûre à 40px des bords",
      "Évitez les détails trop fins",
    ],
  },
};

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .order("key", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B22234] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A4A4A]">Chargement des images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">
          Gestion des Images du Site
        </h1>
        <p className="text-[#4A4A4A]/70">
          Cliquez sur une image pour la modifier
        </p>
      </div>

      {/* Liste des images */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aperçu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommandations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {images.map((image) => (
                <tr
                  key={image.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/admin/images/${image.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={image.alt_fr}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="text-gray-400" size={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{image.key}</div>
                    <div className="text-xs text-gray-500">{image.description || "Pas de description"}</div>
                  </td>
                  <td className="px-6 py-4">
                    {IMAGE_RECOMMENDATIONS[image.key] && (
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-1">
                          <Info size={12} className="text-blue-600" />
                          <span className="text-gray-600">{IMAGE_RECOMMENDATIONS[image.key].dimensions}</span>
                        </div>
                        <div className="text-gray-500">{IMAGE_RECOMMENDATIONS[image.key].maxSize}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 truncate max-w-xs">
                      {image.url || <span className="text-gray-400 italic">Pas d'URL</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/images/${image.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[#B22234] hover:text-[#800020] transition-colors"
                    >
                      <Edit size={16} />
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
        <h3 className="font-semibold text-[#4A4A4A] mb-3 flex items-center gap-2">
          <Info className="text-purple-600" size={20} />
          💡 Conseils Généraux pour l'Optimisation des Images
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Outils de Compression</h4>
            <ul className="text-sm text-[#4A4A4A]/70 space-y-1">
              <li>• <a href="https://tinypng.com" target="_blank" className="text-blue-600 hover:underline">TinyPNG</a> - Compression PNG/JPG</li>
              <li>• <a href="https://squoosh.app" target="_blank" className="text-blue-600 hover:underline">Squoosh</a> - Conversion WebP/AVIF</li>
              <li>• <a href="https://www.iloveimg.com/compress-image" target="_blank" className="text-blue-600 hover:underline">iLoveIMG</a> - Compression par lot</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Bonnes Pratiques</h4>
            <ul className="text-sm text-[#4A4A4A]/70 space-y-1">
              <li>• Toujours compresser avant upload</li>
              <li>• WebP recommandé pour les photos (70-80% qualité)</li>
              <li>• PNG uniquement pour logos/transparence</li>
              <li>• Textes alternatifs descriptifs pour SEO</li>
              <li>• Tester le rendu sur mobile et desktop</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
