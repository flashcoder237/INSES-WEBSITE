-- =================================================================
-- MIGRATION SCRIPT: Add I18N fields to site_info table
-- =================================================================
-- This script adds French and English columns for translatable fields
-- in the `site_info` table and migrates the existing data.
-- =================================================================

-- Step 1: Add new columns for French and English
ALTER TABLE site_info ADD COLUMN full_name_fr VARCHAR(255);
ALTER TABLE site_info ADD COLUMN full_name_en VARCHAR(255);
ALTER TABLE site_info ADD COLUMN description_fr TEXT;
ALTER TABLE site_info ADD COLUMN description_en TEXT;
ALTER TABLE site_info ADD COLUMN location_fr VARCHAR(255);
ALTER TABLE site_info ADD COLUMN location_en VARCHAR(255);

-- Step 2: Migrate existing data to the new French columns
-- This assumes the existing data is in French.
UPDATE site_info
SET 
  full_name_fr = full_name,
  description_fr = description,
  location_fr = location;

-- Step 3: Populate English fields with French data as a fallback
-- It's recommended to manually translate this content in the admin panel later.
UPDATE site_info
SET 
  full_name_en = full_name,
  description_en = description,
  location_en = location;

-- =================================================================
-- Step 4: (Optional but recommended) Remove old columns
-- =================================================================
-- After verifying the data migration, you can remove the old columns
-- to finalize the schema. It's best to do this manually in the
-- Supabase dashboard or after confirming the application works correctly.
--
-- ALTER TABLE site_info DROP COLUMN full_name;
-- ALTER TABLE site_info DROP COLUMN description;
-- ALTER TABLE site_info DROP COLUMN location;
-- =================================================================

PRINT 'Migration to add I18N fields to site_info completed.';
PRINT 'Please review the changes and consider running Step 4 manually.';
