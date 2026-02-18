-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can delete contacts" ON public.contacts;

-- Add RLS policy to allow anonymous users to insert contact messages
CREATE POLICY "Anyone can insert contact messages"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Add policy for authenticated users to view contacts
CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Add policy for authenticated users to update contacts
CREATE POLICY "Authenticated users can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true);

-- Add policy for authenticated users to delete contacts
CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);
