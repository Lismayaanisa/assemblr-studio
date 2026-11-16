(() => {
  const canvas = document.getElementById("waveBg");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false });
  if (!gl) return;

  // Assemblr Studio aurora: pale air, a touch of light pink, sky and brand blue, and a
  // little of the logo's violet at the deepest point. Proportions: mostly pale and blue.
  const FIELD = { scale: 0.5, distortion: 0.7, speed: 0.3 };
  const PALETTE = [
    ["#FAFCFF", 0.0],
    ["#F5A9CC", 0.24],
    ["#EDF2FE", 0.42],
    ["#6AAEF2", 0.62],
    ["#2F6FDB", 0.82],
    ["#6A57C9", 1.0],
  ];
  const N = PALETTE.length;
  // Rendered small; the CSS blur on the canvas is light so ribbons keep soft but readable edges.
  const RES = 0.5;

  const vert = `
    attribute vec2 a;
    void main() { gl_Position = vec4(a, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    #define N ${N}
    #define RES ${RES.toFixed(3)}
    uniform vec2 uRes;
    uniform float uTime;
    uniform float uScale, uDistortion;
    uniform vec2 uMouse;      // 0..1, smoothed, bottom-left origin
    uniform vec3 uPulse;      // click ripple: x, y (0..1), age in seconds (<0 = none)
    uniform float uMood;      // 0 sign in, 0.5 setup, 1 try it and welcome
    uniform vec3 uCol[N];
    uniform float uPos[N];

    vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m; m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uRes;
      float asp = uRes.x / uRes.y;
      vec2 p = (uv - 0.5) * vec2(asp, 1.0) / 1.5;
      float t = uTime;

      // Cursor: the field leans toward the pointer, and a click sends a ripple outward.
      vec2 m = (uMouse - 0.5) * vec2(asp, 1.0) / 1.5;
      vec2 dm = p - m;
      float md = length(dm);
      float pull = exp(-md * md * 7.0);
      p -= dm * 0.22 * pull;

      float ring = 0.0;
      if (uPulse.z >= 0.0) {
        vec2 pc = (uPulse.xy - 0.5) * vec2(asp, 1.0) / 1.5;
        vec2 dp = p - pc;
        float pd = length(dp);
        float front = uPulse.z * 0.75;
        ring = sin((pd - front) * 22.0) * exp(-pow(pd - front, 2.0) * 38.0) * exp(-uPulse.z * 1.5);
        p += normalize(dp + 1e-4) * ring * 0.045;
      }

      float r = length(p);
      float sw = 0.1 * 6.0 * exp(-r * 1.4) * sin(t * 0.35);
      p = mat2(cos(sw), -sin(sw), sin(sw), cos(sw)) * p;

      vec2 q = p * (0.14 + uScale * 0.36);
      vec2 w = vec2(snoise(q + vec2(0.0, t * 0.12)), snoise(q + vec2(5.2, 1.3) - t * 0.1));
      float n = snoise(q + uDistortion * 0.5 * w + vec2(t * 0.08, 0.0));

      // Random swells: each one's heading drifts through space and time.
      float a1 = 3.1416 * snoise(q * 0.55 + vec2(3.7, t * 0.05)) + uMood * 0.9;
      float a2 = 3.1416 * snoise(q * 0.45 + vec2(-8.1, 2.9 - t * 0.04)) + 2.1;
      vec2 d1 = vec2(cos(a1), sin(a1));
      vec2 d2 = vec2(cos(a2), sin(a2));
      float s1 = sin(dot(p, d1) * 4.2 + n * 1.8 * uDistortion - t * 1.0);
      float s2 = sin(dot(p, d2) * 5.6 + w.x * 1.4 + t * 0.8);
      float v = 0.3 * n + 0.5 * s1 + 0.32 * s2 + ring * 0.18;

      // Colour at the edges, a calm pale centre behind the card. Mood slides the mix a little.
      vec2 c = uv - 0.5;
      float edge = smoothstep(0.15, 0.75, length(c * vec2(1.25, 1.0)));
      float bias = mix(0.5, 0.62, edge) + (uMood - 0.5) * 0.06;
      v = clamp(bias + 0.34 * v, 0.0, 1.0);

      vec3 col = uCol[0];
      for (int i = 1; i < N; i++) {
        col = mix(col, uCol[i], smoothstep(uPos[i - 1], uPos[i], v));
      }

      // Silk: thin bright crests where a swell peaks, like light on folded fabric.
      float crest = smoothstep(0.82, 1.0, s1 * 0.5 + 0.5) * (0.4 + 0.6 * smoothstep(0.3, 0.8, v));
      float crest2 = smoothstep(0.88, 1.0, s2 * 0.5 + 0.5) * 0.6;
      col += vec3(0.55, 0.62, 0.8) * (crest * 0.22 + crest2 * 0.14);
      // Soft shade in the troughs gives the folds depth.
      col *= 1.0 - 0.07 * smoothstep(0.1, -0.9, s1) * smoothstep(0.35, 0.9, v);

      float topbar = smoothstep(1.0 - 160.0 * RES / uRes.y, 1.0, uv.y);
      float wash = 0.05 + 0.3 * exp(-dot(c, c) * 7.0) + 0.22 * smoothstep(0.2, 1.0, uv.x - uv.y + 0.3) + 0.5 * topbar;
      col = mix(col, vec3(0.975, 0.985, 1.0), clamp(wash, 0.0, 0.85));

      // Pointer light.
      col += vec3(0.95, 0.96, 1.0) * 0.14 * pull;
      col += vec3(1.0, 0.85, 0.92) * 0.1 * pow(pull, 3.0);

      // Gentle vignette keeps the corners deep and the middle airy.
      col *= 1.0 - 0.1 * smoothstep(0.45, 1.0, length(c * vec2(1.1, 1.0)) * 1.5);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (err) {
    console.warn("Wave background disabled:", err);
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n) => gl.getUniformLocation(prog, n);
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  gl.uniform3fv(u("uCol"), PALETTE.flatMap(([c]) => hex(c)));
  gl.uniform1fv(u("uPos"), PALETTE.map(([, p]) => p));
  gl.uniform1f(u("uScale"), FIELD.scale);
  gl.uniform1f(u("uDistortion"), FIELD.distortion);
  const uRes = u("uRes");
  const uTime = u("uTime");
  const uMouse = u("uMouse");
  const uPulse = u("uPulse");
  const uMood = u("uMood");

  function resize() {
    const w = Math.max(2, Math.round(innerWidth * RES));
    const h = Math.max(2, Math.round(innerHeight * RES));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  }

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(pointer: fine)");
  let raf = 0;
  let clock = 8;
  let last = performance.now();

  // Pointer state. Without a mouse (touch, or idle) the light drifts on its own path.
  const target = { x: 0.5, y: 0.5 };
  const cur = { x: 0.5, y: 0.5 };
  let lastMove = -1e9;
  let pulse = { x: 0.5, y: 0.5, age: -1 };
  let mood = 0;
  const MOODS = { auth: 0, setup: 0.5, try: 1, welcome: 1 };

  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    target.x = e.clientX / innerWidth;
    target.y = 1 - e.clientY / innerHeight;
    lastMove = performance.now();
  }, { passive: true });
  addEventListener("pointerdown", (e) => {
    if (reduce.matches) return;
    pulse = { x: e.clientX / innerWidth, y: 1 - e.clientY / innerHeight, age: 0 };
    if (!raf) start();
  }, { passive: true });

  function draw(now) {
    const dt = Math.min(now - last, 64) / 1000;
    clock += dt * FIELD.speed * 1.6;
    last = now;
    resize();

    const idle = now - lastMove > 3500 || !fine.matches;
    if (idle) {
      target.x = 0.5 + 0.34 * Math.sin(clock * 0.37);
      target.y = 0.5 + 0.26 * Math.sin(clock * 0.53 + 1.3);
    }
    const k = 1 - Math.exp(-dt * (idle ? 1.2 : 5));
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;

    if (pulse.age >= 0) {
      pulse.age += dt;
      if (pulse.age > 3) pulse.age = -1;
    }
    const goal = MOODS[document.body.dataset.phase] ?? 0;
    mood += (goal - mood) * (1 - Math.exp(-dt * 1.4));

    gl.uniform1f(uTime, clock);
    gl.uniform2f(uMouse, cur.x, cur.y);
    gl.uniform3f(uPulse, pulse.x, pulse.y, pulse.age);
    gl.uniform1f(uMood, mood);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = reduce.matches || document.hidden ? 0 : requestAnimationFrame(draw);
  }

  function start() {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(draw);
  }

  addEventListener("resize", () => { if (!raf) start(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });
  reduce.addEventListener?.("change", start);

  start();
  canvas.closest(".backdrop")?.classList.add("is-wave");
})();
