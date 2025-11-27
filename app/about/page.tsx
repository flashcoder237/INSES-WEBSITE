"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Target,
  Users,
  BookOpen,
  Heart,
  Lightbulb,
  CheckCircle,
  GraduationCap,
  Building2,
} from "lucide-react";
import { aboutInfo, stats } from "@/data/site-data";

export default function AboutPage() {
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

        <div className="container mx-auto px-6 py-24 relative z-10">
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
              className="inline-block mb-10"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-[#EDF2F4] font-medium">
                  Qui sommes-nous ?
                </span>
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 font-[family-name:var(--font-poppins)]">
              À Propos de l&apos;<span className="bg-gradient-to-r from-[#EE2449] to-white bg-clip-text text-transparent">INSES</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Former les professionnels de santé de demain avec excellence et
              innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#EDF2F4] to-white p-12 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#2B2E42] rounded-xl flex items-center justify-center mb-10">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#2B2E42] mb-4">
                Notre Mission
              </h2>
              <p className="text-[#8D9AAE] text-lg leading-relaxed font-light">
                {aboutInfo.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white p-12 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B2E42] to-[#D80536] rounded-xl flex items-center justify-center mb-10">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#2B2E42] mb-4">
                Notre Vision
              </h2>
              <p className="text-[#8D9AAE] text-lg leading-relaxed font-light">
                {aboutInfo.vision}
              </p>
            </motion.div>
          </div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-96 bg-gradient-to-br from-[#EDF2F4] to-gray-100 rounded-3xl shadow-2xl overflow-hidden mb-20"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Building2 size={80} className="text-[#D80536] mx-auto mb-4" />
                <p className="text-[#8D9AAE] font-medium">
                  [Image: Campus INSES - Bâtiment principal]
                </p>
                <p className="text-sm text-[#8D9AAE] mt-2">
                  hero-campus.jpg - 1920x1080px
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-[#EDF2F4]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E42] mb-4 font-[family-name:var(--font-poppins)]">
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D80536] to-[#2B2E42] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {aboutInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-12 rounded-3xl shadow-2xl hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#2B2E42] rounded-xl flex items-center justify-center mb-10">
                  {index === 0 && <Award className="text-white" size={32} />}
                  {index === 1 && <Target className="text-white" size={32} />}
                  {index === 2 && <Lightbulb className="text-white" size={32} />}
                  {index === 3 && <Heart className="text-white" size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-[#2B2E42] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#8D9AAE] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pédagogie */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E42] mb-4 font-[family-name:var(--font-poppins)]">
              Notre Approche Pédagogique
            </h2>
            <p className="text-lg text-[#8D9AAE] max-w-3xl mx-auto font-light">
              Une formation complète alliant théorie, pratique et stages en milieu
              hospitalier
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-10">
                <div className="w-12 h-12 bg-[#EDF2F4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-[#D80536]" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B2E42] mb-2">
                    Formation Théorique
                  </h3>
                  <p className="text-[#8D9AAE] leading-relaxed">
                    {aboutInfo.pedagogy.theoretical}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-10">
                <div className="w-12 h-12 bg-[#EDF2F4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-[#D80536]" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B2E42] mb-2">
                    Formation Pratique
                  </h3>
                  <p className="text-[#8D9AAE] leading-relaxed">
                    {aboutInfo.pedagogy.practical}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-10">
                <div className="w-12 h-12 bg-[#EDF2F4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-[#D80536]" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2B2E42] mb-2">
                    Évaluation Continue
                  </h3>
                  <p className="text-[#8D9AAE] leading-relaxed">
                    {aboutInfo.pedagogy.evaluation}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-[#EDF2F4] to-gray-100 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={80} className="text-[#D80536] mx-auto mb-4" />
                  <p className="text-[#8D9AAE] font-medium">
                    [Image: Étudiants en classe]
                  </p>
                  <p className="text-sm text-[#8D9AAE] mt-2">
                    students-class.jpg - 1200x800px
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-24 bg-gradient-to-br from-[#2B2E42] to-[#2B2E42] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Nos Partenaires
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-light">
              Des collaborations stratégiques pour garantir une formation pratique
              de qualité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {aboutInfo.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-12 rounded-xl border border-white/20"
              >
                <Building2 size={40} className="text-[#EE2449] mb-4" />
                <h3 className="text-2xl font-bold mb-2">{partner}</h3>
                <p className="text-gray-300">Partenaire de stage et de formation pratique</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E42] mb-4 font-[family-name:var(--font-poppins)]">
              INSES en Chiffres
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-12 bg-gradient-to-br from-[#EDF2F4] to-gray-50 rounded-3xl shadow-2xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#D80536] mb-2 font-[family-name:var(--font-poppins)]">
                  {stat.value}
                </div>
                <div className="text-[#8D9AAE] font-medium text-lg font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-[#EDF2F4]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#D80536] to-[#2B2E42] p-12 rounded-3xl shadow-2xl text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 font-[family-name:var(--font-poppins)]">
              Rejoignez l&apos;INSES
            </h2>
            <p className="text-lg mb-10">
              Faites le premier pas vers une carrière réussie dans le secteur de la
              santé
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center">
              <motion.a
                href="/formations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D80536] px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-2xl transition-all"
              >
                Découvrir nos formations
              </motion.a>
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#D80536] transition-all"
              >
                S&apos;inscrire maintenant
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

