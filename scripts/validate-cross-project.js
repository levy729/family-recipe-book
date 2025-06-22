#!/usr/bin/env node

/**
 * Cross-Project Validation Script
 *
 * This script validates consistency and compatibility between the main project
 * and the recipe builder project, ensuring they work together seamlessly.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Utility functions for colored output
const log = {
  info: msg => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  success: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  header: msg =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
  subheader: msg => console.log(`${colors.cyan}${msg}${colors.reset}`),
};

// Project paths
const PROJECT_ROOT = process.cwd();
const RECIPE_BUILDER_PATH = path.join(PROJECT_ROOT, 'recipe-builder');
const RECIPES_PATH = path.join(PROJECT_ROOT, 'recipes');
const RECIPE_BUILDER_RECIPES_PATH = path.join(RECIPE_BUILDER_PATH, 'recipes');

// Validation results tracking
let validationResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
};

/**
 * Helper function to safely read JSON files
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read JSON file ${filePath}: ${error.message}`);
  }
}

/**
 * Helper function to safely read package.json files
 */
function readPackageJson(projectPath) {
  const packagePath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(packagePath)) {
    throw new Error(`package.json not found in ${projectPath}`);
  }
  return readJsonFile(packagePath);
}

/**
 * Helper function to get all .md files in a directory recursively
 */
function getMarkdownFiles(dirPath) {
  const files = [];

  function scanDirectory(currentPath) {
    if (!fs.existsSync(currentPath)) return;

    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dirPath);
  return files;
}

/**
 * Validation 1: Recipe Format Consistency
 */
function validateRecipeFormatConsistency() {
  log.header('1. Recipe Format Consistency Validation');

  const mainRecipes = getMarkdownFiles(RECIPES_PATH);
  const builderRecipes = getMarkdownFiles(RECIPE_BUILDER_RECIPES_PATH);

  log.info(`Found ${mainRecipes.length} recipes in main project`);
  log.info(`Found ${builderRecipes.length} recipes in recipe builder`);

  // Check if recipe counts match
  if (mainRecipes.length !== builderRecipes.length) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'recipe_count_mismatch',
      message: `Recipe count mismatch: Main project has ${mainRecipes.length} recipes, Recipe builder has ${builderRecipes.length} recipes`,
    });
    log.error(
      `Recipe count mismatch: Main project has ${mainRecipes.length} recipes, Recipe builder has ${builderRecipes.length} recipes`
    );
  } else {
    log.success('Recipe counts match between projects');
    validationResults.passed++;
  }

  // Check for recipe file synchronization
  const mainRecipeNames = mainRecipes.map(file => path.basename(file));
  const builderRecipeNames = builderRecipes.map(file => path.basename(file));

  const missingInBuilder = mainRecipeNames.filter(
    name => !builderRecipeNames.includes(name)
  );
  const missingInMain = builderRecipeNames.filter(
    name => !mainRecipeNames.includes(name)
  );

  if (missingInBuilder.length > 0) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'missing_in_builder',
      message: `Recipes missing in recipe builder: ${missingInBuilder.join(', ')}`,
    });
    log.error(
      `Recipes missing in recipe builder: ${missingInBuilder.join(', ')}`
    );
  }

  if (missingInMain.length > 0) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'missing_in_main',
      message: `Recipes missing in main project: ${missingInMain.join(', ')}`,
    });
    log.error(`Recipes missing in main project: ${missingInMain.join(', ')}`);
  }

  if (missingInBuilder.length === 0 && missingInMain.length === 0) {
    log.success('All recipe files are synchronized between projects');
    validationResults.passed++;
  }
}

/**
 * Validation 2: Dependency Conflicts
 */
function validateDependencyConflicts() {
  log.header('2. Dependency Conflict Validation');

  try {
    const mainPackage = readPackageJson(PROJECT_ROOT);
    const builderPackage = readPackageJson(RECIPE_BUILDER_PATH);

    const mainDeps = {
      ...mainPackage.dependencies,
      ...mainPackage.devDependencies,
    };
    const builderDeps = {
      ...builderPackage.dependencies,
      ...builderPackage.devDependencies,
    };

    const sharedDeps = {};
    const conflicts = [];

    // Find shared dependencies
    for (const [dep, version] of Object.entries(mainDeps)) {
      if (builderDeps[dep]) {
        sharedDeps[dep] = {
          main: version,
          builder: builderDeps[dep],
        };

        // Check for version conflicts
        if (version !== builderDeps[dep]) {
          conflicts.push({
            dependency: dep,
            mainVersion: version,
            builderVersion: builderDeps[dep],
          });
        }
      }
    }

    log.info(`Found ${Object.keys(sharedDeps).length} shared dependencies`);

    if (conflicts.length > 0) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'dependency_conflicts',
        message: `Found ${conflicts.length} dependency version conflicts`,
      });

      log.error(`Found ${conflicts.length} dependency version conflicts:`);
      conflicts.forEach(conflict => {
        log.error(
          `  ${conflict.dependency}: Main=${conflict.mainVersion}, Builder=${conflict.builderVersion}`
        );
      });
    } else {
      log.success('No dependency version conflicts found');
      validationResults.passed++;
    }

    // Check for critical shared dependencies
    const criticalDeps = ['typescript', 'next', 'react', 'react-dom'];
    const missingCritical = criticalDeps.filter(dep => !sharedDeps[dep]);

    if (missingCritical.length > 0) {
      validationResults.warnings++;
      log.warning(
        `Missing critical shared dependencies: ${missingCritical.join(', ')}`
      );
    }
  } catch (error) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'package_json_error',
      message: `Failed to read package.json files: ${error.message}`,
    });
    log.error(`Failed to read package.json files: ${error.message}`);
  }
}

/**
 * Validation 3: TypeScript Type Compatibility
 */
function validateTypeScriptCompatibility() {
  log.header('3. TypeScript Type Compatibility Validation');

  try {
    // Check if both projects have TypeScript configuration
    const mainTsConfig = path.join(PROJECT_ROOT, 'tsconfig.json');
    const builderTsConfig = path.join(RECIPE_BUILDER_PATH, 'tsconfig.json');

    if (!fs.existsSync(mainTsConfig)) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_tsconfig',
        message: 'Main project missing tsconfig.json',
      });
      log.error('Main project missing tsconfig.json');
    }

    if (!fs.existsSync(builderTsConfig)) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_tsconfig',
        message: 'Recipe builder missing tsconfig.json',
      });
      log.error('Recipe builder missing tsconfig.json');
    }

    if (fs.existsSync(mainTsConfig) && fs.existsSync(builderTsConfig)) {
      const mainConfig = readJsonFile(mainTsConfig);
      const builderConfig = readJsonFile(builderTsConfig);

      // Check for compatible TypeScript settings
      const mainStrict = mainConfig.compilerOptions?.strict;
      const builderStrict = builderConfig.compilerOptions?.strict;

      if (mainStrict !== builderStrict) {
        validationResults.warnings++;
        log.warning(
          `TypeScript strict mode mismatch: Main=${mainStrict}, Builder=${builderStrict}`
        );
      }

      log.success('TypeScript configurations found and validated');
      validationResults.passed++;
    }
  } catch (error) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'typescript_config_error',
      message: `Failed to validate TypeScript configurations: ${error.message}`,
    });
    log.error(`Failed to validate TypeScript configurations: ${error.message}`);
  }
}

/**
 * Validation 4: Recipe Slug Uniqueness
 */
function validateRecipeSlugUniqueness() {
  log.header('4. Recipe Slug Uniqueness Validation');

  try {
    const mainRecipes = getMarkdownFiles(RECIPES_PATH);
    const builderRecipes = getMarkdownFiles(RECIPE_BUILDER_RECIPES_PATH);

    const allRecipes = [...mainRecipes, ...builderRecipes];
    const slugCounts = {};
    const slugFiles = {};
    const duplicates = [];

    for (const recipeFile of allRecipes) {
      const content = fs.readFileSync(recipeFile, 'utf8');
      // Extract slug from YAML frontmatter
      const slugMatch = content.match(
        /^---\s*\n(?:[\s\S]*?)\nslug:\s*([^\n\r]+)/m
      );
      if (slugMatch) {
        const slug = slugMatch[1].trim().replace(/^['"]|['"]$/g, '');
        slugCounts[slug] = (slugCounts[slug] || 0) + 1;
        if (!slugFiles[slug]) slugFiles[slug] = [];
        slugFiles[slug].push(path.relative(PROJECT_ROOT, recipeFile));
      }
    }

    // Check for slugs that appear more than once per project or more than twice overall
    const mainRecipeSlugs = new Set();
    const builderRecipeSlugs = new Set();
    for (const recipeFile of mainRecipes) {
      const content = fs.readFileSync(recipeFile, 'utf8');
      const slugMatch = content.match(
        /^---\s*\n(?:[\s\S]*?)\nslug:\s*([^\n\r]+)/m
      );
      if (slugMatch) {
        const slug = slugMatch[1].trim().replace(/^['"]|['"]$/g, '');
        if (mainRecipeSlugs.has(slug)) {
          duplicates.push({
            slug,
            file: path.relative(PROJECT_ROOT, recipeFile),
          });
        } else {
          mainRecipeSlugs.add(slug);
        }
      }
    }
    for (const recipeFile of builderRecipes) {
      const content = fs.readFileSync(recipeFile, 'utf8');
      const slugMatch = content.match(
        /^---\s*\n(?:[\s\S]*?)\nslug:\s*([^\n\r]+)/m
      );
      if (slugMatch) {
        const slug = slugMatch[1].trim().replace(/^['"]|['"]$/g, '');
        if (builderRecipeSlugs.has(slug)) {
          duplicates.push({
            slug,
            file: path.relative(PROJECT_ROOT, recipeFile),
          });
        } else {
          builderRecipeSlugs.add(slug);
        }
      }
    }
    // Now check for slugs that appear more than twice across both projects
    for (const [slug, count] of Object.entries(slugCounts)) {
      if (count > 2) {
        slugFiles[slug].forEach(file => {
          duplicates.push({ slug, file });
        });
      }
    }

    if (duplicates.length > 0) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'duplicate_slugs',
        message: `Found ${duplicates.length} duplicate recipe slugs`,
      });

      log.error(`Found ${duplicates.length} duplicate recipe slugs:`);
      duplicates.forEach(dup => {
        log.error(`  Slug \"${dup.slug}\" in file: ${dup.file}`);
      });
    } else {
      log.success(
        `All recipe slugs are unique per project and not duplicated across both projects`
      );
      validationResults.passed++;
    }
  } catch (error) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'slug_validation_error',
      message: `Failed to validate recipe slugs: ${error.message}`,
    });
    log.error(`Failed to validate recipe slugs: ${error.message}`);
  }
}

/**
 * Validation 5: Hebrew Constants Consistency
 */
function validateHebrewConstantsConsistency() {
  log.header('5. Hebrew Constants Consistency Validation');

  try {
    const mainConstantsPath = path.join(PROJECT_ROOT, 'lib', 'constants.ts');
    const builderConstantsPath = path.join(
      RECIPE_BUILDER_PATH,
      'lib',
      'constants.ts'
    );

    if (!fs.existsSync(mainConstantsPath)) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_constants',
        message: 'Main project missing lib/constants.ts',
      });
      log.error('Main project missing lib/constants.ts');
      return;
    }

    if (!fs.existsSync(builderConstantsPath)) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_constants',
        message: 'Recipe builder missing lib/constants.ts',
      });
      log.error('Recipe builder missing lib/constants.ts');
      return;
    }

    const mainConstants = fs.readFileSync(mainConstantsPath, 'utf8');
    const builderConstants = fs.readFileSync(builderConstantsPath, 'utf8');

    // Check for HEBREW_TEXTS and HEBREW_TAGS constants
    const requiredConstants = ['HEBREW_TEXTS', 'HEBREW_TAGS'];
    const missingInMain = [];
    const missingInBuilder = [];

    for (const constant of requiredConstants) {
      if (!mainConstants.includes(constant)) {
        missingInMain.push(constant);
      }
      if (!builderConstants.includes(constant)) {
        missingInBuilder.push(constant);
      }
    }

    if (missingInMain.length > 0) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_hebrew_constants',
        message: `Main project missing Hebrew constants: ${missingInMain.join(', ')}`,
      });
      log.error(
        `Main project missing Hebrew constants: ${missingInMain.join(', ')}`
      );
    }

    if (missingInBuilder.length > 0) {
      validationResults.failed++;
      validationResults.errors.push({
        type: 'missing_hebrew_constants',
        message: `Recipe builder missing Hebrew constants: ${missingInBuilder.join(', ')}`,
      });
      log.error(
        `Recipe builder missing Hebrew constants: ${missingInBuilder.join(', ')}`
      );
    }

    if (missingInMain.length === 0 && missingInBuilder.length === 0) {
      log.success('Hebrew constants found in both projects');
      validationResults.passed++;
    }
  } catch (error) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'constants_validation_error',
      message: `Failed to validate Hebrew constants: ${error.message}`,
    });
    log.error(`Failed to validate Hebrew constants: ${error.message}`);
  }
}

/**
 * Validation 6: Recipe Content Validation
 */
function validateRecipeContent() {
  log.header('6. Recipe Content Validation');

  try {
    const mainRecipes = getMarkdownFiles(RECIPES_PATH);
    const builderRecipes = getMarkdownFiles(RECIPE_BUILDER_RECIPES_PATH);

    const allRecipes = [...mainRecipes, ...builderRecipes];
    let validRecipes = 0;
    let invalidRecipes = 0;

    for (const recipeFile of allRecipes) {
      const content = fs.readFileSync(recipeFile, 'utf8');
      const relativePath = path.relative(PROJECT_ROOT, recipeFile);

      // Check for required YAML frontmatter
      if (!content.startsWith('---')) {
        validationResults.errors.push({
          type: 'missing_frontmatter',
          message: `Recipe missing YAML frontmatter: ${relativePath}`,
        });
        log.error(`Recipe missing YAML frontmatter: ${relativePath}`);
        invalidRecipes++;
        continue;
      }

      // Check for required fields
      const requiredFields = [
        'title',
        'slug',
        'tags',
        'ingredients',
        'instructions',
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!content.includes(`${field}:`)) {
          missingFields.push(field);
        }
      }

      if (missingFields.length > 0) {
        validationResults.errors.push({
          type: 'missing_required_fields',
          message: `Recipe missing required fields: ${missingFields.join(', ')} in ${relativePath}`,
        });
        log.error(
          `Recipe missing required fields: ${missingFields.join(', ')} in ${relativePath}`
        );
        invalidRecipes++;
      } else {
        validRecipes++;
      }
    }

    if (invalidRecipes > 0) {
      validationResults.failed++;
      log.error(
        `Found ${invalidRecipes} invalid recipes out of ${allRecipes.length} total`
      );
    } else {
      log.success(`All ${validRecipes} recipes have valid content structure`);
      validationResults.passed++;
    }
  } catch (error) {
    validationResults.failed++;
    validationResults.errors.push({
      type: 'content_validation_error',
      message: `Failed to validate recipe content: ${error.message}`,
    });
    log.error(`Failed to validate recipe content: ${error.message}`);
  }
}

/**
 * Print validation summary
 */
function printValidationSummary() {
  log.header('Cross-Project Validation Summary');

  console.log(`\n${colors.bright}Results:${colors.reset}`);
  console.log(
    `  ✅ Passed: ${colors.green}${validationResults.passed}${colors.reset}`
  );
  console.log(
    `  ❌ Failed: ${colors.red}${validationResults.failed}${colors.reset}`
  );
  console.log(
    `  ⚠️  Warnings: ${colors.yellow}${validationResults.warnings}${colors.reset}`
  );

  if (validationResults.errors.length > 0) {
    console.log(`\n${colors.bright}${colors.red}Errors:${colors.reset}`);
    validationResults.errors.forEach((error, index) => {
      console.log(
        `  ${index + 1}. ${colors.red}${error.type}:${colors.reset} ${error.message}`
      );
    });
  }

  if (validationResults.failed > 0) {
    console.log(
      `\n${colors.red}${colors.bright}❌ Cross-project validation failed!${colors.reset}`
    );
    process.exit(1);
  } else if (validationResults.warnings > 0) {
    console.log(
      `\n${colors.yellow}${colors.bright}⚠️  Cross-project validation completed with warnings${colors.reset}`
    );
  } else {
    console.log(
      `\n${colors.green}${colors.bright}✅ Cross-project validation passed successfully!${colors.reset}`
    );
  }
}

/**
 * Main validation function
 */
function runCrossProjectValidation() {
  console.log(
    `${colors.bright}${colors.cyan}🔍 Cross-Project Validation Script${colors.reset}`
  );
  console.log(
    `${colors.cyan}Validating consistency between main project and recipe builder...${colors.reset}\n`
  );

  try {
    validateRecipeFormatConsistency();
    validateDependencyConflicts();
    validateTypeScriptCompatibility();
    validateRecipeSlugUniqueness();
    validateHebrewConstantsConsistency();
    validateRecipeContent();

    printValidationSummary();
  } catch (error) {
    log.error(`Validation script failed: ${error.message}`);
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  runCrossProjectValidation();
}

module.exports = {
  runCrossProjectValidation,
  validationResults,
};
