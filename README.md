# Site Web INSES - Institut Supérieur de l'Espoir

Site web institutionnel moderne avec système de gestion de contenu dynamique (CMS) propulsé par Supabase.

## 🌟 Fonctionnalités

### Site Public
- ✅ Page d'accueil avec présentation de l'institut
- ✅ Catalogue de formations avec pages détaillées
- ✅ Section actualités/événements
- ✅ Page "À propos" (mission, vision, valeurs, pédagogie)
- ✅ Formulaire de contact
- ✅ Formulaire d'inscription aux formations
- ✅ Galerie d'images
- ✅ Multilingue (Français/English)
- ✅ Mode sombre/clair
- ✅ Design responsive (mobile, tablette, desktop)

### Panel d'Administration
- 🔐 Authentification sécurisée avec Supabase Auth
- ✏️ Gestion complète des formations (CRUD)
- 📰 Gestion des actualités (CRUD)
- ⚙️ Gestion des informations du site
- 📊 Gestion des statistiques
- 🏢 Gestion des partenaires
- 💡 Gestion mission/vision/valeurs
- 📧 Consultation des messages de contact
- 📝 Gestion des demandes d'inscription
- 🖼️ Gestion de la galerie d'images
- 🌐 Interface multilingue (FR/EN)

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14+** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **next-themes** - Gestion du thème clair/sombre

### Backend & Base de données
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL - Base de données relationnelle
  - Row Level Security (RLS) - Sécurité des données
  - Auth - Authentification et autorisation
  - Storage - Stockage de fichiers

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ installé
- Un compte Supabase (gratuit)

### Installation

1. **Installer les dépendances**
```bash
cd inses-website
npm install
```

2. **Configurer Supabase**

📖 **Suivez le guide détaillé**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

Ce guide couvre:
- Création du projet Supabase
- Configuration de la base de données
- Variables d'environnement
- Migration des données
- Création du compte admin

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Guide complet de configuration et déploiement
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Guide d'utilisation du panel d'administration
- **[scripts/README.md](./scripts/README.md)** - Documentation des scripts de migration

## 🗄️ Base de Données

### Tables Principales

- **`formations`** - Formations offertes avec compétences et débouchés
- **`news`** - Actualités et événements
- **`site_info`** - Informations générales du site
- **`about_info`** - Mission, vision, pédagogie
- **`stats`** - Statistiques affichées
- **`contact_submissions`** - Messages du formulaire de contact
- **`inscription_submissions`** - Demandes d'inscription

Toutes les tables incluent traductions FR/EN et Row Level Security (RLS).

## 🔐 Accès Admin

- URL de connexion: `/login`
- Créez un compte admin depuis Supabase Auth
- Tableau de bord: `/admin`

## 🌐 Internationalisation

Le site supporte deux langues:
- 🇫🇷 Français (par défaut)
- 🇬🇧 English

## 📦 Scripts Disponibles

```bash
npm run dev           # Serveur de développement
npm run build         # Compiler pour la production
npm start             # Serveur de production
npm run lint          # Vérifier le code

# Migration des données
npx tsx scripts/migrate-to-supabase.ts
```

## 🚢 Déploiement

### Vercel (Recommandé)
1. Importez votre repository
2. Configurez les variables d'environnement
3. Déployez !

Voir [SETUP_GUIDE.md](./SETUP_GUIDE.md) pour les détails.

## 📱 Contact INSES

- 📍 Douala-Bonabéri, Cameroun
- 📧 contact@inses.cm
- 📞 +237 674 93 66 04
- 📠 9293 2000

---

© 2025 Institut Supérieur de l'Espoir (INSES). Tous droits réservés.
