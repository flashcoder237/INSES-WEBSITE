-- Migration: Ajouter le champ image_url à la table formations
-- Date: 2025-12-24
-- Description: Ajoute le champ image_url pour stocker l'URL de l'image OpenGraph des formations

-- Ajouter la colonne image_url à la table formations
ALTER TABLE formations
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Ajouter un commentaire pour documenter le champ
COMMENT ON COLUMN formations.image_url IS 'URL de l''image utilisée pour OpenGraph et partage sur réseaux sociaux (1200x630px recommandé)';

-- Note: Ce champ est optionnel. Si vide, une image par défaut sera utilisée.
