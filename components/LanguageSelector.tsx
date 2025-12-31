"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const [showModal, setShowModal] = useState(false);
  const { setLocale } = useI18n();

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà choisi une langue
    const hasSelectedLanguage = localStorage.getItem("locale");
    if (!hasSelectedLanguage) {
      // Afficher le modal après un petit délai pour une meilleure UX
      setTimeout(() => setShowModal(true), 500);
    }
  }, []);

  const handleLanguageSelect = (lang: "fr" | "en") => {
    setLocale(lang);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-2xl max-w-md w-full p-8"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#B22234] rounded-full flex items-center justify-center">
              <Globe className="text-white" size={32} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#4A4A4A] dark:text-white text-center mb-3">
            Bienvenue / Welcome
          </h2>
          <p className="text-[#4A4A4A]/70 dark:text-white/70 text-center mb-8">
            Choisissez votre langue / Choose your language
          </p>

          {/* Language Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect("fr")}
              className="w-full bg-[#B22234] text-white py-4 px-6 rounded font-semibold text-lg hover:bg-[#800020] transition-colors flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🇫🇷</span>
              Français
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect("en")}
              className="w-full border-2 border-[#4A4A4A] dark:border-white text-[#4A4A4A] dark:text-white py-4 px-6 rounded font-semibold text-lg hover:bg-[#4A4A4A] dark:hover:bg-white hover:text-white dark:hover:text-[#4A4A4A] transition-colors flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🇬🇧</span>
              English
            </motion.button>
          </div>

          {/* Note */}
          <p className="text-xs text-[#4A4A4A]/50 dark:text-white/50 text-center mt-6">
            Vous pourrez changer la langue à tout moment / You can change the language anytime
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
