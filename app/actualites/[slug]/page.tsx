"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useNewsItem, useNews } from "@/hooks/useNews";
import { useI18n } from "@/components/providers/I18nProvider";
import { Calendar, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Share2, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import NewsCard from "@/components/NewsCard";

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

interface ShareButtonProps {
  platform: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

function ShareButton({ platform, icon, onClick, color }: ShareButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-12 h-12 ${color} flex items-center justify-center text-white transition-all hover:shadow-lg`}
      aria-label={`Share on ${platform}`}
      title={`Share on ${platform}`}
    >
      {icon}
    </motion.button>
  );
}

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t, locale } = useI18n();
  const news = useNewsItem(slug);
  const allNews = useNews();
  const [linkCopied, setLinkCopied] = useState(false);

  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-white mb-4">
            {t('formationDetail.notFound')}
          </h1>
          <Link
            href="/actualites"
            className="text-[#B22234] hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={20} />
            {t('news.backToNews')}
          </Link>
        </div>
      </div>
    );
  }

  // Get related news (same category, excluding current)
  const relatedNews = allNews
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get current URL for sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = news.title;
  const shareDescription = news.excerpt;

  // Social sharing functions
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A]">
      {/* Back Button */}
      <div className="bg-[#F5F5F5] dark:bg-[#2A2A2A] border-b border-[#D3D3D3] dark:border-[#4A4A4A]">
        <div className="container mx-auto px-8 py-4">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-[#4A4A4A] dark:text-white hover:text-[#B22234] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">{t('news.backToNews')}</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[500px] overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category and Date Badges */}
        <div className="absolute bottom-8 left-8 flex flex-wrap gap-4">
          <div className={`${categoryColors[news.category]} text-white px-6 py-3 text-sm font-medium flex items-center gap-2`}>
            <Tag size={16} />
            {categoryLabels[news.category][locale as 'fr' | 'en']}
          </div>
          <div className="bg-white/90 dark:bg-[#2A2A2A]/90 backdrop-blur-sm text-[#4A4A4A] dark:text-white px-6 py-3 text-sm font-medium flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(news.date)}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-8 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A4A4A] dark:text-white mb-8 leading-tight">
            {news.title}
          </h1>

          <p className="text-xl text-[#4A4A4A]/80 dark:text-white/80 mb-12 leading-relaxed italic border-l-4 border-[#B22234] pl-6">
            {news.excerpt}
          </p>

          {/* Social Share Buttons */}
          <div className="bg-[#F5F5F5] dark:bg-[#2A2A2A] p-8 mb-12 border-l-4 border-[#B22234]">
            <h3 className="text-lg font-bold text-[#4A4A4A] dark:text-white mb-4 flex items-center gap-2">
              <Share2 size={20} />
              {t('news.share')}
            </h3>
            <div className="flex flex-wrap gap-3">
              <ShareButton
                platform="Facebook"
                icon={<Facebook size={20} />}
                onClick={shareOnFacebook}
                color="bg-[#1877F2] hover:bg-[#166FE5]"
              />
              <ShareButton
                platform="Twitter"
                icon={<Twitter size={20} />}
                onClick={shareOnTwitter}
                color="bg-[#1DA1F2] hover:bg-[#1A91DA]"
              />
              <ShareButton
                platform="LinkedIn"
                icon={<Linkedin size={20} />}
                onClick={shareOnLinkedIn}
                color="bg-[#0A66C2] hover:bg-[#095196]"
              />
              <ShareButton
                platform="WhatsApp"
                icon={<FaWhatsapp size={20} />}
                onClick={shareOnWhatsApp}
                color="bg-[#25D366] hover:bg-[#20BD5A]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyLink}
                className={`px-6 h-12 flex items-center gap-2 font-medium transition-all ${
                  linkCopied
                    ? 'bg-green-600 text-white'
                    : 'bg-[#4A4A4A] dark:bg-[#3A3A3A] text-white hover:bg-[#3A3A3A] dark:hover:bg-[#4A4A4A]'
                }`}
              >
                {linkCopied ? (
                  <>
                    <Check size={20} />
                    {t('news.linkCopied')}
                  </>
                ) : (
                  <>
                    <Share2 size={20} />
                    {t('news.copyLink')}
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-[#4A4A4A] dark:prose-headings:text-white
              prose-p:text-[#4A4A4A]/80 dark:prose-p:text-white/80
              prose-li:text-[#4A4A4A]/80 dark:prose-li:text-white/80
              prose-strong:text-[#4A4A4A] dark:prose-strong:text-white
              prose-a:text-[#B22234] hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </motion.div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-[#F5F5F5] dark:bg-[#2A2A2A] py-20">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] dark:text-white mb-4">
                {t('news.relatedNews')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((relatedNewsItem, index) => (
                <NewsCard key={relatedNewsItem.id} news={relatedNewsItem} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
