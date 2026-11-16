# Style guide for this prototype

This is the Assemblr Studio duplicate of the EDU login, register, and setup moment.
The flow matches that prototype. Color follows the Studio logo: blue with a little light pink. Token names (`--indigo`, `--magenta`, `--cyan`) are unchanged so existing
rules keep working; the pigments are the Studio ones below.

Copy rules still live in
[skills/assemblr-edu-voice/SKILL.md](skills/assemblr-edu-voice/SKILL.md). When they
disagree with this file, this file wins for this prototype.

## Tokens (`styles.css` `:root`)

| Token | Value | Use |
|---|---|---|
| `--indigo` | `#2b6fd8` | Default accent, primary buttons (blue, white-text safe) |
| `--indigo-2` | `#3f86ea` | Button hover |
| `--magenta` | `#e8408a` | Pink accent, errors |
| `--cyan` | `#3fa3e8` | Sky-blue focus ring |
| `--yellow` | `#f4a3c6` | Light pink highlight, paper plane |
| `--bg` / `--surface` | `#f7f8fa` / `#ffffff` | Page / cards |
| `--border` | `#e5e7eb` | Card and field borders |
| `--text` / `--text-soft` / `--text-mute` | `#1f2937` / `#6b7280` / `#9ca3af` | Text levels |
| `--safe` | `#17936a` (set on `.consent-minor`) | Kid-safe notice |
| Radius | 10 / 16 / 20 / 24 / 999px | sm / default / lg / xl / pill |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease`), `cubic-bezier(0.34, 1.56, 0.64, 1)` (`--ease-pop`) | Standard / playful pop |
| Durations | 160 / 240 / 420 ms | fast / default / slow |

Fonts: **Plus Jakarta Sans** for display (headings, buttons), **Inter** for body.

### Role accents

Picking a role sets `data-role` on the body. The accent and its derived tints
(`--accent-soft`, `--accent-wash`, `--accent-line`, `--accent-ring`) re-color selected
chips, progress, focus rings, and tokens in the summary line.

| Role | Accent |
|---|---|
| Student | `#b61855` |
| Educator | `#e8af1b` (ink `#8a6505`) |
| University student | `#3792f2` |
| Parent | `#17936a` |
| Lecturer | `#12a9e6` |
| Other | `#2b6fd8` |

## Surfaces

- **Background:** animated blue/white waves with a touch of light pink (`wave-bg.js`), moving in
  random directions, with a light grain. Keep them subtle.
- **Cards:** solid white, soft indigo-tinted shadows (`--e3`, `--e4`), large radius.
- **Story panels** (left side of split steps and auth): glassmorphism, 40% white with
  backdrop blur, so the waves show through.
- **Kid-safe notice:** a separate box spanning the full width of the options, green
  gradient (`--safe` at 7% fading to white), small 11.5–12px text. It must never look
  more prominent than the answer options.
- **Try card:** solid white. With a mouse, a marker stroke follows the cursor behind the
  content: about 11px wide, 50% opacity, round caps. It blends through the brand colors
  (magenta, yellow, cyan, indigo) along its length and fades out after 0.7 s (`#tryInk`
  canvas, `INK_*` constants in `app.js`). Off on touch screens and with reduced motion.

## Components and patterns

- **Option pills / cards:** icon tile + label; selected state uses the role accent tint
  and a ring. Locked options are dashed and disabled.
- **Checkboxes:** compact, 13px label. The phone consent checkbox is on the right of its
  text; the guardian "Same as …" checkbox is on the left, like a billing-address toggle.
- **Follow-up fields** expand under the chosen option with a reveal animation; their
  labels are smaller than the step question. "Optional" and "Up to 2" are small tags.
- **Primary button:** indigo pill. Disabled buttons still explain why when pressed (red
  text with an alert icon).
- **"See in full screen" pill:** black at 70% opacity, no stroke, centered on the cover,
  with a gentle pulse. After viewing it becomes "See it again" with a refresh icon.
- **Mascot blr:** above the question, speaking through a bubble. Poses live in
  `assets/blr` and `assets/blr2`.
- **Welcome slides:** H2 + one-line description + large rounded photo + dots; CTA only
  on the last slide.

## Motion

- Default to `--ease` with 240 ms; use `--ease-pop` only for playful moments (blr,
  selection pops).
- Signature moments: the cloud sweep from try-it to welcome; the sky scene (birds flap
  and blink, kite drifts, balloon rises, yellow paper plane with a rounded hand-drawn
  arrow trail, empty bubbles float).
- Respect `prefers-reduced-motion`; both JS files check it.

## Mobile

- Target 360×780 first, then check wide phones (Samsung A55 class).
- Sticky buttons at the bottom, pagination dots at a fixed height, lists scroll inside
  the card.
- Long chip sets become 3-row horizontal swipers. The social sign-in row becomes a swipe
  row with a hint.

## Welcome imagery

The full rules are in `.cursor/rules/welcome-imagery.mdc`. In short:

- Each role shows its own people. Student models look 6–9 years old; university students
  look like young adults; teachers and lecturers look like adults.
- Bright, neutral daylight: no warm, yellow, or brown cast, not washed out. Skin looks
  natural and clean. Match slide 2's lighting when adjusting others.
- Boards, screens, and devices stay fully inside the frame with headroom. Screen content
  fits the device bezel and follows the device angle.
- 1280×720 JPG. Bump `?v=` in `WELCOME_ART` after replacing a file. Keep the previous
  version in `.welcome-originals/` before overwriting.
- Text inside photos needs an Indonesian `-id` variant.
