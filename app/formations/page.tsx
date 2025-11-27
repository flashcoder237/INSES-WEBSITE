"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#B22234] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-formations.jpg"
            alt="Formations professionnelles INSES"
            fill
            className="object-cover opacity-20"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[#B22234]/80" />
        </div>

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
                Choisissez votre formation
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Nos <span className="text-white">Formations</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              6 filières professionnelles dans le secteur de la santé
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formations Grid - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <div className="flex items-center gap-2 text-[#4A4A4A]">
              <Filter size={18} />
              <span className="font-medium text-sm uppercase tracking-wide">Filtrer par:</span>
            </div>
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 font-medium transition-all text-sm uppercase tracking-wide ${
                filter === "all"
                  ? "bg-[#B22234] text-white"
                  : "bg-white border border-[#D3D3D3] text-[#4A4A4A] hover:bg-[#F5F5F5]"
              }`}
            >
              Toutes les formations
            </button>
            <button
              onClick={() => setFilter("2ans")}
              className={`px-6 py-2 font-medium transition-all text-sm uppercase tracking-wide ${
                filter === "2ans"
                  ? "bg-[#B22234] text-white"
                  : "bg-white border border-[#D3D3D3] text-[#4A4A4A] hover:bg-[#F5F5F5]"
              }`}
            >
              2 ans
            </button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredFormations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Link href={`/formations/${formation.slug}`}>
                  <div className="bg-white p-10 hover:shadow-md transition-all border-t-4 border-[#B22234] h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-[#B22234] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      <GraduationCap className="text-white" size={28} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4 group-hover:text-[#B22234] transition-colors">
                      {formation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#4A4A4A]/70 mb-8 flex-grow leading-relaxed text-[15px]">
                      {formation.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]/70">
                        <Clock size={14} />
                        <span>Durée: {formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]/70">
                        <Award size={14} />
                        <span>Niveau: {formation.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]/70">
                        <BookOpen size={14} />
                        <span>{formation.career.length} débouchés</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#B22234] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide">
                      En savoir plus
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose INSES - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              Pourquoi choisir nos formations ?
            </h2>
            <div className="w-20 h-1 bg-[#B22234]" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 border-t-4 border-[#B22234] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#B22234] flex items-center justify-center mx-auto mb-8">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4 text-center">
                Formation Complète
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                Théorie et pratique combinées avec des stages en milieu
                hospitalier
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 border-t-4 border-[#800020] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#800020] flex items-center justify-center mx-auto mb-8">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4 text-center">
                Diplôme Reconnu
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                Diplômes professionnels reconnus et recherchés sur le marché du
                travail
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 border-t-4 border-[#CD5C5C] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#CD5C5C] flex items-center justify-center mx-auto mb-8">
                <GraduationCap className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4 text-center">
                Accompagnement
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                Suivi personnalisé tout au long de votre parcours de formation
              </p>
            </motion.div>
          </div>
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
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Inscrivez-vous dès maintenant et démarrez votre carrière dans la
              santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#B22234] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                S&apos;inscrire maintenant
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#B22234] transition-colors"
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
