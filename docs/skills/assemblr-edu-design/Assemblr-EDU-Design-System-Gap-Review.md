# Assemblr EDU — Design Style Guide Gap Review

**Audience:** PM / Designer  
**Language:** English  
**Based on:** Your original “Assemblr EDU style” prompt (first `new-design-style` era) + what shipped in the prototype since then  
**Companion doc:** `Assemblr-EDU-Design-System-Principles.md`  
**Date:** 2026-08-10  

---

## Locked decisions (2026-08-10)

| Topic | Decision |
|-------|----------|
| Review admin persona | **Elena Vargas** additive — Emily unchanged |
| Product primary CTA | **Logo blue** |
| Button radius | Product `rounded-md`; marketing pills OK |

---

## 1. What your original prompt actually was

It was a strong **visual style brief**, not a full **design system**.

It excelled at:
- Brand color intent (magenta / cyan / indigo / yellow)
- Font pairing (Plus Jakarta Sans + Inter)
- Light + dark neutrals
- Component “look” (pills, soft shadows, glass nav, gradient buttons)
- Motion and imagery mood

It did **not** yet define:
- Decision rules (when to use which pattern)
- Product vs marketing surfaces
- Journey patterns for paid / school users
- Hierarchy for dense settings UI (account, seats, billing)
- Conflict resolution when two rules fight

That is not a failure — it is a normal first artifact. Ant Design-level systems grow from many iterations of tokens **plus** principles **plus** patterns.

---

## 2. Your mental model (Ant Design) — what is right

You are correct that a serious design system is detailed, including:

| Area | Examples |
|------|----------|
| Typography | Heading 1–6 + body / caption roles |
| Color | Primary, secondary, neutrals, semantic status |
| Components | Button, input, card, modal… with full states |
| States | Default, hover, focus, active, disabled, loading, error, success |
| Context | Same button, different density / emphasis by screen |

That is the **foundations + components** half of a design system. Keep it.

---

## 3. What was incomplete in the original prompt

### 3.1 No product register split

The prompt describes one vibe for everything:

> friendly, rounded, playful-but-restrained, pill buttons, 24px cards, blobs, section kickers…

That fits **marketing, EDU home, welcome heroes, ImajiNation**.  
It fights **account settings, billing tables, seat management, dense member lists**.

**Missing:**  
“Where does this style apply 100%?” vs “Where do we switch to product density?”

Without that split, Cursor (and humans) will keep applying landing aesthetics inside settings — or the opposite.

---

### 3.2 Typography was display-first, not settings-first

Original:

| Role | Spec |
|------|------|
| Headings | Plus Jakarta 700–800, tight tracking |
| Body | Inter 15px / 1.6 |
| Section headers | Magenta uppercase eyebrow + bold h2 + 16px subhead |

Missing for Assemblr EDU account / plan journeys:

| Role | Needed decision |
|------|-----------------|
| Page title in a settings card | Size? Weight? Display font or Inter? |
| In-card section title (e.g. Subscription Overview) | vs page title — who wins hierarchy? |
| Helper / description under title | 12px vs 15px vs 16px? |
| Table headers, badges, progress labels | Caption scale |

This is why later work renegotiated: CardTitle ~16px medium, description 12px, h3 section 14px regular.

**Original prompt had no type *roles* for product UI — only marketing-ish heading sizes.**

---

### 3.3 Shape rules conflicted with later product decisions

Original:

- Buttons = **pills** (`999px`)
- Cards / modals = **24px**
- Inputs = **12px**

Later Assemblr EDU account rule (Cursor rule / practice):

- Buttons = **`rounded-md` (6px)** always
- Cards = **`rounded-xl` (12px)**
- Never put `rounded-xl` on buttons

**Missing:** A principle that says which radius family wins on which surface, and an explicit “do not use pill buttons in account settings” (if that is the product decision).

---

### 3.4 Color system was brand-forward, not role-forward

Original defined beautiful brand hues, but incomplete **roles**:

| Present | Incomplete |
|---------|------------|
| Magenta primary, cyan focus | When is primary magenta vs logo blue vs indigo? |
| Status success / warning | Failed payment, pending invite, seat exhausted, blocked join — full semantic map |
| Light + dark neutrals | Text-on-status, focus rings, disabled fills as tokens with WCAG notes |
| Signature gradients | When gradients are forbidden (data tables, dense forms) |

Account work drifted toward **logo blues / sky / amber progress** because billing & seats need calm trust, not campaign energy.

**Missing:** Color *usage law*: brand on CTAs and celebration; neutrals + semantic status on management UI.

---

### 3.5 Components listed “look,” not “state matrix”

Original described primary / secondary / ghost buttons and hover lift.

Incomplete vs Ant Design–grade:

- Disabled, loading, destructive, success confirmation
- Icon-only vs icon+label sizing
- Button hierarchy when **two** actions sit together (Add plan members vs Create class)
- Outline vs filled on welcome pages vs settings
- Focus-visible rings (you had cyan glow — good; not mapped to all controls)

Same gap for: inputs (error / success), switches, checkboxes, badges, progress bars, dialogs.

---

### 3.6 Layout was marketing grid, not app shell

Original:

- Max width 1240px, 3-col card grids, ~96px section rhythm

Assemblr EDU product reality:

- Sidebar + main (account)
- Sticky EDU navbar
- Dense lists, popovers, dialogs, Condition Control demos

**Missing:** App shell tokens (sidebar width, nav height, card padding scale, list row height, mobile collapse rules).

---

### 3.7 Motion & decoration without “when not to”

Blobs, parallax, fade-up, magenta glow — excellent for welcome / home.

**Missing rules:**

- No floating blobs on billing / seats / privacy
- Prefer 0–1 motion moments on management screens
- Confetti only on activation / welcome, once per session key
- Always honor `prefers-reduced-motion`

---

### 3.8 No journey / pattern layer (critical for paid school)

Original prompt never defined:

- School admin first entry (welcome → add members → seats truth)
- Invited admin / teacher / student paths
- Join-by-code vs staff-created student
- Member-of-plan billing (read-only seats, “billed to school admin”)
- Primary CTA per step (one job)

Without journeys, visual style alone cannot keep Emily / Sophie / Lucas flows coherent.

---

### 3.9 Personality keywords conflicted

Original vibe: friendly, playful, colorful, optional ImajiNation kid variant.

Product personality later crystallized as: **clear, to the point, educated** — school-appropriate, not gimmicky.

**Missing:** Explicit boundary:

- EDU marketing / student welcome may be warmer  
- Account / billing / seats stay calm and competent  
- ImajiNation is a **named variant**, not default Assemblr EDU settings UI

---

### 3.10 No governance for Cursor / humans

Missing:

- Single source of truth file (`DESIGN.md`)
- What overrides what when prompt ≠ code ≠ Figma
- How to request a change (“change hierarchy” vs “change one pixel”)
- Anti-patterns list (“do not invent a third radius for one button”)

---

## 4. Drift map: original prompt → current prototype (honest)

| Topic | Original prompt | What evolved in account prototype | Gap type |
|-------|-----------------|-----------------------------------|----------|
| Button shape | Pill 999 | `rounded-md` 6px | Unresolved principle |
| Card radius | 24px | ~12–16px (`rounded-xl` / tokens) | Drift without doc |
| Primary color | Magenta #E21B72 | Often logo blue / cyan focus | Brand role unclear |
| Page titles | Display heavy | 16px medium Inter | Hierarchy invented late |
| Section titles | Bold h2 + magenta kicker | 14px regular h3 | Hierarchy invented late |
| Descriptions | 16px muted | 12px muted | Hierarchy invented late |
| Shadows / hover lift | Strong card lift | Quieter on settings | Surface-specific rule missing |
| Blobs / confetti | Encouraged | Welcome only (informal) | Needs formal rule |

This drift is expected. The gap is that **decisions were not written back into a design system**.

---

## 5. Completeness scorecard (original prompt)

| Design system layer | Score | Notes |
|---------------------|-------|-------|
| Brand mood | High | Clear Assemblr EDU / ImajiNation flavor |
| Color swatches | Medium–High | Brand yes; roles incomplete |
| Typography pairing | Medium | Fonts yes; product roles no |
| Component cosmetics | Medium | Look yes; states incomplete |
| Accessibility | Low–Medium | Mentions reduced motion; no WCAG matrix |
| App shell / settings patterns | Low | Marketing layout only |
| Paid / school journeys | None | Biggest hole for your current work |
| Decision principles | Low | Keywords ≠ enforceable rules |
| Cursor / designer workflow | None | No DESIGN.md contract |

---

## 6. What “complete” means for Assemblr EDU (target)

A comprehensive Assemblr EDU design system should include:

1. **Principles** — brand personality, anti-references, surface split (marketing vs product)  
2. **Foundations** — color roles, type roles, space, radius, elevation, motion, iconography  
3. **Components** — anatomy + full state matrix  
4. **Patterns** — forms, empty states, confirmations, progress / seats, invite flows  
5. **Journeys (School-first)** — admin first entry, invited roles, join code, billing-as-member  
6. **UX psychology (medium)** — laws with use / avoid for EDU  
7. **Governance** — DESIGN.md as source of truth; how variants (ImajiNation) inherit / diverge  

Item (5)–(7) were almost entirely absent from the first prompt.

---

## 7. Recommendation for you as PM / designer

1. Treat the original prompt as **Foundation v0 (visual DNA)**.  
2. Adopt `Assemblr-EDU-Design-System-Principles.md` as **DESIGN.md draft** (review offline; do not assume it is already in the repo).  
3. When a chat decision sticks (e.g. “buttons never pill in account”), **promote it into DESIGN.md the same day**.  
4. Keep Emily in Condition Control; review a **new** School-admin demo persona (**Elena**) separately — do not silently rename Emily.  
5. School-first journey docs first; other plans later.

---

## 8. Open decisions to confirm when you review the principles doc

- Keep magenta as **brand primary** everywhere, or **magenta for marketing / welcome** and **blue for account trust**?
- Pill buttons: marketing only, or never again in EDU web?
- Card radius: lock 12px product / 24px marketing, or one radius family?
- Plus Jakarta: display/hero only, or also settings page titles?

Resolve these in the principles doc review pass so Cursor stops guessing.

---

*End of gap review.*
