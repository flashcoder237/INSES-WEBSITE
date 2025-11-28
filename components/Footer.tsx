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
    <footer className="bg-[#4A4A4A] dark:bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#B22234] text-white font-bold text-lg px-5 py-2 inline-block mb-6">
              INSES
            </div>
            <p className="text-white/80 mb-8 leading-relaxed text-[15px]">
              {siteInfo.fullName} - Former les professionnels de santé de demain
              avec excellence et innovation.
            </p>
            <div className="flex gap-4">
              {siteInfo.socialMedia.facebook && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={siteInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#B22234] flex items-center justify-center transition-colors"
                >
                  <Facebook size={18} />
                </motion.a>
              )}
              {siteInfo.socialMedia.twitter && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={siteInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#B22234] flex items-center justify-center transition-colors"
                >
                  <Twitter size={18} />
                </motion.a>
              )}
              {siteInfo.socialMedia.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={siteInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#B22234] flex items-center justify-center transition-colors"
                >
                  <Instagram size={18} />
                </motion.a>
              )}
              {siteInfo.socialMedia.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={siteInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#B22234] flex items-center justify-center transition-colors"
                >
                  <Linkedin size={18} />
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
            <h3 className="text-xl font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="space-y-2">
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
                    className="text-white/80 hover:text-white transition-colors text-[15px] hover:underline"
                  >
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
            <h3 className="text-xl font-bold mb-6 text-white">Nos Formations</h3>
            <ul className="space-y-2">
              {formations.slice(0, 6).map((formation) => (
                <li key={formation.id}>
                  <Link
                    href={`/formations/${formation.slug}`}
                    className="text-white/80 hover:text-white transition-colors text-[15px] hover:underline"
                  >
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
            <h3 className="text-xl font-bold mb-6 text-white">Contactez-Nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#B22234] mt-1 flex-shrink-0" />
                <span className="text-white/80 text-[15px]">{siteInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#B22234] flex-shrink-0" />
                <div className="text-white/80 text-[15px]">
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
                <Mail size={18} className="text-[#B22234] flex-shrink-0" />
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="text-white/80 hover:text-white transition-colors text-[15px]"
                >
                  {siteInfo.email}
                </a>
              </li>
            </ul>

            <motion.a
              href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 bg-green-600 text-white px-6 py-3 font-medium hover:bg-green-700 transition-colors inline-block"
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
          className="border-t border-white/20 mt-12 pt-8 text-white/60 text-sm"
        >
          <p>
            &copy; {currentYear} {siteInfo.fullName} ({siteInfo.name}). Tous
            droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

