"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import { useNews } from "@/hooks/useNews";
import { useI18n } from "@/components/providers/I18nProvider";
import { NewsCategory } from "@/data/news-data";
import { Newspaper } from "lucide-react";

export default function ActualitesPage() {
  const { t } = useI18n();
  const allNews = useNews();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | "all">("all");

  const filteredNews = selectedCategory === "all"
    ? allNews
    : allNews.filter(news => news.category === selectedCategory);

  const categories: Array<{ id: NewsCategory | "all"; label: string }> = [
    { id: "all", label: t('news.filterAll') },
    { id: "event", label: t('news.filterEvents') },
    { id: "announcement", label: t('news.filterAnnouncements') },
    { id: "success", label: t('news.filterSuccess') },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#B22234] via-[#800020] to-[#4A4A4A] dark:from-[#800020] dark:via-[#4A4A4A] dark:to-[#1A1A1A] text-white py-24">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 mb-6">
              <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Newspaper size={16} />
                {t('news.heroTag')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('news.heroTitle')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('news.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white dark:bg-[#2A2A2A] border-b border-[#D3D3D3] dark:border-[#4A4A4A] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#B22234] text-white shadow-md"
                    : "bg-[#F5F5F5] dark:bg-[#3A3A3A] text-[#4A4A4A] dark:text-white hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A]"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <div className="container mx-auto px-8">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <NewsCard key={news.id} news={news} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Newspaper size={64} className="text-[#4A4A4A]/30 dark:text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#4A4A4A] dark:text-white mb-4">
                {t('news.noNews')}
              </h3>
              <p className="text-[#4A4A4A]/70 dark:text-white/70">
                {t('common.viewAll')}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
