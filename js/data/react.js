CODEX.register({
  id: 'react',
  name: 'React',
  abbr: 'RE',
  category: 'framework',
  tier: 3,
  year: 2013,
  difficulty: 3,
  color: '#61dafb',
  tagline: 'L\'interface comme une fonction de l\'etat',
  paradigms: ['Declaratif', 'Composant', 'Reactif', 'Unidirectionnel'],
  description: 'React est une bibliotheque JavaScript creee par Facebook pour construire des interfaces utilisateur a base de composants reutilisables. Son modele declaratif decrit a quoi doit ressembler l\'ecran pour un etat donne, et React se charge de mettre le DOM a jour efficacement. Le flux de donnees est unidirectionnel : les donnees descendent via les props, les evenements remontent via des callbacks. Le Virtual DOM et l\'algorithme de reconciliation minimisent les manipulations couteuses du DOM reel. Les Hooks permettent de gerer l\'etat et les effets dans des composants fonctions, sans classe.',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.2"/><path d="M12 4.5 L19 8.25 L19 15.75 L12 19.5 L5 15.75 L5 8.25 Z"/><path d="M12 4.5 L12 9.8"/><path d="M19 8.25 L14.4 10.9"/><path d="M19 15.75 L14.4 13.1"/><path d="M12 19.5 L12 14.2"/><path d="M5 15.75 L9.6 13.1"/><path d="M5 8.25 L9.6 10.9"/></svg>',
  concepts: [
    {
      title: 'JSX',
      body: 'JSX est une syntaxe qui mele balisage et JavaScript dans un meme fichier. Le compilateur (Babel) le transforme en appels React.createElement. Les accolades permettent d\'injecter n\'importe quelle expression JavaScript dans le balisage.',
      code: 'const el = <h1 className="titre">Bonjour {nom}</h1>;'
    },
    {
      title: 'Composants',
      body: 'Un composant est une fonction qui retourne du JSX. Il encapsule structure, logique et style pour etre reutilise. Les noms de composants commencent toujours par une majuscule pour les distinguer des balises HTML natives.',
      code: 'function Bouton() {\n  return <button>Cliquer</button>;\n}'
    },
    {
      title: 'Props',
      body: 'Les props sont les arguments passes a un composant par son parent. Elles sont en lecture seule : un composant ne doit jamais modifier ses propres props. C\'est le mecanisme principal de circulation des donnees, du haut vers le bas.',
      code: 'function Salut({ nom }) {\n  return <p>Salut {nom}</p>;\n}\n<Salut nom="Lea" />'
    },
    {
      title: 'State avec useState',
      body: 'Le state est une memoire interne au composant qui declenche un nouveau rendu quand elle change. useState retourne la valeur courante et une fonction pour la mettre a jour. Modifier le state via cette fonction est ce qui rend l\'interface vivante.',
      code: 'const [count, setCount] = useState(0);\nsetCount(count + 1);'
    },
    {
      title: 'Effets avec useEffect',
      body: 'useEffect execute du code apres le rendu pour synchroniser le composant avec l\'exterieur : requetes reseau, abonnements, minuteurs. Le tableau de dependances controle quand l\'effet se rejoue. Retourner une fonction permet de nettoyer (cleanup) avant le prochain effet ou au demontage.',
      code: 'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);'
    },
    {
      title: 'Regles des Hooks',
      body: 'Les Hooks doivent etre appeles au niveau racine du composant, jamais dans une condition, une boucle ou une fonction imbriquee. React s\'appuie sur l\'ordre d\'appel stable pour associer chaque Hook a son state. On ne les appelle que depuis des composants ou d\'autres Hooks.'
    },
    {
      title: 'Remontee de l\'etat (lifting state up)',
      body: 'Quand deux composants doivent partager une donnee, on deplace ce state vers leur plus proche ancetre commun. Le parent detient la source de verite et la distribue via les props. Cela evite la duplication et garde les composants synchronises.'
    },
    {
      title: 'Listes et keys',
      body: 'Pour afficher une liste, on transforme un tableau en elements avec map. Chaque element a besoin d\'une prop key stable et unique pour que React identifie quel element a change, a ete ajoute ou supprime. Utiliser l\'index comme key est risque si la liste peut etre reordonnee.',
      code: 'items.map(it => <li key={it.id}>{it.texte}</li>)'
    },
    {
      title: 'Rendu conditionnel',
      body: 'On affiche du contenu selon une condition avec un ternaire, l\'operateur && ou un retour anticipe. Retourner null indique a React de ne rien rendre. C\'est la maniere declarative de montrer ou cacher des elements.',
      code: '{connecte ? <Profil /> : <Connexion />}\n{erreur && <Alerte msg={erreur} />}'
    },
    {
      title: 'Reconciliation et Virtual DOM',
      body: 'React maintient une representation legere de l\'interface en memoire (Virtual DOM). A chaque rendu, il compare la nouvelle arborescence a l\'ancienne (diffing) et n\'applique au DOM reel que les differences. Les keys et le type des elements guident cet algorithme pour reutiliser au maximum les noeuds existants.'
    }
  ],
  example: {
    lang: 'jsx',
    code: 'import { useState, useEffect } from \'react\';\n\n// Composant compteur avec titre dynamique du document\nfunction Compteur() {\n  const [count, setCount] = useState(0); // state local\n\n  // Effet : synchronise le titre de l\'onglet avec le compteur\n  useEffect(() => {\n    document.title = `Clics : ${count}`;\n  }, [count]); // ne se rejoue que si count change\n\n  return (\n    <div>\n      <p>Vous avez clique {count} fois</p>\n      <button onClick={() => setCount(count + 1)}>\n        Incrementer\n      </button>\n      {/* Rendu conditionnel */}\n      {count >= 5 && <p>Bravo, plus de 5 clics !</p>}\n    </div>\n  );\n}\n\nexport default Compteur;',
    explain: 'useState cree un etat count initialise a 0. Chaque clic appelle setCount, ce qui declenche un nouveau rendu. useEffect met a jour le titre de l\'onglet apres chaque rendu ou count a change. Le message felicitations apparait via un rendu conditionnel avec l\'operateur &&.'
  },
  roadmap: [
    {
      level: 'Initie',
      goals: [
        'Ecrire du JSX et comprendre sa compilation',
        'Creer des composants fonctions et les composer',
        'Passer et lire des props',
        'Gerer un etat simple avec useState'
      ]
    },
    {
      level: 'Adepte',
      goals: [
        'Maitriser useEffect et le nettoyage des effets',
        'Afficher des listes avec des keys correctes',
        'Remonter l\'etat vers un ancetre commun',
        'Construire des formulaires controles'
      ]
    },
    {
      level: 'Maitre',
      goals: [
        'Optimiser avec useMemo, useCallback et React.memo',
        'Creer des Hooks personnalises reutilisables',
        'Gerer l\'etat global (Context, Redux, Zustand)',
        'Comprendre finement la reconciliation et le rendu concurrent'
      ]
    }
  ],
  resources: [
    { label: 'Documentation officielle React', url: 'https://react.dev' },
    { label: 'Apprendre React (tutoriel officiel)', url: 'https://react.dev/learn' },
    { label: 'Reference des Hooks', url: 'https://react.dev/reference/react/hooks' },
    { label: 'MDN - Premiers pas avec React', url: 'https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started' }
  ],
  games: {
    quiz: [
      {
        q: 'Que retourne un appel a useState ?',
        options: ['Une seule valeur', 'Un tableau [valeur, fonction de mise a jour]', 'Un objet avec get et set', 'Une promesse'],
        answer: 1,
        explain: 'useState retourne un tableau de deux elements : la valeur courante du state et une fonction pour la mettre a jour, que l\'on destructure habituellement.'
      },
      {
        q: 'Comment React decide-t-il de re-rendre un composant ?',
        options: ['A intervalle regulier', 'Quand son state ou ses props changent', 'A chaque mouvement de souris', 'Seulement au chargement de la page'],
        answer: 1,
        explain: 'Un composant se re-rend lorsque son state change (via la fonction de useState) ou lorsque ses props recoivent de nouvelles valeurs.'
      },
      {
        q: 'A quoi sert la prop key dans une liste ?',
        options: ['A styliser les elements', 'A trier la liste automatiquement', 'A identifier chaque element pour la reconciliation', 'A rendre les elements cliquables'],
        answer: 2,
        explain: 'La key donne une identite stable a chaque element de liste, permettant a React de savoir lesquels ont change, ete ajoutes ou supprimes.'
      },
      {
        q: 'Quelle affirmation sur les props est correcte ?',
        options: ['Elles sont modifiables par le composant enfant', 'Elles circulent du parent vers l\'enfant', 'Elles remplacent le state', 'Elles ne peuvent etre que des chaines'],
        answer: 1,
        explain: 'Les props sont passees du parent vers l\'enfant et sont en lecture seule : un composant ne doit jamais muter ses propres props.'
      },
      {
        q: 'Quand le tableau de dependances de useEffect est [], l\'effet s\'execute :',
        options: ['A chaque rendu', 'Jamais', 'Une seule fois apres le premier rendu', 'Uniquement au demontage'],
        answer: 2,
        explain: 'Un tableau de dependances vide signifie que l\'effet ne depend de rien et ne s\'execute donc qu\'apres le montage initial.'
      },
      {
        q: 'Ou peut-on appeler un Hook comme useState ?',
        options: ['Dans une boucle for', 'Dans une condition if', 'Au niveau racine d\'un composant fonction', 'Dans un gestionnaire onClick'],
        answer: 2,
        explain: 'Les Hooks doivent etre appeles au niveau racine du composant, jamais dans une condition, une boucle ou une fonction imbriquee, afin de garder un ordre d\'appel stable.'
      },
      {
        q: 'Que designe le terme lifting state up ?',
        options: ['Supprimer le state d\'un composant', 'Deplacer le state vers un ancetre commun pour le partager', 'Stocker le state dans le localStorage', 'Convertir le state en props'],
        answer: 1,
        explain: 'Remonter l\'etat consiste a placer la donnee partagee dans le plus proche parent commun, qui devient la source de verite distribuee via les props.'
      },
      {
        q: 'A quoi sert le Virtual DOM ?',
        options: ['A remplacer le navigateur', 'A comparer les rendus et minimiser les modifications du DOM reel', 'A stocker les donnees du serveur', 'A compiler le JSX'],
        answer: 1,
        explain: 'Le Virtual DOM est une representation en memoire que React compare entre deux rendus pour n\'appliquer au DOM reel que les differences.'
      }
    ],
    fillBlank: [
      {
        prompt: 'Declarer un state compteur initialise a 0.',
        code: 'const [count, ___] = useState(0);',
        answer: 'setCount',
        explain: 'useState retourne la valeur puis la fonction de mise a jour ; on la nomme par convention set + nom du state.'
      },
      {
        prompt: 'Executer un effet uniquement quand userId change.',
        code: 'useEffect(() => { charger(userId); }, [___]);',
        answer: 'userId',
        explain: 'Le tableau de dependances liste les valeurs surveillees ; l\'effet se rejoue quand l\'une d\'elles change.'
      },
      {
        prompt: 'Donner une identite unique a chaque element de liste.',
        code: 'items.map(it => <li ___={it.id}>{it.nom}</li>)',
        answer: 'key',
        explain: 'La prop key aide React a suivre chaque element lors de la reconciliation.'
      },
      {
        prompt: 'Lire la prop nom via destructuration.',
        code: 'function Salut({ ___ }) { return <p>{nom}</p>; }',
        answer: 'nom',
        explain: 'On destructure les props directement dans la signature du composant pour acceder aux valeurs passees par le parent.'
      },
      {
        prompt: 'Afficher une alerte seulement si erreur est verite.',
        code: '{erreur ___ <Alerte />}',
        answer: '&&',
        explain: 'L\'operateur && rend l\'element de droite uniquement si la condition de gauche est evaluee a vrai.'
      },
      {
        prompt: 'Brancher un gestionnaire de clic sur un bouton.',
        code: '<button ___={() => setOuvert(true)}>Ouvrir</button>',
        answer: 'onClick',
        explain: 'Les evenements en JSX utilisent le camelCase ; onClick recoit une fonction appelee lors du clic.'
      }
    ],
    bugHunt: [
      {
        code: 'function Compteur() {\n  let count = 0;\n  return <button onClick={() => count++}>{count}</button>;\n}',
        buggyLine: 2,
        explain: 'Une variable locale ne declenche pas de re-rendu : incrementer count ne met jamais a jour l\'affichage. Il faut utiliser useState.',
        fix: 'const [count, setCount] = useState(0); puis onClick={() => setCount(count + 1)}'
      },
      {
        code: 'function Liste({ items }) {\n  return items.map(it =>\n    <li>{it.nom}</li>\n  );\n}',
        buggyLine: 3,
        explain: 'Chaque element d\'une liste rendue par map doit avoir une prop key unique, sinon React avertit et la reconciliation est moins fiable.',
        fix: '<li key={it.id}>{it.nom}</li>'
      },
      {
        code: 'function Profil({ user }) {\n  if (user) {\n    const [open, setOpen] = useState(false);\n  }\n  return <div>{user?.nom}</div>;\n}',
        buggyLine: 3,
        explain: 'Un Hook ne doit jamais etre appele dans une condition : cela casse l\'ordre stable des Hooks entre les rendus.',
        fix: 'Appeler useState au niveau racine du composant, avant tout if.'
      },
      {
        code: 'function Timer() {\n  useEffect(() => {\n    setInterval(tick, 1000);\n  }, []);\n  return <p>...</p>;\n}',
        buggyLine: 3,
        explain: 'L\'intervalle n\'est jamais nettoye : a chaque montage il s\'accumule. L\'effet doit retourner une fonction de cleanup.',
        fix: 'const id = setInterval(tick, 1000); return () => clearInterval(id);'
      },
      {
        code: 'function Salut(props) {\n  props.nom = props.nom.toUpperCase();\n  return <p>{props.nom}</p>;\n}',
        buggyLine: 2,
        explain: 'Les props sont en lecture seule ; les muter est interdit et imprevisible. Il faut calculer une nouvelle valeur locale.',
        fix: 'const nomMaj = props.nom.toUpperCase(); return <p>{nomMaj}</p>;'
      }
    ],
    output: [
      {
        code: 'const [n, setN] = useState(0);\nsetN(n + 1);\nsetN(n + 1);\n// valeur de n affichee au prochain rendu',
        options: ['2', '1', '0'],
        answer: 1,
        explain: 'n vaut 0 dans cette portee ; les deux appels calculent 0 + 1, donc le state final est 1. Pour additionner, il faudrait setN(prev => prev + 1).'
      },
      {
        code: 'function App() {\n  return <h1>{2 + 3} points</h1>;\n}\n// texte rendu',
        options: ['{2 + 3} points', '5 points', '23 points'],
        answer: 1,
        explain: 'Les accolades evaluent l\'expression JavaScript : 2 + 3 vaut 5, donne 5 points.'
      },
      {
        code: 'const ok = false;\nrender(<>{ok && <p>Visible</p>}</>);\n// contenu rendu',
        options: ['<p>Visible</p>', 'false', 'rien'],
        answer: 2,
        explain: 'Avec && et une condition fausse, l\'expression vaut false, que React ne rend pas : rien n\'apparait.'
      },
      {
        code: 'const items = [\'a\', \'b\'];\nrender(items.map(x => <span>{x}</span>));\n// rendu visuel',
        options: ['ab', 'a b', '[a, b]'],
        answer: 0,
        explain: 'map produit deux span colles cote a cote, affichant ab (un avertissement de key sera emis en console).'
      },
      {
        code: 'function T({ on }) {\n  return on ? <p>ON</p> : <p>OFF</p>;\n}\nrender(<T on={true} />);\n// texte',
        options: ['OFF', 'ON', 'ON OFF'],
        answer: 1,
        explain: 'Le ternaire choisit la branche vraie car on vaut true, donc ON est affiche.'
      }
    ]
  }
});
