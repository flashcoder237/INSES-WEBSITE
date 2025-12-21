-- Script simple pour ajouter toutes les colonnes manquantes
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Colonnes d'informations personnelles
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS place_of_birth TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS nationality TEXT;

-- Colonnes de contact
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Cameroun';

-- Colonnes d'informations familiales
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS father_name TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS father_profession TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS father_phone TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS mother_name TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS mother_profession TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS mother_phone TEXT;

-- Colonnes de contact d'urgence
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS emergency_contact_relationship TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT;

-- Colonnes de formation
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS desired_formation TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS academic_level TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS last_school_attended TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS last_diploma_obtained TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS diploma_year TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS preferred_start_date TEXT;

-- Colonnes de motivation
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS motivation_message TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS career_goals TEXT;
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS why_this_formation TEXT;

-- Colonnes de statut
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

-- Colonnes de timestamp si elles n'existent pas
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
ALTER TABLE public.inscriptions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
