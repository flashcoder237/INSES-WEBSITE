# Guide d'authentification INSES

Ce guide explique le système d'authentification mis en place pour le panneau d'administration INSES.

## 🔐 Vue d'ensemble

Le système utilise **Supabase Auth** pour sécuriser l'accès au panneau d'administration. Tous les fichiers nécessaires sont déjà en place et fonctionnels.

## 📁 Architecture

### 1. Client Supabase (`lib/supabase/`)

- **`client.ts`** - Client côté navigateur pour les composants React
- **`server.ts`** - Client côté serveur pour les Server Components
- **`middleware.ts`** - Logique de rafraîchissement de session et protection des routes

### 2. Middleware d'authentification (`middleware.ts`)

Le middleware protège automatiquement toutes les routes `/admin/*`:

```typescript
// Si l'utilisateur n'est pas authentifié et tente d'accéder à /admin
// → Redirection automatique vers /login
```

### 3. Page de connexion (`app/login/page.tsx`)

Interface de connexion avec:
- Formulaire email/mot de passe
- Gestion des erreurs
- Redirection vers `/admin` après connexion réussie

### 4. Layout Admin (`app/admin/layout.tsx`)

- Vérifie l'authentification côté serveur
- Redirige vers `/login` si non authentifié
- Passe les données utilisateur au composant `AdminNav`

### 5. Navigation Admin (`components/admin/AdminNav.tsx`)

- Affiche l'email de l'utilisateur connecté
- Bouton de déconnexion fonctionnel
- Navigation complète du panneau d'administration

## 🚀 Configuration initiale

### Étape 1: Créer un utilisateur admin

1. Allez dans votre dashboard Supabase: https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **Users**
4. Cliquez sur **Add user** > **Create new user**
5. Renseignez:
   - **Email**: `admin@univ-inses.com` (ou votre email)
   - **Password**: Choisissez un mot de passe sécurisé
   - Cochez **Auto Confirm User** pour éviter la vérification email
6. Cliquez sur **Create user**

### Étape 2: Réactiver RLS avec authentification

Exécutez le script SQL dans l'éditeur SQL de Supabase:

```bash
supabase/enable-rls-with-auth.sql
```

Ce script:
- ✅ Réactive RLS sur toutes les tables
- ✅ Crée des politiques pour la lecture publique
- ✅ Crée des politiques pour la gestion par utilisateurs authentifiés
- ✅ Vérifie que tout est correctement configuré

### Étape 3: Tester l'authentification

1. **Démarrer le serveur de développement** (si pas déjà fait):
   ```bash
   npm run dev
   ```

2. **Accéder à l'admin**:
   - Allez sur: http://localhost:3000/admin
   - Vous devriez être automatiquement redirigé vers `/login`

3. **Se connecter**:
   - Entrez l'email et le mot de passe créés à l'étape 1
   - Cliquez sur "Se connecter"
   - Vous devriez être redirigé vers `/admin`

4. **Tester les opérations CRUD**:
   - Modifier une actualité
   - Ajouter une photo à la galerie
   - Toutes les opérations devraient fonctionner sans erreur 403

5. **Tester la déconnexion**:
   - Cliquez sur votre email en haut à droite
   - Cliquez sur "Déconnexion"
   - Vous devriez être redirigé vers `/login`
   - Essayez d'accéder à `/admin` → Vous devriez être redirigé vers `/login`

## 🔒 Politiques RLS configurées

### Tables publiques en lecture

- **News**: Lecture publique des actualités publiées (`is_published = true`)
- **Formations**: Lecture publique des formations actives (`is_active = true`)
- **Gallery**: Lecture publique de toutes les images
- **Videos**: Lecture publique de toutes les vidéos
- **Formation Skills**: Lecture publique
- **Formation Careers**: Lecture publique

### Gestion réservée aux utilisateurs authentifiés

Toutes les opérations CRUD (Create, Read, Update, Delete) sur toutes les tables sont réservées aux utilisateurs authentifiés via Supabase Auth.

### Cas spéciaux

- **Contacts**: Insertion publique (formulaire de contact) + gestion admin
- **Inscriptions**: Insertion publique (formulaire d'inscription) + gestion admin

## 🛡️ Sécurité

### Protection en profondeur

1. **Middleware Next.js**: Bloque l'accès aux routes `/admin` avant même d'atteindre la page
2. **Server Components**: Vérification côté serveur dans le layout admin
3. **RLS Supabase**: Protection au niveau de la base de données
4. **Client Components**: Les composants admin utilisent le client authentifié

### Flux d'authentification

```
Utilisateur → /admin
    ↓
Middleware vérifie la session
    ↓
Session valide?
    ├─ Non → Redirection /login
    └─ Oui → Continue
         ↓
    Layout Admin vérifie le user
         ↓
    User authentifié?
         ├─ Non → Redirection /login
         └─ Oui → Affiche l'admin
```

## 🔧 Dépannage

### Erreur: "new row violates row-level security policy"

**Cause**: RLS est activé mais vous n'êtes pas authentifié

**Solution**:
1. Vérifiez que vous êtes connecté (email visible en haut à droite)
2. Si oui, déconnectez-vous puis reconnectez-vous
3. Vérifiez que le script `enable-rls-with-auth.sql` a bien été exécuté

### Erreur: "Invalid login credentials"

**Cause**: Email ou mot de passe incorrect

**Solution**:
1. Vérifiez l'email et le mot de passe dans Supabase Dashboard
2. Si nécessaire, réinitialisez le mot de passe ou créez un nouvel utilisateur

### Redirection infinie entre /login et /admin

**Cause**: Problème de session ou de cookies

**Solution**:
1. Effacez les cookies de votre navigateur
2. Redémarrez le serveur de développement
3. Reconnectez-vous

### Les modifications ne sont pas sauvegardées

**Cause**: Politiques RLS trop restrictives ou session expirée

**Solution**:
1. Vérifiez que vous êtes toujours connecté
2. Consultez les logs de la console navigateur pour voir les erreurs Supabase
3. Vérifiez les politiques dans Supabase Dashboard > Database > Policies

## 📊 Monitoring

### Vérifier les sessions actives

Dans Supabase Dashboard:
1. **Authentication** > **Users**
2. Cliquez sur votre utilisateur
3. Consultez l'historique de connexion

### Vérifier les politiques RLS

Dans l'éditeur SQL:
```sql
SELECT
    tablename,
    policyname,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Logs d'authentification

Les erreurs d'authentification apparaissent dans:
- Console navigateur (F12)
- Terminal du serveur Next.js
- Supabase Dashboard > Logs

## 🎯 Bonnes pratiques

1. **Mots de passe**: Utilisez des mots de passe forts et uniques
2. **Environnement**: Ne commitez jamais les variables d'environnement (`.env.local`)
3. **Sessions**: Les sessions Supabase expirent automatiquement après un certain temps
4. **Backup**: Gardez une copie de votre mot de passe admin en lieu sûr
5. **Production**: En production, activez la vérification email et 2FA si possible

## 📝 Ajouter d'autres administrateurs

Pour ajouter un nouvel administrateur:

1. Dans Supabase Dashboard > Authentication > Users
2. Créez un nouvel utilisateur
3. Le nouvel utilisateur pourra se connecter avec ses identifiants
4. Tous les utilisateurs authentifiés ont les mêmes droits (admin complet)

## 🔄 Révoquer l'accès

Pour révoquer l'accès d'un administrateur:

1. Dans Supabase Dashboard > Authentication > Users
2. Trouvez l'utilisateur
3. Cliquez sur les trois points (...)
4. Sélectionnez "Delete user"

L'utilisateur sera immédiatement déconnecté et ne pourra plus se reconnecter.

## 🎓 Ressources

- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
