# Family Recipe Book

A minimalist family recipe book website built with Next.js, featuring Hebrew RTL content, real-time search, and static export for GitHub Pages hosting.

## Features

- 📖 **Hebrew RTL Support**: Full right-to-left text direction and Hebrew typography
- 🔍 **Real-time Search**: Instant search using Fuse.js with Hebrew text support
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🏷️ **Tag-based Navigation**: Clickable tags for easy recipe discovery
- ✅ **Interactive Ingredients**: Checkboxes with session storage persistence
- 📋 **Copy/Share Functionality**: Copy ingredient lists and share recipes
- 🎨 **Modern UI**: Clean, minimalist design with smooth animations
- 📊 **Progress Tracking**: Visual progress indicators for recipe steps
- 🔧 **Font Size Controls**: Adjustable text size with localStorage persistence

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Search**: Fuse.js for fuzzy Hebrew text search
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static export)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/levy729/family-recipe-book.git
cd family-recipe-book
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Recipes

Recipes are stored as Markdown files in the `recipes/` directory with YAML frontmatter:

```markdown
---
title: 'Recipe Title'
slug: 'recipe-slug'
tags: ['tag1', 'tag2']
ingredients:
  - 'Ingredient 1'
  - 'Ingredient 2'
instructions: |
  1. Step one
  2. Step two
  3. Step three
---

Recipe description here...
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
family-recipe-book/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utility functions
├── recipes/                # Recipe markdown files
├── public/                 # Static assets
└── .github/workflows/      # GitHub Actions workflows
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
