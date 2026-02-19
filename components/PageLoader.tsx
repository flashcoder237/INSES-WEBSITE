"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "./providers/I18nProvider";
import { useTheme } from "next-themes";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Reset loading state on route change
    setIsLoading(true);

    // Simulate minimum loading time for smooth transition (at least one full rotation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // 2 seconds to complete one full rotation

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Hide loader when page is fully loaded (minimum 2 seconds to show full rotation)
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#1A1A1A]"
        >
          <div className="relative">
            {/* Animated circles background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 -m-20 rounded-full bg-[#0000fe]/10 dark:bg-[#0000fe]/20"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute inset-0 -m-32 rounded-full bg-[#0000fe]/10 dark:bg-[#0000fe]/20"
            />

            {/* Logo container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Logo */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8"
              >
                {mounted && (
                  <Image
                    src={theme === "dark" ? "/images/logo/logo-inses-white.png" : "/images/logo/logo-inses.png"}
                    alt="INSES Logo"
                    width={200}
                    height={100}
                    priority
                    className="object-contain"
                  />
                )}
                {!mounted && (
                  <Image
                    src="/images/logo/logo-inses.png"
                    alt="INSES Logo"
                    width={200}
                    height={100}
                    priority
                    className="object-contain"
                  />
                )}
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="text-[#4A4A4A] dark:text-white font-semibold text-lg mb-2">
                  {t('common.loading')}
                </p>
                <p className="text-[#4A4A4A]/60 dark:text-white/60 text-sm">
                  {t('common.instituteName')}
                </p>
              </motion.div>

              {/* Animated loading bar */}
              <div className="mt-8 w-64 h-1 bg-[#D3D3D3] dark:bg-[#4A4A4A] rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/3 bg-gradient-to-r from-[#0000fe] via-[#0000b3] to-[#0000fe]"
                />
              </div>

              {/* Spinning loader */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="mt-6 w-12 h-12 border-4 border-[#D3D3D3] dark:border-[#4A4A4A] border-t-[#0000fe] rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
