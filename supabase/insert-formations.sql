-- =====================================================
-- MISE À JOUR DES FORMATIONS INSES
-- =====================================================
-- Ce script met à jour les formations existantes ou les crée si elles n'existent pas
-- Les images sont mises à jour avec les URLs Supabase
-- =====================================================

-- IMPORTANT: Avant d'exécuter ce script
-- 1. Le bucket 'inses-images' doit être créé dans Supabase Storage (bucket public)
-- 2. Uploadez les images dans les dossiers appropriés:
--    Dans inses-images/formations/:
--      - infirmier.jpg
--      - sage-femme.jpg
--      - kinesitherapie.jpg
--      - assistant-medical.jpg
--      - aide-soignant.jpg
--      - technicien-laboratoire.jpg
--    Dans inses-images/icons/:
--      - stethoscope.svg
--      - heart.svg
--      - activity.svg
--      - clipboard.svg
--      - users.svg
--      - flask.svg

-- =====================================================
-- DÉSACTIVATION TEMPORAIRE DE RLS
-- =====================================================
-- Nécessaire pour permettre l'insertion de données
ALTER TABLE formations DISABLE ROW LEVEL SECURITY;
ALTER TABLE formation_skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE formation_careers DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 1: MISE À JOUR / INSERTION DES FORMATIONS
-- =====================================================

-- Formation 1: Infirmier Diplômé d'État
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'infirmier-diplome-etat',
  'Infirmier Diplômé d''État (IDE)',
  'State Registered Nurse',
  'Formation complète en soins infirmiers avec théorie et pratique intensive en milieu hospitalier',
  'Complete nursing training with intensive theory and practice in hospital settings',
  'La formation d''Infirmier Diplômé d''État vous prépare à devenir un professionnel de santé compétent et autonome. Au cours de 3 années d''études intensives, vous développerez des compétences techniques, relationnelles et organisationnelles essentielles pour exercer dans les établissements de santé publics et privés.',
  'The State Registered Nurse training prepares you to become a competent and autonomous healthcare professional. During 3 years of intensive studies, you will develop essential technical, interpersonal and organizational skills to practice in public and private healthcare facilities.',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/stethoscope.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/infirmier.jpg',
  1,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Formation 2: Sage-Femme
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'sage-femme',
  'Sage-Femme',
  'Midwife',
  'Formation spécialisée en obstétrique, soins de la mère et de l''enfant, et accompagnement périnatal',
  'Specialized training in obstetrics, mother and child care, and perinatal support',
  'La formation de Sage-Femme vous prépare à accompagner les femmes pendant la grossesse, l''accouchement et le post-partum. Vous serez formé(e) à la surveillance médicale, au dépistage des pathologies, et à l''accompagnement psychologique des futures mères.',
  'The Midwife training prepares you to support women during pregnancy, childbirth and postpartum. You will be trained in medical monitoring, pathology screening, and psychological support for expectant mothers.',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/heart.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/sage-femme.jpg',
  2,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Formation 3: Kinésithérapie
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'kinesitherapie',
  'Kinésithérapie',
  'Physiotherapy',
  'Formation en rééducation fonctionnelle, thérapie manuelle et réadaptation physique',
  'Training in functional rehabilitation, manual therapy and physical rehabilitation',
  'La formation en Kinésithérapie vous permet d''acquérir les compétences nécessaires pour prévenir, évaluer et traiter les troubles du mouvement et de la fonction. Vous apprendrez les techniques de massage, de mobilisation et de renforcement musculaire.',
  'The Physiotherapy training enables you to acquire the necessary skills to prevent, assess and treat movement and function disorders. You will learn massage, mobilization and muscle strengthening techniques.',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/activity.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/kinesitherapie.jpg',
  3,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Formation 4: Assistant(e) Médical(e)
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'assistant-medical',
  'Assistant(e) Médical(e)',
  'Medical Assistant',
  'Formation polyvalente en assistance médicale, administrative et technique en cabinet médical',
  'Versatile training in medical, administrative and technical assistance in medical practice',
  'La formation d''Assistant(e) Médical(e) vous prépare à assister les médecins dans leurs tâches quotidiennes. Vous serez formé(e) aux soins de base, à la gestion administrative, et à l''accueil des patients.',
  'The Medical Assistant training prepares you to assist doctors in their daily tasks. You will be trained in basic care, administrative management, and patient reception.',
  '2 ans',
  'Bac + 2',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/clipboard.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/assistant-medical.jpg',
  4,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Formation 5: Aide-Soignant(e)
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'aide-soignant',
  'Aide-Soignant(e)',
  'Nursing Aide',
  'Formation en soins de base et accompagnement des patients dans les actes de la vie quotidienne',
  'Training in basic care and patient support in daily life activities',
  'La formation d''Aide-Soignant(e) vous permet d''acquérir les compétences pour assister les infirmiers dans les soins quotidiens des patients. Vous serez formé(e) à l''hygiène, au confort, et à la communication avec les patients.',
  'The Nursing Aide training enables you to acquire skills to assist nurses in daily patient care. You will be trained in hygiene, comfort, and communication with patients.',
  '1 an',
  'Certification',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/users.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/aide-soignant.jpg',
  5,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Formation 6: Technicien de Laboratoire
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
  full_description_fr,
  full_description_en,
  duration,
  level,
  icon,
  image,
  display_order,
  is_active
) VALUES (
  'technicien-laboratoire',
  'Technicien de Laboratoire Médical',
  'Medical Laboratory Technician',
  'Formation en analyses médicales, biologie clinique et techniques de laboratoire',
  'Training in medical analysis, clinical biology and laboratory techniques',
  'La formation de Technicien de Laboratoire Médical vous prépare à effectuer des analyses biologiques essentielles au diagnostic médical. Vous maîtriserez les techniques d''analyse sanguine, urinaire et bactériologique.',
  'The Medical Laboratory Technician training prepares you to perform biological analyses essential to medical diagnosis. You will master blood, urine and bacteriological analysis techniques.',
  '2 ans',
  'Bac + 2',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/flask.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/technicien-laboratoire.jpg',
  6,
  true
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
  icon = EXCLUDED.icon,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- ÉTAPE 2: MISE À JOUR / INSERTION DES COMPÉTENCES
-- =====================================================

-- Supprimer les anciennes compétences pour réinsérer les nouvelles
DELETE FROM formation_skills WHERE formation_id IN (SELECT id FROM formations WHERE slug IN (
  'infirmier-diplome-etat', 'sage-femme', 'kinesitherapie',
  'assistant-medical', 'aide-soignant', 'technicien-laboratoire'
));

-- Compétences pour Infirmier Diplômé d'État
INSERT INTO formation_skills (formation_id, skill_fr, skill_en, display_order)
SELECT id, 'Soins infirmiers généraux et spécialisés', 'General and specialized nursing care', 1 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Administration des médicaments et surveillance', 'Medication administration and monitoring', 2 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Gestion des urgences et premiers secours', 'Emergency management and first aid', 3 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Communication thérapeutique', 'Therapeutic communication', 4 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Hygiène et prévention des infections', 'Hygiene and infection prevention', 5 FROM formations WHERE slug = 'infirmier-diplome-etat';

-- Compétences pour Sage-Femme
INSERT INTO formation_skills (formation_id, skill_fr, skill_en, display_order)
SELECT id, 'Suivi de grossesse et consultations prénatales', 'Pregnancy monitoring and prenatal consultations', 1 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Accouchement normal et surveillance', 'Normal delivery and monitoring', 2 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Soins du nouveau-né', 'Newborn care', 3 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Éducation à la santé périnatal', 'Perinatal health education', 4 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Dépistage des pathologies obstétricales', 'Obstetric pathology screening', 5 FROM formations WHERE slug = 'sage-femme';

-- Compétences pour Kinésithérapie
INSERT INTO formation_skills (formation_id, skill_fr, skill_en, display_order)
SELECT id, 'Techniques de massage thérapeutique', 'Therapeutic massage techniques', 1 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Rééducation fonctionnelle', 'Functional rehabilitation', 2 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Mobilisation articulaire', 'Joint mobilization', 3 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Renforcement musculaire', 'Muscle strengthening', 4 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Prévention et ergonomie', 'Prevention and ergonomics', 5 FROM formations WHERE slug = 'kinesitherapie';

-- =====================================================
-- ÉTAPE 3: MISE À JOUR / INSERTION DES DÉBOUCHÉS
-- =====================================================

-- Supprimer les anciens débouchés pour réinsérer les nouveaux
DELETE FROM formation_careers WHERE formation_id IN (SELECT id FROM formations WHERE slug IN (
  'infirmier-diplome-etat', 'sage-femme', 'kinesitherapie',
  'assistant-medical', 'aide-soignant', 'technicien-laboratoire'
));

-- Débouchés pour Infirmier Diplômé d'État
INSERT INTO formation_careers (formation_id, career_fr, career_en, display_order)
SELECT id, 'Infirmier(ère) en milieu hospitalier', 'Hospital nurse', 1 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Infirmier(ère) en clinique privée', 'Private clinic nurse', 2 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Infirmier(ère) à domicile', 'Home care nurse', 3 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Infirmier(ère) scolaire', 'School nurse', 4 FROM formations WHERE slug = 'infirmier-diplome-etat'
UNION ALL
SELECT id, 'Infirmier(ère) en entreprise', 'Occupational health nurse', 5 FROM formations WHERE slug = 'infirmier-diplome-etat';

-- Débouchés pour Sage-Femme
INSERT INTO formation_careers (formation_id, career_fr, career_en, display_order)
SELECT id, 'Sage-femme en maternité', 'Maternity ward midwife', 1 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Sage-femme libérale', 'Independent midwife', 2 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Sage-femme en PMI', 'Mother and child health center midwife', 3 FROM formations WHERE slug = 'sage-femme'
UNION ALL
SELECT id, 'Sage-femme en planning familial', 'Family planning midwife', 4 FROM formations WHERE slug = 'sage-femme';

-- Débouchés pour Kinésithérapie
INSERT INTO formation_careers (formation_id, career_fr, career_en, display_order)
SELECT id, 'Kinésithérapeute en cabinet privé', 'Private practice physiotherapist', 1 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Kinésithérapeute en centre de rééducation', 'Rehabilitation center physiotherapist', 2 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Kinésithérapeute sportif', 'Sports physiotherapist', 3 FROM formations WHERE slug = 'kinesitherapie'
UNION ALL
SELECT id, 'Kinésithérapeute en milieu hospitalier', 'Hospital physiotherapist', 4 FROM formations WHERE slug = 'kinesitherapie';

-- =====================================================
-- ÉTAPE 4: VÉRIFICATION
-- =====================================================

-- Afficher toutes les formations avec leurs images
SELECT
  slug,
  title_fr,
  duration,
  level,
  CASE
    WHEN image LIKE '%supabase%' THEN '✓ Image Supabase'
    ELSE '✗ Pas d''image Supabase'
  END as image_status,
  display_order
FROM formations
ORDER BY display_order;

-- Compter les compétences par formation
SELECT
  f.title_fr,
  COUNT(fs.id) as nb_competences
FROM formations f
LEFT JOIN formation_skills fs ON f.id = fs.formation_id
WHERE f.slug IN ('infirmier-diplome-etat', 'sage-femme', 'kinesitherapie',
                 'assistant-medical', 'aide-soignant', 'technicien-laboratoire')
GROUP BY f.id, f.title_fr, f.display_order
ORDER BY f.display_order;

-- Compter les débouchés par formation
SELECT
  f.title_fr,
  COUNT(fc.id) as nb_debouches
FROM formations f
LEFT JOIN formation_careers fc ON f.id = fc.formation_id
WHERE f.slug IN ('infirmier-diplome-etat', 'sage-femme', 'kinesitherapie',
                 'assistant-medical', 'aide-soignant', 'technicien-laboratoire')
GROUP BY f.id, f.title_fr, f.display_order
ORDER BY f.display_order;

-- =====================================================
-- RÉSUMÉ
-- =====================================================
SELECT
  COUNT(*) as total_formations,
  COUNT(CASE WHEN image LIKE '%supabase%' THEN 1 END) as avec_image_supabase,
  COUNT(CASE WHEN is_active THEN 1 END) as formations_actives
FROM formations;

-- =====================================================
-- RÉACTIVATION DE RLS
-- =====================================================
-- Rétablir la sécurité Row Level Security
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_careers ENABLE ROW LEVEL SECURITY;
