/* ============================================================
   CODEX — Extension CSS
   Cours progressif + référence exhaustive des propriétés.
   Se greffe sur la fiche "css" via CODEX.extend(...).
   ============================================================ */
CODEX.extend('css', {
  course: [
    {
      title: 'Chapitre 1 — Cascade, sélecteurs & spécificité',
      lessons: [
        {
          title: 'Le rôle de CSS et la syntaxe de base',
          body: "CSS (Cascading Style Sheets) décrit la présentation visuelle d'un document HTML : couleurs, espacements, typographie, mise en page. Une règle CSS associe un sélecteur (qui cible des éléments) à un bloc de déclarations entre accolades. Chaque déclaration suit la forme propriete: valeur; et se termine par un point-virgule. On sépare ainsi le fond (HTML) de la forme (CSS), ce qui rend le code plus maintenable. Le navigateur lit ces règles et applique le style correspondant à chaque élément ciblé.",
          code: "p {\n  color: navy;\n  font-size: 16px;\n  line-height: 1.5;\n}",
          lang: 'css'
        },
        {
          title: 'Les sélecteurs essentiels',
          body: "Les sélecteurs déterminent quels éléments reçoivent un style. Le sélecteur de type vise une balise (p, h1), le sélecteur de classe commence par un point (.carte) et le sélecteur d'identifiant par un dièse (#menu). On peut combiner les sélecteurs : un espace exprime une descendance, le symbole > un enfant direct, et la virgule regroupe plusieurs cibles. Les sélecteurs d'attribut comme [type=\"text\"] ciblent selon les attributs HTML. Maîtriser ces combinaisons permet de viser précisément sans surcharger le HTML.",
          code: "nav a { color: white; }\n.carte > h2 { margin: 0; }\ninput[type=\"email\"] { border-color: teal; }",
          lang: 'css'
        },
        {
          title: 'Cascade, héritage et spécificité',
          body: "Quand plusieurs règles ciblent le même élément, CSS résout le conflit par la cascade. La spécificité hiérarchise les sélecteurs : un identifiant (100) l'emporte sur une classe (10), qui l'emporte sur une balise (1). À spécificité égale, c'est la dernière règle déclarée qui gagne. Certaines propriétés comme color ou font-family sont héritées par les enfants, d'autres non. Le mot-clé !important force une déclaration mais doit rester exceptionnel car il casse la logique de la cascade.",
          code: "p { color: gray; }            /* specificite 1 */\n.intro { color: black; }      /* specificite 10, gagne */\n#hero { color: crimson; }     /* specificite 100, gagne sur tout */",
          lang: 'css'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Le modèle de boîte (box model)',
      lessons: [
        {
          title: 'Contenu, padding, bordure et marge',
          body: "Chaque élément HTML est une boîte rectangulaire composée de quatre couches. Au centre se trouve le contenu, entouré du padding (espace intérieur), puis de la bordure (border), et enfin de la marge (margin, espace extérieur). Le padding agrandit la zone cliquable et éloigne le contenu du bord. La marge crée de l'espace entre les éléments voisins. Comprendre ces couches est indispensable pour contrôler les espacements d'une page.",
          code: ".boite {\n  width: 200px;\n  padding: 16px;\n  border: 2px solid #333;\n  margin: 24px;\n}",
          lang: 'css'
        },
        {
          title: 'box-sizing : calculer la taille réelle',
          body: "Par défaut (content-box), width et height ne couvrent que le contenu : le padding et la bordure s'ajoutent à la taille finale, ce qui complique les calculs. En passant box-sizing à border-box, la largeur déclarée englobe le contenu, le padding et la bordure. C'est pourquoi beaucoup de projets appliquent border-box à tous les éléments via le sélecteur universel. Cela rend les dimensions prévisibles et facilite les grilles. C'est une des premières lignes à écrire dans une feuille de style moderne.",
          code: "*, *::before, *::after {\n  box-sizing: border-box;\n}",
          lang: 'css'
        },
        {
          title: 'Marges, fusion et centrage',
          body: "Les marges verticales de deux éléments adjacents peuvent fusionner (margin collapsing) : la plus grande l'emporte au lieu de s'additionner. La propriété margin accepte un raccourci à quatre valeurs dans l'ordre haut, droite, bas, gauche. La valeur auto sur les marges horizontales centre un bloc de largeur fixe dans son parent. On peut aussi annuler les espacements par défaut du navigateur avec une remise à zéro. Ces réglages donnent un contrôle fin sur le rythme vertical de la page.",
          code: ".centre {\n  width: 600px;\n  margin: 0 auto;\n}",
          lang: 'css'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Flexbox : disposition en ligne ou colonne',
      lessons: [
        {
          title: 'Conteneur flex et axes',
          body: "Flexbox est un mode de disposition unidimensionnel idéal pour aligner des éléments sur une ligne ou une colonne. On l'active avec display: flex sur le conteneur parent ; ses enfants directs deviennent des éléments flexibles. La propriété flex-direction définit l'axe principal (row par défaut, ou column). On distingue l'axe principal et l'axe secondaire (perpendiculaire), ce qui conditionne le sens des alignements. Flexbox excelle pour les barres de navigation, les cartes et les centrages.",
          code: ".barre {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n}",
          lang: 'css'
        },
        {
          title: 'Aligner et répartir avec justify et align',
          body: "justify-content répartit les éléments le long de l'axe principal : space-between, center, flex-end, etc. align-items les aligne sur l'axe secondaire, par exemple pour centrer verticalement une rangée. Combiner justify-content: center et align-items: center est la méthode la plus simple pour centrer parfaitement un contenu. La propriété gap ajoute un espace régulier entre les éléments sans recourir aux marges. Ces réglages remplacent avantageusement les anciennes techniques de float.",
          code: ".centrage {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}",
          lang: 'css'
        },
        {
          title: 'Flexibilité des éléments : grow, shrink, basis',
          body: "Chaque élément flex peut grandir ou rétrécir selon l'espace disponible. flex-grow définit la part d'espace libre qu'un élément absorbe, flex-shrink sa capacité à se réduire, et flex-basis sa taille de départ. Le raccourci flex combine ces trois valeurs, par exemple flex: 1 pour occuper équitablement l'espace. flex-wrap: wrap autorise le passage à la ligne quand l'espace manque. Ces propriétés rendent les interfaces réellement fluides et adaptatives.",
          code: ".colonne {\n  flex: 1 1 200px;\n}\n.conteneur {\n  display: flex;\n  flex-wrap: wrap;\n}",
          lang: 'css'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Grid : grilles en deux dimensions',
      lessons: [
        {
          title: 'Définir des lignes et des colonnes',
          body: "CSS Grid est un système de disposition bidimensionnel, parfait pour les mises en page complexes. On active display: grid puis on déclare les colonnes avec grid-template-columns et les lignes avec grid-template-rows. L'unité fr représente une fraction de l'espace disponible et se répartit automatiquement. La fonction repeat() évite de répéter les valeurs, par exemple repeat(3, 1fr) pour trois colonnes égales. Grid gère lignes et colonnes simultanément, là où Flexbox ne gère qu'un axe.",
          code: ".grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}",
          lang: 'css'
        },
        {
          title: 'Placer les éléments et créer des zones',
          body: "On positionne un élément dans la grille avec grid-column et grid-row, en indiquant les lignes de début et de fin (par exemple 1 / 3 pour s'étendre sur deux colonnes). La syntaxe span permet de couvrir un nombre de pistes. Pour les mises en page nommées, grid-template-areas dessine la structure avec des noms, puis grid-area assigne chaque élément à sa zone. Cette approche rend le code très lisible et facile à réorganiser en responsive. Grid devient ainsi un véritable plan de page.",
          code: ".sidebar { grid-column: 1 / 2; }\n.contenu { grid-column: 2 / 4; }",
          lang: 'css'
        },
        {
          title: 'Grilles adaptatives sans media query',
          body: "Grid peut produire des grilles qui s'adaptent automatiquement au nombre d'éléments et à la largeur. La combinaison repeat(auto-fit, minmax(200px, 1fr)) crée autant de colonnes que possible, chacune ayant une largeur minimale de 200px et s'étirant pour remplir l'espace. minmax() fixe une borne minimale et maximale pour chaque piste. auto-fit replie les colonnes vides tandis que auto-fill les conserve. Ce motif réalise des galeries responsives sans écrire une seule media query.",
          code: ".galerie {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
          lang: 'css'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Responsive & media queries',
      lessons: [
        {
          title: 'Unités relatives et viewport',
          body: "Un design responsive s'adapte à toutes les tailles d'écran. Pour cela on privilégie les unités relatives : em et rem dépendent de la taille de police, % de l'élément parent, et vw/vh de la fenêtre du navigateur. La balise meta viewport dans le HTML est indispensable pour que les mobiles affichent la page à l'échelle réelle. On évite les largeurs fixes en pixels au profit de pourcentages ou de max-width. Penser en unités relatives est la base d'une interface fluide.",
          code: ".titre {\n  font-size: 2rem;\n  max-width: 90vw;\n  margin: 0 auto;\n}",
          lang: 'css'
        },
        {
          title: 'Les media queries',
          body: "Une media query applique des styles selon des conditions, le plus souvent la largeur de l'écran. La syntaxe @media (max-width: 768px) cible les écrans jusqu'à 768px, idéal pour adapter une mise en page aux tablettes et mobiles. On peut combiner les conditions avec and et tester l'orientation ou le mode sombre. L'approche mobile-first écrit d'abord les styles pour petits écrans, puis ajoute des min-width pour les agrandir. Les points de rupture (breakpoints) doivent suivre le contenu, pas des appareils précis.",
          code: "@media (max-width: 768px) {\n  .grille {\n    grid-template-columns: 1fr;\n  }\n}",
          lang: 'css'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Transitions, animations & variables',
      lessons: [
        {
          title: 'Transitions douces',
          body: "Une transition fait évoluer une propriété en douceur entre deux états au lieu d'un changement brutal. On déclare transition sur l'élément de base en précisant la propriété, la durée et la fonction de timing. Au survol (:hover) ou à un changement de classe, la nouvelle valeur s'anime sur la durée indiquée. Les fonctions comme ease, ease-in-out ou cubic-bezier contrôlent l'accélération. Il vaut mieux animer transform et opacity, plus performants que les propriétés qui modifient la mise en page.",
          code: ".bouton {\n  background: teal;\n  transition: transform 0.2s ease, background 0.2s ease;\n}\n.bouton:hover {\n  transform: scale(1.05);\n  background: #0a7;\n}",
          lang: 'css'
        },
        {
          title: 'Animations avec @keyframes',
          body: "Pour des mouvements complexes ou en boucle, on utilise les animations basées sur @keyframes. On définit des étapes (de 0% à 100%, ou from/to) décrivant l'état à chaque instant. La propriété animation relie l'animation à un élément en précisant nom, durée, répétition et direction. infinite répète sans fin, alternate inverse le sens à chaque cycle. Contrairement aux transitions qui réagissent à un événement, les animations se jouent automatiquement et peuvent enchaîner plusieurs étapes.",
          code: "@keyframes pulse {\n  0% { opacity: 1; }\n  50% { opacity: 0.4; }\n  100% { opacity: 1; }\n}\n.point {\n  animation: pulse 1.5s ease-in-out infinite;\n}",
          lang: 'css'
        },
        {
          title: 'Variables CSS (propriétés personnalisées)',
          body: "Les variables CSS, ou propriétés personnalisées, stockent des valeurs réutilisables. On les déclare avec un double tiret, souvent sur le sélecteur :root pour une portée globale, puis on les lit avec la fonction var(). Elles facilitent les thèmes : changer une seule valeur met à jour toute la page. Contrairement aux variables de préprocesseurs, elles vivent dans le navigateur et peuvent être modifiées en JavaScript à l'exécution. var() accepte une valeur de repli en second argument si la variable n'est pas définie.",
          code: ":root {\n  --accent: #19d3ff;\n  --espace: 16px;\n}\n.carte {\n  color: var(--accent);\n  padding: var(--espace);\n}",
          lang: 'css'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Sélecteurs',
      items: [
        { name: 'Type', syntax: 'p { ... }', desc: "Cible tous les éléments d'une balise donnée." },
        { name: 'Classe', syntax: '.carte { ... }', desc: "Cible les éléments portant l'attribut class correspondant." },
        { name: 'Identifiant', syntax: '#menu { ... }', desc: "Cible l'élément unique portant cet id. Spécificité élevée." },
        { name: 'Universel', syntax: '* { ... }', desc: "Cible tous les éléments, souvent pour une remise à zéro." },
        { name: 'Descendant', syntax: 'nav a { ... }', desc: "Cible un élément situé n'importe où à l'intérieur d'un autre." },
        { name: 'Enfant direct', syntax: '.liste > li { ... }', desc: "Cible uniquement les enfants directs du parent." },
        { name: 'Frère adjacent', syntax: 'h2 + p { ... }', desc: "Cible le premier élément immédiatement après un autre." },
        { name: 'Frère général', syntax: 'h2 ~ p { ... }', desc: "Cible tous les frères suivants d'un élément." },
        { name: 'Attribut', syntax: 'input[type="text"] { ... }', desc: "Cible les éléments selon la présence ou la valeur d'un attribut." },
        { name: 'Groupe', syntax: 'h1, h2, h3 { ... }', desc: "Applique les mêmes styles à plusieurs sélecteurs." }
      ]
    },
    {
      group: 'Box model',
      items: [
        { name: 'width', syntax: 'width: 200px;', desc: "Définit la largeur de la zone de contenu (ou totale en border-box)." },
        { name: 'height', syntax: 'height: 120px;', desc: "Définit la hauteur de l'élément." },
        { name: 'max-width', syntax: 'max-width: 100%;', desc: "Limite la largeur maximale, utile en responsive." },
        { name: 'min-height', syntax: 'min-height: 100vh;', desc: "Impose une hauteur minimale à l'élément." },
        { name: 'padding', syntax: 'padding: 16px;', desc: "Espace intérieur entre le contenu et la bordure." },
        { name: 'margin', syntax: 'margin: 0 auto;', desc: "Espace extérieur autour de l'élément ; auto centre horizontalement." },
        { name: 'box-sizing', syntax: 'box-sizing: border-box;', desc: "Inclut padding et bordure dans la largeur déclarée." },
        { name: 'overflow', syntax: 'overflow: hidden;', desc: "Gère le contenu qui déborde : visible, hidden, scroll, auto." }
      ]
    },
    {
      group: 'Affichage & positionnement',
      items: [
        { name: 'display', syntax: 'display: flex;', desc: "Définit le mode de rendu : block, inline, flex, grid, none." },
        { name: 'position', syntax: 'position: relative;', desc: "Mode de positionnement : static, relative, absolute, fixed, sticky." },
        { name: 'top / right / bottom / left', syntax: 'top: 0; left: 0;', desc: "Décalent un élément positionné par rapport à son référent." },
        { name: 'z-index', syntax: 'z-index: 10;', desc: "Ordonne la superposition des éléments positionnés." },
        { name: 'float', syntax: 'float: left;', desc: "Fait flotter un élément, le texte l'enveloppe (technique ancienne)." },
        { name: 'visibility', syntax: 'visibility: hidden;', desc: "Masque l'élément en conservant sa place dans le flux." },
        { name: 'inset', syntax: 'inset: 0;', desc: "Raccourci pour top, right, bottom et left simultanément." },
        { name: 'object-fit', syntax: 'object-fit: cover;', desc: "Ajuste une image ou vidéo dans sa boîte sans déformation." }
      ]
    },
    {
      group: 'Flexbox',
      items: [
        { name: 'display: flex', syntax: 'display: flex;', desc: "Active la disposition flexible sur le conteneur." },
        { name: 'flex-direction', syntax: 'flex-direction: column;', desc: "Définit l'axe principal : row ou column." },
        { name: 'justify-content', syntax: 'justify-content: space-between;', desc: "Répartit les éléments le long de l'axe principal." },
        { name: 'align-items', syntax: 'align-items: center;', desc: "Aligne les éléments sur l'axe secondaire." },
        { name: 'flex-wrap', syntax: 'flex-wrap: wrap;', desc: "Autorise le passage à la ligne des éléments." },
        { name: 'gap', syntax: 'gap: 16px;', desc: "Ajoute un espace régulier entre les éléments." },
        { name: 'flex', syntax: 'flex: 1 1 auto;', desc: "Raccourci pour grow, shrink et basis d'un élément." },
        { name: 'align-self', syntax: 'align-self: flex-end;', desc: "Surcharge l'alignement secondaire d'un seul élément." }
      ]
    },
    {
      group: 'Grid',
      items: [
        { name: 'display: grid', syntax: 'display: grid;', desc: "Active la disposition en grille bidimensionnelle." },
        { name: 'grid-template-columns', syntax: 'grid-template-columns: 1fr 1fr;', desc: "Définit le nombre et la taille des colonnes." },
        { name: 'grid-template-rows', syntax: 'grid-template-rows: auto 1fr;', desc: "Définit le nombre et la taille des lignes." },
        { name: 'gap', syntax: 'gap: 20px;', desc: "Espace entre les pistes de la grille." },
        { name: 'grid-column', syntax: 'grid-column: 1 / 3;', desc: "Place et étend un élément sur des colonnes." },
        { name: 'grid-row', syntax: 'grid-row: span 2;', desc: "Place et étend un élément sur des lignes." },
        { name: 'grid-template-areas', syntax: 'grid-template-areas: "a b";', desc: "Dessine la grille avec des zones nommées." },
        { name: 'repeat()', syntax: 'repeat(auto-fit, minmax(200px, 1fr))', desc: "Génère des pistes répétées, souvent adaptatives." }
      ]
    },
    {
      group: 'Typographie',
      items: [
        { name: 'font-family', syntax: 'font-family: system-ui, sans-serif;', desc: "Définit la pile de polices à utiliser." },
        { name: 'font-size', syntax: 'font-size: 1rem;', desc: "Taille du texte, idéalement en unité relative." },
        { name: 'font-weight', syntax: 'font-weight: 700;', desc: "Graisse du texte, de 100 (fin) à 900 (gras)." },
        { name: 'line-height', syntax: 'line-height: 1.5;', desc: "Hauteur de ligne, améliore la lisibilité." },
        { name: 'text-align', syntax: 'text-align: center;', desc: "Alignement horizontal du texte." },
        { name: 'letter-spacing', syntax: 'letter-spacing: 0.05em;', desc: "Espacement entre les lettres." },
        { name: 'text-transform', syntax: 'text-transform: uppercase;', desc: "Transforme la casse du texte." },
        { name: 'text-decoration', syntax: 'text-decoration: underline;', desc: "Souligne, barre ou retire la décoration du texte." }
      ]
    },
    {
      group: 'Couleurs & arrière-plans',
      items: [
        { name: 'color', syntax: 'color: #19d3ff;', desc: "Couleur du texte de l'élément." },
        { name: 'background-color', syntax: 'background-color: #111;', desc: "Couleur de fond de l'élément." },
        { name: 'background-image', syntax: 'background-image: url(img.png);', desc: "Définit une image ou un dégradé en fond." },
        { name: 'linear-gradient()', syntax: 'background: linear-gradient(90deg, #f0f, #0ff);', desc: "Crée un dégradé linéaire entre plusieurs couleurs." },
        { name: 'background-size', syntax: 'background-size: cover;', desc: "Ajuste la taille de l'image de fond." },
        { name: 'background-position', syntax: 'background-position: center;', desc: "Positionne l'image de fond dans la boîte." },
        { name: 'opacity', syntax: 'opacity: 0.8;', desc: "Transparence globale de l'élément (0 à 1)." },
        { name: 'rgba() / hsl()', syntax: 'color: rgba(0, 0, 0, 0.5);', desc: "Notations de couleur avec canal alpha ou teinte." }
      ]
    },
    {
      group: 'Bordures, ombres & contours',
      items: [
        { name: 'border', syntax: 'border: 2px solid #333;', desc: "Raccourci pour épaisseur, style et couleur de bordure." },
        { name: 'border-radius', syntax: 'border-radius: 8px;', desc: "Arrondit les coins de l'élément." },
        { name: 'border-width', syntax: 'border-width: 1px;', desc: "Épaisseur de la bordure." },
        { name: 'border-style', syntax: 'border-style: dashed;', desc: "Style de trait : solid, dashed, dotted." },
        { name: 'box-shadow', syntax: 'box-shadow: 0 4px 12px rgba(0,0,0,.3);', desc: "Ajoute une ou plusieurs ombres portées à la boîte." },
        { name: 'text-shadow', syntax: 'text-shadow: 0 1px 2px black;', desc: "Ajoute une ombre au texte." },
        { name: 'outline', syntax: 'outline: 2px solid teal;', desc: "Contour dessiné hors de la boîte, utile pour le focus." },
        { name: 'filter', syntax: 'filter: blur(4px);', desc: "Applique des effets graphiques : flou, luminosité, contraste." }
      ]
    },
    {
      group: 'Transitions & animations',
      items: [
        { name: 'transition', syntax: 'transition: all 0.2s ease;', desc: "Anime en douceur le changement d'une propriété." },
        { name: 'transition-property', syntax: 'transition-property: transform;', desc: "Précise la ou les propriétés à animer." },
        { name: 'transition-duration', syntax: 'transition-duration: 300ms;', desc: "Durée de la transition." },
        { name: 'transition-timing-function', syntax: 'transition-timing-function: ease-in-out;', desc: "Courbe d'accélération de la transition." },
        { name: '@keyframes', syntax: '@keyframes nom { from {} to {} }', desc: "Définit les étapes d'une animation." },
        { name: 'animation', syntax: 'animation: nom 1.5s infinite;', desc: "Raccourci reliant une animation à un élément." },
        { name: 'animation-iteration-count', syntax: 'animation-iteration-count: infinite;', desc: "Nombre de répétitions de l'animation." },
        { name: 'animation-direction', syntax: 'animation-direction: alternate;', desc: "Sens de lecture : normal, reverse, alternate." }
      ]
    },
    {
      group: 'Transformations',
      items: [
        { name: 'transform', syntax: 'transform: scale(1.1);', desc: "Applique une ou plusieurs transformations à l'élément." },
        { name: 'translate()', syntax: 'transform: translate(10px, 20px);', desc: "Déplace l'élément sans affecter le flux." },
        { name: 'scale()', syntax: 'transform: scale(1.5);', desc: "Agrandit ou réduit l'élément." },
        { name: 'rotate()', syntax: 'transform: rotate(45deg);', desc: "Fait pivoter l'élément autour de son origine." },
        { name: 'skew()', syntax: 'transform: skew(10deg);', desc: "Incline l'élément sur un ou deux axes." },
        { name: 'transform-origin', syntax: 'transform-origin: center;', desc: "Définit le point de référence des transformations." },
        { name: 'perspective', syntax: 'perspective: 800px;', desc: "Donne une profondeur 3D aux transformations." }
      ]
    },
    {
      group: 'Unités & fonctions',
      items: [
        { name: 'px', syntax: 'width: 200px;', desc: "Unité absolue en pixels." },
        { name: 'rem / em', syntax: 'font-size: 1.2rem;', desc: "Unités relatives à la taille de police racine ou parente." },
        { name: '% (pourcentage)', syntax: 'width: 50%;', desc: "Relatif à la dimension de l'élément parent." },
        { name: 'vw / vh', syntax: 'height: 100vh;', desc: "Relatif à la largeur ou hauteur de la fenêtre." },
        { name: 'fr', syntax: 'grid-template-columns: 1fr 2fr;', desc: "Fraction de l'espace disponible dans une grille." },
        { name: 'calc()', syntax: 'width: calc(100% - 40px);', desc: "Combine plusieurs unités dans un calcul." },
        { name: 'min() / max() / clamp()', syntax: 'font-size: clamp(1rem, 2vw, 2rem);', desc: "Choisit ou borne une valeur de façon fluide." },
        { name: 'var()', syntax: 'color: var(--accent);', desc: "Lit la valeur d'une variable CSS." }
      ]
    },
    {
      group: 'Media queries & responsive',
      items: [
        { name: '@media (max-width)', syntax: '@media (max-width: 768px) { ... }', desc: "Applique des styles jusqu'à une largeur donnée." },
        { name: '@media (min-width)', syntax: '@media (min-width: 1024px) { ... }', desc: "Applique des styles à partir d'une largeur (mobile-first)." },
        { name: '@media (orientation)', syntax: '@media (orientation: landscape) { ... }', desc: "Cible l'orientation paysage ou portrait." },
        { name: '@media (prefers-color-scheme)', syntax: '@media (prefers-color-scheme: dark) { ... }', desc: "Adapte le style au thème clair ou sombre du système." },
        { name: 'and / , (combinaisons)', syntax: '@media (min-width: 600px) and (max-width: 900px)', desc: "Combine plusieurs conditions de media query." },
        { name: 'aspect-ratio', syntax: 'aspect-ratio: 16 / 9;', desc: "Maintient un rapport largeur/hauteur fixe." },
        { name: 'clamp() fluide', syntax: 'width: clamp(300px, 80%, 1200px);', desc: "Crée une dimension responsive sans media query." }
      ]
    },
    {
      group: 'Variables & pseudo-classes/éléments',
      items: [
        { name: '--variable', syntax: '--accent: #19d3ff;', desc: "Déclare une propriété personnalisée réutilisable." },
        { name: ':root', syntax: ':root { --accent: #19d3ff; }', desc: "Cible la racine du document pour des variables globales." },
        { name: ':hover', syntax: 'a:hover { color: teal; }', desc: "Cible un élément au survol de la souris." },
        { name: ':focus', syntax: 'input:focus { outline: 2px solid; }', desc: "Cible un élément qui a le focus clavier." },
        { name: ':nth-child()', syntax: 'li:nth-child(2n) { ... }', desc: "Cible les éléments selon leur position parmi leurs frères." },
        { name: ':first-child / :last-child', syntax: 'li:first-child { ... }', desc: "Cible le premier ou le dernier enfant d'un parent." },
        { name: ':not()', syntax: 'button:not(.actif) { ... }', desc: "Cible les éléments qui ne correspondent pas au sélecteur fourni." },
        { name: '::before / ::after', syntax: '.carte::before { content: ""; }', desc: "Insère un pseudo-élément avant ou après le contenu." }
      ]
    }
  ]
});
