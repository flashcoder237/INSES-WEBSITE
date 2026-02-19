"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Image as ImageIcon, Play } from "lucide-react";
import { useState, useMemo } from "react";
import { useGallery } from "@/hooks/useGallery";
import { useVideos } from "@/hooks/useVideos";

export default function GalleryPage() {
  const allImages = useGallery();
  const videos = useVideos();
  const [activeCategory, setActiveCategory] = useState("all");

  // Extraire les catégories uniques des images
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(allImages.map((img) => img.category))
    );
    return ["all", ...uniqueCategories];
  }, [allImages]);

  // Traduire les catégories pour l'affichage
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      all: "Toutes",
      events: "Événements",
      campus: "Campus",
      students: "Étudiants",
      other: "Autre",
    };
    return labels[category] || category;
  };

  // Filtrer les images par catégorie
  const filteredItems =
    activeCategory === "all"
      ? allImages
      : allImages.filter((item) => item.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#0000fe] overflow-hidden">
        <div className="container mx-auto px-8 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-white text-[#0000fe] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                Galerie Photos
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Notre <span className="text-white">Galerie</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Découvrez la vie au campus INSES en images
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-20"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-medium transition-all text-sm uppercase tracking-wide ${
                  activeCategory === category
                    ? "bg-[#0000fe] text-white"
                    : "bg-white border border-[#D3D3D3] text-[#4A4A4A] hover:bg-[#F5F5F5]"
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden hover:shadow-md transition-all cursor-pointer aspect-video bg-[#F5F5F5]"
                >
                  {/* Gallery Image */}
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#4A4A4A]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-sm text-white/80">{getCategoryLabel(item.category)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucune image dans la galerie pour le moment</p>
              <p className="text-gray-400 text-sm mt-2">Les images seront bientôt ajoutées</p>
            </div>
          )}

          {/* Video Section - Stanford Style */}
          {videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32"
            >
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
                  Vidéos
                </h2>
                <div className="w-20 h-1 bg-[#0000fe]" />
              </div>

              <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {videos.map((video, index) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video bg-[#F5F5F5] overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                  >
                    {/* Thumbnail si disponible */}
                    {video.thumbnail_url ? (
                      <>
                        <Image
                          src={video.thumbnail_url}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                          <div className="w-20 h-20 bg-[#0000fe] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play size={32} className="text-white ml-1" />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Placeholder sans thumbnail */
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className={`w-20 h-20 ${index % 2 === 0 ? 'bg-[#0000fe]' : 'bg-[#0000b3]'} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <Play size={32} className="text-white ml-1" />
                          </div>
                          <p className="font-medium text-[#4A4A4A] px-4">
                            {video.title}
                          </p>
                          {video.duration && (
                            <p className="text-sm text-[#4A4A4A]/60 mt-2">
                              {video.duration}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {/* Titre en overlay */}
                    {video.thumbnail_url && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="font-medium text-white">{video.title}</p>
                        {video.duration && (
                          <p className="text-sm text-white/80">{video.duration}</p>
                        )}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section - Stanford Style */}
      <section className="py-32 bg-[#B22234] text-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Venez nous rendre visite
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Découvrez nos installations et rencontrez notre équipe pédagogique
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#B22234] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                Prendre rendez-vous
              </motion.a>
              <motion.a
                href="/formations"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#B22234] transition-colors"
              >
                Voir nos formations
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
