"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { useFormations } from "@/hooks/useFormations";

export default function InscriptionPage() {
  const { t } = useI18n();
  const formations = useFormations();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    formation: "",
    level: "",
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

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          city: "",
          formation: "",
          level: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#B22234] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-inscription.jpg"
            alt="Inscription INSES - Rejoignez-nous"
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
                {t('inscription.heroTag')}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('inscription.heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('inscription.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section - Stanford Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
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
                    {t('inscription.registrationSent')}
                  </h3>
                  <p className="text-green-700 text-[15px]">
                    {t('inscription.registrationSuccess')}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-t-4 border-[#B22234] p-10 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Informations personnelles */}
                <div>
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <User className="text-[#B22234]" size={28} />
                    {t('inscription.personalInfoTitle')}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.firstName')} *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                        placeholder="Votre prénom"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.lastName')} *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.email')} *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]/50"
                          size={18}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.phone')} *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]/50"
                          size={18}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                          placeholder="+237 6XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.dateOfBirth')} *
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]/50"
                          size={18}
                        />
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          required
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.city')} *
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]/50"
                          size={18}
                        />
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                          placeholder={t('inscription.cityPlaceholder')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                    >
                      {t('inscription.fullAddress')} *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      placeholder={t('inscription.addressPlaceholder')}
                    />
                  </div>
                </div>

                {/* Formation souhaitée */}
                <div className="pt-6 border-t border-[#D3D3D3]">
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <GraduationCap className="text-[#B22234]" size={28} />
                    {t('inscription.desiredFormationTitle')}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="formation"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.chooseFormation')} *
                      </label>
                      <select
                        id="formation"
                        name="formation"
                        required
                        value={formData.formation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      >
                        <option value="">{t('inscription.selectFormation')}</option>
                        {formations.map((formation) => (
                          <option key={formation.id} value={formation.slug}>
                            {formation.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="level"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.currentLevel')} *
                      </label>
                      <select
                        id="level"
                        name="level"
                        required
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      >
                        <option value="">{t('inscription.selectLevel')}</option>
                        <option value="bepc">{t('inscription.bepc')}</option>
                        <option value="probatoire">{t('inscription.probatoire')}</option>
                        <option value="bac">{t('inscription.bac')}</option>
                        <option value="licence">{t('inscription.licence')}</option>
                        <option value="autre">{t('inscription.other')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="pt-6 border-t border-[#D3D3D3]">
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <FileText className="text-[#B22234]" size={28} />
                    {t('inscription.messageTitle')}
                  </h2>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all resize-none"
                    placeholder={t('inscription.messagePlaceholder')}
                  />
                </div>

                {/* Info Message */}
                <div className="bg-[#F5F5F5] border-l-4 border-[#B22234] p-6 flex items-start gap-3">
                  <AlertCircle className="text-[#B22234] flex-shrink-0 mt-1" size={20} />
                  <div className="text-sm text-[#4A4A4A]/80">
                    <p className="font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide text-xs">
                      {t('inscription.documentsTitle')}
                    </p>
                    <ul className="space-y-1">
                      <li>• {t('inscription.birthCertificate')}</li>
                      <li>• {t('inscription.diploma')}</li>
                      <li>• {t('inscription.photos')}</li>
                      <li>• {t('inscription.idCard')}</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      {t('inscription.documentsNote')}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#B22234] text-white px-8 py-4 font-semibold text-base hover:bg-[#800020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('inscription.submitting') : t('inscription.submitButton')}
                  </motion.button>

                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-[#4A4A4A] text-[#4A4A4A] px-8 py-4 font-semibold text-base hover:bg-[#4A4A4A] hover:text-white transition-colors text-center"
                  >
                    {t('inscription.needHelp')}
                  </motion.a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
