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
import { useI18n } from "@/components/providers/I18nProvider";
import { useAboutInfo } from "@/hooks/useAboutInfo";
import { useStats } from "@/hooks/useStats";
import { useImages } from "@/hooks/useImages";
import MetaHead from "@/components/MetaHead";

export default function AboutPage() {
  const { t, locale } = useI18n();
  const aboutInfo = useAboutInfo();
  const stats = useStats();
  const images = useImages();

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
    <div className="overflow-x-hidden">
      <MetaHead
        title={t('about.heroTitle')}
        description={t('about.heroSubtitle')}
        image={images['hero-about']?.url || images['logo']?.url || '/images/logo/logo-inses.png'}
        url="https://univ-inses.com/about"
        type="website"
      />
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
                {t('about.heroTag')}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('about.heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('about.heroSubtitle')}
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
              className="bg-white p-12 border-l-4 border-[#0000fe] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#0000fe] flex items-center justify-center mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
                {t('about.missionTitle')}
              </h2>
              <p className="text-[#4A4A4A]/70 text-lg leading-relaxed">
                {t('about.missionText')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 border-l-4 border-[#0000b3] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#0000b3] flex items-center justify-center mb-6">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
                {t('about.visionTitle')}
              </h2>
              <p className="text-[#4A4A4A]/70 text-lg leading-relaxed">
                {t('about.visionText')}
              </p>
            </motion.div>
          </div>

          {/* Campus Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-96 bg-[#F5F5F5] overflow-hidden"
          >
            <Image
              src={images['hero-campus']?.url || '/images/about/hero-campus.jpg'}
              alt={locale === 'fr' ? images['hero-campus']?.alt_fr : images['hero-campus']?.alt_en || 'Campus INSES'}
              fill
              className="object-cover"
              quality={85}
            />
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
              {t('about.valuesTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe]" />
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
                className="bg-white p-8 hover:shadow-md transition-all border-t-4 border-[#0000fe]"
              >
                <div className="w-14 h-14 bg-[#0000fe] flex items-center justify-center mb-6">
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
              {t('home.pedagogyTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe] mb-6" />
            <p className="text-lg text-[#4A4A4A]/70 max-w-3xl">
              {t('about.whoWeAreText')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6 border-l-2 border-[#0000fe] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    {t('home.theoreticalTitle')}
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {t('home.theoreticalText')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-l-2 border-[#0000b3] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    {t('home.practicalTitle')}
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {t('home.practicalText')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-l-2 border-[#02baf4] pl-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">
                    {t('home.evaluationTitle')}
                  </h3>
                  <p className="text-[#4A4A4A]/70 leading-relaxed">
                    {t('home.evaluationText')}
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
              <Image
                src={images['students-class']?.url || '/images/about/students-class.jpg'}
                alt={locale === 'fr' ? images['students-class']?.alt_fr : images['students-class']?.alt_en || 'Étudiants INSES'}
                fill
                className="object-cover"
                quality={85}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partenaires - Stanford Style */}
      <section className="py-32 bg-[#0000b3] text-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.partnersTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#02baf4] mb-6" />
            <p className="text-xl text-white/80 max-w-3xl">
              {t('about.partnersSubtitle')}
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
                className="bg-white/10 p-10 border-l-4 border-[#02baf4]"
              >
                <Building2 size={32} className="text-[#02baf4] mb-4" />
                <h3 className="text-2xl font-bold mb-2">{partner}</h3>
                <p className="text-white/70">{t('about.partnerText')}</p>
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
              {t('about.statsTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#0000fe]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-10 bg-white border-t-4 border-[#0000fe] hover:shadow-md transition-all"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#0000fe] mb-3">
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
              {t('about.ctaTitle')}
            </h2>
            <p className="text-xl mb-12 text-white/90">
              {t('about.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/formations"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#B22234] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                {t('home.viewAllFormations')}
              </motion.a>
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#B22234] transition-colors"
              >
                {t('common.registerNow')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
