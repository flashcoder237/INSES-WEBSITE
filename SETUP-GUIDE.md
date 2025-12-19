# 📋 Guide de Configuration INSES

Ce guide explique comment configurer et vérifier que tout fonctionne correctement.

## ✅ Étapes de Configuration

### 1. Configuration de la Base de Données Supabase

#### A. Exécuter le schéma principal
1. Connectez-vous à votre projet Supabase : https://supabase.com/dashboard
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez le contenu de `supabase/schema.sql`
5. Exécutez le script

#### B. Appliquer les corrections
1. Toujours dans **SQL Editor**
2. Créez une nouvelle requête
3. Copiez le contenu de `supabase/fix-schema.sql`
4. Exécutez le script

⚠️ **Important** : `fix-schema.sql` corrige les incompatibilités entre le schéma et l'administration.

### 2. Migrer les Données

Si vous avez exécuté la migration précédemment, vos données sont déjà dans Supabase.
Sinon, exécutez :

```bash
cd inses-website
npx tsx --env-file=.env.local scripts/migrate-to-supabase.ts
```

### 3. Vérifier les Variables d'Environnement

Fichier : `inses-website/.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service
```

## 🔍 Vérification du Système

### Tables de la Base de Données

Vérifiez que toutes ces tables existent dans Supabase :

✅ **Tables principales** :
- `site_info` - Informations du site
- `formations` - Formations
- `formation_skills` - Compétences par formation
- `formation_careers` - Débouchés par formation
- `about_info` - À propos
- `about_values` - Valeurs de l'institut
- `partners` - Partenaires
- `stats` - Statistiques
- `news` - Actualités

✅ **Tables de communication** :
- `contacts` - Messages de contact (renommée depuis `contact_submissions`)
- `inscriptions` - Demandes d'inscription (renommée depuis `inscription_submissions`)
- `gallery` - Images de la galerie (renommée depuis `gallery_images`)

### Pages d'Administration

Toutes ces pages doivent fonctionner :

#### Navigation :
- `/admin` - Dashboard ✅
- **Contenu**
  - `/admin/formations` - Liste et édition ✅
  - `/admin/formations/new` - Création ✅
  - `/admin/formations/[id]` - Édition ✅
  - `/admin/news` - Liste ✅
  - `/admin/news/new` - Création ✅
  - `/admin/news/[id]` - Édition ✅
  - `/admin/gallery` - Galerie ✅
- **Paramètres**
  - `/admin/about` - À propos ✅
  - `/admin/site-info` - Informations du site ✅
  - `/admin/stats` - Statistiques ✅
  - `/admin/partners` - Partenaires ✅
- **Messages**
  - `/admin/contacts` - Messages de contact ✅
  - `/admin/inscriptions` - Demandes d'inscription ✅

### Pages Publiques du Site

Ces pages utilisent maintenant Supabase :

- `/` - Page d'accueil ✅ (utilise useFormations, useStats, useAboutInfo)
- `/formations` - Liste des formations ✅ (utilise useFormations)
- `/formations/[slug]` - Détail formation ✅ (utilise useFormation)
- `/about` - À propos ✅ (utilise useAboutInfo, useStats)
- `/actualites` - Actualités ✅ (utilise useNews)
- `/actualites/[slug]` - Détail actualité ✅ (utilise useNewsItem)
- `/contact` - Formulaire de contact
- `/inscription` - Formulaire d'inscription
- `/gallery` - Galerie

## 🎨 Styles et Couleurs

Toute l'administration utilise la palette institutionnelle :

- **Rouge principal** : `#B22234`
- **Rouge foncé** : `#800020`
- **Rouge clair** : `#CD5C5C`
- **Gris ardoise** : `#4A4A4A`

## 🔧 Hooks Personnalisés

Tous les hooks Supabase sont dans `/hooks` :

- `useFormations()` - Récupère toutes les formations
- `useFormation(slug)` - Récupère une formation par slug
- `useSiteInfo()` - Informations du site
- `useStats()` - Statistiques
- `useAboutInfo()` - Informations À propos
- `useNews()` - Actualités
- `useNewsItem(slug)` - Une actualité par slug

## ⚠️ Points Importants

### Champs modifiés dans le schéma :

1. **Table `inscriptions`** :
   - ❌ `is_processed` (supprimé)
   - ✅ `status` (ajouté) - Valeurs: 'pending', 'approved', 'rejected'

2. **Table `gallery`** :
   - ❌ `image_url` → ✅ `url` (renommé)
   - ❌ `title_en`, `description_fr`, `description_en` (supprimés)
   - ✅ `title` (simplifié)
   - ✅ `category` (ajouté)

3. **Noms de tables** :
   - `contact_submissions` → `contacts`
   - `inscription_submissions` → `inscriptions`
   - `gallery_images` → `gallery`

## 🚀 Démarrage

```bash
cd inses-website
npm run dev
```

Le site sera disponible sur `http://localhost:3000`

### Accès Administration

1. Allez sur `/login`
2. Connectez-vous avec vos identifiants Supabase Auth
3. Vous serez redirigé vers `/admin`

## 🐛 Dépannage

### Erreur : "Table does not exist"
- Vérifiez que vous avez exécuté `schema.sql` ET `fix-schema.sql`

### Erreur : "Column does not exist"
- Exécutez `fix-schema.sql` pour corriger les noms de colonnes

### Le site affiche des données vides
- Vérifiez que la migration a été exécutée
- Vérifiez les variables d'environnement
- Vérifiez les RLS policies dans Supabase

### L'admin ne se charge pas
- Vérifiez que vous êtes authentifié
- Vérifiez la SUPABASE_SERVICE_ROLE_KEY

## 📝 Prochaines Étapes

1. ✅ Créer un utilisateur admin dans Supabase Auth
2. ✅ Tester toutes les pages d'administration
3. ✅ Vérifier que le site public affiche les données
4. 🔲 Configurer Supabase Storage pour les images
5. 🔲 Implémenter l'upload d'images dans la galerie
6. 🔲 Créer les formulaires de contact et inscription publics

## 📞 Support

En cas de problème, vérifiez :
1. Les logs de la console navigateur (F12)
2. Les logs Supabase dans le dashboard
3. Les variables d'environnement dans `.env.local`
