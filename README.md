# Family Recipe Book

A minimalist, publicly accessible family recipe book website with Hebrew RTL content built with Next.js, shadcn/ui, and Tailwind CSS.

## Features

- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🔍 **Real-time Search** - Hebrew text search with Fuse.js
- 🏷️ **Clickable Tags** - Navigate between recipes by tags
- 📝 **Interactive Ingredients** - Check off ingredients as you cook
- 📋 **Progress Tracking** - Mark recipe steps as complete
- 🎨 **Font Size Controls** - Adjustable text size with persistence
- 📤 **Web Share API** - Native sharing on supported devices
- 🌐 **RTL Support** - Full Hebrew right-to-left layout support
- 💾 **Session Storage** - Remember ingredient checkboxes and preferences

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Search**: Fuse.js for fuzzy Hebrew text search
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/family-recipe-book.git
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

### Building for Production

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Recipe Format

Recipes are stored as Markdown files with YAML frontmatter in the `recipes/` directory:

```markdown
---
title: "עוגת שוקולד קלה"
slug: "easy-chocolate-cake"
tags: ["עוגה", "קינוח", "שוקולד"]
ingredients: ["2 ביצים", "1 כוס סוכר", "1 כוס קקאו"]
instructions: "1. מחממים תנור ל-180 מעלות.\n2. מערבבים את כל החומרים בקערה.\n3. יוצקים לתבנית ואופים כ-30 דקות."
---

Recipe description here...
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` directory to your web server.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the `main` branch to trigger automatic deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE). 