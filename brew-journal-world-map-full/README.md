# Brew Journal + World Map
- React + Vite + TypeScript + HashRouter
- Beans/Brews CRUD (localStorage)
- PDF export for selected brews
- World map by tried origins

## Run
```
npm install
npm run dev
```

## Deploy to GitHub Pages

### A) Project in its own repo (name: brew-journal-world-map)
- `vite.config.ts` is already `base: '/brew-journal-world-map/'`.
- In GitHub → Settings → Pages → Source: **GitHub Actions**.
- Add a standard Pages workflow that builds and deploys `/dist`.

### B) Project inside `Nish1423.github.io/brew-journal-world-map/`
- Use a **subfolder-aware** workflow at the root of `Nish1423.github.io` that `cd`s into `brew-journal-world-map`, runs build, then publishes under `/brew-journal-world-map/`.
- Example workflow provided in chat earlier.
