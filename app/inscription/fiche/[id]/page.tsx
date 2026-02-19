"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useI18n } from "@/components/providers/I18nProvider";
import { useFormations } from "@/hooks/useFormations";

interface InscriptionData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  city: string;
  address: string;
  desired_formation: string;
  academic_level: string;
  photo_url?: string;
  whatsapp?: string;
  place_of_birth?: string;
  nationality?: string;
  father_name?: string;
  father_profession?: string;
  father_phone?: string;
  mother_name?: string;
  mother_profession?: string;
  mother_phone?: string;
  emergency_contact_name?: string;
  emergency_contact_relationship?: string;
  emergency_contact_phone?: string;
  last_school_attended?: string;
  last_diploma_obtained?: string;
  diploma_year?: string;
  preferred_start_date?: string;
  why_this_formation?: string;
  career_goals?: string;
  motivation_message?: string;
  created_at: string;
}

export default function FicheInscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t } = useI18n();
  const formations = useFormations();
  const [inscription, setInscription] = useState<InscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    const fetchInscription = async () => {
      const supabase = createClient();

      // Récupérer les données d'inscription
      const { data, error } = await supabase
        .from("inscriptions")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Erreur:", error);
        router.push("/inscription");
        return;
      }

      setInscription(data);

      // Récupérer la photo si elle existe
      if (data.photo_url) {
        setPhotoPreview(data.photo_url);
      }

      // Récupérer les infos du site
      const { data: siteData } = await supabase
        .from("site_info")
        .select("*")
        .single();

      setSiteInfo(siteData);
      setLoading(false);
    };

    fetchInscription();
  }, [id, router]);

  const handleDownloadPDF = async () => {
    if (!inscription) return;

    const element = document.getElementById('fiche-inscription');
    if (!element) return;

    // Importer html2pdf
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 0,
      filename: `Inscription_INSES_${inscription.last_name}_${inscription.first_name}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    // Convertir l'élément HTML en PDF
    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000fe] mx-auto mb-4"></div>
          <p className="text-gray-600">{t('fiche.loading')}</p>
        </div>
      </div>
    );
  }

  if (!inscription) {
    return null;
  }

  const dossierNumber = `INS-${new Date(inscription.created_at).getFullYear()}-${inscription.id.substring(0, 6).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Bouton Télécharger */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t('fiche.yourForm')}
            </h2>
            <p className="text-sm text-gray-600">
              {t('fiche.fileNumber')} {dossierNumber}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/inscription")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('common.back')}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-2 bg-[#0000fe] text-white rounded-lg hover:bg-[#0000b3] transition-colors font-semibold flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {t('fiche.downloadPDF')}
            </button>
          </div>
        </div>
      </div>

      {/* Fiche d'inscription (Format A4) */}
      <div id="fiche-inscription" className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none">
        {/* En-tête moderne */}
        <div className="bg-gradient-to-br from-[#0000fe] to-[#0000b3] text-white p-12 relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-2">INSES</h1>
            <div className="w-32 h-1 bg-white/50 mx-auto mb-4"></div>
            <p className="text-lg mb-1">Institut Supérieur de l'Espoir</p>
            <p className="text-sm text-white/80">
              {siteInfo?.location || "Douala-Bonabéri, Cameroun"}
            </p>

            <div className="inline-block bg-white text-[#0000fe] px-8 py-2 rounded-full font-bold mt-6 text-lg">
              {t('fiche.registrationForm')}
            </div>
          </div>
        </div>

        {/* Corps de la fiche */}
        <div className="p-12">
          {/* Informations du dossier */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  {t('fiche.fileNumberLabel')}
                </span>
                <span className="text-base font-bold text-[#0000fe]">
                  {dossierNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  {t('fiche.dateLabel')}
                </span>
                <span className="text-sm text-gray-800">
                  {new Date(inscription.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {inscription.photo_url && (
              <div className="w-32 h-40 relative border-4 border-[#0000fe] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={inscription.photo_url}
                  alt="Photo"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Formation demandée */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                  {t('fiche.desiredFormation')}
                </p>
                <h2 className="text-2xl font-bold text-blue-900">
                  {inscription.desired_formation}
                </h2>
              </div>
            </div>
          </div>

          {/* Section: Informations personnelles */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#0000fe] rounded"></div>
              <h3 className="text-xl font-bold text-gray-800">
                {t('fiche.personalInfo')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-6">
              <InfoItem label={t('fiche.lastName')} value={inscription.last_name} />
              <InfoItem label={t('fiche.firstName')} value={inscription.first_name} />
              <InfoItem
                label={t('fiche.gender')}
                value={inscription.gender === "male" ? t('fiche.male') : t('fiche.female')}
              />
              <InfoItem label={t('fiche.dateOfBirth')} value={inscription.date_of_birth} />
              {inscription.place_of_birth && (
                <InfoItem label={t('fiche.placeOfBirth')} value={inscription.place_of_birth} />
              )}
              {inscription.nationality && (
                <InfoItem label={t('fiche.nationality')} value={inscription.nationality} />
              )}
            </div>
          </div>

          {/* Section: Coordonnées */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#0000fe] rounded"></div>
              <h3 className="text-xl font-bold text-gray-800">{t('fiche.contactInfo')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-6">
              <InfoItem label={t('fiche.email')} value={inscription.email} link />
              <InfoItem label={t('fiche.phone')} value={inscription.phone} />
              {inscription.whatsapp && (
                <InfoItem label={t('fiche.whatsapp')} value={inscription.whatsapp} />
              )}
              <InfoItem label={t('fiche.city')} value={inscription.city} />
              <div className="col-span-2">
                <InfoItem label={t('fiche.address')} value={inscription.address} />
              </div>
            </div>
          </div>

          {/* Section: Informations familiales (si renseignées) */}
          {(inscription.father_name || inscription.mother_name || inscription.emergency_contact_name) && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#0000fe] rounded"></div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t('fiche.familyInfo')}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-6">
                {inscription.father_name && (
                  <>
                    <div className="col-span-2">
                      <InfoItem label={t('fiche.father')} value={inscription.father_name} />
                    </div>
                    {inscription.father_profession && (
                      <InfoItem label={t('fiche.profession')} value={inscription.father_profession} />
                    )}
                    {inscription.father_phone && (
                      <InfoItem label={t('fiche.phone')} value={inscription.father_phone} />
                    )}
                  </>
                )}
                {inscription.mother_name && (
                  <>
                    <div className="col-span-2">
                      <InfoItem label={t('fiche.mother')} value={inscription.mother_name} />
                    </div>
                    {inscription.mother_profession && (
                      <InfoItem label={t('fiche.profession')} value={inscription.mother_profession} />
                    )}
                    {inscription.mother_phone && (
                      <InfoItem label={t('fiche.phone')} value={inscription.mother_phone} />
                    )}
                  </>
                )}
                {inscription.emergency_contact_name && (
                  <>
                    <div className="col-span-2 mt-3">
                      <InfoItem
                        label={t('fiche.emergencyContact')}
                        value={inscription.emergency_contact_name}
                      />
                    </div>
                    {inscription.emergency_contact_relationship && (
                      <InfoItem
                        label={t('fiche.relationship')}
                        value={inscription.emergency_contact_relationship}
                      />
                    )}
                    {inscription.emergency_contact_phone && (
                      <InfoItem
                        label={t('fiche.phone')}
                        value={inscription.emergency_contact_phone}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Section: Parcours académique */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#0000fe] rounded"></div>
              <h3 className="text-xl font-bold text-gray-800">
                {t('fiche.academicInfo')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-6">
              <InfoItem label={t('fiche.currentLevel')} value={inscription.academic_level} />
              {inscription.last_school_attended && (
                <InfoItem
                  label={t('fiche.lastSchool')}
                  value={inscription.last_school_attended}
                />
              )}
              {inscription.last_diploma_obtained && (
                <InfoItem label={t('fiche.lastDiploma')} value={inscription.last_diploma_obtained} />
              )}
              {inscription.diploma_year && (
                <InfoItem label={t('fiche.diplomaYear')} value={inscription.diploma_year} />
              )}
              {inscription.preferred_start_date && (
                <InfoItem
                  label={t('fiche.preferredStartDate')}
                  value={inscription.preferred_start_date}
                />
              )}
            </div>
          </div>

          {/* Section: Motivation (si renseignée) */}
          {(inscription.why_this_formation ||
            inscription.career_goals ||
            inscription.motivation_message) && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#0000fe] rounded"></div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t('fiche.motivationInfo')}
                </h3>
              </div>
              <div className="space-y-4 pl-6">
                {inscription.why_this_formation && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {t('fiche.whyThisFormation')}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      {inscription.why_this_formation}
                    </p>
                  </div>
                )}
                {inscription.career_goals && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {t('fiche.careerGoals')}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      {inscription.career_goals}
                    </p>
                  </div>
                )}
                {inscription.motivation_message && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {t('fiche.additionalMessage')}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      {inscription.motivation_message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents requis */}
          <div className="mb-12 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 mb-3 text-lg">
                  {t('fiche.requiredDocuments')}
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{t('fiche.birthCertificate')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{t('fiche.lastDiplomaOriginal')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{t('fiche.photos')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{t('fiche.idCard')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{t('fiche.medicalCertificate')}</span>
                  </li>
                </ul>
                <p className="text-xs text-amber-700 mt-4 italic">
                  {t('fiche.provisionalDocument')}
                </p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-8">
                {t('fiche.candidateSignature')}
              </p>
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-xs text-gray-500">
                  Date : _____ / _____ / __________
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-8">
                {t('fiche.adminSignature')}
              </p>
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-xs text-gray-500">
                  Date : _____ / _____ / __________
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-8 px-12 text-center">
          <p className="font-bold mb-2">INSES - Institut Supérieur de l'Espoir</p>
          <p className="text-sm text-gray-400 mb-1">
            {siteInfo?.location || "Douala-Bonabéri, Cameroun"}
          </p>
          <p className="text-xs text-gray-500">
            {siteInfo?.phone || "+237 674 93 66 04"} •{" "}
            {siteInfo?.email || "contact@univ-inses.com"} • www.univ-inses.com
          </p>
        </div>
      </div>

      {/* Bouton en bas (visible uniquement à l'écran) */}
      <div className="max-w-4xl mx-auto px-4 mt-6 print:hidden">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            {t('fiche.downloadPrompt')}
          </p>
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-[#0000fe] text-white rounded-lg hover:bg-[#0000b3] transition-colors font-semibold inline-flex items-center gap-2 text-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t('fiche.downloadMyForm')}
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant helper pour afficher une ligne d'information
function InfoItem({
  label,
  value,
  link = false,
}: {
  label: string;
  value: string;
  link?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
      {link ? (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );
}
