CODEX.extend("php", {
  course: [
    {
      title: "Chapitre 1 — Syntaxe & types",
      lessons: [
        {
          title: "Balises PHP et premier script",
          body: "PHP est un langage de script executé cote serveur. Le code PHP vit entre les balises <?php et ?>, tout ce qui est en dehors est renvoye tel quel au navigateur. Chaque instruction se termine par un point-virgule. La fonction echo affiche du texte dans la page generee. On peut melanger librement HTML et PHP dans un meme fichier .php.",
          code: "<?php\necho \"Bonjour le Codex\";\n// Une instruction = un point-virgule\nprint \"Salut\";\n?>",
          lang: "php"
        },
        {
          title: "Variables et types scalaires",
          body: "En PHP une variable commence toujours par le signe dollar suivi de son nom. Le typage est dynamique : le type est deduit de la valeur affectee. Les types scalaires sont la chaine (string), l entier (int), le flottant (float) et le booleen (bool). La fonction var_dump revele le type exact et la valeur d une variable, indispensable pour deboguer. La fonction gettype renvoie le nom du type sous forme de chaine.",
          code: "<?php\n$nom = \"Ada\";        // string\n$age = 36;            // int\n$taux = 4.5;          // float\n$actif = true;        // bool\nvar_dump($nom, $age, $actif);\n?>",
          lang: "php"
        },
        {
          title: "Concatenation et interpolation",
          body: "Le point est l operateur de concatenation qui colle deux chaines bout a bout. Dans une chaine entre guillemets doubles, les variables sont interpretees automatiquement (interpolation). Entre apostrophes simples, le texte est pris litteralement, sans interpolation. On accole .= pour ajouter du texte a la fin d une variable existante. Les accolades clarifient l interpolation d expressions complexes.",
          code: "<?php\n$prenom = \"Linus\";\necho \"Bonjour $prenom !\";\necho 'Texte brut $prenom';\n$message = \"Salut \" . $prenom;\n$message .= \", bienvenue.\";\necho \"{$prenom}torvalds\";\n?>",
          lang: "php"
        }
      ]
    },
    {
      title: "Chapitre 2 — Tableaux",
      lessons: [
        {
          title: "Tableaux indexes et associatifs",
          body: "Un tableau stocke plusieurs valeurs dans une seule variable. Le tableau indexe utilise des cles numeriques automatiques commencant a zero. Le tableau associatif utilise des cles textuelles que l on choisit soi-meme. La syntaxe moderne emploie les crochets pour declarer un tableau. La fonction count renvoie le nombre d elements contenus.",
          code: "<?php\n$couleurs = [\"rouge\", \"vert\", \"bleu\"];\necho $couleurs[0];\n\n$user = [\"nom\" => \"Ada\", \"age\" => 36];\necho $user[\"nom\"];\necho count($couleurs);\n?>",
          lang: "php"
        },
        {
          title: "Parcourir avec foreach",
          body: "La boucle foreach est la maniere idiomatique de parcourir un tableau en PHP. Sa forme simple donne acces a chaque valeur successivement. Sa forme cle => valeur expose en plus la cle de chaque element. Elle fonctionne aussi bien sur les tableaux indexes qu associatifs. On evite ainsi de gerer manuellement un compteur.",
          code: "<?php\n$user = [\"nom\" => \"Ada\", \"age\" => 36];\nforeach ($user as $cle => $valeur) {\n  echo \"$cle : $valeur\\n\";\n}\n?>",
          lang: "php"
        },
        {
          title: "Fonctions de manipulation",
          body: "PHP offre une riche bibliotheque pour transformer les tableaux. array_push ajoute un element a la fin, array_map applique une fonction a chaque element, array_filter conserve les elements validant une condition. in_array verifie la presence d une valeur, array_keys retourne toutes les cles. Ces fonctions favorisent un style declaratif et concis.",
          code: "<?php\n$nombres = [1, 2, 3, 4];\n$doubles = array_map(fn($n) => $n * 2, $nombres);\n$pairs = array_filter($nombres, fn($n) => $n % 2 === 0);\nvar_dump($doubles, in_array(3, $nombres));\n?>",
          lang: "php"
        }
      ]
    },
    {
      title: "Chapitre 3 — Fonctions",
      lessons: [
        {
          title: "Declarer et appeler une fonction",
          body: "Une fonction regroupe un bloc de code reutilisable sous un nom. On la declare avec le mot-cle function suivi du nom et des parametres entre parentheses. Le mot-cle return renvoie une valeur a l appelant et termine la fonction. On peut donner une valeur par defaut a un parametre pour le rendre optionnel. Appeler la fonction execute son corps avec les arguments fournis.",
          code: "<?php\nfunction saluer($nom, $titre = \"camarade\") {\n  return \"Bonjour $titre $nom\";\n}\necho saluer(\"Ada\");\necho saluer(\"Linus\", \"maitre\");\n?>",
          lang: "php"
        },
        {
          title: "Typage et fonctions flechees",
          body: "PHP moderne permet de typer les parametres et la valeur de retour pour fiabiliser le code. On precise le type avant le parametre et apres deux-points pour le retour. Les fonctions anonymes se stockent dans des variables et se passent en argument. La syntaxe flechee fn() => fournit une ecriture compacte qui capture automatiquement les variables du contexte. Le type union avec la barre verticale autorise plusieurs types.",
          code: "<?php\nfunction additionner(int $a, int $b): int {\n  return $a + $b;\n}\n$carre = fn(int $x): int => $x * $x;\necho additionner(2, 3);\necho $carre(5);\n?>",
          lang: "php"
        }
      ]
    },
    {
      title: "Chapitre 4 — Formulaires & superglobales",
      lessons: [
        {
          title: "Recevoir des donnees GET et POST",
          body: "Les superglobales sont des tableaux accessibles partout dans le script. $_GET contient les parametres passes dans l URL, $_POST contient les donnees envoyees par un formulaire en methode post. $_REQUEST fusionne les deux mais reste a eviter par precaution. On lit une valeur via sa cle qui correspond a l attribut name du champ. L operateur de coalescence ?? evite les erreurs si la cle est absente.",
          code: "<?php\n$nom = $_POST[\"nom\"] ?? \"\";\n$page = $_GET[\"page\"] ?? 1;\necho \"Nom recu : $nom\";\necho \"Page : $page\";\n?>",
          lang: "php"
        },
        {
          title: "Valider et nettoyer les entrees",
          body: "Ne jamais faire confiance aux donnees envoyees par l utilisateur est la regle d or. filter_var valide ou nettoie une valeur selon un filtre comme FILTER_VALIDATE_EMAIL. htmlspecialchars echappe les caracteres speciaux pour empecher les injections de code HTML (XSS). empty et isset verifient respectivement le vide et l existence. On controle toujours la presence d un champ avant de l exploiter.",
          code: "<?php\n$email = $_POST[\"email\"] ?? \"\";\nif (filter_var($email, FILTER_VALIDATE_EMAIL)) {\n  $propre = htmlspecialchars($email);\n  echo \"Email valide : $propre\";\n} else {\n  echo \"Email invalide\";\n}\n?>",
          lang: "php"
        },
        {
          title: "Sessions et cookies",
          body: "Une session conserve des informations cote serveur entre plusieurs pages pour un meme visiteur. session_start doit etre appele avant tout affichage pour activer la session. On lit et ecrit ensuite dans le tableau $_SESSION. Un cookie stocke une petite donnee cote client via setcookie, lue ensuite dans $_COOKIE. session_destroy ferme la session, utile pour la deconnexion.",
          code: "<?php\nsession_start();\n$_SESSION[\"user\"] = \"Ada\";\nsetcookie(\"theme\", \"sombre\", time() + 3600);\necho $_SESSION[\"user\"];\necho $_COOKIE[\"theme\"] ?? \"clair\";\n?>",
          lang: "php"
        }
      ]
    },
    {
      title: "Chapitre 5 — PDO & bases de donnees",
      lessons: [
        {
          title: "Se connecter avec PDO",
          body: "PDO (PHP Data Objects) est l interface moderne et unifiee pour dialoguer avec une base de donnees. On cree un objet PDO avec une chaine DSN decrivant le pilote, l hote et la base. On active le mode exception pour que les erreurs soient signalees clairement. Le bloc try/catch capture les echecs de connexion. La meme API fonctionne pour MySQL, PostgreSQL, SQLite et d autres.",
          code: "<?php\ntry {\n  $pdo = new PDO(\"mysql:host=localhost;dbname=blog\", \"root\", \"\");\n  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n} catch (PDOException $e) {\n  echo \"Erreur : \" . $e->getMessage();\n}\n?>",
          lang: "php"
        },
        {
          title: "Requetes preparees",
          body: "Les requetes preparees separent la commande SQL des donnees pour bloquer les injections SQL. On appelle prepare avec des marqueurs nommes commencant par deux-points. execute recoit un tableau associant chaque marqueur a sa valeur. Cette technique est obligatoire des qu une valeur provient de l utilisateur. Elle ameliore aussi les performances en cas d execution repetee.",
          code: "<?php\n$sql = \"INSERT INTO users (nom, email) VALUES (:nom, :email)\";\n$stmt = $pdo->prepare($sql);\n$stmt->execute([\n  \":nom\" => $_POST[\"nom\"],\n  \":email\" => $_POST[\"email\"]\n]);\necho $pdo->lastInsertId();\n?>",
          lang: "php"
        },
        {
          title: "Lire les resultats",
          body: "Apres une requete SELECT, on recupere les lignes renvoyees par la base. fetch retourne une seule ligne, fetchAll retourne toutes les lignes d un coup. Le mode PDO::FETCH_ASSOC renvoie chaque ligne sous forme de tableau associatif clair. On itere ensuite sur les resultats avec foreach. rowCount donne le nombre de lignes affectees.",
          code: "<?php\n$stmt = $pdo->query(\"SELECT * FROM users\");\n$users = $stmt->fetchAll(PDO::FETCH_ASSOC);\nforeach ($users as $user) {\n  echo $user[\"nom\"] . \" - \" . $user[\"email\"];\n}\n?>",
          lang: "php"
        }
      ]
    },
    {
      title: "Chapitre 6 — POO moderne & securite",
      lessons: [
        {
          title: "Classes, proprietes et methodes",
          body: "La programmation orientee objet organise le code autour de classes qui decrivent des objets. Une classe contient des proprietes (donnees) et des methodes (comportements). Le constructeur __construct initialise l objet a sa creation. La pseudo-variable $this designe l instance courante. Les modificateurs public, private et protected reglent la visibilite des membres.",
          code: "<?php\nclass Utilisateur {\n  public function __construct(\n    private string $nom,\n    private int $age\n  ) {}\n  public function presenter(): string {\n    return \"$this->nom, $this->age ans\";\n  }\n}\n$u = new Utilisateur(\"Ada\", 36);\necho $u->presenter();\n?>",
          lang: "php"
        },
        {
          title: "Heritage, interfaces et traits",
          body: "L heritage avec extends permet a une classe de reutiliser et specialiser une classe parente. Une interface definit un contrat de methodes que les classes implements doivent fournir. Un trait factorise des methodes reutilisables partagees entre classes sans heritage. Le mot-cle abstract empeche d instancier une classe destinee a etre etendue. Ces outils structurent de grandes applications de facon souple.",
          code: "<?php\ninterface Animal {\n  public function crier(): string;\n}\nclass Chien implements Animal {\n  public function crier(): string {\n    return \"Wouf\";\n  }\n}\necho (new Chien())->crier();\n?>",
          lang: "php"
        },
        {
          title: "Mots de passe et bonnes pratiques",
          body: "La securite est une responsabilite permanente du developpeur PHP. password_hash chiffre un mot de passe avec un algorithme robuste et un sel automatique. password_verify compare un mot de passe en clair au hash stocke sans jamais le dechiffrer. On ne stocke jamais un mot de passe en clair dans la base. Combine aux requetes preparees et a htmlspecialchars, cela forme un socle de defense solide.",
          code: "<?php\n$hash = password_hash(\"secret\", PASSWORD_DEFAULT);\nif (password_verify(\"secret\", $hash)) {\n  echo \"Connexion reussie\";\n} else {\n  echo \"Mot de passe incorrect\";\n}\n?>",
          lang: "php"
        }
      ]
    }
  ],
  reference: [
    {
      group: "Balises & syntaxe",
      items: [
        { name: "<?php ?>", syntax: "<?php ... ?>", desc: "Balises ouvrante et fermante qui delimitent un bloc de code PHP." },
        { name: "echo", syntax: "echo $valeur;", desc: "Affiche une ou plusieurs valeurs dans la sortie sans valeur de retour." },
        { name: "print", syntax: "print $valeur;", desc: "Affiche une valeur et retourne toujours 1, donc utilisable en expression." },
        { name: "//", syntax: "// commentaire", desc: "Commentaire sur une seule ligne, ignore par l interpreteur." },
        { name: "/* */", syntax: "/* bloc */", desc: "Commentaire multi-lignes pour documenter ou desactiver du code." },
        { name: ";", syntax: "instruction;", desc: "Point-virgule terminant chaque instruction PHP." },
        { name: "include", syntax: "include \"fichier.php\";", desc: "Insere et execute un autre fichier, avertissement si absent." },
        { name: "require", syntax: "require \"fichier.php\";", desc: "Comme include mais provoque une erreur fatale si le fichier manque." }
      ]
    },
    {
      group: "Types",
      items: [
        { name: "string", syntax: "$x = \"texte\";", desc: "Chaine de caracteres, entre guillemets doubles ou apostrophes." },
        { name: "int", syntax: "$x = 42;", desc: "Nombre entier signe, taille dependant de la plateforme." },
        { name: "float", syntax: "$x = 3.14;", desc: "Nombre a virgule flottante en double precision." },
        { name: "bool", syntax: "$x = true;", desc: "Valeur logique valant true ou false." },
        { name: "array", syntax: "$x = [1, 2, 3];", desc: "Collection ordonnee de valeurs indexees ou associatives." },
        { name: "null", syntax: "$x = null;", desc: "Absence de valeur, type d une variable non definie ou videe." },
        { name: "object", syntax: "$x = new Classe();", desc: "Instance d une classe regroupant proprietes et methodes." },
        { name: "gettype()", syntax: "gettype($x)", desc: "Retourne le nom du type d une variable sous forme de chaine." },
        { name: "var_dump()", syntax: "var_dump($x)", desc: "Affiche le type et la valeur detaillee d une ou plusieurs variables." }
      ]
    },
    {
      group: "Variables & superglobales",
      items: [
        { name: "$variable", syntax: "$nom = \"Ada\";", desc: "Variable, dont le nom commence toujours par un dollar." },
        { name: "$_GET", syntax: "$_GET[\"cle\"]", desc: "Parametres transmis dans la chaine de requete de l URL." },
        { name: "$_POST", syntax: "$_POST[\"cle\"]", desc: "Donnees envoyees par un formulaire en methode post." },
        { name: "$_REQUEST", syntax: "$_REQUEST[\"cle\"]", desc: "Fusion de GET, POST et COOKIE, a utiliser avec prudence." },
        { name: "$_SESSION", syntax: "$_SESSION[\"cle\"]", desc: "Donnees conservees cote serveur entre les pages d un visiteur." },
        { name: "$_COOKIE", syntax: "$_COOKIE[\"cle\"]", desc: "Cookies stockes cote client et renvoyes par le navigateur." },
        { name: "$_SERVER", syntax: "$_SERVER[\"cle\"]", desc: "Informations sur le serveur et la requete en cours." },
        { name: "$_FILES", syntax: "$_FILES[\"champ\"]", desc: "Metadonnees des fichiers televerses via un formulaire." },
        { name: "$GLOBALS", syntax: "$GLOBALS[\"x\"]", desc: "Acces a toutes les variables de portee globale." },
        { name: "define()", syntax: "define(\"PI\", 3.14)", desc: "Definit une constante globale immuable accessible partout." }
      ]
    },
    {
      group: "Operateurs",
      items: [
        { name: ".", syntax: "$a . $b", desc: "Concatene deux chaines de caracteres." },
        { name: "=", syntax: "$a = 5", desc: "Affecte une valeur a une variable." },
        { name: "==", syntax: "$a == $b", desc: "Egalite faible apres conversion eventuelle des types." },
        { name: "===", syntax: "$a === $b", desc: "Egalite stricte, compare valeur et type sans conversion." },
        { name: "&&", syntax: "$a && $b", desc: "ET logique, vrai si les deux operandes sont vrais." },
        { name: "||", syntax: "$a || $b", desc: "OU logique, vrai si au moins un operande est vrai." },
        { name: "??", syntax: "$a ?? $b", desc: "Coalescence, retourne $a sauf s il est null alors $b." },
        { name: "?:", syntax: "$a ?: $b", desc: "Operateur ternaire court, retourne $a si vrai sinon $b." },
        { name: "<=>", syntax: "$a <=> $b", desc: "Vaisseau spatial, retourne -1, 0 ou 1 pour comparer." },
        { name: "+", syntax: "$a + $b", desc: "Addition numerique, ou union pour deux tableaux." }
      ]
    },
    {
      group: "Structures de controle",
      items: [
        { name: "if / else", syntax: "if ($c) {} else {}", desc: "Execute un bloc selon qu une condition est vraie ou fausse." },
        { name: "elseif", syntax: "elseif ($c) {}", desc: "Ajoute une condition intermediaire dans une cascade if." },
        { name: "switch", syntax: "switch ($x) { case 1: }", desc: "Aiguillage selon la valeur d une expression entre plusieurs cas." },
        { name: "match", syntax: "match($x) { 1 => \"a\" }", desc: "Expression d aiguillage stricte qui retourne une valeur." },
        { name: "for", syntax: "for ($i=0; $i<$n; $i++) {}", desc: "Boucle controlee par un compteur avec init, condition et increment." },
        { name: "while", syntax: "while ($c) {}", desc: "Repete un bloc tant que la condition reste vraie." },
        { name: "do while", syntax: "do {} while ($c);", desc: "Boucle executant le bloc au moins une fois avant le test." },
        { name: "foreach", syntax: "foreach ($arr as $v) {}", desc: "Parcourt chaque element d un tableau ou objet iterable." },
        { name: "break", syntax: "break;", desc: "Interrompt immediatement la boucle ou le switch courant." },
        { name: "continue", syntax: "continue;", desc: "Passe directement a l iteration suivante de la boucle." }
      ]
    },
    {
      group: "Fonctions de chaine",
      items: [
        { name: "strlen()", syntax: "strlen($s)", desc: "Retourne le nombre d octets d une chaine." },
        { name: "strtoupper()", syntax: "strtoupper($s)", desc: "Convertit la chaine entierement en majuscules." },
        { name: "strtolower()", syntax: "strtolower($s)", desc: "Convertit la chaine entierement en minuscules." },
        { name: "trim()", syntax: "trim($s)", desc: "Supprime les espaces en debut et fin de chaine." },
        { name: "str_replace()", syntax: "str_replace($a, $b, $s)", desc: "Remplace toutes les occurrences de $a par $b dans $s." },
        { name: "substr()", syntax: "substr($s, $debut, $len)", desc: "Extrait une portion de chaine a partir d une position." },
        { name: "explode()", syntax: "explode($sep, $s)", desc: "Decoupe une chaine en tableau selon un separateur." },
        { name: "implode()", syntax: "implode($sep, $arr)", desc: "Assemble les elements d un tableau en une chaine." },
        { name: "str_contains()", syntax: "str_contains($s, $x)", desc: "Indique si la chaine contient une sous-chaine donnee." },
        { name: "sprintf()", syntax: "sprintf(\"%d\", $n)", desc: "Formate une chaine selon un patron et retourne le resultat." },
        { name: "htmlspecialchars()", syntax: "htmlspecialchars($s)", desc: "Echappe les caracteres HTML pour prevenir les attaques XSS." }
      ]
    },
    {
      group: "Fonctions de tableau",
      items: [
        { name: "count()", syntax: "count($arr)", desc: "Retourne le nombre d elements d un tableau." },
        { name: "array_push()", syntax: "array_push($arr, $v)", desc: "Ajoute un ou plusieurs elements a la fin du tableau." },
        { name: "array_pop()", syntax: "array_pop($arr)", desc: "Retire et retourne le dernier element du tableau." },
        { name: "array_map()", syntax: "array_map($fn, $arr)", desc: "Applique une fonction a chaque element et retourne le resultat." },
        { name: "array_filter()", syntax: "array_filter($arr, $fn)", desc: "Conserve les elements pour lesquels la fonction retourne vrai." },
        { name: "array_merge()", syntax: "array_merge($a, $b)", desc: "Fusionne plusieurs tableaux en un seul." },
        { name: "in_array()", syntax: "in_array($v, $arr)", desc: "Indique si une valeur est presente dans le tableau." },
        { name: "array_keys()", syntax: "array_keys($arr)", desc: "Retourne toutes les cles d un tableau." },
        { name: "sort()", syntax: "sort($arr)", desc: "Trie un tableau par valeurs croissantes en place." },
        { name: "array_reduce()", syntax: "array_reduce($arr, $fn)", desc: "Reduit un tableau a une seule valeur par accumulation." }
      ]
    },
    {
      group: "Fonctions de fichier",
      items: [
        { name: "fopen()", syntax: "fopen($chemin, $mode)", desc: "Ouvre un fichier ou une URL et retourne une ressource." },
        { name: "fclose()", syntax: "fclose($handle)", desc: "Ferme une ressource de fichier ouverte." },
        { name: "fread()", syntax: "fread($handle, $len)", desc: "Lit un nombre d octets depuis une ressource de fichier." },
        { name: "fwrite()", syntax: "fwrite($handle, $s)", desc: "Ecrit une chaine dans une ressource de fichier." },
        { name: "file_get_contents()", syntax: "file_get_contents($chemin)", desc: "Lit l integralite d un fichier dans une chaine." },
        { name: "file_put_contents()", syntax: "file_put_contents($chemin, $s)", desc: "Ecrit une chaine dans un fichier en une seule operation." },
        { name: "file_exists()", syntax: "file_exists($chemin)", desc: "Verifie si un fichier ou dossier existe." },
        { name: "unlink()", syntax: "unlink($chemin)", desc: "Supprime un fichier du systeme." },
        { name: "scandir()", syntax: "scandir($dossier)", desc: "Retourne la liste des fichiers et dossiers d un repertoire." }
      ]
    },
    {
      group: "Base de donnees (PDO)",
      items: [
        { name: "new PDO()", syntax: "new PDO($dsn, $user, $pass)", desc: "Cree une connexion a une base via une chaine DSN." },
        { name: "prepare()", syntax: "$pdo->prepare($sql)", desc: "Prepare une requete avec marqueurs contre les injections SQL." },
        { name: "execute()", syntax: "$stmt->execute($params)", desc: "Execute une requete preparee avec ses parametres." },
        { name: "query()", syntax: "$pdo->query($sql)", desc: "Execute directement une requete SQL sans parametres." },
        { name: "fetch()", syntax: "$stmt->fetch()", desc: "Recupere la ligne suivante du jeu de resultats." },
        { name: "fetchAll()", syntax: "$stmt->fetchAll()", desc: "Recupere toutes les lignes restantes dans un tableau." },
        { name: "lastInsertId()", syntax: "$pdo->lastInsertId()", desc: "Retourne l identifiant genere lors du dernier INSERT." },
        { name: "rowCount()", syntax: "$stmt->rowCount()", desc: "Retourne le nombre de lignes affectees par la requete." },
        { name: "bindValue()", syntax: "$stmt->bindValue(\":x\", $v)", desc: "Associe une valeur a un marqueur de requete preparee." },
        { name: "beginTransaction()", syntax: "$pdo->beginTransaction()", desc: "Ouvre une transaction pour grouper plusieurs requetes." }
      ]
    },
    {
      group: "Sessions & cookies",
      items: [
        { name: "session_start()", syntax: "session_start()", desc: "Demarre ou reprend une session, avant tout affichage." },
        { name: "$_SESSION", syntax: "$_SESSION[\"x\"] = $v", desc: "Tableau de stockage des donnees de session cote serveur." },
        { name: "session_destroy()", syntax: "session_destroy()", desc: "Detruit toutes les donnees de la session courante." },
        { name: "session_unset()", syntax: "session_unset()", desc: "Vide toutes les variables de la session sans la detruire." },
        { name: "setcookie()", syntax: "setcookie($nom, $val, $exp)", desc: "Envoie un cookie au navigateur avec une expiration." },
        { name: "$_COOKIE", syntax: "$_COOKIE[\"x\"]", desc: "Tableau des cookies renvoyes par le navigateur." },
        { name: "session_id()", syntax: "session_id()", desc: "Retourne ou definit l identifiant de la session courante." },
        { name: "session_regenerate_id()", syntax: "session_regenerate_id()", desc: "Renouvelle l identifiant de session contre le vol de session." }
      ]
    },
    {
      group: "POO (class, trait, interface)",
      items: [
        { name: "class", syntax: "class Nom {}", desc: "Declare une classe regroupant proprietes et methodes." },
        { name: "__construct", syntax: "public function __construct() {}", desc: "Methode appelee automatiquement a la creation de l objet." },
        { name: "new", syntax: "new Classe()", desc: "Instancie un objet a partir d une classe." },
        { name: "$this", syntax: "$this->prop", desc: "Reference l instance courante au sein d une methode." },
        { name: "extends", syntax: "class A extends B {}", desc: "Fait heriter une classe des membres d une classe parente." },
        { name: "interface", syntax: "interface Nom {}", desc: "Definit un contrat de methodes a implementer." },
        { name: "implements", syntax: "class A implements I {}", desc: "Indique qu une classe respecte une ou plusieurs interfaces." },
        { name: "trait", syntax: "trait T {}", desc: "Regroupe des methodes reutilisables partagees entre classes." },
        { name: "abstract", syntax: "abstract class A {}", desc: "Empeche l instanciation directe d une classe a etendre." },
        { name: "static", syntax: "public static $x;", desc: "Membre appartenant a la classe plutot qu a une instance." },
        { name: "public / private", syntax: "private $x;", desc: "Modificateurs reglant la visibilite des proprietes et methodes." }
      ]
    }
  ]
});
