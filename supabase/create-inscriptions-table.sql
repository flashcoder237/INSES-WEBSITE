-- =====================================================
-- TABLE: inscriptions (COMPLÈTE)
-- =====================================================
-- Formulaire d'inscription complet avec tous les champs nécessaires
-- =====================================================

-- Supprimer la table si elle existe (attention: supprime toutes les données!)
-- DROP TABLE IF EXISTS inscriptions CASCADE;

-- Créer la table avec tous les champs
CREATE TABLE IF NOT EXISTS inscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations personnelles
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender VARCHAR(20),  -- 'male', 'female', 'other'
  date_of_birth DATE NOT NULL,
  place_of_birth VARCHAR(255),
  nationality VARCHAR(100),

  -- Coordonnées
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50),  -- Numéro WhatsApp si différent
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Cameroun',

  -- Informations familiales
  father_name VARCHAR(255),
  father_profession VARCHAR(255),
  father_phone VARCHAR(50),
  mother_name VARCHAR(255),
  mother_profession VARCHAR(255),
  mother_phone VARCHAR(50),

  -- Contact d'urgence
  emergency_contact_name VARCHAR(255),
  emergency_contact_relationship VARCHAR(100),
  emergency_contact_phone VARCHAR(50),

  -- Formation souhaitée
  desired_formation VARCHAR(255) NOT NULL,  -- Slug de la formation
  academic_level VARCHAR(100) NOT NULL,  -- BEPC, Probatoire, BAC, Licence, etc.
  last_school_attended VARCHAR(255),
  last_diploma_obtained VARCHAR(255),
  diploma_year VARCHAR(10),

  -- Session d'inscription
  preferred_start_date VARCHAR(100),  -- Ex: "Septembre 2025", "Janvier 2026"
  is_first_time_student BOOLEAN DEFAULT true,
  has_previous_medical_training BOOLEAN DEFAULT false,

  -- Informations complémentaires
  languages_spoken TEXT,  -- Langues parlées (JSON ou texte)
  has_disabilities BOOLEAN DEFAULT false,
  disability_description TEXT,
  special_needs TEXT,

  -- Motivation et parcours
  motivation_message TEXT,
  career_goals TEXT,
  why_this_formation TEXT,

  -- Documents
  has_birth_certificate BOOLEAN DEFAULT false,
  has_diploma BOOLEAN DEFAULT false,
  has_photos BOOLEAN DEFAULT false,
  has_id_card BOOLEAN DEFAULT false,
  documents_notes TEXT,

  -- Statut administratif
  status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'under_review', 'accepted', 'rejected', 'archived'
  admin_notes TEXT,
  reviewed_by UUID,  -- ID de l'admin qui a traité la demande
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Métadonnées
  source VARCHAR(50) DEFAULT 'website',  -- 'website', 'phone', 'walk-in', etc.
  ip_address VARCHAR(100),
  user_agent TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_inscriptions_email ON inscriptions(email);
CREATE INDEX IF NOT EXISTS idx_inscriptions_phone ON inscriptions(phone);
CREATE INDEX IF NOT EXISTS idx_inscriptions_status ON inscriptions(status);
CREATE INDEX IF NOT EXISTS idx_inscriptions_formation ON inscriptions(desired_formation);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON inscriptions(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_inscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_inscriptions_updated_at ON inscriptions;
CREATE TRIGGER trigger_update_inscriptions_updated_at
  BEFORE UPDATE ON inscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_inscriptions_updated_at();

-- =====================================================
-- POLITIQUES RLS
-- =====================================================

ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Anyone can insert inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can manage inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Allow all operations on inscriptions" ON inscriptions;

-- Insertion publique (formulaire)
CREATE POLICY "Anyone can insert inscriptions"
ON inscriptions FOR INSERT
WITH CHECK (true);

-- Gestion complète pour les utilisateurs authentifiés
CREATE POLICY "Authenticated users can manage inscriptions"
ON inscriptions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Compter les inscriptions
SELECT COUNT(*) as total_inscriptions FROM inscriptions;

-- Vérifier la structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'inscriptions'
ORDER BY ordinal_position;

-- =====================================================
-- RÉSUMÉ DES CHAMPS
-- =====================================================
-- INFORMATIONS PERSONNELLES:
-- - first_name, last_name, gender, date_of_birth, place_of_birth, nationality
--
-- COORDONNÉES:
-- - email, phone, whatsapp, address, city, postal_code, country
--
-- INFORMATIONS FAMILIALES:
-- - father_name, father_profession, father_phone
-- - mother_name, mother_profession, mother_phone
-- - emergency_contact_name, emergency_contact_relationship, emergency_contact_phone
--
-- FORMATION:
-- - desired_formation, academic_level, last_school_attended
-- - last_diploma_obtained, diploma_year, preferred_start_date
--
-- MOTIVATION:
-- - motivation_message, career_goals, why_this_formation
--
-- DOCUMENTS:
-- - has_birth_certificate, has_diploma, has_photos, has_id_card
--
-- STATUT:
-- - status, admin_notes, reviewed_by, reviewed_at
