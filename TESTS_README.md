# Guide des Tests - Formulaire d'Inscription INSES

Ce document explique comment installer, exécuter et comprendre les tests du formulaire d'inscription.

## Installation des dépendances de test

Avant de pouvoir exécuter les tests, vous devez installer les dépendances nécessaires :

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

Ou avec yarn :

```bash
yarn add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

## Scripts de test à ajouter au package.json

Ajoutez ces scripts dans votre `package.json` :

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

## Exécuter les tests

### Mode watch (recommandé pour le développement)
```bash
npm test
```

Les tests se relanceront automatiquement à chaque modification de fichier.

### Exécution unique
```bash
npm run test:run
```

### Interface utilisateur
```bash
npm run test:ui
```

Ouvre une interface web interactive pour visualiser et exécuter les tests.

### Couverture de code
```bash
npm run test:coverage
```

Génère un rapport de couverture de code dans le dossier `coverage/`.

## Structure des tests

Les tests sont organisés dans `__tests__/inscription.test.tsx` et couvrent :

### 1. **Affichage initial**
- Vérification de l'affichage correct du formulaire
- Validation de la barre de progression
- Présence des boutons de navigation

### 2. **Navigation entre les étapes**
- Passage d'une étape à l'autre
- Validation avant de progresser
- Retour à l'étape précédente
- Conservation des données

### 3. **Validation des champs**
- **Étape 1** : Informations personnelles (prénom, nom, email, téléphone, etc.)
- **Étape 2** : Informations familiales (tous optionnels)
- **Étape 3** : Formation souhaitée (formation et niveau requis)
- **Étape 4** : Motivation (optionnel)

### 4. **Soumission du formulaire**
- Empêcher la soumission avant l'étape 4
- Soumission réussie avec toutes les données valides
- Génération du PDF
- Gestion des erreurs

### 5. **Gestion des événements clavier**
- Empêcher la soumission avec la touche Entrée
- Permettre les sauts de ligne dans les textarea

### 6. **Barre de progression**
- Affichage correct du pourcentage à chaque étape

### 7. **Réinitialisation**
- Reset automatique du formulaire après soumission réussie

## Exemples de tests

### Test de validation d'email
```typescript
it('devrait valider le format de l\'email', async () => {
  const user = userEvent.setup()
  render(<InscriptionPage />)

  await user.type(screen.getByLabelText(/email/i), 'email-invalide')
  await user.click(screen.getByText(/Suivant/i))

  expect(screen.getByText(/Email \(format invalide\)/i)).toBeInTheDocument()
})
```

### Test de navigation entre étapes
```typescript
it('devrait avancer à l\'étape 2 quand l\'étape 1 est valide', async () => {
  const user = userEvent.setup()
  render(<InscriptionPage />)

  // Remplir les champs...
  await user.click(screen.getByText(/Suivant/i))

  await waitFor(() => {
    expect(screen.getByText(/Étape 2 sur 4/i)).toBeInTheDocument()
  })
})
```

## Debugging des tests

### Afficher le DOM pendant un test
```typescript
import { screen, render } from '@testing-library/react'

it('test example', () => {
  render(<InscriptionPage />)
  screen.debug() // Affiche le DOM complet dans la console
})
```

### Afficher un élément spécifique
```typescript
const element = screen.getByLabelText(/firstName/i)
console.log(element.outerHTML)
```

### Mode verbose
```bash
npm test -- --reporter=verbose
```

## Bonnes pratiques

### 1. **Utiliser userEvent au lieu de fireEvent**
```typescript
// ✅ Bon
const user = userEvent.setup()
await user.click(button)

// ❌ Éviter
fireEvent.click(button)
```

### 2. **Attendre les changements asynchrones**
```typescript
// ✅ Bon
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument()
})

// ❌ Éviter
expect(screen.getByText('Success')).toBeInTheDocument()
```

### 3. **Sélectionner les éléments par accessibilité**
```typescript
// ✅ Bon (par label)
screen.getByLabelText(/firstName/i)

// ✅ Bon (par rôle)
screen.getByRole('button', { name: /submit/i })

// ❌ Éviter (par classe CSS)
screen.getByClassName('submit-button')
```

### 4. **Nettoyer les mocks entre les tests**
```typescript
beforeEach(() => {
  vi.clearAllMocks()
})
```

## Couverture de code

Le projet vise une couverture de code de minimum **80%** pour les composants critiques comme le formulaire d'inscription.

Pour voir la couverture :
```bash
npm run test:coverage
```

Puis ouvrez `coverage/index.html` dans votre navigateur.

## Intégration Continue (CI)

Les tests peuvent être intégrés dans un pipeline CI/CD :

```yaml
# Exemple pour GitHub Actions
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage
```

## Dépannage

### Problème : "Cannot find module '@testing-library/react'"
**Solution** : Installez les dépendances avec `npm install`

### Problème : Tests qui échouent à cause de mocks
**Solution** : Vérifiez que `vitest.setup.ts` est bien chargé

### Problème : Timeouts dans les tests
**Solution** : Augmentez le timeout :
```typescript
it('test long', async () => {
  // ...
}, 10000) // 10 secondes
```

## Ressources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event](https://testing-library.com/docs/user-event/intro)

## Support

Pour toute question concernant les tests, consultez la documentation ou contactez l'équipe de développement.
