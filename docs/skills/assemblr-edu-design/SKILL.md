---
name: assemblr-edu-design
description: >-
  Assemblr EDU visual design system and UI/UX consistency rules extracted from
  the Competition HTML prototypes. Use when designing, building, restyling, or
  reviewing any Assemblr EDU / ImajiNation screen, HTML page, component, or
  marketing UI so colors, type, radius, motion, and patterns stay consistent.
  Also use when the user mentions style guide, design tokens, brand UI, dark
  mode, competition cards, register flow, or partner/rundown documents.
---

# Assemblr EDU Design System

## Conflict resolution (decided 2026-09-02)

This folder contains two generations of the system. **Mode A in this file wins for product UI.**

| Topic | Winner | Superseded |
|---|---|---|
| Product primary CTA | Solid indigo `#2F3D99` | Logo blue |
| Buttons | Pill `999px` | `rounded-md` 6px |
| Cards | 24px radius | `rounded-xl` 12px |

`Assemblr-EDU-Design-System-Principles.md`, `Assemblr-EDU-Design-System-Gap-Review.md`, and
`locked-decisions-2026-08-10.md` remain useful for principles, journeys, and UX laws — but where
they contradict the tokens below, this file governs.

Apply this skill **before** writing or editing any Assemblr EDU UI.

**Source of truth depends on which codebase you are in. Check which one before
reading any file path below.**

### React / Tailwind products (account page prototype, and any `src/app/**` app)

The tokens in this skill are implemented as CSS custom properties, not as the
HTML prototype's classes. Never look for `styles/main.css` here — it does not
exist in these repos.

1. **Runtime tokens** → `src/styles/theme.css`. Brand (`--brand-magenta`,
   `--brand-cyan`, `--brand-indigo`, `--brand-logo-blue`, `--brand-yellow`,
   `--brand-gradient`), radius (`--radius-card` 24px, `--radius-pill` 999px),
   the five-step elevation scale (`--elevation-1` … `--elevation-5`, aliased as
   `--shadow-card` / `--shadow-card-hover`), layout (`--ds-container-max`,
   `--ds-nav-height`), and motion (`--ds-ease`, `--ds-transition`).
2. **In-repo decisions and migration state** → `.cursor/rules/design-tokens.mdc`.
   This records which surfaces are migrated to Mode A, which took a token-pass
   only, and which are deliberately reverted. **Where it is more specific than
   this skill, it wins** — it knows the state of that codebase.
3. **Utilities, not raw CSS.** Pills are `rounded-full`, 24px cards are
   `rounded-xl`, display type is the `.font-display` class (Plus Jakarta Sans
   700, `-0.02em`), reveals are `.ds-fade-up`.

### HTML prototypes (Competition / ImajiNation / marketing)

1. Shared tokens/components → `styles/main.css`
2. Intentional page overrides → `home.html`, `imajination.html`, `register.html`
3. Document / partner-deck mode → `imajination-grand-final-rundown.html` (separate system)

Read deeper refs only as needed:
- [tokens.md](tokens.md) — exact CSS variables, type, spacing, shadows
- [components.md](components.md) — nav, buttons, cards, forms, rails, badges
- [modes-and-flows.md](modes-and-flows.md) — product vs ImajiNation vs document; register/submit/detail
- [prompt.md](prompt.md) — copy-paste prompt for other tools/agents

---

## 1. Brand personality (non-negotiable)

Assemblr EDU is **friendly, modern, education-first** AR/3D creation UI.

| Trait | Rule |
|---|---|
| Shape | Rounded everything — pills for chrome, 24px for cards/modals |
| Depth | Soft, low-opacity, brand-tinted shadows — never harsh black |
| Color | Four brand hues + soft neutrals; accents via gradients |
| Type | Plus Jakarta Sans (headings/numbers) + Inter (body/UI) |
| Motion | Subtle lift + fade-up; 160–420ms; honor `prefers-reduced-motion` |
| Chrome | Glass sticky nav/filters; stroke icons only |

**Vibe check:** bright, clean, approachable — colorful but not noisy, generous white space, playful but restrained.

---

## 2. Quick token sheet

### Brand
| Token | Hex | Role |
|---|---|---|
| `--magenta` | `#E21B72` | Accent, logo E, vote, magenta CTAs, focus accents |
| `--cyan` | `#12A9E6` | Secondary, input focus (default), info |
| `--indigo` | `#2F3D99` | **Primary workspace CTA**, active nav, upcoming |
| `--yellow` | `#E8AE1A` | Warm accent, logo U, highlights |

Signature gradient: `linear-gradient(135deg, #E21B72, #12A9E6)`.

### Neutrals (light)
`bg #F7F8FA` · `surface #FFFFFF` · `hover #F4F6F9` · `border #E5E7EB` · `text #1F2937` · `soft #6B7280` · `mute #9CA3AF`

### Neutrals (dark) — `[data-theme="dark"]`
`bg #0B0D12` · `surface #10131A` · `nested #141822` · `border #1F2430` · `text #F3F4F6`

### Shape / layout / motion
| Token | Value |
|---|---|
| `--radius-full` | `999px` (buttons, badges, chips, search, nav links) |
| `--radius-xl` | `24px` (cards, modals, heroes) |
| `--radius` / `sm` | `16px` / `10px` |
| `--container` | `1240px` + `24px` side padding |
| `--nav-h` | `72px` (register may use `64px`) |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--t` / `--t-fast` / `--t-slow` | `240ms` / `160ms` / `420ms` |

Full tables → [tokens.md](tokens.md).

---

## 3. Critical consistency rules

### 3.1 Primary button color (split — follow the surface)

| Surface | Primary CTA |
|---|---|
| Workspace / home / ImajiNation marketing / register | **Solid indigo** `#2F3D99` + indigo glow |
| Classic marketing / vote / some index CTAs | Magenta gradient `#E21B72 → #C61563` + magenta glow |
| Final register submit | Magenta → indigo gradient |

Never invent a third primary. Prefer indigo for product screens unless matching an existing magenta page.

### 3.2 Logo
Use **`.logo-wordmark`** (not the old conic `.logo-mark`, which is hidden):
- Uppercase Plus Jakarta 700, `letter-spacing: 0.12em`, ~15px
- Colored letters: **E** magenta · **D** cyan · **U** yellow · separator muted

### 3.3 Icons
Stroke only: `fill="none" stroke="currentColor" stroke-width="2"` round caps/joins. Feather/Lucide geometry. No filled/duotone UI icons.

### 3.4 Category colors — name the surface

Three incompatible palettes exist. Never mix without labeling:

1. **Soft UI pills** (`[data-cat]`) — Dreamers=indigo, Makers=magenta, Visionaries=gold `#B07E10`, Innovators=cyan, School=purple
2. **Saturated ImajiNation cards** — Dreamers yellow `#F6B411`, Makers red `#E8392C`, Visionaries green `#38A24E`, etc.
3. **Document/rundown** — Dreamers pink `#E91E8C`, Makers navy/blue, Visionaries yellow — **product UI must not use these**

Details → [modes-and-flows.md](modes-and-flows.md).

### 3.5 Document mode is a separate system
Partner decks / grand-final rundown HTML use Inter-only (to 900), navy `#0D1F5C` / blue `#00AEEF` / pink `#E91E8C` / yellow `#F5C400`, container **1100px**, dense tables, no glass nav, no dark mode. **Do not apply document tokens inside the EDU product shell.**

---

## 4. Component checklist (must match)

When building a new screen, implement these with existing class names/patterns from [components.md](components.md):

- [ ] Sticky glass nav 72px + wordmark + pill links (active = indigo tint)
- [ ] Buttons: pill, 12×20 pad, 14px/600; hover `translateY(-1px)`
- [ ] Cards: 24px radius, 1px border, body pad 22px; hover `-4px` + soft shadow + magenta→cyan outline
- [ ] Section head: magenta uppercase eyebrow (12px / 0.08em) + h2 + muted 16px lead
- [ ] Inputs: 12px radius; focus cyan border + `0 0 0 4px rgba(18,169,230,.12)` (home search may use indigo ring)
- [ ] Badges/chips: pills; status dots with soft glow rings
- [ ] Footer: surface-2, soft top border, 4-col then stack
- [ ] Dark mode via CSS variables only — never hardcode light neutrals for themed pages

---

## 5. Layout & responsive

| Concern | Rule |
|---|---|
| Container | 1240px / 24px gutters |
| Section padding | 96px (64px mobile / `.section-sm`) |
| Card grid | 3 → 2@1024 → 1@640, gap 24 |
| Nav collapse | ≤900px (drawer) |
| Hero stack | ≤980px |
| Section-head stack | ≤760px |
| Focus a11y | `outline: 2px solid var(--cyan); outline-offset: 2px` |

---

## 6. Motion rules

- Default transition: `var(--t)` + `var(--ease)`
- Button hover: `translateY(-1px)` · Card hover: `translateY(-4px)` · ImajiNation cat cards: up to `-6px`
- Scroll reveal: `[data-reveal]` → fade-up (opacity 0→1, Y 14→0); stagger children 0.05–0.40s
- Decorative blobs: slow float 6–10s; never block content
- Always include `@media (prefers-reduced-motion: reduce)` zeroing durations

---

## 7. UX patterns to reuse (don’t invent new ones)

| Need | Reuse |
|---|---|
| Competition listing | `.card` + 16:10 pastel media + status/cat badges + avatar stack |
| Featured competition | Split featured card (visual left / prizes+CTA right) |
| Registration | Colored hero + `.phase-bar` stepper + `.reg-card` pull-up + `.lv-card` level picker |
| Empty state | Dashed `.empty` + 72px soft brand icon circle + short copy + CTA |
| Modal | Blurred `rgba(15,23,42,.4)` backdrop + 24px modal, enter scale 0.96→1 |
| Horizontal content | Snap `.rail-track` + indigo circular arrows |
| Concluded | Podium (gold elevated) + winner ribbons |
| Profile/editor sections | Magenta underline tabs on sticky glass bar |

Flows → [modes-and-flows.md](modes-and-flows.md).

---

## 8. Do / Don’t

**Do**
- Load Inter 400–700 + Plus Jakarta Sans 500–800 from Google Fonts
- Keep borders 1px hairline; use soft brand-tinted shadows
- Support light + dark on product pages
- Prefer existing class names from prototypes over new inventiveness
- Keep decorative blobs/pastels as placeholders — real photos stay in rounded frames

**Don’t**
- Don’t use Inter/Roboto/Arial as the display face; don’t use sharp corners
- Don’t use hard black multi-layer shadows or thick borders
- Don’t put rundown navy/`#00AEEF` into product screens
- Don’t mix soft / saturated / document category palettes
- Don’t use emoji clusters, floating promo stickers, or dense “dashboard chrome” in marketing heroes
- Don’t over-animate or ignore reduced-motion
- Don’t treat `.btn-magenta` as magenta on imajination pages (it’s indigo there)

---

## 9. Workflow for new designs

1. Identify **mode**: Product UI · ImajiNation marketing · Document/partner deck
2. Read the matching section in [modes-and-flows.md](modes-and-flows.md)
3. Copy tokens from [tokens.md](tokens.md) / `styles/main.css`
4. Build with components from [components.md](components.md)
5. Run the **visual QA checklist** below before shipping
6. If handing to another tool, paste [prompt.md](prompt.md)

### Visual QA checklist
- [ ] Correct primary CTA (indigo vs magenta) for this surface
- [ ] Wordmark logo, not old conic mark
- [ ] Fonts: Plus Jakarta headings / Inter body
- [ ] Pills for interactive chrome; 24px cards
- [ ] Soft shadows only; 1px borders
- [ ] Category palette matches the surface type
- [ ] Hover lift + shared easing
- [ ] Dark mode tokens work (product only)
- [ ] Document mode isolated (if applicable)
- [ ] Reduced-motion respected

---

## 10. Canonical file map

| Area | Files |
|---|---|
| Shared CSS | `styles/main.css` |
| Home / workspace | `home.html`, `index.html` |
| Competitions | `competitions.html`, `competition-detail.html`, `competition-concluded.html` |
| ImajiNation marketing | `imajination.html` |
| Register / submit | `register.html`, `submit.html` |
| Class / editor / gallery | `class.html`, `class-detail.html`, `editor.html`, `editor-logic.html`, `gallery.html`, `artwork-detail.html` |
| Profile / aids / resources | `profile.html`, `teaching-aids.html`, `resources.html` |
| Document mode | `imajination-grand-final-rundown.html`, `imajination-partnership-packages.html` |
| Human style guide | `ASSEMBLR-EDU-STYLE-GUIDE.md` |
