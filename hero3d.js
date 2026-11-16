/* Sign-in hero: a smooth-shaded 3D mountain and two flying birds.
   WebGL draws the mountain and the birds (depth tested, anti-aliased). Plain 2D canvases sit under it
   (floor rings, shadow, slab sides) and over it (ski trails). Drag to turn the model 360 degrees. */
(function hero3d() {
  const story = document.getElementById("authStory");
  const stage = document.querySelector("#authHero .hero-stage");
  const topCanvas = document.getElementById("heroCanvas");
  const pinsEl = document.getElementById("heroPins");
  const hint = document.getElementById("heroHint");
  if (!story || !stage || !topCanvas || !pinsEl) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* three stacked canvases: floor and slab (2D), mountain and birds (WebGL), trails (2D) */
  const backCanvas = document.createElement("canvas");
  const glCanvas = document.createElement("canvas");
  backCanvas.className = glCanvas.className = "hero-canvas";
  stage.insertBefore(backCanvas, topCanvas);
  stage.insertBefore(glCanvas, topCanvas);
  const ctxB = backCanvas.getContext("2d");
  const ctx = topCanvas.getContext("2d");
  const gl = glCanvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: true, depth: true });

  const N = 128, BASE = -0.22, VS = 1.15;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const mix = (a, b, t) => a + (b - a) * t;

  /* ---------- terrain ---------- */
  const hash = (i, j) => { const h = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return h - Math.floor(h); };
  const sm = (t) => t * t * (3 - 2 * t);
  const vnoise = (x, y) => {
    const i = Math.floor(x), j = Math.floor(y), fx = sm(x - i), fy = sm(y - j);
    const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  };
  const ridge = (x, y) => {
    let sum = 0, amp = 0.55, f = 1, w = 1;
    for (let o = 0; o < 6; o++) {
      const n = Math.pow(1 - Math.abs(vnoise(x * f + o * 17, y * f - o * 9) * 2 - 1), 1.7) * w;
      sum += n * amp; w = clamp(n * 1.6, 0.25, 1); amp *= 0.5; f *= 2.07;
    }
    return sum;
  };
  const bump = (x, z, cx, cz, w, h) => { const dx = x - cx, dz = z - cz; return h * Math.exp(-(dx * dx + dz * dz) / (w * w)); };
  const terrain = (x, z) => {
    const mass = bump(x, z, 0.1, -0.1, 0.6, 1) + bump(x, z, -0.58, 0.28, 0.36, 0.5) + bump(x, z, 0.64, 0.4, 0.32, 0.34);
    return (0.05 + mass * (0.3 + 1.05 * ridge(x * 1.9 + 3, z * 1.9 + 7)) * 0.78 + (vnoise(x * 5, z * 5) - 0.5) * 0.02) * VS;
  };
  const V = N + 1, step = 2 / N;
  const HV = new Float32Array(V * V);
  for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) HV[j * V + i] = terrain(-1 + i * step, -1 + j * step);
  /* one light blur so no summit is a single-vertex needle */
  (() => {
    const src = HV.slice();
    for (let j = 1; j < N; j++) for (let i = 1; i < N; i++) {
      const q = j * V + i;
      HV[q] = src[q] * 0.5 + (src[q - 1] + src[q + 1] + src[q - V] + src[q + V]) * 0.1 + (src[q - V - 1] + src[q - V + 1] + src[q + V - 1] + src[q + V + 1]) * 0.025;
    }
  })();
  const heightAt = (x, z) => {
    const fx = clamp((x + 1) / step, 0, N - 0.001), fz = clamp((z + 1) / step, 0, N - 0.001);
    const i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j;
    const a = HV[j * V + i], b = HV[j * V + i + 1], c = HV[(j + 1) * V + i], d = HV[(j + 1) * V + i + 1];
    return a + (b - a) * tx + (c - a) * tz + (a - b - c + d) * tx * tz;
  };

  /* sun fixed in the world: ridges throw real shadows, light shifts as the model turns */
  const SUN = (() => { const x = -0.62, y = 0.5, z = 0.6, l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; })();
  const sunHoriz = Math.hypot(SUN[0], SUN[2]), sunRun = SUN[1] / sunHoriz;
  const vn = new Float32Array(V * V * 3);
  for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) {
    const i0 = Math.max(0, i - 1), i1 = Math.min(N, i + 1), j0 = Math.max(0, j - 1), j1 = Math.min(N, j + 1);
    const dx = (HV[j * V + i1] - HV[j * V + i0]) / ((i1 - i0) * step), dz = (HV[j1 * V + i] - HV[j0 * V + i]) / ((j1 - j0) * step);
    const len = Math.hypot(dx, 1, dz), k = (j * V + i) * 3;
    vn[k] = -dx / len; vn[k + 1] = 1 / len; vn[k + 2] = -dz / len;
  }
  /* one smooth colour per vertex (snow high up, rock on steep ground, forest low down), so shading has no blocks */
  const vcol = new Float32Array(V * V * 3);
  const vworld = new Float32Array(V * V * 3);
  for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) {
    const q = j * V + i, k = q * 3, x = -1 + i * step, z = -1 + j * step, hv = HV[q], hn = hv / VS;
    const nx = vn[k], ny = vn[k + 1], nz = vn[k + 2], slope = 1 - ny;
    let lit = Math.max(0, nx * SUN[0] + ny * SUN[1] + nz * SUN[2]);
    if (lit > 0) for (let d = step; d < 1.6; d += step * 1.5) {
      const px = x + (SUN[0] / sunHoriz) * d, pz = z + (SUN[2] / sunHoriz) * d;
      if (Math.abs(px) > 1 || Math.abs(pz) > 1) break;
      if (heightAt(px, pz) > hv + sunRun * d + 0.004) { lit = 0; break; }
    }
    let avg = 0;
    [[-5, 0], [5, 0], [0, -5], [0, 5]].forEach(([di, dj]) => { avg += HV[clamp(j + dj, 0, N) * V + clamp(i + di, 0, N)]; });
    const ao = clamp(1 + (hv - avg / 4) * 4.5, 0.62, 1.12);
    const broad = vnoise(x * 6 + 40, z * 6 + 40);
    const snow = sm(clamp((hn - 0.11) / 0.14, 0, 1)) * (1 - sm(clamp((slope - 0.3) / 0.3, 0, 1)) * 0.7);
    const forest = (1 - sm(clamp((hn - 0.06) / 0.1, 0, 1))) * (1 - sm(clamp((slope - 0.1) / 0.18, 0, 1)));
    const rock = [mix(74, 126, broad), mix(70, 114, broad), mix(74, 106, broad)];
    const grn = [44 + broad * 16, 70 + broad * 18, 52 + broad * 10];
    const alb = [0, 1, 2].map((c) => mix(mix(rock[c], grn[c], forest), [250, 251, 255][c], snow));
    const amb = (0.44 + 0.22 * ny) * ao, sun = lit * (0.9 + 0.1 * ao);
    vcol[k] = Math.min(1, (alb[0] * (amb * 0.86 + sun * 1.02)) / 255);
    vcol[k + 1] = Math.min(1, (alb[1] * (amb * 0.94 + sun * 0.98)) / 255);
    vcol[k + 2] = Math.min(1, (alb[2] * (amb * 1.12 + sun * 0.9)) / 255);
    vworld[k] = x; vworld[k + 1] = hv; vworld[k + 2] = z;
  }

  /* summit and the spots for the annotations */
  let sx0 = 0, sz0 = 0, sh = -1;
  for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) if (HV[j * V + i] > sh) { sh = HV[j * V + i]; sx0 = -1 + i * step; sz0 = -1 + j * step; }
  const trailEnds = [[-0.45, 0.78, "#22c55e"], [0.82, 0.2, "#3b82f6"], [0.15, 0.9, "#f59e0b"]];
  const trails = trailEnds.map(([ex, ez, color], k) => {
    const pts = [], px = -(ez - sz0), pz = ex - sx0, pl = Math.hypot(px, pz) || 1;
    for (let s = 0; s <= 36; s++) {
      const t = s / 36, w = Math.sin(t * Math.PI * (2 + k)) * 0.1 * t;
      const x = mix(sx0, ex, t) + (px / pl) * w, z = mix(sz0, ez, t) + (pz / pl) * w;
      pts.push([x, heightAt(x, z) + 0.006, z]);
    }
    return { pts, color };
  });
  const at = (x, z) => [x, heightAt(x, z), z];
  const PINS = [
    { p: [sx0, sh, sz0], label: "3,142 m", cls: "is-summit" },
    { p: trails[1].pts[24], label: "Lift" },
    { p: trails[0].pts[30], label: "Trail A" },
    { p: at(0.62, 0.72), label: "Lodge" },
  ];
  PINS.forEach((pin) => {
    const el = document.createElement("div");
    el.className = "hero-pin" + (pin.cls ? " " + pin.cls : "");
    el.innerHTML = '<span class="hero-pin-chip"></span><span class="hero-pin-dot"></span>';
    el.firstChild.textContent = pin.label;
    pinsEl.appendChild(el);
    pin.el = el;
  });

  /* ---------- WebGL ---------- */
  let prog = null, uDet = null, aLoc = null, terrainPos = null, posBuf = null, colBuf = null, worldBuf = null, idxBuf = null, dynPos = null, dynCol = null, dynWorld = null, idxCount = 0;
  if (gl) {
    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, "attribute vec3 aPos;attribute vec3 aCol;attribute vec3 aW;varying vec3 vCol;varying vec3 vW;void main(){gl_Position=vec4(aPos,1.0);vCol=aCol;vW=aW;}"));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER,
      "precision mediump float;uniform float uDet;varying vec3 vCol;varying vec3 vW;" +
      "float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}" +
      "float vn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1.0,0.0)),f.x),mix(h(i+vec2(0.0,1.0)),h(i+vec2(1.0,1.0)),f.x),f.y);}" +
      "void main(){float n=vn(vW.xz*90.0)*0.55+vn(vW.xz*260.0)*0.45;vec3 c=vCol*(1.0+(n-0.5)*uDet);gl_FragColor=vec4(c,1.0);}"));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { prog = null; }
  }
  const glOK = !!(gl && prog);
  if (glOK) {
    gl.useProgram(prog);
    aLoc = { pos: gl.getAttribLocation(prog, "aPos"), col: gl.getAttribLocation(prog, "aCol"), w: gl.getAttribLocation(prog, "aW") };
    uDet = gl.getUniformLocation(prog, "uDet");
    terrainPos = new Float32Array(V * V * 3);
    const idx = new Uint16Array(N * N * 6);
    let n = 0;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const a = j * V + i, b = a + 1, c = a + V, d = c + 1;
      idx[n++] = a; idx[n++] = b; idx[n++] = d; idx[n++] = a; idx[n++] = d; idx[n++] = c;
    }
    idxCount = idx.length;
    const mk = (target, data, usage) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, data, usage); return b; };
    posBuf = mk(gl.ARRAY_BUFFER, terrainPos, gl.DYNAMIC_DRAW);
    colBuf = mk(gl.ARRAY_BUFFER, vcol, gl.STATIC_DRAW);
    worldBuf = mk(gl.ARRAY_BUFFER, vworld, gl.STATIC_DRAW);
    idxBuf = mk(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    dynPos = gl.createBuffer(); dynCol = gl.createBuffer(); dynWorld = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0, 0, 0, 0);
  }
  const attach = (pb, cb, wb) => {
    [[pb, aLoc.pos], [cb, aLoc.col], [wb, aLoc.w]].forEach(([buf, loc]) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    });
  };

  /* ---------- birds ---------- */
  const BIRDS = [
    { from: [-1.75, 1.32, 0.1], to: [1.75, 1.0, -0.3], dur: 8.5, delay: 0.6, gap: 3.4, ph: 0, size: 0.8, rate: 2.3 },
    { from: [1.75, 1.5, -0.2], to: [-1.75, 1.12, 0.2], dur: 9.5, delay: 3.2, gap: 2.4, ph: 1.7, size: 0.68, rate: 2.7 },
  ];
  const LIGHT = (() => { const x = -0.45, y = 0.8, z = 0.5, l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; })();

  /* ---------- view state ---------- */
  const AUTO = reduceMotion ? 0 : 0.16, BASE_PITCH = 0.64;
  let yaw = 0.7, vel = AUTO, pitch = BASE_PITCH, pitchGoal = BASE_PITCH;
  let drag = null, W = 0, Hh = 0, dpr = 1, last = 0;
  const PX = new Float32Array(V * V), PY = new Float32Array(V * V), PZ = new Float32Array(V * V);

  const fit = () => {
    W = stage.clientWidth; Hh = stage.clientHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    [backCanvas, glCanvas, topCanvas].forEach((c) => { c.width = Math.max(1, Math.round(W * dpr)); c.height = Math.max(1, Math.round(Hh * dpr)); });
    if (glOK) gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  };
  if ("ResizeObserver" in window) new ResizeObserver(fit).observe(stage); else window.addEventListener("resize", fit);
  fit();

  const toClipX = (x) => (x / W) * 2 - 1;
  const toClipY = (y) => 1 - (y / Hh) * 2;
  const toClipZ = (dz) => clamp(-dz * 0.3, -0.98, 0.98);

  /* a bird as lit triangles, in view space so it never turns with the model */
  const birdTriangles = (b, t, cam) => {
    const cycle = b.dur + b.gap, local = t - b.delay;
    if (local < 0) return null;
    const ph = local % cycle;
    if (ph > b.dur) return null;
    const u = ph / b.dur;
    const place = (uu) => {
      const p = [mix(b.from[0], b.to[0], uu), mix(b.from[1], b.to[1], uu), mix(b.from[2], b.to[2], uu)];
      p[1] += Math.sin(uu * Math.PI * 3 + b.ph) * 0.07; p[2] += Math.sin(uu * Math.PI * 2 + b.ph) * 0.12; return p;
    };
    const pos = place(u), nxt = place(Math.min(1, u + 0.01));
    const psi = Math.atan2(-(nxt[2] - pos[2]), nxt[0] - pos[0]);
    const roll = Math.sin(u * Math.PI * 2 + b.ph) * 0.22, pit = clamp((nxt[1] - pos[1]) * 6, -0.3, 0.3);
    const cPsi = Math.cos(psi), sPsi = Math.sin(psi), cR = Math.cos(roll), sR = Math.sin(roll), cT = Math.cos(pit), sT = Math.sin(pit);
    const beat = t * Math.PI * 2 * b.rate + b.ph, glide = clamp(0.55 + Math.sin(t * 0.7 + b.ph * 2) * 0.7, 0.12, 1);
    const flap = Math.sin(beat) * 0.9 * glide + 0.12;
    const k = b.size;
    const view = (x, y, z) => {
      const y1 = y * cR - z * sR, z1 = y * sR + z * cR;
      const x2 = x * cT - y1 * sT, y2 = x * sT + y1 * cT;
      return [pos[0] + (x2 * cPsi + z1 * sPsi) * k, pos[1] + y2 * k, pos[2] + (-x2 * sPsi + z1 * cPsi) * k];
    };
    const outPos = [], outCol = [];
    const tri = (a, bb, c, top, under) => {
      const A = view(a[0], a[1], a[2]), B = view(bb[0], bb[1], bb[2]), C = view(c[0], c[1], c[2]);
      let n = [(B[1] - A[1]) * (C[2] - A[2]) - (B[2] - A[2]) * (C[1] - A[1]), (B[2] - A[2]) * (C[0] - A[0]) - (B[0] - A[0]) * (C[2] - A[2]), (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0])];
      const nl = Math.hypot(n[0], n[1], n[2]) || 1; n = [n[0] / nl, n[1] / nl, n[2] / nl];
      if (n[0] * cam[0] + n[1] * cam[1] + n[2] * cam[2] < 0) n = [-n[0], -n[1], -n[2]];
      const base = n[1] >= -0.05 ? top : under;
      const lam = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]), l = 0.46 + 0.66 * lam;
      [A, B, C].forEach((p) => {
        const dz = p[2] * cam[2] + p[1] * cam[1], f = 1 / (1 - dz * 0.12);
        outPos.push(toClipX(cam[3] + cam[5] * p[0] * f), toClipY(cam[4] + cam[5] * (-p[1] * cam[2] + p[2] * cam[1]) * f), toClipZ(dz) - 0.02);
        outCol.push(Math.min(1, (base[0] * l) / 255), Math.min(1, (base[1] * l) / 255), Math.min(1, (base[2] * l) / 255));
      });
    };
    const TOP = [48, 50, 60], PALE = [206, 206, 212], COVERT = [100, 92, 88], PRIM = [30, 32, 40], SEC = [60, 58, 66], BEAK = [236, 172, 52];
    /* body: a spindle with a head */
    const xs = [0.17, 0.13, 0.07, 0, -0.07, -0.14, -0.2], ry = [0.006, 0.022, 0.034, 0.038, 0.032, 0.02, 0.008], rz = [0.006, 0.02, 0.034, 0.04, 0.034, 0.02, 0.008];
    const SEG = 8, ring = (r, s) => { const a = (s / SEG) * Math.PI * 2; return [xs[r], Math.sin(a) * ry[r], Math.cos(a) * rz[r]]; };
    for (let r = 0; r < xs.length - 1; r++) for (let s = 0; s < SEG; s++) {
      const p00 = ring(r, s), p01 = ring(r, s + 1), p10 = ring(r + 1, s), p11 = ring(r + 1, s + 1);
      tri(p00, p01, p11, TOP, PALE); tri(p00, p11, p10, TOP, PALE);
    }
    for (let s = 0; s < 4; s++) { const a = (s / 4) * Math.PI * 2, c = (s + 1) / 4 * Math.PI * 2; tri([0.17, 0.0, 0.0], [0.17, Math.sin(a) * 0.007, Math.cos(a) * 0.007], [0.235, -0.006, 0], BEAK, BEAK); tri([0.17, Math.sin(a) * 0.007, Math.cos(a) * 0.007], [0.17, Math.sin(c) * 0.007, Math.cos(c) * 0.007], [0.235, -0.006, 0], BEAK, BEAK); }
    /* tail fan */
    for (let f = 0; f < 5; f++) {
      const a0 = (f - 2) * 0.24, a1 = (f - 1) * 0.24;
      const r0 = [-0.18, -0.002, (f - 2) * 0.014], r1 = [-0.18, -0.002, (f - 1) * 0.014];
      const t0 = [-0.18 - 0.16 * Math.cos(a0), -0.006, 0.16 * Math.sin(a0)], t1 = [-0.18 - 0.16 * Math.cos(a1), -0.006, 0.16 * Math.sin(a1)];
      tri(r0, r1, t1, SEC, PALE); tri(r0, t1, t0, SEC, PALE);
    }
    /* wings */
    [-1, 1].forEach((side) => {
      const a1 = flap * 0.45, a2 = flap - Math.cos(beat) * 0.25 * glide;
      const S0 = [0.02, 0, side * 0.03];
      const Wr = [S0[0], S0[1] + 0.13 * Math.sin(a1), S0[2] + side * 0.13 * Math.cos(a1)];
      const Tp = [Wr[0] - 0.03, Wr[1] + 0.24 * Math.sin(a2), Wr[2] + side * 0.24 * Math.cos(a2)];
      const L0 = [S0[0] + 0.07, S0[1], S0[2]], T0 = [S0[0] - 0.1, S0[1], S0[2]];
      const L1 = [Wr[0] + 0.045, Wr[1], Wr[2]], T1 = [Wr[0] - 0.11, Wr[1] * 0.97, Wr[2]];
      tri(L0, L1, T1, COVERT, PALE); tri(L0, T1, T0, COVERT, PALE);
      /* hand: leading triangle plus fanned primary feathers */
      const L2 = [Tp[0] + 0.02, Tp[1], Tp[2]];
      tri(L1, L2, T1, SEC, PALE);
      const FEATH = 6;
      for (let f = 0; f < FEATH; f++) {
        const f0 = f / FEATH, f1 = (f + 1) / FEATH;
        const bA = [mix(T1[0], Tp[0] - 0.02, f0), mix(T1[1], Tp[1], f0), mix(T1[2], Tp[2], f0)];
        const bB = [mix(T1[0], Tp[0] - 0.02, f1), mix(T1[1], Tp[1], f1), mix(T1[2], Tp[2], f1)];
        const len = 0.17 - f * 0.012, lag = (a2 - a1) * 0.1 * (f + 1) / FEATH;
        const tipP = [bB[0] - len, bB[1] + lag - 0.01, bB[2] + side * (0.03 + 0.012 * f)];
        tri(bA, bB, tipP, PRIM, PALE);
        const tip2 = [bA[0] - len * 0.95, bA[1] + lag - 0.01, bA[2] + side * (0.015 + 0.012 * f)];
        tri(bA, tip2, tipP, SEC, PALE);
      }
    });
    return { pos: outPos, col: outCol };
  };

  const draw = (time) => {
    if (!W || !Hh) return;
    const cY = Math.cos(yaw), sY = Math.sin(yaw), cP = Math.cos(pitch), sP = Math.sin(pitch);
    const S = Math.min(W * 0.33, Hh * 0.45), cx = W / 2, cy = Hh * 0.56;
    const proj = (x, y, z, out) => {
      const X = x * cY + z * sY, Z = -x * sY + z * cY;
      const dz = Z * cP + y * sP, f = 1 / (1 - dz * 0.12);
      out[0] = cx + S * X * f; out[1] = cy + S * (-y * cP + Z * sP) * f; out[2] = dz;
    };
    const o = [0, 0, 0];
    ctxB.setTransform(dpr, 0, 0, dpr, 0, 0); ctxB.clearRect(0, 0, W, Hh);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, Hh);

    /* AR floor rings and the soft shadow of the slab */
    ctxB.lineWidth = 1;
    [1.5, 1.78].forEach((rad, k) => {
      ctxB.beginPath();
      for (let a = 0; a <= 72; a++) { const t = (a / 72) * Math.PI * 2; proj(Math.cos(t) * rad, BASE, Math.sin(t) * rad, o); a ? ctxB.lineTo(o[0], o[1]) : ctxB.moveTo(o[0], o[1]); }
      ctxB.setLineDash([5, 9]); ctxB.lineDashOffset = -(time / 60) * (k ? -1 : 1);
      ctxB.strokeStyle = k ? "rgba(59,130,246,0.28)" : "rgba(59,130,246,0.45)";
      ctxB.stroke();
    });
    ctxB.setLineDash([]);
    ctxB.save();
    ctxB.shadowColor = "rgba(31,41,55,0.34)"; ctxB.shadowBlur = 26; ctxB.shadowOffsetY = 16;
    ctxB.fillStyle = "#2a3446";
    ctxB.beginPath();
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([x, z], k) => { proj(x, BASE, z, o); k ? ctxB.lineTo(o[0], o[1]) : ctxB.moveTo(o[0], o[1]); });
    ctxB.closePath(); ctxB.fill(); ctxB.restore();

    /* project every grid vertex once */
    for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) {
      const k = j * V + i; proj(-1 + i * step, HV[k], -1 + j * step, o);
      PX[k] = o[0]; PY[k] = o[1]; PZ[k] = o[2];
    }

    /* sides of the slab that face the viewer (fixed sun, so they brighten and darken as it turns) */
    const edge = (side, s) => (side === 0 ? [-1 + s * step, 1, N * V + s] : side === 1 ? [-1 + s * step, -1, s] : side === 2 ? [1, -1 + s * step, s * V + N] : [-1, -1 + s * step, s * V]);
    [[0, 0, 1], [1, 0, -1], [2, 1, 0], [3, -1, 0]].forEach(([side, nx, nz]) => {
      const nZ = -nx * sY + nz * cY;
      if (nZ <= 0.01) return;
      const lam = Math.max(0, nx * SUN[0] + nz * SUN[2]);
      [[0, "rgb(" + Math.round(70 + 60 * lam) + "," + Math.round(80 + 62 * lam) + "," + Math.round(98 + 66 * lam) + ")"], [1, "rgb(" + Math.round(34 + 38 * lam) + "," + Math.round(42 + 40 * lam) + "," + Math.round(62 + 46 * lam) + ")"]].forEach(([band, fill]) => {
        ctxB.beginPath();
        for (let s = 0; s <= N; s++) { const [x, z, k] = edge(side, s); proj(x, band ? 0 : HV[k], z, o); s ? ctxB.lineTo(o[0], o[1]) : ctxB.moveTo(o[0], o[1]); }
        for (let s = N; s >= 0; s--) { const [x, z] = edge(side, s); proj(x, band ? BASE : 0, z, o); ctxB.lineTo(o[0], o[1]); }
        ctxB.closePath(); ctxB.fillStyle = fill; ctxB.strokeStyle = fill; ctxB.lineWidth = 0.6; ctxB.fill(); ctxB.stroke();
      });
    });

    if (glOK) {
      /* mountain: positions change every frame, colours never do */
      for (let q = 0; q < V * V; q++) { terrainPos[q * 3] = toClipX(PX[q]); terrainPos[q * 3 + 1] = toClipY(PY[q]); terrainPos[q * 3 + 2] = toClipZ(PZ[q]); }
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf); gl.bufferSubData(gl.ARRAY_BUFFER, 0, terrainPos);
      attach(posBuf, colBuf, worldBuf);
      gl.uniform1f(uDet, 0.3);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
      gl.drawElements(gl.TRIANGLES, idxCount, gl.UNSIGNED_SHORT, 0);

      /* birds */
      if (!reduceMotion) {
        const t = time / 1000, cam = [0, sP, cP, cx, cy, S];
        const pos = [], col = [];
        BIRDS.forEach((b) => { const r = birdTriangles(b, t, cam); if (r) { for (let n = 0; n < r.pos.length; n++) pos.push(r.pos[n]); for (let n = 0; n < r.col.length; n++) col.push(r.col[n]); } });
        if (pos.length) {
          const zeros = new Float32Array(pos.length);
          gl.bindBuffer(gl.ARRAY_BUFFER, dynPos); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.DYNAMIC_DRAW);
          gl.bindBuffer(gl.ARRAY_BUFFER, dynCol); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(col), gl.DYNAMIC_DRAW);
          gl.bindBuffer(gl.ARRAY_BUFFER, dynWorld); gl.bufferData(gl.ARRAY_BUFFER, zeros, gl.DYNAMIC_DRAW);
          attach(dynPos, dynCol, dynWorld);
          gl.uniform1f(uDet, 0.0);
          gl.drawArrays(gl.TRIANGLES, 0, pos.length / 3);
        }
      }
    } else {
      /* no WebGL: flat-shaded cells painted far to near */
      const dxs = -cP * sY, dzs = cP * cY;
      ctxB.lineWidth = 0.6; ctxB.lineJoin = "round";
      for (let jj = 0; jj < N; jj++) {
        const j = dzs > 0 ? jj : N - 1 - jj;
        for (let ii = 0; ii < N; ii++) {
          const i = dxs > 0 ? ii : N - 1 - ii, k = j * V + i, c = (k * 3);
          const col = "rgb(" + ((vcol[c] * 255) | 0) + "," + ((vcol[c + 1] * 255) | 0) + "," + ((vcol[c + 2] * 255) | 0) + ")";
          ctxB.beginPath();
          ctxB.moveTo(PX[k], PY[k]); ctxB.lineTo(PX[k + 1], PY[k + 1]); ctxB.lineTo(PX[k + V + 1], PY[k + V + 1]); ctxB.lineTo(PX[k + V], PY[k + V]);
          ctxB.closePath(); ctxB.fillStyle = col; ctxB.strokeStyle = col; ctxB.fill(); ctxB.stroke();
        }
      }
    }

    /* can the viewer see this point on the surface? */
    const dirX = -cP * sY, dirY = sP, dirZ = cP * cY;
    const seen = (x, y, z) => {
      for (let t = 0.05; t < 1.7; t += 0.05) {
        const px = x + dirX * t, pz = z + dirZ * t;
        if (Math.abs(px) > 1 || Math.abs(pz) > 1) return true;
        if (heightAt(px, pz) > y + dirY * t + 0.004) return false;
      }
      return true;
    };

    /* ski trails */
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    trails.forEach((tr) => {
      let pen = false;
      ctx.beginPath();
      tr.pts.forEach(([x, y, z]) => {
        if (!seen(x, y, z)) { pen = false; return; }
        proj(x, y, z, o); pen ? ctx.lineTo(o[0], o[1]) : ctx.moveTo(o[0], o[1]); pen = true;
      });
      ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 4; ctx.setLineDash([]); ctx.stroke();
      ctx.strokeStyle = tr.color; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.stroke();
    });
    ctx.setLineDash([]);

    /* annotations follow the surface and hide when the mountain is in the way */
    PINS.forEach((pin) => {
      proj(pin.p[0], pin.p[1], pin.p[2], o);
      pin.el.style.transform = "translate(" + o[0].toFixed(1) + "px," + o[1].toFixed(1) + "px)";
      pin.el.classList.toggle("is-hidden", !seen(pin.p[0], pin.p[1], pin.p[2]));
    });
  };

  const tick = (now) => {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (!document.hidden && topCanvas.offsetParent) {
      if (!drag) { yaw += vel * dt; vel += (AUTO - vel) * Math.min(1, dt * 1.4); }
      pitch += (pitchGoal - pitch) * Math.min(1, dt * 7);
      draw(now);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  story.addEventListener("pointerdown", (e) => {
    if (e.button > 0) return;
    drag = { x: e.clientX, y: e.clientY, t: performance.now() };
    story.classList.add("is-dragging");
    story.setPointerCapture(e.pointerId);
    if (hint) hint.classList.add("is-gone");
  });
  story.addEventListener("pointermove", (e) => {
    if (drag) {
      const now = performance.now(), dx = e.clientX - drag.x, dy = e.clientY - drag.y, dts = Math.max(0.008, (now - drag.t) / 1000);
      yaw += dx * 0.012; vel = clamp((dx * 0.012) / dts, -4, 4);
      pitchGoal = clamp(pitchGoal - dy * 0.004, 0.42, 0.95);
      drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
    } else if (e.pointerType !== "touch") {
      const r = story.getBoundingClientRect();
      pitchGoal = BASE_PITCH + (0.5 - (e.clientY - r.top) / r.height) * 0.12;
    }
  });
  const release = () => { if (!drag) return; drag = null; story.classList.remove("is-dragging"); pitchGoal = clamp(pitchGoal, 0.42, 0.95); };
  story.addEventListener("pointerup", release);
  story.addEventListener("pointercancel", release);
  story.addEventListener("pointerleave", () => { if (!drag) pitchGoal = BASE_PITCH; });
})();
