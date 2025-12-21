# Nouveaux champs à ajouter au formulaire d'inscription

## ✅ Ce qui a été fait

1. **Backend configuré**: Le formData contient maintenant tous les nouveaux champs
2. **Supabase configuré**: La fonction handleSubmit envoie tout à Supabase
3. **Table SQL créée**: Exécutez `supabase/create-inscriptions-table.sql`

## 📝 Champs à ajouter au formulaire HTML

### 1. Dans la section "Informations personnelles" (après dateOfBirth)

```tsx
{/* Genre */}
<div>
  <label
    htmlFor="gender"
    className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
  >
    Genre *
  </label>
  <select
    id="gender"
    name="gender"
    required
    value={formData.gender}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
  >
    <option value="">Sélectionner</option>
    <option value="male">Masculin</option>
    <option value="female">Féminin</option>
  </select>
</div>

{/* Lieu de naissance */}
<div>
  <label
    htmlFor="placeOfBirth"
    className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
  >
    Lieu de naissance
  </label>
  <input
    type="text"
    id="placeOfBirth"
    name="placeOfBirth"
    value={formData.placeOfBirth}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
    placeholder="Ex: Yaoundé, Cameroun"
  />
</div>

{/* Nationalité */}
<div>
  <label
    htmlFor="nationality"
    className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
  >
    Nationalité
  </label>
  <input
    type="text"
    id="nationality"
    name="nationality"
    value={formData.nationality}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
    placeholder="Camerounaise"
  />
</div>

{/* WhatsApp (après phone) */}
<div>
  <label
    htmlFor="whatsapp"
    className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
  >
    WhatsApp
  </label>
  <input
    type="tel"
    id="whatsapp"
    name="whatsapp"
    value={formData.whatsapp}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
    placeholder="Si différent du téléphone"
  />
</div>

{/* Code postal (après city) */}
<div>
  <label
    htmlFor="postalCode"
    className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide"
  >
    Code postal
  </label>
  <input
    type="text"
    id="postalCode"
    name="postalCode"
    value={formData.postalCode}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
    placeholder="BP XXXX"
  />
</div>
```

### 2. Nouvelle section "Informations familiales" (après les informations personnelles)

```tsx
{/* Informations familiales */}
<div className="pt-6 border-t border-[#D3D3D3]">
  <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-3">
    <User className="text-[#B22234]" size={28} />
    Informations familiales
  </h2>

  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Père */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">Informations sur le père</h3>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Nom complet du père
        </label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Profession du père
        </label>
        <input
          type="text"
          name="fatherProfession"
          value={formData.fatherProfession}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Téléphone du père
        </label>
        <input
          type="tel"
          name="fatherPhone"
          value={formData.fatherPhone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      {/* Mère */}
      <div className="md:col-span-2 mt-6">
        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">Informations sur la mère</h3>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Nom complet de la mère
        </label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Profession de la mère
        </label>
        <input
          type="text"
          name="motherProfession"
          value={formData.motherProfession}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Téléphone de la mère
        </label>
        <input
          type="tel"
          name="motherPhone"
          value={formData.motherPhone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      {/* Contact d'urgence */}
      <div className="md:col-span-2 mt-6">
        <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">Personne à contacter en cas d'urgence</h3>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Nom complet
        </label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Lien de parenté
        </label>
        <input
          type="text"
          name="emergencyContactRelationship"
          value={formData.emergencyContactRelationship}
          onChange={handleChange}
          placeholder="Ex: Oncle, Tante, Frère, etc."
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
          Téléphone
        </label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
        />
      </div>
    </div>
  </div>
</div>
```

### 3. Dans la section "Formation souhaitée" - Ajouter ces champs

```tsx
{/* Dernier établissement */}
<div>
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Dernier établissement fréquenté
  </label>
  <input
    type="text"
    name="lastSchool"
    value={formData.lastSchool}
    onChange={handleChange}
    placeholder="Ex: Lycée de Yaoundé"
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
  />
</div>

{/* Dernier diplôme */}
<div>
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Dernier diplôme obtenu
  </label>
  <input
    type="text"
    name="lastDiploma"
    value={formData.lastDiploma}
    onChange={handleChange}
    placeholder="Ex: Baccalauréat série D"
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
  />
</div>

{/* Année d'obtention */}
<div>
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Année d'obtention
  </label>
  <input
    type="text"
    name="diplomaYear"
    value={formData.diplomaYear}
    onChange={handleChange}
    placeholder="Ex: 2024"
    maxLength={4}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
  />
</div>

{/* Date de début souhaitée */}
<div>
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Date de début souhaitée
  </label>
  <select
    name="preferredStartDate"
    value={formData.preferredStartDate}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all"
  >
    <option value="">Sélectionner</option>
    <option value="Janvier 2025">Janvier 2025</option>
    <option value="Septembre 2025">Septembre 2025</option>
    <option value="Janvier 2026">Janvier 2026</option>
    <option value="Septembre 2026">Septembre 2026</option>
  </select>
</div>
```

### 4. Dans la section "Message" - Ajouter

```tsx
{/* Objectifs de carrière */}
<div className="mt-6">
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Vos objectifs de carrière
  </label>
  <textarea
    name="careerGoals"
    value={formData.careerGoals}
    onChange={handleChange}
    rows={3}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all resize-none"
    placeholder="Que souhaitez-vous accomplir professionnellement ?"
  />
</div>

{/* Pourquoi cette formation */}
<div className="mt-6">
  <label className="block text-sm font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wide">
    Pourquoi avez-vous choisi cette formation ?
  </label>
  <textarea
    name="whyThisFormation"
    value={formData.whyThisFormation}
    onChange={handleChange}
    rows={3}
    className="w-full px-4 py-3 border border-[#D3D3D3] focus:ring-2 focus:ring-[#B22234] focus:border-transparent transition-all resize-none"
    placeholder="Qu'est-ce qui vous motive à suivre cette formation ?"
  />
</div>
```

### 5. Ajouter un message d'erreur (après le message de succès)

```tsx
{/* Error Message */}
{submitStatus === "error" && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 flex items-center gap-4"
  >
    <AlertCircle className="text-red-500 flex-shrink-0" size={28} />
    <div>
      <h3 className="text-xl font-bold text-red-900 mb-1">
        Erreur lors de l'inscription
      </h3>
      <p className="text-red-700 text-[15px]">
        Une erreur s'est produite. Veuillez réessayer ou nous contacter.
      </p>
    </div>
  </motion.div>
)}
```

## 🚀 Pour activer tout

1. **Exécutez le script SQL**:
   ```sql
   -- Dans Supabase SQL Editor
   -- Fichier: supabase/create-inscriptions-table.sql
   ```

2. **Ajoutez les champs HTML** listés ci-dessus dans le formulaire

3. **Supprimez les doublons de la galerie**:
   ```sql
   -- Fichier: supabase/fix-gallery-duplicates.sql
   ```

Tous les champs sont déjà configurés dans le code TypeScript (formData et handleSubmit), il ne reste qu'à ajouter les éléments HTML du formulaire!
