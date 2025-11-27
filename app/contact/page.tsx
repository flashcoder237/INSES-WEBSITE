"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Map,
} from "lucide-react";
import { siteInfo } from "@/data/site-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#2B2E42] via-[#2B2E42] to-[#2B2E42] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-contact.jpg"
            alt="Contactez l'Institut INSES"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[#D80536]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-10"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-[#EDF2F4] font-medium">
                  Contactez-nous
                </span>
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 font-[family-name:var(--font-poppins)]">
              Prenez{" "}
              <span className="bg-gradient-to-r from-[#EE2449] to-white bg-clip-text text-transparent">
                Contact
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#D80536] to-[#2B2E42] p-12 rounded-3xl shadow-2xl text-white"
              >
                <h2 className="text-2xl font-bold mb-10">
                  Informations de Contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-10">
                    <MapPin className="flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Adresse</h3>
                      <p className="text-gray-200">{siteInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-10">
                    <Phone className="flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Téléphone</h3>
                      <a
                        href={`tel:${siteInfo.phone}`}
                        className="text-gray-200 hover:text-white transition-colors block"
                      >
                        {siteInfo.phone}
                      </a>
                      {siteInfo.otherPhones.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone}`}
                          className="text-gray-200 hover:text-white transition-colors block"
                        >
                          {phone}
                        </a>
                      ))}
                      <a
                        href={`tel:${siteInfo.fixedLine}`}
                        className="text-gray-200 hover:text-white transition-colors block mt-2 text-sm"
                      >
                        Fixe: {siteInfo.fixedLine}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-10">
                    <Mail className="flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${siteInfo.email}`}
                        className="text-gray-200 hover:text-white transition-colors"
                      >
                        {siteInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-10">
                    <Clock className="flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Horaires d&apos;ouverture</h3>
                      <p className="text-gray-200 text-sm">
                        Lundi - Vendredi: 8h00 - 17h00
                      </p>
                      <p className="text-gray-200 text-sm">
                        Samedi: 8h00 - 13h00
                      </p>
                      <p className="text-gray-200 text-sm">Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <motion.a
                    href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-center block hover:bg-green-600 transition-colors"
                  >
                    Contactez-nous sur WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-2 border-green-500 rounded-3xl p-6 mb-10 flex items-center gap-10"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 mb-1">
                      Message envoyé !
                    </h3>
                    <p className="text-green-700">
                      Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-2xl p-12"
              >
                <div className="flex items-center gap-3 mb-10">
                  <MessageSquare className="text-[#D80536]" size={32} />
                  <h2 className="text-2xl font-bold text-[#2B2E42]">
                    Envoyez-nous un message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#8D9AAE] mb-2"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D80536] focus:border-transparent transition-all"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#8D9AAE] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D80536] focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#8D9AAE] mb-2"
                      >
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D80536] focus:border-transparent transition-all"
                        placeholder="+237 6XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#8D9AAE] mb-2"
                    >
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D80536] focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="inscription">Demande d&apos;inscription</option>
                      <option value="information">Demande d&apos;information</option>
                      <option value="rendez-vous">Prise de rendez-vous</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#8D9AAE] mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D80536] focus:border-transparent transition-all resize-none"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#D80536] to-[#2B2E42] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Map className="text-[#D80536]" size={32} />
              <h2 className="text-2xl font-bold text-[#2B2E42] font-[family-name:var(--font-poppins)]">
                Notre Localisation
              </h2>
            </div>
            <p className="text-lg text-[#8D9AAE] font-light">
              Visitez-nous à Douala-Bonabéri
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-96 bg-gradient-to-br from-[#EDF2F4] to-gray-100 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={80} className="text-[#D80536] mx-auto mb-4" />
                <p className="text-[#8D9AAE] font-medium">
                  [Carte Google Maps intégrée ici]
                </p>
                <p className="text-sm text-[#8D9AAE] mt-2">
                  Coordonnées GPS: À définir
                </p>
                <p className="text-sm text-[#8D9AAE] mt-1">
                  {siteInfo.location}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-[#8D9AAE] mb-4">
              Comment se rendre à l&apos;INSES ?
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D80536] hover:text-[#D80536] font-semibold"
            >
              <MapPin size={20} />
              Ouvrir dans Google Maps
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

