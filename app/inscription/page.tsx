"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { createClient } from "@/lib/supabase/client";

export default function InscriptionPage() {
  const { t } = useI18n();
  const formations = useFormations();
  const siteInfo = useSiteInfo();
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "Camerounaise",

    // Coordonnées
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    postalCode: "",

    // Informations familiales
    fatherName: "",
    fatherProfession: "",
    fatherPhone: "",
    motherName: "",
    motherProfession: "",
    motherPhone: "",

    // Contact d'urgence
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",

    // Formation
    formation: "",
    level: "",
    lastSchool: "",
    lastDiploma: "",
    diplomaYear: "",
    preferredStartDate: "",

    // Motivation
    message: "",
    careerGoals: "",
    whyThisFormation: "",
  });

  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): string[] => {
    const errors: string[] = [];

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) {
          errors.push(t('inscription.firstName') || 'Prénom');
        }
        if (!formData.lastName.trim()) {
          errors.push(t('inscription.lastName') || 'Nom');
        }
        if (!formData.email.trim()) {
          errors.push(t('inscription.email') || 'Email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.push('Email (format invalide)');
        }
        if (!formData.phone.trim()) {
          errors.push(t('inscription.phone') || 'Téléphone');
        }
        if (!formData.dateOfBirth) {
          errors.push(t('inscription.dateOfBirth') || 'Date de naissance');
        }
        if (!photo) {
          errors.push(t('inscription.photo') || 'Photo');
        }
        if (!formData.gender) {
          errors.push(t('inscription.gender') || 'Genre');
        }
        if (!formData.city.trim()) {
          errors.push(t('inscription.city') || 'Ville');
        }
        if (!formData.address.trim()) {
          errors.push(t('inscription.fullAddress') || 'Adresse complète');
        }
        break;

      case 2: // Family Information (all optional)
        // No required fields
        break;

      case 3: // Formation
        if (!formData.formation) {
          errors.push(t('inscription.chooseFormation') || 'Formation souhaitée');
        }
        if (!formData.level) {
          errors.push(t('inscription.currentLevel') || 'Niveau actuel');
        }
        break;

      case 4: // Motivation (at least one field recommended)
        // Optional but recommended
        break;

      default:
        break;
    }

    return errors;
  };

  const nextStep = () => {
    // Validate current step before advancing
    const errors = validateStep(currentStep);

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Clear errors and advance to next step
    setValidationErrors([]);
    setShowErrors(false);

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    // Clear errors when going back
    setValidationErrors([]);
    setShowErrors(false);

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t('inscription.step1Title') || 'Informations personnelles';
      case 2: return t('inscription.step2Title') || 'Informations familiales';
      case 3: return t('inscription.step3Title') || 'Formation souhaitée';
      case 4: return t('inscription.step4Title') || 'Motivation et message';
      default: return '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Empêcher toute soumission par la touche Entrée
    // Le formulaire ne doit se soumettre que par clic sur le bouton
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      // Permettre Entrée seulement dans les textarea pour les sauts de ligne
      if (target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Ne soumettre que si on est à la dernière étape
    if (currentStep !== totalSteps) {
      return;
    }

    // Validate all steps before final submission
    let allErrors: string[] = [];
    for (let step = 1; step <= totalSteps; step++) {
      const stepErrors = validateStep(step);
      allErrors = [...allErrors, ...stepErrors];
    }

    if (allErrors.length > 0) {
      setValidationErrors(allErrors);
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const supabase = createClient();

      const { data: inscriptionData, error } = await supabase.from('inscriptions').insert({
        // Informations personnelles
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth,
        place_of_birth: formData.placeOfBirth || null,
        nationality: formData.nationality || null,

        // Coordonnées
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp || null,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode || null,
        country: 'Cameroun',

        // Informations familiales
        father_name: formData.fatherName || null,
        father_profession: formData.fatherProfession || null,
        father_phone: formData.fatherPhone || null,
        mother_name: formData.motherName || null,
        mother_profession: formData.motherProfession || null,
        mother_phone: formData.motherPhone || null,

        // Contact d'urgence
        emergency_contact_name: formData.emergencyContactName || null,
        emergency_contact_relationship: formData.emergencyContactRelationship || null,
        emergency_contact_phone: formData.emergencyContactPhone || null,

        // Formation
        desired_formation: formData.formation,
        academic_level: formData.level,
        last_school_attended: formData.lastSchool || null,
        last_diploma_obtained: formData.lastDiploma || null,
        diploma_year: formData.diplomaYear || null,
        preferred_start_date: formData.preferredStartDate || null,

        // Motivation
        motivation_message: formData.message || null,
        career_goals: formData.careerGoals || null,
        why_this_formation: formData.whyThisFormation || null,

        // Statut
        status: 'pending',
        source: 'website',
      }).select().single();

      if (error || !inscriptionData) {
        console.error('Supabase error details:', {
          message: error?.message,
          details: error?.details,
          hint: error?.hint,
          code: error?.code,
        });
        throw new Error(error?.message || 'Failed to submit inscription');
      }

      // Envoyer l'email de confirmation à l'étudiant
      try {
        const formationTitle = formations.find(f => f.slug === formData.formation)?.title || formData.formation;

        await fetch('/api/send-inscription-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            formation: formationTitle,
            status: 'pending',
          }),
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Ne pas bloquer l'inscription si l'email échoue
      }

      setSubmitStatus("success");

      // Rediriger vers la page de la fiche d'inscription
      router.push(`/inscription/fiche/${inscriptionData.id}`);
    } catch (error: any) {
      console.error('Inscription error:', {
        message: error?.message || 'Unknown error',
        error: error,
        stack: error?.stack,
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Stanford Style */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#0000fe] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-inscription.jpg"
            alt="Inscription INSES - Rejoignez-nous"
            fill
            className="object-cover opacity-20"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-[#0000fe]/80" />
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
              <div className="bg-white text-[#0000fe] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
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

            {/* Error Message */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 flex items-center gap-4"
              >
                <AlertCircle className="text-red-500 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-1">
                    Erreur lors de l'inscription
                  </h3>
                  <p className="text-red-700 text-[15px]">
                    Une erreur s'est produite. Veuillez réessayer ou nous contacter.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Validation Errors */}
            {showErrors && validationErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-6 mb-8"
              >
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-3">
                      Veuillez remplir tous les champs obligatoires
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-red-700 text-[15px]">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-t-4 border-[#0000fe] p-10 md:p-12"
            >
              {/* Progress Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#4A4A4A] uppercase tracking-wide">
                    Étape {currentStep} sur {totalSteps}
                  </span>
                  <span className="text-sm font-semibold text-[#0000fe]">
                    {Math.round((currentStep / totalSteps) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#D3D3D3] h-2">
                  <motion.div
                    className="bg-[#0000fe] h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mt-4">
                  {getStepTitle()}
                </h3>
              </div>

              <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown} className="space-y-10">
                {/* Step 1: Informations personnelles */}
                {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <User className="text-[#0000fe]" size={28} />
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
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="photo"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.photo')} *
                      </label>
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        required
                        onChange={handlePhotoChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                      />
                      {photoPreview && (
                        <div className="mt-3">
                          <img
                            src={photoPreview}
                            alt="Photo preview"
                            className="w-32 h-40 object-cover border-2 border-[#D3D3D3] rounded"
                          />
                        </div>
                      )}
                      <p className="text-xs text-[#4A4A4A]/70 mt-2">
                        {t('inscription.photoNote')}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.gender')} *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">{t('inscription.selectLevel')}</option>
                        <option value="male">{t('inscription.male')}</option>
                        <option value="female">{t('inscription.female')}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="placeOfBirth"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.placeOfBirth')}
                      </label>
                      <input
                        type="text"
                        id="placeOfBirth"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.placeOfBirthPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="nationality"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.nationality')}
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.nationalityPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.whatsapp')}
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]/50"
                          size={18}
                        />
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                          placeholder={t('inscription.whatsappPlaceholder')}
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                          placeholder={t('inscription.cityPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.postalCode')}
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.postalCodePlaceholder')}
                      />
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
                      className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                      placeholder={t('inscription.addressPlaceholder')}
                    />
                  </div>
                </div>
                )}

                {/* Step 2: Informations familiales */}
                {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <User className="text-[#0000fe]" size={28} />
                    {t('inscription.familyInfoTitle')}
                  </h2>

                  <div className="space-y-6">
                    {/* Père */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">
                          {t('inscription.fatherInfo')}
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.fatherName')}
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.fatherProfession')}
                        </label>
                        <input
                          type="text"
                          name="fatherProfession"
                          value={formData.fatherProfession}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.fatherPhone')}
                        </label>
                        <input
                          type="tel"
                          name="fatherPhone"
                          value={formData.fatherPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                          placeholder="+237 6XX XX XX XX"
                        />
                      </div>

                      {/* Mère */}
                      <div className="md:col-span-2 mt-6">
                        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">
                          {t('inscription.motherInfo')}
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.motherName')}
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.motherProfession')}
                        </label>
                        <input
                          type="text"
                          name="motherProfession"
                          value={formData.motherProfession}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.motherPhone')}
                        </label>
                        <input
                          type="tel"
                          name="motherPhone"
                          value={formData.motherPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                          placeholder="+237 6XX XX XX XX"
                        />
                      </div>

                      {/* Contact d'urgence */}
                      <div className="md:col-span-2 mt-6">
                        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">
                          {t('inscription.emergencyContact')}
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.emergencyContactName')}
                        </label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.emergencyContactRelationship')}
                        </label>
                        <input
                          type="text"
                          name="emergencyContactRelationship"
                          value={formData.emergencyContactRelationship}
                          onChange={handleChange}
                          placeholder={t('inscription.relationshipPlaceholder')}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
                          {t('inscription.emergencyContactPhone')}
                        </label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                          placeholder="+237 6XX XX XX XX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Step 3: Formation souhaitée */}
                {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <GraduationCap className="text-[#0000fe]" size={28} />
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
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                      >
                        <option value="">{t('inscription.selectLevel')}</option>
                        <option value="bepc">{t('inscription.bepc')}</option>
                        <option value="probatoire">{t('inscription.probatoire')}</option>
                        <option value="bac">{t('inscription.bac')}</option>
                        <option value="licence">{t('inscription.licence')}</option>
                        <option value="autre">{t('inscription.other')}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lastSchool"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.lastSchool')}
                      </label>
                      <input
                        type="text"
                        id="lastSchool"
                        name="lastSchool"
                        value={formData.lastSchool}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.lastSchoolPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastDiploma"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.lastDiploma')}
                      </label>
                      <input
                        type="text"
                        id="lastDiploma"
                        name="lastDiploma"
                        value={formData.lastDiploma}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.lastDiplomaPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="diplomaYear"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.diplomaYear')}
                      </label>
                      <input
                        type="text"
                        id="diplomaYear"
                        name="diplomaYear"
                        value={formData.diplomaYear}
                        onChange={handleChange}
                        maxLength={4}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                        placeholder={t('inscription.diplomaYearPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferredStartDate"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.preferredStartDate')}
                      </label>
                      <select
                        id="preferredStartDate"
                        name="preferredStartDate"
                        value={formData.preferredStartDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all"
                      >
                        <option value="">{t('inscription.selectStartDate')}</option>
                        <option value="Janvier 2025">Janvier 2025</option>
                        <option value="Septembre 2025">Septembre 2025</option>
                        <option value="Janvier 2026">Janvier 2026</option>
                        <option value="Septembre 2026">Septembre 2026</option>
                      </select>
                    </div>
                  </div>
                </div>
                )}

                {/* Step 4: Message et Motivation */}
                {currentStep === 4 && (
                <div>
                  {/* Info Messages */}
                  <div className="space-y-4 mb-8">
                    {/* Documents à fournir */}
                    <div className="bg-[#F5F5F5] border-l-4 border-[#0000fe] p-6 flex items-start gap-3">
                      <AlertCircle className="text-[#0000fe] flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm text-[#4A4A4A]/80">
                        <p className="font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide text-xs">
                          {t('inscription.documentsTitle')}
                        </p>
                        <ul className="space-y-1 mb-3">
                          <li>• {t('inscription.birthCertificate')}</li>
                          <li>• {t('inscription.diploma')}</li>
                          <li>• {t('inscription.photos')}</li>
                          <li>• {t('inscription.idCard')}</li>
                        </ul>
                        <p className="text-xs font-semibold text-[#0000fe]">
                          {t('inscription.documentsRequiredNote')}
                        </p>
                      </div>
                    </div>

                    {/* Note PDF */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 flex items-start gap-3">
                      <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">
                          {t('inscription.pdfNoteTitle')}
                        </p>
                        <p className="text-xs">
                          {t('inscription.pdfNote')}
                        </p>
                      </div>
                    </div>
                  </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
                    <FileText className="text-[#0000fe]" size={28} />
                    {t('inscription.messageTitle')}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="whyThisFormation"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.whyThisFormation')}
                      </label>
                      <textarea
                        id="whyThisFormation"
                        name="whyThisFormation"
                        value={formData.whyThisFormation}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all resize-none"
                        placeholder={t('inscription.whyThisFormationPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="careerGoals"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.careerGoals')}
                      </label>
                      <textarea
                        id="careerGoals"
                        name="careerGoals"
                        value={formData.careerGoals}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all resize-none"
                        placeholder={t('inscription.careerGoalsPlaceholder')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
                      >
                        {t('inscription.additionalMessage')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#0000fe] focus:border-transparent transition-all resize-none"
                        placeholder={t('inscription.messagePlaceholder')}
                      />
                    </div>
                  </div>
                </div>
                </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-[#D3D3D3]">
                  {/* Previous Button */}
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-[#0000fe] text-[#0000fe] px-8 py-4 font-semibold text-base hover:bg-[#0000fe] hover:text-white transition-colors"
                    >
                      ← Précédent
                    </motion.button>
                  )}

                  {/* Spacer for alignment when no previous button */}
                  {currentStep === 1 && <div></div>}

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Help Button */}
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-[#4A4A4A] text-[#4A4A4A] px-8 py-4 font-semibold text-base hover:bg-[#4A4A4A] hover:text-white transition-colors text-center"
                    >
                      {t('inscription.needHelp')}
                    </motion.a>

                    {/* Next or Submit Button */}
                    {currentStep < totalSteps ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#B22234] text-white px-8 py-4 font-semibold text-base hover:bg-[#800020] transition-colors"
                      >
                        Suivant →
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#B22234] text-white px-8 py-4 font-semibold text-base hover:bg-[#800020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? t('inscription.submitting') : t('inscription.submitButton')}
                      </motion.button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
