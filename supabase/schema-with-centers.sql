-- =====================================================
-- SCHEMA SQL AMÉLIORÉ - SUPPORT MULTI-CENTRES (INSES + CEPRES)
-- =====================================================
-- Exécutez ce script pour ajouter le support de plusieurs centres
-- =====================================================

-- =====================================================
-- NOUVELLE TABLE: centers
-- Gère les différents centres (INSES, CEPRES, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_fr VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  full_name_fr VARCHAR(255) NOT NULL,
  full_name_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  logo VARCHAR(255),
  primary_color VARCHAR(20) DEFAULT '#3B82F6',
  secondary_color VARCHAR(20) DEFAULT '#8B5CF6',
  location VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MODIFIER LA TABLE formations
-- Ajouter la référence au centre
-- =====================================================
ALTER TABLE formations ADD COLUMN IF NOT EXISTS center_id UUID REFERENCES centers(id) ON DELETE CASCADE;
ALTER TABLE formations ADD COLUMN IF NOT EXISTS center_slug VARCHAR(100);

-- Index pour optimiser les requêtes par centre
CREATE INDEX IF NOT EXISTS idx_formations_center_id ON formations(center_id);
CREATE INDEX IF NOT EXISTS idx_formations_center_slug ON formations(center_slug);

-- =====================================================
-- NOUVELLE TABLE: center_info
-- Informations spécifiques à chaque centre (équivalent de site_info par centre)
-- =====================================================
CREATE TABLE IF NOT EXISTS center_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  mission_fr TEXT,
  mission_en TEXT,
  vision_fr TEXT,
  vision_en TEXT,
  history_fr TEXT,
  history_en TEXT,
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  social_linkedin VARCHAR(255),
  social_twitter VARCHAR(255),
  other_phones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(center_id)
);

-- =====================================================
-- NOUVELLE TABLE: center_values
-- Valeurs de chaque centre
-- =====================================================
CREATE TABLE IF NOT EXISTS center_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOUVELLE TABLE: center_partners
-- Partenaires par centre
-- =====================================================
CREATE TABLE IF NOT EXISTS center_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  name_fr VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOUVELLE TABLE: center_stats
-- Statistiques par centre
-- =====================================================
CREATE TABLE IF NOT EXISTS center_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id UUID NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  value VARCHAR(50) NOT NULL,
  label_fr VARCHAR(255) NOT NULL,
  label_en VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRIGGER pour updated_at
-- =====================================================
CREATE TRIGGER update_centers_updated_at BEFORE UPDATE ON centers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_center_info_updated_at BEFORE UPDATE ON center_info
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_center_values_updated_at BEFORE UPDATE ON center_values
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_center_partners_updated_at BEFORE UPDATE ON center_partners
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_center_stats_updated_at BEFORE UPDATE ON center_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE center_stats ENABLE ROW LEVEL SECURITY;

-- Policies pour centers
CREATE POLICY "Public can read active centers" ON centers FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage centers" ON centers FOR ALL USING (auth.role() = 'authenticated');

-- Policies pour center_info
CREATE POLICY "Public can read center_info" ON center_info FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage center_info" ON center_info FOR ALL USING (auth.role() = 'authenticated');

-- Policies pour center_values
CREATE POLICY "Public can read center_values" ON center_values FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage center_values" ON center_values FOR ALL USING (auth.role() = 'authenticated');

-- Policies pour center_partners
CREATE POLICY "Public can read center_partners" ON center_partners FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage center_partners" ON center_partners FOR ALL USING (auth.role() = 'authenticated');

-- Policies pour center_stats
CREATE POLICY "Public can read center_stats" ON center_stats FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage center_stats" ON center_stats FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- INSERTION DES DONNÉES INITIALES - INSES
-- =====================================================
INSERT INTO centers (slug, name_fr, name_en, full_name_fr, full_name_en, description_fr, description_en, logo, primary_color, secondary_color, location, email, phone, whatsapp, display_order)
VALUES (
  'inses',
  'INSES',
  'INSES',
  'Institut Supérieur de l''Espoir',
  'Higher Institute of Hope',
  'L''INSES est un établissement d''enseignement supérieur spécialisé dans les formations paramédicales et de santé.',
  'INSES is a higher education institution specialized in paramedical and health training.',
  '/images/logo-inses.png',
  '#DC2626',
  '#991B1B',
  'Douala-Bonabéri, Cameroun',
  'contact@inses.cm',
  '+237 674 93 66 04',
  '+237 674 93 66 04',
  1
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- INSERTION DES DONNÉES INITIALES - CEPRES
-- =====================================================
INSERT INTO centers (slug, name_fr, name_en, full_name_fr, full_name_en, description_fr, description_en, logo, primary_color, secondary_color, location, email, phone, whatsapp, display_order)
VALUES (
  'cepres',
  'CEPRES',
  'CEPRES',
  'Centre de Formation Professionnelle de l''Espoir',
  'Professional Training Center of Hope',
  'Le CEPRES est un centre de formation professionnelle offrant des programmes techniques et pratiques.',
  'CEPRES is a professional training center offering technical and practical programs.',
  '/images/logo-cepres.png',
  '#3B82F6',
  '#1E40AF',
  'Douala-Bonabéri, Cameroun',
  'contact@cepres.cm',
  '+237 674 93 66 04',
  '+237 674 93 66 04',
  2
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- MIGRER LES FORMATIONS EXISTANTES VERS INSES
-- =====================================================
-- Mettre à jour toutes les formations existantes pour les associer à INSES
UPDATE formations
SET center_id = (SELECT id FROM centers WHERE slug = 'inses'),
    center_slug = 'inses'
WHERE center_id IS NULL;

-- =====================================================
-- CRÉER center_info POUR INSES
-- =====================================================
INSERT INTO center_info (center_id, mission_fr, mission_en)
SELECT id, 'Former des professionnels de santé compétents et engagés.', 'Train competent and committed healthcare professionals.'
FROM centers WHERE slug = 'inses'
ON CONFLICT (center_id) DO NOTHING;

-- =====================================================
-- CRÉER center_info POUR CEPRES
-- =====================================================
INSERT INTO center_info (center_id, mission_fr, mission_en)
SELECT id, 'Former des professionnels techniques qualifiés pour le marché du travail.', 'Train qualified technical professionals for the job market.'
FROM centers WHERE slug = 'cepres'
ON CONFLICT (center_id) DO NOTHING;

-- =====================================================
-- MIGRER about_values VERS center_values POUR INSES
-- =====================================================
INSERT INTO center_values (center_id, title_fr, title_en, description_fr, description_en, display_order)
SELECT
  (SELECT id FROM centers WHERE slug = 'inses'),
  title_fr,
  title_en,
  description_fr,
  description_en,
  display_order
FROM about_values
WHERE NOT EXISTS (SELECT 1 FROM center_values WHERE center_id = (SELECT id FROM centers WHERE slug = 'inses'));

-- =====================================================
-- MIGRER partners VERS center_partners POUR INSES
-- =====================================================
INSERT INTO center_partners (center_id, name_fr, name_en, logo, display_order)
SELECT
  (SELECT id FROM centers WHERE slug = 'inses'),
  name_fr,
  name_en,
  logo,
  display_order
FROM partners
WHERE NOT EXISTS (SELECT 1 FROM center_partners WHERE center_id = (SELECT id FROM centers WHERE slug = 'inses'));

-- =====================================================
-- MIGRER stats VERS center_stats POUR INSES
-- =====================================================
INSERT INTO center_stats (center_id, value, label_fr, label_en, display_order)
SELECT
  (SELECT id FROM centers WHERE slug = 'inses'),
  value,
  label_fr,
  label_en,
  display_order
FROM stats
WHERE NOT EXISTS (SELECT 1 FROM center_stats WHERE center_id = (SELECT id FROM centers WHERE slug = 'inses'));

-- =====================================================
-- VIEWS UTILES
-- =====================================================

-- Vue pour obtenir les formations avec leur centre
CREATE OR REPLACE VIEW formations_with_center AS
SELECT
  f.*,
  c.slug as center_slug,
  c.name_fr as center_name_fr,
  c.name_en as center_name_en,
  c.logo as center_logo
FROM formations f
LEFT JOIN centers c ON f.center_id = c.id;

-- =====================================================
-- FIN DU SCHEMA MULTI-CENTRES
-- =====================================================
