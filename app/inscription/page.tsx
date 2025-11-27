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
import { formations } from "@/data/site-data";

export default function InscriptionPage() {
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
                Rejoignez-nous
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Formulaire <span className="text-white">d&apos;Inscription</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Remplissez le formulaire pour commencer votre parcours à l&apos;INSES
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
                    Inscription envoyée !
                  </h3>
                  <p className="text-green-700 text-[15px]">
                    Merci pour votre demande d&apos;inscription. Nous vous
                    contacterons sous peu.
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
                    Informations Personnelles
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        Prénom *
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
                        Nom *
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
                        Email *
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
                        Téléphone *
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
                        Date de naissance *
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
                        Ville *
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
                          placeholder="Douala, Yaoundé..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                    >
                      Adresse complète *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      placeholder="Quartier, rue, numéro..."
                    />
                  </div>
                </div>

                {/* Formation souhaitée */}
                <div className="pt-6 border-t border-[#D3D3D3]">
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <GraduationCap className="text-[#B22234]" size={28} />
                    Formation Souhaitée
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="formation"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        Choisissez votre formation *
                      </label>
                      <select
                        id="formation"
                        name="formation"
                        required
                        value={formData.formation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez une formation</option>
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
                        Niveau d&apos;études actuel *
                      </label>
                      <select
                        id="level"
                        name="level"
                        required
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="bepc">BEPC</option>
                        <option value="probatoire">Probatoire</option>
                        <option value="bac">Baccalauréat</option>
                        <option value="licence">Licence</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="pt-6 border-t border-[#D3D3D3]">
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <FileText className="text-[#B22234]" size={28} />
                    Message (Optionnel)
                  </h2>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all resize-none"
                    placeholder="Avez-vous des questions ou des informations supplémentaires à nous communiquer ?"
                  />
                </div>

                {/* Info Message */}
                <div className="bg-[#F5F5F5] border-l-4 border-[#B22234] p-6 flex items-start gap-3">
                  <AlertCircle className="text-[#B22234] flex-shrink-0 mt-1" size={20} />
                  <div className="text-sm text-[#4A4A4A]/80">
                    <p className="font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide text-xs">
                      Documents à prévoir :
                    </p>
                    <ul className="space-y-1">
                      <li>• Copie de l&apos;acte de naissance</li>
                      <li>• Copie du dernier diplôme obtenu</li>
                      <li>• 4 photos d&apos;identité récentes</li>
                      <li>• Copie de la carte nationale d&apos;identité</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      Ces documents seront demandés lors de la finalisation de
                      votre inscription.
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
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  </motion.button>

                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-[#4A4A4A] text-[#4A4A4A] px-8 py-4 font-semibold text-base hover:bg-[#4A4A4A] hover:text-white transition-colors text-center"
                  >
                    Besoin d&apos;aide ?
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
