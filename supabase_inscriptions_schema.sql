-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_updated_at ON public.inscriptions;

-- Create inscriptions table with all required columns
CREATE TABLE IF NOT EXISTS public.inscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT,
  date_of_birth DATE NOT NULL,
  place_of_birth TEXT,
  nationality TEXT,

  -- Contact Information
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  country TEXT DEFAULT 'Cameroun',

  -- Family Information
  father_name TEXT,
  father_profession TEXT,
  father_phone TEXT,
  mother_name TEXT,
  mother_profession TEXT,
  mother_phone TEXT,

  -- Emergency Contact
  emergency_contact_name TEXT,
  emergency_contact_relationship TEXT,
  emergency_contact_phone TEXT,

  -- Formation Information
  desired_formation TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  last_school_attended TEXT,
  last_diploma_obtained TEXT,
  diploma_year TEXT,
  preferred_start_date TEXT,

  -- Motivation
  motivation_message TEXT,
  career_goals TEXT,
  why_this_formation TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'contacted')),
  source TEXT DEFAULT 'website'
);

-- Add missing columns if they don't exist
DO $$
BEGIN
  -- Add address column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'inscriptions'
    AND column_name = 'address'
  ) THEN
    ALTER TABLE public.inscriptions ADD COLUMN address TEXT NOT NULL DEFAULT '';
    ALTER TABLE public.inscriptions ALTER COLUMN address DROP DEFAULT;
  END IF;

  -- Add other potentially missing columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'inscriptions'
    AND column_name = 'city'
  ) THEN
    ALTER TABLE public.inscriptions ADD COLUMN city TEXT NOT NULL DEFAULT '';
    ALTER TABLE public.inscriptions ALTER COLUMN city DROP DEFAULT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'inscriptions'
    AND column_name = 'country'
  ) THEN
    ALTER TABLE public.inscriptions ADD COLUMN country TEXT DEFAULT 'Cameroun';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'inscriptions'
    AND column_name = 'postal_code'
  ) THEN
    ALTER TABLE public.inscriptions ADD COLUMN postal_code TEXT;
  END IF;
END $$;

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.inscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow authenticated updates" ON public.inscriptions;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow public inserts" ON public.inscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all inscriptions
CREATE POLICY "Allow authenticated reads" ON public.inscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update inscriptions
CREATE POLICY "Allow authenticated updates" ON public.inscriptions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_inscriptions_status ON public.inscriptions(status);
CREATE INDEX IF NOT EXISTS idx_inscriptions_email ON public.inscriptions(email);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON public.inscriptions(created_at DESC);

-- Add comment to table
COMMENT ON TABLE public.inscriptions IS 'Stores student registration applications from the INSES website';
