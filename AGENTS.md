# Agent instructions

Before changing anything, read `docs/PROJECT_CONTEXT.md` (history, locked decisions,
open questions) and `docs/STYLE_GUIDE.md`. For any user-facing text, follow
`docs/skills/assemblr-edu-voice/SKILL.md`.

Non-negotiables:

- Run `python3 dev-server.py 8766` (port 8766, live reload, so it does not clash with the EDU prototype on 8765). Bump the `?v=` query in
  `index.html` for every edited CSS/JS file, and in `WELCOME_ART` / `TRY_COVERS` for
  replaced images.
- Never rename stored ids (roles, goal ids, pane names). Change display strings only.
- When an English string in `app.js` changes, update its Indonesian entry in the `ID`
  dictionary. `auth.js` has its own `COPY.en` / `COPY.id`.
- Write "3D/AR", never "AR/3D". Capitalize feature names: Editor, Visual Coding,
  Collaborate, Class, Topic, Edu Kits, AI-3D Generation, Custom Marker.
- After any visible change, show the owner a screenshot of the changed screen.
- Welcome photos follow `.cursor/rules/welcome-imagery.mdc`.
