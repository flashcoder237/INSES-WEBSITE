-- =====================================================
-- INSERTION DES DONNÉES STATIQUES DE LA GALERIE
-- =====================================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- =====================================================

-- NOTE: Les URLs des images pointent vers le bucket 'inses-images'
-- Uploadez vos images dans le dossier 'gallery/' du bucket 'inses-images' via l'interface admin
-- Format: https://[PROJECT_ID].supabase.co/storage/v1/object/public/inses-images/gallery/[filename]

-- =====================================================
-- DÉSACTIVATION TEMPORAIRE DE RLS
-- =====================================================
-- Nécessaire pour permettre l'insertion de données
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;

INSERT INTO gallery (title, url, category, display_order) VALUES
  -- Campus (3 images)
  ('Bâtiment principal INSES', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/campus-building.jpg', 'campus', 1),
  ('Bibliothèque INSES', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/library.jpg', 'campus', 7),
  ('Cafétéria du campus', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/cafeteria.jpg', 'campus', 11),

  -- Étudiants (4 images)
  ('Étudiants en classe théorique', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/students-class.jpg', 'students', 2),
  ('Étudiants en pratique laboratoire', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/students-lab-practice.jpg', 'students', 5),
  ('Groupe d''étudiants', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/student-group.jpg', 'students', 10),

  -- Laboratoires (3 images)
  ('Laboratoire de chimie', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/lab-chemistry.jpg', 'students', 3),
  ('Salle de massage thérapeutique', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/massage-room.jpg', 'students', 6),
  ('Équipements médicaux', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/medical-equipment.jpg', 'students', 9),

  -- Événements (1 image)
  ('Journée portes ouvertes', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/open-day.jpg', 'events', 8),

  -- Diplômes (2 images)
  ('Cérémonie de remise de diplômes', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/graduation-ceremony.jpg', 'events', 4),
  ('Diplômés promotion 2024', 'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/graduates-2024.jpg', 'events', 12);

-- =====================================================
-- VÉRIFICATION DES DONNÉES INSÉRÉES
-- =====================================================
-- Exécutez cette requête pour vérifier que les données ont été insérées correctement
-- SELECT title, category, display_order FROM gallery ORDER BY display_order;

-- =====================================================
-- INSTRUCTIONS POUR REMPLACER LES URLS
-- =====================================================
-- 1. Uploadez vos images dans Supabase Storage (bucket: inses-images/gallery)
-- 2. Récupérez les URLs publiques de chaque image
-- 3. Exécutez des requêtes UPDATE pour mettre à jour les URLs
-- Exemple:
-- UPDATE gallery SET url = 'https://[REAL_URL]' WHERE title = 'Bâtiment principal INSES';

-- =====================================================
-- RÉACTIVATION DE RLS
-- =====================================================
-- Rétablir la sécurité Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
