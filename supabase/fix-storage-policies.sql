-- =====================================================
-- POLITIQUES RLS POUR LE BUCKET STORAGE
-- =====================================================
-- Ce script configure les politiques RLS pour le bucket inses-images
-- afin de permettre l'upload et la suppression d'images par les utilisateurs authentifiés
-- =====================================================

-- =====================================================
-- VÉRIFIER QUE LE BUCKET EXISTE
-- =====================================================
-- Si le bucket n'existe pas, créez-le d'abord via l'interface Supabase
-- Storage > Buckets > Create bucket
-- Nom: inses-images
-- Public: Oui

-- =====================================================
-- SUPPRIMER LES ANCIENNES POLITIQUES
-- =====================================================

DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- =====================================================
-- CRÉER LES NOUVELLES POLITIQUES
-- =====================================================

-- 1. Lecture publique de toutes les images du bucket inses-images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'inses-images');

-- 2. Les utilisateurs authentifiés peuvent uploader dans inses-images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'inses-images');

-- 3. Les utilisateurs authentifiés peuvent mettre à jour dans inses-images
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'inses-images')
WITH CHECK (bucket_id = 'inses-images');

-- 4. Les utilisateurs authentifiés peuvent supprimer dans inses-images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'inses-images');

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Lister toutes les politiques du bucket storage
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- =====================================================
-- TESTER LES PERMISSIONS (optionnel)
-- =====================================================

-- Pour tester, vous pouvez essayer d'uploader une image via l'admin
-- Si vous obtenez une erreur "policy violation", vérifiez:
-- 1. Que vous êtes bien authentifié (email visible en haut à droite)
-- 2. Que le bucket 'inses-images' existe et est public
-- 3. Que les politiques ci-dessus ont été créées sans erreur

-- =====================================================
-- RÉSUMÉ
-- =====================================================
-- ✓ Lecture publique des images (pour affichage sur le site)
-- ✓ Upload réservé aux utilisateurs authentifiés (admin)
-- ✓ Modification réservée aux utilisateurs authentifiés
-- ✓ Suppression réservée aux utilisateurs authentifiés
--
-- Ces politiques s'appliquent uniquement au bucket 'inses-images'
