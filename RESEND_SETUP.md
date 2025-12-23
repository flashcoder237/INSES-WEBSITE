# Configuration de Resend pour l'envoi d'emails

## ✅ Installation terminée

Resend a été installé avec succès dans votre projet.

## 📋 Étapes pour activer l'envoi d'emails

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Cliquez sur "Sign Up" (Inscription)
3. Créez votre compte (gratuit jusqu'à 3,000 emails/mois)

### 2. Obtenir votre clé API

1. Connectez-vous à votre compte Resend
2. Allez dans **API Keys** dans le menu
3. Cliquez sur **Create API Key**
4. Donnez-lui un nom (ex: "INSES Production")
5. Copiez la clé (elle commence par `re_`)

### 3. Configurer votre projet

1. Créez un fichier `.env.local` à la racine du projet:
   ```bash
   cp .env.local.example .env.local
   ```

2. Ouvrez `.env.local` et ajoutez votre clé API:
   ```env
   RESEND_API_KEY=re_votre_cle_api_ici
   ```

3. **Important**: Ne partagez jamais ce fichier (il est déjà dans .gitignore)

### 4. Tester l'envoi d'emails

1. Redémarrez votre serveur de développement:
   ```bash
   npm run dev
   ```

2. Allez dans l'admin des inscriptions
3. Approuvez une inscription
4. Cliquez sur "Notifier"
5. L'email sera envoyé !

### 5. Configurer votre domaine (Optionnel mais recommandé)

**Par défaut**, les emails sont envoyés depuis `onboarding@resend.dev`

**Pour utiliser votre propre domaine** (ex: `noreply@univ-inses.com`):

1. Dans Resend, allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine: `univ-inses.com`
4. Suivez les instructions pour ajouter les enregistrements DNS
5. Une fois vérifié, modifiez le fichier `/app/api/send-inscription-email/route.ts`:
   ```typescript
   from: 'INSES <noreply@univ-inses.com>', // Au lieu de onboarding@resend.dev
   ```

## 📧 Messages d'emails configurés

Le système envoie automatiquement:

### ✅ Inscription approuvée
```
Objet: Demande d'inscription approuvée - INSES

Bonjour [Prénom] [Nom],

Nous avons le plaisir de vous informer que votre demande
d'inscription à l'INSES a été approuvée.

Nous vous contacterons prochainement pour finaliser votre
inscription et vous fournir les informations nécessaires
pour le début de votre formation.

Cordialement,
L'équipe INSES
```

### ❌ Inscription rejetée
```
Objet: Demande d'inscription - INSES

Bonjour [Prénom] [Nom],

Nous vous remercions de l'intérêt que vous portez à l'INSES.

Malheureusement, nous ne pouvons pas donner suite à votre
demande d'inscription pour le moment.

Nous vous encourageons à postuler à nouveau lors de nos
prochaines sessions d'admission.

Cordialement,
L'équipe INSES
```

### ⏳ Inscription en attente
```
Objet: Demande d'inscription reçue - INSES

Bonjour [Prénom] [Nom],

Nous avons bien reçu votre demande d'inscription à l'INSES.

Votre dossier est actuellement en cours d'examen.
Nous vous contacterons dans les plus brefs délais.

Cordialement,
L'équipe INSES
```

## 🔍 Monitoring des emails

Dans votre dashboard Resend, vous pouvez:
- Voir tous les emails envoyés
- Vérifier leur statut (delivered, bounced, etc.)
- Consulter les statistiques
- Gérer les webhooks pour les notifications

## 🆘 Dépannage

### L'email n'est pas envoyé
1. Vérifiez que `RESEND_API_KEY` est bien dans `.env.local`
2. Redémarrez le serveur après avoir modifié `.env.local`
3. Vérifiez la console pour les erreurs

### Erreur "Service d'envoi d'email non configuré"
- La clé API n'est pas configurée
- Suivez l'étape 3 ci-dessus

### Les emails vont dans les spams
- Configurez votre propre domaine (étape 5)
- Ajoutez les enregistrements SPF et DKIM
- Resend gère DMARC automatiquement

## 📊 Limites du plan gratuit

- **3,000 emails/mois** (gratuit à vie)
- 100 emails/jour
- Support par email

Pour augmenter ces limites, passez au plan Pro sur Resend.

## 🔗 Liens utiles

- [Documentation Resend](https://resend.com/docs)
- [Dashboard Resend](https://resend.com/emails)
- [Statut de Resend](https://status.resend.com)

---

**🎉 Vous êtes prêt !** Une fois la clé API configurée, vos emails seront envoyés automatiquement.
