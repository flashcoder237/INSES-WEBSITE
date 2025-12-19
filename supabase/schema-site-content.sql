-- =====================================================
-- SCHEMA SQL - CONTENU TEXTUEL DYNAMIQUE
-- =====================================================
-- Permet de gérer tout le contenu textuel du site depuis l'admin
-- =====================================================

-- =====================================================
-- TABLE: site_content
-- Stocke TOUS les textes du site (labels, boutons, titres, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,  -- Clé unique (ex: 'home.hero.title')
  category VARCHAR(100) NOT NULL,     -- Catégorie (ex: 'home', 'navigation', 'forms')
  section VARCHAR(100),                -- Sous-section (ex: 'hero', 'features', 'cta')
  content_fr TEXT NOT NULL,            -- Contenu en français
  content_en TEXT NOT NULL,            -- Contenu en anglais
  description TEXT,                    -- Description pour l'admin
  content_type VARCHAR(50) DEFAULT 'text', -- Type: text, html, markdown
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(key);
CREATE INDEX IF NOT EXISTS idx_site_content_category ON site_content(category);
CREATE INDEX IF NOT EXISTS idx_site_content_active ON site_content(is_active);

-- Trigger pour updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active site_content" ON site_content
FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage site_content" ON site_content
FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- INSERTION DES DONNÉES INITIALES
-- =====================================================

-- ==================== NAVIGATION ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('nav.home', 'navigation', 'menu', 'Accueil', 'Home', 'Lien menu accueil'),
('nav.about', 'navigation', 'menu', 'À Propos', 'About', 'Lien menu à propos'),
('nav.formations', 'navigation', 'menu', 'Formations', 'Programs', 'Lien menu formations'),
('nav.news', 'navigation', 'menu', 'Actualités', 'News', 'Lien menu actualités'),
('nav.gallery', 'navigation', 'menu', 'Galerie', 'Gallery', 'Lien menu galerie'),
('nav.contact', 'navigation', 'menu', 'Contact', 'Contact', 'Lien menu contact'),
('nav.inscription', 'navigation', 'menu', 'Inscription', 'Enrollment', 'Lien menu inscription'),
('nav.centers', 'navigation', 'menu', 'Nos Centres', 'Our Centers', 'Lien menu centres')
ON CONFLICT (key) DO NOTHING;

-- ==================== COMMON ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('common.learnMore', 'common', 'buttons', 'En savoir plus', 'Learn More', 'Bouton en savoir plus'),
('common.readMore', 'common', 'buttons', 'Lire la suite', 'Read More', 'Bouton lire la suite'),
('common.discover', 'common', 'buttons', 'Découvrir', 'Discover', 'Bouton découvrir'),
('common.enroll', 'common', 'buttons', 'S''inscrire', 'Enroll Now', 'Bouton inscription'),
('common.contact', 'common', 'buttons', 'Nous contacter', 'Contact Us', 'Bouton contact'),
('common.careers', 'common', 'labels', 'débouchés', 'career paths', 'Label débouchés'),
('common.duration', 'common', 'labels', 'Durée', 'Duration', 'Label durée'),
('common.level', 'common', 'labels', 'Niveau requis', 'Required Level', 'Label niveau'),
('common.skills', 'common', 'labels', 'Compétences', 'Skills', 'Label compétences'),
('common.location', 'common', 'labels', 'Localisation', 'Location', 'Label localisation'),
('common.phone', 'common', 'labels', 'Téléphone', 'Phone', 'Label téléphone'),
('common.email', 'common', 'labels', 'Email', 'Email', 'Label email'),
('common.whatsapp', 'common', 'labels', 'WhatsApp', 'WhatsApp', 'Label WhatsApp')
ON CONFLICT (key) DO NOTHING;

-- ==================== HOME PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('home.hero.title', 'home', 'hero', 'Bienvenue à l''Institut Supérieur de l''Espoir', 'Welcome to Higher Institute of Hope', 'Titre hero accueil'),
('home.hero.subtitle', 'home', 'hero', 'Excellence en Formation Paramédicale et Santé', 'Excellence in Paramedical and Health Training', 'Sous-titre hero'),
('home.hero.cta', 'home', 'hero', 'Découvrez nos formations', 'Discover our programs', 'Bouton CTA hero'),
('home.formations.title', 'home', 'formations', 'Nos Formations', 'Our Programs', 'Titre section formations'),
('home.formations.subtitle', 'home', 'formations', 'Découvrez nos formations de qualité', 'Discover our quality programs', 'Sous-titre formations'),
('home.values.title', 'home', 'values', 'Nos Valeurs', 'Our Values', 'Titre section valeurs'),
('home.stats.title', 'home', 'stats', 'En Chiffres', 'By Numbers', 'Titre section statistiques'),
('home.cta.title', 'home', 'cta', 'Prêt à commencer votre formation ?', 'Ready to start your training?', 'Titre CTA final'),
('home.cta.subtitle', 'home', 'cta', 'Rejoignez-nous dès aujourd''hui', 'Join us today', 'Sous-titre CTA'),
('home.cta.button', 'home', 'cta', 'S''inscrire maintenant', 'Enroll Now', 'Bouton CTA')
ON CONFLICT (key) DO NOTHING;

-- ==================== FORMATIONS PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('formations.hero.title', 'formations', 'hero', 'Nos Formations', 'Our Programs', 'Titre page formations'),
('formations.hero.subtitle', 'formations', 'hero', 'Des formations professionnelles de qualité', 'Quality professional training programs', 'Sous-titre formations'),
('formations.filter.all', 'formations', 'filter', 'Toutes les formations', 'All Programs', 'Filtre toutes'),
('formations.filter.title', 'formations', 'filter', 'Filtrer par centre', 'Filter by center', 'Titre filtre'),
('formations.empty.title', 'formations', 'empty', 'Aucune formation disponible', 'No programs available', 'Message liste vide'),
('formations.empty.subtitle', 'formations', 'empty', 'Revenez bientôt pour découvrir nos nouvelles formations', 'Check back soon for new programs', 'Sous-titre liste vide')
ON CONFLICT (key) DO NOTHING;

-- ==================== FORMATION DETAIL ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('formationDetail.overview.title', 'formationDetail', 'overview', 'Vue d''ensemble', 'Overview', 'Titre vue d''ensemble'),
('formationDetail.skills.title', 'formationDetail', 'skills', 'Compétences acquises', 'Skills Acquired', 'Titre compétences'),
('formationDetail.careers.title', 'formationDetail', 'careers', 'Débouchés professionnels', 'Career Opportunities', 'Titre débouchés'),
('formationDetail.info.title', 'formationDetail', 'info', 'Informations pratiques', 'Practical Information', 'Titre infos pratiques'),
('formationDetail.related.title', 'formationDetail', 'related', 'Autres formations', 'Other Programs', 'Titre formations similaires'),
('formationDetail.enroll.title', 'formationDetail', 'enroll', 'Intéressé par cette formation ?', 'Interested in this program?', 'Titre CTA inscription'),
('formationDetail.enroll.button', 'formationDetail', 'enroll', 'S''inscrire maintenant', 'Enroll Now', 'Bouton inscription')
ON CONFLICT (key) DO NOTHING;

-- ==================== ABOUT PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('about.hero.title', 'about', 'hero', 'À Propos de Nous', 'About Us', 'Titre page à propos'),
('about.mission.title', 'about', 'mission', 'Notre Mission', 'Our Mission', 'Titre mission'),
('about.vision.title', 'about', 'vision', 'Notre Vision', 'Our Vision', 'Titre vision'),
('about.values.title', 'about', 'values', 'Nos Valeurs', 'Our Values', 'Titre valeurs'),
('about.pedagogy.title', 'about', 'pedagogy', 'Notre Pédagogie', 'Our Pedagogy', 'Titre pédagogie'),
('about.pedagogy.theoretical', 'about', 'pedagogy', 'Formation Théorique', 'Theoretical Training', 'Sous-titre théorique'),
('about.pedagogy.practical', 'about', 'pedagogy', 'Formation Pratique', 'Practical Training', 'Sous-titre pratique'),
('about.pedagogy.evaluation', 'about', 'pedagogy', 'Évaluation', 'Evaluation', 'Sous-titre évaluation'),
('about.partners.title', 'about', 'partners', 'Nos Partenaires', 'Our Partners', 'Titre partenaires')
ON CONFLICT (key) DO NOTHING;

-- ==================== NEWS PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('news.hero.title', 'news', 'hero', 'Actualités', 'News', 'Titre page actualités'),
('news.hero.subtitle', 'news', 'hero', 'Restez informé de nos dernières nouvelles', 'Stay updated with our latest news', 'Sous-titre actualités'),
('news.filter.all', 'news', 'filter', 'Toutes', 'All', 'Filtre toutes'),
('news.filter.event', 'news', 'filter', 'Événements', 'Events', 'Filtre événements'),
('news.filter.announcement', 'news', 'filter', 'Annonces', 'Announcements', 'Filtre annonces'),
('news.filter.success', 'news', 'filter', 'Succès', 'Success Stories', 'Filtre succès'),
('news.empty.title', 'news', 'empty', 'Aucune actualité', 'No news', 'Message liste vide'),
('news.publishedOn', 'news', 'detail', 'Publié le', 'Published on', 'Label date publication')
ON CONFLICT (key) DO NOTHING;

-- ==================== CONTACT PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('contact.hero.title', 'contact', 'hero', 'Contactez-nous', 'Contact Us', 'Titre page contact'),
('contact.hero.subtitle', 'contact', 'hero', 'Nous sommes à votre écoute', 'We are here to help', 'Sous-titre contact'),
('contact.form.title', 'contact', 'form', 'Envoyez-nous un message', 'Send us a message', 'Titre formulaire'),
('contact.form.name', 'contact', 'form', 'Nom complet', 'Full Name', 'Label nom'),
('contact.form.email', 'contact', 'form', 'Email', 'Email', 'Label email'),
('contact.form.phone', 'contact', 'form', 'Téléphone', 'Phone', 'Label téléphone'),
('contact.form.subject', 'contact', 'form', 'Sujet', 'Subject', 'Label sujet'),
('contact.form.message', 'contact', 'form', 'Message', 'Message', 'Label message'),
('contact.form.submit', 'contact', 'form', 'Envoyer', 'Send', 'Bouton envoyer'),
('contact.info.title', 'contact', 'info', 'Informations de contact', 'Contact Information', 'Titre infos contact'),
('contact.success', 'contact', 'messages', 'Votre message a été envoyé avec succès !', 'Your message has been sent successfully!', 'Message succès'),
('contact.error', 'contact', 'messages', 'Une erreur est survenue', 'An error occurred', 'Message erreur')
ON CONFLICT (key) DO NOTHING;

-- ==================== INSCRIPTION PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('inscription.hero.title', 'inscription', 'hero', 'Inscription', 'Enrollment', 'Titre page inscription'),
('inscription.hero.subtitle', 'inscription', 'hero', 'Rejoignez-nous et commencez votre formation', 'Join us and start your training', 'Sous-titre inscription'),
('inscription.form.title', 'inscription', 'form', 'Formulaire d''inscription', 'Enrollment Form', 'Titre formulaire'),
('inscription.form.firstName', 'inscription', 'form', 'Prénom', 'First Name', 'Label prénom'),
('inscription.form.lastName', 'inscription', 'form', 'Nom', 'Last Name', 'Label nom'),
('inscription.form.email', 'inscription', 'form', 'Email', 'Email', 'Label email'),
('inscription.form.phone', 'inscription', 'form', 'Téléphone', 'Phone', 'Label téléphone'),
('inscription.form.formation', 'inscription', 'form', 'Formation souhaitée', 'Desired Program', 'Label formation'),
('inscription.form.message', 'inscription', 'form', 'Message (optionnel)', 'Message (optional)', 'Label message'),
('inscription.form.submit', 'inscription', 'form', 'S''inscrire', 'Enroll', 'Bouton inscription'),
('inscription.success', 'inscription', 'messages', 'Votre demande a été envoyée !', 'Your request has been sent!', 'Message succès'),
('inscription.error', 'inscription', 'messages', 'Une erreur est survenue', 'An error occurred', 'Message erreur')
ON CONFLICT (key) DO NOTHING;

-- ==================== CENTERS PAGE ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('centers.hero.title', 'centers', 'hero', 'Nos Centres de Formation', 'Our Training Centers', 'Titre page centres'),
('centers.hero.subtitle', 'centers', 'hero', 'Découvrez nos deux centres d''excellence', 'Discover our two centers of excellence', 'Sous-titre centres'),
('centers.whyChoose.title', 'centers', 'whyChoose', 'Pourquoi nous choisir ?', 'Why choose us?', 'Titre pourquoi nous choisir'),
('centers.whyChoose.excellence.title', 'centers', 'whyChoose', 'Excellence Académique', 'Academic Excellence', 'Titre excellence'),
('centers.whyChoose.excellence.desc', 'centers', 'whyChoose', 'Des formations de qualité reconnues par les professionnels', 'Quality training recognized by professionals', 'Description excellence'),
('centers.whyChoose.practice.title', 'centers', 'whyChoose', 'Formation Pratique', 'Practical Training', 'Titre pratique'),
('centers.whyChoose.practice.desc', 'centers', 'whyChoose', 'Une approche axée sur la pratique et l''expérience terrain', 'Practice-focused approach', 'Description pratique'),
('centers.whyChoose.opportunities.title', 'centers', 'whyChoose', 'Débouchés Garantis', 'Guaranteed Opportunities', 'Titre débouchés'),
('centers.whyChoose.opportunities.desc', 'centers', 'whyChoose', 'Un réseau de partenaires pour faciliter votre insertion', 'Partner network for professional integration', 'Description débouchés')
ON CONFLICT (key) DO NOTHING;

-- ==================== FOOTER ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('footer.about.title', 'footer', 'about', 'À Propos', 'About', 'Titre section à propos'),
('footer.quickLinks.title', 'footer', 'quickLinks', 'Liens Rapides', 'Quick Links', 'Titre liens rapides'),
('footer.contact.title', 'footer', 'contact', 'Contact', 'Contact', 'Titre contact'),
('footer.followUs', 'footer', 'social', 'Suivez-nous', 'Follow Us', 'Titre réseaux sociaux'),
('footer.copyright', 'footer', 'legal', '© 2025 Tous droits réservés', '© 2025 All rights reserved', 'Copyright'),
('footer.madeWith', 'footer', 'legal', 'Fait avec', 'Made with', 'Fait avec')
ON CONFLICT (key) DO NOTHING;

-- ==================== ADMIN ====================
INSERT INTO site_content (key, category, section, content_fr, content_en, description) VALUES
('admin.dashboard', 'admin', 'nav', 'Tableau de bord', 'Dashboard', 'Menu tableau de bord'),
('admin.logout', 'admin', 'nav', 'Déconnexion', 'Logout', 'Bouton déconnexion'),
('admin.save', 'admin', 'actions', 'Enregistrer', 'Save', 'Bouton enregistrer'),
('admin.cancel', 'admin', 'actions', 'Annuler', 'Cancel', 'Bouton annuler'),
('admin.delete', 'admin', 'actions', 'Supprimer', 'Delete', 'Bouton supprimer'),
('admin.edit', 'admin', 'actions', 'Modifier', 'Edit', 'Bouton modifier'),
('admin.add', 'admin', 'actions', 'Ajouter', 'Add', 'Bouton ajouter'),
('admin.search', 'admin', 'actions', 'Rechercher', 'Search', 'Rechercher'),
('admin.filter', 'admin', 'actions', 'Filtrer', 'Filter', 'Filtrer')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- FIN DU SCHEMA SITE CONTENT
-- =====================================================
