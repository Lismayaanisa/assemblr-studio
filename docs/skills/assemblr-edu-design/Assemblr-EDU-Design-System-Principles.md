# Assemblr EDU — Comprehensive Design System Principles

**Status:** Decisions locked 2026-08-10 — intended to become `DESIGN.md` after final copy pass  
**Audience:** PM / Designer  
**Language:** English  
**Brand scope:** Whole Assemblr EDU  
**Journey focus (v1):** School plan — admin first entry first  
**Companion:** `Assemblr-EDU-Design-System-Gap-Review.md`  

### Locked product decisions (2026-08-10)

| Decision | Lock |
|----------|------|
| School admin review persona | **Elena Vargas** — additive; does **not** replace Emily Parker |
| Account / product primary CTA | **Logo blue** (`var(--brand-logo-blue)` / Assemblr EDU navy-blue) |
| Button radius | **Product UI:** `rounded-md` (6px) always. **Marketing / welcome / pills:** full pill allowed only on marketing surfaces |  

---

## 0. How to use this document

This is not a Figma dump and not a component gallery alone. It is a **decision system**:

1. **Principles** decide tradeoffs.  
2. **Foundations** give tokens and roles.  
3. **Components** define states.  
4. **Patterns** solve recurring UI problems.  
5. **Journeys** sequence screens for School-paid users.  
6. **UX laws** explain *why* — with when to use / avoid.

If two rules conflict, higher layers win: **Journey goal → Principle → Pattern → Component → Token**.

---

## 1. Brand & product intent

### 1.1 Product

Assemblr EDU helps schools and learners create and learn with 3D / AR. Account surfaces exist so users can **manage and monitor their plan** with confidence: billing truth, seats, members, login, privacy.

### 1.2 Personality

**Clear, to the point, educated.**  
Trustworthy and school-appropriate. Competent — not childish, not “generic AI SaaS purple.”

Warmth is allowed on **welcome / home / student energy**.  
Calm competence is required on **billing / seats / privacy / security**.

### 1.3 Anti-references

- Dense walls of copy with no hierarchy  
- Dashboard clutter (widgets without a job)  
- Novelty motion for its own sake  
- Competing primary CTAs at equal visual weight  
- Applying marketing decoration inside dense management UI  

### 1.4 Surface split (critical)

| Surface | Examples | Visual posture |
|---------|----------|----------------|
| **Marketing / celebration** | Landing modules, school welcome, EDU home heroes | Brand color, softer depth, optional motion, warmer illustration |
| **Product / management** | Account settings, seats, members, billing, privacy | Restrained color, clear hierarchy, minimal decoration, high scannability |
| **Named variant: ImajiNation** | Kid-facing category worlds | Separate token set; never leak into School admin billing |

**Rule:** Do not paste “pill + blob + magenta kicker” into seats/billing by default.

---

## 2. Design principles (Assemblr EDU)

1. **Structure before volume** — Every block answers “what is this?” via title + optional short lead.  
2. **One primary action per moment** — Especially billing, seats, invites, welcome.  
3. **Honest density** — Shorter labels; progressive disclosure for edge cases.  
4. **Plan truth at the center** — Plan name, status, seats used/available, renewal/expiry stay findable.  
5. **Respect attention** — Educated ≠ verbose.  
6. **Role clarity** — Admin / teacher / student see actions that match power.  
7. **Continuity across invite paths** — Link, code, and staff-created accounts should feel like one product family, not three apps.  
8. **Accessibility is default** — WCAG 2.2 AA target; keyboard paths; `prefers-reduced-motion`.

---

## 3. Foundations

### 3.1 Color — brand DNA (from original style)

Keep these as **brand pigments**:

| Token idea | Hex | Role |
|------------|-----|------|
| Magenta | `#E21B72` | Brand energy, celebration, key marketing accents |
| Cyan | `#12A9E6` | Focus ring, secondary highlight |
| Indigo | `#2F3D99` | Active / selected (nav, emphasis) |
| Yellow | `#E8AE1A` | Warm accent (sparingly) |
| Signature gradient | `135deg, #E21B72 → #12A9E6` | Heroes, special CTAs — not tables |

**Neutrals (light):** page `#F7F8FA`, surface `#FFFFFF`, hover `#F4F6F9`, border `#E5E7EB`, text `#1F2937`, secondary `#6B7280`, muted `#9CA3AF`.  

**Neutrals (dark):** bg `#0B0D12`, surface `#10131A`, nested `#141822`, hover `#1A1F2B`, border `#1F2430`, text `#F3F4F6`, secondary `#9CA3AF`.

**Status:**

| Status | Fill idea | Text idea | Use |
|--------|-----------|-----------|-----|
| Success | `#22C55E` | `#15803D` | Active plan, paid invoice, seats available |
| Warning | `#F59E0B` | `#B45309` | Expiring, low quota |
| Danger | `#EF4444` | deep red text | Expired, failed payment, destructive |
| Info / locked | Indigo / magenta tints | — | Pending invite, locked feature |

#### Color usage law

| Do | Don’t |
|----|-------|
| Use neutrals for 80%+ of management UI | Paint entire billing page in magenta |
| Use semantic status for plan/seat/payment truth | Use yellow for both “warning” and “decoration” |
| Use cyan for focus rings consistently | Invent a new focus color per screen |
| Reserve gradients for heroes / rare primary moments | Gradient every button in settings |

**Locked:** Account / product **primary CTA = logo blue**. Magenta remains brand pigment for marketing, celebration, and special accents — not the default settings primary button.

---

### 3.2 Typography

**Families**

- **Display / hero / large numbers (optional):** Plus Jakarta Sans, 700–800, tracking −0.02 to −0.035em, line-height ~1.15  
- **Product UI (default):** Inter, 400–600, comfortable reading

**Product type roles (settings / account) — lock these**

| Role | Size | Weight | Color | Example |
|------|------|--------|-------|---------|
| Page title | 16px (`text-base`) | 500 medium | heading | Usage and payment, Seats, Class members |
| Page description | 12px (`text-xs`) | 400 | muted | Manage your subscription… |
| Section heading | 14px (`text-sm`) | 400 regular | heading | Subscription Overview, Payment Method |
| Body | 14–15px | 400 | body | Form values, paragraphs |
| Label | 12–14px | 400–500 | secondary | Field labels |
| Caption / badge | 10–11px | 500–600 | muted / semantic | Helper, chips |
| Display metric | 24px+ | 600 | heading | `11` in seats used |

**Marketing type roles (welcome / home)**

| Role | Guidance |
|------|----------|
| Hero title | Plus Jakarta, larger, semibold–bold |
| Hero lead | Inter 14px, relaxed, muted |
| Eyebrow / kicker | Optional; magenta uppercase only on marketing surfaces |

**Law:** In account settings, **do not** use marketing H2 sizes for card titles. Hierarchy is L1 page title > L3 section > body.

---

### 3.3 Shape & radius

Original visual DNA loved pills and 24px cards. **Product EDU account practice** evolved to:

| Element | Radius | Notes |
|---------|--------|-------|
| Buttons (product) | 6px (`rounded-md`) | All variants on account, seats, billing, members, privacy |
| Cards / panels | 12px (`rounded-xl`) | Management surfaces |
| Inputs | 8–12px | Match density |
| Badges / chips | Soft rounded; full pill optional | Prefer soft in dense tables |
| Marketing CTAs / chips | Pill (`999px`) allowed | Marketing / welcome / EDU home only |

**Law (locked):** Product buttons never use pill or card radius. Marketing may use pills.

---

### 3.4 Spacing

Use a consistent scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96.

| Context | Rhythm |
|---------|--------|
| Title ↔ description | 4–6px (tight pair) |
| Inside card sections | 16–24px |
| Between major card sections | 24–32px |
| Marketing sections | up to 64–96px |

**Law:** Tight within a concept; generous between concepts.

---

### 3.5 Elevation & depth

- Soft, low-opacity shadows only; brand-tinted when needed  
- No harsh black shadows  
- Product cards: quiet border + light shadow  
- Marketing cards may lift more on hover  
- Management lists: prefer border/background change over dramatic lift  

---

### 3.6 Motion

- Duration ~160–420ms; easing `cubic-bezier(0.22, 1, 0.36, 1)`  
- Welcome: subtle fade-up / confetti (session-keyed, not every revisit)  
- Settings: almost static; microfeedback on toggles/buttons only  
- Always honor `prefers-reduced-motion`  

---

### 3.7 Icons & imagery

- Lucide / Feather: stroke 2, round caps, `currentColor`  
- Illustrations / BLR characters: welcome & empty marketing moments — not billing tables  
- Progress / payment method icons: brand-tinted, small, meaningful  

---

## 4. Components (state-complete mindset)

Every interactive component should define at least:

**default · hover · focus-visible · active · disabled · loading · error · success** (as applicable)

### 4.1 Buttons

| Variant | Use |
|---------|-----|
| Primary | One main next step — **logo blue** fill (product) |
| Secondary / outline | Alternative path |
| Ghost | Tertiary / toolbar |
| Destructive | Remove member, cancel subscription (confirm first) |
| Marketing primary | May use magenta gradient / pill — marketing surfaces only |

**States:** enabled, disabled, loading (spinner + unchanged width if possible), focus ring (cyan glow).

**Laws**

- One primary per view region  
- Destructive never equal weight to primary without confirmation  
- Icon + label on critical actions; icon-only only with `aria-label`  

### 4.2 Inputs

- Clear label, helper, error text  
- Focus: cyan border + soft ring  
- Error: danger border + message, not color alone  

### 4.3 Cards

- Page card: title + description header, then sections  
- Nested cards: quieter than parent  
- No hover-lift contests inside forms  

### 4.4 Dialogs / popovers

- One job  
- Title regular/medium, not shouting  
- Primary + cancel; destructive separated  
- Filter popovers: single dimension when possible (e.g. filter by role only)  

### 4.5 Progress & seats

| Level | Color cue |
|-------|-----------|
| Ample | Sky / success |
| Low | Amber |
| Exhausted | Rose |

Always show **used / total** and **available** in plain language.

### 4.6 Badges / status chips

Short, scannable: Active, Pending, Expired, Member · Code, etc.  
Do not stack novels into chips.

---

## 5. Patterns

### 5.1 Settings page pattern

1. Page title (16 / medium)  
2. Page description (12 / muted)  
3. Sections with section headings (14 / regular)  
4. One support line at bottom if needed  

### 5.2 Empty states

- Say what’s missing  
- One clear action  
- Avoid decorative overload on management empties  

### 5.3 Invite patterns

| Path | User job | UI emphasis |
|------|----------|-------------|
| Email / link invite | Accept → register/login → welcome | Trust, clarity of role |
| Class join code | Enter code → enter class | Short modal, obvious fields |
| Staff-created student | Login → welcome → see class | Less friction; no fake code step |

### 5.4 Confirmation / irreversible

- Cancel subscription, remove member, delete class: confirm  
- Prefer consequence language over scary decoration  

### 5.5 Member-of-plan billing

- Show plan truth  
- Clarify billing owner (“Billed to school admin”)  
- Soften seat controls the member cannot change  

---

## 6. Journeys — School-first (v1)

### 6.1 Persona proposal for review (do not replace Emily)

| Demo persona | Role | Purpose | Status |
|--------------|------|---------|--------|
| **Emily Parker** | Existing School admin | Keep as-is in Condition Control | Locked existing |
| **Elena Vargas** | School admin first-entry twin | Parallel journey for clean first-entry review without overwriting Emily | **Approved** — additive in Condition Control |

**Rule:** New profile = additive. Never rename Emily in place.

Elena defaults (approved):

- Plan: Starter (School), yearly, card billing  
- Language: English  
- Stage: First entry / onboarding (premium welcome)  
- Seats: same capacity as Lincoln school demo total  
- Distinct avatar + email (`elena.vargas@…`) so Condition Control stays unambiguous  

### 6.2 Journey: School admin first entry

**Goal:** Admin understands plan is active and takes the next valuable setup step.

| Step | Screen | Primary action | Secondary | Success look |
|------|--------|----------------|-----------|--------------|
| 1 | Login via school onboarding entry | Login | — | Calm auth |
| 2 | Full-page welcome (School Plan active) | Add plan members | Set up later | Celebration allowed |
| 3 | Manage seats & members | Add member | Manage seats | Plan truth visible |
| 4 | Optional class setup | Create class (from class surfaces) | — | Not forced on welcome |

**Laws**

- Welcome is **page**, not old congrats popup (for school onboarding)  
- One primary CTA on welcome  
- Seats numbers must match plan truth  

### 6.3 Related School journeys (document stubs for later expansion)

- Invited co-admin welcome → manage access  
- Invited teacher welcome → create class / EDU home  
- Student join-by-code → code modal → class  
- Staff-created student → welcome → see class  
- Post-onboarding member billing (read-only nuances)  

Expand these in DESIGN.md after Elena / Emily first-entry is stable.

---

## 7. UX psychology & laws (medium depth)

Common laws with **when to use / avoid** in Assemblr EDU.

### 7.1 Hick’s Law — fewer choices, faster decisions

- **Use:** One primary CTA on welcome; filter-by-role instead of four filter groups.  
- **Avoid:** Three equal buttons on first viewport of admin welcome.

### 7.2 Miller’s Law — chunk information

- **Use:** Billing split into Overview / Payment / History.  
- **Avoid:** One endless scrolling card of every setting.

### 7.3 Aesthetic–Usability Effect — polish increases perceived trust

- **Use:** Consistent radius, type roles, quiet shadows on billing.  
- **Avoid:** Random one-off gradients that look “pretty” but break trust patterns.

### 7.4 Fitts’s Law — bigger / nearer targets for important actions

- **Use:** Comfortable primary buttons on welcome; adequate tap targets on mobile nav.  
- **Avoid:** Critical “Cancel subscription” as tiny text next to dense chrome without spacing.

### 7.5 Jakob’s Law — users expect familiar patterns

- **Use:** Settings sidebar, card headers, confirm dialogs.  
- **Avoid:** Inventing a unique navigation model per plan tier.

### 7.6 Progressive disclosure

- **Use:** Advanced seat proration details behind “learn more”; filters collapsed.  
- **Avoid:** Showing Stripe proration essays before user chooses to add seats.

### 7.7 Recognition over recall

- **Use:** Show plan name, renewal date, seat counts in context.  
- **Avoid:** Making users remember invite codes from a previous screen with no copy affordance.

### 7.8 Feedback loop (Norman)

- **Use:** Immediate pending state after invite; disabled Proceed until code complete.  
- **Avoid:** Silent failures on payment or invite.

### 7.9 Peak–end rule

- **Use:** Welcome celebration at activation peak; clear “done” moment after invite/create.  
- **Avoid:** Ending flows on a blank table with no next step.

### 7.10 Cognitive load — intrinsic / extraneous / germane

- **Use:** Short leads under titles; plain status words.  
- **Avoid:** Decorative blobs + long legal paragraphs + three CTAs on the same management screen.

### 7.11 Consistency & standards

- **Use:** Same title/description scale on Profile, Billing, Seats, Class members.  
- **Avoid:** Each section inventing its own heading weight.

### 7.12 Error prevention > error messages

- **Use:** Disable Proceed until 5-character code; confirm before remove member.  
- **Avoid:** Allowing destructive actions with only a toast after the fact.

---

## 8. Accessibility principles

- Contrast AA for text and meaningful icons  
- Do not rely on color alone for status (pair with text)  
- Focus visible on all controls  
- Dialogs trap focus; Escape closes where expected  
- Hit targets ≥ 40px where possible on mobile  
- Motion reduced when requested  

---

## 9. Content & tone

- Plain language; school-appropriate  
- EN / ID parity when both ship  
- Prefer verbs for actions: Add member, Join your class, Set up later  
- Status words users understand: Active, Pending, Expired, Available  

---

## 10. Governance (for you + future DESIGN.md)

| Rule | Practice |
|------|----------|
| Source of truth | This document → promote to `DESIGN.md` after review |
| Visual reference | Figma (when available) follows roles here |
| Prototype | Code must not silently invent new radius/type roles |
| Conflict | Journey goal + principles beat one-off aesthetics |
| Change control | If you decide “account CTAs are blue,” write it here the same day |

### What this doc intentionally does *not* include (yet)

- Full Cursor journey briefing playbook (you deferred)  
- Complete Creator / Single / Group journey maps (School-first first)  
- Pixel-perfect component Figma specs (add when you lock tokens)  

---

## 11. Review checklist

- [x] **Elena** additive School-admin review profile — approved  
- [x] **Account primary CTA** — logo blue  
- [x] **Button radius** — product `rounded-md`; marketing pills OK  
- [x] **Type roles** table (16 / 12 / 14) — in use in prototype  
- [ ] Confirm welcome stays **full page** for school onboarding (already practiced; mark if sacred)  
- [ ] Final pass: which original prompt items remain sacred (fonts, cyan focus, brand pigments)

---

## 12. One-page cheat sheet

| Topic | Assemblr EDU default |
|-------|----------------------|
| Personality | Clear, educated, trustworthy |
| Settings title | 16 medium |
| Settings description | 12 regular muted |
| Section heading | 14 regular |
| Buttons (product) | `rounded-md`, one primary = **logo blue** |
| Buttons (marketing) | Pill + brand accents allowed |
| Cards (product) | Soft radius ~12, quiet shadow |
| Brand pigments | Magenta / cyan / indigo / yellow — restrained in management UI |
| Motion | Subtle; celebration on welcome only |
| School journey north star | Activate plan → understand seats → add members |
| Demo admins | Emily (existing) + **Elena** (additive review) |

---

*End of principles draft. Save as your working DESIGN.md after edits.*
