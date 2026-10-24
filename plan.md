# Portfolio redesign plan

## Project structure

This is a static GitHub Pages site. `index.html` will remain the maintained entry point and will contain the semantic document structure, scoped design system, responsive styles, and the small amount of interaction code required for navigation and photography. `old.html` will remain as a compatibility filename that forwards to the maintained route. `pp.png` and `photo1.jpg`–`photo8.jpg` remain the supplied visual assets. `public/manus-routes.json` is not applicable to this plain static checkout, so a root `manus-routes.json` is provided for route inventory and verification.

## Design direction

**Possible directions:** cinematic editorial (0.06); gallery-like brutal minimalism (0.04); quiet studio portfolio (0.07).

**Chosen direction — cinematic editorial:** a dark, warm portfolio with strong typographic composition, generous but purposeful spacing, and photography treated as the primary texture. It is personal rather than agency-like: the identity leads, work is easy to scan, and red appears only where an action or active state needs emphasis.

- **Core principles:** identity before ornament; evidence over decoration; quiet contrast; every interaction is legible.
- **Color philosophy:** near-black ink provides depth; warm cream carries most reading; soft white is reserved for the highest-emphasis text; crimson marks action and focus without becoming a background.
- **Layout paradigm:** a full-bleed hero followed by a narrow, sticky utility rail and asymmetric editorial sections that resolve into calm grids for projects and experience.
- **Signature elements:** oversized italic name treatment; thin cream rules with restrained crimson markers; image-led work blocks with clear metadata.
- **Interaction philosophy:** controls should feel tactile and predictable, with visible focus, no hidden hover-only meaning, and motion used only to establish hierarchy.
- **Animation:** short opacity/translate reveals only when motion is allowed; no blocking preloader, scroll-jacking, infinite decorative motion, or blur-heavy transitions.
- **Typography system:** Fraunces for editorial headlines, General Sans for body copy and navigation, with a compact uppercase label style for metadata.
- **Brand essence:** a creative technologist and visual designer translating stories into visual and digital work; thoughtful, observant, hands-on.
- **Brand voice:** direct, reflective, specific. Example lines: “Designing visuals, crafting stories, building digital experiences.” and “A few things I’ve made, photographed, and learned along the way.”
- **Wordmark:** the existing `ACB` monogram stays as a compact text mark, paired with the full name in the hero rather than turned into a decorative logo.
- **Signature brand color:** deep crimson `#8F2633`.

## Implementation decisions

- Use CSS custom properties for the requested palette and shared dimensions.
- Use semantic landmarks, a skip link, button controls, `aria-current`, `aria-live`, and a native `<dialog>` for the full-screen photo viewer.
- Use a compact mobile navigation button instead of allowing the desktop anchor list to wrap.
- Keep eight real photos in the carousel and remove broken references to missing files.
- Preserve unavailable project destinations as disabled status links with explanatory text instead of `href="#"` dead ends.
- Add `loading="lazy"` to non-hero images, explicit aspect ratios, and `decoding="async"` where appropriate.
- Keep external fonts limited to the existing editorial/body families and remove Font Awesome in favor of text labels and inline accessible marks.
- Retain the original social URLs, email address, project descriptions, biography, experience, education, and supplied asset filenames.
