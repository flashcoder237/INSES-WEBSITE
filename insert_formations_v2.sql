-- Créer la table formations si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.formations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  title_fr VARCHAR NOT NULL,
  title_en VARCHAR NOT NULL,
  short_description_fr TEXT,
  short_description_en TEXT,
  full_description_fr TEXT,
  full_description_en TEXT,
  duration VARCHAR,
  level VARCHAR,
  icon VARCHAR,
  image VARCHAR,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  center_id UUID,
  center_slug VARCHAR
);

-- FILIÈRES SANTÉ / HEALTH SECTOR
-- BTS/HND, Licence Professionnelle/Bachelor's Degree (BAC et plus)

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
(
  'sciences-infirmieres-bts',
  'Sciences Infirmières',
  'Nursing Sciences',
  'Formation complète en soins infirmiers avec théorie et pratique intensive',
  'Complete nursing training with intensive theory and practice',
  'La formation en sciences infirmières vous prépare à devenir un professionnel de santé capable de dispenser des soins de qualité. Vous apprendrez les techniques de soins, l''anatomie, la pharmacologie et développerez vos compétences relationnelles.',
  'Nursing sciences training prepares you to become a healthcare professional capable of providing quality care. You will learn care techniques, anatomy, pharmacology and develop your interpersonal skills.',
  '3 ans',
  'Bac + 3',
  1
),
(
  'sage-femme',
  'Sage-Femme',
  'Midwifery',
  'Formation spécialisée en obstétrique et soins de la mère et de l''enfant',
  'Specialized training in obstetrics and mother-child care',
  'La formation de sage-femme vous prépare à accompagner les femmes durant la grossesse, l''accouchement et le post-partum. Vous développerez des compétences en surveillance médicale, en accompagnement psychologique et en soins néonataux.',
  'Midwifery training prepares you to support women during pregnancy, childbirth and postpartum. You will develop skills in medical monitoring, psychological support and neonatal care.',
  '3 ans',
  'Bac + 3',
  2
),
(
  'techniques-laboratoire',
  'Techniques de Laboratoire',
  'Laboratory Techniques',
  'Formation aux analyses médicales et biologiques en laboratoire',
  'Training in medical and biological laboratory analysis',
  'La formation en techniques de laboratoire vous forme aux analyses médicales essentielles au diagnostic. Vous maîtriserez les techniques d''analyse, les équipements de laboratoire et les protocoles de qualité et sécurité.',
  'Laboratory techniques training prepares you for medical analyses essential for diagnosis. You will master analysis techniques, laboratory equipment and quality and safety protocols.',
  '3 ans',
  'Bac + 3',
  3
),
(
  'kinesitherapie',
  'Kinésithérapie',
  'Physiotherapy',
  'Formation en rééducation fonctionnelle et thérapie physique',
  'Training in functional rehabilitation and physical therapy',
  'La formation en kinésithérapie vous prépare à la rééducation et à la réadaptation des patients. Vous apprendrez les techniques de massage, de mobilisation et les thérapies manuelles pour traiter diverses pathologies.',
  'Physiotherapy training prepares you for patient rehabilitation and readaptation. You will learn massage techniques, mobilization and manual therapies to treat various pathologies.',
  '3 ans',
  'Bac + 3',
  4
),
(
  'dietetique-bts',
  'Diététique',
  'Dietetics',
  'Formation en nutrition, diététique et conseil alimentaire',
  'Training in nutrition, dietetics and dietary counseling',
  'La formation en diététique vous forme à conseiller et accompagner les personnes dans leur alimentation. Vous élaborerez des régimes adaptés, éduquerez à la nutrition et interviendrez dans la prévention des maladies liées à l''alimentation.',
  'Dietetics training prepares you to advise and support people in their diet. You will develop adapted diets, educate on nutrition and intervene in the prevention of diet-related diseases.',
  '3 ans',
  'Bac + 3',
  5
),
(
  'radiologie-imagerie',
  'Radiologie et Imagérie Médicale',
  'Radiology and Medical Imaging',
  'Formation aux techniques d''imagerie médicale et de radioprotection',
  'Training in medical imaging techniques and radiation protection',
  'La formation en radiologie et imagérie médicale vous prépare à réaliser des examens d''imagerie (radiographie, scanner, IRM, échographie). Vous apprendrez les techniques d''imagerie, la radioprotection et l''interprétation des images.',
  'Radiology and medical imaging training prepares you to perform imaging examinations (radiography, CT scan, MRI, ultrasound). You will learn imaging techniques, radiation protection and image interpretation.',
  '3 ans',
  'Bac + 3',
  6
),
(
  'techniques-pharmaceutiques',
  'Techniques Pharmaceutiques',
  'Pharmaceutical Techniques',
  'Formation en préparation et contrôle des produits pharmaceutiques',
  'Training in preparation and control of pharmaceutical products',
  'La formation en techniques pharmaceutiques vous prépare à travailler dans l''industrie pharmaceutique ou en officine. Vous apprendrez la préparation des médicaments, le contrôle qualité et la gestion des stocks pharmaceutiques.',
  'Pharmaceutical techniques training prepares you to work in the pharmaceutical industry or pharmacy. You will learn drug preparation, quality control and pharmaceutical stock management.',
  '3 ans',
  'Bac + 3',
  7
)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- Master Professionnel / Master's Degree

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
(
  'sciences-infirmieres-master',
  'Sciences Infirmières (Master)',
  'Nursing Sciences (Master)',
  'Formation avancée en sciences infirmières et gestion des soins',
  'Advanced training in nursing sciences and care management',
  'Le Master en sciences infirmières approfondit vos compétences cliniques et vous forme à la recherche en soins. Vous développerez des compétences en management, en éducation thérapeutique et en pratique avancée infirmière.',
  'The Master in nursing sciences deepens your clinical skills and trains you in care research. You will develop skills in management, therapeutic education and advanced nursing practice.',
  '2 ans',
  'Bac + 5',
  8
),
(
  'sante-publique',
  'Santé Publique',
  'Public Health',
  'Formation en épidémiologie, prévention et gestion de la santé des populations',
  'Training in epidemiology, prevention and population health management',
  'Le Master en santé publique vous forme à analyser et améliorer la santé des populations. Vous étudierez l''épidémiologie, la prévention, la promotion de la santé et la gestion des systèmes de santé.',
  'The Master in public health trains you to analyze and improve population health. You will study epidemiology, prevention, health promotion and health systems management.',
  '2 ans',
  'Bac + 5',
  9
),
(
  'sante-reproduction',
  'Santé de la Reproduction',
  'Reproductive Health',
  'Formation spécialisée en santé reproductive, maternelle et infantile',
  'Specialized training in reproductive, maternal and child health',
  'Le Master en santé de la reproduction vous spécialise dans la santé reproductive, maternelle et infantile. Vous développerez une expertise en planification familiale, santé maternelle et prise en charge des nouveau-nés.',
  'The Master in reproductive health specializes you in reproductive, maternal and child health. You will develop expertise in family planning, maternal health and newborn care.',
  '2 ans',
  'Bac + 5',
  10
),
(
  'sciences-biomedicales',
  'Sciences Biomédicales',
  'Biomedical Sciences',
  'Formation avancée en recherche biomédicale et biotechnologies',
  'Advanced training in biomedical research and biotechnology',
  'Le Master en sciences biomédicales vous forme à la recherche scientifique appliquée à la santé. Vous développerez des compétences en biologie moléculaire, génétique, immunologie et techniques de laboratoire avancées.',
  'The Master in biomedical sciences trains you in scientific research applied to health. You will develop skills in molecular biology, genetics, immunology and advanced laboratory techniques.',
  '2 ans',
  'Bac + 5',
  11
),
(
  'dietetique-nutrition-master',
  'Diététique et Nutrition (Master)',
  'Dietetics and Nutrition (Master)',
  'Formation avancée en nutrition clinique et santé publique nutritionnelle',
  'Advanced training in clinical nutrition and public nutritional health',
  'Le Master en diététique et nutrition approfondit vos connaissances en nutrition clinique et santé publique. Vous développerez une expertise en nutrition thérapeutique, recherche nutritionnelle et gestion de programmes alimentaires.',
  'The Master in dietetics and nutrition deepens your knowledge in clinical nutrition and public health. You will develop expertise in therapeutic nutrition, nutritional research and food program management.',
  '2 ans',
  'Bac + 5',
  12
)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- BTS FILIÈRES COMMERCE ET GESTION (BAC et plus)

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
('comptabilite-gestion', 'Comptabilité et Gestion des Entreprises', 'Accounting and Business Management',
  'Formation en comptabilité, finance et gestion d''entreprise', 'Training in accounting, finance and business management',
  'Le BTS Comptabilité et Gestion forme des professionnels capables de gérer la comptabilité, la fiscalité et les finances d''une entreprise. Vous maîtriserez les techniques comptables, les logiciels de gestion et le droit fiscal.',
  'The Accounting and Business Management degree trains professionals capable of managing accounting, taxation and company finances. You will master accounting techniques, management software and tax law.',
  '2 ans', 'Bac', 20),
('gestion-rh', 'Gestion des Ressources Humaines', 'Human Resources Management',
  'Formation en recrutement, gestion du personnel et développement RH', 'Training in recruitment, personnel management and HR development',
  'Le BTS Gestion des Ressources Humaines vous forme à gérer le capital humain de l''entreprise. Vous apprendrez le recrutement, la gestion de la paie, le droit du travail et le développement des compétences.',
  'The Human Resources Management degree trains you to manage the company''s human capital. You will learn recruitment, payroll management, labor law and skills development.',
  '2 ans', 'Bac', 21),
('douane-transit', 'Douane et Transit', 'Customs and Transit',
  'Formation en procédures douanières et gestion des opérations de transit', 'Training in customs procedures and transit operations management',
  'Le BTS Douane et Transit forme des spécialistes du commerce international. Vous maîtriserez les procédures douanières, la réglementation du commerce extérieur et la gestion logistique des marchandises.',
  'The Customs and Transit degree trains international trade specialists. You will master customs procedures, foreign trade regulations and goods logistics management.',
  '2 ans', 'Bac', 22),
('banque-finance', 'Banque et Finance', 'Banking and Finance',
  'Formation en produits bancaires, services financiers et conseil client', 'Training in banking products, financial services and customer advice',
  'Le BTS Banque et Finance vous prépare aux métiers bancaires et financiers. Vous apprendrez les produits bancaires, les services financiers, le conseil clientèle et la gestion de portefeuille.',
  'The Banking and Finance degree prepares you for banking and financial careers. You will learn banking products, financial services, customer advice and portfolio management.',
  '2 ans', 'Bac', 23),
('logistique-transport', 'Logistique et Transport', 'Logistics and Transport',
  'Formation en gestion de la chaîne logistique et organisation des transports', 'Training in supply chain management and transport organization',
  'Le BTS Logistique et Transport forme des professionnels de la chaîne logistique. Vous maîtriserez la gestion des stocks, l''organisation des transports, l''optimisation des flux et la réglementation du transport.',
  'The Logistics and Transport degree trains supply chain professionals. You will master inventory management, transport organization, flow optimization and transport regulations.',
  '2 ans', 'Bac', 24),
('assurance', 'Assurance', 'Insurance',
  'Formation en produits d''assurance, gestion des risques et conseil client', 'Training in insurance products, risk management and customer advice',
  'Le BTS Assurance vous prépare aux métiers de l''assurance et de la gestion des risques. Vous apprendrez les produits d''assurance, l''évaluation des risques, le conseil client et la gestion des sinistres.',
  'The Insurance degree prepares you for careers in insurance and risk management. You will learn insurance products, risk assessment, customer advice and claims management.',
  '2 ans', 'Bac', 25),
('marketing-commerce-vente', 'Marketing-Commerce-Vente', 'Marketing-Commerce-Sales',
  'Formation en techniques commerciales, marketing et stratégie de vente', 'Training in sales techniques, marketing and sales strategy',
  'Le BTS Marketing-Commerce-Vente forme des professionnels de la vente et du marketing. Vous développerez des compétences en prospection, négociation commerciale, stratégie marketing et gestion de la relation client.',
  'The Marketing-Commerce-Sales degree trains sales and marketing professionals. You will develop skills in prospecting, sales negotiation, marketing strategy and customer relationship management.',
  '2 ans', 'Bac', 26)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- FILIÈRES PARAMÉDICALES (BEPC/CAP/GCE OL/PROBATOIRE - BAC et plus)

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
('soins-infirmiers', 'Soins Infirmiers', 'Nursing',
  'Formation de base en soins infirmiers et assistance aux patients', 'Basic training in nursing care and patient assistance',
  'La formation en soins infirmiers vous prépare à assister les infirmiers dans la prise en charge des patients. Vous apprendrez les soins de base, l''hygiène hospitalière, la prise des constantes et l''assistance aux actes médicaux.',
  'Nursing training prepares you to assist nurses in patient care. You will learn basic care, hospital hygiene, vital signs monitoring and assistance with medical procedures.',
  '2-3 ans', 'BEPC/Probatoire/Bac', 30),
('assistant-cabinet-medical', 'Assistant en Cabinet Médical', 'Medical Office Assistant',
  'Formation en assistance médicale et gestion de cabinet', 'Training in medical assistance and practice management',
  'La formation d''assistant en cabinet médical vous prépare à travailler auprès des médecins. Vous apprendrez l''accueil des patients, la gestion des dossiers médicaux, l''assistance aux consultations et les soins de base.',
  'Medical office assistant training prepares you to work with doctors. You will learn patient reception, medical records management, consultation assistance and basic care.',
  '2 ans', 'BEPC/Probatoire/Bac', 31),
('prepose-beneficiaires', 'Préposé aux Bénéficiaires', 'Beneficiary Assistant',
  'Formation en assistance et accompagnement des personnes dépendantes', 'Training in assistance and support for dependent persons',
  'La formation de préposé aux bénéficiaires vous prépare à accompagner les personnes en perte d''autonomie. Vous apprendrez les soins d''hygiène, l''aide à la mobilité, l''assistance aux repas et le soutien psychologique.',
  'Beneficiary assistant training prepares you to support people with loss of autonomy. You will learn hygiene care, mobility assistance, meal support and psychological support.',
  '2 ans', 'BEPC/Probatoire/Bac', 32)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- CQP/AQP

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
('assistant-kinesitherapie', 'Assistant Kinésithérapie', 'Physiotherapy Assistant',
  'Formation en assistance aux soins de kinésithérapie', 'Training in physiotherapy care assistance',
  'Le CQP Assistant Kinésithérapie vous forme à assister les kinésithérapeutes dans leur pratique. Vous apprendrez les techniques de base de rééducation, la préparation du matériel et l''accompagnement des patients.',
  'The Physiotherapy Assistant qualification trains you to assist physiotherapists in their practice. You will learn basic rehabilitation techniques, equipment preparation and patient support.',
  '1-2 ans', 'BEPC/Probatoire', 40),
('aide-chimiste-biologiste', 'Aide Chimiste Biologiste', 'Assistant Chemist Biologist',
  'Formation aux analyses de laboratoire et techniques biologiques', 'Training in laboratory analyses and biological techniques',
  'Le CQP Aide Chimiste Biologiste vous forme aux analyses de laboratoire. Vous apprendrez les techniques d''analyse, l''utilisation du matériel de laboratoire et le respect des protocoles de sécurité.',
  'The Assistant Chemist Biologist qualification trains you in laboratory analyses. You will learn analysis techniques, laboratory equipment use and compliance with safety protocols.',
  '1-2 ans', 'BEPC/Probatoire', 41),
('dietetique-cqp', 'Diététique', 'Dietetics',
  'Formation en nutrition et conseil alimentaire', 'Training in nutrition and dietary counseling',
  'Le CQP Diététique vous initie aux principes de la nutrition et du conseil alimentaire. Vous apprendrez les bases de la nutrition, l''élaboration de menus équilibrés et le conseil aux particuliers.',
  'The Dietetics qualification introduces you to nutrition and dietary counseling principles. You will learn nutrition basics, balanced menu planning and individual counseling.',
  '1-2 ans', 'BEPC/Probatoire', 42),
('massotherapie', 'Massothérapie', 'Massage Therapy',
  'Formation aux techniques de massage thérapeutique et de bien-être', 'Training in therapeutic and wellness massage techniques',
  'Le CQP Massothérapie vous forme aux différentes techniques de massage pour le bien-être et la détente. Vous apprendrez les massages relaxants, les techniques manuelles et l''anatomie de base.',
  'The Massage Therapy qualification trains you in various massage techniques for wellness and relaxation. You will learn relaxing massages, manual techniques and basic anatomy.',
  '1-2 ans', 'BEPC/Probatoire', 43),
('delegue-pharmaceutique', 'Délégué Pharmaceutique', 'Pharmaceutical Delegate',
  'Formation en promotion pharmaceutique et visite médicale', 'Training in pharmaceutical promotion and medical visits',
  'Le CQP Délégué Pharmaceutique vous forme à la promotion des produits pharmaceutiques. Vous apprendrez les techniques de vente, la connaissance des produits et la relation avec les professionnels de santé.',
  'The Pharmaceutical Delegate qualification trains you in pharmaceutical product promotion. You will learn sales techniques, product knowledge and relationships with healthcare professionals.',
  '1-2 ans', 'BEPC/Probatoire', 44),
('delegue-assurance-maladie', 'Délégué de l''Assurance Maladie', 'Health Insurance Delegate',
  'Formation en produits d''assurance maladie et conseil client', 'Training in health insurance products and customer advice',
  'Le CQP Délégué de l''Assurance Maladie vous forme aux produits et services d''assurance santé. Vous apprendrez les garanties santé, le conseil aux assurés et la gestion des contrats.',
  'The Health Insurance Delegate qualification trains you in health insurance products and services. You will learn health coverage, policyholder advice and contract management.',
  '1-2 ans', 'BEPC/Probatoire', 45),
('delegue-medical', 'Délégué Médical', 'Medical Delegate',
  'Formation en représentation médicale et promotion pharmaceutique', 'Training in medical representation and pharmaceutical promotion',
  'Le CQP Délégué Médical vous forme à promouvoir les produits pharmaceutiques auprès des professionnels de santé. Vous développerez des compétences en argumentation scientifique, techniques de vente et gestion de portefeuille.',
  'The Medical Delegate qualification trains you to promote pharmaceutical products to healthcare professionals. You will develop skills in scientific argumentation, sales techniques and portfolio management.',
  '1-2 ans', 'BEPC/Probatoire', 46)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- DQP/AQP

INSERT INTO public.formations (
  slug, title_fr, title_en, short_description_fr, short_description_en,
  full_description_fr, full_description_en, duration, level, display_order
) VALUES
('vendeur-pharmacie', 'Vendeur en Pharmacie', 'Pharmacy Salesperson',
  'Formation à la vente et conseil en officine pharmaceutique', 'Training in sales and counseling in pharmaceutical practice',
  'Le DQP Vendeur en Pharmacie vous forme à la vente de produits pharmaceutiques et parapharmaceutiques. Vous apprendrez le conseil client, la gestion des stocks et les produits de santé.',
  'The Pharmacy Salesperson qualification trains you in selling pharmaceutical and parapharmaceutical products. You will learn customer advice, stock management and health products.',
  '1 an', 'BEPC/Probatoire', 50),
('secretariat-medical', 'Secrétariat Médical', 'Medical Secretariat',
  'Formation administrative spécialisée dans le secteur de la santé', 'Administrative training specialized in the healthcare sector',
  'Le DQP Secrétariat Médical vous forme à la gestion administrative des structures de santé. Vous apprendrez l''accueil des patients, la gestion des dossiers médicaux, la prise de rendez-vous et la terminologie médicale.',
  'The Medical Secretariat qualification trains you in administrative management of healthcare structures. You will learn patient reception, medical records management, appointment scheduling and medical terminology.',
  '1 an', 'BEPC/Probatoire', 51)
ON CONFLICT (slug) DO UPDATE SET
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  short_description_fr = EXCLUDED.short_description_fr,
  short_description_en = EXCLUDED.short_description_en,
  full_description_fr = EXCLUDED.full_description_fr,
  full_description_en = EXCLUDED.full_description_en,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  display_order = EXCLUDED.display_order;

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_formations_slug ON public.formations(slug);
CREATE INDEX IF NOT EXISTS idx_formations_is_active ON public.formations(is_active);
CREATE INDEX IF NOT EXISTS idx_formations_display_order ON public.formations(display_order);
CREATE INDEX IF NOT EXISTS idx_formations_center_id ON public.formations(center_id);

-- Enable Row Level Security
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des formations
DROP POLICY IF EXISTS "Allow public read formations" ON public.formations;
CREATE POLICY "Allow public read formations" ON public.formations
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Politique pour permettre aux utilisateurs authentifiés de gérer les formations
DROP POLICY IF EXISTS "Allow authenticated manage formations" ON public.formations;
CREATE POLICY "Allow authenticated manage formations" ON public.formations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.formations IS 'Liste des formations offertes par INSES';
