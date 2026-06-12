/* ============================================================
   CODEX — Noyau / Registre de données
   Chaque fiche de langage s'enregistre via CODEX.register(...)
   ============================================================ */
(function () {
  'use strict';

  const CODEX = {
    languages: [],
    byId: {},

    // Hiérarchie des langages : strates du savoir, de la fondation à la spécialisation.
    tiers: [
      {
        n: 0,
        name: 'Strate 0 — Fondations',
        subtitle: 'La structure et la forme. On ne programme pas encore, on construit le support.',
        glyph: 'foundation',
      },
      {
        n: 1,
        name: 'Strate 1 — Langages de script',
        subtitle: 'Dynamiques, permissifs, immédiats. La porte d’entrée vers la logique.',
        glyph: 'script',
      },
      {
        n: 2,
        name: 'Strate 2 — Typage & données',
        subtitle: 'On ajoute des garde-fous, des contrats et la persistance.',
        glyph: 'types',
      },
      {
        n: 3,
        name: 'Strate 3 — Plateformes & écosystèmes',
        subtitle: 'Des langages compilés ou des frameworks qui structurent des applications entières.',
        glyph: 'platform',
      },
      {
        n: 4,
        name: 'Strate 4 — Systèmes',
        subtitle: 'Le métal nu. Mémoire, performance, contrôle total.',
        glyph: 'systems',
      },
      {
        n: 5,
        name: 'Strate 5 — Frontières',
        subtitle: 'Spécialisations avancées et domaines de pointe.',
        glyph: 'frontier',
      },
    ],

    categories: {
      markup:    { label: 'Balisage',   accent: '#36f9c0' },
      frontend:  { label: 'Frontend',   accent: '#19d3ff' },
      backend:   { label: 'Backend',    accent: '#ff4dd6' },
      database:  { label: 'Données',    accent: '#ffc24b' },
      systems:   { label: 'Systèmes',   accent: '#ff6b3d' },
      framework: { label: 'Framework',  accent: '#ff52d9' },
    },

    register(lang) {
      if (!lang || !lang.id) {
        console.error('CODEX.register: objet langage invalide', lang);
        return;
      }
      if (this.byId[lang.id]) {
        console.warn('CODEX: langage déjà enregistré, ignoré :', lang.id);
        return;
      }
      // Valeurs par défaut défensives pour éviter les rendus cassés.
      lang.concepts  = lang.concepts  || [];
      lang.roadmap   = lang.roadmap   || [];
      lang.resources = lang.resources || [];
      lang.paradigms = lang.paradigms || [];
      lang.games     = lang.games     || {};
      ['quiz', 'fillBlank', 'bugHunt', 'output'].forEach((k) => {
        lang.games[k] = lang.games[k] || [];
      });
      this.byId[lang.id] = lang;
      this.languages.push(lang);
    },

    // Greffe du contenu supplémentaire (cours, référence) sur une fiche déjà enregistrée.
    extend(id, patch) {
      const lang = this.byId[id];
      if (!lang) { console.warn('CODEX.extend: langage inconnu :', id); return; }
      Object.keys(patch || {}).forEach((k) => { lang[k] = patch[k]; });
    },

    get(id) {
      return this.byId[id];
    },

    // Tri stable : par tier puis par difficulté puis par année.
    sorted() {
      return this.languages.slice().sort((a, b) => {
        return (a.tier - b.tier) || (a.difficulty - b.difficulty) || (a.year - b.year);
      });
    },

    inTier(n) {
      return this.sorted().filter((l) => l.tier === n);
    },

    totalGames(lang) {
      const g = lang.games || {};
      return (g.quiz.length + g.fillBlank.length + g.bugHunt.length + g.output.length);
    },
  };

  window.CODEX = CODEX;
})();
