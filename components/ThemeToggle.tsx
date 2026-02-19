"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "./providers/I18nProvider";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-[#D3D3D3]/20 flex items-center justify-center">
        <Sun size={18} className="text-[#4A4A4A]" />
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 bg-[#D3D3D3]/20 hover:bg-[#0000fe]/10 flex items-center justify-center transition-colors group"
      aria-label="Toggle theme"
      title={theme === "dark" ? t('theme.light') : t('theme.dark')}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-[#4A4A4A] dark:text-white group-hover:text-[#0000fe]" />
      ) : (
        <Moon size={18} className="text-[#4A4A4A] group-hover:text-[#0000fe]" />
      )}
    </motion.button>
  );
}
