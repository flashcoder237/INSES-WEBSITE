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
import { useFormation, useFormations } from "@/hooks/useFormations";
import { useI18n } from "@/components/providers/I18nProvider";

export default function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useI18n();
  const formation = useFormation(slug);
  const formations = useFormations();

  if (!formation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#4A4A4A] mb-4">
            {t('formationDetail.notFound')}
          </h1>
          <Link
            href="/formations"
            className="text-[#B22234] hover:text-[#800020] font-semibold"
          >
            {t('formationDetail.backToFormations')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": formation.title,
            "description": formation.shortDescription,
            "provider": {
              "@type": "Organization",
              "name": "INSES - Institut Supérieur de l'Espoir",
              "url": "https://univ-inses.com"
            }
          })
        }}
      />
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#B22234] overflow-hidden">
        <div className="container mx-auto px-8 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm uppercase tracking-wide"
            >
              <ArrowRight size={18} className="rotate-180" />
              {t('formationDetail.backToFormations')}
            </Link>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-white text-[#B22234] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                {t('formationDetail.tag')}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {formation.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {formation.shortDescription}
            </p>

            <div className="flex flex-wrap gap-6 text-white text-[15px]">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{t('common.duration')}: {formation.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>{t('common.level')}: {formation.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>{formation.career.length} {t('common.careers')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description complète - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
                {t('formationDetail.presentationTitle')}
              </h2>
              <div className="w-20 h-1 bg-[#B22234] mb-8" />
              <p className="text-lg text-[#4A4A4A]/70 leading-relaxed">
                {formation.fullDescription}
              </p>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-96 bg-[#F5F5F5] overflow-hidden border-t-4 border-[#B22234]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={64} className="text-[#B22234] mx-auto mb-4" />
                  <p className="text-[#4A4A4A]/70 font-medium">
                    [Image: {formation.title}]
                  </p>
                  <p className="text-sm text-[#4A4A4A]/50 mt-2">
                    formation-{formation.slug}.jpg - 1200x800px
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compétences acquises - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="w-14 h-14 bg-[#B22234] flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-4 text-center">
                {t('formationDetail.skillsTitle')}
              </h2>
              <div className="w-20 h-1 bg-[#B22234] mx-auto mb-6" />
              <p className="text-lg text-[#4A4A4A]/70 text-center">
                {t('formationDetail.skillsSubtitle')}
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
                  className="flex items-start gap-4 bg-white p-6 border-l-4 border-[#B22234] hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="text-[#B22234] flex-shrink-0 mt-1" size={20} />
                  <span className="text-[#4A4A4A]/80 text-[15px]">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Débouchés professionnels - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="w-14 h-14 bg-[#800020] flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-white" size={28} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-4 text-center">
                {t('formationDetail.careersTitle')}
              </h2>
              <div className="w-20 h-1 bg-[#B22234] mx-auto mb-6" />
              <p className="text-lg text-[#4A4A4A]/70 text-center">
                {t('formationDetail.careersSubtitle')}
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
                  className="bg-white p-6 border-t-4 border-[#B22234] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B22234] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-white" size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#4A4A4A]">{career}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formation Details - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6 text-center">
                {t('formationDetail.practicalInfoTitle')}
              </h2>
              <div className="w-20 h-1 bg-[#B22234] mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 border-t-4 border-[#B22234] text-center"
              >
                <Clock size={32} className="text-[#B22234] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{t('common.duration')}</h3>
                <p className="text-[#4A4A4A]/70">{formation.duration}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-10 border-t-4 border-[#800020] text-center"
              >
                <Award size={32} className="text-[#800020] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{t('formationDetail.requiredLevel')}</h3>
                <p className="text-[#4A4A4A]/70">{formation.level}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-10 border-t-4 border-[#CD5C5C] text-center"
              >
                <BookOpen size={32} className="text-[#CD5C5C] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{t('formationDetail.training')}</h3>
                <p className="text-[#4A4A4A]/70">{t('formationDetail.theoryPracticeInternship')}</p>
              </motion.div>
            </div>
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
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {t('formationDetail.interestedTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-12">
              {t('formationDetail.interestedSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Autres formations - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6 text-center">
              {t('formationDetail.otherFormationsTitle')}
            </h2>
            <div className="w-20 h-1 bg-[#B22234] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/formations/${otherFormation.slug}`}>
                    <div className="bg-white p-6 border-t-4 border-[#B22234] hover:shadow-md transition-all h-full">
                      <div className="w-12 h-12 bg-[#B22234] flex items-center justify-center mb-4">
                        <GraduationCap className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-[#4A4A4A] mb-3">
                        {otherFormation.title}
                      </h3>
                      <p className="text-[#4A4A4A]/70 text-sm mb-4">
                        {otherFormation.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-[#B22234] font-semibold text-sm uppercase tracking-wide">
                        En savoir plus
                        <ArrowRight size={14} />
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
