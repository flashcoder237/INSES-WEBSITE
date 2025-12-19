# Guide du Contenu Dynamique - Tout le texte éditable

Ce guide explique le nouveau système de gestion de contenu textuel où **TOUT le texte du site** peut être modifié depuis le panel d'administration.

---

## 🎯 Vue d'ensemble

### Avant vs Après

**AVANT (textes hardcodés) :**
```jsx
<h1>Bienvenue à l'INSES</h1>
<button>En savoir plus</button>
```

**APRÈS (textes dynamiques) :**
```jsx
const { t } = useSiteContent()
<h1>{t('home.hero.title')}</h1>
<button>{t('common.learnMore')}</button>
```

✅ **Résultat** : L'admin peut modifier "Bienvenue à l'INSES" et "En savoir plus" directement depuis `/admin/content`

---

## 📋 Configuration

### Étape 1: Appliquer le schéma (5 min)

```bash
# 1. Connectez-vous à Supabase
# 2. SQL Editor
# 3. Exécutez: supabase/schema-site-content.sql
```

Ce script crée :
- ✅ Table `site_content` avec ~150 textes pré-remplis
- ✅ Textes en FR/EN pour tout le site
- ✅ Organisation par catégories

### Étape 2: Vérifier l'installation

1. Allez dans Supabase → Table Editor → `site_content`
2. Vous devriez voir environ 150 lignes
3. Chaque ligne a : `key`, `content_fr`, `content_en`, `category`

---

## 🎨 Utilisation dans le Code

### Exemple basique

```tsx
import { useSiteContent } from '@/hooks/useSiteContent'

export default function MyComponent() {
  const { t } = useSiteContent()

  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.subtitle')}</p>
      <button>{t('common.learnMore')}</button>
    </div>
  )
}
```

### Avec fallback

```tsx
// Si la clé n'existe pas, affiche le fallback
<h1>{t('custom.title', 'Titre par défaut')}</h1>
```

### Par catégorie (optimisé)

```tsx
import { useSiteContentByCategory } from '@/hooks/useSiteContent'

export default function ContactPage() {
  const { content, loading } = useSiteContentByCategory('contact')

  if (loading) return <div>Chargement...</div>

  return (
    <div>
      <h1>{content['contact.hero.title']}</h1>
      <p>{content['contact.hero.subtitle']}</p>
    </div>
  )
}
```

---

## 🗂️ Organisation du Contenu

### Structure des clés

Format : `category.section.element`

**Exemples :**
- `home.hero.title` → Titre du hero sur la page d'accueil
- `nav.about` → Lien "À Propos" dans la navigation
- `common.learnMore` → Bouton "En savoir plus" (utilisé partout)
- `footer.copyright` → Texte copyright dans le footer

### Catégories disponibles

| Catégorie | Description | Exemples de clés |
|-----------|-------------|------------------|
| `navigation` | Menu et liens nav | `nav.home`, `nav.contact` |
| `common` | Textes réutilisés | `common.learnMore`, `common.enroll` |
| `home` | Page d'accueil | `home.hero.title`, `home.stats.title` |
| `formations` | Page formations | `formations.hero.title`, `formations.filter.all` |
| `formationDetail` | Détail formation | `formationDetail.skills.title` |
| `about` | Page à propos | `about.mission.title`, `about.vision.title` |
| `news` | Page actualités | `news.hero.title`, `news.filter.event` |
| `contact` | Page contact | `contact.form.title`, `contact.form.name` |
| `inscription` | Page inscription | `inscription.form.title` |
| `centers` | Page centres | `centers.hero.title` |
| `footer` | Pied de page | `footer.copyright`, `footer.followUs` |
| `admin` | Interface admin | `admin.save`, `admin.delete` |

---

## 🔧 Panel d'Administration

### Accéder à l'éditeur

1. Allez sur `/admin/content`
2. Vous verrez tous les textes du site

### Modifier un texte

1. **Rechercher** : Utilisez la barre de recherche pour trouver un texte
2. **Filtrer** : Filtrez par catégorie (home, contact, etc.)
3. **Modifier** : Cliquez sur "Modifier"
4. **Éditer** :
   - 🇫🇷 Modifiez le texte français
   - 🇬🇧 Modifiez le texte anglais
   - 📝 Ajoutez une description (pour vous aider)
5. **Enregistrer** : Cliquez sur "Enregistrer"

### Recherche intelligente

La recherche fonctionne sur :
- ✅ La clé (`home.hero.title`)
- ✅ Le contenu français
- ✅ Le contenu anglais
- ✅ La description

**Exemple :** Recherchez "accueil" pour trouver tous les textes de la page d'accueil

---

## 📝 Ajouter du Nouveau Contenu

### Via SQL (recommandé)

```sql
INSERT INTO site_content (key, category, section, content_fr, content_en, description)
VALUES (
  'custom.myText',
  'custom',
  'mySection',
  'Mon texte en français',
  'My text in English',
  'Description de mon texte'
);
```

### Via l'interface admin (futur)

Une interface pour ajouter de nouveaux textes sera ajoutée plus tard.

---

## 🌐 Système Bilingue

### Fonctionnement

Le hook `useSiteContent()` utilise automatiquement la langue active du site :

```tsx
const { locale } = useI18n() // 'fr' ou 'en'
const { t } = useSiteContent()

// Si locale = 'fr' → affiche content_fr
// Si locale = 'en' → affiche content_en
```

### Changer la langue

Le bouton de langue dans la navbar change automatiquement tous les textes :
- 🇫🇷 Français → Affiche tous les `content_fr`
- 🇬🇧 English → Affiche tous les `content_en`

---

## ⚡ Performance et Cache

### Système de cache

Le contenu est mis en cache pendant **5 minutes** pour éviter trop de requêtes à Supabase.

### Rafraîchir le cache

```tsx
import { refreshSiteContentCache } from '@/hooks/useSiteContent'

// Forcer le rechargement
refreshSiteContentCache()
```

---

## 📦 Contenu Pré-installé

Le schéma SQL installe automatiquement **~150 textes** pour :

### Navigation (8 textes)
- Accueil, À Propos, Formations, Actualités, Galerie, Contact, Inscription, Centres

### Common (13 textes)
- Boutons : En savoir plus, Lire la suite, S'inscrire, Contact, etc.
- Labels : Durée, Niveau, Compétences, Débouchés, etc.

### Pages principales
- **Home** : 10 textes (hero, formations, valeurs, stats, CTA)
- **Formations** : 6 textes (hero, filtres, messages)
- **Formation Detail** : 7 textes (vue d'ensemble, compétences, débouchés)
- **About** : 9 textes (mission, vision, valeurs, pédagogie, partenaires)
- **News** : 8 textes (hero, filtres, détail)
- **Contact** : 12 textes (hero, formulaire, messages)
- **Inscription** : 11 textes (hero, formulaire, messages)
- **Centers** : 9 textes (hero, pourquoi nous choisir)

### Footer (6 textes)
- Sections, copyright, réseaux sociaux

### Admin (9 textes)
- Boutons d'action, navigation

---

## 🎯 Cas d'Usage

### Modifier le titre de la page d'accueil

1. `/admin/content`
2. Recherchez "home.hero.title"
3. Modifiez :
   - FR : "Bienvenue à INSES"
   - EN : "Welcome to INSES"
4. Enregistrer

### Changer "En savoir plus" partout

1. `/admin/content`
2. Recherchez "common.learnMore"
3. Modifiez le texte
4. Le changement s'applique **partout** où ce bouton apparaît

### Personnaliser les textes pour CEPRES

Vous pouvez créer des textes spécifiques :
```sql
INSERT INTO site_content (key, category, content_fr, content_en)
VALUES (
  'cepres.hero.title',
  'centers',
  'Bienvenue au CEPRES',
  'Welcome to CEPRES'
);
```

---

## ✅ Avantages

### Pour les développeurs
- ✅ Code propre et maintenable
- ✅ Pas de textes hardcodés
- ✅ Facile à réutiliser (`common.*`)
- ✅ Type-safe avec TypeScript

### Pour les admins
- ✅ Modifier n'importe quel texte en 2 clics
- ✅ Pas besoin de toucher au code
- ✅ Recherche et filtres puissants
- ✅ Gestion bilingue simplifiée

### Pour le site
- ✅ Contenu 100% dynamique
- ✅ Multilingue natif
- ✅ Performance optimisée (cache)
- ✅ SEO-friendly

---

## 🔄 Migration des Anciens Textes

### Remplacer l'ancien système

**Avant (hardcodé) :**
```tsx
<h1>Nos Formations</h1>
```

**Après (dynamique) :**
```tsx
const { t } = useSiteContent()
<h1>{t('formations.hero.title')}</h1>
```

### Remplacer l'ancien `t()` du I18nProvider

L'ancien système avec `useI18n().t()` peut être progressivement remplacé par `useSiteContent().t()`.

---

## 🆘 Dépannage

### Le texte ne s'affiche pas

1. Vérifiez que la clé existe dans `site_content`
2. Vérifiez que `is_active = true`
3. Vérifiez l'orthographe de la clé
4. Rafraîchissez le cache : `refreshSiteContentCache()`

### Le changement ne s'applique pas

1. Attendez 5 minutes (durée du cache)
2. Ou rafraîchissez la page (Ctrl+R)
3. Ou videz le cache du navigateur

### Texte en mauvaise langue

Vérifiez que les deux colonnes `content_fr` et `content_en` sont remplies.

---

## 📚 Référence API

### `useSiteContent()`

```tsx
const { t, content, loading } = useSiteContent()

// t(key, fallback?) → string
// content → { [key: string]: string }
// loading → boolean
```

### `useSiteContentByCategory(category)`

```tsx
const { content, loading } = useSiteContentByCategory('home')

// content → { [key: string]: string }
// loading → boolean
```

### `refreshSiteContentCache()`

```tsx
refreshSiteContentCache() // Vide le cache
```

---

## 🎉 Résultat Final

Avec ce système :

✅ **TOUT le texte du site est éditable** depuis `/admin/content`
✅ **Bilingue natif** (FR/EN)
✅ **Recherche et filtres** puissants
✅ **Performance optimisée** avec cache
✅ **Code propre** sans textes hardcodés
✅ **Admin-friendly** : pas besoin de toucher au code

Plus aucun texte n'est hardcodé. Tout est dynamique ! 🚀
