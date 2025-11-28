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
import { useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { useFormations } from "@/hooks/useFormations";

export default function FormationsPage() {
  const { t } = useI18n();
  const formations = useFormations();
  const [filter, setFilter] = useState("all");

  const filteredFormations = formations.filter((formation) => {
    if (filter === "all") return true;
    if (filter === "2ans") return formation.duration.includes("2");
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
                {t('formations.heroTag')}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('formations.heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('formations.heroSubtitle')}
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
              <span className="font-medium text-sm uppercase tracking-wide">{t('formations.filterAll')}:</span>
            </div>
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 font-medium transition-all text-sm uppercase tracking-wide ${
                filter === "all"
                  ? "bg-[#B22234] text-white"
                  : "bg-white border border-[#D3D3D3] text-[#4A4A4A] hover:bg-[#F5F5F5]"
              }`}
            >
              {t('formations.filterAll')}
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
                        <span>{t('common.duration')}: {formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]/70">
                        <Award size={14} />
                        <span>{t('common.level')}: {formation.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]/70">
                        <BookOpen size={14} />
                        <span>{formation.career.length} {t('common.careers')}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#B22234] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide">
                      {t('common.learnMore')}
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
              {t('home.aboutTitle')}
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
                {t('home.pedagogyTitle')}
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                {t('formationDetail.theoryPracticeInternship')}
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
                {t('home.excellence.title')}
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                {t('home.excellence.description')}
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
                {t('home.support.title')}
              </h3>
              <p className="text-[#4A4A4A]/70 text-center text-[15px]">
                {t('home.support.description')}
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
              {t('formations.ctaTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-12">
              {t('formations.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#B22234] px-8 py-4 font-semibold text-base hover:bg-[#D3D3D3] transition-colors"
              >
                {t('common.registerNow')}
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 font-semibold text-base hover:bg-white hover:text-[#B22234] transition-colors"
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
