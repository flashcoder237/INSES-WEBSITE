"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { siteInfo } from "@/data/site-data";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#2B2E42] to-[#2B2E42] text-white py-2 hidden md:block"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${siteInfo.phone}`}
                className="flex items-center gap-2 hover:text-[#EDF2F4] transition"
              >
                <Phone size={16} />
                <span>{siteInfo.phone}</span>
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-center gap-2 hover:text-[#EDF2F4] transition"
              >
                <Mail size={16} />
                <span>{siteInfo.email}</span>
              </a>
            </div>
            <div className="text-sm">{siteInfo.location}</div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="bg-gradient-to-br from-[#D80536] to-[#2B2E42] text-white font-bold text-2xl md:text-3xl px-4 py-2 rounded-lg shadow-lg">
                  INSES
                </div>
              </motion.div>
              <div className="hidden lg:flex flex-col">
                <span className="text-sm text-[#8D9AAE] font-medium">
                  Institut Supérieur
                </span>
                <span className="text-sm text-[#8D9AAE] font-medium">
                  de l&apos;Espoir
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#8D9AAE] hover:text-[#D80536] font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D80536] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <motion.a
                href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                WhatsApp
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="bg-gradient-to-br from-[#D80536] to-[#2B2E42] text-white font-bold text-2xl px-4 py-2 rounded-lg">
                    INSES
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 rounded-lg text-[#8D9AAE] hover:bg-[#EDF2F4] hover:text-[#D80536] font-medium transition-all"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.a
                    href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigation.length * 0.1 }}
                    className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-full font-medium text-center shadow-md"
                  >
                    Contactez-nous sur WhatsApp
                  </motion.a>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-[#8D9AAE]">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#D80536]" />
                      <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#D80536]" />
                      <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

