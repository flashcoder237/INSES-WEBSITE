-- Exécutez cette requête pour voir les colonnes actuelles de votre table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'inscriptions'
ORDER BY ordinal_position;
