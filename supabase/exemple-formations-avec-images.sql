-- =====================================================
-- EXEMPLE D'INSERTION DE FORMATIONS AVEC IMAGES SUPABASE
-- =====================================================
-- Ce fichier montre comment insérer des formations avec des images depuis Supabase Storage
-- =====================================================

-- IMPORTANT:
-- 1. Créez d'abord le bucket 'formations' dans Supabase Storage (voir GUIDE-STORAGE.md)
-- 2. Uploadez vos images dans le bucket
-- 3. Remplacez les URLs ci-dessous par vos vraies URLs

-- =====================================================
-- EXEMPLE 1: Formation Infirmier
-- =====================================================
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
  'Infirmier Diplômé d''État',
  'State Registered Nurse',
  'Formation complète en soins infirmiers avec théorie et pratique intensive',
  'Complete nursing training with intensive theory and practice',
  'La formation d''infirmier diplômé d''État vous prépare à devenir un professionnel de santé...',
  'The state registered nurse training prepares you to become a healthcare professional...',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/icons/stethoscope.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/infirmier.jpg',
  1,
  true
);

-- =====================================================
-- EXEMPLE 2: Formation Sage-Femme
-- =====================================================
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
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
  'Formation spécialisée en obstétrique et soins de la mère et de l''enfant',
  'Specialized training in obstetrics and mother-child care',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/icons/heart.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/sage-femme.jpg',
  2,
  true
);

-- =====================================================
-- EXEMPLE 3: Formation Kinésithérapie
-- =====================================================
INSERT INTO formations (
  slug,
  title_fr,
  title_en,
  short_description_fr,
  short_description_en,
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
  'Formation en rééducation fonctionnelle et thérapie physique',
  'Training in functional rehabilitation and physical therapy',
  '3 ans',
  'Bac + 3',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/icons/activity.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/kinesitherapie.jpg',
  3,
  true
);

-- =====================================================
-- MISE À JOUR D'UNE FORMATION EXISTANTE
-- =====================================================
-- Si vous avez déjà des formations sans images, utilisez ces requêtes:

-- Mettre à jour l'image d'une formation par son slug
UPDATE formations
SET
  image = 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/infirmier.jpg',
  icon = 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/icons/stethoscope.svg'
WHERE slug = 'infirmier-diplome-etat';

-- Mettre à jour plusieurs formations à la fois
UPDATE formations
SET image = CASE slug
  WHEN 'infirmier-diplome-etat' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/infirmier.jpg'
  WHEN 'sage-femme' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/sage-femme.jpg'
  WHEN 'kinesitherapie' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/formations/kinesitherapie.jpg'
  ELSE image
END;

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- Vérifier que les images sont bien configurées
SELECT slug, title_fr, image, icon
FROM formations
ORDER BY display_order;
