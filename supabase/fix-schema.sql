-- =====================================================
-- CORRECTIONS DU SCHÉMA POUR CORRESPONDRE À L'ADMIN
-- =====================================================
-- Exécutez ce script après avoir exécuté schema.sql
-- =====================================================

-- 1. Renommer les tables pour correspondre aux noms utilisés dans l'admin
ALTER TABLE contact_submissions RENAME TO contacts;
ALTER TABLE inscription_submissions RENAME TO inscriptions;
ALTER TABLE gallery_images RENAME TO gallery;

-- 2. Supprimer les anciennes politiques RLS AVANT de modifier les colonnes
DROP POLICY IF EXISTS "Anyone can insert contact_submissions" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can read contact_submissions" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can update contact_submissions" ON contacts;
DROP POLICY IF EXISTS "Anyone can insert inscription_submissions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can read inscription_submissions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can update inscription_submissions" ON inscriptions;
DROP POLICY IF EXISTS "Public can read active gallery_images" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery_images" ON gallery;

-- 3. Modifier la table inscriptions pour avoir un champ status au lieu de is_processed
ALTER TABLE inscriptions DROP COLUMN IF EXISTS is_processed;
ALTER TABLE inscriptions ADD COLUMN status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- 4. Modifier la table gallery pour correspondre à l'admin
ALTER TABLE gallery RENAME COLUMN image_url TO url;
ALTER TABLE gallery RENAME COLUMN title_fr TO title;
ALTER TABLE gallery DROP COLUMN IF EXISTS title_en;
ALTER TABLE gallery DROP COLUMN IF EXISTS description_fr;
ALTER TABLE gallery DROP COLUMN IF EXISTS description_en;
ALTER TABLE gallery DROP COLUMN IF EXISTS is_active;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- 5. Créer les nouvelles politiques RLS pour les tables renommées

-- Nouvelles politiques pour contacts
CREATE POLICY "Anyone can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');

-- Nouvelles politiques pour inscriptions
CREATE POLICY "Anyone can insert inscriptions" ON inscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read inscriptions" ON inscriptions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update inscriptions" ON inscriptions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete inscriptions" ON inscriptions FOR DELETE USING (auth.role() = 'authenticated');

-- Nouvelles politiques pour gallery
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- 6. Supprimer la colonne formation_name de inscriptions (on utilise la relation)
ALTER TABLE inscriptions DROP COLUMN IF EXISTS formation_name;

-- =====================================================
-- FIN DES CORRECTIONS
-- =====================================================
