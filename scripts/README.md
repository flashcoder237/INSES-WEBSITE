# Scripts de migration INSES

## Migration vers Supabase

Ce dossier contient les scripts pour migrer les données statiques vers Supabase.

### Prérequis

1. **Créer un projet Supabase** sur [supabase.com](https://supabase.com)
2. **Configurer les variables d'environnement** dans `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
   SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
   ```

3. **Installer tsx** pour exécuter TypeScript:
   ```bash
   npm install -D tsx
   ```

### Étapes de migration

#### 1. Créer la structure de base de données

Allez dans votre projet Supabase > SQL Editor et exécutez le fichier `supabase/schema.sql`.

Ce script va créer:
- ✅ Toutes les tables nécessaires
- ✅ Les indexes pour optimiser les requêtes
- ✅ Les triggers pour updated_at automatique
- ✅ Les policies RLS (Row Level Security)
- ✅ Les données par défaut

#### 2. Exécuter la migration des données

```bash
npx tsx scripts/migrate-to-supabase.ts
```

Ce script va:
- ✅ Migrer les informations du site (contact, réseaux sociaux)
- ✅ Migrer les 6 formations avec traductions FR/EN
- ✅ Migrer les compétences et débouchés de chaque formation
- ✅ Migrer les informations "À propos" (mission, vision, pédagogie)
- ✅ Migrer les valeurs et partenaires
- ✅ Migrer les statistiques
- ✅ Migrer les actualités avec traductions FR/EN

#### 3. Vérifier les données

Allez dans votre dashboard Supabase > Table Editor et vérifiez que toutes les données ont été importées correctement.

### En cas d'erreur

Si la migration échoue:

1. **Vérifiez vos variables d'environnement**
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Vérifiez que le schema.sql a été exécuté** dans Supabase

3. **Consultez les logs d'erreur** affichés dans le terminal

4. **Vous pouvez réexécuter le script** - il supprimera les données existantes avant de réinsérer

### Conseils

- 💡 Le script peut être réexécuté sans problème
- 💡 Les données existantes seront supprimées avant insertion
- 💡 Les traductions EN manquantes utilisent le texte FR par défaut (à compléter plus tard)
- 💡 N'oubliez pas d'activer RLS dans Supabase pour la sécurité

### Support

En cas de problème, consultez:
- [Documentation Supabase](https://supabase.com/docs)
- [Guide Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
