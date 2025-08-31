# Brew Journal + World Map (React + Vite + HashRouter)

A 100% client-side coffee journal that tracks beans and brews, and shows a world map of the origins you've tried. Works offline (localStorage) and deploys to **GitHub Pages**.

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project.
2. Install deps: `npm install`
3. Build & deploy: `npm run deploy`
4. In your GitHub repo → **Settings → Pages** → set **Source** to `Deploy from a branch`, Branch: `gh-pages` (root).

The app uses **HashRouter**, so deep links work automatically on Pages.

## Features
- Beans: CRUD with validation, filters via search, tried flag
- Brews: log and multi-select → **Export to PDF**
- Map: choropleth by tried beans per country; click a country for details and quick-add
- Import/Export JSON; data lives in localStorage (offline ready)

## Notes
- This is a minimal but complete implementation. You can extend with more filters, charts, and CSV import/export if you like.
