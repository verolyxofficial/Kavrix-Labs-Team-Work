# Kavrix Labs redesign notes

## Current implementation

- Responsive glass navigation with a mobile menu, skip link, Escape-key support, and accessible expanded state.
- Video-led hero with custom play/mute controls, sticky desktop presentation, responsive fallbacks, and reduced-motion handling.
- Ten service cards with expandable capability links.
- Filterable portfolio cards with live-store links and detailed review modals.
- Four-step process section, contact section, platform links, and responsive footer.
- Theme/content data centralized in `src/config.ts`.
- Custom React/CSS interaction effects without a dedicated animation framework.

## Repository hardening added during QA

- Restored the React entry point in `src/main.tsx`.
- Added `.gitignore`, `.editorconfig`, `.nvmrc`, and GitHub Actions CI.
- Added TypeScript/Vite environment typing and improved Vite base-path handling for hero media.
- Improved modal keyboard/focus behavior and collapsed service-card tab order.
- Added visible shared keyboard focus styling.
- Corrected the `Web Development` service title typo.
- Reorganized build tooling into `devDependencies`.

## Content that still needs business confirmation

Replace generic social platform URLs with real Kavrix Labs profile URLs and add real phone/WhatsApp details when available.

The portfolio now presents named live stores and includes specific engineering, performance, customer, conversion, and technology claims. Confirm client authorization and documentary support for every public claim before launch. The frontend build cannot validate business attribution or private performance data.

## Validation

See `QA_REPORT.md` for the QA results and the environment-specific Rollup build limitation encountered during this review.
