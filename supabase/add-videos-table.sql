-- =====================================================
-- AJOUT DE LA TABLE VIDEOS POUR LA GALERIE
-- =====================================================
-- Exécutez ce script dans Supabase SQL Editor
-- =====================================================

-- Créer la table videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  duration VARCHAR(20),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les vidéos
CREATE POLICY "Public can read videos"
ON videos FOR SELECT
USING (true);

-- Politique : Seuls les utilisateurs authentifiés peuvent insérer
CREATE POLICY "Authenticated users can insert videos"
ON videos FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Politique : Seuls les utilisateurs authentifiés peuvent mettre à jour
CREATE POLICY "Authenticated users can update videos"
ON videos FOR UPDATE
USING (auth.role() = 'authenticated');

-- Politique : Seuls les utilisateurs authentifiés peuvent supprimer
CREATE POLICY "Authenticated users can delete videos"
ON videos FOR DELETE
USING (auth.role() = 'authenticated');

-- Index pour améliorer les performances
CREATE INDEX idx_videos_display_order ON videos(display_order);
CREATE INDEX idx_videos_created_at ON videos(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER videos_updated_at
BEFORE UPDATE ON videos
FOR EACH ROW
EXECUTE FUNCTION update_videos_updated_at();

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
