-- =====================================================
-- SCHEMA SQL POUR INSES - BASE DE DONNÉES COMPLÈTE
-- =====================================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: site_info
-- Informations générales du site (nom, contact, réseaux sociaux)
-- =====================================================
CREATE TABLE site_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  fixed_line VARCHAR(50),
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  social_linkedin VARCHAR(255),
  social_twitter VARCHAR(255),
  other_phones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: formations
-- Formations offertes par l'institut
-- =====================================================
CREATE TABLE formations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  short_description_fr TEXT,
  short_description_en TEXT,
  full_description_fr TEXT,
  full_description_en TEXT,
  duration VARCHAR(100),
  level VARCHAR(100),
  icon VARCHAR(100),
  image VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: formation_skills
-- Compétences acquises dans chaque formation
-- =====================================================
CREATE TABLE formation_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formation_id UUID NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  skill_fr TEXT NOT NULL,
  skill_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: formation_careers
-- Débouchés professionnels pour chaque formation
-- =====================================================
CREATE TABLE formation_careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formation_id UUID NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  career_fr TEXT NOT NULL,
  career_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: about_info
-- Informations "À propos" (mission, vision, pédagogie)
-- =====================================================
CREATE TABLE about_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_fr TEXT,
  mission_en TEXT,
  vision_fr TEXT,
  vision_en TEXT,
  pedagogy_theoretical_fr TEXT,
  pedagogy_theoretical_en TEXT,
  pedagogy_practical_fr TEXT,
  pedagogy_practical_en TEXT,
  pedagogy_evaluation_fr TEXT,
  pedagogy_evaluation_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: about_values
-- Valeurs de l'institut
-- =====================================================
CREATE TABLE about_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: partners
-- Partenaires de l'institut
-- =====================================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_fr VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: stats
-- Statistiques affichées sur le site
-- =====================================================
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value VARCHAR(50) NOT NULL,
  label_fr VARCHAR(255) NOT NULL,
  label_en VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: news
-- Actualités/événements
-- =====================================================
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) CHECK (category IN ('event', 'announcement', 'success')),
  image VARCHAR(255),
  published_date DATE NOT NULL,
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  excerpt_fr TEXT,
  excerpt_en TEXT,
  content_fr TEXT,
  content_en TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: contact_submissions
-- Soumissions du formulaire de contact
-- =====================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: inscription_submissions
-- Soumissions du formulaire d'inscription
-- =====================================================
CREATE TABLE inscription_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  formation_id UUID REFERENCES formations(id),
  formation_name VARCHAR(255),
  message TEXT,
  is_processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: gallery_images
-- Images de la galerie
-- =====================================================
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255),
  title_en VARCHAR(255),
  description_fr TEXT,
  description_en TEXT,
  image_url VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES pour optimiser les requêtes
-- =====================================================
CREATE INDEX idx_formations_slug ON formations(slug);
CREATE INDEX idx_formations_active ON formations(is_active);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_published ON news(is_published, published_date DESC);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_formation_skills_formation_id ON formation_skills(formation_id);
CREATE INDEX idx_formation_careers_formation_id ON formation_careers(formation_id);

-- =====================================================
-- TRIGGERS pour updated_at automatique
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_info_updated_at BEFORE UPDATE ON site_info
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON formations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_info_updated_at BEFORE UPDATE ON about_info
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_values_updated_at BEFORE UPDATE ON about_values
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Activer RLS sur toutes les tables
ALTER TABLE site_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE formation_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscription_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES - Lecture publique, écriture admin uniquement
-- =====================================================

-- site_info
CREATE POLICY "Public can read site_info" ON site_info FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site_info" ON site_info FOR UPDATE USING (auth.role() = 'authenticated');

-- formations
CREATE POLICY "Public can read active formations" ON formations FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage formations" ON formations FOR ALL USING (auth.role() = 'authenticated');

-- formation_skills
CREATE POLICY "Public can read formation_skills" ON formation_skills FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage formation_skills" ON formation_skills FOR ALL USING (auth.role() = 'authenticated');

-- formation_careers
CREATE POLICY "Public can read formation_careers" ON formation_careers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage formation_careers" ON formation_careers FOR ALL USING (auth.role() = 'authenticated');

-- about_info
CREATE POLICY "Public can read about_info" ON about_info FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update about_info" ON about_info FOR UPDATE USING (auth.role() = 'authenticated');

-- about_values
CREATE POLICY "Public can read about_values" ON about_values FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage about_values" ON about_values FOR ALL USING (auth.role() = 'authenticated');

-- partners
CREATE POLICY "Public can read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage partners" ON partners FOR ALL USING (auth.role() = 'authenticated');

-- stats
CREATE POLICY "Public can read stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage stats" ON stats FOR ALL USING (auth.role() = 'authenticated');

-- news
CREATE POLICY "Public can read published news" ON news FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage news" ON news FOR ALL USING (auth.role() = 'authenticated');

-- contact_submissions
CREATE POLICY "Anyone can insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read contact_submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contact_submissions" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- inscription_submissions
CREATE POLICY "Anyone can insert inscription_submissions" ON inscription_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read inscription_submissions" ON inscription_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update inscription_submissions" ON inscription_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- gallery_images
CREATE POLICY "Public can read active gallery_images" ON gallery_images FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- INSERTION DES DONNÉES PAR DÉFAUT
-- =====================================================

-- Insérer une ligne de configuration site par défaut
INSERT INTO site_info (
  name,
  full_name,
  description,
  location,
  email,
  phone,
  whatsapp,
  fixed_line,
  other_phones
) VALUES (
  'INSES',
  'Institut Supérieur de l''Espoir',
  'L''INSES est un établissement d''enseignement supérieur spécialisé dans les formations paramédicales et de santé.',
  'Douala-Bonabéri, Cameroun',
  'contact@inses.cm',
  '+237 674 93 66 04',
  '+237 674 93 66 04',
  '9293 2000',
  '["654 11 88 90", "698 33 04 38", "690 31 14 39"]'::jsonb
);

-- Insérer une ligne about_info par défaut
INSERT INTO about_info (
  mission_fr,
  mission_en
) VALUES (
  'Former des professionnels de santé compétents et engagés.',
  'Train competent and committed healthcare professionals.'
);

-- =====================================================
-- FIN DU SCHEMA
-- =====================================================
