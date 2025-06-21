'use client';

import { useState } from 'react';
import { HEBREW_TEXTS, HEBREW_TAGS } from '@/lib/constants';
import { RecipeFormData } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecipeFormProps {
  initialData?: Partial<RecipeFormData>;
  onSubmit: (data: RecipeFormData) => void;
  onCancel?: () => void;
}

export function RecipeForm({
  initialData,
  onSubmit,
  onCancel,
}: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    ingredients: initialData?.ingredients || [''],
    instructions: initialData?.instructions || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');

  // Tag suggestions - sorted alphabetically for better UX
  const tagSuggestions = [...HEBREW_TAGS].sort();

  // Auto-generate slug from Hebrew title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[\u0590-\u05FF]/g, '') // Remove Hebrew characters
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title }));

    // Auto-generate slug if it's empty or was auto-generated
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      setFormData(prev => ({ ...prev, slug: generateSlug(title) }));
    }
  };

  const handleSlugChange = (slug: string) => {
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag as any)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag as any],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!formData.tags.includes(suggestion as any)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, suggestion as any],
      }));
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) =>
        i === index ? value : ingredient
      ),
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const handleInstructionsChange = (instructions: string) => {
    setFormData(prev => ({ ...prev, instructions }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = HEBREW_TEXTS.TITLE_REQUIRED;
    }

    if (!formData.slug.trim()) {
      newErrors.slug = HEBREW_TEXTS.SLUG_REQUIRED;
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = HEBREW_TEXTS.SLUG_INVALID;
    }

    if (
      formData.ingredients.length === 0 ||
      formData.ingredients.every(i => !i.trim())
    ) {
      newErrors.ingredients = HEBREW_TEXTS.AT_LEAST_ONE_INGREDIENT;
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = HEBREW_TEXTS.AT_LEAST_ONE_INSTRUCTION;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Clean up empty ingredients
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(ingredient =>
          ingredient.trim()
        ),
      };
      onSubmit(cleanedData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-right">
            {HEBREW_TEXTS.TITLE_LABEL}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-700 mb-2 text-right"
              >
                {HEBREW_TEXTS.TITLE_LABEL}
              </label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder={HEBREW_TEXTS.TITLE_PLACEHOLDER}
                className="text-right"
                dir="rtl"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1 text-right">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Slug Input */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-zinc-700 mb-2 text-right"
              >
                {HEBREW_TEXTS.SLUG_LABEL}
              </label>
              <Input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={e => handleSlugChange(e.target.value)}
                placeholder={HEBREW_TEXTS.SLUG_PLACEHOLDER}
                className="text-left"
                dir="ltr"
              />
              {errors.slug && (
                <p className="text-red-600 text-sm mt-1 text-right">
                  {errors.slug}
                </p>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-700 mb-2 text-right"
              >
                {HEBREW_TEXTS.DESCRIPTION_LABEL}
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={e => handleDescriptionChange(e.target.value)}
                placeholder={HEBREW_TEXTS.DESCRIPTION_PLACEHOLDER}
                className="w-full p-3 border border-zinc-300 rounded-md resize-none text-right"
                dir="rtl"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">
            {HEBREW_TEXTS.TAGS_LABEL}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Tag Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                placeholder={HEBREW_TEXTS.TAG_INPUT_PLACEHOLDER}
                className="flex-1 text-right"
                dir="rtl"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                {HEBREW_TEXTS.TAG_ADD_BUTTON}
              </Button>
            </div>

            {/* Current Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-zinc-100 text-zinc-700 px-3 py-1 rounded-md text-sm"
                  >
                    <span className="text-right">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-zinc-500 hover:text-zinc-700 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tag Suggestions */}
            <div>
              <p className="text-sm text-zinc-600 mb-2 text-right">
                {HEBREW_TEXTS.TAG_SUGGESTIONS_LABEL}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {tagSuggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={formData.tags.includes(suggestion as any)}
                    className={`p-2 text-sm rounded-md border transition-colors text-right ${
                      formData.tags.includes(suggestion as any)
                        ? 'bg-zinc-200 text-zinc-500 border-zinc-200 cursor-not-allowed'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">
            {HEBREW_TEXTS.INGREDIENTS_LABEL}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={ingredient}
                  onChange={e => handleIngredientChange(index, e.target.value)}
                  placeholder={HEBREW_TEXTS.INGREDIENT_PLACEHOLDER}
                  className="flex-1 text-right"
                  dir="rtl"
                />
                {formData.ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeIngredient(index)}
                    className="px-3"
                  >
                    {HEBREW_TEXTS.REMOVE}
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              className="w-full"
            >
              {HEBREW_TEXTS.ADD_INGREDIENT}
            </Button>
            {errors.ingredients && (
              <p className="text-red-600 text-sm text-right">
                {errors.ingredients}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">
            {HEBREW_TEXTS.INSTRUCTIONS_LABEL}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={formData.instructions}
            onChange={e => handleInstructionsChange(e.target.value)}
            placeholder={HEBREW_TEXTS.INSTRUCTION_PLACEHOLDER}
            className="w-full p-3 border border-zinc-300 rounded-md resize-none text-right"
            dir="rtl"
            rows={8}
          />
          {errors.instructions && (
            <p className="text-red-600 text-sm mt-1 text-right">
              {errors.instructions}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {HEBREW_TEXTS.CANCEL}
          </Button>
        )}
        <Button type="submit">{HEBREW_TEXTS.SAVE_RECIPE}</Button>
      </div>
    </form>
  );
}
