/* ============================================================
   CODEX — Extension : JavaScript
   Cours progressif + Référence exhaustive
   Greffé sur la fiche déjà enregistrée via CODEX.extend(...)
   ============================================================ */
CODEX.extend('javascript', {
  course: [
    {
      title: 'Chapitre 1 — Variables & types',
      lessons: [
        {
          title: 'Déclarer une valeur : let, const, var',
          body: "En JavaScript moderne, on déclare avec const quand la liaison ne changera pas, et avec let quand elle évoluera. Le mot-clé var est l'héritage des débuts : sa portée est la fonction entière, ce qui provoque des surprises, alors que let et const sont limités au bloc { }. Une bonne hygiène consiste à choisir const par défaut et à ne passer à let que si une réaffectation est nécessaire. Réserver var aux vieux scripts vous évitera des bugs de portée difficiles à traquer.",
          code: "const pi = 3.14159;\nlet compteur = 0;\ncompteur = compteur + 1; // autorise\n// pi = 4; // TypeError : assignment to constant",
          lang: 'js'
        },
        {
          title: 'Les types primitifs',
          body: "JavaScript distingue sept types primitifs : string, number, boolean, null, undefined, symbol et bigint. Un primitif est immuable et copié par valeur : modifier une copie ne touche jamais l'original. L'opérateur typeof révèle le type d'une valeur, avec la fameuse bizarrerie typeof null qui renvoie object pour des raisons historiques. Comprendre ces types est la fondation : presque chaque bug de débutant vient d'une confusion entre une chaîne \"42\" et le nombre 42.",
          code: "typeof \"texte\";   // \"string\"\ntypeof 42;        // \"number\"\ntypeof true;      // \"boolean\"\ntypeof undefined; // \"undefined\"\ntypeof null;      // \"object\" (bug historique)",
          lang: 'js'
        },
        {
          title: 'Conversion et coercition',
          body: "JavaScript convertit volontiers les types pour vous, ce qui est pratique mais piégeux. La coercition implicite transforme par exemple un nombre en chaîne lors d'une concaténation avec +, tandis que - force toujours un calcul numérique. Pour rester maître du jeu, préférez les conversions explicites avec Number(), String() ou Boolean(). Retenez aussi la notion de valeurs falsy : 0, \"\", null, undefined, NaN et false s'évaluent à faux dans une condition.",
          code: "\"3\" + 1;        // \"31\" (concaténation)\n\"3\" - 1;        // 2 (soustraction numérique)\nNumber(\"42\");    // 42\nBoolean(\"\");     // false\nBoolean(\"a\");    // true",
          lang: 'js'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Fonctions, portée & closures',
      lessons: [
        {
          title: 'Déclarer et appeler une fonction',
          body: "Une fonction encapsule un morceau de logique réutilisable et peut recevoir des paramètres puis renvoyer une valeur avec return. La déclaration function est hoistée, c'est-à-dire utilisable avant sa définition dans le code. L'expression de fonction, stockée dans une variable, n'est disponible qu'après son affectation. Maîtriser ces deux formes vous aide à structurer un programme en briques nettes et testables.",
          code: "function additionner(a, b) {\n  return a + b;\n}\nconst soustraire = function (a, b) {\n  return a - b;\n};\nadditionner(2, 3); // 5",
          lang: 'js'
        },
        {
          title: 'Les fonctions fléchées',
          body: "La syntaxe fléchée => offre une écriture concise, idéale pour les petites fonctions passées en argument. Contrairement aux fonctions classiques, une fonction fléchée ne possède pas son propre this : elle hérite de celui du contexte englobant, ce qui élimine une grande source de bugs dans les callbacks. Quand le corps tient en une seule expression, on peut omettre les accolades et le return implicite renvoie le résultat. C'est l'outil de prédilection pour map, filter et les gestionnaires courts.",
          code: "const doubler = (x) => x * 2;\nconst saluer = (nom) => `Bonjour ${nom}`;\nconst paire = () => ({ x: 1, y: 2 });\ndoubler(5); // 10",
          lang: 'js'
        },
        {
          title: 'Portée et fermetures (closures)',
          body: "La portée détermine où une variable est visible : chaque fonction crée son propre périmètre et peut lire les variables de ses parents. Une fermeture, ou closure, naît lorsqu'une fonction interne capture et conserve l'accès aux variables de sa fonction externe, même après que celle-ci a terminé. Ce mécanisme permet de créer des données privées et des compteurs persistants sans variable globale. Les closures sont au cœur des patterns avancés en JavaScript, des modules aux gestionnaires d'état.",
          code: "function compteur() {\n  let n = 0;\n  return function () {\n    n += 1;\n    return n;\n  };\n}\nconst suivant = compteur();\nsuivant(); // 1\nsuivant(); // 2",
          lang: 'js'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Objets & prototypes',
      lessons: [
        {
          title: 'Créer et manipuler un objet',
          body: "Un objet regroupe des données sous forme de paires clé-valeur, accessibles par la notation point ou crochets. On peut ajouter, modifier ou supprimer des propriétés dynamiquement, ce qui rend les objets très souples. La déstructuration extrait élégamment plusieurs propriétés en une ligne, et l'opérateur de décomposition ... copie ou fusionne des objets. Ces structures sont le pain quotidien de tout développeur JavaScript.",
          code: "const user = { nom: \"Ada\", age: 36 };\nuser.email = \"ada@codex.dev\";\nconst { nom, age } = user;\nconst copie = { ...user, actif: true };",
          lang: 'js'
        },
        {
          title: 'this et les méthodes',
          body: "Lorsqu'une fonction est rangée dans un objet, on l'appelle une méthode, et le mot-clé this y désigne l'objet sur lequel la méthode est invoquée. La valeur de this dépend de la façon dont la fonction est appelée, pas de l'endroit où elle est définie, ce qui déroute souvent les débutants. Les méthodes call, apply et bind permettent de fixer explicitement this. Éviter les fonctions fléchées comme méthodes d'objet est une règle utile, car elles ne lient pas this comme on l'attendrait.",
          code: "const compte = {\n  solde: 100,\n  retirer(montant) {\n    this.solde -= montant;\n    return this.solde;\n  }\n};\ncompte.retirer(30); // 70",
          lang: 'js'
        },
        {
          title: 'Prototypes et classes',
          body: "Chaque objet JavaScript possède un prototype, un autre objet dont il hérite les propriétés et méthodes via la chaîne de prototypes. La syntaxe class, introduite en ES6, est un sucre lisible par-dessus ce système de prototypes : elle ne change rien au moteur sous-jacent. Une classe définit un constructor pour initialiser les instances et des méthodes partagées par toutes. Comprendre que l'héritage repose sur des prototypes vous évite de croire à une vraie programmation orientée objet à la Java.",
          code: "class Animal {\n  constructor(nom) {\n    this.nom = nom;\n  }\n  crier() {\n    return `${this.nom} fait du bruit`;\n  }\n}\nconst chat = new Animal(\"Felix\");\nchat.crier();",
          lang: 'js'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Tableaux & itération',
      lessons: [
        {
          title: 'Créer et parcourir un tableau',
          body: "Un tableau est une liste ordonnée et indexée à partir de zéro, capable de contenir des valeurs de types variés. On y accède par index, on connaît sa taille via length, et on l'allonge avec push ou on le réduit avec pop. La boucle for...of parcourt directement les valeurs, plus lisible qu'un for classique à compteur. Le tableau est la structure de collection la plus utilisée, fondation de presque tout traitement de données.",
          code: "const fruits = [\"pomme\", \"kiwi\"];\nfruits.push(\"mangue\");\nfor (const f of fruits) {\n  console.log(f);\n}\nfruits.length; // 3",
          lang: 'js'
        },
        {
          title: 'Les méthodes fonctionnelles',
          body: "Plutôt que des boucles manuelles, JavaScript offre des méthodes déclaratives qui décrivent l'intention. map transforme chaque élément en un nouveau tableau, filter conserve ceux qui passent un test, et reduce condense la collection en une seule valeur. Ces méthodes sont immuables : elles renvoient un nouveau tableau sans modifier l'original, ce qui réduit les effets de bord. Les chaîner permet d'exprimer des traitements complexes de manière fluide et lisible.",
          code: "const nombres = [1, 2, 3, 4];\nconst pairs = nombres.filter((n) => n % 2 === 0);\nconst doubles = nombres.map((n) => n * 2);\nconst somme = nombres.reduce((acc, n) => acc + n, 0);",
          lang: 'js'
        },
        {
          title: 'Trier, chercher et aplatir',
          body: "La méthode sort réordonne un tableau sur place et attend une fonction de comparaison pour trier des nombres correctement, sans quoi elle compare comme des chaînes. find renvoie le premier élément correspondant, tandis que includes répond simplement par vrai ou faux à une présence. flat aplatit les tableaux imbriqués sur le niveau demandé. Connaître la bonne méthode pour chaque besoin rend votre code plus court et plus expressif.",
          code: "const n = [10, 2, 30];\nn.sort((a, b) => a - b); // [2, 10, 30]\nn.find((x) => x > 5);    // 10\nn.includes(2);           // true\n[1, [2, [3]]].flat(2);   // [1, 2, 3]",
          lang: 'js'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Asynchrone : promesses & async/await',
      lessons: [
        {
          title: 'Le modèle asynchrone',
          body: "JavaScript s'exécute sur un seul thread, mais reste réactif grâce à une boucle d'événements qui orchestre les tâches différées. Les opérations lentes comme une requête réseau ne bloquent pas le programme : elles s'effectuent en arrière-plan et signalent leur fin plus tard. Historiquement, on traitait ce résultat via des callbacks, vite enchevêtrés en pyramide illisible. Comprendre ce modèle non bloquant est essentiel avant d'aborder les promesses qui le domestiquent.",
          code: "console.log(\"1\");\nsetTimeout(() => console.log(\"3\"), 0);\nconsole.log(\"2\");\n// Ordre affiché : 1, 2, 3",
          lang: 'js'
        },
        {
          title: 'Les promesses',
          body: "Une promesse représente une valeur future, encore inconnue au moment où le code s'exécute. Elle passe d'un état pending à fulfilled en cas de succès ou rejected en cas d'erreur, et l'on réagit avec then et catch. Cette structure remplace les callbacks imbriqués par une chaîne linéaire et lisible. Les promesses sont composables : Promise.all attend plusieurs tâches en parallèle, ce qui accélère nettement les traitements indépendants.",
          code: "fetch(\"/api/users\")\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error(err));",
          lang: 'js'
        },
        {
          title: 'async / await',
          body: "Le couple async/await offre une écriture séquentielle du code asynchrone, qui se lit comme du code synchrone. Une fonction marquée async renvoie toujours une promesse, et le mot-clé await met l'exécution en pause jusqu'à ce que la promesse soit résolue. La gestion d'erreur retrouve sa forme familière grâce à try/catch, plus naturelle que les chaînes de catch. C'est aujourd'hui la manière recommandée d'écrire de l'asynchrone moderne, claire et maintenable.",
          code: "async function charger() {\n  try {\n    const res = await fetch(\"/api/users\");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}",
          lang: 'js'
        }
      ]
    },
    {
      title: 'Chapitre 6 — DOM & événements',
      lessons: [
        {
          title: 'Sélectionner et modifier le DOM',
          body: "Le DOM est la représentation arborescente d'une page que JavaScript peut lire et modifier en direct. On cible un élément avec querySelector pour le premier correspondant ou querySelectorAll pour tous, en utilisant la syntaxe des sélecteurs CSS. Une fois l'élément récupéré, on change son contenu via textContent, son HTML via innerHTML, ou son apparence via la propriété classList. Manipuler le DOM est ce qui rend une page interactive plutôt que statique.",
          code: "const titre = document.querySelector(\"h1\");\ntitre.textContent = \"Bonjour Codex\";\ntitre.classList.add(\"actif\");\nconst items = document.querySelectorAll(\".item\");",
          lang: 'js'
        },
        {
          title: 'Écouter les événements',
          body: "Une interface réagit aux actions de l'utilisateur grâce aux événements : clic, saisie, survol ou soumission de formulaire. La méthode addEventListener attache une fonction de rappel déclenchée à chaque occurrence de l'événement choisi. L'objet event transmis décrit l'interaction et permet, via preventDefault, d'annuler le comportement par défaut comme le rechargement d'un formulaire. La délégation d'événements, qui écoute sur un parent commun, est un pattern efficace pour gérer de nombreux éléments.",
          code: "const bouton = document.querySelector(\"#valider\");\nbouton.addEventListener(\"click\", (event) => {\n  event.preventDefault();\n  console.log(\"Cliqué !\");\n});",
          lang: 'js'
        },
        {
          title: 'Créer et insérer des éléments',
          body: "Au-delà de modifier l'existant, JavaScript peut fabriquer de nouveaux nœuds avec createElement puis les greffer dans la page via appendChild ou append. On configure d'abord l'élément en mémoire, ses attributs et son contenu, avant de l'insérer pour limiter les recalculs coûteux du navigateur. La méthode remove détache un nœud, tandis que les fragments de document permettent d'ajouter plusieurs éléments d'un coup. Maîtriser cette construction dynamique est la base du rendu d'interfaces générées par les données.",
          code: "const li = document.createElement(\"li\");\nli.textContent = \"Nouvel élément\";\nli.classList.add(\"item\");\ndocument.querySelector(\"ul\").append(li);",
          lang: 'js'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Mots-clés & déclarations',
      items: [
        { name: 'const', syntax: 'const x = valeur;', desc: "Déclare une liaison de portée bloc qui ne peut être réaffectée." },
        { name: 'let', syntax: 'let x = valeur;', desc: "Déclare une variable de portée bloc, réaffectable." },
        { name: 'var', syntax: 'var x = valeur;', desc: "Déclaration historique de portée fonction, hoistée ; à éviter." },
        { name: 'function', syntax: 'function nom() {}', desc: "Déclare une fonction nommée, hoistée et réutilisable." },
        { name: 'class', syntax: 'class Nom {}', desc: "Définit une classe, sucre syntaxique au-dessus des prototypes." },
        { name: 'return', syntax: 'return valeur;', desc: "Renvoie une valeur et termine l'exécution de la fonction." },
        { name: 'new', syntax: 'new Constructeur()', desc: "Instancie un objet à partir d'un constructeur ou d'une classe." },
        { name: 'this', syntax: 'this.propriete', desc: "Référence le contexte d'appel courant de la fonction." },
        { name: 'typeof', syntax: 'typeof valeur', desc: "Renvoie une chaîne décrivant le type d'une valeur." },
        { name: 'instanceof', syntax: 'obj instanceof Classe', desc: "Teste si un objet dérive d'un constructeur dans sa chaîne." }
      ]
    },
    {
      group: 'Types & valeurs',
      items: [
        { name: 'string', syntax: '\"texte\" ou `gabarit`', desc: "Chaîne de caractères immuable, en guillemets ou en littéraux de gabarit." },
        { name: 'number', syntax: '42, 3.14, 1e3', desc: "Nombre à virgule flottante double précision, entiers compris." },
        { name: 'boolean', syntax: 'true / false', desc: "Valeur logique vraie ou fausse." },
        { name: 'null', syntax: 'null', desc: "Absence intentionnelle de valeur d'objet." },
        { name: 'undefined', syntax: 'undefined', desc: "Valeur d'une variable déclarée mais non initialisée." },
        { name: 'bigint', syntax: '9007199254740993n', desc: "Entier de précision arbitraire, suffixé par n." },
        { name: 'symbol', syntax: 'Symbol(\"id\")', desc: "Identifiant unique et immuable, souvent clé d'objet privée." },
        { name: 'NaN', syntax: 'Number.isNaN(x)', desc: "Valeur Not-a-Number issue d'un calcul numérique invalide." },
        { name: 'Infinity', syntax: '1 / 0', desc: "Représente l'infini numérique, positif ou négatif." }
      ]
    },
    {
      group: 'Opérateurs',
      items: [
        { name: '===', syntax: 'a === b', desc: "Égalité stricte, sans coercition de type ; à privilégier." },
        { name: '==', syntax: 'a == b', desc: "Égalité avec coercition de type ; source de pièges." },
        { name: '&& ||', syntax: 'a && b, a || b', desc: "ET et OU logiques, évalués en court-circuit." },
        { name: '??', syntax: 'a ?? b', desc: "Coalescence des nuls : renvoie b si a est null ou undefined." },
        { name: '?.', syntax: 'obj?.prop', desc: "Chaînage optionnel : court-circuite si le maillon est nul." },
        { name: '...', syntax: '...iterable', desc: "Décomposition (spread) ou collecte (rest) d'éléments." },
        { name: '? :', syntax: 'cond ? a : b', desc: "Opérateur ternaire, expression conditionnelle compacte." },
        { name: '+= -= *=', syntax: 'x += 1', desc: "Affectations composées combinant opération et assignation." },
        { name: '% **', syntax: 'a % b, a ** b', desc: "Modulo (reste) et exponentiation (puissance)." },
        { name: '+', syntax: 'a + b', desc: "Addition numérique ou concaténation de chaînes." }
      ]
    },
    {
      group: 'Structures de contrôle',
      items: [
        { name: 'if / else', syntax: 'if (cond) {} else {}', desc: "Exécute un bloc selon qu'une condition est vraie ou fausse." },
        { name: 'switch', syntax: 'switch (x) { case a: }', desc: "Branche vers un cas correspondant à une valeur." },
        { name: 'for', syntax: 'for (let i=0; i<n; i++) {}', desc: "Boucle classique à compteur d'index." },
        { name: 'for...of', syntax: 'for (const v of iter) {}', desc: "Itère sur les valeurs d'un objet itérable." },
        { name: 'for...in', syntax: 'for (const k in obj) {}', desc: "Itère sur les clés énumérables d'un objet." },
        { name: 'while', syntax: 'while (cond) {}', desc: "Répète un bloc tant que la condition reste vraie." },
        { name: 'do...while', syntax: 'do {} while (cond)', desc: "Boucle exécutée au moins une fois avant de tester." },
        { name: 'break / continue', syntax: 'break; continue;', desc: "Interrompt la boucle ou saute à l'itération suivante." },
        { name: 'try...catch', syntax: 'try {} catch (e) {}', desc: "Capture et gère les erreurs levées dans un bloc." },
        { name: 'throw', syntax: 'throw new Error(\"...\")', desc: "Lève une exception interrompant le flux normal." }
      ]
    },
    {
      group: 'Fonctions',
      items: [
        { name: 'Fonction fléchée', syntax: '(a) => a * 2', desc: "Syntaxe concise sans this propre, idéale en callback." },
        { name: 'Paramètre par défaut', syntax: 'function f(x = 1) {}', desc: "Fournit une valeur si l'argument est omis ou undefined." },
        { name: 'Paramètre rest', syntax: 'function f(...args) {}', desc: "Collecte les arguments restants dans un tableau." },
        { name: 'call()', syntax: 'fn.call(ctx, a, b)', desc: "Invoque une fonction en fixant this et des arguments." },
        { name: 'apply()', syntax: 'fn.apply(ctx, [a, b])', desc: "Comme call mais reçoit les arguments en tableau." },
        { name: 'bind()', syntax: 'fn.bind(ctx)', desc: "Renvoie une copie de la fonction avec this fixé." },
        { name: 'IIFE', syntax: '(function () {})()', desc: "Expression de fonction immédiatement invoquée, isole une portée." },
        { name: 'Générateur', syntax: 'function* g() { yield 1; }', desc: "Fonction produisant des valeurs à la demande via yield." },
        { name: 'async', syntax: 'async function f() {}', desc: "Déclare une fonction renvoyant toujours une promesse." }
      ]
    },
    {
      group: 'Méthodes de tableau',
      items: [
        { name: 'map()', syntax: 'arr.map(fn)', desc: "Renvoie un nouveau tableau en transformant chaque élément." },
        { name: 'filter()', syntax: 'arr.filter(fn)', desc: "Renvoie les éléments qui satisfont le test fourni." },
        { name: 'reduce()', syntax: 'arr.reduce(fn, init)', desc: "Réduit le tableau à une seule valeur accumulée." },
        { name: 'forEach()', syntax: 'arr.forEach(fn)', desc: "Exécute une fonction pour chaque élément, sans retour." },
        { name: 'find()', syntax: 'arr.find(fn)', desc: "Renvoie le premier élément satisfaisant le test." },
        { name: 'some() / every()', syntax: 'arr.some(fn)', desc: "Teste si au moins un, ou si tous, satisfont la condition." },
        { name: 'includes()', syntax: 'arr.includes(v)', desc: "Indique si le tableau contient une valeur donnée." },
        { name: 'push() / pop()', syntax: 'arr.push(v)', desc: "Ajoute ou retire un élément en fin de tableau." },
        { name: 'slice()', syntax: 'arr.slice(a, b)', desc: "Renvoie une copie d'une portion sans modifier l'original." },
        { name: 'splice()', syntax: 'arr.splice(i, n, ...)', desc: "Ajoute ou supprime des éléments en place." },
        { name: 'sort()', syntax: 'arr.sort(fn)', desc: "Trie le tableau en place selon une fonction de comparaison." },
        { name: 'join()', syntax: 'arr.join(sep)', desc: "Concatène les éléments en une chaîne séparée." }
      ]
    },
    {
      group: 'Méthodes de chaîne',
      items: [
        { name: 'length', syntax: 'str.length', desc: "Propriété donnant le nombre de caractères de la chaîne." },
        { name: 'slice()', syntax: 'str.slice(a, b)', desc: "Extrait une sous-chaîne entre deux indices." },
        { name: 'split()', syntax: 'str.split(sep)', desc: "Découpe la chaîne en un tableau selon un séparateur." },
        { name: 'replace()', syntax: 'str.replace(a, b)', desc: "Remplace une occurrence ou un motif par un autre texte." },
        { name: 'toUpperCase()', syntax: 'str.toUpperCase()', desc: "Renvoie la chaîne entièrement en majuscules." },
        { name: 'toLowerCase()', syntax: 'str.toLowerCase()', desc: "Renvoie la chaîne entièrement en minuscules." },
        { name: 'trim()', syntax: 'str.trim()', desc: "Supprime les espaces en début et fin de chaîne." },
        { name: 'includes()', syntax: 'str.includes(sub)', desc: "Indique si la chaîne contient une sous-chaîne." },
        { name: 'startsWith()', syntax: 'str.startsWith(s)', desc: "Teste si la chaîne commence par un préfixe donné." },
        { name: 'padStart()', syntax: 'str.padStart(n, c)', desc: "Complète la chaîne à gauche jusqu'à une longueur cible." },
        { name: 'repeat()', syntax: 'str.repeat(n)', desc: "Renvoie la chaîne répétée n fois." }
      ]
    },
    {
      group: 'Objets globaux (Math, JSON, Date)',
      items: [
        { name: 'Math.round()', syntax: 'Math.round(x)', desc: "Arrondit un nombre à l'entier le plus proche." },
        { name: 'Math.floor() / ceil()', syntax: 'Math.floor(x)', desc: "Arrondit vers le bas ou vers le haut." },
        { name: 'Math.random()', syntax: 'Math.random()', desc: "Renvoie un nombre pseudo-aléatoire entre 0 et 1." },
        { name: 'Math.max() / min()', syntax: 'Math.max(a, b)', desc: "Renvoie le plus grand ou le plus petit des arguments." },
        { name: 'Math.abs()', syntax: 'Math.abs(x)', desc: "Renvoie la valeur absolue d'un nombre." },
        { name: 'JSON.stringify()', syntax: 'JSON.stringify(obj)', desc: "Sérialise une valeur JavaScript en chaîne JSON." },
        { name: 'JSON.parse()', syntax: 'JSON.parse(str)', desc: "Analyse une chaîne JSON en valeur JavaScript." },
        { name: 'new Date()', syntax: 'new Date()', desc: "Crée un objet date représentant l'instant courant." },
        { name: 'Date.now()', syntax: 'Date.now()', desc: "Renvoie l'horodatage en millisecondes depuis 1970." },
        { name: 'date.getTime()', syntax: 'date.getTime()', desc: "Renvoie l'horodatage d'une date en millisecondes." }
      ]
    },
    {
      group: 'Asynchrone (Promise, fetch)',
      items: [
        { name: 'Promise', syntax: 'new Promise((res, rej) => {})', desc: "Objet représentant une valeur future, succès ou échec." },
        { name: 'then()', syntax: 'p.then(fn)', desc: "Enregistre un rappel exécuté à la résolution de la promesse." },
        { name: 'catch()', syntax: 'p.catch(fn)', desc: "Enregistre un rappel exécuté en cas de rejet." },
        { name: 'finally()', syntax: 'p.finally(fn)', desc: "Exécute un rappel quel que soit le résultat de la promesse." },
        { name: 'Promise.all()', syntax: 'Promise.all([p1, p2])', desc: "Attend que toutes les promesses se résolvent en parallèle." },
        { name: 'Promise.race()', syntax: 'Promise.race([p1, p2])', desc: "Se résout dès que la première promesse aboutit." },
        { name: 'await', syntax: 'const x = await p;', desc: "Met en pause une fonction async jusqu'à la résolution." },
        { name: 'fetch()', syntax: 'fetch(url, options)', desc: "Lance une requête HTTP et renvoie une promesse de réponse." },
        { name: 'res.json()', syntax: 'await res.json()', desc: "Lit et parse le corps de la réponse en objet JavaScript." },
        { name: 'setTimeout()', syntax: 'setTimeout(fn, ms)', desc: "Planifie l'exécution différée d'une fonction." }
      ]
    },
    {
      group: 'DOM essentiel',
      items: [
        { name: 'querySelector()', syntax: 'document.querySelector(sel)', desc: "Renvoie le premier élément correspondant à un sélecteur CSS." },
        { name: 'querySelectorAll()', syntax: 'document.querySelectorAll(sel)', desc: "Renvoie une liste de tous les éléments correspondants." },
        { name: 'getElementById()', syntax: 'document.getElementById(id)', desc: "Renvoie l'élément possédant l'identifiant donné." },
        { name: 'createElement()', syntax: 'document.createElement(tag)', desc: "Crée un nouvel élément du type indiqué." },
        { name: 'append()', syntax: 'parent.append(node)', desc: "Insère un ou plusieurs nœuds en fin de parent." },
        { name: 'remove()', syntax: 'el.remove()', desc: "Détache l'élément de son parent dans le DOM." },
        { name: 'addEventListener()', syntax: 'el.addEventListener(type, fn)', desc: "Attache un gestionnaire à un événement de l'élément." },
        { name: 'textContent', syntax: 'el.textContent = \"...\"', desc: "Lit ou écrit le contenu textuel d'un élément." },
        { name: 'classList', syntax: 'el.classList.add(\"x\")', desc: "Gère les classes CSS : add, remove, toggle, contains." },
        { name: 'setAttribute()', syntax: 'el.setAttribute(n, v)', desc: "Définit la valeur d'un attribut de l'élément." },
        { name: 'preventDefault()', syntax: 'event.preventDefault()', desc: "Annule le comportement par défaut d'un événement." }
      ]
    },
    {
      group: 'Modules (import / export)',
      items: [
        { name: 'export', syntax: 'export const x = 1;', desc: "Expose une liaison nommée pour d'autres modules." },
        { name: 'export default', syntax: 'export default valeur;', desc: "Définit l'export principal et unique du module." },
        { name: 'import nommé', syntax: 'import { x } from \"./m.js\";', desc: "Importe une ou plusieurs liaisons nommées d'un module." },
        { name: 'import default', syntax: 'import x from \"./m.js\";', desc: "Importe l'export par défaut sous le nom choisi." },
        { name: 'import * as', syntax: 'import * as ns from \"./m.js\";', desc: "Importe tout le module sous un espace de noms." },
        { name: 'import dynamique', syntax: 'await import(\"./m.js\")', desc: "Charge un module à la demande et renvoie une promesse." },
        { name: 'Renommage', syntax: 'import { a as b } from \"...\";', desc: "Importe une liaison sous un alias local." },
        { name: 'Réexport', syntax: 'export { x } from \"./m.js\";', desc: "Réexpose une liaison provenant d'un autre module." }
      ]
    }
  ]
});
