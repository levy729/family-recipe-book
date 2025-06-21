# Recipe Format Guide

This guide explains how to structure recipes for the Family Recipe Book. All recipes should be written in Markdown format with YAML frontmatter.

## File Structure

- Place all recipe files in the `recipes/` directory
- Use `.md` extension for all recipe files
- Use descriptive filenames that match the recipe slug

## YAML Frontmatter

Every recipe must start with YAML frontmatter enclosed by `---` markers. The frontmatter contains metadata about the recipe.

### Required Fields

```yaml
---
title: "Recipe Title in Hebrew"
slug: "recipe-slug-in-english"
---
```

### Optional Fields

```yaml
---
title: "Recipe Title in Hebrew"
slug: "recipe-slug-in-english"
tags: ["tag1", "tag2", "tag3"]
ingredients:
  - "1 cup ingredient"
  - "2 tablespoons ingredient"
  - "1/2 teaspoon ingredient"
instructions: |
  שוטפים את האורז היטב במסננת.
  מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.
  מוסיפים מים ומלח, מביאים לרתיחה.
  מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.
  מכבים את האש ומשאירים מכוסה 5 דקות.
  מפרידים בעדינות עם מזלג ומגישים.
---
```

## Complete Example

```markdown
---
title: "אורז לבן פשוט"
slug: "simple-white-rice"
tags: ["אורז", "תוספת", "קל"]
ingredients:
  - "1 כוס אורז לבן"
  - "1.5 כוסות מים"
  - "1 כף שמן"
  - "1/2 כפית מלח"
instructions: |
  שוטפים את האורז היטב במסננת.
  מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.
  מוסיפים מים ומלח, מביאים לרתיחה.
  מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.
  מכבים את האש ומשאירים מכוסה 5 דקות.
  מפרידים בעדינות עם מזלג ומגישים.
---

אורז לבן פשוט, רך וטעים שמתאים לכל ארוחה.

## טיפים להכנה
- חשוב לשטוף את האורז היטב לפני הבישול
- אל תפתחו את המכסה במהלך הבישול
- ניתן להוסיף תבלינים נוספים לפי הטעם

*Note: The content below the YAML frontmatter (like "טיפים להכנה") is just regular markdown content and can be structured however you prefer. This content is currently not displayed on the website but is planned for future implementation.*
```

## Field Descriptions

### title
- **Required**: The recipe title in Hebrew
- **Format**: String in quotes
- **Example**: `"אורז לבן פשוט"`

### slug
- **Required**: URL-friendly identifier in English
- **Format**: Lowercase, hyphens instead of spaces
- **Example**: `"simple-white-rice"`

### tags
- **Optional**: Categories for searching and filtering
- **Format**: Array of strings in Hebrew
- **Example**: `["אורז", "תוספת", "קל"]`

### ingredients
- **Optional**: List of ingredients with quantities
- **Format**: Array of strings
- **Example**: 
  ```yaml
  ingredients:
    - "1 כוס אורז לבן"
    - "1.5 כוסות מים"
    - "1 כף שמן"
  ```

### instructions
- **Optional**: Step-by-step cooking instructions
- **Format**: Multi-line string using `|` for line breaks
- **Important**: Do NOT number the steps manually - they are automatically numbered
- **Example**:
  ```yaml
  instructions: |
    שוטפים את האורז היטב במסננת.
    מחממים שמן בסיר קטן, מוסיפים את האורז ומטגנים כדקה.
    מוסיפים מים ומלח, מביאים לרתיחה.
    מכסים, מנמיכים לאש נמוכה ומבשלים 18 דקות.
    מכבים את האש ומשאירים מכוסה 5 דקות.
    מפרידים בעדינות עם מזלג ומגישים.
  ```

## Content Section

After the YAML frontmatter, you can add additional content in Markdown format. This content can include:

- **Description**: Brief description of the recipe
- **Tips**: Cooking tips and variations (using any heading you prefer)
- **Notes**: Additional information about ingredients or techniques
- **Serving suggestions**: How to serve or pair the dish
- **Personal touches**: Family traditions or memories

**Note**: These are just regular markdown headings and content - they are not structured fields in the YAML frontmatter. You can use any headings and structure that makes sense for your recipe.

**Important**: Content after the YAML frontmatter is currently **not displayed on the website**. This feature is planned for future implementation. For now, focus on the structured fields (title, slug, tags, ingredients, instructions) which are fully supported and displayed.

## Best Practices

### Naming Conventions
- Use descriptive, clear titles in Hebrew
- Create unique slugs that are easy to remember
- Use consistent naming patterns across recipes

### Tags
- Use relevant tags for easy searching
- Common tag categories:
  - **Course**: `["עיקרי", "תוספת", "קינוח", "ארוחת בוקר"]`
  - **Cuisine**: `["איטלקי", "אסייתי", "ים תיכוני"]`
  - **Difficulty**: `["קל", "בינוני", "מתקדם"]`
  - **Dietary**: `["צמחוני", "טבעוני", "ללא גלוטן"]`

### Ingredients
- List ingredients in order of use
- Include precise measurements
- Use consistent units (כוס, כף, כפית, גרם, קילו)
- Specify ingredient types when relevant (e.g., "שמן זית", "קמח לבן")

### Instructions
- Write each step on a separate line
- Do NOT number the steps manually - they are automatically numbered
- Use clear, concise language
- Include timing information when important
- Mention specific techniques or equipment needed

### Content
- Keep descriptions concise but informative
- Include helpful tips and variations
- Add personal touches or family traditions
- Consider including serving size information

## Validation

The recipe parser will validate:
- Required fields (title, slug) are present
- YAML syntax is correct
- File has proper `.md` extension
- Slug is URL-friendly

## Troubleshooting

### Common Issues
1. **YAML syntax errors**: Ensure proper indentation and quote usage
2. **Missing required fields**: Title and slug are mandatory
3. **Invalid slug format**: Use only lowercase letters, numbers, and hyphens
4. **File encoding**: Save files in UTF-8 encoding for Hebrew text

### Testing Your Recipe
- Check that the recipe displays correctly on the website
- Verify that search functionality finds your recipe
- Test that tags work for filtering
- Ensure ingredient checkboxes function properly

## Example Templates

### Simple Recipe
```markdown
---
title: "שם המתכון"
slug: "recipe-name"
tags: ["קטגוריה"]
ingredients:
  - "מרכיב 1"
  - "מרכיב 2"
instructions: |
  שלב ראשון
  שלב שני
---

תיאור קצר של המתכון.
```

### Complex Recipe
```markdown
---
title: "שם המתכון המורכב"
slug: "complex-recipe-name"
tags: ["קטגוריה1", "קטגוריה2", "קושי"]
ingredients:
  - "מרכיב 1 - כמות מדויקת"
  - "מרכיב 2 - כמות מדויקת"
  - "מרכיב 3 - כמות מדויקת"
instructions: |
  הכנה ראשונית
  שלב בישול ראשון (10 דקות)
  שלב בישול שני (15 דקות)
  הגשה

תיאור מפורט של המתכון.

## טיפים חשובים
- טיפ 1
- טיפ 2

## הערות
מידע נוסף על המתכון או המרכיבים.
```

This format ensures consistency across all recipes and enables the website's search, filtering, and interactive features to work properly. 