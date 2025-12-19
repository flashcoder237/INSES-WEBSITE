# 📸 Configuration Supabase Storage pour les Images

Ce guide explique comment configurer Supabase Storage pour permettre l'upload d'images.

## 1️⃣ Créer le Bucket Storage

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet INSES
3. Dans le menu de gauche, cliquez sur **Storage**
4. Cliquez sur **Create a new bucket**
5. Configurez le bucket :
   - **Name** : `inses-images`
   - **Public bucket** : ✅ Coché (pour que les images soient accessibles publiquement)
   - **File size limit** : `5 MB` (ou selon vos besoins)
   - **Allowed MIME types** : `image/jpeg, image/png, image/webp, image/gif`
6. Cliquez sur **Create bucket**

## 2️⃣ Configurer les Politiques RLS (Row Level Security)

Le bucket public permet déjà la lecture, mais il faut configurer les droits d'upload.

### Option A : Via l'interface Supabase (Recommandé)

1. Dans **Storage** → **Policies** pour le bucket `inses-images`
2. Cliquez sur **New Policy**
3. Choisissez **For full customization**
4. Créez les politiques suivantes :

**Politique 1 : Lecture publique**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'inses-images');
```

**Politique 2 : Upload pour utilisateurs authentifiés**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);
```

**Politique 3 : Suppression pour utilisateurs authentifiés**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);
```

**Politique 4 : Mise à jour pour utilisateurs authentifiés**
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);
```

### Option B : Via SQL Editor

Copiez et exécutez ce script dans **SQL Editor** :

```sql
-- Politiques pour le bucket inses-images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'inses-images');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'inses-images'
  AND auth.role() = 'authenticated'
);
```

## 3️⃣ Structure des Dossiers

Le bucket utilisera cette organisation :

```
inses-images/
├── gallery/          # Images de la galerie
│   ├── events/       # Photos d'événements
│   ├── campus/       # Photos du campus
│   └── students/     # Photos des étudiants
├── news/            # Images des actualités
├── formations/      # Images des formations
└── site/           # Images du site (logo, etc.)
```

## 4️⃣ Obtenir l'URL d'une Image

Une fois uploadée, l'URL publique d'une image sera :

```
https://[VOTRE-PROJET].supabase.co/storage/v1/object/public/inses-images/[CHEMIN]/[FICHIER]
```

Exemple :
```
https://abcdefg.supabase.co/storage/v1/object/public/inses-images/news/article-1.jpg
```

## 5️⃣ Vérification

Pour vérifier que tout fonctionne :

1. Allez dans **Storage** → `inses-images`
2. Cliquez sur **Upload file**
3. Uploadez une image de test
4. Cliquez sur l'image → **Get public URL**
5. Ouvrez l'URL dans un nouvel onglet
6. ✅ L'image devrait s'afficher

## 6️⃣ Utilisation dans l'Application

Le composant `ImageUpload` gérera automatiquement :
- ✅ Sélection de fichier
- ✅ Validation (type, taille)
- ✅ Upload vers Supabase Storage
- ✅ Génération de l'URL publique
- ✅ Prévisualisation
- ✅ Suppression

## 📌 Notes Importantes

- **Format recommandé** : WebP pour une meilleure compression
- **Taille maximale** : 5 MB par défaut (modifiable)
- **Optimisation** : Les images ne sont pas automatiquement optimisées. Utilisez des outils comme TinyPNG avant l'upload pour de meilleures performances.
- **Nommage** : Les fichiers sont renommés avec un UUID pour éviter les conflits

## 🔒 Sécurité

- ✅ Seuls les utilisateurs authentifiés peuvent upload/modifier/supprimer
- ✅ Tout le monde peut lire (bucket public)
- ✅ Validation côté client ET serveur
- ✅ Types MIME restreints aux images

## ⚠️ Limites Supabase

**Plan gratuit** :
- 1 GB de stockage
- 2 GB de bande passante par mois

**Plan Pro** :
- 100 GB de stockage
- 200 GB de bande passante
- Puis facturation à l'usage

Surveillez votre utilisation dans **Settings** → **Usage**.
