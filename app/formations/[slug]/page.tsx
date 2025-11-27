"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import {
  GraduationCap,
  Clock,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
} from "lucide-react";
import { formations } from "@/data/site-data";

export default function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const formation = formations.find((f) => f.slug === slug);

  if (!formation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Formation non trouvée
          </h1>
          <Link
            href="/formations"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Retour aux formations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 overflow-hidden">
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
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
              Retour aux formations
            </Link>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-red-200 font-medium">
                  Formation Professionnelle
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-poppins)]">
              {formation.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {formation.shortDescription}
            </p>

            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>Durée: {formation.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>Niveau: {formation.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={20} />
                <span>{formation.career.length} débouchés</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description complète */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-poppins)]">
                Présentation de la formation
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-900 mb-8" />
              <p className="text-lg text-gray-700 leading-relaxed">
                {formation.fullDescription}
              </p>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-red-100 to-gray-100 rounded-2xl shadow-xl overflow-hidden mb-16"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={80} className="text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    [Image: {formation.title}]
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    formation-{formation.slug}.jpg - 1200x800px
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compétences acquises */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
                Compétences acquises
              </h2>
              <p className="text-lg text-gray-600">
                Ce que vous saurez faire à la fin de cette formation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {formation.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Débouchés professionnels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-white" size={32} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
                Débouchés professionnels
              </h2>
              <p className="text-lg text-gray-600">
                Les opportunités de carrière qui s&apos;offrent à vous
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {formation.career.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-lg border border-red-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{career}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formation Details */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
                Informations pratiques
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <Clock size={40} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Durée</h3>
                <p className="text-gray-600">{formation.duration}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <Award size={40} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Niveau requis</h3>
                <p className="text-gray-600">{formation.level}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <BookOpen size={40} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Formation</h3>
                <p className="text-gray-600">Théorie + Pratique + Stages</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Intéressé par cette formation ?
            </h2>
            <p className="text-xl text-gray-200 mb-12">
              Inscrivez-vous dès maintenant ou contactez-nous pour plus
              d&apos;informations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                S&apos;inscrire maintenant
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all"
              >
                Nous contacter
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autres formations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
              Découvrez nos autres formations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {formations
              .filter((f) => f.slug !== slug)
              .slice(0, 3)
              .map((otherFormation, index) => (
                <motion.div
                  key={otherFormation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/formations/${otherFormation.slug}`}>
                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-gray-900 rounded-lg flex items-center justify-center mb-4">
                        <GraduationCap className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {otherFormation.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {otherFormation.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
                        En savoir plus
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
