CODEX.register({
  id: 'javascript',
  name: 'JavaScript',
  abbr: 'JS',
  category: 'frontend',
  tier: 1,
  year: 1995,
  difficulty: 2,
  color: '#f7df1e',
  tagline: 'Le langage qui anime le web, du navigateur au serveur.',
  paradigms: ['Multi-paradigme', 'Orienté objet (prototypes)', 'Fonctionnel', 'Événementiel', 'Impératif'],
  description: 'JavaScript est un langage interprété, dynamiquement typé, conçu en 1995 par Brendan Eich pour rendre les pages web interactives. Devenu le langage universel du navigateur, il s\'est étendu au serveur via Node.js, au mobile et au desktop. Son modèle d\'exécution monothreadé reposant sur une boucle d\'événements lui permet de gérer l\'asynchronisme sans blocage. Standardisé sous le nom ECMAScript, il évolue chaque année avec de nouvelles fonctionnalités. Sa souplesse en fait un outil puissant, mais ses règles de coercition et de portée demandent une compréhension fine pour éviter les pièges.',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M8 10v5a2 2 0 0 1-4 0"/><path d="M13 14a3 3 0 0 0 5 1"/><path d="M3 12h6"/><path d="M15 3v6"/></svg>',
  concepts: [
    {
      title: 'Types primitifs et objets',
      body: 'JavaScript distingue sept types primitifs (string, number, bigint, boolean, undefined, null, symbol) et le type object qui englobe tableaux, fonctions et dates. Les primitifs sont immuables et copiés par valeur, tandis que les objets sont manipulés par référence.',
      code: 'typeof 42;        // "number"\ntypeof "hi";      // "string"\ntypeof null;      // "object" (bug historique)\ntypeof [];        // "object"\ntypeof (() => {}); // "function"'
    },
    {
      title: 'Hoisting (remontée)',
      body: 'Les déclarations var et function sont remontées en haut de leur portée avant l\'exécution. Les var sont initialisées à undefined, alors que let et const restent dans une zone morte temporelle (TDZ) jusqu\'à leur déclaration.',
      code: 'console.log(a); // undefined (var remontée)\nvar a = 1;\n\nconsole.log(b); // ReferenceError (TDZ)\nlet b = 2;'
    },
    {
      title: 'Closures (fermetures)',
      body: 'Une closure est une fonction qui capture les variables de sa portée englobante, même après que cette portée a fini de s\'exécuter. C\'est le mécanisme clé pour l\'encapsulation, les compteurs privés et la mémoïsation.',
      code: 'function compteur() {\n  let n = 0;\n  return () => ++n;\n}\nconst inc = compteur();\ninc(); // 1\ninc(); // 2'
    },
    {
      title: 'Prototypes et héritage',
      body: 'Chaque objet possède un lien interne vers un prototype dont il hérite les propriétés. La recherche d\'une propriété remonte la chaîne de prototypes jusqu\'à null. Les classes ES6 sont du sucre syntaxique au-dessus de ce modèle.',
      code: 'const animal = { parle() { return "..."; } };\nconst chien = Object.create(animal);\nchien.parle(); // "..." héritée du prototype'
    },
    {
      title: 'Le mot-clé this',
      body: 'La valeur de this dépend de la façon dont une fonction est appelée, non de l\'endroit où elle est définie. Un appel méthode lie this à l\'objet, un appel simple le lie au global ou undefined en mode strict. Les fonctions fléchées héritent du this lexical.',
      code: 'const obj = {\n  val: 10,\n  normal() { return this.val; },\n  fleche: () => this.val\n};\nobj.normal(); // 10\nobj.fleche(); // undefined (this lexical)'
    },
    {
      title: 'Boucle d\'événements et asynchronisme',
      body: 'JavaScript est monothreadé mais non bloquant grâce à la boucle d\'événements. Les microtâches (promesses) sont traitées avant les macrotâches (setTimeout) après chaque tâche synchrone. Les promesses et async/await structurent le code asynchrone de façon lisible.',
      code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");\n// Ordre : A D C B'
    },
    {
      title: 'Promesses et async/await',
      body: 'Une promesse représente une valeur future qui peut être résolue ou rejetée. async/await permet d\'écrire du code asynchrone avec une syntaxe synchrone, où await suspend la fonction jusqu\'à la résolution de la promesse.',
      code: 'async function charger() {\n  try {\n    const r = await fetch("/api");\n    return await r.json();\n  } catch (e) {\n    console.error(e);\n  }\n}'
    },
    {
      title: 'Égalité == vs ===',
      body: 'L\'opérateur === compare valeur et type sans conversion (égalité stricte). L\'opérateur == applique une coercition de type avant la comparaison, source de surprises. La recommandation est de toujours utiliser === sauf intention explicite.',
      code: '0 == "";      // true (coercition)\n0 === "";     // false\nnull == undefined;  // true\nNaN === NaN;  // false'
    },
    {
      title: 'Méthodes de tableaux',
      body: 'Les tableaux offrent des méthodes fonctionnelles puissantes : map transforme, filter sélectionne, reduce agrège, find recherche. Elles favorisent un style déclaratif et immuable, contrairement à des méthodes mutantes comme push ou splice.',
      code: 'const nums = [1, 2, 3, 4];\nnums.map(n => n * 2);          // [2,4,6,8]\nnums.filter(n => n % 2 === 0); // [2,4]\nnums.reduce((a, n) => a + n, 0); // 10'
    }
  ],
  example: {
    lang: 'js',
    code: '// Système de panier avec closures et méthodes de tableaux\nfunction creerPanier() {\n  // articles est privé, encapsulé par la closure\n  const articles = [];\n\n  return {\n    ajouter(nom, prix) {\n      articles.push({ nom, prix });\n    },\n    // reduce agrège le total\n    total() {\n      return articles.reduce((acc, a) => acc + a.prix, 0);\n    },\n    // filter et map pour un résumé lisible\n    resume() {\n      return articles\n        .map(a => `${a.nom} : ${a.prix}EUR`)\n        .join(", ");\n    }\n  };\n}\n\nconst panier = creerPanier();\npanier.ajouter("Livre", 20);\npanier.ajouter("Stylo", 5);\nconsole.log(panier.resume()); // "Livre : 20EUR, Stylo : 5EUR"\nconsole.log(panier.total()); // 25',
    explain: 'Cet exemple combine plusieurs concepts fondamentaux : une closure encapsule le tableau articles pour le rendre privé (inaccessible de l\'extérieur), les méthodes retournées partagent cet état, et les méthodes de tableaux map et reduce produisent un code déclaratif sans mutation visible.'
  },
  roadmap: [
    {
      level: 'Initie',
      goals: [
        'Maîtriser les types primitifs, variables (let, const) et opérateurs',
        'Écrire des fonctions, conditions et boucles',
        'Manipuler tableaux et objets avec leurs méthodes de base',
        'Comprendre la différence entre == et ==='
      ]
    },
    {
      level: 'Adepte',
      goals: [
        'Comprendre le hoisting, les portées et les closures',
        'Utiliser map, filter et reduce de façon fluide',
        'Gérer l\'asynchronisme avec promesses et async/await',
        'Saisir le fonctionnement de this selon le contexte d\'appel'
      ]
    },
    {
      level: 'Maitre',
      goals: [
        'Maîtriser la chaîne de prototypes et l\'héritage',
        'Anticiper l\'ordre d\'exécution de la boucle d\'événements',
        'Optimiser la performance (mémoïsation, debounce, lazy loading)',
        'Concevoir des modules et des patterns réutilisables'
      ]
    }
  ],
  resources: [
    { label: 'MDN Web Docs - JavaScript', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript' },
    { label: 'JavaScript.info', url: 'https://javascript.info/' },
    { label: 'Spécification ECMAScript', url: 'https://tc39.es/ecma262/' },
    { label: 'You Don\'t Know JS (livre)', url: 'https://github.com/getify/You-Dont-Know-JS' }
  ],
  games: {
    quiz: [
      {
        q: 'Quel est le résultat de typeof null ?',
        options: ['"null"', '"object"', '"undefined"', 'Erreur'],
        answer: 1,
        explain: 'typeof null retourne "object", un bug historique conservé pour la compatibilité.'
      },
      {
        q: 'Quelle déclaration crée une zone morte temporelle (TDZ) ?',
        options: ['var', 'let', 'function', 'Aucune'],
        answer: 1,
        explain: 'let (et const) sont remontées mais non initialisées, créant une TDZ jusqu\'à leur déclaration.'
      },
      {
        q: 'Qu\'est-ce qu\'une closure ?',
        options: [
          'Une fonction qui se ferme automatiquement',
          'Une fonction capturant les variables de sa portée englobante',
          'Une méthode pour fermer une connexion',
          'Un type de boucle'
        ],
        answer: 1,
        explain: 'Une closure capture et conserve l\'accès aux variables de sa portée parente après son exécution.'
      },
      {
        q: 'Quelle méthode de tableau ne mute PAS le tableau original ?',
        options: ['push', 'splice', 'map', 'sort'],
        answer: 2,
        explain: 'map retourne un nouveau tableau sans modifier l\'original, contrairement à push, splice et sort.'
      },
      {
        q: 'Comment this est-il déterminé pour une fonction fléchée ?',
        options: [
          'Par l\'objet qui l\'appelle',
          'Par le contexte lexical où elle est définie',
          'Toujours l\'objet global',
          'Toujours undefined'
        ],
        answer: 1,
        explain: 'Les fonctions fléchées n\'ont pas leur propre this : elles héritent du this de leur portée englobante.'
      },
      {
        q: 'Entre microtâches et macrotâches, lesquelles sont traitées en premier ?',
        options: ['Les macrotâches', 'Les microtâches', 'Dans l\'ordre d\'ajout', 'Aléatoirement'],
        answer: 1,
        explain: 'La boucle d\'événements vide la file des microtâches (promesses) avant de passer aux macrotâches (setTimeout).'
      },
      {
        q: 'Quel opérateur compare sans coercition de type ?',
        options: ['==', '===', '=', '!='],
        answer: 1,
        explain: '=== est l\'égalité stricte : il compare valeur et type sans conversion implicite.'
      },
      {
        q: 'Que retourne [1, 2, 3].reduce((a, b) => a + b, 0) ?',
        options: ['0', '6', '123', '[1,2,3]'],
        answer: 1,
        explain: 'reduce accumule les valeurs : 0+1+2+3 = 6.'
      }
    ],
    fillBlank: [
      {
        prompt: 'Déclarez une constante qui ne peut pas être réassignée.',
        code: '___ PI = 3.14159;',
        answer: 'const',
        explain: 'const déclare une liaison constante qui ne peut pas être réassignée.'
      },
      {
        prompt: 'Complétez pour attendre la résolution d\'une promesse dans une fonction async.',
        code: 'const data = ___ fetch(url);',
        answer: 'await',
        explain: 'await suspend l\'exécution jusqu\'à la résolution de la promesse retournée par fetch.'
      },
      {
        prompt: 'Transformez chaque élément du tableau en son double.',
        code: '[1, 2, 3].___(n => n * 2);',
        answer: 'map',
        explain: 'map applique une fonction à chaque élément et retourne un nouveau tableau.'
      },
      {
        prompt: 'Filtrez les nombres pairs du tableau.',
        code: 'nums.___(n => n % 2 === 0);',
        answer: 'filter',
        explain: 'filter conserve les éléments pour lesquels le prédicat retourne true.'
      },
      {
        prompt: 'Créez un objet héritant de proto.',
        code: 'const enfant = Object.___(proto);',
        answer: 'create',
        explain: 'Object.create crée un nouvel objet avec le prototype spécifié.'
      },
      {
        prompt: 'Utilisez l\'égalité stricte pour comparer x et 5.',
        code: 'if (x ___ 5) { /* ... */ }',
        answer: '===',
        explain: '=== compare valeur et type sans coercition, la pratique recommandée.'
      }
    ],
    bugHunt: [
      {
        code: 'function somme(arr) {\n  let total = 0;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}',
        buggyLine: 3,
        explain: 'La condition i <= arr.length dépasse d\'un index, ajoutant undefined au total (résultat NaN). Il faut utiliser i < arr.length.',
        fix: '  for (let i = 0; i < arr.length; i++) {'
      },
      {
        code: 'const obj = {\n  valeur: 42,\n  getValeur: () => {\n    return this.valeur;\n  }\n};\nconsole.log(obj.getValeur());',
        buggyLine: 3,
        explain: 'Une fonction fléchée n\'a pas son propre this : this ne pointe pas vers obj mais vers la portée englobante, retournant undefined. Utilisez une méthode classique.',
        fix: '  getValeur() {'
      },
      {
        code: 'let resultat;\nif (x = 5) {\n  resultat = "egal";\n}\nconsole.log(resultat);',
        buggyLine: 2,
        explain: 'x = 5 est une affectation, pas une comparaison : la condition est toujours vraie. Il faut utiliser === pour comparer.',
        fix: 'if (x === 5) {'
      },
      {
        code: 'async function lire() {\n  const reponse = fetch("/api");\n  const data = await reponse.json();\n  return data;\n}',
        buggyLine: 2,
        explain: 'fetch retourne une promesse : sans await, reponse est une promesse, pas une réponse, et reponse.json() échoue. Il faut await fetch.',
        fix: '  const reponse = await fetch("/api");'
      },
      {
        code: 'const nombres = [3, 1, 2];\nconst tries = nombres.sort();\nnombres.push(0);\nconsole.log(tries.length);',
        buggyLine: 2,
        explain: 'sort mute le tableau original et retourne la même référence : tries et nombres pointent vers le même tableau, donc push affecte aussi tries. Il faut copier d\'abord.',
        fix: 'const tries = [...nombres].sort();'
      }
    ],
    output: [
      {
        code: 'console.log(0.1 + 0.2 === 0.3);',
        options: ['true', 'false', 'NaN'],
        answer: 1,
        explain: 'La représentation flottante IEEE 754 donne 0.30000000000000004, donc la comparaison stricte est false.'
      },
      {
        code: 'console.log(typeof NaN);\nconsole.log(NaN === NaN);',
        options: ['"number" puis false', '"NaN" puis true', '"number" puis true'],
        answer: 0,
        explain: 'NaN est de type "number" mais n\'est égal à rien, pas même à lui-même : NaN === NaN vaut false.'
      },
      {
        code: 'console.log(a);\nvar a = 1;',
        options: ['1', 'undefined', 'ReferenceError'],
        answer: 1,
        explain: 'La déclaration var a est remontée et initialisée à undefined, mais l\'affectation reste à sa place.'
      },
      {
        code: 'console.log("5" - 1);\nconsole.log("5" + 1);',
        options: ['4 puis 6', '4 puis "51"', '"51" puis "51"'],
        answer: 1,
        explain: 'L\'opérateur - force une conversion numérique (5-1=4), tandis que + privilégie la concaténation de chaînes ("5"+1="51").'
      },
      {
        code: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
        options: ['0 1 2', '3 3 3', '0 0 0'],
        answer: 1,
        explain: 'var partage une seule variable i entre toutes les itérations : au moment où les callbacks s\'exécutent, i vaut déjà 3.'
      }
    ]
  }
});
