"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Edit,
  Save,
  X,
  Plus,
  Languages,
  Filter,
  Check,
} from "lucide-react";

interface Translation {
  id: string;
  key: string;
  category: string;
  section: string | null;
  content_fr: string;
  content_en: string;
  description: string | null;
  content_type: string;
  is_active: boolean;
}

export default function TranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [filteredTranslations, setFilteredTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    content_fr: string;
    content_en: string;
  }>({ content_fr: "", content_en: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadTranslations();
  }, []);

  useEffect(() => {
    filterTranslations();
  }, [translations, searchTerm, selectedCategory]);

  const loadTranslations = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("category")
        .order("key");

      if (error) throw error;
      setTranslations(data || []);
    } catch (error) {
      console.error("Error loading translations:", error);
      showMessage("error", "Erreur lors du chargement des traductions");
    } finally {
      setLoading(false);
    }
  };

  const filterTranslations = () => {
    let filtered = translations;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.key.toLowerCase().includes(term) ||
          t.content_fr.toLowerCase().includes(term) ||
          t.content_en.toLowerCase().includes(term)
      );
    }

    setFilteredTranslations(filtered);
  };

  const handleEdit = (translation: Translation) => {
    setEditingId(translation.id);
    setEditForm({
      content_fr: translation.content_fr,
      content_en: translation.content_en,
    });
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      setSaving(true);
      const supabase = createClient();

      const { error } = await supabase
        .from("site_content")
        .update({
          content_fr: editForm.content_fr,
          content_en: editForm.content_en,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId);

      if (error) throw error;

      showMessage("success", "Traduction mise à jour avec succès");
      setEditingId(null);
      loadTranslations();
    } catch (error) {
      console.error("Error saving translation:", error);
      showMessage("error", "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ content_fr: "", content_en: "" });
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const categories = Array.from(new Set(translations.map((t) => t.category))).sort();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      common: "bg-blue-100 text-blue-800",
      home: "bg-green-100 text-green-800",
      about: "bg-purple-100 text-purple-800",
      formations: "bg-yellow-100 text-yellow-800",
      contact: "bg-red-100 text-red-800",
      nav: "bg-gray-100 text-gray-800",
      footer: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B22234] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A4A4A]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Languages className="text-[#B22234]" size={32} />
          <h1 className="text-3xl font-bold text-[#4A4A4A]">
            Gestion des Traductions
          </h1>
        </div>
        <p className="text-[#4A4A4A]/70">
          Gérez toutes les traductions du site en français et en anglais
        </p>
      </div>

      {/* Message */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A]/70 mb-1">Total Traductions</p>
              <p className="text-3xl font-bold text-[#B22234]">{translations.length}</p>
            </div>
            <Languages className="text-[#B22234]/20" size={48} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A]/70 mb-1">Catégories</p>
              <p className="text-3xl font-bold text-[#B22234]">{categories.length}</p>
            </div>
            <Filter className="text-[#B22234]/20" size={48} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A]/70 mb-1">Actives</p>
              <p className="text-3xl font-bold text-[#B22234]">
                {translations.filter((t) => t.is_active).length}
              </p>
            </div>
            <Check className="text-[#B22234]/20" size={48} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
              <Search className="inline mr-2" size={16} />
              Rechercher
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par clé ou contenu..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
              <Filter className="inline mr-2" size={16} />
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234]"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({translations.filter((t) => t.category === cat).length})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Translations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F5]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">
                  Clé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">
                  Français
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">
                  English
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTranslations.map((translation) => (
                <tr key={translation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-[#4A4A4A]">
                        {translation.key}
                      </div>
                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getCategoryColor(
                          translation.category
                        )}`}
                      >
                        {translation.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === translation.id ? (
                      <textarea
                        value={editForm.content_fr}
                        onChange={(e) =>
                          setEditForm({ ...editForm, content_fr: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                        rows={3}
                      />
                    ) : (
                      <div className="text-sm text-[#4A4A4A]">
                        {translation.content_fr}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === translation.id ? (
                      <textarea
                        value={editForm.content_en}
                        onChange={(e) =>
                          setEditForm({ ...editForm, content_en: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B22234]"
                        rows={3}
                      />
                    ) : (
                      <div className="text-sm text-[#4A4A4A]">
                        {translation.content_en}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === translation.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <Save size={14} />
                          Sauvegarder
                        </button>
                        <button
                          onClick={handleCancel}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          <X size={14} />
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(translation)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#B22234] text-white rounded hover:bg-[#800020] transition-colors"
                      >
                        <Edit size={14} />
                        Éditer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTranslations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#4A4A4A]/70">
            Aucune traduction trouvée avec ces critères
          </p>
        </div>
      )}
    </div>
  );
}
