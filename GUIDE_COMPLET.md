# 📘 GUIDE COMPLET - Site INSES & CEPRES

**Guide Maître pour la Configuration et l'Utilisation Complète du Site**

---

## 📋 Table des Matières

1. [Introduction](#1-introduction)
2. [Vue d'Ensemble du Système](#2-vue-densemble-du-système)
3. [Prérequis](#3-prérequis)
4. [Installation et Configuration](#4-installation-et-configuration)
5. [Configuration de Supabase](#5-configuration-de-supabase)
6. [Migration des Données](#6-migration-des-données)
7. [Création du Compte Admin](#7-création-du-compte-admin)
8. [Utilisation du Panel Admin](#8-utilisation-du-panel-admin)
9. [Gestion du Contenu Textuel](#9-gestion-du-contenu-textuel)
10. [Multi-Centres (INSES & CEPRES)](#10-multi-centres-inses--cepres)
11. [Système Multilingue](#11-système-multilingue)
12. [Personnalisation Avancée](#12-personnalisation-avancée)
13. [Déploiement en Production](#13-déploiement-en-production)
14. [Maintenance et Mise à Jour](#14-maintenance-et-mise-à-jour)
15. [Dépannage](#15-dépannage)
16. [FAQ](#16-faq)

---

## 1. Introduction

### 1.1 Qu'est-ce que ce Projet ?

Ce projet est un **site web institutionnel moderne** pour deux centres de formation :
- **INSES** : Institut Supérieur de l'Espoir (formations paramédicales)
- **CEPRES** : Centre de Formation Professionnelle de l'Espoir (formations professionnelles)

### 1.2 Fonctionnalités Principales

#### Site Public
- ✅ Pages institutionnelles (accueil, à propos, contact)
- ✅ Catalogue de formations avec détails complets
- ✅ Section actualités et événements
- ✅ Galerie d'images
- ✅ Formulaires de contact et d'inscription
- ✅ **Multilingue** (Français/English)
- ✅ **Multi-centres** (INSES et CEPRES)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Mode sombre/clair

#### Panel d'Administration
- 🔐 Authentification sécurisée
- ✏️ Gestion des centres de formation
- 📚 Gestion des formations (CRUD complet)
- 📰 Gestion des actualités
- 📝 **Gestion de TOUT le contenu textuel**
- ⚙️ Gestion des informations du site
- 📊 Gestion des statistiques
- 🏢 Gestion des partenaires
- 📧 Consultation des messages et inscriptions
- 🖼️ Gestion de la galerie

### 1.3 Technologies Utilisées

- **Frontend** : Next.js 14+, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : Supabase (PostgreSQL, Auth, Storage, RLS)
- **Déploiement** : Vercel / Netlify

---

## 2. Vue d'Ensemble du Système

### 2.1 Architecture

```
┌─────────────────────────────────────────┐
│          SITE PUBLIC                     │
│  (Visiteurs - FR/EN - Multi-centres)    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         SUPABASE (Backend)              │
│  • Base de données PostgreSQL           │
│  • Authentification (Admin)             │
│  • Row Level Security                   │
│  • Storage (Images)                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       PANEL ADMIN                        │
│  (Gestion complète du contenu)          │
└─────────────────────────────────────────┘
```

### 2.2 Structure de la Base de Données

**12 Tables Principales :**
1. `centers` - Centres de formation (INSES, CEPRES)
2. `formations` - Formations offertes
3. `formation_skills` - Compétences par formation
4. `formation_careers` - Débouchés professionnels
5. `news` - Actualités et événements
6. `site_content` - **TOUS les textes du site**
7. `center_info` - Informations par centre
8. `center_values` - Valeurs par centre
9. `center_partners` - Partenaires par centre
10. `center_stats` - Statistiques par centre
11. `contact_submissions` - Messages de contact
12. `inscription_submissions` - Demandes d'inscription

---

## 3. Prérequis

### 3.1 Logiciels Requis

- ✅ **Node.js 18+** ([Télécharger](https://nodejs.org/))
- ✅ **Git** ([Télécharger](https://git-scm.com/))
- ✅ **Éditeur de code** (VS Code recommandé)
- ✅ **Navigateur moderne** (Chrome, Firefox, Edge)

### 3.2 Comptes Nécessaires

- ✅ **Compte Supabase** (gratuit) : [supabase.com](https://supabase.com)
- ✅ **Compte Vercel** (optionnel, pour déploiement) : [vercel.com](https://vercel.com)

### 3.3 Connaissances Recommandées

- 🔵 Utilisation basique du terminal
- 🔵 Compréhension des concepts web (HTML, CSS)
- 🟢 Aucune connaissance en programmation requise pour l'administration

---

## 4. Installation et Configuration

### 4.1 Cloner le Projet

```bash
# Si vous avez Git installé
cd /chemin/vers/votre/dossier
git clone [URL_DU_REPO]
cd inses-website

# Ou simplement décompressez le fichier ZIP du projet
```

### 4.2 Installer les Dépendances

```bash
# Dans le dossier inses-website
npm install
```

**Attendez 2-3 minutes** pendant l'installation des packages.

✅ **Succès** : Vous devriez voir "added XXX packages"

### 4.3 Vérifier l'Installation

```bash
# Tester le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

⚠️ **Normal** : Le site ne fonctionnera pas encore (pas de Supabase configuré)

Arrêtez le serveur : `Ctrl + C`

---

## 5. Configuration de Supabase

### 5.1 Créer un Projet Supabase

#### Étape 1 : Créer un compte
1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"**
3. Inscrivez-vous avec GitHub, Google ou email

#### Étape 2 : Créer un nouveau projet
1. Cliquez sur **"New Project"**
2. Remplissez les informations :
   - **Name** : `inses-website` (ou votre choix)
   - **Database Password** : ⚠️ **IMPORTANT** - Créez un mot de passe fort et **notez-le** : inses-web@2025site
   - **Region** : Choisissez le plus proche (ex : Europe West)
3. Cliquez sur **"Create new project"**
4. ⏱️ **Attendez 2-3 minutes** que le projet soit créé

### 5.2 Récupérer les Clés API

#### Étape 1 : Accéder aux paramètres
1. Dans votre projet Supabase, cliquez sur **⚙️ Settings** (menu gauche)
2. Cliquez sur **API** dans le sous-menu

#### Étape 2 : Copier les clés
Vous verrez 3 informations importantes :

**📋 Project URL :**
```
https://xxxxxxxxxxxxx.supabase.co
```

**📋 anon public (clé publique) :**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**📋 service_role (clé secrète) :**
- Cliquez sur **"Reveal"** pour l'afficher
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important** : Ne partagez JAMAIS la clé `service_role` publiquement !

### 5.3 Configurer les Variables d'Environnement

#### Étape 1 : Ouvrir le fichier .env.local
Dans votre éditeur de code, ouvrez le fichier `.env.local` à la racine du projet.

#### Étape 2 : Remplacer les valeurs
```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key-ici
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key-ici
```

**Exemple complet :**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMDAwMDAsImV4cCI6MjAxMjU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzAwMDAwMCwiZXhwIjoyMDEyNTc2MDAwfQ.yyyyyyyyyyyyyyyyyyyyyyyyy
```

#### Étape 3 : Sauvegarder
Sauvegardez le fichier (Ctrl+S ou Cmd+S)

✅ **Configuration terminée !**

### 5.4 Créer la Base de Données

#### Étape 1 : Accéder à l'éditeur SQL
1. Dans Supabase, cliquez sur **🗄️ SQL Editor** (menu gauche)
2. Cliquez sur **"New query"**

#### Étape 2 : Exécuter le schéma de base
1. Ouvrez le fichier `supabase/schema.sql` dans votre éditeur
2. **Copiez tout le contenu** (Ctrl+A puis Ctrl+C)
3. **Collez** dans l'éditeur SQL de Supabase
4. Cliquez sur **"Run"** (en bas à droite)

⏱️ Attendez 5-10 secondes

✅ **Succès** : "Success. No rows returned"

#### Étape 3 : Exécuter le schéma multi-centres
1. Ouvrez `supabase/schema-with-centers.sql`
2. Copiez tout le contenu
3. Collez dans un **nouveau query** SQL
4. Cliquez sur **"Run"**

✅ **Succès** : Tables `centers`, `center_info`, etc. créées

#### Étape 4 : Exécuter le schéma du contenu textuel
1. Ouvrez `supabase/schema-site-content.sql`
2. Copiez tout le contenu
3. Collez dans un **nouveau query** SQL
4. Cliquez sur **"Run"**

✅ **Succès** : Table `site_content` créée avec ~150 textes

### 5.5 Vérifier la Base de Données

1. Cliquez sur **📊 Table Editor** (menu gauche)
2. Vérifiez que ces tables existent :
   - ✅ `centers` → 2 lignes (INSES, CEPRES)
   - ✅ `formations` → Vide pour l'instant
   - ✅ `news` → Vide pour l'instant
   - ✅ `site_content` → ~150 lignes
   - ✅ `site_info` → 1 ligne
   - ✅ Toutes les autres tables

✅ **Base de données prête !**

---

## 6. Migration des Données

### 6.1 Pourquoi Migrer ?

Le projet contient des données statiques (formations, actualités) qu'il faut transférer dans Supabase.

### 6.2 Exécuter le Script de Migration

```bash
# Dans le terminal, à la racine du projet
npx tsx scripts/migrate-to-supabase.ts
```

### 6.3 Résultat Attendu

Vous devriez voir :

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

### 6.4 Vérifier les Données Migrées

Dans Supabase → Table Editor :
- ✅ `formations` → **6 formations** (toutes pour INSES)
- ✅ `formation_skills` → **~30 compétences**
- ✅ `formation_careers` → **~24 débouchés**
- ✅ `news` → **6 actualités**
- ✅ `stats` → **4 statistiques**
- ✅ `about_values` → **4 valeurs**
- ✅ `partners` → **2 partenaires**

✅ **Migration réussie !**

---

## 7. Création du Compte Admin

### 7.1 Créer un Utilisateur Admin

#### Étape 1 : Accéder à Authentication
1. Dans Supabase, cliquez sur **🔐 Authentication** (menu gauche)
2. Cliquez sur **Users**
3. Cliquez sur **"Add user"** → **"Create new user"**

#### Étape 2 : Remplir les informations
```
Email: admin@univ-inses.com
Password: [Choisissez un mot de passe fort]
```

⚠️ **Important** :
- ✅ Cochez **"Auto Confirm User"**
- ✅ Notez bien votre mot de passe !

#### Étape 3 : Créer
Cliquez sur **"Create user"**

✅ **Compte admin créé !**

### 7.2 Tester la Connexion

```bash
# Démarrer le serveur
npm run dev
```

1. Ouvrez [http://localhost:3000/login](http://localhost:3000/login)
2. Entrez l'email et le mot de passe
3. Cliquez sur **"Se connecter"**

✅ **Succès** : Vous êtes redirigé vers `/admin`

---

## 8. Utilisation du Panel Admin

### 8.1 Accéder au Panel

**URL :** [http://localhost:3000/admin](http://localhost:3000/admin)

### 8.2 Vue d'Ensemble du Dashboard

Le tableau de bord affiche 9 sections principales :

```
┌─────────────────────────────────────────┐
│         TABLEAU DE BORD                 │
├─────────────────────────────────────────┤
│  📚 Formations                          │
│  📰 Actualités                          │
│  ℹ️  À Propos                            │
│  ⚙️  Informations du Site               │
│  📊 Statistiques                        │
│  👥 Partenaires                         │
│  📧 Messages de Contact                 │
│  📝 Demandes d'Inscription              │
│  🏢 Centres de Formation                │
│  📝 Contenu Textuel (NOUVEAU!)          │
└─────────────────────────────────────────┘
```

### 8.3 Gérer les Centres

#### 8.3.1 Voir les Centres

1. Cliquez sur **"Centres de Formation"**
2. Vous verrez **INSES** et **CEPRES**

#### 8.3.2 Modifier un Centre

1. Cliquez sur **"Modifier"** sur INSES ou CEPRES
2. Vous pouvez modifier :
   - 🇫🇷 Nom français
   - 🇬🇧 Nom anglais
   - 📝 Description (FR/EN)
   - 🎨 Couleur primaire
   - 🎨 Couleur secondaire
   - 📍 Localisation
   - 📧 Email
   - 📞 Téléphone
   - 💬 WhatsApp
3. Cliquez sur **"Enregistrer"**

#### 8.3.3 Activer/Désactiver un Centre

Cliquez sur le badge **"Actif"** ou **"Inactif"** pour basculer.

### 8.4 Gérer les Formations

#### 8.4.1 Voir Toutes les Formations

1. Cliquez sur **"Formations"**
2. Liste de toutes les formations (6 pour INSES)

#### 8.4.2 Créer une Nouvelle Formation

1. Cliquez sur **"Nouvelle formation"**
2. Remplissez le formulaire :

**Informations de Base :**
```
Centre : [Choisir INSES ou CEPRES]
Slug : delegue-medical (URL-friendly)
Durée : 2 ans
Niveau requis : Bac
Icône : GraduationCap (nom d'icône Lucide)
```

**Contenu Français :**
```
Titre : Délégué Médical
Description courte : Formation professionnelle...
Description complète : Cette formation prépare...
```

**Contenu Anglais :**
```
Titre : Medical Delegate
Description courte : Professional training...
Description complète : This training prepares...
```

**Compétences (minimum 3) :**
```
FR: Connaissance des médicaments
EN: Knowledge of medicines

FR: Techniques de vente
EN: Sales techniques
```

**Débouchés (minimum 3) :**
```
FR: Délégué médical en pharmacie
EN: Medical delegate in pharmacy

FR: Attaché de vente pharmaceutique
EN: Pharmaceutical sales representative
```

3. Cliquez sur **"Créer la formation"**

✅ **Formation créée !**

#### 8.4.3 Modifier une Formation

1. Cliquez sur l'icône **✏️ Modifier**
2. Modifiez les champs
3. Cliquez sur **"Enregistrer"**

#### 8.4.4 Activer/Désactiver

Cliquez sur le badge **"Active"/"Inactive"**

Les formations inactives sont cachées du site public.

#### 8.4.5 Supprimer une Formation

1. Cliquez sur l'icône **🗑️**
2. Confirmez la suppression

⚠️ **Attention** : Action irréversible !

### 8.5 Gérer les Actualités

#### 8.5.1 Créer une Actualité

1. Cliquez sur **"Actualités"** → **"Nouvelle actualité"**
2. Remplissez :

```
Slug : rentree-2024
Catégorie : Annonce / Événement / Succès
Date de publication : 2024-09-01
Image : /images/news/rentree-2024.jpg
```

**Français :**
```
Titre : Rentrée Académique 2024-2025
Extrait : La rentrée est prévue pour...
Contenu : <p>Nous sommes heureux...</p>
```

**Anglais :**
```
Titre : Academic Year 2024-2025
Extrait : The academic year starts...
Contenu : <p>We are pleased...</p>
```

3. Cochez **"Publier immédiatement"**
4. Cliquez sur **"Créer"**

#### 8.5.2 Catégories d'Actualités

- **📅 Événement** : Journées portes ouvertes, stages, etc.
- **📢 Annonce** : Rentrée, nouveaux programmes, etc.
- **🏆 Succès** : Cérémonies, résultats d'examens, etc.

### 8.6 Gérer les Informations "À Propos"

1. Cliquez sur **"À Propos"**
2. Modifiez :
   - Mission (FR/EN)
   - Vision (FR/EN)
   - Pédagogie théorique (FR/EN)
   - Pédagogie pratique (FR/EN)
   - Évaluation (FR/EN)

3. **Gérer les Valeurs** :
   - Cliquez sur **"Ajouter une valeur"**
   - Titre et description (FR/EN)
   - Utilisez ↑↓ pour réorganiser

4. **Gérer les Partenaires** :
   - Cliquez sur **"Ajouter un partenaire"**
   - Nom (FR/EN)
   - Logo (optionnel)

### 8.7 Gérer les Statistiques

1. Cliquez sur **"Statistiques"**
2. Modifiez les stats existantes :
   ```
   Valeur : 10+
   Label FR : Années d'expérience
   Label EN : Years of experience
   ```
3. Ou ajoutez-en de nouvelles

Les statistiques s'affichent sur la page d'accueil.

### 8.8 Consulter les Messages

#### Messages de Contact
1. Cliquez sur **"Messages de contact"**
2. Voir tous les messages reçus
3. Cliquez sur un message pour le lire
4. Marquez comme lu : ✅

#### Demandes d'Inscription
1. Cliquez sur **"Demandes d'inscription"**
2. Voir toutes les demandes
3. Informations : Nom, email, téléphone, formation
4. Marquez comme traitée : ✅
5. Exportez en CSV si besoin

---

## 9. Gestion du Contenu Textuel

### 9.1 Introduction

**NOUVEAU !** Tous les textes du site (boutons, titres, labels) sont maintenant **éditables depuis l'admin**.

Plus besoin de toucher au code pour changer :
- "En savoir plus"
- "Nos Formations"
- "Contactez-nous"
- etc.

### 9.2 Accéder à l'Éditeur de Contenu

**URL :** `/admin/content`

### 9.3 Interface de Gestion

```
┌────────────────────────────────────────┐
│   Contenu Textuel du Site             │
├────────────────────────────────────────┤
│  🔍 Rechercher...                      │
│  🗂️  Filtrer par catégorie            │
├────────────────────────────────────────┤
│  📝 150 textes disponibles             │
└────────────────────────────────────────┘
```

### 9.4 Rechercher un Texte

#### Exemple 1 : Modifier "En savoir plus"

1. Dans la barre de recherche, tapez : `learnMore`
2. Vous trouvez : `common.learnMore`
3. Cliquez sur **"Modifier"**
4. Changez :
   - 🇫🇷 "Découvrir maintenant"
   - 🇬🇧 "Discover now"
5. Cliquez sur **"Enregistrer"**

✅ Le changement s'applique **partout** où ce bouton est utilisé !

#### Exemple 2 : Modifier le titre de la page d'accueil

1. Recherchez : `home.hero.title`
2. Modifiez :
   - 🇫🇷 "Excellence en Formation"
   - 🇬🇧 "Excellence in Training"
3. Enregistrez

✅ Le titre change immédiatement sur la page d'accueil !

### 9.5 Filtrer par Catégorie

Les textes sont organisés en catégories :

| Catégorie | Nombre | Description |
|-----------|--------|-------------|
| `navigation` | 8 | Menu et liens |
| `common` | 13 | Boutons réutilisés |
| `home` | 10 | Page d'accueil |
| `formations` | 6 | Page formations |
| `about` | 9 | Page à propos |
| `contact` | 12 | Page contact |
| `news` | 8 | Page actualités |
| `centers` | 9 | Page centres |
| `footer` | 6 | Pied de page |

**Utilisation :**
1. Sélectionnez une catégorie dans le menu déroulant
2. Seuls les textes de cette catégorie s'affichent

### 9.6 Structure des Clés

Format : `categorie.section.element`

**Exemples :**
```
nav.home               → "Accueil" / "Home"
common.learnMore       → "En savoir plus" / "Learn More"
home.hero.title        → Titre du hero
contact.form.submit    → Bouton du formulaire
footer.copyright       → Texte copyright
```

### 9.7 Liste des Textes Essentiels

#### Navigation
```
nav.home               → Accueil
nav.about              → À Propos
nav.formations         → Formations
nav.news               → Actualités
nav.contact            → Contact
nav.inscription        → Inscription
nav.centers            → Nos Centres
```

#### Boutons Communs
```
common.learnMore       → En savoir plus
common.enroll          → S'inscrire
common.contact         → Nous contacter
common.discover        → Découvrir
common.readMore        → Lire la suite
```

#### Page d'Accueil
```
home.hero.title        → Titre principal
home.hero.subtitle     → Sous-titre
home.hero.cta          → Bouton CTA
home.formations.title  → "Nos Formations"
home.values.title      → "Nos Valeurs"
home.stats.title       → "En Chiffres"
```

#### Formulaires
```
contact.form.name      → Nom complet
contact.form.email     → Email
contact.form.message   → Message
contact.form.submit    → Envoyer
```

### 9.8 Bonnes Pratiques

✅ **À FAIRE :**
- Utilisez des textes courts et clairs
- Vérifiez l'orthographe avant d'enregistrer
- Testez sur mobile après modification
- Gardez une cohérence dans le ton

❌ **À ÉVITER :**
- Textes trop longs (surtout pour les boutons)
- Emojis (sauf si vraiment nécessaire)
- HTML dans les textes simples
- Oublier la traduction anglaise

---

## 10. Multi-Centres (INSES & CEPRES)

### 10.1 Concept

Le site supporte **plusieurs centres de formation** avec :
- ✅ Identité visuelle propre (couleurs, logo)
- ✅ Formations spécifiques
- ✅ Statistiques indépendantes
- ✅ Valeurs et partenaires propres

### 10.2 Les Deux Centres

#### INSES
```
Nom complet : Institut Supérieur de l'Espoir
Spécialité : Formations paramédicales
Couleur : Rouge #DC2626
Logo : /images/logo-inses.png
```

**Formations INSES (6) :**
1. Délégué Médical
2. Secrétariat Médical
3. Massothérapie
4. Aide Chimiste Biologiste
5. Diététique et Nutrition
6. Vendeur en Pharmacie

#### CEPRES
```
Nom complet : Centre de Formation Professionnelle de l'Espoir
Spécialité : Formations professionnelles
Couleur : Bleu #3B82F6
Logo : /images/logo-cepres.png (À créer)
```

**Formations CEPRES (À ajouter) :**
1. Électricité Bâtiment
2. Plomberie
3. Menuiserie
4. Secrétariat Bureautique
5. Comptabilité de Gestion
6. Informatique de Gestion
7. Coiffure et Esthétique
8. Cuisine et Pâtisserie

### 10.3 Structure des URLs

```
/centers                    → Page de sélection
/inses                      → Page INSES
/inses/formations           → Formations INSES
/inses/formations/[slug]    → Détail formation INSES
/cepres                     → Page CEPRES
/cepres/formations          → Formations CEPRES
/cepres/formations/[slug]   → Détail formation CEPRES
```

### 10.4 Ajouter des Formations CEPRES

#### Via le Panel Admin

1. Allez sur `/admin/formations`
2. Cliquez sur **"Nouvelle formation"**
3. **IMPORTANT** : Sélectionnez **Centre : CEPRES**
4. Remplissez toutes les informations
5. Créez

**Exemple : Électricité Bâtiment**

```
Centre : CEPRES
Slug : electricite-batiment
Durée : 1 an
Niveau : BEPC

Titre FR : Électricité Bâtiment
Titre EN : Building Electricity

Description FR : Formation pratique en électricité...
Description EN : Practical training in electricity...

Compétences :
- Installation électrique / Electrical installation
- Dépannage / Troubleshooting
- Lecture de plans / Blueprint reading

Débouchés :
- Électricien bâtiment / Building electrician
- Installateur électrique / Electrical installer
```

### 10.5 Personnaliser les Centres

#### Modifier les Informations

1. `/admin/centers`
2. Cliquez sur **"Modifier"** (INSES ou CEPRES)
3. Changez :
   - Descriptions
   - Coordonnées
   - Couleurs (format : #RRGGBB)

#### Ajouter des Statistiques

1. Créez des stats spécifiques pour chaque centre
2. Par exemple pour CEPRES :
   ```
   Valeur : 500+
   Label FR : Professionnels formés
   Label EN : Trained professionals
   ```

### 10.6 Logo CEPRES

#### Créer le Logo

**Spécifications :**
- Format : PNG avec fond transparent
- Dimensions : 500x500px minimum
- Couleur principale : Bleu (#3B82F6)
- Style : Moderne et professionnel

#### Installer le Logo

1. Placez le fichier dans : `/public/images/logo-cepres.png`
2. Dans `/admin/centers`, modifiez CEPRES
3. Logo : `/images/logo-cepres.png`
4. Enregistrez

✅ Le logo s'affiche automatiquement !

---

## 11. Système Multilingue

### 11.1 Langues Supportées

- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **English**

### 11.2 Changement de Langue

#### Pour les Visiteurs

1. Bouton 🇫🇷/🇬🇧 dans la navbar (en haut à droite)
2. Clic → Tout le site bascule instantanément
3. Le choix est sauvegardé

#### Comment ça Marche ?

```
Visiteur clique sur 🇬🇧
         ↓
Langue active = 'en'
         ↓
Tous les hooks chargent *_en
         ↓
Site entièrement en anglais
```

### 11.3 Contenu Bilingue

**Tout** le contenu est disponible en FR/EN :

| Type de Contenu | Colonnes Bilingues |
|-----------------|-------------------|
| Centres | name_fr, name_en, description_fr, description_en |
| Formations | title_fr, title_en, short_description_fr, short_description_en |
| Actualités | title_fr, title_en, content_fr, content_en |
| Compétences | skill_fr, skill_en |
| Débouchés | career_fr, career_en |
| Valeurs | title_fr, title_en, description_fr, description_en |
| Statistiques | label_fr, label_en |
| Textes du site | content_fr, content_en |

### 11.4 Gérer les Traductions

#### Dans le Panel Admin

**Toujours remplir les deux langues !**

✅ **BON :**
```
Titre FR : Délégué Médical
Titre EN : Medical Delegate
```

❌ **MAUVAIS :**
```
Titre FR : Délégué Médical
Titre EN : (vide)
```

#### Conseils de Traduction

1. **Restez cohérent** : Utilisez les mêmes termes partout
2. **Adaptez, ne traduisez pas mot à mot** :
   - FR : "Nos formations"
   - EN : "Our Programs" (pas "Our Trainings")
3. **Vérifiez la longueur** : Les textes EN sont souvent plus longs
4. **Utilisez un ton professionnel** : C'est un site institutionnel

---

## 12. Personnalisation Avancée

### 12.1 Modifier les Couleurs

#### Couleurs des Centres

Dans `/admin/centers`, modifiez :
```
Couleur primaire : #DC2626
Couleur secondaire : #991B1B
```

Ces couleurs sont utilisées pour :
- Boutons
- Bordures
- Badges
- Icônes

#### Format des Couleurs

Utilisez le format hexadécimal : `#RRGGBB`

**Outils utiles :**
- [Coolors.co](https://coolors.co) - Générateur de palettes
- [Adobe Color](https://color.adobe.com) - Outil Adobe

### 12.2 Ajouter des Images

#### Images des Formations

Placez vos images dans :
```
/public/images/formations/
```

Nommage : `formation-[slug].jpg`

Exemple :
```
formation-delegue-medical.jpg
formation-electricite-batiment.jpg
```

#### Images des Actualités

```
/public/images/news/
rentree-2024.jpg
portes-ouvertes.jpg
```

#### Images de Galerie

```
/public/images/gallery/
campus-1.jpg
diplomes-2024.jpg
```

**Spécifications recommandées :**
- Format : JPG ou PNG
- Poids : < 500 KB (compressez si nécessaire)
- Dimensions :
  - Formations : 800x600px
  - Actualités : 1200x800px
  - Hero : 1920x1080px

### 12.3 Ajouter un Nouveau Centre

1. Via SQL dans Supabase :
```sql
INSERT INTO centers (slug, name_fr, name_en, full_name_fr, full_name_en, primary_color, secondary_color)
VALUES (
  'nouveau-centre',
  'Nouveau Centre',
  'New Center',
  'Nom complet français',
  'Full English Name',
  '#3B82F6',
  '#1E40AF'
);
```

2. Ajoutez des formations pour ce centre
3. Le centre apparaît automatiquement sur `/centers`

### 12.4 Personnaliser la Page d'Accueil

#### Modifier le Hero

1. `/admin/content`
2. Recherchez `home.hero.*`
3. Modifiez titre, sous-titre, bouton

#### Changer les Sections Affichées

Éditez `/app/page.tsx` :
- Réorganisez les sections
- Masquez/affichez des sections
- Changez l'ordre

---

## 13. Déploiement en Production

### 13.1 Préparer le Déploiement

#### Checklist Avant Déploiement

- ✅ Toutes les données sont migrées
- ✅ Compte admin créé et testé
- ✅ Logo CEPRES ajouté
- ✅ Formations CEPRES créées
- ✅ Tous les textes vérifiés (FR/EN)
- ✅ Images optimisées
- ✅ Tests effectués en local

### 13.2 Déployer sur Vercel

#### Étape 1 : Créer un Compte

1. Allez sur [vercel.com](https://vercel.com)
2. Inscrivez-vous avec GitHub

#### Étape 2 : Importer le Projet

1. Cliquez sur **"Add New"** → **"Project"**
2. Importez votre repository Git
3. Ou uploadez le dossier du projet

#### Étape 3 : Configurer les Variables

Dans **"Environment Variables"**, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL = https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = votre-anon-key
SUPABASE_SERVICE_ROLE_KEY = votre-service-role-key
```

#### Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. ⏱️ Attendez 2-3 minutes
3. ✅ Site en ligne !

**URL :** `https://votre-projet.vercel.app`

### 13.3 Déployer sur Netlify

#### Étape 1 : Créer un Compte

1. Allez sur [netlify.com](https://netlify.com)
2. Inscrivez-vous

#### Étape 2 : Configuration

1. **"Add new site"** → **"Import an existing project"**
2. Connectez votre repo Git
3. Build settings :
   ```
   Build command: npm run build
   Publish directory: .next
   ```

#### Étape 3 : Variables d'Environnement

Ajoutez les 3 variables Supabase.

#### Étape 4 : Déployer

Cliquez sur **"Deploy site"**

### 13.4 Nom de Domaine Personnalisé

#### Acheter un Domaine

- [Namecheap](https://namecheap.com)
- [OVH](https://ovh.com)
- [GoDaddy](https://godaddy.com)

Exemple : `univ-inses.com`

#### Configurer le Domaine

**Sur Vercel :**
1. Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

**Sur Netlify :**
1. Domain Settings
2. Add custom domain
3. Suivez les instructions

⏱️ Propagation DNS : 24-48h

✅ Site accessible sur `https://univ-inses.com`

---

## 14. Maintenance et Mise à Jour

### 14.1 Sauvegardes Régulières

#### Sauvegarder la Base de Données

**Méthode 1 : Via Supabase**
1. Settings → Database → **"Download a backup"**
2. Fichier SQL téléchargé
3. Stockez en sécurité

**Fréquence recommandée :** Hebdomadaire

#### Sauvegarder les Images

Copiez le dossier `/public/images/` sur un disque externe ou cloud.

### 14.2 Mettre à Jour le Contenu

#### Routine Hebdomadaire

- ✅ Ajouter les nouvelles actualités
- ✅ Répondre aux messages de contact
- ✅ Traiter les demandes d'inscription
- ✅ Vérifier les stats du site

#### Routine Mensuelle

- ✅ Ajouter des photos à la galerie
- ✅ Mettre à jour les statistiques
- ✅ Vérifier les informations de contact
- ✅ Réviser les textes si nécessaire

#### Routine Annuelle

- ✅ Mettre à jour les formations (durées, programmes)
- ✅ Renouveler les partenariats
- ✅ Réviser la mission/vision
- ✅ Archiver les anciennes actualités

### 14.3 Surveiller les Performances

#### Google Analytics

1. Créez un compte [analytics.google.com](https://analytics.google.com)
2. Ajoutez le code de tracking
3. Suivez :
   - Nombre de visiteurs
   - Pages les plus vues
   - Taux de conversion (inscriptions)

#### Supabase Insights

Dans Supabase → Reports :
- Requêtes par jour
- Utilisateurs actifs
- Espace de stockage utilisé

---

## 15. Dépannage

### 15.1 Problèmes Courants

#### Le site ne démarre pas

**Erreur :** "Cannot find module"
```bash
# Solution
npm install
```

**Erreur :** "Supabase URL is not defined"
```bash
# Vérifiez .env.local
# Les variables doivent être définies
```

#### Les données ne s'affichent pas

**Vérifications :**
1. Base de données créée ? (Table Editor)
2. Données migrées ? (vérifiez les tables)
3. Variables d'environnement correctes ?
4. Policies RLS activées ?

**Solution :**
```bash
# Réexécutez la migration
npx tsx scripts/migrate-to-supabase.ts
```

#### Impossible de se connecter

**Vérifications :**
1. Utilisateur créé dans Supabase Auth ?
2. "Auto Confirm User" coché ?
3. Mot de passe correct ?

**Solution :**
Recréez l'utilisateur avec "Auto Confirm User" ✅

#### Les textes ne changent pas

**Cause :** Cache (5 minutes)

**Solution :**
1. Attendez 5 minutes
2. Ou rafraîchissez : Ctrl+Shift+R
3. Ou videz le cache navigateur

#### Images manquantes

**Vérifications :**
1. Fichier existe dans `/public/images/` ?
2. Chemin correct dans la BDD ?
3. Nom de fichier exact (sensible à la casse) ?

### 15.2 Obtenir de l'Aide

#### Documentation

- **Supabase** : [supabase.com/docs](https://supabase.com/docs)
- **Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS** : [tailwindcss.com/docs](https://tailwindcss.com/docs)

#### Support Supabase

- Discord : [discord.supabase.com](https://discord.supabase.com)
- GitHub : [github.com/supabase](https://github.com/supabase)

#### Logs et Débogage

**Console du navigateur :**
1. F12 ou Cmd+Option+I
2. Onglet "Console"
3. Cherchez les erreurs (rouge)

**Logs Supabase :**
1. Supabase → Logs Explorer
2. Filtrez par table ou fonction

---

## 16. FAQ

### Q1 : Combien coûte Supabase ?

**R :** Supabase a un plan **gratuit** largement suffisant :
- ✅ 500 MB de base de données
- ✅ 1 GB de stockage fichiers
- ✅ 2 GB de bande passante
- ✅ Authentification illimitée

Pour plus : à partir de $25/mois

### Q2 : Puis-je ajouter plus de 2 centres ?

**R :** Oui ! Ajoutez autant de centres que vous voulez via SQL ou créez une interface admin pour cela.

### Q3 : Comment ajouter une troisième langue ?

**R :** Il faut :
1. Ajouter des colonnes `*_es` (espagnol par exemple) dans toutes les tables
2. Modifier les hooks pour supporter 3 langues
3. Ajouter un bouton 🇪🇸 dans la navbar

**Complexité :** Moyenne (2-3h de développement)

### Q4 : Puis-je personnaliser le design ?

**R :** Oui ! Le site utilise Tailwind CSS :
- Modifiez les couleurs dans les fichiers
- Changez les espacements, polices, etc.
- Personnalisez les composants

### Q5 : Les formulaires envoient-ils vraiment des emails ?

**R :** Actuellement, les soumissions sont **stockées dans la BDD** mais aucun email n'est envoyé.

Pour envoyer des emails, vous devez :
1. Utiliser un service comme [Resend](https://resend.com) ou [SendGrid](https://sendgrid.com)
2. Créer une API route Next.js
3. Intégrer le service email

### Q6 : Comment exporter les demandes d'inscription ?

**R :** Dans `/admin/inscriptions` :
1. Cliquez sur **"Exporter CSV"** (à implémenter)
2. Ou copiez manuellement depuis Supabase Table Editor

### Q7 : Puis-je utiliser mon propre serveur ?

**R :** Oui, mais ce n'est pas recommandé. Next.js et Supabase fonctionnent mieux sur des plateformes cloud optimisées (Vercel, Netlify).

### Q8 : Comment changer le logo ?

**R :** Remplacez les fichiers :
```
/public/images/logo-inses.png
/public/images/logo-cepres.png
```

Gardez le même nom de fichier.

### Q9 : Le site est-il SEO-friendly ?

**R :** Oui ! Next.js génère des pages statiques optimisées pour le SEO :
- Meta tags
- URLs propres
- Sitemap
- Performance optimale

### Q10 : Combien de visiteurs le site peut-il supporter ?

**R :** Avec Vercel/Netlify + Supabase gratuit :
- **~50,000 visiteurs/mois** sans problème
- Passage automatique à l'échelle
- CDN mondial inclus

---

## 📞 Support

### Besoin d'aide ?

1. **Relisez ce guide** - 90% des questions y trouvent réponse
2. **Consultez la documentation** Supabase/Next.js
3. **Vérifiez les logs** dans la console du navigateur
4. **Testez en local** avant de déployer

### Ressources Utiles

- 📚 **Documentation Supabase** : [supabase.com/docs](https://supabase.com/docs)
- 📚 **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- 💬 **Discord Supabase** : [discord.supabase.com](https://discord.supabase.com)
- 🎥 **Tutoriels YouTube** : Recherchez "Supabase Next.js"

---

## ✅ Checklist Finale

Avant de considérer le projet terminé :

### Configuration
- [ ] Supabase configuré
- [ ] 3 schémas SQL exécutés
- [ ] Variables d'environnement définies
- [ ] Données migrées
- [ ] Compte admin créé

### Contenu
- [ ] Logo CEPRES ajouté
- [ ] Formations INSES vérifiées
- [ ] Formations CEPRES ajoutées
- [ ] Actualités publiées
- [ ] Tous les textes vérifiés (FR/EN)
- [ ] Images optimisées

### Tests
- [ ] Site fonctionne en local
- [ ] Connexion admin OK
- [ ] Formulaires fonctionnent
- [ ] Changement de langue OK
- [ ] Responsive (mobile/tablette/desktop)
- [ ] Mode sombre/clair

### Déploiement
- [ ] Site déployé sur Vercel/Netlify
- [ ] Variables d'environnement en production
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] SSL/HTTPS actif

### Maintenance
- [ ] Sauvegarde BDD configurée
- [ ] Google Analytics ajouté (optionnel)
- [ ] Plan de maintenance établi

---

## 🎉 Félicitations !

Vous avez maintenant un site web professionnel, entièrement dynamique, avec :

✅ **2 centres de formation** gérables indépendamment
✅ **Panel admin complet** sans toucher au code
✅ **Contenu 100% éditable** (formations, actualités, textes)
✅ **Système bilingue** natif (FR/EN)
✅ **Performance optimale** avec cache et CDN
✅ **Sécurité** avec RLS Supabase
✅ **Design moderne** et responsive

**Le site est prêt à accueillir des milliers de visiteurs ! 🚀**

---

**Version du Guide :** 1.0
**Dernière mise à jour :** 2025-12-19
**Auteur :** Documentation Complète INSES/CEPRES

© 2025 Institut Supérieur de l'Espoir (INSES) - Tous droits réservés
