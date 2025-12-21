-- =====================================================
-- RÉACTIVER RLS AVEC AUTHENTIFICATION SUPABASE
-- =====================================================
-- Ce script réactive RLS et configure les politiques pour
-- les utilisateurs authentifiés via Supabase Auth
-- =====================================================

-- =====================================================
-- ÉTAPE 1: RÉACTIVER RLS SUR TOUTES LES TABLES
-- =====================================================

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 2: SUPPRIMER LES ANCIENNES POLITIQUES
-- =====================================================

-- News
DROP POLICY IF EXISTS "Public can read published news" ON news;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;
DROP POLICY IF EXISTS "Allow all operations on news" ON news;

-- Formations
DROP POLICY IF EXISTS "Public can read active formations" ON formations;
DROP POLICY IF EXISTS "Authenticated users can manage formations" ON formations;
DROP POLICY IF EXISTS "Allow all operations on formations" ON formations;

-- Formation Skills
DROP POLICY IF EXISTS "Public can read formation_skills" ON formation_skills;
DROP POLICY IF EXISTS "Authenticated users can manage formation_skills" ON formation_skills;
DROP POLICY IF EXISTS "Allow all operations on formation_skills" ON formation_skills;

-- Formation Careers
DROP POLICY IF EXISTS "Public can read formation_careers" ON formation_careers;
DROP POLICY IF EXISTS "Authenticated users can manage formation_careers" ON formation_careers;
DROP POLICY IF EXISTS "Allow all operations on formation_careers" ON formation_careers;

-- Gallery
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Allow all operations on gallery" ON gallery;

-- Videos
DROP POLICY IF EXISTS "Public can read videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;
DROP POLICY IF EXISTS "Allow all operations on videos" ON videos;

-- Contacts
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON contacts;
DROP POLICY IF EXISTS "Allow all operations on contacts" ON contacts;

-- Inscriptions
DROP POLICY IF EXISTS "Anyone can insert inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can manage inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Allow all operations on inscriptions" ON inscriptions;

-- =====================================================
-- ÉTAPE 3: CRÉER LES NOUVELLES POLITIQUES
-- =====================================================

-- =====================================================
-- TABLE: news (Actualités)
-- =====================================================

-- Lecture publique des actualités publiées
CREATE POLICY "Public can read published news"
ON news FOR SELECT
USING (is_published = true);

-- Gestion complète pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage news"
ON news FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formations
-- =====================================================

-- Lecture publique des formations actives
CREATE POLICY "Public can read active formations"
ON formations FOR SELECT
USING (is_active = true);

-- Gestion complète pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage formations"
ON formations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_skills
-- =====================================================

-- Lecture publique
CREATE POLICY "Public can read formation_skills"
ON formation_skills FOR SELECT
USING (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage formation_skills"
ON formation_skills FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_careers
-- =====================================================

-- Lecture publique
CREATE POLICY "Public can read formation_careers"
ON formation_careers FOR SELECT
USING (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage formation_careers"
ON formation_careers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: gallery
-- =====================================================

-- Lecture publique
CREATE POLICY "Public can read gallery"
ON gallery FOR SELECT
USING (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage gallery"
ON gallery FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: videos
-- =====================================================

-- Lecture publique
CREATE POLICY "Public can read videos"
ON videos FOR SELECT
USING (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage videos"
ON videos FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: contacts
-- =====================================================

-- Insertion publique (formulaire de contact)
CREATE POLICY "Anyone can insert contacts"
ON contacts FOR INSERT
WITH CHECK (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage contacts"
ON contacts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: inscriptions
-- =====================================================

-- Insertion publique (formulaire d'inscription)
CREATE POLICY "Anyone can insert inscriptions"
ON inscriptions FOR INSERT
WITH CHECK (true);

-- Gestion pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage inscriptions"
ON inscriptions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Vérifier que RLS est activé
SELECT
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('news', 'formations', 'formation_skills', 'formation_careers', 'gallery', 'videos', 'contacts', 'inscriptions')
ORDER BY tablename;

-- Vérifier les politiques créées
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('news', 'formations', 'formation_skills', 'formation_careers', 'gallery', 'videos', 'contacts', 'inscriptions')
ORDER BY tablename, policyname;

-- =====================================================
-- RÉSUMÉ
-- =====================================================
-- ✓ RLS réactivé sur toutes les tables
-- ✓ Lecture publique des données publiées/actives
-- ✓ Gestion complète (CRUD) pour utilisateurs authentifiés via Supabase Auth
-- ✓ Insertion publique des contacts et inscriptions
--
-- PROCHAINES ÉTAPES:
-- 1. Créer un utilisateur admin dans Supabase Auth (Authentication > Users)
-- 2. Se connecter sur /login avec les identifiants créés
-- 3. Tester les opérations CRUD dans l'admin
