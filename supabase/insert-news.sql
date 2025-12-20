-- =====================================================
-- MISE À JOUR DES ACTUALITÉS INSES
-- =====================================================
-- Ce script met à jour les actualités existantes ou les crée si elles n'existent pas
-- Les images sont mises à jour avec les URLs Supabase
-- =====================================================

-- IMPORTANT: Avant d'exécuter ce script
-- 1. Le bucket 'inses-images' doit être créé dans Supabase Storage (bucket public)
-- 2. Créez les dossiers 'news/2024' et 'news/2025' dans le bucket
-- 3. Uploadez les images suivantes:
--    Dans inses-images/news/2024/:
--      - graduation-ceremony.jpg
--      - exam-success.jpg
--      - new-equipment.jpg
--      - partnership-announcement.jpg
--      - student-competition.jpg
--    Dans inses-images/news/2025/:
--      - open-day.jpg
--      - new-training.jpg
--      - registration-open.jpg

-- =====================================================
-- DÉSACTIVATION TEMPORAIRE DE RLS
-- =====================================================
-- Nécessaire pour permettre l'insertion de données
ALTER TABLE news DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 1: MISE À JOUR / INSERTION DES ACTUALITÉS 2024
-- =====================================================

-- Actualité 1: Événement - Cérémonie de Remise de Diplômes 2024
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
  'Une journée mémorable pour nos 150 diplômés de la promotion 2024 qui ont brillamment réussi leurs examens d''État',
  'A memorable day for our 150 graduates of the class of 2024 who brilliantly passed their State exams',
  'Le 15 juillet 2024, l''INSES a célébré la réussite de ses étudiants lors d''une cérémonie émouvante en présence des familles, du corps enseignant et des autorités sanitaires. Cette promotion 2024 affiche un taux de réussite exceptionnel de 95% aux examens d''État, confirmant la qualité de notre enseignement. Nos nouveaux diplômés sont désormais prêts à exercer leurs métiers avec professionnalisme et engagement.',
  'On July 15, 2024, INSES celebrated the success of its students during a moving ceremony in the presence of families, teaching staff and health authorities. This 2024 class shows an exceptional 95% pass rate on State exams, confirming the quality of our education. Our new graduates are now ready to practice their professions with professionalism and commitment.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/graduation-ceremony.jpg',
  '2024-07-15',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 2: Succès - Taux de Réussite Record
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
  'taux-reussite-record-2024',
  'success',
  'Taux de Réussite Record aux Examens d''État 2024',
  'Record Pass Rate at State Exams 2024',
  '95% de taux de réussite pour nos étudiants aux examens d''État - Un résultat qui place l''INSES parmi les meilleurs établissements',
  '95% pass rate for our students at State exams - A result that places INSES among the best institutions',
  'Les résultats des examens d''État 2024 sont tombés et l''INSES affiche un taux de réussite exceptionnel de 95%, en hausse de 8 points par rapport à l''année précédente. Ce succès est le fruit du travail acharné de nos étudiants et de l''engagement de notre équipe pédagogique. Particulièrement remarquables sont les résultats en filière Infirmier (97%) et Sage-Femme (94%).',
  'The 2024 State exam results are in and INSES shows an exceptional 95% pass rate, up 8 points from the previous year. This success is the result of our students'' hard work and our teaching team''s commitment. Particularly remarkable are the results in the Nursing (97%) and Midwifery (94%) programs.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/exam-success.jpg',
  '2024-08-20',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 3: Annonce - Nouveaux Équipements
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
  'nouveaux-equipements-laboratoire-2024',
  'announcement',
  'Acquisition de Nouveaux Équipements de Laboratoire',
  'Acquisition of New Laboratory Equipment',
  'L''INSES investit dans du matériel médical de dernière génération pour améliorer la formation pratique de ses étudiants',
  'INSES invests in state-of-the-art medical equipment to improve practical training for its students',
  'Dans le cadre de notre engagement pour l''excellence pédagogique, l''INSES a acquis pour 50 millions de FCFA de nouveaux équipements médicaux : échographe haute définition, mannequins de simulation avancés, et matériel de kinésithérapie moderne. Ces investissements permettront à nos étudiants de se former dans des conditions optimales et de maîtriser les technologies utilisées dans les établissements de santé modernes.',
  'As part of our commitment to educational excellence, INSES has acquired 50 million FCFA worth of new medical equipment: high-definition ultrasound machine, advanced simulation mannequins, and modern physiotherapy equipment. These investments will enable our students to train in optimal conditions and master the technologies used in modern healthcare facilities.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/new-equipment.jpg',
  '2024-09-10',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 4: Annonce - Nouveau Partenariat
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
  'partenariat-hopital-general-douala-2024',
  'announcement',
  'Partenariat avec l''Hôpital Général de Douala',
  'Partnership with Douala General Hospital',
  'L''INSES signe une convention de partenariat avec l''Hôpital Général de Douala pour les stages pratiques',
  'INSES signs a partnership agreement with Douala General Hospital for practical internships',
  'Nous sommes fiers d''annoncer la signature d''une convention de partenariat avec l''Hôpital Général de Douala, l''un des plus grands centres hospitaliers du pays. Ce partenariat permettra à nos étudiants de bénéficier de stages pratiques dans des services variés (urgences, maternité, pédiatrie, chirurgie) et d''être encadrés par des professionnels expérimentés. Cette collaboration renforce la qualité de notre formation et l''employabilité de nos diplômés.',
  'We are proud to announce the signing of a partnership agreement with Douala General Hospital, one of the country''s largest medical centers. This partnership will allow our students to benefit from practical internships in various departments (emergency, maternity, pediatrics, surgery) and be supervised by experienced professionals. This collaboration strengthens the quality of our training and the employability of our graduates.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/partnership-announcement.jpg',
  '2024-10-05',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 5: Succès - Compétition Inter-Écoles
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
  'victoire-competition-inter-ecoles-2024',
  'success',
  'Nos Étudiants Remportent la Compétition Inter-Écoles',
  'Our Students Win the Inter-School Competition',
  'L''équipe INSES remporte la première place au concours national des écoles de santé',
  'The INSES team wins first place in the national health schools competition',
  'Lors de la 5ème édition du Concours National des Écoles de Santé qui s''est tenu à Yaoundé, notre équipe de 6 étudiants a brillamment remporté la première place face à 15 autres établissements. Les épreuves portaient sur les connaissances théoriques, les gestes techniques et la prise en charge globale des patients. Cette victoire témoigne du haut niveau de formation dispensé à l''INSES. Félicitations à nos champions!',
  'During the 5th edition of the National Health Schools Competition held in Yaoundé, our team of 6 students brilliantly won first place against 15 other institutions. The tests covered theoretical knowledge, technical skills and comprehensive patient care. This victory testifies to the high level of training provided at INSES. Congratulations to our champions!',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/student-competition.jpg',
  '2024-11-22',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- =====================================================
-- ÉTAPE 2: MISE À JOUR / INSERTION DES ACTUALITÉS 2025
-- =====================================================

-- Actualité 6: Événement - Journée Portes Ouvertes 2025
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
  'journee-portes-ouvertes-janvier-2025',
  'event',
  'Journée Portes Ouvertes - Samedi 20 Janvier 2025',
  'Open Day - Saturday, January 20, 2025',
  'Venez découvrir l''INSES lors de notre journée portes ouvertes : visite des installations, rencontre avec les enseignants et étudiants',
  'Come discover INSES during our open day: tour of facilities, meet teachers and students',
  'L''INSES vous invite à sa journée portes ouvertes le samedi 20 janvier 2025 de 9h à 16h. Au programme : visite guidée de nos laboratoires et salles de pratique, démonstrations de soins, présentation des formations, échanges avec les enseignants et étudiants, informations sur les modalités d''inscription. C''est l''occasion idéale pour découvrir votre future école et poser toutes vos questions. Entrée libre, venez nombreux!',
  'INSES invites you to its open day on Saturday, January 20, 2025 from 9am to 4pm. Program: guided tour of our laboratories and practice rooms, care demonstrations, presentation of training programs, exchanges with teachers and students, information on registration procedures. It''s the ideal opportunity to discover your future school and ask all your questions. Free admission, come in large numbers!',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2025/open-day.jpg',
  '2025-01-05',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 7: Annonce - Nouvelle Formation Échographie
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
  'nouvelle-formation-echographie-2025',
  'announcement',
  'Lancement de la Formation en Échographie Médicale',
  'Launch of Medical Ultrasound Training',
  'L''INSES annonce le lancement d''une nouvelle formation certifiante en échographie médicale dès septembre 2025',
  'INSES announces the launch of a new certified medical ultrasound training starting September 2025',
  'À partir de septembre 2025, l''INSES propose une formation certifiante en échographie médicale destinée aux professionnels de santé (infirmiers, sages-femmes, médecins). Cette formation de 6 mois allie théorie et pratique intensive sur nos échographes dernière génération. Les participants apprendront les techniques d''échographie obstétricale, abdominale et vasculaire. Places limitées à 15 participants. Renseignements et inscriptions dès maintenant.',
  'Starting September 2025, INSES offers certified medical ultrasound training for healthcare professionals (nurses, midwives, doctors). This 6-month training combines theory and intensive practice on our latest generation ultrasound machines. Participants will learn obstetric, abdominal and vascular ultrasound techniques. Limited to 15 participants. Information and registration now available.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2025/new-training.jpg',
  '2025-01-15',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- Actualité 8: Annonce - Inscriptions Ouvertes
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
  'inscriptions-ouvertes-rentree-2025',
  'announcement',
  'Inscriptions Ouvertes pour la Rentrée 2025-2026',
  'Registration Open for 2025-2026 Academic Year',
  'Les inscriptions pour la rentrée académique 2025-2026 sont officiellement ouvertes dans toutes nos filières',
  'Registration for the 2025-2026 academic year is officially open in all our programs',
  'Les inscriptions pour l''année académique 2025-2026 sont désormais ouvertes! Nous recrutons dans toutes nos filières : Infirmier, Sage-Femme, Kinésithérapie, Assistant Médical, Aide-Soignant et Technicien de Laboratoire. Documents requis : copie du bac ou équivalent, acte de naissance, photos d''identité, certificat médical. Nombre de places limité. Ne tardez pas à déposer votre dossier! Contact : +237 674 93 66 04 ou visitez notre site web.',
  'Registration for the 2025-2026 academic year is now open! We are recruiting in all our programs: Nursing, Midwifery, Physiotherapy, Medical Assistant, Nursing Aide and Laboratory Technician. Required documents: copy of high school diploma or equivalent, birth certificate, ID photos, medical certificate. Limited number of places. Don''t delay in submitting your application! Contact: +237 674 93 66 04 or visit our website.',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2025/registration-open.jpg',
  '2025-02-01',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  title_fr = EXCLUDED.title_fr,
  title_en = EXCLUDED.title_en,
  excerpt_fr = EXCLUDED.excerpt_fr,
  excerpt_en = EXCLUDED.excerpt_en,
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  published_date = EXCLUDED.published_date,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- =====================================================
-- ÉTAPE 3: VÉRIFICATION
-- =====================================================

-- Afficher toutes les actualités avec leurs catégories et dates
SELECT
  slug,
  category,
  title_fr,
  CASE
    WHEN image LIKE '%supabase%' THEN '✓ Image Supabase'
    ELSE '✗ Pas d''image Supabase'
  END as image_status,
  published_date,
  is_published
FROM news
ORDER BY published_date DESC;

-- Statistiques par catégorie
SELECT
  category,
  COUNT(*) as total,
  COUNT(CASE WHEN is_published THEN 1 END) as publiees,
  COUNT(CASE WHEN image LIKE '%supabase%' THEN 1 END) as avec_image_supabase
FROM news
GROUP BY category
ORDER BY category;

-- Actualités par année
SELECT
  EXTRACT(YEAR FROM published_date) as annee,
  COUNT(*) as total_actualites,
  COUNT(CASE WHEN is_published THEN 1 END) as publiees
FROM news
GROUP BY EXTRACT(YEAR FROM published_date)
ORDER BY annee DESC;

-- =====================================================
-- RÉSUMÉ GLOBAL
-- =====================================================
SELECT
  COUNT(*) as total_actualites,
  COUNT(CASE WHEN image LIKE '%supabase%' THEN 1 END) as avec_image_supabase,
  COUNT(CASE WHEN is_published THEN 1 END) as publiees,
  COUNT(CASE WHEN category = 'event' THEN 1 END) as evenements,
  COUNT(CASE WHEN category = 'announcement' THEN 1 END) as annonces,
  COUNT(CASE WHEN category = 'success' THEN 1 END) as succes
FROM news;

-- Dernières actualités publiées
SELECT
  title_fr,
  category,
  published_date
FROM news
WHERE is_published = true
ORDER BY published_date DESC
LIMIT 5;

-- =====================================================
-- RÉACTIVATION DE RLS
-- =====================================================
-- Rétablir la sécurité Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
