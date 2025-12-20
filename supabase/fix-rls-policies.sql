-- =====================================================
-- CORRECTION DES POLITIQUES RLS POUR L'ADMIN
-- =====================================================
-- Ce script corrige les politiques RLS pour permettre la modification
-- des données via l'interface d'administration
-- =====================================================

-- =====================================================
-- TABLE: news (Actualités)
-- =====================================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public can read published news" ON news;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;

-- Nouvelle politique de lecture (public pour les actualités publiées)
CREATE POLICY "Public can read published news"
ON news FOR SELECT
USING (is_published = true);

-- Nouvelle politique pour les utilisateurs authentifiés (toutes opérations)
CREATE POLICY "Authenticated users can manage news"
ON news FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formations
-- =====================================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public can read active formations" ON formations;
DROP POLICY IF EXISTS "Authenticated users can manage formations" ON formations;

-- Nouvelle politique de lecture (public pour les formations actives)
CREATE POLICY "Public can read active formations"
ON formations FOR SELECT
USING (is_active = true);

-- Nouvelle politique pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage formations"
ON formations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_skills
-- =====================================================

DROP POLICY IF EXISTS "Public can read formation_skills" ON formation_skills;
DROP POLICY IF EXISTS "Authenticated users can manage formation_skills" ON formation_skills;

CREATE POLICY "Public can read formation_skills"
ON formation_skills FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage formation_skills"
ON formation_skills FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_careers
-- =====================================================

DROP POLICY IF EXISTS "Public can read formation_careers" ON formation_careers;
DROP POLICY IF EXISTS "Authenticated users can manage formation_careers" ON formation_careers;

CREATE POLICY "Public can read formation_careers"
ON formation_careers FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage formation_careers"
ON formation_careers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: gallery
-- =====================================================

DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery" ON gallery;

CREATE POLICY "Public can read gallery"
ON gallery FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage gallery"
ON gallery FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: contacts
-- =====================================================

DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can read contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can delete contacts" ON contacts;

CREATE POLICY "Anyone can insert contacts"
ON contacts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contacts"
ON contacts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: inscriptions
-- =====================================================

DROP POLICY IF EXISTS "Anyone can insert inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can read inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can update inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can delete inscriptions" ON inscriptions;

CREATE POLICY "Anyone can insert inscriptions"
ON inscriptions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage inscriptions"
ON inscriptions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: videos
-- =====================================================

DROP POLICY IF EXISTS "Public can read videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;

CREATE POLICY "Public can read videos"
ON videos FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage videos"
ON videos FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- VÉRIFICATION DES POLITIQUES
-- =====================================================

-- Vérifier que les politiques ont été créées correctement
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('news', 'formations', 'gallery', 'contacts', 'inscriptions', 'videos')
ORDER BY tablename, policyname;

-- =====================================================
-- RÉSUMÉ
-- =====================================================
-- Les politiques RLS ont été mises à jour pour permettre:
--
-- 1. Lecture publique des données (actualités publiées, formations actives, etc.)
-- 2. Gestion complète (CRUD) pour les utilisateurs authentifiés
--
-- Si vous rencontrez toujours des problèmes:
-- - Vérifiez que vous êtes bien connecté dans l'admin
-- - Vérifiez que votre session Supabase est valide
-- - Essayez de vous déconnecter puis reconnecter dans l'admin
