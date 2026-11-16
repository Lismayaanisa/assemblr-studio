# Assemblr EDU — Modes & Flows

Pick a mode first. Mixing modes is the #1 consistency failure.

---

## Mode A — Product UI (default)

**Files:** `home.html`, `index.html`, `competitions.html`, `competition-detail.html`, `competition-concluded.html`, `class*.html`, `editor*.html`, `gallery.html`, `artwork-detail.html`, `profile.html`, `teaching-aids.html`, `resources.html`, `submit.html`

**Rules:**
- Tokens from `styles/main.css` + dark mode
- Fonts: Inter + Plus Jakarta
- Container 1240px, glass nav, wordmark logo
- Primary CTA: **indigo** on home/workspace; magenta only where that page already uses it
- Soft category pills when needed (`[data-cat]`)
- No rundown navy / `#00AEEF` / Inter-900 display

---

## Mode B — ImajiNation marketing

**File:** `imajination.html`

**Adds on top of Mode A:**
- Sticky `.imj-subnav` (54px)
- Section rhythm `.imj-section` 84px (`.tight` 64px)
- Centered `.imj-kicker` soft magenta pill
- Saturated `.imj-cat-card` / `.imj-prize-card` (yellow/red/green/blue/purple fills)
- Heavier display weight 800 where celebratory
- Playful stars/squiggles in category colors
- Primary CTAs: **indigo** (note: `.btn-magenta` is misnamed and renders indigo here)
- Hero art dark plane allowed: `linear-gradient(150deg, #1B1B4B, #2F1A48, #3A1338)`
- Soft vs saturated category systems may both appear — soft for pills, saturated for big cards

**Do not** use document-mode pink `#E91E8C` / blue `#00AEEF` here.

---

## Mode C — Document / partner deck

**Files:** `imajination-grand-final-rundown.html`, `imajination-partnership-packages.html`

**Separate system — do not reuse product chrome.**

| Aspect | Document rule |
|---|---|
| Fonts | Inter only, weights to **900** — no Plus Jakarta |
| Brand | Navy `#0D1F5C`, Blue `#00AEEF`, Yellow `#F5C400`, Pink `#E91E8C` |
| Page bg | `#F0F7FF` |
| Container | **1100px** |
| Hero | Navy→blue gradient band; pink eyebrow pill; italic yellow accent word |
| Cards | White, colored top accent bars, harder `rgba(0,0,0,.06–.10)` shadows |
| Tables | Dense `.rundown-table` / `.benefits-table` with navy thead |
| Tiers | Platinum/Gold/Premier/Standard gradient cards |
| Footer | Solid navy bar |
| Dark mode | None |
| Product nav | None |

Category colors in documents differ again (Dreamers pink, Makers navy/blue, Visionaries yellow). Keep them inside document mode only.

Print: respect `@media print`; continuous-scroll PDF uses stripped print CSS + tall single page.

---

## Flow — Competition listing

1. Page hero: “Explore competitions” + search + status chips (All / Active / Upcoming / Closed)
2. Optional featured “Competition of the week” split card
3. Grid of `.card` (3→2→1): media 16:10 · status badge · category badge · title · theme · avatars · deadline
4. Hover: lift −4px + gradient outline
5. “Load more” secondary button

---

## Flow — Competition detail

1. Wide pastel `.detail-hero` (21/9) with floating shapes
2. Title block + status/category pills + meta
3. Prize grid gold/silver/bronze
4. Timeline / FAQ accordion (open FAQ: cyan border; plus rotates 45°)
5. Sticky sidebar `.sticky-card` at `top: calc(var(--nav-h) + 24px)` with countdown + CTA

---

## Flow — Concluded competition

1. “Winners announced” status
2. `.cc-podium`: gold elevated (`-12px`), silver/bronze flanking
3. Winner ribbons: gold / silver / bronze / judge’s pick (`#8B5CF6`)
4. Gallery of winning works

---

## Flow — Registration (`register.html`)

1. Colored hero band (indigo → `#4F60D6` → cyan)
2. `.phase-bar` stepper: done=cyan · active=white+indigo · locked=faint
3. Body `.reg-card` pulls up `−40px` over hero (max-width ~720px)
4. Step badge: indigo gradient circle
5. Level picker `.lv-card` grid (SD / SMP / SMA) — selected indigo ring
6. Member slots, school/teacher fields, agreement checkboxes
7. Final CTA: magenta→indigo full-width `.btn-submit-final`
8. Success state: registration ID + next steps
9. Nav height may be 64px; error color `--red #DC2626`

---

## Flow — Submit / upload

1. Narrow wrap (~760px)
2. Stepper phases (data → payment → upload)
3. Dropzone with cyan hover tint
4. Autosave hint with green status dot
5. Keep chrome consistent with product Mode A

---

## Flow — Home / workspace dashboard

Reuse existing blocks — don’t invent a denser dashboard:

- Launch cards (`.launch-card.ar|ai|lc`)
- Stat chips (`.stat-chip`)
- Featured competition (`.home-fc`)
- News carousel (`.news-*`) — active dots elongate to ~26px
- Class minis (`.class-mini`)
- Teaching-aid home cards
- Horizontal rails with snap + indigo arrows

---

## Flow — Class

- `.class-card` with subject cover gradients (math / science / literacy…)
- Status dots for live/draft
- Join codes in **JetBrains Mono / SF Mono**
- Detail layout often `1fr 300px`

---

## Flow — Gallery / artwork

- Masonry `.masonry` 4→1 cols
- `.tile` hover lift + overlay
- Artwork detail: vote button magenta; sidebar meta

---

## Accessibility & interaction norms

- Focus visible: `outline: 2px solid var(--cyan); outline-offset: 2px`
- Prefer button/link semantics; icon buttons need `aria-label`
- Modals: trap focus conceptually; backdrop click closes
- Always honor `prefers-reduced-motion`
- Status meaning must not rely on color alone (include text/label)

---

## Decision tree

```
New screen?
├─ Partner deck / rundown / printable proposal → Mode C (document)
├─ ImajiNation campaign landing → Mode B
└─ Everything else in EDU product → Mode A
     ├─ Workspace / home / register CTA → indigo primary
     ├─ Vote / classic marketing CTA → magenta gradient
     └─ Categories?
          ├─ Soft pills / filters → soft [data-cat]
          └─ Big celebratory cards → saturated imj-cat fills
```
