-- =====================================================
-- EXEMPLE D'INSERTION D'ACTUALITÉS AVEC IMAGES SUPABASE
-- =====================================================
-- Ce fichier montre comment insérer des actualités avec des images depuis Supabase Storage
-- =====================================================

-- IMPORTANT:
-- 1. Créez d'abord le bucket 'news' dans Supabase Storage (voir GUIDE-STORAGE.md)
-- 2. Uploadez vos images dans le bucket (organisées par année recommandé)
-- 3. Remplacez les URLs ci-dessous par vos vraies URLs

-- =====================================================
-- EXEMPLE 1: Événement - Cérémonie de Remise de Diplômes
-- =====================================================
INSERT INTO news (
  slug,
  category,
  title_fr,
  title_en,
  excerpt_fr,
  excerpt_en,
  content_fr,
  content_en,
  image,
  published_date,
  is_published
) VALUES (
  'ceremonie-remise-diplomes-2024',
  'event',
  'Cérémonie de Remise des Diplômes 2024',
  'Graduation Ceremony 2024',
  'Une journée mémorable pour nos 150 diplômés de la promotion 2024',
  'A memorable day for our 150 graduates of the class of 2024',
  'Le 15 juillet 2024, l''INSES a célébré la réussite de ses étudiants lors d''une cérémonie émouvante...',
  'On July 15, 2024, INSES celebrated the success of its students during a moving ceremony...',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/graduation-ceremony.jpg',
  '2024-07-15',
  true
);

-- =====================================================
-- EXEMPLE 2: Annonce - Nouvelle Formation
-- =====================================================
INSERT INTO news (
  slug,
  category,
  title_fr,
  title_en,
  excerpt_fr,
  excerpt_en,
  content_fr,
  content_en,
  image,
  published_date,
  is_published
) VALUES (
  'nouvelle-formation-echographie-2024',
  'announcement',
  'Lancement de la Formation en Échographie Médicale',
  'Launch of Medical Ultrasound Training',
  'L''INSES annonce le lancement d''une nouvelle formation spécialisée en échographie médicale',
  'INSES announces the launch of a new specialized training in medical ultrasound',
  'À partir de septembre 2024, l''INSES propose une formation certifiante en échographie médicale...',
  'Starting September 2024, INSES offers a certified training in medical ultrasound...',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/echographie-announcement.jpg',
  '2024-06-01',
  true
);

-- =====================================================
-- EXEMPLE 3: Succès - Résultats d'Examen
-- =====================================================
INSERT INTO news (
  slug,
  category,
  title_fr,
  title_en,
  excerpt_fr,
  excerpt_en,
  content_fr,
  content_en,
  image,
  published_date,
  is_published
) VALUES (
  'resultats-examens-2024',
  'success',
  'Taux de Réussite Record aux Examens d''État 2024',
  'Record Pass Rate at State Exams 2024',
  '95% de taux de réussite pour nos étudiants aux examens d''État',
  '95% pass rate for our students at the State exams',
  'Les résultats des examens d''État 2024 sont tombés et l''INSES affiche un taux de réussite exceptionnel...',
  'The 2024 State exam results are in and INSES shows an exceptional pass rate...',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/exam-success.jpg',
  '2024-08-20',
  true
);

-- =====================================================
-- EXEMPLE 4: Événement - Journée Portes Ouvertes
-- =====================================================
INSERT INTO news (
  slug,
  category,
  title_fr,
  title_en,
  excerpt_fr,
  excerpt_en,
  content_fr,
  content_en,
  image,
  published_date,
  is_published
) VALUES (
  'journee-portes-ouvertes-2025',
  'event',
  'Journée Portes Ouvertes - Janvier 2025',
  'Open Day - January 2025',
  'Venez découvrir l''INSES lors de notre journée portes ouvertes le 20 janvier 2025',
  'Come discover INSES during our open day on January 20, 2025',
  'L''INSES vous invite à sa journée portes ouvertes. Visitez nos installations, rencontrez nos enseignants...',
  'INSES invites you to its open day. Visit our facilities, meet our teachers...',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2025/open-day.jpg',
  '2025-01-05',
  true
);

-- =====================================================
-- MISE À JOUR D'UNE ACTUALITÉ EXISTANTE
-- =====================================================
-- Si vous avez déjà des actualités sans images, utilisez ces requêtes:

-- Mettre à jour l'image d'une actualité par son slug
UPDATE news
SET image = 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/graduation-ceremony.jpg'
WHERE slug = 'ceremonie-remise-diplomes-2024';

-- Mettre à jour plusieurs actualités à la fois
UPDATE news
SET image = CASE slug
  WHEN 'ceremonie-remise-diplomes-2024' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/graduation-ceremony.jpg'
  WHEN 'nouvelle-formation-echographie-2024' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/echographie-announcement.jpg'
  WHEN 'resultats-examens-2024' THEN 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/news/2024/exam-success.jpg'
  ELSE image
END;

-- =====================================================
-- SUPPRIMER LES IMAGES NULL OU PLACEHOLDERS
-- =====================================================
-- Si vous voulez nettoyer les actualités sans images valides
UPDATE news
SET image = NULL
WHERE image LIKE '%placeholder%' OR image = '';

-- =====================================================
-- VÉRIFICATION
-- =====================================================
-- Vérifier que les images sont bien configurées
SELECT
  slug,
  category,
  title_fr,
  image,
  published_date,
  is_published
FROM news
ORDER BY published_date DESC;

-- Compter les actualités par catégorie avec images
SELECT
  category,
  COUNT(*) as total,
  COUNT(image) as with_image,
  COUNT(*) - COUNT(image) as without_image
FROM news
GROUP BY category;
