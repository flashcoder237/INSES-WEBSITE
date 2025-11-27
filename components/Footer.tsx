"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { siteInfo, formations } from "@/data/site-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#2B2E42] via-[#2B2E42] to-[#2B2E42] text-white">
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-[#D80536] to-[#2B2E42] text-white font-bold text-lg px-6 py-2 rounded-lg shadow-2xl inline-block mb-4">
              INSES
            </div>
            <p className="text-gray-300 mb-10 leading-relaxed">
              {siteInfo.fullName} - Former les professionnels de santé de demain
              avec excellence et innovation.
            </p>
            <div className="flex gap-10">
              {siteInfo.socialMedia.facebook && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={siteInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#D80536] rounded-full flex items-center justify-center transition-colors"
                >
                  <Facebook size={20} />
                </motion.a>
              )}
              {siteInfo.socialMedia.twitter && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={siteInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#EE2449] rounded-full flex items-center justify-center transition-colors"
                >
                  <Twitter size={20} />
                </motion.a>
              )}
              {siteInfo.socialMedia.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={siteInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Instagram size={20} />
                </motion.a>
              )}
              {siteInfo.socialMedia.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={siteInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#2B2E42] rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-10 text-white">Liens Rapides</h3>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "/" },
                { name: "À Propos", href: "/about" },
                { name: "Formations", href: "/formations" },
                { name: "Galerie", href: "/gallery" },
                { name: "Inscription", href: "/inscription" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Formations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-10 text-white">Nos Formations</h3>
            <ul className="space-y-3">
              {formations.slice(0, 6).map((formation) => (
                <li key={formation.id}>
                  <Link
                    href={`/formations/${formation.slug}`}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {formation.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-10 text-white">Contactez-Nous</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#EE2449] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{siteInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#EE2449] flex-shrink-0" />
                <div className="text-gray-300">
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="hover:text-white transition-colors block"
                  >
                    {siteInfo.phone}
                  </a>
                  <a
                    href={`tel:${siteInfo.fixedLine}`}
                    className="hover:text-white transition-colors text-sm block mt-1"
                  >
                    {siteInfo.fixedLine}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#EE2449] flex-shrink-0" />
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {siteInfo.email}
                </a>
              </li>
            </ul>

            <motion.a
              href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-medium shadow-2xl hover:shadow-2xl transition-all inline-block"
            >
              WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400"
        >
          <p>
            &copy; {currentYear} {siteInfo.fullName} ({siteInfo.name}). Tous
            droits réservés.
          </p>
          <p className="mt-2 text-sm">
            Conçu avec passion pour l&apos;excellence en formation professionnelle
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

