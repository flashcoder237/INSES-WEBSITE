# 🚀 Configuration de l'authentification - Guide rapide

Suivez ces étapes pour activer l'authentification sur votre panneau d'administration INSES.

## ✅ Ce qui est déjà fait

Le système d'authentification est **déjà complètement implémenté** et prêt à l'emploi:

- ✅ Page de connexion (`/login`)
- ✅ Middleware de protection des routes `/admin`
- ✅ Layout admin avec vérification de session
- ✅ Navigation admin avec bouton de déconnexion
- ✅ Client Supabase configuré (client + serveur)

## 📋 Ce qu'il reste à faire (3 étapes simples)

### Étape 1: Créer votre compte admin (2 minutes)

1. **Ouvrez votre dashboard Supabase**
   - Allez sur: https://supabase.com/dashboard
   - Connectez-vous avec votre compte Supabase

2. **Sélectionnez votre projet INSES**
   - Cherchez le projet avec l'URL: `rpfwhgsltqpumqikkzxe.supabase.co`

3. **Créez l'utilisateur admin**
   - Cliquez sur **Authentication** dans le menu de gauche
   - Cliquez sur **Users**
   - Cliquez sur le bouton **Add user** (en haut à droite)
   - Sélectionnez **Create new user**

4. **Remplissez le formulaire**
   ```
   Email: admin@univ-inses.com
   (ou n'importe quel email que vous voulez utiliser)

   Password: [choisissez un mot de passe sécurisé]

   ☑️ Auto Confirm User (cochez cette case!)
   ```

5. **Créez l'utilisateur**
   - Cliquez sur **Create user**
   - ✅ Votre compte admin est créé!

6. **Notez vos identifiants** (important!)
   ```
   Email: admin@univ-inses.com
   Mot de passe: [votre mot de passe]
   ```

### Étape 2: Activer les politiques RLS (1 minute)

1. **Ouvrez l'éditeur SQL**
   - Dans votre projet Supabase
   - Cliquez sur **SQL Editor** dans le menu de gauche
   - Cliquez sur **New query**

2. **Copiez-collez le script**
   - Ouvrez le fichier: `supabase/enable-rls-with-auth.sql`
   - Copiez TOUT le contenu
   - Collez-le dans l'éditeur SQL de Supabase

3. **Exécutez le script**
   - Cliquez sur **Run** (ou Ctrl+Enter)
   - Attendez que le script se termine
   - Vous devriez voir des messages de confirmation

4. **Vérifiez les résultats**
   - Scrollez en bas des résultats
   - Vous devriez voir des tableaux listant:
     - Les tables avec RLS activé (`rowsecurity = true`)
     - Les politiques créées pour chaque table

### Étape 3: Configurer les politiques Storage (1 minute)

**IMPORTANT**: Cette étape est nécessaire pour pouvoir uploader et modifier les images!

1. **Dans le même éditeur SQL**
   - Créez une nouvelle requête (ou utilisez la même)

2. **Copiez-collez le script Storage**
   - Ouvrez le fichier: `supabase/fix-storage-policies.sql`
   - Copiez TOUT le contenu
   - Collez-le dans l'éditeur SQL

3. **Exécutez le script**
   - Cliquez sur **Run**
   - Le script configure les permissions pour le bucket `inses-images`

4. **Vérifiez**
   - Vous devriez voir 4 politiques créées:
     - Public can view images (SELECT)
     - Authenticated users can upload images (INSERT)
     - Authenticated users can update images (UPDATE)
     - Authenticated users can delete images (DELETE)

## 🎉 C'est terminé!

Votre système d'authentification est maintenant actif!

## 🧪 Test du système

### Test 1: Connexion

1. Démarrez votre serveur (si pas déjà fait):
   ```bash
   npm run dev
   ```

2. Allez sur: http://localhost:3000/admin
   - Vous devriez être **automatiquement redirigé** vers `/login`
   - ✅ Si oui, le middleware fonctionne!

3. Connectez-vous:
   - Entrez l'email: `admin@univ-inses.com`
   - Entrez le mot de passe que vous avez choisi
   - Cliquez sur **Se connecter**
   - Vous devriez être redirigé vers `/admin`
   - ✅ Si oui, l'authentification fonctionne!

### Test 2: Modification de données

1. Dans l'admin, allez sur **Actualités**
   - Cliquez sur une actualité
   - Modifiez quelque chose (titre, image, etc.)
   - Cliquez sur **Enregistrer**
   - ✅ Si ça sauvegarde sans erreur 403, RLS fonctionne!

2. Essayez aussi avec **Galerie**:
   - Cliquez sur **Galerie**
   - Essayez de télécharger une nouvelle image
   - ✅ Si ça fonctionne, tout est bon!

### Test 3: Déconnexion

1. Cliquez sur votre email en haut à droite
2. Cliquez sur **Déconnexion**
   - Vous devriez être redirigé vers `/login`
3. Essayez d'aller sur: http://localhost:3000/admin
   - Vous devriez être **automatiquement redirigé** vers `/login`
   - ✅ Si oui, la protection fonctionne!

## ❌ Dépannage

### "Invalid login credentials"

**Problème**: Email ou mot de passe incorrect

**Solution**:
1. Vérifiez que vous utilisez le bon email
2. Vérifiez que vous utilisez le bon mot de passe
3. Si besoin, retournez dans Supabase Dashboard > Authentication > Users
4. Supprimez l'ancien utilisateur et créez-en un nouveau

### "new row violates row-level security policy" (erreur 403)

**Problème**: Le script RLS n'a pas été exécuté ou a échoué

**Solution**:
1. Retournez dans Supabase SQL Editor
2. Ré-exécutez le script `enable-rls-with-auth.sql`
3. Vérifiez qu'il n'y a pas d'erreurs dans les résultats
4. Déconnectez-vous puis reconnectez-vous dans l'admin

### Redirection infinie /login ↔ /admin

**Problème**: Cookies ou session corrompue

**Solution**:
1. Effacez les cookies de votre navigateur pour localhost
2. Fermez tous les onglets
3. Redémarrez le serveur (`npm run dev`)
4. Reconnectez-vous

### "Failed to fetch" ou erreurs réseau

**Problème**: Le serveur Next.js n'est pas démarré ou URL Supabase incorrecte

**Solution**:
1. Vérifiez que `npm run dev` tourne
2. Vérifiez votre fichier `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://rpfwhgsltqpumqikkzxe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[votre clé]
   ```
3. Redémarrez le serveur après modification du `.env.local`

## 📚 Documentation complète

Pour plus de détails, consultez:
- `GUIDE-AUTHENTICATION.md` - Guide complet du système d'authentification
- `GUIDE-STORAGE.md` - Guide pour le stockage des images

## 🆘 Besoin d'aide?

Si vous rencontrez des problèmes:

1. **Vérifiez les logs**:
   - Console navigateur (F12)
   - Terminal du serveur Next.js
   - Supabase Dashboard > Logs

2. **Vérifiez les variables d'environnement**:
   ```bash
   cat .env.local
   ```

3. **Vérifiez la configuration Supabase**:
   - URL correcte
   - Clé anon correcte
   - Utilisateur créé

4. **Réinitialisez tout**:
   ```bash
   # Arrêtez le serveur
   # Supprimez les cookies
   # Redémarrez
   npm run dev
   ```

## ✨ Prochaines étapes

Maintenant que l'authentification est active:

1. **Uploadez vos images** dans Supabase Storage (`inses-images` bucket)
2. **Exécutez les scripts de données**:
   - `insert-gallery-data.sql`
   - `insert-formations.sql`
   - `insert-news.sql`
3. **Personnalisez le contenu** via l'admin
4. **Ajoutez d'autres administrateurs** si nécessaire

**Bon travail! 🎉**
