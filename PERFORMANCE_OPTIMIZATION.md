# Guide d'Optimisation des Performances - INSES

## ✅ Optimisations Déjà Implémentées

### 1. Configuration Next.js Optimisée (`next.config.ts`)
- ✅ Compression activée
- ✅ Minification SWC
- ✅ Optimisation des fonts
- ✅ Images en AVIF et WebP
- ✅ Headers de cache pour les assets statiques (1 an)
- ✅ Headers de sécurité (X-Frame-Options, CSP, etc.)

### 2. Lazy Loading des Composants
- ✅ OfflineDetector chargé dynamiquement
- ✅ LanguageSelector chargé dynamiquement
- ✅ DynamicMetadata chargé dynamiquement
- ✅ StructuredData chargé dynamiquement
- ✅ PerformanceOptimizer chargé dynamiquement

### 3. Optimisation des Images
- ✅ Formats modernes (AVIF, WebP)
- ✅ Tailles adaptatives (deviceSizes, imageSizes)
- ✅ Cache TTL de 60 secondes

### 4. Préchargement des Ressources
- ✅ DNS Prefetch pour Supabase et Google Fonts
- ✅ Preconnect pour Google Fonts
- ✅ Display swap pour les fonts (évite FOIT)

### 5. SEO et Métadonnées
- ✅ Métadonnées dynamiques multilingues
- ✅ OpenGraph optimisé
- ✅ Données structurées JSON-LD (Schema.org)
- ✅ Sitemap dynamique
- ✅ Robots.txt configuré

---

## 🎯 Core Web Vitals - Objectifs

### LCP (Largest Contentful Paint) - Objectif: < 2.5s
**Problème probable:** Images hero non optimisées

**Solutions:**
1. Utiliser `priority` sur les images hero:
   \`\`\`tsx
   <Image
     src="/images/hero/hero-home.jpg"
     priority
     quality={85}
   />
   \`\`\`

2. Précharger l'image hero dans le `<head>`:
   \`\`\`tsx
   <link rel="preload" as="image" href="/images/hero/hero-home.jpg" />
   \`\`\`

3. Utiliser des images optimisées (compresser avec TinyPNG ou Squoosh)

### FID/INP (First Input Delay / Interaction to Next Paint) - Objectif: < 200ms
**Problème probable:** Trop de JavaScript synchrone

**Solutions déjà implémentées:**
- ✅ Lazy loading des composants non critiques
- ✅ Dynamic imports

**À faire:**
1. Éviter les re-renders inutiles avec React.memo
2. Utiliser useMemo et useCallback pour les calculs coûteux
3. Déplacer les animations lourdes vers CSS

### CLS (Cumulative Layout Shift) - Objectif: < 0.1
**Problème probable:** Images sans dimensions, fonts qui changent

**Solutions déjà implémentées:**
- ✅ Font display: swap

**À faire:**
1. Toujours spécifier width et height sur les images:
   \`\`\`tsx
   <Image
     src="/image.jpg"
     width={800}
     height={600}
     alt="Description"
   />
   \`\`\`

2. Réserver l'espace pour le contenu dynamique:
   \`\`\`tsx
   {!loaded ? (
     <div className="h-[400px] w-full animate-pulse bg-gray-200" />
   ) : (
     <YourComponent />
   )}
   \`\`\`

---

## 📊 Recommandations Supplémentaires

### 1. Optimisation des Images
\`\`\`bash
# Convertir toutes les images en WebP
npm install -g sharp-cli
sharp -i input.jpg -o output.webp --webp

# Ou utiliser des services en ligne:
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
\`\`\`

### 2. Analyse du Bundle
\`\`\`bash
# Installer l'analyseur de bundle
npm install @next/bundle-analyzer

# Dans next.config.ts, ajouter:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Analyser
ANALYZE=true npm run build
\`\`\`

### 3. Optimisation Framer Motion
Framer Motion est lourd. Considérez:
- Utiliser uniquement les composants nécessaires
- Lazy load les animations
- Remplacer par des transitions CSS quand possible

### 4. Optimisation Supabase
\`\`\`tsx
// Utiliser React Query pour le cache
import { useQuery } from '@tanstack/react-query'

export function useFormations() {
  return useQuery({
    queryKey: ['formations', locale],
    queryFn: () => fetchFormations(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
\`\`\`

### 5. Service Worker / PWA
Créer un Service Worker pour:
- Cache offline
- Préchargement des pages importantes
- Gestion des assets

---

## 🔍 Outils de Test

1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **Lighthouse**: DevTools > Lighthouse
3. **WebPageTest**: https://www.webpagetest.org/
4. **Chrome DevTools**:
   - Performance tab
   - Coverage tab (pour voir le code inutilisé)
   - Network tab (pour analyser les requêtes)

---

## 📈 Checklist de Déploiement

Avant chaque déploiement, vérifier:

- [ ] Toutes les images sont compressées
- [ ] Les images hero ont l'attribut \`priority\`
- [ ] Pas de console.log en production
- [ ] Les données Supabase sont en cache
- [ ] Les fonts sont préchargées
- [ ] Les métadonnées sont à jour
- [ ] Le sitemap est généré
- [ ] Test PageSpeed > 90
- [ ] Test sur mobile
- [ ] Test sur connexion 3G simulée

---

## 🚀 Gains Attendus

Avec ces optimisations:
- **LCP**: -30% à -50%
- **FID**: -40% à -60%
- **CLS**: Proche de 0
- **Score PageSpeed**: 85-95
- **Temps de chargement**: -40% à -60%

---

## 📝 Notes Importantes

1. **Images Hero**: Compressez-les au maximum (qualité 70-80)
2. **Framer Motion**: Considérez une alternative plus légère
3. **Bundle Size**: Surveillez avec @next/bundle-analyzer
4. **Monitoring**: Ajoutez Google Analytics 4 ou Vercel Analytics
5. **CDN**: Utilisez Vercel CDN ou Cloudflare pour la distribution

---

## 🎓 Ressources

- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
