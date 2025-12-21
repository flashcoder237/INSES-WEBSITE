-- Vérifier la structure actuelle de la table formations
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'formations'
ORDER BY ordinal_position;
