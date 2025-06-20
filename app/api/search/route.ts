import { NextRequest, NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/recipes';
import { initializeSearch, searchRecipes } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    // Get all recipes
    const allRecipes = await getAllRecipes();
    
    // Initialize search
    initializeSearch(allRecipes);
    
    // Perform search
    const results = searchRecipes(query);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
} 