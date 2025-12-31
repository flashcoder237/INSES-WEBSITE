-- Ajouter les colonnes GPS et horaires à la table site_info

-- Ajouter les coordonnées GPS
ALTER TABLE site_info
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS google_maps_url TEXT;

-- Ajouter les horaires d'ouverture
ALTER TABLE site_info
ADD COLUMN IF NOT EXISTS hours_monday_friday VARCHAR(100),
ADD COLUMN IF NOT EXISTS hours_saturday VARCHAR(100),
ADD COLUMN IF NOT EXISTS hours_sunday VARCHAR(100);

-- Mettre à jour avec les valeurs actuelles du site
UPDATE site_info
SET
  latitude = 4.0949692061716885,
  longitude = 9.664649340589332,
  google_maps_url = 'https://www.google.com/maps?q=4.0949692061716885,9.664649340589332',
  hours_monday_friday = 'Lundi - Vendredi: 8h00 - 17h00',
  hours_saturday = 'Samedi: 8h00 - 13h00',
  hours_sunday = 'Dimanche: Fermé'
WHERE id = (SELECT id FROM site_info LIMIT 1);

-- Commentaires pour documentation
COMMENT ON COLUMN site_info.latitude IS 'Latitude GPS de l''institut';
COMMENT ON COLUMN site_info.longitude IS 'Longitude GPS de l''institut';
COMMENT ON COLUMN site_info.google_maps_url IS 'URL de base Google Maps (sans paramètre de langue)';
COMMENT ON COLUMN site_info.hours_monday_friday IS 'Horaires du lundi au vendredi';
COMMENT ON COLUMN site_info.hours_saturday IS 'Horaires du samedi';
COMMENT ON COLUMN site_info.hours_sunday IS 'Horaires du dimanche';
