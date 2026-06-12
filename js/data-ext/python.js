/* ============================================================
   CODEX — Extension Python : cours progressif + reference
   Greffe sur la fiche "python" via CODEX.extend(...)
   ============================================================ */
CODEX.extend('python', {
  course: [
    {
      title: "Chapitre 1 — Types & variables",
      lessons: [
        {
          title: "Variables et affectation",
          body: "En Python, une variable n'est pas une boite mais une etiquette posee sur un objet. L'affectation se fait avec le signe egal et ne necessite aucune declaration de type prealable. Une meme variable peut etre reaffectee a un objet d'un autre type au cours du programme. Le nom doit commencer par une lettre ou un underscore, et la convention privilegie le snake_case. On peut affecter plusieurs variables en une seule ligne par deballage.",
          code: "age = 30\nnom = \"Ada\"\nx, y, z = 1, 2, 3\nage = \"trente\"  # reaffectation autorisee",
          lang: "python"
        },
        {
          title: "Les types numeriques et booleens",
          body: "Python distingue les entiers (int), de precision arbitraire, des nombres a virgule flottante (float). Le type complex existe pour les nombres complexes. Le type bool ne possede que deux valeurs, True et False, qui sont en realite des entiers valant 1 et 0. La division avec une seule barre oblique renvoie toujours un float, tandis que la double barre effectue une division entiere.",
          code: "entier = 42\nflottant = 3.14\nvrai = True\nprint(7 / 2)   # 3.5\nprint(7 // 2)  # 3\nprint(2 ** 10) # 1024",
          lang: "python"
        },
        {
          title: "Les chaines de caracteres",
          body: "Une chaine (str) est une sequence immuable de caracteres, delimitee par des guillemets simples ou doubles. Les f-strings, prefixees par la lettre f, permettent d'interpoler des expressions directement entre accolades. On accede a un caractere par son index, et a une portion par le decoupage (slicing). Les chaines exposent de nombreuses methodes comme upper, strip ou replace, qui renvoient toujours une nouvelle chaine.",
          code: "nom = \"Codex\"\nprint(f\"Bonjour {nom}, {len(nom)} lettres\")\nprint(nom[0])     # C\nprint(nom[1:4])   # ode\nprint(nom.upper())# CODEX",
          lang: "python"
        },
        {
          title: "Conversion et inspection de type",
          body: "Le typage est dynamique mais fort : Python refuse de melanger implicitement des types incompatibles. La fonction type renvoie le type d'un objet, et isinstance verifie l'appartenance a un type. Les conversions explicites se font via les constructeurs int, float, str ou bool. Une conversion impossible, comme int sur une lettre, leve une ValueError.",
          code: "x = \"123\"\nn = int(x)        # 123\nprint(type(n))    # <class 'int'>\nprint(isinstance(n, int))  # True\nprint(str(3.14))  # \"3.14\"",
          lang: "python"
        }
      ]
    },
    {
      title: "Chapitre 2 — Structures de controle",
      lessons: [
        {
          title: "Conditions if / elif / else",
          body: "Le mot-cle if execute un bloc si une condition est vraie, elif teste une condition alternative, et else couvre tous les autres cas. L'indentation, generalement de quatre espaces, definit l'appartenance au bloc et remplace les accolades. Toute valeur possede une veracite implicite : zero, la chaine vide, la liste vide et None sont consideres comme faux. L'operateur ternaire condense un choix simple sur une seule ligne.",
          code: "note = 14\nif note >= 16:\n    mention = \"tres bien\"\nelif note >= 12:\n    mention = \"assez bien\"\nelse:\n    mention = \"passable\"\nstatut = \"recu\" if note >= 10 else \"recale\"",
          lang: "python"
        },
        {
          title: "La boucle for",
          body: "La boucle for parcourt directement les elements d'un iterable, sans gestion manuelle d'index. Associee a range, elle genere une suite d'entiers. La fonction enumerate fournit simultanement l'index et la valeur, et zip parcourt plusieurs sequences en parallele. Les mots-cles break et continue interrompent ou ecourtent une iteration.",
          code: "for i in range(3):\n    print(i)          # 0 1 2\nfor idx, c in enumerate(\"abc\"):\n    print(idx, c)\nfor a, b in zip([1, 2], [\"x\", \"y\"]):\n    print(a, b)",
          lang: "python"
        },
        {
          title: "La boucle while et le controle de flux",
          body: "La boucle while repete un bloc tant que sa condition reste vraie, ce qui convient aux situations dont on ignore le nombre d'iterations a l'avance. Le mot-cle break sort immediatement de la boucle, continue saute a l'iteration suivante. Une clause else attachee a une boucle s'execute uniquement si celle-ci se termine sans break. Il faut veiller a modifier la condition pour eviter une boucle infinie.",
          code: "n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nelse:\n    print(\"termine sans interruption\")",
          lang: "python"
        }
      ]
    },
    {
      title: "Chapitre 3 — Fonctions",
      lessons: [
        {
          title: "Definir et appeler une fonction",
          body: "Une fonction se declare avec le mot-cle def, suivi d'un nom et d'une liste de parametres entre parentheses. Le mot-cle return renvoie une valeur et met fin a l'execution ; en son absence, la fonction renvoie None. Une docstring placee en premiere ligne documente le role de la fonction. Les fonctions favorisent la reutilisation et la lisibilite en isolant la logique.",
          code: "def carre(x):\n    \"\"\"Renvoie le carre de x.\"\"\"\n    return x * x\n\nresultat = carre(5)  # 25",
          lang: "python"
        },
        {
          title: "Arguments, valeurs par defaut et *args / **kwargs",
          body: "Les parametres peuvent recevoir une valeur par defaut, rendant l'argument optionnel a l'appel. On peut passer les arguments par position ou par mot-cle pour plus de clarte. La syntaxe *args capture un nombre variable d'arguments positionnels dans un tuple, et **kwargs capture les arguments nommes dans un dictionnaire. Il faut eviter d'utiliser un objet mutable comme valeur par defaut.",
          code: "def saluer(nom, message=\"Bonjour\"):\n    return f\"{message}, {nom}\"\n\ndef trace(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict\n\ntrace(1, 2, mode=\"debug\")",
          lang: "python"
        },
        {
          title: "Portee, lambda et fonctions de premiere classe",
          body: "Une variable definie dans une fonction est locale et invisible a l'exterieur ; le mot-cle global permet de modifier une variable du module. Les fonctions sont des objets de premiere classe : on peut les stocker, les passer en argument et les renvoyer. Une lambda est une fonction anonyme tenant sur une seule expression, utile avec map, filter ou sorted. Cette nature fonctionnelle rend le code concis.",
          code: "double = lambda x: x * 2\nprint(double(4))  # 8\n\nmots = [\"poire\", \"a\", \"kiwi\"]\nmots.sort(key=lambda m: len(m))\nprint(mots)  # ['a', 'kiwi', 'poire']",
          lang: "python"
        }
      ]
    },
    {
      title: "Chapitre 4 — Structures de donnees",
      lessons: [
        {
          title: "Les listes",
          body: "La liste est une sequence ordonnee et mutable, capable de contenir des elements de types varies. On y accede par index, positif depuis le debut ou negatif depuis la fin, et par decoupage. Les methodes append, insert, remove et pop modifient la liste sur place. Le decoupage et la fonction sorted permettent de creer des copies ordonnees sans alterer l'originale.",
          code: "fruits = [\"pomme\", \"kiwi\"]\nfruits.append(\"poire\")\nfruits.insert(0, \"figue\")\nprint(fruits[-1])    # poire\nprint(fruits[1:3])   # ['pomme', 'kiwi']\nfruits.sort()",
          lang: "python"
        },
        {
          title: "Les dictionnaires",
          body: "Le dictionnaire associe des cles uniques a des valeurs, offrant un acces quasi instantane par cle. Les cles doivent etre immuables, comme des chaines ou des tuples. La methode get renvoie une valeur par defaut si la cle est absente, evitant une KeyError. On parcourt un dictionnaire avec items, keys ou values, et l'operateur in teste la presence d'une cle.",
          code: "personne = {\"nom\": \"Ada\", \"age\": 36}\nprint(personne[\"nom\"])\nprint(personne.get(\"ville\", \"inconnue\"))\npersonne[\"ville\"] = \"Londres\"\nfor cle, val in personne.items():\n    print(cle, val)",
          lang: "python"
        },
        {
          title: "Tuples et ensembles",
          body: "Le tuple est une sequence ordonnee mais immuable, ideal pour des donnees figees ou pour renvoyer plusieurs valeurs d'une fonction. Son immutabilite permet de l'utiliser comme cle de dictionnaire. L'ensemble (set) est une collection non ordonnee d'elements uniques, parfaite pour eliminer les doublons et tester l'appartenance. Les ensembles supportent les operations mathematiques d'union, d'intersection et de difference.",
          code: "point = (3, 4)\nx, y = point  # deballage\n\nuniques = {1, 2, 2, 3}  # {1, 2, 3}\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)  # {2, 3}\nprint(a | b)  # {1, 2, 3, 4}",
          lang: "python"
        },
        {
          title: "Les comprehensions",
          body: "Une comprehension construit une collection en une seule expression lisible, remplacant une boucle d'accumulation. La comprehension de liste utilise des crochets, celle de dictionnaire des accolades avec une paire cle-valeur, et celle d'ensemble des accolades simples. On peut y ajouter une condition pour filtrer les elements. Bien employees, elles rendent le code plus concis sans sacrifier la clarte.",
          code: "carres = [n * n for n in range(5)]\npairs = [n for n in range(10) if n % 2 == 0]\ntable = {n: n * n for n in range(4)}\nlettres = {c for c in \"mississippi\"}",
          lang: "python"
        }
      ]
    },
    {
      title: "Chapitre 5 — Programmation orientee objet",
      lessons: [
        {
          title: "Classes, objets et __init__",
          body: "Une classe est un plan qui definit les attributs et les comportements d'objets. Le constructeur __init__ initialise chaque instance, et le premier parametre self designe l'objet en cours. Les attributs d'instance sont propres a chaque objet, tandis que les attributs de classe sont partages. On cree une instance en appelant la classe comme une fonction.",
          code: "class Chien:\n    espece = \"Canis\"  # attribut de classe\n    def __init__(self, nom):\n        self.nom = nom  # attribut d'instance\n    def aboyer(self):\n        return f\"{self.nom} fait Wouf\"\n\nrex = Chien(\"Rex\")\nprint(rex.aboyer())",
          lang: "python"
        },
        {
          title: "Heritage et polymorphisme",
          body: "L'heritage permet a une classe d'etendre une autre en reutilisant ses attributs et methodes. La fonction super donne acces a la classe parente, notamment pour appeler son constructeur. Une classe fille peut redefinir une methode du parent : c'est le polymorphisme, qui adapte un meme appel a chaque type. Python pratique aussi le duck typing, ou seule la presence des methodes attendues importe.",
          code: "class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n    def crier(self):\n        return \"...\"\n\nclass Chat(Animal):\n    def crier(self):\n        return \"Miaou\"\n\nprint(Chat(\"Felix\").crier())  # Miaou",
          lang: "python"
        },
        {
          title: "Methodes speciales et proprietes",
          body: "Les methodes speciales, encadrees de doubles underscores, permettent aux objets de s'integrer aux operateurs et fonctions du langage. La methode __str__ definit l'affichage lisible, __repr__ la representation technique, et __eq__ l'egalite. Le decorateur property transforme une methode en attribut calcule, accessible sans parentheses. Ces mecanismes rendent les objets idiomatiques et naturels a manipuler.",
          code: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n    def __eq__(self, autre):\n        return self.x == autre.x and self.y == autre.y\n\nprint(Point(1, 2))  # (1, 2)",
          lang: "python"
        }
      ]
    },
    {
      title: "Chapitre 6 — Modules, exceptions & fichiers",
      lessons: [
        {
          title: "Modules et imports",
          body: "Un module est un fichier Python regroupant des fonctions, classes et variables reutilisables. On l'importe entierement avec import, ou partiellement avec from ... import. Le mot-cle as cree un alias, pratique pour les noms longs. La bibliotheque standard fournit des centaines de modules prets a l'emploi, comme math, os, json ou datetime, et le gestionnaire pip installe des paquets externes.",
          code: "import math\nfrom datetime import datetime\nimport json as j\n\nprint(math.sqrt(16))   # 4.0\nprint(datetime.now())\ndonnees = j.dumps({\"a\": 1})",
          lang: "python"
        },
        {
          title: "Gestion des exceptions",
          body: "Une exception interrompt le flux normal lorsqu'une erreur survient. Le bloc try contient le code surveille, except capture un type d'erreur precis pour le traiter, else s'execute en l'absence d'erreur, et finally s'execute toujours, meme apres une exception. Le mot-cle raise leve volontairement une exception. Capturer un type precis plutot que toute erreur evite de masquer des bugs.",
          code: "try:\n    x = int(\"abc\")\nexcept ValueError as e:\n    print(\"Erreur:\", e)\nelse:\n    print(\"Conversion reussie\")\nfinally:\n    print(\"Toujours execute\")",
          lang: "python"
        },
        {
          title: "Lecture et ecriture de fichiers",
          body: "La fonction open ouvre un fichier selon un mode : lecture, ecriture ou ajout. Le gestionnaire de contexte with garantit la fermeture du fichier meme en cas d'erreur, en appelant automatiquement les methodes d'entree et de sortie. On lit avec read ou ligne par ligne dans une boucle for, et on ecrit avec write. Il est conseille de preciser l'encodage, par exemple utf-8.",
          code: "with open(\"notes.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Premiere ligne\\n\")\n\nwith open(\"notes.txt\", encoding=\"utf-8\") as f:\n    for ligne in f:\n        print(ligne.strip())",
          lang: "python"
        }
      ]
    }
  ],
  reference: [
    {
      group: "Mots-cles",
      items: [
        { name: "def", syntax: "def nom(params):", desc: "Declare une fonction ou une methode." },
        { name: "return", syntax: "return valeur", desc: "Renvoie une valeur et termine la fonction." },
        { name: "if / elif / else", syntax: "if cond:", desc: "Execute un bloc selon une condition booleenne." },
        { name: "for", syntax: "for x in iterable:", desc: "Itere sur les elements d'un iterable." },
        { name: "while", syntax: "while cond:", desc: "Repete un bloc tant que la condition est vraie." },
        { name: "break / continue", syntax: "break", desc: "Interrompt la boucle ou passe a l'iteration suivante." },
        { name: "class", syntax: "class Nom:", desc: "Definit une nouvelle classe d'objets." },
        { name: "import / from", syntax: "from mod import x", desc: "Importe un module ou un de ses elements." },
        { name: "try / except / finally", syntax: "try:", desc: "Capture et traite les exceptions." },
        { name: "with", syntax: "with ctx as v:", desc: "Gere une ressource avec liberation garantie." },
        { name: "lambda", syntax: "lambda x: x + 1", desc: "Cree une fonction anonyme sur une expression." },
        { name: "yield", syntax: "yield valeur", desc: "Produit une valeur dans un generateur, paresseusement." }
      ]
    },
    {
      group: "Types integres",
      items: [
        { name: "int", syntax: "int(x)", desc: "Entier de precision arbitraire." },
        { name: "float", syntax: "float(x)", desc: "Nombre a virgule flottante en double precision." },
        { name: "str", syntax: "str(x)", desc: "Chaine de caracteres immuable et unicode." },
        { name: "bool", syntax: "bool(x)", desc: "Valeur booleenne True ou False." },
        { name: "list", syntax: "list(iter)", desc: "Sequence ordonnee et mutable." },
        { name: "tuple", syntax: "tuple(iter)", desc: "Sequence ordonnee et immuable." },
        { name: "dict", syntax: "dict(...)", desc: "Table associant des cles uniques a des valeurs." },
        { name: "set", syntax: "set(iter)", desc: "Collection non ordonnee d'elements uniques." },
        { name: "bytes", syntax: "bytes(x)", desc: "Sequence immuable d'octets." },
        { name: "complex", syntax: "complex(a, b)", desc: "Nombre complexe a partie reelle et imaginaire." },
        { name: "NoneType", syntax: "None", desc: "Type de l'objet unique None, absence de valeur." },
        { name: "frozenset", syntax: "frozenset(iter)", desc: "Ensemble immuable, utilisable comme cle." }
      ]
    },
    {
      group: "Operateurs",
      items: [
        { name: "+ - * /", syntax: "a + b", desc: "Operations arithmetiques de base ; / renvoie un float." },
        { name: "// %", syntax: "a // b", desc: "Division entiere et reste (modulo)." },
        { name: "**", syntax: "a ** b", desc: "Elevation a la puissance." },
        { name: "== != < > <= >=", syntax: "a == b", desc: "Operateurs de comparaison renvoyant un booleen." },
        { name: "and or not", syntax: "a and b", desc: "Operateurs logiques a evaluation paresseuse." },
        { name: "in / not in", syntax: "x in seq", desc: "Teste l'appartenance a une sequence ou collection." },
        { name: "is / is not", syntax: "a is b", desc: "Teste l'identite (meme objet en memoire)." },
        { name: "= += -=", syntax: "x += 1", desc: "Affectation simple et affectations augmentees." },
        { name: "& | ^ ~", syntax: "a & b", desc: "Operateurs binaires bit a bit (et, ou, xor, non)." },
        { name: "<< >>", syntax: "a << n", desc: "Decalage des bits a gauche ou a droite." },
        { name: ":=", syntax: "(n := f())", desc: "Operateur morse : affecte au sein d'une expression." }
      ]
    },
    {
      group: "Fonctions integrees",
      items: [
        { name: "print()", syntax: "print(*objs, sep, end)", desc: "Affiche des objets sur la sortie standard." },
        { name: "len()", syntax: "len(obj)", desc: "Renvoie le nombre d'elements d'une collection." },
        { name: "range()", syntax: "range(debut, fin, pas)", desc: "Genere une suite d'entiers paresseuse." },
        { name: "enumerate()", syntax: "enumerate(iter)", desc: "Couple chaque element a son index." },
        { name: "zip()", syntax: "zip(a, b)", desc: "Agrege plusieurs iterables en tuples paralleles." },
        { name: "type()", syntax: "type(obj)", desc: "Renvoie le type d'un objet." },
        { name: "isinstance()", syntax: "isinstance(obj, T)", desc: "Teste si un objet est d'un type donne." },
        { name: "sorted()", syntax: "sorted(iter, key)", desc: "Renvoie une nouvelle liste triee." },
        { name: "map() / filter()", syntax: "map(f, iter)", desc: "Applique ou filtre une fonction sur un iterable." },
        { name: "sum() / min() / max()", syntax: "sum(iter)", desc: "Somme, minimum ou maximum d'un iterable." },
        { name: "input()", syntax: "input(prompt)", desc: "Lit une ligne saisie par l'utilisateur." },
        { name: "open()", syntax: "open(chemin, mode)", desc: "Ouvre un fichier et renvoie un objet fichier." }
      ]
    },
    {
      group: "Methodes de chaine (str)",
      items: [
        { name: "upper() / lower()", syntax: "s.upper()", desc: "Renvoie la chaine en majuscules ou minuscules." },
        { name: "strip()", syntax: "s.strip(chars)", desc: "Retire les espaces ou caracteres en bordure." },
        { name: "split()", syntax: "s.split(sep)", desc: "Decoupe la chaine en liste selon un separateur." },
        { name: "join()", syntax: "sep.join(iter)", desc: "Assemble un iterable de chaines en une seule." },
        { name: "replace()", syntax: "s.replace(a, b)", desc: "Remplace toutes les occurrences d'une sous-chaine." },
        { name: "find() / index()", syntax: "s.find(sub)", desc: "Localise une sous-chaine ; find renvoie -1 si absente." },
        { name: "startswith() / endswith()", syntax: "s.startswith(p)", desc: "Teste le prefixe ou le suffixe de la chaine." },
        { name: "format()", syntax: "s.format(*a)", desc: "Interpole des valeurs dans des accolades." },
        { name: "isdigit() / isalpha()", syntax: "s.isdigit()", desc: "Teste si la chaine est numerique ou alphabetique." },
        { name: "title() / capitalize()", syntax: "s.title()", desc: "Met en capitale chaque mot ou la premiere lettre." }
      ]
    },
    {
      group: "Methodes de liste",
      items: [
        { name: "append()", syntax: "lst.append(x)", desc: "Ajoute un element a la fin de la liste." },
        { name: "extend()", syntax: "lst.extend(iter)", desc: "Ajoute tous les elements d'un iterable." },
        { name: "insert()", syntax: "lst.insert(i, x)", desc: "Insere un element a la position indiquee." },
        { name: "remove()", syntax: "lst.remove(x)", desc: "Supprime la premiere occurrence d'une valeur." },
        { name: "pop()", syntax: "lst.pop(i)", desc: "Retire et renvoie l'element a l'index donne." },
        { name: "index()", syntax: "lst.index(x)", desc: "Renvoie l'index de la premiere occurrence." },
        { name: "count()", syntax: "lst.count(x)", desc: "Compte le nombre d'occurrences d'une valeur." },
        { name: "sort()", syntax: "lst.sort(key)", desc: "Trie la liste sur place." },
        { name: "reverse()", syntax: "lst.reverse()", desc: "Inverse l'ordre des elements sur place." },
        { name: "copy()", syntax: "lst.copy()", desc: "Renvoie une copie superficielle de la liste." }
      ]
    },
    {
      group: "Methodes de dictionnaire",
      items: [
        { name: "get()", syntax: "d.get(cle, defaut)", desc: "Renvoie une valeur ou un defaut si la cle est absente." },
        { name: "keys()", syntax: "d.keys()", desc: "Renvoie une vue sur les cles du dictionnaire." },
        { name: "values()", syntax: "d.values()", desc: "Renvoie une vue sur les valeurs." },
        { name: "items()", syntax: "d.items()", desc: "Renvoie une vue de paires (cle, valeur)." },
        { name: "update()", syntax: "d.update(autre)", desc: "Fusionne un autre dictionnaire dans celui-ci." },
        { name: "pop()", syntax: "d.pop(cle)", desc: "Retire une cle et renvoie sa valeur." },
        { name: "setdefault()", syntax: "d.setdefault(c, v)", desc: "Renvoie la valeur, en l'inserant si la cle manque." },
        { name: "clear()", syntax: "d.clear()", desc: "Vide entierement le dictionnaire." },
        { name: "copy()", syntax: "d.copy()", desc: "Renvoie une copie superficielle du dictionnaire." },
        { name: "fromkeys()", syntax: "dict.fromkeys(cles, v)", desc: "Cree un dictionnaire a partir de cles et d'une valeur." }
      ]
    },
    {
      group: "Comprehensions",
      items: [
        { name: "Liste", syntax: "[x for x in iter]", desc: "Construit une liste a partir d'une expression iteree." },
        { name: "Liste filtree", syntax: "[x for x in iter if c]", desc: "Construit une liste en filtrant les elements." },
        { name: "Dictionnaire", syntax: "{k: v for ... in iter}", desc: "Construit un dictionnaire cle-valeur." },
        { name: "Ensemble", syntax: "{x for x in iter}", desc: "Construit un ensemble d'elements uniques." },
        { name: "Generateur", syntax: "(x for x in iter)", desc: "Cree un generateur paresseux econome en memoire." },
        { name: "Imbriquee", syntax: "[x for r in m for x in r]", desc: "Aplatit ou combine plusieurs iterables imbriques." },
        { name: "Conditionnelle", syntax: "[a if c else b for ...]", desc: "Choisit une expression selon une condition par element." }
      ]
    },
    {
      group: "Modules standard essentiels",
      items: [
        { name: "os", syntax: "import os", desc: "Interface avec le systeme : chemins, variables, processus." },
        { name: "sys", syntax: "import sys", desc: "Acces a l'interpreteur : arguments, sortie, chemin." },
        { name: "math", syntax: "import math", desc: "Fonctions mathematiques : sqrt, pi, sin, floor." },
        { name: "json", syntax: "import json", desc: "Serialisation et lecture de donnees au format JSON." },
        { name: "datetime", syntax: "from datetime import datetime", desc: "Manipulation des dates, heures et durees." },
        { name: "random", syntax: "import random", desc: "Generation de nombres et choix aleatoires." },
        { name: "re", syntax: "import re", desc: "Recherche et manipulation par expressions regulieres." },
        { name: "collections", syntax: "from collections import Counter", desc: "Structures specialisees : Counter, defaultdict, deque." },
        { name: "itertools", syntax: "import itertools", desc: "Outils d'iteration : product, chain, combinations." },
        { name: "pathlib", syntax: "from pathlib import Path", desc: "Manipulation orientee objet des chemins de fichiers." }
      ]
    },
    {
      group: "Classes & methodes speciales (dunder)",
      items: [
        { name: "__init__", syntax: "def __init__(self):", desc: "Constructeur appele a la creation d'une instance." },
        { name: "__str__", syntax: "def __str__(self):", desc: "Representation lisible renvoyee par str et print." },
        { name: "__repr__", syntax: "def __repr__(self):", desc: "Representation technique pour le debogage." },
        { name: "__eq__", syntax: "def __eq__(self, o):", desc: "Definit l'egalite entre deux objets." },
        { name: "__len__", syntax: "def __len__(self):", desc: "Definit le resultat de la fonction len." },
        { name: "__getitem__", syntax: "def __getitem__(self, k):", desc: "Permet l'acces par crochets obj[k]." },
        { name: "__iter__", syntax: "def __iter__(self):", desc: "Rend l'objet iterable dans une boucle for." },
        { name: "__call__", syntax: "def __call__(self):", desc: "Rend l'instance appelable comme une fonction." },
        { name: "__enter__ / __exit__", syntax: "def __enter__(self):", desc: "Definit le comportement d'un gestionnaire de contexte." },
        { name: "super()", syntax: "super().__init__()", desc: "Accede a la classe parente lors de l'heritage." }
      ]
    },
    {
      group: "Gestion d'exceptions",
      items: [
        { name: "try / except", syntax: "try: ... except E:", desc: "Surveille un bloc et capture les erreurs d'un type." },
        { name: "else / finally", syntax: "finally: ...", desc: "Bloc sans erreur (else) ou toujours execute (finally)." },
        { name: "raise", syntax: "raise ValueError(msg)", desc: "Leve volontairement une exception." },
        { name: "ValueError", syntax: "ValueError", desc: "Valeur de type correct mais inappropriee." },
        { name: "TypeError", syntax: "TypeError", desc: "Operation appliquee a un type incompatible." },
        { name: "KeyError", syntax: "KeyError", desc: "Cle absente lors d'un acces a un dictionnaire." },
        { name: "IndexError", syntax: "IndexError", desc: "Index hors des limites d'une sequence." },
        { name: "FileNotFoundError", syntax: "FileNotFoundError", desc: "Fichier introuvable a l'ouverture." },
        { name: "ZeroDivisionError", syntax: "ZeroDivisionError", desc: "Division ou modulo par zero." },
        { name: "Exception", syntax: "except Exception as e:", desc: "Classe de base de la plupart des exceptions." }
      ]
    }
  ]
});
