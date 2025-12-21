# 🚀 Instructions de mise en place - INSES

## 📋 Résumé des améliorations

### 1. ✅ Correction du bug de soumission automatique
- Le formulaire ne s'envoie plus quand vous appuyez sur Entrée
- Appuyer sur Entrée passe maintenant à l'étape suivante
- La soumission ne se fait que sur la dernière étape

### 2. 🎨 Design amélioré du PDF d'inscription
Le PDF généré comprend maintenant:
- ✨ En-tête moderne avec logo et informations
- 📷 Cadre photo avec bordure élégante
- 📄 Numéro de dossier unique généré automatiquement
- 🎨 Sections colorées avec icônes
- 📋 Liste détaillée des documents à fournir
- 📞 Pied de page professionnel avec coordonnées complètes
- 📄 Numérotation des pages

### 3. 📚 Base de données des formations
Toutes vos formations ont été organisées dans un script SQL:
- **Filières Santé** (BTS, Licence, Master)
- **Commerce et Gestion** (BTS)
- **Filières Paramédicales** (CQP/AQP, DQP/AQP)

---

## 🔧 Étapes de configuration

### Étape 1: Configurer la base de données Supabase

#### A. Ajouter les colonnes manquantes à la table inscriptions

1. Ouvrez l'éditeur SQL Supabase:
   👉 https://supabase.com/dashboard/project/rpfwhgsltqpumqikkzxe/sql/new

2. Copiez le contenu du fichier **`add_missing_columns.sql`**

3. Collez dans l'éditeur SQL et cliquez sur **Run**

4. ✅ Vous devriez voir: "Success. No rows returned"

#### B. Créer et remplir la table formations

1. Dans le même éditeur SQL (ou nouvelle requête)

2. Copiez le contenu du fichier **`insert_formations.sql`**

3. Collez et exécutez avec **Run**

4. ✅ Vous devriez voir: "Success. 35 rows affected" (ou similaire)

---

## 🧪 Tester l'application

### 1. Vérifier que les formations s'affichent

```sql
-- Exécutez cette requête pour voir toutes les formations
SELECT title, category, subcategory, level_required, diploma_type
FROM public.formations
ORDER BY display_order;
```

### 2. Tester le formulaire d'inscription

1. Rechargez votre page d'inscription
2. Remplissez le formulaire étape par étape
3. Vérifiez que:
   - ✅ Les formations apparaissent dans le menu déroulant
   - ✅ Appuyer sur Entrée passe à l'étape suivante
   - ✅ Le formulaire ne se soumet que quand vous cliquez "Envoyer"
   - ✅ Un PDF professionnel est généré après soumission

### 3. Vérifier les données dans Supabase

Après avoir soumis une inscription:

1. Allez dans **Table Editor** → **inscriptions**
2. Vous devriez voir votre nouvelle inscription avec toutes les données

---

## 📁 Fichiers créés/modifiés

### Fichiers SQL créés:
1. ✅ `add_missing_columns.sql` - Ajoute les colonnes manquantes
2. ✅ `insert_formations.sql` - Insère toutes les formations
3. ✅ `check_current_schema.sql` - Pour vérifier le schéma actuel
4. ⚠️ `supabase_inscriptions_schema.sql` - (Ancien, utiliser add_missing_columns.sql à la place)

### Fichiers modifiés:
1. ✅ `app/inscription/page.tsx` - Améliorations du formulaire et du PDF

---

## 📊 Structure de la table formations

```sql
formations
├── id (UUID)
├── slug (TEXT) - Identifiant unique pour URL
├── title (TEXT) - Titre en français
├── title_en (TEXT) - Titre en anglais
├── category (TEXT) - Santé, Commerce et Gestion, Paramédical
├── subcategory (TEXT) - BTS/Licence, Master, CQP/AQP, etc.
├── level_required (TEXT) - BEPC, BAC, Licence, etc.
├── diploma_type (TEXT) - Type de diplôme délivré
├── is_active (BOOLEAN) - Formation active ou non
└── display_order (INTEGER) - Ordre d'affichage
```

---

## 🆘 En cas de problème

### Erreur "column does not exist"
➡️ Exécutez le fichier `add_missing_columns.sql`

### Erreur "trigger already exists"
➡️ Les triggers existent déjà, c'est normal. Continuez.

### Les formations n'apparaissent pas
➡️ Vérifiez que le script `insert_formations.sql` a bien été exécuté

### Le PDF ne se génère pas
➡️ Vérifiez la console du navigateur pour voir les erreurs

---

## 📞 Support

Pour toute question, vérifiez:
1. Les logs de la console du navigateur (F12)
2. Les erreurs dans Supabase SQL Editor
3. La structure de vos tables dans Table Editor

---

**Dernière mise à jour:** ${new Date().toLocaleDateString('fr-FR')}
**Version:** 1.0
