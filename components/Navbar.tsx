"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { siteInfo } from "@/data/site-data";
import Image from "next/image";
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
            ? "bg-white shadow-sm py-4 border-[#D3D3D3]"
            : "bg-white py-6 border-transparent"
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
            <div className="hidden md:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#4A4A4A] hover:text-[#B22234] font-medium text-[15px] transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B22234] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 md:hidden overflow-y-auto border-l border-[#D3D3D3]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#D3D3D3]">
                  <div className="bg-[#B22234] text-white font-bold text-lg px-5 py-2">
                    INSES
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-[#D3D3D3]/30 transition-colors"
                  >
                    <X size={24} color="#4A4A4A" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
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
                        className="block py-3 px-4 text-[#4A4A4A] hover:bg-[#D3D3D3]/20 hover:text-[#B22234] font-medium transition-all"
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
                    className="mt-4 bg-green-600 text-white py-3 px-6 font-medium text-center hover:bg-green-700 transition-colors"
                  >
                    Contactez-nous sur WhatsApp
                  </motion.a>
                </div>

                <div className="mt-8 pt-8 border-t border-[#D3D3D3]">
                  <div className="space-y-3 text-sm text-[#4A4A4A]">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#B22234]" />
                      <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#B22234]" />
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

