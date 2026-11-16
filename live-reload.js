/* Live reload for the prototype, active only when served by dev-server.py.
   CSS edits swap the stylesheet in place. Other edits reload the page, then replay
   the saved answers through the real controls to land back on the same step. */
(() => {
  const KEY = "assemblr-live-reload";
  const POLL_MS = 1000;
  const $ = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const step = () => $("setup").dataset.step;

  async function until(test, timeout = 8000) {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      if (test()) return true;
      await wait(60);
    }
    return false;
  }

  function fill(el, value) {
    if (!el || value == null || value === "") return;
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function snapshot() {
    const dev = window.__assemblrDev;
    if (!dev || document.body.dataset.phase !== "setup") return null;
    const s = dev.state;
    const at = !$("welcome").hidden ? "try" : s.step;
    const goalWrap = document.querySelector("#goalOptions .opt-wrap.is-selected");
    return {
      at,
      lang: dev.lang(),
      name: s.name,
      avatar: s.avatar,
      source: s.source,
      srcOther: $("srcOther")?.value || "",
      srcEvent: $("srcEvent")?.value || "",
      phone: document.querySelector("#pane-phone input[type=tel]")?.value || "",
      consent: s.consent,
      role: s.role,
      otherRole: s.otherRole,
      age: s.age,
      joinVia: s.joinVia,
      guardianEmail: s.guardianEmail || $("guardianEmail")?.value || "",
      goalLabel: goalWrap?.querySelector(".opt-label")?.textContent.trim() || "",
      goalIndex: goalWrap ? [...goalWrap.parentElement.children].indexOf(goalWrap) : -1,
      goalDetail: goalWrap?.querySelector(".reveal input.field:not([hidden])")?.value || "",
      chips: [...s.subject, ...s.grade]
    };
  }

  /* Each step fills its answers and presses Next; the replay stops at the saved step */
  const REPLAY = {
    async name(a) {
      fill($("nameInput"), a.name);
      document.querySelector(`.avatar[data-src="${CSS.escape(a.avatar || "")}"]`)?.click();
      $("nameNext").click();
    },
    async source(a) {
      document.querySelector(`.src[data-source="${a.source}"]`)?.click();
      fill($("srcOther"), a.srcOther);
      fill($("srcEvent"), a.srcEvent);
      $("sourceNext").click();
    },
    async phone(a) {
      fill(document.querySelector("#pane-phone input[type=tel]"), a.phone);
      const box = $("consentBox");
      if (box && !box.disabled && box.checked !== Boolean(a.consent)) box.click();
      $("phoneNext").click();
    },
    async role(a) {
      if (a.role === "other") {
        document.querySelector(".tile[data-role=other]")?.click();
        fill($("otherInput"), a.otherRole);
        await wait(150);
        $("otherForm").requestSubmit();
        return;
      }
      document.querySelector(`.tile[data-role="${a.role}"]`)?.click();
      await wait(250);
      if (step() === "role") $("roleNext").click();
    },
    async age(a) {
      fill($("ageInput"), a.age == null ? "" : String(a.age));
      await wait(150);
      if (a.joinVia) document.querySelector(`[data-join="${a.joinVia}"] .opt`)?.click();
      await wait(150);
      fill($("guardianEmail"), a.guardianEmail);
      $("ageNext").click();
    },
    async goal(a) {
      const wraps = [...document.querySelectorAll("#goalOptions .opt-wrap")];
      const wrap = wraps.find((w) => w.querySelector(".opt-label")?.textContent.trim() === a.goalLabel) || wraps[a.goalIndex];
      wrap?.querySelector(".opt").click();
      await wait(150);
      fill(wrap?.querySelector(".reveal input.field:not([hidden])"), a.goalDetail);
      $("goalNext").click();
    },
    async subject(a) {
      document.querySelectorAll("#pane-subject .chip").forEach((chip) => {
        if (a.chips.includes(chip.dataset.value) && chip.getAttribute("aria-checked") !== "true") chip.click();
      });
      await wait(150);
      $("subjectNext").click();
    }
  };

  function showVeil() {
    const veil = document.createElement("div");
    veil.setAttribute("role", "status");
    veil.textContent = "Applying update…";
    veil.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;"
      + "background:rgba(255,252,245,.92);font:600 15px/1 system-ui,sans-serif;color:#2a2f45;";
    document.body.appendChild(veil);
    return veil;
  }

  async function replay(a, veil) {
    try {
      if (a.lang === "id") document.querySelector('[data-lang][data-flag="id"]')?.click();
      await wait(300);
      // Logging in prefills the name with the username
      $("loginId").value = a.name || "reviewer";
      $("loginPw").value = "reload";
      $("primaryAuth").click();
      if (!(await until(() => document.body.dataset.phase === "setup" && step() === "name"))) return;
      for (let guard = 0; guard < 10 && step() !== a.at; guard++) {
        const current = step();
        const run = REPLAY[current];
        if (!run) return;
        await run(a);
        if (!(await until(() => step() !== current))) return;
        await wait(250);
      }
    } finally {
      veil.remove();
    }
  }

  function swapCss() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      url.searchParams.set("live", Date.now());
      const next = link.cloneNode();
      next.href = url.href;
      next.onload = () => link.remove();
      link.after(next);
    });
  }

  async function poll() {
    let last = null;
    for (;;) {
      try {
        const res = await fetch("/__version", { cache: "no-store" });
        if (!res.ok) return;
        const now = await res.json();
        if (last && now.code !== last.code) {
          const answers = snapshot();
          if (answers) sessionStorage.setItem(KEY, JSON.stringify(answers));
          location.reload();
          return;
        }
        if (last && now.css !== last.css) swapCss();
        last = now;
      } catch {
        /* Server restarting; keep trying */
      }
      await wait(POLL_MS);
    }
  }

  const saved = sessionStorage.getItem(KEY);
  sessionStorage.removeItem(KEY);
  // Waits for every script, so the login and language handlers exist before the replay clicks them
  if (saved) {
    const veil = showVeil();
    const start = () => replay(JSON.parse(saved), veil);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }
  poll();
})();
