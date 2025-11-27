"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";

// Placeholders pour les images de la galerie
const galleryCategories = [
  "Toutes",
  "Campus",
  "Étudiants",
  "Laboratoires",
  "Événements",
  "Diplômes",
];

const galleryItems = [
  {
    id: 1,
    title: "Bâtiment principal INSES",
    category: "Campus",
    filename: "campus-building.jpg",
    size: "1920x1080px",
  },
  {
    id: 2,
    title: "Étudiants en classe théorique",
    category: "Étudiants",
    filename: "students-class.jpg",
    size: "1200x800px",
  },
  {
    id: 3,
    title: "Laboratoire de chimie",
    category: "Laboratoires",
    filename: "lab-chemistry.jpg",
    size: "1200x800px",
  },
  {
    id: 4,
    title: "Cérémonie de remise de diplômes",
    category: "Diplômes",
    filename: "graduation-ceremony.jpg",
    size: "1920x1080px",
  },
  {
    id: 5,
    title: "Étudiants en pratique laboratoire",
    category: "Étudiants",
    filename: "students-lab-practice.jpg",
    size: "1200x800px",
  },
  {
    id: 6,
    title: "Salle de massage thérapeutique",
    category: "Laboratoires",
    filename: "massage-room.jpg",
    size: "1200x800px",
  },
  {
    id: 7,
    title: "Bibliothèque INSES",
    category: "Campus",
    filename: "library.jpg",
    size: "1200x800px",
  },
  {
    id: 8,
    title: "Journée portes ouvertes",
    category: "Événements",
    filename: "open-day.jpg",
    size: "1920x1080px",
  },
  {
    id: 9,
    title: "Équipements médicaux",
    category: "Laboratoires",
    filename: "medical-equipment.jpg",
    size: "1200x800px",
  },
  {
    id: 10,
    title: "Groupe d'étudiants",
    category: "Étudiants",
    filename: "student-group.jpg",
    size: "1200x800px",
  },
  {
    id: 11,
    title: "Cafétéria du campus",
    category: "Campus",
    filename: "cafeteria.jpg",
    size: "1200x800px",
  },
  {
    id: 12,
    title: "Diplômés promotion 2024",
    category: "Diplômes",
    filename: "graduates-2024.jpg",
    size: "1920x1080px",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filteredItems =
    activeCategory === "Toutes"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#B22234] overflow-hidden">
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
              <div className="bg-white text-[#B22234] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
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
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-medium transition-all text-sm uppercase tracking-wide ${
                  activeCategory === category
                    ? "bg-[#B22234] text-white"
                    : "bg-white border border-[#D3D3D3] text-[#4A4A4A] hover:bg-[#F5F5F5]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
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
                  src={`/images/gallery/${item.filename}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#4A4A4A]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Section - Stanford Style */}
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
              <div className="w-20 h-1 bg-[#B22234]" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="relative aspect-video bg-[#F5F5F5] overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#B22234] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="font-medium text-[#4A4A4A]">
                    Visite virtuelle du campus
                  </p>
                  <p className="text-sm text-[#4A4A4A]/60 mt-2">
                    campus-tour.mp4 - 1920x1080px
                  </p>
                </div>
              </div>

              <div className="relative aspect-video bg-[#F5F5F5] overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#800020] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="font-medium text-[#4A4A4A]">
                    Témoignages d&apos;anciens étudiants
                  </p>
                  <p className="text-sm text-[#4A4A4A]/60 mt-2">
                    testimonials.mp4 - 1920x1080px
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
