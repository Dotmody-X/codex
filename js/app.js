/* ============================================================
   CODEX — Application : routeur + rendu des pages
   ============================================================ */
(function () {
  'use strict';

  const { el, clear, esc, Store } = window.CX;
  const icon = window.CODEX_ICON;
  const GAMES = window.CODEX_GAMES;

  const app = document.getElementById('app');
  let searchTerm = '';
  let catFilter = 'all';

  // ---------- Helpers de présentation ----------
  function catOf(id) {
    return CODEX.categories[id] || { label: id, accent: '#19d3ff' };
  }

  function difficultyMeter(d) {
    const m = el('.cx-diff', { title: 'Difficulté ' + d + '/5' });
    for (let i = 1; i <= 5; i++) m.appendChild(el('.cx-diff-bar' + (i <= d ? '.on' : '')));
    return m;
  }

  function langIcon(lang, cls) {
    return el('.cx-glyph' + (cls ? '.' + cls : ''), {
      html: lang.icon || icon('code'),
      style: '--accent:' + (lang.color || '#19d3ff'),
    });
  }

  function langCard(lang) {
    const cat = catOf(lang.category);
    const prog = Store.lang(lang.id);
    const card = el('a.cx-card', {
      href: '#/lang/' + lang.id,
      style: '--accent:' + (lang.color || '#19d3ff'),
    });
    card.appendChild(el('.cx-card-glow'));
    card.appendChild(el('.cx-card-head', null, [
      langIcon(lang, 'sm'),
      el('.cx-card-badge', { text: lang.abbr }),
    ]));
    card.appendChild(el('h3.cx-card-name', { text: lang.name }));
    card.appendChild(el('p.cx-card-tag', { text: lang.tagline || '' }));
    card.appendChild(el('.cx-card-foot', null, [
      el('span.cx-chip', { text: cat.label }),
      difficultyMeter(lang.difficulty),
    ]));
    const xp = prog.xp || 0;
    if (xp > 0) card.appendChild(el('.cx-card-xp', { text: xp + ' XP' }));
    return card;
  }

  // ============================================================
  // PAGE — Accueil
  // ============================================================
  function renderHome() {
    clear(app);
    const langs = CODEX.sorted();

    // --- Hero ---
    const hero = el('.cx-hero');
    hero.appendChild(el('.cx-hero-grid'));
    hero.appendChild(el('.cx-hero-scan'));
    const hContent = el('.cx-hero-content');
    hContent.appendChild(el('.cx-kicker', null, [
      el('.cx-kicker-ic', { html: icon('layers') }),
      el('span', { text: 'Base de connaissances // protocole développeur' }),
    ]));
    hContent.appendChild(el('h1.cx-title', null, [
      el('span.cx-title-main', { text: 'CODEX' }),
      el('span.cx-title-sub', { text: 'La bible du développeur' }),
    ]));
    hContent.appendChild(el('p.cx-lead', {
      text: 'Tout le savoir, langage par langage. Frontend, backend, données, systèmes — '
        + 'expliqué, hiérarchisé, et transformé en défis jouables. On ne lit pas le Codex. On le pratique.',
    }));

    const totalGames = langs.reduce((n, l) => n + CODEX.totalGames(l), 0);
    const stats = el('.cx-stats', null, [
      statBox(String(langs.length), 'langages', 'book'),
      statBox(String(totalGames), 'défis jouables', 'target'),
      statBox(CODEX.tiers.length + ' strates', 'de hiérarchie', 'layers'),
      statBox(Store.totalXp() + ' XP', 'cumulée', 'flame'),
    ]);
    hContent.appendChild(stats);
    hero.appendChild(hContent);
    app.appendChild(hero);

    // --- Barre d'exploration ---
    const tools = el('.cx-tools');
    const search = el('.cx-search');
    search.appendChild(el('.cx-search-ic', { html: icon('search') }));
    const input = el('input.cx-search-input', {
      type: 'text', placeholder: 'Rechercher un langage, un paradigme…',
      value: searchTerm, autocomplete: 'off',
    });
    input.addEventListener('input', (e) => { searchTerm = e.target.value; renderGrid(); });
    search.appendChild(input);
    tools.appendChild(search);

    const chips = el('.cx-cats');
    const cats = ['all'].concat(Object.keys(CODEX.categories));
    cats.forEach((c) => {
      const label = c === 'all' ? 'Tout' : CODEX.categories[c].label;
      const chip = el('button.cx-cat' + (catFilter === c ? '.on' : ''), { text: label });
      chip.addEventListener('click', () => {
        catFilter = c;
        Array.from(chips.children).forEach((n) => n.classList.remove('on'));
        chip.classList.add('on');
        renderGrid();
      });
      chips.appendChild(chip);
    });
    tools.appendChild(chips);
    app.appendChild(tools);

    // --- Grille filtrable ---
    const gridSection = el('#grid-section.cx-section');
    app.appendChild(gridSection);
    renderGrid();

    // --- Hiérarchie / strates ---
    const hier = el('#hierarchie.cx-section.cx-hier');
    hier.appendChild(sectionTitle('Hiérarchie du savoir', 'layers',
      'Des fondations au métal nu. Chaque strate présuppose la précédente.'));
    CODEX.tiers.forEach((tier) => {
      const inTier = CODEX.inTier(tier.n);
      if (!inTier.length) return;
      const strate = el('.cx-strate', { style: '--i:' + tier.n });
      strate.appendChild(el('.cx-strate-side', null, [
        el('.cx-strate-glyph', { html: icon(tier.glyph) }),
        el('.cx-strate-n', { text: String(tier.n) }),
      ]));
      const sbody = el('.cx-strate-body');
      sbody.appendChild(el('h3.cx-strate-name', { text: tier.name }));
      sbody.appendChild(el('p.cx-strate-sub', { text: tier.subtitle }));
      const row = el('.cx-strate-langs');
      inTier.forEach((l) => row.appendChild(miniLang(l)));
      sbody.appendChild(row);
      strate.appendChild(sbody);
      hier.appendChild(strate);
    });
    app.appendChild(hier);

    // --- Accès au Lexique ---
    const lexSec = el('.cx-section');
    const lexCta = el('a.cx-lex-cta', { href: '#/lexique' });
    lexCta.appendChild(el('.cx-lex-ic', { html: icon('book') }));
    lexCta.appendChild(el('.cx-lex-txt', null, [
      el('span.cx-lex-kicker', { text: 'Lexique du développeur' }),
      el('h2.cx-lex-title', { text: 'Le jargon, traduit en clair' }),
      el('p.cx-lex-sub', { text: 'string, closure, API, compilateur… tous les termes complexes expliqués simplement.' }),
    ]));
    lexCta.appendChild(el('.cx-lex-arrow', { html: icon('arrowRight') }));
    lexSec.appendChild(lexCta);
    app.appendChild(lexSec);

    app.appendChild(footer());

    function renderGrid() {
      const sec = document.getElementById('grid-section');
      if (!sec) return;
      clear(sec);
      const term = searchTerm.trim().toLowerCase();
      const filtered = langs.filter((l) => {
        if (catFilter !== 'all' && l.category !== catFilter) return false;
        if (!term) return true;
        const hay = (l.name + ' ' + l.tagline + ' ' + l.paradigms.join(' ') + ' ' + l.category).toLowerCase();
        return hay.indexOf(term) !== -1;
      });
      sec.appendChild(sectionTitle(
        catFilter === 'all' ? 'Toutes les disciplines' : catOf(catFilter).label,
        'grid', filtered.length + ' langage' + (filtered.length > 1 ? 's' : '') + ' référencé' + (filtered.length > 1 ? 's' : '')));
      if (!filtered.length) {
        sec.appendChild(el('.cx-empty', { text: 'Aucun résultat dans le Codex.' }));
        return;
      }
      const grid = el('.cx-grid');
      filtered.forEach((l) => grid.appendChild(langCard(l)));
      sec.appendChild(grid);
    }
  }

  function statBox(value, label, ic) {
    return el('.cx-stat', null, [
      el('.cx-stat-ic', { html: icon(ic) }),
      el('.cx-stat-val', { text: value }),
      el('.cx-stat-lbl', { text: label }),
    ]);
  }

  function miniLang(lang) {
    const m = el('a.cx-mini', {
      href: '#/lang/' + lang.id, style: '--accent:' + (lang.color || '#19d3ff'),
      title: lang.name,
    });
    m.appendChild(el('.cx-mini-glyph', { html: lang.icon || icon('code') }));
    m.appendChild(el('span.cx-mini-name', { text: lang.name }));
    return m;
  }

  function sectionTitle(title, ic, sub) {
    return el('.cx-sec-head', null, [
      el('.cx-sec-ic', { html: icon(ic) }),
      el('.cx-sec-titles', null, [
        el('h2.cx-sec-title', { text: title }),
        sub ? el('p.cx-sec-sub', { text: sub }) : null,
      ]),
    ]);
  }

  // ============================================================
  // PAGE — Langage
  // ============================================================
  function renderLang(id) {
    const lang = CODEX.get(id);
    clear(app);
    if (!lang) {
      app.appendChild(el('.cx-section', null, [
        el('p.cx-empty', { text: 'Fiche introuvable : ' + id }),
        backLink(),
      ]));
      return;
    }
    const cat = catOf(lang.category);
    const tier = CODEX.tiers[lang.tier] || { name: 'Strate ' + lang.tier };
    document.body.style.setProperty('--page-accent', lang.color || '#19d3ff');

    // --- En-tête ---
    const head = el('.cx-lang-head', { style: '--accent:' + (lang.color || '#19d3ff') });
    head.appendChild(el('.cx-lang-head-grid'));
    head.appendChild(backLink());
    const hRow = el('.cx-lang-id');
    hRow.appendChild(langIcon(lang, 'lg'));
    const hMeta = el('.cx-lang-meta');
    hMeta.appendChild(el('.cx-lang-tags', null, [
      el('span.cx-chip.solid', { text: cat.label }),
      el('span.cx-chip', { text: tier.name }),
      el('span.cx-chip', { text: 'Depuis ' + lang.year }),
    ]));
    hMeta.appendChild(el('h1.cx-lang-name', null, [
      el('span', { text: lang.name }),
      el('.cx-lang-abbr', { text: lang.abbr }),
    ]));
    hMeta.appendChild(el('p.cx-lang-tag', { text: lang.tagline || '' }));
    const sub = el('.cx-lang-sub');
    sub.appendChild(el('.cx-lang-diff', null, [el('span', { text: 'Difficulté' }), difficultyMeter(lang.difficulty)]));
    if (lang.paradigms.length) {
      const par = el('.cx-paradigms');
      lang.paradigms.forEach((p) => par.appendChild(el('span.cx-tag', { text: p })));
      sub.appendChild(par);
    }
    hMeta.appendChild(sub);
    hRow.appendChild(hMeta);
    head.appendChild(hRow);
    head.appendChild(el('p.cx-lang-desc', { text: lang.description || '' }));
    app.appendChild(head);

    const body = el('.cx-lang-body');
    app.appendChild(body);

    // Chaque section est construite puis rangée ; l'insertion dans le body
    // se fait plus bas, dans l'ordre d'affichage voulu.
    const order = { course: null, concepts: null, reference: null, example: null, roadmap: null, resources: null };
    const arenaSec = buildArena(lang);
    const parcoursSec = (lang.challenges && lang.challenges.length) ? buildParcours(lang) : null;
    const flashSec = ((lang.reference && lang.reference.length) || lang.concepts.length) ? buildFlashCta(lang) : null;

    // --- Concepts ---
    if (lang.concepts.length) {
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Le savoir', 'book', 'Les concepts à graver dans la mémoire.'));
      const grid = el('.cx-concepts');
      lang.concepts.forEach((c, i) => {
        const card = el('.cx-concept');
        card.appendChild(el('.cx-concept-n', { text: pad(i + 1) }));
        card.appendChild(el('h3.cx-concept-title', { text: c.title }));
        card.appendChild(el('p.cx-concept-body', { text: c.body }));
        if (c.code) card.appendChild(el('pre.cx-inline-code', null, [el('code', { html: esc(c.code) })]));
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      order.concepts = sec;
    }

    // --- Cours complet ---
    if (lang.course && lang.course.length) {
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Cours complet', 'book', 'Le programme intégral, chapitre par chapitre.'));
      const course = el('.cx-course');
      lang.course.forEach((chapter, ci) => {
        const chap = el('.cx-chapter');
        const head = el('.cx-chapter-head');
        head.appendChild(el('.cx-chapter-n', { text: 'CH' + pad(ci + 1) }));
        head.appendChild(el('h3.cx-chapter-title', { text: chapter.title }));
        head.appendChild(el('.cx-chapter-count', { text: (chapter.lessons || []).length + ' leçons' }));
        chap.appendChild(head);
        const lessons = el('.cx-lessons');
        (chapter.lessons || []).forEach((lesson) => {
          const item = el('.cx-lesson');
          item.appendChild(el('h4.cx-lesson-title', null, [
            el('.cx-lesson-mark'),
            el('span', { text: lesson.title }),
          ]));
          item.appendChild(el('p.cx-lesson-body', { text: lesson.body }));
          if (lesson.code) {
            const slab = el('.cx-code.cx-lesson-code');
            String(lesson.code).replace(/\n$/, '').split('\n').forEach((line, i) => {
              slab.appendChild(el('.cx-code-line', null, [
                el('span.cx-ln', { text: String(i + 1) }),
                el('span.cx-lc', { html: esc(line) || '&nbsp;' }),
              ]));
            });
            item.appendChild(slab);
          }
          lessons.appendChild(item);
        });
        chap.appendChild(lessons);
        course.appendChild(chap);
      });
      sec.appendChild(course);
      order.course = sec;
    }

    // --- Référence classée ---
    if (lang.reference && lang.reference.length) {
      const totalItems = lang.reference.reduce((n, g) => n + (g.items || []).length, 0);
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Référence — classification', 'layers',
        totalItems + ' éléments essentiels, rangés par catégorie.'));
      const refNav = el('.cx-ref-nav');
      const refBody = el('.cx-ref-body');
      lang.reference.forEach((group, gi) => {
        const gid = 'ref-' + lang.id + '-' + gi;
        const chip = el('a.cx-ref-chip', { href: '#' + location.hash.slice(1) /* no-op */ });
        chip.textContent = group.group;
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          const t = document.getElementById(gid);
          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        refNav.appendChild(chip);

        const block = el('.cx-ref-group', { id: gid });
        block.appendChild(el('.cx-ref-head', null, [
          el('span.cx-ref-gname', { text: group.group }),
          el('span.cx-ref-gcount', { text: pad((group.items || []).length) }),
        ]));
        const rows = el('.cx-ref-rows');
        (group.items || []).forEach((it) => {
          const row = el('.cx-ref-item');
          const left = el('.cx-ref-left');
          left.appendChild(el('code.cx-ref-name', { text: it.name }));
          if (it.syntax) left.appendChild(el('code.cx-ref-syntax', { text: it.syntax }));
          row.appendChild(left);
          row.appendChild(el('.cx-ref-desc', { text: it.desc }));
          rows.appendChild(row);
        });
        block.appendChild(rows);
        refBody.appendChild(block);
      });
      sec.appendChild(refNav);
      sec.appendChild(refBody);
      order.reference = sec;
    }

    // --- Exemple ---
    if (lang.example && lang.example.code) {
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Anatomie d’un exemple', 'code', 'Lis-le ligne à ligne.'));
      const ex = el('.cx-example');
      ex.appendChild(el('.cx-example-bar', null, [
        el('.cx-dots-deco', null, [el('.cx-dd'), el('.cx-dd'), el('.cx-dd')]),
        el('span.cx-example-lang', { text: lang.example.lang || lang.id }),
      ]));
      const lines = String(lang.example.code).replace(/\n$/, '').split('\n');
      const pre = el('.cx-code');
      lines.forEach((line, i) => {
        pre.appendChild(el('.cx-code-line', null, [
          el('span.cx-ln', { text: String(i + 1) }),
          el('span.cx-lc', { html: esc(line) || '&nbsp;' }),
        ]));
      });
      ex.appendChild(pre);
      sec.appendChild(ex);
      if (lang.example.explain) sec.appendChild(el('p.cx-example-explain', { text: lang.example.explain }));
      order.example = sec;
    }

    // --- Roadmap / objectifs ---
    if (lang.roadmap.length) {
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Trajectoire de maîtrise', 'target', 'Des objectifs concrets, par paliers.'));
      const road = el('.cx-road');
      lang.roadmap.forEach((step, i) => {
        const node = el('.cx-road-step', { style: '--i:' + i });
        node.appendChild(el('.cx-road-marker', null, [el('span', { text: String(i + 1) })]));
        const sbody = el('.cx-road-body');
        sbody.appendChild(el('h3.cx-road-level', { text: step.level }));
        const ul = el('ul.cx-goals');
        (step.goals || []).forEach((g) => {
          ul.appendChild(el('li.cx-goal', null, [
            el('.cx-goal-ic', { html: icon('check') }),
            el('span', { text: g }),
          ]));
        });
        sbody.appendChild(ul);
        node.appendChild(sbody);
        road.appendChild(node);
      });
      sec.appendChild(road);
      order.roadmap = sec;
    }

    // --- Ressources ---
    if (lang.resources.length) {
      const sec = el('.cx-block');
      sec.appendChild(sectionTitle('Archives externes', 'book', 'Pour creuser au-delà du Codex.'));
      const list = el('.cx-resources');
      lang.resources.forEach((r) => {
        list.appendChild(el('a.cx-resource', { href: r.url, target: '_blank', rel: 'noopener' }, [
          el('span', { text: r.label }),
          el('.cx-resource-ic', { html: icon('external') }),
        ]));
      });
      sec.appendChild(list);
      order.resources = sec;
    }

    // Ordre d'affichage : cours, savoir, référence, exemple, trajectoire,
    // flashcards, arène, parcours, archives.
    [order.course, order.concepts, order.reference, order.example, order.roadmap,
      flashSec, arenaSec, parcoursSec, order.resources]
      .forEach((s) => { if (s) body.appendChild(s); });

    app.appendChild(footer());
    window.scrollTo(0, 0);
  }

  // --- Arène : sélecteur de jeux + zone de session ---
  function buildArena(lang) {
    const sec = el('.cx-block.cx-arena-block');
    sec.appendChild(sectionTitle('L’Arène', 'target',
      'Apprends en jouant. Choisis un protocole d’entraînement.'));
    const arena = el('.cx-arena');
    const selector = el('.cx-arena-select');
    const stage = el('.cx-arena-stage');

    const types = ['quiz', 'output', 'fillBlank', 'bugHunt'];
    const cards = {};
    let active = null;

    function showStage(type) {
      active = type;
      Object.keys(cards).forEach((t) => cards[t].classList.toggle('on', t === type));
      clear(stage);
      const head = el('.cx-stage-head', null, [
        el('.cx-stage-ic', { html: icon(GAMES.meta(type).icon) }),
        el('.cx-stage-titles', null, [
          el('h3', { text: GAMES.meta(type).label }),
          el('p', { text: GAMES.meta(type).desc }),
        ]),
      ]);
      stage.appendChild(head);
      const mount = el('.cx-stage-mount');
      stage.appendChild(mount);
      GAMES.start(lang, type, mount);
    }

    types.forEach((type) => {
      const m = GAMES.meta(type);
      const count = (lang.games[type] || []).length;
      const best = (Store.lang(lang.id).best || {})[type] || 0;
      const c = el('button.cx-proto' + (count ? '' : '.is-disabled'), { disabled: count ? null : 'disabled' });
      c.appendChild(el('.cx-proto-ic', { html: icon(m.icon) }));
      c.appendChild(el('.cx-proto-name', { text: m.label }));
      c.appendChild(el('.cx-proto-meta', { text: count + ' ' + m.verb }));
      if (best > 0) c.appendChild(el('.cx-proto-best', null, [
        el('.cx-proto-best-ic', { html: icon('trophy') }),
        el('span', { text: best + '/' + count }),
      ]));
      if (count) c.addEventListener('click', () => showStage(type));
      cards[type] = c;
      selector.appendChild(c);
    });

    arena.appendChild(selector);
    arena.appendChild(stage);
    sec.appendChild(arena);

    // Démarre sur le premier protocole disponible.
    const first = types.find((t) => (lang.games[t] || []).length);
    if (first) showStage(first);
    else stage.appendChild(el('.cx-empty', { text: 'Défis en cours d’écriture.' }));

    return sec;
  }

  // --- Parcours de progression : 5 défis débloqués en séquence ---
  function buildParcours(lang) {
    const sec = el('.cx-block');
    sec.appendChild(sectionTitle('Parcours de progression', 'flame',
      '5 défis à accomplir, du premier pas à la maîtrise. Chacun débloque le suivant.'));
    const mount = el('.cx-parcours-mount');
    sec.appendChild(mount);
    renderParcours(lang, mount);
    return sec;
  }

  function questReward(i) { return 30 + i * 20; }

  function renderParcours(lang, mount) {
    clear(mount);
    const quests = lang.challenges || [];
    const state = Store.challengeState(lang.id);
    const doneCount = quests.reduce((n, _, i) => n + (state[i] ? 1 : 0), 0);
    const pct = quests.length ? Math.round((doneCount / quests.length) * 100) : 0;

    const prog = el('.cx-parcours-prog');
    prog.appendChild(el('.cx-parcours-track', null, [el('.cx-parcours-fill', { style: '--w:' + pct + '%' })]));
    prog.appendChild(el('.cx-parcours-label', { text: doneCount + ' / ' + quests.length + ' validés' }));
    mount.appendChild(prog);

    const list = el('.cx-quests');
    quests.forEach((q, i) => {
      const done = !!state[i];
      const open = i === 0 || !!state[i - 1];
      const reward = questReward(i);
      const node = el('.cx-quest' + (done ? '.is-done' : open ? '.is-open' : '.is-locked'));

      const marker = el('.cx-quest-marker');
      if (done) marker.appendChild(el('.cx-quest-mk-ic', { html: icon('check') }));
      else if (open) marker.appendChild(el('span.cx-quest-mk-n', { text: String(i + 1) }));
      else marker.appendChild(el('.cx-quest-mk-ic', { html: icon('lock') }));
      node.appendChild(marker);

      const qb = el('.cx-quest-body');
      qb.appendChild(el('.cx-quest-head', null, [
        el('span.cx-quest-step', { text: 'DÉFI ' + pad(i + 1) }),
        el('h3.cx-quest-title', { text: q.title }),
        el('span.cx-quest-reward', { text: '+' + reward + ' XP' }),
      ]));
      qb.appendChild(el('p.cx-quest-brief', { text: q.brief }));
      if (q.goal) {
        qb.appendChild(el('.cx-quest-goal', null, [
          el('.cx-quest-goal-ic', { html: icon('target') }),
          el('span', null, [el('b', { text: 'Objectif : ' }), q.goal]),
        ]));
      }

      if (done) {
        const btn = el('button.cx-quest-btn.is-done', null, [
          el('.cx-btn-ic', { html: icon('check') }),
          el('span', { text: 'Réussi — annuler' }),
        ]);
        btn.addEventListener('click', () => { Store.toggleChallenge(lang.id, i, reward); renderParcours(lang, mount); });
        qb.appendChild(btn);
      } else if (open) {
        const btn = el('button.cx-quest-btn', null, [
          el('.cx-btn-ic', { html: icon('flag') }),
          el('span', { text: 'Valider le défi' }),
        ]);
        btn.addEventListener('click', () => { Store.toggleChallenge(lang.id, i, reward); renderParcours(lang, mount); });
        qb.appendChild(btn);
      } else {
        qb.appendChild(el('.cx-quest-lock', null, [
          el('.cx-quest-goal-ic', { html: icon('lock') }),
          el('span', { text: 'Termine le défi précédent pour débloquer celui-ci.' }),
        ]));
      }
      node.appendChild(qb);
      list.appendChild(node);
    });
    mount.appendChild(list);
  }

  // ---------- Communs ----------
  function backLink() {
    return el('a.cx-back', { href: '#/' }, [
      el('.cx-back-ic', { html: icon('arrowLeft') }),
      el('span', { text: 'Retour au Codex' }),
    ]);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function footer() {
    return el('footer.cx-footer', null, [
      el('.cx-footer-mark', null, [
        el('.cx-footer-ic', { html: icon('logo') }),
        el('span', { text: 'CODEX' }),
      ]),
      el('p', { text: 'Base de connaissances pour développeurs — savoir, hiérarchie, et pratique.' }),
    ]);
  }

  // ============================================================
  // FLASHCARDS — révision à répétition espacée
  // ============================================================
  // Probabilité de réapparition selon la maîtrise.
  const CARD_WEIGHT = { yes: 15, mid: 65, no: 100 };

  function buildDeck(lang) {
    const deck = [];
    (lang.reference || []).forEach((g, gi) => {
      (g.items || []).forEach((it, ii) => {
        deck.push({ key: 'ref|' + gi + '|' + ii, front: it.name, back: it.desc, syntax: it.syntax, cat: g.group });
      });
    });
    (lang.concepts || []).forEach((c, ci) => {
      deck.push({ key: 'con|' + ci, front: c.title, back: c.body, syntax: c.code, cat: 'Concept clé' });
    });
    return deck;
  }

  function deckStats(deck, id) {
    const s = { yes: 0, mid: 0, no: 0, nw: 0, total: deck.length };
    deck.forEach((c) => {
      const v = Store.getCard(id, c.key);
      if (v === 'yes') s.yes++;
      else if (v === 'mid') s.mid++;
      else if (v === 'no') s.no++;
      else s.nw++;
    });
    return s;
  }

  // Tirage pondéré : poids = 15 / 65 / 100 selon le statut (nouvelle = 100).
  function pickCard(deck, id, excludeKey) {
    const weights = deck.map((c) => {
      if (c.key === excludeKey && deck.length > 1) return 0;
      const v = Store.getCard(id, c.key);
      return CARD_WEIGHT[v] || 100;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return deck[0];
    let r = Math.random() * total;
    for (let i = 0; i < deck.length; i++) { r -= weights[i]; if (r < 0) return deck[i]; }
    return deck[deck.length - 1];
  }

  function buildFlashCta(lang) {
    const deck = buildDeck(lang);
    const s = deckStats(deck, lang.id);
    const sec = el('.cx-block');
    sec.appendChild(sectionTitle('Flashcards', 'layers',
      'Révision active à répétition espacée : chaque carte revient selon ta maîtrise.'));
    const cta = el('a.cx-flash-cta', { href: '#/cartes/' + lang.id });
    cta.appendChild(el('.cx-flash-cta-ic', { html: icon('layers') }));
    cta.appendChild(el('.cx-flash-cta-txt', null, [
      el('h3', { text: 'Réviser ' + deck.length + ' cartes' }),
      el('p', { text: s.yes + ' acquises · ' + s.mid + ' à revoir · ' + (s.no + s.nw) + ' à découvrir' }),
    ]));
    cta.appendChild(el('.cx-flash-cta-arrow', { html: icon('arrowRight') }));
    sec.appendChild(cta);
    return sec;
  }

  function renderCards(id) {
    const lang = CODEX.get(id);
    clear(app);
    if (!lang) { app.appendChild(el('.cx-section', null, [el('p.cx-empty', { text: 'Système introuvable : ' + id }), backLink()])); return; }
    const deck = buildDeck(lang);
    document.body.style.setProperty('--page-accent', lang.color || '#6c30e8');

    const head = el('.cx-lang-head', { style: '--accent:' + (lang.color || '#6c30e8') });
    head.appendChild(el('a.cx-back', { href: '#/lang/' + id }, [
      el('.cx-back-ic', { html: icon('arrowLeft') }), el('span', { text: 'Retour à ' + lang.name }),
    ]));
    head.appendChild(el('.cx-lang-tags', null, [
      el('span.cx-chip.solid', { text: 'Flashcards' }),
      el('span.cx-chip', { text: deck.length + ' cartes' }),
    ]));
    head.appendChild(el('h1.cx-lang-name', null, [el('span', { text: lang.name }), el('.cx-lang-abbr', { text: 'RÉVISION' })]));
    head.appendChild(el('p.cx-lang-tag', { text: 'Note chaque carte. Acquis revient à 15%, Bof à 65%, Pas acquis à 100%.' }));
    app.appendChild(head);

    const body = el('.cx-lang-body');
    app.appendChild(body);
    const block = el('.cx-block');
    const memMount = el('.cx-flash-mem');
    const stage = el('.cx-flash-stage');
    block.appendChild(memMount);
    block.appendChild(stage);
    body.appendChild(block);
    app.appendChild(footer());

    let current = null, flipped = false, reviewed = 0;

    function renderMem() {
      clear(memMount);
      const s = deckStats(deck, id);
      const pct = (v) => (deck.length ? (v / deck.length) * 100 : 0);
      const bar = el('.cx-mem-bar');
      [['yes', s.yes], ['mid', s.mid], ['no', s.no + s.nw]].forEach(([k, v]) => {
        if (v > 0) bar.appendChild(el('.cx-mem-seg.is-' + k, { style: '--w:' + pct(v) + '%' }));
      });
      memMount.appendChild(bar);
      const legend = el('.cx-mem-legend');
      legend.appendChild(memTag('yes', 'Acquis', s.yes));
      legend.appendChild(memTag('mid', 'Bof', s.mid));
      legend.appendChild(memTag('no', 'Pas acquis', s.no + s.nw));
      const reset = el('button.cx-mem-reset', null, [
        el('.cx-mem-reset-ic', { html: icon('clock') }), el('span', { text: 'Réinitialiser la mémoire' }),
      ]);
      reset.addEventListener('click', () => { if (confirmReset()) { Store.resetCards(id); next(); } });
      legend.appendChild(reset);
      memMount.appendChild(legend);
    }
    function confirmReset() { return true; }
    function memTag(k, label, n) {
      return el('.cx-mem-tag.is-' + k, null, [el('.cx-mem-dot'), el('span', { text: label + ' · ' + n })]);
    }

    function renderCard() {
      clear(stage);
      if (!current) { stage.appendChild(el('.cx-empty', { text: 'Aucune carte disponible.' })); return; }
      const st = Store.getCard(id, current.key);
      const card = el('.cx-card3d' + (flipped ? '.is-flipped' : ''));
      card.appendChild(el('.cx-card-top', null, [
        el('.cx-card-cat', { text: current.cat }),
        el('.cx-card-status.is-' + (st || 'new'), {
          text: st === 'yes' ? 'Acquis' : st === 'mid' ? 'Bof' : st === 'no' ? 'Pas acquis' : 'Nouvelle',
        }),
      ]));
      card.appendChild(el('.cx-card-front', { text: current.front }));
      if (flipped) {
        const back = el('.cx-card-back');
        back.appendChild(el('p.cx-card-def', { text: current.back }));
        if (current.syntax) {
          const slab = el('.cx-code.cx-card-code');
          String(current.syntax).replace(/\n$/, '').split('\n').forEach((line, i) => {
            slab.appendChild(el('.cx-code-line', null, [
              el('span.cx-ln', { text: String(i + 1) }), el('span.cx-lc', { html: esc(line) || '&nbsp;' }),
            ]));
          });
          back.appendChild(slab);
        }
        card.appendChild(back);
      } else {
        card.appendChild(el('.cx-card-hint', null, [el('.cx-card-hint-ic', { html: icon('spark') }), el('span', { text: 'Clique pour révéler la réponse' })]));
      }
      card.addEventListener('click', () => { if (!flipped) { flipped = true; renderCard(); } });
      stage.appendChild(card);

      if (flipped) {
        const actions = el('.cx-flash-actions');
        actions.appendChild(rateBtn('no', 'Pas acquis', '100%'));
        actions.appendChild(rateBtn('mid', 'Bof', '65%'));
        actions.appendChild(rateBtn('yes', 'Acquis', '15%'));
        stage.appendChild(actions);
      }
      stage.appendChild(el('.cx-flash-counter', { text: 'Carte ' + (reviewed + 1) + ' — ' + deck.length + ' dans le système' }));
    }

    function rateBtn(status, label, prob) {
      const b = el('button.cx-rate.is-' + status, null, [
        el('span.cx-rate-lbl', { text: label }),
        el('span.cx-rate-prob', { text: 'revient ' + prob }),
      ]);
      b.addEventListener('click', (e) => { e.stopPropagation(); Store.setCard(id, current.key, status); reviewed++; next(); });
      return b;
    }

    function next() {
      flipped = false;
      current = pickCard(deck, id, current ? current.key : null);
      renderMem();
      renderCard();
    }

    next();
    window.scrollTo(0, 0);
  }

  // ============================================================
  // PAGE — Lexique du développeur
  // ============================================================
  function renderGlossary() {
    clear(app);
    const data = CODEX.glossary || [];
    const total = data.reduce((n, g) => n + (g.terms || []).length, 0);

    const head = el('.cx-lang-head', { style: '--accent: var(--violet)' });
    head.appendChild(backLink());
    head.appendChild(el('.cx-lang-tags', null, [
      el('span.cx-chip.solid', { text: 'Lexique' }),
      el('span.cx-chip', { text: total + ' termes' }),
      el('span.cx-chip', { text: 'Transversal' }),
    ]));
    head.appendChild(el('h1.cx-lang-name', null, [el('span', { text: 'LEXIQUE' })]));
    head.appendChild(el('p.cx-lang-tag', { text: 'Le jargon du dev, traduit en français simple.' }));
    head.appendChild(el('p.cx-lang-desc', {
      text: 'Chaque terme complexe du développement expliqué en une phrase claire. '
        + 'De string à closure, de l’API au compilateur : le vocabulaire indispensable, sans charabia.',
    }));
    app.appendChild(head);

    const bodyEl = el('.cx-lang-body');
    app.appendChild(bodyEl);

    const block = el('.cx-block');
    // Recherche
    const search = el('.cx-gloss-search');
    search.appendChild(el('.cx-search-ic', { html: icon('search') }));
    const input = el('input.cx-search-input', {
      type: 'text', placeholder: 'Chercher un terme (ex : closure, API, null…)', autocomplete: 'off',
    });
    search.appendChild(input);
    const countTag = el('.cx-gloss-count', { text: total + ' termes' });
    block.appendChild(el('.cx-gloss-tools', null, [search, countTag]));

    // Navigation par catégorie
    const nav = el('.cx-ref-nav');
    data.forEach((g, gi) => {
      const chip = el('a.cx-ref-chip', { href: '#/lexique' });
      chip.textContent = g.group;
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const t = document.getElementById('gloss-' + gi);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      nav.appendChild(chip);
    });
    block.appendChild(nav);

    const mount = el('.cx-ref-body');
    block.appendChild(mount);
    bodyEl.appendChild(block);

    function draw(term) {
      clear(mount);
      const q = (term || '').trim().toLowerCase();
      let shown = 0;
      data.forEach((g, gi) => {
        const matches = (g.terms || []).filter((it) =>
          !q || it.t.toLowerCase().indexOf(q) !== -1 || it.d.toLowerCase().indexOf(q) !== -1);
        if (!matches.length) return;
        shown += matches.length;
        const grp = el('.cx-ref-group', { id: 'gloss-' + gi });
        grp.appendChild(el('.cx-ref-head', null, [
          el('span.cx-ref-gname', { text: g.group }),
          el('span.cx-ref-gcount', { text: pad(matches.length) }),
        ]));
        const rows = el('.cx-ref-rows');
        matches.forEach((it) => {
          rows.appendChild(el('.cx-ref-item.cx-gloss-item', null, [
            el('.cx-ref-left', null, [el('code.cx-ref-name', { text: it.t })]),
            el('.cx-ref-desc', { text: it.d }),
          ]));
        });
        grp.appendChild(rows);
        mount.appendChild(grp);
      });
      countTag.textContent = shown + (q ? ' résultats' : ' termes');
      if (!shown) mount.appendChild(el('.cx-empty', { text: 'Aucun terme ne correspond à « ' + term + ' ».' }));
    }

    input.addEventListener('input', (e) => draw(e.target.value));
    draw('');

    app.appendChild(footer());
    window.scrollTo(0, 0);
  }

  // ============================================================
  // Routeur
  // ============================================================
  function route() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const parts = hash.split('/').filter(Boolean);
    document.body.style.removeProperty('--page-accent');
    if (parts[0] === 'lang' && parts[1]) renderLang(parts[1]);
    else if (parts[0] === 'cartes' && parts[1]) renderCards(parts[1]);
    else if (parts[0] === 'lexique') renderGlossary();
    else renderHome();
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('DOMContentLoaded', route);
  if (document.readyState !== 'loading') route();
})();
