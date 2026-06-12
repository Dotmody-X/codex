/* ============================================================
   CODEX — Extension React (cours & référence)
   Greffe sur la fiche "react" déjà enregistrée.
   ============================================================ */
CODEX.extend('react', {
  course: [
    {
      title: 'Chapitre 1 — Composants & JSX',
      lessons: [
        {
          title: 'Le premier composant',
          body: "Un composant React est une fonction JavaScript qui retourne de la description d'interface. Son nom commence toujours par une majuscule, ce qui permet a React de le distinguer d'une balise HTML native. Ce qu'il retourne ressemble a du HTML mais s'appelle du JSX. Un composant est une brique reutilisable : on l'ecrit une fois, on l'utilise partout.",
          code: "function Bonjour() {\n  return <h1>Bonjour le monde</h1>;\n}",
          lang: 'jsx'
        },
        {
          title: 'Le JSX en profondeur',
          body: "Le JSX n'est pas du HTML : c'est du sucre syntaxique transforme en appels de fonction. On y injecte des expressions JavaScript en les entourant d'accolades. Certains attributs changent de nom car ils sont des mots reserves : class devient className et for devient htmlFor. Les balises sans contenu doivent etre auto-fermees, comme <img /> ou <br />.",
          code: "function Carte() {\n  const titre = \"Codex\";\n  return <div className=\"carte\">{titre.toUpperCase()}</div>;\n}",
          lang: 'jsx'
        },
        {
          title: 'Un seul element racine',
          body: "Un composant ne peut retourner qu'un seul element racine, car une fonction ne renvoie qu'une seule valeur. Pour grouper plusieurs elements sans ajouter de balise inutile dans le DOM, on utilise un Fragment. Le Fragment s'ecrit avec des chevrons vides ou avec React.Fragment. Cela garde le HTML propre tout en respectant la regle de l'element unique.",
          code: "function Profil() {\n  return (\n    <>\n      <h2>Nom</h2>\n      <p>Description</p>\n    </>\n  );\n}",
          lang: 'jsx'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Props & composition',
      lessons: [
        {
          title: 'Passer des props',
          body: "Les props sont les arguments d'un composant : elles transmettent des donnees du parent vers l'enfant. On les passe comme des attributs et on les recoit dans un objet, souvent decompose par destructuration. Les props sont en lecture seule : un composant ne doit jamais modifier celles qu'il recoit. Ce flux unidirectionnel, du haut vers le bas, rend l'application previsible.",
          code: "function Salutation({ nom }) {\n  return <p>Salut {nom} !</p>;\n}\n// usage : <Salutation nom=\"Nathan\" />",
          lang: 'jsx'
        },
        {
          title: 'La prop children',
          body: "La prop speciale children represente tout ce qui est place entre les balises ouvrante et fermante d'un composant. Elle permet de creer des composants conteneurs qui enveloppent un contenu arbitraire, comme une carte ou une mise en page. C'est la base de la composition : on assemble des composants comme des poupees russes. Cette approche est plus souple que l'heritage classique.",
          code: "function Cadre({ children }) {\n  return <div className=\"cadre\">{children}</div>;\n}\n// usage : <Cadre><p>Contenu</p></Cadre>",
          lang: 'jsx'
        },
        {
          title: 'Valeurs par defaut et composition',
          body: "On peut donner une valeur par defaut a une prop directement dans la destructuration. Cela rend un composant utilisable sans tout configurer a chaque appel. En combinant plusieurs petits composants, on construit des interfaces complexes a partir de blocs simples. Privilegier de nombreux petits composants specialises plutot qu'un gros composant monolithique.",
          code: "function Bouton({ libelle = \"Valider\", type = \"button\" }) {\n  return <button type={type}>{libelle}</button>;\n}",
          lang: 'jsx'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Etat & useState',
      lessons: [
        {
          title: 'Declarer un etat local',
          body: "L'etat est une donnee qui evolue dans le temps et que le composant doit memoriser entre les rendus. Le hook useState retourne un tableau de deux elements : la valeur actuelle et une fonction pour la mettre a jour. Appeler cette fonction declenche un nouveau rendu du composant avec la nouvelle valeur. Une variable ordinaire ne suffirait pas car elle serait reinitialisee a chaque rendu.",
          code: "function Compteur() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}",
          lang: 'jsx'
        },
        {
          title: 'Mises a jour fonctionnelles',
          body: "Quand la nouvelle valeur depend de la precedente, il faut passer une fonction au setter plutot qu'une valeur directe. React garantit alors de travailler sur l'etat le plus recent, ce qui evite les bugs lors de mises a jour groupees. Les mises a jour d'etat sont asynchrones : lire l'etat juste apres l'avoir change donne encore l'ancienne valeur. La forme fonctionnelle est la solution sure.",
          code: "function Compteur() {\n  const [n, setN] = useState(0);\n  const triple = () => {\n    setN(p => p + 1);\n    setN(p => p + 1);\n    setN(p => p + 1);\n  };\n  return <button onClick={triple}>{n}</button>;\n}",
          lang: 'jsx'
        },
        {
          title: 'Etat immuable : objets et tableaux',
          body: "On ne modifie jamais un objet ou un tableau d'etat directement : React compare les references pour decider de rerendre. Il faut donc creer une nouvelle copie, generalement avec l'operateur de decomposition. Pour un tableau, on utilise map, filter ou la concatenation plutot que push ou splice. Respecter l'immutabilite garde les rendus previsibles et performants.",
          code: "function Liste() {\n  const [items, setItems] = useState([\"a\"]);\n  const ajouter = () => setItems([...items, \"b\"]);\n  return <button onClick={ajouter}>{items.length}</button>;\n}",
          lang: 'jsx'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Effets & useEffect',
      lessons: [
        {
          title: 'Synchroniser avec l\'exterieur',
          body: "useEffect sert a executer du code apres le rendu pour synchroniser le composant avec le monde exterieur : requetes reseau, abonnements, manipulation du DOM. La fonction passee s'execute apres que React a peint l'ecran. C'est le bon endroit pour les effets de bord qui ne doivent pas se produire pendant le rendu. Un effet n'est pas une simple reaction a un clic, c'est une synchronisation.",
          code: "function Titre({ texte }) {\n  useEffect(() => {\n    document.title = texte;\n  });\n  return <h1>{texte}</h1>;\n}",
          lang: 'jsx'
        },
        {
          title: 'Le tableau de dependances',
          body: "Le second argument de useEffect controle quand l'effet se relance. Un tableau vide signifie une seule execution, apres le premier rendu. Lister des valeurs declenche l'effet uniquement quand l'une d'elles change. Omettre le tableau relance l'effet a chaque rendu, ce qui est rarement souhaite. Chaque valeur lue dans l'effet devrait figurer dans les dependances.",
          code: "function Profil({ id }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(\"/api/user/\" + id).then(r => r.json()).then(setData);\n  }, [id]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}",
          lang: 'jsx'
        },
        {
          title: 'La fonction de nettoyage',
          body: "Un effet peut retourner une fonction de nettoyage que React appelle avant de relancer l'effet et au demontage du composant. Elle sert a annuler les abonnements, vider les minuteurs ou fermer les connexions. Sans nettoyage, on accumule des fuites memoire et des comportements doublons. C'est ce qui rend les effets surs face aux changements de dependances.",
          code: "function Horloge() {\n  const [t, setT] = useState(Date.now());\n  useEffect(() => {\n    const id = setInterval(() => setT(Date.now()), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <span>{t}</span>;\n}",
          lang: 'jsx'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Hooks avances',
      lessons: [
        {
          title: 'useContext : partager sans forer',
          body: "Le contexte permet de partager des donnees a travers l'arbre sans passer les props manuellement a chaque niveau. On cree un contexte, on fournit une valeur avec un Provider, puis on la lit avec useContext n'importe ou en dessous. C'est ideal pour le theme, la langue ou l'utilisateur connecte. A reserver aux donnees vraiment globales pour eviter les rerendus inutiles.",
          code: "const Theme = createContext(\"clair\");\nfunction Bouton() {\n  const theme = useContext(Theme);\n  return <button className={theme}>OK</button>;\n}",
          lang: 'jsx'
        },
        {
          title: 'useRef : garder une reference',
          body: "useRef cree un conteneur mutable dont la valeur survit aux rendus sans en declencher. On l'utilise pour acceder a un noeud du DOM via l'attribut ref, par exemple pour donner le focus a un champ. On s'en sert aussi pour stocker une valeur persistante hors de l'etat, comme un identifiant de minuteur. Modifier .current ne provoque jamais de nouveau rendu.",
          code: "function Champ() {\n  const ref = useRef(null);\n  return (\n    <>\n      <input ref={ref} />\n      <button onClick={() => ref.current.focus()}>Focus</button>\n    </>\n  );\n}",
          lang: 'jsx'
        },
        {
          title: 'useMemo & useCallback : memoriser',
          body: "useMemo memorise le resultat d'un calcul couteux et ne le recalcule que si ses dependances changent. useCallback fait la meme chose pour une fonction, en preservant son identite entre les rendus. Cela evite de refaire un travail lourd ou de casser la memoisation d'un composant enfant. A n'utiliser que lorsqu'un reel probleme de performance est mesure, pas par reflexe.",
          code: "function Liste({ data, n }) {\n  const filtre = useMemo(() => data.filter(x => x > n), [data, n]);\n  const onClick = useCallback(() => console.log(n), [n]);\n  return <ul onClick={onClick}>{filtre.length}</ul>;\n}",
          lang: 'jsx'
        },
        {
          title: 'useReducer : etat structure',
          body: "useReducer gere un etat complexe via une fonction reducer qui recoit l'etat courant et une action, et renvoie le nouvel etat. On declenche les changements en envoyant des actions avec dispatch. Cette approche centralise la logique de transition et la rend testable independamment de l'interface. Elle brille quand plusieurs valeurs evoluent ensemble ou suivent des regles complexes.",
          code: "function reducer(s, a) {\n  if (a.type === \"inc\") return { n: s.n + 1 };\n  return s;\n}\nfunction Compteur() {\n  const [s, dispatch] = useReducer(reducer, { n: 0 });\n  return <button onClick={() => dispatch({ type: \"inc\" })}>{s.n}</button>;\n}",
          lang: 'jsx'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Formulaires, listes & patterns',
      lessons: [
        {
          title: 'Rendre des listes avec key',
          body: "Pour afficher une collection, on transforme un tableau en elements avec map. Chaque element rendu doit porter une prop key unique et stable, afin que React identifie precisement quel element a change, ete ajoute ou supprime. On evite l'index du tableau comme key des que la liste peut etre reordonnee. Une bonne key vient des donnees, comme un identifiant.",
          code: "function Menu({ plats }) {\n  return (\n    <ul>\n      {plats.map(p => <li key={p.id}>{p.nom}</li>)}\n    </ul>\n  );\n}",
          lang: 'jsx'
        },
        {
          title: 'Formulaires controles',
          body: "Dans un formulaire controle, la valeur de chaque champ est pilotee par l'etat React. On lie l'attribut value a une variable d'etat et on met a jour cet etat dans le gestionnaire onChange. React devient ainsi la source unique de verite pour la saisie. Cela permet de valider, formater ou desactiver dynamiquement les champs en temps reel.",
          code: "function Recherche() {\n  const [q, setQ] = useState(\"\");\n  return (\n    <input value={q} onChange={e => setQ(e.target.value)} />\n  );\n}",
          lang: 'jsx'
        },
        {
          title: 'Rendu conditionnel',
          body: "Afficher un contenu selon une condition se fait avec les outils JavaScript habituels. L'operateur logique && rend un element seulement si la condition est vraie. L'operateur ternaire choisit entre deux rendus. Attention au && avec un nombre comme 0, qui s'affiche au lieu de rien : convertir explicitement en booleen evite ce piege courant.",
          code: "function Statut({ connecte }) {\n  return (\n    <div>\n      {connecte ? <p>Bienvenue</p> : <p>Veuillez vous connecter</p>}\n    </div>\n  );\n}",
          lang: 'jsx'
        },
        {
          title: 'Lever l\'etat (lifting state up)',
          body: "Quand deux composants doivent partager une donnee, on remonte l'etat dans leur parent commun le plus proche. Le parent detient l'etat et le distribue via les props, avec des callbacks pour le modifier. Ce pattern garde une source de verite unique et synchronise les enfants automatiquement. C'est la reponse idiomatique a la plupart des besoins de coordination.",
          code: "function Parent() {\n  const [v, setV] = useState(\"\");\n  return (\n    <>\n      <Champ valeur={v} onChange={setV} />\n      <Apercu valeur={v} />\n    </>\n  );\n}",
          lang: 'jsx'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Hooks d\'etat (useState, useReducer)',
      items: [
        { name: 'useState', syntax: 'const [s, setS] = useState(init)', desc: "Declare une variable d'etat local et renvoie sa valeur ainsi qu'une fonction pour la modifier." },
        { name: 'setState (valeur)', syntax: 'setS(nouvelleValeur)', desc: "Remplace l'etat par une nouvelle valeur et programme un rerendu du composant." },
        { name: 'setState (fonction)', syntax: 'setS(prev => prev + 1)', desc: "Calcule le nouvel etat a partir du precedent, sur garanti pour les mises a jour successives." },
        { name: 'Initialiseur paresseux', syntax: 'useState(() => calculLourd())', desc: "Passe une fonction pour ne calculer l'etat initial qu'au premier rendu." },
        { name: 'useReducer', syntax: 'const [s, dispatch] = useReducer(reducer, init)', desc: "Gere un etat complexe via une fonction reducer pure et des actions." },
        { name: 'dispatch', syntax: 'dispatch({ type: \"add\", payload })', desc: "Envoie une action au reducer pour declencher une transition d'etat." },
        { name: 'reducer', syntax: 'function reducer(state, action) { ... }', desc: "Fonction pure qui prend l'etat et une action, et retourne le nouvel etat." },
        { name: 'Init paresseuse (reducer)', syntax: 'useReducer(reducer, arg, initFn)', desc: "Troisieme argument optionnel pour calculer l'etat initial a partir de arg." }
      ]
    },
    {
      group: 'Hooks d\'effet (useEffect, useLayoutEffect)',
      items: [
        { name: 'useEffect', syntax: 'useEffect(() => { ... }, [deps])', desc: "Execute un effet de bord apres le rendu pour synchroniser avec l'exterieur." },
        { name: 'Nettoyage', syntax: 'useEffect(() => { ...; return () => {...}; })', desc: "La fonction retournee nettoie l'effet avant relance et au demontage." },
        { name: 'Au montage', syntax: 'useEffect(() => {...}, [])', desc: "Un tableau vide n'execute l'effet qu'une fois, apres le premier rendu." },
        { name: 'A chaque rendu', syntax: 'useEffect(() => {...})', desc: "Sans tableau de dependances, l'effet se relance apres chaque rendu." },
        { name: 'Sur changement', syntax: 'useEffect(() => {...}, [id])', desc: "L'effet ne se relance que lorsqu'une dependance listee change." },
        { name: 'useLayoutEffect', syntax: 'useLayoutEffect(() => {...}, [deps])', desc: "Comme useEffect mais s'execute de maniere synchrone avant le paint, pour mesurer le DOM." },
        { name: 'useInsertionEffect', syntax: 'useInsertionEffect(() => {...}, [deps])', desc: "Effet declenche avant les mutations, reserve aux librairies de CSS-in-JS." }
      ]
    },
    {
      group: 'Hooks de contexte & ref (useContext, useRef)',
      items: [
        { name: 'createContext', syntax: 'const Ctx = createContext(defaut)', desc: "Cree un objet contexte avec une valeur par defaut." },
        { name: 'Provider', syntax: '<Ctx.Provider value={v}>...</Ctx.Provider>', desc: "Fournit une valeur de contexte a tous les composants descendants." },
        { name: 'useContext', syntax: 'const v = useContext(Ctx)', desc: "Lit la valeur du contexte la plus proche dans l'arbre." },
        { name: 'useRef', syntax: 'const ref = useRef(init)', desc: "Cree un conteneur mutable persistant entre rendus, sans declencher de rerendu." },
        { name: 'Ref DOM', syntax: '<input ref={ref} />', desc: "Attache une ref a un noeud du DOM, accessible via ref.current." },
        { name: 'ref.current', syntax: 'ref.current = valeur', desc: "Lit ou ecrit la valeur stockee dans la ref sans provoquer de rendu." },
        { name: 'forwardRef', syntax: 'forwardRef((props, ref) => ...)', desc: "Permet de transmettre une ref a travers un composant vers un enfant." },
        { name: 'useImperativeHandle', syntax: 'useImperativeHandle(ref, () => ({...}))', desc: "Personnalise la valeur exposee par une ref a un composant parent." }
      ]
    },
    {
      group: 'Hooks de performance (useMemo, useCallback)',
      items: [
        { name: 'useMemo', syntax: 'const v = useMemo(() => calc(a), [a])', desc: "Memorise le resultat d'un calcul et ne le refait que si une dependance change." },
        { name: 'useCallback', syntax: 'const f = useCallback(() => {...}, [deps])', desc: "Memorise une fonction pour preserver son identite entre les rendus." },
        { name: 'React.memo', syntax: 'const C = React.memo(Composant)', desc: "Evite de rerendre un composant si ses props n'ont pas change." },
        { name: 'useDeferredValue', syntax: 'const def = useDeferredValue(valeur)', desc: "Differe la mise a jour d'une valeur pour garder l'interface reactive." },
        { name: 'useTransition', syntax: 'const [pending, startTransition] = useTransition()', desc: "Marque des mises a jour comme non urgentes pour ne pas bloquer l'interface." },
        { name: 'startTransition', syntax: 'startTransition(() => setEtat(x))', desc: "Englobe une mise a jour d'etat traitee en arriere-plan, sans priorite." }
      ]
    },
    {
      group: 'Regles & syntaxe JSX',
      items: [
        { name: 'Element racine', syntax: 'return <div>...</div>', desc: "Un composant ne peut retourner qu'un seul element racine." },
        { name: 'Fragment', syntax: '<>...</>', desc: "Groupe plusieurs elements sans ajouter de noeud dans le DOM." },
        { name: 'Expression', syntax: '{ maVariable }', desc: "Les accolades injectent une expression JavaScript dans le JSX." },
        { name: 'className', syntax: '<div className=\"x\">', desc: "Remplace l'attribut HTML class, car class est un mot reserve en JS." },
        { name: 'htmlFor', syntax: '<label htmlFor=\"id\">', desc: "Remplace l'attribut for d'un label dans le JSX." },
        { name: 'Auto-fermeture', syntax: '<img src=\"a.png\" />', desc: "Les balises sans enfant doivent etre auto-fermees par /. " },
        { name: 'Style en objet', syntax: 'style={{ color: \"red\" }}', desc: "L'attribut style attend un objet avec des proprietes en camelCase." },
        { name: 'Commentaire JSX', syntax: '{/* commentaire */}', desc: "Les commentaires dans le JSX s'ecrivent entre accolades." },
        { name: 'Casse des composants', syntax: '<MonComposant />', desc: "Un composant commence par une majuscule, une balise native par une minuscule." }
      ]
    },
    {
      group: 'Props & children',
      items: [
        { name: 'Passer une prop', syntax: '<C nom=\"Nathan\" />', desc: "Transmet une donnee du parent vers l'enfant comme un attribut." },
        { name: 'Prop expression', syntax: '<C age={30} actif={true} />', desc: "Les accolades passent des valeurs non textuelles : nombres, booleens, objets." },
        { name: 'Destructuration', syntax: 'function C({ nom, age }) {...}', desc: "Extrait les props nommees directement dans la signature du composant." },
        { name: 'Valeur par defaut', syntax: 'function C({ n = \"X\" }) {...}', desc: "Donne une valeur de repli a une prop absente." },
        { name: 'children', syntax: 'function C({ children }) {...}', desc: "Recoit le contenu place entre les balises du composant." },
        { name: 'Spread de props', syntax: '<C {...props} />', desc: "Transmet en bloc toutes les proprietes d'un objet comme props." },
        { name: 'Props en lecture seule', syntax: '// ne jamais muter props', desc: "Un composant ne doit jamais modifier les props qu'il recoit." },
        { name: 'Prop fonction', syntax: '<C onAction={maFonction} />', desc: "Passe une fonction de rappel pour communiquer de l'enfant vers le parent." }
      ]
    },
    {
      group: 'Rendu de listes & keys',
      items: [
        { name: 'map sur tableau', syntax: '{items.map(i => <li>{i}</li>)}', desc: "Transforme un tableau de donnees en liste d'elements JSX." },
        { name: 'Prop key', syntax: '<li key={i.id}>{i.nom}</li>', desc: "Identifie chaque element pour un rendu efficace et correct." },
        { name: 'Key stable', syntax: 'key={item.id}', desc: "Utiliser un identifiant unique et stable issu des donnees." },
        { name: 'Eviter l\'index', syntax: '// key={index} a eviter', desc: "L'index pose probleme des que la liste peut etre reordonnee ou filtree." },
        { name: 'filter + map', syntax: '{data.filter(f).map(m)}', desc: "Filtre puis projette les donnees avant de les rendre." },
        { name: 'Liste vide', syntax: '{items.length === 0 && <p>Vide</p>}', desc: "Affiche un message de repli quand la collection est vide." },
        { name: 'Fragment avec key', syntax: '<Fragment key={id}>...</Fragment>', desc: "Permet de poser une key sur un fragment dans une liste." }
      ]
    },
    {
      group: 'Rendu conditionnel',
      items: [
        { name: 'Ternaire', syntax: '{cond ? <A /> : <B />}', desc: "Choisit entre deux rendus selon une condition." },
        { name: 'ET logique', syntax: '{cond && <A />}', desc: "Rend l'element seulement si la condition est vraie." },
        { name: 'Court-circuit 0', syntax: '{!!liste.length && <A />}', desc: "Convertir en booleen evite d'afficher un 0 indesirable avec &&." },
        { name: 'Retour null', syntax: 'if (!data) return null;', desc: "Retourner null ne rend rien tout en restant un composant valide." },
        { name: 'Variable d\'element', syntax: 'let c; if (x) c = <A />;', desc: "Stocker un element dans une variable pour clarifier une logique complexe." },
        { name: 'Ou logique (repli)', syntax: '{nom || \"Anonyme\"}', desc: "Affiche une valeur de repli quand la valeur est absente." }
      ]
    },
    {
      group: 'Gestion d\'evenements',
      items: [
        { name: 'onClick', syntax: '<button onClick={f}>', desc: "Attache un gestionnaire au clic, en passant la reference de la fonction." },
        { name: 'Handler en ligne', syntax: 'onClick={() => setN(n + 1)}', desc: "Une fleche permet de passer des arguments ou plusieurs instructions." },
        { name: 'Objet evenement', syntax: 'onClick={e => console.log(e)}', desc: "React fournit un evenement synthetique compatible entre navigateurs." },
        { name: 'preventDefault', syntax: 'e.preventDefault()', desc: "Annule le comportement par defaut, par exemple le rechargement d'un formulaire." },
        { name: 'stopPropagation', syntax: 'e.stopPropagation()', desc: "Empeche l'evenement de remonter aux elements parents." },
        { name: 'onChange', syntax: '<input onChange={f} />', desc: "Reagit a chaque modification de la valeur d'un champ." },
        { name: 'onSubmit', syntax: '<form onSubmit={f}>', desc: "Gere l'envoi d'un formulaire, generalement avec preventDefault." },
        { name: 'Casse camelCase', syntax: 'onMouseEnter, onKeyDown', desc: "Les noms d'evenements en JSX s'ecrivent en camelCase." }
      ]
    },
    {
      group: 'Formulaires controles',
      items: [
        { name: 'Champ controle', syntax: '<input value={v} onChange={...} />', desc: "Lie la valeur du champ a l'etat React, source unique de verite." },
        { name: 'Lecture de saisie', syntax: 'onChange={e => setV(e.target.value)}', desc: "Met a jour l'etat avec la valeur courante du champ." },
        { name: 'textarea', syntax: '<textarea value={v} onChange={...} />', desc: "En React, le texte d'une zone se gere via l'attribut value." },
        { name: 'select', syntax: '<select value={v} onChange={...}>', desc: "La valeur selectionnee est pilotee par value sur la balise select." },
        { name: 'Case a cocher', syntax: '<input type=\"checkbox\" checked={b} />', desc: "Une case utilise checked plutot que value pour son etat." },
        { name: 'Champ non controle', syntax: '<input ref={ref} defaultValue=\"x\" />', desc: "Le DOM detient la valeur, lue via une ref au moment voulu." },
        { name: 'Soumission', syntax: 'onSubmit={e => { e.preventDefault(); ... }}', desc: "Empeche le rechargement puis traite les donnees du formulaire." },
        { name: 'Champ desactive', syntax: '<button disabled={!valide}>', desc: "Conditionne l'activation d'un champ ou bouton a l'etat du formulaire." }
      ]
    }
  ]
});
