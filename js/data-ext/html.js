CODEX.extend('html', {
  course: [
    {
      title: 'Chapitre 1 — Les fondations du Web',
      lessons: [
        {
          title: "Qu'est-ce que HTML",
          body: "HTML (HyperText Markup Language) est le langage de balisage qui structure le contenu de toute page web. Ce n est pas un langage de programmation : il ne calcule rien, il decrit. Pensez-y comme au squelette d un corps : HTML pose les os (la structure), CSS habille (le style) et JavaScript fait bouger (le comportement). Une balise entoure du contenu avec des chevrons, comme une etiquette qui dit au navigateur de quoi il s agit. Comprendre HTML, c est apprendre a nommer correctement chaque morceau d information.",
          code: '<p>Bonjour le Web</p>',
          lang: 'html'
        },
        {
          title: 'Anatomie d une balise',
          body: "La plupart des balises vont par paire : une balise ouvrante et une balise fermante qui encadrent un contenu. La balise fermante se distingue par une barre oblique. Certaines balises, dites auto-fermantes ou vides, n encadrent rien et existent seules, comme une image ou un saut de ligne. Les attributs, places dans la balise ouvrante, ajoutent des informations sous la forme nom egal valeur entre guillemets. Bien lire une balise, c est savoir reconnaitre son nom, ses attributs et son contenu.",
          code: '<a href="https://exemple.fr">Un lien</a>\n<img src="photo.jpg" alt="Description">',
          lang: 'html'
        },
        {
          title: 'Le squelette d un document',
          body: "Tout document HTML valide suit une ossature standard. La toute premiere ligne, le doctype, indique au navigateur d utiliser le standard moderne. L element racine html contient deux enfants : head, qui regroupe les informations invisibles destinees au navigateur, et body, qui contient tout ce que l utilisateur voit. L attribut lang sur la balise html precise la langue principale, ce qui aide les moteurs de recherche et les lecteurs d ecran. Memoriser ce squelette est le point de depart de toute page.",
          code: '<!DOCTYPE html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8">\n    <title>Ma page</title>\n  </head>\n  <body>\n    <h1>Titre principal</h1>\n  </body>\n</html>',
          lang: 'html'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Structurer le texte',
      lessons: [
        {
          title: 'Titres et hierarchie',
          body: "Les six niveaux de titres, de h1 a h6, organisent le contenu comme la table des matieres d un livre. Le h1 est le titre principal et il ne devrait y en avoir qu un seul par page. Les niveaux suivants creent des sous-sections imbriquees : on ne saute jamais un niveau, on descend marche par marche. Cette hierarchie n est pas decorative : les lecteurs d ecran et Google s en servent pour comprendre la structure. Choisissez le niveau selon le sens, pas selon la taille du texte affiche.",
          code: '<h1>La cuisine italienne</h1>\n<h2>Les pates</h2>\n<h3>La carbonara</h3>',
          lang: 'html'
        },
        {
          title: 'Paragraphes et mise en forme du sens',
          body: "Le paragraphe, balise p, est l unite de base d un bloc de texte. Pour donner du sens a certains mots, HTML distingue le fond de la forme : strong marque une importance forte, em une emphase, et le navigateur les affiche souvent en gras et italique. Evitez b et i seuls quand le sens compte : preferez les balises semantiques qui expliquent pourquoi un mot ressort. Le saut de ligne br force un retour a la ligne, utile dans une adresse ou un poeme, mais jamais pour espacer artificiellement.",
          code: '<p>Ce projet est <strong>essentiel</strong> et <em>urgent</em>.</p>',
          lang: 'html'
        },
        {
          title: 'Citations, code et abreviations',
          body: "HTML offre des balises specialisees pour des contenus precis. blockquote met en avant une longue citation, tandis que q gere une citation courte en ligne. La balise code affiche du texte en police monospace pour representer du code informatique, et pre conserve les espaces et retours a la ligne tels quels. abbr explicite une abreviation au survol grace a son attribut title. Utiliser la bonne balise rend le contenu plus accessible et plus facile a styler.",
          code: '<blockquote>Le code est lu plus souvent qu il n est ecrit.</blockquote>\n<p>Le <abbr title="HyperText Markup Language">HTML</abbr> structure le Web.</p>',
          lang: 'html'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Liens, listes et navigation',
      lessons: [
        {
          title: 'Les liens hypertextes',
          body: "Le lien, balise a, est l ame du Web : il relie les pages entre elles. Son attribut href indique la destination, qui peut etre une URL complete, un chemin relatif vers une autre page, ou une ancre vers une section de la meme page avec un diese. L attribut target avec la valeur _blank ouvre le lien dans un nouvel onglet, qu il faut accompagner de rel egal noopener pour la securite. Un bon texte de lien decrit la destination plutot que de dire cliquez ici. Le lien peut aussi declencher un courriel avec mailto ou un appel avec tel.",
          code: '<a href="contact.html">Nous contacter</a>\n<a href="https://exemple.fr" target="_blank" rel="noopener">Site externe</a>',
          lang: 'html'
        },
        {
          title: 'Listes ordonnees et non ordonnees',
          body: "HTML propose trois types de listes. La liste non ordonnee ul affiche des puces et convient quand l ordre n a pas d importance, comme une liste de courses. La liste ordonnee ol numerote automatiquement les elements et sert quand la sequence compte, comme une recette. Chaque element de ces deux listes est un li. La liste de definitions dl associe des termes dt a leurs descriptions dd, parfaite pour un glossaire. Les listes peuvent s imbriquer pour creer des sous-niveaux.",
          code: '<ul>\n  <li>Pommes</li>\n  <li>Pain</li>\n</ul>\n<ol>\n  <li>Prechauffer le four</li>\n  <li>Enfourner</li>\n</ol>',
          lang: 'html'
        },
        {
          title: 'La navigation du site',
          body: "La balise nav regroupe les liens principaux de navigation d un site, comme le menu d en-tete ou un fil d Ariane. L entourer d une vraie balise semantique aide les technologies d assistance a proposer un raccourci direct vers le menu. Une bonne pratique consiste a placer une liste ul de liens a l interieur du nav pour structurer le menu. Tous les groupes de liens ne meritent pas un nav : reservez-le aux blocs de navigation majeurs. Cela clarifie l intention de votre page.",
          code: '<nav>\n  <ul>\n    <li><a href="/">Accueil</a></li>\n    <li><a href="/blog">Blog</a></li>\n  </ul>\n</nav>',
          lang: 'html'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Images, media et tableaux',
      lessons: [
        {
          title: 'Inserer des images',
          body: "La balise img affiche une image grace a son attribut src qui pointe vers le fichier. L attribut alt est obligatoire : il decrit l image pour les personnes malvoyantes et s affiche si l image ne charge pas. Une image purement decorative peut avoir un alt vide, mais l attribut doit rester present. Les attributs width et height reservent l espace et evitent les sauts de mise en page au chargement. La balise figure associe une image a sa legende figcaption pour un contenu autonome.",
          code: '<figure>\n  <img src="chat.jpg" alt="Un chat roux endormi" width="400" height="300">\n  <figcaption>Mon chat Felix</figcaption>\n</figure>',
          lang: 'html'
        },
        {
          title: 'Audio et video',
          body: "Les balises audio et video integrent du son et de la video sans plugin. L attribut controls affiche les boutons de lecture, pause et volume. On peut fournir plusieurs formats via des balises source enfants : le navigateur choisit le premier qu il sait lire, ce qui ameliore la compatibilite. Les attributs autoplay, loop et muted ajustent le comportement, mais l autoplay sonore est souvent bloque par les navigateurs. Un texte de repli entre les balises s affiche pour les anciens navigateurs.",
          code: '<video controls width="500">\n  <source src="film.mp4" type="video/mp4">\n  <source src="film.webm" type="video/webm">\n  Votre navigateur ne lit pas la video.\n</video>',
          lang: 'html'
        },
        {
          title: 'Les tableaux de donnees',
          body: "Un tableau, balise table, organise des donnees en lignes et colonnes. Chaque ligne est un tr, chaque cellule de donnees un td et chaque cellule d en-tete un th. Regrouper les en-tetes dans thead et les donnees dans tbody clarifie la structure et facilite le style. Les attributs colspan et rowspan permettent a une cellule de s etendre sur plusieurs colonnes ou lignes. Important : les tableaux servent a presenter des donnees, jamais a faire la mise en page d une page, role devolu au CSS.",
          code: '<table>\n  <thead>\n    <tr><th>Nom</th><th>Age</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>30</td></tr>\n  </tbody>\n</table>',
          lang: 'html'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Formulaires et saisie',
      lessons: [
        {
          title: 'Le formulaire et ses champs',
          body: "Le formulaire, balise form, collecte des donnees de l utilisateur. Son attribut action indique l URL qui traitera les donnees, et method precise comment les envoyer : get pour des recherches, post pour des donnees sensibles ou modifiantes. Le champ de saisie input est polyvalent : son attribut type change tout, de text a email, password, number, date, checkbox ou radio. L attribut name est indispensable car il identifie chaque donnee cote serveur. Sans name, un champ n est tout simplement pas envoye.",
          code: '<form action="/inscription" method="post">\n  <input type="email" name="courriel" required>\n  <button type="submit">Envoyer</button>\n</form>',
          lang: 'html'
        },
        {
          title: 'Etiquettes et accessibilite des champs',
          body: "Chaque champ merite une etiquette label qui le decrit. En liant le for du label au id du champ, on cree une association : cliquer sur l etiquette active le champ, et les lecteurs d ecran annoncent correctement le role. L attribut placeholder donne un exemple a l interieur du champ mais ne remplace jamais une etiquette. Les attributs required, minlength ou pattern permettent une validation native sans une ligne de JavaScript. Un formulaire accessible est un formulaire utilisable par tous, y compris au clavier.",
          code: '<label for="nom">Votre nom</label>\n<input type="text" id="nom" name="nom" required>',
          lang: 'html'
        },
        {
          title: 'Listes deroulantes et zones de texte',
          body: "Pour un choix parmi plusieurs options, la balise select cree une liste deroulante ou chaque option est une balise option avec une valeur. On peut grouper les options avec optgroup pour plus de clarte. La balise textarea offre une zone de saisie sur plusieurs lignes, ideale pour un message ou un commentaire, et ses dimensions se reglent avec rows et cols. fieldset regroupe des champs lies et legend lui donne un titre, ce qui structure les longs formulaires. Ces elements rendent la saisie plus naturelle.",
          code: '<select name="pays">\n  <option value="fr">France</option>\n  <option value="be">Belgique</option>\n</select>\n<textarea name="message" rows="4"></textarea>',
          lang: 'html'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Semantique, accessibilite et SEO',
      lessons: [
        {
          title: 'Le HTML semantique',
          body: "Le HTML semantique consiste a choisir des balises qui decrivent le sens du contenu plutot que de tout enfermer dans des div anonymes. header pour l en-tete, main pour le contenu principal, article pour un contenu autonome, section pour un regroupement thematique, aside pour un contenu annexe et footer pour le pied de page. Pensez a votre page comme a un journal : chaque zone a un role identifiable. Cette clarte profite aux moteurs de recherche, aux lecteurs d ecran et aux developpeurs qui reliront le code.",
          code: '<header>...</header>\n<main>\n  <article>\n    <section>...</section>\n  </article>\n  <aside>...</aside>\n</main>\n<footer>...</footer>',
          lang: 'html'
        },
        {
          title: 'L accessibilite avec ARIA',
          body: "L accessibilite rend le Web utilisable par les personnes en situation de handicap. La premiere regle est d utiliser le bon element natif : un bouton button plutot qu une div cliquable. Quand le HTML natif ne suffit pas, les attributs ARIA comblent le manque : aria-label nomme un element sans texte visible, aria-hidden cache un decor aux lecteurs d ecran, et role precise la fonction d un element. L attribut tabindex gere l ordre de navigation au clavier. Une regle d or : pas d ARIA vaut mieux qu un mauvais ARIA.",
          code: '<button aria-label="Fermer la fenetre">X</button>\n<span aria-hidden="true">decoratif</span>',
          lang: 'html'
        },
        {
          title: 'Metadonnees et referencement',
          body: "Le head contient des metadonnees qui ne s affichent pas mais pesent lourd. La balise title definit le titre de l onglet et le lien bleu dans Google : c est le facteur SEO le plus visible. La meta description resume la page sous ce lien et incite au clic. La meta viewport rend le site responsive sur mobile, condition indispensable aujourd hui. Les balises Open Graph, prefixees og, controlent l apercu lors d un partage sur les reseaux sociaux. Soigner le head, c est soigner la premiere impression de votre page.",
          code: '<title>Recette de carbonara authentique</title>\n<meta name="description" content="La vraie carbonara en 15 minutes.">\n<meta name="viewport" content="width=device-width, initial-scale=1">',
          lang: 'html'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Structure du document',
      items: [
        { name: '<!DOCTYPE>', syntax: '<!DOCTYPE html>', desc: "Declaration en tete de fichier qui active le mode standard moderne du navigateur." },
        { name: '<html>', syntax: '<html lang="fr">...</html>', desc: "Element racine qui englobe toute la page ; son attribut lang precise la langue principale." },
        { name: '<head>', syntax: '<head>...</head>', desc: "Conteneur des metadonnees invisibles destinees au navigateur et aux moteurs de recherche." },
        { name: '<body>', syntax: '<body>...</body>', desc: "Contient tout le contenu visible affiche a l utilisateur dans la fenetre." },
        { name: '<div>', syntax: '<div class="boite">...</div>', desc: "Conteneur generique de type bloc, sans signification, utilise surtout pour la mise en page." },
        { name: '<span>', syntax: '<span>texte</span>', desc: "Conteneur generique en ligne, sans signification, pour cibler une portion de texte." },
        { name: '<template>', syntax: '<template>...</template>', desc: "Fragment de HTML inerte non rendu, cloné par JavaScript pour generer du contenu." },
        { name: '<slot>', syntax: '<slot name="titre"></slot>', desc: "Emplacement reservé dans un composant web pour y injecter du contenu externe." }
      ]
    },
    {
      group: 'Metadonnees (head)',
      items: [
        { name: '<title>', syntax: '<title>Ma page</title>', desc: "Definit le titre de l onglet et le titre affiche dans les resultats de recherche." },
        { name: '<meta charset>', syntax: '<meta charset="UTF-8">', desc: "Declare l encodage des caracteres ; UTF-8 assure l affichage correct des accents." },
        { name: '<meta viewport>', syntax: '<meta name="viewport" content="width=device-width, initial-scale=1">', desc: "Rend la page responsive en adaptant la largeur a l ecran de l appareil." },
        { name: '<meta description>', syntax: '<meta name="description" content="...">', desc: "Fournit le resume affiche sous le lien dans les resultats des moteurs de recherche." },
        { name: '<meta og>', syntax: '<meta property="og:title" content="...">', desc: "Balise Open Graph qui controle l apercu lors d un partage sur les reseaux sociaux." },
        { name: '<link>', syntax: '<link rel="stylesheet" href="style.css">', desc: "Relie une ressource externe a la page, le plus souvent une feuille de style CSS ou une favicon." },
        { name: '<base>', syntax: '<base href="https://exemple.fr/">', desc: "Definit l URL de base utilisee pour resoudre tous les liens relatifs de la page." },
        { name: '<style>', syntax: '<style>p { color: red; }</style>', desc: "Integre des regles CSS directement dans le document, sans fichier externe." }
      ]
    },
    {
      group: 'Sections semantiques',
      items: [
        { name: '<header>', syntax: '<header>...</header>', desc: "Zone d introduction d une page ou d une section, contenant souvent logo et navigation." },
        { name: '<nav>', syntax: '<nav>...</nav>', desc: "Regroupe les principaux liens de navigation du site ou de la page." },
        { name: '<main>', syntax: '<main>...</main>', desc: "Contient le contenu principal et unique de la page, hors en-tetes et pieds repetes." },
        { name: '<article>', syntax: '<article>...</article>', desc: "Contenu autonome et redistribuable, comme un billet de blog ou une fiche produit." },
        { name: '<section>', syntax: '<section>...</section>', desc: "Regroupement thematique de contenu, generalement introduit par un titre." },
        { name: '<aside>', syntax: '<aside>...</aside>', desc: "Contenu annexe lie de loin au contenu principal, comme un encadre ou une barre laterale." },
        { name: '<footer>', syntax: '<footer>...</footer>', desc: "Pied de page ou de section, contenant mentions legales, auteur ou liens secondaires." },
        { name: '<address>', syntax: '<address>...</address>', desc: "Indique les coordonnees de contact de l auteur d un article ou du site." }
      ]
    },
    {
      group: 'Texte & contenu',
      items: [
        { name: '<h1>...<h6>', syntax: '<h1>Titre</h1>', desc: "Six niveaux de titres qui etablissent la hierarchie du document, h1 etant le plus important." },
        { name: '<p>', syntax: '<p>Un paragraphe.</p>', desc: "Definit un paragraphe, l unite de base d un bloc de texte." },
        { name: '<strong>', syntax: '<strong>important</strong>', desc: "Marque un texte d une importance forte, affiche en gras par defaut." },
        { name: '<em>', syntax: '<em>insiste</em>', desc: "Met l accent sur un texte avec une emphase, affiche en italique par defaut." },
        { name: '<br>', syntax: '<br>', desc: "Force un retour a la ligne au sein d un texte, comme dans une adresse." },
        { name: '<hr>', syntax: '<hr>', desc: "Trace une separation thematique horizontale entre deux parties du contenu." },
        { name: '<blockquote>', syntax: '<blockquote>...</blockquote>', desc: "Met en avant une longue citation provenant d une autre source." },
        { name: '<q>', syntax: '<q>citation</q>', desc: "Insere une courte citation en ligne, entouree automatiquement de guillemets." },
        { name: '<code>', syntax: '<code>let x = 1;</code>', desc: "Affiche un fragment de code informatique en police a chasse fixe." },
        { name: '<pre>', syntax: '<pre>texte brut</pre>', desc: "Conserve les espaces et retours a la ligne du texte exactement tels qu ecrits." },
        { name: '<abbr>', syntax: '<abbr title="...">HTML</abbr>', desc: "Signale une abreviation et en revele la signification complete au survol." },
        { name: '<mark>', syntax: '<mark>surligne</mark>', desc: "Surligne un passage de texte pour le mettre en evidence, comme au stabilo." }
      ]
    },
    {
      group: 'Listes',
      items: [
        { name: '<ul>', syntax: '<ul><li>...</li></ul>', desc: "Cree une liste non ordonnee a puces, quand l ordre des elements n importe pas." },
        { name: '<ol>', syntax: '<ol><li>...</li></ol>', desc: "Cree une liste ordonnee numerotee automatiquement, quand la sequence compte." },
        { name: '<li>', syntax: '<li>element</li>', desc: "Represente un element individuel a l interieur d une liste ul ou ol." },
        { name: '<dl>', syntax: '<dl>...</dl>', desc: "Liste de definitions associant des termes a leurs descriptions, ideale pour un glossaire." },
        { name: '<dt>', syntax: '<dt>terme</dt>', desc: "Definit le terme decrit au sein d une liste de definitions." },
        { name: '<dd>', syntax: '<dd>description</dd>', desc: "Fournit la description ou definition du terme dt qui la precede." }
      ]
    },
    {
      group: 'Liens & navigation',
      items: [
        { name: '<a>', syntax: '<a href="page.html">lien</a>', desc: "Cree un lien hypertexte vers une autre page, une ancre, un courriel ou un fichier." },
        { name: '<a target>', syntax: '<a href="..." target="_blank" rel="noopener">', desc: "Ouvre le lien dans un nouvel onglet ; rel noopener securise cette ouverture." },
        { name: '<a mailto>', syntax: '<a href="mailto:contact@exemple.fr">', desc: "Declenche l ouverture du logiciel de messagerie pour ecrire un courriel." },
        { name: '<a tel>', syntax: '<a href="tel:+33123456789">', desc: "Lance un appel telephonique sur les appareils qui en sont capables." },
        { name: '<a ancre>', syntax: '<a href="#section">aller</a>', desc: "Saute vers un element de la meme page identifie par son attribut id." },
        { name: '<nav>', syntax: '<nav>...</nav>', desc: "Conteneur semantique des blocs de navigation majeurs du site." }
      ]
    },
    {
      group: 'Tableaux',
      items: [
        { name: '<table>', syntax: '<table>...</table>', desc: "Conteneur racine d un tableau organisant des donnees en lignes et colonnes." },
        { name: '<tr>', syntax: '<tr>...</tr>', desc: "Definit une ligne du tableau, contenant des cellules th ou td." },
        { name: '<th>', syntax: '<th>En-tete</th>', desc: "Cellule d en-tete decrivant une colonne ou une ligne, affichee en gras." },
        { name: '<td>', syntax: '<td>Donnee</td>', desc: "Cellule de donnee standard contenant une valeur du tableau." },
        { name: '<thead>', syntax: '<thead>...</thead>', desc: "Regroupe les lignes d en-tete du tableau pour structurer sa partie superieure." },
        { name: '<tbody>', syntax: '<tbody>...</tbody>', desc: "Regroupe les lignes de donnees formant le corps principal du tableau." },
        { name: '<tfoot>', syntax: '<tfoot>...</tfoot>', desc: "Regroupe les lignes de bas de tableau, comme des totaux ou des sommes." },
        { name: '<caption>', syntax: '<caption>Titre</caption>', desc: "Donne un titre ou une legende au tableau, place juste apres la balise table." },
        { name: '<colgroup>', syntax: '<colgroup><col></colgroup>', desc: "Permet d appliquer un style ou une largeur a des colonnes entieres." }
      ]
    },
    {
      group: 'Formulaires & saisie',
      items: [
        { name: '<form>', syntax: '<form action="/envoi" method="post">', desc: "Conteneur qui collecte et envoie les donnees saisies a une URL de traitement." },
        { name: '<input>', syntax: '<input type="text" name="nom">', desc: "Champ de saisie polyvalent dont le type definit la nature : texte, email, case, etc." },
        { name: '<label>', syntax: '<label for="id">Nom</label>', desc: "Etiquette decrivant un champ ; le for la lie a l id du champ pour l accessibilite." },
        { name: '<textarea>', syntax: '<textarea rows="4"></textarea>', desc: "Zone de saisie de texte sur plusieurs lignes, pour les messages longs." },
        { name: '<select>', syntax: '<select><option>...</option></select>', desc: "Cree une liste deroulante de choix presentee a l utilisateur." },
        { name: '<option>', syntax: '<option value="fr">France</option>', desc: "Definit une option selectionnable a l interieur d un select ou d un datalist." },
        { name: '<optgroup>', syntax: '<optgroup label="Europe">...</optgroup>', desc: "Regroupe visuellement plusieurs options apparentees dans une liste deroulante." },
        { name: '<button>', syntax: '<button type="submit">Envoyer</button>', desc: "Bouton cliquable qui peut soumettre le formulaire ou declencher une action." },
        { name: '<fieldset>', syntax: '<fieldset>...</fieldset>', desc: "Regroupe et encadre des champs lies au sein d un meme formulaire." },
        { name: '<legend>', syntax: '<legend>Titre</legend>', desc: "Donne un titre au groupe de champs contenu dans un fieldset." },
        { name: '<datalist>', syntax: '<datalist id="suggestions">...</datalist>', desc: "Fournit une liste de suggestions d autocompletion associee a un champ input." },
        { name: '<output>', syntax: '<output>resultat</output>', desc: "Affiche le resultat d un calcul ou d une action de l utilisateur." }
      ]
    },
    {
      group: 'Media (image, audio, video)',
      items: [
        { name: '<img>', syntax: '<img src="photo.jpg" alt="Description">', desc: "Affiche une image ; l attribut alt decrit son contenu pour l accessibilite." },
        { name: '<picture>', syntax: '<picture><source><img></picture>', desc: "Propose plusieurs sources d image selon l ecran ou le format pris en charge." },
        { name: '<source>', syntax: '<source src="film.webm" type="video/webm">', desc: "Indique une source alternative de media a l interieur de picture, audio ou video." },
        { name: '<figure>', syntax: '<figure>...</figure>', desc: "Regroupe un contenu illustratif autonome, comme une image et sa legende." },
        { name: '<figcaption>', syntax: '<figcaption>Legende</figcaption>', desc: "Fournit une legende au contenu de la figure qui la contient." },
        { name: '<audio>', syntax: '<audio controls src="son.mp3"></audio>', desc: "Integre un lecteur audio natif avec controles de lecture et de volume." },
        { name: '<video>', syntax: '<video controls src="film.mp4"></video>', desc: "Integre un lecteur video natif sans plugin, avec controles optionnels." },
        { name: '<track>', syntax: '<track kind="subtitles" src="fr.vtt">', desc: "Ajoute des sous-titres ou des legendes synchronises a un media audio ou video." },
        { name: '<canvas>', syntax: '<canvas id="dessin"></canvas>', desc: "Zone de dessin pilotee par JavaScript pour graphiques, jeux et animations." },
        { name: '<svg>', syntax: '<svg>...</svg>', desc: "Integre des graphiques vectoriels qui restent nets a toutes les tailles." }
      ]
    },
    {
      group: 'Integration (iframe, embed)',
      items: [
        { name: '<iframe>', syntax: '<iframe src="page.html"></iframe>', desc: "Integre une autre page web dans un cadre, comme une carte ou une video externe." },
        { name: '<embed>', syntax: '<embed src="fichier.pdf" type="application/pdf">', desc: "Insere un contenu externe gere par un plugin, tel qu un PDF." },
        { name: '<object>', syntax: '<object data="fichier.pdf"></object>', desc: "Integre une ressource externe avec un contenu de repli si elle echoue." },
        { name: '<param>', syntax: '<param name="autoplay" value="true">', desc: "Transmet un parametre de configuration a un element object parent." },
        { name: '<portal>', syntax: '<portal src="page.html"></portal>', desc: "Previsualise une autre page et permet une transition fluide vers celle-ci." },
        { name: '<map>', syntax: '<map name="zones"><area></map>', desc: "Definit une carte de zones cliquables associee a une image." }
      ]
    },
    {
      group: 'Scripts & styles',
      items: [
        { name: '<script>', syntax: '<script src="app.js"></script>', desc: "Inclut ou ecrit du code JavaScript executable dans la page." },
        { name: '<script defer>', syntax: '<script src="app.js" defer></script>', desc: "Charge le script en parallele et l execute apres l analyse du document." },
        { name: '<script async>', syntax: '<script src="app.js" async></script>', desc: "Charge et execute le script des qu il est pret, sans attendre l ordre." },
        { name: '<noscript>', syntax: '<noscript>JavaScript desactive</noscript>', desc: "Affiche un contenu de repli quand JavaScript est desactive dans le navigateur." },
        { name: '<style>', syntax: '<style>...</style>', desc: "Integre des regles CSS directement dans le document HTML." },
        { name: '<link rel>', syntax: '<link rel="stylesheet" href="style.css">', desc: "Lie une feuille de style externe ou prefetch une ressource a la page." }
      ]
    },
    {
      group: 'Elements interactifs (details, dialog)',
      items: [
        { name: '<details>', syntax: '<details>...</details>', desc: "Cree un bloc depliable que l utilisateur ouvre ou ferme par un clic." },
        { name: '<summary>', syntax: '<summary>Voir plus</summary>', desc: "Definit le titre visible et cliquable d un element details." },
        { name: '<dialog>', syntax: '<dialog open>...</dialog>', desc: "Affiche une boite de dialogue ou une fenetre modale native." },
        { name: '<menu>', syntax: '<menu><li>...</li></menu>', desc: "Represente une liste de commandes ou d actions presentee a l utilisateur." },
        { name: '<progress>', syntax: '<progress value="70" max="100"></progress>', desc: "Affiche une barre de progression visualisant l avancement d une tache." },
        { name: '<meter>', syntax: '<meter value="0.6">60%</meter>', desc: "Represente une mesure scalaire dans une plage connue, comme un niveau de batterie." }
      ]
    }
  ]
});
