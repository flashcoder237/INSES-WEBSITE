-- =====================================================
-- MIGRATION: Table inscriptions
-- =====================================================
-- Ajoute les nouvelles colonnes à la table existante
-- Sans supprimer les données existantes
-- =====================================================

-- Désactiver temporairement RLS pour la migration
ALTER TABLE inscriptions DISABLE ROW LEVEL SECURITY;

-- Ajouter les colonnes manquantes si elles n'existent pas
DO $$
BEGIN
  -- Informations personnelles
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='gender') THEN
    ALTER TABLE inscriptions ADD COLUMN gender VARCHAR(20);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='place_of_birth') THEN
    ALTER TABLE inscriptions ADD COLUMN place_of_birth VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='nationality') THEN
    ALTER TABLE inscriptions ADD COLUMN nationality VARCHAR(100);
  END IF;

  -- Coordonnées
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='whatsapp') THEN
    ALTER TABLE inscriptions ADD COLUMN whatsapp VARCHAR(50);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='postal_code') THEN
    ALTER TABLE inscriptions ADD COLUMN postal_code VARCHAR(20);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='country') THEN
    ALTER TABLE inscriptions ADD COLUMN country VARCHAR(100) DEFAULT 'Cameroun';
  END IF;

  -- Informations familiales
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='father_name') THEN
    ALTER TABLE inscriptions ADD COLUMN father_name VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='father_profession') THEN
    ALTER TABLE inscriptions ADD COLUMN father_profession VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='father_phone') THEN
    ALTER TABLE inscriptions ADD COLUMN father_phone VARCHAR(50);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='mother_name') THEN
    ALTER TABLE inscriptions ADD COLUMN mother_name VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='mother_profession') THEN
    ALTER TABLE inscriptions ADD COLUMN mother_profession VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='mother_phone') THEN
    ALTER TABLE inscriptions ADD COLUMN mother_phone VARCHAR(50);
  END IF;

  -- Contact d'urgence
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='emergency_contact_name') THEN
    ALTER TABLE inscriptions ADD COLUMN emergency_contact_name VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='emergency_contact_relationship') THEN
    ALTER TABLE inscriptions ADD COLUMN emergency_contact_relationship VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='emergency_contact_phone') THEN
    ALTER TABLE inscriptions ADD COLUMN emergency_contact_phone VARCHAR(50);
  END IF;

  -- Formation souhaitée
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='desired_formation') THEN
    ALTER TABLE inscriptions ADD COLUMN desired_formation VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='academic_level') THEN
    ALTER TABLE inscriptions ADD COLUMN academic_level VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='last_school_attended') THEN
    ALTER TABLE inscriptions ADD COLUMN last_school_attended VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='last_diploma_obtained') THEN
    ALTER TABLE inscriptions ADD COLUMN last_diploma_obtained VARCHAR(255);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='diploma_year') THEN
    ALTER TABLE inscriptions ADD COLUMN diploma_year VARCHAR(10);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='preferred_start_date') THEN
    ALTER TABLE inscriptions ADD COLUMN preferred_start_date VARCHAR(100);
  END IF;

  -- Session d'inscription
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='is_first_time_student') THEN
    ALTER TABLE inscriptions ADD COLUMN is_first_time_student BOOLEAN DEFAULT true;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_previous_medical_training') THEN
    ALTER TABLE inscriptions ADD COLUMN has_previous_medical_training BOOLEAN DEFAULT false;
  END IF;

  -- Informations complémentaires
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='languages_spoken') THEN
    ALTER TABLE inscriptions ADD COLUMN languages_spoken TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_disabilities') THEN
    ALTER TABLE inscriptions ADD COLUMN has_disabilities BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='disability_description') THEN
    ALTER TABLE inscriptions ADD COLUMN disability_description TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='special_needs') THEN
    ALTER TABLE inscriptions ADD COLUMN special_needs TEXT;
  END IF;

  -- Motivation et parcours
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='motivation_message') THEN
    ALTER TABLE inscriptions ADD COLUMN motivation_message TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='career_goals') THEN
    ALTER TABLE inscriptions ADD COLUMN career_goals TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='why_this_formation') THEN
    ALTER TABLE inscriptions ADD COLUMN why_this_formation TEXT;
  END IF;

  -- Documents
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_birth_certificate') THEN
    ALTER TABLE inscriptions ADD COLUMN has_birth_certificate BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_diploma') THEN
    ALTER TABLE inscriptions ADD COLUMN has_diploma BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_photos') THEN
    ALTER TABLE inscriptions ADD COLUMN has_photos BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='has_id_card') THEN
    ALTER TABLE inscriptions ADD COLUMN has_id_card BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='documents_notes') THEN
    ALTER TABLE inscriptions ADD COLUMN documents_notes TEXT;
  END IF;

  -- Statut administratif
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='status') THEN
    ALTER TABLE inscriptions ADD COLUMN status VARCHAR(50) DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='admin_notes') THEN
    ALTER TABLE inscriptions ADD COLUMN admin_notes TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='reviewed_by') THEN
    ALTER TABLE inscriptions ADD COLUMN reviewed_by UUID;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='reviewed_at') THEN
    ALTER TABLE inscriptions ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Métadonnées
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='source') THEN
    ALTER TABLE inscriptions ADD COLUMN source VARCHAR(50) DEFAULT 'website';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='ip_address') THEN
    ALTER TABLE inscriptions ADD COLUMN ip_address VARCHAR(100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='user_agent') THEN
    ALTER TABLE inscriptions ADD COLUMN user_agent TEXT;
  END IF;

  -- Timestamps
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='created_at') THEN
    ALTER TABLE inscriptions ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='updated_at') THEN
    ALTER TABLE inscriptions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

END $$;

-- Créer les index s'ils n'existent pas
CREATE INDEX IF NOT EXISTS idx_inscriptions_email ON inscriptions(email);
CREATE INDEX IF NOT EXISTS idx_inscriptions_phone ON inscriptions(phone);
CREATE INDEX IF NOT EXISTS idx_inscriptions_status ON inscriptions(status);
CREATE INDEX IF NOT EXISTS idx_inscriptions_desired_formation ON inscriptions(desired_formation);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON inscriptions(created_at DESC);

-- Trigger pour updated_at
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

-- Réactiver RLS
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Anyone can insert inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Authenticated users can manage inscriptions" ON inscriptions;
DROP POLICY IF EXISTS "Allow all operations on inscriptions" ON inscriptions;

-- Créer les nouvelles politiques
CREATE POLICY "Anyone can insert inscriptions"
ON inscriptions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage inscriptions"
ON inscriptions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Vérification
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'inscriptions'
ORDER BY ordinal_position;

-- Compter les inscriptions
SELECT COUNT(*) as total_inscriptions FROM inscriptions;
