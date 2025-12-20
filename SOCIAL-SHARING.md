# 🔗 Partage sur les Réseaux Sociaux avec Prévisualisation

Ce guide explique le système de prévisualisation d'images pour les partages sociaux (Open Graph et Twitter Cards).

## ✅ Ce qui a été implémenté

### 1. Composant MetaHead

**Fichier** : `components/MetaHead.tsx`

Un composant réutilisable qui génère dynamiquement les meta tags pour :
- **Open Graph** (Facebook, LinkedIn, WhatsApp, etc.)
- **Twitter Cards**
- **SEO de base**

### 2. Intégration dans les pages

#### Formations (`app/formations/[slug]/page.tsx`)
```tsx
<MetaHead
  title={formation.title}
  description={formation.shortDescription}
  image="/images/og/formation-default.jpg"
  url={window.location.href}
  type="article"
/>
```

#### Actualités (`app/actualites/[slug]/page.tsx`)
```tsx
<MetaHead
  title={news.title}
  description={news.excerpt}
  image={news.image}  // Image uploadée via admin
  url={window.location.href}
  type="article"
/>
```

## 📋 Meta Tags générés

Pour chaque page de formation ou actualité, ces tags sont automatiquement créés :

### Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:title" content="Titre de la formation/actualité" />
<meta property="og:description" content="Description..." />
<meta property="og:image" content="https://inses.ca/image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://inses.ca/..." />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="INSES - Institut National Supérieur de l'Espoir" />
<meta property="og:locale" content="fr_FR" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Titre..." />
<meta name="twitter:description" content="Description..." />
<meta name="twitter:image" content="https://inses.ca/image.jpg" />
```

### SEO de base
```html
<title>Titre | INSES</title>
<meta name="description" content="Description..." />
```

## 🖼️ Images recommandées

### Dimensions optimales
- **Taille recommandée** : 1200 x 630 px
- **Ratio** : 1.91:1
- **Format** : JPG ou PNG
- **Taille fichier** : < 1 MB

### Images par type de contenu

1. **Actualités** :
   - Utilisent l'image uploadée dans l'admin
   - Chaque actualité peut avoir sa propre image
   - ✅ Déjà configuré

2. **Formations** :
   - Image par défaut : `/images/og/formation-default.jpg`
   - ⚠️ À créer : Vous devez ajouter cette image

## 📁 Créer l'image par défaut

### Option 1 : Image INSES générique

Créez une image `1200x630px` avec :
- Logo INSES
- Slogan institutionnel
- Couleurs : #B22234, #800020
- Texte : "Institut National Supérieur de l'Espoir"

Placez-la dans : `public/images/og/formation-default.jpg`

### Option 2 : Images par formation (avancé)

Pour des previews personnalisées par formation, vous pourriez :
1. Créer des images pour chaque formation
2. Les stocker dans Supabase Storage
3. Ajouter un champ `og_image` à la table `formations`
4. Mettre à jour le code pour utiliser `formation.og_image || '/images/og/formation-default.jpg'`

## 🧪 Tester les prévisualisations

### 1. Outils en ligne

#### Facebook Sharing Debugger
1. Allez sur : https://developers.facebook.com/tools/debug/
2. Entrez l'URL de votre formation ou actualité
3. Cliquez sur **Debug**
4. Vérifiez que l'image, le titre et la description s'affichent
5. Si besoin, cliquez sur **Scrape Again** pour rafraîchir le cache

#### Twitter Card Validator
1. Allez sur : https://cards-dev.twitter.com/validator
2. Entrez l'URL
3. Cliquez sur **Preview card**
4. Vérifiez la prévisualisation

#### LinkedIn Post Inspector
1. Allez sur : https://www.linkedin.com/post-inspector/
2. Entrez l'URL
3. Cliquez sur **Inspect**
4. Vérifiez la carte

#### Meta Tags Checker (Général)
- https://metatags.io/
- https://www.opengraph.xyz/

### 2. Test en conditions réelles

#### Sur Facebook
1. Créez un nouveau post
2. Collez l'URL de votre page
3. Attendez que Facebook charge la prévisualisation
4. ✅ Vous devriez voir l'image, le titre et la description

#### Sur LinkedIn
1. Créez un nouveau post
2. Collez l'URL
3. La carte devrait apparaître automatiquement

#### Sur WhatsApp
1. Envoyez l'URL dans un chat
2. La prévisualisation devrait s'afficher avec l'image

#### Sur Twitter/X
1. Créez un nouveau tweet
2. Collez l'URL
3. La Twitter Card devrait s'afficher

## 🔍 Vérification manuelle

Pour vérifier que les tags sont bien présents :

1. Ouvrez la page dans Chrome/Firefox
2. Faites clic droit → **Inspecter** (ou F12)
3. Allez dans l'onglet **Elements**
4. Cherchez `<head>` dans le HTML
5. Vérifiez la présence des balises `<meta property="og:...">` et `<meta name="twitter:...">`

Ou utilisez l'extension Chrome **Meta SEO Inspector**.

## ⚠️ Important : Cache des réseaux sociaux

Les réseaux sociaux mettent en cache les meta tags. Si vous modifiez une image ou un titre :

1. **Facebook** : Utilisez le Sharing Debugger et cliquez sur "Scrape Again"
2. **Twitter** : Attendez ~7 jours ou utilisez le Card Validator
3. **LinkedIn** : Utilisez le Post Inspector
4. **WhatsApp** : Le cache expire après quelques jours

## 📱 Exemples de rendu

### Facebook
```
┌─────────────────────────────────┐
│  [Image 1200x630]                │
├─────────────────────────────────┤
│ Titre de la formation           │
│ Description courte...           │
│ inses.ca                        │
└─────────────────────────────────┘
```

### Twitter
```
┌─────────────────────────────────┐
│  [Image 1200x630]                │
├─────────────────────────────────┤
│ Titre de la formation           │
│ Description courte...           │
│ inses.ca                        │
└─────────────────────────────────┘
```

### LinkedIn
```
┌─────────────────────────────────┐
│  [Image 1200x630]                │
├─────────────────────────────────┤
│ Titre de la formation           │
│ Description courte...           │
│ inses.ca                        │
└─────────────────────────────────┘
```

## 🎨 Créer une image OG professionnelle

### Outils recommandés

1. **Canva** (https://canva.com)
   - Template "Open Graph Image"
   - Dimensions pré-configurées
   - Interface simple

2. **Figma** (https://figma.com)
   - Plus de contrôle
   - Templates communautaires

3. **Adobe Photoshop/Illustrator**
   - Pour un design professionnel

### Template rapide

Dimensions : 1200 x 630 px

```
┌────────────────────────────────────────┐
│                                        │
│         [Logo INSES]                   │
│                                        │
│    Institut National Supérieur         │
│         de l'Espoir                    │
│                                        │
│    Excellence • Formation              │
│         • Innovation                   │
│                                        │
└────────────────────────────────────────┘

Couleurs :
- Fond : Blanc ou #F5F5F5
- Texte principal : #4A4A4A
- Accent : #B22234
```

## 🚀 Prochaines étapes recommandées

1. ✅ Créer l'image par défaut pour les formations
2. ✅ Tester sur Facebook Sharing Debugger
3. ✅ Tester sur Twitter Card Validator
4. ✅ Faire un post test sur chaque réseau
5. 🔲 (Optionnel) Créer des images personnalisées par formation
6. 🔲 (Optionnel) Ajouter des images OG pour la page d'accueil, à propos, etc.

## 📊 Analytics

Pour suivre l'efficacité de vos partages sociaux :

1. Utilisez **Google Analytics** pour voir le trafic depuis les réseaux sociaux
2. Les plateformes ont leurs propres analytics :
   - Facebook Insights
   - Twitter Analytics
   - LinkedIn Analytics

## 🐛 Dépannage

### L'image ne s'affiche pas
- ✅ Vérifiez que l'image existe à l'URL spécifiée
- ✅ Vérifiez que l'image est accessible publiquement (pas protégée)
- ✅ Utilisez le Facebook Debugger pour voir l'erreur exacte
- ✅ Vérifiez les dimensions (min 200x200, recommandé 1200x630)

### Les tags ne sont pas détectés
- ✅ Vérifiez que le composant MetaHead est bien dans le JSX
- ✅ Inspectez le HTML pour confirmer la présence des tags
- ✅ Attendez quelques secondes après le chargement de la page (tags créés dynamiquement)

### L'ancienne image/titre apparaît toujours
- ✅ Videz le cache du réseau social avec leurs outils de debug
- ✅ Attendez 24-48h pour que le cache expire naturellement
- ✅ Testez en mode navigation privée

## 📞 Support

Pour plus d'informations sur les meta tags :
- Open Graph Protocol : https://ogp.me/
- Twitter Cards : https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- LinkedIn : https://www.linkedin.com/help/linkedin/answer/a521928
