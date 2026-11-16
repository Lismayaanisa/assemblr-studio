---
name: assemblr-edu-voice
description: >-
  Assemblr EDU product voice and copywriting style for user-facing text. Use
  when writing, reviewing, rewriting, shortening, or translating any UI copy —
  button labels, headings, questions, answer choices, descriptions,
  placeholders, empty states, error and warning messages, tooltips,
  confirmations, onboarding, mascot speech bubbles, notifications, emails, or
  marketing text — and whenever the user mentions product voice, tone of voice,
  copywriting, UX writing, microcopy, wording, or asks to make copy clearer,
  friendlier, shorter, or less technical. Also use when auditing or improving
  all copy in a product or flow, or when changing any heading, question, label,
  helper text, speech bubble, or button on screen.
---

# Overall product voice

Assemblr EDU should sound clear, helpful, and easy to use.

The copy should guide users without over-explaining. It should feel friendly and supportive, but still clean and professional. Because our users include teachers, students, parents, lecturers, and school admins, avoid language that feels too technical, too wordy, or too "startup-y."

The product should feel like a calm guide: simple, practical, and encouraging. Use familiar words like "presentation" instead of "slide deck," "class" instead of "learning environment," and "create" instead of "generate" when possible.

# Copy audit and editing standard

Apply this standard every time you write or edit user-facing copy, and in full when asked to audit or improve copy. Apply edits directly to the existing code or design files.

## Process

1. Review the full user flow before editing individual screens. Use the existing product behavior, user roles, age groups, and previous selections as context.
2. Cover headings, questions, answer choices, labels, placeholders, helper text, buttons, tooltips, empty states, errors, and account messages.
3. After editing, summarize the main changes and list any product questions or claims that need confirmation.

## Voice

- Warm, clear, conversational, and concise.
- Use familiar words and natural English.
- Address users as "you," rather than calling them "Student" or "Educator."
- Avoid corporate language, internal policy wording, vague reassurance, forced excitement, and baby talk.
- Use "I" for the mascot, "we" for the service, and "my" in answer choices when users are describing themselves.
- Give each mascot bubble a purpose: orient, explain, or encourage. Avoid generic greetings or repeating the heading.

## Age and role

| Audience | Tone |
|---|---|
| Ages 7–9 | Short sentences and concrete explanations |
| Ages 10–12 | Friendly, direct, and encouraging |
| Ages 13–17 | Straightforward and respectful, without sounding childish |
| Adults | Practical, warm, and concise |
| Shared screens or unknown age | Simple, neutral wording |

- Match vocabulary to the task as well as age. Preserve necessary exam or qualification terminology for students who need it.
- Use existing age and role variants. Don't add age-detection logic or duplicate screens.

## Context and flow

- Make each screen follow naturally from earlier answers.
- Don't assume every student has an assignment, teacher, school, or exam.
- For project-related goals, ask "Which subject is your project about?"
- For learning or exploring, ask "Which subject interests you?"
- Use existing conditional copy where available. If branching would require new logic, use wording that works across the relevant paths and flag the opportunity.
- Explain the actual purpose of collecting information. Don't promise recommendations or personalization unless the product provides them.

## Clarity and brevity

- Help users understand what to do, why it matters, and what happens next.
- Prefer natural questions: "How old are you?" rather than "Your age."
- Keep answer choices short, distinct, and consistent in structure.
- Remove repeated openings when they add no meaning.
- Preserve meaningful distinctions between choices, such as class projects, assessments, competitions, learning, and exploring.
- Flag overlapping or confusing categories. Don't merge, remove, or change stored answer values without confirmation.
- Replace jargon with concrete terms. For example, "create with 3D and AR" is clearer than "create immersive experiences."
- Explain unfamiliar abbreviations briefly where needed for younger users.
- Remove redundant instructions.
- Mark optional questions beside the relevant field, not only in a speech bubble.
- Make button labels describe the action accurately.
- For errors and restrictions, explain the situation and the available next step without blame.

## Trust and accuracy

- Explain what a rule means for the user rather than quoting internal policy.
- Preserve the exact scope of privacy, consent, account restrictions, and access claims.
- Don't invent protections, permissions, or product behavior.
- Example: replace "Marketing is not allowed on this account" with a clear description of what users will experience, but verify whether this covers ads, promotional messages, or both.
- Flag uncertain claims and continue editing the rest.

## Consistency

- Use sentence case for UI copy. Preserve official brand and product capitalization.
- Keep terminology consistent across screens.
- Always write "3D/AR", never "AR/3D". When the two words appear together, put 3D first ("3D and AR", "3D atau AR", "3D dan AR").
- Name the Assemblr EDU feature in supporting copy, with each word capitalized: Editor, Visual Coding, Collaborate, Class, Topic, Edu Kits, AI-3D Generation, Custom Marker.
- Class is for sharing assignments and materials. Topic is for presenting learning slides. Edu Kits is for ready-to-use 3D/AR. Editor is for building or presenting a project. Visual Coding is for making objects move. AI-3D Generation turns an image or text into 3D. Custom Marker connects 3D/AR to a physical product. Collaborate is for building together in real time.
- Respect the existing language and locale. Flag school-system assumptions such as "K" or grade numbering when they may confuse the intended audience.
- Keep essential instructions and explanations outside mascot bubbles too.

## Implementation

- Preserve functionality, navigation, validation, age thresholds, permissions, consent requirements, analytics mappings, and stored answer values.
- Edit user-facing strings rather than internal identifiers.
- Use existing localization resources and preserve interpolation variables. In this project that is the Indonesian `ID` dictionary in `app.js`: when an English string changes, update its translation key too.
- Check copy length, wrapping, truncation, and mobile layouts where supported.
- Avoid unrelated visual or code changes.

## Examples

| Before | After |
|---|---|
| "Hi Student!" | Replace with a useful contextual message, or remove |
| "What's your main goal?" | "What would you like to do?" |
| "Create a project for my class or assignment" | "Make a project for class" |
| "Learn how to create AR or immersive experiences" | "Learn to create with 3D and AR" |
| "Explore AR and see what I can create" | "Explore and try things out" |
| "What subject and grade are you studying?" | "What are you learning?" |
| "Which subject is your assignment for?" | Use wording appropriate to the selected goal |
| "Optional, but it helps me pick examples." | Mark each optional field and explain the benefit separately, if supported |
| "Your age" | "How old are you?" |
| "Just type a number." | Remove it when the field already makes this clear |
| "This helps me keep things right for you." | "This helps me set things up for you." (only when this reflects the actual purpose) |
| "From age 13" | "For ages 13 and up" |
| "Continue with Email" | "Continue with email" |
| "Create your first AR/3D project" | "Create your first 3D/AR project" |
