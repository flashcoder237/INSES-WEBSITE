# Configuration Brevo (ex-Sendinblue) pour INSES

Ce guide vous explique comment configurer Brevo pour l'envoi d'emails transactionnels sur le site INSES.

## 📋 Prérequis

- Un compte Brevo (gratuit jusqu'à 300 emails/jour)
- Accès aux variables d'environnement de votre projet

## 🚀 Étapes de configuration

### 1. Créer un compte Brevo

1. Aller sur [https://www.brevo.com](https://www.brevo.com)
2. Cliquer sur "Sign up" (gratuit)
3. Remplir le formulaire d'inscription
4. Vérifier votre email

### 2. Obtenir votre clé API

1. Se connecter à votre compte Brevo
2. Aller dans **Settings** (⚙️ en haut à droite)
3. Cliquer sur **SMTP & API**
4. Aller dans l'onglet **API Keys**
5. Cliquer sur **Generate a new API key**
6. Donner un nom à la clé (ex: "INSES Production")
7. **Copier la clé** (elle ne sera plus visible après)

### 3. Vérifier votre adresse d'expédition

**Important:** Vous devez vérifier votre adresse email d'expédition avant d'envoyer des emails.

1. Dans Brevo, aller dans **Settings**
2. Cliquer sur **Senders & IP**
3. Aller dans l'onglet **Senders**
4. Cliquer sur **Add a new sender**
5. Entrer votre email (ex: `noreply@univ-inses.com`)
6. Entrer le nom (ex: "INSES")
7. Vérifier l'email en cliquant sur le lien reçu

**Note:** Si vous utilisez un domaine personnalisé (recommandé), vous devrez aussi configurer les enregistrements DNS SPF et DKIM.

### 4. Configurer les variables d'environnement

#### Pour le développement local (.env.local)

Créer/modifier le fichier `.env.local` :

```env
BREVO_API_KEY=xkeysib-votre-cle-api-ici
BREVO_SENDER_EMAIL=noreply@univ-inses.com
```

#### Pour la production (Vercel, Netlify, etc.)

Ajouter les variables d'environnement dans votre plateforme de déploiement :

- **BREVO_API_KEY** : Votre clé API Brevo
- **BREVO_SENDER_EMAIL** : Votre email d'expédition vérifié

**Vercel :**
1. Aller dans Settings > Environment Variables
2. Ajouter `BREVO_API_KEY` et `BREVO_SENDER_EMAIL`
3. Redéployer

**Netlify :**
1. Aller dans Site settings > Environment variables
2. Ajouter les variables
3. Redéployer

### 5. Tester l'envoi d'emails

L'API est accessible via :
```
POST /api/send-inscription-email
```

Exemple de requête :
```json
{
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "status": "pending"
}
```

Statuts disponibles :
- `pending` : Demande reçue
- `approved` : Demande approuvée
- `rejected` : Demande rejetée

## 📊 Plan gratuit Brevo

Le plan gratuit inclut :
- ✅ **300 emails/jour**
- ✅ API complète
- ✅ Templates d'emails
- ✅ Statistiques détaillées
- ✅ Support par email

Pour INSES, cela devrait être largement suffisant pour commencer.

## 🎨 Personnalisation des emails

Les emails sont envoyés avec un template HTML professionnel aux couleurs d'INSES (#B22234).

Pour modifier le template, éditer le fichier :
```
app/api/send-inscription-email/route.ts
```

## 📈 Suivi des emails

Dans votre dashboard Brevo, vous pouvez :
- Voir tous les emails envoyés
- Consulter les taux d'ouverture
- Vérifier les taux de clic
- Gérer les bounces et désinscriptions

## 🔒 Sécurité

- ⚠️ **Ne jamais** commit votre clé API dans Git
- ⚠️ Utiliser les variables d'environnement
- ⚠️ Régénérer la clé si elle est compromise

## 🆘 Dépannage

### "Service d'envoi d'email non configuré"
→ Vérifier que `BREVO_API_KEY` est définie dans vos variables d'environnement

### "Sender email not verified"
→ Vous devez vérifier votre adresse email dans Brevo Settings > Senders

### Emails non reçus
→ Vérifier :
1. L'adresse email du destinataire est correcte
2. Votre domaine est vérifié (SPF/DKIM)
3. Les logs dans Brevo Dashboard > Logs

## 📚 Ressources

- [Documentation Brevo API](https://developers.brevo.com/)
- [Guide Node.js](https://developers.brevo.com/docs/send-a-transactional-email)
- [Support Brevo](https://help.brevo.com/)

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Compte Brevo créé
- [ ] Clé API générée
- [ ] Adresse email d'expédition vérifiée
- [ ] Variables d'environnement configurées
- [ ] Test d'envoi réussi
- [ ] Domaine vérifié (SPF/DKIM) pour meilleure délivrabilité

---

**Support :** Si vous rencontrez des problèmes, consultez les [docs officielles](https://developers.brevo.com/) ou contactez le support Brevo.
