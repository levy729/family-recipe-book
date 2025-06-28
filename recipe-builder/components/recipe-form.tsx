'use client';

import { useState, useRef, useEffect } from 'react';
import { HEBREW_TEXTS, HEBREW_TAGS } from '@/lib/constants';
import { RecipeFormData } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RecipeFormProps {
  initialData?: Partial<RecipeFormData>;
  onSubmit: (data: RecipeFormData) => void;
  onCancel?: () => void;
}

interface IngredientSortableItemProps {
  id: string;
  index: number;
  ingredient: string;
  onChange: (index: number, value: string) => void;
  onRemove?: (index: number) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  isLast: boolean;
  onTabAdd: () => void;
}

function IngredientSortableItem({
  id,
  index,
  ingredient,
  onChange,
  onRemove,
  inputRef,
  isLast,
  onTabAdd,
}: IngredientSortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#f3f4f6' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex gap-2 items-center"
      {...attributes}
    >
      <span
        {...listeners}
        className="cursor-grab text-zinc-400 hover:text-zinc-600 flex items-center"
      >
        <Menu />
      </span>
      <Input
        type="text"
        value={ingredient}
        onChange={e => onChange(index, e.target.value)}
        placeholder={HEBREW_TEXTS.INGREDIENT_PLACEHOLDER}
        className="flex-1 text-right"
        dir="rtl"
        ref={(el: HTMLInputElement | null) => inputRef(el)}
        onKeyDown={e => {
          // Tab: add new if last and not empty
          if (
            e.key === 'Tab' &&
            !e.shiftKey &&
            ingredient.trim().length > 0 &&
            isLast
          ) {
            e.preventDefault();
            onTabAdd();
          }
          // Shift+Tab: move to previous field
          if (e.key === 'Tab' && e.shiftKey && index > 0) {
            e.preventDefault();
            // Focus previous input if available
            // (parent manages refs)
          }
          // Enter: move to next field or add new if last
          if (e.key === 'Enter') {
            e.preventDefault();
            if (!isLast) {
              // Focus next input if available
              // (parent manages refs)
            } else if (ingredient.trim().length > 0) {
              onTabAdd();
            }
          }
          // Cmd+Backspace (Mac) deletes the current line
          if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            e.metaKey &&
            onRemove &&
            typeof onRemove === 'function'
          ) {
            e.preventDefault();
            onRemove(index);
          }
        }}
      />
      {onRemove && (
        <Button
          type="button"
          variant="outline"
          onClick={() => onRemove(index)}
          className="px-3"
        >
          {HEBREW_TEXTS.REMOVE}
        </Button>
      )}
    </div>
  );
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

  const ingredientRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the last ingredient input when a new one is added
  useEffect(() => {
    if (ingredientRefs.current.length > 0) {
      const lastIndex = formData.ingredients.length - 1;
      const lastRef = ingredientRefs.current[lastIndex];
      if (lastRef) lastRef.focus();
    }
  }, [formData.ingredients.length]);

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
    setFormData(prev => {
      const updated = prev.ingredients.map((ingredient, i) =>
        i === index ? value : ingredient
      );
      // Remove empty/whitespace-only ingredients except the last (for UX)
      const filtered = updated.filter(
        (ing, i, arr) => ing.trim() !== '' || i === arr.length - 1
      );
      return {
        ...prev,
        ingredients: filtered,
      };
    });
  };

  const addIngredient = () => {
    setFormData(prev => {
      // Only add if last ingredient is not empty
      if (
        prev.ingredients.length === 0 ||
        prev.ingredients[prev.ingredients.length - 1].trim() !== ''
      ) {
        return {
          ...prev,
          ingredients: [...prev.ingredients, ''],
        };
      }
      return prev;
    });
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => {
      const filtered = prev.ingredients.filter((_, i) => i !== index);
      // Always keep at least one ingredient field
      return {
        ...prev,
        ingredients: filtered.length > 0 ? filtered : [''],
      };
    });
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

    // Require at least one non-empty ingredient
    const nonEmptyIngredients = formData.ingredients.filter(
      i => i.trim().length > 0
    );
    if (nonEmptyIngredients.length === 0) {
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
        ingredients: formData.ingredients
          .map(ingredient => ingredient.trim())
          .filter(ingredient => ingredient.length > 0),
      };
      onSubmit(cleanedData);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return; // No drop target
    const oldIndex = formData.ingredients.findIndex(
      (_, i) => i.toString() === active.id
    );
    const newIndex = formData.ingredients.findIndex(
      (_, i) => i.toString() === over.id
    );
    if (
      active.id !== over.id &&
      oldIndex !== -1 &&
      newIndex !== -1 &&
      oldIndex >= 0 &&
      oldIndex < formData.ingredients.length &&
      newIndex >= 0 &&
      newIndex < formData.ingredients.length
    ) {
      setFormData(prev => {
        const moved = arrayMove(prev.ingredients, oldIndex, newIndex);
        // Remove empty/whitespace-only ingredients except the last
        const filtered = moved.filter(
          (ing, i, arr) => ing.trim() !== '' || i === arr.length - 1
        );
        return {
          ...prev,
          ingredients: filtered,
        };
      });
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formData.ingredients.map((_, i) => i.toString())}
                strategy={verticalListSortingStrategy}
              >
                {formData.ingredients.map((ingredient, index) => (
                  <IngredientSortableItem
                    key={index}
                    id={index.toString()}
                    index={index}
                    ingredient={ingredient}
                    onChange={handleIngredientChange}
                    onRemove={
                      formData.ingredients.length > 1
                        ? removeIngredient
                        : undefined
                    }
                    inputRef={el => {
                      ingredientRefs.current[index] = el;
                    }}
                    isLast={index === formData.ingredients.length - 1}
                    onTabAdd={addIngredient}
                  />
                ))}
              </SortableContext>
            </DndContext>
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
