---
name: assemblr-edu-design
description: Assemblr EDU design system — brand pigments, surface split between marketing and product UI, button radius, primary CTA color, typography, spacing, elevation, component states, and School-plan journey patterns. Use when designing, building, or reviewing any Assemblr EDU interface, especially account settings, seats, members, billing, privacy, invites, EDU home, or welcome screens.
---

# Assemblr EDU Design System

## How to resolve conflicts

When two rules fight, higher layers win:

**Journey goal → Principle → Pattern → Component → Token**

## Locked decisions

| Decision | Lock |
|----------|------|
| Account / product primary CTA | Logo blue (`var(--brand-logo-blue)`, Assemblr EDU navy-blue) |
| Button radius | Product UI: `rounded-md` (6px) always. Full pill allowed only on marketing surfaces |
| School admin review persona | Elena Vargas — additive, does not replace Emily Parker |

## Surface split (apply this first)

Decide which register a screen belongs to before choosing any style.

| Surface | Examples | Visual posture |
|---------|----------|----------------|
| Marketing / celebration | Landing modules, school welcome, EDU home heroes | Brand color, softer depth, optional motion, warmer illustration |
| Product / management | Account settings, seats, members, billing, privacy | Restrained color, clear hierarchy, minimal decoration, high scannability |
| ImajiNation | Kid-facing category worlds | Separate token set; never leaks into School admin billing |

Do not paste "pill + blob + magenta kicker" into seats or billing.

## Design principles

1. **Structure before volume** — every block answers "what is this?" via title plus optional short lead.
2. **One primary action per moment** — especially billing, seats, invites, welcome.
3. **Honest density** — shorter labels; progressive disclosure for edge cases.
4. **Plan truth at the center** — plan name, status, seats used/available, renewal/expiry stay findable.
5. **Respect attention** — educated does not mean verbose.
6. **Role clarity** — admin, teacher, and student see actions that match their power.
7. **Continuity across invite paths** — link, code, and staff-created accounts feel like one product family.
8. **Accessibility is default** — WCAG 2.2 AA, keyboard paths, `prefers-reduced-motion`.

## Brand pigments

| Token | Hex | Role |
|-------|-----|------|
| Magenta | `#E21B72` | Brand energy, celebration, marketing accents |
| Cyan | `#12A9E6` | Focus ring, secondary highlight |
| Indigo | `#2F3D99` | Active / selected (nav, emphasis) |
| Yellow | `#E8AE1A` | Warm accent, sparingly |
| Signature gradient | `135deg, #E21B72 → #12A9E6` | Heroes and special CTAs — never tables |

Neutrals carry 80%+ of management UI. Semantic status colors carry plan, seat, and payment truth. Cyan is the focus ring everywhere — never invent a per-screen focus color.

## Additional resources

- Full principles, foundations, components, patterns, journeys, and UX laws: [Assemblr-EDU-Design-System-Principles.md](Assemblr-EDU-Design-System-Principles.md)
- Why the original style brief was incomplete and what changed: [Assemblr-EDU-Design-System-Gap-Review.md](Assemblr-EDU-Design-System-Gap-Review.md)
