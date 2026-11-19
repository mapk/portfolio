# Portfolio (markuraine.com)

Personal portfolio for Mark Uraine (design leader; founder of Last Picked, Sr. Manager of Product Design at Shopmonkey). Single-page Next.js site with an old-school terminal look: monospace type, tree-glyph lists, glitch load-in, CRT scanlines, and a yellow (`#eeff0d`) accent on a near-black (`zinc-950`) background.

Repo: `github.com/mapk/portfolio`. Deployed on Vercel (Vercel Analytics is wired in `layout.tsx`).

## Next steps

When asked about next steps, the to-do list, or what to work on for this portfolio, read and share `NEXT-STEPS.md`. It holds the current prioritized plan from the Design Director / Head of Design hiring review. Show the checklist with each item's status, and keep it updated: tick items off (`- [x]`) as they're completed.

Several items need facts only Mark can supply (team sizes, outcomes, talk recordings, what's public). Ask rather than invent leadership claims, metrics, or talk descriptions.

## Stack

- Next.js 16 (App Router, Turbopack dev), React 19, TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/postcss`. No `tailwind.config`; theme tokens live in `@theme inline` in `src/app/globals.css`
- `motion` (`motion/react`) for the preview panel and media transitions
- `@vercel/analytics`
- Path alias: `@/*` → `src/*`

## Commands

```bash
npm run dev     # localhost:3000
npm run build
npm run lint    # eslint (next core-web-vitals + typescript)
```

No test suite. Verify changes with `npm run lint`, `npm run build`, and by looking at the page (desktop ~1024px+, and 375px mobile).

Package manager is **npm** (`package-lock.json`). Use `npm install` / `npm ci`. Don't use pnpm or yarn or commit their lockfiles; a second lockfile changes what Vercel installs.

## Layout of the code

```
src/app/layout.tsx        Fonts (next/font/local + Roboto Mono fallback), metadata, CRT overlay,
                          GlitchScramble, Analytics, Reactions embed script
src/app/page.tsx          Server component. Fetches Curius highlights (revalidate = 3600), renders PortfolioGrid
src/app/not-found.tsx     Terminal-style 404 ("bash: cd: /path: No such file or directory")
src/app/globals.css       Type scale, baseline grid, layout vars, terminal styles, all keyframes
src/components/
  PortfolioGrid.tsx       Client. ALL page content (PROJECTS, TALKS, SOCIAL_LINKS, intro bio) + two-column
                          layout + preview panel open/close logic
  ProjectPreview.tsx      Preview panel body: video/image/type specimen, description, visit link.
  StoryPreview.tsx        Leadership story panel: title, meta, BeforeAfter sliders/image, stats, description
  BeforeAfter.tsx         Before/after comparison slider (drag, arrow keys, caption jump buttons)
                          Exports the `Project` type
  GlitchScramble.tsx      Character-scramble effect on `.glitch-in` intro and link hover. Exports GLYPHS
  NameWithBlob.tsx        Name + yellow dot easter egg (cursor follow, click-to-place dots, audio, yellow flood)
  TypeSpecimen.tsx        Live specimen for the Typefaces project (sizes in cqw)
  MissingPath.tsx         Prints the requested path on the 404 page
src/lib/curius.ts         Scrapes public Curius JSON for recent highlights + article author metadata
public/screenshots/       Project preview media (.mp4 videos, .jpg/.png stills)
public/fonts/             Berkeley Mono (body) + display faces for the Typefaces specimen
public/audio/             Easter-egg sound clips
```

`README.md` is still the create-next-app boilerplate; don't trust it.

## Editing content

Almost all copy is in `src/components/PortfolioGrid.tsx`:

- **Intro bio**: the `<p>` under `<NameWithBlob>`. Links in it are plain `<a target="_blank" rel="noopener noreferrer">`.
- **`PROJECTS: Project[]`**: order in the array = order on the page.
  - `id` (kebab-case, unique), `title`, `listDescription` (one short line in the list), `previewDescription` (paragraph in the panel), `url`.
  - `status` (e.g. `"Live"`), optional `year`, and `role` (e.g. `"solo, design + build"`) render as one meta line above the preview description. With a `year` it reads `Launched 2026 · solo, design + build`; without, `Live · solo, design + build`. Leave `year` off when Mark doesn't want a date shown.
  - Media: `screenshot` path under `/screenshots/`. `.mp4`/`.webm` renders through `VideoWithLoader` (autoplay, muted, loop, ASCII loader); anything else is an `<img>`. Set `typeSpecimen: true` instead to render `TypeSpecimen`.
  - `shadow: true` adds the heavy drop shadow (used on the "studio-blk" videos). `aspect` overrides the reserved video ratio (default `"1656 / 1080"`).
  - Non-Latin titles are fine (Cyrillic, Hebrew); use `\u` escapes for curly quotes / RTL text as the existing entries do. `tolkovanye` gets a one-off `text-xs` title size, keyed by id.
- **`STORIES: Story[]`**: leadership work. Listed first in the middle column under "Design Leadership" (above Projects), and also opened from buttons in the intro bio (`storyButton(id, text)`). Both lists render through the shared `listItem()` row. Rendered by `StoryPreview.tsx` in the same preview panel as projects; one `selectedId` drives both. Fields: `id`, `title`, optional `listTitle` (list label when it differs, e.g. "Prototype Playground"), `listDescription`, `meta`, `url`, `description` (blank lines `\n\n` split paragraphs), optional `comparisons` (`{ label, before, after, aspect? }`) rendered as `BeforeAfter` sliders, optional `image` (`{ src, alt, aspect }`, a single still in place of sliders), and optional `stats` (`{ value, label }`, shown as cards under the sliders). Shopmonkey screens live in `public/screenshots/shopmonkey/` (exported from the Figma "Before / After" file, 1440×900).
- **`TALKS`**: `{ year, title, url? }`, newest first. No `url` renders plain text. React key is `year-title-url`, so duplicate titles need distinct years/urls.
- **`SOCIAL_LINKS`**: `{ label, url }`. Tree glyph (`├─` / `└─`) is chosen automatically by position.
- **Site metadata** (title/description): `metadata` in `src/app/layout.tsx`.

To add a project: drop media in `public/screenshots/`, append to `PROJECTS`. If you add new fields to `Project`, update the type in `ProjectPreview.tsx` and render them there.

## Design system and conventions

Preserve the terminal aesthetic. Keep changes in the existing visual language rather than introducing new components or styles.

- **Colors**: background `zinc-950`; body text `zinc-400`; headings/links `white`; dim glyphs `zinc-600`/`zinc-700`; borders/dividers `#1f1f23`; accent/hover/active/selection `#eeff0d`. Colors are hard-coded hex/Tailwind classes, not CSS variables. Site is dark-only (`<html className="dark">`).
- **Type**: everything is monospace (`font-mono` → Berkeley Mono, Roboto Mono fallback). The Tailwind scale is overridden one px smaller than default (`text-sm` = 13px, base = 15px). Section headings are `text-sm uppercase` `<h2>`s.
- **Baseline grid**: `--baseline: 1.25rem` on `.baseline-grid`. All vertical spacing should be multiples of it: `mb-[var(--baseline)]`, `mt-[calc(var(--baseline)*2)]`, `space-y-[var(--baseline)]`. Text elements inside the grid get `line-height: var(--baseline)`. `ProjectPreview` rounds the media block up to whole baselines so text below stays on the grid. Add `show-grid` to an ancestor class to draw debug baseline rules.
- **List rows**: `.list-row` = grid of a dim gutter `<Marker>` (tree glyph or year) + content with hanging indent. Talks use `.list-row.talk-row` (wider gap).
- **External links**: add `className="external-link"` to get the `↗` that appears on hover without shifting layout.
- **Load-in stagger**: every line that should glitch in gets `className="glitch-in"` and `style={nextLine()}` (sets `--i`, the stagger slot, in document order). The whole intro waits `--intro-delay` (2s) while the yellow dot pulses. Inside the preview panel, use explicit `animationDelay` instead.
- **Hover scramble**: `GlitchScramble` scrambles text in `a` (without img/svg) and `[data-project-button]` on hover. It only mutates Text node values and restores them exactly, and only scrambles printable ASCII so monospace widths never change. Don't wrap scrambled text in per-character elements; colour comes from the CSS Custom Highlight API.
- **Reduced motion**: `prefers-reduced-motion` disables `.glitch-in`, `.divider-in`, the intro pulse, and CRT flicker; video loader stops animating. Any new animation must respect it too.
- **Accessibility**: project items are `<button>`s with `aria-pressed` and `aria-label`; decorative glyphs are `aria-hidden`; Escape and click-outside close the panel. Keep keyboard focus visible.

## Layout behaviour

Defined by CSS vars in `globals.css`:

- `--gutter`: `clamp(1rem, 3.5vw, 3rem)`; `--main-w`: content width (64rem max); `--peek`: room kept free for the preview at wide sizes.
- **< 48rem**: single column, whole page scrolls.
- **≥ 48rem**: two columns (bio/links/reading | projects/talks), each scrolls independently inside a `100svh` viewport, solid `#1f1f23` divider, scrollbars hidden.
- **≥ 72rem (`split` breakpoint, custom Tailwind breakpoint)**: preview panel docks beside the content (no backdrop, no close button). Below it, the panel slides over with a dimmed backdrop and an × button.
- Story previews open at the same panel width as projects. Unlike project media (which bleeds off the right edge), story sliders/images are `w-full` inside a right gutter so they're never cropped.

Check both sides of 48rem and 72rem after layout changes.

**Reactions widget**: the `getreactions.app/embed.js` script in `layout.tsx` injects a fixed 80×80 iframe in a corner (bottom-right; set in the Reactions dashboard, not here). It's hidden entirely below 48rem (single-column layout) via a `display: none !important` rule in `globals.css`. In the two-column layout each scroll column ends with 5 baselines of bottom padding so the last lines can scroll clear of it. Keep that padding if you change column spacing.

## Curius "Highlighted Reading"

`src/lib/curius.ts` uses Curius's undocumented public API (`/api/users/6861/links`) and fetches each article's HTML to find an author (`meta[name=author]` → JSON-LD → `article:author` → `og:site_name` → hostname). Everything goes through Next's fetch cache with 1-hour revalidation. Every failure path returns `[]`/`null`, and the section is hidden when empty, so a Curius outage must never break the page. Keep it that way.

## Gotchas

- **Turbopack can serve stale `globals.css`.** Edits written by shell/python scripts are often missed by the running dev server, and occasionally even an Edit-tool change is. Edit CSS with the Edit tool, then confirm the new rule is in the CSS served from `localhost:3000` before calling it done. If stale, make a trivial second edit; failing that, `rm -rf .next && npm run dev`.
- `.next/` and `tsconfig.tsbuildinfo` exist locally but are gitignored; ignore them.
- The easter egg in `NameWithBlob.tsx` adds global side effects (custom cursor `<style>`, `yellow-bg-active` class on `<body>`, document click listener). Any new global styles may need a `.yellow-bg-active` override so text stays readable on the yellow flood.
- Don't add Tailwind config files or a component library; tokens belong in `@theme inline`.

## Git workflow

- Work on a branch named `<type>/<short-name>` (e.g. `update/terminal-look`, `add/currently-reading`, `fix/...`), open a PR to `main`; history is merged via PRs.
- Commit messages: short imperative sentence, capitalized, no prefix (e.g. "Rename Underlined section to Highlighted Reading").
- Commit or push only when asked.
