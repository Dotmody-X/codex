CODEX.extend('go', {
  course: [
    {
      title: 'Chapitre 1 — Bases et types',
      lessons: [
        {
          title: 'Un premier programme',
          body: "Tout programme Go vit dans un paquet, et l execution commence par la fonction main du paquet main. La directive import charge les paquets dont vous avez besoin, comme fmt pour les entrees-sorties. Go compile le tout en un binaire unique, sans dependances externes a embarquer. La commande go run compile et lance en une seule etape, ideale pour experimenter. La mise en forme est imposee par gofmt, ce qui evite tout debat de style.",
          code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Bonjour, Codex\")\n}",
          lang: 'go'
        },
        {
          title: 'Variables et constantes',
          body: "On declare une variable avec var suivi du nom puis du type, ou plus souvent avec l operateur court := qui infere le type. Les constantes, declarees avec const, sont fixees a la compilation et ne peuvent pas changer. Go est fortement type : une fois le type connu, il ne change plus. Une variable declaree mais non utilisee provoque une erreur de compilation, ce qui force un code propre. La valeur zero (0, \"\", false) initialise toute variable sans valeur explicite.",
          code: "var age int = 30\nnom := \"Ada\"        // type infere string\nconst Pi = 3.14159\nvar actif bool      // vaut false par defaut",
          lang: 'go'
        },
        {
          title: 'Les types de base',
          body: "Go propose des entiers signes et non signes de tailles variees (int, int64, uint8...), des flottants (float32, float64) et des nombres complexes. Le type bool represente les booleens, et string une chaine immuable encodee en UTF-8. Le type rune designe un point de code Unicode, tandis que byte est un alias d uint8. Les conversions sont toujours explicites : Go ne convertit jamais un type en un autre automatiquement. Cette rigueur evite les surprises numeriques.",
          code: "var f float64 = float64(age)  // conversion explicite\nvar lettre rune = 'A'         // point de code Unicode\nvar octet byte = 65           // alias d uint8\nmessage := fmt.Sprintf(\"%d ans\", age)",
          lang: 'go'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Structures de controle et fonctions',
      lessons: [
        {
          title: 'Conditions et boucles',
          body: "Le if de Go ne prend pas de parentheses mais exige des accolades, et peut declarer une variable locale a la condition. Il n existe qu une seule boucle, for, qui couvre les usages while, for classique et boucle infinie. Le switch est puissant : pas de break implicite, des cas multiples et meme des conditions booleennes. La forme range parcourt slices, maps et chaines en fournissant index et valeur. Cette economie de mots-cles rend le flux toujours lisible.",
          code: "for i := 0; i < 3; i++ {\n\tfmt.Println(i)\n}\nif v := calcul(); v > 0 {\n\tfmt.Println(\"positif\")\n}\nfor i, c := range \"abc\" {\n\tfmt.Println(i, string(c))\n}",
          lang: 'go'
        },
        {
          title: 'Definir des fonctions',
          body: "Une fonction se declare avec func, ses parametres typees et un eventuel type de retour apres la liste. Go autorise plusieurs valeurs de retour, un idiome central pour renvoyer un resultat et une erreur. On peut nommer les valeurs de retour pour documenter et utiliser un return nu. Les fonctions sont des valeurs de premiere classe : on les passe en argument ou on les stocke. Les fonctions variadiques acceptent un nombre variable d arguments avec la syntaxe ...T.",
          code: "func diviser(a, b int) (int, error) {\n\tif b == 0 {\n\t\treturn 0, fmt.Errorf(\"division par zero\")\n\t}\n\treturn a / b, nil\n}",
          lang: 'go'
        },
        {
          title: 'Closures et defer',
          body: "Une closure est une fonction anonyme qui capture les variables de son environnement, conservant leur etat entre les appels. Le mot-cle defer differe l execution d un appel jusqu au retour de la fonction englobante. Les appels differes s empilent et s executent dans l ordre inverse, ce qui est parfait pour liberer des ressources. On place souvent defer juste apres l acquisition d un fichier ou d un verrou. Ce motif garantit le nettoyage meme en cas de retour anticipe.",
          code: "func compteur() func() int {\n\tn := 0\n\treturn func() int { n++; return n }\n}\nf, _ := os.Open(\"data.txt\")\ndefer f.Close()  // ferme a la sortie",
          lang: 'go'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Structs et interfaces',
      lessons: [
        {
          title: 'Structs et methodes',
          body: "Une struct regroupe des champs nommes pour modeliser une donnee composite ; il n y a pas de classes en Go. On attache des methodes a un type via un recepteur place avant le nom de la methode. Un recepteur par valeur travaille sur une copie, un recepteur par pointeur permet de modifier l original. La composition, en imbriquant une struct dans une autre, remplace l heritage. Cette approche favorise des types simples et combinables.",
          code: "type Point struct{ X, Y int }\n\nfunc (p Point) Norme() int {\n\treturn p.X*p.X + p.Y*p.Y\n}\nfunc (p *Point) Deplacer(dx int) {\n\tp.X += dx  // modifie l original\n}",
          lang: 'go'
        },
        {
          title: 'Les interfaces',
          body: "Une interface declare un ensemble de signatures de methodes sans imposer d implementation. Un type satisfait l interface des qu il possede toutes ces methodes, sans declaration explicite : c est le typage structurel. Ce decouplage rend le code souple et facile a tester. L interface vide interface{} (ou any) accepte n importe quelle valeur. Garder les interfaces petites est un idiome Go reconnu, illustre par io.Reader et io.Writer.",
          code: "type Forme interface {\n\tAire() float64\n}\ntype Cercle struct{ R float64 }\n\nfunc (c Cercle) Aire() float64 {\n\treturn 3.14159 * c.R * c.R\n}\n// Cercle satisfait Forme implicitement",
          lang: 'go'
        },
        {
          title: 'Assertions et type switch',
          body: "Une assertion de type extrait la valeur concrete cachee derriere une interface, avec une forme a deux retours pour tester sans paniquer. Le type switch enchaine plusieurs assertions et choisit un cas selon le type dynamique. Ces outils sont utiles pour traiter des valeurs de type interface{} de maniere sure. On evite ainsi un panic en verifiant le second booleen de retour. C est le moyen idiomatique d inspecter un type a l execution.",
          code: "func decrire(v any) {\n\tswitch x := v.(type) {\n\tcase int:\n\t\tfmt.Println(\"entier\", x)\n\tcase string:\n\t\tfmt.Println(\"chaine\", x)\n\tdefault:\n\t\tfmt.Println(\"inconnu\")\n\t}\n}",
          lang: 'go'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Slices et maps',
      lessons: [
        {
          title: 'Tableaux et slices',
          body: "Un tableau a une taille fixe connue a la compilation, alors qu une slice est une vue redimensionnable sur un tableau sous-jacent. La slice porte une longueur (len) et une capacite (cap), et grandit avec append. La fonction make cree une slice prete a l emploi avec une taille initiale. Le slicing s[a:b] extrait une sous-vue partageant la memoire d origine. Comprendre ce partage evite des effets de bord surprenants.",
          code: "nombres := []int{1, 2, 3}\nnombres = append(nombres, 4)\ntranche := nombres[1:3]   // [2 3]\ntampon := make([]int, 0, 10)",
          lang: 'go'
        },
        {
          title: 'Les maps',
          body: "Une map associe des cles uniques a des valeurs, comme un dictionnaire ; on la cree avec make ou un litteral. L acces par cle renvoie un second booleen indiquant si la cle existe, l idiome dit virgule-ok. On supprime une entree avec delete et on parcourt les paires avec range. L ordre de parcours d une map n est pas garanti et varie a chaque execution. Les maps ne sont pas sures pour un acces concurrent sans synchronisation.",
          code: "ages := map[string]int{\"Ada\": 36}\nages[\"Alan\"] = 41\nif v, ok := ages[\"Ada\"]; ok {\n\tfmt.Println(v)\n}\ndelete(ages, \"Alan\")",
          lang: 'go'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Concurrence : goroutines et channels',
      lessons: [
        {
          title: 'Lancer des goroutines',
          body: "Une goroutine est un fil d execution leger gere par le runtime de Go, lance simplement avec le mot-cle go. Des milliers de goroutines coexistent a faible cout, la ou des threads systeme seraient bien plus lourds. Le programme principal est lui-meme une goroutine, et il ne attend pas les autres par defaut. Pour attendre la fin de plusieurs goroutines, on utilise sync.WaitGroup. C est le coeur du modele de concurrence du langage.",
          code: "var wg sync.WaitGroup\nfor i := 0; i < 3; i++ {\n\twg.Add(1)\n\tgo func(n int) {\n\t\tdefer wg.Done()\n\t\tfmt.Println(n)\n\t}(i)\n}\nwg.Wait()",
          lang: 'go'
        },
        {
          title: 'Communiquer par channels',
          body: "Un channel est un tuyau type qui permet a des goroutines de s echanger des valeurs en se synchronisant. La devise de Go est : ne communiquez pas en partageant la memoire, partagez la memoire en communiquant. Un channel non bufferise bloque l envoi jusqu a ce qu une autre goroutine recoive. On ferme un channel avec close pour signaler la fin, et range le parcourt jusqu a fermeture. Cette communication explicite remplace souvent les verrous.",
          code: "ch := make(chan int)\ngo func() {\n\tfor i := 0; i < 3; i++ {\n\t\tch <- i\n\t}\n\tclose(ch)\n}()\nfor v := range ch {\n\tfmt.Println(v)\n}",
          lang: 'go'
        },
        {
          title: 'select et synchronisation',
          body: "L instruction select attend sur plusieurs operations de channel et execute celle qui est prete en premier. Avec un cas default, elle devient non bloquante, utile pour sonder un channel. Le paquet sync fournit Mutex pour proteger une section critique et WaitGroup pour attendre des goroutines. Un channel bufferise accepte un certain nombre d envois sans receveur immediat. Ces outils combines couvrent la plupart des besoins de coordination.",
          code: "select {\ncase v := <-ch1:\n\tfmt.Println(\"ch1\", v)\ncase ch2 <- 42:\n\tfmt.Println(\"envoye\")\ndefault:\n\tfmt.Println(\"rien de pret\")\n}",
          lang: 'go'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Gestion d erreurs et paquets',
      lessons: [
        {
          title: 'Le motif if err != nil',
          body: "Go n utilise pas d exceptions pour le flux normal : une fonction renvoie une valeur d erreur que l on verifie aussitot. Le type error est une interface a une seule methode Error() string. On cree une erreur avec errors.New ou fmt.Errorf, et on l enrichit avec le verbe %w pour l envelopper. Les fonctions errors.Is et errors.As inspectent une chaine d erreurs enveloppees. Ce style verbeux mais transparent rend chaque echec visible.",
          code: "f, err := os.Open(\"data.txt\")\nif err != nil {\n\treturn fmt.Errorf(\"ouverture: %w\", err)\n}\ndefer f.Close()",
          lang: 'go'
        },
        {
          title: 'panic, recover et defer',
          body: "panic interrompt le deroulement normal et remonte la pile en executant les defer rencontres. recover, appele dans une fonction differee, stoppe cette propagation et permet de reprendre la main. On reserve panic aux erreurs vraiment irrecuperables, jamais au controle de flux courant. Ce mecanisme sert surtout a transformer une panique en erreur renvoyee a l appelant. Le code idiomatique prefere de loin renvoyer une error.",
          code: "func sur() (err error) {\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\terr = fmt.Errorf(\"recupere: %v\", r)\n\t\t}\n\t}()\n\tpanic(\"boum\")\n}",
          lang: 'go'
        },
        {
          title: 'Modules et paquets',
          body: "Un paquet regroupe des fichiers d un meme dossier partageant un nom declare en tete avec package. Un identifiant exporte commence par une majuscule ; sinon il reste prive au paquet. Un module, defini par go.mod, regroupe des paquets et gere les versions des dependances. Les commandes go get, go build et go test orchestrent recuperation, compilation et tests. Cette organisation rend les grands projets clairs et reproductibles.",
          code: "// go.mod\nmodule exemple.com/projet\n\ngo 1.22\n\n// usage\nimport \"exemple.com/projet/maths\"\nresultat := maths.Additionner(2, 3)",
          lang: 'go'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Mots-cles',
      items: [
        { name: 'func', syntax: 'func nom(params) retour { ... }', desc: "Declare une fonction ou une methode." },
        { name: 'var', syntax: 'var x int = 5', desc: "Declare une variable avec son type explicite." },
        { name: 'const', syntax: 'const Pi = 3.14', desc: "Declare une constante fixee a la compilation." },
        { name: 'type', syntax: 'type Point struct{ X, Y int }', desc: "Definit un nouveau type nomme." },
        { name: 'package', syntax: 'package main', desc: "Declare le paquet auquel appartient le fichier." },
        { name: 'import', syntax: 'import \"fmt\"', desc: "Charge un paquet pour l utiliser dans le fichier." },
        { name: 'return', syntax: 'return a, nil', desc: "Renvoie une ou plusieurs valeurs depuis une fonction." },
        { name: 'defer', syntax: 'defer f.Close()', desc: "Differe un appel jusqu au retour de la fonction." },
        { name: 'go', syntax: 'go traiter()', desc: "Lance une fonction dans une nouvelle goroutine." },
        { name: 'chan', syntax: 'ch := make(chan int)', desc: "Type de channel pour communiquer entre goroutines." },
        { name: 'range', syntax: 'for i, v := range s', desc: "Itere sur slice, map, chaine ou channel." },
        { name: 'select', syntax: 'select { case <-ch: }', desc: "Attend sur plusieurs operations de channel." }
      ]
    },
    {
      group: 'Types',
      items: [
        { name: 'int', syntax: 'var n int', desc: "Entier signe de taille machine (32 ou 64 bits)." },
        { name: 'int64 / uint64', syntax: 'var n int64', desc: "Entiers signes et non signes sur 64 bits." },
        { name: 'float64', syntax: 'var f float64', desc: "Nombre a virgule flottante double precision." },
        { name: 'bool', syntax: 'var b bool', desc: "Booleen valant true ou false." },
        { name: 'string', syntax: 'var s string', desc: "Chaine immuable encodee en UTF-8." },
        { name: 'rune', syntax: 'var c rune = \'A\'', desc: "Point de code Unicode, alias d int32." },
        { name: 'byte', syntax: 'var o byte = 65', desc: "Octet, alias d uint8." },
        { name: 'error', syntax: 'var err error', desc: "Interface representant une condition d erreur." },
        { name: 'any', syntax: 'var v any', desc: "Alias d interface{}, accepte toute valeur." },
        { name: '[]T', syntax: 's := []int{1, 2}', desc: "Slice : sequence redimensionnable d elements." },
        { name: 'map[K]V', syntax: 'm := map[string]int{}', desc: "Table associative de cles vers valeurs." },
        { name: '*T', syntax: 'p := &x', desc: "Pointeur vers une valeur de type T." }
      ]
    },
    {
      group: 'Declarations (var, const, type, func)',
      items: [
        { name: 'var simple', syntax: 'var x int = 10', desc: "Declaration avec type et valeur explicites." },
        { name: 'declaration courte', syntax: 'x := 10', desc: "Declare et infere le type, hors niveau paquet." },
        { name: 'var groupee', syntax: 'var ( a int; b string )', desc: "Declare plusieurs variables dans un bloc." },
        { name: 'const groupee', syntax: 'const ( A = 1; B = 2 )', desc: "Declare plusieurs constantes dans un bloc." },
        { name: 'iota', syntax: 'const ( A = iota; B )', desc: "Compteur auto-incremente pour les enumerations." },
        { name: 'type struct', syntax: 'type T struct{ X int }', desc: "Definit un type structure a champs nommes." },
        { name: 'type alias', syntax: 'type Octet = byte', desc: "Cree un alias exact d un type existant." },
        { name: 'type fonction', syntax: 'type Op func(int) int', desc: "Nomme une signature de fonction." },
        { name: 'func multi-retour', syntax: 'func f() (int, error)', desc: "Declare plusieurs valeurs de retour." },
        { name: 'func variadique', syntax: 'func f(n ...int)', desc: "Accepte un nombre variable d arguments." }
      ]
    },
    {
      group: 'Structures de controle',
      items: [
        { name: 'if', syntax: 'if x > 0 { ... }', desc: "Execute un bloc selon une condition booleenne." },
        { name: 'if avec init', syntax: 'if v := f(); v > 0 {', desc: "Declare une variable locale a la condition." },
        { name: 'else / else if', syntax: 'if a { } else if b { }', desc: "Chaine des alternatives conditionnelles." },
        { name: 'for classique', syntax: 'for i := 0; i < n; i++ {', desc: "Boucle a compteur avec init, condition et pas." },
        { name: 'for condition', syntax: 'for x < 10 { ... }', desc: "Equivalent du while des autres langages." },
        { name: 'for range', syntax: 'for i, v := range s {', desc: "Itere sur une collection ou un channel." },
        { name: 'switch', syntax: 'switch x { case 1: }', desc: "Aiguille selon une valeur, sans break implicite." },
        { name: 'type switch', syntax: 'switch v.(type) { }', desc: "Aiguille selon le type dynamique d une interface." },
        { name: 'break / continue', syntax: 'break; continue', desc: "Sort de la boucle ou passe a l iteration suivante." },
        { name: 'goto', syntax: 'goto fin', desc: "Saute vers une etiquette dans la fonction." }
      ]
    },
    {
      group: 'Fonctions & methodes',
      items: [
        { name: 'fonction simple', syntax: 'func add(a, b int) int', desc: "Fonction nommee a parametres et retour types." },
        { name: 'methode (valeur)', syntax: 'func (p Point) Norme() int', desc: "Methode operant sur une copie du recepteur." },
        { name: 'methode (pointeur)', syntax: 'func (p *Point) Set(x int)', desc: "Methode pouvant modifier le recepteur." },
        { name: 'fonction anonyme', syntax: 'func() { ... }()', desc: "Fonction sans nom, souvent appelee aussitot." },
        { name: 'closure', syntax: 'func() int { return n }', desc: "Fonction capturant des variables environnantes." },
        { name: 'retour nomme', syntax: 'func f() (r int) { return }', desc: "Nomme les retours pour un return nu." },
        { name: 'variadique', syntax: 'func somme(n ...int) int', desc: "Recoit ses arguments sous forme de slice." },
        { name: 'valeur de fonction', syntax: 'var f = add', desc: "Stocke ou passe une fonction comme valeur." }
      ]
    },
    {
      group: 'Structs & interfaces',
      items: [
        { name: 'definition struct', syntax: 'type T struct{ X, Y int }', desc: "Regroupe des champs nommes en un type composite." },
        { name: 'litteral struct', syntax: 'p := Point{X: 1, Y: 2}', desc: "Cree une instance en initialisant ses champs." },
        { name: 'champ exporte', syntax: 'type T struct{ Nom string }', desc: "Un champ en majuscule est visible hors du paquet." },
        { name: 'composition', syntax: 'type B struct{ A }', desc: "Imbrique un type pour reutiliser ses membres." },
        { name: 'tag de champ', syntax: 'Nom string `json:\"nom\"`', desc: "Metadonnee lue par reflexion, ex. encodage JSON." },
        { name: 'interface', syntax: 'type R interface{ Read() }', desc: "Ensemble de signatures de methodes a satisfaire." },
        { name: 'satisfaction implicite', syntax: 'func (t T) Read() { }', desc: "Un type satisfait l interface sans la nommer." },
        { name: 'interface vide', syntax: 'var v interface{}', desc: "Accepte n importe quelle valeur, comme any." },
        { name: 'assertion de type', syntax: 'v, ok := x.(int)', desc: "Extrait la valeur concrete d une interface." }
      ]
    },
    {
      group: 'Slices & maps',
      items: [
        { name: 'litteral slice', syntax: 's := []int{1, 2, 3}', desc: "Cree une slice avec ses elements initiaux." },
        { name: 'make slice', syntax: 'make([]int, len, cap)', desc: "Alloue une slice de longueur et capacite donnees." },
        { name: 'append', syntax: 's = append(s, 4)', desc: "Ajoute des elements, agrandit si necessaire." },
        { name: 'slicing', syntax: 's[1:3]', desc: "Extrait une sous-vue partageant la memoire." },
        { name: 'len / cap', syntax: 'len(s); cap(s)', desc: "Longueur et capacite d une slice ou collection." },
        { name: 'copy', syntax: 'copy(dst, src)', desc: "Copie des elements d une slice vers une autre." },
        { name: 'litteral map', syntax: 'm := map[string]int{}', desc: "Cree une table associative cle vers valeur." },
        { name: 'acces virgule-ok', syntax: 'v, ok := m[\"k\"]', desc: "Lit une cle et teste sa presence." },
        { name: 'delete', syntax: 'delete(m, \"k\")', desc: "Supprime une entree de la map." },
        { name: 'range map', syntax: 'for k, v := range m {', desc: "Parcourt les paires, ordre non garanti." }
      ]
    },
    {
      group: 'Concurrence (goroutines, channels, select, sync)',
      items: [
        { name: 'go', syntax: 'go f()', desc: "Lance f dans une goroutine concurrente." },
        { name: 'make chan', syntax: 'ch := make(chan int)', desc: "Cree un channel non bufferise et synchrone." },
        { name: 'chan bufferise', syntax: 'make(chan int, 8)', desc: "Channel acceptant 8 envois sans receveur." },
        { name: 'envoi / reception', syntax: 'ch <- v; v := <-ch', desc: "Envoie ou recoit une valeur sur un channel." },
        { name: 'close', syntax: 'close(ch)', desc: "Ferme un channel pour signaler la fin des envois." },
        { name: 'select', syntax: 'select { case <-ch: }', desc: "Attend la premiere operation de channel prete." },
        { name: 'sync.WaitGroup', syntax: 'wg.Add(1); wg.Wait()', desc: "Attend la fin d un groupe de goroutines." },
        { name: 'sync.Mutex', syntax: 'mu.Lock(); mu.Unlock()', desc: "Protege une section critique partagee." },
        { name: 'sync.Once', syntax: 'once.Do(initialiser)', desc: "Execute une initialisation une seule fois." },
        { name: 'context.Context', syntax: 'ctx, cancel := context.WithCancel(p)', desc: "Propage annulation et delais aux goroutines." }
      ]
    },
    {
      group: 'Gestion d erreurs',
      items: [
        { name: 'verification', syntax: 'if err != nil { return err }', desc: "Idiome central de controle des erreurs." },
        { name: 'errors.New', syntax: 'errors.New(\"echec\")', desc: "Cree une erreur a partir d un message simple." },
        { name: 'fmt.Errorf', syntax: 'fmt.Errorf(\"ctx: %w\", err)', desc: "Formate une erreur et en enveloppe une autre." },
        { name: 'errors.Is', syntax: 'errors.Is(err, ErrX)', desc: "Teste si une erreur correspond a une cible." },
        { name: 'errors.As', syntax: 'errors.As(err, &cible)', desc: "Extrait un type d erreur de la chaine." },
        { name: 'interface error', syntax: 'func (e E) Error() string', desc: "Implemente une erreur personnalisee." },
        { name: 'panic', syntax: 'panic(\"irrecuperable\")', desc: "Interrompt l execution et remonte la pile." },
        { name: 'recover', syntax: 'recover()', desc: "Reprend la main apres un panic, dans un defer." },
        { name: 'errors.Join', syntax: 'errors.Join(e1, e2)', desc: "Combine plusieurs erreurs en une seule." }
      ]
    },
    {
      group: 'Packages standard (fmt, os, strings, strconv, net/http)',
      items: [
        { name: 'fmt.Println', syntax: 'fmt.Println(\"x\", v)', desc: "Affiche des valeurs suivies d un retour ligne." },
        { name: 'fmt.Sprintf', syntax: 'fmt.Sprintf(\"%d\", n)', desc: "Formate des valeurs en une chaine." },
        { name: 'os.Open', syntax: 'f, err := os.Open(p)', desc: "Ouvre un fichier en lecture." },
        { name: 'os.Args', syntax: 'os.Args[1:]', desc: "Arguments de la ligne de commande." },
        { name: 'strings.Split', syntax: 'strings.Split(s, \",\")', desc: "Decoupe une chaine selon un separateur." },
        { name: 'strings.Contains', syntax: 'strings.Contains(s, sub)', desc: "Teste la presence d une sous-chaine." },
        { name: 'strconv.Atoi', syntax: 'n, err := strconv.Atoi(s)', desc: "Convertit une chaine en entier." },
        { name: 'strconv.Itoa', syntax: 'strconv.Itoa(n)', desc: "Convertit un entier en chaine." },
        { name: 'http.HandleFunc', syntax: 'http.HandleFunc(\"/\", h)', desc: "Associe une route a un gestionnaire HTTP." },
        { name: 'http.ListenAndServe', syntax: 'http.ListenAndServe(\":8080\", nil)', desc: "Demarre un serveur HTTP sur un port." },
        { name: 'http.Get', syntax: 'resp, err := http.Get(url)', desc: "Effectue une requete HTTP GET." }
      ]
    }
  ]
});
