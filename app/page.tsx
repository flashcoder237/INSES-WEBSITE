"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Target,
  Lightbulb,
  Heart,
  TrendingUp,
  Building2,
} from "lucide-react";
import { formations, stats, aboutInfo } from "@/data/site-data";
import FormationCard from "@/components/FormationCard";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section - Modern University Style */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B2E42] via-[#D80536] to-[#2B2E42] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          {/* Hero Background Image */}
          <Image
            src="/images/hero/hero-home.jpg"
            alt="Étudiants INSES - Institut Supérieur de l'Espoir"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          {/* Animated blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-[#EE2449]/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-[#D80536]/30 rounded-full blur-3xl"
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#2B2E42]/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-10"
              >
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
                  <span className="text-[#EDF2F4] font-medium flex items-center gap-2">
                    <TrendingUp size={16} />
                    Excellence en Formation Professionnelle
                  </span>
                </div>
              </motion.div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 font-[family-name:var(--font-poppins)] leading-tight">
                Institut Supérieur de{" "}
                <span className="bg-gradient-to-r from-[#EE2449] to-[#EDF2F4] bg-clip-text text-transparent">
                  l&apos;Espoir
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-[#EDF2F4] mb-10 leading-relaxed font-light">
                Formez-vous aux métiers de la santé avec excellence
              </p>

              {/* Description */}
              <p className="text-xl md:text-2xl text-[#EDF2F4]/80 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                L&apos;INSES offre des formations professionnelles de qualité dans le
                secteur de la santé à Douala, Cameroun. Rejoignez une institution
                qui forme les professionnels de demain.
              </p>

              {/* Stats intégrées dans le hero - Style UQAC */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[#EDF2F4] text-sm font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/formations"
                    className="bg-white text-[#D80536] px-8 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(216,5,54,0.4)] transition-all flex items-center gap-3 group"
                  >
                    Découvrir nos formations
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/inscription"
                    className="bg-transparent border-2 border-white text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#D80536] transition-all backdrop-blur-sm"
                  >
                    S&apos;inscrire maintenant
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Domaines de Formation - Style UQAC */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2B2E42] mb-6">
              Choisir un programme d'études
            </h2>
            <p className="text-xl text-[#8D9AAE] max-w-3xl mx-auto font-light">
              Découvrez nos formations dans le secteur de la santé
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Soins et Santé */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-gradient-to-br from-[#EDF2F4] to-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#EE2449] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#2B2E42] mb-4">
                Soins et Santé
              </h3>
              <p className="text-[#8D9AAE] mb-6 font-light leading-relaxed">
                Massothérapie, Diététique et Nutrition
              </p>
              <Link
                href="/formations#sante"
                className="inline-flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all"
              >
                En savoir plus
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Médical et Pharmaceutique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-gradient-to-br from-white to-[#EDF2F4] p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B2E42] to-[#D80536] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#2B2E42] mb-4">
                Médical et Pharmaceutique
              </h3>
              <p className="text-[#8D9AAE] mb-6 font-light leading-relaxed">
                Délégué Médical, Vendeur en Pharmacie
              </p>
              <Link
                href="/formations#medical"
                className="inline-flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all"
              >
                En savoir plus
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Sciences et Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group bg-gradient-to-br from-[#EDF2F4] to-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#EE2449] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#2B2E42] mb-4">
                Sciences et Technologies
              </h3>
              <p className="text-[#8D9AAE] mb-6 font-light leading-relaxed">
                Aide Chimiste Biologiste, Secrétariat Médical
              </p>
              <Link
                href="/formations#sciences"
                className="inline-flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all"
              >
                En savoir plus
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Why Choose INSES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-6 py-2 bg-[#EDF2F4] text-[#D80536] rounded-full text-sm font-bold mb-10">
              NOTRE EXCELLENCE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E42] mb-10 font-[family-name:var(--font-poppins)]">
              Pourquoi choisir l&apos;INSES ?
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D80536] to-[#EE2449] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {aboutInfo.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#EDF2F4] p-12 rounded-3xl shadow-2xl hover:shadow-2xl transition-all border border-[#8D9AAE]/20 h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D80536] to-[#EE2449] rounded-xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-2xl">
                    {index === 0 && <Award className="text-white" size={32} />}
                    {index === 1 && <Target className="text-white" size={32} />}
                    {index === 2 && <Lightbulb className="text-white" size={32} />}
                    {index === 3 && <Heart className="text-white" size={32} />}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#2B2E42] mb-4 group-hover:text-[#D80536] transition-colors">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#8D9AAE] leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#EE2449]/10 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pedagogy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#2B2E42] to-[#D80536] p-1 rounded-3xl shadow-2xl"
          >
            <div className="bg-white p-12 md:p-12 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-6 py-2 bg-[#EDF2F4] text-[#D80536] rounded-full text-sm font-bold">
                    NOTRE MÉTHODE
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2B2E42]">
                    Une Approche Pédagogique Complète
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-10">
                      <CheckCircle className="text-[#D80536] flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-[#2B2E42] mb-2 text-lg">
                          Formation Théorique
                        </h4>
                        <p className="text-[#8D9AAE] leading-relaxed">
                          {aboutInfo.pedagogy.theoretical}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-10">
                      <CheckCircle className="text-[#D80536] flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-[#2B2E42] mb-2 text-lg">
                          Formation Pratique
                        </h4>
                        <p className="text-[#8D9AAE] leading-relaxed">
                          {aboutInfo.pedagogy.practical}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-10">
                      <CheckCircle className="text-[#D80536] flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-[#2B2E42] mb-2 text-lg">
                          Évaluation Continue
                        </h4>
                        <p className="text-[#8D9AAE] leading-relaxed">
                          {aboutInfo.pedagogy.evaluation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#D80536] to-[#2B2E42] p-12 rounded-3xl text-white shadow-2xl">
                  <Users size={48} className="mb-10" />
                  <h4 className="text-2xl font-bold mb-10">Nos Partenaires</h4>
                  <ul className="space-y-4">
                    {aboutInfo.partners.map((partner, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Building2 size={20} className="flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{partner}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formations Section - New Card Design */}
      <section className="py-24 bg-[#EDF2F4]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-6 py-2 bg-white text-[#D80536] rounded-full text-sm font-bold mb-10 shadow-2xl">
              NOS PROGRAMMES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2E42] mb-10 font-[family-name:var(--font-poppins)]">
              Nos Formations
            </h2>
            <p className="text-lg text-[#8D9AAE] max-w-3xl mx-auto leading-relaxed font-light">
              Choisissez parmi nos 6 filières professionnelles dans le secteur de
              la santé et construisez votre avenir
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {formations.map((formation, index) => (
              <FormationCard
                key={formation.id}
                formation={formation}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <Link
              href="/formations"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D80536] to-[#EE2449] text-white px-8 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-2xl transition-all group"
            >
              Voir toutes les formations
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B2E42] via-[#D80536] to-[#2B2E42]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 font-[family-name:var(--font-poppins)]">
              Prêt à commencer votre parcours ?
            </h2>
            <p className="text-xl md:text-2xl text-[#EDF2F4] mb-20 leading-relaxed font-light">
              Rejoignez l&apos;INSES et construisez votre avenir dans le secteur de
              la santé
            </p>

            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
              <motion.a
                href="/inscription"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D80536] px-8 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transition-all"
              >
                Inscrivez-vous maintenant
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#D80536] transition-all backdrop-blur-sm"
              >
                Contactez-nous
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

