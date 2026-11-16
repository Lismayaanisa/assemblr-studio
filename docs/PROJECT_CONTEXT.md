# Project context: Assemblr Studio login, register, and setup moment

This workspace is a duplicate of the Assemblr EDU login, register, and setup moment.
The flow and interactions are the same. The brand is Assemblr Studio, taken from its logo:
blue `#3FA3E8`, primary buttons `#2B6FD8`, a little light pink `#F4A3C6`, accent pink `#E8408A`.
Do not restore the EDU indigo `#2F3D99`, magenta `#E21B72`, or cyan `#12A9E6`, or the earlier orange.
The wave background drifts in random directions (`wave-bg.js`) with a light grain.
Run this copy on port **8766**.

The notes below record the EDU prototype's locked decisions. They still govern the flow.
Product name in the UI is Assemblr Studio. The owner gives feedback in a mix of English
and Indonesian.

Related docs:

- [STYLE_GUIDE.md](STYLE_GUIDE.md): visual tokens, components, motion, imagery.
- [skills/assemblr-edu-voice/SKILL.md](skills/assemblr-edu-voice/SKILL.md): the copy
  standard. Mandatory for any user-facing text.
- [skills/assemblr-edu-design/](skills/assemblr-edu-design/): the wider Assemblr EDU
  design system notes.
- [../.cursor/rules/welcome-imagery.mdc](../.cursor/rules/welcome-imagery.mdc): rules for
  welcome-page photos.

---

## 1. What this is

A static HTML/CSS/JS prototype of the Assemblr EDU first-run journey, built as one
connected flow:

1. **Login / Register** (`#auth`)
2. **Setup moment**: a short questionnaire with the mascot "blr" (`#setup`)
3. **Try it**: a project, slide, or page picked from the answers (`#try`)
4. **Cloud sweep transition** into the **welcome page**: a 3-slide carousel per role
   and goal (`#welcome`)

It started on Oct 14, 2026 by merging two earlier workspaces: "accountpage
prototype-main" (login/register text and flow) and "Setup moment" (the questionnaire
design and the yellow/white/orange wave background). There is no backend. Everything is
client-side and demo data.

Assemblr EDU is a 3D/AR creation and learning platform for schools. Its audience is
educators, students (K–12), parents, university students, and lecturers, with Indonesia
as the main market and English as the global default.

## 2. Running it

```bash
python3 dev-server.py 8766   # serves http://127.0.0.1:8766 with live reload
```

- `dev-server.py` serves the folder with `Cache-Control: no-store` and exposes
  `/__version`. `live-reload.js` polls it every second. CSS changes hot-swap; other
  changes reload the page and replay the saved answers to land on the same step.
- Port **5173** on this machine is a different (Vite) project. Do not use it.
- **Cache busting:** `index.html` loads `styles.css?v=N`, `app.js?v=N`, and
  `auth.js?v=N`. Bump `N` whenever you edit one of those files. Images in
  `WELCOME_ART` and `TRY_COVERS` also carry `?v=` and must be bumped when replaced.
- **Public link** for the owner to view on other devices: run
  `cloudflared tunnel --url http://127.0.0.1:8765` and share the
  `https://<random>.trycloudflare.com/index.html` URL it prints. Quick tunnels get a new
  URL each time they restart, so re-share after a restart.
- Leave the dev server and tunnel running between tasks.

### Dev hooks

`window.__assemblrDev = { state, lang(), welcome() }`. `go()` and `paintTry()` are not
exported. To jump to the try step in a test, set `state.role`, `state.job = { id }`,
`state.subject`, `state.grade`, set `document.body.dataset.phase = "setup"`, hide
`#auth`, then call `document.getElementById("subjectNext").click()`. That runs the real
`paintTry()` + `go("try")`.

## 3. File map

| Path | What it holds |
|---|---|
| `index.html` | All markup for auth, setup panes, try, welcome sky scene, preview stage |
| `styles.css` | All styles. Tokens at the top; mobile rules in `@media (max-width: 600px/980px)` blocks near the bottom |
| `auth.js` | Login/register tabs, social buttons, email sign-up form, join-by-code, its own EN/ID `COPY` table, `enterSetup()` hand-off |
| `app.js` | Setup steps, mascot, age rules, goals, subjects, try-it, sweep, welcome carousel, sky animation, EN→ID dictionary (`ID`) |
| `wave-bg.js` | Animated wave backdrop |
| `live-reload.js`, `dev-server.py` | Local dev only |
| `assets/` | Mascot poses (`blr`, `blr2`), avatars, flags, try-it covers, welcome photos (`welcome-*.jpg`, some with `-id` variants), sky objects (`world/`) |
| `.welcome-originals/` | Backups of earlier welcome photos (`pre-*` folders) and the Python grading/patch scripts used on them. Use these to roll back an image |
| `.cursor/rules/welcome-imagery.mdc` | Photo rules, auto-applied when editing welcome images |

## 4. The journey, step by step, with locked decisions

Internal ids (role ids, goal/job ids, pane names) are stable and drive routing, copy,
and images. **Change display strings only, never ids**, unless the owner asks.

### 4.1 Login / Register (`auth.js`)

- Two tabs: **Login** and **Register**. Background is the warm yellow/white/orange wave
  (it replaced the old blue/pink).
- Left story panel: glassmorphism, 40% white with blur. Headline "Learning should always
  be engaging".
- **Login tab:** Sign in with Belajar.id (NEW badge), Google, Facebook, Apple, Join by
  code; then username/email + password. "Forgot password?" sits *under* the password
  field in smaller text.
- **Register tab:** stacked full-width pills, in this order: Sign up with Belajar.id
  (NEW), Google, Facebook, Apple, **Sign up with Email**, Join by Code.
- **Sign up with Email** opens a form: Full name, Email, Username, Password + Confirm
  password side by side, newsletter checkbox (optional), terms checkbox. SIGN UP is
  disabled until name, valid email, username, matching passwords, and terms are all set.
  Checkboxes are compact (small box, 13px text).
- When the user signs in or up with an email, `document.body.dataset.signupEmail` is set.
  The guardian-email step uses it later.
- Join by code demo values: groups `ACE-DEWI-2026`, `ACE-LINCOLN-2026`; class `BNNZH`.
- No step navigation ("1 Sign in 2 Set up") at the top. The owner restarts by refreshing.
- Mobile (from 360px): the social buttons become a horizontal swipe row with a swipe
  hint; the duplicate square EDU logo is hidden (the long wordmark stays); headline text
  is 8px smaller.

### 4.2 Setup moment (`app.js`)

Steps: `name → source → phone → role → (age, students only) → goal → subject → try`.
Short questions use a single centered column ("solo"); `source`, `age`, `goal`, and
`subject` use the split layout (glass story panel on the left, answers on the right).
The mascot blr sits above the question and speaks in a bubble. On mobile the bubble sits
above the text.

**Name + avatar.** The upload-photo circle is the first avatar. No country or name
labels on hover/tap. Several avatars were removed on request; the current list is
`AVATAR_LIST`. Mobile: 3 rows; on wide phones like a Samsung A55, add more columns
rather than bigger circles. The name preview and avatar are centered on mobile.

**Source ("How did you first hear about Assemblr EDU?").** Options in `SOURCES`. Icons
share one outline style but use each brand's real color. Google uses a "G" drawn in
the same style; Blog or article uses a globe. Follow-up inputs use smaller text than the
question.

**Phone.** Heading "Stay in the Loop". Consent line: "Be the first to hear about new
features, upcoming workshops, and occasional offers on WhatsApp." The consent is an
**unchecked checkbox on the right** of that text. Next depends only on a valid phone
number (7–13 digits); the checkbox is optional. Under-13 students get the checkbox
disabled and marketing off.

**Role.** Order: Student, Educator, Parent, University student, Lecturer, then Other
(with a text field). The old "Creator/Innovator" role was removed. Each role sets an
accent color (see the style guide).

**Age (students only).**

- Heading "How old are you?"; mascot bubble "This helps me set things up for you." No
  helper text (the owner removed "Just type a number" and any birthday wording).
- Accepts whole years, 4–99. `MINOR_AGE = 13`.
- Under 13: a **"Because you're under 13"** notice appears directly under the age field.
  It lists "Your projects are private. Only you, your parent or guardian, and your
  teacher can see them." and "No ads. You won't see ads or receive promotional
  messages." Style: its own box, separate from the age field, full width of the options
  below, green gradient, smaller text than the options so it isn't the most prominent
  thing.
- "How are you joining Assemblr EDU?": With my school / With a parent or guardian / On
  my own. "On my own" is locked (dashed, disabled) under 13.
- **Parent or guardian's email** uses the billing-address pattern: heading, then a
  checkbox on the left, "My parent's email is the same as the one I signed up with" (always shown, unchecked by
  default), then the field. Ticked: the field fills with the sign-up email and is
  read-only (`state.guardianSame`). If the sign-up email isn't known (Google or code
  sign-in), it fills a demo address, `angela@gmail.com` (`signupEmail()` in `app.js`).
  Unticked: the field clears and the student types the email by hand.
- When it shows: `needsGuardianEmail = Boolean(state.joinVia) && (isMinor() ||
  state.joinVia === "guardian")`. Every under-13 student sees it after picking any join
  option; 13+ students see it only for "With a parent or guardian".

**Goal.** Heading **"What would you like to do?"** for every role. Options per role are
in `FLOWS` (labels are display text; ids are stable). Student options: Make a project
for class / for an exam or assessment / for a competition or exhibition / Learn to
create with 3D and AR / I just want to explore / Something else. Some goals open a
follow-up field (`ASKS`), for example "Who is organizing this?" with Indonesian examples
(PPG, Cambridge, IB, P5) or "What's your motivation?" for Other. The old "Need ideas"
follow-up was removed.

**Subject + grade.** Questions per role in `SUBJECT_QS` / `STUDENT_SUBJECT_QS`.

- Students pick **one** subject and **one** grade (a project belongs to one class).
  Everyone else can pick **up to 2** (Indonesian teachers often teach two subjects or
  grades).
- Student headings: "What are you learning?"; subject question "Which subject is your
  project about?" for project goals, "Which subject interests you?" for learn/explore/
  other; "What grade are you in?". Each student question has a small "Optional" tag.
- Parent: "What would you like to help your child learn?" / "Which grades are you
  creating for?", with the subject question "Which subjects would you like to focus
  on?". Non-students see an "Up to 2" tag.
- Subjects ordered STEM first, then History, Language; Art was removed. Grades include
  Kindergarten; Other opens a text field.
- Lecturers and university students pick a **field**: Educational technology, Media and
  visual communication, Computer science, Other.
- Mobile: grade and subject chips sit in 3 rows that swipe sideways.

**Mobile setup layout.** Long option lists scroll while the title, the buttons (sticky
at the bottom), and the pagination dots stay visible. Dots sit at the same height on
every step. Target frame: 360×780.

### 4.3 Try it (`paintTry`, `TRY_SETS`, `TRY_COVERS`)

- **Summary line** (conversational, tokens are tappable to edit that answer):
  "Ready to {create a project for class} in {Grade 2 Science} as {a student}, {name}? Start here!"
  Indonesian: "Siap {…} di {…} sebagai {seorang pelajar}, {name}? Mulai dari sini, yuk!".
  The role uses `ROLES[].phrase` ("a lecturer", "an educator", …). A typed Other role is
  "as a {what they typed}". The sentence wraps and must not be cut off on narrow screens.
- **Title** always starts with **"Explore"**: currently always "Explore this project"
  (Indonesian "Jelajahi …").
- **Media:** since Oct 22 every role and goal shows the same live project, Human Heart
  (`https://viewer-edu.assemblrworld.com/Embed/-u4GdF65A7hHvKx3H7i6`), loaded inline in
  the preview frame, titled "Explore this project". Finish is enabled right away.
  **Subject projects, any role** (`TRY_BY_SUBJECT`, checked before role and goal; a typed
  "Other" subject/field is matched by keyword; if both are picked, Math wins):
  - Math (or math, matematika, geometry, algebra, calculus, statistics, trigonometry):
    Edu Kits "Geometry: Coordinates (X,Y,Z)", `edu.assemblrworld.com/edukits/515`,
    embed `-AqmWYh8v6aW79c9iPdC` (`TRY_COVERS.math`).
  - Biology (or biology, biologi): Edu Kits "The Life Cycle of a Butterfly",
    `edu.assemblrworld.com/edukits/635`, embed `-59Pi5AeEZVisqSPhZSZ`
    (`TRY_COVERS.biology`).
  - Everything else: Human Heart.
  An Edu Kits page's embed id can be read from its `og:image` / iframely embed URL, so
  the owner only needs to send the page link.
  **Gesture hint** (owner's request, Oct 23): a dark round badge (`#gestureHint`) in the
  middle of the embed with a pointing hand swaying left and right below one double-headed
  arrow (a line with an arrowhead at each end; the owner asked for this instead of two
  separate chevrons, placed above the hand), to
  say "drag to turn the 3D/AR model". It has no text, never takes pointer events (drags go
  straight to the viewer), appears 2.5 s after the iframe loads, and fades out the first
  time the user taps or drags inside the embed (detected as the window losing focus to
  the iframe). It comes back on every new visit to Try it. Reduced motion: static.
  Class is `gesture-hint`, not `swipe-hint`, which is the phone scroll bar under lists.
  The embed is only loaded once the Try it card is visible and is reloaded on every
  visit: the viewer frames the model from the iframe size at load, and loading it hidden
  made the model off-center and too big.
  `TRY_SETS` is empty and `TRY_FALLBACK` points to `TRY_COVERS.project`; to give a role or
  goal its own project again, add a cover to `TRY_COVERS` and a `"role:goal"` entry to
  `TRY_SETS`. Earlier versions (Litosphere, Energy, Farming embeds, teaching inspiration
  page captures, YouTube tutorials, AR book and AR coding covers) are in git history; their
  image assets are still in `assets/`.
- The cover plus "See in full screen" gate code (`openPreview`, `markPreviewed`, the red
  "See it in full screen first" error, "See it again") is still in place for any future
  non-embed cover, but no slot uses it now.
- The button is labelled **"Finish"** (it was "Let's start Assemblr EDU!").
- Mobile: the blr mascot is hidden here (it overlapped text); the cover uses the
  cover's own edge color to fill empty space.
- **Card background:** solid white. Moving the mouse over it leaves a fading marker
  stroke in the brand colors (owner's request, Oct 22; it replaced a radial glow). The
  project iframe captures its own pointer events, so the stroke only draws on the white
  areas around it.

### 4.4 Finish → cloud sweep → welcome

- Finish triggers a modern cloud transition: soft cotton-textured clouds sweep across
  to the left and reveal the welcome page (`buildSweep`, `SWEEP_CLOUDS`).
- **Welcome page**: one full page, no popup, no header. Centered: H2 title, one-line
  description, a large photo, slider dots. The CTA "Let's start Assemblr EDU" appears on
  the third slide. Autoplay every 5 s; swipe works on the image as well as the dots.
- **Sky scene behind it:** sky image with soft white clouds (no shadows), a few empty
  bubbles (no 3D objects inside them), two birds that flap and blink as they move, a
  kite drifting on the wind, a hot-air balloon rising, and a **yellow** paper plane in
  the bottom-left trailing a small, rounded, hand-drawn arrow path. All objects are
  small.
- **Slides:** `WELCOME_OPEN[role:goal]` gives slide 1; `WELCOME_REST[role]` gives slides
  2–3. Student + assignment swaps the classmates photo for `studentCollabKids`.
  - Titles are job-to-be-done phrases that start with a verb ("Create a simple 3D/AR
    project", "Create an interactive 3D game", "Share assignments and materials in
    Class").
  - Descriptions name the Assemblr EDU feature that does the job, for example "Build your
    assignment in 3D with the Editor, then view it in AR." / "Use Visual Coding to make
    objects move, react, and score." / "Use Collaborate to build projects with your
    classmates in real time."
  - The first slide's noun changes with the goal (assignment, assessment, competition
    entry, research …), each as a full sentence with its own Indonesian translation.
- **Feature glossary** (always capitalize every word of a feature name):

| Feature | What it's for |
|---|---|
| Editor | Build or present a 3D/AR project |
| Visual Coding | Make objects move, react, and score |
| Collaborate | Build projects together in real time |
| Class | Share assignments and materials with students |
| Topic | Present complete learning slides |
| Edu Kits | Ready-to-use 3D/AR (two words) |
| AI-3D Generation | Turn an image or text into 3D, with or without animation (hyphenated) |
| Custom Marker | Connect 3D/AR to a physical product |

## 5. Language and localization

- The flag dropdown (US English / Indonesia Bahasa Indonesia) switches all UI text.
  Indonesia shows Indonesian; every other country shows English.
- `app.js` translates by exact English string through the `ID` dictionary (plus a few
  regex `ID_PATTERNS`). **When you change an English string, add or update its `ID`
  entry**, or the Indonesian UI falls back to English. `auth.js` has its own `COPY.en` /
  `COPY.id` tables.
- Text inside welcome photos follows the language too. Images with on-screen text have
  an Indonesian variant (`*-id.jpg`, third item in a `WELCOME_ART` entry);
  `paintWelcomeArt()` swaps them. `welcome-student-create-id.jpg` is currently a copy of
  the English image (see open questions).

## 6. Copy rules (summary)

The full standard is in `docs/skills/assemblr-edu-voice/SKILL.md`; follow it for every
string. The rules the owner stressed most:

- Warm, clear, concise, natural. Address the user as "you". Mascot speaks as "I", the
  service as "we", answer choices as "my".
- Sentence case. Always **"3D/AR"**, never "AR/3D". Feature names capitalized exactly as
  in the glossary.
- Describe what a rule means for the user, not internal policy (for example "You won't
  see ads or receive promotional messages", not "Marketing is not allowed").
- Don't invent product claims or protections. Flag uncertain claims.
- When the owner asks for a list of copy "before changing the design", send the list and
  wait for confirmation.

## 7. Working agreements with the owner

- **After every visible change, reply with a screenshot of the changed screen.** Don't
  make the owner check manually.
- Treat requests as a queue. Don't stop to ask unless genuinely blocked; pick a sensible
  default and state it.
- Don't commit unless asked. Keep the dev server and tunnel running.
- "VP of Design" prompts mean: aim for delightful, polished, education-appropriate
  quality, not a quick patch.
- The owner often selects an element in the browser preview and writes a short
  instruction. Apply it to exactly that element (or every instance if they say so).

## 8. Gotchas we hit

- **Disk full.** The Mac's disk ran out (22 MB free) and a file save emptied
  `styles.css`. It was restored from Cursor's local checkpoints. Check free space before
  big image work.
- **Background browser tabs freeze CSS animations**, so screenshots can show
  `opacity: 0` elements. Set `animation: none` on elements before capturing.
- **The Cursor element picker swallows clicks**, even `el.click()` from scripts. Open a
  fresh tab for scripted testing.
- **Welcome autoplay** advances slides before a screenshot; click a dot first to stop it.
- `.auth.is-register .stack { display: none }` once hid the email form; scope such rules
  to `#authHome`.
- Image generation: when fixing a detail (teeth, a screen in a device), full
  regeneration with a reference worked better than pixel patching. For color, matching
  per-channel mean and standard deviation to the reference photo worked; multiplying
  channels independently caused high contrast or a yellow/sepia cast. Only Pillow is
  installed (no OpenCV).

## 9. Open questions and loose ends

- University slide 2 title is "Create a project with your classmates" but its
  description is about Visual Coding (per the owner's list). The mismatch was flagged and
  hasn't been confirmed.
- Student subject bubble says "suggest examples for you". Confirm the product really
  suggests examples.
- "K" / grade numbering may not suit every school system.
- Some non-student goal labels still use older wording ("Introduce AR/Immersive tech to
  my students", "Use ready-to-use materials for my lessons") and haven't been rewritten
  to the new voice yet.
- `welcome-student-create-id.jpg` lost its Indonesian on-screen text when the English
  photo was regenerated; regenerate an Indonesian version if needed.
- Student slides 2 and 3 (`welcome-student-code`, `-collab`, `-collab-kids`) were graded
  on Oct 22 to match slide 1 (`welcome-student-create`): per-channel RGB mean/std matched
  to slide 1, then saturation scaled to slide 1's average. Originals are in
  `.welcome-originals/pre-match-slide1/`. Use the same method if another role needs it.
- Screen content in welcome photos follows the owner's references (Oct 22): Visual Coding
  slides show the Editor with the block panel (category column plus "when scene starts" /
  "Play animation" blocks); Collaborate slides show a Figma-style multiplayer 3D Editor
  (colored cursors with name tags, an avatar stack, a selection box); the lecturer AR
  slide shows AR seen through a tablet held over a dinosaur book, never 3D floating in
  the room. Pre-change originals are in `.welcome-originals/pre-ui-refs/`.
- `welcome-student-collab-kids.jpg` models still read closer to 10–11 than 6–9.
