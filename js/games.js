/* ============================================================
   CODEX — Moteur de mini-jeux
   4 formats : quiz (QCM), output (prédire la sortie),
   fillBlank (compléter), bugHunt (trouver le bug).
   ============================================================ */
(function () {
  'use strict';

  const { el, clear, esc, Store } = window.CX;
  const icon = window.CODEX_ICON;

  const META = {
    quiz:      { label: 'Interrogatoire',  icon: 'quiz',      verb: 'questions', desc: 'Teste tes connaissances par QCM.' },
    output:    { label: 'Oracle',          icon: 'output',    verb: 'sorties',   desc: 'Prédis ce que le code affiche.' },
    fillBlank: { label: 'Compilation',     icon: 'fillBlank', verb: 'trous',     desc: 'Complète le code manquant.' },
    bugHunt:   { label: 'Traque',          icon: 'bugHunt',   verb: 'bugs',      desc: 'Repère la ligne défaillante.' },
  };

  function normalize(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '');
  }

  // --- Rendu d'un bloc de code, lignes numérotées, cliquables en option ---
  function codeBlock(code, opts) {
    opts = opts || {};
    const lines = String(code).replace(/\n$/, '').split('\n');
    const wrap = el('.cx-code' + (opts.clickable ? '.is-clickable' : ''));
    lines.forEach((line, i) => {
      const row = el('.cx-code-line', { dataset: { line: String(i + 1) } }, [
        el('span.cx-ln', { text: String(i + 1) }),
        el('span.cx-lc', { html: esc(line) || '&nbsp;' }),
      ]);
      if (opts.clickable && typeof opts.onPick === 'function') {
        row.addEventListener('click', () => opts.onPick(i + 1, row));
      }
      wrap.appendChild(row);
    });
    return wrap;
  }

  // ============================================================
  // Session générique
  // ============================================================
  function Session(lang, type, mount) {
    const items = (lang.games[type] || []).slice();
    const meta = META[type];
    let idx = 0, score = 0, streak = 0, answered = false;

    function render() {
      clear(mount);
      if (idx >= items.length) return finish();

      const item = items[idx];
      const card = el('.cx-game');

      // Barre de progression
      const bar = el('.cx-game-top', null, [
        el('.cx-game-id', null, [
          el('.cx-game-id-ic', { html: icon(meta.icon) }),
          el('span', { text: meta.label }),
        ]),
        el('.cx-game-prog', null, [
          el('span.cx-game-count', { text: (idx + 1) + ' / ' + items.length }),
          progressDots(),
          el('.cx-streak' + (streak > 1 ? '.is-hot' : ''), null, [
            el('span.cx-streak-ic', { html: icon('flame') }),
            el('span', { text: 'x' + streak }),
          ]),
        ]),
      ]);
      card.appendChild(bar);

      const body = el('.cx-game-body');
      card.appendChild(body);
      mount.appendChild(card);

      if (type === 'quiz') renderChoice(body, item, item.q, item.options, item.answer);
      else if (type === 'output') renderOutput(body, item);
      else if (type === 'fillBlank') renderFill(body, item);
      else if (type === 'bugHunt') renderBug(body, item);
    }

    function progressDots() {
      const d = el('.cx-dots');
      items.forEach((_, i) => {
        d.appendChild(el('.cx-dot' + (i < idx ? '.done' : i === idx ? '.cur' : '')));
      });
      return d;
    }

    function feedback(body, ok, explain) {
      answered = true;
      if (ok) { score++; streak++; Store.addXp(lang.id, 10 + Math.min(streak, 5) * 2); }
      else { streak = 0; Store.addXp(lang.id, 2); }

      const fb = el('.cx-fb' + (ok ? '.ok' : '.no'));
      fb.appendChild(el('.cx-fb-head', null, [
        el('.cx-fb-ic', { html: icon(ok ? 'check' : 'cross') }),
        el('span', { text: ok ? 'Exact' : 'Raté' }),
      ]));
      if (explain) fb.appendChild(el('p.cx-fb-text', { text: explain }));
      const next = el('button.cx-btn.cx-btn-next', null, [
        el('span', { text: idx + 1 >= items.length ? 'Voir le bilan' : 'Suivant' }),
        el('.cx-btn-ic', { html: icon('arrowRight') }),
      ]);
      next.addEventListener('click', () => { idx++; answered = false; render(); });
      fb.appendChild(next);
      body.appendChild(fb);
      fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // --- QCM (quiz & output partagent la logique de choix) ---
    function renderChoice(body, item, question, options, correct, codeText) {
      if (codeText) body.appendChild(codeBlock(codeText));
      body.appendChild(el('p.cx-q', { text: question }));
      const list = el('.cx-options');
      options.forEach((opt, i) => {
        const b = el('button.cx-opt', null, [
          el('span.cx-opt-key', { text: String.fromCharCode(65 + i) }),
          el('span.cx-opt-text', { text: opt }),
        ]);
        b.addEventListener('click', () => {
          if (answered) return;
          const ok = i === correct;
          Array.from(list.children).forEach((c, ci) => {
            c.classList.add('is-locked');
            if (ci === correct) c.classList.add('is-correct');
          });
          if (!ok) b.classList.add('is-wrong');
          feedback(body, ok, item.explain);
        });
        list.appendChild(b);
      });
      body.appendChild(list);
    }

    function renderOutput(body, item) {
      body.appendChild(el('p.cx-q-label', { text: 'Que produit ce code ?' }));
      renderChoice(body, item, 'Sélectionne la sortie correcte.', item.options, item.answer, item.code);
    }

    // --- Complétion ---
    function renderFill(body, item) {
      body.appendChild(el('p.cx-q', { text: item.prompt }));
      const rendered = String(item.code).replace(/___/g, '▯▯▯');
      body.appendChild(codeBlock(rendered));
      const input = el('input.cx-input', {
        type: 'text', placeholder: 'Ta réponse pour ▯▯▯', autocomplete: 'off', spellcheck: 'false',
      });
      const submit = el('button.cx-btn', null, [
        el('.cx-btn-ic', { html: icon('check') }),
        el('span', { text: 'Valider' }),
      ]);
      const go = () => {
        if (answered) return;
        const ok = normalize(input.value) === normalize(item.answer);
        input.classList.add(ok ? 'is-ok' : 'is-no');
        input.disabled = true;
        const sol = el('.cx-solution', null, [
          el('span.cx-solution-lbl', { text: 'Attendu' }),
          el('code', { text: item.answer }),
        ]);
        body.appendChild(sol);
        feedback(body, ok, item.explain);
      };
      submit.addEventListener('click', go);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      body.appendChild(el('.cx-fill-row', null, [input, submit]));
      setTimeout(() => input.focus(), 30);
    }

    // --- Traque du bug ---
    function renderBug(body, item) {
      body.appendChild(el('p.cx-q', { text: 'Clique sur la ligne qui contient le bug.' }));
      const block = codeBlock(item.code, {
        clickable: true,
        onPick(lineNo, row) {
          if (answered) return;
          const ok = lineNo === item.buggyLine;
          const target = block.querySelector('[data-line="' + item.buggyLine + '"]');
          if (target) target.classList.add('is-bug');
          if (!ok) row.classList.add('is-miss');
          block.classList.add('is-locked');
          let explain = item.explain;
          if (item.fix) explain = (explain ? explain + ' ' : '') + 'Correction : ' + item.fix;
          feedback(body, ok, explain);
        },
      });
      body.appendChild(block);
    }

    // --- Bilan ---
    function finish() {
      Store.recordBest(lang.id, type, score, items.length);
      const pct = items.length ? Math.round((score / items.length) * 100) : 0;
      const rank = pct >= 90 ? 'Architecte' : pct >= 70 ? 'Ingénieur' : pct >= 40 ? 'Apprenti' : 'Novice';
      const wrap = el('.cx-result');
      wrap.appendChild(el('.cx-result-ring', { style: '--p:' + pct }, [
        el('.cx-result-ic', { html: icon('trophy') }),
        el('.cx-result-pct', { text: pct + '%' }),
      ]));
      wrap.appendChild(el('h3.cx-result-rank', { text: rank }));
      wrap.appendChild(el('p.cx-result-line', {
        text: score + ' / ' + items.length + ' — module « ' + meta.label + ' » de ' + lang.name,
      }));
      const again = el('button.cx-btn', null, [
        el('.cx-btn-ic', { html: icon('spark') }),
        el('span', { text: 'Rejouer' }),
      ]);
      again.addEventListener('click', () => { idx = 0; score = 0; streak = 0; answered = false; render(); });
      wrap.appendChild(again);
      clear(mount);
      mount.appendChild(wrap);
      if (typeof onDone === 'function') onDone();
    }

    let onDone = null;
    this.onComplete = (fn) => { onDone = fn; return this; };
    this.start = () => { idx = 0; score = 0; streak = 0; answered = false; render(); };
  }

  window.CODEX_GAMES = {
    META,
    meta(type) { return META[type]; },
    start(lang, type, mount) {
      if (!lang.games[type] || !lang.games[type].length) {
        clear(mount);
        mount.appendChild(el('.cx-empty', { text: 'Aucun défi de ce type pour le moment.' }));
        return null;
      }
      const s = new Session(lang, type, mount);
      s.start();
      return s;
    },
  };
})();
