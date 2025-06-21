export default function RecipeBuilderPage() {
  return (
    <div className="recipe-builder-container">
      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">
            Recipe Builder
          </h2>
          <p className="text-zinc-600 mb-6">
            כלי ליצירה ועריכה של מתכונים עם תמיכה בעברית
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 rounded-lg p-4">
              <h3 className="font-medium text-zinc-900 mb-2">
                יצירת מתכון חדש
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                צור מתכון חדש עם ממשק ידידותי לעברית
              </p>
              <button className="btn btn-primary w-full">צור מתכון חדש</button>
            </div>

            <div className="bg-zinc-50 rounded-lg p-4">
              <h3 className="font-medium text-zinc-900 mb-2">
                עריכת מתכון קיים
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                ערוך מתכונים קיימים בקלות
              </p>
              <button className="btn btn-secondary w-full">
                בחר מתכון לעריכה
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
