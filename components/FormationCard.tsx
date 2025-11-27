"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Formation } from "@/data/site-data";

interface FormationCardProps {
  formation: Formation;
  index?: number;
}

export default function FormationCard({ formation, index = 0 }: FormationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link href={`/formations/${formation.slug}`}>
        <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
          {/* Image with overlay */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#D80536]/20 to-[#2B2E42]/20">
            {/* Placeholder for image - will be replaced with actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap size={80} className="text-[#D80536] opacity-30" />
            </div>

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E42] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Duration badge */}
            <div className="absolute top-4 right-4 bg-[#D80536] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
              <Clock size={16} />
              {formation.duration}
            </div>

            {/* Icon badge */}
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="text-[#D80536]" size={28} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#2B2E42] mb-3 group-hover:text-[#D80536] transition-colors">
              {formation.title}
            </h3>

            <p className="text-[#8D9AAE] mb-4 line-clamp-2 leading-relaxed">
              {formation.shortDescription}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between text-sm text-[#8D9AAE] mb-4 pb-4 border-b border-[#EDF2F4]">
              <span className="font-medium">{formation.level}</span>
              <span>{formation.career.length} débouchés</span>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all">
              Découvrir la formation
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EE2449]/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}

// Alternative card style with horizontal layout for featured formations
export function FormationCardHorizontal({ formation, index = 0 }: FormationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/formations/${formation.slug}`}>
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-full">
          {/* Image section */}
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-gradient-to-br from-[#D80536]/20 to-[#2B2E42]/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap size={80} className="text-[#D80536] opacity-30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2E42]/80 to-transparent" />

            {/* Number indicator for featured */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-[#EE2449] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {(index + 1).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#EDF2F4] rounded-lg flex items-center justify-center">
                  <BookOpen className="text-[#D80536]" size={24} />
                </div>
                <span className="px-3 py-1 bg-[#EDF2F4] text-[#2B2E42] rounded-full text-sm font-medium">
                  {formation.duration}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-[#2B2E42] mb-3 group-hover:text-[#D80536] transition-colors">
                {formation.title}
              </h3>

              <p className="text-[#8D9AAE] mb-6 leading-relaxed">
                {formation.fullDescription.slice(0, 150)}...
              </p>

              {/* Skills preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {formation.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#EDF2F4] text-[#8D9AAE] rounded-full text-xs"
                  >
                    {skill.length > 30 ? skill.slice(0, 30) + '...' : skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#8D9AAE]">
                {formation.career.length} opportunités de carrière
              </span>
              <div className="flex items-center gap-2 text-[#D80536] font-semibold group-hover:gap-4 transition-all">
                En savoir plus
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

