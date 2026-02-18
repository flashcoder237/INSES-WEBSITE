-- Vérifier si RLS est activé
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'contacts';

-- Voir les politiques existantes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'contacts';

-- S'assurer que RLS est activé
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Supprimer TOUTES les politiques existantes
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'contacts') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.contacts';
    END LOOP;
END $$;

-- Créer la politique pour permettre les insertions anonymes
CREATE POLICY "allow_anon_insert_contacts"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (true);

-- Créer la politique pour permettre les insertions authentifiées
CREATE POLICY "allow_authenticated_insert_contacts"
ON public.contacts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Créer la politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "allow_authenticated_select_contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Créer la politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "allow_authenticated_update_contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true);

-- Créer la politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY "allow_authenticated_delete_contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);

-- Vérifier les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'contacts';
