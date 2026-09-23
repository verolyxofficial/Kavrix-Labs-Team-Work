# Kavrix Labs Frontend

Responsive React + TypeScript + Vite marketing site for Kavrix Labs.

## Requirements

- Node.js 20.19+ (Node 22 is recommended and pinned in `.nvmrc`)
- npm 10+

## Local development

```bash
npm ci
npm run dev
```

Vite will print the local development URL in the terminal.

## QA and production build

```bash
npm run qa
```

`npm run qa` runs the TypeScript project build/typecheck and then creates a production Vite build in `dist/`.

To preview the production build locally:

```bash
npm run preview
```

## Repository hygiene

Generated files are intentionally excluded from Git:

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- local `.env*` files (except a future `.env.example`)

GitHub Actions runs `npm ci` and `npm run qa` on pushes to `main` and on pull requests.

## Edit normal site content

Start with `src/config.ts`. Brand copy, services, portfolio cards, contact details, and theme colors live there.

Social buttons currently use generic platform home-page links. Replace those URLs with the real Kavrix Labs profiles before launch. Phone and WhatsApp can also be replaced with real direct-contact details; until then, the call action falls back to a prefilled email request and WhatsApp opens its official site.

## Portfolio content review

The portfolio section contains specific claims about client stores, technical implementations, performance, customer reach, and business impact. Those claims are content data rather than code behavior, so they are not proven by the frontend build. Verify that Kavrix Labs is authorized to present each store as client work and that all metrics/technical claims are supportable before publishing the site publicly.

## Visual direction

The UI uses custom CSS/React implementations of glass navigation, ambient glow, pointer-responsive project cards, scroll reveals, marquee motion, and reduced-motion fallbacks. No third-party animation framework is required.

## Hero video

The motion reel assets live at:

- `public/hero-motion.mp4`
- `public/hero-motion-poster.jpg`

The app resolves them through Vite's base URL so the assets remain compatible with sub-path deployments such as GitHub Pages when `base` is configured appropriately.

## Source structure

- `src/main.tsx` - React application entry point
- `src/App.tsx` - page composition and theme variables
- `src/config.ts` - editable site content, services, portfolio, contact details, and theme
- `src/components/` - page sections and reusable cards/modals
- `src/hooks/usePageEffects.ts` - scroll/reveal/cursor page effects
- `src/utils/connect.tsx` - social, WhatsApp, and call connection helpers
- `src/styles.css` - global styling and responsive layout
- `.github/workflows/ci.yml` - repository QA workflow

## Deployment note

For a custom domain or root-domain deployment, the default Vite base is fine. For GitHub Pages under a repository path, set `base` in `vite.config.ts` to the repository path (for example `/repository-name/`) or inject it from your deployment environment before building.
"# Kavrix-Labs-Team-Work" 
"# Kavrix-Labs-Team-Work" 
"# Kavrix-Labs-Team-Work" 
"# Kavrix-Labs-Team-Work" 
