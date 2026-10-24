# Portfolio audit

## Existing implementation

- **Framework:** no framework; two standalone static HTML documents (`index.html` and `old.html`) with large inline CSS and JavaScript blocks.
- **Primary route:** `index.html`, containing an animated hello landing, hero/profile, sticky anchor navigation, about, skills, projects, photography, experience, education, contact, footer, two lightboxes, a preloader, and scroll-triggered reveals.
- **Secondary route:** `old.html`, an older dark-theme variant with mostly duplicated content and a theme link targeting a missing `/lighttheme` route.
- **Assets:** `pp.png` plus `photo1.jpg` through `photo8.jpg`. The photo carousel data also references nonexistent `photo9.jpg` through `photo12.jpg`.
- **Content to preserve:** Aditya Cheek Baraik identity, role, biography, skills, four project entries, photography descriptions, work history, education, social links, email, and the eight supplied image assets.

## Findings

1. The visual system is inconsistent: the primary page mixes white/light sections with deep green, wine, bronze, neon SVG decoration, grain, glass, and multiple competing accent tokens. It does not follow the requested ink/cream/soft-white/crimson system.
2. The page is visually busy in places: animated curtain/preloader, marquee, glows, scanlines, SVG corner frames, shimmer rules, decorative placeholders, multiple lightbox systems, and hover-only captions compete with the work.
3. Navigation has no compact mobile menu. At narrow widths the full anchor row is likely to wrap/overflow and the many section links make touch use awkward.
4. Accessibility is incomplete: focus styling is not consistently visible, carousel controls use abbreviated labels (`Prev`), decorative icon fonts are required for key meaning, dialog semantics/focus management are missing, and hover-only photo information is not available to keyboard users.
5. Motion and loading are over-engineered for a static portfolio. The preloader can delay the first meaningful interaction; several continuous animations and blur/filter transitions increase work and can cause perceived lag. Reduced-motion coverage is partial.
6. Project cards contain four `#` links that do nothing. These must remain visibly unavailable rather than pretending to navigate.
7. The photography JavaScript advertises 12 images but only 8 files exist, producing broken image requests after the first eight frames.
8. Performance is weakened by two font providers, Font Awesome, inline SVG decoration, repeated CSS, and oversized original photos (up to ~8 MB each). Images lack responsive source sizing and explicit loading strategy.
9. Layering is fragmented (`z-index` values up to 10000) across preloader, nav, photo previews, and lightboxes. Dialogs are not true modal elements and body scroll restoration is fragile.
10. `old.html` is an unlinked duplicate route rather than a maintained alternate presentation; its theme switch points to a route that is not present in the repository.

## Implementation plan

1. Keep the static HTML approach and the existing meaningful content/assets, but consolidate the experience into a calmer, single design system using reusable CSS tokens for ink, cream, soft white, crimson, spacing, type, radii, and layer order.
2. Replace the blocking preloader/curtain with immediate content and restrained, optional reveal motion. Add a semantic skip link, keyboard-visible focus states, reduced-motion handling, and accessible modal behavior.
3. Rebuild the primary page hierarchy around a clear hero CTA, scannable work cards, a responsive navigation menu, accessible photography carousel using only the eight real images, and a single dialog/lightbox.
4. Preserve all existing content, project descriptions, social links, email behavior, experience, education, and photo copy. Keep unavailable project destinations explicit and non-clickable.
5. Add responsive rules for 320px through wide desktops, including fluid type, capped content width, safe grids, touch-sized controls, and no horizontal overflow.
6. Make `old.html` a compatibility entry that preserves the old filename while directing visitors to the maintained portfolio route, avoiding a second stale implementation.
7. Add `manus-routes.json`, a concise TODO/status file, and lightweight local verification scripts/commands. Validate HTML structure, links, asset references, JavaScript syntax, and representative viewport screenshots/overflow where browser tooling permits.
