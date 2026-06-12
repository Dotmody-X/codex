/* ============================================================
   CODEX — Lexique du développeur
   Le jargon complexe traduit en mini-définitions simples.
   ============================================================ */

CODEX.glossary = [
  {
    group: "Types & valeurs",
    terms: [
      { t: "string", d: "Une chaîne de caractères : du texte (« Bonjour »). Toujours entre guillemets." },
      { t: "number", d: "Un nombre, entier ou décimal (42, 3.14). Sert à tous les calculs." },
      { t: "bigint", d: "Un type pour les entiers gigantesques, au-delà de la limite des number classiques." },
      { t: "boolean", d: "Une valeur vrai/faux (true ou false). La brique de toute décision logique." },
      { t: "undefined", d: "Une variable qui existe mais à laquelle on n'a pas encore donné de valeur." },
      { t: "null", d: "Le vide volontaire : « il n'y a rien ici, exprès » (différent d'undefined, le vide par défaut)." },
      { t: "symbol", d: "Une valeur unique et impossible à dupliquer, souvent utilisée comme identifiant secret." },
      { t: "object", d: "Un regroupement de données liées sous forme de paires clé/valeur." },
      { t: "array (tableau)", d: "Une liste ordonnée de valeurs, repérées par leur position appelée index (qui commence à 0)." },
      { t: "integer / float", d: "Integer = nombre entier ; float = nombre à virgule flottante (décimal)." },
      { t: "NaN", d: "« Not a Number » : le résultat d'un calcul numérique impossible (par exemple 0 divisé par 0)." }
    ]
  },
  {
    group: "Variables & mémoire",
    terms: [
      { t: "variable", d: "Une boîte étiquetée qui stocke une valeur réutilisable plus tard." },
      { t: "constante", d: "Une variable dont la valeur ne peut plus changer après avoir été fixée." },
      { t: "portée (scope)", d: "La zone du code où une variable existe et reste accessible." },
      { t: "mutable / immutable", d: "Mutable = modifiable après création ; immutable = figé, on en crée une nouvelle copie pour changer." },
      { t: "type", d: "La nature d'une valeur (texte, nombre, booléen…) qui définit ce qu'on peut en faire." },
      { t: "déclaration", d: "Le moment où l'on crée une variable et où on lui donne un nom." },
      { t: "affectation", d: "Le fait de ranger une valeur dans une variable avec le signe =." },
      { t: "référence vs valeur", d: "Par valeur on copie le contenu ; par référence on partage la même adresse en mémoire." },
      { t: "hoisting", d: "Mécanisme qui « remonte » certaines déclarations en haut de leur portée avant l'exécution." }
    ]
  },
  {
    group: "Fonctions & logique",
    terms: [
      { t: "fonction", d: "Un bloc de code réutilisable qui accomplit une tâche précise quand on l'appelle." },
      { t: "paramètre / argument", d: "Le paramètre est la variable d'entrée prévue ; l'argument est la valeur réelle qu'on lui passe." },
      { t: "valeur de retour", d: "Le résultat qu'une fonction renvoie à celui qui l'a appelée (mot-clé return)." },
      { t: "callback", d: "Une fonction passée en argument à une autre, pour être exécutée plus tard." },
      { t: "closure (fermeture)", d: "Une fonction qui garde l'accès aux variables de l'endroit où elle a été créée." },
      { t: "récursion", d: "Une fonction qui s'appelle elle-même pour résoudre un problème par petits morceaux." },
      { t: "fonction pure", d: "Une fonction qui donne toujours le même résultat et ne modifie rien d'extérieur." },
      { t: "effet de bord", d: "Toute action d'une fonction au-delà de son retour (modifier une variable globale, écrire un fichier…)." },
      { t: "condition", d: "Une structure (if/else) qui exécute du code seulement si un test est vrai." },
      { t: "boucle", d: "Une structure (for, while) qui répète du code tant qu'une condition tient." },
      { t: "opérateur", d: "Un symbole qui agit sur des valeurs (+, ===, &&, etc.)." }
    ]
  },
  {
    group: "Programmation orientée objet",
    terms: [
      { t: "classe", d: "Un plan, un moule qui décrit la forme et le comportement d'objets à fabriquer." },
      { t: "objet", d: "Une « chose » du programme qui regroupe des données et des actions." },
      { t: "instance", d: "Un objet concret fabriqué à partir d'une classe (le gâteau issu du moule)." },
      { t: "propriété", d: "Une donnée attachée à un objet (sa couleur, son nom…)." },
      { t: "méthode", d: "Une fonction qui appartient à un objet et agit sur lui." },
      { t: "héritage", d: "Le fait pour une classe de réutiliser et d'étendre une autre classe." },
      { t: "encapsulation", d: "Cacher les détails internes d'un objet et n'exposer que l'essentiel." },
      { t: "polymorphisme", d: "Un même appel qui s'adapte automatiquement au type réel de l'objet." },
      { t: "interface", d: "Un contrat qui liste les méthodes qu'un objet doit fournir, sans dire comment." },
      { t: "abstraction", d: "Se concentrer sur ce qu'une chose fait, en masquant comment elle le fait." }
    ]
  },
  {
    group: "Asynchrone & exécution",
    terms: [
      { t: "synchrone", d: "Le code s'exécute ligne par ligne, chacune attendant la fin de la précédente." },
      { t: "asynchrone", d: "Certaines tâches longues tournent en arrière-plan sans bloquer le reste du code." },
      { t: "promesse (Promise)", d: "Un objet qui représente un résultat futur : il sera tenu (succès) ou rompu (erreur)." },
      { t: "async / await", d: "Une syntaxe qui fait lire du code asynchrone comme du code synchrone, plus simple à suivre." },
      { t: "event loop", d: "Le chef d'orchestre qui décide quand exécuter les tâches en attente." },
      { t: "thread", d: "Un fil d'exécution. Un programme peut en avoir un seul ou plusieurs en parallèle." },
      { t: "bloquant / non bloquant", d: "Bloquant = tout s'arrête en attendant ; non bloquant = on continue pendant l'attente." },
      { t: "concurrence", d: "Gérer plusieurs tâches qui progressent en même temps sans se gêner." },
      { t: "race condition", d: "Bug où le résultat dépend de l'ordre imprévisible d'exécution de tâches concurrentes." }
    ]
  },
  {
    group: "Web & réseau",
    terms: [
      { t: "frontend", d: "La partie visible d'une appli, dans le navigateur, avec laquelle l'utilisateur interagit." },
      { t: "backend", d: "La partie cachée côté serveur : logique, calculs et accès aux données." },
      { t: "client / serveur", d: "Le client demande (navigateur) ; le serveur répond et fournit les données." },
      { t: "API", d: "Une « prise » standardisée par laquelle deux logiciels se parlent et échangent des données." },
      { t: "REST", d: "Un style courant d'API basé sur les adresses (URL) et les verbes HTTP (GET, POST…)." },
      { t: "JSON", d: "Un format texte léger pour échanger des données structurées entre programmes." },
      { t: "HTTP / HTTPS", d: "Le protocole du web pour transporter les pages ; HTTPS est sa version chiffrée et sécurisée." },
      { t: "requête / réponse", d: "Le client envoie une requête, le serveur renvoie une réponse. C'est l'aller-retour du web." },
      { t: "endpoint", d: "Une adresse précise d'une API qui répond à un type de demande." },
      { t: "DOM", d: "La représentation en arbre d'une page HTML, que le JavaScript peut lire et modifier." },
      { t: "cookie", d: "Un petit fichier stocké par le navigateur pour se souvenir de l'utilisateur." },
      { t: "cache", d: "Une réserve temporaire de données déjà obtenues, pour aller plus vite la prochaine fois." },
      { t: "CORS", d: "Une règle de sécurité qui décide si un site a le droit d'appeler l'API d'un autre domaine." },
      { t: "URL", d: "L'adresse unique d'une ressource sur le web (https://…)." }
    ]
  },
  {
    group: "Outils & écosystème",
    terms: [
      { t: "compilateur", d: "Un traducteur qui transforme tout ton code en langage machine avant l'exécution." },
      { t: "interpréteur", d: "Un moteur qui lit et exécute le code directement, ligne par ligne." },
      { t: "runtime", d: "L'environnement qui fait tourner ton code (le navigateur, Node.js…)." },
      { t: "framework", d: "Une structure prête à l'emploi qui impose une façon d'organiser ton appli (React, Django…)." },
      { t: "bibliothèque (library)", d: "Un ensemble d'outils prêts à appeler quand tu en as besoin, sans imposer de structure." },
      { t: "package / dépendance", d: "Un morceau de code externe que ton projet réutilise et dont il dépend." },
      { t: "gestionnaire de paquets", d: "Un outil (npm, pip…) qui installe et met à jour les dépendances." },
      { t: "IDE", d: "Un éditeur de code enrichi (autocomplétion, débogage…), comme VS Code." },
      { t: "terminal / CLI", d: "Une interface en texte où l'on tape des commandes pour piloter la machine." },
      { t: "Git", d: "Un outil qui enregistre l'historique de ton code et permet de revenir en arrière." },
      { t: "dépôt (repository)", d: "Le dossier d'un projet suivi par Git, avec tout son historique." },
      { t: "commit", d: "Un instantané sauvegardé de ton code à un moment donné, avec un message." },
      { t: "branche", d: "Une ligne de travail parallèle pour développer sans toucher au code principal." },
      { t: "déploiement", d: "Mettre ton application en ligne pour la rendre accessible aux utilisateurs." }
    ]
  },
  {
    group: "Code, données & qualité",
    terms: [
      { t: "algorithme", d: "Une suite d'étapes précises pour résoudre un problème, comme une recette." },
      { t: "structure de données", d: "Une façon d'organiser des données pour les utiliser efficacement (liste, dictionnaire, arbre…)." },
      { t: "complexité (Big O)", d: "Une mesure de la rapidité d'un algorithme selon la quantité de données traitées." },
      { t: "syntaxe", d: "Les règles de grammaire d'un langage. Une faute de syntaxe empêche le code de tourner." },
      { t: "bug", d: "Une erreur dans le code qui produit un comportement inattendu." },
      { t: "débogage (debug)", d: "L'enquête pour trouver et corriger un bug." },
      { t: "refactoring", d: "Réorganiser le code pour le rendre plus clair, sans changer ce qu'il fait." },
      { t: "test unitaire", d: "Un petit programme qui vérifie automatiquement qu'un morceau de code marche." },
      { t: "regex", d: "Un mini-langage de motifs pour rechercher ou valider du texte (emails, dates…)." },
      { t: "base de données", d: "Un système organisé pour stocker, retrouver et gérer de grandes quantités de données." },
      { t: "requête (query)", d: "Une demande adressée à une base de données pour lire ou modifier des données." },
      { t: "clé primaire", d: "L'identifiant unique d'une ligne dans une table de base de données." },
      { t: "index", d: "Un raccourci interne qui accélère la recherche dans une base de données." },
      { t: "variable d'environnement", d: "Un réglage stocké hors du code (clé secrète, mode…), différent selon la machine." },
      { t: "encodage (UTF-8)", d: "La façon dont les caractères texte sont représentés en mémoire ; UTF-8 gère tous les alphabets." }
    ]
  }
];
