(() => {
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const COPY = {
    en: {
      lead: "Learning should always be",
      accent: "engaging",
      body: "With Assemblr Studio, learning becomes an interactive, fun-filled experience!",
      login: "Login",
      register: "Register",
      tabs: "Log in or register",
      signIn: "Sign in",
      signUp: "Sign up",
      signUpWith: "Sign up with",
      emailTitle: "Register with email",
      fullName: "Full name",
      fullNamePh: "Enter your full name",
      news: "Subscribe to Assemblr email newsletter",
      terms: "I agree with terms and conditions",
      signUpCta: "SIGN UP",
      email: "Email",
      emailPh: "oliver@school.id",
      confirmPw: "Confirm password",
      needTerms: "Add your name, email, and username, then agree to the terms.",
      pwMatch: "Those passwords don't match. Please check them.",
      emailBad: "This email doesn't look right. Please check it.",
      join: "Join",
      byCode: "by Code",
      orLogin: "Or log in with",
      orRegister: "Or sign up with",
      idLabel: "Username or email",
      idPh: "Angela or Angela@gmail.com",
      pw: "Password",
      pwPh: "Password",
      reset: "Forgot password?",
      loginCta: "LOGIN",
      registerCta: "REGISTER",
      signUpHere: "Sign up",
      here: "here",
      ifNew: "if you don't have an account",
      ifHave: "If you have an account, log in",
      legalBefore: "By signing in or signing up to our app, you agree to our",
      tos: "Terms of Service",
      legalMid: "and have read and understood the",
      privacy: "Privacy Policy",
      needBoth: "Add your username and password, or continue with Google or a code.",
      otherSocial: "This preview continues with Google or a code.",
      resetNote: "Password reset isn’t in this preview. Continue with Google or a code.",
      codeTitle: "Join by code",
      codeLead: "Enter a group/school code or a 5-letter class code from your teacher.",
      codePh: "ACE-DEWI-2026 or BNNZH",
      continue: "Continue",
      codeError: "Sorry, the code you entered isn't valid. Check capitalization, spelling, and formatting, then try again.",
      demo: "Demo group: ACE-DEWI-2026 · ACE-LINCOLN-2026. Demo class: BNNZH",
      back: "Back",
      groupFound: "Group found",
      groupLead: "Confirm this group plan, then log in or register.",
      almost: "You're almost in!",
      almostLead: "Confirm this team, then create your username and password.",
      classFound: "Class found",
      classLead: "Confirm this class, then create your account or log in.",
      teacher: "Teacher",
      students: "students",
      student: "student",
      teachers: "teachers",
      confirm: "Confirm & continue",
      confirmCreate: "Confirm & create my account",
      different: "Use a different code",
      groupSuffix: "Group",
      createTitle: "Create your account",
      createLead: "You're almost done! Add your name, username, and password to join this group plan on Assemblr Studio.",
      loginTitle: "Log in to join",
      loginLead: "Already have an account? Log in with your username and password to join this group plan.",
      resetTitle: "Set a new password",
      resetLead: "Use the same name and username as your account, then choose a new password.",
      name: "Name",
      namePh: "Your full name",
      user: "Username",
      userPhNew: "Pick a unique username",
      userPh: "Your username",
      newPw: "New password",
      pwNewPh: "Create a password you’ll remember",
      forgot: "Forgot password?",
      save: "SAVE NEW PASSWORD",
      createCta: "CREATE MY ACCOUNT",
      logIn: "LOG IN",
      have: "Already have an account?",
      loginHere: "Log in here",
      dont: "Don't have an account?",
      registerHere: "Register here",
      backLogin: "Back to log in",
      toast: "You’re in. Let’s set up your space.",
      setupTitle: "Set up Assemblr Studio",
      signInTitle: "Sign in · Assemblr Studio",
      newBadge: "New"
    },
    id: {
      lead: "Belajar harus selalu",
      accent: "menyenangkan",
      body: "Dengan Assemblr Studio, belajar menjadi pengalaman interaktif yang penuh keseruan!",
      login: "Masuk",
      register: "Daftar",
      tabs: "Masuk atau daftar",
      signIn: "Masuk",
      signUp: "Daftar",
      signUpWith: "Daftar dengan",
      emailTitle: "Daftar dengan email",
      fullName: "Nama lengkap",
      fullNamePh: "Masukkan nama lengkapmu",
      news: "Berlangganan email newsletter Assemblr",
      terms: "Saya setuju dengan syarat dan ketentuan",
      signUpCta: "DAFTAR",
      email: "Email",
      emailPh: "oliver@school.id",
      confirmPw: "Konfirmasi kata sandi",
      needTerms: "Isi nama, email, dan nama pengguna, lalu setujui syaratnya.",
      pwMatch: "Kata sandinya belum sama. Coba cek lagi.",
      emailBad: "Email ini sepertinya kurang tepat. Coba cek lagi.",
      join: "Gabung",
      byCode: "dengan Kode",
      orLogin: "Atau masuk dengan",
      orRegister: "Atau daftar dengan",
      idLabel: "Nama pengguna atau email",
      idPh: "Angela atau Angela@gmail.com",
      pw: "Kata sandi",
      pwPh: "Kata sandi",
      reset: "Lupa kata sandi?",
      loginCta: "MASUK",
      registerCta: "DAFTAR",
      signUpHere: "Daftar",
      here: "di sini",
      ifNew: "jika belum punya akun",
      ifHave: "Sudah punya akun? Masuk",
      legalBefore: "Dengan masuk atau mendaftar, kamu menyetujui",
      tos: "Ketentuan Layanan",
      legalMid: "serta telah membaca dan memahami",
      privacy: "Kebijakan Privasi",
      needBoth: "Isi nama pengguna dan kata sandi, atau lanjut dengan Google atau kode.",
      otherSocial: "Pratinjau ini lanjut dengan Google atau kode.",
      resetNote: "Atur ulang kata sandi belum tersedia di pratinjau ini. Lanjut dengan Google atau kode.",
      codeTitle: "Gabung dengan kode",
      codeLead: "Masukkan kode grup/sekolah atau kode kelas 5 huruf dari gurumu.",
      codePh: "ACE-DEWI-2026 atau BNNZH",
      continue: "Lanjutkan",
      codeError: "Maaf, kode yang kamu masukkan tidak valid. Periksa huruf besar, ejaan, dan formatnya, lalu coba lagi.",
      demo: "Demo grup: ACE-DEWI-2026 · ACE-LINCOLN-2026. Demo kelas: BNNZH",
      back: "Kembali",
      groupFound: "Grup ditemukan",
      groupLead: "Konfirmasi paket grup ini, lalu masuk atau daftar.",
      almost: "Kamu hampir bergabung!",
      almostLead: "Konfirmasi tim ini, lalu buat nama pengguna dan kata sandimu.",
      classFound: "Kelas ditemukan",
      classLead: "Konfirmasi kelas ini, lalu buat akun atau masuk.",
      teacher: "Guru",
      students: "siswa",
      student: "siswa",
      teachers: "guru",
      confirm: "Konfirmasi & lanjutkan",
      confirmCreate: "Konfirmasi & buat akunku",
      different: "Gunakan kode lain",
      groupSuffix: "Grup",
      createTitle: "Buat akunmu",
      createLead: "Kamu hampir selesai! Isi nama, nama pengguna, dan kata sandi untuk bergabung ke paket grup di Assemblr Studio.",
      loginTitle: "Masuk untuk bergabung",
      loginLead: "Sudah punya akun? Masuk dengan nama pengguna dan kata sandi untuk bergabung ke paket grup.",
      resetTitle: "Buat kata sandi baru",
      resetLead: "Gunakan nama dan nama pengguna yang sama dengan akunmu, lalu buat kata sandi baru.",
      name: "Nama",
      namePh: "Nama lengkap kamu",
      user: "Nama pengguna",
      userPhNew: "Pilih nama pengguna yang unik",
      userPh: "Nama penggunamu",
      newPw: "Kata sandi baru",
      pwNewPh: "Buat kata sandi yang mudah diingat",
      forgot: "Lupa kata sandi?",
      save: "SIMPAN KATA SANDI",
      createCta: "BUAT AKUN SAYA",
      logIn: "MASUK",
      have: "Sudah punya akun?",
      loginHere: "Masuk di sini",
      dont: "Belum punya akun?",
      registerHere: "Daftar di sini",
      backLogin: "Kembali ke masuk",
      toast: "Kamu sudah masuk. Yuk, siapkan ruangmu.",
      setupTitle: "Siapkan Assemblr Studio",
      signInTitle: "Masuk · Assemblr Studio",
      newBadge: "Baru"
    }
  };

  const GROUPS = {
    "ACE-DEWI-2026": { name: "Dewi Lestari", kind: "team" },
    "ACE-LINCOLN-2026": { name: "Emily Parker", kind: "group" }
  };
  const CLASS_DEMO = {
    name: "Biology - Digestive system",
    nameId: "Biologi - Sistem pencernaan",
    teacher: "Assemblr Studio",
    students: 0,
    teachers: 1
  };

  let locale = "en";
  let tab = "login";
  let view = "home";
  let joinMode = "login";
  let pending = null;
  let busy = false;

  const t = (key) => COPY[locale][key];
  const spark = () =>
    `<span class="accent-word">${t("accent")}<svg class="ico spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg></span>`;

  function note(id, text, warn) {
    const el = $(id);
    el.textContent = text || "";
    el.classList.toggle("is-warn", !!warn && !!text);
  }

  function show(next, dir) {
    view = next;
    document.querySelectorAll("#auth .pane").forEach((pane) => {
      const on = pane.dataset.auth === next;
      pane.classList.toggle("active", on);
      if (on) pane.dataset.dir = dir || "forward";
    });
    if (next === "code") $("codeInput").focus();
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  }

  function paintPreview() {
    if (!pending) return;
    const id = locale === "id";
    if (pending.kind === "class") {
      $("previewTitle").textContent = t("classFound");
      $("previewLead").textContent = t("classLead");
      $("joinTitle").textContent = id ? CLASS_DEMO.nameId : CLASS_DEMO.name;
      const students = CLASS_DEMO.students === 1 ? t("student") : t("students");
      const teachers = CLASS_DEMO.teachers === 1 ? t("teacher").toLowerCase() : t("teachers");
      $("joinMeta").textContent = `${t("teacher")} · ${CLASS_DEMO.teacher} · ${CLASS_DEMO.students} ${students} + ${CLASS_DEMO.teachers} ${teachers}`;
      $("joinAv").textContent = "AE";
      $("previewContinue").textContent = t("confirm");
    } else if (pending.kind === "team") {
      $("previewTitle").textContent = t("almost");
      $("previewLead").textContent = t("almostLead");
      $("joinTitle").textContent = `${pending.name}'s ${t("groupSuffix")}`;
      $("joinMeta").textContent = "";
      $("joinAv").textContent = initials(pending.name);
      $("previewContinue").textContent = t("confirmCreate");
    } else {
      $("previewTitle").textContent = t("groupFound");
      $("previewLead").textContent = t("groupLead");
      $("joinTitle").textContent = `${pending.name}'s ${t("groupSuffix")}`;
      $("joinMeta").textContent = "";
      $("joinAv").textContent = initials(pending.name);
      $("previewContinue").textContent = t("confirm");
    }
    $("differentCode").textContent = t("different");
  }

  function paintJoin() {
    const isRegister = joinMode === "register";
    const isReset = joinMode === "reset";
    $("joinTabLogin").textContent = t("login");
    $("joinTabRegister").textContent = t("register");
    $("joinTabLogin").setAttribute("aria-selected", !isRegister ? "true" : "false");
    $("joinTabRegister").setAttribute("aria-selected", isRegister ? "true" : "false");
    $("joinTabs").hidden = isReset;
    $("nameLabel").hidden = !(isRegister || isReset);
    $("joinName").hidden = !(isRegister || isReset);
    $("nameLabel").textContent = t("name");
    $("joinName").placeholder = t("namePh");
    $("userLabel").textContent = t("user");
    $("joinUser").placeholder = isRegister ? t("userPhNew") : t("userPh");
    $("joinPwLabel").textContent = isReset ? t("newPw") : t("pw");
    $("joinPw").placeholder = isRegister || isReset ? t("pwNewPh") : t("pwPh");
    $("forgotLink").hidden = isRegister || isReset;
    $("forgotLink").textContent = t("forgot");
    $("joinTitle2").textContent = isReset ? t("resetTitle") : isRegister ? t("createTitle") : t("loginTitle");
    $("joinLead").textContent = isReset ? t("resetLead") : isRegister ? t("createLead") : t("loginLead");
    $("joinSubmit").textContent = isReset ? t("save") : isRegister ? t("createCta") : t("logIn");
    const can = isReset || isRegister
      ? $("joinName").value.trim() && $("joinUser").value.trim() && $("joinPw").value.trim()
      : $("joinUser").value.trim() && $("joinPw").value.trim();
    $("joinSubmit").setAttribute("aria-disabled", can ? "false" : "true");
    const line = $("joinSwitch");
    line.replaceChildren();
    if (isReset) {
      const back = document.createElement("button");
      back.type = "button";
      back.className = "text-link";
      back.textContent = t("backLogin");
      back.addEventListener("click", () => { joinMode = "login"; note("joinError", ""); paintJoin(); });
      line.append(back);
    } else {
      line.append(document.createTextNode((isRegister ? t("have") : t("dont")) + " "));
      const link = document.createElement("button");
      link.type = "button";
      link.className = "text-link";
      link.textContent = isRegister ? t("loginHere") : t("registerHere");
      link.addEventListener("click", () => {
        joinMode = isRegister ? "login" : "register";
        note("joinError", "");
        paintJoin();
      });
      line.append(link);
    }
  }

  function paint() {
    const register = tab === "register";
    $("authHeadline").innerHTML = `${t("lead")} ${spark()}`;
    $("authLead").textContent = t("body");
    $("authTabs").setAttribute("aria-label", t("tabs"));
    $("tabLogin").textContent = t("login");
    $("tabRegister").textContent = t("register");
    $("tabLogin").setAttribute("aria-selected", register ? "false" : "true");
    $("tabRegister").setAttribute("aria-selected", register ? "true" : "false");
    $("auth").classList.toggle("is-register", register);
    document.querySelectorAll("[data-sso]").forEach((el) => {
      el.textContent = register ? t("signUpWith") : t("signIn");
    });
    $("codeKicker").textContent = t("join");
    document.querySelector(".new-badge").textContent = t("newBadge");
    document.title = document.body.dataset.phase === "setup" ? t("setupTitle") : t("signInTitle");
    $("codeName").textContent = t("byCode");
    $("orLabel").textContent = register ? t("orRegister") : t("orLogin");
    $("idLabel").textContent = t("idLabel");
    $("loginId").placeholder = t("idPh");
    $("pwLabel").textContent = t("pw");
    $("loginPw").placeholder = t("pwPh");
    $("resetLink").hidden = register;
    $("resetLink").textContent = t("reset");
    $("primaryAuth").textContent = register ? t("registerCta") : t("loginCta");
    const line = $("switchLine");
    line.replaceChildren();
    if (register) {
      line.append(document.createTextNode(t("ifHave") + " "));
      const b = document.createElement("button");
      b.type = "button";
      b.className = "text-link";
      b.textContent = t("here");
      b.addEventListener("click", () => setTab("login"));
      line.append(b);
    } else {
      line.append(document.createTextNode(t("signUpHere") + " "));
      const b = document.createElement("button");
      b.type = "button";
      b.className = "text-link";
      b.textContent = t("here");
      b.addEventListener("click", () => setTab("register"));
      line.append(b);
      line.append(document.createTextNode(" " + t("ifNew")));
    }
    $("legal").innerHTML = `${t("legalBefore")} <a href="https://edu.assemblrworld.com/en/tos" target="_blank" rel="noopener noreferrer">${t("tos")}</a> ${t("legalMid")} <a href="https://edu.assemblrworld.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">${t("privacy")}</a>.`;
    $("codeTitle").textContent = t("codeTitle");
    $("codeLead").textContent = t("codeLead");
    $("codeInput").placeholder = t("codePh");
    $("codeContinue").textContent = t("continue");
    $("codeDemo").textContent = t("demo");
    ["codeBack", "previewBack", "joinBack", "emailBack"].forEach((id) => $(id).setAttribute("aria-label", t("back")));
    const verb = register ? t("signUpWith") : t("signIn");
    $("googleBtn").setAttribute("aria-label", `${verb} Google`);
    $("belajarBtn").setAttribute("aria-label", `${verb} Belajar.id`);
    $("facebookBtn").setAttribute("aria-label", `${verb} Facebook`);
    $("appleBtn").setAttribute("aria-label", `${verb} Apple`);
    $("emailBtn").setAttribute("aria-label", `${verb} Email`);
    $("codeBtn").setAttribute("aria-label", t("codeTitle"));
    $("emailTitle").textContent = t("emailTitle");
    $("regNameLabel").textContent = t("fullName");
    $("regName").placeholder = t("fullNamePh");
    $("regMailLabel").textContent = t("email");
    $("regMail").placeholder = t("emailPh");
    $("regPwLabel").textContent = t("pw");
    $("regPw2Label").textContent = t("confirmPw");
    $("regUserLabel").textContent = t("user");
    $("regUser").placeholder = "oliverbonnet";
    $("regNewsText").textContent = t("news");
    $("regTermsText").textContent = t("terms");
    $("emailSubmit").textContent = t("signUpCta");
    paintPreview();
    paintJoin();
  }

  function setTab(next) {
    tab = next;
    note("authNote", "");
    $("loginPw").autocomplete = next === "register" ? "new-password" : "current-password";
    paint();
  }

  function shake(el) {
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }

  function enterSetup(name) {
    if (busy) return;
    busy = true;
    document.body.dataset.phase = "setup";
    document.title = t("setupTitle");
    const reveal = () => {
      $("auth").hidden = true;
      $("setup").hidden = false;
      $("progress").hidden = false;
      const setup = $("setup");
      setup.style.animation = "none";
      void setup.offsetWidth;
      setup.style.animation = "";
      const trimmed = (name || "").trim();
      if (trimmed) {
        const input = $("nameInput");
        input.value = trimmed;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      $("toastText").textContent = t("toast");
      $("toast").classList.add("show");
      window.setTimeout(() => $("toast").classList.remove("show"), 2200);
      $("title").focus({ preventScroll: true });
    };
    if (reduceMotion) reveal();
    else {
      $("auth").classList.add("is-leaving");
      window.setTimeout(reveal, 260);
    }
  }

  function verifyCode() {
    const raw = $("codeInput").value.trim().toUpperCase();
    if (!raw) {
      shake($("codeContinue"));
      return;
    }
    if (GROUPS[raw]) {
      pending = { kind: GROUPS[raw].kind, name: GROUPS[raw].name, code: raw };
      note("codeError", "");
      joinMode = GROUPS[raw].kind === "team" ? "register" : "login";
      paintPreview();
      show("preview");
      return;
    }
    if (/^[A-Z]{5}$/.test(raw)) {
      pending = { kind: "class", code: raw.toLowerCase() };
      note("codeError", "");
      joinMode = "login";
      paintPreview();
      show("preview");
      return;
    }
    note("codeError", t("codeError"), true);
    shake($("codeContinue"));
  }

  $("tabLogin").addEventListener("click", () => setTab("login"));
  $("tabRegister").addEventListener("click", () => setTab("register"));
  $("googleBtn").addEventListener("click", () => {
    if (busy) return;
    $("googleBtn").classList.add("is-loading");
    $("googleBtn").setAttribute("aria-busy", "true");
    window.setTimeout(() => enterSetup(""), reduceMotion ? 0 : 650);
  });
  ["belajarBtn", "facebookBtn", "appleBtn"].forEach((id) => {
    $(id).addEventListener("click", () => note("authNote", t("otherSocial"), false));
  });
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  function paintEmail() {
    const ready = $("regName").value.trim() && emailOk($("regMail").value) && $("regUser").value.trim()
      && $("regPw").value && $("regPw").value === $("regPw2").value && $("regTerms").checked;
    $("emailSubmit").setAttribute("aria-disabled", ready ? "false" : "true");
  }
  $("emailBtn").addEventListener("click", () => {
    note("emailNote", "");
    paintEmail();
    show("email");
    $("regName").focus();
  });
  $("emailBack").addEventListener("click", () => show("home", "back"));
  ["regName", "regMail", "regUser", "regPw", "regPw2", "regTerms"].forEach((id) => $(id).addEventListener("input", paintEmail));
  $("regTerms").addEventListener("change", paintEmail);
  $("emailSubmit").addEventListener("click", () => {
    const name = $("regName").value.trim();
    const mail = $("regMail").value.trim();
    const user = $("regUser").value.trim();
    if ($("regPw").value && $("regPw").value !== $("regPw2").value) {
      note("emailNote", t("pwMatch"), true);
      shake($("emailSubmit"));
      return;
    }
    if (mail && !emailOk(mail)) {
      note("emailNote", t("emailBad"), true);
      shake($("emailSubmit"));
      return;
    }
    if (!name || !mail || !user || !$("regPw").value || !$("regTerms").checked) {
      note("emailNote", t("needTerms"), true);
      shake($("emailSubmit"));
      return;
    }
    note("emailNote", "");
    document.body.dataset.signupEmail = mail;
    enterSetup(name);
  });
  $("codeBtn").addEventListener("click", () => { note("codeError", ""); show("code"); });
  $("resetLink").addEventListener("click", () => note("authNote", t("resetNote"), false));
  $("primaryAuth").addEventListener("click", () => {
    const id = $("loginId").value.trim();
    const pw = $("loginPw").value.trim();
    if (!id || !pw) {
      note("authNote", t("needBoth"), true);
      shake($("primaryAuth"));
      return;
    }
    note("authNote", "");
    if (id.includes("@")) document.body.dataset.signupEmail = id;
    enterSetup(id.includes("@") ? "" : id);
  });
  $("loginPw").addEventListener("keydown", (e) => { if (e.key === "Enter") $("primaryAuth").click(); });
  $("codeBack").addEventListener("click", () => show("home", "back"));
  $("codeContinue").addEventListener("click", verifyCode);
  $("codeInput").addEventListener("input", () => note("codeError", ""));
  $("codeInput").addEventListener("keydown", (e) => { if (e.key === "Enter") verifyCode(); });
  $("previewBack").addEventListener("click", () => show("code", "back"));
  $("differentCode").addEventListener("click", () => {
    pending = null;
    $("codeInput").value = "";
    show("code", "back");
  });
  $("previewContinue").addEventListener("click", () => {
    note("joinError", "");
    paintJoin();
    show("join");
  });
  $("joinBack").addEventListener("click", () => show("preview", "back"));
  $("joinTabLogin").addEventListener("click", () => { joinMode = "login"; note("joinError", ""); paintJoin(); });
  $("joinTabRegister").addEventListener("click", () => { joinMode = "register"; note("joinError", ""); paintJoin(); });
  $("forgotLink").addEventListener("click", () => { joinMode = "reset"; note("joinError", ""); paintJoin(); });
  ["joinName", "joinUser", "joinPw"].forEach((id) => $(id).addEventListener("input", paintJoin));
  $("joinSubmit").addEventListener("click", () => {
    if ($("joinSubmit").getAttribute("aria-disabled") === "true") {
      shake($("joinSubmit"));
      return;
    }
    const name = joinMode === "login" ? "" : $("joinName").value.trim();
    const user = $("joinUser").value.trim();
    if (user.includes("@")) document.body.dataset.signupEmail = user;
    document.body.dataset.joinedBy = "code";
    enterSetup(name);
  });

  document.querySelectorAll("#lang [data-lang]").forEach((opt) => {
    opt.addEventListener("click", () => {
      locale = opt.dataset.lang === "Bahasa Indonesia" ? "id" : "en";
      paint();
    });
  });

  /* ---------- Sign-in options: swipe row on phones ---------- */
  const socialRow = document.querySelector("#authHome .social-row");
  const socialHint = $("socialHint");
  const phone = window.matchMedia("(max-width: 600px)");

  function paintSocialScroll() {
    const max = socialRow.scrollWidth - socialRow.clientWidth;
    const scrollable = phone.matches && max > 2;
    socialHint.classList.toggle("is-hidden", !scrollable);
    socialRow.classList.toggle("at-start", !scrollable || socialRow.scrollLeft <= 2);
    socialRow.classList.toggle("at-end", !scrollable || socialRow.scrollLeft >= max - 2);
    if (!scrollable) return;
    const track = socialHint.clientWidth;
    const thumb = Math.max(12, track * (socialRow.clientWidth / socialRow.scrollWidth));
    socialHint.style.setProperty("--thumb-w", `${thumb}px`);
    socialHint.style.setProperty("--thumb-x", `${(track - thumb) * (socialRow.scrollLeft / max)}px`);
  }

  let socialPeeked = false;
  function peekSocialRow() {
    if (socialPeeked || reduceMotion || !phone.matches) return;
    if (socialRow.scrollWidth - socialRow.clientWidth <= 2 || !socialRow.offsetParent) return;
    socialPeeked = true;
    window.setTimeout(() => {
      socialRow.scrollTo({ left: 56, behavior: "smooth" });
      window.setTimeout(() => socialRow.scrollTo({ left: 0, behavior: "smooth" }), 650);
    }, 900);
  }

  ["pointerdown", "touchstart", "wheel"].forEach((type) => {
    socialRow.addEventListener(type, () => { socialPeeked = true; }, { passive: true, once: true });
  });
  socialRow.addEventListener("scroll", paintSocialScroll, { passive: true });
  window.addEventListener("resize", () => { paintSocialScroll(); peekSocialRow(); });

  paint();
  show("home");
  paintSocialScroll();
  peekSocialRow();
})();
