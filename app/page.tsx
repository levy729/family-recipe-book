import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          ספר מתכונים משפחתי
        </h1>
        <p className="text-xl text-zinc-600 mb-8">
          Family Recipe Book
        </p>
        <Button variant="default" size="lg">
          התחל חיפוש
        </Button>
      </div>
    </main>
  )
} 