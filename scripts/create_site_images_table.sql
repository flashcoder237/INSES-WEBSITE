-- Créer la table pour les images du site
CREATE TABLE IF NOT EXISTS site_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  alt_fr TEXT NOT NULL,
  alt_en TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index pour recherche rapide par clé
CREATE INDEX IF NOT EXISTS idx_site_images_key ON site_images(key);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_site_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
DROP TRIGGER IF EXISTS trigger_update_site_images_updated_at ON site_images;
CREATE TRIGGER trigger_update_site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_site_images_updated_at();

-- Insérer les images par défaut
INSERT INTO site_images (key, url, alt_fr, alt_en, description) VALUES
  ('hero-home', '/images/hero/hero-home.jpg', 'Étudiants INSES - Institut Supérieur de l''Espoir', 'INSES Students - Higher Institute of Hope', 'Image hero de la page d''accueil'),
  ('hero-formations', '/images/hero/hero-formations.jpg', 'Formations professionnelles INSES', 'INSES Professional Training Programs', 'Image hero de la page formations'),
  ('hero-about', '/images/hero/hero-about.jpg', 'À propos de l''INSES', 'About INSES', 'Image hero de la page à propos'),
  ('hero-contact', '/images/hero/hero-contact.jpg', 'Contactez-nous', 'Contact Us', 'Image hero de la page contact'),
  ('hero-campus', '/images/about/hero-campus.jpg', 'Campus INSES - Bâtiment principal', 'INSES Campus - Main Building', 'Image du campus et bâtiment principal'),
  ('students-class', '/images/about/students-class.jpg', 'Étudiants INSES en classe', 'INSES Students in Class', 'Image des étudiants en classe'),
  ('logo', '/images/logo/logo-inses.png', 'Logo de l''INSES', 'INSES Logo', 'Logo principal de l''institut'),
  ('og-image', '/images/logo/logo-inses.png', 'Logo de l''INSES - Institut Supérieur de l''Espoir', 'INSES Logo - Higher Institute of Hope', 'Image pour partage sur réseaux sociaux (OpenGraph)')
ON CONFLICT (key) DO NOTHING;

-- Activer RLS (Row Level Security)
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Public can view site images" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can update site images" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can insert site images" ON site_images;
DROP POLICY IF EXISTS "Authenticated users can delete site images" ON site_images;

-- Politique pour lecture publique
CREATE POLICY "Public can view site images"
  ON site_images
  FOR SELECT
  USING (true);

-- Politique pour modification (admin seulement)
CREATE POLICY "Authenticated users can update site images"
  ON site_images
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert site images"
  ON site_images
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete site images"
  ON site_images
  FOR DELETE
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE site_images IS 'Stockage des URLs et métadonnées des images principales du site (hero, logo, etc.)';
COMMENT ON COLUMN site_images.key IS 'Identifiant unique de l''image (ex: hero-home, logo, og-image)';
COMMENT ON COLUMN site_images.url IS 'URL de l''image (peut être locale /images/... ou Supabase Storage)';
COMMENT ON COLUMN site_images.alt_fr IS 'Texte alternatif en français pour SEO et accessibilité';
COMMENT ON COLUMN site_images.alt_en IS 'Texte alternatif en anglais pour SEO et accessibilité';
