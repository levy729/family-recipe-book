# Deployment Guide

## GitHub Pages Configuration

To deploy this site to GitHub Pages, follow these steps:

### 1. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save the settings

### 2. GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:

- Build the Next.js application
- Generate static files
- Deploy to GitHub Pages automatically

### 3. Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions will automatically:
   - Build the project
   - Create/update the `gh-pages` branch
   - Deploy to GitHub Pages

### 4. Access Your Site

Once deployed, your site will be available at:
`https://[your-username].github.io/[repository-name]/`

### Troubleshooting

If you see the error "Branch 'main' is not allowed to deploy to github-pages due to environment protection rules":

1. Make sure GitHub Pages is configured to use **GitHub Actions** as the source
2. The workflow will automatically create the `gh-pages` branch
3. No manual branch configuration is needed

### Manual Deployment (if needed)

If you need to deploy manually:

```bash
npm run build
# The static files will be in the ./out directory
```

## Local Development

```bash
npm run dev
# Site will be available at http://localhost:3000
```
