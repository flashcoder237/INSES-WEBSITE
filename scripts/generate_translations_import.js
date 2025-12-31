/**
 * Script pour générer le SQL d'import des traductions depuis fr.json et en.json
 * Usage: node scripts/generate_translations_import.js
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers
const frJsonPath = path.join(__dirname, '../messages/fr.json');
const enJsonPath = path.join(__dirname, '../messages/en.json');
const outputSqlPath = path.join(__dirname, 'import_translations.sql');

// Lire les fichiers JSON
const frData = JSON.parse(fs.readFileSync(frJsonPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Fonction pour aplatir un objet JSON en clés avec notation pointée
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}

// Fonction pour échapper les quotes SQL
function escapeSql(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

// Fonction pour extraire la catégorie et la section d'une clé
function getCategoryAndSection(key) {
  const parts = key.split('.');
  const category = parts[0]; // Premier niveau = catégorie
  const section = parts.length > 2 ? parts.slice(0, 2).join('.') : null; // Deuxième niveau = section
  return { category, section };
}

// Aplatir les objets
const flatFr = flattenObject(frData);
const flatEn = flattenObject(enData);

// Générer le SQL
let sql = `-- =====================================================
-- Import des traductions depuis fr.json et en.json
-- Généré automatiquement le ${new Date().toISOString()}
-- =====================================================

-- Supprimer les anciennes traductions
DELETE FROM site_content WHERE category IN (${
  [...new Set(Object.keys(flatFr).map(k => `'${k.split('.')[0]}'`))].join(', ')
});

-- Insérer les nouvelles traductions
`;

// Générer les INSERT statements
const keys = new Set([...Object.keys(flatFr), ...Object.keys(flatEn)]);
const insertStatements = [];

for (const key of keys) {
  const frContent = flatFr[key] || '';
  const enContent = flatEn[key] || '';
  const { category, section } = getCategoryAndSection(key);

  // Description basée sur la clé
  const description = `Traduction pour: ${key}`;

  insertStatements.push(
    `('${escapeSql(key)}', '${escapeSql(category)}', ${section ? `'${escapeSql(section)}'` : 'NULL'}, '${escapeSql(frContent)}', '${escapeSql(enContent)}', '${escapeSql(description)}', 'text', true)`
  );
}

sql += `INSERT INTO site_content (key, category, section, content_fr, content_en, description, content_type, is_active)
VALUES
${insertStatements.join(',\n')}
ON CONFLICT (key) DO UPDATE SET
  content_fr = EXCLUDED.content_fr,
  content_en = EXCLUDED.content_en,
  updated_at = NOW();

-- Vérification
SELECT
  category,
  COUNT(*) as total_translations
FROM site_content
GROUP BY category
ORDER BY category;
`;

// Écrire le fichier SQL
fs.writeFileSync(outputSqlPath, sql, 'utf8');

console.log(`✅ Fichier SQL généré: ${outputSqlPath}`);
console.log(`📊 Total de traductions: ${keys.size}`);
console.log(`📁 Catégories: ${[...new Set(Object.keys(flatFr).map(k => k.split('.')[0]))].join(', ')}`);
