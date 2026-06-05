# Matthew Kay — Portfolio

A bold, brutalist personal portfolio for **Matthew Kay**, software developer.
Greyscale aesthetic, asymmetric layouts, oversized type — images are the only
source of colour.

🔗 **Live:** [mattkay02.github.io](https://mattkay02.github.io)

## About

A single-page React app showcasing selected work, open-source contributions, a
set of custom AI-coding skills, the tech stack, and the
[MGKCodes](https://mgkcodes.com) studio. A few things worth calling out:

- **Brutalist greyscale design** — hard edges, no rounded corners, a consistent
  two-line outline-heading pattern, scroll-driven card animations.
- **Live Skills section** — fetches its content at runtime from my
  [skills repo](https://github.com/MattKay02/skills) manifest, so new skills
  appear here without redeploying this site.
- **Performance-tuned** — all imagery is optimised WebP, lazy-loaded below the
  fold, with the LCP image preloaded. Lighthouse (mobile, production): ~92
  Performance · 96 Accessibility · 100 Best Practices · 100 SEO.

## Tech stack

React 19 · Vite 7 · plain CSS Modules · react-icons · deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev        # dev server
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  components/   # one component + its .module.css each
  data/         # projects, contributions, skills (with live-fetch fallback)
  hooks/        # scroll-driven animation hooks
  index.css     # global reset + design tokens
public/         # static assets (headshot, favicon, robots, sitemap)
scripts/        # optimize-images.mjs — one-off WebP converter
docs/           # design-system.md, architecture.md
```

See [`docs/design-system.md`](docs/design-system.md) for the visual language
(tokens, typography, the heading pattern, component catalog) and
[`docs/architecture.md`](docs/architecture.md) for structure, data flow, the
live-Skills fetch, and the build/deploy setup.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
(`npm ci` → `npm run build` → deploy `dist/`).

## License

ISC © Matthew Kay · [github.com/MattKay02](https://github.com/MattKay02) ·
[mgkcodes.com](https://mgkcodes.com)
