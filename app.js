(() => {
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("anim")));

  const ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"/><path d="M18 5v17"/><path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>',
    bellOff: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"/><path d="m2 2 20 20"/><path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    pointer: '<path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-4 0"/><path d="M14 10V9a2 2 0 0 0-4 0v1"/><path d="M10 9.5V4a2 2 0 0 0-4 0v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    flag: '<path d="M4 22V4"/><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>',
    move3d: '<path d="M5 3v16h16"/><path d="m5 19 6-6"/><path d="m2 6 3-3 3 3"/><path d="m18 16 3 3-3 3"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
    backpack: '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 10h8"/><path d="M8 18h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
    graduation: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    clipboardCheck: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    puzzle: '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>',
    microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="m12 7 4 2.2v4.6L12 16l-4-2.2V9.2z"/>',
    trending: '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    flask: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
    pen: '<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>',
    landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
    testTube: '<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>',
    atom: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    google: '<path d="M17.66 6.34A8 8 0 1 0 20 12h-8"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    tiktok: '<path d="M15 3v11.5a4.5 4.5 0 1 1-4.5-4.5"/><path d="M15 3a5 5 0 0 0 5 5"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
  };
  const icon = (name) =>
    `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const paintIcons = (root = document) =>
    root.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  paintIcons();

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  /* ---------- Bahasa Indonesia ---------- */
  // Copy is written in English; when Indonesia is picked, every English string on screen is swapped for its entry here.
  const ID = {
    // Shared
    "Next": "Lanjut", "Back": "Kembali", "Continue": "Lanjutkan", "Other": "Lainnya", "Optional": "Opsional",
    "Edit": "Ubah", "Close": "Tutup", "Finish": "Selesai", "Up to 2": "Maks. 2",
    "Great pick!": "Pilihan bagus!", "Love that!": "Suka banget!", "Sounds fun!": "Kedengarannya seru!",
    "Nice one!": "Mantap!", "Got it!": "Oke, siap!",
    "Hehe, that tickles!": "Hehe, geli!", "Hi again!": "Hai lagi!", "You've got this!": "Kamu pasti bisa!",
    "Choose one to continue": "Pilih salah satu untuk lanjut",
    "Setup progress": "Progres pengisian",
    "You": "Kamu", "Source": "Sumber", "Phone": "Telepon", "Role": "Peran", "Goal": "Tujuan", "Subject": "Mata pelajaran", "Try it": "Coba",

    // Step 1: name + look
    "What's your name?": "Siapa namamu?", "Hi, I'm blr!": "Hai, aku blr!",
    "Your name": "Nama kamu", "Type your name": "Ketik namamu", "Pick your look": "Pilih tampilanmu",
    "Add your name to continue": "Isi namamu untuk lanjut",
    "Looking good!": "Keren!", "Love that look!": "Suka gayanya!", "So you!": "Kamu banget!", "Photo removed.": "Foto dihapus.",
    "Upload your own photo": "Unggah fotomu sendiri", "Remove your photo": "Hapus fotomu", "Remove photo": "Hapus foto",
    "Straw hat and camera": "Topi jerami dan kamera", "Aviator": "Pilot", "Bike helmet": "Helm sepeda",
    "Artist beret": "Baret seniman", "Backwards cap": "Topi terbalik", "Headphones": "Headphone", "Astronaut": "Astronaut",
    "Girl in a hijab": "Anak perempuan berhijab", "Educator": "Pendidik", "Student": "Pelajar", "Innovator": "Inovator",
    "Songkok": "Songkok", "Chada crown": "Mahkota chada",
    "Safa turban": "Sorban safa", "Ghutra and agal": "Ghutra dan agal",
    "Cowboy hat": "Topi koboi", "Guard bearskin": "Topi bulu pengawal",

    // Step 2: source
    "How did you first hear about Assemblr Studio?": "Dari mana kamu pertama kali tahu Assemblr Studio?",
    "Google search": "Pencarian Google", "Blog or article": "Blog atau artikel", "Events": "Acara",
    "Exhibition, webinar, or workshop": "Pameran, webinar, atau workshop",
    "Teacher, colleague, friend, or family": "Guru, rekan kerja, teman, atau keluarga",
    "Where did you hear about us?": "Kamu tahu kami dari mana?", "Which event was it?": "Acara apa?",
    "For example, a teacher workshop or an education expo": "Misalnya, workshop guru atau pameran pendidikan",
    "Tell us where in a few words": "Ceritakan singkat dari mana",

    // Step 3: phone
    "Stay in the Loop": "Tetap terhubung",
    "Only for your account. We never share it.": "Hanya untuk akunmu. Kami tidak akan membagikannya.",
    "Phone number": "Nomor HP", "Country code": "Kode negara", "Search country": "Cari negara", "No country found": "Negara tidak ditemukan",
    "Be the first to hear about new features, upcoming workshops, and occasional offers on WhatsApp.": "Jadi yang pertama tahu fitur baru, workshop mendatang, dan penawaran sesekali lewat WhatsApp.",
    "Yes, please": "Ya, boleh", "Not now": "Nanti saja", "Skip for now": "Lewati dulu",
    "Enter your phone number to continue": "Isi nomor HP-mu untuk lanjut",
    "This number looks too short. Please check it.": "Nomor ini sepertinya terlalu pendek. Coba periksa lagi.",
    "Yay! Only the good stuff.": "Asyik! Hanya info yang bermanfaat.", "No worries!": "Tidak apa-apa!",
    "Malaysia": "Malaysia", "Singapore": "Singapura", "Philippines": "Filipina", "Thailand": "Thailand", "Vietnam": "Vietnam",
    "Brunei": "Brunei", "Timor-Leste": "Timor Leste", "India": "India", "Saudi Arabia": "Arab Saudi",
    "United Arab Emirates": "Uni Emirat Arab", "Japan": "Jepang", "South Korea": "Korea Selatan", "Australia": "Australia",
    "Netherlands": "Belanda", "United Kingdom": "Inggris", "United States": "Amerika Serikat",

    // Step 4: role
    "Which role fits you best?": "Peran mana yang paling cocok untukmu?", "You can change this later.": "Kamu bisa mengubahnya nanti.",
    "Creator/Innovator": "Kreator/Inovator", "Tell us more!": "Ceritakan lebih lanjut!", "Your role": "Peranmu",
    "For example, parent or librarian": "Misalnya, orang tua atau pustakawan",
    "Pick the role that fits you": "Pilih peran yang cocok untukmu",
    "Hi Student!": "Hai, Pelajar!", "Hi Educator!": "Hai, Pendidik!", "Hi Creator!": "Hai, Kreator!", "Hi there!": "Hai!",
    "Picking ideas for students": "Memilih ide untuk pelajar", "Picking ideas for educators": "Memilih ide untuk pendidik",
    "Picking ideas for creators": "Memilih ide untuk kreator", "Picking ideas for you": "Memilih ide untukmu",
    "Setting up your space": "Menyiapkan ruangmu",

    // Step 5: goal
    "What would you like to do?": "Apa yang ingin kamu lakukan?",
    "What brings you here?": "Apa yang membawamu ke sini?",
    "Make a project for class": "Membuat proyek untuk kelas",
    "Make a project for an exam or assessment": "Membuat proyek untuk ujian atau asesmen",
    "Make a project for a competition or exhibition": "Membuat proyek untuk lomba atau pameran",
    "Learn to create with 3D and AR": "Belajar berkreasi dengan 3D dan AR",
    "I just want to explore": "Aku cuma ingin menjelajah",
    "Something else": "Lainnya",
    "A little about you": "Sedikit tentang kamu",
    "This helps me set things up for you.": "Ini membantuku menyiapkan semuanya untukmu.",
    "How old are you?": "Berapa umurmu?",
    "Your age": "Umurmu", "Years": "Tahun", "years": "tahun", "Age": "Umur",
    "Your age in years": "Umurmu dalam tahun", "years old": "tahun",
    "Just type a number.": "Cukup ketik angkanya.",
    "Type your age to continue": "Ketik umurmu untuk lanjut",
    "Type an age between 4 and 99": "Ketik umur antara 4 dan 99",
    "Enter your age in years": "Isi umurmu dalam tahun",
    "Enter an age from 4 to 99": "Isi umur dari 4 sampai 99",
    "How are you joining Assemblr Studio?": "Bagaimana kamu bergabung dengan Assemblr Studio?",
    "Through my school": "Lewat sekolahku",
    "With a parent or guardian": "Bersama orang tua atau wali",
    "On my own": "Sendiri",
    "From age 13": "Mulai umur 13",
    "Parent or guardian's email": "Email orang tua atau wali",
    "We'll let them know about your account. If you signed up with their email, you can use the same one.": "Kami akan memberi tahu mereka tentang akunmu. Kalau kamu daftar pakai email mereka, kamu bisa pakai email yang sama.",
    "Use the email I signed up with": "Pakai email yang aku pakai untuk daftar",
    "If you're under 13": "Kalau kamu di bawah 13 tahun",
    "Your projects are private": "Proyekmu bersifat privat",
    "by default. Only you, your parent or guardian, and your teacher can see them.": "secara bawaan. Hanya kamu, orang tua atau walimu, dan gurumu yang bisa melihatnya.",
    "Because you're under 13": "Karena kamu di bawah 13 tahun",
    "Your projects are private.": "Proyekmu bersifat privat.",
    "Only you, your parent or guardian, and your teacher can see them.": "Hanya kamu, orang tua atau walimu, dan gurumu yang bisa melihatnya.",
    "No ads.": "Tanpa iklan.",
    "You won't see ads or receive promotional messages.": "Kamu tidak akan melihat iklan atau menerima pesan promosi.",
    "We'll let them know about your account.": "Kami akan memberi tahu mereka tentang akunmu.",
    "My parent's email is the same as the one I signed up with": "Email orang tuaku sama dengan email yang aku pakai untuk daftar",
    "No marketing.": "Tanpa pemasaran.",
    "Marketing is not allowed on this account. No offers, ads, or promo messages.": "Pemasaran tidak diizinkan untuk akun ini. Tanpa penawaran, iklan, atau pesan promo.",
    "You're under 13, so marketing stays off. We'll only message you about your account.": "Kamu di bawah 13 tahun, jadi pemasaran dimatikan. Kami hanya akan mengirim pesan tentang akunmu.",
    "We don't send marketing to anyone under 13.": "Kami tidak mengirim pemasaran ke siapa pun di bawah 13 tahun.",
    "Choose how you're joining": "Pilih cara kamu bergabung",
    "Add your parent or guardian's email": "Tambahkan email orang tua atau wali",
    "This email doesn't look right. Please check it.": "Email ini sepertinya kurang tepat. Coba cek lagi.",
    "Ask your school or a grown-up to join with you.": "Ajak sekolahmu atau orang dewasa untuk bergabung bersamamu.",
    "Thanks! I'll keep things extra safe for you.": "Terima kasih! Aku akan menjaga semuanya tetap aman untukmu.",
    "You can join on your own from age 13. Pick your school or a parent for now.": "Kamu bisa bergabung sendiri mulai umur 13. Untuk sekarang, pilih sekolah atau orang tua.",
    "Create a project for my class or assignment": "Membuat proyek untuk kelas atau tugasku",
    "Create a project for my thesis or research": "Membuat proyek untuk skripsi atau risetku",
    "Create a project for an exam, assessment, or qualification": "Membuat proyek untuk ujian, asesmen, atau sertifikasi",
    "Create a project for a competition or exhibition": "Membuat proyek untuk lomba atau pameran",
    "Learn how to create AR or immersive experiences": "Belajar membuat AR atau pengalaman imersif",
    "Create an interactive learning project": "Membuat proyek belajar interaktif",
    "Build an AR project for my portfolio": "Membuat proyek AR untuk portofolioku",
    "Explore AR and see what I can create": "Menjelajahi AR dan melihat apa yang bisa kubuat",
    "Use interactive materials for my lessons": "Menggunakan materi interaktif saat mengajar",
    "University student": "Mahasiswa", "Parent": "Orang tua", "Lecturer": "Dosen",
    "Picking ideas for university students": "Memilih ide untuk mahasiswa", "Picking ideas for parents": "Memilih ide untuk orang tua",
    "Picking ideas for lecturers": "Memilih ide untuk dosen",
    "a university student": "seorang mahasiswa", "a parent": "orang tua", "a lecturer": "seorang dosen",
    "For example, librarian or principal": "Misalnya, pustakawan atau kepala sekolah",
    "Use ready-to-use materials for my lessons": "Menggunakan materi siap pakai untuk pelajaranku",
    "Create a project for my students": "Membuat proyek untuk siswaku",
    "Help my child with school assignments": "Membantu anakku mengerjakan tugas sekolah",
    "Help my child understand difficult concepts": "Membantu anakku memahami konsep yang sulit",
    "Make learning more fun and engaging for my child": "Membuat belajar lebih seru dan menarik untuk anakku",
    "Help my child develop creative and digital skills": "Membantu anakku mengembangkan keterampilan kreatif dan digital",
    "Introduce my child to interactive 3D and AR": "Mengenalkan anakku pada 3D interaktif dan AR",
    "Introduce AR/Immersive tech to my university students": "Mengenalkan teknologi AR/imersif ke mahasiswaku",
    "What subject and year are you studying?": "Kamu belajar mata kuliah apa dan di tahun ke berapa?",
    "What field and year are you studying?": "Kamu belajar bidang apa dan di tahun ke berapa?", "What year are you in?": "Kamu di tahun ke berapa?",
    "What subject and grade is your child in?": "Anakmu belajar mata pelajaran apa dan kelas berapa?", "What grade is your child in?": "Anakmu kelas berapa?",
    "What subject and year do you teach?": "Kamu mengajar mata kuliah apa dan tahun ke berapa?", "Which year(s) do you teach?": "Kamu mengajar tahun ke berapa?",
    "Postgraduate": "Pascasarjana",
    "use ready-made materials in your lessons": "menggunakan materi siap pakai untuk pelajaranmu",
    "create a project for your students": "membuat proyek untuk siswamu",
    "explore AR and see what you can create": "menjelajahi AR dan melihat apa yang bisa kamu buat",
    "help your child with school assignments": "membantu anakmu mengerjakan tugas sekolah",
    "help your child understand difficult concepts": "membantu anakmu memahami konsep yang sulit",
    "make learning more fun for your child": "membuat belajar lebih seru untuk anakmu",
    "help your child build creative and digital skills": "membantu anakmu membangun keterampilan kreatif dan digital",
    "introduce your child to interactive 3D and AR": "mengenalkan anakmu pada 3D interaktif dan AR",
    "introduce AR to your university students": "mengenalkan AR ke mahasiswamu",
    "Start from thousands of 3D objects and see what you can make.": "Mulai dari ribuan objek 3D dan lihat apa yang bisa kamu buat.",
    "Create a 3D/AR project with your child": "Buat proyek 3D/AR bersama anakmu",
    "Turn your child's school assignment into a 3D scene you build together.": "Ubah tugas sekolah anakmu jadi scene 3D yang kalian buat bersama.",
    "Explore hard topics in 3D with your child": "Jelajahi topik sulit dalam 3D bersama anakmu",
    "See the solar system, a cell, or a volcano up close in your living room.": "Lihat tata surya, sel, atau gunung berapi dari dekat di ruang tamumu.",
    "Make learning feel like play": "Buat belajar terasa seperti bermain",
    "Drag in 3D objects together and see them appear in your room with AR.": "Seret objek 3D bersama dan lihat muncul di ruanganmu dengan AR.",
    "Create your child's first 3D/AR project": "Buat proyek 3D/AR pertama anakmu",
    "Your child designs, builds, and shares it. You cheer them on.": "Anakmu merancang, membuat, dan membagikannya. Kamu menyemangatinya.",
    "Create your first 3D/AR project with your child": "Buat proyek 3D/AR pertama bersama anakmu",
    "Point your phone at the room and watch a 3D model appear.": "Arahkan ponselmu ke ruangan dan lihat model 3D muncul.",
    "Ready-to-use lesson materials, with 3D on every slide for your class to explore.": "Materi pelajaran siap pakai, dengan 3D di setiap slide untuk dijelajahi kelasmu.",
    "Create your first 3D/AR project for class": "Buat proyek 3D/AR pertamamu untuk kelas",
    "Show your students what AR can do, then share it with a link.": "Tunjukkan kemampuan AR ke mahasiswamu, lalu bagikan lewat tautan.",
    "Create an interactive 3D game together": "Buat game 3D interaktif bersama",
    "Try AI-3D Generation: change an image into 3D": "Coba AI-3D Generation: ubah gambar menjadi 3D",
    "Upload a sketch or describe it, and AI builds the 3D object in minutes.": "Unggah sketsa atau tulis deskripsinya, lalu AI membuatkan objek 3D dalam hitungan menit.",
    "Create a project/activity for my students": "Membuat proyek/aktivitas untuk siswaku",
    "Create a project for my research": "Membuat proyek untuk risetku",
    "Introduce AR/Immersive tech to my students": "Mengenalkan teknologi AR/imersif ke siswaku",
    "Improve my digital teaching skills": "Meningkatkan keterampilan mengajar digitalku",
    "Visualize difficult or abstract concepts": "Memvisualkan konsep yang sulit atau abstrak",
    "Make my lessons more engaging": "Membuat pelajaranku lebih menarik",
    "Teach students how AR works": "Mengajarkan cara kerja AR ke siswa",
    "Explore how I could use AR": "Mencari tahu cara memakai AR",
    "Train educators": "Melatih pendidik", "Develop learning programs": "Mengembangkan program belajar",
    "Build an education product": "Membangun produk pendidikan", "Create AR for clients": "Membuat AR untuk klien",
    "Develop students' STEM, coding, art, or design skills": "Mengembangkan keterampilan STEM, coding, seni, atau desain siswa",
    "Evaluate AR for my organization": "Menilai AR untuk organisasiku",
    "Explore AR for a business opportunity": "Menjajaki AR untuk peluang bisnis",
    "Create an AR experience": "Membuat pengalaman AR", "Create educational content": "Membuat konten edukasi",
    "Professional project": "Proyek profesional", "Community or organization": "Komunitas atau organisasi",
    "Learning or exploration": "Belajar atau eksplorasi", "Personal project": "Proyek pribadi",
    "Who is organizing this?": "Siapa penyelenggaranya?",
    "For example, an assignment from the local education office, a PPG teaching-practice task, or a Cambridge, IB, or P5 project":
      "Misalnya, tugas dari dinas pendidikan, tugas praktik mengajar PPG, atau proyek Cambridge, IB, atau P5",
    "For example, an assignment from the local education office, a PPG teaching-practice task, or a Cambridge project":
      "Misalnya, tugas dari dinas pendidikan, tugas praktik mengajar PPG, atau proyek Cambridge",
    "School, university, or institution": "Sekolah, kampus, atau lembaga",
    "What kind of research is this?": "Riset seperti apa ini?",
    "For example, a thesis or a BIMA research grant": "Misalnya, skripsi atau hibah riset BIMA",
    "Thesis, BIMA grant, or another project": "Skripsi, hibah BIMA, atau proyek lain",
    "What is the event called?": "Apa nama acaranya?",
    "For example, a school project showcase or World Robot Olympiad (WRO) 2026": "Misalnya, pameran proyek sekolah atau World Robot Olympiad (WRO) 2026",
    "Competition or exhibition name": "Nama lomba atau pameran",
    "Personal event or institutional?": "Acara pribadi atau lembaga?", "Personal event": "Acara pribadi", "Institutional": "Lembaga",
    "Tell us in a few words": "Ceritakan singkat saja", "Tell us a little more": "Ceritakan sedikit lagi",
    "What brings you here?": "Apa yang membawamu ke sini?",
    "A few words": "Beberapa kata", "Your goal, in a few words": "Tujuanmu, dalam beberapa kata",
    "What's your motivation?": "Apa motivasimu?",
    "Add a few words about your motivation": "Tulis singkat motivasimu",
    "Press": "Tekan", "to save": "untuk menyimpan", "Need ideas? Try one": "Butuh ide? Coba salah satu", "Examples": "Contoh",
    "Add a few words or pick an idea": "Tulis beberapa kata atau pilih ide",

    // Step 6: subject + grade
    "What do you teach?": "Apa yang kamu ajarkan?", "What grade(s) do you teach?": "Kamu mengajar kelas berapa?",
    "What subject and grade do you teach?": "Kamu mengajar mata pelajaran dan kelas apa?",
    "What subject and grade are you studying?": "Mata pelajaran dan kelas apa yang kamu pelajari?",
    "Which subject and grade is it for?": "Untuk mata pelajaran dan kelas apa?",
    "What subject are you learning?": "Mata pelajaran apa yang kamu pelajari?", "What grade are you in?": "Kamu kelas berapa?",
    "What subject is this for?": "Ini untuk mata pelajaran apa?", "Which grade is it for?": "Ini untuk kelas berapa?",
    "Optional, but it helps me pick examples.": "Opsional, tapi membantuku memilih contoh.",
    "What are you learning?": "Apa yang sedang kamu pelajari?",
    "Which subjects would you like to focus on?": "Mata pelajaran apa yang ingin kamu fokuskan?",
    "What would you like to help your child learn?": "Apa yang ingin kamu bantu anakmu pelajari?",
    "Which grades are you creating for?": "Kamu membuat untuk kelas berapa?",
    "Tell me a little more so I can suggest examples for you.": "Ceritakan sedikit lagi supaya aku bisa menyarankan contoh untukmu.",
    "Which subject is your project about?": "Proyekmu tentang mata pelajaran apa?",
    "Which subject interests you?": "Mata pelajaran apa yang kamu minati?",
    "Pick a subject": "Pilih mata pelajaran",
    "Pick a field": "Pilih bidang",
    "What field and year do you teach?": "Kamu mengajar bidang apa dan tahun ke berapa?",
    "Education": "Pendidikan", "Educational technology": "Teknologi pendidikan", "Instructional design": "Desain pembelajaran",
    "Graphic design": "Desain grafis", "Product design": "Desain produk", "Media and visual communication": "Media dan komunikasi visual",
    "Visual communication": "Komunikasi visual",
    "Animation and media": "Animasi dan media", "Computer science": "Ilmu komputer", "Information technology": "Teknologi informasi",
    "Software engineering": "Rekayasa perangkat lunak", "Game development": "Pengembangan game",
    "Which subject is your assignment for?": "Tugasmu untuk mata pelajaran apa?",
    "Which subject is your assessment for?": "Asesmenmu untuk mata pelajaran apa?",
    "Which subject is your project for?": "Proyekmu untuk mata pelajaran apa?", "Other subject": "Mata pelajaran lain", "Which subject?": "Mata pelajaran apa?",
    "Other grade": "Kelas lain", "Which grade or level?": "Kelas atau jenjang apa?",
    "Math": "Matematika", "Science": "IPA", "Design": "Desain", "History": "Sejarah", "Chemistry": "Kimia", "Physics": "Fisika",
    "Programming": "Pemrograman", "Language": "Bahasa", "Biology": "Biologi",
    "Kindergarten": "TK", "K": "TK", "Elementary": "SD", "Junior high": "SMP", "Senior high": "SMA/SMK", "Beyond school": "Setelah sekolah", "University": "Universitas",
    "You can pick up to 2 subjects. Tap one to remove it.": "Kamu bisa pilih maksimal 2 mata pelajaran. Ketuk salah satu untuk menghapusnya.",
    "You can pick up to 2 grades. Tap one to remove it.": "Kamu bisa pilih maksimal 2 kelas. Ketuk salah satu untuk menghapusnya.",
    "Perfect, you're all set!": "Sempurna, semua sudah siap!",

    // Step 7: try it
    "Interactive 3D project": "Proyek 3D interaktif", "Interactive 3D project: the human heart": "Proyek 3D interaktif: jantung manusia",
    "Interactive 3D project: geometry coordinates (X, Y, Z)": "Proyek 3D interaktif: koordinat geometri (X, Y, Z)",
    "Geometry coordinates (X, Y, Z), an interactive 3D project": "Koordinat geometri (X, Y, Z), proyek 3D interaktif",
    "Interactive 3D project: the life cycle of a butterfly": "Proyek 3D interaktif: siklus hidup kupu-kupu",
    "The life cycle of a butterfly, an interactive 3D project": "Siklus hidup kupu-kupu, proyek 3D interaktif",
    "Human Heart, an interactive 3D project": "Jantung manusia, proyek 3D interaktif",
    "Explore these interactive materials": "Jelajahi materi interaktif ini",
    "Explore this interactive learning slide": "Jelajahi slide pembelajaran interaktif ini",
    "Explore this teaching inspiration": "Jelajahi inspirasi mengajar ini", "Explore coding with AR": "Jelajahi coding dengan AR",
    "Explore this AR book": "Jelajahi buku AR ini", "Explore this AR tutorial": "Jelajahi tutorial AR ini", "Explore this project": "Jelajahi proyek ini",
    "Litosphere, a 3D model of Earth's layers": "Litosfer, model 3D lapisan Bumi",
    "An interactive learning slide about temperature, heat and expansion": "Slide belajar interaktif tentang suhu, kalor, dan pemuaian",
    "A lesson plan for 3D coordinates (X, Y, Z) with an interactive 3D model": "Rencana pembelajaran koordinat 3D (X, Y, Z) dengan model 3D interaktif",
    "A lesson plan for eye anatomy with an interactive 3D model": "Rencana pembelajaran anatomi mata dengan model 3D interaktif",
    "A lesson plan for writing short descriptive text with an interactive 3D scene": "Rencana pembelajaran menulis teks deskriptif pendek dengan adegan 3D interaktif",
    "Energy forms and changes, an interactive 3D project": "Bentuk dan perubahan energi, proyek 3D interaktif",
    "Interactive 3D project: energy forms and changes": "Proyek 3D interaktif: bentuk dan perubahan energi",
    "Agriculture and organic farming, an interactive 3D project": "Pertanian dan pertanian organik, proyek 3D interaktif",
    "Interactive 3D project: agriculture and organic farming": "Proyek 3D interaktif: pertanian dan pertanian organik",
    "Video tutorial: building a simple interactive scene with animation": "Video tutorial: membuat adegan interaktif sederhana dengan animasi",
    "AR tutorial video: building a simple interactive scene": "Video tutorial AR: membuat adegan interaktif sederhana",
    "Video tutorial: coding a third-person game camera": "Video tutorial: coding kamera game sudut pandang orang ketiga",
    "AR tutorial video: coding a third-person game camera": "Video tutorial AR: coding kamera game sudut pandang orang ketiga",
    "A tutorial for coding with AR": "Tutorial coding dengan AR",
    "An AR book with a 3D Earth rising from the page": "Buku AR dengan Bumi 3D yang muncul dari halaman",
    "Interactive 3D material: layers of the Earth": "Materi 3D interaktif: lapisan Bumi",
    "See in full screen": "Lihat layar penuh", "See it again": "Lihat lagi",
    "See it in full screen first": "Lihat dalam layar penuh dulu", "Edit answers": "Ubah jawaban",

    // Welcome
    "Slides": "Slide", "Let's start Assemblr Studio": "Ayo mulai Assemblr Studio",
    "Create your class project in AR": "Buat proyek kelasmu dalam AR",
    "Add 3D objects, then view the project in your room.": "Tambahkan objek 3D, lalu lihat proyeknya di ruanganmu.",
    "Build your assessment in 3D": "Buat asesmenmu dalam 3D",
    "Make your competition entry stand out": "Buat karya lombamu menonjol",
    "Bring it into the room with AR.": "Hadirkan ke dalam ruangan dengan AR.",
    "Learn to create AR by making a project": "Belajar membuat AR dengan membuat proyek",
    "Explore what you can create in AR": "Jelajahi apa yang bisa kamu buat dalam AR",
    "Start with thousands of 3D objects and build from there.": "Mulai dari ribuan objek 3D, lalu bangun dari situ.",
    "Start your first AR project": "Mulai proyek AR pertamamu",
    "Pick 3D objects and view them in your room.": "Pilih objek 3D dan lihat di ruanganmu.",
    "Show your research in 3D": "Tunjukkan risetmu dalam 3D",
    "Turn your findings into a scene your examiners can explore.": "Ubah temuanmu jadi scene yang bisa dijelajahi penguji.",
    "Start an AR project and share it": "Mulai proyek AR dan bagikan",
    "Pick 3D objects, then send the project with a link.": "Pilih objek 3D, lalu kirim proyeknya lewat tautan.",
    "Help your child finish a school project": "Bantu anakmu menyelesaikan proyek sekolah",
    "Build the assignment together as a 3D scene.": "Buat tugasnya bersama sebagai scene 3D.",
    "Explain a hard topic in 3D": "Jelaskan topik yang sulit dalam 3D",
    "Look at the solar system, a cell, or a volcano up close.": "Lihat tata surya, sel, atau gunung berapi dari dekat.",
    "Build a first project with your child": "Buat proyek pertama bersama anakmu",
    "They design it and share it. You help along the way.": "Mereka merancang dan membagikannya. Kamu membantu di sepanjang jalan.",
    "Show your child AR for the first time": "Tunjukkan AR ke anakmu untuk pertama kali",
    "Create a project with your child": "Buat proyek bersama anakmu",
    "Pick 3D objects and build it together.": "Pilih objek 3D dan buat bersama.",
    "Teach with ready-made 3D slides": "Ajar dengan slide 3D yang sudah jadi",
    "Open a lesson and let your class explore the 3D on each slide.": "Buka pelajaran dan biarkan kelasmu menjelajahi 3D di setiap slide.",
    "Turn a lesson into an activity": "Ubah pelajaran jadi aktivitas",
    "Students tap, rotate, and explore the 3D on the slide.": "Siswa mengetuk, memutar, dan menjelajahi 3D di slide.",
    "Assess your students with a 3D slide": "Nilai siswamu dengan slide 3D",
    "They show what they know by exploring a model.": "Mereka menunjukkan pemahamannya dengan menjelajahi model.",
    "Introduce AR with a ready slide": "Kenalkan AR dengan slide yang sudah jadi",
    "Open it in class. No setup needed.": "Buka di kelas. Tidak perlu persiapan.",
    "Practice teaching with 3D slides": "Latih cara mengajar dengan slide 3D",
    "Open a complete lesson and present it today.": "Buka pelajaran yang sudah lengkap dan presentasikan hari ini.",
    "Present a lesson with 3D": "Presentasikan pelajaran dengan 3D",
    "Use ready slides for the subject you teach.": "Pakai slide siap pakai untuk mata pelajaran yang kamu ajar.",
    "Share your research in 3D": "Bagikan risetmu dalam 3D",
    "Turn your findings into a project people can explore.": "Ubah temuanmu jadi proyek yang bisa dijelajahi orang.",
    "Train educators with a ready project": "Latih pendidik dengan proyek yang sudah jadi",
    "Give them a project they can try in their own class.": "Beri mereka proyek yang bisa dicoba di kelasnya sendiri.",
    "Show your students what AR can do": "Tunjukkan ke mahasiswamu apa yang bisa dilakukan AR",
    "Share a project with a link they can open.": "Bagikan proyek lewat tautan yang bisa mereka buka.",
    "Build an activity for your learning program": "Buat aktivitas untuk program belajarmu",
    "Create it once, then share it with your students.": "Buat sekali, lalu bagikan ke mahasiswamu.",
    "Try creating your first AR project": "Coba buat proyek AR pertamamu",
    "Start with thousands of 3D objects and see what you can build.": "Mulai dari ribuan objek 3D dan lihat apa yang bisa kamu bangun.",
    "Start an AR project": "Mulai proyek AR",
    "Pick 3D objects, then share the result with a link.": "Pilih objek 3D, lalu bagikan hasilnya lewat tautan.",
    "Create a 3D game without writing code": "Buat game 3D tanpa menulis kode",
    "Snap blocks together so objects move, react, and keep score.": "Susun blok agar objek bergerak, bereaksi, dan mencatat skor.",
    "Work on one project with your classmates": "Kerjakan satu proyek bersama teman sekelasmu",
    "Invite them in and build it together, at the same time.": "Undang mereka dan buat bersama, di waktu yang sama.",
    "Describe it, or upload a sketch. AI builds the 3D object for your scene.": "Jelaskan, atau unggah sketsa. AI membuat objek 3D untuk scene-mu.",
    "Create a 3D game together": "Buat game 3D bersama",
    "Ask students to present ideas in 3D": "Minta siswa mempresentasikan ide dalam 3D",
    "They explain an idea, or build a learning game, using 3D and AR.": "Mereka menjelaskan ide, atau membuat game belajar, dengan 3D dan AR.",
    "Share work with your class": "Bagikan pekerjaan ke kelasmu",
    "Invite students, send materials, and see their projects in one place.": "Undang siswa, kirim materi, dan lihat proyek mereka di satu tempat.",
    "Add AR to a book, poster, or product": "Tambahkan AR ke buku, poster, atau produk",
    "Make 3D and video appear from a book, card, poster, shirt, or backdrop, or place it on a website.": "Munculkan 3D dan video dari buku, kartu, poster, baju, atau backdrop, atau taruh di website.",

    "You're all set": "Semua sudah siap", "You're ready to try Assemblr.": "Kamu siap mencoba Assemblr.",
    "Create a simple 3D/AR project": "Buat proyek 3D/AR sederhana",
    "Build your class assignment in 3D, then view it in AR.": "Buat tugas kelasmu dalam 3D, lalu lihat dalam AR.",
    "Create a 3D/AR project for your research": "Buat proyek 3D/AR untuk risetmu",
    "Show your thesis findings as a 3D scene your examiners can explore.": "Tampilkan temuan skripsimu dalam scene 3D yang bisa dijelajahi penguji.",
    "Create a 3D/AR project for your assessment": "Buat proyek 3D/AR untuk asesmenmu",
    "Turn your task into a 3D scene your examiner can explore.": "Ubah tugasmu jadi scene 3D yang bisa dijelajahi penguji.",
    "Create a 3D/AR project that stands out": "Buat proyek 3D/AR yang menonjol",
    "Bring your competition entry to life in AR.": "Hidupkan karya lombamu dengan AR.",
    "Create your first 3D/AR project": "Buat proyek 3D/AR pertamamu",
    "Learn AR by doing. Drag in a 3D object and see it in your room.": "Belajar AR sambil praktik. Seret objek 3D dan lihat di ruanganmu.",
    "Start from thousands of 3D objects, not a blank page.": "Mulai dari ribuan objek 3D, bukan halaman kosong.",
    "Create an interactive 3D game": "Buat game 3D interaktif",
    "Snap Visual Coding blocks together to make objects move, react, and score. No typing required.": "Susun blok coding visual agar objek bisa bergerak, bereaksi, dan mencetak skor. Tanpa mengetik kode.",
    "Create a project with your classmates": "Buat proyek bersama teman sekelasmu",
    "Invite classmates and build the same project together, in real time.": "Undang teman sekelas dan buat proyek yang sama bersama, secara langsung.",
    "Present complete learning slides": "Presentasikan slide pembelajaran yang lengkap",
    "Interactive materials, ready for your lesson. Each slide comes with 3D your class can explore.": "Materi interaktif, siap untuk pelajaranmu. Setiap slide dilengkapi 3D yang bisa dijelajahi kelasmu.",
    "Present learning slides students can play with": "Presentasikan slide pembelajaran yang bisa dimainkan siswa",
    "Turn your lesson into an activity. Students tap, rotate, and explore the 3D models on each slide.": "Ubah pelajaranmu jadi aktivitas. Siswa bisa mengetuk, memutar, dan menjelajahi model 3D di setiap slide.",
    "Present learning slides with 3D": "Presentasikan slide pembelajaran dengan 3D",
    "Let students show what they know by exploring 3D models on the slides.": "Biarkan siswa menunjukkan pemahamannya dengan menjelajahi model 3D di slide.",
    "Present your research on a learning slide": "Presentasikan risetmu di slide pembelajaran",
    "Put your findings on a slide with 3D your audience can explore.": "Tuangkan temuanmu ke slide dengan 3D yang bisa dijelajahi audiens.",
    "Present your first 3D/AR learning slide": "Presentasikan slide pembelajaran 3D/AR pertamamu",
    "Introduce AR to your students with ready-made slides. No setup needed.": "Kenalkan AR ke siswamu dengan slide siap pakai. Tanpa persiapan.",
    "Present complete learning slides with 3D": "Presentasikan slide pembelajaran lengkap dengan 3D",
    "Grow your digital teaching skills with slides you can use today.": "Tingkatkan keterampilan mengajar digitalmu dengan slide yang bisa langsung kamu pakai hari ini.",
    "Ready-made slides with 3D models for the subject you teach.": "Slide siap pakai dengan model 3D untuk mata pelajaran yang kamu ajar.",
    "Assign students to present ideas in 3D": "Tugaskan siswa mempresentasikan ide dalam 3D",
    "Students practice presenting ideas or build learning games using 3D and AR.": "Siswa berlatih mempresentasikan ide atau membuat game belajar dengan 3D dan AR.",
    "Build your assignment in 3D with our Editor, then view it in AR.": "Buat tugasmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your assignment in 3D with the Editor, then view it in AR.": "Buat tugasmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your assessment in 3D with the Editor, then view it in AR.": "Buat asesmenmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your competition entry in 3D with the Editor, then view it in AR.": "Buat karya lombamu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your first project in 3D with the Editor, then view it in AR.": "Buat proyek pertamamu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your project in 3D with the Editor, then view it in AR.": "Buat proyekmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your research in 3D with the Editor, then view it in AR.": "Buat risetmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Create a simple 3D/AR project with Custom Marker": "Buat proyek 3D/AR sederhana dengan Custom Marker",
    "Build your assignment with the Editor, then view it on a Custom Marker.": "Buat tugasmu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your research with the Editor, then view it on a Custom Marker.": "Buat risetmu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your assessment with the Editor, then view it on a Custom Marker.": "Buat asesmenmu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your competition entry with the Editor, then view it on a Custom Marker.": "Buat karya lombamu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your first project with the Editor, then view it on a Custom Marker.": "Buat proyek pertamamu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your project with the Editor, then view it on a Custom Marker.": "Buat proyekmu dengan Editor, lalu lihat di atas Custom Marker.",
    "Build your training project in 3D with the Editor, then view it in AR.": "Buat proyek pelatihanmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your class project in 3D with the Editor, then view it in AR.": "Buat proyek kelasmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Build your program in 3D with the Editor, then view it in AR.": "Buat programmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Explore ready-to-use 3D/AR in Edu Kits, then view it in AR.": "Jelajahi 3D/AR siap pakai di Edu Kits, lalu lihat dalam AR.",
    "Explore ready-to-use 3D/AR in Edu Kits, like the solar system, a cell, or a volcano.": "Jelajahi 3D/AR siap pakai di Edu Kits, seperti tata surya, sel, atau gunung berapi.",
    "Build your child's assignment in 3D with the Editor, then view it in AR.": "Buat tugas anakmu dalam 3D dengan Editor, lalu lihat dalam AR.",
    "Drag in 3D objects together in the Editor, then see them in your room with AR.": "Seret objek 3D bersama di Editor, lalu lihat di ruanganmu dengan AR.",
    "Your child builds their first project in the Editor. You cheer them on.": "Anakmu membuat proyek pertamanya di Editor. Kamu menyemangatinya.",
    "Build your first project together in the Editor, then view it in AR.": "Buat proyek pertama bersama di Editor, lalu lihat dalam AR.",
    "Build a project together in the Editor, then view it in AR.": "Buat proyek bersama di Editor, lalu lihat dalam AR.",
    "Present complete learning slides in Topic, with 3D your class can explore.": "Presentasikan slide pembelajaran lengkap di Topic, dengan 3D yang bisa dijelajahi kelasmu.",
    "Turn your lesson into an activity in Topic. Students tap, rotate, and explore the 3D.": "Ubah pelajaranmu jadi aktivitas di Topic. Siswa mengetuk, memutar, dan menjelajahi 3D-nya.",
    "Let students show what they know by exploring 3D in Topic.": "Biarkan siswa menunjukkan pemahamannya dengan menjelajahi 3D di Topic.",
    "Introduce ready-to-use 3D/AR from Edu Kits. No setup needed.": "Kenalkan 3D/AR siap pakai dari Edu Kits. Tanpa persiapan.",
    "Grow your teaching skills with learning slides in Topic you can use today.": "Kembangkan cara mengajarmu dengan slide pembelajaran di Topic yang bisa langsung kamu pakai.",
    "Ready-made learning slides in Topic, with 3D for the subject you teach.": "Slide pembelajaran siap pakai di Topic, dengan 3D untuk mata pelajaran yang kamu ajar.",
    "Students build their idea in the Editor, then present it to show what they understand.": "Siswa membuat idenya di Editor, lalu mempresentasikannya untuk menunjukkan pemahaman mereka.",
    "Use AI-3D Generation to change an image or text into 3D, with or without animation.": "Pakai AI-3D Generation untuk mengubah gambar atau teks menjadi 3D, dengan atau tanpa animasi.",
    "Use AI-3D Generation to turn your child's drawing into 3D.": "Pakai AI-3D Generation untuk mengubah gambar anakmu menjadi 3D.",
    "Create 3D/AR for a digital product, or connect it to a physical one with Custom Marker.": "Buat 3D/AR untuk produk digital, atau hubungkan ke produk fisik dengan Custom Marker.",
    "Use the Editor to turn your task into a 3D scene your examiner can explore.": "Pakai Editor untuk mengubah tugasmu jadi scene 3D yang bisa dijelajahi penguji.",
    "Build your competition entry in 3D with our Editor, then bring it to life in AR.": "Buat karya lombamu dalam 3D dengan Editor, lalu hidupkan dengan AR.",
    "Learn AR by doing. Drag a 3D object into the Editor and see it in your room.": "Belajar AR sambil praktik. Seret objek 3D ke Editor dan lihat di ruanganmu.",
    "Start from thousands of 3D objects in the Editor and see what you can make.": "Mulai dari ribuan objek 3D di Editor dan lihat apa yang bisa kamu buat.",
    "Start from thousands of 3D objects in the Editor, not a blank page.": "Mulai dari ribuan objek 3D di Editor, bukan halaman kosong.",
    "Use the Editor to show your thesis findings as a 3D scene your examiners can explore.": "Pakai Editor untuk menampilkan temuan skripsimu dalam scene 3D yang bisa dijelajahi penguji.",
    "Turn your child's school assignment into a 3D scene you build together in the Editor.": "Ubah tugas sekolah anakmu jadi scene 3D yang kalian buat bersama di Editor.",
    "Drag 3D objects into the Editor together and see them appear in your room with AR.": "Seret objek 3D ke Editor bersama dan lihat muncul di ruanganmu dengan AR.",
    "Your child designs, builds, and shares it in the Editor. You cheer them on.": "Anakmu merancang, membuat, dan membagikannya di Editor. Kamu menyemangatinya.",
    "Use the Editor to turn your findings into a project people can explore and share.": "Pakai Editor untuk mengubah temuanmu jadi proyek yang bisa dijelajahi dan dibagikan.",
    "Build a ready project in the Editor that educators can try in their own class.": "Buat proyek siap pakai di Editor yang bisa dicoba pendidik di kelasnya.",
    "Build it in the Editor, show your students what AR can do, then share it with a link.": "Buat di Editor, tunjukkan kemampuan AR ke mahasiswamu, lalu bagikan lewat tautan.",
    "Build an activity for your learning program in the Editor, ready to share.": "Buat aktivitas untuk program belajarmu di Editor, siap dibagikan.",
    "Start from thousands of 3D objects in the Editor, then share it with a link.": "Mulai dari ribuan objek 3D di Editor, lalu bagikan lewat tautan.",
    "Use Visual Coding to make objects move, react, and score.": "Pakai Visual Coding agar objek bisa bergerak, bereaksi, dan mencetak skor.",
    "Use Collaborate to build projects with your classmates in real time.": "Pakai Collaborate untuk membuat proyek bersama teman sekelas secara langsung.",
    "Describe an object or upload a sketch, and AI-3D Generation builds it in 3D for your scene.": "Tulis deskripsi atau unggah sketsa, lalu AI-3D Generation membuatkan objek 3D untuk scene-mu.",
    "Upload a sketch or describe it, and AI-3D Generation builds the 3D object in minutes.": "Unggah sketsa atau tulis deskripsinya, lalu AI-3D Generation membuatkan objek 3D dalam hitungan menit.",
    "Students present ideas in 3D with the Editor, or build learning games with Visual Coding.": "Siswa mempresentasikan ide dalam 3D dengan Editor, atau membuat game belajar dengan Visual Coding.",
    "Use Class to invite students, share materials, and see their projects in one place.": "Pakai fitur Kelas untuk mengundang siswa, membagikan materi, dan melihat proyek mereka di satu tempat.",
    "Share assignments and materials in Class": "Bagikan tugas dan materi di fitur Kelas",
    "Invite students, share materials, and see their projects in one place.": "Undang siswa, bagikan materi, dan lihat proyek mereka di satu tempat.",
    "Create a simple 3D/AR project for your research": "Buat proyek 3D/AR sederhana untuk risetmu",
    "Turn your findings into a project people can explore and share.": "Ubah temuanmu jadi proyek yang bisa dijelajahi dan dibagikan.",
    "Create a simple 3D/AR project to train educators": "Buat proyek 3D/AR sederhana untuk melatih pendidik",
    "Give educators a ready project they can try in their own class.": "Beri pendidik proyek siap pakai yang bisa mereka coba di kelasnya.",
    "Create a simple 3D/AR project for your program": "Buat proyek 3D/AR sederhana untuk programmu",
    "Build an activity for your learning program, ready to share.": "Buat aktivitas untuk program belajarmu, siap dibagikan.",
    "Create a simple 3D/AR project for your product": "Buat proyek 3D/AR sederhana untuk produkmu",
    "Prototype your education product in 3D before you build it.": "Buat prototipe produk pendidikanmu dalam 3D sebelum membangunnya.",
    "Create a simple 3D/AR project for your client": "Buat proyek 3D/AR sederhana untuk klienmu",
    "Bring your client's idea to life in AR, ready to present.": "Wujudkan ide klienmu dalam AR, siap dipresentasikan.",
    "Start from thousands of 3D objects, then share it with a link.": "Mulai dari ribuan objek 3D, lalu bagikan lewat tautan.",
    "Create 3D/AR for digital or physical products": "Buat 3D/AR untuk produk digital atau fisik",
    "Create 3D/AR for physical products": "Buat 3D/AR untuk produk fisik",
    "Connect 3D/AR to a physical product with Custom Marker.": "Hubungkan 3D/AR ke produk fisik dengan Custom Marker.",
    "Use Custom Marker to show 3D/AR on a book, clothes, or a backdrop.": "Pakai Custom Marker untuk menampilkan 3D/AR di buku, baju, atau backdrop.",
    "Try AI-3D Generation": "Coba AI-3D Generation",
    "Use AI-3D Generation to turn an image or text into 3D or animated 3D.": "Pakai AI-3D Generation untuk mengubah gambar atau teks menjadi 3D atau 3D beranimasi.",
    "Pop 3D and video out of books, cubes, cards, posters, T-shirts, and backdrops, or put them on your website.": "Munculkan 3D dan video dari buku, kubus, kartu, poster, baju, dan backdrop, atau tampilkan di website.",
    "Create 3D objects, with or without animation, in minutes": "Buat objek 3D, dengan atau tanpa animasi, dalam hitungan menit",
    "Create your own 3D objects with animation": "Buat objek 3D-mu sendiri dengan animasi",
    "Use AI-3D Generation to change an image or text into 3D with animation.": "Pakai AI-3D Generation untuk mengubah gambar atau teks menjadi 3D dengan animasi.",
    "Describe an object or upload a sketch, and AI builds it in 3D for your scene.": "Tulis deskripsi atau unggah sketsa, lalu AI membuatkan objek 3D untuk scene-mu.",
    "A student viewing the solar system in 3D on a phone while classmates watch": "Siswa melihat proyek tata surya 3D dalam AR di ponsel",
    "A university student viewing a 3D solar system project in AR on a phone": "Mahasiswa melihat proyek tata surya 3D dalam AR di ponsel",
    "University classmates editing the same 3D project together": "Teman sekelas mahasiswa mengedit proyek 3D yang sama bersama-sama",
    "A university student turning a sketch into a 3D object with AI": "Mahasiswa mengubah sketsa menjadi objek 3D dengan AI",
    "Two students building a 3D game with Visual Coding blocks": "Dua siswa membuat game 3D dengan blok coding visual",
    "Young classmates editing the same 3D volcano project together on a tablet and a laptop": "Teman sekelas yang masih kecil mengedit proyek gunung berapi 3D bersama di tablet dan laptop",
    "Classmates editing the same 3D project together": "Teman sekelas mengedit proyek 3D yang sama bersama-sama",
    "A teacher facing her class while presenting a learning slide with a realistic 3D heart": "Guru menghadap kelasnya sambil mempresentasikan slide pembelajaran dengan model 3D jantung yang realistis",
    "A student presenting an idea with a 3D model while the teacher assesses": "Siswa mempresentasikan ide dengan model 3D sementara guru menilai",
    "A teacher sharing materials and student projects in a class": "Guru membagikan materi dan proyek siswa di kelas",
    "A creator holding a finished AR project cover on a tablet": "Kreator menunjukkan sampul proyek AR yang sudah jadi di tablet",
    "AR use cases: 3D popping out of a book, cube, card, poster, T-shirt, art installation, and event backdrop, plus 3D on a website": "Contoh penggunaan AR: 3D muncul dari buku, kubus, kartu, poster, baju, instalasi seni, dan backdrop acara, serta 3D di website",
    "AI turning a sketch of an owl into an animated 3D object": "AI mengubah sketsa burung hantu menjadi objek 3D beranimasi",
    "A parent and child viewing a 3D solar system project in AR on a phone": "Orang tua dan anak melihat proyek tata surya 3D dalam AR di ponsel",
    "A parent and child building a 3D game with Visual Coding blocks": "Orang tua dan anak membuat game 3D dengan blok coding visual",
    "A parent and child turning a sketch into a 3D object with AI": "Orang tua dan anak mengubah sketsa menjadi objek 3D dengan AI",
    "A lecturer holding a finished AR project cover on a tablet": "Dosen menunjukkan sampul proyek AR yang sudah jadi di tablet",
    "A lecturer sharing materials and student projects in a university class": "Dosen membagikan materi dan proyek mahasiswa di kelas",
    "A lecturer showing a 3D dinosaur popping out of a book in AR on a tablet": "Dosen menunjukkan dinosaurus 3D yang muncul dari buku lewat AR di tablet",

    // Try sentence pieces
    "use interactive materials for your lessons": "menggunakan materi interaktif saat mengajar",
    "create a project your students can try": "membuat proyek yang bisa dicoba siswamu",
    "prepare a project for an exam or assessment": "menyiapkan proyek untuk ujian atau asesmen",
    "create a project for your research": "membuat proyek untuk risetmu",
    "introduce AR to your students": "mengenalkan AR ke siswamu",
    "grow your digital teaching skills": "meningkatkan keterampilan mengajar digitalmu",
    "create a project for class": "membuat proyek untuk kelas",
    "create a project for your thesis or research": "membuat proyek untuk skripsi atau risetmu",
    "create a project for a competition": "membuat proyek untuk lomba",
    "learn how to create AR": "belajar membuat AR", "train educators": "melatih pendidik",
    "develop a learning program": "mengembangkan program belajar", "build an education product": "membangun produk pendidikan",
    "create AR for a client": "membuat AR untuk klien", "create an AR experience": "membuat pengalaman AR",
    "create educational content": "membuat konten edukasi", "start a professional project": "memulai proyek profesional",
    "support a community": "mendukung komunitas", "learn and explore": "belajar dan bereksplorasi",
    "start a personal project": "memulai proyek pribadi", "try Assemblr for what you need": "mencoba Assemblr sesuai kebutuhanmu",
    "a student": "seorang pelajar", "an educator": "seorang pendidik", "a creator": "seorang kreator"
  };
  const ID_PATTERNS = [
    [/^Nice to meet you, (.*)!$/, "Senang bertemu denganmu, $1!"],
    [/^Hey, (.+)!$/, "Hai, $1!"],
    [/^Grade (\d+)$/, "Kelas $1"],
    [/^Year (\d+)$/, "Tahun ke-$1"],
    [/^Step (\d+) of (\d+)$/, "Langkah $1 dari $2"],
    [/^Step (\d+) of (\d+): (.+)$/, (m, a, b, c) => `Langkah ${a} dari ${b}: ${ID[c] || c}`],
    [/^Slide (\d+) of (\d+)$/, "Slide $1 dari $2"],
    [/^(\d+) years old$/, "$1 tahun"],
    [/^Use (\S+@\S+)$/, "Pakai $1"],
    [/^Country code: (.+) (\+\d+)$/, (m, c, d) => `Kode negara: ${ID[c] || c} ${d}`],
    [/^No need to type (\+\d+) again, it's already added$/, "Tidak perlu mengetik $1 lagi, sudah otomatis ditambahkan"],
    [/^No need for the first 0, (\+\d+) covers it$/, "Tidak perlu angka 0 di depan, sudah diwakili $1"]
  ];
  let uiLang = "en";
  function tr(s) {
    if (uiLang !== "id" || !s) return s;
    const key = s.trim();
    if (!key) return s;
    if (Object.hasOwn(ID, key)) return s.replace(key, () => ID[key]);
    for (const [re, rep] of ID_PATTERNS) {
      if (re.test(key)) return s.replace(key, () => key.replace(re, rep));
    }
    return s;
  }

  const TR_ATTRS = ["placeholder", "aria-label", "title", "alt"];
  const TR_SKIP = "#auth, .lang, .logo-wordmark, [data-no-tr], script, style, svg";
  const trText = new WeakMap();
  const trAttr = new WeakMap();
  function localizeText(node) {
    if (uiLang === "en" && !trText.has(node)) return;
    if (node.parentElement?.closest(TR_SKIP)) return;
    const rec = trText.get(node);
    const src = rec && node.nodeValue === rec.out ? rec.src : node.nodeValue;
    const out = tr(src);
    trText.set(node, { src, out });
    if (node.nodeValue !== out) node.nodeValue = out;
  }
  function localizeAttr(el, name) {
    const value = el.getAttribute(name);
    if (value == null) return;
    let recs = trAttr.get(el);
    if (uiLang === "en" && !recs?.[name]) return;
    if (el.closest(TR_SKIP)) return;
    if (!recs) trAttr.set(el, (recs = {}));
    const rec = recs[name];
    const src = rec && value === rec.out ? rec.src : value;
    const out = tr(src);
    recs[name] = { src, out };
    if (value !== out) el.setAttribute(name, out);
  }
  function localize(root) {
    if (root.nodeType === Node.TEXT_NODE) return localizeText(root);
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(TR_SKIP)) return;
    [root, ...root.querySelectorAll("*")].forEach((el) => TR_ATTRS.forEach((a) => localizeAttr(el, a)));
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) localizeText(walker.currentNode);
  }
  new MutationObserver((records) => {
    records.forEach((r) => {
      if (r.type === "childList") r.addedNodes.forEach(localize);
      else if (r.type === "characterData") localizeText(r.target);
      else localizeAttr(r.target, r.attributeName);
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TR_ATTRS });

  /* ---------- Content ---------- */
  const ROLES = {
    student: { label: "Student", icon: "backpack", greet: "What brings you here?", phrase: "a student", loading: "Picking ideas for students" },
    educator: { label: "Educator", icon: "presentation", greet: "Hi Educator!", phrase: "an educator", loading: "Picking ideas for educators" },
    university: { label: "University student", icon: "graduation", greet: "Hi there!", phrase: "a university student", loading: "Picking ideas for university students" },
    parent: { label: "Parent", icon: "heart", greet: "Hi there!", phrase: "a parent", loading: "Picking ideas for parents" },
    lecturer: { label: "Lecturer", icon: "landmark", greet: "Hi there!", phrase: "a lecturer", loading: "Picking ideas for lecturers" },
    other: { label: "Other", icon: "sparkles", greet: "Hi there!", phrase: null, loading: "Picking ideas for you" }
  };

  const FLOWS = {
    student: {
      title: "What would you like to do?",
      jobs: [
        { id: "assignment", icon: "clipboard", label: "Make a project for class" },
        { id: "exam", icon: "clipboardCheck", label: "Make a project for an exam or assessment", ask: "organizer" },
        { id: "competition", icon: "trophy", label: "Make a project for a competition or exhibition", ask: "event" },
        { id: "learn-ar", icon: "box", label: "Learn to create with 3D and AR" },
        { id: "explore", icon: "compass", label: "I just want to explore" },
        { id: "other", icon: "sparkles", label: "Something else", ask: "motivation" }
      ]
    },
    university: {
      title: "What would you like to do?",
      jobs: [
        { id: "assignment", icon: "clipboard", label: "Make a project for class" },
        { id: "thesis", icon: "book", label: "Create a project for my thesis or research", ask: "research" },
        { id: "exam", icon: "clipboardCheck", label: "Make a project for an exam or assessment", ask: "organizer" },
        { id: "competition", icon: "trophy", label: "Make a project for a competition or exhibition", ask: "event" },
        { id: "learn-ar", icon: "box", label: "Learn to create with 3D and AR" },
        { id: "other", icon: "sparkles", label: "Something else", ask: "motivation" }
      ]
    },
    parent: {
      title: "What would you like to do?",
      jobs: [
        { id: "homework", icon: "clipboard", label: "Help my child with school assignments" },
        { id: "concepts", icon: "lightbulb", label: "Help my child understand difficult concepts" },
        { id: "fun", icon: "heart", label: "Make learning more fun and engaging for my child" },
        { id: "kid-skills", icon: "palette", label: "Help my child develop creative and digital skills" },
        { id: "kid-ar", icon: "scan", label: "Introduce my child to interactive 3D and AR" },
        { id: "other", icon: "sparkles", label: "Other", ask: "motivation" }
      ]
    },
    educator: {
      title: "What would you like to do?",
      jobs: [
        { id: "materials", icon: "layers", label: "Use ready-to-use materials for my lessons" },
        { id: "activity", icon: "puzzle", label: "Create a project for my students" },
        { id: "exam", icon: "clipboardCheck", label: "Create a project for an exam, assessment, or qualification", ask: "organizer-educator" },
        { id: "introduce", icon: "scan", label: "Introduce AR/Immersive tech to my students" },
        { id: "skills", icon: "trending", label: "Improve my digital teaching skills" },
        { id: "other", icon: "sparkles", label: "Other", ask: "motivation" }
      ]
    },
    lecturer: {
      title: "What would you like to do?",
      jobs: [
        { id: "research", icon: "microscope", label: "Create a project for my research", ask: "research" },
        { id: "train", icon: "users", label: "Train educators", ask: "event-type" },
        { id: "introduce-uni", icon: "scan", label: "Introduce AR/Immersive tech to my university students" },
        { id: "programs", icon: "map", label: "Develop learning programs" },
        { id: "explore", icon: "compass", label: "Explore AR and see what I can create" },
        { id: "other", icon: "sparkles", label: "Other", ask: "motivation" }
      ]
    },
    other: {
      title: "What would you like to do?",
      jobs: [
        { id: "ar", icon: "box", label: "Create an AR experience" },
        { id: "content", icon: "book", label: "Create educational content" },
        { id: "pro", icon: "briefcase", label: "Professional project" },
        { id: "community", icon: "users", label: "Community or organization" },
        { id: "learn", icon: "compass", label: "Learning or exploration" },
        { id: "personal", icon: "heart", label: "Personal project" },
        { id: "other", icon: "sparkles", label: "Other", ask: "motivation" }
      ]
    }
  };

  const ASKS = {
    organizer: { label: "Who is organizing this?", hint: "For example, an assignment from the local education office, a PPG teaching-practice task, or a Cambridge, IB, or P5 project", placeholder: "School, university, or institution" },
    "organizer-educator": { label: "Who is organizing this?", hint: "For example, an assignment from the local education office, a PPG teaching-practice task, or a Cambridge project", placeholder: "School, university, or institution" },
    research: { label: "What kind of research is this?", hint: "For example, a thesis or a BIMA research grant", placeholder: "Thesis, BIMA grant, or another project" },
    event: { label: "What is the event called?", hint: "For example, a school project showcase or World Robot Olympiad (WRO) 2026", placeholder: "Competition or exhibition name" },
    "event-type": { label: "Personal event or institutional?", type: "choice", options: ["Personal event", "Institutional", "Other"], otherPlaceholder: "Tell us in a few words" },
    motivation: { label: "What's your motivation?", placeholder: "A few words" },
    other: { label: "Tell us a little more", placeholder: "What brings you here?" }
  };

  const WANTS = {
    materials: "use ready-made materials in your lessons",
    activity: "create a project for your students",
    explore: "explore AR and see what you can create",
    homework: "help your child with school assignments",
    concepts: "help your child understand difficult concepts",
    fun: "make learning more fun for your child",
    "kid-skills": "help your child build creative and digital skills",
    "kid-ar": "introduce your child to interactive 3D and AR",
    "introduce-uni": "introduce AR to your university students",
    exam: "prepare a project for an exam or assessment",
    research: "create a project for your research",
    introduce: "introduce AR to your students",
    skills: "grow your digital teaching skills",
    assignment: "create a project for class",
    thesis: "create a project for your thesis or research",
    competition: "create a project for a competition",
    "learn-ar": "learn how to create AR",
    train: "train educators",
    programs: "develop a learning program",
    product: "build an education product",
    clients: "create AR for a client",
    ar: "create an AR experience",
    content: "create educational content",
    pro: "start a professional project",
    community: "support a community",
    learn: "learn and explore",
    personal: "start a personal project"
  };

  const TRY_COVERS = {
    project: {
      src: "assets/litosphere-cover.png?v=84", alt: "Human Heart, an interactive 3D project", focus: [0.27, 0.69],
      embed: () => "https://viewer-edu.assemblrworld.com/Embed/-u4GdF65A7hHvKx3H7i6",
      frameTitle: "Interactive 3D project: the human heart"
    },
    math: {
      src: "assets/try-geometry-cover.png?v=1", alt: "Geometry coordinates (X, Y, Z), an interactive 3D project",
      embed: () => "https://viewer-edu.assemblrworld.com/Embed/-AqmWYh8v6aW79c9iPdC",
      frameTitle: "Interactive 3D project: geometry coordinates (X, Y, Z)"
    },
    biology: {
      src: "assets/try-butterfly-cover.png?v=1", alt: "The life cycle of a butterfly, an interactive 3D project",
      embed: () => "https://viewer-edu.assemblrworld.com/Embed/-59Pi5AeEZVisqSPhZSZ",
      frameTitle: "Interactive 3D project: the life cycle of a butterfly"
    }
  };
  const TRY_SETS = {};
  const TRY_FALLBACK = { title: "Explore this project", cover: "project" };
  // Subject projects win over role and goal; the typed "Other" subject is matched by keyword
  const TRY_BY_SUBJECT = [
    { subject: "Math", words: /math|matemat|geometr|algebra|calcul|kalkulus|statisti|trigonomet/i, cover: "math" },
    { subject: "Biology", words: /biolog/i, cover: "biology" }
  ];
  const subjectPick = () => {
    const typed = state.subject.includes("Other") ? $("subjectOther").value : "";
    const hit = TRY_BY_SUBJECT.find((s) => state.subject.includes(s.subject) || s.words.test(typed));
    return hit && { title: "Explore this project", cover: hit.cover };
  };

  const LECTURER_FIELDS = [
    ["Educational technology", "layers"],
    ["Media and visual communication", "palette"],
    ["Computer science", "code"],
    ["Other", "plus"]
  ];
  const fieldRole = (role) => role === "lecturer" || role === "university";
  const SUBJECTS = [
    ["Science", "flask"], ["Programming", "code"], ["Biology", "leaf"], ["Physics", "atom"],
    ["Chemistry", "testTube"], ["Math", "calculator"], ["Design", "pen"],
    ["History", "landmark"], ["Language", "languages"], ["Other", "plus"]
  ];
  const GRADE_GROUPS = [
    { label: "Kindergarten", items: ["Kindergarten"] },
    { label: "Elementary", items: [1, 2, 3, 4, 5, 6].map((n) => `Grade ${n}`) },
    { label: "Junior high", items: [7, 8, 9].map((n) => `Grade ${n}`) },
    { label: "Senior high", items: [10, 11, 12].map((n) => `Grade ${n}`) },
    { label: "Beyond school", items: ["University", "Other"] }
  ];
  const UNI_GROUPS = [
    { label: "University", items: ["Year 1", "Year 2", "Year 3", "Year 4", "Postgraduate", "Other"] }
  ];
  const SCHOOL_GROUPS = GRADE_GROUPS.map((g) => (g.label === "Beyond school" ? { ...g, items: ["Other"] } : g));
  const gradeGroupsFor = (role) => (role === "university" || role === "lecturer" ? UNI_GROUPS : role === "student" ? SCHOOL_GROUPS : GRADE_GROUPS);
  // Students tie a project to one class, so they pick a single subject and grade
  const singlePick = () => state.role === "student";
  const STUDENT_SUBJECT_QS = {
    "learn-ar": "Which subject interests you?",
    explore: "Which subject interests you?",
    other: "Which subject interests you?"
  };
  const SUBJECT_QS = {
    educator: ["What subject and grade do you teach?", "What grade(s) do you teach?"],
    student: ["What are you learning?", "What grade are you in?"],
    university: ["What field and year are you studying?", "What year are you in?"],
    parent: ["What would you like to help your child learn?", "Which grades are you creating for?"],
    lecturer: ["What field and year do you teach?", "Which year(s) do you teach?"],
    other: ["Which subject and grade is it for?", "Which grade is it for?"]
  };
  const AVATAR_LIST = [
    [1, "Straw hat and camera"], [3, "Aviator"], [4, "Bike helmet"],
    [6, "Artist beret"], [7, "Backwards cap"], [8, "Headphones"], [9, "Astronaut"],
    [17, "Girl in a hijab"],
    [19, "Educator"], [20, "Student"], [21, "Innovator"],
    [11, "Songkok"], [12, "Chada crown"], [13, "Safa turban"],
    [14, "Ghutra and agal"], [15, "Cowboy hat"], [16, "Guard bearskin"]
  ];
  const AVATAR_NAMES = AVATAR_LIST.map(([, name]) => name);
  const AVATARS = AVATAR_LIST.map(([n]) => `assets/avatars/blr-${n}.png?v=2`);
  const SOURCES = [
    { id: "google", icon: "google", label: "Google search", tone: "4" },
    { id: "youtube", icon: "youtube", label: "YouTube", tone: "3" },
    { id: "tiktok", icon: "tiktok", label: "TikTok", tone: "1" },
    { id: "instagram", icon: "instagram", label: "Instagram", tone: "2" },
    { id: "facebook", icon: "facebook", label: "Facebook", tone: "3" },
    { id: "blog", icon: "globe", label: "Blog or article", tone: "1" },
    { id: "events", icon: "calendar", label: "Events", sub: "Exhibition, webinar, or workshop", tone: "4" },
    { id: "people", icon: "users", label: "Teacher, colleague, friend, or family", tone: "3" },
    { id: "other", icon: "sparkles", label: "Other", tone: "1" }
  ];
  const COUNTRIES = [
    ["ID", "Indonesia", "+62"], ["MY", "Malaysia", "+60"], ["SG", "Singapore", "+65"],
    ["PH", "Philippines", "+63"], ["TH", "Thailand", "+66"], ["VN", "Vietnam", "+84"],
    ["BN", "Brunei", "+673"], ["TL", "Timor-Leste", "+670"], ["IN", "India", "+91"],
    ["SA", "Saudi Arabia", "+966"], ["AE", "United Arab Emirates", "+971"], ["JP", "Japan", "+81"],
    ["KR", "South Korea", "+82"], ["AU", "Australia", "+61"], ["NL", "Netherlands", "+31"],
    ["GB", "United Kingdom", "+44"], ["US", "United States", "+1"]
  ];
  const flagSrc = (iso) => `assets/flags/${iso.toLowerCase()}.svg`;
  const flag = (iso) => `<img class="flag" src="${flagSrc(iso)}" alt="" width="22" height="16" />`;
  const CHEERS = ["Great pick!", "Love that!", "Sounds fun!", "Nice one!", "Got it!"];
  const BASE_STEPS = ["name", "source", "phone", "role", "goal", "subject", "try"];
  const STUDENT_STEPS = ["name", "source", "phone", "role", "age", "goal", "subject", "try"];
  let STEPS = BASE_STEPS;
  const STEP_LABELS = { name: "You", source: "Source", phone: "Phone", role: "Role", age: "Age", goal: "Goal", subject: "Subject", try: "Try it" };
  const idx = (step) => STEPS.indexOf(step);

  /* ---------- State ---------- */
  const state = {
    step: "name",
    name: "",
    avatar: AVATARS[0],
    source: null,
    sourceEvent: "",
    country: COUNTRIES[0],
    phone: "",
    phoneSkipped: false,
    consent: false,
    role: null,
    otherRole: "",
    job: null,
    goalFor: null,
    subject: [],
    grade: [],
    subjectFor: null,
    age: null,
    joinVia: null,
    guardianEmail: "",
    guardianSame: false,
    projectsPrivate: false,
    marketingAllowed: true,
    reached: 0,
    celebrated: false
  };
  // Read by live-reload.js to bring the page back to the same step after an edit
  window.__assemblrDev = { state, lang: () => uiLang, welcome: () => openWelcome() };

  const setup = $("setup");
  const tryCard = $("try");
  const roleGroup = $("roleGroup");
  const goalNext = $("goalNext");
  const goalHint = $("goalHint");

  /* ---------- Feedback helpers ---------- */
  const announcer = $("announcer");
  const announce = (msg) => { announcer.textContent = ""; requestAnimationFrame(() => { announcer.textContent = msg; }); };

  const toast = $("toast");
  function showToast(text, ms = 1800) {
    $("toastText").textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), ms);
  }

  function restartClass(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  /* On phones a list swipes sideways; a short bar under it shows where you are */
  function makeSwipe(row) {
    row.classList.add("swipe-row");
    const hint = document.createElement("div");
    hint.className = "swipe-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = "<span></span>";
    row.after(hint);
    const paint = () => {
      const max = row.scrollWidth - row.clientWidth;
      const scrollable = max > 2 && getComputedStyle(row).overflowX === "auto";
      hint.classList.toggle("is-hidden", !scrollable);
      row.classList.toggle("at-start", !scrollable || row.scrollLeft <= 2);
      row.classList.toggle("at-end", !scrollable || row.scrollLeft >= max - 2);
      if (!scrollable) return;
      const track = hint.clientWidth;
      const thumb = Math.max(12, track * (row.clientWidth / row.scrollWidth));
      hint.style.setProperty("--thumb-w", `${thumb}px`);
      hint.style.setProperty("--thumb-x", `${(track - thumb) * (row.scrollLeft / max)}px`);
    };
    row.addEventListener("scroll", paint, { passive: true });
    new ResizeObserver(paint).observe(row);
    new MutationObserver(paint).observe(row, { childList: true, subtree: true });
    return paint;
  }

  const BLR_POSES = ["wave", "think", "phone", "present", "tablet", "laptop", "behind", "hello"];
  const blrSrc = (pose, blink) => `assets/blr2/${pose}${blink ? "-blink" : ""}.png`;
  BLR_POSES.forEach((p) => { new Image().src = blrSrc(p); new Image().src = blrSrc(p, true); });
  function paintPose(slot, pose) {
    slot.dataset.pose = pose;
    slot.querySelector("img").setAttribute("src", blrSrc(pose));
    slot.querySelector(".blr-blink")?.setAttribute("src", blrSrc(pose, true));
  }

  const blrStory = $("blrStory");
  function setPose(pose) {
    if (blrStory.dataset.pose === pose) return;
    paintPose(blrStory, pose);
    restartClass(blrStory, "swap");
  }
  function hop() {
    blrStory.classList.remove("swap");
    restartClass(blrStory, "hop");
  }
  blrStory.addEventListener("click", () => {
    hop();
    restartClass(blrStory, "wink");
    clearTimeout(blrStory.wink);
    blrStory.wink = setTimeout(() => blrStory.classList.remove("wink"), 320);
    react(pick(["Hehe, that tickles!", "Hi again!", "You've got this!", "Boop!"]));
  });
  const reactEl = $("react");
  let sayText = "";
  function speak(text) {
    if (reactEl.textContent === tr(text)) return;
    reactEl.textContent = text;
    restartClass(reactEl, "talk");
  }
  function say(text) {
    sayText = text;
    clearTimeout(react.t);
    speak(text);
  }
  function react(text) {
    speak(text);
    clearTimeout(react.t);
    react.t = setTimeout(() => speak(sayText), 1800);
  }

  const fx = $("fx");
  const COLORS = ["#E8408A", "#3FA3E8", "#2B6FD8", "#F4A3C6"];
  const SHAPES = ["", "dot", "tri", "bar"];
  function burst(x, y, { count = 10, angle = -90, spread = 180, power = 1, tempo = 1 } = {}) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("i");
      p.className = `confetti ${SHAPES[i % SHAPES.length]}`;
      p.style.background = COLORS[i % COLORS.length];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      fx.appendChild(p);
      const a = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180;
      const dist = (36 + Math.random() * 54) * power;
      const dx = Math.cos(a) * dist;
      const dy = Math.sin(a) * dist;
      const spin = (Math.random() - 0.5) * 720;
      // Slower tempos also fall further, so the pieces drift down instead of hanging in the air.
      const fall = (40 + 30 * power) * Math.sqrt(tempo);
      p.animate(
        [
          { transform: "translate(-50%, -50%) scale(0.6) rotate(0deg)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${spin * 0.6}deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + fall}px)) scale(0.7) rotate(${spin}deg)`, opacity: 0 }
        ],
        { duration: (760 + Math.random() * 520 * Math.sqrt(power)) * tempo, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
      ).onfinish = () => p.remove();
    }
  }
  function burstFrom(el, opts) {
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, opts);
  }
  function celebrate() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    burst(0, h * 0.75, { count: 36, angle: -55, spread: 30, power: 6, tempo: 2.2 });
    burst(w, h * 0.75, { count: 36, angle: -125, spread: 30, power: 6, tempo: 2.2 });
  }

  function spotlight(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  /* ---------- Navigation ---------- */
  const firstName = () => state.name.trim().split(/\s+/)[0] || "";
  const STORY = {
    name: () => ({
      title: "What's your name?",
      say: "Hi, I'm blr!",
      pose: "wave"
    }),
    source: () => ({
      title: "How did you first hear about Assemblr Studio?",
      say: `Nice to meet you, ${firstName()}!`,
      pose: "hello"
    }),
    phone: () => ({
      title: "Stay in the Loop",
      say: "Only for your account. We never share it.",
      pose: "behind"
    }),
    role: () => ({
      title: "Which role fits you best?",
      say: "You can change this later.",
      pose: "present"
    }),
    age: () => ({
      title: "A little about you",
      say: "This helps me set things up for you.",
      pose: "think"
    }),
    goal: () => ({
      title: FLOWS[state.role].title,
      say: ROLES[state.role].greet,
      pose: "tablet"
    }),
    subject: () => ({
      title: (SUBJECT_QS[state.role] || SUBJECT_QS.other)[0],
      say: state.role === "student" ? "Tell me a little more so I can suggest examples for you." : "Optional, but it helps me pick examples.",
      pose: "laptop"
    })
  };

  function renderStory(step) {
    const s = STORY[step]();
    const copy = $("storyCopy");
    $("title").textContent = s.title;
    restartClass(copy, "swap");
    setPose(s.pose);
    say(s.say);
  }

  const SPLIT_STEPS = new Set(["source", "age", "goal", "subject"]);
  const splitQuery = window.matchMedia("(min-width: 981px)");

  function go(step, dir = "forward") {
    const solo = !SPLIT_STEPS.has(step);
    const morph = step !== "try" && !setup.hidden && setup.classList.contains("solo") !== solo
      && splitQuery.matches && !reduceMotion && document.startViewTransition;
    if (morph) {
      setup.classList.add("morphing");
      const vt = document.startViewTransition(() => applyStep(step, dir, solo));
      vt.finished.finally(() => setup.classList.remove("morphing"));
    } else {
      applyStep(step, dir, solo);
    }
  }

  function applyStep(step, dir, solo) {
    state.step = step;
    setup.dataset.step = step;
    const index = STEPS.indexOf(step);
    state.reached = Math.max(state.reached, index);
    setup.classList.toggle("solo", solo);
    $("loading").classList.remove("show");

    const duringAuth = document.body.dataset.phase !== "setup";
    if (step === "try") {
      setup.hidden = true;
      tryCard.hidden = false;
      enterTry();
      $("tryTitle").focus({ preventScroll: true });
    } else {
      tryCard.hidden = true;
      setup.hidden = duringAuth;
      setup.querySelectorAll(".pane").forEach((pane) => {
        const on = pane.dataset.pane === step;
        pane.classList.toggle("active", on);
        if (on) pane.dataset.dir = dir;
      });
      renderStory(step);
      // Picking a role advances right away, so the step always opens with nothing selected
      if (step === "role") markRole(null);
      if (!duringAuth) {
        if (step === "name" && window.matchMedia("(pointer: fine)").matches) nameInput.focus({ preventScroll: true });
        else if (step === "age" && window.matchMedia("(pointer: fine)").matches) $("ageInput").focus({ preventScroll: true });
        else $("title").focus({ preventScroll: true });
      }
    }
    renderStepper();
    if (!duringAuth) announce(`Step ${index + 1} of ${STEPS.length}`);
  }

  function goalValid() {
    if (!state.job) return false;
    if (state.job.ask !== "motivation") return true;
    const wrap = document.querySelector("#goalOptions .opt-wrap.is-selected");
    return Boolean(wrap?.querySelector("input.field")?.value.trim());
  }

  const VALID = {
    name: () => nameValid(),
    source: () => sourceValid(),
    phone: () => phoneValid(),
    role: () => Boolean(state.role),
    age: () => ageValid(),
    goal: () => goalValid(),
    subject: () => state.reached > idx("subject"),
    try: () => false
  };

  function canVisit(index) {
    if (index > state.reached) return false;
    return STEPS.slice(0, index).every((s) => s === "subject" || VALID[s]());
  }

  const stepper = $("stepper");
  function buildStepper() {
    stepper.innerHTML = STEPS.map((s, i) => `
    <li><button type="button" class="step" data-step="${s}" aria-label="Step ${i + 1} of ${STEPS.length}: ${STEP_LABELS[s]}"><span class="step-dot"><span class="n" aria-hidden="true">${i + 1}<span class="of">/${STEPS.length}</span></span></span></button></li>`).join("");
  }
  buildStepper();
  // Students get an extra age step after their role
  function syncSteps() {
    const next = state.role === "student" ? STUDENT_STEPS : BASE_STEPS;
    if (next === STEPS) return;
    STEPS = next;
    buildStepper();
  }

  function renderStepper() {
    const current = STEPS.indexOf(state.step);
    const answered = STEPS.map((s) => VALID[s]());
    document.querySelectorAll(".stepper .step").forEach((btn, i) => {
      btn.classList.toggle("is-current", i === current);
      btn.classList.toggle("is-done", i !== current && i <= state.reached && answered[i]);
      btn.disabled = i === current || !canVisit(i);
      if (i === current) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    });
  }

  stepper.addEventListener("click", (e) => {
    const btn = e.target.closest(".step");
    if (!btn) return;
    const i = STEPS.indexOf(btn.dataset.step);
    const current = STEPS.indexOf(state.step);
    if (i === current || !canVisit(i)) return;
    if (STEPS[i] === "goal") renderGoal();
    if (STEPS[i] === "subject") renderSubject();
    if (STEPS[i] === "try") paintTry();
    go(STEPS[i], i < current ? "back" : "forward");
  });

  function chipValue(group) {
    const typed = $(group === "subject" ? "subjectOther" : "gradeOther").value.trim();
    const picks = state[group].map((v) => (v === "Other" ? typed : tr(v))).filter(Boolean);
    const prefix = `${tr("Grade 1").replace(/\d+$/, "")}`;
    if (group === "grade" && picks.length === 2 && picks.every((g) => g.startsWith(prefix))) {
      return `${prefix}${picks[0].slice(prefix.length)} & ${picks[1].slice(prefix.length)}`;
    }
    return picks.join(" & ");
  }

  /* ---------- Step 1: name + profile picture ---------- */
  const nameInput = $("nameInput");
  const nameNext = $("nameNext");
  const nameHint = $("nameHint");
  const avatarRoot = $("avatars");

  function nameValid() {
    return state.name.trim().length > 0;
  }

  const playerAv = $("playerAv");
  const playerImg = $("playerImg");
  const playerName = $("playerName");

  let nameWasValid = false;
  function syncName() {
    const valid = nameValid();
    nameNext.setAttribute("aria-disabled", valid ? "false" : "true");
    $("nameLine").classList.toggle("is-filled", valid);
    playerName.textContent = state.name.trim() || "Your name";
    playerName.classList.toggle("is-empty", !valid);
    nameHint.classList.remove("is-warn");
    nameHint.innerHTML = `${icon("info")}<span>Add your name to continue</span>`;
    if (valid && !nameWasValid) restartClass(nameNext, "is-ready");
    nameWasValid = valid;
    renderStepper();
  }

  let greeted = "";
  nameInput.addEventListener("input", () => {
    state.name = nameInput.value;
    syncName();
    clearTimeout(nameInput.t);
    nameInput.t = setTimeout(() => {
      const n = firstName();
      if (n && n !== greeted) {
        greeted = n;
        hop();
        react(`Hey, ${n}!`);
      }
    }, 650);
  });
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") nameNext.click();
  });

  function showOnPlayer(src, trying) {
    if (playerImg.getAttribute("src") !== src) playerImg.src = src;
    playerAv.classList.toggle("trying", trying);
  }

  function selectAvatar(btn, src) {
    avatarRoot.querySelectorAll(".avatar").forEach((a) => a.setAttribute("aria-checked", a === btn ? "true" : "false"));
    state.avatar = src;
    showOnPlayer(src, false);
    restartClass(playerAv, "equip");
    burstFrom(playerAv, { count: 14, spread: 360, power: 0.8 });
    hop();
    react(pick(["Looking good!", "Love that look!", "So you!"]));
  }

  // Try-on: hovering previews a look on the player card; leaving the grid puts the equipped one back.
  if (window.matchMedia("(hover: hover)").matches) {
    avatarRoot.addEventListener("pointerover", (e) => {
      const src = e.target.closest(".avatar")?.dataset.src;
      if (src) showOnPlayer(src, src !== state.avatar);
    });
    avatarRoot.addEventListener("pointerleave", () => showOnPlayer(state.avatar, false));
  }

  AVATARS.forEach((src, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "avatar";
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", i === 0 ? "true" : "false");
    b.setAttribute("aria-label", AVATAR_NAMES[i]);
    b.style.setProperty("--i", i + 1);
    b.dataset.src = src;
    b.innerHTML = `<img src="${src}" alt="" /><span class="tick">${icon("check")}</span>`;
    b.addEventListener("click", () => selectAvatar(b, src));
    avatarRoot.appendChild(b);
  });
  const upload = document.createElement("button");
  upload.type = "button";
  upload.className = "avatar avatar-upload";
  upload.setAttribute("role", "radio");
  upload.setAttribute("aria-checked", "false");
  upload.setAttribute("aria-label", "Upload your own photo");
  upload.style.setProperty("--i", 0);
  upload.innerHTML = `${icon("camera")}<span class="tick">${icon("check")}</span>`;
  // A button can't hold another button, so the remove control sits beside the upload in a shared slot
  const uploadSlot = document.createElement("div");
  uploadSlot.className = "avatar-slot";
  const removePhoto = document.createElement("button");
  removePhoto.type = "button";
  removePhoto.className = "avatar-remove";
  removePhoto.setAttribute("aria-label", "Remove your photo");
  removePhoto.title = "Remove photo";
  removePhoto.innerHTML = icon("x");
  uploadSlot.append(upload, removePhoto);
  avatarRoot.prepend(uploadSlot);
  makeSwipe(avatarRoot);
  makeSwipe($("subjectChips"));
  makeSwipe($("gradeGroups"));
  removePhoto.addEventListener("click", () => {
    const wasEquipped = state.avatar === upload.dataset.src;
    URL.revokeObjectURL(upload.dataset.src);
    delete upload.dataset.src;
    upload.classList.remove("has-photo");
    uploadSlot.classList.remove("has-photo");
    upload.innerHTML = `${icon("camera")}<span class="tick">${icon("check")}</span>`;
    upload.setAttribute("aria-checked", "false");
    if (wasEquipped) {
      const first = avatarRoot.querySelector(".avatar:not(.avatar-upload)");
      first.setAttribute("aria-checked", "true");
      state.avatar = first.dataset.src;
      showOnPlayer(state.avatar, false);
      restartClass(playerAv, "equip");
    }
    upload.focus();
    react("Photo removed.");
  });
  const avatarFile = $("avatarFile");
  upload.addEventListener("click", () => {
    if (upload.dataset.src && upload.getAttribute("aria-checked") !== "true") selectAvatar(upload, upload.dataset.src);
    else avatarFile.click();
  });
  avatarFile.addEventListener("change", () => {
    const file = avatarFile.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (upload.dataset.src) URL.revokeObjectURL(upload.dataset.src);
    const url = URL.createObjectURL(file);
    upload.dataset.src = url;
    upload.classList.add("has-photo");
    uploadSlot.classList.add("has-photo");
    upload.innerHTML = `<img src="${url}" alt="" /><span class="tick">${icon("check")}</span>`;
    selectAvatar(upload, url);
    avatarFile.value = "";
  });

  nameNext.addEventListener("click", () => {
    if (!nameValid()) {
      restartClass(nameNext, "shake");
      nameHint.classList.add("is-warn");
      nameInput.focus();
      return;
    }
    go("source");
  });

  /* ---------- Step 2: where they heard about us ---------- */
  const sourceRoot = $("sources");
  const sourceNext = $("sourceNext");
  const sourceHint = $("sourceHint");
  const srcOtherReveal = document.createElement("div");
  srcOtherReveal.className = "reveal src-other-reveal";
  srcOtherReveal.innerHTML = `<div class="reveal-inner"><input class="field" type="text" placeholder="Where did you hear about us?" aria-label="Where did you hear about us?" autocomplete="off" /></div>`;
  const srcOther = srcOtherReveal.querySelector("input");
  const srcEventReveal = document.createElement("div");
  srcEventReveal.className = "reveal src-follow";
  srcEventReveal.innerHTML = `<div class="reveal-inner"><div class="src-follow-box"><label class="follow-label" for="srcEvent">Which event was it? <span class="follow-opt">Optional</span></label><input class="field" id="srcEvent" type="text" placeholder="For example, a teacher workshop or an education expo" autocomplete="off" /></div></div>`;
  const srcEvent = srcEventReveal.querySelector("input");
  srcEvent.addEventListener("input", () => { state.sourceEvent = srcEvent.value.trim(); });
  srcEvent.addEventListener("keydown", (e) => { if (e.key === "Enter") sourceNext.click(); });

  function sourceValid() {
    if (!state.source) return false;
    return state.source !== "other" || Boolean(srcOther.value.trim());
  }

  let sourceWasValid = false;
  function syncSource() {
    const valid = sourceValid();
    sourceNext.setAttribute("aria-disabled", valid ? "false" : "true");
    sourceHint.classList.remove("is-warn");
    sourceHint.innerHTML = `${icon("info")}<span>${state.source === "other" ? "Tell us where in a few words" : "Choose one to continue"}</span>`;
    if (valid && !sourceWasValid) restartClass(sourceNext, "is-ready");
    sourceWasValid = valid;
    renderStepper();
  }

  SOURCES.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `src${s.id === "other" ? " src-other" : ""}`;
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", "false");
    b.dataset.tone = s.tone;
    b.dataset.source = s.id;
    b.style.setProperty("--i", i);
    b.innerHTML = `<span class="src-ico">${icon(s.icon)}</span><span class="src-label">${escapeHtml(s.label)}${s.sub ? `<small>${escapeHtml(s.sub)}</small>` : ""}</span><span class="radio-dot">${icon("check")}</span>`;
    b.addEventListener("click", () => {
      const fresh = state.source !== s.id;
      state.source = s.id;
      sourceRoot.querySelectorAll(".src").forEach((x) => x.setAttribute("aria-checked", x === b ? "true" : "false"));
      srcOtherReveal.classList.toggle("open", s.id === "other");
      srcEventReveal.classList.toggle("open", s.id === "events");
      if (s.id === "other") setTimeout(() => srcOther.focus({ preventScroll: true }), 220);
      if (s.id === "events" && fresh) setTimeout(() => srcEvent.focus({ preventScroll: true }), 220);
      if (fresh) {
        burstFrom(b.querySelector(".src-ico"), { count: 10, spread: 360, power: 0.7 });
        hop();
        react(pick(CHEERS));
      }
      syncSource();
    });
    sourceRoot.appendChild(b);
    // Full-width row right after the Events row, so the question sits next to the answer it follows up on
    if (s.id === "people") sourceRoot.appendChild(srcEventReveal);
  });
  sourceRoot.appendChild(srcOtherReveal);
  srcOther.addEventListener("input", syncSource);
  srcOther.addEventListener("keydown", (e) => { if (e.key === "Enter") sourceNext.click(); });

  sourceNext.addEventListener("click", () => {
    if (!sourceValid()) {
      restartClass(sourceNext, "shake");
      sourceHint.classList.add("is-warn");
      return;
    }
    go("phone");
  });
  $("sourceBack").addEventListener("click", () => go("name", "back"));

  /* ---------- Step 3: phone + promo consent ---------- */
  const phoneInput = $("phoneInput");
  const phoneField = $("phoneField");
  const phoneHelp = $("phoneHelp");
  const phoneNext = $("phoneNext");
  const cc = $("cc");
  const ccBtn = $("ccBtn");
  const ccList = $("ccList");
  const ccSearch = $("ccSearch");
  const phoneNextText = phoneNext.querySelector(".btn-text");

  function phoneValid() {
    return state.phone.length >= 7 && state.phone.length <= 13;
  }

  function paintCountry() {
    $("ccFlag").src = flagSrc(state.country[0]);
    $("ccCode").textContent = state.country[2];
    ccBtn.setAttribute("aria-label", `Country code: ${state.country[1]} ${state.country[2]}`);
  }

  function renderCountries(q = "") {
    const term = q.trim().toLowerCase();
    const list = COUNTRIES.filter(([, name, dial]) => !term || name.toLowerCase().includes(term) || tr(name).toLowerCase().includes(term) || dial.includes(term));
    ccList.innerHTML = list.length ? "" : `<p class="cc-empty">No country found</p>`;
    list.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cc-opt";
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", c === state.country ? "true" : "false");
      b.innerHTML = `<span class="cc-flag">${flag(c[0])}</span><span class="cc-name">${c[1]}</span><span class="cc-dial">${c[2]}</span>`;
      b.addEventListener("click", () => {
        state.country = c;
        paintCountry();
        closeCC();
        formatPhone();
        phoneInput.focus();
      });
      ccList.appendChild(b);
    });
  }

  function openCC() {
    cc.classList.add("open");
    ccBtn.setAttribute("aria-expanded", "true");
    ccSearch.value = "";
    renderCountries();
    setTimeout(() => ccSearch.focus(), 60);
  }
  function closeCC() {
    cc.classList.remove("open");
    ccBtn.setAttribute("aria-expanded", "false");
  }
  ccBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cc.classList.contains("open")) closeCC();
    else openCC();
  });
  ccSearch.addEventListener("input", () => renderCountries(ccSearch.value));
  ccSearch.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      ccList.querySelector(".cc-opt")?.focus();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      ccList.querySelector(".cc-opt")?.click();
    }
  });
  ccList.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const opts = [...ccList.querySelectorAll(".cc-opt")];
    const i = opts.indexOf(document.activeElement);
    const next = e.key === "ArrowDown" ? opts[i + 1] : opts[i - 1];
    if (next) next.focus();
    else if (e.key === "ArrowUp") ccSearch.focus();
  });
  document.addEventListener("click", (e) => { if (!cc.contains(e.target)) closeCC(); });

  function paintPhoneNext() {
    const ready = phoneValid();
    phoneNextText.textContent = "Next";
    phoneNext.setAttribute("aria-disabled", ready ? "false" : "true");
    if (ready) $("phoneHint").classList.remove("is-warn");
  }

  let phoneWasValid = false;
  function syncPhone(note = "") {
    const valid = phoneValid();
    phoneField.classList.remove("is-error");
    phoneField.classList.toggle("is-valid", valid);
    phoneHelp.classList.remove("is-warn");
    phoneHelp.classList.toggle("is-note", Boolean(note));
    phoneHelp.innerHTML = note ? `${icon("info")}<span>${escapeHtml(note)}</span>` : "";
    paintPhoneNext();
    if (valid && !phoneWasValid) {
      restartClass(phoneNext, "is-ready");
      hop();
      react("Got it!");
    }
    phoneWasValid = valid;
    renderStepper();
  }

  function formatPhone() {
    let d = phoneInput.value.replace(/\D/g, "");
    let note = "";
    const dial = state.country[2].slice(1);
    if (phoneInput.value.trim().startsWith("+") && d.startsWith(dial)) {
      d = d.slice(dial.length);
      note = `No need to type ${state.country[2]} again, it's already added`;
    }
    if (d.startsWith("0")) {
      d = d.replace(/^0+/, "");
      note = `No need for the first 0, ${state.country[2]} covers it`;
    }
    d = d.slice(0, 13);
    state.phone = d;
    if (d) state.phoneSkipped = false;
    phoneInput.value = [d.slice(0, 3), d.slice(3, 7), d.slice(7)].filter(Boolean).join(" ");
    syncPhone(note);
  }
  phoneInput.addEventListener("input", formatPhone);
  phoneInput.addEventListener("keydown", (e) => { if (e.key === "Enter") phoneNext.click(); });

  phoneNext.addEventListener("click", () => {
    if (!state.phone) {
      restartClass(phoneField, "is-error");
      restartClass(phoneNext, "shake");
      const hint = $("phoneHint");
      hint.innerHTML = `${icon("alert")}<span>Enter your phone number to continue</span>`;
      hint.classList.add("is-warn");
      phoneInput.focus();
      return;
    }
    if (!phoneValid()) {
      restartClass(phoneField, "is-error");
      phoneHelp.classList.remove("is-note");
      phoneHelp.classList.add("is-warn");
      phoneHelp.innerHTML = `${icon("info")}<span>This number looks too short. Please check it.</span>`;
      restartClass(phoneNext, "shake");
      phoneInput.focus();
      return;
    }
    state.phoneSkipped = false;
    go("role");
  });
  $("phoneBack").addEventListener("click", () => go("source", "back"));

  const consent = $("consent");
  const consentBox = $("consentBox");
  function paintConsent() {
    const minor = isMinor();
    consent.classList.toggle("is-locked", minor);
    consentBox.disabled = minor;
    consentBox.checked = !minor && state.consent;
    consent.classList.toggle("is-yes", !minor && state.consent);
  }
  consent.addEventListener("click", (e) => {
    if (isMinor() && e.target.closest(".consent-check")) react("We don't send marketing to anyone under 13.");
  });
  consentBox.addEventListener("change", () => {
    state.consent = consentBox.checked;
    applyMinorRules();
    renderStepper();
    if (state.consent) {
      hop();
      burstFrom(consentBox.nextElementSibling, { count: 14, spread: 200, power: 1 });
      react("Yay! Only the good stuff.");
    }
  });

  paintCountry();
  syncName();
  syncSource();
  syncPhone();

  /* ---------- Step 4: role ---------- */
  const roleRadios = [...roleGroup.querySelectorAll('[role="radio"]')];
  const otherWrap = $("otherWrap");
  const otherReveal = $("otherReveal");
  const otherInput = $("otherInput");
  const otherGo = $("otherGo");

  function markRole(role) {
    roleRadios.forEach((r) => r.setAttribute("aria-checked", r.dataset.role === role ? "true" : "false"));
    otherWrap.classList.toggle("is-selected", role === "other");
    otherReveal.classList.toggle("open", role === "other");
    roleGroup.classList.toggle("has-choice", Boolean(role));
    if (role) $("roleHint").classList.remove("is-warn");
    syncOther();
  }

  function setAccent(role) {
    if (role) document.body.dataset.role = role;
    else delete document.body.dataset.role;
  }

  function commitRole(role) {
    const changed = state.role !== role;
    state.role = role;
    syncSteps();
    applyMinorRules();
    if (changed) {
      state.job = null;
      state.goalFor = null;
      state.subject = [];
      state.grade = [];
      state.subjectFor = null;
      state.reached = idx("role");
    }
    const loading = $("loading");
    $("loadingSub").textContent = ROLES[role].loading;
    loading.classList.add("show");
    setTimeout(() => {
      if (role === "student") {
        renderAge();
        go("age");
      } else {
        renderGoal();
        go("goal");
      }
      loading.classList.remove("show");
    }, changed ? 950 : 380);
  }

  roleRadios.forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.role;
      markRole(role);
      setAccent(role);
      burstFrom(btn.querySelector(".tile-icon, .other-icon"), { count: 12, spread: 360, power: 0.9 });
      hop();
      if (role === "other") {
        syncOther();
        setTimeout(() => otherInput.focus(), 200);
        return;
      }
      react(pick(CHEERS));
      commitRole(role);
    });
  });

  // Marker trail behind the try card: brand colors blend along the stroke, then fade
  const tryInk = $("tryInk");
  const INK_COLORS = [[232, 64, 138], [244, 163, 198], [63, 163, 232], [43, 111, 216]];
  const INK_LIFE = 700;
  const INK_SPAN = 140;
  let inkPoints = [];
  let inkFrame = 0;
  let inkDist = 0;
  const inkColor = (d) => {
    const pos = (d / INK_SPAN) % INK_COLORS.length;
    const a = INK_COLORS[Math.floor(pos)];
    const b = INK_COLORS[(Math.floor(pos) + 1) % INK_COLORS.length];
    const k = pos % 1;
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",")})`;
  };
  function sizeInk() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(tryCard.clientWidth * dpr);
    const h = Math.round(tryCard.clientHeight * dpr);
    if (tryInk.width !== w || tryInk.height !== h) { tryInk.width = w; tryInk.height = h; }
  }
  function drawInk() {
    const ctx = tryInk.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const now = performance.now();
    inkPoints = inkPoints.filter((p) => now - p.t < INK_LIFE);
    ctx.clearRect(0, 0, tryInk.width, tryInk.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 1; i < inkPoints.length; i++) {
      const a = inkPoints[i - 1];
      const b = inkPoints[i];
      if (b.t - a.t > 90) continue;
      const life = 1 - (now - b.t) / INK_LIFE;
      ctx.globalAlpha = 0.5 * life;
      ctx.strokeStyle = b.c;
      ctx.lineWidth = 11 * dpr * (0.35 + 0.65 * life);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    inkFrame = inkPoints.length ? requestAnimationFrame(drawInk) : 0;
  }
  tryCard.addEventListener("pointerenter", sizeInk);
  tryCard.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch" || reduceMotion) return;
    const dpr = window.devicePixelRatio || 1;
    const r = tryCard.getBoundingClientRect();
    const x = (e.clientX - r.left) * dpr;
    const y = (e.clientY - r.top) * dpr;
    const last = inkPoints[inkPoints.length - 1];
    if (last) inkDist += Math.hypot(x - last.x, y - last.y) / dpr;
    inkPoints.push({ x, y, t: performance.now(), c: inkColor(inkDist) });
    if (!inkFrame) inkFrame = requestAnimationFrame(drawInk);
  });
  roleGroup.querySelectorAll(".tile, .other-wrap").forEach((el) => {
    el.addEventListener("pointermove", spotlight);
    el.addEventListener("pointerenter", () => blrStory.classList.add("is-looking"));
    el.addEventListener("pointerleave", () => blrStory.classList.remove("is-looking"));
  });

  function syncOther() {
    const ready = otherWrap.classList.contains("is-selected") && Boolean(otherInput.value.trim());
    otherGo.setAttribute("aria-disabled", ready ? "false" : "true");
    $("roleNext").setAttribute("aria-disabled", ready ? "false" : "true");
    if (ready) $("roleHint").classList.remove("is-warn");
  }
  otherInput.addEventListener("input", syncOther);
  $("roleBack").addEventListener("click", () => go("phone", "back"));
  $("roleNext").addEventListener("click", (e) => {
    if (otherWrap.classList.contains("is-selected")) {
      $("otherForm").requestSubmit();
      return;
    }
    restartClass(e.currentTarget, "shake");
    const hint = $("roleHint");
    hint.innerHTML = `${icon("alert")}Pick the role that fits you`;
    hint.classList.add("is-warn");
  });
  $("otherForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = otherInput.value.trim();
    if (!value) {
      restartClass(otherGo, "shake");
      restartClass($("roleNext"), "shake");
      otherInput.focus();
      return;
    }
    state.otherRole = value;
    commitRole("other");
  });

  /* ---------- Step 4b: age + how a student joins ---------- */
  const MINOR_AGE = 13;
  const AGE_MIN = 4;
  const AGE_MAX = 99;
  const JOIN_WAYS = [
    { id: "school", icon: "school", label: "Through my school" },
    { id: "guardian", icon: "users", label: "With a parent or guardian" },
    { id: "own", icon: "user", label: "On my own", minAge: MINOR_AGE }
  ];
  const ageNext = $("ageNext");
  const ageHint = $("ageHint");
  const ageInput = $("ageInput");
  const guardianEmail = $("guardianEmail");
  const guardianHelp = $("guardianHelp");
  const sameEmailBox = $("sameEmailBox");
  const isMinor = () => state.role === "student" && state.age !== null && state.age < MINOR_AGE;
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  // A single digit under 4 can still become 10–13, so don't treat it as a finished age.
  function parseAge(raw) {
    if (!/^\d{1,2}$/.test(raw)) return { age: null, status: raw ? "invalid" : "empty" };
    const n = Number(raw);
    if (n >= AGE_MIN && n <= AGE_MAX) return { age: n, status: "ok" };
    if (raw.length === 1 && n > 0 && n < AGE_MIN) return { age: null, status: "partial" };
    return { age: null, status: "invalid" };
  }

  // Under 13: private projects and no marketing, whatever they chose earlier on the phone step
  function applyMinorRules() {
    const minor = isMinor();
    state.projectsPrivate = minor;
    state.marketingAllowed = !minor && state.consent === true;
    document.body.classList.toggle("is-minor", minor);
    paintConsent();
  }

  // Google or code sign-in leaves no email in this prototype, so fall back to a demo address
  const signupEmail = () => document.body.dataset.signupEmail || "angela@gmail.com";
  const needsGuardianEmail = () => Boolean(state.joinVia) && (isMinor() || state.joinVia === "guardian");

  function ageValid() {
    if (state.age === null || !state.joinVia) return false;
    return !needsGuardianEmail() || state.guardianSame || emailOk(state.guardianEmail);
  }

  let agePainted = false;
  function renderAge() {
    if (agePainted) return;
    agePainted = true;
    if (state.age !== null) ageInput.value = String(state.age);
    const root = $("joinOptions");
    JOIN_WAYS.forEach((way, i) => {
      const wrap = document.createElement("div");
      wrap.className = "opt-wrap";
      wrap.dataset.join = way.id;
      wrap.style.setProperty("--i", i);
      wrap.innerHTML = `
        <button class="opt" type="button" role="radio" aria-checked="false">
          <span class="opt-icon">${icon(way.icon)}</span>
          <span class="opt-text"><span class="opt-label">${escapeHtml(way.label)}</span>${way.minAge ? `<span class="opt-sub">${icon("lock")}<span>From age ${way.minAge}</span></span>` : ""}</span>
          <span class="radio-dot">${icon("check")}</span>
        </button>`;
      wrap.querySelector(".opt").addEventListener("click", () => pickJoin(way, wrap));
      root.appendChild(wrap);
    });
    if (document.body.dataset.joinedBy === "code" && !state.joinVia) state.joinVia = "school";
    paintAge();
  }

  function commitTypedAge() {
    const raw = ageInput.value.replace(/\D/g, "").slice(0, 2);
    if (ageInput.value !== raw) ageInput.value = raw;
    const parsed = parseAge(raw);
    const prev = state.age;
    state.age = parsed.age;
    $("ageField").classList.toggle("is-error", parsed.status === "invalid");
    if (parsed.age !== null && isMinor() && state.joinVia === "own") state.joinVia = null;
    applyMinorRules();
    const fresh = parsed.age !== null && parsed.age !== prev;
    if (fresh) {
      if (isMinor() && prev !== null && prev >= MINOR_AGE) react("Ask your school or a grown-up to join with you.");
      else react(isMinor() ? "Thanks! I'll keep things extra safe for you." : pick(CHEERS));
      hop();
      const target = isMinor() ? $("minorReveal") : $("joinReveal");
      setTimeout(() => target.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" }), 280);
    }
    paintAge(parsed.status);
  }

  function pickJoin(way, wrap) {
    if (way.minAge && isMinor()) {
      restartClass(wrap, "shake");
      react("You can join on your own from age 13. Pick your school or a parent for now.");
      return;
    }
    const fresh = state.joinVia !== way.id;
    state.joinVia = way.id;
    if (fresh) {
      burstFrom(wrap.querySelector(".radio-dot"), { count: 8, spread: 360, power: 0.6 });
      hop();
      react(pick(CHEERS));
    }
    paintAge();
    if (fresh && needsGuardianEmail()) {
      setTimeout(() => $("guardianReveal").scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" }), 280);
    }
  }

  let ageWasValid = false;
  function paintAge(ageStatus = "empty") {
    const minor = isMinor();
    $("joinReveal").classList.toggle("open", state.age !== null);
    $("minorReveal").classList.toggle("open", minor);
    $("joinOptions").querySelectorAll(".opt-wrap").forEach((w) => {
      const on = w.dataset.join === state.joinVia;
      const locked = w.dataset.join === "own" && minor;
      w.classList.toggle("is-selected", on);
      w.classList.toggle("is-locked", locked);
      const btn = w.querySelector(".opt");
      btn.disabled = locked;
      btn.setAttribute("aria-checked", on ? "true" : "false");
      btn.setAttribute("aria-disabled", locked ? "true" : "false");
    });
    $("guardianReveal").classList.toggle("open", needsGuardianEmail());
    sameEmailBox.checked = state.guardianSame;
    guardianEmail.readOnly = state.guardianSame;
    const valid = ageValid();
    ageNext.setAttribute("aria-disabled", valid ? "false" : "true");
    ageHint.classList.remove("is-warn");
    const need = ageStatus === "invalid" ? "Type an age between 4 and 99"
      : state.age === null ? "Type your age to continue"
      : !state.joinVia ? "Choose how you're joining"
      : "Add your parent or guardian's email";
    ageHint.innerHTML = `${icon("info")}<span>${need}</span>`;
    if (valid && !ageWasValid) restartClass(ageNext, "is-ready");
    ageWasValid = valid;
    renderStepper();
  }

  ageInput.addEventListener("input", commitTypedAge);
  ageInput.addEventListener("keydown", (e) => { if (e.key === "Enter") ageNext.click(); });

  guardianEmail.addEventListener("input", () => {
    state.guardianEmail = guardianEmail.value.trim();
    guardianHelp.classList.remove("is-warn");
    guardianHelp.textContent = "";
    $("guardianField").classList.toggle("is-ok", emailOk(state.guardianEmail));
    paintAge();
  });
  guardianEmail.addEventListener("keydown", (e) => { if (e.key === "Enter") ageNext.click(); });
  sameEmailBox.addEventListener("change", () => {
    state.guardianSame = sameEmailBox.checked;
    guardianEmail.value = sameEmailBox.checked ? signupEmail() : "";
    guardianEmail.dispatchEvent(new Event("input", { bubbles: true }));
    if (sameEmailBox.checked) react("Got it!");
    else guardianEmail.focus();
  });

  ageNext.addEventListener("click", () => {
    if (!ageValid()) {
      restartClass(ageNext, "shake");
      ageHint.classList.add("is-warn");
      const parsed = parseAge(ageInput.value.trim());
      if (parsed.status === "invalid" || parsed.status === "empty" || parsed.status === "partial") {
        if (parsed.status === "invalid") $("ageField").classList.add("is-error");
        ageInput.focus();
      } else if (needsGuardianEmail() && state.guardianEmail && !emailOk(state.guardianEmail)) {
        restartClass($("guardianField"), "is-error");
        guardianHelp.classList.add("is-warn");
        guardianHelp.innerHTML = `${icon("info")}<span>This email doesn't look right. Please check it.</span>`;
        guardianEmail.focus();
      } else if (needsGuardianEmail()) {
        guardianEmail.focus();
      }
      return;
    }
    applyMinorRules();
    renderGoal();
    go("goal");
  });
  $("ageBack").addEventListener("click", () => go("role", "back"));

  /* ---------- Step 2: goal ---------- */
  function renderGoal() {
    if (state.goalFor === state.role) return;
    state.goalFor = state.role;
    const root = $("goalOptions");
    root.innerHTML = "";
    FLOWS[state.role].jobs.forEach((job, i) => {
      const wrap = document.createElement("div");
      wrap.className = "opt-wrap";
      wrap.style.setProperty("--i", i);
      wrap.innerHTML = `
        <button class="opt" type="button" role="radio" aria-checked="false">
          <span class="opt-icon">${icon(job.icon)}</span>
          <span class="opt-label">${escapeHtml(job.label)}</span>
          <span class="radio-dot">${icon("check")}</span>
        </button>`;
      const body = buildFollow(job);
      if (body) {
        const reveal = document.createElement("div");
        reveal.className = "reveal";
        const inner = document.createElement("div");
        inner.className = "reveal-inner";
        inner.appendChild(body);
        reveal.appendChild(inner);
        wrap.appendChild(reveal);
      }
      const btn = wrap.querySelector(".opt");
      btn.addEventListener("click", () => selectJob(job, wrap));
      root.appendChild(wrap);
    });
    syncNext(true);
  }

  function buildFollow(job) {
    if (!job.ask) return null;
    const body = document.createElement("div");
    body.className = "follow-body";

    const ask = ASKS[job.ask];
    if (ask.type === "choice") {
      body.innerHTML = `<p class="follow-label">${escapeHtml(ask.label)}</p><div class="mini-chips" role="radiogroup" aria-label="${escapeHtml(ask.label)}"></div>`;
      const list = body.querySelector(".mini-chips");
      const otherField = document.createElement("input");
      otherField.className = "field";
      otherField.type = "text";
      otherField.placeholder = ask.otherPlaceholder;
      otherField.hidden = true;
      ask.options.forEach((label) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "mini-chip";
        chip.setAttribute("role", "radio");
        chip.setAttribute("aria-checked", "false");
        chip.dataset.value = label;
        chip.innerHTML = `<span>${escapeHtml(label)}</span>`;
        chip.addEventListener("click", () => {
          list.querySelectorAll(".mini-chip").forEach((c) => {
            const on = c === chip;
            c.setAttribute("aria-checked", on ? "true" : "false");
            c.innerHTML = `${on ? icon("check") : ""}<span>${escapeHtml(c.dataset.value)}</span>`;
          });
          otherField.hidden = label !== "Other";
          if (label === "Other") otherField.focus();
          else otherField.value = "";
          react(pick(CHEERS));
        });
        list.appendChild(chip);
      });
      body.appendChild(otherField);
      return body;
    }

    body.innerHTML = `
      <label class="follow-label">${escapeHtml(ask.label)}</label>
      ${ask.hint ? `<p class="follow-hint">${escapeHtml(ask.hint)}</p>` : ""}
      <input class="field" type="text" placeholder="${escapeHtml(ask.placeholder)}" autocomplete="off" />`;
    const field = body.querySelector("input");
    const label = body.querySelector("label");
    const id = `ask-${job.id}-${Math.random().toString(36).slice(2, 7)}`;
    field.id = id;
    label.htmlFor = id;
    return body;
  }

  function selectJob(job, wrap) {
    const root = $("goalOptions");
    const fresh = state.job !== job;
    state.job = job;
    root.querySelectorAll(".opt-wrap").forEach((w) => {
      const on = w === wrap;
      w.classList.toggle("is-selected", on);
      w.querySelector(".opt").setAttribute("aria-checked", on ? "true" : "false");
      w.querySelector(".reveal")?.classList.toggle("open", on);
    });
    if (fresh) {
      burstFrom(wrap.querySelector(".radio-dot"), { count: 8, spread: 360, power: 0.6 });
      hop();
      react(pick(CHEERS));
      const field = wrap.querySelector(".reveal input:not([hidden])");
      if (field && !field.value) setTimeout(() => field.focus({ preventScroll: true }), 260);
      setTimeout(() => wrap.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" }), 300);
    }
    syncNext();
  }

  function detailValue() {
    const wrap = document.querySelector("#goalOptions .opt-wrap.is-selected");
    if (!wrap) return "";
    const choice = wrap.querySelector('.mini-chip[aria-checked="true"]');
    if (choice) {
      const extra = wrap.querySelector("input.field:not([hidden])");
      return choice.dataset.value === "Other" && extra?.value.trim() ? extra.value.trim() : choice.dataset.value;
    }
    const field = wrap.querySelector("input.field");
    if (field && field.value.trim()) return field.value.trim();
    const example = wrap.querySelector('.example[aria-checked="true"]');
    if (example) return example.textContent.trim();
    return "";
  }

  let wasValid = false;
  function syncNext(reset = false) {
    const valid = goalValid();
    goalNext.setAttribute("aria-disabled", valid ? "false" : "true");
    goalHint.classList.remove("is-warn");
    goalHint.innerHTML = `${icon("info")}<span>${state.job?.ask === "motivation" ? "Add a few words about your motivation" : "Choose one to continue"}</span>`;
    if (valid && !wasValid && !reset) restartClass(goalNext, "is-ready");
    wasValid = valid;
    renderStepper();
  }
  $("goalOptions").addEventListener("input", () => syncNext());

  goalNext.addEventListener("click", () => {
    if (!goalValid()) {
      restartClass(goalNext, "shake");
      goalHint.classList.add("is-warn");
      return;
    }
    renderSubject();
    go("subject");
  });
  $("goalBack").addEventListener("click", () => go(state.role === "student" ? "age" : "role", "back"));

  /* ---------- Step 3: subject + grade ---------- */
  function makeChip(label, iconName, group, extraClass = "") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip ${extraClass}`.trim();
    btn.setAttribute("role", singlePick() ? "radio" : "checkbox");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.group = group;
    btn.dataset.value = label;
    if (iconName) btn.innerHTML = `<span class="chip-ico">${icon(iconName)}</span><span>${escapeHtml(label)}</span>`;
    else {
      btn.textContent = label.replace("Grade ", "");
      btn.setAttribute("aria-label", label);
    }
    btn.addEventListener("click", () => selectChip(btn));
    return btn;
  }

  function renderSubject() {
    const single = singlePick();
    const maxTag = single ? ` <span class="q-max">Optional</span>` : ` <span class="q-max">Up to 2</span>`;
    const subjectQ = single ? STUDENT_SUBJECT_QS[state.job?.id] || "Which subject is your project about?"
      : fieldRole(state.role) ? "Pick a field"
      : state.role === "parent" ? "Which subjects would you like to focus on?" : "Pick a subject";
    $("subjectQ").innerHTML = `${escapeHtml(subjectQ)}${maxTag}`;
    $("gradeQ").innerHTML = `${escapeHtml((SUBJECT_QS[state.role] || SUBJECT_QS.other)[1])}${maxTag}`;
    ["subjectChips", "gradeGroups"].forEach((id) => $(id).setAttribute("role", single ? "radiogroup" : "group"));
    if (state.subjectFor === state.role) return;
    state.subjectFor = state.role;

    const subjectRoot = $("subjectChips");
    subjectRoot.innerHTML = "";
    (fieldRole(state.role) ? LECTURER_FIELDS : SUBJECTS).forEach(([name, ico], i) => {
      const chip = makeChip(name, ico, "subject");
      chip.style.setProperty("--i", i);
      subjectRoot.appendChild(chip);
    });
    $("subjectOther").value = "";
    $("subjectOtherReveal").classList.remove("open");
    $("gradeOther").value = "";
    $("gradeOtherReveal").classList.remove("open");

    const gradeRoot = $("gradeGroups");
    gradeRoot.innerHTML = "";
    let n = 0;
    gradeGroupsFor(state.role).forEach((group) => {
      const block = document.createElement("div");
      block.className = "grade-group";
      block.innerHTML = `<p class="grade-group-label">${group.label}</p><div class="grade-row"></div>`;
      const row = block.querySelector(".grade-row");
      group.items.forEach((label) => {
        const kinder = label === "Kindergarten";
        const wide = !label.startsWith("Grade ") && !kinder;
        const chip = makeChip(label, null, "grade", wide ? "grade grade-wide" : "grade");
        if (wide) chip.textContent = label;
        if (kinder) {
          chip.textContent = "K";
          chip.title = label;
        }
        chip.style.setProperty("--i", n++);
        row.appendChild(chip);
      });
      gradeRoot.appendChild(block);
    });
  }

  const MAX_PICKS = 2;
  function selectChip(chip) {
    const group = chip.dataset.group;
    const chips = [...document.querySelectorAll(`.chip[data-group="${group}"]`)];
    const on = chip.getAttribute("aria-checked") === "true";
    if (!on && singlePick()) chips.forEach((c) => c.setAttribute("aria-checked", "false"));
    else if (!on && chips.filter((c) => c.getAttribute("aria-checked") === "true").length >= MAX_PICKS) {
      restartClass(chip, "is-full");
      react(`You can pick up to 2 ${group === "subject" ? "subjects" : "grades"}. Tap one to remove it.`);
      return;
    }
    chip.setAttribute("aria-checked", on ? "false" : "true");
    state[group] = chips.filter((c) => c.getAttribute("aria-checked") === "true").map((c) => c.dataset.value);
    const otherField = group === "subject" ? "subjectOther" : "gradeOther";
    $(`${otherField}Reveal`).classList.toggle("open", state[group].includes("Other"));
    if (!on && chip.dataset.value === "Other") setTimeout(() => $(otherField).focus({ preventScroll: true }), 200);
    if (on) return;
    burstFrom(chip, { count: 8, spread: 360, power: 0.55 });
    hop();
    react(state.subject.length && state.grade.length ? "Perfect, you're all set!" : pick(CHEERS));
  }

  $("subjectBack").addEventListener("click", () => go("goal", "back"));
  $("subjectNext").addEventListener("click", () => {
    paintTry();
    go("try");
  });

  /* ---------- Step 4: try it ---------- */
  function token(text, step) {
    return `<button type="button" class="token" data-step="${step}" aria-label="${escapeHtml(text)}. ${tr("Edit")}">${escapeHtml(text)}</button>`;
  }

  function paintTry() {
    const role = state.role;
    const goal = state.job?.id || "";
    const id = uiLang === "id";
    const raw = goal === "other" ? tr(detailValue()) : "";
    const extra = /^[A-Z][a-z]/.test(raw) ? raw.charAt(0).toLowerCase() + raw.slice(1) : raw;
    const aim = extra || tr(WANTS[goal] || "try Assemblr for what you need");
    const subject = chipValue("subject");
    const grade = chipValue("grade");
    const multi = grade && subject && /&/.test(grade + subject);
    const focus = id
      ? (multi ? `${subject} untuk ${grade}` : [subject, grade].filter(Boolean).join(" "))
      : (multi ? `${subject} for ${grade}` : [grade, subject].filter(Boolean).join(" "));
    const focusPart = focus ? ` ${id ? "di" : "in"} ${token(focus, "subject")}` : "";
    const typedRole = (state.otherRole || "").trim();
    const bareRole = typedRole.replace(/^(a|an)\s+/i, "");
    const customRole = bareRole
      ? (id ? bareRole : `${/^[aeiou]/i.test(bareRole) ? "an" : "a"} ${bareRole.charAt(0).toLowerCase()}${bareRole.slice(1)}`)
      : "";
    const asRole = role === "other" ? customRole : (ROLES[role]?.phrase ? tr(ROLES[role].phrase) : "");
    const rolePart = asRole ? ` ${id ? "sebagai" : "as"} ${token(asRole, "role")}` : "";
    const name = escapeHtml(firstName());
    const who = name ? `, ${name}` : "";
    $("tryFit").innerHTML = id
      ? `Siap ${token(aim, "goal")}${focusPart}${rolePart}${who}? Mulai dari sini, yuk!`
      : `Ready to ${token(aim, "goal")}${focusPart}${rolePart}${who}? Start here!`;
    $("tryFit").title = $("tryFit").textContent;
    let picked = subjectPick() || TRY_SETS[`${role}:${goal}`] || TRY_FALLBACK;
    if (typeof picked === "function") picked = picked();
    tryCover = TRY_COVERS[picked.cover];
    $("tryTitle").textContent = picked.title;
    const coverImg = document.querySelector(".preview-cover");
    const coverSrc = uiLang === "id" && tryCover.srcId ? tryCover.srcId : tryCover.src;
    if (coverImg.getAttribute("src") !== coverSrc) coverImg.src = coverSrc;
    coverImg.classList.toggle("is-contain", tryCover.fit === "contain");
    coverImg.classList.toggle("is-video", Boolean(tryCover.video));
    coverImg.closest(".preview-media").style.background = tryCover.bg || "";
    coverImg.alt = tryCover.alt;
    const [from, to] = tryCover.focus || [0, 1];
    coverImg.classList.toggle("is-focus", Boolean(tryCover.focus));
    coverImg.style.setProperty("--zoom", 1 / (to - from));
    coverImg.style.setProperty("--focus-x", from);
    if (coverImg.complete) tintCover(coverImg);
    const inline = Boolean(tryCover.embed) && !tryCover.video;
    const frame = $("previewEmbed");
    coverImg.closest(".preview-media").classList.toggle("is-embed", inline);
    frame.hidden = !inline;
    if (inline) {
      const src = tryCover.embed(uiLang === "id" ? "id" : "en");
      frame.dataset.src = src;
      // The viewer frames the model from the iframe size at load, so never load it while hidden
      if (!tryCard.hidden && frame.getAttribute("src") !== src) frame.src = src;
      frame.title = tr(tryCover.frameTitle);
    } else {
      delete frame.dataset.src;
      frame.removeAttribute("src");
    }
    $("tryFit").querySelectorAll(".token").forEach((t) => {
      t.addEventListener("click", () => {
        const step = t.dataset.step;
        if (step === "subject") renderSubject();
        go(step, "back");
      });
    });
  }

  /* On phones the cover is shown whole; the space around it takes the colour of the cover's own top and bottom edges */
  function tintCover(img) {
    if (!img.naturalWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 48, 48);
    const edge = (y) => {
      const d = ctx.getImageData(0, y, 48, 2).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
      const n = d.length / 4;
      return `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`;
    };
    const media = img.closest(".preview-media");
    media.style.setProperty("--cover-top", edge(0));
    media.style.setProperty("--cover-bottom", edge(46));
  }
  document.querySelector(".preview-cover").addEventListener("load", (e) => tintCover(e.currentTarget));

  const blrPeek = $("blrPeek");
  const previewStage = $("previewStage");
  const previewFrame = $("previewFrame");
  const previewStill = $("previewStill");
  let tryCover = TRY_COVERS.project;

  function openPreview() {
    const embed = Boolean(tryCover.embed);
    previewStage.classList.toggle("is-still", !embed);
    previewStage.classList.toggle("is-page", Boolean(tryCover.page));
    previewStage.classList.toggle("is-video", Boolean(tryCover.video));
    previewFrame.hidden = !embed;
    previewStill.hidden = embed;
    if (embed) {
      const src = tryCover.embed(uiLang === "id" ? "id" : "en");
      if (previewFrame.getAttribute("src") !== src) previewFrame.src = src;
      previewFrame.title = tr(tryCover.frameTitle);
    } else {
      previewStill.src = tryCover.page ? tryCover.page(uiLang === "id" ? "id" : "en") : tryCover.src;
      previewStill.alt = tryCover.alt;
      previewStage.scrollTop = 0;
    }
    previewStage.hidden = false;
    markPreviewed();
    const request = previewStage.requestFullscreen || previewStage.webkitRequestFullscreen;
    if (!request) {
      previewStage.classList.add("is-overlay");
      return;
    }
    Promise.resolve(request.call(previewStage)).catch(() => {
      previewStage.classList.add("is-overlay");
    });
  }

  function closePreview() {
    previewStage.classList.remove("is-overlay");
    const current = document.fullscreenElement || document.webkitFullscreenElement;
    if (current === previewStage) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
    }
    hideStage();
  }

  /* A hidden video keeps playing, so it is unloaded; 3D embeds stay loaded to reopen instantly */
  function hideStage() {
    previewStage.hidden = true;
    if (tryCover.video) previewFrame.removeAttribute("src");
  }

  $("previewFullscreen").addEventListener("click", openPreview);
  $("previewExit").addEventListener("click", closePreview);
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && !previewStage.classList.contains("is-overlay")) {
      hideStage();
    }
  });
  function setGateIcon(id, name) {
    const el = $(id);
    el.dataset.icon = name;
    el.innerHTML = icon(name);
  }

  function hideGate() {
    const gate = $("tryGate");
    gate.hidden = true;
    gate.classList.remove("is-shown");
  }

  function showGate() {
    const gate = $("tryGate");
    gate.hidden = false;
    restartClass(gate, "is-shown");
  }

  function nudgePreview() {
    const fs = $("previewFullscreen");
    showGate();
    restartClass(fs, "is-nudge");
    clearTimeout(nudgePreview.t);
    nudgePreview.t = setTimeout(() => fs.classList.remove("is-nudge"), 1400);
  }

  function lockStart() {
    const tryCard = $("try");
    tryCard.classList.add("is-locked");
    tryCard.classList.remove("is-previewed");
    const startBtn = $("startBtn");
    startBtn.setAttribute("aria-disabled", "true");
    startBtn.classList.remove("is-done", "is-ready");
    startBtn.innerHTML = `Finish${icon("arrowRight")}`;
    const fs = $("previewFullscreen");
    fs.classList.remove("is-seen", "is-nudge");
    fs.setAttribute("aria-pressed", "false");
    setGateIcon("previewFsIcon", "expand");
    $("previewFsLabel").textContent = "See in full screen";
    setGateIcon("tryGateIcon", "alert");
    $("tryGateText").textContent = "See it in full screen first";
    hideGate();
  }

  function markPreviewed() {
    const tryCard = $("try");
    if (tryCard.classList.contains("is-previewed")) return;
    tryCard.classList.remove("is-locked");
    tryCard.classList.add("is-previewed");
    hideGate();
    $("previewFullscreen").classList.remove("is-nudge");
    const startBtn = $("startBtn");
    startBtn.setAttribute("aria-disabled", "false");
    startBtn.classList.remove("shake");
    restartClass(startBtn, "is-ready");
    const fs = $("previewFullscreen");
    fs.classList.add("is-seen");
    fs.setAttribute("aria-pressed", "true");
    setGateIcon("previewFsIcon", "refresh");
    $("previewFsLabel").textContent = "See it again";
  }

  const gestureHint = $("gestureHint");
  const GESTURE_HINT_DELAY = 2500;
  let gestureHintTimer;
  function hideGestureHint() {
    clearTimeout(gestureHintTimer);
    gestureHint.classList.remove("show");
  }
  // The iframe swallows pointer events, so a tap or drag on it shows up as the page losing focus to it
  window.addEventListener("blur", () => {
    setTimeout(() => { if (document.activeElement === $("previewEmbed")) hideGestureHint(); });
  });

  function enterTry() {
    lockStart();
    if (tryCover.embed && !tryCover.video) markPreviewed();
    const frame = $("previewEmbed");
    if (frame.dataset.src && !frame.hidden) {
      frame.removeAttribute("src");
      hideGestureHint();
      frame.addEventListener("load", () => {
        gestureHintTimer = setTimeout(() => gestureHint.classList.add("show"), GESTURE_HINT_DELAY);
      }, { once: true });
      requestAnimationFrame(() => { frame.src = frame.dataset.src; });
    }
    blrPeek.classList.remove("up", "cheer");
    paintPose(blrPeek, "present");
    setTimeout(() => blrPeek.classList.add("up"), 450);
    if (!state.celebrated) {
      state.celebrated = true;
      setTimeout(celebrate, 280);
    }
  }

  $("tryBack").addEventListener("click", () => {
    renderSubject();
    go("subject", "back");
  });
  $("startBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (btn.getAttribute("aria-disabled") === "true") {
      restartClass(btn, "shake");
      nudgePreview();
      return;
    }
    sweepToWelcome();
  });

  const SWEEP_IN = 820;
  const SWEEP_OUT = 1250;
  // [angle in degrees, cover distance in vmax, width in vw, image, mirrored, depth 0..1]
  const SWEEP_CLOUDS = [
    [90, 12, 34, "c", false, 0.4], [160, 16, 32, "b", false, 0.45], [270, 13, 36, "a", true, 0.4], [340, 17, 33, "c", true, 0.5], [30, 20, 30, "a", false, 0.5],
    [0, 36, 40, "b", false, 0.7], [60, 38, 34, "a", true, 0.75], [120, 37, 38, "c", false, 0.7], [180, 36, 42, "a", false, 0.8],
    [240, 38, 36, "b", true, 0.75], [300, 37, 40, "c", false, 0.7],
    [35, 56, 48, "c", true, 1], [145, 58, 46, "b", false, 0.95], [215, 56, 50, "a", true, 1], [325, 58, 46, "b", false, 0.95]
  ];

  let sweepParts = null;
  function buildSweep() {
    if (sweepParts) return sweepParts;
    const sweep = $("cloudSweep");
    const veil = document.createElement("div");
    veil.className = "sweep-veil";
    const glow = document.createElement("div");
    glow.className = "sweep-glow";
    sweep.append(veil, glow);
    const clouds = SWEEP_CLOUDS.map(([angle, dist, w, kind, mirrored, depth]) => {
      const img = document.createElement("img");
      img.className = "sweep-cloud";
      img.src = `assets/world/soft-cloud-${kind}.png?v=2`;
      img.alt = "";
      img.style.width = `${w}vw`;
      sweep.appendChild(img);
      const rad = (angle * Math.PI) / 180;
      return { img, cx: Math.cos(rad), cy: Math.sin(rad), dist, flip: mirrored ? -1 : 1, depth };
    });
    sweepParts = { sweep, veil, glow, clouds };
    return sweepParts;
  }
  const cloudAt = (c, dist, scale, blur, opacity) => ({
    transform: `translate(calc(-50% + ${(c.cx * dist).toFixed(2)}vmax), calc(-50% + ${(c.cy * dist * 0.62).toFixed(2)}vmax)) scale(${(scale * c.flip).toFixed(3)}, ${scale.toFixed(3)})`,
    filter: `blur(${blur}px)`,
    opacity
  });

  // The page swap waits until the frosted veil fully covers the screen
  async function sweepToWelcome() {
    if (reduceMotion) { openWelcome(); return; }
    const { sweep, veil, glow, clouds } = buildSweep();
    sweep.hidden = false;
    document.body.classList.add("is-sweeping");
    const easeIn = "cubic-bezier(0.33, 0, 0.2, 1)";
    const easeOut = "cubic-bezier(0.55, 0, 0.1, 1)";
    const coverIn = [
      veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: SWEEP_IN, easing: easeIn, fill: "forwards" }),
      glow.animate([{ opacity: 0, transform: "scale(0.6)" }, { opacity: 0.55, transform: "scale(1)" }], { duration: SWEEP_IN, easing: easeIn, fill: "forwards" }),
      ...clouds.map((c, i) => c.img.animate(
        [cloudAt(c, c.dist + 60, 0.75, 6, 0), cloudAt(c, c.dist, 1, 0, 1)],
        { duration: SWEEP_IN - 60, delay: (1 - c.depth) * 60 + (i % 3) * 20, easing: easeIn, fill: "forwards" }
      ))
    ];
    await Promise.all(coverIn.map((a) => a.finished));
    document.body.classList.remove("is-sweeping");
    openWelcome({ landing: true });
    const coverOut = [
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SWEEP_OUT * 0.8, delay: 80, easing: easeOut, fill: "forwards" }),
      glow.animate([{ opacity: 0.55, transform: "scale(1)" }, { opacity: 0, transform: "scale(1.7)" }], { duration: SWEEP_OUT, easing: easeOut, fill: "forwards" }),
      ...clouds.map((c) => c.img.animate(
        [cloudAt(c, c.dist, 1, 0, 1), cloudAt(c, c.dist + 40 + c.depth * 70, 2.2 + c.depth * 1.4, 14, 0)],
        { duration: SWEEP_OUT, delay: (1 - c.depth) * 90, easing: easeOut, fill: "forwards" }
      ))
    ];
    await Promise.all(coverOut.map((a) => a.finished));
    sweep.hidden = true;
    [...coverIn, ...coverOut].forEach((a) => a.cancel());
    document.body.classList.remove("is-landing");
  }

  /* ---------- Welcome, after Let's start ---------- */
  const WELCOME_ART = {
    studentCreate: ["assets/welcome-student-create.jpg?v=16", "A student viewing a 3D solar system project in AR on a phone", "assets/welcome-student-create-id.jpg?v=16"],
    studentCode: ["assets/welcome-student-code.jpg?v=16", "Two students building a 3D game with Visual Coding blocks"],
    studentCollab: ["assets/welcome-student-collab.jpg?v=21", "Classmates editing the same 3D project together"],
    studentCollabKids: ["assets/welcome-student-collab-kids.jpg?v=16", "Young classmates editing the same 3D volcano project together on a tablet and a laptop"],
    uniCreate: ["assets/welcome-uni-create.jpg?v=10", "A university student viewing a 3D solar system project in AR on a phone"],
    uniCollab: ["assets/welcome-uni-collab.jpg?v=11", "University classmates editing the same 3D project together"],
    uniAi: ["assets/welcome-uni-ai.jpg?v=9", "A university student turning a sketch into a 3D object with AI"],
    teacherSlides: ["assets/welcome-teacher-slides.jpg?v=14", "A teacher facing her class while presenting a learning slide with a realistic 3D heart", "assets/welcome-teacher-slides-id.jpg?v=12"],
    teacherPresent: ["assets/welcome-teacher-present.jpg?v=12", "A student presenting an idea with a 3D model while the teacher assesses", "assets/welcome-teacher-present-id.jpg?v=12"],
    teacherClass: ["assets/welcome-teacher-class.jpg?v=12", "A teacher sharing materials and student projects in a class", "assets/welcome-teacher-class-id.jpg?v=12"],
    creatorCover: ["assets/welcome-creator-cover.jpg?v=9", "A creator holding a finished AR project cover on a tablet"],
    creatorUsecases: ["assets/welcome-creator-usecases.jpg?v=4", "AR use cases: 3D popping out of a book, cube, card, poster, T-shirt, art installation, and event backdrop, plus 3D on a website", "assets/welcome-creator-usecases-id.jpg?v=4"],
    creatorAi: ["assets/welcome-creator-ai.jpg?v=12", "AI turning a sketch of an owl into an animated 3D object"],
    parentCreate: ["assets/welcome-parent-create.jpg?v=10", "A parent and child viewing a 3D solar system project in AR on a phone"],
    parentCode: ["assets/welcome-parent-code.jpg?v=12", "A parent and child building a 3D game with Visual Coding blocks"],
    parentAi: ["assets/welcome-parent-ai.jpg?v=9", "A parent and child turning a sketch into a 3D object with AI"],
    lecturerCreate: ["assets/welcome-lecturer-create.jpg?v=13", "A lecturer holding a finished AR project cover on a tablet", "assets/welcome-lecturer-create-id.jpg?v=12"],
    lecturerClass: ["assets/welcome-lecturer-class.jpg?v=12", "A lecturer sharing materials and student projects in a university class", "assets/welcome-lecturer-class-id.jpg?v=12"],
    lecturerAr: ["assets/welcome-lecturer-ar.jpg?v=13", "A lecturer showing a 3D dinosaur popping out of a book in AR on a tablet", "assets/welcome-lecturer-ar-id.jpg?v=13"]
  };
  const WELCOME_OPEN = {
    "student:assignment": ["Create a simple 3D/AR project", "Build your assignment in 3D with the Editor, then view it in AR.", "studentCreate"],
    "student:exam": ["Create a 3D/AR project for your assessment", "Build your assessment in 3D with the Editor, then view it in AR.", "studentCreate"],
    "student:competition": ["Create a 3D/AR project that stands out", "Build your project in 3D with the Editor, then view it in AR.", "studentCreate"],
    "student:learn-ar": ["Create your first 3D/AR project", "Build your first project in 3D with the Editor, then view it in AR.", "studentCreate"],
    "student:explore": ["Create your first 3D/AR project", "Explore ready-to-use 3D/AR in Edu Kits, then view it in AR.", "studentCreate"],
    "student:other": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "studentCreate"],
    "university:assignment": ["Create a simple 3D/AR project with Custom Marker", "Build your assignment with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "university:thesis": ["Create a simple 3D/AR project with Custom Marker", "Build your research with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "university:exam": ["Create a simple 3D/AR project with Custom Marker", "Build your assessment with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "university:competition": ["Create a simple 3D/AR project with Custom Marker", "Build your competition entry with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "university:learn-ar": ["Create a simple 3D/AR project with Custom Marker", "Build your first project with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "university:other": ["Create a simple 3D/AR project with Custom Marker", "Build your project with the Editor, then view it on a Custom Marker.", "uniCreate"],
    "parent:homework": ["Create a 3D/AR project with your child", "Build your child's assignment in 3D with the Editor, then view it in AR.", "parentCreate"],
    "parent:concepts": ["Explore hard topics in 3D with your child", "Explore ready-to-use 3D/AR in Edu Kits, like the solar system, a cell, or a volcano.", "parentCreate"],
    "parent:fun": ["Make learning feel like play", "Drag in 3D objects together in the Editor, then see them in your room with AR.", "parentCreate"],
    "parent:kid-skills": ["Create your child's first 3D/AR project", "Your child builds their first project in the Editor. You cheer them on.", "parentCreate"],
    "parent:kid-ar": ["Create your first 3D/AR project with your child", "Build your first project together in the Editor, then view it in AR.", "parentCreate"],
    "parent:other": ["Create a 3D/AR project with your child", "Build a project together in the Editor, then view it in AR.", "parentCreate"],
    "educator:materials": ["Present complete learning slides", "Present complete learning slides in Topic, with 3D your class can explore.", "teacherSlides"],
    "educator:activity": ["Present learning slides students can play with", "Turn your lesson into an activity in Topic. Students tap, rotate, and explore the 3D.", "teacherSlides"],
    "educator:exam": ["Present learning slides with 3D", "Let students show what they know by exploring 3D in Topic.", "teacherSlides"],
    "educator:introduce": ["Present your first 3D/AR learning slide", "Introduce ready-to-use 3D/AR from Edu Kits. No setup needed.", "teacherSlides"],
    "educator:skills": ["Present complete learning slides with 3D", "Grow your teaching skills with learning slides in Topic you can use today.", "teacherSlides"],
    "educator:other": ["Present complete learning slides", "Ready-made learning slides in Topic, with 3D for the subject you teach.", "teacherSlides"],
    "lecturer:research": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "lecturer:train": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "lecturer:introduce-uni": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "lecturer:programs": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "lecturer:explore": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "lecturer:other": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "lecturerCreate"],
    "other:other": ["Create a simple 3D/AR project", "Build your project in 3D with the Editor, then view it in AR.", "creatorCover"]
  };
  const WELCOME_REST = {
    student: [
      ["Create an interactive 3D game", "Use Visual Coding to make objects move, react, and score.", "studentCode"],
      ["Create a project with your classmates", "Use Collaborate to build projects with your classmates in real time.", "studentCollab"]
    ],
    university: [
      ["Create a project with your classmates", "Use Visual Coding to make objects move, react, and score.", "uniCollab"],
      ["Create 3D objects, with or without animation, in minutes", "Use AI-3D Generation to change an image or text into 3D, with or without animation.", "uniAi"]
    ],
    parent: [
      ["Create an interactive 3D game together", "Use Visual Coding to make objects move, react, and score.", "parentCode"],
      ["Try AI-3D Generation: change an image into 3D", "Use AI-3D Generation to turn your child's drawing into 3D.", "parentAi"]
    ],
    educator: [
      ["Assign students to present ideas in 3D", "Students build their idea in the Editor, then present it to show what they understand.", "teacherPresent"],
      ["Share assignments and materials in Class", "Use Class to invite students, share materials, and see their projects in one place.", "teacherClass"]
    ],
    lecturer: [
      ["Create 3D/AR for physical products", "Use Custom Marker to show 3D/AR on a book, clothes, or a backdrop.", "lecturerAr"],
      ["Try AI-3D Generation", "Use AI-3D Generation to turn an image or text into 3D or animated 3D.", "creatorAi"]
    ],
    other: [
      ["Create 3D/AR for physical products", "Use Custom Marker to show 3D/AR on a book, clothes, or a backdrop.", "creatorUsecases"],
      ["Create your own 3D objects with animation", "Use AI-3D Generation to change an image or text into 3D with animation.", "creatorAi"]
    ]
  };

  let welcomeSlides = [];
  let welcomeIndex = 0;
  let welcomeDone = false;

  function slidesForWelcome() {
    const role = WELCOME_REST[state.role] ? state.role : "other";
    const goal = state.job?.id || "other";
    const open = WELCOME_OPEN[`${role}:${goal}`] || WELCOME_OPEN[`${role}:other`];
    const rest = WELCOME_REST[role].map((slide) =>
      role === "student" && goal === "assignment" && slide[2] === "studentCollab" ? [slide[0], slide[1], "studentCollabKids"] : slide
    );
    return [open, ...rest];
  }

  const WELCOME_AUTOPLAY_MS = 5000;
  let welcomeTimer = 0;

  function stopWelcomeAutoplay() {
    window.clearTimeout(welcomeTimer);
    welcomeTimer = 0;
  }

  function queueWelcomeAutoplay() {
    stopWelcomeAutoplay();
    if (reduceMotion || welcomeIndex >= welcomeSlides.length - 1) return;
    welcomeTimer = window.setTimeout(() => paintWelcome(welcomeIndex + 1, { auto: true }), WELCOME_AUTOPLAY_MS);
  }

  function paintWelcomeArt() {
    const [enSrc, alt, idSrc] = WELCOME_ART[welcomeSlides[welcomeIndex][2]];
    const src = uiLang === "id" && idSrc ? idSrc : enSrc;
    const image = $("welcomeArt");
    if (image.getAttribute("src") !== src) image.src = src;
    image.alt = alt;
  }

  function paintWelcome(index, { auto = false } = {}) {
    welcomeIndex = index;
    const [title, body] = welcomeSlides[index];
    $("welcomeTitle").textContent = title;
    $("welcomeBody").textContent = body;
    paintWelcomeArt();
    $("welcomeCta").hidden = index !== welcomeSlides.length - 1;
    $("welcomeDots").querySelectorAll("button").forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
      dot.tabIndex = i === index ? 0 : -1;
    });
    restartClass($("welcomeView"), "is-in");
    if (!auto) $("welcomeTitle").focus({ preventScroll: true });
    if (auto) queueWelcomeAutoplay();
    else stopWelcomeAutoplay();
  }

  function openWelcome({ landing = false } = {}) {
    welcomeSlides = slidesForWelcome();
    welcomeIndex = 0;
    welcomeDone = false;
    const dots = $("welcomeDots");
    dots.innerHTML = "";
    welcomeSlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Slide ${i + 1} of ${welcomeSlides.length}`);
      dot.innerHTML = "<span></span>";
      dot.addEventListener("click", () => paintWelcome(i));
      dots.appendChild(dot);
    });
    const cta = $("welcomeCta");
    cta.innerHTML = `Let's start Assemblr Studio${icon("arrowRight")}`;
    cta.removeAttribute("aria-disabled");
    $("try").hidden = true;
    $("progress").hidden = true;
    document.body.dataset.view = "welcome";
    document.body.classList.add(landing ? "is-landing" : "is-arriving");
    $("welcome").hidden = false;
    paintWelcome(0, { auto: true });
    if (!landing) window.setTimeout(() => document.body.classList.remove("is-arriving"), 1000);
    $("welcomeTitle").focus({ preventScroll: true });
    startSky();
  }

  /* Sky life: layers lean toward the pointer, bubbles pop when tapped and form again */
  const sky = $("sky");
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let skyFrame = 0;

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  sky.querySelectorAll(".bubble").forEach((bubble) => {
    bubble.addEventListener("click", () => {
      if (bubble.classList.contains("is-popped")) return;
      bubble.classList.remove("is-reforming");
      bubble.classList.add("is-popped");
      window.setTimeout(() => {
        bubble.classList.remove("is-popped");
        bubble.classList.add("is-reforming");
        window.setTimeout(() => bubble.classList.remove("is-reforming"), 900);
      }, reduceMotion ? 300 : 1800);
    });
  });

  const kite = $("kite");
  const kiteImg = $("kiteImg");
  const kiteTail = $("kiteTail");
  const kiteString = $("kiteString");
  const kiteBows = $("kiteBows");
  const BOW_AT = [4, 8, 12];
  const BOW_COLORS = ["#ffc93c", "#4cc3ff", "#8c6cf0"];
  BOW_AT.forEach((_, i) => {
    const bow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bow.setAttribute("d", "M-5 -3.5 L0 0 L-5 3.5 Z M5 -3.5 L0 0 L5 3.5 Z");
    bow.setAttribute("fill", BOW_COLORS[i]);
    kiteBows.appendChild(bow);
  });

  function paintKite(t) {
    const w = kiteImg.offsetWidth;
    const h = kiteImg.offsetHeight;
    const dx = 26 * Math.sin(t * 0.00042) + 9 * Math.sin(t * 0.0011);
    const dy = 16 * Math.sin(t * 0.00063 + 1) + 5 * Math.sin(t * 0.0017);
    const tilt = 9 * Math.sin(t * 0.0009) + 4 * Math.sin(t * 0.0023) - 6;
    kite.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
    kiteImg.style.transform = `rotate(${tilt.toFixed(2)}deg)`;
    const rad = (tilt * Math.PI) / 180;
    const tipX = w / 2 - Math.sin(rad) * (h / 2);
    const tipY = h / 2 + Math.cos(rad) * (h / 2);
    const seg = h * 0.17;
    const pts = [];
    for (let j = 0; j <= 14; j++) {
      pts.push([
        tipX - j * seg * 0.5 + Math.sin(t * 0.0042 - j * 0.55) * (1.5 + j * 0.85),
        tipY + j * seg * 0.82 + Math.cos(t * 0.003 - j * 0.4) * j * 0.35,
      ]);
    }
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let j = 1; j < pts.length - 1; j++) {
      const mx = (pts[j][0] + pts[j + 1][0]) / 2;
      const my = (pts[j][1] + pts[j + 1][1]) / 2;
      d += ` Q${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    kiteTail.setAttribute("d", d);
    BOW_AT.forEach((j, i) => {
      const angle = Math.sin(t * 0.005 - j) * 25;
      kiteBows.children[i].setAttribute("transform", `translate(${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)}) rotate(${angle.toFixed(1)})`);
    });
    const ax = w / 2 - Math.sin(rad) * h * 0.08;
    const ay = h * 0.42;
    kiteString.setAttribute("d", `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${(ax + 150).toFixed(1)} ${(ay + 520).toFixed(1)} ${(ax + 620).toFixed(1)} ${(ay + 1200).toFixed(1)}`);
  }

  const plane = $("plane");
  const planePath = $("planePath");
  const planeHead = $("planeHead");
  const PLANE_FLY = 10000;
  const PLANE_GAP = 3200;
  const PLANE_NOSE = 36;
  const PLANE_FADE = 0.14;
  const LOOP_FROM = 0.42;
  const LOOP_TO = 0.6;
  const ROUTE_AHEAD = 0.34;
  const STEP = 0.004;
  // returns pixels; the flight stays in the bottom-left corner, clear of the carousel
  // and the loop eases in and out so the plane never jerks entering or leaving it
  const trailAt = (u, w, h) => {
    const reach = Math.min(0.26 * w, 420);
    let x = -0.04 * w + (reach + 0.04 * w) * u;
    let y = (0.94 - 0.13 * u - 0.025 * Math.sin(u * Math.PI * 2)) * h;
    if (u > LOOP_FROM && u < LOOP_TO) {
      const s = (u - LOOP_FROM) / (LOOP_TO - LOOP_FROM);
      const a = Math.PI * 2 * s * s * (3 - 2 * s);
      const r = Math.min(w, h) * 0.045;
      x += r * Math.sin(a);
      y -= r * (1 - Math.cos(a));
    }
    // a little pen wobble
    y += Math.sin(u * 97) * 0.6 + Math.sin(u * 41) * 0.5;
    return { x, y };
  };

  function paintPlane(t) {
    const cycle = t % (PLANE_FLY + PLANE_GAP);
    const flying = cycle < PLANE_FLY;
    const u = flying ? cycle / PLANE_FLY : 1.2;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const here = trailAt(u, w, h);
    const ahead = trailAt(u + 0.004, w, h);
    const angle = (Math.atan2(ahead.y - here.y, ahead.x - here.x) * 180) / Math.PI;
    const fade = flying ? Math.min(1, (1 - u) / PLANE_FADE) : 0;
    plane.style.opacity = fade.toFixed(2);
    planePath.parentNode.style.opacity = fade.toFixed(2);
    plane.style.transform = `translate3d(${(here.x - plane.offsetWidth / 2).toFixed(1)}px, ${(here.y - plane.offsetHeight / 2).toFixed(1)}px, 0) rotate(${(angle + PLANE_NOSE).toFixed(1)}deg)`;
    if (!flying) { planePath.setAttribute("d", ""); planeHead.setAttribute("d", ""); return; }

    // the route starts just past the nose; dash offset is measured from the path start so dashes stay put as it shortens
    const from = u + 0.012;
    const to = Math.min(1, u + ROUTE_AHEAD);
    let prev = trailAt(0, w, h);
    let walked = 0;
    let offset = 0;
    let d = "";
    for (let v = STEP; v <= to + 1e-9; v += STEP) {
      const p = trailAt(Math.min(v, to), w, h);
      walked += Math.hypot(p.x - prev.x, p.y - prev.y);
      if (v >= from) {
        if (!d) { d = `M${prev.x.toFixed(1)} ${prev.y.toFixed(1)}`; offset = walked; }
        d += `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      }
      prev = p;
    }
    planePath.setAttribute("d", d);
    planePath.style.strokeDashoffset = `${offset.toFixed(1)}`;

    const tip = trailAt(to, w, h);
    const back = trailAt(to - 0.006, w, h);
    const dir = Math.atan2(tip.y - back.y, tip.x - back.x);
    const wing = (spread, len) => `${(tip.x - len * Math.cos(dir - spread)).toFixed(1)} ${(tip.y - len * Math.sin(dir - spread)).toFixed(1)}`;
    planeHead.setAttribute("d", to > from ? `M${wing(0.6, 8)}L${tip.x.toFixed(1)} ${tip.y.toFixed(1)}L${wing(-0.6, 8)}` : "");
  }

  function skyTick(now) {
    if (document.body.dataset.view !== "welcome" || document.hidden) { skyFrame = 0; return; }
    paintKite(now);
    paintPlane(now);
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    sky.style.setProperty("--px", pointer.x.toFixed(4));
    sky.style.setProperty("--py", pointer.y.toFixed(4));
    skyFrame = requestAnimationFrame(skyTick);
  }

  function startSky() {
    if (reduceMotion) { paintKite(0); paintPlane(PLANE_FLY * 0.55); return; }
    if (skyFrame) return;
    skyFrame = requestAnimationFrame(skyTick);
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && document.body.dataset.view === "welcome") startSky();
  });

  /* Swipe: drag with a finger or mouse, or two-finger swipe on a trackpad */
  const welcomeView = $("welcomeView");
  const welcomeArt = $("welcomeArt");
  welcomeArt.draggable = false;
  let drag = null;

  function goWelcome(step) {
    const next = welcomeIndex + step;
    if (next >= 0 && next < welcomeSlides.length) paintWelcome(next);
  }

  welcomeView.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, t: performance.now(), dx: 0, id: e.pointerId, active: false };
  });
  welcomeView.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.active) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - drag.y)) return;
      drag.active = true;
      try { welcomeView.setPointerCapture(e.pointerId); } catch {}
      welcomeView.classList.add("is-dragging");
      stopWelcomeAutoplay();
    }
    const atEdge = (dx > 0 && welcomeIndex === 0) || (dx < 0 && welcomeIndex === welcomeSlides.length - 1);
    drag.dx = atEdge ? dx * 0.3 : dx;
    welcomeArt.style.transform = `translateX(${drag.dx}px)`;
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { dx, t, active } = drag;
    drag = null;
    welcomeView.classList.remove("is-dragging");
    welcomeArt.style.transform = "";
    if (!active) return;
    const fast = Math.abs(dx) / (performance.now() - t) > 0.4;
    if (Math.abs(dx) > 60 || (fast && Math.abs(dx) > 20)) goWelcome(dx < 0 ? 1 : -1);
  };
  welcomeView.addEventListener("pointerup", endDrag);
  welcomeView.addEventListener("pointercancel", endDrag);

  let wheelSum = 0;
  let wheelLock = 0;
  welcomeView.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (performance.now() < wheelLock) return;
    wheelSum += e.deltaX;
    if (Math.abs(wheelSum) < 50) return;
    goWelcome(wheelSum > 0 ? 1 : -1);
    wheelSum = 0;
    wheelLock = performance.now() + 700;
  }, { passive: false });

  $("welcomeCta").addEventListener("click", () => {
    if (welcomeDone) return;
    welcomeDone = true;
    const button = $("welcomeCta");
    button.setAttribute("aria-disabled", "true");
    button.textContent = "You're all set";
    burstFrom(button, { count: 22, spread: 140, power: 2 });
    celebrate();
    showToast("You're ready to try Assemblr.", 2200);
  });

  /* ---------- Language ---------- */
  const lang = $("lang");
  const langBtn = $("langBtn");
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = lang.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", String(open));
  });
  lang.querySelectorAll("[data-lang]").forEach((opt) => {
    opt.addEventListener("click", () => {
      $("langLabel").textContent = opt.dataset.lang;
      $("langFlag").src = flagSrc(opt.dataset.flag);
      lang.querySelectorAll("[data-lang]").forEach((o) => o.setAttribute("aria-checked", o === opt ? "true" : "false"));
      lang.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
      uiLang = opt.dataset.flag === "id" ? "id" : "en";
      document.documentElement.lang = uiLang;
      langBtn.setAttribute("aria-label", uiLang === "id"
        ? `Negara dan bahasa: ${opt.dataset.country}, ${opt.dataset.lang}`
        : `Country and language: ${opt.dataset.country}, ${opt.dataset.lang}`);
      lang.querySelector(".lang-menu").setAttribute("aria-label", uiLang === "id" ? "Negara dan bahasa" : "Country and language");
      localize(document.body);
      if (state.role) paintTry();
      if (welcomeSlides.length) paintWelcomeArt();
    });
  });
  document.addEventListener("click", (e) => {
    if (!lang.contains(e.target)) {
      lang.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Keyboard: arrow keys move between radios ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCC();
      lang.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
      if (!previewStage.hidden) closePreview();
      return;
    }
    if (!$("welcome").hidden && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      const next = welcomeIndex + (e.key === "ArrowRight" ? 1 : -1);
      if (next >= 0 && next < welcomeSlides.length) paintWelcome(next);
      return;
    }
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    const current = e.target.closest?.('[role="radio"]');
    if (!current) return;
    const group = current.closest('[role="radiogroup"]');
    const radios = [...group.querySelectorAll('[role="radio"]')].filter((r) => r.closest('[role="radiogroup"]') === group && r.offsetParent);
    const i = radios.indexOf(current);
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = radios[(i + step + radios.length) % radios.length];
    if (next) {
      e.preventDefault();
      next.focus();
    }
  });

  go("name");
})();
