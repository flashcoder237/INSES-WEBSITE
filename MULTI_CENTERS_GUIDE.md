# Guide Multi-Centres - INSES + CEPRES

Ce guide explique comment configurer et utiliser le système multi-centres qui permet de gérer à la fois INSES et CEPRES sur le même site.

---

## 🎯 Vue d'ensemble

Le site supporte maintenant **plusieurs centres de formation** :
- **INSES** : Institut Supérieur de l'Espoir (formations paramédicales)
- **CEPRES** : Centre de Formation Professionnelle de l'Espoir (formations professionnelles)

Chaque centre a :
- ✅ Son propre logo et identité visuelle (couleurs)
- ✅ Ses propres formations
- ✅ Ses propres statistiques
- ✅ Ses propres valeurs et partenaires
- ✅ Ses coordonnées de contact

---

## 📋 Étapes de Configuration

### Étape 1: Appliquer le nouveau schéma de base de données

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Exécutez le fichier `supabase/schema-with-centers.sql`

Ce script va :
- ✅ Créer la table `centers`
- ✅ Créer les tables `center_info`, `center_values`, `center_partners`, `center_stats`
- ✅ Ajouter la colonne `center_id` à la table `formations`
- ✅ Insérer INSES et CEPRES dans la table `centers`
- ✅ Migrer automatiquement les données existantes vers INSES

### Étape 2: Vérifier les données

Allez dans **Table Editor** et vérifiez :
- ✅ Table `centers` → 2 lignes (INSES et CEPRES)
- ✅ Table `formations` → Toutes les formations ont `center_id` et `center_slug` = 'inses'

### Étape 3: Ajouter des formations pour CEPRES

Vous pouvez maintenant ajouter des formations pour CEPRES via le panel admin :

1. Allez sur `/admin/formations`
2. Cliquez sur "Nouvelle formation"
3. Sélectionnez **Centre: CEPRES**
4. Remplissez les informations

---

## 🌐 Architecture du site

### Structure des URLs

```
/centers                    → Page de sélection des centres
/inses                      → Page d'accueil INSES
/inses/formations          → Liste des formations INSES
/inses/formations/[slug]   → Détail formation INSES
/inses/inscription         → Formulaire inscription INSES
/cepres                    → Page d'accueil CEPRES
/cepres/formations         → Liste des formations CEPRES
/cepres/formations/[slug]  → Détail formation CEPRES
/cepres/inscription        → Formulaire inscription CEPRES
```

### Navigation

La page d'accueil `/` peut rediriger vers `/centers` pour afficher les deux centres, ou directement vers `/inses` si vous voulez garder INSES comme page principale.

---

## 🎨 Personnalisation des centres

### Couleurs

Chaque centre a ses propres couleurs définies dans la base de données :

**INSES :**
- Couleur primaire : `#DC2626` (rouge)
- Couleur secondaire : `#991B1B` (rouge foncé)

**CEPRES :**
- Couleur primaire : `#3B82F6` (bleu)
- Couleur secondaire : `#1E40AF` (bleu foncé)

Ces couleurs sont appliquées automatiquement sur :
- Les boutons
- Les bordures
- Les badges
- Les icônes

### Logos

Placez les logos dans :
- `/public/images/logo-inses.png`
- `/public/images/logo-cepres.png`

Puis mettez à jour les chemins dans la table `centers` via le panel admin.

---

## 🔧 Panel d'Administration

### Gérer les centres

1. Allez sur `/admin/centers`
2. Vous pouvez :
   - ✏️ Modifier les informations (nom, couleurs, coordonnées)
   - 👁️ Activer/désactiver un centre
   - ➕ Ajouter un nouveau centre
   - 🗑️ Supprimer un centre

### Gérer les formations par centre

Lorsque vous créez ou modifiez une formation, vous devez sélectionner le centre associé (INSES ou CEPRES).

### Statistiques par centre

Chaque centre peut avoir ses propres statistiques :
- Nombre d'étudiants
- Taux de réussite
- Années d'expérience
- etc.

Ces stats s'affichent sur la page d'accueil du centre.

---

## 📊 Base de Données

### Nouvelle table: centers

```sql
id                UUID (PK)
slug              VARCHAR(100) UNIQUE (ex: 'inses', 'cepres')
name_fr           VARCHAR(255) (ex: 'INSES')
name_en           VARCHAR(255) (ex: 'INSES')
full_name_fr      VARCHAR(255) (ex: 'Institut Supérieur de l\'Espoir')
full_name_en      VARCHAR(255) (ex: 'Higher Institute of Hope')
description_fr    TEXT
description_en    TEXT
logo              VARCHAR(255) (chemin du logo)
primary_color     VARCHAR(20) (ex: '#DC2626')
secondary_color   VARCHAR(20) (ex: '#991B1B')
location          VARCHAR(255)
email             VARCHAR(255)
phone             VARCHAR(50)
whatsapp          VARCHAR(50)
is_active         BOOLEAN
display_order     INTEGER
```

### Table formations (modifiée)

Ajout des colonnes :
```sql
center_id         UUID (FK vers centers)
center_slug       VARCHAR(100) (ex: 'inses', 'cepres')
```

### Nouvelles tables par centre

- **center_info** : Mission, vision, historique par centre
- **center_values** : Valeurs de chaque centre
- **center_partners** : Partenaires par centre
- **center_stats** : Statistiques par centre

---

## 🚀 Exemples de formations CEPRES

Voici des exemples de formations professionnelles pour CEPRES :

### Métiers Techniques
- **Électricité Bâtiment** (Durée: 1 an)
- **Plomberie et Installation Sanitaire** (Durée: 1 an)
- **Maçonnerie** (Durée: 1 an)
- **Menuiserie** (Durée: 1 an)
- **Soudure** (Durée: 6 mois)

### Métiers Tertiaires
- **Secrétariat Bureautique** (Durée: 1 an)
- **Comptabilité de Gestion** (Durée: 1 an)
- **Informatique de Gestion** (Durée: 1 an)
- **Marketing et Vente** (Durée: 1 an)

### Métiers de Service
- **Coiffure et Esthétique** (Durée: 1 an)
- **Cuisine et Pâtisserie** (Durée: 1 an)
- **Hôtellerie et Restauration** (Durée: 1 an)

Ajoutez ces formations via `/admin/formations` en sélectionnant **CEPRES** comme centre.

---

## 💡 Conseils

### Logo CEPRES

Si vous n'avez pas encore le logo CEPRES :
1. Créez un logo avec les couleurs bleu (#3B82F6)
2. Format recommandé : PNG avec fond transparent
3. Dimensions : 500x500px minimum
4. Placez-le dans `/public/images/logo-cepres.png`

### Page d'accueil

Vous avez deux options :

**Option 1 : Page de sélection**
- Modifiez `/app/page.tsx` pour afficher les deux centres
- Les utilisateurs choisissent INSES ou CEPRES

**Option 2 : INSES comme principal**
- Gardez `/` pour INSES
- Ajoutez un lien "CEPRES" dans la navbar
- Les utilisateurs peuvent passer de l'un à l'autre

### Navbar

Modifiez la navbar pour ajouter :
- Lien vers `/centers` (voir tous les centres)
- Dropdown pour basculer entre INSES et CEPRES
- Indicateur visuel du centre actuel

---

## 🔄 Migration des données existantes

Le script `schema-with-centers.sql` migre automatiquement :
- ✅ Toutes les formations existantes → INSES
- ✅ Les valeurs (about_values) → center_values pour INSES
- ✅ Les partenaires (partners) → center_partners pour INSES
- ✅ Les statistiques (stats) → center_stats pour INSES

Vos données existantes sont préservées !

---

## ❓ Questions Fréquentes

**Q: Puis-je ajouter d'autres centres (ex: CEPRES 2, INSES Yaoundé) ?**
R: Oui ! Utilisez `/admin/centers` pour ajouter autant de centres que vous voulez.

**Q: Une formation peut-elle appartenir à plusieurs centres ?**
R: Non, chaque formation appartient à un seul centre. Si nécessaire, dupliquez la formation.

**Q: Comment désactiver un centre temporairement ?**
R: Allez sur `/admin/centers` et cliquez sur le badge "Actif" pour le désactiver.

**Q: Les anciennes URLs (/formations/xxx) fonctionnent-elles encore ?**
R: Oui ! Vous pouvez garder les anciennes URLs pour la compatibilité.

---

## 🆘 Support

En cas de problème :
1. Vérifiez que le schéma multi-centres a bien été appliqué
2. Vérifiez que les formations ont un `center_id` et `center_slug`
3. Consultez les logs de la console navigateur (F12)
4. Vérifiez les policies RLS dans Supabase

---

Félicitations ! Votre site supporte maintenant plusieurs centres de formation ! 🎓🔧
