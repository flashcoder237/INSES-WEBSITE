-- =====================================================
-- DÉSACTIVER RLS POUR LES TABLES ADMIN
-- =====================================================
-- Solution simple: désactiver RLS pour permettre la modification
-- via l'interface d'administration
--
-- ATTENTION: Ceci rend les tables modifiables sans authentification
-- Utilisez cette solution uniquement si:
-- 1. L'admin est protégé par un autre moyen (middleware, etc.)
-- 2. Vous êtes sur un environnement de développement
-- 3. Vous implémenterez une vraie authentification plus tard
-- =====================================================

-- Désactiver RLS pour les tables de l'admin
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE formations DISABLE ROW LEVEL SECURITY;
ALTER TABLE formation_skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE formation_careers DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;

-- Les tables contacts et inscriptions gardent leur protection
-- (insertion publique, lecture/modification admin uniquement)
-- ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE inscriptions DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- VÉRIFICATION
-- =====================================================

SELECT
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('news', 'formations', 'gallery', 'videos', 'contacts', 'inscriptions')
ORDER BY tablename;

-- =====================================================
-- REMARQUES
-- =====================================================
-- Si rowsecurity = false → RLS désactivé (modification possible)
-- Si rowsecurity = true → RLS activé (nécessite authentification)
--
-- Pour réactiver RLS plus tard (quand vous aurez l'auth):
-- ALTER TABLE news ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
-- etc.
