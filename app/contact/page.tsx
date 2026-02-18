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
import { useI18n } from "@/components/providers/I18nProvider";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { useImages } from "@/hooks/useImages";

export default function ContactPage() {
  const { t, locale } = useI18n();
  const siteInfo = useSiteInfo();
  const images = useImages();
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after 3 seconds
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
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus("error");

      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  // Afficher un état de chargement si les données ne sont pas encore chargées
  if (!siteInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B22234] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A4A4A] text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#B22234] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images['hero-contact']?.url || '/images/hero/hero-contact.jpg'}
            alt={locale === 'fr' ? images['hero-contact']?.alt_fr : images['hero-contact']?.alt_en || 'INSES'}
            fill
            className="object-cover opacity-20"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[#B22234]/80" />
        </div>

        <div className="container mx-auto px-8 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-white text-[#B22234] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                {t('contact.heroTag')}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('contact.heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('contact.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#4A4A4A] p-10 text-white"
              >
                <h2 className="text-2xl font-bold mb-8">
                  {t('contact.contactInfoTitle')}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="flex-shrink-0 mt-1 text-[#B22234]" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1 text-sm uppercase tracking-wide">{t('contact.address')}</h3>
                      <p className="text-white/80 text-[15px]">{siteInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="flex-shrink-0 mt-1 text-[#B22234]" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1 text-sm uppercase tracking-wide">{t('contact.phone')}</h3>
                      <a
                        href={`tel:${siteInfo.phone}`}
                        className="text-white/80 hover:text-white transition-colors block text-[15px]"
                      >
                        {siteInfo.phone}
                      </a>
                      {siteInfo.otherPhones.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone}`}
                          className="text-white/80 hover:text-white transition-colors block text-[15px]"
                        >
                          {phone}
                        </a>
                      ))}
                      <a
                        href={`tel:${siteInfo.fixedLine}`}
                        className="text-white/80 hover:text-white transition-colors block mt-2 text-sm"
                      >
                        {t('contact.fixedLine')}: {siteInfo.fixedLine}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="flex-shrink-0 mt-1 text-[#B22234]" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1 text-sm uppercase tracking-wide">{t('contact.email')}</h3>
                      <a
                        href={`mailto:${siteInfo.email}`}
                        className="text-white/80 hover:text-white transition-colors text-[15px]"
                      >
                        {siteInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="flex-shrink-0 mt-1 text-[#B22234]" size={20} />
                    <div>
                      <h3 className="font-semibold mb-1 text-sm uppercase tracking-wide">{t('contact.schedule')}</h3>
                      <p className="text-white/80 text-sm">
                        {siteInfo.hoursMondayFriday}
                      </p>
                      <p className="text-white/80 text-sm">
                        {siteInfo.hoursSaturday}
                      </p>
                      <p className="text-white/80 text-sm">{siteInfo.hoursSunday}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <motion.a
                    href={`https://wa.me/${siteInfo.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-600 text-white px-6 py-3 font-semibold text-center block hover:bg-green-700 transition-colors"
                  >
                    {t('footer.whatsappContact')}
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
                  className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 flex items-center gap-4"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-1">
                      {t('contact.messageSent')}
                    </h3>
                    <p className="text-green-700 text-[15px]">
                      {t('contact.messageSuccess')}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 flex items-center gap-4"
                >
                  <div className="text-red-500 flex-shrink-0">⚠</div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-1">
                      Erreur
                    </h3>
                    <p className="text-red-700 text-[15px]">
                      Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border-t-4 border-[#B22234] p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare className="text-[#B22234]" size={28} />
                  <h2 className="text-2xl font-bold text-[#4A4A4A]">
                    {t('contact.sendMessageTitle')}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                    >
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      placeholder={t('contact.fullName')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('contact.emailLabel')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                        placeholder={t('contact.emailPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('contact.phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                        placeholder={t('contact.phonePlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                    >
                      {t('contact.subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                    >
                      <option value="">{t('contact.selectSubject')}</option>
                      <option value="inscription">{t('contact.registrationRequest')}</option>
                      <option value="information">{t('contact.informationRequest')}</option>
                      <option value="rendez-vous">{t('contact.appointment')}</option>
                      <option value="autre">{t('contact.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                    >
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all resize-none"
                      placeholder={t('contact.writeMessage')}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#B22234] text-white px-8 py-4 font-semibold text-base hover:bg-[#800020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      t('contact.sending')
                    ) : (
                      <>
                        <Send size={18} />
                        {t('contact.sendButton')}
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Stanford Style */}
      <section className="py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Map className="text-[#B22234]" size={28} />
              <h2 className="text-4xl md:text-5xl font-bold text-[#4A4A4A]">
                {t('contact.locationTitle')}
              </h2>
            </div>
            <div className="w-20 h-1 bg-[#B22234] mb-4" />
            <p className="text-lg text-[#4A4A4A]/70">
              {t('contact.visitUs')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] bg-white overflow-hidden border-t-4 border-[#B22234]"
          >
            <iframe
              src={`${siteInfo.googleMapsUrl}&hl=${locale}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation INSES - Douala Bonabéri"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-[#4A4A4A]/70 mb-4">
              {t('contact.howToReach')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${siteInfo.latitude},${siteInfo.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B22234] hover:text-[#800020] font-semibold text-sm uppercase tracking-wide"
              >
                <MapPin size={18} />
                {t('contact.openInMaps')}
              </a>
              <span className="text-[#4A4A4A]/40 text-sm">
                GPS: {siteInfo.latitude}, {siteInfo.longitude}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
