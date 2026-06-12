/* ============================================================
   CODEX — Extension TypeScript
   Cours progressif + Référence exhaustive des types et concepts.
   Greffé sur la fiche déjà enregistrée via CODEX.extend.
   ============================================================ */
CODEX.extend('typescript', {
  course: [
    {
      title: "Chapitre 1 — Annotations & inférence",
      lessons: [
        {
          title: "Annoter une variable",
          body: "TypeScript ajoute une couche de types statiques au-dessus de JavaScript. On annote une variable avec deux-points suivis du type voulu, juste après son nom. Le compilateur vérifie alors que toute valeur affectée respecte ce contrat. Si vous tentez d'écrire un texte dans un nombre, l'erreur surgit avant même l'exécution. C'est tout l'intérêt : déplacer les bugs du runtime vers la compilation.",
          code: "let age: number = 30;\nlet nom: string = \"Ada\";\nlet actif: boolean = true;\n// age = \"trente\"; // Erreur : string non assignable à number",
          lang: "ts"
        },
        {
          title: "Laisser l'inférence travailler",
          body: "Annoter chaque variable serait fastidieux et redondant. TypeScript déduit souvent le type tout seul à partir de la valeur d'initialisation : c'est l'inférence. Une variable initialisée avec un nombre devient automatiquement de type number. La bonne pratique consiste à annoter les frontières (paramètres, retours, API publiques) et à laisser l'inférence gérer le reste. Un code trop annoté devient bruyant sans gain de sécurité.",
          code: "let total = 42;        // inféré : number\nlet message = \"prêt\";  // inféré : string\nconst pi = 3.14;       // inféré : 3.14 (type littéral)\n// total = \"x\"; // Erreur détectée grâce à l'inférence",
          lang: "ts"
        },
        {
          title: "Typer une fonction",
          body: "Une fonction se type en annotant chacun de ses paramètres puis son type de retour, placé après la parenthèse fermante. Le compilateur vérifie alors les appels : nombre d'arguments, types et usage du résultat. Le type spécial void indique qu'une fonction ne retourne rien d'exploitable. Annoter le retour documente l'intention et protège contre les oublis de return.",
          code: "function additionner(a: number, b: number): number {\n  return a + b;\n}\n\nfunction saluer(nom: string): void {\n  console.log(\"Bonjour \" + nom);\n}",
          lang: "ts"
        }
      ]
    },
    {
      title: "Chapitre 2 — Interfaces & alias de type",
      lessons: [
        {
          title: "Décrire un objet avec une interface",
          body: "Une interface décrit la forme attendue d'un objet : ses propriétés et leurs types. C'est un contrat que toute valeur déclarée de ce type doit honorer. Le point-virgule sépare les membres et le bloc se lit comme une fiche signalétique. Les interfaces sont purement statiques : elles disparaissent à la compilation et ne pèsent rien à l'exécution.",
          code: "interface Utilisateur {\n  id: number;\n  nom: string;\n  email: string;\n}\n\nconst u: Utilisateur = { id: 1, nom: \"Ada\", email: \"ada@x.io\" };",
          lang: "ts"
        },
        {
          title: "Propriétés optionnelles et lecture seule",
          body: "Le point d'interrogation après un nom de propriété la rend optionnelle : elle peut être absente. Le mot-clé readonly interdit toute réaffectation après l'initialisation, protégeant les valeurs censées rester immuables. Ces modificateurs affinent le contrat sans le réécrire. Ils rendent l'intention explicite pour quiconque relit le code.",
          code: "interface Profil {\n  readonly id: number;\n  nom: string;\n  bio?: string; // optionnel\n}\n\nconst p: Profil = { id: 1, nom: \"Linus\" };\n// p.id = 2; // Erreur : readonly",
          lang: "ts"
        },
        {
          title: "Alias de type et différences avec interface",
          body: "Le mot-clé type crée un alias : un nom pour n'importe quel type, y compris primitifs, unions ou intersections. Une interface, elle, ne décrit que des formes d'objets mais peut être étendue et fusionnée. En pratique : interface pour les objets et les contrats publics, type pour les unions, tuples et compositions. Les deux se ressemblent pour décrire un objet, mais divergent dès qu'on sort de ce cas.",
          code: "type ID = number | string;\ntype Point = { x: number; y: number };\ntype Coord3D = Point & { z: number }; // intersection\n\nconst c: Coord3D = { x: 1, y: 2, z: 3 };",
          lang: "ts"
        },
        {
          title: "Étendre et composer",
          body: "Une interface peut hériter d'une autre via extends, accumulant les propriétés du parent. Les alias de type composent avec l'intersection &, qui fusionne plusieurs formes en une seule. Ces mécanismes évitent la duplication et modélisent les relations entre entités. On construit ainsi des hiérarchies de types lisibles et réutilisables.",
          code: "interface Animal { nom: string; }\ninterface Chien extends Animal { race: string; }\n\nconst rex: Chien = { nom: \"Rex\", race: \"Husky\" };",
          lang: "ts"
        }
      ]
    },
    {
      title: "Chapitre 3 — Génériques",
      lessons: [
        {
          title: "Pourquoi les génériques",
          body: "Un générique est un paramètre de type : une variable qui représente un type décidé au moment de l'usage. Il permet d'écrire du code réutilisable sans sacrifier la sécurité, contrairement à any qui efface toute vérification. La fonction conserve le lien entre l'entrée et la sortie. On note le paramètre entre chevrons, souvent T par convention.",
          code: "function identite<T>(valeur: T): T {\n  return valeur;\n}\n\nconst n = identite<number>(42); // T = number\nconst s = identite(\"texte\");    // T inféré = string",
          lang: "ts"
        },
        {
          title: "Génériques sur types et classes",
          body: "Interfaces, alias et classes acceptent aussi des paramètres de type. Cela permet de modéliser des conteneurs : une boîte, une liste, un dépôt valable pour n'importe quel contenu. Le type concret est fixé à l'instanciation ou à l'usage. On obtient des structures de données type-safe et entièrement réutilisables.",
          code: "interface Boite<T> {\n  contenu: T;\n}\n\nclass Pile<T> {\n  private items: T[] = [];\n  empiler(x: T) { this.items.push(x); }\n  depiler(): T | undefined { return this.items.pop(); }\n}",
          lang: "ts"
        },
        {
          title: "Contraintes avec extends",
          body: "Un générique non contraint accepte tout, donc on ne peut rien supposer de lui. Le mot-clé extends dans la déclaration impose une borne : T doit au moins respecter une forme donnée. On accède alors en toute sécurité aux propriétés garanties par cette contrainte. C'est l'équilibre entre flexibilité et exigences minimales.",
          code: "interface AvecLongueur { length: number; }\n\nfunction taille<T extends AvecLongueur>(x: T): number {\n  return x.length; // sûr : T garantit length\n}\n\ntaille(\"abc\");      // ok : string a length\ntaille([1, 2, 3]);  // ok : array a length",
          lang: "ts"
        }
      ]
    },
    {
      title: "Chapitre 4 — Types avancés : unions & narrowing",
      lessons: [
        {
          title: "Types union",
          body: "Une union, écrite avec la barre verticale, autorise plusieurs types pour une même valeur. La variable est alors soit l'un, soit l'autre, mais jamais les deux simultanément. Tant que TypeScript ne sait pas lequel, il ne permet que les opérations communes à tous les membres. C'est la base pour modéliser des états variés sans perdre la sécurité.",
          code: "type Resultat = number | string;\n\nfunction afficher(r: Resultat) {\n  console.log(r); // ok : commun aux deux\n  // r.toUpperCase(); // Erreur : number n'a pas toUpperCase\n}",
          lang: "ts"
        },
        {
          title: "Narrowing : réduire le type",
          body: "Le narrowing consiste à restreindre une union au fur et à mesure des vérifications. À l'intérieur d'un bloc typeof === \"string\", TypeScript sait que la valeur est une chaîne et débloque ses méthodes. Les conditions if, typeof, instanceof et la comparaison agissent comme des gardes. Le compilateur suit le flot de contrôle pour affiner le type ligne après ligne.",
          code: "function longueur(x: string | number): number {\n  if (typeof x === \"string\") {\n    return x.length;   // ici x est string\n  }\n  return x.toString().length; // ici x est number\n}",
          lang: "ts"
        },
        {
          title: "Unions discriminées",
          body: "Une union discriminée regroupe plusieurs objets partageant une propriété littérale commune, souvent nommée type ou kind. Tester cette propriété narrow automatiquement vers la bonne variante et expose ses champs spécifiques. C'est le motif idéal pour modéliser des événements, des actions ou des états d'une machine. Associé à un switch, il rend les cas exhaustifs et lisibles.",
          code: "type Forme =\n  | { kind: \"cercle\"; rayon: number }\n  | { kind: \"carre\"; cote: number };\n\nfunction aire(f: Forme): number {\n  switch (f.kind) {\n    case \"cercle\": return Math.PI * f.rayon ** 2;\n    case \"carre\":  return f.cote ** 2;\n  }\n}",
          lang: "ts"
        }
      ]
    },
    {
      title: "Chapitre 5 — Utility types",
      lessons: [
        {
          title: "Partial, Required, Readonly",
          body: "Les utility types transforment un type existant sans le réécrire. Partial rend toutes les propriétés optionnelles, parfait pour une mise à jour partielle. Required fait l'inverse en les rendant toutes obligatoires. Readonly verrouille l'ensemble en lecture seule. Ces outils dérivent des variantes d'un type source et gardent les définitions synchronisées.",
          code: "interface User { id: number; nom: string; bio?: string; }\n\ntype Brouillon = Partial<User>;   // tout optionnel\ntype Complet = Required<User>;    // tout obligatoire\ntype Fige = Readonly<User>;       // tout en lecture seule",
          lang: "ts"
        },
        {
          title: "Pick, Omit, Record",
          body: "Pick extrait un sous-ensemble de propriétés en les nommant explicitement. Omit fait le contraire : il retire celles qu'on exclut et garde le reste. Record construit un type objet dont les clés et les valeurs suivent un schéma uniforme. Ensemble, ils sculptent de nouveaux types à partir de l'existant, sans duplication ni dérive.",
          code: "interface User { id: number; nom: string; email: string; }\n\ntype Apercu = Pick<User, \"id\" | \"nom\">;\ntype Anonyme = Omit<User, \"email\">;\ntype Annuaire = Record<string, User>;",
          lang: "ts"
        },
        {
          title: "Extraire depuis fonctions et unions",
          body: "ReturnType récupère le type de retour d'une fonction, Parameters récupère ses arguments sous forme de tuple. Côté unions, Exclude retire certains membres et Extract ne garde que ceux qui correspondent. NonNullable supprime null et undefined. Ces outils évitent de recopier à la main des types qui découlent logiquement d'autres déclarations.",
          code: "function creer(nom: string, age: number) {\n  return { nom, age };\n}\n\ntype Retour = ReturnType<typeof creer>; // { nom: string; age: number }\ntype Args = Parameters<typeof creer>;   // [string, number]\ntype Sans = Exclude<\"a\" | \"b\" | \"c\", \"b\">; // \"a\" | \"c\"",
          lang: "ts"
        }
      ]
    },
    {
      title: "Chapitre 6 — Configuration & intégration",
      lessons: [
        {
          title: "Le fichier tsconfig.json",
          body: "Le fichier tsconfig.json pilote le compilateur tsc : version cible, format de modules, dossier de sortie et règles de vérification. Le bloc compilerOptions concentre l'essentiel des réglages. Le champ include délimite les fichiers à compiler. Un projet TypeScript sérieux commence toujours par un tsconfig réfléchi plutôt que par les valeurs par défaut.",
          code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"module\": \"ESNext\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\"\n  },\n  \"include\": [\"src/**/*\"]\n}",
          lang: "ts"
        },
        {
          title: "Le mode strict",
          body: "L'option strict active d'un coup un ensemble de vérifications rigoureuses, dont strictNullChecks et noImplicitAny. Avec elle, null et undefined ne se faufilent plus silencieusement et tout any implicite devient une erreur. C'est l'investissement le plus rentable pour la qualité d'un projet. Activez-la dès le premier jour : la rétro-adapter sur un gros code est douloureux.",
          code: "{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noImplicitReturns\": true\n  }\n}",
          lang: "ts"
        },
        {
          title: "Compiler et intégrer",
          body: "La commande tsc transpile le TypeScript en JavaScript exécutable par les navigateurs et Node. Le mode --watch recompile à chaque sauvegarde pendant le développement. En pratique, des outils comme Vite, esbuild ou ts-node intègrent cette étape de façon transparente. TypeScript ne s'exécute jamais directement : il produit du JavaScript propre, puis disparaît.",
          code: "// Ligne de commande\n// tsc            -> compile selon tsconfig.json\n// tsc --watch    -> recompile à chaque modification\n// tsc index.ts   -> compile un seul fichier",
          lang: "ts"
        }
      ]
    }
  ],

  reference: [
    {
      group: "Types primitifs",
      items: [
        { name: "number", syntax: "let x: number", desc: "Tous les nombres : entiers, flottants, hexadécimaux et binaires, sans distinction." },
        { name: "string", syntax: "let s: string", desc: "Chaîne de caractères, compatible avec les littéraux gabarits backtick." },
        { name: "boolean", syntax: "let b: boolean", desc: "Valeur logique limitée à true ou false." },
        { name: "bigint", syntax: "let n: bigint", desc: "Entiers de précision arbitraire, notés avec le suffixe n." },
        { name: "symbol", syntax: "let s: symbol", desc: "Identifiant unique et immuable, souvent utilisé comme clé de propriété." },
        { name: "null", syntax: "let x: null", desc: "Absence intentionnelle de valeur ; isolé sous strictNullChecks." },
        { name: "undefined", syntax: "let x: undefined", desc: "Valeur non initialisée ou propriété manquante." },
        { name: "Littéral", syntax: "let x: \"on\" | \"off\"", desc: "Type restreint à une valeur exacte, base des unions discriminées." }
      ]
    },
    {
      group: "Types composés (array, tuple, object)",
      items: [
        { name: "Array<T>", syntax: "let a: number[]", desc: "Liste homogène d'éléments du même type, notée T[] ou Array<T>." },
        { name: "Tuple", syntax: "let t: [string, number]", desc: "Tableau de longueur fixe où chaque position a son propre type." },
        { name: "Tuple nommé", syntax: "[x: number, y: number]", desc: "Tuple dont chaque position porte une étiquette documentaire." },
        { name: "Rest tuple", syntax: "[string, ...number[]]", desc: "Tuple combinant des positions fixes et une fin de longueur variable." },
        { name: "object", syntax: "let o: { x: number }", desc: "Type structurel décrivant les propriétés attendues d'un objet." },
        { name: "Index signature", syntax: "{ [k: string]: number }", desc: "Décrit un objet aux clés dynamiques partageant un type de valeur." },
        { name: "Fonction", syntax: "(a: number) => string", desc: "Type d'une fonction : signature des paramètres et type de retour." },
        { name: "ReadonlyArray<T>", syntax: "ReadonlyArray<number>", desc: "Tableau immuable interdisant push, pop et toute mutation." }
      ]
    },
    {
      group: "Types spéciaux (any, unknown, never, void)",
      items: [
        { name: "any", syntax: "let x: any", desc: "Désactive toute vérification : à éviter, c'est une porte ouverte aux bugs." },
        { name: "unknown", syntax: "let x: unknown", desc: "Alternative sûre à any : impose un narrowing avant tout usage." },
        { name: "never", syntax: "function f(): never", desc: "Type des valeurs impossibles : fonctions qui lancent ou bouclent à l'infini." },
        { name: "void", syntax: "function f(): void", desc: "Indique qu'une fonction ne retourne aucune valeur exploitable." },
        { name: "null/undefined", syntax: "string | null", desc: "Combinés en union pour modéliser explicitement l'absence." },
        { name: "object", syntax: "let o: object", desc: "Toute valeur non primitive ; trop large pour un usage précis." }
      ]
    },
    {
      group: "Interfaces & alias de type",
      items: [
        { name: "interface", syntax: "interface User { id: number }", desc: "Décrit la forme d'un objet ; extensible et fusionnable." },
        { name: "type", syntax: "type ID = number | string", desc: "Alias nommant n'importe quel type, y compris unions et tuples." },
        { name: "extends", syntax: "interface A extends B {}", desc: "Hérite des membres d'une autre interface." },
        { name: "Intersection", syntax: "type C = A & B", desc: "Fusionne plusieurs types en exigeant toutes leurs propriétés." },
        { name: "Union", syntax: "type R = A | B", desc: "Autorise l'un parmi plusieurs types pour une même valeur." },
        { name: "implements", syntax: "class C implements I {}", desc: "Force une classe à respecter le contrat d'une interface." },
        { name: "Déclaration fusionnée", syntax: "interface X {} interface X {}", desc: "Deux interfaces de même nom fusionnent leurs membres automatiquement." }
      ]
    },
    {
      group: "Génériques",
      items: [
        { name: "<T>", syntax: "function f<T>(x: T): T", desc: "Paramètre de type décidé au moment de l'appel." },
        { name: "extends (contrainte)", syntax: "<T extends Base>", desc: "Borne le générique : T doit respecter au moins cette forme." },
        { name: "Valeur par défaut", syntax: "<T = string>", desc: "Type utilisé si aucun argument de type n'est fourni." },
        { name: "keyof", syntax: "type K = keyof T", desc: "Union des noms de propriétés d'un type donné." },
        { name: "Type indexé", syntax: "T[K]", desc: "Accède au type d'une propriété par sa clé." },
        { name: "Type mappé", syntax: "{ [K in keyof T]: T[K] }", desc: "Construit un type en itérant sur les clés d'un autre." },
        { name: "Type conditionnel", syntax: "T extends U ? X : Y", desc: "Choisit un type selon qu'une condition de sous-typage est vraie." },
        { name: "infer", syntax: "T extends Array<infer E> ? E", desc: "Capture un sous-type à l'intérieur d'un type conditionnel." }
      ]
    },
    {
      group: "Utility types (Partial, Pick, Omit, Record...)",
      items: [
        { name: "Partial<T>", syntax: "Partial<User>", desc: "Rend toutes les propriétés optionnelles." },
        { name: "Required<T>", syntax: "Required<User>", desc: "Rend toutes les propriétés obligatoires." },
        { name: "Readonly<T>", syntax: "Readonly<User>", desc: "Verrouille toutes les propriétés en lecture seule." },
        { name: "Pick<T, K>", syntax: "Pick<User, \"id\">", desc: "Conserve uniquement les propriétés nommées." },
        { name: "Omit<T, K>", syntax: "Omit<User, \"email\">", desc: "Retire les propriétés nommées et garde le reste." },
        { name: "Record<K, V>", syntax: "Record<string, number>", desc: "Construit un objet aux clés K et valeurs V uniformes." },
        { name: "Exclude<T, U>", syntax: "Exclude<\"a\"|\"b\", \"b\">", desc: "Retire d'une union les membres assignables à U." },
        { name: "Extract<T, U>", syntax: "Extract<\"a\"|\"b\", \"a\">", desc: "Ne garde que les membres d'union assignables à U." },
        { name: "NonNullable<T>", syntax: "NonNullable<T>", desc: "Supprime null et undefined d'un type." },
        { name: "ReturnType<F>", syntax: "ReturnType<typeof f>", desc: "Extrait le type de retour d'une fonction." },
        { name: "Parameters<F>", syntax: "Parameters<typeof f>", desc: "Extrait les types des paramètres sous forme de tuple." },
        { name: "Awaited<T>", syntax: "Awaited<Promise<number>>", desc: "Déballe récursivement le type résolu d'une promesse." }
      ]
    },
    {
      group: "Narrowing & gardes de type",
      items: [
        { name: "typeof", syntax: "if (typeof x === \"string\")", desc: "Restreint vers un type primitif selon la vérification runtime." },
        { name: "instanceof", syntax: "if (x instanceof Date)", desc: "Restreint vers une classe en testant la chaîne de prototypes." },
        { name: "in", syntax: "if (\"nom\" in obj)", desc: "Restreint une union selon la présence d'une propriété." },
        { name: "Garde personnalisée", syntax: "x is Chien", desc: "Prédicat de type retourné par une fonction de garde." },
        { name: "Égalité littérale", syntax: "if (x.kind === \"a\")", desc: "Discrimine une union sur une propriété littérale commune." },
        { name: "Assertion non-null", syntax: "x!.length", desc: "Affirme au compilateur que la valeur n'est ni null ni undefined." },
        { name: "as", syntax: "x as string", desc: "Assertion de type forçant une conversion sans vérification runtime." },
        { name: "satisfies", syntax: "x satisfies User", desc: "Vérifie la compatibilité d'une valeur sans en élargir le type inféré." }
      ]
    },
    {
      group: "Enums",
      items: [
        { name: "enum numérique", syntax: "enum Dir { Haut, Bas }", desc: "Membres auto-incrémentés à partir de zéro par défaut." },
        { name: "enum initialisé", syntax: "enum E { A = 1, B = 2 }", desc: "Valeurs numériques explicitement définies." },
        { name: "enum string", syntax: "enum E { A = \"a\" }", desc: "Membres associés à des chaînes lisibles et stables." },
        { name: "const enum", syntax: "const enum E { A }", desc: "Enum inliné à la compilation, sans objet généré à l'exécution." },
        { name: "enum hétérogène", syntax: "enum E { A = 1, B = \"b\" }", desc: "Mélange de valeurs numériques et textuelles, déconseillé." },
        { name: "Union littérale", syntax: "type T = \"a\" | \"b\"", desc: "Alternative légère à un enum, sans code émis." }
      ]
    },
    {
      group: "Modificateurs (readonly, optional, as const)",
      items: [
        { name: "readonly", syntax: "readonly id: number", desc: "Interdit la réaffectation d'une propriété après initialisation." },
        { name: "optionnel ?", syntax: "bio?: string", desc: "Rend une propriété ou un paramètre facultatif." },
        { name: "as const", syntax: "let x = [1, 2] as const", desc: "Fige une valeur en type littéral readonly le plus étroit possible." },
        { name: "public", syntax: "public nom: string", desc: "Visibilité par défaut d'un membre de classe, accessible partout." },
        { name: "private", syntax: "private secret: string", desc: "Membre accessible uniquement à l'intérieur de la classe." },
        { name: "protected", syntax: "protected x: number", desc: "Membre accessible dans la classe et ses sous-classes." },
        { name: "static", syntax: "static compteur = 0", desc: "Membre attaché à la classe elle-même, pas aux instances." },
        { name: "abstract", syntax: "abstract class Base {}", desc: "Classe ou membre non instanciable devant être implémenté ailleurs." }
      ]
    },
    {
      group: "Options tsconfig essentielles",
      items: [
        { name: "target", syntax: "\"target\": \"ES2020\"", desc: "Version de JavaScript générée par le compilateur." },
        { name: "module", syntax: "\"module\": \"ESNext\"", desc: "Format des modules émis : CommonJS, ESNext, etc." },
        { name: "strict", syntax: "\"strict\": true", desc: "Active l'ensemble des vérifications strictes d'un coup." },
        { name: "strictNullChecks", syntax: "\"strictNullChecks\": true", desc: "Sépare null et undefined des autres types." },
        { name: "noImplicitAny", syntax: "\"noImplicitAny\": true", desc: "Interdit les any implicites non annotés." },
        { name: "outDir", syntax: "\"outDir\": \"./dist\"", desc: "Dossier de destination des fichiers JavaScript compilés." },
        { name: "rootDir", syntax: "\"rootDir\": \"./src\"", desc: "Dossier racine des sources TypeScript." },
        { name: "esModuleInterop", syntax: "\"esModuleInterop\": true", desc: "Facilite l'import de modules CommonJS depuis des modules ES." },
        { name: "sourceMap", syntax: "\"sourceMap\": true", desc: "Génère des fichiers de correspondance pour le débogage." },
        { name: "declaration", syntax: "\"declaration\": true", desc: "Émet des fichiers .d.ts décrivant les types publics." }
      ]
    }
  ]
});
