# CODEX — La bible du développeur

Base de connaissances pour développeurs : tous les langages référencés, **hiérarchisés** en strates,
**expliqués** (concepts, exemple commenté, roadmap d'objectifs), et transformés en **mini-jeux jouables**.
Direction artistique **cyber-brutaliste** : fond papier, typographie massive, grilles et bordures nettes
(aucun arrondi, aucun glow), accents violet + vert acide, chrome monospace (horloge système, barre de statut,
numérotation `/01`). **Zéro emoji** — toutes les icônes sont des SVG sur-mesure.

## Lancer le site

C'est un site **statique sans build** (HTML/CSS/JS purs, balises `<script>` classiques, aucune dépendance).

- Le plus simple : ouvrir `index.html` dans un navigateur.
- Recommandé (évite toute restriction navigateur) : servir le dossier.
  ```bash
  python3 -m http.server 4178
  # puis ouvrir http://localhost:4178
  ```

> Les polices (Orbitron / Rajdhani / JetBrains Mono) sont chargées via Google Fonts ; une connexion
> est utile pour le rendu typographique, mais le site fonctionne sans.

## Ce qu'il contient

- **15 langages** : HTML, CSS, JavaScript, TypeScript, Python, Ruby, PHP, SQL, Node.js, React, Go, Java, C, C++, Rust.
- **Cours complets** : 90 chapitres / 270 leçons au total (un cours progressif par langage).
- **Référence classée** : 1470 éléments essentiels (balises, propriétés, mots-clés, méthodes…) rangés par catégorie.
- **Parcours de progression** : 5 défis concrets par langage (75 au total), débloqués en séquence, avec XP et progression persistées.
- **Flashcards à répétition espacée** : toutes les notions de chaque langage en cartes, avec une « mémoire » persistée. Une carte revient selon sa maîtrise : Acquis 15%, Bof 65%, Pas acquis 100%.
- **Lexique du développeur** : 93 termes complexes expliqués simplement, avec recherche.
- **342 défis jouables** répartis en 4 formats par langage :
  - **Interrogatoire** (QCM de connaissances)
  - **Oracle** (prédire la sortie d'un extrait de code)
  - **Compilation** (compléter le code manquant)
  - **Traque** (repérer la ligne défaillante)
- **Hiérarchie en 6 strates**, des fondations (HTML/CSS) au métal nu (C/C++/Rust).
- **Progression persistée** (XP + meilleurs scores) via `localStorage`.

## Structure

```
index.html            Point d'entrée + ordre de chargement des scripts
css/theme.css         Thème cyber-brutaliste (variables, grilles, bordures, mono-chrome)
js/core.js            Registre CODEX + définition des strates et catégories
js/util.js            Helpers DOM (el, esc) + stockage de progression
js/icons.js           Bibliothèque d'icônes SVG de l'interface
js/games.js           Moteur des 4 mini-jeux (score, série, XP, bilan)
js/app.js             Routeur (hash) + rendu accueil / fiche langage / arène
js/data/<langage>.js  Une fiche par langage : CODEX.register({ ... })
js/data-ext/<lang>.js Cours complet + référence classée : CODEX.extend(id, { course, reference })
```

## Ajouter un langage

1. Créer `js/data/<id>.js` qui appelle `CODEX.register({ ... })` (voir un fichier existant comme gabarit).
2. Ajouter `<script src="js/data/<id>.js"></script>` dans `index.html`.

Champs principaux d'une fiche : `id, name, abbr, category, tier, year, difficulty, color, tagline,
paradigms, description, icon (SVG), concepts[], example{code,explain}, roadmap[], resources[],
games{quiz[], output[], fillBlank[], bugHunt[]}`.

Catégories disponibles : `markup, frontend, backend, database, systems, framework`.
Strates (`tier`) : `0` fondations · `1` scripts · `2` typage & données · `3` plateformes & écosystèmes ·
`4` systèmes · `5` frontières.
