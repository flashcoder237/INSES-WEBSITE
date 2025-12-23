// Données du site INSES

export const siteInfo = {
  name: "INSES",
  fullName: "Institut Supérieur de l'Espoir",
  description: "Institut de formation professionnelle pour les métiers de la santé à Douala, Cameroun",
  location: "Douala-Bonabéri, Cameroun",
  email: "contact@univ-inses.com",
  phone: "+237 674 93 66 04",
  otherPhones: [
    "+237 699 818 816",
    "+237 675 776 243",
    "+237 697 142 828"
  ],
  fixedLine: "9293 2000",
  whatsapp: "+237 674 93 66 04",
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  }
};

export interface Formation {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  level: string;
  career: string[];
  skills: string[];
  icon: string;
}

export const formations: Formation[] = [
  {
    id: "1",
    title: "Délégué Médical",
    slug: "delegue-medical",
    shortDescription: "Formation en représentation médicale et promotion pharmaceutique",
    fullDescription: "Le délégué médical assure la promotion des produits pharmaceutiques auprès des professionnels de santé. Il représente les laboratoires pharmaceutiques et établit des relations privilégiées avec les médecins, pharmaciens et autres acteurs du secteur médical.",
    duration: "2 ans",
    level: "Bac requis",
    career: [
      "Délégué médical en laboratoire pharmaceutique",
      "Visiteur médical",
      "Responsable de secteur médical",
      "Chef de produit pharmaceutique"
    ],
    skills: [
      "Connaissance approfondie des produits pharmaceutiques",
      "Techniques de communication et de négociation",
      "Maîtrise de l'argumentation scientifique",
      "Gestion de portefeuille clients"
    ],
    icon: "Stethoscope"
  },
  {
    id: "2",
    title: "Secrétariat Médical",
    slug: "secretariat-medical",
    shortDescription: "Formation administrative spécialisée dans le secteur de la santé",
    fullDescription: "Le secrétaire médical assure l'interface entre les patients, les professionnels de santé et les structures administratives. Il gère l'accueil, les rendez-vous, les dossiers médicaux et assure le bon fonctionnement administratif des cabinets médicaux et établissements de santé.",
    duration: "2 ans",
    level: "Bac requis",
    career: [
      "Secrétaire médical(e) en cabinet",
      "Assistant(e) médico-administratif",
      "Gestionnaire de dossiers médicaux",
      "Responsable d'accueil en établissement de santé"
    ],
    skills: [
      "Gestion administrative et organisationnelle",
      "Maîtrise de la terminologie médicale",
      "Accueil et relation patient",
      "Utilisation des logiciels médicaux"
    ],
    icon: "FileText"
  },
  {
    id: "3",
    title: "Massothérapie",
    slug: "massotherapie",
    shortDescription: "Formation aux techniques de massage thérapeutique et de bien-être",
    fullDescription: "Le massothérapeute maîtrise les différentes techniques de massage pour soulager les douleurs, améliorer la circulation sanguine et favoriser le bien-être général. Cette formation allie théorie anatomique et pratique intensive des techniques manuelles.",
    duration: "2 ans",
    level: "BEPC minimum",
    career: [
      "Massothérapeute en cabinet privé",
      "Thérapeute en centre de bien-être",
      "Praticien en spa et hôtellerie",
      "Masseur sportif"
    ],
    skills: [
      "Maîtrise des techniques de massage",
      "Connaissance de l'anatomie humaine",
      "Relation d'aide et écoute",
      "Adaptation aux besoins spécifiques"
    ],
    icon: "Heart"
  },
  {
    id: "4",
    title: "Aide Chimiste Biologiste",
    slug: "aide-chimiste-biologiste",
    shortDescription: "Formation polyvalente en analyses biologiques et chimiques de laboratoire",
    fullDescription: "L'aide chimiste biologiste est un agent de laboratoire polyvalent qui réalise des analyses biologiques et chimiques. Il effectue des prélèvements, réalise des analyses, recherche des germes et anomalies cellulaires, et participe à la préparation et l'exécution des opérations de laboratoire dans le strict respect des normes d'hygiène et de sécurité.",
    duration: "2 ans",
    level: "Bac scientifique requis",
    career: [
      "Technicien de laboratoire médical",
      "Assistant en analyses biologiques",
      "Technicien en laboratoire de recherche",
      "Agent de contrôle qualité en industrie pharmaceutique"
    ],
    skills: [
      "Réalisation de prélèvements et analyses",
      "Manipulation d'équipements de laboratoire",
      "Respect des protocoles d'hygiène et sécurité",
      "Interprétation des résultats d'analyses",
      "Travaux de synthèse et reporting"
    ],
    icon: "Microscope"
  },
  {
    id: "5",
    title: "Diététique et Nutrition",
    slug: "dietetique-nutrition",
    shortDescription: "Formation en nutrition et conseil diététique",
    fullDescription: "Le diététicien nutritionniste élabore des programmes alimentaires adaptés aux besoins spécifiques de chaque patient. Il conseille sur l'équilibre nutritionnel, aide à prévenir les maladies liées à l'alimentation et accompagne les personnes dans leurs objectifs de santé.",
    duration: "2 ans",
    level: "Bac scientifique requis",
    career: [
      "Diététicien(ne) en milieu hospitalier",
      "Consultant en nutrition",
      "Conseiller nutritionnel en cabinet privé",
      "Responsable qualité en restauration collective"
    ],
    skills: [
      "Connaissance approfondie de la nutrition",
      "Élaboration de régimes alimentaires",
      "Éducation nutritionnelle",
      "Évaluation des besoins nutritionnels"
    ],
    icon: "Apple"
  },
  {
    id: "6",
    title: "Vendeur en Pharmacie",
    slug: "vendeur-pharmacie",
    shortDescription: "Formation à la vente et au conseil en officine pharmaceutique",
    fullDescription: "Le vendeur en pharmacie assiste le pharmacien dans la vente et le conseil des produits pharmaceutiques et parapharmaceutiques. Il accueille les clients, oriente leur choix, gère les stocks et participe à la gestion quotidienne de l'officine.",
    duration: "2 ans",
    level: "BEPC minimum",
    career: [
      "Vendeur(se) en officine",
      "Assistant(e) en parapharmacie",
      "Conseiller(ère) en produits de santé",
      "Gestionnaire de stock pharmaceutique"
    ],
    skills: [
      "Connaissance des produits pharmaceutiques",
      "Techniques de vente et conseil",
      "Gestion des stocks et inventaires",
      "Relation client et service"
    ],
    icon: "Pill"
  }
];

export const aboutInfo = {
  mission: "L'INSES (Institut Supérieur de l'Espoir) forme les professionnels de santé de demain à travers des programmes d'excellence alliant théorie et pratique.",
  vision: "Devenir la référence en matière de formation professionnelle dans le secteur de la santé en Afrique Centrale.",
  values: [
    {
      title: "Excellence",
      description: "Nous visons l'excellence dans tous nos programmes de formation"
    },
    {
      title: "Pratique",
      description: "Une formation ancrée dans la réalité professionnelle avec des stages en milieu hospitalier"
    },
    {
      title: "Innovation",
      description: "Des méthodes pédagogiques modernes et adaptées aux enjeux actuels"
    },
    {
      title: "Accompagnement",
      description: "Un suivi personnalisé de chaque étudiant tout au long de son parcours"
    }
  ],
  pedagogy: {
    theoretical: "Enseignements théoriques dispensés par des professionnels expérimentés du secteur de la santé",
    practical: "Stages pratiques obligatoires dans des établissements de santé partenaires, notamment la Clinique Médico-chirurgicale de l'Espoir (CEMECES) et d'autres structures hospitalières de la région du Littoral",
    evaluation: "Formation organisée en modules avec plusieurs évaluations continues pour garantir l'acquisition des compétences"
  },
  partners: [
    "Clinique Médico-chirurgicale de l'Espoir (CEMECES)",
    "Établissements hospitaliers de la région du Littoral"
  ]
};

export const stats = [
  {
    value: "10+",
    label: "Ans d'expérience"
  },
  {
    value: "1000+",
    label: "Étudiants formés"
  },
  {
    value: "6",
    label: "Filières disponibles"
  },
  {
    value: "95%",
    label: "Taux de réussite"
  }
];

