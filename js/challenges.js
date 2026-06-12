/* ============================================================
   CODEX — Défis de progression
   5 défis par langage, débloqués en séquence (le suivant
   s'ouvre quand le précédent est validé).
   ============================================================ */

CODEX.extend("html", { challenges: [
  { title: "Première page structurée", brief: "Crée une page HTML5 valide : doctype, head avec title et meta charset, puis un body avec un titre et un paragraphe.", goal: "La page valide sans erreur au W3C." },
  { title: "Structure sémantique", brief: "Organise une page avec header, nav, main, section, article et footer plutôt que des div génériques.", goal: "Aucune div utilisée pour la structure principale." },
  { title: "Formulaire complet", brief: "Construis un formulaire d'inscription avec labels associés et plusieurs types de champs (email, password, date), certains requis.", goal: "La validation native du navigateur fonctionne." },
  { title: "Tableau de données accessible", brief: "Affiche des données dans un tableau avec thead, tbody, th scope et une caption.", goal: "Le tableau est lisible par un lecteur d'écran." },
  { title: "Média et accessibilité", brief: "Intègre des images avec attribut alt et une vidéo, puis vérifie la navigation au clavier.", goal: "La page reste utilisable sans souris." }
]});

CODEX.extend("css", { challenges: [
  { title: "Mise en forme de base", brief: "Stylise une page via une feuille externe : couleurs, polices, marges et padding en maîtrisant le box model.", goal: "Un design cohérent appliqué depuis un fichier .css." },
  { title: "Layout en Flexbox", brief: "Aligne une barre de navigation et une galerie de cartes avec Flexbox, sans float.", goal: "Les éléments s'alignent et se répartissent proprement." },
  { title: "Grille de page", brief: "Construis une mise en page header / sidebar / main / footer avec CSS Grid et des zones nommées.", goal: "La structure repose entièrement sur grid-template-areas." },
  { title: "Responsive", brief: "Rends ta page adaptable avec des media queries et des unités relatives.", goal: "Lisible et propre de 320px à 1440px de large." },
  { title: "Animations et thème", brief: "Ajoute des transitions, une animation @keyframes et un thème (clair/sombre) piloté par des variables CSS.", goal: "Interface animée et changeable de thème sans toucher au HTML." }
]});

CODEX.extend("javascript", { challenges: [
  { title: "Manipuler le DOM", brief: "Sélectionne des éléments et modifie leur contenu ou leur style au clic d'un bouton.", goal: "Un bouton qui transforme visiblement la page." },
  { title: "Logique et tableaux", brief: "Filtre puis transforme une liste de données avec map, filter et reduce.", goal: "Une liste filtrée affichée dynamiquement." },
  { title: "Événements et formulaire", brief: "Valide un formulaire en JavaScript et affiche les messages d'erreur.", goal: "L'envoi est bloqué tant que les champs sont invalides." },
  { title: "Asynchrone et fetch", brief: "Récupère des données depuis une API publique avec async/await et affiche-les.", goal: "Une liste rendue à partir d'un appel fetch réussi." },
  { title: "Mini-application", brief: "Construis une todo-list : ajout, suppression et persistance avec localStorage.", goal: "L'application survit au rechargement de la page." }
]});

CODEX.extend("typescript", { challenges: [
  { title: "Typage de base", brief: "Annote variables, paramètres et valeurs de retour d'une fonction.", goal: "Aucun any implicite, mode strict activé." },
  { title: "Interfaces et objets", brief: "Modélise une entité (par exemple User) avec une interface et des fonctions typées.", goal: "Les objets respectent le contrat de l'interface." },
  { title: "Unions et narrowing", brief: "Manipule un type union et affine-le avec des gardes de type.", goal: "Code sans erreur sous strictNullChecks." },
  { title: "Génériques", brief: "Écris une fonction ou une structure générique réutilisable.", goal: "Réutilisable sur plusieurs types sans duplication." },
  { title: "Module typé", brief: "Convertis un petit module JavaScript en TypeScript avec un tsconfig strict.", goal: "Le module compile sans erreur en mode strict." }
]});

CODEX.extend("python", { challenges: [
  { title: "Premiers scripts", brief: "Écris un script interactif avec variables, input, print et conditions.", goal: "Un programme qui réagit à la saisie de l'utilisateur." },
  { title: "Boucles et structures", brief: "Manipule des listes et des dictionnaires avec des boucles et des compréhensions.", goal: "Traiter et transformer une collection de données." },
  { title: "Fonctions et modules", brief: "Découpe ton code en fonctions, puis en un module importable.", goal: "Le code est réutilisé via un import." },
  { title: "Fichiers et exceptions", brief: "Lis et écris un fichier (JSON ou CSV) avec gestion des erreurs.", goal: "Le programme reste robuste face aux erreurs." },
  { title: "POO et projet", brief: "Modélise un domaine avec des classes et construis un petit outil en ligne de commande.", goal: "Un programme orienté objet complet et lançable." }
]});

CODEX.extend("ruby", { challenges: [
  { title: "Bases et objets", brief: "Explore chaînes, nombres et symboles dans irb en appelant leurs méthodes.", goal: "Comprendre que tout est objet en Ruby." },
  { title: "Collections et blocs", brief: "Transforme des tableaux et des hashs avec each, map et select.", goal: "Un traitement idiomatique écrit avec des blocs." },
  { title: "Méthodes et classes", brief: "Définis une classe avec des attributs et des méthodes.", goal: "Un objet avec état et comportement." },
  { title: "Modules et mixins", brief: "Partage un comportement entre classes via un module inclus.", goal: "La réutilisation passe par un mixin." },
  { title: "Mini-projet", brief: "Construis un petit programme (par exemple un gestionnaire de tâches) de façon idiomatique.", goal: "Un code Ruby propre et expressif." }
]});

CODEX.extend("php", { challenges: [
  { title: "Syntaxe et affichage", brief: "Mélange HTML et PHP pour générer une page avec des données dynamiques.", goal: "Une page produite côté serveur." },
  { title: "Traiter un formulaire", brief: "Récupère des données avec $_POST et valide les entrées.", goal: "Les données reçues sont vérifiées et nettoyées." },
  { title: "Tableaux et fonctions", brief: "Manipule des tableaux associatifs et écris des fonctions réutilisables.", goal: "Une logique factorisée en fonctions." },
  { title: "Base de données PDO", brief: "Connecte une base et réalise un CRUD avec des requêtes préparées.", goal: "Lecture et écriture sécurisées contre l'injection." },
  { title: "Mini-application POO", brief: "Construis une petite application (sessions et classes), par exemple une connexion.", goal: "Une application structurée et sécurisée." }
]});

CODEX.extend("sql", { challenges: [
  { title: "Interroger", brief: "Écris des requêtes SELECT avec WHERE, ORDER BY et LIMIT.", goal: "Extraire précisément un sous-ensemble de lignes." },
  { title: "Agréger", brief: "Produis des statistiques avec GROUP BY, COUNT, SUM, AVG et HAVING.", goal: "Un rapport agrégé par catégorie." },
  { title: "Jointures", brief: "Combine plusieurs tables avec INNER JOIN et LEFT JOIN.", goal: "Une requête multi-tables correcte." },
  { title: "Modéliser", brief: "Crée des tables avec clés primaires et étrangères, puis insère des données.", goal: "Un schéma relationnel cohérent et contraint." },
  { title: "Requêtes avancées", brief: "Écris une sous-requête ou une CTE et encadre des écritures dans une transaction.", goal: "Une opération complexe et fiable." }
]});

CODEX.extend("nodejs", { challenges: [
  { title: "Premier script", brief: "Exécute du JavaScript hors navigateur et organise-le en modules.", goal: "Un script lancé avec la commande node." },
  { title: "Système de fichiers", brief: "Lis et écris des fichiers de façon asynchrone avec le module fs.", goal: "Une manipulation de fichiers non bloquante." },
  { title: "Serveur HTTP", brief: "Crée un serveur qui répond à des requêtes avec le module http.", goal: "Un serveur accessible depuis le navigateur." },
  { title: "API Express", brief: "Construis une petite API REST avec des routes et des middlewares.", goal: "Des endpoints GET et POST fonctionnels." },
  { title: "Projet npm", brief: "Initialise un projet, ajoute une dépendance et un script npm.", goal: "Une application Node lançable via npm." }
]});

CODEX.extend("react", { challenges: [
  { title: "Premier composant", brief: "Crée un composant qui affiche du JSX et reçoit des props.", goal: "Un composant réutilisable rendu à l'écran." },
  { title: "État et interactivité", brief: "Gère l'état avec useState (compteur, interrupteur).", goal: "Une interface qui réagit aux clics." },
  { title: "Listes et formulaires", brief: "Affiche une liste avec des keys et gère un formulaire contrôlé.", goal: "Un rendu dynamique piloté par l'état." },
  { title: "Effets et données", brief: "Charge des données distantes avec useEffect et fetch.", goal: "Un composant qui affiche des données d'API." },
  { title: "Mini-application", brief: "Compose plusieurs composants en une application (par exemple une todo) avec état partagé.", goal: "Une application React complète." }
]});

CODEX.extend("go", { challenges: [
  { title: "Bases du langage", brief: "Écris un programme avec variables, types et le paquet fmt.", goal: "Un programme qui compile et s'exécute." },
  { title: "Contrôle et fonctions", brief: "Implémente des fonctions à retours multiples et gère les erreurs renvoyées.", goal: "Les erreurs sont traitées explicitement." },
  { title: "Structs et interfaces", brief: "Modélise des données avec des structs et un comportement via une interface.", goal: "Du polymorphisme par interface implicite." },
  { title: "Concurrence", brief: "Lance des goroutines et fais-les communiquer par des channels.", goal: "Des tâches concurrentes synchronisées sans data race." },
  { title: "Serveur web", brief: "Construis un petit serveur HTTP avec net/http.", goal: "Une API qui répond, par exemple en JSON." }
]});

CODEX.extend("java", { challenges: [
  { title: "Premier programme", brief: "Écris une classe avec une méthode main qui affiche et calcule.", goal: "Un programme compilé avec javac et exécuté." },
  { title: "Programmation objet", brief: "Crée des classes avec encapsulation et héritage.", goal: "Une hiérarchie d'objets fonctionnelle." },
  { title: "Collections et génériques", brief: "Utilise List, Map et Set avec des génériques.", goal: "Des structures de données typées et sûres." },
  { title: "Exceptions et fichiers", brief: "Gère des exceptions et lis le contenu d'un fichier.", goal: "Un programme robuste aux erreurs d'exécution." },
  { title: "Streams et projet", brief: "Traite une collection avec l'API Stream et construis un petit outil.", goal: "Un code concis et fonctionnel." }
]});

CODEX.extend("c", { challenges: [
  { title: "Bases et compilation", brief: "Écris, compile et exécute un programme avec variables et printf.", goal: "Un binaire produit avec gcc." },
  { title: "Contrôle et fonctions", brief: "Implémente des fonctions, des boucles et des conditions.", goal: "Un programme structuré en fonctions." },
  { title: "Pointeurs", brief: "Manipule des pointeurs et passe des variables par adresse.", goal: "Modifier une variable via un pointeur." },
  { title: "Mémoire dynamique", brief: "Alloue et libère de la mémoire avec malloc et free (tableau dynamique).", goal: "Aucune fuite de mémoire." },
  { title: "Structs et fichiers", brief: "Gère des structures de données et lis ou écris un fichier.", goal: "Un mini-programme de gestion de données." }
]});

CODEX.extend("cpp", { challenges: [
  { title: "Du C au C++", brief: "Écris un programme avec iostream, std::string et des références.", goal: "Un programme C++ idiomatique de base." },
  { title: "Classes et RAII", brief: "Crée une classe qui gère une ressource via constructeur et destructeur.", goal: "La ressource est libérée automatiquement." },
  { title: "La STL", brief: "Utilise vector et map, puis des algorithmes comme sort et find.", goal: "Une manipulation fluide des conteneurs standard." },
  { title: "Templates", brief: "Écris une fonction ou une classe générique avec des templates.", goal: "Un code réutilisable et typé." },
  { title: "Smart pointers et projet", brief: "Gère la mémoire avec unique_ptr et shared_ptr dans un petit projet.", goal: "Aucune gestion mémoire manuelle (new/delete)." }
]});

CODEX.extend("rust", { challenges: [
  { title: "Bases et Cargo", brief: "Crée un projet avec cargo, manipule variables et types.", goal: "La commande cargo run fonctionne." },
  { title: "Ownership", brief: "Manipule possession, emprunts et références.", goal: "Le code passe le borrow checker sans erreur." },
  { title: "Structs et match", brief: "Modélise avec des structs et enums, puis utilise le pattern matching.", goal: "Une logique exhaustive grâce à match." },
  { title: "Erreurs et collections", brief: "Gère Option et Result, et utilise Vec et HashMap.", goal: "Une gestion d'erreurs sans panic." },
  { title: "Traits et projet", brief: "Définis des traits et construis un petit outil en ligne de commande.", goal: "Un programme Rust complet et sûr en mémoire." }
]});
