# Assemblr EDU — Product UI handoff (Mode A only)

You only need **Mode A (Product UI)**. Ignore ImajiNation marketing (Mode B) and document/rundown (Mode C).

---

## What to open

| Priority | File | Why |
|---|---|---|
| 1 | `README-PRODUCT-UI.md` | This page |
| 2 | `SKILL.md` | Core rules + QA checklist |
| 3 | `tokens.md` | Exact colors / type / spacing |
| 4 | `components.md` | Nav, buttons, cards, forms |
| 5 | `prompt.md` → **Prompt A only** | Paste into Cursor / other AI |

Skip: Mode B/C sections in `modes-and-flows.md` and Prompt B/C in `prompt.md`.

**Best visual references:** `home.html`, `competitions.html`, `competition-detail.html`, `class.html`, `register.html`

---

## Setup (once)

### Using Cursor on this project
1. Open the Assemblr EDU Competition project
2. Confirm this folder exists: `.cursor/skills/assemblr-edu-design/`
3. Start a **new chat**

### Using Cursor on another project
1. Copy this whole folder to `~/.cursor/skills/assemblr-edu-design/`
2. Start a new chat

### Not using Cursor
1. Open `prompt.md`
2. Copy **Prompt A — Product UI**
3. Paste it as the first instruction every time you design

---

## How to work (every task)

1. **Say you’re in Mode A**  
   Example in Cursor:  
   `Use the assemblr-edu-design skill. Product UI only (Mode A). Design [page/component].`

2. **Match existing product patterns** — reuse nav, buttons, cards, badges from the HTML references. Don’t invent a new look.

3. **Use these defaults (Mode A):**
   - Primary CTA = **solid indigo** `#2F3D99` (not magenta, unless the page is specifically a vote/classic marketing CTA)
   - Logo = **ASSEMBLR \| EDU** wordmark (E magenta, D cyan, U yellow)
   - Fonts = Plus Jakarta Sans (headings) + Inter (body)
   - Shape = pills for buttons/badges; **24px** cards/modals
   - Shadows = soft brand-tinted only
   - Support light + dark via CSS variables

4. **Before sending work back**, run the Visual QA checklist in `SKILL.md` (Mode A items only).

---

## Mode A quick rules

**Do**
- Glass sticky nav (72px), pill links, indigo active state
- Soft neutrals (`#F7F8FA` bg, white cards, `#E5E7EB` hairline borders)
- Stroke icons only (Feather/Lucide style)
- Soft category pills if needed: Dreamers=indigo, Makers=magenta, Visionaries=gold, Innovators=cyan, School=purple

**Don’t**
- Don’t use document colors: navy `#0D1F5C`, blue `#00AEEF`, pink `#E91E8C`
- Don’t use saturated ImajiNation card fills (yellow/red/green full-bleed category cards) unless someone explicitly asks for Mode B
- Don’t use sharp corners, hard black shadows, thick borders, or filled icons
- Don’t clutter heroes with stats strips / sticker overlays

---

## Message template for your tasks

```text
Use assemblr-edu-design. Product UI only (Mode A).

Task: [what to design]
Reference pages: [e.g. competitions.html]
Notes: [any product requirements]
```
