# Assemblr EDU — Design Tokens

Exact values from `styles/main.css` and intentional page overrides.

## Brand colors

| Token | Hex | Usage |
|---|---|---|
| `--magenta` | `#E21B72` | Accent, logo E, vote buttons, some primary CTAs, selection tint |
| `--cyan` | `#12A9E6` | Secondary, default input focus, info toasts, logo D |
| `--indigo` | `#2F3D99` | Workspace primary CTA, active nav, upcoming status |
| `--yellow` | `#E8AE1A` | Warm accent, logo U, story badges, highlights |

### Companion hex (not always tokenized)

`#C61563` (magenta dark) · `#4254B5` · `#C99410` · `#0C84B5` · `#4F60D6` · `#FF5BA0` · `#5FD0FF` · `#FFD466` · `#B07E10` · `#DC2626` (register error `--red`)

### Signature gradients

```css
/* Brand accent text / logo mark */
linear-gradient(135deg, #E21B72, #12A9E6)

/* Hero headline accent */
linear-gradient(135deg, #E21B72 0%, #12A9E6 60%, #2F3D99 100%)

/* Magenta primary button */
linear-gradient(135deg, #E21B72 0%, #C61563 100%)

/* Register final submit */
linear-gradient(135deg, #E21B72, #2F3D99)

/* Card hover outline */
linear-gradient(135deg, rgba(226,27,114,.4), rgba(18,169,230,.4))

/* Category badges */
.ar     → linear-gradient(135deg, #E21B72, #C61563)
.lesson → linear-gradient(135deg, #2F3D99, #4254B5)
.story  → linear-gradient(135deg, #E8AE1A, #C99410) /* text #4A3300 */
.design → linear-gradient(135deg, #12A9E6, #0C84B5)
```

---

## Neutrals — light

| Token | Hex |
|---|---|
| `--white` | `#FFFFFF` |
| `--bg` | `#F7F8FA` |
| `--bg-soft` | `#FAFBFC` |
| `--surface` | `#FFFFFF` |
| `--surface-2` | `#FAFBFC` |
| `--surface-hover` | `#F4F6F9` |
| `--border` | `#E5E7EB` |
| `--border-soft` | `#EEF0F3` |
| `--text` | `#1F2937` |
| `--text-soft` | `#6B7280` |
| `--text-mute` | `#9CA3AF` |

`::selection { background: rgba(226,27,114,0.18); }`

---

## Neutrals — dark (`[data-theme="dark"]`)

| Token | Hex |
|---|---|
| `--white` / `--bg` | `#0B0D12` |
| `--bg-soft` / `--surface` | `#10131A` |
| `--surface-2` | `#141822` |
| `--surface-hover` | `#1A1F2B` |
| `--border` | `#1F2430` |
| `--border-soft` | `#181C25` |
| `--text` | `#F3F4F6` |
| `--text-soft` | `#9CA3AF` |
| `--text-mute` | `#6B7280` |

Brand hues stay the same. Shadows deepen to black-based rgba.

---

## Status colors

| Role | Fill / dot | Text |
|---|---|---|
| Success / Active / Published / Concluded | `#22C55E` | `#15803D` |
| Draft (canonical override) | `#9CA3AF` | `#6B7280` |
| Upcoming / Private | `#2F3D99` | `#2F3D99` |
| Locked | `#E21B72` | `#E21B72` |
| Closed / Inactive | `#9CA3AF` | `#9CA3AF` |
| Error (register) | `#DC2626` | — |
| Warning / amber (legacy, avoid for draft) | `#F59E0B` | `#B45309` |

Status dots: ~6–8px circle + glow e.g. `box-shadow: 0 0 0 3px rgba(34,197,94,0.25)`.

---

## ImajiNation category tokens

### Soft UI (`[data-cat]` pills / section accents)

| Cat | `--cat` | Soft bg | Border |
|---|---|---|---|
| dreamers | `#2F3D99` | `rgba(47,61,153,.10)` | `rgba(47,61,153,.30)` |
| makers | `#E21B72` | `rgba(226,27,114,.10)` | `rgba(226,27,114,.32)` |
| visionaries | `#B07E10` | `rgba(232,174,26,.16)` | `rgba(232,174,26,.36)` |
| innovators | `#12A9E6` | `rgba(18,169,230,.10)` | `rgba(18,169,230,.32)` |
| school | `#6D28A8` | `rgba(109,40,168,.10)` | `rgba(109,40,168,.30)` |

### Saturated cards (`.imj-cat-card` / `.imj-prize-card`)

| Cat | `--cat-bg` | `--cat-bg2` |
|---|---|---|
| Dreamers | `#F6B411` | `#F2A208` |
| Makers | `#E8392C` | `#D62B22` |
| Visionaries | `#38A24E` | `#2E9145` |
| Innovators | `#3A4EA2` | `#31408D` |
| School Award | `#7C3AAD` | `#6D28A8` |

Fill: `linear-gradient(180deg, var(--cat-bg), var(--cat-bg2))`.

### Rank metals (prizes / podium)

| Rank | Gradient |
|---|---|
| Gold | `#F6D265 → #E8AE1A` |
| Silver | greys (`#D1D5DB` family) |
| Bronze | `#E8B98C → #C77F44` |
| Judge’s pick | `#8B5CF6` |

---

## Document / partner-deck tokens (isolated)

Only for rundown / partnership HTML — never inside product chrome.

| Role | Hex |
|---|---|
| Navy | `#0D1F5C` |
| Blue | `#00AEEF` |
| Yellow | `#F5C400` |
| Pink | `#E91E8C` |
| Page bg | `#F0F7FF` / `#F0F8FF` |
| Text | `#1a1a2e` |
| Container | **1100px** |
| Font | Inter only, weights up to **900** |

---

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
```

| Role | Family | Weight | Size | Tracking | LH |
|---|---|---|---|---|---|
| Body / UI | Inter | 400–600 | 15px (register 14px) | — | 1.6 |
| Lead | Inter | 400 | 17px | — | 1.65 |
| h1 | Plus Jakarta | 700 | `clamp(2.4rem, 5vw, 4rem)` | `-0.035em` | 1.15 |
| h2 | Plus Jakarta | 700 | `clamp(1.8rem, 3.4vw, 2.6rem)` | `-0.03em` | 1.15 |
| h3 / h4 | Plus Jakarta | 700 | `1.35rem` / `1.1rem` | `-0.02em` | 1.15 |
| Card title | Plus Jakarta | 700 | 19px | `-0.02em` | — |
| Eyebrow | Inter/Jakarta | 600–700 | 12px | `0.08em` UPPERCASE | — |
| Meta / small | Inter | 500 | 12–13px | — | — |
| Button | Inter | 600 | 14px | `-0.005em` | — |
| Stat number | Plus Jakarta | 700–800 | 22–30px | `-0.02em` | — |
| Class code | JetBrains Mono / SF Mono | — | — | — | — |

Body features: `font-feature-settings: "cv02","cv03","cv04","cv11","ss01"`.

---

## Spacing rhythm

Even-number scale. Common values:

| Scale | px | Use |
|---|---|---|
| Tiny | 4, 6, 8 | icon/chip gaps |
| Small | 10, 12, 14 | badge/button padding |
| Base | 16, 18, 20, 22, 24 | card pad 22, container 24, grid gap 24 |
| Large | 28, 32, 40, 48, 56 | section-head margin 40, hero gaps |
| Section | 64, 84, 96 | section vertical rhythm |

`.section { padding: 96px 0 }` · `.section-sm` / mobile `64px` · `.imj-section` `84px` (`.tight` `64px`).

---

## Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `10px` | small controls, nav toggle |
| `--radius` | `16px` | panels, dropzones, dropdowns, toasts |
| `--radius-lg` | `20px` | creator/prize/class cards |
| `--radius-xl` | `24px` | competition cards, modals, heroes |
| `--radius-full` | `999px` | buttons, badges, chips, search, nav links |

Organic blobs: `32% 68% 68% 32% / 32% 32% 68% 68%`, `50%`, squircles.

---

## Shadows

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px rgba(17,24,39,.04)` |
| `--shadow-sm` | `0 2px 6px rgba(17,24,39,.04), 0 1px 2px rgba(17,24,39,.03)` |
| `--shadow` | `0 8px 24px rgba(17,24,39,.06), 0 2px 6px rgba(17,24,39,.04)` |
| `--shadow-lg` | `0 24px 60px rgba(17,24,39,.10), 0 8px 24px rgba(17,24,39,.06)` |
| `--shadow-glow-m` | `0 10px 40px -10px rgba(226,27,114,.35)` |
| `--shadow-glow-c` | `0 10px 40px -10px rgba(18,169,230,.35)` |
| Magenta btn | `0 6px 18px -6px rgba(226,27,114,.55)` → hover deeper |
| Indigo CTA | `0 4px 14px -4px rgba(47,61,153,.45)` |

---

## Motion

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--t-fast` | `160ms` |
| `--t` | `240ms` (register override `220ms`) |
| `--t-slow` | `420ms` |

Keyframes: `fadeUp` (Y 14→0), `float` / `imjFloat` (Y −18px, 6–10s), `shimmer` 1.6s, `toastIn`, modal scale 0.96→1.

---

## Layout tokens

| Token | Value |
|---|---|
| `--container` | `1240px` |
| `--nav-h` | `72px` (register `64px`) |
| `--subnav-h` | `54px` (ImajiNation only) |

### Z-index scale

| Layer | z |
|---|---|
| Dropdown | 20 |
| Filter / tabs | 30 |
| ImajiNation subnav | 40 |
| Nav | 50 |
| Modal | 100 |
| Toast | 200 |

---

## Pastel media placeholders

Use for card thumbs / covers when no photo:

`#FCE0EC` `#FFE9D6` `#DBF3FE` `#E4E8FB` `#FFF4D2` `#FCE4F0` `#E0F4FE` `#FAE9F1` `#EEF0FE` `#DCF1FB` `#FFE5C0` `#FCD9EA`

Typical media gradient: `linear-gradient(135deg, #FCE0EC 0%, #FFE9D6 100%)`.
