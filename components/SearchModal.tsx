"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, GraduationCap, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formations } from "@/data/site-data";
import { useI18n } from "./providers/I18nProvider";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useI18n();

  const pages = [
    { title: t('nav.home'), href: "/", description: "Page d'accueil de l'INSES" },
    { title: t('nav.about'), href: "/about", description: "Découvrez notre institut" },
    { title: t('nav.formations'), href: "/formations", description: "Nos programmes de formation" },
    { title: t('nav.gallery'), href: "/gallery", description: "Photos et vidéos du campus" },
    { title: t('nav.inscription'), href: "/inscription", description: "Inscrivez-vous à l'INSES" },
    { title: t('nav.contact'), href: "/contact", description: "Contactez-nous" },
  ];

  const [filteredFormations, setFilteredFormations] = useState(formations);
  const [filteredPages, setFilteredPages] = useState(pages);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFormations(formations.slice(0, 3));
      setFilteredPages(pages.slice(0, 3));
      return;
    }

    const query = searchQuery.toLowerCase();

    const matchedFormations = formations.filter(
      (formation) =>
        formation.title.toLowerCase().includes(query) ||
        formation.shortDescription.toLowerCase().includes(query) ||
        formation.skills.some((skill) => skill.toLowerCase().includes(query))
    );

    const matchedPages = pages.filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query)
    );

    setFilteredFormations(matchedFormations);
    setFilteredPages(matchedPages);
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl mx-4 bg-white dark:bg-[#2A2A2A] shadow-2xl max-h-[80vh] flex flex-col"
          >
            {/* Search Input */}
            <div className="p-6 border-b border-[#D3D3D3] dark:border-[#4A4A4A]">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-[#4A4A4A] dark:text-white flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-[#4A4A4A] dark:text-white placeholder:text-[#4A4A4A]/50 dark:placeholder:text-white/50"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#D3D3D3]/20 dark:hover:bg-[#4A4A4A]/40 transition-colors"
                >
                  <X size={20} className="text-[#4A4A4A] dark:text-white" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Formations Results */}
              {filteredFormations.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#4A4A4A] dark:text-white uppercase tracking-wide mb-3">
                    {t('search.formations')} ({filteredFormations.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredFormations.map((formation) => (
                      <Link
                        key={formation.id}
                        href={`/formations/${formation.slug}`}
                        onClick={onClose}
                        className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#3A3A3A] transition-colors border-l-2 border-transparent hover:border-[#B22234] group"
                      >
                        <div className="flex items-start gap-3">
                          <GraduationCap
                            size={20}
                            className="text-[#B22234] flex-shrink-0 mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-[#4A4A4A] dark:text-white mb-1 group-hover:text-[#B22234] transition-colors">
                              {formation.title}
                            </h4>
                            <p className="text-sm text-[#4A4A4A]/70 dark:text-white/70">
                              {formation.shortDescription}
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-[#4A4A4A]/40 dark:text-white/40 group-hover:text-[#B22234] group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages Results */}
              {filteredPages.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#4A4A4A] dark:text-white uppercase tracking-wide mb-3">
                    {t('search.pages')} ({filteredPages.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredPages.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        onClick={onClose}
                        className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#3A3A3A] transition-colors border-l-2 border-transparent hover:border-[#B22234] group"
                      >
                        <div className="flex items-start gap-3">
                          <FileText
                            size={20}
                            className="text-[#B22234] flex-shrink-0 mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-[#4A4A4A] dark:text-white mb-1 group-hover:text-[#B22234] transition-colors">
                              {page.title}
                            </h4>
                            <p className="text-sm text-[#4A4A4A]/70 dark:text-white/70">
                              {page.description}
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-[#4A4A4A]/40 dark:text-white/40 group-hover:text-[#B22234] group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchQuery.trim() &&
                filteredFormations.length === 0 &&
                filteredPages.length === 0 && (
                  <div className="text-center py-12">
                    <Search size={48} className="text-[#4A4A4A]/30 dark:text-white/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#4A4A4A] dark:text-white mb-2">
                      {t('search.noResults')}
                    </h3>
                    <p className="text-[#4A4A4A]/70 dark:text-white/70">
                      {t('search.tryOtherKeywords')}
                    </p>
                  </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#D3D3D3] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1A1A1A]">
              <p className="text-xs text-[#4A4A4A]/60 dark:text-white/60 text-center">
                {t('search.instructions')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
