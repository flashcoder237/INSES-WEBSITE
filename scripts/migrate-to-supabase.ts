/**
 * Script de migration des données statiques vers Supabase
 *
 * UTILISATION:
 * 1. Assurez-vous que les variables d'environnement sont configurées dans .env.local
 * 2. Exécutez le schema.sql dans Supabase d'abord
 * 3. Exécutez: npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import { siteInfo, formations as formationsData, aboutInfo, stats } from '../data/site-data'
import { formationsDataFr, formationsDataEn } from '../data/formations-i18n'
import { newsBase, newsTranslationsFr, newsTranslationsEn } from '../data/news-data'

// Créer le client Supabase avec la clé service
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes!')
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définis dans .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateSiteInfo() {
  console.log('\n📋 Migration des informations du site...')

  // D'abord, supprimer les données existantes
  await supabase.from('site_info').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const { data, error } = await supabase
    .from('site_info')
    .insert({
      name: siteInfo.name,
      full_name: siteInfo.fullName,
      description: siteInfo.description,
      location: siteInfo.location,
      email: siteInfo.email,
      phone: siteInfo.phone,
      whatsapp: siteInfo.whatsapp,
      fixed_line: siteInfo.fixedLine,
      social_facebook: siteInfo.socialMedia.facebook,
      social_instagram: siteInfo.socialMedia.instagram,
      social_linkedin: siteInfo.socialMedia.linkedin,
      social_twitter: siteInfo.socialMedia.twitter,
      other_phones: siteInfo.otherPhones,
    })
    .select()

  if (error) {
    console.error('❌ Erreur lors de la migration de site_info:', error)
    throw error
  }

  console.log('✅ site_info migré avec succès')
  return data
}

async function migrateFormations() {
  console.log('\n📚 Migration des formations...')

  // Supprimer les formations existantes (cascade supprimera skills et careers)
  await supabase.from('formations').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const formationsWithTranslations = formationsData.map((formation, index) => {
    const frData = formationsDataFr.find(f => f.id === formation.id)!
    const enData = formationsDataEn.find(f => f.id === formation.id)!

    return {
      slug: formation.slug,
      title_fr: frData.title,
      title_en: enData.title,
      short_description_fr: frData.shortDescription,
      short_description_en: enData.shortDescription,
      full_description_fr: frData.fullDescription,
      full_description_en: enData.fullDescription,
      duration: formation.duration,
      level: formation.level,
      icon: formation.icon,
      display_order: index,
      is_active: true,
    }
  })

  const { data: insertedFormations, error: formationsError } = await supabase
    .from('formations')
    .insert(formationsWithTranslations)
    .select()

  if (formationsError) {
    console.error('❌ Erreur lors de la migration des formations:', formationsError)
    throw formationsError
  }

  console.log(`✅ ${insertedFormations.length} formations migrées`)

  // Migrer les compétences et carrières
  for (const formation of formationsData) {
    const dbFormation = insertedFormations.find(f => f.slug === formation.slug)!
    const frData = formationsDataFr.find(f => f.id === formation.id)!
    const enData = formationsDataEn.find(f => f.id === formation.id)!

    // Compétences
    const skills = formation.skills.map((_, index) => ({
      formation_id: dbFormation.id,
      skill_fr: frData.skills[index],
      skill_en: enData.skills[index],
      display_order: index,
    }))

    const { error: skillsError } = await supabase
      .from('formation_skills')
      .insert(skills)

    if (skillsError) {
      console.error(`❌ Erreur lors de la migration des compétences pour ${formation.title}:`, skillsError)
      throw skillsError
    }

    // Carrières
    const careers = formation.career.map((_, index) => ({
      formation_id: dbFormation.id,
      career_fr: frData.career[index],
      career_en: enData.career[index],
      display_order: index,
    }))

    const { error: careersError } = await supabase
      .from('formation_careers')
      .insert(careers)

    if (careersError) {
      console.error(`❌ Erreur lors de la migration des carrières pour ${formation.title}:`, careersError)
      throw careersError
    }
  }

  console.log('✅ Compétences et carrières migrées')
  return insertedFormations
}

async function migrateAboutInfo() {
  console.log('\n📖 Migration des informations "À propos"...')

  // Supprimer les données existantes
  await supabase.from('about_info').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('about_values').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('partners').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Insérer about_info
  const { error: aboutError } = await supabase
    .from('about_info')
    .insert({
      mission_fr: aboutInfo.mission,
      mission_en: aboutInfo.mission, // TODO: Ajouter traduction EN
      vision_fr: aboutInfo.vision,
      vision_en: aboutInfo.vision, // TODO: Ajouter traduction EN
      pedagogy_theoretical_fr: aboutInfo.pedagogy.theoretical,
      pedagogy_theoretical_en: aboutInfo.pedagogy.theoretical, // TODO: Ajouter traduction EN
      pedagogy_practical_fr: aboutInfo.pedagogy.practical,
      pedagogy_practical_en: aboutInfo.pedagogy.practical, // TODO: Ajouter traduction EN
      pedagogy_evaluation_fr: aboutInfo.pedagogy.evaluation,
      pedagogy_evaluation_en: aboutInfo.pedagogy.evaluation, // TODO: Ajouter traduction EN
    })

  if (aboutError) {
    console.error('❌ Erreur lors de la migration de about_info:', aboutError)
    throw aboutError
  }

  // Insérer les valeurs
  const values = aboutInfo.values.map((value, index) => ({
    title_fr: value.title,
    title_en: value.title, // TODO: Ajouter traduction EN
    description_fr: value.description,
    description_en: value.description, // TODO: Ajouter traduction EN
    display_order: index,
  }))

  const { error: valuesError } = await supabase
    .from('about_values')
    .insert(values)

  if (valuesError) {
    console.error('❌ Erreur lors de la migration des valeurs:', valuesError)
    throw valuesError
  }

  // Insérer les partenaires
  const partners = aboutInfo.partners.map((partner, index) => ({
    name_fr: partner,
    name_en: partner, // TODO: Ajouter traduction EN
    display_order: index,
  }))

  const { error: partnersError } = await supabase
    .from('partners')
    .insert(partners)

  if (partnersError) {
    console.error('❌ Erreur lors de la migration des partenaires:', partnersError)
    throw partnersError
  }

  console.log('✅ Informations "À propos" migrées')
}

async function migrateStats() {
  console.log('\n📊 Migration des statistiques...')

  // Supprimer les stats existantes
  await supabase.from('stats').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const statsData = stats.map((stat, index) => ({
    value: stat.value,
    label_fr: stat.label,
    label_en: stat.label, // TODO: Ajouter traduction EN
    display_order: index,
  }))

  const { error } = await supabase
    .from('stats')
    .insert(statsData)

  if (error) {
    console.error('❌ Erreur lors de la migration des statistiques:', error)
    throw error
  }

  console.log(`✅ ${statsData.length} statistiques migrées`)
}

async function migrateNews() {
  console.log('\n📰 Migration des actualités...')

  // Supprimer les news existantes
  await supabase.from('news').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const newsData = newsBase.map(newsItem => {
    const frData = newsTranslationsFr.find(n => n.id === newsItem.id)!
    const enData = newsTranslationsEn.find(n => n.id === newsItem.id)!

    return {
      slug: newsItem.slug,
      category: newsItem.category,
      image: newsItem.image,
      published_date: newsItem.date,
      title_fr: frData.title,
      title_en: enData.title,
      excerpt_fr: frData.excerpt,
      excerpt_en: enData.excerpt,
      content_fr: frData.content,
      content_en: enData.content,
      is_published: true,
    }
  })

  const { data, error } = await supabase
    .from('news')
    .insert(newsData)
    .select()

  if (error) {
    console.error('❌ Erreur lors de la migration des actualités:', error)
    throw error
  }

  console.log(`✅ ${data.length} actualités migrées`)
}

async function main() {
  console.log('🚀 Début de la migration des données vers Supabase...')
  console.log('=' .repeat(60))

  try {
    await migrateSiteInfo()
    await migrateFormations()
    await migrateAboutInfo()
    await migrateStats()
    await migrateNews()

    console.log('\n' + '='.repeat(60))
    console.log('✅ Migration terminée avec succès!')
    console.log('\nProchaines étapes:')
    console.log('1. Vérifiez les données dans votre dashboard Supabase')
    console.log('2. Modifiez les hooks pour utiliser Supabase')
    console.log('3. Créez le panel d\'administration')
  } catch (error) {
    console.error('\n❌ La migration a échoué:', error)
    process.exit(1)
  }
}

main()
