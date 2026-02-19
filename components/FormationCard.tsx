"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Formation } from "@/data/site-data";
import { useI18n } from "./providers/I18nProvider";

// Mapping des slugs de formations vers leurs images
const formationImages: Record<string, string> = {
  "delegue-medical": "/images/formations/formation-delegue-medical.jpg",
  "secretariat-medical": "/images/formations/formation-secretariat-medical.jpg",
  "massotherapie": "/images/formations/formation-massotherapie.jpg",
  "aide-chimiste-biologiste": "/images/formations/formation-aide-chimiste-biologiste.jpg",
  "dietetique-nutrition": "/images/formations/formation-dietetique-nutrition.jpg",
  "vendeur-pharmacie": "/images/formations/formation-vendeur-pharmacie.jpg",
};

interface FormationCardProps {
  formation: Formation;
  index?: number;
  centerSlug?: string;
}

export default function FormationCard({ formation, index = 0, centerSlug }: FormationCardProps) {
  const { t } = useI18n();
  const formationUrl = centerSlug ? `/${centerSlug}/formations/${formation.slug}` : `/formations/${formation.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link href={formationUrl}>
        <div className="relative h-full bg-white dark:bg-[#2A2A2A] overflow-hidden hover:shadow-md transition-all border-t-4 border-[#0000fe]">
          {/* Image with overlay */}
          <div className="relative h-64 overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
            {/* Formation Image */}
            <Image
              src={formationImages[formation.slug] || "/images/formations/default.jpg"}
              alt={`Formation ${formation.title} - INSES`}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Duration badge */}
            <div className="absolute top-4 right-4 bg-[#0000fe] text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
              <Clock size={14} />
              {formation.duration}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-[#4A4A4A] dark:text-white mb-4 group-hover:text-[#0000fe] transition-colors">
              {formation.title}
            </h3>

            <p className="text-[#4A4A4A]/70 dark:text-white/70 mb-6 line-clamp-2 leading-relaxed text-[15px]">
              {formation.shortDescription}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between text-sm text-[#4A4A4A]/60 dark:text-white/60 mb-6 pb-6 border-b border-[#D3D3D3] dark:border-[#4A4A4A]">
              <span className="font-medium">{formation.level}</span>
              <span>{formation.career.length} {t('common.careers')}</span>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[#0000fe] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide">
              {t('common.learnMore')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Alternative card style with horizontal layout for featured formations
export function FormationCardHorizontal({ formation, index = 0, centerSlug }: FormationCardProps) {
  const { t } = useI18n();
  const formationUrl = centerSlug ? `/${centerSlug}/formations/${formation.slug}` : `/formations/${formation.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={formationUrl}>
        <div className="relative bg-white dark:bg-[#2A2A2A] overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row h-full border-l-4 border-[#0000fe]">
          {/* Image section */}
          <div className="relative w-full md:w-2/5 h-72 md:h-auto overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
            <Image
              src={formationImages[formation.slug] || "/images/formations/default.jpg"}
              alt={`Formation ${formation.title} - INSES`}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            {/* Number indicator for featured */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-[#0000fe] flex items-center justify-center text-white font-bold text-lg">
              {(index + 1).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-10 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#0000fe] flex items-center justify-center">
                  <BookOpen className="text-white" size={26} />
                </div>
                <span className="px-4 py-2 bg-[#F5F5F5] dark:bg-[#3A3A3A] text-[#4A4A4A] dark:text-white text-sm font-medium">
                  {formation.duration}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-[#4A4A4A] dark:text-white mb-5 group-hover:text-[#0000fe] transition-colors">
                {formation.title}
              </h3>

              <p className="text-[#4A4A4A]/70 dark:text-white/70 mb-8 leading-relaxed text-lg">
                {formation.fullDescription.slice(0, 150)}...
              </p>

              {/* Skills preview */}
              <div className="flex flex-wrap gap-3 mb-8">
                {formation.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#F5F5F5] dark:bg-[#3A3A3A] text-[#4A4A4A]/70 dark:text-white/70 text-sm"
                  >
                    {skill.length > 30 ? skill.slice(0, 30) + '...' : skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#D3D3D3] dark:border-[#4A4A4A]">
              <span className="text-sm font-medium text-[#4A4A4A]/70 dark:text-white/70">
                {formation.career.length} {t('common.careers')}
              </span>
              <div className="flex items-center gap-2 text-[#0000fe] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide">
                {t('common.learnMore')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

