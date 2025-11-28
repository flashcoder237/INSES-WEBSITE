"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { siteInfo } from "@/data/site-data";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchModal from "./SearchModal";
const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/about" },
  { name: "Formations", href: "/formations" },
  { name: "Galerie", href: "/gallery" },
  { name: "Inscription", href: "/inscription" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Bar - Stanford Style */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#800020] text-white py-2.5 hidden md:block"
      >
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-8">
              <a
                href={`tel:${siteInfo.phone}`}
                className="flex items-center gap-2 hover:text-[#D3D3D3] transition"
              >
                <Phone size={14} />
                <span>{siteInfo.phone}</span>
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-center gap-2 hover:text-[#D3D3D3] transition"
              >
                <Mail size={14} />
                <span>{siteInfo.email}</span>
              </a>
            </div>
            <div className="text-sm">{siteInfo.location}</div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation - Clean Stanford Style */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white dark:bg-[#1A1A1A] shadow-sm py-4 border-[#D3D3D3] dark:border-[#4A4A4A]"
            : "bg-white dark:bg-[#1A1A1A] py-6 border-transparent"
        }`}
      >
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <Image
              src={"/images/logo/logo-inses.png"}
              alt={`Logo INSES`}
              className="object-cover opacity-90"
              width="100"
              height="50"
            />
               
              </motion.div>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs text-[#4A4A4A] font-semibold uppercase tracking-wide">
                  Institut Supérieur
                </span>
                <span className="text-xs text-[#4A4A4A] font-semibold uppercase tracking-wide">
                  de l&apos;Espoir
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium text-[15px] transition-colors relative group ${
                      isActive
                        ? "text-[#B22234]"
                        : "text-[#4A4A4A] dark:text-white hover:text-[#B22234]"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#B22234] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="w-px h-6 bg-[#D3D3D3] dark:bg-[#4A4A4A]" />

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 bg-[#D3D3D3]/20 dark:bg-[#4A4A4A]/40 hover:bg-[#B22234]/10 dark:hover:bg-[#B22234]/20 flex items-center justify-center transition-colors group"
                aria-label="Search"
                title="Rechercher (Ctrl+K)"
              >
                <Search size={18} className="text-[#4A4A4A] dark:text-white group-hover:text-[#B22234]" />
              </motion.button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* WhatsApp Button */}
              <motion.a
                href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 text-white px-5 py-2 font-medium text-[15px] hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-[#D3D3D3]/20 transition-colors"
            >
              {isOpen ? <X size={28} color="#4A4A4A" /> : <Menu size={28} color="#4A4A4A" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#2A2A2A] shadow-xl z-50 md:hidden overflow-y-auto border-l border-[#D3D3D3] dark:border-[#4A4A4A]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#D3D3D3] dark:border-[#4A4A4A]">
                  <div className="bg-[#B22234] text-white font-bold text-lg px-5 py-2">
                    INSES
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-[#D3D3D3]/30 dark:hover:bg-[#4A4A4A]/30 transition-colors"
                  >
                    <X size={24} className="text-[#4A4A4A] dark:text-white" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block py-3 px-4 font-medium transition-all border-l-4 ${
                            isActive
                              ? "bg-[#B22234]/10 text-[#B22234] border-[#B22234]"
                              : "text-[#4A4A4A] dark:text-white hover:bg-[#D3D3D3]/20 dark:hover:bg-[#4A4A4A]/40 hover:text-[#B22234] border-transparent hover:border-[#B22234]/30"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.a
                    href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigation.length * 0.1 }}
                    className="mt-4 bg-green-600 text-white py-3 px-6 font-medium text-center hover:bg-green-700 transition-colors"
                  >
                    Contactez-nous sur WhatsApp
                  </motion.a>
                </div>

                <div className="mt-8 pt-8 border-t border-[#D3D3D3] dark:border-[#4A4A4A]">
                  <div className="space-y-3 text-sm text-[#4A4A4A] dark:text-white">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#B22234]" />
                      <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#B22234]" />
                      <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                    </div>
                  </div>

                  {/* Mobile Controls */}
                  <div className="mt-6 flex items-center gap-3">
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="w-10 h-10 bg-[#D3D3D3]/20 dark:bg-[#4A4A4A]/40 hover:bg-[#B22234]/10 dark:hover:bg-[#B22234]/20 flex items-center justify-center transition-colors"
                      aria-label="Search"
                    >
                      <Search size={18} className="text-[#4A4A4A] dark:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

