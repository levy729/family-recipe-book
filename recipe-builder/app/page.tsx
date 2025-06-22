'use client';

import { useState } from 'react';
import { RecipeForm } from '@/components/recipe-form';
import { FileBrowser } from '@/components/file-browser';
import { RecipeFormData } from '@/types/recipe';
import { HEBREW_TEXTS } from '@/lib/constants';
import { saveRecipe } from '@/lib/file-operations';

export default function RecipeBuilderPage() {
  const [mode, setMode] = useState<'landing' | 'create' | 'edit'>('landing');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [loadedRecipe, setLoadedRecipe] = useState<RecipeFormData | null>(null);

  const handleCreateRecipe = () => {
    setMode('create');
    setLoadedRecipe(null);
  };

  const handleEditRecipe = () => {
    setMode('edit');
  };

  const handleFormSubmit = async (data: RecipeFormData) => {
    setMessage(null);

    try {
      const result = await saveRecipe(data);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });

        // Reset form after successful save
        setTimeout(() => {
          setMode('landing');
          setMessage(null);
          setLoadedRecipe(null);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'שגיאה בשמירת המתכון' });
    }
  };

  const handleRecipeLoad = (data: RecipeFormData) => {
    setLoadedRecipe(data);
    setMode('create');
  };

  const handleCancel = () => {
    setMode('landing');
    setMessage(null);
    setLoadedRecipe(null);
  };

  if (mode === 'create') {
    return (
      <div className="recipe-builder-container">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2 text-center">
              {loadedRecipe
                ? HEBREW_TEXTS.EDIT_RECIPE
                : HEBREW_TEXTS.CREATE_RECIPE}
            </h2>
            {message && (
              <div
                className={`p-3 rounded-md text-center ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>

          <RecipeForm
            initialData={loadedRecipe || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  if (mode === 'edit') {
    return (
      <div className="recipe-builder-container">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2 text-center">
              {HEBREW_TEXTS.EDIT_RECIPE}
            </h2>
          </div>

          <FileBrowser
            onRecipeLoad={handleRecipeLoad}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-builder-container">
      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">
            {HEBREW_TEXTS.RECIPE_BUILDER_TITLE}
          </h2>
          <p className="text-zinc-600 mb-6">
            {HEBREW_TEXTS.RECIPE_BUILDER_SUBTITLE}
          </p>

          {message && (
            <div
              className={`p-3 rounded-md mb-6 ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 rounded-lg p-4">
              <h3 className="font-medium text-zinc-900 mb-2">
                {HEBREW_TEXTS.CREATE_RECIPE}
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                צור מתכון חדש עם ממשק ידידותי לעברית
              </p>
              <button
                className="btn btn-primary w-full"
                onClick={handleCreateRecipe}
              >
                {HEBREW_TEXTS.CREATE_RECIPE}
              </button>
            </div>

            <div className="bg-zinc-50 rounded-lg p-4">
              <h3 className="font-medium text-zinc-900 mb-2">
                {HEBREW_TEXTS.EDIT_RECIPE}
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                ערוך מתכונים קיימים בקלות
              </p>
              <button
                className="btn btn-secondary w-full"
                onClick={handleEditRecipe}
              >
                {HEBREW_TEXTS.LOAD_RECIPE}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
