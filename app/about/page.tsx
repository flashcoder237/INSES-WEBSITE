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
                Qui sommes-nous ?
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              À Propos de l&apos;<span className="text-white">INSES</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Former les professionnels de santé de demain avec excellence et
              innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 border-l-4 border-[#B22234] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#B22234] flex items-center justify-center mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
                Notre Mission
              </h2>
              <p className="text-[#4A4A4A]/70 text-lg leading-relaxed">
                {aboutInfo.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 border-l-4 border-[#800020] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#800020] flex items-center justify-center mb-6">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
                Notre Vision
              </h2>
              <p className="text-[#4A4A4A]/70 text-lg leading-relaxed">
                {aboutInfo.vision}
              </p>
            </motion.div>
          </div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-96 bg-[#F5F5F5] overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Building2 size={64} className="text-[#B22234] mx-auto mb-4" />
                <p className="text-[#4A4A4A]/70 font-medium">
                  [Image: Campus INSES - Bâtiment principal]
                </p>
                <p className="text-sm text-[#4A4A4A]/50 mt-2">
                  hero-campus.jpg - 1920x1080px
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valeurs - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              Nos Valeurs
            </h2>
            <div className="w-20 h-1 bg-[#B22234]" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {aboutInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white p-8 hover:shadow-md transition-all border-t-4 border-[#B22234]"
              >
                <div className="w-14 h-14 bg-[#B22234] flex items-center justify-center mb-6">
                  {index === 0 && <Award className="text-white" size={28} />}
                  {index === 1 && <Target className="text-white" size={28} />}
                  {index === 2 && <Lightbulb className="text-white" size={28} />}
                  {index === 3 && <Heart className="text-white" size={28} />}
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#4A4A4A]/70 leading-relaxed text-[15px]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pédagogie - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              Notre Approche Pédagogique
            </h2>
            <div className="w-20 h-1 bg-[#B22234] mb-6" />
            <p className="text-lg text-[#4A4A4A]/70 max-w-3xl">
              Une formation complète alliant théorie, pratique et stages en milieu
              hospitalier
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6 border-l-2 border-[#B22234] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    Formation Théorique
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {aboutInfo.pedagogy.theoretical}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-l-2 border-[#800020] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    Formation Pratique
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {aboutInfo.pedagogy.practical}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-l-2 border-[#CD5C5C] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    Évaluation Continue
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {aboutInfo.pedagogy.evaluation}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 bg-[#F5F5F5] overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={64} className="text-[#B22234] mx-auto mb-4" />
                  <p className="text-[#4A4A4A]/70 font-medium">
                    [Image: Étudiants en classe]
                  </p>
                  <p className="text-sm text-[#4A4A4A]/50 mt-2">
                    students-class.jpg - 1200x800px
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partenaires - Stanford Style */}
      <section className="py-32 bg-[#4A4A4A] text-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Partenaires
            </h2>
            <div className="w-20 h-1 bg-[#B22234] mb-6" />
            <p className="text-xl text-white/80 max-w-3xl">
              Des collaborations stratégiques pour garantir une formation pratique
              de qualité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {aboutInfo.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 p-10 border-l-4 border-[#B22234]"
              >
                <Building2 size={32} className="text-[#B22234] mb-4" />
                <h3 className="text-2xl font-bold mb-2">{partner}</h3>
                <p className="text-white/70">Partenaire de stage et de formation pratique</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              INSES en Chiffres
            </h2>
            <div className="w-20 h-1 bg-[#B22234]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-10 bg-white border-t-4 border-[#B22234] hover:shadow-md transition-all"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#B22234] mb-3">
                  {stat.value}
                </div>
                <div className="text-[#4A4A4A]/70 font-medium text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Stanford Style */}
      <section className="py-32 bg-[#B22234]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Rejoignez l&apos;INSES
            </h2>
            <p className="text-xl mb-12 text-white/90">
              Faites le premier pas vers une carrière réussie dans le secteur de la
              santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/formations"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#B22234] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                Découvrir nos formations
              </motion.a>
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#B22234] transition-colors"
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
