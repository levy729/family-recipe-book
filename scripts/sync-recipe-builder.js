const fs = require('fs-extra');
const path = require('path');

/**
 * Recipe Builder Sync Script
 *
 * This script copies shared files from the main project to the recipe-builder directory.
 * It runs automatically after npm install via the postinstall script.
 *
 * For documentation and maintenance, see: RECIPE_BUILDER_SYNC.md
 */

async function syncRecipeBuilder() {
  console.log('🔄 Syncing recipe builder with shared files...');
  console.log('📖 For documentation, see: RECIPE_BUILDER_SYNC.md\n');

  const sourceFiles = [
    'lib/recipes.ts',
    'lib/search.ts',
    'lib/storage.ts',
    'lib/utils.ts',
    'components/ui',
    'tailwind.config.ts',
    'components.json',
  ];

  const recipeBuilderDir = path.join(__dirname, '..', 'recipe-builder');

  // Create recipe-builder directory if it doesn't exist
  await fs.ensureDir(recipeBuilderDir);

  let copiedCount = 0;
  let skippedCount = 0;

  for (const file of sourceFiles) {
    const source = path.join(__dirname, '..', file);
    const dest = path.join(recipeBuilderDir, file);

    try {
      if (await fs.pathExists(source)) {
        await fs.copy(source, dest);
        console.log(`✅ Copied ${file} to recipe-builder`);
        copiedCount++;
      } else {
        console.log(`⚠️  Skipped ${file} (not found)`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ Error copying ${file}:`, error.message);
    }
  }

  console.log(
    `\n📊 Sync complete: ${copiedCount} files copied, ${skippedCount} skipped`
  );
  console.log('🎉 Recipe builder is ready to use!');
  console.log('📖 For maintenance info, see: RECIPE_BUILDER_SYNC.md');
}

// Only run if this script is called directly
if (require.main === module) {
  syncRecipeBuilder().catch(console.error);
}

module.exports = syncRecipeBuilder;
