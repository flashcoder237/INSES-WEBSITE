# Guide de Configuration Supabase Storage pour INSES

Ce guide explique comment configurer et utiliser Supabase Storage pour les images du site INSES.

## 1. Créer le Bucket dans Supabase

### Étapes dans Supabase Dashboard:

1. Connectez-vous à https://supabase.com/dashboard
2. Sélectionnez votre projet INSES
3. Allez dans **Storage** (menu de gauche)
4. Créez le bucket principal:

#### Bucket `inses-images` (REQUIS)
- Cliquez sur **New bucket**
- Nom: `inses-images`
- **Public**: ✅ Oui (cochez la case "Public bucket")
- Cliquez sur **Create bucket**

## 2. Structure des Dossiers Recommandée

Une fois le bucket créé, créez les sous-dossiers suivants:

```
inses-images/
├── gallery/
│   ├── campus-building.jpg
│   ├── library.jpg
│   ├── students-class.jpg
│   └── ...
│
├── formations/
│   ├── infirmier.jpg
│   ├── sage-femme.jpg
│   ├── kinesitherapie.jpg
│   ├── assistant-medical.jpg
│   ├── aide-soignant.jpg
│   └── technicien-laboratoire.jpg
│
├── news/
│   ├── 2024/
│   │   ├── graduation-ceremony.jpg
│   │   ├── exam-success.jpg
│   │   ├── new-equipment.jpg
│   │   ├── partnership-announcement.jpg
│   │   └── student-competition.jpg
│   └── 2025/
│       ├── open-day.jpg
│       ├── new-training.jpg
│       └── registration-open.jpg
│
└── icons/
    ├── stethoscope.svg
    ├── heart.svg
    ├── activity.svg
    ├── clipboard.svg
    ├── users.svg
    └── flask.svg
```

## 3. Upload des Images

### Option 1: Via l'Interface Admin (Recommandé)

L'interface d'administration INSES intègre un système d'upload automatique:

1. **Accédez à l'admin**: `/admin/gallery` (ou `/admin/news`, etc.)
2. **Cliquez sur "Ajouter une image"**
3. **Sélectionnez votre fichier** - L'upload vers Supabase se fait automatiquement
4. **L'URL est générée automatiquement** et stockée dans la base de données

✅ **Avantages**:
- Upload automatique vers `inses-images`
- Génération automatique des URLs
- Prévisualisation en temps réel
- Gestion des erreurs intégrée

### Option 2: Via l'Interface Supabase (Pour uploads en masse)

1. Dans **Storage**, cliquez sur le bucket `inses-images`
2. Naviguez dans le bon dossier (ex: `formations`)
3. Cliquez sur **Upload file**
4. Sélectionnez vos images
5. Une fois uploadées, cliquez sur l'image pour voir ses détails
6. Copiez l'URL publique

## 4. Format des URLs

Toutes les URLs suivent ce format:

```
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/[DOSSIER]/[FICHIER]
```

### Exemples:

**Galerie:**
```
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/campus-building.jpg
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/students-class.jpg
```

**Formations:**
```
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/infirmier.jpg
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/sage-femme.jpg
```

**Actualités:**
```
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/graduation-ceremony.jpg
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2025/open-day.jpg
```

**Icônes:**
```
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/stethoscope.svg
https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/heart.svg
```

## 5. Utilisation dans la Base de Données

### Pour les Formations:

```sql
INSERT INTO formations (
  slug, title_fr, title_en,
  icon, image,
  duration, level, display_order
) VALUES (
  'infirmier-diplome-etat',
  'Infirmier Diplômé d''État (IDE)',
  'State Registered Nurse',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/icons/stethoscope.svg',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/formations/infirmier.jpg',
  '3 ans',
  'Bac + 3',
  1
);
```

### Pour les Actualités:

```sql
INSERT INTO news (
  slug, category,
  title_fr, title_en,
  image,
  published_date, is_published
) VALUES (
  'ceremonie-remise-diplomes-2024',
  'event',
  'Cérémonie de Remise des Diplômes 2024',
  'Graduation Ceremony 2024',
  'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/news/2024/graduation-ceremony.jpg',
  '2024-07-15',
  true
);
```

### Pour la Galerie:

```sql
INSERT INTO gallery (title, url, category, display_order) VALUES
  ('Bâtiment principal INSES',
   'https://rpfwhgsltqpumqikkzxe.supabase.co/storage/v1/object/public/inses-images/gallery/campus-building.jpg',
   'campus',
   1);
```

## 6. Scripts SQL Fournis

Utilisez les scripts SQL dans le dossier `supabase/`:

- **`insert-gallery-data.sql`** - Insère 12 images de galerie
- **`insert-formations.sql`** - Insère 6 formations avec images et icônes
- **`insert-news.sql`** - Insère 8 actualités avec images

Ces scripts utilisent tous le bucket `inses-images` avec la structure de dossiers appropriée.

## 7. Configuration Next.js

✅ **Déjà configuré!** Le fichier `next.config.ts` autorise déjà tous les chemins Supabase Storage:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'rpfwhgsltqpumqikkzxe.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

Cette configuration couvre automatiquement tous les dossiers dans `inses-images/`.

## 8. Bonnes Pratiques

### Nommage des Fichiers:
- ✅ Utilisez des noms descriptifs en minuscules
- ✅ Utilisez des tirets (-) au lieu d'espaces
- ✅ Exemple: `formation-infirmier-2024.jpg` plutôt que `Formation Infirmier 2024.jpg`

### Optimisation des Images:
- Redimensionnez vos images avant upload
- Formats recommandés:
  - **Photos**: JPEG (qualité 80-85%)
  - **Icônes/logos**: SVG ou PNG transparent
  - **Illustrations**: PNG ou WebP
- Tailles recommandées:
  - **Formations**: 1200x800px
  - **Actualités**: 1920x1080px ou 1200x800px
  - **Galerie**: 1200x800px
  - **Icônes**: 64x64px ou SVG

### Organisation:
- Créez des sous-dossiers par année pour les actualités (ex: `news/2024/`, `news/2025/`)
- Groupez les images par catégorie dans les dossiers appropriés
- Gardez une nomenclature cohérente

## 9. Composant ImageUpload

Le composant `ImageUpload` dans `components/admin/ImageUpload.tsx` gère automatiquement:

✅ Upload vers Supabase Storage (bucket `inses-images`)
✅ Génération automatique d'URLs publiques
✅ Validation de taille (max 5MB par défaut)
✅ Prévisualisation en temps réel
✅ Suppression d'images
✅ Remplacement d'images

### Utilisation dans vos pages admin:

```tsx
import ImageUpload from '@/components/admin/ImageUpload'

<ImageUpload
  value={formData.image}
  onChange={(url) => setFormData({ ...formData, image: url })}
  folder="formations"  // ou "gallery", "news", "icons"
  previewWidth={600}
  previewHeight={400}
/>
```

Le paramètre `folder` crée automatiquement le bon chemin:
- `folder="formations"` → `inses-images/formations/[filename]`
- `folder="news"` → `inses-images/news/[filename]`
- `folder="gallery"` → `inses-images/gallery/[filename]`

## 10. Politiques de Sécurité (RLS)

Le bucket `inses-images` étant public:
- ✅ **Lecture**: Accessible par tous (nécessaire pour afficher les images sur le site)
- ⚠️ **Écriture**: Seuls les utilisateurs authentifiés peuvent uploader/supprimer des fichiers

Ceci est géré automatiquement par Supabase Storage.

## 11. Checklist de Mise en Place

- [ ] **1. Créer le bucket `inses-images`** dans Supabase Storage (public)
- [ ] **2. Créer les dossiers**: `gallery/`, `formations/`, `news/`, `icons/`
- [ ] **3. Créer les sous-dossiers pour news**: `news/2024/`, `news/2025/`
- [ ] **4. Uploader vos images** via l'admin ou directement dans Supabase
- [ ] **5. Exécuter les scripts SQL** pour insérer les données avec les URLs
- [ ] **6. Vérifier l'affichage** sur le site (galerie, formations, actualités)

## 12. Dépannage

### Les images ne s'affichent pas:
1. Vérifiez que le bucket `inses-images` est bien **public**
2. Vérifiez que les URLs dans la base de données sont correctes
3. Vérifiez que `next.config.ts` contient la configuration des images
4. Redémarrez le serveur Next.js après modification de `next.config.ts`

### Erreur d'upload:
1. Vérifiez que vous êtes bien authentifié dans l'admin
2. Vérifiez que le fichier ne dépasse pas 5MB
3. Vérifiez que le format est supporté (JPG, PNG, WebP, GIF, SVG)

---

**Note**: Le domaine `rpfwhgsltqpumqikkzxe.supabase.co` est spécifique à votre projet. Si vous changez de projet Supabase, vous devrez mettre à jour ce domaine dans `next.config.ts` et régénérer les URLs.
