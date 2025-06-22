'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HEBREW_TEXTS } from '@/lib/constants';
import {
  getAvailableRecipes,
  loadRecipeBySlug,
  deleteRecipe,
} from '@/lib/file-operations';
import { RecipeFormData } from '@/types/recipe';

interface FileBrowserProps {
  onRecipeLoad: (data: RecipeFormData) => void;
  onCancel: () => void;
}

interface RecipeItem {
  filename: string;
  title: string;
  slug: string;
}

export function FileBrowser({ onRecipeLoad, onCancel }: FileBrowserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Load available recipes on component mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setIsLoading(true);
    try {
      const availableRecipes = await getAvailableRecipes();
      setRecipes(availableRecipes);
    } catch (error) {
      setMessage({ type: 'error', text: 'שגיאה בטעינת רשימת המתכונים' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeSelect = async (slug: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await loadRecipeBySlug(slug);

      if (result.success && result.data) {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => {
          onRecipeLoad(result.data!);
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'שגיאה בטעינת המתכון' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (slug: string, title: string) => {
    if (!confirm(`האם אתה בטוח שברצונך למחוק את המתכון "${title}"?`)) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await deleteRecipe(slug);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Reload the recipe list
        await loadRecipes();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'שגיאה במחיקת המתכון' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">{HEBREW_TEXTS.LOAD_RECIPE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-zinc-600 mb-4 text-right">
              בחר מתכון קיים לעריכה
            </p>

            {message && (
              <div
                className={`p-3 rounded-md mb-4 ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            {isLoading && recipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-500">טוען מתכונים...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-500">לא נמצאו מתכונים</p>
                <p className="text-sm text-zinc-400 mt-2">
                  צור מתכון חדש כדי להתחיל
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recipes.map(recipe => (
                  <div
                    key={recipe.slug}
                    className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg hover:bg-zinc-50"
                  >
                    <div className="flex-1 text-right">
                      <h3 className="font-medium text-zinc-900">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-zinc-500">{recipe.filename}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleRecipeSelect(recipe.slug)}
                        disabled={isLoading}
                        size="sm"
                      >
                        ערוך
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteRecipe(recipe.slug, recipe.title)
                        }
                        disabled={isLoading}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        מחק
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" onClick={onCancel}>
              {HEBREW_TEXTS.CANCEL}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
