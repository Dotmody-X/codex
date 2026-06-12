CODEX.extend('nodejs', {
  course: [
    {
      title: "Chapitre 1 — Le modele non-bloquant et l'event loop",
      lessons: [
        {
          title: "Qu'est-ce que Node.js ?",
          body: "Node.js est un environnement d'execution qui fait tourner JavaScript hors du navigateur, construit sur le moteur V8 de Chrome. Il a ete pense pour ecrire des serveurs reseau capables de gerer beaucoup de connexions simultanees. Contrairement au JavaScript du navigateur, Node donne acces au systeme de fichiers, au reseau bas niveau et aux processus. On l'utilise pour des API, des outils en ligne de commande, du temps reel et des microservices.",
          code: "// fichier app.js, lance avec : node app.js\nconsole.log(\"Bonjour depuis Node\", process.version);",
          lang: "js"
        },
        {
          title: "Mono-thread et boucle d'evenements",
          body: "Node execute votre code sur un seul thread principal, mais delegue les operations lentes (disque, reseau) au systeme ou a un pool de threads interne. Quand une operation est terminee, son resultat est replace dans une file que la boucle d'evenements traite au fil de l'eau. Ce modele permet a un seul thread de servir des milliers de clients sans rester bloque a attendre. Il faut donc eviter tout calcul long et synchrone qui figerait toute l'application.",
          code: "console.log(\"1\");\nsetTimeout(() => console.log(\"3\"), 0);\nconsole.log(\"2\"); // ordre affiche : 1, 2, 3",
          lang: "js"
        },
        {
          title: "Synchrone contre asynchrone",
          body: "La plupart des API de Node existent en deux versions : une bloquante (synchrone) et une non-bloquante (asynchrone). La version synchrone est simple mais arrete tout pendant l'attente, ce qui est rarement souhaitable dans un serveur. La version asynchrone rend la main immediatement et previent plus tard via un callback, une promesse ou async/await. Reservez le synchrone aux scripts ponctuels et au demarrage.",
          code: "const fs = require(\"fs\");\nconst data = fs.readFileSync(\"f.txt\", \"utf8\"); // bloque\nfs.readFile(\"f.txt\", \"utf8\", (err, d) => {}); // ne bloque pas",
          lang: "js"
        }
      ]
    },
    {
      title: "Chapitre 2 — Modules CommonJS, ESM et npm",
      lessons: [
        {
          title: "Modules CommonJS",
          body: "Historiquement, Node organise le code en modules CommonJS. Chaque fichier est un module isole avec sa propre portee : on importe avec require et on expose avec module.exports. Le chargement est synchrone et resout les chemins relatifs ou les paquets situes dans node_modules. C'est encore le format par defaut de nombreux projets et paquets npm.",
          code: "// math.js\nfunction somme(a, b) { return a + b; }\nmodule.exports = { somme };\n\n// app.js\nconst { somme } = require(\"./math\");\nconsole.log(somme(2, 3));",
          lang: "js"
        },
        {
          title: "Modules ES (ESM)",
          body: "Node supporte aussi la syntaxe standard import/export. On l'active avec l'extension .mjs ou en ajoutant \"type\": \"module\" dans le package.json. ESM est statique, asynchrone et aligne sur le JavaScript moderne du navigateur. On prefixe les modules natifs par node: pour lever toute ambiguite.",
          code: "// math.mjs\nexport function somme(a, b) { return a + b; }\n\n// app.mjs\nimport { somme } from \"./math.mjs\";\nimport { readFile } from \"node:fs/promises\";",
          lang: "js"
        },
        {
          title: "npm et package.json",
          body: "npm est le gestionnaire de paquets de Node et donne acces au plus grand registre du monde. Le fichier package.json declare le nom, la version, les dependances et les scripts du projet. La commande npm install telecharge les paquets dans node_modules, tandis que package-lock.json fige les versions exactes pour des installations reproductibles. Les scripts se lancent avec npm run.",
          code: "npm init -y\nnpm install express\nnpm install --save-dev nodemon\nnpm run start",
          lang: "js"
        }
      ]
    },
    {
      title: "Chapitre 3 — Systeme de fichiers et chemins",
      lessons: [
        {
          title: "Lire et ecrire des fichiers",
          body: "Le module fs expose les operations sur les fichiers et dossiers. La sous-API fs/promises retourne des promesses et se marie parfaitement avec async/await, ce qui rend le code lisible. On precise l'encodage (par exemple utf8) pour obtenir une chaine plutot qu'un Buffer brut. Pensez a gerer les erreurs, car un fichier peut etre absent ou inaccessible.",
          code: "const fs = require(\"node:fs/promises\");\nasync function run() {\n  await fs.writeFile(\"note.txt\", \"Bonjour\");\n  const txt = await fs.readFile(\"note.txt\", \"utf8\");\n  console.log(txt);\n}\nrun();",
          lang: "js"
        },
        {
          title: "Manipuler les chemins avec path",
          body: "Le module path construit et analyse les chemins de fichiers de maniere portable entre systemes d'exploitation. path.join assemble des segments en gerant les separateurs, et path.resolve produit un chemin absolu. Les variables __dirname et __filename donnent l'emplacement du module courant en CommonJS. Evitez de concatener des chemins a la main avec des slashs.",
          code: "const path = require(\"path\");\nconst cible = path.join(__dirname, \"data\", \"users.json\");\nconsole.log(path.extname(cible)); // .json\nconsole.log(path.basename(cible)); // users.json",
          lang: "js"
        }
      ]
    },
    {
      title: "Chapitre 4 — Construire un serveur HTTP",
      lessons: [
        {
          title: "Un serveur HTTP minimal",
          body: "Le module http permet de creer un serveur web sans aucune dependance externe. La fonction createServer recoit un gestionnaire appele a chaque requete, avec un objet requete (req) et un objet reponse (res). On y definit le code de statut, les en-tetes, puis on envoie le corps avec res.end. La methode listen demarre l'ecoute sur un port donne.",
          code: "const http = require(\"http\");\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader(\"Content-Type\", \"text/plain\");\n  res.end(\"Bonjour le monde\");\n});\nserver.listen(3000, () => console.log(\"Port 3000\"));",
          lang: "js"
        },
        {
          title: "Router selon la methode et l'URL",
          body: "Sans framework, on inspecte req.method et req.url pour decider quelle reponse renvoyer. C'est suffisant pour de petits services, mais cela devient vite verbeux a mesure que les routes se multiplient. On peut renvoyer du JSON en serialisant un objet et en fixant l'en-tete Content-Type adapte. Pour des besoins reels, on prefere un framework comme Express.",
          code: "const server = http.createServer((req, res) => {\n  if (req.url === \"/api\" && req.method === \"GET\") {\n    res.setHeader(\"Content-Type\", \"application/json\");\n    res.end(JSON.stringify({ ok: true }));\n  } else {\n    res.statusCode = 404;\n    res.end(\"Introuvable\");\n  }\n});",
          lang: "js"
        }
      ]
    },
    {
      title: "Chapitre 5 — Asynchrone : callbacks, promesses, async/await",
      lessons: [
        {
          title: "Les callbacks et leurs limites",
          body: "Le style historique de Node repose sur des callbacks suivant la convention erreur-d'abord : le premier argument est l'erreur eventuelle, le second le resultat. Cela fonctionne mais l'imbrication de plusieurs operations dependantes produit le fameux callback hell, difficile a lire et a maintenir. La gestion d'erreurs doit etre repetee a chaque niveau. Les promesses ont ete introduites pour resoudre ces problemes.",
          code: "const fs = require(\"fs\");\nfs.readFile(\"a.txt\", \"utf8\", (err, a) => {\n  if (err) return console.error(err);\n  fs.readFile(\"b.txt\", \"utf8\", (err, b) => {\n    if (err) return console.error(err);\n    console.log(a, b);\n  });\n});",
          lang: "js"
        },
        {
          title: "Promesses et chainage",
          body: "Une promesse represente une valeur future qui sera resolue ou rejetee. On enchaine les traitements avec then et on capture les erreurs avec catch, ce qui aplatit le code. Promise.all permet de lancer plusieurs operations en parallele et d'attendre qu'elles soient toutes terminees. La plupart des API modernes de Node exposent une variante a base de promesses.",
          code: "const fs = require(\"node:fs/promises\");\nPromise.all([fs.readFile(\"a.txt\", \"utf8\"), fs.readFile(\"b.txt\", \"utf8\")])\n  .then(([a, b]) => console.log(a, b))\n  .catch((err) => console.error(err));",
          lang: "js"
        },
        {
          title: "async/await",
          body: "async/await est une syntaxe construite au-dessus des promesses qui donne au code asynchrone l'apparence du code synchrone. Une fonction declaree async retourne toujours une promesse, et await suspend son execution jusqu'a la resolution. La gestion d'erreurs se fait naturellement avec try/catch. C'est aujourd'hui le style recommande pour la lisibilite.",
          code: "const fs = require(\"node:fs/promises\");\nasync function lire() {\n  try {\n    const a = await fs.readFile(\"a.txt\", \"utf8\");\n    console.log(a);\n  } catch (err) {\n    console.error(\"Echec :\", err.message);\n  }\n}\nlire();",
          lang: "js"
        }
      ]
    },
    {
      title: "Chapitre 6 — Express et middlewares",
      lessons: [
        {
          title: "Premier serveur Express",
          body: "Express est le framework web minimaliste le plus utilise de l'ecosysteme Node. Il simplifie le routage, l'analyse des requetes et l'envoi des reponses par rapport au module http brut. On declare des routes par methode (get, post, etc.) associees a un chemin et a un gestionnaire. La methode listen demarre le serveur exactement comme avec http.",
          code: "const express = require(\"express\");\nconst app = express();\napp.get(\"/\", (req, res) => res.send(\"Bonjour\"));\napp.listen(3000, () => console.log(\"Demarre\"));",
          lang: "js"
        },
        {
          title: "Le concept de middleware",
          body: "Un middleware est une fonction qui recoit req, res et next, et qui s'execute dans l'ordre d'enregistrement pour chaque requete. Il peut lire ou modifier la requete et la reponse, puis appeler next pour passer au suivant, ou terminer la reponse lui-meme. On s'en sert pour le journal, l'authentification, l'analyse du corps ou la gestion d'erreurs. express.json analyse automatiquement les corps JSON entrants.",
          code: "app.use(express.json());\napp.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});",
          lang: "js"
        },
        {
          title: "Routes, parametres et reponses JSON",
          body: "Express permet de definir des parametres d'URL avec deux-points, accessibles via req.params, et des parametres de requete via req.query. On renvoie du JSON avec res.json, qui fixe le bon en-tete automatiquement. On controle le code de statut avec res.status avant d'envoyer le corps. Les routeurs (express.Router) aident a organiser les routes par domaine.",
          code: "app.get(\"/users/:id\", (req, res) => {\n  const id = req.params.id;\n  res.status(200).json({ id, nom: \"Ada\" });\n});",
          lang: "js"
        }
      ]
    }
  ],
  reference: [
    {
      group: "Modules core (fs, path, http, os, events, stream, crypto, util)",
      items: [
        { name: "require", syntax: "const m = require(\"module\")", desc: "Importe un module CommonJS, qu'il soit natif, local ou installe dans node_modules." },
        { name: "node:fs", syntax: "const fs = require(\"node:fs\")", desc: "Module de systeme de fichiers : lecture, ecriture, suppression et metadonnees des fichiers et dossiers." },
        { name: "node:path", syntax: "const path = require(\"node:path\")", desc: "Outils portables pour construire, normaliser et analyser des chemins de fichiers." },
        { name: "node:http", syntax: "const http = require(\"node:http\")", desc: "Cree des serveurs et des clients HTTP bas niveau sans dependance externe." },
        { name: "node:os", syntax: "const os = require(\"node:os\")", desc: "Informations sur le systeme : memoire, processeurs, plateforme, dossier personnel." },
        { name: "node:events", syntax: "const { EventEmitter } = require(\"node:events\")", desc: "Fournit EventEmitter, base du modele evenementiel de nombreuses API Node." },
        { name: "node:stream", syntax: "const stream = require(\"node:stream\")", desc: "Traite des donnees par morceaux via des flux lisibles, inscriptibles et transformables." },
        { name: "node:crypto", syntax: "const crypto = require(\"node:crypto\")", desc: "Fonctions cryptographiques : hachage, HMAC, chiffrement et generation aleatoire securisee." },
        { name: "node:util", syntax: "const util = require(\"node:util\")", desc: "Utilitaires divers, dont util.promisify pour convertir un callback en promesse." },
        { name: "node:url", syntax: "const { URL } = require(\"node:url\")", desc: "Analyse et construit des URL conformes a la norme WHATWG." }
      ]
    },
    {
      group: "Objets globaux (process, Buffer, __dirname, console)",
      items: [
        { name: "process", syntax: "process.argv / process.env", desc: "Objet global representant le processus courant : arguments, environnement, sortie et evenements." },
        { name: "Buffer", syntax: "Buffer.from(\"abc\")", desc: "Manipule des donnees binaires brutes en memoire, utile pour les fichiers et le reseau." },
        { name: "__dirname", syntax: "console.log(__dirname)", desc: "Chemin absolu du dossier contenant le module courant (CommonJS uniquement)." },
        { name: "__filename", syntax: "console.log(__filename)", desc: "Chemin absolu du fichier du module courant (CommonJS uniquement)." },
        { name: "console", syntax: "console.log() / console.error()", desc: "Ecrit des messages sur la sortie standard et la sortie d'erreur." },
        { name: "global", syntax: "global.maVar = 1", desc: "Objet global de Node, equivalent de window dans le navigateur." },
        { name: "globalThis", syntax: "globalThis.fetch", desc: "Reference standard et portable de l'objet global, valable partout." },
        { name: "module", syntax: "module.exports = {}", desc: "Represente le module courant ; module.exports definit ce qu'il expose." },
        { name: "require.main", syntax: "if (require.main === module) {}", desc: "Permet de detecter si le fichier est lance directement plutot qu'importe." }
      ]
    },
    {
      group: "Systeme de fichiers (fs)",
      items: [
        { name: "fs.readFile", syntax: "fs.readFile(path, \"utf8\", cb)", desc: "Lit le contenu complet d'un fichier de maniere asynchrone." },
        { name: "fs.writeFile", syntax: "fs.writeFile(path, data, cb)", desc: "Ecrit des donnees dans un fichier, en l'ecrasant s'il existe." },
        { name: "fs.appendFile", syntax: "fs.appendFile(path, data, cb)", desc: "Ajoute des donnees a la fin d'un fichier, en le creant au besoin." },
        { name: "fs.readFileSync", syntax: "const s = fs.readFileSync(path, \"utf8\")", desc: "Version synchrone et bloquante de la lecture de fichier." },
        { name: "fs.promises.readFile", syntax: "await fs.promises.readFile(path, \"utf8\")", desc: "Variante a base de promesses, ideale avec async/await." },
        { name: "fs.readdir", syntax: "fs.readdir(dir, cb)", desc: "Liste les noms des entrees contenues dans un dossier." },
        { name: "fs.mkdir", syntax: "fs.mkdir(dir, { recursive: true }, cb)", desc: "Cree un dossier, et toute l'arborescence parente si recursive est vrai." },
        { name: "fs.stat", syntax: "fs.stat(path, cb)", desc: "Retourne les metadonnees d'un fichier : taille, dates, type." },
        { name: "fs.unlink", syntax: "fs.unlink(path, cb)", desc: "Supprime un fichier du systeme de fichiers." },
        { name: "fs.existsSync", syntax: "if (fs.existsSync(path)) {}", desc: "Indique de maniere synchrone si un chemin existe." },
        { name: "fs.createReadStream", syntax: "fs.createReadStream(path)", desc: "Cree un flux de lecture pour traiter de gros fichiers par morceaux." },
        { name: "fs.watch", syntax: "fs.watch(path, cb)", desc: "Surveille un fichier ou un dossier et notifie ses modifications." }
      ]
    },
    {
      group: "HTTP & reseau",
      items: [
        { name: "http.createServer", syntax: "http.createServer((req, res) => {})", desc: "Cree un serveur HTTP dont le gestionnaire est appele a chaque requete." },
        { name: "server.listen", syntax: "server.listen(3000, cb)", desc: "Demarre l'ecoute du serveur sur un port et une adresse donnes." },
        { name: "res.writeHead", syntax: "res.writeHead(200, headers)", desc: "Ecrit le code de statut et les en-tetes de la reponse." },
        { name: "res.end", syntax: "res.end(\"corps\")", desc: "Termine la reponse en envoyant eventuellement un dernier morceau de donnees." },
        { name: "http.request", syntax: "http.request(options, cb)", desc: "Effectue une requete HTTP sortante en tant que client." },
        { name: "http.get", syntax: "http.get(url, cb)", desc: "Raccourci pour une requete GET cliente avec corps automatiquement termine." },
        { name: "fetch", syntax: "await fetch(url)", desc: "Client HTTP global base sur les promesses, disponible nativement dans Node moderne." },
        { name: "node:net", syntax: "const net = require(\"node:net\")", desc: "API TCP bas niveau pour creer des serveurs et clients par sockets." },
        { name: "node:https", syntax: "const https = require(\"node:https\")", desc: "Equivalent de http pour les connexions chiffrees TLS/SSL." },
        { name: "node:dns", syntax: "const dns = require(\"node:dns\")", desc: "Resolution de noms de domaine en adresses et inversement." }
      ]
    },
    {
      group: "Evenements & streams",
      items: [
        { name: "EventEmitter", syntax: "const e = new EventEmitter()", desc: "Classe de base pour emettre et ecouter des evenements nommes." },
        { name: "emitter.on", syntax: "e.on(\"event\", listener)", desc: "Enregistre un ecouteur appele a chaque emission de l'evenement." },
        { name: "emitter.once", syntax: "e.once(\"event\", listener)", desc: "Enregistre un ecouteur declenche une seule fois puis retire." },
        { name: "emitter.emit", syntax: "e.emit(\"event\", data)", desc: "Declenche un evenement et transmet des arguments aux ecouteurs." },
        { name: "emitter.off", syntax: "e.off(\"event\", listener)", desc: "Retire un ecouteur precedemment enregistre pour un evenement." },
        { name: "Readable", syntax: "stream.Readable.from(iterable)", desc: "Flux source produisant des donnees consommables par morceaux." },
        { name: "Writable", syntax: "writable.write(chunk)", desc: "Flux destination acceptant des donnees ecrites progressivement." },
        { name: "stream.pipe", syntax: "readable.pipe(writable)", desc: "Connecte un flux lisible a un flux inscriptible et gere le debit." },
        { name: "stream.pipeline", syntax: "pipeline(a, b, c, cb)", desc: "Enchaine plusieurs flux avec propagation propre des erreurs." },
        { name: "Transform", syntax: "new stream.Transform({ transform })", desc: "Flux qui lit, modifie puis re-emet les donnees a la volee." }
      ]
    },
    {
      group: "npm & package.json",
      items: [
        { name: "npm init", syntax: "npm init -y", desc: "Cree un fichier package.json avec des valeurs par defaut." },
        { name: "npm install", syntax: "npm install <paquet>", desc: "Installe un paquet et l'ajoute aux dependances du projet." },
        { name: "npm install -D", syntax: "npm install -D <paquet>", desc: "Installe un paquet uniquement comme dependance de developpement." },
        { name: "npm uninstall", syntax: "npm uninstall <paquet>", desc: "Desinstalle un paquet et le retire du package.json." },
        { name: "npm run", syntax: "npm run <script>", desc: "Execute un script defini dans le champ scripts du package.json." },
        { name: "npx", syntax: "npx <commande>", desc: "Execute un binaire de paquet sans installation globale prealable." },
        { name: "dependencies", syntax: "\"dependencies\": { \"express\": \"^4\" }", desc: "Liste les paquets necessaires a l'execution de l'application." },
        { name: "devDependencies", syntax: "\"devDependencies\": {}", desc: "Liste les paquets necessaires seulement en developpement et tests." },
        { name: "scripts", syntax: "\"scripts\": { \"start\": \"node app.js\" }", desc: "Definit des commandes raccourcies lancables avec npm run." },
        { name: "package-lock.json", syntax: "package-lock.json", desc: "Fige les versions exactes installees pour des builds reproductibles." }
      ]
    },
    {
      group: "Asynchrone & timers",
      items: [
        { name: "setTimeout", syntax: "setTimeout(fn, ms)", desc: "Planifie l'execution d'une fonction apres un delai en millisecondes." },
        { name: "setInterval", syntax: "setInterval(fn, ms)", desc: "Repete l'execution d'une fonction a intervalle regulier." },
        { name: "clearTimeout", syntax: "clearTimeout(id)", desc: "Annule un timer cree par setTimeout avant son declenchement." },
        { name: "setImmediate", syntax: "setImmediate(fn)", desc: "Execute une fonction au tour suivant de la boucle d'evenements." },
        { name: "process.nextTick", syntax: "process.nextTick(fn)", desc: "Place une fonction en tete de file, avant toute autre tache async." },
        { name: "Promise", syntax: "new Promise((resolve, reject) => {})", desc: "Represente une valeur future resolue ou rejetee." },
        { name: "Promise.all", syntax: "await Promise.all([p1, p2])", desc: "Attend que toutes les promesses soient resolues ou qu'une echoue." },
        { name: "Promise.race", syntax: "await Promise.race([p1, p2])", desc: "Se resout ou se rejette des que la premiere promesse se termine." },
        { name: "async/await", syntax: "async function f() { await p; }", desc: "Syntaxe pour ecrire de l'asynchrone avec l'apparence du synchrone." },
        { name: "util.promisify", syntax: "util.promisify(fn)", desc: "Convertit une fonction a callback erreur-d'abord en fonction a promesse." }
      ]
    },
    {
      group: "Express essentiel",
      items: [
        { name: "express()", syntax: "const app = express()", desc: "Cree une instance d'application Express prete a recevoir des routes." },
        { name: "app.get", syntax: "app.get(path, handler)", desc: "Declare une route repondant aux requetes HTTP GET sur un chemin." },
        { name: "app.post", syntax: "app.post(path, handler)", desc: "Declare une route repondant aux requetes HTTP POST." },
        { name: "app.use", syntax: "app.use(middleware)", desc: "Enregistre un middleware applique a toutes les requetes ou a un prefixe." },
        { name: "app.listen", syntax: "app.listen(3000, cb)", desc: "Demarre le serveur Express sur le port indique." },
        { name: "express.json", syntax: "app.use(express.json())", desc: "Middleware integre qui analyse les corps de requete au format JSON." },
        { name: "express.static", syntax: "app.use(express.static(\"public\"))", desc: "Sert des fichiers statiques depuis un dossier donne." },
        { name: "express.Router", syntax: "const r = express.Router()", desc: "Cree un routeur modulaire pour regrouper des routes par domaine." },
        { name: "req.params", syntax: "req.params.id", desc: "Acces aux parametres nommes captures dans le chemin de l'URL." },
        { name: "req.query", syntax: "req.query.page", desc: "Acces aux parametres de la chaine de requete de l'URL." },
        { name: "res.json", syntax: "res.json({ ok: true })", desc: "Envoie une reponse JSON en fixant l'en-tete Content-Type adapte." },
        { name: "res.status", syntax: "res.status(404).send(...)", desc: "Definit le code de statut HTTP de la reponse." }
      ]
    },
    {
      group: "Variables d'environnement",
      items: [
        { name: "process.env", syntax: "process.env.PORT", desc: "Objet contenant toutes les variables d'environnement du processus." },
        { name: "process.env.NODE_ENV", syntax: "process.env.NODE_ENV", desc: "Convention indiquant l'environnement courant (development, production)." },
        { name: "valeur par defaut", syntax: "const port = process.env.PORT || 3000", desc: "Fournit une valeur de repli quand la variable n'est pas definie." },
        { name: "process.argv", syntax: "process.argv.slice(2)", desc: "Tableau des arguments passes en ligne de commande au programme." },
        { name: "process.cwd", syntax: "process.cwd()", desc: "Retourne le dossier de travail courant du processus." },
        { name: "process.exit", syntax: "process.exit(1)", desc: "Termine immediatement le processus avec un code de sortie." },
        { name: "fichier .env", syntax: ".env : PORT=3000", desc: "Fichier conventionnel stockant des variables, charge par un outil dedie." },
        { name: "dotenv", syntax: "require(\"dotenv\").config()", desc: "Paquet populaire qui charge un fichier .env dans process.env." },
        { name: "node --env-file", syntax: "node --env-file=.env app.js", desc: "Option native de Node pour charger un fichier .env sans dependance." }
      ]
    }
  ]
});
