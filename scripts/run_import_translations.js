/**
 * Script pour exécuter l'import des traductions dans Supabase
 * Usage: node scripts/run_import_translations.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Charger les variables d'environnement
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erreur: NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être définis dans .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importTranslations() {
  console.log('🚀 Début de l\'import des traductions...\n');

  // Lire les fichiers JSON
  const frJsonPath = path.join(__dirname, '../messages/fr.json');
  const enJsonPath = path.join(__dirname, '../messages/en.json');

  const frData = JSON.parse(fs.readFileSync(frJsonPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

  // Fonction pour aplatir un objet JSON
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

  // Fonction pour extraire la catégorie
  function getCategory(key) {
    return key.split('.')[0];
  }

  const flatFr = flattenObject(frData);
  const flatEn = flattenObject(enData);
  const allKeys = new Set([...Object.keys(flatFr), ...Object.keys(flatEn)]);

  console.log(`📊 Total de traductions à importer: ${allKeys.size}\n`);

  // Préparer les données
  const translations = [];
  for (const key of allKeys) {
    translations.push({
      key,
      category: getCategory(key),
      section: null,
      content_fr: flatFr[key] || '',
      content_en: flatEn[key] || '',
      description: `Traduction pour: ${key}`,
      content_type: 'text',
      is_active: true
    });
  }

  // Grouper par catégorie pour un meilleur affichage
  const categories = {};
  for (const t of translations) {
    if (!categories[t.category]) {
      categories[t.category] = 0;
    }
    categories[t.category]++;
  }

  console.log('📁 Traductions par catégorie:');
  for (const [cat, count] of Object.entries(categories)) {
    console.log(`   - ${cat}: ${count} traductions`);
  }
  console.log('');

  try {
    // Supprimer les anciennes traductions
    console.log('🗑️  Suppression des anciennes traductions...');
    const categoriesToDelete = Object.keys(categories);
    const { error: deleteError } = await supabase
      .from('site_content')
      .delete()
      .in('category', categoriesToDelete);

    if (deleteError) {
      throw deleteError;
    }
    console.log('✅ Anciennes traductions supprimées\n');

    // Insérer les nouvelles traductions par lots de 100
    console.log('📥 Import des nouvelles traductions...');
    const batchSize = 100;
    let imported = 0;

    for (let i = 0; i < translations.length; i += batchSize) {
      const batch = translations.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('site_content')
        .upsert(batch, { onConflict: 'key' });

      if (insertError) {
        throw insertError;
      }

      imported += batch.length;
      console.log(`   ⏳ ${imported}/${translations.length} traductions importées...`);
    }

    console.log('\n✅ Import terminé avec succès!');
    console.log(`\n📊 Résumé:`);
    console.log(`   - Total importé: ${translations.length} traductions`);
    console.log(`   - Catégories: ${Object.keys(categories).length}`);

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error);
    process.exit(1);
  }
}

// Exécuter l'import
importTranslations()
  .then(() => {
    console.log('\n✨ Terminé!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  });
