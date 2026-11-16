# Assemblr EDU — Components

Reuse these class names and visual rules. Prefer matching existing HTML prototypes over inventing new patterns.

## Navigation

### `.nav`
- Sticky `top: 0`, `z-index: 50`, height `--nav-h` (72px)
- Glass: `background: rgba(255,255,255,.72); backdrop-filter: saturate(180%) blur(20px)`
- Dark: `rgba(11,13,18,.7)`
- `.nav.scrolled` → bottom border `--border-soft`
- Collapse ≤900px → `.nav-toggle` + `.nav-drawer`

### Logo — `.logo-wordmark` (current)
- Uppercase Plus Jakarta 700, `letter-spacing: 0.12em`, ~15px
- `.wm-e` magenta · `.wm-d` cyan · `.wm-u` yellow · `.wm-sep` opacity 0.5
- Do **not** show `.logo-mark` (conic square) — it is `display: none`

### Links — `.nav-links a`
- Pill `padding: 9px 14px`, `14px/500`, `--text-soft`
- Hover: `--text` + `--surface-hover`
- `.active`: `color: var(--indigo)` + `background: rgba(47,61,153,.10)`
- Icons: 15×15 stroke-2 SVG

### `.icon-btn`
- 38×38 circle; hover `--surface-hover`; `:active { transform: scale(0.94) }`

### Related chrome
- `.notif-panel` — bell dropdown
- `.search-backdrop` / `.search-panel` — search overlay (home focus ring may be indigo)
- `.filter-bar` — sticky under nav (`top: var(--nav-h)`, z-30), frosted
- `.imj-subnav` — ImajiNation only, 54px, z-40

---

## Buttons — `.btn`

Base: inline-flex, gap 8px, `padding: 12px 20px`, pill, `14px/600`, tracking `-0.005em`, nowrap.

| Variant | Fill | Notes |
|---|---|---|
| `.btn-primary` | **Indigo solid** on home/imajination/register; **magenta gradient** on classic marketing | Follow page convention |
| `.btn-secondary` | surface + 1px border + `--shadow-xs` | Hover → surface-hover |
| `.btn-ghost` | transparent, pad `10px 14px` | No lift |
| `.btn-lg` | pad `14px 24px`, 15px | — |
| `.btn-sm` | pad `8px 14px`, 13px | — |
| `.vote-btn` | magenta gradient | Artwork detail |
| `.btn-submit-final` | magenta → indigo gradient | Register, full width |

Hover: `translateY(-1px)` + soft shadow. Active: `translateY(0)`.
`.btn-icon-r:hover svg { transform: translateX(3px) }`.

Indigo CTA glow: `0 4px 14px -4px rgba(47,61,153,.45)`.
Magenta CTA glow: `0 6px 18px -6px rgba(226,27,114,.55)`.

---

## Cards — `.card`

```
background: surface
border: 1px solid border
border-radius: 24px (--radius-xl)
overflow: hidden
```

**Hover:** `translateY(-4px)` + `--shadow-lg` + `::after` gradient outline (magenta→cyan).

| Part | Rules |
|---|---|
| `.card-media` | `aspect-ratio: 16/10`, pastel gradient + `.thumb-shape` blob |
| Blob hover | `scale(1.05) rotate(-4deg)` |
| `.badge-row` | absolute `top/left/right: 14px` |
| `.card-body` | padding 22px |
| Title | Plus Jakarta 19px/700 |
| Theme | clamp 2 lines, soft text |
| `.card-foot` | top border soft, pad-top 16px |
| `.avatars .av` | 26px circles, overlap `-8px` |

### Other card families
| Class | Use |
|---|---|
| `.launch-card` | Home product launches (ar/ai/lc) |
| `.home-fc` | Featured competition compact |
| `.rcard` / `.topic-card` | Horizontal rails |
| `.class-card` | Class list + subject cover gradients |
| `.imj-cat-card` / `.imj-prize-card` | Saturated ImajiNation |
| `.creator` cards | 4-col grid, gap 20, radius-lg |
| `.prize.gold\|silver\|bronze` | Detail prize grid |

---

## Badges / chips / tags

| Class | Rules |
|---|---|
| `.badge` | pill, `5px 10px`, 11.5px/600; optional 6px `.dot` |
| On media | `rgba(255,255,255,.85)` + `backdrop-filter: blur(10px)` |
| `.badge.active` | green |
| `.badge.upcoming` | indigo |
| `.badge.closed` | mute |
| `.badge.concluded` | green tint |
| `.badge-cat.*` | solid category gradients (see tokens) |
| `.badge.status-draft` | **grey** (not amber) |
| `.badge.status-published` | green |
| `.badge.status-private` | indigo |
| `.badge.status-locked` | magenta |
| `.chip` | `8px 14px`, 13px/500; `.active` = dark fill + white text; optional `.count` |
| `.tag` | `6px 12px`, 12.5px, surface-2 |
| `.imj-cat-pill` | soft `--cat` tokens |
| `.launch-badge` | yellow “new” pill |

Avoid mixing `.pill-draft` (orange) with `.badge.status-draft` (grey) on the same surface.

---

## Forms

### Inputs — `.field`
- Full width, `1px solid border`, radius **12px**, pad `12px 14px`, 14.5px
- Focus: `border-color: cyan` + `box-shadow: 0 0 0 4px rgba(18,169,230,.12)`
- Labels: 14px/600, 6px gap · Hints: 12.5px mute

### Search
- Pill, height 42px, pad-left 42px for icon, same cyan ring (home may use indigo ring)

### Dropzone
- `1.5px dashed border`, surface-2, radius 16px, pad 36px
- Hover: cyan border + `rgba(18,169,230,.04)` tint

### Checkbox rows
- Inset surface-2 card; `accent-color: magenta` (register often indigo)
- Selected level cards (`.lv-card`): indigo ring `0 0 0 3px rgba(47,61,153,.12)`

---

## Modals / toasts / empty

### Modal
- Backdrop: `rgba(15,23,42,.4)` + blur(8px), z-100
- Modal: surface, 1px border, radius-xl, pad 36px, max-width 420px, `--shadow-lg`
- Enter: opacity fade + `scale(0.96 → 1)`
- Icon: 64px circle soft magenta↔cyan tint

### Toast
- Bottom-right wrap, z-200
- Icons: success green / info cyan / warn yellow
- Register: centered bottom pill; success=indigo, error=red

### Empty — `.empty`
- Dashed border, radius-xl, pad 64px
- `.empty-icon` 72px soft brand tint circle
- h3 18px + p 14px max-width 360px + CTA

---

## Tabs

`.profile-tab` / `.editor-tab`:
- Sticky glass bar under nav
- Underline style; active = **magenta** 2px bottom border + weight 600
- `.tab-count` pill; active tint `rgba(226,27,114,.08)`

---

## Section headers

`.section-head`: flex (heading left / actions right), margin-bottom 40px; stack ≤760px.

Eyebrow / kicker:
- 12px, 600–700, `letter-spacing: 0.08em`, UPPERCASE, color magenta
- Classic `.eyebrow` prefixes a 22px magenta→cyan gradient rule
- ImajiNation `.imj-kicker`: centered **filled soft magenta pill** (not the rule)

Then bold h2 + 16px `--text-soft` supporting line.

---

## Hero patterns

| Pattern | Rules |
|---|---|
| Marketing `.hero` | pad `84px 0 96px`; radial brand glows blur 40px; grid `1.05fr 0.95fr` gap 56px → stack ≤980px |
| Accent word | `.hero h1 .accent` gradient clip magenta→cyan→indigo |
| Trust strip | `.hero-trust` 3-col, dashed top border |
| Floating stage | pastel visual + `.floating-shape` + `.hero-chip` |
| Home wash | soft indigo/cyan/magenta background wash |
| Dash hero | pastel rounded panel |
| Detail hero | `aspect-ratio: 21/9`, pastel + blobs |
| Profile cover | height 280px; avatar overlaps `-72px` |
| Register hero | solid indigo → `#4F60D6` → cyan band |

---

## Rails (horizontal content)

- `.rail-track` — snap scroll
- Sizes: sm / md / lg / xl card widths
- `.rcard`, `.topic-card`
- Arrows: indigo circular `.rail-arrow`
- “See more” link: cyan

---

## Prizes & concluded

- Detail: `.prize-grid` 3-col gold/silver/bronze tinted borders; amounts 26px Plus Jakarta
- Home featured: compact `.home-fc-prize.g|s|b` rows
- ImajiNation: full saturated `.imj-prize-card` + total band
- Concluded: `.cc-podium` (gold pre-lifted `-12px`); ribbons gold/silver/bronze/pick

---

## Footer — `.footer`

- Pad `64px 0 32px`, surface-2, top border soft
- Grid `1.4fr 1fr 1fr 1fr` → 2-col ≤800px
- Bot bar 12.5px mute

---

## Iconography

```html
<svg fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" …>
```

Sizes: 13–16px inline; 24–56px in circular badges. No filled/duotone UI icons.

---

## Decorative imagery

- Organic blob radii with brand gradients + soft shadow + slow float
- Faint dotted grid masked by radial fade behind heroes
- Large blurred radial brand glows (magenta/cyan/indigo)
- Photos only inside rounded containers — no floating sticker overlays on hero media
