CODEX.extend('ruby', {
  course: [
    {
      title: "Chapitre 1 — Tout est objet & types",
      lessons: [
        {
          title: "La philosophie : tout est un objet",
          body: "En Ruby, absolument tout est un objet, y compris les nombres, les chaines, les booleens et meme nil. Cela signifie que vous appelez des methodes sur des valeurs litterales directement, ce qui rend le code tres expressif. Chaque objet est une instance d'une classe que vous pouvez interroger avec la methode class. Cette uniformite est au coeur de l'elegance de Ruby et explique pourquoi le langage privilegie la lisibilite. Comprendre ce principe change votre facon de penser le code.",
          code: "puts 42.class          # Integer\nputs \"salut\".class      # String\nputs nil.class          # NilClass\nputs 3.14.even?         # NoMethodError, mais 4.even? marche",
          lang: "ruby"
        },
        {
          title: "Les types numeriques et les chaines",
          body: "Ruby distingue les entiers (Integer) des nombres a virgule (Float) mais convertit intelligemment lors des operations. Les chaines de caracteres peuvent etre ecrites avec des guillemets simples ou doubles, ces derniers autorisant l'interpolation. L'interpolation injecte une expression dans une chaine grace a la syntaxe entre accolades precedees d'un dièse. Les entiers Ruby n'ont pas de limite de taille fixe et gerent automatiquement les grands nombres. Ce confort evite de nombreux pieges presents dans d'autres langages.",
          code: "nom = \"Ada\"\nage = 36\nputs \"#{nom} a #{age} ans\"   # interpolation\nputs 10 / 3                  # 3 (division entiere)\nputs 10.0 / 3                # 3.333...",
          lang: "ruby"
        },
        {
          title: "Symboles, nil et booleens",
          body: "Un symbole est un identifiant immuable et unique en memoire, ecrit avec un deux-points en prefixe, souvent utilise comme cle de hash. Contrairement aux chaines, deux symboles identiques pointent vers le meme objet, ce qui les rend tres performants. La valeur nil represente l'absence de valeur et est le seul objet, avec false, a etre considere comme faux. Toutes les autres valeurs, y compris zero et la chaine vide, sont considerees comme vraies. Cette regle simple gouverne toute la logique conditionnelle en Ruby.",
          code: ":statut.class           # Symbol\nputs :a.equal?(:a)      # true (meme objet)\nputs nil.to_s.empty?    # true\nputs (0 ? \"vrai\" : \"faux\")   # vrai, car 0 est truthy",
          lang: "ruby"
        }
      ]
    },
    {
      title: "Chapitre 2 — Methodes, blocs & controle",
      lessons: [
        {
          title: "Definir des methodes",
          body: "On declare une methode avec le mot-cle def suivi du nom et d'une liste optionnelle de parametres. Ruby retourne implicitement la valeur de la derniere expression evaluee, rendant le mot-cle return souvent superflu. Les parametres peuvent avoir des valeurs par defaut et l'on peut capturer un nombre variable d'arguments avec l'operateur splat. Par convention, un nom de methode se terminant par un point d'interrogation retourne un booleen. Les methodes sont au coeur de l'organisation du code en Ruby.",
          code: "def saluer(nom = \"monde\")\n  \"Bonjour #{nom}\"\nend\n\nputs saluer            # Bonjour monde\nputs saluer(\"Ada\")     # Bonjour Ada",
          lang: "ruby"
        },
        {
          title: "Les structures de controle",
          body: "Ruby propose if, unless, while, until et case pour gerer le flux d'execution. Le modificateur en fin de ligne permet d'ecrire une condition apres l'instruction pour un style concis. Le mot-cle unless est l'inverse de if et exprime une condition negative plus lisiblement. La structure case utilise l'operateur de comparaison de cas et accepte des plages, des classes ou des expressions regulieres. Cette richesse permet d'ecrire un controle de flux tres naturel a lire.",
          code: "note = 85\nresultat = case note\n  when 90..100 then \"A\"\n  when 80...90 then \"B\"\n  else \"C\"\nend\nputs resultat          # B\nputs \"reussi\" if note >= 60",
          lang: "ruby"
        },
        {
          title: "Les blocs avec yield",
          body: "Un bloc est un morceau de code passe a une methode, delimite par des accolades ou par do et end. La methode peut executer ce bloc avec le mot-cle yield, en lui transmettant eventuellement des arguments. On verifie la presence d'un bloc avec la methode block_given? avant d'appeler yield. Les blocs sont omnipresents en Ruby et constituent la base de l'iteration sur les collections. Maitriser les blocs est indispensable pour ecrire du Ruby idiomatique.",
          code: "def repeter(n)\n  i = 0\n  while i < n\n    yield i\n    i += 1\n  end\nend\n\nrepeter(3) { |x| puts \"tour #{x}\" }",
          lang: "ruby"
        }
      ]
    },
    {
      title: "Chapitre 3 — Collections : Array, Hash & Range",
      lessons: [
        {
          title: "Les tableaux (Array)",
          body: "Un tableau est une liste ordonnee d'objets, accessible par index a partir de zero. Les index negatifs comptent depuis la fin, ce qui rend l'acces au dernier element tres simple. Les tableaux sont dynamiques : on ajoute des elements avec push ou l'operateur de pelle. Ruby fournit une multitude de methodes pour transformer, filtrer et combiner les tableaux. C'est la collection la plus utilisee au quotidien.",
          code: "fruits = [\"pomme\", \"poire\", \"kiwi\"]\nfruits << \"figue\"\nputs fruits[-1]        # figue\nputs fruits.length     # 4\nputs fruits.first      # pomme",
          lang: "ruby"
        },
        {
          title: "Les dictionnaires (Hash)",
          body: "Un hash associe des cles a des valeurs, un peu comme un dictionnaire ou un objet. Les symboles sont les cles les plus courantes grace a leur efficacite et a une syntaxe abregee. On accede a une valeur par sa cle entre crochets et l'on peut fournir une valeur par defaut. Les hash conservent l'ordre d'insertion depuis Ruby 1.9, ce qui les rend predictibles. Ils sont essentiels pour representer des donnees structurees et des options de configuration.",
          code: "personne = { nom: \"Ada\", age: 36 }\nputs personne[:nom]            # Ada\npersonne[:ville] = \"Londres\"\npersonne.each { |k, v| puts \"#{k} => #{v}\" }",
          lang: "ruby"
        },
        {
          title: "Les plages (Range)",
          body: "Une plage represente une sequence de valeurs entre une borne de debut et une borne de fin. Deux points incluent la borne finale tandis que trois points l'excluent. Les plages s'utilisent pour iterer, pour generer des tableaux ou dans les structures case. On peut les convertir en tableau ou tester l'appartenance d'une valeur avec include?. Elles offrent une facon concise et lisible d'exprimer des intervalles.",
          code: "(1..5).to_a            # [1, 2, 3, 4, 5]\n(1...5).to_a           # [1, 2, 3, 4]\nputs (\"a\"..\"e\").include?(\"c\")   # true\n(1..3).each { |n| puts n }",
          lang: "ruby"
        }
      ]
    },
    {
      title: "Chapitre 4 — Classes, modules & mixins",
      lessons: [
        {
          title: "Definir une classe",
          body: "Une classe sert de modele pour creer des objets partageant un comportement commun. La methode speciale initialize est le constructeur appele automatiquement par new. Les variables d'instance commencent par un arobase et sont propres a chaque objet. On expose ces variables avec attr_reader, attr_writer ou attr_accessor pour generer les accesseurs. Les classes structurent le code oriente objet en Ruby.",
          code: "class Chien\n  attr_accessor :nom\n  def initialize(nom)\n    @nom = nom\n  end\n  def aboyer\n    \"#{@nom} fait Wouf\"\n  end\nend\n\nputs Chien.new(\"Rex\").aboyer",
          lang: "ruby"
        },
        {
          title: "Heritage et methodes de classe",
          body: "Une classe peut heriter d'une autre avec l'operateur inferieur, recuperant ses methodes et attributs. Le mot-cle super appelle la version parente de la methode courante, avec ou sans arguments. Les methodes prefixees par self sont des methodes de classe, appelees sur la classe elle-meme. La visibilite se controle avec private et protected pour encapsuler les details internes. L'heritage permet de modeliser des relations de specialisation.",
          code: "class Animal\n  def initialize(nom); @nom = nom; end\nend\n\nclass Chat < Animal\n  def initialize(nom)\n    super\n    @pattes = 4\n  end\nend",
          lang: "ruby"
        },
        {
          title: "Modules et mixins",
          body: "Un module regroupe des methodes et des constantes sans pouvoir etre instancie directement. On inclut un module dans une classe avec include pour ajouter ses methodes comme methodes d'instance : c'est un mixin. Cette technique permet de partager du comportement entre des classes sans heritage multiple. Les modules servent aussi d'espaces de noms pour eviter les collisions de noms. Comparable et Enumerable sont deux modules standards tres puissants a connaitre.",
          code: "module Salutable\n  def saluer\n    \"Bonjour, je suis #{nom}\"\n  end\nend\n\nclass Personne\n  include Salutable\n  attr_reader :nom\n  def initialize(nom); @nom = nom; end\nend",
          lang: "ruby"
        }
      ]
    },
    {
      title: "Chapitre 5 — Blocs, Procs & Lambdas",
      lessons: [
        {
          title: "Itererer avec Enumerable",
          body: "Le module Enumerable fournit des dizaines de methodes d'iteration disponibles sur les tableaux et les hash. La methode each parcourt chaque element tandis que map transforme chaque element en une nouvelle valeur. La methode select filtre les elements selon une condition et reduce les agregge en une seule valeur. Ces methodes prennent un bloc et remplacent avantageusement les boucles classiques. Penser en termes d'Enumerable est la cle d'un code Ruby fluide et concis.",
          code: "nombres = [1, 2, 3, 4, 5]\nputs nombres.map { |n| n * 2 }.inspect       # [2, 4, 6, 8, 10]\nputs nombres.select { |n| n.even? }.inspect  # [2, 4]\nputs nombres.reduce(0) { |s, n| s + n }       # 15",
          lang: "ruby"
        },
        {
          title: "Procs et lambdas",
          body: "Un Proc est un bloc de code stocke dans un objet, que l'on peut passer et appeler plus tard avec call. Une lambda est une variante de Proc plus stricte sur le nombre d'arguments et sur le comportement de return. On convertit un symbole en bloc avec l'operateur esperluette, une idiome tres courante. Cette capacite a manipuler le code comme une donnee est l'essence de la programmation fonctionnelle en Ruby. Les Procs rendent les methodes flexibles et composables.",
          code: "double = ->(x) { x * 2 }\nputs double.call(5)            # 10\nputs double.(5)               # 10\nputs [1, 2, 3].map(&:to_s).inspect   # symbol to proc",
          lang: "ruby"
        }
      ]
    },
    {
      title: "Chapitre 6 — Idiomes & metaprogrammation",
      lessons: [
        {
          title: "Idiomes courants",
          body: "Ruby valorise un code expressif et plusieurs idiomes reviennent constamment. L'operateur conditionnel d'affectation n'attribue une valeur que si la variable est nil ou false. Le navigateur securise evite une erreur quand le recepteur est nil en retournant simplement nil. Les methodes tap et then permettent de chainer des operations tout en gardant le code lisible. Adopter ces idiomes rend votre code plus court et plus robuste face aux valeurs absentes.",
          code: "config ||= {}                 # affecte si nil\nutilisateur&.adresse&.ville    # safe navigation\n[1, 2, 3].tap { |a| puts a.sum }   # 6, retourne le tableau",
          lang: "ruby"
        },
        {
          title: "Bases de la metaprogrammation",
          body: "La metaprogrammation consiste a ecrire du code qui manipule ou genere du code a l'execution. On peut envoyer dynamiquement un message a un objet avec send, en passant le nom de methode sous forme de symbole. La methode define_method cree des methodes a la volee, evitant la repetition. La methode speciale method_missing intercepte les appels a des methodes inexistantes pour un comportement dynamique. Ces outils sont puissants mais a utiliser avec parcimonie pour preserver la clarte.",
          code: "class Robot\n  def method_missing(nom, *args)\n    \"Commande inconnue : #{nom}\"\n  end\nend\n\nputs Robot.new.danser          # Commande inconnue : danser\nputs \"abc\".send(:upcase)        # ABC",
          lang: "ruby"
        }
      ]
    }
  ],
  reference: [
    {
      group: "Mots-cles",
      items: [
        { name: "def", syntax: "def nom(args) ... end", desc: "Definit une methode." },
        { name: "class", syntax: "class Nom ... end", desc: "Definit une classe, modele d'objets." },
        { name: "module", syntax: "module Nom ... end", desc: "Definit un module : espace de noms ou mixin." },
        { name: "if / elsif / else", syntax: "if cond ... elsif ... else ... end", desc: "Execution conditionnelle classique." },
        { name: "unless", syntax: "unless cond ... end", desc: "Condition inversee, equivaut a if not." },
        { name: "case / when", syntax: "case x when v then ... end", desc: "Selection multiple par comparaison de cas." },
        { name: "while / until", syntax: "while cond ... end", desc: "Boucle tant que (ou jusqu'a ce que) la condition tient." },
        { name: "yield", syntax: "yield(args)", desc: "Execute le bloc passe a la methode courante." },
        { name: "return", syntax: "return valeur", desc: "Retourne une valeur explicitement depuis une methode." },
        { name: "super", syntax: "super(args)", desc: "Appelle la methode parente du meme nom." },
        { name: "self", syntax: "self", desc: "Reference l'objet courant (ou la classe)." },
        { name: "begin / rescue", syntax: "begin ... rescue => e ... end", desc: "Capture et gere les exceptions." }
      ]
    },
    {
      group: "Types & litteraux",
      items: [
        { name: "Integer", syntax: "42, 1_000, 0xff", desc: "Entier de taille arbitraire." },
        { name: "Float", syntax: "3.14, 2.0e3", desc: "Nombre a virgule flottante." },
        { name: "String", syntax: "\"texte\", 'texte'", desc: "Chaine ; doubles guillemets pour l'interpolation." },
        { name: "Symbol", syntax: ":nom", desc: "Identifiant immuable et unique en memoire." },
        { name: "Array", syntax: "[1, 2, 3]", desc: "Liste ordonnee et indexee d'objets." },
        { name: "Hash", syntax: "{ cle: valeur }", desc: "Collection de paires cle-valeur." },
        { name: "Range", syntax: "1..5, 1...5", desc: "Intervalle de valeurs, fin incluse (..) ou exclue (...)." },
        { name: "true / false", syntax: "true, false", desc: "Booleens ; seuls false et nil sont faux." },
        { name: "nil", syntax: "nil", desc: "Absence de valeur, instance unique de NilClass." },
        { name: "Regexp", syntax: "/motif/", desc: "Expression reguliere pour la recherche de motifs." }
      ]
    },
    {
      group: "Operateurs",
      items: [
        { name: "+ - * / %", syntax: "a + b", desc: "Operateurs arithmetiques de base." },
        { name: "**", syntax: "a ** b", desc: "Puissance (exponentiation)." },
        { name: "== / equal?", syntax: "a == b", desc: "Egalite de valeur ; equal? teste l'identite d'objet." },
        { name: "<=>", syntax: "a <=> b", desc: "Operateur vaisseau spatial : retourne -1, 0 ou 1." },
        { name: "<< ", syntax: "arr << x", desc: "Pelle : ajoute un element a un tableau ou une chaine." },
        { name: "&& || !", syntax: "a && b", desc: "Operateurs logiques ET, OU, NON." },
        { name: "||=", syntax: "x ||= valeur", desc: "Affecte uniquement si x est nil ou false." },
        { name: "&.", syntax: "obj&.methode", desc: "Navigation securisee : evite l'erreur si le recepteur est nil." },
        { name: "===", syntax: "plage === x", desc: "Comparaison de cas, utilisee par case/when." },
        { name: "..", syntax: "a..b", desc: "Cree une plage de valeurs (borne finale incluse)." }
      ]
    },
    {
      group: "Methodes Enumerable (map, select, reduce...)",
      items: [
        { name: "each", syntax: "coll.each { |x| ... }", desc: "Parcourt chaque element sans transformer." },
        { name: "map", syntax: "arr.map { |x| ... }", desc: "Retourne un nouveau tableau des valeurs transformees." },
        { name: "select", syntax: "arr.select { |x| ... }", desc: "Garde les elements pour lesquels le bloc est vrai." },
        { name: "reject", syntax: "arr.reject { |x| ... }", desc: "Inverse de select : retire les elements correspondants." },
        { name: "reduce", syntax: "arr.reduce(0) { |s, x| ... }", desc: "Agregge la collection en une seule valeur." },
        { name: "find", syntax: "arr.find { |x| ... }", desc: "Retourne le premier element satisfaisant le bloc." },
        { name: "each_with_index", syntax: "arr.each_with_index { |x, i| ... }", desc: "Itere avec la valeur et son index." },
        { name: "group_by", syntax: "arr.group_by { |x| ... }", desc: "Regroupe les elements dans un hash selon une cle." },
        { name: "sort_by", syntax: "arr.sort_by { |x| ... }", desc: "Trie selon la valeur calculee par le bloc." },
        { name: "count", syntax: "arr.count { |x| ... }", desc: "Compte les elements (eventuellement filtres)." },
        { name: "all? / any?", syntax: "arr.all? { |x| ... }", desc: "Teste si tous (ou au moins un) satisfont le bloc." },
        { name: "flat_map", syntax: "arr.flat_map { |x| ... }", desc: "Map puis aplatit d'un niveau le resultat." }
      ]
    },
    {
      group: "Methodes String",
      items: [
        { name: "length", syntax: "str.length", desc: "Nombre de caracteres de la chaine." },
        { name: "upcase / downcase", syntax: "str.upcase", desc: "Convertit en majuscules ou minuscules." },
        { name: "capitalize", syntax: "str.capitalize", desc: "Met la premiere lettre en majuscule." },
        { name: "strip", syntax: "str.strip", desc: "Retire les espaces en debut et fin de chaine." },
        { name: "split", syntax: "str.split(\",\")", desc: "Decoupe la chaine en tableau selon un separateur." },
        { name: "gsub", syntax: "str.gsub(/a/, \"b\")", desc: "Remplace toutes les occurrences d'un motif." },
        { name: "include?", syntax: "str.include?(\"sub\")", desc: "Teste la presence d'une sous-chaine." },
        { name: "to_i / to_f", syntax: "str.to_i", desc: "Convertit la chaine en entier ou en flottant." },
        { name: "chars", syntax: "str.chars", desc: "Retourne un tableau des caracteres." },
        { name: "start_with?", syntax: "str.start_with?(\"a\")", desc: "Teste si la chaine commence par un prefixe." }
      ]
    },
    {
      group: "Methodes Array",
      items: [
        { name: "push / <<", syntax: "arr.push(x)", desc: "Ajoute un element a la fin du tableau." },
        { name: "pop", syntax: "arr.pop", desc: "Retire et retourne le dernier element." },
        { name: "shift / unshift", syntax: "arr.shift", desc: "Retire au debut (shift) ou ajoute au debut (unshift)." },
        { name: "first / last", syntax: "arr.first(n)", desc: "Retourne le ou les premiers (ou derniers) elements." },
        { name: "include?", syntax: "arr.include?(x)", desc: "Teste l'appartenance d'un element." },
        { name: "join", syntax: "arr.join(\", \")", desc: "Concatene les elements en une chaine." },
        { name: "uniq", syntax: "arr.uniq", desc: "Retourne le tableau sans doublons." },
        { name: "flatten", syntax: "arr.flatten", desc: "Aplatit les tableaux imbriques." },
        { name: "compact", syntax: "arr.compact", desc: "Retire les valeurs nil du tableau." },
        { name: "sort / reverse", syntax: "arr.sort", desc: "Trie ou inverse l'ordre des elements." },
        { name: "sum", syntax: "arr.sum", desc: "Calcule la somme des elements numeriques." },
        { name: "index", syntax: "arr.index(x)", desc: "Retourne l'index du premier element egal a x." }
      ]
    },
    {
      group: "Methodes Hash",
      items: [
        { name: "[]", syntax: "h[:cle]", desc: "Accede a la valeur associee a une cle." },
        { name: "fetch", syntax: "h.fetch(:cle, defaut)", desc: "Accede a une cle avec valeur par defaut ou erreur." },
        { name: "keys / values", syntax: "h.keys", desc: "Retourne le tableau des cles ou des valeurs." },
        { name: "each", syntax: "h.each { |k, v| ... }", desc: "Itere sur chaque paire cle-valeur." },
        { name: "merge", syntax: "h.merge(autre)", desc: "Fusionne deux hash en un nouveau." },
        { name: "key?", syntax: "h.key?(:cle)", desc: "Teste la presence d'une cle." },
        { name: "dig", syntax: "h.dig(:a, :b)", desc: "Acces imbrique securise dans des hash chaines." },
        { name: "map", syntax: "h.map { |k, v| ... }", desc: "Transforme les paires en un tableau." },
        { name: "select", syntax: "h.select { |k, v| ... }", desc: "Filtre les paires selon une condition." },
        { name: "transform_values", syntax: "h.transform_values { |v| ... }", desc: "Transforme toutes les valeurs en gardant les cles." }
      ]
    },
    {
      group: "Blocs, Procs & Lambdas",
      items: [
        { name: "{ |x| ... }", syntax: "[1,2].each { |x| ... }", desc: "Bloc court sur une ligne avec accolades." },
        { name: "do ... end", syntax: "arr.each do |x| ... end", desc: "Bloc multiligne avec do et end." },
        { name: "yield", syntax: "yield x", desc: "Appelle le bloc passe a la methode." },
        { name: "block_given?", syntax: "block_given?", desc: "Teste si un bloc a ete fourni a la methode." },
        { name: "Proc.new", syntax: "p = Proc.new { |x| ... }", desc: "Cree un objet Proc encapsulant un bloc." },
        { name: "lambda", syntax: "l = ->(x) { ... }", desc: "Cree une lambda, Proc strict sur arguments et return." },
        { name: "call", syntax: "p.call(x)", desc: "Execute un Proc ou une lambda." },
        { name: "&:symbole", syntax: "arr.map(&:upcase)", desc: "Convertit un symbole en bloc (symbol to proc)." },
        { name: "&bloc", syntax: "def m(&b)", desc: "Capture le bloc dans un parametre nomme." },
        { name: "curry", syntax: "f.curry[a][b]", desc: "Applique partiellement les arguments d'une fonction." }
      ]
    },
    {
      group: "Modules & mixins (Comparable, Enumerable)",
      items: [
        { name: "include", syntax: "include MonModule", desc: "Ajoute les methodes du module comme methodes d'instance." },
        { name: "extend", syntax: "extend MonModule", desc: "Ajoute les methodes du module comme methodes de classe." },
        { name: "prepend", syntax: "prepend MonModule", desc: "Insere le module avant la classe dans la chaine d'ancetres." },
        { name: "Comparable", syntax: "include Comparable", desc: "Donne <, >, == via la definition de l'operateur <=>." },
        { name: "Enumerable", syntax: "include Enumerable", desc: "Donne map, select, etc. via la definition de each." },
        { name: "module_function", syntax: "module_function :nom", desc: "Rend une methode appelable sur le module lui-meme." },
        { name: "Kernel", syntax: "Kernel#puts", desc: "Module mixe dans Object fournissant puts, gets, etc." },
        { name: "namespace", syntax: "Mon::Module::Classe", desc: "Les modules servent d'espaces de noms hierarchiques." }
      ]
    },
    {
      group: "Symboles & conventions (?, !)",
      items: [
        { name: "methode?", syntax: "arr.empty?", desc: "Convention : retourne un booleen (predicat)." },
        { name: "methode!", syntax: "arr.sort!", desc: "Convention : version destructive qui modifie l'objet." },
        { name: ":symbole", syntax: ":nom", desc: "Litteral de symbole, identifiant immuable." },
        { name: "@variable", syntax: "@nom", desc: "Variable d'instance, propre a chaque objet." },
        { name: "@@variable", syntax: "@@compteur", desc: "Variable de classe, partagee entre instances." },
        { name: "CONSTANTE", syntax: "PI = 3.14", desc: "Constante : nom commencant par une majuscule." },
        { name: "$global", syntax: "$debug", desc: "Variable globale prefixee par un dollar." },
        { name: "snake_case", syntax: "mon_nom_de_methode", desc: "Convention de nommage des methodes et variables." }
      ]
    },
    {
      group: "Methodes courantes d'objet",
      items: [
        { name: "class", syntax: "obj.class", desc: "Retourne la classe de l'objet." },
        { name: "is_a? / kind_of?", syntax: "obj.is_a?(String)", desc: "Teste si l'objet est une instance d'une classe ou de ses sous-classes." },
        { name: "respond_to?", syntax: "obj.respond_to?(:nom)", desc: "Teste si l'objet repond a une methode donnee." },
        { name: "nil?", syntax: "obj.nil?", desc: "Teste si l'objet est nil." },
        { name: "to_s / inspect", syntax: "obj.to_s", desc: "Representation en chaine ; inspect pour le debogage." },
        { name: "send", syntax: "obj.send(:nom, args)", desc: "Appelle dynamiquement une methode par son nom." },
        { name: "dup / clone", syntax: "obj.dup", desc: "Cree une copie superficielle de l'objet." },
        { name: "freeze", syntax: "obj.freeze", desc: "Rend l'objet immuable." },
        { name: "tap", syntax: "obj.tap { |o| ... }", desc: "Execute un bloc puis retourne l'objet lui-meme." },
        { name: "object_id", syntax: "obj.object_id", desc: "Retourne l'identifiant unique de l'objet." }
      ]
    }
  ]
});
