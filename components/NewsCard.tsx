"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { News } from "@/data/news-data";
import { useI18n } from "./providers/I18nProvider";

interface NewsCardProps {
  news: News;
  index?: number;
}

const categoryColors = {
  event: "bg-orange-600",
  announcement: "bg-[#B22234]",
  success: "bg-green-600",
};

const categoryLabels = {
  event: { fr: "Événement", en: "Event" },
  announcement: { fr: "Annonce", en: "Announcement" },
  success: { fr: "Réussite", en: "Success Story" },
};

export default function NewsCard({ news, index = 0 }: NewsCardProps) {
  const { t, locale } = useI18n();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link href={`/actualites/${news.slug}`}>
        <div className="relative h-full bg-white dark:bg-[#2A2A2A] overflow-hidden hover:shadow-md transition-all border-t-4 border-[#B22234]">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Category badge */}
            <div className={`absolute top-4 left-4 ${categoryColors[news.category]} text-white px-4 py-2 text-sm font-medium flex items-center gap-2`}>
              <Tag size={14} />
              {categoryLabels[news.category][locale as 'fr' | 'en']}
            </div>

            {/* Date badge */}
            <div className="absolute bottom-4 right-4 bg-white dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-white px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg">
              <Calendar size={14} />
              {formatDate(news.date)}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-[#4A4A4A] dark:text-white mb-4 group-hover:text-[#B22234] transition-colors line-clamp-2">
              {news.title}
            </h3>

            <p className="text-[#4A4A4A]/70 dark:text-white/70 mb-6 line-clamp-3 leading-relaxed text-[15px]">
              {news.excerpt}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[#B22234] font-semibold group-hover:gap-3 transition-all text-sm uppercase tracking-wide">
              {t('news.readMore')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
