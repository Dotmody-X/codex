CODEX.register({
  id: 'typescript',
  name: 'TypeScript',
  abbr: 'TS',
  category: 'frontend',
  tier: 2,
  year: 2012,
  difficulty: 3,
  color: '#3178c6',
  tagline: 'JavaScript typé à grande échelle, sûr dès la compilation.',
  paradigms: ['Multi-paradigme', 'Typage statique structurel', 'Orienté objet', 'Fonctionnel', 'Générique'],
  description: 'TypeScript est un sur-ensemble de JavaScript développé par Microsoft en 2012, qui ajoute un système de types statiques optionnel mais puissant. Il se compile en JavaScript pur, exécutable partout, tout en détectant les erreurs de type avant l\'exécution. Son typage structurel raisonne sur la forme des données plutôt que sur leur nom, offrant une grande flexibilité. Les génériques, les types union et les utility types permettent de modéliser finement la logique métier. Devenu un standard dans l\'industrie, il améliore la maintenabilité, l\'autocomplétion et la fiabilité des grandes bases de code.',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M6 9h7"/><path d="M9.5 9v8"/><path d="M19 10a2.5 2.5 0 0 0-3.5 2.2c0 2.3 3.5 1.6 3.5 3.6a2.3 2.3 0 0 1-3.6 1.6"/></svg>',
  concepts: [
    {
      title: 'Typage statique',
      body: 'TypeScript annote les variables, paramètres et retours avec des types vérifiés à la compilation. L\'inférence de type déduit automatiquement les types quand c\'est possible, réduisant le verbiage tout en gardant la sécurité.',
      code: 'let age: number = 30;\nconst nom = "Ada"; // inféré comme string\nfunction saluer(n: string): string {\n  return `Bonjour ${n}`;\n}'
    },
    {
      title: 'Interfaces vs type',
      body: 'interface et type décrivent tous deux la forme d\'un objet. interface privilégie l\'extension et la fusion de déclarations, idéale pour les contrats publics. type est plus flexible : il gère unions, intersections, tuples et types primitifs aliasés.',
      code: 'interface Point { x: number; y: number; }\ntype ID = string | number;\ntype Point3D = Point & { z: number };'
    },
    {
      title: 'Génériques',
      body: 'Les génériques paramètrent un type pour écrire du code réutilisable et type-safe sans perdre l\'information de type. Ils s\'appliquent aux fonctions, classes et interfaces, et acceptent des contraintes via extends.',
      code: 'function premier<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\npremier<number>([1, 2, 3]); // number | undefined'
    },
    {
      title: 'Unions et intersections',
      body: 'Un type union (A | B) accepte plusieurs types possibles, tandis qu\'une intersection (A & B) combine plusieurs types en un seul qui possède tous leurs membres. Ces opérateurs permettent de modéliser des données complexes avec précision.',
      code: 'type Statut = "actif" | "inactif";\ntype Admin = User & { droits: string[] };\nlet s: Statut = "actif";'
    },
    {
      title: 'Narrowing (affinage)',
      body: 'Le narrowing réduit un type union à un type plus précis dans une branche de code grâce à des vérifications comme typeof, instanceof, in ou des gardes personnalisées. Le compilateur affine alors le type disponible.',
      code: 'function afficher(x: string | number) {\n  if (typeof x === "string") {\n    return x.toUpperCase(); // x est string ici\n  }\n  return x.toFixed(2); // x est number ici\n}'
    },
    {
      title: 'Enums',
      body: 'Les enums définissent un ensemble nommé de constantes liées. Les enums numériques s\'auto-incrémentent, les enums string sont plus explicites au débogage. Les const enums sont inlinés à la compilation pour de meilleures performances.',
      code: 'enum Direction { Nord, Sud, Est, Ouest }\nenum Couleur { Rouge = "ROUGE", Vert = "VERT" }\nlet d: Direction = Direction.Nord; // 0'
    },
    {
      title: 'Utility types',
      body: 'TypeScript fournit des types utilitaires intégrés pour transformer d\'autres types : Partial rend tout optionnel, Required l\'inverse, Pick et Omit sélectionnent ou excluent des clés, Record construit un dictionnaire typé. Ils évitent la duplication.',
      code: 'interface User { id: number; nom: string; email: string; }\ntype UserBrouillon = Partial<User>;\ntype UserPublic = Omit<User, "email">;\ntype Annuaire = Record<string, User>;'
    },
    {
      title: 'Type literal et const assertions',
      body: 'Les types littéraux restreignent une valeur à un ensemble exact. L\'assertion as const fige un objet ou tableau en lecture seule avec des types littéraux précis, utile pour les configurations et les unions discriminées.',
      code: 'const config = { mode: "dark" } as const;\n// config.mode est de type "dark", pas string\ntype Mode = typeof config.mode; // "dark"'
    }
  ],
  example: {
    lang: 'ts',
    code: '// Un dépôt générique type-safe avec utility types et narrowing\ninterface Entite {\n  id: number;\n}\n\n// T doit posséder un id (contrainte générique)\nclass Depot<T extends Entite> {\n  private elements: T[] = [];\n\n  ajouter(item: T): void {\n    this.elements.push(item);\n  }\n\n  // Pick extrait juste l\'id du type T\n  trouver(id: Pick<T, "id">["id"]): T | undefined {\n    return this.elements.find(e => e.id === id);\n  }\n\n  // Partial autorise une mise à jour partielle\n  modifier(id: number, maj: Partial<T>): void {\n    const item = this.trouver(id);\n    if (item) Object.assign(item, maj); // narrowing : item existe\n  }\n}\n\ninterface Produit extends Entite {\n  nom: string;\n  prix: number;\n}\n\nconst depot = new Depot<Produit>();\ndepot.ajouter({ id: 1, nom: "Clavier", prix: 50 });\ndepot.modifier(1, { prix: 45 }); // type-safe\nconsole.log(depot.trouver(1)); // { id: 1, nom: "Clavier", prix: 45 }',
    explain: 'Cet exemple réunit plusieurs piliers de TypeScript : un générique contraint (T extends Entite) garantit que toute entité a un id, les utility types Pick et Partial dérivent des types sans duplication, et le narrowing via if (item) prouve au compilateur que la valeur n\'est pas undefined avant utilisation.'
  },
  roadmap: [
    {
      level: 'Initie',
      goals: [
        'Annoter variables, paramètres et retours avec des types',
        'Comprendre l\'inférence de type et les types primitifs',
        'Définir des interfaces et des alias type',
        'Configurer un projet avec tsconfig.json'
      ]
    },
    {
      level: 'Adepte',
      goals: [
        'Maîtriser unions, intersections et narrowing',
        'Écrire des fonctions et classes génériques',
        'Utiliser les utility types (Partial, Pick, Omit, Record)',
        'Distinguer enums, const enums et types littéraux'
      ]
    },
    {
      level: 'Maitre',
      goals: [
        'Concevoir des types conditionnels et mappés',
        'Créer des gardes de type et des unions discriminées',
        'Exploiter les types templates littéraux et infer',
        'Activer le mode strict et typer des API complexes'
      ]
    }
  ],
  resources: [
    { label: 'Documentation officielle TypeScript', url: 'https://www.typescriptlang.org/docs/' },
    { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
    { label: 'MDN - TypeScript', url: 'https://developer.mozilla.org/fr/docs/Glossary/TypeScript' },
    { label: 'Type Challenges', url: 'https://github.com/type-challenges/type-challenges' }
  ],
  games: {
    quiz: [
      {
        q: 'Quelle est la principale différence entre interface et type ?',
        options: [
          'type est plus rapide à compiler',
          'interface supporte la fusion de déclarations, pas type',
          'type ne peut pas décrire un objet',
          'Il n\'y a aucune différence'
        ],
        answer: 1,
        explain: 'interface peut être étendue et fusionnée à travers plusieurs déclarations, alors que type est figé mais gère unions et intersections.'
      },
      {
        q: 'Que signifie la contrainte <T extends Entite> ?',
        options: [
          'T doit hériter de la classe Entite',
          'T doit être assignable au type Entite',
          'T est obligatoirement Entite',
          'T ne peut pas être Entite'
        ],
        answer: 1,
        explain: 'extends contraint le générique T à être un type compatible (assignable) avec Entite.'
      },
      {
        q: 'Quel utility type rend toutes les propriétés optionnelles ?',
        options: ['Required', 'Partial', 'Readonly', 'Pick'],
        answer: 1,
        explain: 'Partial<T> transforme chaque propriété de T en propriété optionnelle.'
      },
      {
        q: 'Qu\'est-ce que le narrowing ?',
        options: [
          'Réduire la taille du fichier compilé',
          'Affiner un type union vers un type plus précis dans une branche',
          'Supprimer les types inutilisés',
          'Convertir un type en string'
        ],
        answer: 1,
        explain: 'Le narrowing utilise des vérifications (typeof, in, instanceof) pour réduire un type union à un type plus spécifique.'
      },
      {
        q: 'Que produit le compilateur TypeScript ?',
        options: ['Du bytecode', 'Du JavaScript', 'Du WebAssembly', 'Un exécutable natif'],
        answer: 1,
        explain: 'TypeScript se transpile en JavaScript standard, exécutable dans tout environnement JS.'
      },
      {
        q: 'Quel type représente "actif" ou "inactif" exclusivement ?',
        options: [
          'string',
          '"actif" | "inactif"',
          '"actif" & "inactif"',
          'enum'
        ],
        answer: 1,
        explain: 'Un type union de littéraux "actif" | "inactif" restreint la valeur à ces deux chaînes exactes.'
      },
      {
        q: 'Que fait Omit<User, "email"> ?',
        options: [
          'Garde uniquement email',
          'Crée un type User sans la propriété email',
          'Rend email optionnel',
          'Supprime email à l\'exécution'
        ],
        answer: 1,
        explain: 'Omit<T, K> construit un type identique à T mais sans les clés spécifiées dans K.'
      },
      {
        q: 'Quel est le type de typage de TypeScript ?',
        options: ['Nominal', 'Structurel', 'Dynamique', 'Faible'],
        answer: 1,
        explain: 'TypeScript utilise un typage structurel : la compatibilité dépend de la forme des types, pas de leur nom.'
      }
    ],
    fillBlank: [
      {
        prompt: 'Déclarez un générique nommé T pour cette fonction.',
        code: 'function identite<___>(x: T): T { return x; }',
        answer: 'T',
        explain: 'Le paramètre de type T est déclaré entre chevrons et réutilisé pour les arguments et le retour.'
      },
      {
        prompt: 'Rendez toutes les propriétés de User optionnelles.',
        code: 'type Brouillon = ___<User>;',
        answer: 'Partial',
        explain: 'Partial<User> transforme chaque champ en champ optionnel.'
      },
      {
        prompt: 'Créez un type union acceptant string ou number.',
        code: 'type ID = string ___ number;',
        answer: '|',
        explain: 'L\'opérateur | définit une union : la valeur peut être de l\'un ou l\'autre type.'
      },
      {
        prompt: 'Affinez le type avec une vérification de type primitif.',
        code: 'if (___ x === "string") { x.toUpperCase(); }',
        answer: 'typeof',
        explain: 'typeof permet le narrowing en distinguant les types primitifs dans une branche.'
      },
      {
        prompt: 'Combinez deux types en une intersection.',
        code: 'type Admin = User ___ Droits;',
        answer: '&',
        explain: 'L\'opérateur & crée une intersection possédant tous les membres des deux types.'
      },
      {
        prompt: 'Figez la configuration en lecture seule littérale.',
        code: 'const cfg = { mode: "dark" } ___ const;',
        answer: 'as',
        explain: 'as const fige l\'objet avec des types littéraux et en lecture seule.'
      }
    ],
    bugHunt: [
      {
        code: 'function double(x: number): number {\n  return x * 2;\n}\nconst r: string = double(5);\nconsole.log(r);',
        buggyLine: 3,
        explain: 'double retourne un number, mais on l\'assigne à une variable typée string : erreur de type à la compilation. Il faut typer r en number.',
        fix: 'const r: number = double(5);'
      },
      {
        code: 'interface User {\n  id: number;\n  nom: string;\n}\nconst u: User = { id: 1 };',
        buggyLine: 5,
        explain: 'La propriété nom est requise par l\'interface User mais absente de l\'objet : il faut la fournir ou la rendre optionnelle avec nom?.',
        fix: 'const u: User = { id: 1, nom: "Ada" };'
      },
      {
        code: 'function premier<T>(arr: T[]): T {\n  return arr[0];\n}\nconst x = premier([]);\nconsole.log(x.toString());',
        buggyLine: 2,
        explain: 'arr[0] peut être undefined si le tableau est vide, mais le retour promet T : le type devrait être T | undefined pour être honnête.',
        fix: 'function premier<T>(arr: T[]): T | undefined {'
      },
      {
        code: 'type Statut = "actif" | "inactif";\nlet s: Statut = "actif";\ns = "supprime";\nconsole.log(s);',
        buggyLine: 3,
        explain: '"supprime" n\'appartient pas à l\'union "actif" | "inactif" : seules ces deux valeurs littérales sont autorisées.',
        fix: 's = "inactif";'
      },
      {
        code: 'function aire(f: string | number) {\n  return f.toFixed(2);\n}\nconsole.log(aire("3"));',
        buggyLine: 2,
        explain: 'toFixed n\'existe que sur number, mais f peut être string : il faut affiner le type (narrowing) avant d\'appeler la méthode.',
        fix: '  return typeof f === "number" ? f.toFixed(2) : f;'
      }
    ],
    output: [
      {
        code: 'enum Direction { Nord, Sud, Est }\nconsole.log(Direction.Sud);',
        options: ['"Sud"', '1', '2'],
        answer: 1,
        explain: 'Les enums numériques s\'auto-incrémentent depuis 0 : Nord=0, Sud=1, Est=2.'
      },
      {
        code: 'type T = { a: number } & { b: string };\nconst x: T = { a: 1, b: "ok" };\nconsole.log(Object.keys(x).length);',
        options: ['1', '2', '0'],
        answer: 1,
        explain: 'L\'intersection combine les deux types : x doit posséder a et b, soit deux clés.'
      },
      {
        code: 'const config = { mode: "dark" } as const;\nconsole.log(typeof config.mode);',
        options: ['"string"', '"dark"', '"object"'],
        answer: 0,
        explain: 'À l\'exécution typeof retourne toujours "string" ; as const n\'agit qu\'au niveau des types à la compilation.'
      },
      {
        code: 'type U = keyof { x: 1; y: 2 };\n// Quelles clés compose U ?\nconst c: U = "x";\nconsole.log(c);',
        options: ['"x"', '"x" | "y"', 'number'],
        answer: 0,
        explain: 'keyof produit l\'union "x" | "y" ; ici la valeur affichée est "x", l\'une des clés valides de cette union.'
      },
      {
        code: 'enum C { Rouge = "R", Vert = "V" }\nconsole.log(C.Vert);',
        options: ['1', '"V"', '"Vert"'],
        answer: 1,
        explain: 'Dans un enum string, chaque membre vaut la chaîne explicitement assignée : C.Vert vaut "V".'
      }
    ]
  }
});
