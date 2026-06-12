CODEX.register({
  id: 'nodejs',
  name: 'Node.js',
  abbr: 'ND',
  category: 'backend',
  tier: 2,
  year: 2009,
  difficulty: 3,
  color: '#83cd29',
  tagline: 'JavaScript cote serveur, non-bloquant par nature',
  paradigms: ['Evenementiel', 'Asynchrone', 'Non-bloquant', 'Mono-thread'],
  description: 'Node.js est un environnement d\'execution qui fait tourner JavaScript en dehors du navigateur, construit sur le moteur V8 de Chrome. Son modele repose sur une boucle d\'evenements mono-thread et des entrees-sorties non-bloquantes, ce qui le rend tres performant pour les serveurs gerant de nombreuses connexions simultanees. Plutot que d\'attendre une operation lente (disque, reseau), Node delegue et continue, puis traite le resultat via des callbacks ou des promesses. L\'ecosysteme npm offre le plus grand registre de paquets au monde. On l\'utilise pour des API, des outils en ligne de commande, du temps reel et bien plus.',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z"/><path d="M9 9 L9 15"/><path d="M9 9 L15 15"/><path d="M15 9 L15 15"/></svg>',
  concepts: [
    {
      title: 'Boucle d\'evenements (event loop)',
      body: 'Le coeur de Node est une boucle mono-thread qui traite les taches au fil de l\'eau. Les operations longues sont confiees au systeme (ou a un pool de threads), et leurs resultats reviennent sous forme de callbacks places dans une file. Ainsi un seul thread peut gerer des milliers de connexions sans rester bloque.',
      code: 'console.log(\'1\');\nsetTimeout(() => console.log(\'3\'), 0);\nconsole.log(\'2\'); // ordre : 1, 2, 3'
    },
    {
      title: 'Modele non-bloquant',
      body: 'Les API de Node privilegient les versions asynchrones : au lieu d\'attendre la fin d\'une lecture disque, le code rend la main et reprend quand les donnees sont pretes. Cela maximise le debit mais impose de raisonner en termes de callbacks, de promesses ou d\'async/await.',
      code: 'fs.readFile(\'f.txt\', (err, data) => {\n  // execute plus tard, sans bloquer\n});'
    },
    {
      title: 'Modules CommonJS',
      body: 'Historiquement, Node utilise CommonJS : on importe avec require et on expose avec module.exports. Chaque fichier est un module isole avec sa propre portee. Le chargement est synchrone et resout les chemins relatifs ou les paquets de node_modules.',
      code: 'const path = require(\'path\');\nmodule.exports = { saluer };'
    },
    {
      title: 'Modules ES (ESM)',
      body: 'Node supporte aussi la syntaxe standard import/export. On l\'active avec l\'extension .mjs ou le champ "type": "module" du package.json. ESM est asynchrone, statique et compatible avec le reste de l\'ecosysteme JavaScript moderne.',
      code: 'import { readFile } from \'node:fs/promises\';\nexport function saluer() {}'
    },
    {
      title: 'npm et package.json',
      body: 'npm est le gestionnaire de paquets de Node. Le fichier package.json declare les dependances, les scripts et les metadonnees du projet. npm install telecharge les paquets dans node_modules, et le fichier de verrou (package-lock.json) fige les versions exactes.',
      code: 'npm init -y\nnpm install express\nnpm run start'
    },
    {
      title: 'Systeme de fichiers (fs)',
      body: 'Le module fs expose la lecture, l\'ecriture et la manipulation de fichiers. Il propose des variantes asynchrones (callbacks), synchrones (suffixe Sync) et basees sur les promesses via fs/promises. On privilegie l\'asynchrone pour ne pas bloquer la boucle.',
      code: 'import { readFile } from \'node:fs/promises\';\nconst t = await readFile(\'f.txt\', \'utf8\');'
    },
    {
      title: 'Serveur HTTP natif',
      body: 'Le module http permet de creer un serveur sans dependance externe. On fournit une fonction appelee a chaque requete, avec un objet requete et un objet reponse. C\'est la brique de bas niveau sur laquelle reposent les frameworks comme Express.',
      code: 'http.createServer((req, res) => {\n  res.end(\'Bonjour\');\n}).listen(3000);'
    },
    {
      title: 'Streams',
      body: 'Les streams traitent les donnees par morceaux plutot que de tout charger en memoire. Lecture, ecriture, duplex et transformation permettent de gerer de gros fichiers ou des flux reseau efficacement. On enchaine les streams avec pipe ou pipeline.',
      code: 'createReadStream(\'gros.txt\')\n  .pipe(createWriteStream(\'copie.txt\'));'
    },
    {
      title: 'Asynchrone : callbacks, promesses, async/await',
      body: 'Node a evolue des callbacks vers les promesses puis async/await, qui rend le code asynchrone lisible comme du code sequentiel. await suspend la fonction jusqu\'a la resolution de la promesse, sans bloquer la boucle d\'evenements. Les erreurs se capturent avec try/catch.',
      code: 'async function lire() {\n  try { const d = await readFile(\'f\'); }\n  catch (e) { console.error(e); }\n}'
    },
    {
      title: 'Express, le framework minimaliste',
      body: 'Express simplifie la creation d\'API HTTP avec un systeme de routes et de middlewares. Un middleware est une fonction qui recoit req, res et next, et qui peut traiter, modifier ou transmettre la requete. On compose ces couches pour structurer une application.',
      code: 'app.get(\'/\', (req, res) => res.send(\'OK\'));\napp.use(express.json());'
    }
  ],
  example: {
    lang: 'js',
    code: '// API minimale avec Express qui lit un fichier sans bloquer\nimport express from \'express\';\nimport { readFile } from \'node:fs/promises\';\n\nconst app = express();\napp.use(express.json()); // middleware : parse le corps JSON\n\n// Route asynchrone\napp.get(\'/version\', async (req, res) => {\n  try {\n    // lecture non-bloquante : la boucle reste libre pendant l\'attente\n    const contenu = await readFile(\'package.json\', \'utf8\');\n    const pkg = JSON.parse(contenu);\n    res.json({ version: pkg.version });\n  } catch (err) {\n    res.status(500).json({ erreur: \'Lecture impossible\' });\n  }\n});\n\napp.listen(3000, () => {\n  console.log(\'Serveur sur http://localhost:3000\');\n});',
    explain: 'Le serveur Express expose une route /version. A chaque requete, readFile lit package.json de maniere asynchrone : Node n\'attend pas et peut servir d\'autres requetes pendant la lecture. Quand le fichier est pret, on le parse et on renvoie la version en JSON. Le bloc try/catch capture toute erreur et renvoie un code 500.'
  },
  roadmap: [
    {
      level: 'Initie',
      goals: [
        'Executer un script avec node fichier.js',
        'Comprendre require et module.exports',
        'Initialiser un projet avec npm et installer un paquet',
        'Lire et ecrire un fichier avec le module fs'
      ]
    },
    {
      level: 'Adepte',
      goals: [
        'Maitriser async/await et la gestion des erreurs',
        'Creer un serveur HTTP puis une API Express',
        'Utiliser les modules ES et les variables d\'environnement',
        'Comprendre l\'ordre d\'execution de la boucle d\'evenements'
      ]
    },
    {
      level: 'Maitre',
      goals: [
        'Manipuler les streams et le backpressure',
        'Structurer middlewares, routes et gestion d\'erreurs centralisee',
        'Optimiser via le clustering et les worker threads',
        'Securiser, tester et deployer une application en production'
      ]
    }
  ],
  resources: [
    { label: 'Documentation officielle Node.js', url: 'https://nodejs.org/fr/docs' },
    { label: 'Guides de l\'API Node.js', url: 'https://nodejs.org/api/' },
    { label: 'Documentation Express', url: 'https://expressjs.com/fr/' },
    { label: 'MDN - Cote serveur avec Express/Node', url: 'https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs' }
  ],
  games: {
    quiz: [
      {
        q: 'Sur quel modele repose la concurrence de Node.js ?',
        options: ['Multi-thread bloquant', 'Boucle d\'evenements mono-thread non-bloquante', 'Un processus par requete', 'Calcul parallele sur GPU'],
        answer: 1,
        explain: 'Node utilise une boucle d\'evenements sur un seul thread principal avec des entrees-sorties non-bloquantes, ce qui lui permet de gerer de nombreuses connexions simultanees.'
      },
      {
        q: 'Quelle syntaxe correspond a CommonJS ?',
        options: ['import x from \'x\'', 'const x = require(\'x\')', 'include \'x\'', 'load(\'x\')'],
        answer: 1,
        explain: 'CommonJS importe avec require et exporte avec module.exports. import/export releve des modules ES.'
      },
      {
        q: 'A quoi sert le fichier package.json ?',
        options: ['A stocker les donnees utilisateurs', 'A declarer dependances, scripts et metadonnees du projet', 'A compiler le code', 'A configurer le navigateur'],
        answer: 1,
        explain: 'package.json decrit le projet : nom, version, dependances, scripts npm et point d\'entree.'
      },
      {
        q: 'Pourquoi privilegier les API asynchrones de fs ?',
        options: ['Elles sont plus simples', 'Pour ne pas bloquer la boucle d\'evenements', 'Elles consomment moins de disque', 'Elles sont obligatoires'],
        answer: 1,
        explain: 'Les versions asynchrones rendent la main pendant l\'operation, evitant de bloquer le thread unique et donc tout le serveur.'
      },
      {
        q: 'Que fait pipe entre deux streams ?',
        options: ['Charge tout le fichier en memoire', 'Connecte la sortie d\'un stream a l\'entree d\'un autre', 'Supprime le fichier source', 'Compresse les donnees'],
        answer: 1,
        explain: 'pipe relie un stream lisible a un stream inscriptible, transferant les donnees par morceaux sans tout charger en memoire.'
      },
      {
        q: 'Dans Express, qu\'est-ce qu\'un middleware ?',
        options: ['Un fichier de configuration', 'Une fonction (req, res, next) qui traite la requete', 'Une base de donnees', 'Un module npm obligatoire'],
        answer: 1,
        explain: 'Un middleware est une fonction qui recoit req, res et next ; elle peut traiter la requete puis passer la main au middleware suivant.'
      },
      {
        q: 'Quel mot-cle suspend une fonction jusqu\'a la resolution d\'une promesse ?',
        options: ['yield', 'await', 'pause', 'wait'],
        answer: 1,
        explain: 'await, utilise dans une fonction async, suspend l\'execution jusqu\'a ce que la promesse soit resolue, sans bloquer la boucle.'
      },
      {
        q: 'Comment activer les modules ES (import/export) dans un projet Node ?',
        options: ['Rien a faire, c\'est par defaut', 'Ajouter "type": "module" au package.json ou utiliser .mjs', 'Installer un paquet babel-esm', 'Renommer en .es'],
        answer: 1,
        explain: 'On active ESM en mettant "type": "module" dans package.json ou en nommant les fichiers en .mjs.'
      }
    ],
    fillBlank: [
      {
        prompt: 'Importer le module path en CommonJS.',
        code: 'const path = ___(\'path\');',
        answer: 'require',
        explain: 'En CommonJS, require charge un module integre, local ou installe.'
      },
      {
        prompt: 'Exposer une fonction depuis un module CommonJS.',
        code: 'module.___ = { saluer };',
        answer: 'exports',
        explain: 'module.exports definit ce que le module rend disponible aux autres fichiers.'
      },
      {
        prompt: 'Attendre la lecture asynchrone d\'un fichier.',
        code: 'const data = ___ readFile(\'f.txt\', \'utf8\');',
        answer: 'await',
        explain: 'await suspend la fonction async jusqu\'a la resolution de la promesse renvoyee par readFile.'
      },
      {
        prompt: 'Demarrer le serveur Express sur le port 3000.',
        code: 'app.___(3000, () => console.log(\'pret\'));',
        answer: 'listen',
        explain: 'listen met le serveur en ecoute sur le port indique et appelle le callback une fois pret.'
      },
      {
        prompt: 'Installer le paquet express avec npm.',
        code: 'npm ___ express',
        answer: 'install',
        explain: 'npm install telecharge le paquet et l\'ajoute aux dependances du projet.'
      },
      {
        prompt: 'Relier la lecture a l\'ecriture pour copier un fichier.',
        code: 'createReadStream(\'a\').___(createWriteStream(\'b\'));',
        answer: 'pipe',
        explain: 'pipe connecte la sortie du stream de lecture a l\'entree du stream d\'ecriture, morceau par morceau.'
      }
    ],
    bugHunt: [
      {
        code: 'const data = fs.readFile(\'f.txt\', \'utf8\');\nconsole.log(data.length);',
        buggyLine: 1,
        explain: 'fs.readFile asynchrone ne retourne pas les donnees : il faut un callback ou la version fs/promises avec await. Ici data est undefined.',
        fix: 'const data = await readFile(\'f.txt\', \'utf8\'); // depuis node:fs/promises'
      },
      {
        code: 'app.get(\'/\', (req, res) => {\n  const d = await fetch(url);\n  res.send(d);\n});',
        buggyLine: 2,
        explain: 'await est utilise dans une fonction non declaree async, ce qui provoque une erreur de syntaxe.',
        fix: 'app.get(\'/\', async (req, res) => { const d = await fetch(url); ... })'
      },
      {
        code: 'import express from \'express\';\nconst app = express();\napp.get(\'/\', (req, res) => res.send(\'OK\'));',
        buggyLine: 3,
        explain: 'Le serveur n\'est jamais mis en ecoute : sans app.listen, aucune requete ne peut etre recue.',
        fix: 'app.listen(3000, () => console.log(\'pret\'));'
      },
      {
        code: 'const x = require(\'./util.mjs\');\nx.run();',
        buggyLine: 1,
        explain: 'On ne peut pas charger un module ES (.mjs) avec require ; il faut un import dynamique ou un fichier CommonJS.',
        fix: 'const x = await import(\'./util.mjs\'); puis x.run();'
      },
      {
        code: 'http.createServer((req, res) => {\n  res.write(\'Bonjour\');\n}).listen(3000);',
        buggyLine: 2,
        explain: 'La reponse n\'est jamais terminee : sans res.end(), le client attend indefiniment.',
        fix: 'res.end(\'Bonjour\'); // ou res.write(...) puis res.end()'
      }
    ],
    output: [
      {
        code: 'console.log(\'A\');\nsetTimeout(() => console.log(\'B\'), 0);\nconsole.log(\'C\');',
        options: ['A B C', 'A C B', 'B A C'],
        answer: 1,
        explain: 'Le code synchrone s\'execute d\'abord (A puis C), et le callback de setTimeout passe par la file d\'evenements, donc B s\'affiche en dernier.'
      },
      {
        code: 'Promise.resolve().then(() => console.log(\'micro\'));\nconsole.log(\'sync\');',
        options: ['micro sync', 'sync micro', 'sync seulement'],
        answer: 1,
        explain: 'Le code synchrone (sync) s\'execute avant que la microtache de la promesse (micro) ne soit traitee, en fin de tour de boucle.'
      },
      {
        code: 'const a = [1, 2, 3];\nconsole.log(a.map(x => x * 2));',
        options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]'],
        answer: 1,
        explain: 'map applique x * 2 a chaque element, produisant [2, 4, 6].'
      },
      {
        code: 'console.log(typeof require);',
        options: ['undefined', 'function', 'object'],
        answer: 1,
        explain: 'Dans un module CommonJS, require est une fonction fournie par Node.'
      },
      {
        code: 'async function f() { return 42; }\nf().then(v => console.log(v));',
        options: ['Promise', '42', 'undefined'],
        answer: 1,
        explain: 'Une fonction async retourne une promesse ; then recoit la valeur resolue, ici 42.'
      }
    ]
  }
});
