#!/usr/bin/env node

/**
 * Recipe Validation Script
 * Validates staged .md files to ensure they follow the correct recipe format
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ANSI color codes for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.error(`❌ ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Validate recipe file format
 */
function validateRecipeFile(filePath) {
  const fileName = path.basename(filePath);
  logInfo(`Validating recipe: ${fileName}`);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      logError(`File not found: ${filePath}`);
      return false;
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file has YAML frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    if (!frontmatterMatch) {
      logError(`${fileName}: Missing or malformed YAML frontmatter`);
      return false;
    }

    // Parse YAML frontmatter
    let frontmatter;
    try {
      frontmatter = yaml.load(frontmatterMatch[1]);
    } catch (yamlError) {
      logError(
        `${fileName}: Invalid YAML syntax in frontmatter: ${yamlError.message}`
      );
      return false;
    }

    // Validate required fields
    const errors = [];

    // Check title
    if (!frontmatter.title) {
      errors.push('Missing required field: title');
    } else if (
      typeof frontmatter.title !== 'string' ||
      frontmatter.title.trim() === ''
    ) {
      errors.push('Title must be a non-empty string');
    }

    // Check slug
    if (!frontmatter.slug) {
      errors.push('Missing required field: slug');
    } else if (
      typeof frontmatter.slug !== 'string' ||
      frontmatter.slug.trim() === ''
    ) {
      errors.push('Slug must be a non-empty string');
    } else if (!/^[a-z0-9-]+$/.test(frontmatter.slug)) {
      errors.push(
        'Slug must contain only lowercase letters, numbers, and hyphens'
      );
    }

    // Validate optional fields if present
    if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
      errors.push('Tags must be an array');
    }

    if (frontmatter.ingredients && !Array.isArray(frontmatter.ingredients)) {
      errors.push('Ingredients must be an array');
    }

    if (
      frontmatter.instructions &&
      typeof frontmatter.instructions !== 'string'
    ) {
      errors.push('Instructions must be a string');
    }

    if (
      frontmatter.description &&
      typeof frontmatter.description !== 'string'
    ) {
      errors.push('Description must be a string');
    }

    // Report errors
    if (errors.length > 0) {
      logError(`${fileName}: Validation failed:`);
      errors.forEach(error => logError(`  - ${error}`));
      return false;
    }

    logSuccess(`${fileName}: Recipe validation passed`);
    return true;
  } catch (error) {
    logError(`${fileName}: Unexpected error: ${error.message}`);
    return false;
  }
}

/**
 * Get staged .md files from git
 */
function getStagedMdFiles() {
  const { execSync } = require('child_process');
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf8',
    });
    return output
      .split('\n')
      .filter(line => line.trim() !== '')
      .filter(file => file.endsWith('.md'))
      .filter(
        file =>
          file.startsWith('recipes/') ||
          file.startsWith('recipe-builder/recipes/')
      );
  } catch (error) {
    logError(`Failed to get staged files: ${error.message}`);
    return [];
  }
}

/**
 * Main validation function
 */
function validateStagedRecipes() {
  logInfo('Starting recipe validation for staged files...');

  const stagedMdFiles = getStagedMdFiles();

  if (stagedMdFiles.length === 0) {
    logInfo('No staged .md files found');
    return true;
  }

  logInfo(`Found ${stagedMdFiles.length} staged .md file(s):`);
  stagedMdFiles.forEach(file => logInfo(`  - ${file}`));

  let allValid = true;

  stagedMdFiles.forEach(file => {
    if (!validateRecipeFile(file)) {
      allValid = false;
    }
  });

  if (allValid) {
    logSuccess('All staged recipe files are valid!');
    return true;
  } else {
    logError('Recipe validation failed. Please fix the errors above.');
    return false;
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const success = validateStagedRecipes();
  process.exit(success ? 0 : 1);
}

module.exports = {
  validateRecipeFile,
  validateStagedRecipes,
  getStagedMdFiles,
};
