"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon, Upload, Save, ArrowLeft, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  "hero-campus": {
    dimensions: "1920x1080px (16:9)",
    format: "JPG, WebP",
    maxSize: "200 KB",
    notes: [
      "Photo du campus et bâtiment principal",
      "Affichée dans la page À propos",
      "Vue extérieure du bâtiment recommandée",
      "Bonne luminosité et qualité professionnelle",
    ],
  },
  "students-class": {
    dimensions: "1200x800px (3:2)",
    format: "JPG, WebP",
    maxSize: "150 KB",
    notes: [
      "Photo d'étudiants en classe",
      "Affichée dans la page À propos (section pédagogie)",
      "Montrer l'interaction étudiants/professeur",
      "Ambiance studieuse et professionnelle",
    ],
  },
};

export default function ImageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [image, setImage] = useState<SiteImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadImage();
  }, [id]);

  const loadImage = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setImage(data);
    } catch (error) {
      console.error("Error loading image:", error);
      showMessage("error", "Erreur lors du chargement de l'image");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!image) return;

    try {
      setUploading(true);
      const supabase = createClient();

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${image.key}-${Date.now()}.${fileExt}`;
      const filePath = `inses-images/site-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("inses-images")
        .upload(filePath, file, {
          cacheControl: "31536000",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("inses-images")
        .getPublicUrl(filePath);

      // Update local state
      setImage({ ...image, url: publicUrl });

      showMessage("success", "Image uploadée avec succès. N'oubliez pas d'enregistrer !");
    } catch (error) {
      console.error("Error uploading image:", error);
      showMessage("error", "Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!image) return;

    try {
      setSaving(true);
      const supabase = createClient();

      const { error } = await supabase
        .from("site_images")
        .update({
          url: image.url,
          alt_fr: image.alt_fr,
          alt_en: image.alt_en,
          description: image.description,
        })
        .eq("id", image.id);

      if (error) throw error;

      showMessage("success", "Image enregistrée avec succès !");
      setTimeout(() => router.push("/admin/images"), 1500);
    } catch (error) {
      console.error("Error saving image:", error);
      showMessage("error", "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SiteImage, value: string) => {
    if (image) {
      setImage({ ...image, [field]: value });
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B22234] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A4A4A]">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">Image non trouvée</h1>
          <Link
            href="/admin/images"
            className="text-[#B22234] hover:text-[#800020] transition-colors"
          >
            ← Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/images"
          className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#B22234] transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Retour à la liste
        </Link>
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">
          Modifier : {image.key}
        </h1>
        <p className="text-[#4A4A4A]/70">
          {image.description || "Aucune description"}
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Colonne gauche - Aperçu et Upload */}
        <div className="space-y-6">
          {/* Aperçu */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#4A4A4A] mb-4">Aperçu</h2>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.alt_fr}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="text-gray-400" size={64} />
                </div>
              )}
            </div>

            {/* Upload */}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                disabled={uploading}
              />
              <div className="bg-[#B22234] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#800020] transition-colors flex items-center justify-center gap-2 w-full">
                <Upload size={20} />
                {uploading ? "Upload en cours..." : "Upload Nouvelle Image"}
              </div>
            </label>
          </div>

          {/* Recommandations */}
          {IMAGE_RECOMMENDATIONS[image.key] && (
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start gap-2 mb-4">
                <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                <h3 className="font-semibold text-blue-900 text-lg">
                  Recommandations
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-blue-700">Dimensions :</span>
                  <p className="text-sm text-blue-900">{IMAGE_RECOMMENDATIONS[image.key].dimensions}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Format :</span>
                  <p className="text-sm text-blue-900">{IMAGE_RECOMMENDATIONS[image.key].format}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Taille max :</span>
                  <p className="text-sm text-blue-900">{IMAGE_RECOMMENDATIONS[image.key].maxSize}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-2">Notes importantes :</p>
                <ul className="space-y-1">
                  {IMAGE_RECOMMENDATIONS[image.key].notes.map((note, idx) => (
                    <li key={idx} className="text-xs text-blue-800">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite - Formulaire */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#4A4A4A] mb-6">Informations</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  value={image.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                  placeholder="https://... ou /images/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL complète de l'image (upload automatique ou manuelle)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Texte alternatif (FR)
                </label>
                <input
                  type="text"
                  value={image.alt_fr}
                  onChange={(e) => updateField("alt_fr", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                  placeholder="Description en français pour SEO et accessibilité"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Texte alternatif (EN)
                </label>
                <input
                  type="text"
                  value={image.alt_en}
                  onChange={(e) => updateField("alt_en", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                  placeholder="Description in English for SEO and accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={image.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                  rows={3}
                  placeholder="Note interne sur cette image..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note visible uniquement dans l'administration
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#B22234] text-white px-6 py-3 rounded-lg hover:bg-[#800020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              <Save size={20} />
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            <Link
              href="/admin/images"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold"
            >
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
