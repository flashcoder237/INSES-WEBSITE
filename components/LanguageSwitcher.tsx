"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("fr");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-[#D3D3D3]/20 hover:bg-[#B22234]/10 flex items-center justify-center transition-colors group"
        aria-label="Change language"
        title="Changer la langue"
      >
        <Globe size={18} className="text-[#4A4A4A] dark:text-white group-hover:text-[#B22234]" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 bg-white dark:bg-[#2A2A2A] border border-[#D3D3D3] dark:border-[#4A4A4A] shadow-lg z-50 min-w-[160px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setIsOpen(false);
                    // Here you would implement actual language switching
                    console.log("Switching to:", lang.code);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F5F5F5] dark:hover:bg-[#3A3A3A] transition-colors text-left ${
                    currentLang === lang.code
                      ? "bg-[#B22234]/10 text-[#B22234]"
                      : "text-[#4A4A4A] dark:text-white"
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-sm flex-1">{lang.name}</span>
                  {currentLang === lang.code && (
                    <Check size={16} className="text-[#B22234]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
