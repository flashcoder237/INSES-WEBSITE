-- Créer la table formations si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.formations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  level_required TEXT NOT NULL,
  diploma_type TEXT NOT NULL,
  duration TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Supprimer les formations existantes pour éviter les doublons
-- Utiliser DELETE au lieu de TRUNCATE pour gérer les contraintes de clés étrangères
DELETE FROM public.formations;

-- FILIÈRES SANTÉ / HEALTH SECTOR
-- BTS/HND, Licence Professionnelle/Bachelor's Degree (BAC et plus)

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('sciences-infirmieres-bts', 'Sciences Infirmières', 'Nursing Sciences', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 1),
('sage-femme', 'Sage-Femme', 'Midwifery', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 2),
('techniques-laboratoire', 'Techniques de Laboratoire', 'Laboratory Techniques', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 3),
('kinesitherapie', 'Kinésithérapie', 'Physiotherapy', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 4),
('dietetique-bts', 'Diététique', 'Dietetics', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 5),
('radiologie-imagerie', 'Radiologie et Imagérie Médicale', 'Radiology and Medical Imaging', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 6),
('techniques-pharmaceutiques', 'Techniques Pharmaceutiques', 'Pharmaceutical Techniques', 'Santé', 'BTS/Licence', 'BAC', 'BTS/Licence Professionnelle', 7);

-- Master Professionnel / Master's Degree

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('sciences-infirmieres-master', 'Sciences Infirmières', 'Nursing Sciences', 'Santé', 'Master', 'Licence', 'Master Professionnel', 8),
('sante-publique', 'Santé Publique', 'Public Health', 'Santé', 'Master', 'Licence', 'Master Professionnel', 9),
('sante-reproduction', 'Santé de Reproduction', 'Reproductive Health', 'Santé', 'Master', 'Licence', 'Master Professionnel', 10),
('sciences-biomedicales', 'Sciences Biomédicales', 'Biomedical Sciences', 'Santé', 'Master', 'Licence', 'Master Professionnel', 11),
('dietetique-nutrition-master', 'Diététique et Nutrition', 'Dietetics and Nutrition', 'Santé', 'Master', 'Licence', 'Master Professionnel', 12);

-- BTS FILIÈRES COMMERCE ET GESTION (BAC et plus)

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('comptabilite-gestion', 'Comptabilité et Gestion des Entreprises', 'Accounting and Business Management', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 20),
('gestion-rh', 'Gestion des Ressources Humaines', 'Human Resources Management', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 21),
('douane-transit', 'Douane et Transit', 'Customs and Transit', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 22),
('banque-finance', 'Banque et Finance', 'Banking and Finance', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 23),
('logistique-transport', 'Logistique et Transport', 'Logistics and Transport', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 24),
('assurance', 'Assurance', 'Insurance', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 25),
('marketing-commerce-vente', 'Marketing-Commerce-Vente', 'Marketing-Commerce-Sales', 'Commerce et Gestion', 'BTS', 'BAC', 'BTS', 26);

-- FILIÈRES PARAMÉDICALES (BEPC/CAP/GCE OL/PROBATOIRE - BAC et plus)

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('soins-infirmiers', 'Soins Infirmiers', 'Nursing', 'Paramédical', 'Formation de base', 'BEPC/Probatoire/BAC', 'Diplôme paramédical', 30),
('assistant-cabinet-medical', 'Assistant en Cabinet Médical', 'Medical Office Assistant', 'Paramédical', 'Formation de base', 'BEPC/Probatoire/BAC', 'Diplôme paramédical', 31),
('prepose-beneficiaires', 'Préposé aux Bénéficiaires', 'Beneficiary Assistant', 'Paramédical', 'Formation de base', 'BEPC/Probatoire/BAC', 'Diplôme paramédical', 32);

-- CQP/AQP

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('assistant-kinesitherapie', 'Assistant Kinésithérapie', 'Physiotherapy Assistant', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 40),
('aide-chimiste-biologiste', 'Aide Chimiste Biologiste', 'Assistant Chemist Biologist', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 41),
('dietetique-cqp', 'Diététique', 'Dietetics', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 42),
('massotherapie', 'Massothérapie', 'Massage Therapy', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 43),
('delegue-pharmaceutique', 'Délégué Pharmaceutique', 'Pharmaceutical Delegate', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 44),
('delegue-assurance-maladie', 'Délégué de l''Assurance Maladie', 'Health Insurance Delegate', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 45),
('delegue-medical', 'Délégué Médical', 'Medical Delegate', 'Paramédical', 'CQP/AQP', 'BEPC/Probatoire', 'CQP/AQP', 46);

-- DQP/AQP

INSERT INTO public.formations (slug, title, title_en, category, subcategory, level_required, diploma_type, display_order) VALUES
('vendeur-pharmacie', 'Vendeur en Pharmacie', 'Pharmacy Salesperson', 'Paramédical', 'DQP/AQP', 'BEPC/Probatoire', 'DQP/AQP', 50),
('secretariat-medical', 'Secrétariat Médical', 'Medical Secretariat', 'Paramédical', 'DQP/AQP', 'BEPC/Probatoire', 'DQP/AQP', 51);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_formations_category ON public.formations(category);
CREATE INDEX IF NOT EXISTS idx_formations_level_required ON public.formations(level_required);
CREATE INDEX IF NOT EXISTS idx_formations_is_active ON public.formations(is_active);
CREATE INDEX IF NOT EXISTS idx_formations_display_order ON public.formations(display_order);

-- Enable Row Level Security
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des formations
DROP POLICY IF EXISTS "Allow public read formations" ON public.formations;
CREATE POLICY "Allow public read formations" ON public.formations
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Politique pour permettre aux utilisateurs authentifiés de gérer les formations
DROP POLICY IF EXISTS "Allow authenticated manage formations" ON public.formations;
CREATE POLICY "Allow authenticated manage formations" ON public.formations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.formations IS 'Liste des formations offertes par INSES';
