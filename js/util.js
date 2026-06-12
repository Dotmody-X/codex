/* ============================================================
   CODEX — Utilitaires (DOM, stockage, helpers)
   ============================================================ */
(function () {
  'use strict';

  // Création d'éléments concise : el('div.classe', {attrs}, [enfants])
  function el(spec, attrs, children) {
    const parts = spec.split(/(?=[.#])/);
    const tag = parts[0].match(/^[.#]/) ? 'div' : parts.shift();
    const node = document.createElement(tag || 'div');
    parts.forEach((p) => {
      if (p[0] === '.') node.classList.add(p.slice(1));
      else if (p[0] === '#') node.id = p.slice(1);
    });
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (k === 'dataset') {
          Object.assign(node.dataset, v);
        } else {
          node.setAttribute(k, v);
        }
      });
    }
    appendChildren(node, children);
    return node;
  }

  function appendChildren(node, children) {
    if (children == null) return;
    if (!Array.isArray(children)) children = [children];
    children.forEach((c) => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  // Échappement HTML pour l'affichage de code brut.
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // --- Stockage de progression ---
  const KEY = 'codex.progress.v1';
  const Store = {
    data: load(),
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) { /* mode privé */ }
    },
    lang(id) {
      if (!this.data[id]) this.data[id] = { xp: 0, best: {}, done: {}, challenges: {} };
      if (!this.data[id].challenges) this.data[id].challenges = {};
      return this.data[id];
    },
    challengeState(id) {
      return this.lang(id).challenges;
    },
    // Bascule un défi : valide (+xp) ou annule (-xp). Renvoie le nouvel état.
    toggleChallenge(id, i, xp) {
      const c = this.lang(id).challenges;
      if (c[i]) { delete c[i]; this.addXp(id, -xp); return false; }
      c[i] = true; this.addXp(id, xp); return true;
    },
    addXp(id, amount) {
      const l = this.lang(id);
      l.xp += amount;
      this.data._totalXp = (this.data._totalXp || 0) + amount;
      this.save();
    },
    recordBest(id, type, score, total) {
      const l = this.lang(id);
      const prev = l.best[type] || 0;
      if (score > prev) l.best[type] = score;
      l.done[type] = total;
      this.save();
    },
    totalXp() { return this.data._totalXp || 0; },
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }

  window.CX = { el, clear, esc, Store, appendChildren };
})();
