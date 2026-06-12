/* ============================================================
   CODEX — Icônes SVG sur-mesure (aucun emoji)
   Toutes monochromes, pilotées par currentColor.
   ============================================================ */
(function () {
  'use strict';

  const S = (paths) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';

  const ICONS = {
    // --- Navigation ---
    logo: S('<path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M12 3v18"/><path d="M4 7l8 4 8-4"/><path d="M8 9.5v5l4 2"/>'),
    grid: S('<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>'),
    layers: S('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'),
    map: S('<path d="M9 4L3.5 6v14l5.5-2 6 2 5.5-2V4l-5.5 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>'),
    search: S('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l4.5 4.5"/>'),
    arrowLeft: S('<path d="M14 6l-6 6 6 6"/>'),
    arrowRight: S('<path d="M10 6l6 6-6 6"/>'),
    chevron: S('<path d="M9 5l7 7-7 7"/>'),
    close: S('<path d="M6 6l12 12M18 6L6 18"/>'),
    external: S('<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 13v6H5V6h6"/>'),
    spark: S('<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19"/>'),

    // --- Strates (tiers) ---
    foundation: S('<path d="M3 20h18"/><path d="M5 20v-6h14v6"/><path d="M8 14V9h8v5"/><path d="M10 9V5h4v4"/>'),
    script: S('<path d="M7 4h8l4 4v12H7z"/><path d="M14 4v4h4"/><path d="M9.5 12l2 2-2 2"/><path d="M13.5 16h2.5"/>'),
    types: S('<path d="M4 6h16"/><path d="M9 6v13"/><path d="M14 11h6"/><path d="M17 11v8"/>'),
    platform: S('<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 9l2.5 2.5L7 14"/><path d="M12.5 14H17"/>'),
    systems: S('<rect x="8" y="8" width="8" height="8" rx="1"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2"/>'),
    frontier: S('<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/>'),

    // --- Types de mini-jeux ---
    quiz: S('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.8.3-1.2.9-1.2 1.6v.5"/><path d="M11.5 17h.01"/>'),
    fillBlank: S('<path d="M4 7h7M4 12h10M4 17h6"/><path d="M16 14l4 4M20 14l-4 4"/>'),
    bugHunt: S('<rect x="8" y="7" width="8" height="11" rx="4"/><path d="M12 7V4"/><path d="M8.5 9L5 6.5M15.5 9L19 6.5M8 12.5H4M20 12.5h-4M8.5 16L5 18.5M15.5 16L19 18.5"/>'),
    output: S('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M7 10l2.5 2L7 14"/><path d="M12.5 14H17"/>'),

    // --- Méta ---
    target: S('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
    trophy: S('<path d="M8 4h8v4a4 4 0 0 1-8 0z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M12 12v4M9 20h6M10 20l.5-4M14 20l-.5-4"/>'),
    check: S('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    cross: S('<path d="M7 7l10 10M17 7L7 17"/>'),
    flame: S('<path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1.5-.5-2.5C16 10 17 12.5 17 15a5 5 0 0 1-10 0c0-4 3-5 5-12z"/>'),
    clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>'),
    book: S('<path d="M5 4h9a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M16 6h3v14h-3"/><path d="M8 8h5M8 11h5"/>'),
    code: S('<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>'),
    cpu: S('<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 10h4v4h-4z"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>'),
    lock: S('<rect x="5" y="11" width="14" height="9"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/>'),
    flag: S('<path d="M6 21V4"/><path d="M6 4h11l-2.5 3.5L17 11H6"/>'),
  };

  window.CODEX_ICON = function (name) {
    return ICONS[name] || '';
  };
  window.CODEX_ICONS = ICONS;
})();
