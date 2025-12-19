import { Formation } from "./site-data";

export const formationsDataFr: Omit<Formation, "id" | "slug" | "icon">[] = [
  {
    title: "Délégué Médical",
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
    ]
  },
  {
    title: "Secrétariat Médical",
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
    ]
  },
  {
    title: "Massothérapie",
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
    ]
  },
  {
    title: "Aide Chimiste Biologiste",
    shortDescription: "Formation aux analyses médicales et biologiques en laboratoire",
    fullDescription: "L'aide chimiste biologiste effectue des analyses médicales et biologiques essentielles au diagnostic et au suivi des patients. Il travaille en laboratoire et maîtrise les techniques d'analyse, le matériel spécialisé et les protocoles de qualité.",
    duration: "2 ans",
    level: "Bac requis",
    career: [
      "Technicien de laboratoire médical",
      "Aide biologiste",
      "Technicien d'analyses biomédicales",
      "Assistant en laboratoire de recherche"
    ],
    skills: [
      "Techniques d'analyses biologiques",
      "Utilisation d'équipements de laboratoire",
      "Respect des protocoles de sécurité",
      "Rigueur et précision scientifique",
      "Travaux de synthèse et reporting"
    ]
  },
  {
    title: "Diététique et Nutrition",
    shortDescription: "Formation en nutrition, diététique et conseil alimentaire",
    fullDescription: "Le diététicien conseille et accompagne les personnes dans leur alimentation pour optimiser leur santé. Il élabore des régimes adaptés, éduque à la nutrition et intervient dans la prévention des maladies liées à l'alimentation.",
    duration: "2 ans",
    level: "Bac requis",
    career: [
      "Diététicien(ne) en cabinet",
      "Conseiller en nutrition",
      "Diététicien en établissement de santé",
      "Consultant en nutrition sportive"
    ],
    skills: [
      "Connaissances en nutrition et physiologie",
      "Élaboration de régimes alimentaires",
      "Éducation nutritionnelle",
      "Conseil et accompagnement personnalisé"
    ]
  },
  {
    title: "Vendeur en Pharmacie",
    shortDescription: "Formation à la vente et conseil en officine pharmaceutique",
    fullDescription: "Le vendeur en pharmacie assiste le pharmacien dans la vente de produits pharmaceutiques et parapharmaceutiques. Il conseille les clients, gère les stocks et participe à la gestion commerciale de l'officine.",
    duration: "2 ans",
    level: "BEPC minimum",
    career: [
      "Vendeur en officine",
      "Conseiller en parapharmacie",
      "Assistant en pharmacie d'hôpital",
      "Responsable de rayon pharmaceutique"
    ],
    skills: [
      "Connaissance des produits pharmaceutiques",
      "Techniques de vente et conseil",
      "Gestion des stocks et commandes",
      "Relation client et service"
    ]
  }
];

export const formationsDataEn: Omit<Formation, "id" | "slug" | "icon">[] = [
  {
    title: "Medical Representative",
    shortDescription: "Training in medical representation and pharmaceutical promotion",
    fullDescription: "The medical representative promotes pharmaceutical products to healthcare professionals. They represent pharmaceutical laboratories and establish privileged relationships with doctors, pharmacists and other actors in the medical sector.",
    duration: "2 years",
    level: "Bachelor's degree required",
    career: [
      "Medical representative in pharmaceutical laboratory",
      "Medical visitor",
      "Medical sector manager",
      "Pharmaceutical product manager"
    ],
    skills: [
      "In-depth knowledge of pharmaceutical products",
      "Communication and negotiation techniques",
      "Mastery of scientific argumentation",
      "Client portfolio management"
    ]
  },
  {
    title: "Medical Secretary",
    shortDescription: "Administrative training specialized in the healthcare sector",
    fullDescription: "The medical secretary acts as an interface between patients, healthcare professionals and administrative structures. They manage reception, appointments, medical records and ensure the smooth administrative operation of medical practices and healthcare facilities.",
    duration: "2 years",
    level: "Bachelor's degree required",
    career: [
      "Medical secretary in practice",
      "Medical-administrative assistant",
      "Medical records manager",
      "Reception manager in healthcare facility"
    ],
    skills: [
      "Administrative and organizational management",
      "Mastery of medical terminology",
      "Patient reception and relations",
      "Use of medical software"
    ]
  },
  {
    title: "Massage Therapy",
    shortDescription: "Training in therapeutic and wellness massage techniques",
    fullDescription: "The massage therapist masters various massage techniques to relieve pain, improve blood circulation and promote general well-being. This training combines anatomical theory and intensive practice of manual techniques.",
    duration: "2 years",
    level: "BEPC minimum",
    career: [
      "Massage therapist in private practice",
      "Therapist in wellness center",
      "Practitioner in spa and hospitality",
      "Sports massage therapist"
    ],
    skills: [
      "Mastery of massage techniques",
      "Knowledge of human anatomy",
      "Helping relationship and listening",
      "Adaptation to specific needs"
    ]
  },
  {
    title: "Laboratory Assistant",
    shortDescription: "Training in medical and biological laboratory analysis",
    fullDescription: "The laboratory assistant performs medical and biological analyses essential for patient diagnosis and monitoring. They work in laboratories and master analysis techniques, specialized equipment and quality protocols.",
    duration: "2 years",
    level: "Bachelor's degree required",
    career: [
      "Medical laboratory technician",
      "Biology assistant",
      "Biomedical analysis technician",
      "Research laboratory assistant"
    ],
    skills: [
      "Biological analysis techniques",
      "Use of laboratory equipment",
      "Compliance with safety protocols",
      "Scientific rigor and precision",
      "Synthesis work and reporting"
    ]
  },
  {
    title: "Dietetics and Nutrition",
    shortDescription: "Training in nutrition, dietetics and dietary counseling",
    fullDescription: "The dietitian advises and supports people in their diet to optimize their health. They develop adapted diets, educate on nutrition and intervene in the prevention of diet-related diseases.",
    duration: "2 years",
    level: "Bachelor's degree required",
    career: [
      "Dietitian in practice",
      "Nutrition advisor",
      "Dietitian in healthcare facility",
      "Sports nutrition consultant"
    ],
    skills: [
      "Knowledge in nutrition and physiology",
      "Development of dietary plans",
      "Nutritional education",
      "Personalized counseling and support"
    ]
  },
  {
    title: "Pharmacy Sales Assistant",
    shortDescription: "Training in sales and counseling in pharmaceutical practice",
    fullDescription: "The pharmacy sales assistant helps the pharmacist in selling pharmaceutical and parapharmaceutical products. They advise customers, manage stocks and participate in the commercial management of the pharmacy.",
    duration: "2 years",
    level: "BEPC minimum",
    career: [
      "Sales assistant in pharmacy",
      "Parapharmacy advisor",
      "Hospital pharmacy assistant",
      "Pharmaceutical department manager"
    ],
    skills: [
      "Knowledge of pharmaceutical products",
      "Sales and counseling techniques",
      "Stock and order management",
      "Customer relations and service"
    ]
  }
];
