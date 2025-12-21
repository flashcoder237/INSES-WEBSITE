-- =====================================================
-- SUPPRIMER LES DOUBLONS DANS LA GALERIE
-- =====================================================
-- Ce script supprime les images en double dans la table gallery
-- =====================================================

-- Afficher les doublons avant suppression
SELECT title, url, COUNT(*) as count
FROM gallery
GROUP BY title, url
HAVING COUNT(*) > 1;

-- Supprimer les doublons en gardant l'image la plus récente
DELETE FROM gallery
WHERE id NOT IN (
  SELECT MAX(id)
  FROM gallery
  GROUP BY title, url
);

-- Vérification après suppression
SELECT
    COUNT(*) as total_images,
    COUNT(DISTINCT title) as unique_titles,
    COUNT(DISTINCT url) as unique_urls
FROM gallery;

-- Lister toutes les images restantes
SELECT id, title, category, display_order, created_at
FROM gallery
ORDER BY display_order;
