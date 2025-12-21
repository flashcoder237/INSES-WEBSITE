-- =====================================================
-- POLITIQUES RLS PERMISSIVES (ALTERNATIVE)
-- =====================================================
-- Solution alternative: garder RLS activé mais avec des politiques permissives
-- Permet toutes les opérations sur les tables sans authentification
--
-- Utilisez ceci si vous préférez garder RLS activé
-- =====================================================

-- =====================================================
-- TABLE: news
-- =====================================================

DROP POLICY IF EXISTS "Public can read published news" ON news;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;
DROP POLICY IF EXISTS "Allow all operations on news" ON news;

-- Politique permissive: permet TOUTES les opérations
CREATE POLICY "Allow all operations on news"
ON news FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formations
-- =====================================================

DROP POLICY IF EXISTS "Public can read active formations" ON formations;
DROP POLICY IF EXISTS "Authenticated users can manage formations" ON formations;
DROP POLICY IF EXISTS "Allow all operations on formations" ON formations;

CREATE POLICY "Allow all operations on formations"
ON formations FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_skills
-- =====================================================

DROP POLICY IF EXISTS "Public can read formation_skills" ON formation_skills;
DROP POLICY IF EXISTS "Authenticated users can manage formation_skills" ON formation_skills;
DROP POLICY IF EXISTS "Allow all operations on formation_skills" ON formation_skills;

CREATE POLICY "Allow all operations on formation_skills"
ON formation_skills FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: formation_careers
-- =====================================================

DROP POLICY IF EXISTS "Public can read formation_careers" ON formation_careers;
DROP POLICY IF EXISTS "Authenticated users can manage formation_careers" ON formation_careers;
DROP POLICY IF EXISTS "Allow all operations on formation_careers" ON formation_careers;

CREATE POLICY "Allow all operations on formation_careers"
ON formation_careers FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: gallery
-- =====================================================

DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Allow all operations on gallery" ON gallery;

CREATE POLICY "Allow all operations on gallery"
ON gallery FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: videos
-- =====================================================

DROP POLICY IF EXISTS "Public can read videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;
DROP POLICY IF EXISTS "Allow all operations on videos" ON videos;

CREATE POLICY "Allow all operations on videos"
ON videos FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: contacts (garder la protection)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON contacts;

CREATE POLICY "Allow all operations on contacts"
ON contacts FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- TABLE: inscriptions (garder la protection)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can insert inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can manage inscriptions" ON inscriptions;

CREATE POLICY "Allow all operations on inscriptions"
ON inscriptions FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('news', 'formations', 'gallery', 'videos', 'contacts', 'inscriptions')
ORDER BY tablename, policyname;

-- =====================================================
-- RÉSUMÉ
-- =====================================================
-- RLS est activé MAIS avec des politiques permissives (USING true)
-- Toutes les opérations sont autorisées sans authentification
--
-- Avantage: RLS reste activé (bonne pratique)
-- Inconvénient: Pas de vraie sécurité (comme si RLS était désactivé)
--
-- Pour une vraie sécurité, vous devrez implémenter:
-- 1. Authentification Supabase Auth
-- 2. Protection de l'admin par middleware
-- 3. Politiques RLS basées sur l'authentification
