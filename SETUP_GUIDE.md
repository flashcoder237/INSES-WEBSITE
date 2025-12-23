# Guide de Configuration - Site INSES avec Supabase

Ce guide vous explique comment configurer et déployer votre site INSES avec un système de gestion de contenu dynamique basé sur Supabase.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Étape 1: Créer un projet Supabase](#étape-1-créer-un-projet-supabase)
3. [Étape 2: Configurer la base de données](#étape-2-configurer-la-base-de-données)
4. [Étape 3: Configurer les variables d'environnement](#étape-3-configurer-les-variables-denvironnement)
5. [Étape 4: Migrer les données](#étape-4-migrer-les-données)
6. [Étape 5: Créer un compte admin](#étape-5-créer-un-compte-admin)
7. [Étape 6: Tester le système](#étape-6-tester-le-système)
8. [Étape 7: Déployer en production](#étape-7-déployer-en-production)

---

## Prérequis

- Node.js 18+ installé
- Un compte gratuit sur [Supabase](https://supabase.com)
- Git installé

---

## Étape 1: Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous ou créez un compte
4. Cliquez sur "New Project"
5. Remplissez les informations:
   - **Name**: `inses-website` (ou un nom de votre choix)
   - **Database Password**: Choisissez un mot de passe fort (notez-le bien !)
   - **Region**: Choisissez la région la plus proche (ex: Europe West)
6. Cliquez sur "Create new project"
7. Attendez 2-3 minutes que le projet soit créé

---

## Étape 2: Configurer la base de données

### 2.1 Accéder à l'éditeur SQL

1. Dans votre projet Supabase, cliquez sur l'icône **SQL Editor** dans le menu de gauche
2. Cliquez sur "New query"

### 2.2 Exécuter le schéma

1. Ouvrez le fichier `supabase/schema.sql` de votre projet
2. Copiez tout le contenu du fichier
3. Collez-le dans l'éditeur SQL de Supabase
4. Cliquez sur "Run" (en bas à droite)
5. Vous devriez voir un message "Success. No rows returned"

✅ Votre base de données est maintenant configurée avec toutes les tables nécessaires !

---

## Étape 3: Configurer les variables d'environnement

### 3.1 Récupérer vos clés API

1. Dans Supabase, cliquez sur l'icône **Settings** (roue dentée) dans le menu de gauche
2. Cliquez sur **API** dans le sous-menu
3. Vous verrez 3 informations importantes:
   - **Project URL** (commence par `https://xxx.supabase.co`)
   - **anon public** (clé publique)
   - **service_role** (clé secrète - cliquez sur "Reveal" pour la voir)

### 3.2 Configurer le fichier .env.local

1. Ouvrez le fichier `.env.local` dans votre éditeur de code
2. Remplacez les valeurs par celles de votre projet:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key-ici
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key-ici
```

⚠️ **Important**: Ne partagez JAMAIS votre `SUPABASE_SERVICE_ROLE_KEY` publiquement !

---

## Étape 4: Migrer les données

### 4.1 Exécuter le script de migration

Dans votre terminal, à la racine du projet `inses-website`, exécutez:

```bash
npx tsx scripts/migrate-to-supabase.ts
```

Vous devriez voir:

```
🚀 Début de la migration des données vers Supabase...
============================================================

📋 Migration des informations du site...
✅ site_info migré avec succès

📚 Migration des formations...
✅ 6 formations migrées
✅ Compétences et carrières migrées

📖 Migration des informations "À propos"...
✅ Informations "À propos" migrées

📊 Migration des statistiques...
✅ 4 statistiques migrées

📰 Migration des actualités...
✅ 6 actualités migrées

============================================================
✅ Migration terminée avec succès!
```

### 4.2 Vérifier les données

1. Dans Supabase, cliquez sur **Table Editor** dans le menu de gauche
2. Vérifiez que les tables contiennent des données:
   - `formations` → 6 lignes
   - `news` → 6 lignes
   - `site_info` → 1 ligne
   - `stats` → 4 lignes
   - etc.

---

## Étape 5: Créer un compte admin

### 5.1 Créer un utilisateur dans Supabase

1. Dans Supabase, cliquez sur **Authentication** dans le menu de gauche
2. Cliquez sur **Users**
3. Cliquez sur "Add user" → "Create new user"
4. Remplissez:
   - **Email**: `admin@univ-inses.com` (ou votre email)
   - **Password**: Choisissez un mot de passe fort
   - **Auto Confirm User**: ✅ Cochez cette case
5. Cliquez sur "Create user"

✅ Votre compte admin est créé !

---

## Étape 6: Tester le système

### 6.1 Démarrer le serveur de développement

```bash
npm run dev
```

### 6.2 Tester le site public

1. Ouvrez votre navigateur sur `http://localhost:3000`
2. Vérifiez que:
   - ✅ Les formations s'affichent
   - ✅ Les actualités s'affichent
   - ✅ Les informations de contact sont correctes
   - ✅ La page "À propos" fonctionne

### 6.3 Tester le panel d'administration

1. Allez sur `http://localhost:3000/login`
2. Connectez-vous avec l'email et le mot de passe créés à l'étape 5
3. Vous devriez être redirigé vers `http://localhost:3000/admin`
4. Testez:
   - ✅ Cliquez sur "Formations" → Vous voyez la liste
   - ✅ Cliquez sur "Actualités" → Vous voyez la liste
   - ✅ Essayez d'éditer une formation
   - ✅ Essayez d'éditer une actualité

---

## Étape 7: Déployer en production

### Option A: Déployer sur Vercel (Recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New" → "Project"
3. Importez votre repository Git
4. Dans les "Environment Variables", ajoutez:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```
5. Cliquez sur "Deploy"

### Option B: Déployer sur Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Cliquez sur "Add new site" → "Import an existing project"
3. Connectez votre repository Git
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Dans "Environment variables", ajoutez vos clés Supabase
7. Cliquez sur "Deploy"

---

## 🎉 Félicitations !

Votre site INSES est maintenant entièrement dynamique avec:

✅ Un panneau d'administration complet
✅ Un système de gestion de contenu
✅ Une authentification sécurisée
✅ Une base de données Supabase
✅ Un système multilingue (FR/EN)

---

## 📚 Fonctionnalités disponibles dans le panel admin

### Gestion des Formations
- ✏️ Créer, modifier, supprimer des formations
- 🔄 Activer/désactiver des formations
- 📝 Gérer les compétences et débouchés
- 🌐 Traductions FR/EN

### Gestion des Actualités
- 📰 Créer, modifier, supprimer des actualités
- 🗂️ Catégoriser (événement, annonce, succès)
- 📅 Planifier les publications
- 🌐 Traductions FR/EN

### Gestion du Contenu
- ⚙️ Modifier les informations du site (contact, adresse)
- 📊 Gérer les statistiques affichées
- 🏢 Gérer les partenaires
- 💡 Modifier mission, vision, valeurs

### Messages et Inscriptions
- 📧 Consulter les messages de contact
- 📝 Gérer les demandes d'inscription
- ✅ Marquer comme lus/traités

---

## 🆘 Support

Si vous rencontrez des problèmes:

1. Vérifiez que toutes les variables d'environnement sont correctes
2. Vérifiez que le schema.sql a été exécuté sans erreur
3. Vérifiez les logs dans la console du navigateur (F12)
4. Consultez la documentation Supabase: [supabase.com/docs](https://supabase.com/docs)

---

## 🔒 Sécurité

- ⚠️ Ne commitez JAMAIS le fichier `.env.local` dans Git
- ⚠️ Utilisez des mots de passe forts pour les comptes admin
- ⚠️ Activez l'authentification à deux facteurs si disponible
- ⚠️ Gardez vos clés API secrètes

---

Bonne gestion de votre site INSES ! 🎓
