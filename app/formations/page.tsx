"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";
import { formations } from "@/data/site-data";
import { useState } from "react";

export default function FormationsPage() {
  const [filter, setFilter] = useState("all");

  const filteredFormations = formations.filter((formation) => {
    if (filter === "all") return true;
    if (filter === "2ans") return formation.duration === "2 ans";
    return true;
  });

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
                <span className="text-[#EDF2F4] font-medium">
                  Choisissez votre formation
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-poppins)]">
              Nos{" "}
              <span className="bg-gradient-to-r from-[#EE2449] to-white bg-clip-text text-transparent">
                Formations
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              6 filières professionnelles dans le secteur de la santé
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 text-[#8D9AAE]">
              <Filter size={20} />
              <span className="font-medium">Filtrer par:</span>
            </div>
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === "all"
                  ? "bg-[#D80536] text-white shadow-lg"
                  : "bg-white text-[#8D9AAE] hover:bg-gray-100"
              }`}
            >
              Toutes les formations
            </button>
            <button
              onClick={() => setFilter("2ans")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === "2ans"
                  ? "bg-[#D80536] text-white shadow-lg"
                  : "bg-white text-[#8D9AAE] hover:bg-gray-100"
              }`}
            >
              2 ans
            </button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/formations/${formation.slug}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#2B2E42] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <GraduationCap className="text-white" size={32} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#2B2E42] mb-3 group-hover:text-[#D80536] transition-colors">
                      {formation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#8D9AAE] mb-6 flex-grow leading-relaxed">
                      {formation.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#8D9AAE]">
                        <Clock size={16} />
                        <span>Durée: {formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#8D9AAE]">
                        <Award size={16} />
                        <span>Niveau: {formation.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#8D9AAE]">
                        <BookOpen size={16} />
                        <span>{formation.career.length} débouchés</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all">
                      En savoir plus
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose INSES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2B2E42] mb-4 font-[family-name:var(--font-poppins)]">
              Pourquoi choisir nos formations ?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D80536] to-[#2B2E42] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#EDF2F4] to-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#2B2E42] rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2B2E42] mb-3">
                Formation Complète
              </h3>
              <p className="text-[#8D9AAE]">
                Théorie et pratique combinées avec des stages en milieu
                hospitalier
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B2E42] to-[#D80536] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2B2E42] mb-3">
                Diplôme Reconnu
              </h3>
              <p className="text-[#8D9AAE]">
                Diplômes professionnels reconnus et recherchés sur le marché du
                travail
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#EDF2F4] to-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#2B2E42] rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2B2E42] mb-3">
                Accompagnement
              </h3>
              <p className="text-[#8D9AAE]">
                Suivi personnalisé tout au long de votre parcours de formation
              </p>
            </motion.div>
          </div>
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
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              Inscrivez-vous dès maintenant et démarrez votre carrière dans la
              santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D80536] px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                S&apos;inscrire maintenant
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#D80536] transition-all"
              >
                Nous contacter
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

