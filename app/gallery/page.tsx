"use client";

import { motion } from "framer-motion";
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#2B2E42] via-[#2B2E42] to-[#2B2E42] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[#D80536]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-[#EDF2F4] font-medium">Galerie Photos</span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-poppins)]">
              Notre{" "}
              <span className="bg-gradient-to-r from-[#EE2449] to-white bg-clip-text text-transparent">
                Galerie
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Découvrez la vie au campus INSES en images
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#D80536] to-[#2B2E42] text-white shadow-lg"
                    : "bg-gray-100 text-[#8D9AAE] hover:bg-gray-200"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer aspect-video bg-gradient-to-br from-[#EDF2F4] to-gray-100"
              >
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <ImageIcon size={60} className="text-[#D80536] mb-4" />
                  <p className="text-center font-medium text-[#8D9AAE] mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#8D9AAE]">{item.filename}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.size}</p>
                  <span className="mt-3 px-3 py-1 bg-[#EDF2F4] text-[#D80536] text-xs rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E42]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-sm text-gray-300">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Section Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-4xl font-bold text-[#2B2E42] mb-12 text-center font-[family-name:var(--font-poppins)]">
              Vidéos
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="relative aspect-video bg-gradient-to-br from-[#EDF2F4] to-gray-100 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#D80536] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="font-medium text-[#8D9AAE]">
                    Visite virtuelle du campus
                  </p>
                  <p className="text-sm text-[#8D9AAE] mt-2">
                    campus-tour.mp4 - 1920x1080px
                  </p>
                </div>
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-[#EDF2F4] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#2B2E42] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="font-medium text-[#8D9AAE]">
                    Témoignages d&apos;anciens étudiants
                  </p>
                  <p className="text-sm text-[#8D9AAE] mt-2">
                    testimonials.mp4 - 1920x1080px
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2B2E42] via-[#2B2E42] to-[#2B2E42] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Venez nous rendre visite
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              Découvrez nos installations et rencontrez notre équipe pédagogique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D80536] px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Prendre rendez-vous
              </motion.a>
              <motion.a
                href="/formations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#D80536] transition-all"
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

