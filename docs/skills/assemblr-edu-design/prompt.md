# Copy-paste prompts

Use these when handing design work to another AI, designer, or tool. Pick the mode that matches the surface.

---

## Prompt A — Product UI (default Assemblr EDU)

```text
Design in the "Assemblr EDU" product UI style — friendly, modern, rounded, education-focused AR/3D learning product with full light + dark mode.

PERSONALITY
Bright, clean, approachable. Colorful but not noisy. Generous white space, soft depth, playful but restrained motion. No sharp corners, no harsh black shadows, no thick borders, no filled/duotone UI icons, no emoji clusters, no floating promo stickers on heroes.

FONTS
- Headings, display, numbers: "Plus Jakarta Sans" 700–800, letter-spacing -0.02em to -0.035em, line-height 1.15.
- Body / UI: "Inter" 400–600, base 15px, line-height 1.6.
- Class / join codes: JetBrains Mono or SF Mono.
- Eyebrow/kicker: 12px, weight 600–700, letter-spacing 0.08em, UPPERCASE, color magenta #E21B72. Optionally prefix with a short magenta→cyan gradient rule.

BRAND COLORS
- Magenta #E21B72 (accent, logo E, vote, some CTAs)
- Cyan #12A9E6 (secondary, default input focus, info, logo D)
- Indigo #2F3D99 (PRIMARY workspace CTA, active nav, upcoming)
- Yellow #E8AE1A (warm accent, logo U)
Signature gradient: linear-gradient(135deg, #E21B72, #12A9E6).
Hero accent text: linear-gradient(135deg, #E21B72 0%, #12A9E6 60%, #2F3D99 100%).

NEUTRALS LIGHT: page #F7F8FA, surface #FFFFFF, hover #F4F6F9, border #E5E7EB (1px), text #1F2937, secondary #6B7280, muted #9CA3AF.
NEUTRALS DARK [data-theme=dark]: bg #0B0D12, surface #10131A, nested #141822, hover #1A1F2B, border #1F2430, text #F3F4F6, secondary #9CA3AF. Brand hues unchanged.

STATUS
Active/success #22C55E (text #15803D); draft GREY #9CA3AF (not amber); upcoming/private indigo; locked magenta; closed muted. Status dots 6–8px with soft glow ring e.g. 0 0 0 3px rgba(34,197,94,0.25).

PRIMARY BUTTON RULE
- Product / home / workspace / register screens: solid indigo #2F3D99 + indigo glow 0 4px 14px -4px rgba(47,61,153,0.45).
- Classic marketing / vote: magenta gradient #E21B72→#C61563 + magenta glow.
- Final register submit: linear-gradient(135deg, #E21B72, #2F3D99).
Buttons are pills (border-radius 999px), padding 12px 20px, 14px/600. Hover lifts translateY(-1px).

SHAPE & DEPTH
- Pills (999px) for buttons, badges, chips, search, nav links.
- Cards/modals/heroes: 24px radius.
- Inputs/panels: 12–16px radius.
- Shadows soft and brand-tinted only, e.g. 0 8px 24px rgba(17,24,39,0.06). No harsh black drop shadows.

LOGO
Wordmark "ASSEMBLR | EDU" — uppercase Plus Jakarta 700, letter-spacing 0.12em. Colored letters: E=#E21B72, D=#12A9E6, U=#E8AE1A. Do not use a conic-gradient square logo mark.

NAV
Sticky 72px glass bar: rgba(255,255,255,0.72) + saturate(180%) blur(20px). Pill links 9px 14px. Active link = indigo text on rgba(47,61,153,0.10). Collapse to drawer ≤900px.

CARDS
White surface, 1px #E5E7EB, radius 24px, body pad 22px, title Plus Jakarta 19px/700. Media aspect 16/10 with pastel gradient + floating organic blob. Hover: translateY(-4px), larger soft shadow, subtle magenta→cyan gradient outline. Avatar stack 26px overlapping -8px.

FORMS
Inputs: 1px border, 12px radius, pad 12–14px. Focus: cyan border + 0 0 0 4px rgba(18,169,230,0.12). Search is pill height 42px. Dropzone: 1.5px dashed, hover cyan tint. Checkboxes accent magenta or indigo depending on flow.

MODALS / EMPTY
Backdrop rgba(15,23,42,0.4) + blur(8px). Modal 24px radius, pad 36px, max-width 420px, enter scale 0.96→1. Empty: dashed 24px card, 72px soft brand icon circle, short copy, one CTA.

ICONS
Stroke only — fill none, stroke currentColor, stroke-width 2, round caps/joins (Feather/Lucide). No filled icons.

MOTION
cubic-bezier(0.22, 1, 0.36, 1); durations 160 / 240 / 420ms. Scroll fade-up (opacity 0→1, Y 14→0) with light stagger. Decorative blobs float slowly. Honor prefers-reduced-motion.

LAYOUT
Container max-width 1240px, side padding 24px. Section padding 96px (64px mobile). Card grids 3 columns gap 24 → 2@1024 → 1@640. Hero grid ~1.05fr 0.95fr gap 56px → stack ≤980px. Focus outline 2px solid cyan, offset 2px.

CATEGORY COLORS (soft UI pills only)
Dreamers indigo #2F3D99 · Makers magenta #E21B72 · Visionaries gold #B07E10 · Innovators cyan #12A9E6 · School purple #6D28A8. Soft fills ~10% rgba of each.

DO NOT
- Use document/rundown tokens (navy #0D1F5C, blue #00AEEF, pink #E91E8C) inside product UI.
- Use saturated ImajiNation card fills unless building ImajiNation marketing cards.
- Use sharp corners, Inter as display face, hard black shadows, or thick borders.
- Clutter the first viewport with stats strips, schedule snippets, or sticker overlays.
```

---

## Prompt B — ImajiNation marketing page

```text
Design an ImajiNation marketing page on top of the Assemblr EDU product system (glass nav, wordmark, Inter + Plus Jakarta, dark mode OK).

ADDITIONS
- Sticky secondary subnav height 54px under main nav.
- Section padding ~84px; centered magenta soft-pill kicker (12px uppercase).
- Celebratory saturated category/prize cards with vertical gradients:
  Dreamers #F6B411→#F2A208 · Makers #E8392C→#D62B22 · Visionaries #38A24E→#2E9145 · Innovators #3A4EA2→#31408D · School #7C3AAD→#6D28A8.
- Soft category pills still use the soft UI mapping (Dreamers=indigo, etc.) — never mix the two mappings on one element.
- Display weight 800 allowed; playful stars/squiggles OK in category colors.
- Primary CTAs = solid indigo (not magenta), even if a class is named btn-magenta.
- Optional dark hero art plane: linear-gradient(150deg, #1B1B4B, #2F1A48, #3A1338).
- Category card hover may lift up to -6px.

Still follow Assemblr EDU shape, type, glass nav, soft shadows, stroke icons, and container 1240px.
Do NOT use partner-document navy/pink/#00AEEF tokens.
```

---

## Prompt C — Document / partner deck / rundown

```text
Design a long-form Assemblr EDU partner / event rundown DOCUMENT (not the product app chrome).

SYSTEM
- Font: Inter only, weights 400–900. No Plus Jakarta. No glass nav. No dark mode.
- Colors: Navy #0D1F5C, Blue #00AEEF, Yellow #F5C400, Pink #E91E8C, page bg #F0F7FF, text #1a1a2e.
- Container max-width 1100px.
- Hero: full-width navy→blue gradient band, centered; pink pill eyebrow; bold white title with italic yellow accent word; meta pills in translucent white.
- Section cards: white, large radius (~16–20px), colored top accent bar, soft but slightly harder black-tint shadows than product UI.
- Tables: dense comparison / rundown tables with navy thead, clear time/activity columns, tier columns for partnership matrices; yes/no cells; hover row #F8FAFF.
- Partnership tiers: Platinum / Gold / Premier / Standard with distinct gradient headers; USD pricing as primary highlight (no IDR as main).
- Category accents in THIS document: Dreamers pink, Makers navy/blue, Visionaries yellow — do not use product soft-pill mapping.
- Footer: solid navy bar with light text.
- Vertical scrolling single-composition document; one job per section; avoid product-app dashboard chrome.

Print/PDF: preserve colors (-webkit-print-color-adjust: exact); prefer continuous vertical flow when asked for scroll PDF.
```

---

## Short sticky reminder (any mode)

```text
Assemblr EDU = rounded pills + 24px cards + soft brand-tinted shadows + Inter body + Plus Jakarta headings + magenta/cyan/indigo/yellow + glass nav wordmark. Product primary CTA = indigo. Document mode = separate navy/#00AEEF system. Never mix.
```
