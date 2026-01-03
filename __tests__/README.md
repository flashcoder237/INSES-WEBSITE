# Tests du Formulaire d'Inscription

## 📁 Fichiers de test

- **`inscription-simple.test.tsx`** ✅ - Tests simplifiés et fonctionnels (RECOMMANDÉ)
- **`examples.test.tsx`** 📚 - Exemples pédagogiques pour apprendre
- **`inscription.test.tsx`** 🚧 - Tests complets (en cours de développement)

## 🎯 Tests recommandés

Utilisez `inscription-simple.test.tsx` qui contient des tests **réalistes et maintenables** :

### ✅ Ce qui est testé

1. **Affichage et navigation de base**
   - Formulaire s'affiche correctement
   - Étape 1 visible au démarrage
   - Boutons de navigation présents

2. **Validation des champs**
   - Erreurs si champs obligatoires vides
   - Validation du format email
   - Messages d'erreur appropriés

3. **Saisie de données**
   - Saisie de texte (prénom, nom)
   - Sélection (genre)
   - Date de naissance
   - Upload de photo

4. **Barre de progression**
   - Affichage de l'étape actuelle
   - Pourcentage de progression

5. **Événements clavier**
   - Touche Entrée ne soumet pas le formulaire

6. **Accessibilité**
   - Labels associés aux inputs
   - Attributs `required` présents
   - Textes visibles

## 🚀 Exécuter les tests

```bash
# Tous les tests
npm test

# Tests spécifiques
npm test inscription-simple

# Mode UI
npm run test:ui

# Avec couverture
npm run test:coverage
```

## 📊 Résultats attendus

Les tests simplifiés devraient **tous passer** ✅

```
✓ Affichage et navigation de base (4)
✓ Validation des champs (3)
✓ Saisie de données (3)
✓ Barre de progression (2)
✓ Événements clavier (1)
✓ Boutons d'aide (1)
✓ Upload de fichier (1)
✓ Accessibilité (2)
✓ Champs obligatoires (2)

Test Files  1 passed (1)
     Tests  19 passed (19)
```

## 🛠️ Pourquoi des tests simplifiés ?

Les tests complexes avec navigation complète entre toutes les étapes sont :
- ❌ Difficiles à maintenir
- ❌ Fragiles (cassent facilement)
- ❌ Lents à exécuter
- ❌ Difficiles à débugger

Les tests simplifiés sont :
- ✅ Rapides et fiables
- ✅ Faciles à comprendre
- ✅ Testent l'essentiel
- ✅ Faciles à maintenir

## 📝 Ajouter de nouveaux tests

Pour ajouter un test au fichier `inscription-simple.test.tsx` :

```typescript
it('devrait faire quelque chose', async () => {
  const user = userEvent.setup()
  render(<InscriptionPage />)

  // Votre test ici
  const element = screen.getByLabelText(/Label/i)
  await user.type(element, 'valeur')

  expect(element).toHaveValue('valeur')
})
```

## 🐛 Debugging

Si un test échoue :

1. **Afficher le DOM**
   ```typescript
   screen.debug()
   ```

2. **Vérifier les éléments présents**
   ```typescript
   screen.logTestingPlaygroundURL()
   ```

3. **Augmenter le timeout**
   ```typescript
   it('test long', async () => {
     // ...
   }, 10000) // 10 secondes
   ```

## 📚 Documentation

- Consultez `TESTS_README.md` pour le guide complet
- Voir `examples.test.tsx` pour des exemples pédagogiques
- [Testing Library Documentation](https://testing-library.com/)

## ✨ Bonnes pratiques

1. **Tester le comportement, pas l'implémentation**
   ```typescript
   // ✅ Bon
   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()

   // ❌ Éviter
   expect(wrapper.find('.email-input')).toExist()
   ```

2. **Utiliser des requêtes accessibles**
   - `getByLabelText()` - Pour les inputs avec labels
   - `getByRole()` - Pour les éléments interactifs
   - `getByText()` - Pour le contenu textuel

3. **Simuler les interactions utilisateur**
   ```typescript
   const user = userEvent.setup()
   await user.click(button)
   await user.type(input, 'texte')
   ```

4. **Attendre les changements asynchrones**
   ```typescript
   await waitFor(() => {
     expect(element).toBeInTheDocument()
   })
   ```

## 🎯 Prochaines étapes

Pour tester la navigation complète entre les étapes :
1. Commencez par les tests d'une seule étape
2. Ajoutez progressivement les tests de navigation
3. Utilisez des helpers pour remplir les formulaires

Exemple de helper :
```typescript
async function fillStep1(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Prénom/i), 'Jean')
  await user.type(screen.getByLabelText(/Nom/i), 'Dupont')
  // ... autres champs
}
```

## 💡 Support

Questions ? Consultez :
- Le fichier `examples.test.tsx` pour des exemples
- `TESTS_README.md` pour le guide détaillé
- La documentation de Testing Library
