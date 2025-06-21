'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HEBREW_TEXTS } from '@/lib/constants';
import { loadRecipeFromFile, createFileInput } from '@/lib/file-operations';
import { RecipeFormData } from '@/types/recipe';

interface FileBrowserProps {
  onRecipeLoad: (data: RecipeFormData) => void;
  onCancel: () => void;
}

export function FileBrowser({ onRecipeLoad, onCancel }: FileBrowserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await loadRecipeFromFile(file);

      if (result.success && result.data) {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => {
          onRecipeLoad(result.data!);
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'שגיאה בטעינת הקובץ' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrowseClick = () => {
    if (!fileInputRef.current) {
      const input = createFileInput(handleFileSelect);
      fileInputRef.current = input;
      document.body.appendChild(input);
    }
    fileInputRef.current.click();
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
              בחר קובץ מתכון קיים לעריכה
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

            <div className="space-y-3">
              <Button
                onClick={handleBrowseClick}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'טוען...' : 'בחר קובץ מתכון'}
              </Button>

              <div className="text-sm text-zinc-500 text-right">
                <p>תמיכה בקבצי .md בלבד</p>
                <p>הקובץ חייב להיות בפורמט מתכון תקין</p>
              </div>
            </div>
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
