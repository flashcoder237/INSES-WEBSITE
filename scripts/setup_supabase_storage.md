# Configuration du Stockage Supabase pour INSES

## Erreur: "Bucket not found"

Cette erreur se produit car le bucket de stockage Supabase n'a pas encore été créé.

## Solution: Créer le Bucket "public"

### Option 1: Via l'interface Supabase (Recommandé)

1. **Aller sur Supabase Dashboard**
   - Ouvrir votre projet INSES
   - Aller dans "Storage" dans le menu latéral

2. **Créer un nouveau bucket**
   - Cliquer sur "New bucket"
   - Nom du bucket: `public`
   - Cocher "Public bucket" ✓
   - Cliquer sur "Create bucket"

3. **Configurer les politiques RLS**
   - Cliquer sur le bucket "public"
   - Aller dans l'onglet "Policies"
   - Ajouter les politiques suivantes:

#### Politique 1: Lecture publique
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public');
```

#### Politique 2: Upload pour utilisateurs authentifiés
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');
```

#### Politique 3: Mise à jour pour utilisateurs authentifiés
```sql
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');
```

#### Politique 4: Suppression pour utilisateurs authentifiés
```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');
```

### Option 2: Via SQL

Exécuter ce script dans le SQL Editor de Supabase:

```sql
-- Créer le bucket public
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de lecture publique
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public');

-- Politique d'upload pour authentifiés
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');

-- Politique de mise à jour pour authentifiés
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');

-- Politique de suppression pour authentifiés
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');
```

## Organisation des fichiers

Le bucket sera organisé ainsi:

```
public/
├── site-images/          # Images système (hero, logo, og-image)
│   ├── hero-home-*.jpg
│   ├── hero-formations-*.jpg
│   ├── hero-about-*.jpg
│   ├── hero-contact-*.jpg
│   ├── logo-*.png
│   └── og-image-*.jpg
├── formations/           # Images des formations
├── news/                 # Images des actualités
├── gallery/              # Galerie photos
└── videos/               # Miniatures vidéos
```

## Vérification

Après avoir créé le bucket:

1. Aller sur `/admin/images`
2. Cliquer sur une image (ex: "logo")
3. Cliquer sur "Upload Nouvelle Image"
4. Sélectionner un fichier
5. L'upload devrait fonctionner ✓

## Recommandations

### Formats d'images recommandés:
- **Hero images**: JPG ou WebP (1920x1080px, max 150 KB)
- **Logo**: PNG avec fond transparent (512x512px, max 50 KB)
- **OG Image**: JPG ou PNG (1200x630px, max 100 KB)

### Optimisation avant upload:
- Utiliser TinyPNG ou Squoosh.app pour compression
- Convertir en WebP pour meilleure performance
- Vérifier les dimensions avec IMAGE_RECOMMENDATIONS

## Dépannage

### Erreur "Bucket not found"
- Vérifier que le bucket "public" existe dans Storage
- Vérifier que le nom est exactement "public" (minuscules)

### Erreur "new row violates row-level security policy"
- Vérifier que vous êtes authentifié
- Vérifier que les politiques RLS sont créées
- Vérifier que l'utilisateur a le rôle "authenticated"

### Upload lent ou timeout
- Vérifier la taille du fichier (< 5 MB recommandé)
- Compresser l'image avant upload
- Vérifier la connexion internet
