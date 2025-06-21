# PRD: Recipe Description Feature

## Overview

Add a structured `description` field to the recipe format to provide a brief, searchable description of each recipe that appears on the website.

## Problem Statement

Currently, recipes only have a title, but no structured description field. Users can't quickly understand what a recipe is about without reading the full ingredients and instructions. The content after YAML frontmatter (like descriptions) is not displayed on the website.

## Goals

1. Add a structured `description` field to the recipe YAML frontmatter
2. Display the description on recipe cards and recipe pages
3. Make descriptions searchable
4. Maintain backward compatibility with existing recipes

## Functional Requirements

### 1. Recipe Format Enhancement

- Add optional `description` field to YAML frontmatter
- Description should be a single string in Hebrew
- Field should be optional (backward compatibility)
- Maximum length: 200 characters (to keep cards clean)

### 2. Recipe Card Display

- Show description below the title on recipe cards
- Limit display to 2-3 lines maximum
- Use appropriate typography and spacing
- Handle missing descriptions gracefully

### 3. Recipe Page Display

- Show full description prominently on recipe pages
- Position between title and ingredients
- Use appropriate styling for readability

### 4. Search Integration

- Include description text in search results
- Weight description matches appropriately
- Update search index to include descriptions

### 5. Backward Compatibility

- Existing recipes without descriptions should work normally
- No breaking changes to current functionality
- Graceful handling of missing description field

## User Stories

### As a recipe creator

- I want to add a brief description to my recipe so users understand what it is
- I want the description to be searchable so users can find my recipe
- I want the description to appear on recipe cards and pages

### As a recipe reader

- I want to see a brief description of recipes so I can quickly understand what they are
- I want to search for recipes by description content
- I want descriptions to help me decide which recipe to cook

### As a family member

- I want descriptions to help me remember what each recipe is about
- I want descriptions to include family context or memories

## Technical Requirements

### Data Structure

```yaml
---
title: 'Recipe Title'
slug: 'recipe-slug'
description: 'Brief description in Hebrew'
tags: ['tag1', 'tag2']
ingredients: [...]
instructions: '...'
---
```

### Components to Update

- Recipe type definition in `lib/recipes.ts`
- Recipe card component
- Recipe page component
- Search functionality
- Recipe format documentation

### Validation

- Description field is optional
- Maximum 200 characters
- Hebrew text support
- YAML syntax validation

## Success Metrics

1. All existing recipes continue to work without modification
2. New recipes can include descriptions
3. Descriptions appear on recipe cards and pages
4. Search includes description content
5. No performance degradation

## Constraints

- Must maintain RTL Hebrew text support
- Must work with static site generation
- Must not break existing recipe parsing
- Must be optional for backward compatibility
- **Must avoid style changes as much as possible**
- **When style changes are unavoidable, must present plan and wait for user approval before implementation**

## Future Considerations

- Consider adding description to recipe exports
- Consider adding description to recipe sharing
- Consider adding description to recipe analytics
