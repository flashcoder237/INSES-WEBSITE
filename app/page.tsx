"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Target,
  Lightbulb,
  Heart,
  TrendingUp,
  Building2,
  Plus,
} from "lucide-react";
import FormationCard from "@/components/FormationCard";
import { useI18n } from "@/components/providers/I18nProvider";
import { useFormations } from "@/hooks/useFormations";
import { useStats } from "@/hooks/useStats";
import { useAboutInfo } from "@/hooks/useAboutInfo";
import { useImages } from "@/hooks/useImages";

export default function Home() {
  const { t, locale } = useI18n();
  const formations = useFormations();
  const stats = useStats();
  const aboutInfo = useAboutInfo();
  const images = useImages();
  const [visibleFormations, setVisibleFormations] = useState(6);

  // Afficher un état de chargement si les données ne sont pas encore chargées
  if (!aboutInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0000fe] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A4A4A] text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section - Stanford Style: Clean & Minimalist */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={images['hero-home']?.url || '/images/hero/hero-home.jpg'}
            alt={locale === 'fr' ? images['hero-home']?.alt_fr : images['hero-home']?.alt_en || 'INSES'}
            fill
            className="object-cover opacity-20"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 py-32 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <div className="bg-[#0000fe] text-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                  {t('home.heroBadge')}
                </div>
              </motion.div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#4A4A4A] dark:text-white mb-8 leading-tight">
                {t('home.heroTitle')}
              </h1>

              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-[#4A4A4A] dark:text-white mb-6 leading-relaxed font-light max-w-3xl">
                {t('home.heroSubtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/formations"
                    className="bg-[#0000fe] text-white px-8 py-4 font-semibold text-base hover:bg-[#0000b3] transition-colors inline-flex items-center gap-2 group"
                  >
                    {t('home.explorePrograms')}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/inscription"
                    className="border-2 border-[#4A4A4A] dark:border-white text-[#4A4A4A] dark:text-white px-8 py-4 font-semibold text-base hover:bg-[#4A4A4A] dark:hover:bg-white hover:text-white dark:hover:text-[#4A4A4A] transition-colors inline-block"
                  >
                    {t('common.registerNow')}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean Stanford Style */}
      <section className="py-20 bg-[#0000b3]">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-[#D3D3D3] text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domaines de Formation - Stanford Clean Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              {t('home.programsTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe]" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Soins et Santé */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-white p-8 border-l-4 border-[#0000fe] hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-[#0000fe] flex items-center justify-center mb-6">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">
                {t('home.healthCare.title')}
              </h3>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                {t('home.healthCare.description')}
              </p>
              <Link
                href="/formations#sante"
                className="inline-flex items-center gap-2 text-[#0000fe] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide"
              >
                {t('common.learnMore')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Médical et Pharmaceutique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white p-8 border-l-4 border-[#0000b3] hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-[#0000b3] flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">
                {t('home.medical.title')}
              </h3>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                {t('home.medical.description')}
              </p>
              <Link
                href="/formations#medical"
                className="inline-flex items-center gap-2 text-[#0000fe] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide"
              >
                {t('common.learnMore')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Sciences et Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="group bg-white p-8 border-l-4 border-[#02baf4] hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-[#02baf4] flex items-center justify-center mb-6">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">
                {t('home.laboratory.title')}
              </h3>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                {t('home.laboratory.description')}
              </p>
              <Link
                href="/formations#sciences"
                className="inline-flex items-center gap-2 text-[#0000fe] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide"
              >
                {t('common.learnMore')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Why Choose INSES - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="inline-block px-4 py-1.5 bg-[#0000fe] text-white text-sm font-semibold uppercase tracking-wider mb-6">
              {t('home.aboutBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              {t('home.aboutTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe]" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
            {aboutInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white p-8 hover:shadow-md transition-all h-full border-t-4 border-[#0000fe]">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#0000fe] flex items-center justify-center mb-6">
                    {index === 0 && <Award className="text-white" size={28} />}
                    {index === 1 && <Target className="text-white" size={28} />}
                    {index === 2 && <Lightbulb className="text-white" size={28} />}
                    {index === 3 && <Heart className="text-white" size={28} />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#4A4A4A]/70 leading-relaxed text-[15px]">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pedagogy Card - Stanford Clean Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-sm"
          >
            <div className="p-12 md:p-16">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <div className="inline-block px-4 py-1.5 bg-[#0000fe] text-white text-sm font-semibold uppercase tracking-wider">
                    {t('home.pedagogyBadge')}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
                    {t('home.pedagogyTitle')}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 border-l-2 border-[#0000fe] pl-6">
                      <div>
                        <h4 className="font-bold text-[#4A4A4A] mb-2 text-lg">
                          {t('home.theoreticalTitle')}
                        </h4>
                        <p className="text-[#4A4A4A]/70 leading-relaxed text-[15px]">
                          {t('home.theoreticalText')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 border-l-2 border-[#0000b3] pl-6">
                      <div>
                        <h4 className="font-bold text-[#4A4A4A] mb-2 text-lg">
                          {t('home.practicalTitle')}
                        </h4>
                        <p className="text-[#4A4A4A]/70 leading-relaxed text-[15px]">
                          {t('home.practicalText')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 border-l-2 border-[#02baf4] pl-6">
                      <div>
                        <h4 className="font-bold text-[#4A4A4A] mb-2 text-lg">
                          {t('home.evaluationTitle')}
                        </h4>
                        <p className="text-[#4A4A4A]/70 leading-relaxed text-[15px]">
                          {t('home.evaluationText')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0000b3] p-10 text-white">
                  <Users size={40} className="mb-6" />
                  <h4 className="text-2xl font-bold mb-8">{t('home.ourPartners')}</h4>
                  <ul className="space-y-3">
                    {aboutInfo.partners.map((partner, index) => (
                      <li key={index} className="flex items-start gap-3 text-[15px]">
                        <Building2 size={18} className="flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{partner}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formations Section - Stanford Clean Design */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="inline-block px-4 py-1.5 bg-[#0000fe] text-white text-sm font-semibold uppercase tracking-wider mb-6">
              {t('home.formationsBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
              {t('home.ourFormationsTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe] mb-6" />
            <p className="text-lg text-[#4A4A4A]/70 max-w-3xl leading-relaxed">
              {t('home.formationsDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {formations.slice(0, visibleFormations).map((formation, index) => (
              <FormationCard
                key={formation.id}
                formation={formation}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* Bouton "Voir +" - Affiché seulement s'il y a plus de formations à charger */}
            {visibleFormations < formations.length && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVisibleFormations(prev => Math.min(prev + 6, formations.length))}
                className="inline-flex items-center gap-2 border-2 border-[#0000fe] text-[#0000fe] px-8 py-4 font-semibold text-base hover:bg-[#0000fe] hover:text-white transition-colors group"
              >
                <Plus className="group-hover:rotate-90 transition-transform" size={18} />
                {t('common.viewMore')}
              </motion.button>
            )}

            {/* Bouton "Voir toutes les formations" */}
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 bg-[#0000fe] text-white px-8 py-4 font-semibold text-base hover:bg-[#0000b3] transition-colors group"
            >
              {t('home.viewAllFormations')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Stanford Clean Style */}
      <section className="relative py-32 overflow-hidden bg-[#0000fe]">
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              {t('home.ctaSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#0000fe] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                {t('common.registerNow')}
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#0000fe] transition-colors"
              >
                {t('common.contactUs')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

