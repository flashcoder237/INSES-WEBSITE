@echo off
REM Script d'installation des dépendances de test pour INSES (Windows)
REM Usage: install-tests.bat

echo.
echo 📦 Installation des dépendances de test...
echo.

call npm install --save-dev vitest@latest @vitest/ui@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest jsdom@latest @vitejs/plugin-react@latest @vitest/coverage-v8@latest

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

echo.
echo ✅ Dépendances de test installées avec succès!
echo.
echo 📝 Ajout des scripts au package.json...

node -e "const fs = require('fs'); const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8')); if (!packageJson.scripts) { packageJson.scripts = {}; } packageJson.scripts.test = 'vitest'; packageJson.scripts['test:ui'] = 'vitest --ui'; packageJson.scripts['test:coverage'] = 'vitest --coverage'; packageJson.scripts['test:run'] = 'vitest run'; fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n'); console.log('✅ Scripts ajoutés au package.json');"

echo.
echo 🎉 Installation terminée!
echo.
echo Pour exécuter les tests:
echo   npm test              - Mode watch
echo   npm run test:ui       - Interface graphique
echo   npm run test:coverage - Rapport de couverture
echo   npm run test:run      - Exécution unique
echo.
echo 📚 Consultez TESTS_README.md pour plus d'informations
echo.
pause
