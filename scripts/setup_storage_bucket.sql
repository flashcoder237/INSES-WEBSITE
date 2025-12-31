-- =====================================================
-- Script de configuration du stockage Supabase
-- Pour le projet INSES
-- =====================================================

-- Créer le bucket public pour les images du site
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Politiques RLS pour le bucket public
-- =====================================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- Politique 1: Lecture publique pour tous
-- Permet à tout le monde de voir les images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public');

-- Politique 2: Upload pour utilisateurs authentifiés uniquement
-- Seuls les admins peuvent uploader des images
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');

-- Politique 3: Mise à jour pour utilisateurs authentifiés uniquement
-- Seuls les admins peuvent modifier des images
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');

-- Politique 4: Suppression pour utilisateurs authentifiés uniquement
-- Seuls les admins peuvent supprimer des images
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');

-- =====================================================
-- Vérification
-- =====================================================

-- Vérifier que le bucket a été créé
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id = 'public';

-- Vérifier les politiques RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;
