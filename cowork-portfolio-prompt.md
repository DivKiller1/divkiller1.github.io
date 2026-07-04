# Chess-Themed Dynamic Portfolio — Full Build Brief

I'm attaching my `portfolio.json`. Build me a full, production-quality personal portfolio website in React. This is not a static resume page — it should feel alive, immersive, and visually striking. Every section should have motion, depth, and interactivity. The theme is chess — specifically the aesthetic of a high-end chess broadcast or analysis interface (think chess.com's dark broadcast mode, not a toy board). Read every section of this brief before writing a single line of code.

---

## Part 1 — The aesthetic target

The overall feel I want: **dark, precise, atmospheric**. Like an engineering dashboard crossed with a chess broadcast. Not playful. Not corporate. Think:
- Deep dark backgrounds (`#0d0d0d`, `#111`, `#1a1a1a`) with light foreground elements
- Cream/ivory/off-white for primary text (`#f0ead6`, `#e8dcc8`) — the color of a chess piece
- Amber/gold as the primary accent (`#c9a84c`, `#d4a847`) — like a tournament trophy or board edge
- A subtle two-tone board texture (alternating very slightly lighter/darker dark squares) as a background pattern — not a literal board, a texture
- Monospace font for labels, metadata, move notation, code — pair with a clean serif or geometric sans for headings
- Everything feels weighted and deliberate — no bouncy animations, no confetti, no gradients that look like a SaaS landing page

---

## Part 2 — Motion and interactivity directives (apply these globally)

Every interaction must have a response. Every section must enter with motion. Specific requirements:

**Page load / section entry:**
- Use `framer-motion` for all animations. Every section fades + slides up on scroll into view (use `whileInView` with a viewport threshold). Stagger children so elements animate in sequence, not all at once.
- The hero section should have a dramatic entrance: name types in character by character (typewriter effect), then the tagline fades up after a short delay, then the rest of the hero content reveals.

**Cursor / hover:**
- Every interactive element (cards, buttons, links, tags) must have a deliberate hover state — not just a color change, but a micro-animation: subtle scale, border reveal, or a background fill that sweeps in.
- Project cards: on hover, a thin amber border traces around the card edges (animated border-color or a pseudo-element that draws in). A faint chess-board texture should become slightly more visible on hover.

**Project cards — make these the centerpiece:**
- Each card starts collapsed showing: title, subtitle, status badge, one-line description, and tech stack tags.
- On click/expand: the card animates open (height expansion with framer-motion layout animation) to reveal: full description, domain tags, code snippets (syntax highlighted), metrics grid, and pipeline visualizer (if applicable). Only one card open at a time — closing one before opening another.
- The expand/collapse arrow should rotate 180° on open.

**Pipeline visualizer (autonomous-cicd only):**
- Render the pipeline as a horizontal (desktop) / vertical (mobile) sequence of node pills connected by animated arrows.
- Each node pill highlights in amber when "active" with a glowing border effect (`box-shadow`).
- The arrows between nodes should animate (a moving dot/dash traveling left to right along the connection line) when the pipeline is "playing."
- Auto-play on card open, can also be controlled with prev/next/play-pause buttons.
- The active node shows its description in a panel below the pipeline row.

**Experience timeline:**
- Vertical timeline with a central line that draws itself downward on scroll (animate the line height from 0 to 100% using `framer-motion` + scroll-linked animation or `whileInView`).
- Each entry is styled like a chess move notation: `01.` `02.` numbered, monospace, with company name, role, and highlights.
- Timeline entries slide in from alternating left/right on desktop, from the left on mobile.

**Skills grid:**
- Each skill category card flips on hover (CSS 3D card flip) to reveal the list of skills on the back.
- On the front: category icon (use a chess piece SVG from lucide or a simple inline SVG) and category name.
- On the back: the list of skills as tags/chips.

**Achievements/badges:**
- In the hero, render achievements as badge chips.
- On hover, each badge lifts slightly and shows a tooltip with the full achievement name.

---

## Part 3 — Section-by-section data mapping

Use only data from the attached `portfolio.json`. No invented content. If a field is missing for a given project, omit that section gracefully — no empty boxes, no "N/A."

### Hero
- Name (typewriter on load), title, tagline
- Location + education in a small metadata row (monospace, muted)
- `coreDomains` as a horizontal scrolling tag row
- `achievements` as badge chips
- GitHub button (links to `profiles.github`)
- Subtle animated background: a very low-opacity chess board grid pattern that slowly drifts or pulses — pure CSS or a canvas element, no external libraries needed for this

### Experience
- Vertical timeline, move-notation styled (`01.`, `02.`)
- Each entry: company name, role, timeline range, highlights as bullet points
- "Status" dot: active internship (Jan 2026 – Present) gets a pulsing green dot, past roles get a static muted dot

### Projects
- Section heading: "Active Services" — because these are deployed/prototype systems, not just "projects"
- Filterable by domain tag (clicking a domain tag above the grid filters visible cards)
- Cards in a 2-column grid (desktop), 1-column (mobile)
- Status badge system (critical — do not soften non-production statuses):
  - `Production` → green dot
  - `Prototype` → amber dot
  - `Designed + Prototype` → blue dot
  - Status text shown in full — not hidden or abbreviated
- Code snippets: use `react-syntax-highlighter` with a dark theme (One Dark or Dracula) — each snippet shows its `label` above it, language tag in the corner
- Metrics grid: if `metrics.status` is "pending", show each `plannedMetrics` item as a stat card with a dash/em-dash instead of a number and a small "pending" chip below — style this confidently, not apologetically
- Pipeline visualizer: only on the `autonomous-cicd` card, as described in Part 2

### Skills
- Section heading: "Stack"
- Category grid — one card per skill category
- Card front: category name + a thematic icon (use a chess piece concept: knight for AI/ML, rook for infrastructure, bishop for networking/security, queen for cloud, king for devops, pawn for languages — map these thoughtfully, or default to a clean geometric icon from lucide-react if a chess piece feels forced for a given category)
- Card back (on flip): skill chips/tags for that category
- Do not label the categories as chess pieces — the icon is decorative, the label stays as the real category name

### Interests
- Section heading: "On the board" (this one chess label earns its place — "on the board" = under consideration / being studied)
- Simple animated tag cloud: tags appear one by one on scroll in, each with a slight random vertical offset for a natural scattered feel
- Hover: tag scales up slightly, accent color fill

### Footer
- Minimal: name, "Built from verified data." (a nod to everything we did to make the portfolio honest), GitHub link, current year

---

## Part 4 — Component architecture

Structure the codebase as follows. Each component receives data as props — no hardcoded content inside components:

```
src/
  data/
    portfolio.json          ← the attached file, unchanged
  components/
    Hero.jsx                ← typewriter, tagline, achievements, coreDomains, GitHub button
    ExperienceTimeline.jsx  ← animated timeline, move-notation styled
    ProjectsSection.jsx     ← filter bar + grid layout
    ProjectCard.jsx         ← expandable card with all sub-sections
    StatusBadge.jsx         ← status dot + label, color-coded
    PipelineVisualizer.jsx  ← node sequence player for autonomous-cicd
    CodeSnippetBlock.jsx    ← react-syntax-highlighter wrapper with label
    MetricsPendingCard.jsx  ← stat card grid for pending metrics
    SkillsGrid.jsx          ← flip-card grid
    InterestsCloud.jsx      ← staggered tag cloud
    Footer.jsx
  App.jsx                   ← assembles sections, handles dark mode
  index.css                 ← CSS variables, board texture pattern, global resets
```

---

## Part 5 — Technical requirements

- **React** with functional components and hooks throughout
- **framer-motion** for all animations (do not use CSS keyframes for anything that framer-motion can handle more expressibly)
- **Tailwind CSS** for layout and utility styling; use CSS variables in `index.css` for the color palette so dark/light mode tokens are consistent
- **react-syntax-highlighter** for all code blocks — use the `oneDark` or `dracula` preset
- **lucide-react** for icons — do not hand-draw SVG icons inline unless unavoidable (chess piece accents are the exception)
- **Dark mode by default** — light mode as a toggle, not the default. The chess broadcast aesthetic is inherently dark.
- **Fully responsive** — every component must work on 375px mobile width and up. The pipeline visualizer goes vertical on mobile. The skills grid goes to 2-col on tablet, 1-col on mobile. Timeline is single-column on mobile.
- **Performance** — lazy-load syntax highlighter (it's heavy). Use `React.lazy` + `Suspense` for the `CodeSnippetBlock` component.
- **No placeholder content** — if a field is absent in the JSON for a given project, the component omits that UI block entirely.
- **Accessibility** — semantic HTML, keyboard navigable cards (Enter/Space to expand), sufficient contrast on all badge/status text, `aria-expanded` on expandable cards.

---

## Part 6 — What I'm providing

The `portfolio.json` file is attached. It is the single source of truth. It contains:
- 4 projects, 2 of which have `codeSnippets` arrays with real source code, 2 of which have `metrics` fields
- 1 project (`autonomous-cicd`) has a full pipeline that should drive the `PipelineVisualizer`
- All projects have a `status` field — use it exactly as written, do not rephrase or soften

Build the complete site now. Start with `index.css` and the color token setup, then `App.jsx`, then each component in the order they appear on the page. Do not skip components or leave stubs — build every component fully.
