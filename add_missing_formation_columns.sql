-- Ajouter les colonnes manquantes à la table formations existante

-- Vérifier que la table existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'formations') THEN
        RAISE EXCEPTION 'La table formations n''existe pas. Veuillez d''abord la créer.';
    END IF;
END $$;

-- Ajouter les colonnes manquantes une par une
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS level_required TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS diploma_type TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Ajouter la contrainte unique sur slug si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'formations_slug_key'
    ) THEN
        ALTER TABLE public.formations ADD CONSTRAINT formations_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_formations_category ON public.formations(category);
CREATE INDEX IF NOT EXISTS idx_formations_level_required ON public.formations(level_required);
CREATE INDEX IF NOT EXISTS idx_formations_is_active ON public.formations(is_active);
CREATE INDEX IF NOT EXISTS idx_formations_display_order ON public.formations(display_order);
CREATE INDEX IF NOT EXISTS idx_formations_slug ON public.formations(slug);

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Colonnes ajoutées avec succès à la table formations!';
END $$;
